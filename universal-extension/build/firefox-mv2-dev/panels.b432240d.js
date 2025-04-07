(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5uZA7":[function(require,module,exports) {
// Import the shared settings store
var _browserConnectorSettings = require("../../store/browserConnectorSettings");
// Track connection status
let serverConnected = false;
let reconnectAttemptTimeout = null;
// Add a flag to track ongoing discovery operations
let isDiscoveryInProgress = false;
// Add an AbortController to cancel fetch operations
let discoveryController = null;
// Store settings
let panelSettings;
// Load saved settings on startup
(0, _browserConnectorSettings.getSettings)().then((settings)=>{
    panelSettings = settings;
    updateUIFromSettings();
    // Create connection status banner at the top
    createConnectionBanner();
    // Try to discover server on startup if not connected
    if (!serverConnected) discoverServer(true) // Quiet mode
    ;
});
// Listen for settings changes
(0, _browserConnectorSettings.onSettingsChanged)((settings)=>{
    panelSettings = settings;
    updateUIFromSettings();
});
// Add listener for connection status updates from background script (page refresh events)
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.type === "CONNECTION_STATUS_UPDATE") {
        console.log(`Received connection status update: ${message.isConnected ? "Connected" : "Disconnected"}`);
        // Update UI based on connection status
        if (message.isConnected) // If already connected, just maintain the current state
        {
            if (!serverConnected) {
                // Connection was re-established, update UI
                serverConnected = true;
                updateConnectionBanner(true, {
                    name: "Browser Tools Server",
                    version: "reconnected",
                    host: panelSettings.serverHost,
                    port: panelSettings.serverPort
                });
            }
        } else {
            // Connection lost, update UI to show disconnected
            serverConnected = false;
            updateConnectionBanner(false, null);
        }
    }
    if (message.type === "INITIATE_AUTO_DISCOVERY") {
        console.log(`Initiating auto-discovery after page refresh (reason: ${message.reason})`);
        // For page refreshes or if forceRestart is set to true, always cancel any ongoing discovery and restart
        if (message.reason === "page_refresh" || message.forceRestart === true) {
            // Cancel any ongoing discovery operation
            cancelOngoingDiscovery();
            // Update UI to indicate we're starting a fresh scan
            if (connectionStatusDiv) {
                connectionStatusDiv.style.display = "block";
                if (statusIcon) statusIcon.className = "status-indicator";
                if (statusText) statusText.textContent = "Page refreshed. Restarting server discovery...";
            }
            // Always update the connection banner when a page refresh occurs
            updateConnectionBanner(false, null);
            // Start a new discovery process with quiet mode
            console.log("Starting fresh discovery after page refresh");
            discoverServer(true);
        } else if (!isDiscoveryInProgress) // Use quiet mode for auto-discovery to minimize UI changes
        discoverServer(true);
    }
    // Handle successful server validation
    if (message.type === "SERVER_VALIDATION_SUCCESS") {
        console.log(`Server validation successful: ${message.serverHost}:${message.serverPort}`);
        // Update the connection status banner
        serverConnected = true;
        updateConnectionBanner(true, message.serverInfo);
        // If we were showing the connection status dialog, we can hide it now
        if (connectionStatusDiv && connectionStatusDiv.style.display === "block") connectionStatusDiv.style.display = "none";
    }
    // Handle failed server validation
    if (message.type === "SERVER_VALIDATION_FAILED") {
        console.log(`Server validation failed: ${message.reason} - ${message.serverHost}:${message.serverPort}`);
        // Update the connection status
        serverConnected = false;
        updateConnectionBanner(false, null);
        // Start auto-discovery if this was a page refresh validation
        if (message.reason === "connection_error" || message.reason === "http_error") // If we're not already trying to discover the server, start the process
        {
            if (!isDiscoveryInProgress) {
                console.log("Starting auto-discovery after validation failure");
                discoverServer(true);
            }
        }
    }
    // Handle successful WebSocket connection
    if (message.type === "WEBSOCKET_CONNECTED") {
        console.log(`WebSocket connected to ${message.serverHost}:${message.serverPort}`);
        // Update connection status if it wasn't already connected
        if (!serverConnected) {
            serverConnected = true;
            updateConnectionBanner(true, {
                name: "Browser Tools Server",
                version: "connected via WebSocket",
                host: message.serverHost,
                port: message.serverPort
            });
        }
    }
});
// Create connection status banner
function createConnectionBanner() {
    // Check if banner already exists
    if (document.getElementById("connection-banner")) return;
    // Create the banner
    const banner = document.createElement("div");
    banner.id = "connection-banner";
    banner.style.cssText = `
    padding: 6px 0px; 
    margin-bottom: 4px;
    width: 40%; 
    display: flex; 
    flex-direction: column;
    align-items: flex-start; 
    background-color:rgba(0,0,0,0);
    border-radius: 11px;
    font-size: 11px;
    font-weight: 500;
    color: #ffffff;
  `;
    // Create reconnect button (now placed at the top)
    const reconnectButton = document.createElement("button");
    reconnectButton.id = "banner-reconnect-btn";
    reconnectButton.textContent = "Reconnect";
    reconnectButton.style.cssText = `
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #444444;
    border-radius: 3px;
    padding: 2px 8px;
    font-size: 10px;
    cursor: pointer;
    margin-bottom: 6px;
    align-self: flex-start;
    display: none;
    transition: background-color 0.2s;
  `;
    reconnectButton.addEventListener("mouseover", ()=>{
        reconnectButton.style.backgroundColor = "#444444";
    });
    reconnectButton.addEventListener("mouseout", ()=>{
        reconnectButton.style.backgroundColor = "#333333";
    });
    reconnectButton.addEventListener("click", ()=>{
        // Hide the button while reconnecting
        reconnectButton.style.display = "none";
        reconnectButton.textContent = "Reconnecting...";
        // Update UI to show searching state
        updateConnectionBanner(false, null);
        // Try to discover server
        discoverServer(false);
    });
    // Create a container for the status indicator and text
    const statusContainer = document.createElement("div");
    statusContainer.style.cssText = `
    display: flex;
    align-items: center;
    width: 100%;
  `;
    // Create status indicator
    const indicator = document.createElement("div");
    indicator.id = "banner-status-indicator";
    indicator.style.cssText = `
    width: 6px; 
    height: 6px; 
    position: relative;
    top: 1px;
    border-radius: 50%; 
    background-color: #ccc; 
    margin-right: 8px; 
    flex-shrink: 0;
    transition: background-color 0.3s ease;
  `;
    // Create status text
    const statusText = document.createElement("div");
    statusText.id = "banner-status-text";
    statusText.textContent = "Searching for server...";
    statusText.style.cssText = "flex-grow: 1; font-weight: 400; letter-spacing: 0.1px; font-size: 11px;";
    // Add elements to statusContainer
    statusContainer.appendChild(indicator);
    statusContainer.appendChild(statusText);
    // Add elements to banner - reconnect button first, then status container
    banner.appendChild(reconnectButton);
    banner.appendChild(statusContainer);
    // Add banner to the beginning of the document body
    // This ensures it's the very first element
    document.body.prepend(banner);
    // Set initial state
    updateConnectionBanner(false, null);
}
// Update the connection banner with current status
function updateConnectionBanner(connected, serverInfo) {
    const indicator = document.getElementById("banner-status-indicator");
    const statusText = document.getElementById("banner-status-text");
    const banner = document.getElementById("connection-banner");
    const reconnectButton = document.getElementById("banner-reconnect-btn");
    if (!indicator || !statusText || !banner || !reconnectButton) return;
    if (connected && serverInfo) {
        // Connected state with server info
        indicator.style.backgroundColor = "#4CAF50" // Green indicator
        ;
        statusText.style.color = "#ffffff" // White text for contrast on black
        ;
        statusText.textContent = `Connected to ${serverInfo.name} v${serverInfo.version} at ${panelSettings.serverHost}:${panelSettings.serverPort}`;
        // Hide reconnect button when connected
        reconnectButton.style.display = "none";
    } else if (connected) {
        // Connected without server info
        indicator.style.backgroundColor = "#4CAF50" // Green indicator
        ;
        statusText.style.color = "#ffffff" // White text for contrast on black
        ;
        statusText.textContent = `Connected to server at ${panelSettings.serverHost}:${panelSettings.serverPort}`;
        // Hide reconnect button when connected
        reconnectButton.style.display = "none";
    } else {
        // Disconnected state
        indicator.style.backgroundColor = "#F44336" // Red indicator
        ;
        statusText.style.color = "#ffffff" // White text for contrast on black
        ;
        // Only show "searching" message if discovery is in progress
        if (isDiscoveryInProgress) {
            statusText.textContent = "Not connected to server. Searching...";
            // Hide reconnect button while actively searching
            reconnectButton.style.display = "none";
        } else {
            statusText.textContent = "Not connected to server.";
            // Show reconnect button above status message when disconnected and not searching
            reconnectButton.style.display = "block";
            reconnectButton.textContent = "Reconnect";
        }
    }
}
// Initialize UI elements
const logLimitInput = document.getElementById("log-limit");
const queryLimitInput = document.getElementById("query-limit");
const stringSizeLimitInput = document.getElementById("string-size-limit");
const showRequestHeadersCheckbox = document.getElementById("show-request-headers");
const showResponseHeadersCheckbox = document.getElementById("show-response-headers");
const maxLogSizeInput = document.getElementById("max-log-size");
const screenshotPathInput = document.getElementById("screenshot-path");
const captureScreenshotButton = document.getElementById("capture-screenshot");
const serverHostInput = document.getElementById("server-host");
const serverPortInput = document.getElementById("server-port");
const discoverServerButton = document.getElementById("discover-server");
const testConnectionButton = document.getElementById("test-connection");
const connectionStatusDiv = document.getElementById("connection-status");
const statusIcon = document.getElementById("status-icon");
const statusText = document.getElementById("status-text");
// Initialize collapsible advanced settings
const advancedSettingsHeader = document.getElementById("advanced-settings-header");
const advancedSettingsContent = document.getElementById("advanced-settings-content");
const chevronIcon = advancedSettingsHeader.querySelector(".chevron");
advancedSettingsHeader.addEventListener("click", ()=>{
    advancedSettingsContent.classList.toggle("visible");
    chevronIcon.classList.toggle("open");
});
// Get all inputs by ID
const allowAutoPasteCheckbox = document.getElementById("allow-auto-paste");
// Update UI from settings
function updateUIFromSettings() {
    logLimitInput.value = panelSettings.logLimit.toString();
    queryLimitInput.value = panelSettings.queryLimit.toString();
    stringSizeLimitInput.value = panelSettings.stringSizeLimit.toString();
    showRequestHeadersCheckbox.checked = panelSettings.showRequestHeaders;
    showResponseHeadersCheckbox.checked = panelSettings.showResponseHeaders;
    maxLogSizeInput.value = panelSettings.maxLogSize.toString();
    screenshotPathInput.value = panelSettings.screenshotPath;
    serverHostInput.value = panelSettings.serverHost;
    serverPortInput.value = panelSettings.serverPort.toString();
    allowAutoPasteCheckbox.checked = panelSettings.allowAutoPaste;
}
// Function to save settings
function saveSettings() {
    // Save to shared store
    (0, _browserConnectorSettings.saveSettings)(panelSettings).then(()=>{
        console.log("Settings saved successfully");
    }).catch((error)=>{
        console.error("Error saving settings:", error);
    });
}
// Add event listeners for all inputs
logLimitInput.addEventListener("change", (e)=>{
    panelSettings.logLimit = parseInt(e.target.value, 10);
    saveSettings();
});
queryLimitInput.addEventListener("change", (e)=>{
    panelSettings.queryLimit = parseInt(e.target.value, 10);
    saveSettings();
});
stringSizeLimitInput.addEventListener("change", (e)=>{
    panelSettings.stringSizeLimit = parseInt(e.target.value, 10);
    saveSettings();
});
showRequestHeadersCheckbox.addEventListener("change", (e)=>{
    panelSettings.showRequestHeaders = e.target.checked;
    saveSettings();
});
showResponseHeadersCheckbox.addEventListener("change", (e)=>{
    panelSettings.showResponseHeaders = e.target.checked;
    saveSettings();
});
maxLogSizeInput.addEventListener("change", (e)=>{
    panelSettings.maxLogSize = parseInt(e.target.value, 10);
    saveSettings();
});
screenshotPathInput.addEventListener("change", (e)=>{
    panelSettings.screenshotPath = e.target.value;
    saveSettings();
});
// Add event listeners for server settings
serverHostInput.addEventListener("change", (e)=>{
    panelSettings.serverHost = e.target.value;
    saveSettings();
    // Automatically test connection when host is changed
    testConnection(panelSettings.serverHost, panelSettings.serverPort);
});
serverPortInput.addEventListener("change", (e)=>{
    panelSettings.serverPort = parseInt(e.target.value, 10);
    saveSettings();
    // Automatically test connection when port is changed
    testConnection(panelSettings.serverHost, panelSettings.serverPort);
});
// Add event listener for auto-paste checkbox
allowAutoPasteCheckbox.addEventListener("change", (e)=>{
    panelSettings.allowAutoPaste = e.target.checked;
    saveSettings();
});
// Function to cancel any ongoing discovery operations
function cancelOngoingDiscovery() {
    if (isDiscoveryInProgress) {
        console.log("Cancelling ongoing discovery operation");
        // Abort any fetch requests in progress
        if (discoveryController) {
            try {
                discoveryController.abort();
            } catch (error) {
                console.error("Error aborting discovery controller:", error);
            }
            discoveryController = null;
        }
        // Reset the discovery status
        isDiscoveryInProgress = false;
        // Update UI to indicate the operation was cancelled
        if (statusText && connectionStatusDiv && connectionStatusDiv.style.display === "block") statusText.textContent = "Server discovery operation cancelled";
        // Clear any pending network timeouts that might be part of the discovery process
        clearTimeout(reconnectAttemptTimeout);
        reconnectAttemptTimeout = null;
        console.log("Discovery operation cancelled successfully");
    }
}
// Test server connection
testConnectionButton.addEventListener("click", async ()=>{
    // Cancel any ongoing discovery operations before testing
    cancelOngoingDiscovery();
    await testConnection(panelSettings.serverHost, panelSettings.serverPort);
});
// Function to test server connection
async function testConnection(host, port) {
    // Cancel any ongoing discovery operations
    cancelOngoingDiscovery();
    connectionStatusDiv.style.display = "block";
    statusIcon.className = "status-indicator";
    statusText.textContent = "Testing connection...";
    try {
        // Use the identity endpoint instead of .port for more reliable validation
        const response = await fetch(`http://${host}:${port}/.identity`, {
            signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        if (response.ok) {
            const identity = await response.json();
            // Verify this is actually our server by checking the signature
            if (identity.signature !== "mcp-browser-connector-24x7") {
                statusIcon.className = "status-indicator status-disconnected";
                statusText.textContent = `Connection failed: Found a server at ${host}:${port} but it's not the Browser Tools server`;
                serverConnected = false;
                updateConnectionBanner(false, null);
                scheduleReconnectAttempt();
                return false;
            }
            statusIcon.className = "status-indicator status-connected";
            statusText.textContent = `Connected successfully to ${identity.name} v${identity.version} at ${host}:${port}`;
            serverConnected = true;
            updateConnectionBanner(true, identity);
            // Clear any scheduled reconnect attempts
            if (reconnectAttemptTimeout) {
                clearTimeout(reconnectAttemptTimeout);
                reconnectAttemptTimeout = null;
            }
            // Update settings if different port was discovered
            if (parseInt(identity.port, 10) !== port) {
                console.log(`Detected different port: ${identity.port}`);
                panelSettings.serverPort = parseInt(identity.port, 10);
                serverPortInput.value = panelSettings.serverPort.toString();
                saveSettings();
            }
            return true;
        } else {
            statusIcon.className = "status-indicator status-disconnected";
            statusText.textContent = `Connection failed: Server returned ${response.status}`;
            serverConnected = false;
            // Make sure isDiscoveryInProgress is false so the reconnect button will show
            isDiscoveryInProgress = false;
            // Now update the connection banner to show the reconnect button
            updateConnectionBanner(false, null);
            scheduleReconnectAttempt();
            return false;
        }
    } catch (error) {
        statusIcon.className = "status-indicator status-disconnected";
        statusText.textContent = `Connection failed: ${error.message}`;
        serverConnected = false;
        // Make sure isDiscoveryInProgress is false so the reconnect button will show
        isDiscoveryInProgress = false;
        // Now update the connection banner to show the reconnect button
        updateConnectionBanner(false, null);
        scheduleReconnectAttempt();
        return false;
    }
}
// Schedule a reconnect attempt if server isn't found
function scheduleReconnectAttempt() {
    // Clear any existing reconnect timeout
    if (reconnectAttemptTimeout) clearTimeout(reconnectAttemptTimeout);
    // Schedule a reconnect attempt in 30 seconds
    reconnectAttemptTimeout = setTimeout(()=>{
        console.log("Attempting to reconnect to server...");
        // Only show minimal UI during auto-reconnect
        discoverServer(true);
    }, 30000) // 30 seconds
    ;
}
// Helper function to try connecting to a server
async function tryServerConnection(host, port) {
    // Cancel any ongoing discovery operations
    cancelOngoingDiscovery();
    // Check if the discovery process was cancelled
    if (!isDiscoveryInProgress) return false;
    // Create a local timeout that won't abort the entire discovery process
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>{
        controller.abort();
    }, 500) // 500ms timeout for each connection attempt
    ;
    try {
        // Check if the discovery process was cancelled
        if (!isDiscoveryInProgress) return false;
        // Use identity endpoint for validation
        const response = await fetch(`http://${host}:${port}/.identity`, {
            // Use a local controller for this specific request timeout
            // but also respect the global discovery cancellation
            signal: discoveryController ? AbortSignal.any([
                controller.signal,
                discoveryController.signal
            ]) : controller.signal
        });
        clearTimeout(timeoutId);
        // Check again if discovery was cancelled during the fetch
        if (!isDiscoveryInProgress) return false;
        if (response.ok) {
            const identity = await response.json();
            // Verify this is actually our server by checking the signature
            if (identity.signature !== "mcp-browser-connector-24x7") {
                console.log(`Found a server at ${host}:${port} but it's not the Browser Tools server`);
                return false;
            }
            console.log(`Successfully found server at ${host}:${port}`);
            // Update settings with discovered server
            panelSettings.serverHost = host;
            panelSettings.serverPort = parseInt(identity.port, 10);
            serverHostInput.value = panelSettings.serverHost;
            serverPortInput.value = panelSettings.serverPort.toString();
            saveSettings();
            statusIcon.className = "status-indicator status-connected";
            statusText.textContent = `Discovered ${identity.name} v${identity.version} at ${host}:${identity.port}`;
            // Update connection banner with server info
            updateConnectionBanner(true, identity);
            // Update connection status
            serverConnected = true;
            // Clear any scheduled reconnect attempts
            if (reconnectAttemptTimeout) {
                clearTimeout(reconnectAttemptTimeout);
                reconnectAttemptTimeout = null;
            }
            // End the discovery process
            isDiscoveryInProgress = false;
            // Successfully found server
            return true;
        }
        return false;
    } catch (error) {
        // Ignore connection errors during discovery
        console.log(`Connection error for ${host}:${port}: ${error.message}`);
        // Check if it was an abort (cancellation)
        if (error.name === "AbortError") // Check if this was due to the global discovery cancellation
        {
            if (discoveryController && discoveryController.signal.aborted) {
                console.log("Connection attempt aborted by global cancellation");
                return "aborted";
            }
        }
        return false;
    } finally{
        clearTimeout(timeoutId);
    }
}
// Server discovery function (extracted to be reusable)
async function discoverServer(quietMode = false) {
    // Cancel any ongoing discovery operations before starting a new one
    cancelOngoingDiscovery();
    // Create a new AbortController for this discovery process
    discoveryController = new AbortController();
    isDiscoveryInProgress = true;
    // In quiet mode, we don't show the connection status until we either succeed or fail completely
    if (!quietMode) {
        connectionStatusDiv.style.display = "block";
        statusIcon.className = "status-indicator";
        statusText.textContent = "Discovering server...";
    }
    // Always update the connection banner
    updateConnectionBanner(false, null);
    try {
        console.log("Starting server discovery process");
        // Add an early cancellation listener that will respond to page navigation/refresh
        discoveryController.signal.addEventListener("abort", ()=>{
            console.log("Discovery aborted via AbortController signal");
            isDiscoveryInProgress = false;
        });
        // Common IPs to try (in order of likelihood)
        const hosts = [
            "localhost",
            "127.0.0.1"
        ];
        // Add the current configured host if it's not already in the list
        if (!hosts.includes(panelSettings.serverHost) && panelSettings.serverHost !== "0.0.0.0") hosts.unshift(panelSettings.serverHost) // Put at the beginning for priority
        ;
        // Add common local network IPs
        const commonLocalIps = [
            "192.168.0.",
            "192.168.1.",
            "10.0.0.",
            "10.0.1."
        ];
        for (const prefix of commonLocalIps)for(let i = 1; i <= 5; i++)// Reduced from 10 to 5 for efficiency
        hosts.push(`${prefix}${i}`);
        // Build port list in a smart order:
        // 1. Start with current configured port
        // 2. Add default port (3025)
        // 3. Add sequential ports around the default (for fallback detection)
        const ports = [];
        // Current configured port gets highest priority
        const configuredPort = panelSettings.serverPort;
        ports.push(configuredPort);
        // Add default port if it's not the same as configured
        if (configuredPort !== 3025) ports.push(3025);
        // Add sequential fallback ports (from default up to default+10)
        for(let p = 3026; p <= 3035; p++)if (p !== configuredPort) // Avoid duplicates
        ports.push(p);
        // Remove duplicates
        const uniquePorts = [
            ...new Set(ports)
        ];
        console.log("Will check ports:", uniquePorts);
        // Create a progress indicator
        let progress = 0;
        let totalChecked = 0;
        // Phase 1: Try the most likely combinations first (current host:port and localhost variants)
        console.log("Starting Phase 1: Quick check of high-priority hosts/ports");
        const priorityHosts = hosts.slice(0, 2) // First two hosts are highest priority
        ;
        for (const host of priorityHosts){
            // Check if discovery was cancelled
            if (!isDiscoveryInProgress) {
                console.log("Discovery process was cancelled during Phase 1");
                return false;
            }
            // Try configured port first
            totalChecked++;
            if (!quietMode) statusText.textContent = `Checking ${host}:${uniquePorts[0]}...`;
            console.log(`Checking ${host}:${uniquePorts[0]}...`);
            const result = await tryServerConnection(host, uniquePorts[0]);
            // Check for cancellation or success
            if (result === "aborted" || !isDiscoveryInProgress) {
                console.log("Discovery process was cancelled");
                return false;
            } else if (result === true) {
                console.log("Server found in priority check");
                if (quietMode) // In quiet mode, only show the connection banner but hide the status box
                connectionStatusDiv.style.display = "none";
                return true // Successfully found server
                ;
            }
            // Then try default port if different
            if (uniquePorts.length > 1) {
                // Check if discovery was cancelled
                if (!isDiscoveryInProgress) {
                    console.log("Discovery process was cancelled");
                    return false;
                }
                totalChecked++;
                if (!quietMode) statusText.textContent = `Checking ${host}:${uniquePorts[1]}...`;
                console.log(`Checking ${host}:${uniquePorts[1]}...`);
                const result = await tryServerConnection(host, uniquePorts[1]);
                // Check for cancellation or success
                if (result === "aborted" || !isDiscoveryInProgress) {
                    console.log("Discovery process was cancelled");
                    return false;
                } else if (result === true) {
                    console.log("Server found in priority check");
                    if (quietMode) // In quiet mode, only show the connection banner but hide the status box
                    connectionStatusDiv.style.display = "none";
                    return true // Successfully found server
                    ;
                }
            }
        }
        // If we're in quiet mode and the quick checks failed, show the status now
        // as we move into more intensive scanning
        if (quietMode) {
            connectionStatusDiv.style.display = "block";
            statusIcon.className = "status-indicator";
            statusText.textContent = "Searching for server...";
        }
        // Phase 2: Systematic scan of all combinations
        const totalAttempts = hosts.length * uniquePorts.length;
        console.log(`Starting Phase 2: Full scan (${totalAttempts} total combinations)`);
        statusText.textContent = `Quick check failed. Starting full scan (${totalChecked}/${totalAttempts})...`;
        // First, scan through all ports on localhost/127.0.0.1 to find fallback ports quickly
        const localHosts = [
            "localhost",
            "127.0.0.1"
        ];
        for (const host of localHosts){
            // Skip the first two ports on localhost if we already checked them in Phase 1
            const portsToCheck = uniquePorts.slice(localHosts.includes(host) && priorityHosts.includes(host) ? 2 : 0);
            for (const port of portsToCheck){
                // Check if discovery was cancelled
                if (!isDiscoveryInProgress) {
                    console.log("Discovery process was cancelled during local port scan");
                    return false;
                }
                // Update progress
                progress++;
                totalChecked++;
                statusText.textContent = `Scanning local ports... (${totalChecked}/${totalAttempts}) - Trying ${host}:${port}`;
                console.log(`Checking ${host}:${port}...`);
                const result = await tryServerConnection(host, port);
                // Check for cancellation or success
                if (result === "aborted" || !isDiscoveryInProgress) {
                    console.log("Discovery process was cancelled");
                    return false;
                } else if (result === true) {
                    console.log(`Server found at ${host}:${port}`);
                    return true // Successfully found server
                    ;
                }
            }
        }
        // Then scan all the remaining host/port combinations
        for (const host of hosts){
            // Skip hosts we already checked
            if (localHosts.includes(host)) continue;
            for (const port of uniquePorts){
                // Check if discovery was cancelled
                if (!isDiscoveryInProgress) {
                    console.log("Discovery process was cancelled during remote scan");
                    return false;
                }
                // Update progress
                progress++;
                totalChecked++;
                statusText.textContent = `Scanning remote hosts... (${totalChecked}/${totalAttempts}) - Trying ${host}:${port}`;
                console.log(`Checking ${host}:${port}...`);
                const result = await tryServerConnection(host, port);
                // Check for cancellation or success
                if (result === "aborted") {
                    console.log("Discovery aborted during remote scan");
                    break;
                } else if (result === true) {
                    console.log("Server found during remote scan");
                    return true;
                }
            }
        }
        console.log(`Discovery process completed, checked ${totalChecked} combinations, no server found`);
        // If we get here, no server was found
        statusIcon.className = "status-indicator status-disconnected";
        statusText.textContent = "No server found. Please check server is running and try again.";
        serverConnected = false;
        // End the discovery process first before updating the banner
        isDiscoveryInProgress = false;
        // Update the connection banner to show the reconnect button
        updateConnectionBanner(false, null);
        // Schedule a reconnect attempt
        scheduleReconnectAttempt();
        return false;
    } catch (error) {
        console.error("Error during server discovery:", error);
        statusIcon.className = "status-indicator status-disconnected";
        statusText.textContent = `Error discovering server: ${error.message}`;
        serverConnected = false;
        // End the discovery process first before updating the banner
        isDiscoveryInProgress = false;
        // Update the connection banner to show the reconnect button
        updateConnectionBanner(false, null);
        // Schedule a reconnect attempt
        scheduleReconnectAttempt();
        return false;
    } finally{
        console.log("Discovery process finished");
        // Always clean up, even if there was an error
        if (discoveryController) discoveryController = null;
    }
}
// Bind discover server button to the extracted function
discoverServerButton.addEventListener("click", ()=>discoverServer(false));
// Screenshot capture functionality
captureScreenshotButton.addEventListener("click", ()=>{
    captureScreenshotButton.textContent = "Capturing...";
    // Send message to background script to capture screenshot
    chrome.runtime.sendMessage({
        type: "CAPTURE_SCREENSHOT",
        tabId: chrome.devtools.inspectedWindow.tabId,
        screenshotPath: panelSettings.screenshotPath
    }, (response)=>{
        console.log("Screenshot capture response:", response);
        if (!response) {
            captureScreenshotButton.textContent = "Failed to capture!";
            console.error("Screenshot capture failed: No response received");
        } else if (!response.success) {
            captureScreenshotButton.textContent = "Failed to capture!";
            console.error("Screenshot capture failed:", response.error);
        } else {
            captureScreenshotButton.textContent = `Captured: ${response.title}`;
            console.log("Screenshot captured successfully:", response.path);
        }
        setTimeout(()=>{
            captureScreenshotButton.textContent = "Capture Screenshot";
        }, 2000);
    });
});
// Add wipe logs functionality
const wipeLogsButton = document.getElementById("wipe-logs");
wipeLogsButton.addEventListener("click", ()=>{
    const serverUrl = `http://${panelSettings.serverHost}:${panelSettings.serverPort}/wipelogs`;
    console.log(`Sending wipe request to ${serverUrl}`);
    fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>response.json()).then((result)=>{
        console.log("Logs wiped successfully:", result.message);
        wipeLogsButton.textContent = "Logs Wiped!";
        setTimeout(()=>{
            wipeLogsButton.textContent = "Wipe All Logs";
        }, 2000);
    }).catch((error)=>{
        console.error("Failed to wipe logs:", error);
        wipeLogsButton.textContent = "Failed to Wipe Logs";
        setTimeout(()=>{
            wipeLogsButton.textContent = "Wipe All Logs";
        }, 2000);
    });
});

},{"../../store/browserConnectorSettings":"fOoVm"}],"fOoVm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultSettings", ()=>defaultSettings);
/**
 * Get the current settings
 * @returns Promise with the current settings
 */ parcelHelpers.export(exports, "getSettings", ()=>getSettings);
/**
 * Save settings
 * @param settings The settings to save
 * @returns Promise that resolves when settings are saved
 */ parcelHelpers.export(exports, "saveSettings", ()=>saveSettings);
/**
 * Listen for settings changes
 * @param callback Function to call when settings change
 * @returns Function to remove the listeners
 */ parcelHelpers.export(exports, "onSettingsChanged", ()=>onSettingsChanged);
var _storage = require("@plasmohq/storage");
const defaultSettings = {
    logLimit: 50,
    queryLimit: 30000,
    stringSizeLimit: 500,
    maxLogSize: 20000,
    showRequestHeaders: false,
    showResponseHeaders: false,
    screenshotPath: "",
    serverHost: "localhost",
    serverPort: 3025,
    allowAutoPaste: false
};
// Create a storage instance
const storage = new (0, _storage.Storage)({
    area: "local"
});
// Key for storing settings
const SETTINGS_KEY = "browserConnectorSettings";
async function getSettings() {
    const settings = await storage.get(SETTINGS_KEY);
    return settings ? {
        ...defaultSettings,
        ...settings
    } : {
        ...defaultSettings
    };
}
async function saveSettings(settings) {
    const currentSettings = await getSettings();
    const newSettings = {
        ...currentSettings,
        ...settings
    };
    await storage.set(SETTINGS_KEY, newSettings);
    // Notify all parts of the extension about the settings update
    chrome.runtime.sendMessage({
        type: "SETTINGS_UPDATED",
        settings: newSettings
    });
}
function onSettingsChanged(callback) {
    const listener = (changes, area)=>{
        if (area === "local" && SETTINGS_KEY in changes) {
            const newSettings = changes[SETTINGS_KEY].newValue;
            callback(newSettings);
        }
    };
    chrome.storage.onChanged.addListener(listener);
    // Also listen for runtime messages about settings updates
    const messageListener = (message)=>{
        if (message.type === "SETTINGS_UPDATED") callback(message.settings);
    };
    chrome.runtime.onMessage.addListener(messageListener);
    // Return a function to remove the listeners
    return ()=>{
        chrome.storage.onChanged.removeListener(listener);
        chrome.runtime.onMessage.removeListener(messageListener);
    };
}

},{"@plasmohq/storage":"eusrP","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eusrP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseStorage", ()=>o);
parcelHelpers.export(exports, "Storage", ()=>g);
var _pify = require("pify");
var _pifyDefault = parcelHelpers.interopDefault(_pify);
var l = ()=>{
    try {
        let e = globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (e[1] === "Chrome") return parseInt(e[2]) < 100 || globalThis.chrome.runtime?.getManifest()?.manifest_version === 2;
    } catch  {
        return !1;
    }
    return !1;
};
var o = class {
    #r;
    #t;
    get primaryClient() {
        return this.#t;
    }
    #e;
    get secondaryClient() {
        return this.#e;
    }
    #a;
    get area() {
        return this.#a;
    }
    get hasWebApi() {
        try {
            return typeof window < "u" && !!window.localStorage;
        } catch (e) {
            return console.error(e), !1;
        }
    }
    #s = new Map;
    #i;
    get copiedKeySet() {
        return this.#i;
    }
    isCopied = (e)=>this.hasWebApi && (this.allCopied || this.copiedKeySet.has(e));
    #n = !1;
    get allCopied() {
        return this.#n;
    }
    getExtStorageApi = ()=>globalThis.browser?.storage || globalThis.chrome?.storage;
    get hasExtensionApi() {
        try {
            return !!this.getExtStorageApi();
        } catch (e) {
            return console.error(e), !1;
        }
    }
    isWatchSupported = ()=>this.hasExtensionApi;
    keyNamespace = "";
    isValidKey = (e)=>e.startsWith(this.keyNamespace);
    getNamespacedKey = (e)=>`${this.keyNamespace}${e}`;
    getUnnamespacedKey = (e)=>e.slice(this.keyNamespace.length);
    serde = {
        serializer: JSON.stringify,
        deserializer: JSON.parse
    };
    constructor({ area: e = "sync", allCopied: t = !1, copiedKeyList: s = [], serde: r = {} } = {}){
        this.setCopiedKeySet(s), this.#a = e, this.#n = t, this.serde = {
            ...this.serde,
            ...r
        };
        try {
            this.hasWebApi && (t || s.length > 0) && (this.#e = window.localStorage);
        } catch  {}
        try {
            this.hasExtensionApi && (this.#r = this.getExtStorageApi(), l() ? this.#t = (0, _pifyDefault.default)(this.#r[this.area], {
                exclude: [
                    "getBytesInUse"
                ],
                errorFirst: !1
            }) : this.#t = this.#r[this.area]);
        } catch  {}
    }
    setCopiedKeySet(e) {
        this.#i = new Set(e);
    }
    rawGetAll = ()=>this.#t?.get();
    getAll = async ()=>{
        let e = await this.rawGetAll();
        return Object.entries(e).filter(([t])=>this.isValidKey(t)).reduce((t, [s, r])=>(t[this.getUnnamespacedKey(s)] = r, t), {});
    };
    copy = async (e)=>{
        let t = e === void 0;
        if (!t && !this.copiedKeySet.has(e) || !this.allCopied || !this.hasExtensionApi) return !1;
        let s = this.allCopied ? await this.rawGetAll() : await this.#t.get((t ? [
            ...this.copiedKeySet
        ] : [
            e
        ]).map(this.getNamespacedKey));
        if (!s) return !1;
        let r = !1;
        for(let a in s){
            let i = s[a], n = this.#e?.getItem(a);
            this.#e?.setItem(a, i), r ||= i !== n;
        }
        return r;
    };
    rawGet = async (e)=>(await this.rawGetMany([
            e
        ]))[e];
    rawGetMany = async (e)=>this.hasExtensionApi ? await this.#t.get(e) : e.filter(this.isCopied).reduce((t, s)=>(t[s] = this.#e?.getItem(s), t), {});
    rawSet = async (e, t)=>await this.rawSetMany({
            [e]: t
        });
    rawSetMany = async (e)=>(this.#e && Object.entries(e).filter(([t])=>this.isCopied(t)).forEach(([t, s])=>this.#e.setItem(t, s)), this.hasExtensionApi && await this.#t.set(e), null);
    clear = async (e = !1)=>{
        e && this.#e?.clear(), await this.#t.clear();
    };
    rawRemove = async (e)=>{
        await this.rawRemoveMany([
            e
        ]);
    };
    rawRemoveMany = async (e)=>{
        this.#e && e.filter(this.isCopied).forEach((t)=>this.#e.removeItem(t)), this.hasExtensionApi && await this.#t.remove(e);
    };
    removeAll = async ()=>{
        let e = await this.getAll(), t = Object.keys(e);
        await this.removeMany(t);
    };
    watch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#o(e), t;
    };
    #o = (e)=>{
        for(let t in e){
            let s = this.getNamespacedKey(t), r = this.#s.get(s)?.callbackSet || new Set;
            if (r.add(e[t]), r.size > 1) continue;
            let a = (i, n)=>{
                if (n !== this.area || !i[s]) return;
                let h = this.#s.get(s);
                if (!h) throw new Error(`Storage comms does not exist for nsKey: ${s}`);
                Promise.all([
                    this.parseValue(i[s].newValue),
                    this.parseValue(i[s].oldValue)
                ]).then(([y, d])=>{
                    for (let p of h.callbackSet)p({
                        newValue: y,
                        oldValue: d
                    }, n);
                });
            };
            this.#r.onChanged.addListener(a), this.#s.set(s, {
                callbackSet: r,
                listener: a
            });
        }
    };
    unwatch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#c(e), t;
    };
    #c(e) {
        for(let t in e){
            let s = this.getNamespacedKey(t), r = e[t], a = this.#s.get(s);
            a && (a.callbackSet.delete(r), a.callbackSet.size === 0 && (this.#s.delete(s), this.#r.onChanged.removeListener(a.listener)));
        }
    }
    unwatchAll = ()=>this.#h();
    #h() {
        this.#s.forEach(({ listener: e })=>this.#r.onChanged.removeListener(e)), this.#s.clear();
    }
    async getItem(e) {
        return this.get(e);
    }
    async getItems(e) {
        return await this.getMany(e);
    }
    async setItem(e, t) {
        await this.set(e, t);
    }
    async setItems(e) {
        await await this.setMany(e);
    }
    async removeItem(e) {
        return this.remove(e);
    }
    async removeItems(e) {
        return await this.removeMany(e);
    }
}, g = class extends o {
    get = async (e)=>{
        let t = this.getNamespacedKey(e), s = await this.rawGet(t);
        return this.parseValue(s);
    };
    getMany = async (e)=>{
        let t = e.map(this.getNamespacedKey), s = await this.rawGetMany(t), r = await Promise.all(Object.values(s).map(this.parseValue));
        return Object.keys(s).reduce((a, i, n)=>(a[this.getUnnamespacedKey(i)] = r[n], a), {});
    };
    set = async (e, t)=>{
        let s = this.getNamespacedKey(e), r = this.serde.serializer(t);
        return this.rawSet(s, r);
    };
    setMany = async (e)=>{
        let t = Object.entries(e).reduce((s, [r, a])=>(s[this.getNamespacedKey(r)] = this.serde.serializer(a), s), {});
        return await this.rawSetMany(t);
    };
    remove = async (e)=>{
        let t = this.getNamespacedKey(e);
        return this.rawRemove(t);
    };
    removeMany = async (e)=>{
        let t = e.map(this.getNamespacedKey);
        return await this.rawRemoveMany(t);
    };
    setNamespace = (e)=>{
        this.keyNamespace = e;
    };
    parseValue = async (e)=>{
        try {
            if (e !== void 0) return this.serde.deserializer(e);
        } catch (t) {
            console.error(t);
        }
    };
};

},{"pify":"fyP20","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"fyP20":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>pify);
const processFunction = (function_, options, proxy, unwrapped)=>function(...arguments_) {
        const P = options.promiseModule;
        return new P((resolve, reject)=>{
            if (options.multiArgs) arguments_.push((...result)=>{
                if (options.errorFirst) {
                    if (result[0]) reject(result);
                    else {
                        result.shift();
                        resolve(result);
                    }
                } else resolve(result);
            });
            else if (options.errorFirst) arguments_.push((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
            else arguments_.push(resolve);
            const self = this === proxy ? unwrapped : this;
            Reflect.apply(function_, self, arguments_);
        });
    };
const filterCache = new WeakMap();
function pify(input, options) {
    options = {
        exclude: [
            /.+(?:Sync|Stream)$/
        ],
        errorFirst: true,
        promiseModule: Promise,
        ...options
    };
    const objectType = typeof input;
    if (!(input !== null && (objectType === "object" || objectType === "function"))) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
    const filter = (target, key)=>{
        let cached = filterCache.get(target);
        if (!cached) {
            cached = {};
            filterCache.set(target, cached);
        }
        if (key in cached) return cached[key];
        const match = (pattern)=>typeof pattern === "string" || typeof key === "symbol" ? key === pattern : pattern.test(key);
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = descriptor === undefined || descriptor.writable || descriptor.configurable;
        const included = options.include ? options.include.some((element)=>match(element)) : !options.exclude.some((element)=>match(element));
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
    };
    const cache = new WeakMap();
    const proxy = new Proxy(input, {
        apply (target, thisArg, args) {
            const cached = cache.get(target);
            if (cached) return Reflect.apply(cached, thisArg, args);
            const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
            cache.set(target, pified);
            return Reflect.apply(pified, thisArg, args);
        },
        get (target, key) {
            const property = target[key];
            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
            if (!filter(target, key) || property === Function.prototype[key]) return property;
            const cached = cache.get(property);
            if (cached) return cached;
            if (typeof property === "function") {
                const pified = processFunction(property, options, proxy, target);
                cache.set(property, pified);
                return pified;
            }
            return property;
        }
    });
    return proxy;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6dfwG":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["5uZA7"], "5uZA7", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUztRQUN2QztRQUVBLEtBQUksTUFBTSxFQUFFLEdBQUc7WUFDZCxNQUFNLFdBQVcsTUFBTSxDQUFDLElBQUk7WUFFNUIscUVBQXFFO1lBQ3JFLElBQUksQ0FBQyxPQUFPLFFBQVEsUUFBUSxhQUFhLFNBQVMsU0FBUyxDQUFDLElBQUksRUFDL0QsT0FBTztZQUdSLE1BQU0sU0FBUyxNQUFNLElBQUk7WUFFekIsSUFBSSxRQUNILE9BQU87WUFHUixJQUFJLE9BQU8sYUFBYSxZQUFZO2dCQUNuQyxNQUFNLFNBQVMsZ0JBQWdCLFVBQVUsU0FBUyxPQUFPO2dCQUN6RCxNQUFNLElBQUksVUFBVTtnQkFDcEIsT0FBTztZQUNSO1lBRUEsT0FBTztRQUNSO0lBQ0Q7SUFFQSxPQUFPO0FBQ1I7OztBQzlHQSxRQUFRLGlCQUFpQixTQUFVLENBQUM7SUFDbEMsT0FBTyxLQUFLLEVBQUUsYUFBYSxJQUFJO1FBQUMsU0FBUztJQUFDO0FBQzVDO0FBRUEsUUFBUSxvQkFBb0IsU0FBVSxDQUFDO0lBQ3JDLE9BQU8sZUFBZSxHQUFHLGNBQWM7UUFBQyxPQUFPO0lBQUk7QUFDckQ7QUFFQSxRQUFRLFlBQVksU0FBVSxNQUFNLEVBQUUsSUFBSTtJQUN4QyxPQUFPLEtBQUssUUFBUSxRQUFRLFNBQVUsR0FBRztRQUN2QyxJQUFJLFFBQVEsYUFBYSxRQUFRLGdCQUFnQixLQUFLLGVBQWUsTUFDbkU7UUFHRixPQUFPLGVBQWUsTUFBTSxLQUFLO1lBQy9CLFlBQVk7WUFDWixLQUFLO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUk7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUEsUUFBUSxTQUFTLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHO0lBQzVDLE9BQU8sZUFBZSxNQUFNLFVBQVU7UUFDcEMsWUFBWTtRQUNaLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJkZXZ0b29scy9wYW5lbHMvaW5kZXgudHN4Iiwic3RvcmUvYnJvd3NlckNvbm5lY3RvclNldHRpbmdzLnRzIiwiLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BwbGFzbW9ocStzdG9yYWdlQDEuMTUuMC9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3N0b3JhZ2UvZGlzdC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9waWZ5QDYuMS4wL25vZGVfbW9kdWxlcy9waWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrdHJhbnNmb3JtZXItanNAMi45LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydCB0aGUgc2hhcmVkIHNldHRpbmdzIHN0b3JlXG5pbXBvcnQge1xuICBnZXRTZXR0aW5ncyxcbiAgb25TZXR0aW5nc0NoYW5nZWQsXG4gIHNhdmVTZXR0aW5ncyBhcyBzYXZlU2V0dGluZ3NUb1N0b3JlXG59IGZyb20gXCIuLi8uLi9zdG9yZS9icm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIlxuaW1wb3J0IHR5cGUgeyBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vc3RvcmUvYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJcblxuLy8gVHJhY2sgY29ubmVjdGlvbiBzdGF0dXNcbmxldCBzZXJ2ZXJDb25uZWN0ZWQgPSBmYWxzZVxubGV0IHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0ID0gbnVsbFxuLy8gQWRkIGEgZmxhZyB0byB0cmFjayBvbmdvaW5nIGRpc2NvdmVyeSBvcGVyYXRpb25zXG5sZXQgaXNEaXNjb3ZlcnlJblByb2dyZXNzID0gZmFsc2Vcbi8vIEFkZCBhbiBBYm9ydENvbnRyb2xsZXIgdG8gY2FuY2VsIGZldGNoIG9wZXJhdGlvbnNcbmxldCBkaXNjb3ZlcnlDb250cm9sbGVyID0gbnVsbFxuXG4vLyBTdG9yZSBzZXR0aW5nc1xubGV0IHBhbmVsU2V0dGluZ3M6IEJyb3dzZXJDb25uZWN0b3JTZXR0aW5nc1xuXG4vLyBMb2FkIHNhdmVkIHNldHRpbmdzIG9uIHN0YXJ0dXBcbmdldFNldHRpbmdzKCkudGhlbigoc2V0dGluZ3MpID0+IHtcbiAgcGFuZWxTZXR0aW5ncyA9IHNldHRpbmdzXG4gIHVwZGF0ZVVJRnJvbVNldHRpbmdzKClcblxuICAvLyBDcmVhdGUgY29ubmVjdGlvbiBzdGF0dXMgYmFubmVyIGF0IHRoZSB0b3BcbiAgY3JlYXRlQ29ubmVjdGlvbkJhbm5lcigpXG5cbiAgLy8gVHJ5IHRvIGRpc2NvdmVyIHNlcnZlciBvbiBzdGFydHVwIGlmIG5vdCBjb25uZWN0ZWRcbiAgaWYgKCFzZXJ2ZXJDb25uZWN0ZWQpIHtcbiAgICBkaXNjb3ZlclNlcnZlcih0cnVlKSAvLyBRdWlldCBtb2RlXG4gIH1cbn0pXG5cbi8vIExpc3RlbiBmb3Igc2V0dGluZ3MgY2hhbmdlc1xub25TZXR0aW5nc0NoYW5nZWQoKHNldHRpbmdzKSA9PiB7XG4gIHBhbmVsU2V0dGluZ3MgPSBzZXR0aW5nc1xuICB1cGRhdGVVSUZyb21TZXR0aW5ncygpXG59KVxuXG4vLyBBZGQgbGlzdGVuZXIgZm9yIGNvbm5lY3Rpb24gc3RhdHVzIHVwZGF0ZXMgZnJvbSBiYWNrZ3JvdW5kIHNjcmlwdCAocGFnZSByZWZyZXNoIGV2ZW50cylcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJDT05ORUNUSU9OX1NUQVRVU19VUERBVEVcIikge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFJlY2VpdmVkIGNvbm5lY3Rpb24gc3RhdHVzIHVwZGF0ZTogJHtcbiAgICAgICAgbWVzc2FnZS5pc0Nvbm5lY3RlZCA/IFwiQ29ubmVjdGVkXCIgOiBcIkRpc2Nvbm5lY3RlZFwiXG4gICAgICB9YFxuICAgIClcblxuICAgIC8vIFVwZGF0ZSBVSSBiYXNlZCBvbiBjb25uZWN0aW9uIHN0YXR1c1xuICAgIGlmIChtZXNzYWdlLmlzQ29ubmVjdGVkKSB7XG4gICAgICAvLyBJZiBhbHJlYWR5IGNvbm5lY3RlZCwganVzdCBtYWludGFpbiB0aGUgY3VycmVudCBzdGF0ZVxuICAgICAgaWYgKCFzZXJ2ZXJDb25uZWN0ZWQpIHtcbiAgICAgICAgLy8gQ29ubmVjdGlvbiB3YXMgcmUtZXN0YWJsaXNoZWQsIHVwZGF0ZSBVSVxuICAgICAgICBzZXJ2ZXJDb25uZWN0ZWQgPSB0cnVlXG4gICAgICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIodHJ1ZSwge1xuICAgICAgICAgIG5hbWU6IFwiQnJvd3NlciBUb29scyBTZXJ2ZXJcIixcbiAgICAgICAgICB2ZXJzaW9uOiBcInJlY29ubmVjdGVkXCIsXG4gICAgICAgICAgaG9zdDogcGFuZWxTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICAgIHBvcnQ6IHBhbmVsU2V0dGluZ3Muc2VydmVyUG9ydFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDb25uZWN0aW9uIGxvc3QsIHVwZGF0ZSBVSSB0byBzaG93IGRpc2Nvbm5lY3RlZFxuICAgICAgc2VydmVyQ29ubmVjdGVkID0gZmFsc2VcbiAgICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIoZmFsc2UsIG51bGwpXG4gICAgfVxuICB9XG5cbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJJTklUSUFURV9BVVRPX0RJU0NPVkVSWVwiKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgSW5pdGlhdGluZyBhdXRvLWRpc2NvdmVyeSBhZnRlciBwYWdlIHJlZnJlc2ggKHJlYXNvbjogJHttZXNzYWdlLnJlYXNvbn0pYFxuICAgIClcblxuICAgIC8vIEZvciBwYWdlIHJlZnJlc2hlcyBvciBpZiBmb3JjZVJlc3RhcnQgaXMgc2V0IHRvIHRydWUsIGFsd2F5cyBjYW5jZWwgYW55IG9uZ29pbmcgZGlzY292ZXJ5IGFuZCByZXN0YXJ0XG4gICAgaWYgKG1lc3NhZ2UucmVhc29uID09PSBcInBhZ2VfcmVmcmVzaFwiIHx8IG1lc3NhZ2UuZm9yY2VSZXN0YXJ0ID09PSB0cnVlKSB7XG4gICAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgZGlzY292ZXJ5IG9wZXJhdGlvblxuICAgICAgY2FuY2VsT25nb2luZ0Rpc2NvdmVyeSgpXG5cbiAgICAgIC8vIFVwZGF0ZSBVSSB0byBpbmRpY2F0ZSB3ZSdyZSBzdGFydGluZyBhIGZyZXNoIHNjYW5cbiAgICAgIGlmIChjb25uZWN0aW9uU3RhdHVzRGl2KSB7XG4gICAgICAgIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICBpZiAoc3RhdHVzSWNvbikgc3RhdHVzSWNvbi5jbGFzc05hbWUgPSBcInN0YXR1cy1pbmRpY2F0b3JcIlxuICAgICAgICBpZiAoc3RhdHVzVGV4dClcbiAgICAgICAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFwiUGFnZSByZWZyZXNoZWQuIFJlc3RhcnRpbmcgc2VydmVyIGRpc2NvdmVyeS4uLlwiXG4gICAgICB9XG5cbiAgICAgIC8vIEFsd2F5cyB1cGRhdGUgdGhlIGNvbm5lY3Rpb24gYmFubmVyIHdoZW4gYSBwYWdlIHJlZnJlc2ggb2NjdXJzXG4gICAgICB1cGRhdGVDb25uZWN0aW9uQmFubmVyKGZhbHNlLCBudWxsKVxuXG4gICAgICAvLyBTdGFydCBhIG5ldyBkaXNjb3ZlcnkgcHJvY2VzcyB3aXRoIHF1aWV0IG1vZGVcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgZnJlc2ggZGlzY292ZXJ5IGFmdGVyIHBhZ2UgcmVmcmVzaFwiKVxuICAgICAgZGlzY292ZXJTZXJ2ZXIodHJ1ZSlcbiAgICB9XG4gICAgLy8gRm9yIG90aGVyIHR5cGVzIG9mIGF1dG8tZGlzY292ZXJ5IHJlcXVlc3RzLCBvbmx5IHN0YXJ0IGlmIG5vdCBhbHJlYWR5IGluIHByb2dyZXNzXG4gICAgZWxzZSBpZiAoIWlzRGlzY292ZXJ5SW5Qcm9ncmVzcykge1xuICAgICAgLy8gVXNlIHF1aWV0IG1vZGUgZm9yIGF1dG8tZGlzY292ZXJ5IHRvIG1pbmltaXplIFVJIGNoYW5nZXNcbiAgICAgIGRpc2NvdmVyU2VydmVyKHRydWUpXG4gICAgfVxuICB9XG5cbiAgLy8gSGFuZGxlIHN1Y2Nlc3NmdWwgc2VydmVyIHZhbGlkYXRpb25cbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJTRVJWRVJfVkFMSURBVElPTl9TVUNDRVNTXCIpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBTZXJ2ZXIgdmFsaWRhdGlvbiBzdWNjZXNzZnVsOiAke21lc3NhZ2Uuc2VydmVySG9zdH06JHttZXNzYWdlLnNlcnZlclBvcnR9YFxuICAgIClcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0dXMgYmFubmVyXG4gICAgc2VydmVyQ29ubmVjdGVkID0gdHJ1ZVxuICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIodHJ1ZSwgbWVzc2FnZS5zZXJ2ZXJJbmZvKVxuXG4gICAgLy8gSWYgd2Ugd2VyZSBzaG93aW5nIHRoZSBjb25uZWN0aW9uIHN0YXR1cyBkaWFsb2csIHdlIGNhbiBoaWRlIGl0IG5vd1xuICAgIGlmIChjb25uZWN0aW9uU3RhdHVzRGl2ICYmIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB7XG4gICAgICBjb25uZWN0aW9uU3RhdHVzRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSBmYWlsZWQgc2VydmVyIHZhbGlkYXRpb25cbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJTRVJWRVJfVkFMSURBVElPTl9GQUlMRURcIikge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFNlcnZlciB2YWxpZGF0aW9uIGZhaWxlZDogJHttZXNzYWdlLnJlYXNvbn0gLSAke21lc3NhZ2Uuc2VydmVySG9zdH06JHttZXNzYWdlLnNlcnZlclBvcnR9YFxuICAgIClcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0dXNcbiAgICBzZXJ2ZXJDb25uZWN0ZWQgPSBmYWxzZVxuICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIoZmFsc2UsIG51bGwpXG5cbiAgICAvLyBTdGFydCBhdXRvLWRpc2NvdmVyeSBpZiB0aGlzIHdhcyBhIHBhZ2UgcmVmcmVzaCB2YWxpZGF0aW9uXG4gICAgaWYgKFxuICAgICAgbWVzc2FnZS5yZWFzb24gPT09IFwiY29ubmVjdGlvbl9lcnJvclwiIHx8XG4gICAgICBtZXNzYWdlLnJlYXNvbiA9PT0gXCJodHRwX2Vycm9yXCJcbiAgICApIHtcbiAgICAgIC8vIElmIHdlJ3JlIG5vdCBhbHJlYWR5IHRyeWluZyB0byBkaXNjb3ZlciB0aGUgc2VydmVyLCBzdGFydCB0aGUgcHJvY2Vzc1xuICAgICAgaWYgKCFpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFydGluZyBhdXRvLWRpc2NvdmVyeSBhZnRlciB2YWxpZGF0aW9uIGZhaWx1cmVcIilcbiAgICAgICAgZGlzY292ZXJTZXJ2ZXIodHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgc3VjY2Vzc2Z1bCBXZWJTb2NrZXQgY29ubmVjdGlvblxuICBpZiAobWVzc2FnZS50eXBlID09PSBcIldFQlNPQ0tFVF9DT05ORUNURURcIikge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFdlYlNvY2tldCBjb25uZWN0ZWQgdG8gJHttZXNzYWdlLnNlcnZlckhvc3R9OiR7bWVzc2FnZS5zZXJ2ZXJQb3J0fWBcbiAgICApXG5cbiAgICAvLyBVcGRhdGUgY29ubmVjdGlvbiBzdGF0dXMgaWYgaXQgd2Fzbid0IGFscmVhZHkgY29ubmVjdGVkXG4gICAgaWYgKCFzZXJ2ZXJDb25uZWN0ZWQpIHtcbiAgICAgIHNlcnZlckNvbm5lY3RlZCA9IHRydWVcbiAgICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIodHJ1ZSwge1xuICAgICAgICBuYW1lOiBcIkJyb3dzZXIgVG9vbHMgU2VydmVyXCIsXG4gICAgICAgIHZlcnNpb246IFwiY29ubmVjdGVkIHZpYSBXZWJTb2NrZXRcIixcbiAgICAgICAgaG9zdDogbWVzc2FnZS5zZXJ2ZXJIb3N0LFxuICAgICAgICBwb3J0OiBtZXNzYWdlLnNlcnZlclBvcnRcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuXG4vLyBDcmVhdGUgY29ubmVjdGlvbiBzdGF0dXMgYmFubmVyXG5mdW5jdGlvbiBjcmVhdGVDb25uZWN0aW9uQmFubmVyKCkge1xuICAvLyBDaGVjayBpZiBiYW5uZXIgYWxyZWFkeSBleGlzdHNcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbi1iYW5uZXJcIikpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgYmFubmVyXG4gIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgYmFubmVyLmlkID0gXCJjb25uZWN0aW9uLWJhbm5lclwiXG4gIGJhbm5lci5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBhZGRpbmc6IDZweCAwcHg7IFxuICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICB3aWR0aDogNDAlOyBcbiAgICBkaXNwbGF5OiBmbGV4OyBcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OyBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsMCk7XG4gICAgYm9yZGVyLXJhZGl1czogMTFweDtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgYFxuXG4gIC8vIENyZWF0ZSByZWNvbm5lY3QgYnV0dG9uIChub3cgcGxhY2VkIGF0IHRoZSB0b3ApXG4gIGNvbnN0IHJlY29ubmVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbiAgcmVjb25uZWN0QnV0dG9uLmlkID0gXCJiYW5uZXItcmVjb25uZWN0LWJ0blwiXG4gIHJlY29ubmVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiUmVjb25uZWN0XCJcbiAgcmVjb25uZWN0QnV0dG9uLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMztcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0NDQ0O1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnM7XG4gIGBcbiAgcmVjb25uZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgIHJlY29ubmVjdEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0NDQ0NDRcIlxuICB9KVxuICByZWNvbm5lY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICByZWNvbm5lY3RCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMzMzMzMzXCJcbiAgfSlcbiAgcmVjb25uZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gSGlkZSB0aGUgYnV0dG9uIHdoaWxlIHJlY29ubmVjdGluZ1xuICAgIHJlY29ubmVjdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICByZWNvbm5lY3RCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlY29ubmVjdGluZy4uLlwiXG5cbiAgICAvLyBVcGRhdGUgVUkgdG8gc2hvdyBzZWFyY2hpbmcgc3RhdGVcbiAgICB1cGRhdGVDb25uZWN0aW9uQmFubmVyKGZhbHNlLCBudWxsKVxuXG4gICAgLy8gVHJ5IHRvIGRpc2NvdmVyIHNlcnZlclxuICAgIGRpc2NvdmVyU2VydmVyKGZhbHNlKVxuICB9KVxuXG4gIC8vIENyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIHN0YXR1cyBpbmRpY2F0b3IgYW5kIHRleHRcbiAgY29uc3Qgc3RhdHVzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICBzdGF0dXNDb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgd2lkdGg6IDEwMCU7XG4gIGBcblxuICAvLyBDcmVhdGUgc3RhdHVzIGluZGljYXRvclxuICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIGluZGljYXRvci5pZCA9IFwiYmFubmVyLXN0YXR1cy1pbmRpY2F0b3JcIlxuICBpbmRpY2F0b3Iuc3R5bGUuY3NzVGV4dCA9IGBcbiAgICB3aWR0aDogNnB4OyBcbiAgICBoZWlnaHQ6IDZweDsgXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTsgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYzsgXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7IFxuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xuICBgXG5cbiAgLy8gQ3JlYXRlIHN0YXR1cyB0ZXh0XG4gIGNvbnN0IHN0YXR1c1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIHN0YXR1c1RleHQuaWQgPSBcImJhbm5lci1zdGF0dXMtdGV4dFwiXG4gIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBcIlNlYXJjaGluZyBmb3Igc2VydmVyLi4uXCJcbiAgc3RhdHVzVGV4dC5zdHlsZS5jc3NUZXh0ID1cbiAgICBcImZsZXgtZ3JvdzogMTsgZm9udC13ZWlnaHQ6IDQwMDsgbGV0dGVyLXNwYWNpbmc6IDAuMXB4OyBmb250LXNpemU6IDExcHg7XCJcblxuICAvLyBBZGQgZWxlbWVudHMgdG8gc3RhdHVzQ29udGFpbmVyXG4gIHN0YXR1c0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmRpY2F0b3IpXG4gIHN0YXR1c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdGF0dXNUZXh0KVxuXG4gIC8vIEFkZCBlbGVtZW50cyB0byBiYW5uZXIgLSByZWNvbm5lY3QgYnV0dG9uIGZpcnN0LCB0aGVuIHN0YXR1cyBjb250YWluZXJcbiAgYmFubmVyLmFwcGVuZENoaWxkKHJlY29ubmVjdEJ1dHRvbilcbiAgYmFubmVyLmFwcGVuZENoaWxkKHN0YXR1c0NvbnRhaW5lcilcblxuICAvLyBBZGQgYmFubmVyIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGRvY3VtZW50IGJvZHlcbiAgLy8gVGhpcyBlbnN1cmVzIGl0J3MgdGhlIHZlcnkgZmlyc3QgZWxlbWVudFxuICBkb2N1bWVudC5ib2R5LnByZXBlbmQoYmFubmVyKVxuXG4gIC8vIFNldCBpbml0aWFsIHN0YXRlXG4gIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIoZmFsc2UsIG51bGwpXG59XG5cbi8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBiYW5uZXIgd2l0aCBjdXJyZW50IHN0YXR1c1xuZnVuY3Rpb24gdXBkYXRlQ29ubmVjdGlvbkJhbm5lcihjb25uZWN0ZWQsIHNlcnZlckluZm8pIHtcbiAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYW5uZXItc3RhdHVzLWluZGljYXRvclwiKVxuICBjb25zdCBzdGF0dXNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYW5uZXItc3RhdHVzLXRleHRcIilcbiAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0aW9uLWJhbm5lclwiKVxuICBjb25zdCByZWNvbm5lY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhbm5lci1yZWNvbm5lY3QtYnRuXCIpXG5cbiAgaWYgKCFpbmRpY2F0b3IgfHwgIXN0YXR1c1RleHQgfHwgIWJhbm5lciB8fCAhcmVjb25uZWN0QnV0dG9uKSByZXR1cm5cblxuICBpZiAoY29ubmVjdGVkICYmIHNlcnZlckluZm8pIHtcbiAgICAvLyBDb25uZWN0ZWQgc3RhdGUgd2l0aCBzZXJ2ZXIgaW5mb1xuICAgIGluZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0Q0FGNTBcIiAvLyBHcmVlbiBpbmRpY2F0b3JcbiAgICBzdGF0dXNUZXh0LnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCIgLy8gV2hpdGUgdGV4dCBmb3IgY29udHJhc3Qgb24gYmxhY2tcbiAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gYENvbm5lY3RlZCB0byAke3NlcnZlckluZm8ubmFtZX0gdiR7c2VydmVySW5mby52ZXJzaW9ufSBhdCAke3BhbmVsU2V0dGluZ3Muc2VydmVySG9zdH06JHtwYW5lbFNldHRpbmdzLnNlcnZlclBvcnR9YFxuXG4gICAgLy8gSGlkZSByZWNvbm5lY3QgYnV0dG9uIHdoZW4gY29ubmVjdGVkXG4gICAgcmVjb25uZWN0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICB9IGVsc2UgaWYgKGNvbm5lY3RlZCkge1xuICAgIC8vIENvbm5lY3RlZCB3aXRob3V0IHNlcnZlciBpbmZvXG4gICAgaW5kaWNhdG9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzRDQUY1MFwiIC8vIEdyZWVuIGluZGljYXRvclxuICAgIHN0YXR1c1RleHQuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIiAvLyBXaGl0ZSB0ZXh0IGZvciBjb250cmFzdCBvbiBibGFja1xuICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBgQ29ubmVjdGVkIHRvIHNlcnZlciBhdCAke3BhbmVsU2V0dGluZ3Muc2VydmVySG9zdH06JHtwYW5lbFNldHRpbmdzLnNlcnZlclBvcnR9YFxuXG4gICAgLy8gSGlkZSByZWNvbm5lY3QgYnV0dG9uIHdoZW4gY29ubmVjdGVkXG4gICAgcmVjb25uZWN0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICB9IGVsc2Uge1xuICAgIC8vIERpc2Nvbm5lY3RlZCBzdGF0ZVxuICAgIGluZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGNDQzMzZcIiAvLyBSZWQgaW5kaWNhdG9yXG4gICAgc3RhdHVzVGV4dC5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiIC8vIFdoaXRlIHRleHQgZm9yIGNvbnRyYXN0IG9uIGJsYWNrXG5cbiAgICAvLyBPbmx5IHNob3cgXCJzZWFyY2hpbmdcIiBtZXNzYWdlIGlmIGRpc2NvdmVyeSBpcyBpbiBwcm9ncmVzc1xuICAgIGlmIChpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MpIHtcbiAgICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBcIk5vdCBjb25uZWN0ZWQgdG8gc2VydmVyLiBTZWFyY2hpbmcuLi5cIlxuICAgICAgLy8gSGlkZSByZWNvbm5lY3QgYnV0dG9uIHdoaWxlIGFjdGl2ZWx5IHNlYXJjaGluZ1xuICAgICAgcmVjb25uZWN0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gXCJOb3QgY29ubmVjdGVkIHRvIHNlcnZlci5cIlxuICAgICAgLy8gU2hvdyByZWNvbm5lY3QgYnV0dG9uIGFib3ZlIHN0YXR1cyBtZXNzYWdlIHdoZW4gZGlzY29ubmVjdGVkIGFuZCBub3Qgc2VhcmNoaW5nXG4gICAgICByZWNvbm5lY3RCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgcmVjb25uZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJSZWNvbm5lY3RcIlxuICAgIH1cbiAgfVxufVxuXG4vLyBJbml0aWFsaXplIFVJIGVsZW1lbnRzXG5jb25zdCBsb2dMaW1pdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2ctbGltaXRcIikgYXMgSFRNTElucHV0RWxlbWVudFxuY29uc3QgcXVlcnlMaW1pdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwicXVlcnktbGltaXRcIlxuKSBhcyBIVE1MSW5wdXRFbGVtZW50XG5jb25zdCBzdHJpbmdTaXplTGltaXRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInN0cmluZy1zaXplLWxpbWl0XCJcbikgYXMgSFRNTElucHV0RWxlbWVudFxuY29uc3Qgc2hvd1JlcXVlc3RIZWFkZXJzQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJzaG93LXJlcXVlc3QtaGVhZGVyc1wiXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnRcbmNvbnN0IHNob3dSZXNwb25zZUhlYWRlcnNDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInNob3ctcmVzcG9uc2UtaGVhZGVyc1wiXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnRcbmNvbnN0IG1heExvZ1NpemVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcIm1heC1sb2ctc2l6ZVwiXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnRcbmNvbnN0IHNjcmVlbnNob3RQYXRoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJzY3JlZW5zaG90LXBhdGhcIlxuKSBhcyBIVE1MSW5wdXRFbGVtZW50XG5jb25zdCBjYXB0dXJlU2NyZWVuc2hvdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FwdHVyZS1zY3JlZW5zaG90XCIpXG5jb25zdCBzZXJ2ZXJIb3N0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJzZXJ2ZXItaG9zdFwiXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnRcbmNvbnN0IHNlcnZlclBvcnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInNlcnZlci1wb3J0XCJcbikgYXMgSFRNTElucHV0RWxlbWVudFxuY29uc3QgZGlzY292ZXJTZXJ2ZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJkaXNjb3Zlci1zZXJ2ZXJcIlxuKSBhcyBIVE1MQnV0dG9uRWxlbWVudFxuY29uc3QgdGVzdENvbm5lY3Rpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJ0ZXN0LWNvbm5lY3Rpb25cIlxuKSBhcyBIVE1MQnV0dG9uRWxlbWVudFxuY29uc3QgY29ubmVjdGlvblN0YXR1c0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbi1zdGF0dXNcIilcbmNvbnN0IHN0YXR1c0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1cy1pY29uXCIpXG5jb25zdCBzdGF0dXNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXMtdGV4dFwiKVxuXG4vLyBJbml0aWFsaXplIGNvbGxhcHNpYmxlIGFkdmFuY2VkIHNldHRpbmdzXG5jb25zdCBhZHZhbmNlZFNldHRpbmdzSGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwiYWR2YW5jZWQtc2V0dGluZ3MtaGVhZGVyXCJcbilcbmNvbnN0IGFkdmFuY2VkU2V0dGluZ3NDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwiYWR2YW5jZWQtc2V0dGluZ3MtY29udGVudFwiXG4pXG5jb25zdCBjaGV2cm9uSWNvbiA9IGFkdmFuY2VkU2V0dGluZ3NIZWFkZXIucXVlcnlTZWxlY3RvcihcIi5jaGV2cm9uXCIpXG5cbmFkdmFuY2VkU2V0dGluZ3NIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWR2YW5jZWRTZXR0aW5nc0NvbnRlbnQuY2xhc3NMaXN0LnRvZ2dsZShcInZpc2libGVcIilcbiAgY2hldnJvbkljb24uY2xhc3NMaXN0LnRvZ2dsZShcIm9wZW5cIilcbn0pXG5cbi8vIEdldCBhbGwgaW5wdXRzIGJ5IElEXG5jb25zdCBhbGxvd0F1dG9QYXN0ZUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwiYWxsb3ctYXV0by1wYXN0ZVwiXG4pIGFzIEhUTUxJbnB1dEVsZW1lbnRcblxuLy8gVXBkYXRlIFVJIGZyb20gc2V0dGluZ3NcbmZ1bmN0aW9uIHVwZGF0ZVVJRnJvbVNldHRpbmdzKCkge1xuICBsb2dMaW1pdElucHV0LnZhbHVlID0gcGFuZWxTZXR0aW5ncy5sb2dMaW1pdC50b1N0cmluZygpXG4gIHF1ZXJ5TGltaXRJbnB1dC52YWx1ZSA9IHBhbmVsU2V0dGluZ3MucXVlcnlMaW1pdC50b1N0cmluZygpXG4gIHN0cmluZ1NpemVMaW1pdElucHV0LnZhbHVlID0gcGFuZWxTZXR0aW5ncy5zdHJpbmdTaXplTGltaXQudG9TdHJpbmcoKVxuICBzaG93UmVxdWVzdEhlYWRlcnNDaGVja2JveC5jaGVja2VkID0gcGFuZWxTZXR0aW5ncy5zaG93UmVxdWVzdEhlYWRlcnNcbiAgc2hvd1Jlc3BvbnNlSGVhZGVyc0NoZWNrYm94LmNoZWNrZWQgPSBwYW5lbFNldHRpbmdzLnNob3dSZXNwb25zZUhlYWRlcnNcbiAgbWF4TG9nU2l6ZUlucHV0LnZhbHVlID0gcGFuZWxTZXR0aW5ncy5tYXhMb2dTaXplLnRvU3RyaW5nKClcbiAgc2NyZWVuc2hvdFBhdGhJbnB1dC52YWx1ZSA9IHBhbmVsU2V0dGluZ3Muc2NyZWVuc2hvdFBhdGhcbiAgc2VydmVySG9zdElucHV0LnZhbHVlID0gcGFuZWxTZXR0aW5ncy5zZXJ2ZXJIb3N0XG4gIHNlcnZlclBvcnRJbnB1dC52YWx1ZSA9IHBhbmVsU2V0dGluZ3Muc2VydmVyUG9ydC50b1N0cmluZygpXG4gIGFsbG93QXV0b1Bhc3RlQ2hlY2tib3guY2hlY2tlZCA9IHBhbmVsU2V0dGluZ3MuYWxsb3dBdXRvUGFzdGVcbn1cblxuLy8gRnVuY3Rpb24gdG8gc2F2ZSBzZXR0aW5nc1xuZnVuY3Rpb24gc2F2ZVNldHRpbmdzKCkge1xuICAvLyBTYXZlIHRvIHNoYXJlZCBzdG9yZVxuICBzYXZlU2V0dGluZ3NUb1N0b3JlKHBhbmVsU2V0dGluZ3MpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5ncyBzYXZlZCBzdWNjZXNzZnVsbHlcIilcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgc2V0dGluZ3M6XCIsIGVycm9yKVxuICAgIH0pXG59XG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIGFsbCBpbnB1dHNcbmxvZ0xpbWl0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICBwYW5lbFNldHRpbmdzLmxvZ0xpbWl0ID0gcGFyc2VJbnQoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLCAxMClcbiAgc2F2ZVNldHRpbmdzKClcbn0pXG5cbnF1ZXJ5TGltaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gIHBhbmVsU2V0dGluZ3MucXVlcnlMaW1pdCA9IHBhcnNlSW50KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSwgMTApXG4gIHNhdmVTZXR0aW5ncygpXG59KVxuXG5zdHJpbmdTaXplTGltaXRJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gIHBhbmVsU2V0dGluZ3Muc3RyaW5nU2l6ZUxpbWl0ID0gcGFyc2VJbnQoXG4gICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLFxuICAgIDEwXG4gIClcbiAgc2F2ZVNldHRpbmdzKClcbn0pXG5cbnNob3dSZXF1ZXN0SGVhZGVyc0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgcGFuZWxTZXR0aW5ncy5zaG93UmVxdWVzdEhlYWRlcnMgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZFxuICBzYXZlU2V0dGluZ3MoKVxufSlcblxuc2hvd1Jlc3BvbnNlSGVhZGVyc0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgcGFuZWxTZXR0aW5ncy5zaG93UmVzcG9uc2VIZWFkZXJzID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWRcbiAgc2F2ZVNldHRpbmdzKClcbn0pXG5cbm1heExvZ1NpemVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gIHBhbmVsU2V0dGluZ3MubWF4TG9nU2l6ZSA9IHBhcnNlSW50KChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSwgMTApXG4gIHNhdmVTZXR0aW5ncygpXG59KVxuXG5zY3JlZW5zaG90UGF0aElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgcGFuZWxTZXR0aW5ncy5zY3JlZW5zaG90UGF0aCA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxuICBzYXZlU2V0dGluZ3MoKVxufSlcblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3Igc2VydmVyIHNldHRpbmdzXG5zZXJ2ZXJIb3N0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICBwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWVcbiAgc2F2ZVNldHRpbmdzKClcbiAgLy8gQXV0b21hdGljYWxseSB0ZXN0IGNvbm5lY3Rpb24gd2hlbiBob3N0IGlzIGNoYW5nZWRcbiAgdGVzdENvbm5lY3Rpb24ocGFuZWxTZXR0aW5ncy5zZXJ2ZXJIb3N0LCBwYW5lbFNldHRpbmdzLnNlcnZlclBvcnQpXG59KVxuXG5zZXJ2ZXJQb3J0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICBwYW5lbFNldHRpbmdzLnNlcnZlclBvcnQgPSBwYXJzZUludCgoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUsIDEwKVxuICBzYXZlU2V0dGluZ3MoKVxuICAvLyBBdXRvbWF0aWNhbGx5IHRlc3QgY29ubmVjdGlvbiB3aGVuIHBvcnQgaXMgY2hhbmdlZFxuICB0ZXN0Q29ubmVjdGlvbihwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QsIHBhbmVsU2V0dGluZ3Muc2VydmVyUG9ydClcbn0pXG5cbi8vIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgYXV0by1wYXN0ZSBjaGVja2JveFxuYWxsb3dBdXRvUGFzdGVDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gIHBhbmVsU2V0dGluZ3MuYWxsb3dBdXRvUGFzdGUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZFxuICBzYXZlU2V0dGluZ3MoKVxufSlcblxuLy8gRnVuY3Rpb24gdG8gY2FuY2VsIGFueSBvbmdvaW5nIGRpc2NvdmVyeSBvcGVyYXRpb25zXG5mdW5jdGlvbiBjYW5jZWxPbmdvaW5nRGlzY292ZXJ5KCkge1xuICBpZiAoaXNEaXNjb3ZlcnlJblByb2dyZXNzKSB7XG4gICAgY29uc29sZS5sb2coXCJDYW5jZWxsaW5nIG9uZ29pbmcgZGlzY292ZXJ5IG9wZXJhdGlvblwiKVxuXG4gICAgLy8gQWJvcnQgYW55IGZldGNoIHJlcXVlc3RzIGluIHByb2dyZXNzXG4gICAgaWYgKGRpc2NvdmVyeUNvbnRyb2xsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRpc2NvdmVyeUNvbnRyb2xsZXIuYWJvcnQoKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGFib3J0aW5nIGRpc2NvdmVyeSBjb250cm9sbGVyOlwiLCBlcnJvcilcbiAgICAgIH1cbiAgICAgIGRpc2NvdmVyeUNvbnRyb2xsZXIgPSBudWxsXG4gICAgfVxuXG4gICAgLy8gUmVzZXQgdGhlIGRpc2NvdmVyeSBzdGF0dXNcbiAgICBpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgLy8gVXBkYXRlIFVJIHRvIGluZGljYXRlIHRoZSBvcGVyYXRpb24gd2FzIGNhbmNlbGxlZFxuICAgIGlmIChcbiAgICAgIHN0YXR1c1RleHQgJiZcbiAgICAgIGNvbm5lY3Rpb25TdGF0dXNEaXYgJiZcbiAgICAgIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiXG4gICAgKSB7XG4gICAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gXCJTZXJ2ZXIgZGlzY292ZXJ5IG9wZXJhdGlvbiBjYW5jZWxsZWRcIlxuICAgIH1cblxuICAgIC8vIENsZWFyIGFueSBwZW5kaW5nIG5ldHdvcmsgdGltZW91dHMgdGhhdCBtaWdodCBiZSBwYXJ0IG9mIHRoZSBkaXNjb3ZlcnkgcHJvY2Vzc1xuICAgIGNsZWFyVGltZW91dChyZWNvbm5lY3RBdHRlbXB0VGltZW91dClcbiAgICByZWNvbm5lY3RBdHRlbXB0VGltZW91dCA9IG51bGxcblxuICAgIGNvbnNvbGUubG9nKFwiRGlzY292ZXJ5IG9wZXJhdGlvbiBjYW5jZWxsZWQgc3VjY2Vzc2Z1bGx5XCIpXG4gIH1cbn1cblxuLy8gVGVzdCBzZXJ2ZXIgY29ubmVjdGlvblxudGVzdENvbm5lY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGRpc2NvdmVyeSBvcGVyYXRpb25zIGJlZm9yZSB0ZXN0aW5nXG4gIGNhbmNlbE9uZ29pbmdEaXNjb3ZlcnkoKVxuICBhd2FpdCB0ZXN0Q29ubmVjdGlvbihwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QsIHBhbmVsU2V0dGluZ3Muc2VydmVyUG9ydClcbn0pXG5cbi8vIEZ1bmN0aW9uIHRvIHRlc3Qgc2VydmVyIGNvbm5lY3Rpb25cbmFzeW5jIGZ1bmN0aW9uIHRlc3RDb25uZWN0aW9uKGhvc3QsIHBvcnQpIHtcbiAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGRpc2NvdmVyeSBvcGVyYXRpb25zXG4gIGNhbmNlbE9uZ29pbmdEaXNjb3ZlcnkoKVxuXG4gIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICBzdGF0dXNJY29uLmNsYXNzTmFtZSA9IFwic3RhdHVzLWluZGljYXRvclwiXG4gIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBcIlRlc3RpbmcgY29ubmVjdGlvbi4uLlwiXG5cbiAgdHJ5IHtcbiAgICAvLyBVc2UgdGhlIGlkZW50aXR5IGVuZHBvaW50IGluc3RlYWQgb2YgLnBvcnQgZm9yIG1vcmUgcmVsaWFibGUgdmFsaWRhdGlvblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vLmlkZW50aXR5YCwge1xuICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDUwMDApIC8vIDUgc2Vjb25kIHRpbWVvdXRcbiAgICB9KVxuXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgICAvLyBWZXJpZnkgdGhpcyBpcyBhY3R1YWxseSBvdXIgc2VydmVyIGJ5IGNoZWNraW5nIHRoZSBzaWduYXR1cmVcbiAgICAgIGlmIChpZGVudGl0eS5zaWduYXR1cmUgIT09IFwibWNwLWJyb3dzZXItY29ubmVjdG9yLTI0eDdcIikge1xuICAgICAgICBzdGF0dXNJY29uLmNsYXNzTmFtZSA9IFwic3RhdHVzLWluZGljYXRvciBzdGF0dXMtZGlzY29ubmVjdGVkXCJcbiAgICAgICAgc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IGBDb25uZWN0aW9uIGZhaWxlZDogRm91bmQgYSBzZXJ2ZXIgYXQgJHtob3N0fToke3BvcnR9IGJ1dCBpdCdzIG5vdCB0aGUgQnJvd3NlciBUb29scyBzZXJ2ZXJgXG4gICAgICAgIHNlcnZlckNvbm5lY3RlZCA9IGZhbHNlXG4gICAgICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIoZmFsc2UsIG51bGwpXG4gICAgICAgIHNjaGVkdWxlUmVjb25uZWN0QXR0ZW1wdCgpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBzdGF0dXNJY29uLmNsYXNzTmFtZSA9IFwic3RhdHVzLWluZGljYXRvciBzdGF0dXMtY29ubmVjdGVkXCJcbiAgICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBgQ29ubmVjdGVkIHN1Y2Nlc3NmdWxseSB0byAke2lkZW50aXR5Lm5hbWV9IHYke2lkZW50aXR5LnZlcnNpb259IGF0ICR7aG9zdH06JHtwb3J0fWBcbiAgICAgIHNlcnZlckNvbm5lY3RlZCA9IHRydWVcbiAgICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIodHJ1ZSwgaWRlbnRpdHkpXG5cbiAgICAgIC8vIENsZWFyIGFueSBzY2hlZHVsZWQgcmVjb25uZWN0IGF0dGVtcHRzXG4gICAgICBpZiAocmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KVxuICAgICAgICByZWNvbm5lY3RBdHRlbXB0VGltZW91dCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNldHRpbmdzIGlmIGRpZmZlcmVudCBwb3J0IHdhcyBkaXNjb3ZlcmVkXG4gICAgICBpZiAocGFyc2VJbnQoaWRlbnRpdHkucG9ydCwgMTApICE9PSBwb3J0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBEZXRlY3RlZCBkaWZmZXJlbnQgcG9ydDogJHtpZGVudGl0eS5wb3J0fWApXG4gICAgICAgIHBhbmVsU2V0dGluZ3Muc2VydmVyUG9ydCA9IHBhcnNlSW50KGlkZW50aXR5LnBvcnQsIDEwKVxuICAgICAgICBzZXJ2ZXJQb3J0SW5wdXQudmFsdWUgPSBwYW5lbFNldHRpbmdzLnNlcnZlclBvcnQudG9TdHJpbmcoKVxuICAgICAgICBzYXZlU2V0dGluZ3MoKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0dXNJY29uLmNsYXNzTmFtZSA9IFwic3RhdHVzLWluZGljYXRvciBzdGF0dXMtZGlzY29ubmVjdGVkXCJcbiAgICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBgQ29ubmVjdGlvbiBmYWlsZWQ6IFNlcnZlciByZXR1cm5lZCAke3Jlc3BvbnNlLnN0YXR1c31gXG4gICAgICBzZXJ2ZXJDb25uZWN0ZWQgPSBmYWxzZVxuXG4gICAgICAvLyBNYWtlIHN1cmUgaXNEaXNjb3ZlcnlJblByb2dyZXNzIGlzIGZhbHNlIHNvIHRoZSByZWNvbm5lY3QgYnV0dG9uIHdpbGwgc2hvd1xuICAgICAgaXNEaXNjb3ZlcnlJblByb2dyZXNzID0gZmFsc2VcblxuICAgICAgLy8gTm93IHVwZGF0ZSB0aGUgY29ubmVjdGlvbiBiYW5uZXIgdG8gc2hvdyB0aGUgcmVjb25uZWN0IGJ1dHRvblxuICAgICAgdXBkYXRlQ29ubmVjdGlvbkJhbm5lcihmYWxzZSwgbnVsbClcbiAgICAgIHNjaGVkdWxlUmVjb25uZWN0QXR0ZW1wdCgpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3RhdHVzSWNvbi5jbGFzc05hbWUgPSBcInN0YXR1cy1pbmRpY2F0b3Igc3RhdHVzLWRpc2Nvbm5lY3RlZFwiXG4gICAgc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IGBDb25uZWN0aW9uIGZhaWxlZDogJHtlcnJvci5tZXNzYWdlfWBcbiAgICBzZXJ2ZXJDb25uZWN0ZWQgPSBmYWxzZVxuXG4gICAgLy8gTWFrZSBzdXJlIGlzRGlzY292ZXJ5SW5Qcm9ncmVzcyBpcyBmYWxzZSBzbyB0aGUgcmVjb25uZWN0IGJ1dHRvbiB3aWxsIHNob3dcbiAgICBpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgLy8gTm93IHVwZGF0ZSB0aGUgY29ubmVjdGlvbiBiYW5uZXIgdG8gc2hvdyB0aGUgcmVjb25uZWN0IGJ1dHRvblxuICAgIHVwZGF0ZUNvbm5lY3Rpb25CYW5uZXIoZmFsc2UsIG51bGwpXG4gICAgc2NoZWR1bGVSZWNvbm5lY3RBdHRlbXB0KClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vLyBTY2hlZHVsZSBhIHJlY29ubmVjdCBhdHRlbXB0IGlmIHNlcnZlciBpc24ndCBmb3VuZFxuZnVuY3Rpb24gc2NoZWR1bGVSZWNvbm5lY3RBdHRlbXB0KCkge1xuICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgcmVjb25uZWN0IHRpbWVvdXRcbiAgaWYgKHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KVxuICB9XG5cbiAgLy8gU2NoZWR1bGUgYSByZWNvbm5lY3QgYXR0ZW1wdCBpbiAzMCBzZWNvbmRzXG4gIHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJBdHRlbXB0aW5nIHRvIHJlY29ubmVjdCB0byBzZXJ2ZXIuLi5cIilcbiAgICAvLyBPbmx5IHNob3cgbWluaW1hbCBVSSBkdXJpbmcgYXV0by1yZWNvbm5lY3RcbiAgICBkaXNjb3ZlclNlcnZlcih0cnVlKVxuICB9LCAzMDAwMCkgLy8gMzAgc2Vjb25kc1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gdHJ5IGNvbm5lY3RpbmcgdG8gYSBzZXJ2ZXJcbmFzeW5jIGZ1bmN0aW9uIHRyeVNlcnZlckNvbm5lY3Rpb24oaG9zdCwgcG9ydCkge1xuICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgZGlzY292ZXJ5IG9wZXJhdGlvbnNcbiAgY2FuY2VsT25nb2luZ0Rpc2NvdmVyeSgpXG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGRpc2NvdmVyeSBwcm9jZXNzIHdhcyBjYW5jZWxsZWRcbiAgaWYgKCFpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIENyZWF0ZSBhIGxvY2FsIHRpbWVvdXQgdGhhdCB3b24ndCBhYm9ydCB0aGUgZW50aXJlIGRpc2NvdmVyeSBwcm9jZXNzXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29udHJvbGxlci5hYm9ydCgpXG4gIH0sIDUwMCkgLy8gNTAwbXMgdGltZW91dCBmb3IgZWFjaCBjb25uZWN0aW9uIGF0dGVtcHRcblxuICB0cnkge1xuICAgIC8vIENoZWNrIGlmIHRoZSBkaXNjb3ZlcnkgcHJvY2VzcyB3YXMgY2FuY2VsbGVkXG4gICAgaWYgKCFpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIFVzZSBpZGVudGl0eSBlbmRwb2ludCBmb3IgdmFsaWRhdGlvblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vLmlkZW50aXR5YCwge1xuICAgICAgLy8gVXNlIGEgbG9jYWwgY29udHJvbGxlciBmb3IgdGhpcyBzcGVjaWZpYyByZXF1ZXN0IHRpbWVvdXRcbiAgICAgIC8vIGJ1dCBhbHNvIHJlc3BlY3QgdGhlIGdsb2JhbCBkaXNjb3ZlcnkgY2FuY2VsbGF0aW9uXG4gICAgICBzaWduYWw6IGRpc2NvdmVyeUNvbnRyb2xsZXJcbiAgICAgICAgPyBBYm9ydFNpZ25hbC5hbnkoW2NvbnRyb2xsZXIuc2lnbmFsLCBkaXNjb3ZlcnlDb250cm9sbGVyLnNpZ25hbF0pXG4gICAgICAgIDogY29udHJvbGxlci5zaWduYWxcbiAgICB9KVxuXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZClcblxuICAgIC8vIENoZWNrIGFnYWluIGlmIGRpc2NvdmVyeSB3YXMgY2FuY2VsbGVkIGR1cmluZyB0aGUgZmV0Y2hcbiAgICBpZiAoIWlzRGlzY292ZXJ5SW5Qcm9ncmVzcykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgICAvLyBWZXJpZnkgdGhpcyBpcyBhY3R1YWxseSBvdXIgc2VydmVyIGJ5IGNoZWNraW5nIHRoZSBzaWduYXR1cmVcbiAgICAgIGlmIChpZGVudGl0eS5zaWduYXR1cmUgIT09IFwibWNwLWJyb3dzZXItY29ubmVjdG9yLTI0eDdcIikge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgRm91bmQgYSBzZXJ2ZXIgYXQgJHtob3N0fToke3BvcnR9IGJ1dCBpdCdzIG5vdCB0aGUgQnJvd3NlciBUb29scyBzZXJ2ZXJgXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKGBTdWNjZXNzZnVsbHkgZm91bmQgc2VydmVyIGF0ICR7aG9zdH06JHtwb3J0fWApXG5cbiAgICAgIC8vIFVwZGF0ZSBzZXR0aW5ncyB3aXRoIGRpc2NvdmVyZWQgc2VydmVyXG4gICAgICBwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QgPSBob3N0XG4gICAgICBwYW5lbFNldHRpbmdzLnNlcnZlclBvcnQgPSBwYXJzZUludChpZGVudGl0eS5wb3J0LCAxMClcbiAgICAgIHNlcnZlckhvc3RJbnB1dC52YWx1ZSA9IHBhbmVsU2V0dGluZ3Muc2VydmVySG9zdFxuICAgICAgc2VydmVyUG9ydElucHV0LnZhbHVlID0gcGFuZWxTZXR0aW5ncy5zZXJ2ZXJQb3J0LnRvU3RyaW5nKClcbiAgICAgIHNhdmVTZXR0aW5ncygpXG5cbiAgICAgIHN0YXR1c0ljb24uY2xhc3NOYW1lID0gXCJzdGF0dXMtaW5kaWNhdG9yIHN0YXR1cy1jb25uZWN0ZWRcIlxuICAgICAgc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IGBEaXNjb3ZlcmVkICR7aWRlbnRpdHkubmFtZX0gdiR7aWRlbnRpdHkudmVyc2lvbn0gYXQgJHtob3N0fToke2lkZW50aXR5LnBvcnR9YFxuXG4gICAgICAvLyBVcGRhdGUgY29ubmVjdGlvbiBiYW5uZXIgd2l0aCBzZXJ2ZXIgaW5mb1xuICAgICAgdXBkYXRlQ29ubmVjdGlvbkJhbm5lcih0cnVlLCBpZGVudGl0eSlcblxuICAgICAgLy8gVXBkYXRlIGNvbm5lY3Rpb24gc3RhdHVzXG4gICAgICBzZXJ2ZXJDb25uZWN0ZWQgPSB0cnVlXG5cbiAgICAgIC8vIENsZWFyIGFueSBzY2hlZHVsZWQgcmVjb25uZWN0IGF0dGVtcHRzXG4gICAgICBpZiAocmVjb25uZWN0QXR0ZW1wdFRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlY29ubmVjdEF0dGVtcHRUaW1lb3V0KVxuICAgICAgICByZWNvbm5lY3RBdHRlbXB0VGltZW91dCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gRW5kIHRoZSBkaXNjb3ZlcnkgcHJvY2Vzc1xuICAgICAgaXNEaXNjb3ZlcnlJblByb2dyZXNzID0gZmFsc2VcblxuICAgICAgLy8gU3VjY2Vzc2Z1bGx5IGZvdW5kIHNlcnZlclxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBJZ25vcmUgY29ubmVjdGlvbiBlcnJvcnMgZHVyaW5nIGRpc2NvdmVyeVxuICAgIGNvbnNvbGUubG9nKGBDb25uZWN0aW9uIGVycm9yIGZvciAke2hvc3R9OiR7cG9ydH06ICR7ZXJyb3IubWVzc2FnZX1gKVxuXG4gICAgLy8gQ2hlY2sgaWYgaXQgd2FzIGFuIGFib3J0IChjYW5jZWxsYXRpb24pXG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAvLyBDaGVjayBpZiB0aGlzIHdhcyBkdWUgdG8gdGhlIGdsb2JhbCBkaXNjb3ZlcnkgY2FuY2VsbGF0aW9uXG4gICAgICBpZiAoZGlzY292ZXJ5Q29udHJvbGxlciAmJiBkaXNjb3ZlcnlDb250cm9sbGVyLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiBhdHRlbXB0IGFib3J0ZWQgYnkgZ2xvYmFsIGNhbmNlbGxhdGlvblwiKVxuICAgICAgICByZXR1cm4gXCJhYm9ydGVkXCJcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSBmaW5hbGx5IHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dElkKVxuICB9XG59XG5cbi8vIFNlcnZlciBkaXNjb3ZlcnkgZnVuY3Rpb24gKGV4dHJhY3RlZCB0byBiZSByZXVzYWJsZSlcbmFzeW5jIGZ1bmN0aW9uIGRpc2NvdmVyU2VydmVyKHF1aWV0TW9kZSA9IGZhbHNlKSB7XG4gIC8vIENhbmNlbCBhbnkgb25nb2luZyBkaXNjb3Zlcnkgb3BlcmF0aW9ucyBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXG4gIGNhbmNlbE9uZ29pbmdEaXNjb3ZlcnkoKVxuXG4gIC8vIENyZWF0ZSBhIG5ldyBBYm9ydENvbnRyb2xsZXIgZm9yIHRoaXMgZGlzY292ZXJ5IHByb2Nlc3NcbiAgZGlzY292ZXJ5Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICBpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MgPSB0cnVlXG5cbiAgLy8gSW4gcXVpZXQgbW9kZSwgd2UgZG9uJ3Qgc2hvdyB0aGUgY29ubmVjdGlvbiBzdGF0dXMgdW50aWwgd2UgZWl0aGVyIHN1Y2NlZWQgb3IgZmFpbCBjb21wbGV0ZWx5XG4gIGlmICghcXVpZXRNb2RlKSB7XG4gICAgY29ubmVjdGlvblN0YXR1c0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgc3RhdHVzSWNvbi5jbGFzc05hbWUgPSBcInN0YXR1cy1pbmRpY2F0b3JcIlxuICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBcIkRpc2NvdmVyaW5nIHNlcnZlci4uLlwiXG4gIH1cblxuICAvLyBBbHdheXMgdXBkYXRlIHRoZSBjb25uZWN0aW9uIGJhbm5lclxuICB1cGRhdGVDb25uZWN0aW9uQmFubmVyKGZhbHNlLCBudWxsKVxuXG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJTdGFydGluZyBzZXJ2ZXIgZGlzY292ZXJ5IHByb2Nlc3NcIilcblxuICAgIC8vIEFkZCBhbiBlYXJseSBjYW5jZWxsYXRpb24gbGlzdGVuZXIgdGhhdCB3aWxsIHJlc3BvbmQgdG8gcGFnZSBuYXZpZ2F0aW9uL3JlZnJlc2hcbiAgICBkaXNjb3ZlcnlDb250cm9sbGVyLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgYWJvcnRlZCB2aWEgQWJvcnRDb250cm9sbGVyIHNpZ25hbFwiKVxuICAgICAgaXNEaXNjb3ZlcnlJblByb2dyZXNzID0gZmFsc2VcbiAgICB9KVxuXG4gICAgLy8gQ29tbW9uIElQcyB0byB0cnkgKGluIG9yZGVyIG9mIGxpa2VsaWhvb2QpXG4gICAgY29uc3QgaG9zdHMgPSBbXCJsb2NhbGhvc3RcIiwgXCIxMjcuMC4wLjFcIl1cblxuICAgIC8vIEFkZCB0aGUgY3VycmVudCBjb25maWd1cmVkIGhvc3QgaWYgaXQncyBub3QgYWxyZWFkeSBpbiB0aGUgbGlzdFxuICAgIGlmIChcbiAgICAgICFob3N0cy5pbmNsdWRlcyhwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QpICYmXG4gICAgICBwYW5lbFNldHRpbmdzLnNlcnZlckhvc3QgIT09IFwiMC4wLjAuMFwiXG4gICAgKSB7XG4gICAgICBob3N0cy51bnNoaWZ0KHBhbmVsU2V0dGluZ3Muc2VydmVySG9zdCkgLy8gUHV0IGF0IHRoZSBiZWdpbm5pbmcgZm9yIHByaW9yaXR5XG4gICAgfVxuXG4gICAgLy8gQWRkIGNvbW1vbiBsb2NhbCBuZXR3b3JrIElQc1xuICAgIGNvbnN0IGNvbW1vbkxvY2FsSXBzID0gW1wiMTkyLjE2OC4wLlwiLCBcIjE5Mi4xNjguMS5cIiwgXCIxMC4wLjAuXCIsIFwiMTAuMC4xLlwiXVxuICAgIGZvciAoY29uc3QgcHJlZml4IG9mIGNvbW1vbkxvY2FsSXBzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgLy8gUmVkdWNlZCBmcm9tIDEwIHRvIDUgZm9yIGVmZmljaWVuY3lcbiAgICAgICAgaG9zdHMucHVzaChgJHtwcmVmaXh9JHtpfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgcG9ydCBsaXN0IGluIGEgc21hcnQgb3JkZXI6XG4gICAgLy8gMS4gU3RhcnQgd2l0aCBjdXJyZW50IGNvbmZpZ3VyZWQgcG9ydFxuICAgIC8vIDIuIEFkZCBkZWZhdWx0IHBvcnQgKDMwMjUpXG4gICAgLy8gMy4gQWRkIHNlcXVlbnRpYWwgcG9ydHMgYXJvdW5kIHRoZSBkZWZhdWx0IChmb3IgZmFsbGJhY2sgZGV0ZWN0aW9uKVxuICAgIGNvbnN0IHBvcnRzID0gW11cblxuICAgIC8vIEN1cnJlbnQgY29uZmlndXJlZCBwb3J0IGdldHMgaGlnaGVzdCBwcmlvcml0eVxuICAgIGNvbnN0IGNvbmZpZ3VyZWRQb3J0ID0gcGFuZWxTZXR0aW5ncy5zZXJ2ZXJQb3J0XG4gICAgcG9ydHMucHVzaChjb25maWd1cmVkUG9ydClcblxuICAgIC8vIEFkZCBkZWZhdWx0IHBvcnQgaWYgaXQncyBub3QgdGhlIHNhbWUgYXMgY29uZmlndXJlZFxuICAgIGlmIChjb25maWd1cmVkUG9ydCAhPT0gMzAyNSkge1xuICAgICAgcG9ydHMucHVzaCgzMDI1KVxuICAgIH1cblxuICAgIC8vIEFkZCBzZXF1ZW50aWFsIGZhbGxiYWNrIHBvcnRzIChmcm9tIGRlZmF1bHQgdXAgdG8gZGVmYXVsdCsxMClcbiAgICBmb3IgKGxldCBwID0gMzAyNjsgcCA8PSAzMDM1OyBwKyspIHtcbiAgICAgIGlmIChwICE9PSBjb25maWd1cmVkUG9ydCkge1xuICAgICAgICAvLyBBdm9pZCBkdXBsaWNhdGVzXG4gICAgICAgIHBvcnRzLnB1c2gocClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZHVwbGljYXRlc1xuICAgIGNvbnN0IHVuaXF1ZVBvcnRzID0gWy4uLm5ldyBTZXQocG9ydHMpXVxuICAgIGNvbnNvbGUubG9nKFwiV2lsbCBjaGVjayBwb3J0czpcIiwgdW5pcXVlUG9ydHMpXG5cbiAgICAvLyBDcmVhdGUgYSBwcm9ncmVzcyBpbmRpY2F0b3JcbiAgICBsZXQgcHJvZ3Jlc3MgPSAwXG4gICAgbGV0IHRvdGFsQ2hlY2tlZCA9IDBcblxuICAgIC8vIFBoYXNlIDE6IFRyeSB0aGUgbW9zdCBsaWtlbHkgY29tYmluYXRpb25zIGZpcnN0IChjdXJyZW50IGhvc3Q6cG9ydCBhbmQgbG9jYWxob3N0IHZhcmlhbnRzKVxuICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgUGhhc2UgMTogUXVpY2sgY2hlY2sgb2YgaGlnaC1wcmlvcml0eSBob3N0cy9wb3J0c1wiKVxuICAgIGNvbnN0IHByaW9yaXR5SG9zdHMgPSBob3N0cy5zbGljZSgwLCAyKSAvLyBGaXJzdCB0d28gaG9zdHMgYXJlIGhpZ2hlc3QgcHJpb3JpdHlcbiAgICBmb3IgKGNvbnN0IGhvc3Qgb2YgcHJpb3JpdHlIb3N0cykge1xuICAgICAgLy8gQ2hlY2sgaWYgZGlzY292ZXJ5IHdhcyBjYW5jZWxsZWRcbiAgICAgIGlmICghaXNEaXNjb3ZlcnlJblByb2dyZXNzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGlzY292ZXJ5IHByb2Nlc3Mgd2FzIGNhbmNlbGxlZCBkdXJpbmcgUGhhc2UgMVwiKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gVHJ5IGNvbmZpZ3VyZWQgcG9ydCBmaXJzdFxuICAgICAgdG90YWxDaGVja2VkKytcbiAgICAgIGlmICghcXVpZXRNb2RlKSB7XG4gICAgICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBgQ2hlY2tpbmcgJHtob3N0fToke3VuaXF1ZVBvcnRzWzBdfS4uLmBcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGBDaGVja2luZyAke2hvc3R9OiR7dW5pcXVlUG9ydHNbMF19Li4uYClcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyeVNlcnZlckNvbm5lY3Rpb24oaG9zdCwgdW5pcXVlUG9ydHNbMF0pXG5cbiAgICAgIC8vIENoZWNrIGZvciBjYW5jZWxsYXRpb24gb3Igc3VjY2Vzc1xuICAgICAgaWYgKHJlc3VsdCA9PT0gXCJhYm9ydGVkXCIgfHwgIWlzRGlzY292ZXJ5SW5Qcm9ncmVzcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRpc2NvdmVyeSBwcm9jZXNzIHdhcyBjYW5jZWxsZWRcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZlciBmb3VuZCBpbiBwcmlvcml0eSBjaGVja1wiKVxuICAgICAgICBpZiAocXVpZXRNb2RlKSB7XG4gICAgICAgICAgLy8gSW4gcXVpZXQgbW9kZSwgb25seSBzaG93IHRoZSBjb25uZWN0aW9uIGJhbm5lciBidXQgaGlkZSB0aGUgc3RhdHVzIGJveFxuICAgICAgICAgIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWUgLy8gU3VjY2Vzc2Z1bGx5IGZvdW5kIHNlcnZlclxuICAgICAgfVxuXG4gICAgICAvLyBUaGVuIHRyeSBkZWZhdWx0IHBvcnQgaWYgZGlmZmVyZW50XG4gICAgICBpZiAodW5pcXVlUG9ydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBDaGVjayBpZiBkaXNjb3Zlcnkgd2FzIGNhbmNlbGxlZFxuICAgICAgICBpZiAoIWlzRGlzY292ZXJ5SW5Qcm9ncmVzcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzY292ZXJ5IHByb2Nlc3Mgd2FzIGNhbmNlbGxlZFwiKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgdG90YWxDaGVja2VkKytcbiAgICAgICAgaWYgKCFxdWlldE1vZGUpIHtcbiAgICAgICAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gYENoZWNraW5nICR7aG9zdH06JHt1bmlxdWVQb3J0c1sxXX0uLi5gXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYENoZWNraW5nICR7aG9zdH06JHt1bmlxdWVQb3J0c1sxXX0uLi5gKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cnlTZXJ2ZXJDb25uZWN0aW9uKGhvc3QsIHVuaXF1ZVBvcnRzWzFdKVxuXG4gICAgICAgIC8vIENoZWNrIGZvciBjYW5jZWxsYXRpb24gb3Igc3VjY2Vzc1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcImFib3J0ZWRcIiB8fCAhaXNEaXNjb3ZlcnlJblByb2dyZXNzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgcHJvY2VzcyB3YXMgY2FuY2VsbGVkXCIpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTZXJ2ZXIgZm91bmQgaW4gcHJpb3JpdHkgY2hlY2tcIilcbiAgICAgICAgICBpZiAocXVpZXRNb2RlKSB7XG4gICAgICAgICAgICAvLyBJbiBxdWlldCBtb2RlLCBvbmx5IHNob3cgdGhlIGNvbm5lY3Rpb24gYmFubmVyIGJ1dCBoaWRlIHRoZSBzdGF0dXMgYm94XG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdHVzRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZSAvLyBTdWNjZXNzZnVsbHkgZm91bmQgc2VydmVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSdyZSBpbiBxdWlldCBtb2RlIGFuZCB0aGUgcXVpY2sgY2hlY2tzIGZhaWxlZCwgc2hvdyB0aGUgc3RhdHVzIG5vd1xuICAgIC8vIGFzIHdlIG1vdmUgaW50byBtb3JlIGludGVuc2l2ZSBzY2FubmluZ1xuICAgIGlmIChxdWlldE1vZGUpIHtcbiAgICAgIGNvbm5lY3Rpb25TdGF0dXNEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgc3RhdHVzSWNvbi5jbGFzc05hbWUgPSBcInN0YXR1cy1pbmRpY2F0b3JcIlxuICAgICAgc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IFwiU2VhcmNoaW5nIGZvciBzZXJ2ZXIuLi5cIlxuICAgIH1cblxuICAgIC8vIFBoYXNlIDI6IFN5c3RlbWF0aWMgc2NhbiBvZiBhbGwgY29tYmluYXRpb25zXG4gICAgY29uc3QgdG90YWxBdHRlbXB0cyA9IGhvc3RzLmxlbmd0aCAqIHVuaXF1ZVBvcnRzLmxlbmd0aFxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFN0YXJ0aW5nIFBoYXNlIDI6IEZ1bGwgc2NhbiAoJHt0b3RhbEF0dGVtcHRzfSB0b3RhbCBjb21iaW5hdGlvbnMpYFxuICAgIClcbiAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gYFF1aWNrIGNoZWNrIGZhaWxlZC4gU3RhcnRpbmcgZnVsbCBzY2FuICgke3RvdGFsQ2hlY2tlZH0vJHt0b3RhbEF0dGVtcHRzfSkuLi5gXG5cbiAgICAvLyBGaXJzdCwgc2NhbiB0aHJvdWdoIGFsbCBwb3J0cyBvbiBsb2NhbGhvc3QvMTI3LjAuMC4xIHRvIGZpbmQgZmFsbGJhY2sgcG9ydHMgcXVpY2tseVxuICAgIGNvbnN0IGxvY2FsSG9zdHMgPSBbXCJsb2NhbGhvc3RcIiwgXCIxMjcuMC4wLjFcIl1cbiAgICBmb3IgKGNvbnN0IGhvc3Qgb2YgbG9jYWxIb3N0cykge1xuICAgICAgLy8gU2tpcCB0aGUgZmlyc3QgdHdvIHBvcnRzIG9uIGxvY2FsaG9zdCBpZiB3ZSBhbHJlYWR5IGNoZWNrZWQgdGhlbSBpbiBQaGFzZSAxXG4gICAgICBjb25zdCBwb3J0c1RvQ2hlY2sgPSB1bmlxdWVQb3J0cy5zbGljZShcbiAgICAgICAgbG9jYWxIb3N0cy5pbmNsdWRlcyhob3N0KSAmJiBwcmlvcml0eUhvc3RzLmluY2x1ZGVzKGhvc3QpID8gMiA6IDBcbiAgICAgIClcblxuICAgICAgZm9yIChjb25zdCBwb3J0IG9mIHBvcnRzVG9DaGVjaykge1xuICAgICAgICAvLyBDaGVjayBpZiBkaXNjb3Zlcnkgd2FzIGNhbmNlbGxlZFxuICAgICAgICBpZiAoIWlzRGlzY292ZXJ5SW5Qcm9ncmVzcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlzY292ZXJ5IHByb2Nlc3Mgd2FzIGNhbmNlbGxlZCBkdXJpbmcgbG9jYWwgcG9ydCBzY2FuXCIpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgICAgICAgcHJvZ3Jlc3MrK1xuICAgICAgICB0b3RhbENoZWNrZWQrK1xuICAgICAgICBzdGF0dXNUZXh0LnRleHRDb250ZW50ID0gYFNjYW5uaW5nIGxvY2FsIHBvcnRzLi4uICgke3RvdGFsQ2hlY2tlZH0vJHt0b3RhbEF0dGVtcHRzfSkgLSBUcnlpbmcgJHtob3N0fToke3BvcnR9YFxuICAgICAgICBjb25zb2xlLmxvZyhgQ2hlY2tpbmcgJHtob3N0fToke3BvcnR9Li4uYClcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJ5U2VydmVyQ29ubmVjdGlvbihob3N0LCBwb3J0KVxuXG4gICAgICAgIC8vIENoZWNrIGZvciBjYW5jZWxsYXRpb24gb3Igc3VjY2Vzc1xuICAgICAgICBpZiAocmVzdWx0ID09PSBcImFib3J0ZWRcIiB8fCAhaXNEaXNjb3ZlcnlJblByb2dyZXNzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgcHJvY2VzcyB3YXMgY2FuY2VsbGVkXCIpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFNlcnZlciBmb3VuZCBhdCAke2hvc3R9OiR7cG9ydH1gKVxuICAgICAgICAgIHJldHVybiB0cnVlIC8vIFN1Y2Nlc3NmdWxseSBmb3VuZCBzZXJ2ZXJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZW4gc2NhbiBhbGwgdGhlIHJlbWFpbmluZyBob3N0L3BvcnQgY29tYmluYXRpb25zXG4gICAgZm9yIChjb25zdCBob3N0IG9mIGhvc3RzKSB7XG4gICAgICAvLyBTa2lwIGhvc3RzIHdlIGFscmVhZHkgY2hlY2tlZFxuICAgICAgaWYgKGxvY2FsSG9zdHMuaW5jbHVkZXMoaG9zdCkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBwb3J0IG9mIHVuaXF1ZVBvcnRzKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGRpc2NvdmVyeSB3YXMgY2FuY2VsbGVkXG4gICAgICAgIGlmICghaXNEaXNjb3ZlcnlJblByb2dyZXNzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgcHJvY2VzcyB3YXMgY2FuY2VsbGVkIGR1cmluZyByZW1vdGUgc2NhblwiKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgICAgIHByb2dyZXNzKytcbiAgICAgICAgdG90YWxDaGVja2VkKytcbiAgICAgICAgc3RhdHVzVGV4dC50ZXh0Q29udGVudCA9IGBTY2FubmluZyByZW1vdGUgaG9zdHMuLi4gKCR7dG90YWxDaGVja2VkfS8ke3RvdGFsQXR0ZW1wdHN9KSAtIFRyeWluZyAke2hvc3R9OiR7cG9ydH1gXG4gICAgICAgIGNvbnNvbGUubG9nKGBDaGVja2luZyAke2hvc3R9OiR7cG9ydH0uLi5gKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cnlTZXJ2ZXJDb25uZWN0aW9uKGhvc3QsIHBvcnQpXG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIGNhbmNlbGxhdGlvbiBvciBzdWNjZXNzXG4gICAgICAgIGlmIChyZXN1bHQgPT09IFwiYWJvcnRlZFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgYWJvcnRlZCBkdXJpbmcgcmVtb3RlIHNjYW5cIilcbiAgICAgICAgICBicmVha1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIGZvdW5kIGR1cmluZyByZW1vdGUgc2NhblwiKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBEaXNjb3ZlcnkgcHJvY2VzcyBjb21wbGV0ZWQsIGNoZWNrZWQgJHt0b3RhbENoZWNrZWR9IGNvbWJpbmF0aW9ucywgbm8gc2VydmVyIGZvdW5kYFxuICAgIClcbiAgICAvLyBJZiB3ZSBnZXQgaGVyZSwgbm8gc2VydmVyIHdhcyBmb3VuZFxuICAgIHN0YXR1c0ljb24uY2xhc3NOYW1lID0gXCJzdGF0dXMtaW5kaWNhdG9yIHN0YXR1cy1kaXNjb25uZWN0ZWRcIlxuICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPVxuICAgICAgXCJObyBzZXJ2ZXIgZm91bmQuIFBsZWFzZSBjaGVjayBzZXJ2ZXIgaXMgcnVubmluZyBhbmQgdHJ5IGFnYWluLlwiXG5cbiAgICBzZXJ2ZXJDb25uZWN0ZWQgPSBmYWxzZVxuXG4gICAgLy8gRW5kIHRoZSBkaXNjb3ZlcnkgcHJvY2VzcyBmaXJzdCBiZWZvcmUgdXBkYXRpbmcgdGhlIGJhbm5lclxuICAgIGlzRGlzY292ZXJ5SW5Qcm9ncmVzcyA9IGZhbHNlXG5cbiAgICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gYmFubmVyIHRvIHNob3cgdGhlIHJlY29ubmVjdCBidXR0b25cbiAgICB1cGRhdGVDb25uZWN0aW9uQmFubmVyKGZhbHNlLCBudWxsKVxuXG4gICAgLy8gU2NoZWR1bGUgYSByZWNvbm5lY3QgYXR0ZW1wdFxuICAgIHNjaGVkdWxlUmVjb25uZWN0QXR0ZW1wdCgpXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIHNlcnZlciBkaXNjb3Zlcnk6XCIsIGVycm9yKVxuICAgIHN0YXR1c0ljb24uY2xhc3NOYW1lID0gXCJzdGF0dXMtaW5kaWNhdG9yIHN0YXR1cy1kaXNjb25uZWN0ZWRcIlxuICAgIHN0YXR1c1RleHQudGV4dENvbnRlbnQgPSBgRXJyb3IgZGlzY292ZXJpbmcgc2VydmVyOiAke2Vycm9yLm1lc3NhZ2V9YFxuXG4gICAgc2VydmVyQ29ubmVjdGVkID0gZmFsc2VcblxuICAgIC8vIEVuZCB0aGUgZGlzY292ZXJ5IHByb2Nlc3MgZmlyc3QgYmVmb3JlIHVwZGF0aW5nIHRoZSBiYW5uZXJcbiAgICBpc0Rpc2NvdmVyeUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gICAgLy8gVXBkYXRlIHRoZSBjb25uZWN0aW9uIGJhbm5lciB0byBzaG93IHRoZSByZWNvbm5lY3QgYnV0dG9uXG4gICAgdXBkYXRlQ29ubmVjdGlvbkJhbm5lcihmYWxzZSwgbnVsbClcblxuICAgIC8vIFNjaGVkdWxlIGEgcmVjb25uZWN0IGF0dGVtcHRcbiAgICBzY2hlZHVsZVJlY29ubmVjdEF0dGVtcHQoKVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZmluYWxseSB7XG4gICAgY29uc29sZS5sb2coXCJEaXNjb3ZlcnkgcHJvY2VzcyBmaW5pc2hlZFwiKVxuICAgIC8vIEFsd2F5cyBjbGVhbiB1cCwgZXZlbiBpZiB0aGVyZSB3YXMgYW4gZXJyb3JcbiAgICBpZiAoZGlzY292ZXJ5Q29udHJvbGxlcikge1xuICAgICAgZGlzY292ZXJ5Q29udHJvbGxlciA9IG51bGxcbiAgICB9XG4gIH1cbn1cblxuLy8gQmluZCBkaXNjb3ZlciBzZXJ2ZXIgYnV0dG9uIHRvIHRoZSBleHRyYWN0ZWQgZnVuY3Rpb25cbmRpc2NvdmVyU2VydmVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkaXNjb3ZlclNlcnZlcihmYWxzZSkpXG5cbi8vIFNjcmVlbnNob3QgY2FwdHVyZSBmdW5jdGlvbmFsaXR5XG5jYXB0dXJlU2NyZWVuc2hvdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjYXB0dXJlU2NyZWVuc2hvdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2FwdHVyaW5nLi4uXCJcblxuICAvLyBTZW5kIG1lc3NhZ2UgdG8gYmFja2dyb3VuZCBzY3JpcHQgdG8gY2FwdHVyZSBzY3JlZW5zaG90XG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgIHtcbiAgICAgIHR5cGU6IFwiQ0FQVFVSRV9TQ1JFRU5TSE9UXCIsXG4gICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgIHNjcmVlbnNob3RQYXRoOiBwYW5lbFNldHRpbmdzLnNjcmVlbnNob3RQYXRoXG4gICAgfSxcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU2NyZWVuc2hvdCBjYXB0dXJlIHJlc3BvbnNlOlwiLCByZXNwb25zZSlcbiAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgY2FwdHVyZVNjcmVlbnNob3RCdXR0b24udGV4dENvbnRlbnQgPSBcIkZhaWxlZCB0byBjYXB0dXJlIVwiXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTY3JlZW5zaG90IGNhcHR1cmUgZmFpbGVkOiBObyByZXNwb25zZSByZWNlaXZlZFwiKVxuICAgICAgfSBlbHNlIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBjYXB0dXJlU2NyZWVuc2hvdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRmFpbGVkIHRvIGNhcHR1cmUhXCJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNjcmVlbnNob3QgY2FwdHVyZSBmYWlsZWQ6XCIsIHJlc3BvbnNlLmVycm9yKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdHVyZVNjcmVlbnNob3RCdXR0b24udGV4dENvbnRlbnQgPSBgQ2FwdHVyZWQ6ICR7cmVzcG9uc2UudGl0bGV9YFxuICAgICAgICBjb25zb2xlLmxvZyhcIlNjcmVlbnNob3QgY2FwdHVyZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXNwb25zZS5wYXRoKVxuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhcHR1cmVTY3JlZW5zaG90QnV0dG9uLnRleHRDb250ZW50ID0gXCJDYXB0dXJlIFNjcmVlbnNob3RcIlxuICAgICAgfSwgMjAwMClcbiAgICB9XG4gIClcbn0pXG5cbi8vIEFkZCB3aXBlIGxvZ3MgZnVuY3Rpb25hbGl0eVxuY29uc3Qgd2lwZUxvZ3NCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpcGUtbG9nc1wiKSBhcyBIVE1MQnV0dG9uRWxlbWVudFxud2lwZUxvZ3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc3Qgc2VydmVyVXJsID0gYGh0dHA6Ly8ke3BhbmVsU2V0dGluZ3Muc2VydmVySG9zdH06JHtwYW5lbFNldHRpbmdzLnNlcnZlclBvcnR9L3dpcGVsb2dzYFxuICBjb25zb2xlLmxvZyhgU2VuZGluZyB3aXBlIHJlcXVlc3QgdG8gJHtzZXJ2ZXJVcmx9YClcblxuICBmZXRjaChzZXJ2ZXJVcmwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9ncyB3aXBlZCBzdWNjZXNzZnVsbHk6XCIsIHJlc3VsdC5tZXNzYWdlKVxuICAgICAgd2lwZUxvZ3NCdXR0b24udGV4dENvbnRlbnQgPSBcIkxvZ3MgV2lwZWQhXCJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB3aXBlTG9nc0J1dHRvbi50ZXh0Q29udGVudCA9IFwiV2lwZSBBbGwgTG9nc1wiXG4gICAgICB9LCAyMDAwKVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byB3aXBlIGxvZ3M6XCIsIGVycm9yKVxuICAgICAgd2lwZUxvZ3NCdXR0b24udGV4dENvbnRlbnQgPSBcIkZhaWxlZCB0byBXaXBlIExvZ3NcIlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdpcGVMb2dzQnV0dG9uLnRleHRDb250ZW50ID0gXCJXaXBlIEFsbCBMb2dzXCJcbiAgICAgIH0sIDIwMDApXG4gICAgfSlcbn0pXG4iLCJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIkBwbGFzbW9ocS9zdG9yYWdlXCJcblxuLy8gRGVmaW5lIHRoZSBzZXR0aW5ncyBpbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgQnJvd3NlckNvbm5lY3RvclNldHRpbmdzIHtcbiAgbG9nTGltaXQ6IG51bWJlclxuICBxdWVyeUxpbWl0OiBudW1iZXJcbiAgc3RyaW5nU2l6ZUxpbWl0OiBudW1iZXJcbiAgbWF4TG9nU2l6ZTogbnVtYmVyXG4gIHNob3dSZXF1ZXN0SGVhZGVyczogYm9vbGVhblxuICBzaG93UmVzcG9uc2VIZWFkZXJzOiBib29sZWFuXG4gIHNjcmVlbnNob3RQYXRoOiBzdHJpbmdcbiAgc2VydmVySG9zdDogc3RyaW5nXG4gIHNlcnZlclBvcnQ6IG51bWJlclxuICBhbGxvd0F1dG9QYXN0ZTogYm9vbGVhblxufVxuXG4vLyBEZWZhdWx0IHNldHRpbmdzXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmdzOiBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgPSB7XG4gIGxvZ0xpbWl0OiA1MCxcbiAgcXVlcnlMaW1pdDogMzAwMDAsXG4gIHN0cmluZ1NpemVMaW1pdDogNTAwLFxuICBtYXhMb2dTaXplOiAyMDAwMCxcbiAgc2hvd1JlcXVlc3RIZWFkZXJzOiBmYWxzZSxcbiAgc2hvd1Jlc3BvbnNlSGVhZGVyczogZmFsc2UsXG4gIHNjcmVlbnNob3RQYXRoOiBcIlwiLFxuICBzZXJ2ZXJIb3N0OiBcImxvY2FsaG9zdFwiLFxuICBzZXJ2ZXJQb3J0OiAzMDI1LFxuICBhbGxvd0F1dG9QYXN0ZTogZmFsc2Vcbn1cblxuLy8gQ3JlYXRlIGEgc3RvcmFnZSBpbnN0YW5jZVxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKHtcbiAgYXJlYTogXCJsb2NhbFwiXG59KVxuXG4vLyBLZXkgZm9yIHN0b3Jpbmcgc2V0dGluZ3NcbmNvbnN0IFNFVFRJTkdTX0tFWSA9IFwiYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJcblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgc2V0dGluZ3NcbiAqIEByZXR1cm5zIFByb21pc2Ugd2l0aCB0aGUgY3VycmVudCBzZXR0aW5nc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogUHJvbWlzZTxCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3M+IHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBzdG9yYWdlLmdldDxCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3M+KFNFVFRJTkdTX0tFWSlcbiAgcmV0dXJuIHNldHRpbmdzID8geyAuLi5kZWZhdWx0U2V0dGluZ3MsIC4uLnNldHRpbmdzIH0gOiB7IC4uLmRlZmF1bHRTZXR0aW5ncyB9XG59XG5cbi8qKlxuICogU2F2ZSBzZXR0aW5nc1xuICogQHBhcmFtIHNldHRpbmdzIFRoZSBzZXR0aW5ncyB0byBzYXZlXG4gKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBzZXR0aW5ncyBhcmUgc2F2ZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhcbiAgc2V0dGluZ3M6IFBhcnRpYWw8QnJvd3NlckNvbm5lY3RvclNldHRpbmdzPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IGF3YWl0IGdldFNldHRpbmdzKClcbiAgY29uc3QgbmV3U2V0dGluZ3MgPSB7IC4uLmN1cnJlbnRTZXR0aW5ncywgLi4uc2V0dGluZ3MgfVxuICBhd2FpdCBzdG9yYWdlLnNldChTRVRUSU5HU19LRVksIG5ld1NldHRpbmdzKVxuICBcbiAgLy8gTm90aWZ5IGFsbCBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uIGFib3V0IHRoZSBzZXR0aW5ncyB1cGRhdGVcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgIHR5cGU6IFwiU0VUVElOR1NfVVBEQVRFRFwiLFxuICAgIHNldHRpbmdzOiBuZXdTZXR0aW5nc1xuICB9KVxufVxuXG4vKipcbiAqIExpc3RlbiBmb3Igc2V0dGluZ3MgY2hhbmdlc1xuICogQHBhcmFtIGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBzZXR0aW5ncyBjaGFuZ2VcbiAqIEByZXR1cm5zIEZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvblNldHRpbmdzQ2hhbmdlZChcbiAgY2FsbGJhY2s6IChzZXR0aW5nczogQnJvd3NlckNvbm5lY3RvclNldHRpbmdzKSA9PiB2b2lkXG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgbGlzdGVuZXIgPSAoY2hhbmdlcywgYXJlYSkgPT4ge1xuICAgIGlmIChhcmVhID09PSBcImxvY2FsXCIgJiYgU0VUVElOR1NfS0VZIGluIGNoYW5nZXMpIHtcbiAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0gY2hhbmdlc1tTRVRUSU5HU19LRVldLm5ld1ZhbHVlXG4gICAgICBjYWxsYmFjayhuZXdTZXR0aW5ncylcbiAgICB9XG4gIH1cbiAgXG4gIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihsaXN0ZW5lcilcbiAgXG4gIC8vIEFsc28gbGlzdGVuIGZvciBydW50aW1lIG1lc3NhZ2VzIGFib3V0IHNldHRpbmdzIHVwZGF0ZXNcbiAgY29uc3QgbWVzc2FnZUxpc3RlbmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgICBpZiAobWVzc2FnZS50eXBlID09PSBcIlNFVFRJTkdTX1VQREFURURcIikge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZS5zZXR0aW5ncylcbiAgICB9XG4gIH1cbiAgXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlTGlzdGVuZXIpXG4gIFxuICAvLyBSZXR1cm4gYSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVyc1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcilcbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIobWVzc2FnZUxpc3RlbmVyKVxuICB9XG59XG4iLCJpbXBvcnQgbSBmcm9tXCJwaWZ5XCI7dmFyIGw9KCk9Pnt0cnl7bGV0IGU9KGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQpLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSl8fFtdO2lmKGVbMV09PT1cIkNocm9tZVwiKXJldHVybiBwYXJzZUludChlWzJdKTwxMDB8fGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWU/LmdldE1hbmlmZXN0KCk/Lm1hbmlmZXN0X3ZlcnNpb249PT0yfWNhdGNoe3JldHVybiExfXJldHVybiExfTt2YXIgbz1jbGFzc3sjcjsjdDtnZXQgcHJpbWFyeUNsaWVudCgpe3JldHVybiB0aGlzLiN0fSNlO2dldCBzZWNvbmRhcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jZX0jYTtnZXQgYXJlYSgpe3JldHVybiB0aGlzLiNhfWdldCBoYXNXZWJBcGkoKXt0cnl7cmV0dXJuIHR5cGVvZiB3aW5kb3c8XCJ1XCImJiEhd2luZG93LmxvY2FsU3RvcmFnZX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19I3M9bmV3IE1hcDsjaTtnZXQgY29waWVkS2V5U2V0KCl7cmV0dXJuIHRoaXMuI2l9aXNDb3BpZWQ9ZT0+dGhpcy5oYXNXZWJBcGkmJih0aGlzLmFsbENvcGllZHx8dGhpcy5jb3BpZWRLZXlTZXQuaGFzKGUpKTsjbj0hMTtnZXQgYWxsQ29waWVkKCl7cmV0dXJuIHRoaXMuI259Z2V0RXh0U3RvcmFnZUFwaT0oKT0+Z2xvYmFsVGhpcy5icm93c2VyPy5zdG9yYWdlfHxnbG9iYWxUaGlzLmNocm9tZT8uc3RvcmFnZTtnZXQgaGFzRXh0ZW5zaW9uQXBpKCl7dHJ5e3JldHVybiEhdGhpcy5nZXRFeHRTdG9yYWdlQXBpKCl9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fWlzV2F0Y2hTdXBwb3J0ZWQ9KCk9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpO2tleU5hbWVzcGFjZT1cIlwiO2lzVmFsaWRLZXk9ZT0+ZS5zdGFydHNXaXRoKHRoaXMua2V5TmFtZXNwYWNlKTtnZXROYW1lc3BhY2VkS2V5PWU9PmAke3RoaXMua2V5TmFtZXNwYWNlfSR7ZX1gO2dldFVubmFtZXNwYWNlZEtleT1lPT5lLnNsaWNlKHRoaXMua2V5TmFtZXNwYWNlLmxlbmd0aCk7c2VyZGU9e3NlcmlhbGl6ZXI6SlNPTi5zdHJpbmdpZnksZGVzZXJpYWxpemVyOkpTT04ucGFyc2V9O2NvbnN0cnVjdG9yKHthcmVhOmU9XCJzeW5jXCIsYWxsQ29waWVkOnQ9ITEsY29waWVkS2V5TGlzdDpzPVtdLHNlcmRlOnI9e319PXt9KXt0aGlzLnNldENvcGllZEtleVNldChzKSx0aGlzLiNhPWUsdGhpcy4jbj10LHRoaXMuc2VyZGU9ey4uLnRoaXMuc2VyZGUsLi4ucn07dHJ5e3RoaXMuaGFzV2ViQXBpJiYodHx8cy5sZW5ndGg+MCkmJih0aGlzLiNlPXdpbmRvdy5sb2NhbFN0b3JhZ2UpfWNhdGNoe310cnl7dGhpcy5oYXNFeHRlbnNpb25BcGkmJih0aGlzLiNyPXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpLGwoKT90aGlzLiN0PW0odGhpcy4jclt0aGlzLmFyZWFdLHtleGNsdWRlOltcImdldEJ5dGVzSW5Vc2VcIl0sZXJyb3JGaXJzdDohMX0pOnRoaXMuI3Q9dGhpcy4jclt0aGlzLmFyZWFdKX1jYXRjaHt9fXNldENvcGllZEtleVNldChlKXt0aGlzLiNpPW5ldyBTZXQoZSl9cmF3R2V0QWxsPSgpPT50aGlzLiN0Py5nZXQoKTtnZXRBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMucmF3R2V0QWxsKCk7cmV0dXJuIE9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc1ZhbGlkS2V5KHQpKS5yZWR1Y2UoKHQsW3Mscl0pPT4odFt0aGlzLmdldFVubmFtZXNwYWNlZEtleShzKV09cix0KSx7fSl9O2NvcHk9YXN5bmMgZT0+e2xldCB0PWU9PT12b2lkIDA7aWYoIXQmJiF0aGlzLmNvcGllZEtleVNldC5oYXMoZSl8fCF0aGlzLmFsbENvcGllZHx8IXRoaXMuaGFzRXh0ZW5zaW9uQXBpKXJldHVybiExO2xldCBzPXRoaXMuYWxsQ29waWVkP2F3YWl0IHRoaXMucmF3R2V0QWxsKCk6YXdhaXQgdGhpcy4jdC5nZXQoKHQ/Wy4uLnRoaXMuY29waWVkS2V5U2V0XTpbZV0pLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpKTtpZighcylyZXR1cm4hMTtsZXQgcj0hMTtmb3IobGV0IGEgaW4gcyl7bGV0IGk9c1thXSxuPXRoaXMuI2U/LmdldEl0ZW0oYSk7dGhpcy4jZT8uc2V0SXRlbShhLGkpLHJ8fD1pIT09bn1yZXR1cm4gcn07cmF3R2V0PWFzeW5jIGU9Pihhd2FpdCB0aGlzLnJhd0dldE1hbnkoW2VdKSlbZV07cmF3R2V0TWFueT1hc3luYyBlPT50aGlzLmhhc0V4dGVuc2lvbkFwaT9hd2FpdCB0aGlzLiN0LmdldChlKTplLmZpbHRlcih0aGlzLmlzQ29waWVkKS5yZWR1Y2UoKHQscyk9Pih0W3NdPXRoaXMuI2U/LmdldEl0ZW0ocyksdCkse30pO3Jhd1NldD1hc3luYyhlLHQpPT5hd2FpdCB0aGlzLnJhd1NldE1hbnkoe1tlXTp0fSk7cmF3U2V0TWFueT1hc3luYyBlPT4odGhpcy4jZSYmT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzQ29waWVkKHQpKS5mb3JFYWNoKChbdCxzXSk9PnRoaXMuI2Uuc2V0SXRlbSh0LHMpKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jdC5zZXQoZSksbnVsbCk7Y2xlYXI9YXN5bmMoZT0hMSk9PntlJiZ0aGlzLiNlPy5jbGVhcigpLGF3YWl0IHRoaXMuI3QuY2xlYXIoKX07cmF3UmVtb3ZlPWFzeW5jIGU9Pnthd2FpdCB0aGlzLnJhd1JlbW92ZU1hbnkoW2VdKX07cmF3UmVtb3ZlTWFueT1hc3luYyBlPT57dGhpcy4jZSYmZS5maWx0ZXIodGhpcy5pc0NvcGllZCkuZm9yRWFjaCh0PT50aGlzLiNlLnJlbW92ZUl0ZW0odCkpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiN0LnJlbW92ZShlKX07cmVtb3ZlQWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLmdldEFsbCgpLHQ9T2JqZWN0LmtleXMoZSk7YXdhaXQgdGhpcy5yZW1vdmVNYW55KHQpfTt3YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI28oZSksdH07I289ZT0+e2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj10aGlzLiNzLmdldChzKT8uY2FsbGJhY2tTZXR8fG5ldyBTZXQ7aWYoci5hZGQoZVt0XSksci5zaXplPjEpY29udGludWU7bGV0IGE9KGksbik9PntpZihuIT09dGhpcy5hcmVhfHwhaVtzXSlyZXR1cm47bGV0IGg9dGhpcy4jcy5nZXQocyk7aWYoIWgpdGhyb3cgbmV3IEVycm9yKGBTdG9yYWdlIGNvbW1zIGRvZXMgbm90IGV4aXN0IGZvciBuc0tleTogJHtzfWApO1Byb21pc2UuYWxsKFt0aGlzLnBhcnNlVmFsdWUoaVtzXS5uZXdWYWx1ZSksdGhpcy5wYXJzZVZhbHVlKGlbc10ub2xkVmFsdWUpXSkudGhlbigoW3ksZF0pPT57Zm9yKGxldCBwIG9mIGguY2FsbGJhY2tTZXQpcCh7bmV3VmFsdWU6eSxvbGRWYWx1ZTpkfSxuKX0pfTt0aGlzLiNyLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihhKSx0aGlzLiNzLnNldChzLHtjYWxsYmFja1NldDpyLGxpc3RlbmVyOmF9KX19O3Vud2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNjKGUpLHR9OyNjKGUpe2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj1lW3RdLGE9dGhpcy4jcy5nZXQocyk7YSYmKGEuY2FsbGJhY2tTZXQuZGVsZXRlKHIpLGEuY2FsbGJhY2tTZXQuc2l6ZT09PTAmJih0aGlzLiNzLmRlbGV0ZShzKSx0aGlzLiNyLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihhLmxpc3RlbmVyKSkpfX11bndhdGNoQWxsPSgpPT50aGlzLiNoKCk7I2goKXt0aGlzLiNzLmZvckVhY2goKHtsaXN0ZW5lcjplfSk9PnRoaXMuI3Iub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGUpKSx0aGlzLiNzLmNsZWFyKCl9YXN5bmMgZ2V0SXRlbShlKXtyZXR1cm4gdGhpcy5nZXQoZSl9YXN5bmMgZ2V0SXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWFueShlKX1hc3luYyBzZXRJdGVtKGUsdCl7YXdhaXQgdGhpcy5zZXQoZSx0KX1hc3luYyBzZXRJdGVtcyhlKXthd2FpdCBhd2FpdCB0aGlzLnNldE1hbnkoZSl9YXN5bmMgcmVtb3ZlSXRlbShlKXtyZXR1cm4gdGhpcy5yZW1vdmUoZSl9YXN5bmMgcmVtb3ZlSXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMucmVtb3ZlTWFueShlKX19LGc9Y2xhc3MgZXh0ZW5kcyBve2dldD1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHM9YXdhaXQgdGhpcy5yYXdHZXQodCk7cmV0dXJuIHRoaXMucGFyc2VWYWx1ZShzKX07Z2V0TWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KSxzPWF3YWl0IHRoaXMucmF3R2V0TWFueSh0KSxyPWF3YWl0IFByb21pc2UuYWxsKE9iamVjdC52YWx1ZXMocykubWFwKHRoaXMucGFyc2VWYWx1ZSkpO3JldHVybiBPYmplY3Qua2V5cyhzKS5yZWR1Y2UoKGEsaSxuKT0+KGFbdGhpcy5nZXRVbm5hbWVzcGFjZWRLZXkoaSldPXJbbl0sYSkse30pfTtzZXQ9YXN5bmMoZSx0KT0+e2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxyPXRoaXMuc2VyZGUuc2VyaWFsaXplcih0KTtyZXR1cm4gdGhpcy5yYXdTZXQocyxyKX07c2V0TWFueT1hc3luYyBlPT57bGV0IHQ9T2JqZWN0LmVudHJpZXMoZSkucmVkdWNlKChzLFtyLGFdKT0+KHNbdGhpcy5nZXROYW1lc3BhY2VkS2V5KHIpXT10aGlzLnNlcmRlLnNlcmlhbGl6ZXIoYSkscykse30pO3JldHVybiBhd2FpdCB0aGlzLnJhd1NldE1hbnkodCl9O3JlbW92ZT1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpO3JldHVybiB0aGlzLnJhd1JlbW92ZSh0KX07cmVtb3ZlTWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KTtyZXR1cm4gYXdhaXQgdGhpcy5yYXdSZW1vdmVNYW55KHQpfTtzZXROYW1lc3BhY2U9ZT0+e3RoaXMua2V5TmFtZXNwYWNlPWV9O3BhcnNlVmFsdWU9YXN5bmMgZT0+e3RyeXtpZihlIT09dm9pZCAwKXJldHVybiB0aGlzLnNlcmRlLmRlc2VyaWFsaXplcihlKX1jYXRjaCh0KXtjb25zb2xlLmVycm9yKHQpfX19O2V4cG9ydHtvIGFzIEJhc2VTdG9yYWdlLGcgYXMgU3RvcmFnZX07XG4iLCJjb25zdCBwcm9jZXNzRnVuY3Rpb24gPSAoZnVuY3Rpb25fLCBvcHRpb25zLCBwcm94eSwgdW53cmFwcGVkKSA9PiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRjb25zdCBQID0gb3B0aW9ucy5wcm9taXNlTW9kdWxlO1xuXG5cdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKG9wdGlvbnMubXVsdGlBcmdzKSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKC4uLnJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdFswXSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KHJlc3VsdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5zaGlmdCgpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKGVycm9yLCByZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2gocmVzb2x2ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXMgPT09IHByb3h5ID8gdW53cmFwcGVkIDogdGhpcztcblx0XHRSZWZsZWN0LmFwcGx5KGZ1bmN0aW9uXywgc2VsZiwgYXJndW1lbnRzXyk7XG5cdH0pO1xufTtcblxuY29uc3QgZmlsdGVyQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaWZ5KGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0ZXhjbHVkZTogWy8uKyg/OlN5bmN8U3RyZWFtKSQvXSxcblx0XHRlcnJvckZpcnN0OiB0cnVlLFxuXHRcdHByb21pc2VNb2R1bGU6IFByb21pc2UsXG5cdFx0Li4ub3B0aW9ucyxcblx0fTtcblxuXHRjb25zdCBvYmplY3RUeXBlID0gdHlwZW9mIGlucHV0O1xuXHRpZiAoIShpbnB1dCAhPT0gbnVsbCAmJiAob2JqZWN0VHlwZSA9PT0gJ29iamVjdCcgfHwgb2JqZWN0VHlwZSA9PT0gJ2Z1bmN0aW9uJykpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW5wdXRcXGAgdG8gYmUgYSBcXGBGdW5jdGlvblxcYCBvciBcXGBPYmplY3RcXGAsIGdvdCBcXGAke2lucHV0ID09PSBudWxsID8gJ251bGwnIDogb2JqZWN0VHlwZX1cXGBgKTtcblx0fVxuXG5cdGNvbnN0IGZpbHRlciA9ICh0YXJnZXQsIGtleSkgPT4ge1xuXHRcdGxldCBjYWNoZWQgPSBmaWx0ZXJDYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdGlmICghY2FjaGVkKSB7XG5cdFx0XHRjYWNoZWQgPSB7fTtcblx0XHRcdGZpbHRlckNhY2hlLnNldCh0YXJnZXQsIGNhY2hlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleSBpbiBjYWNoZWQpIHtcblx0XHRcdHJldHVybiBjYWNoZWRba2V5XTtcblx0XHR9XG5cblx0XHRjb25zdCBtYXRjaCA9IHBhdHRlcm4gPT4gKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJyB8fCB0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykgPyBrZXkgPT09IHBhdHRlcm4gOiBwYXR0ZXJuLnRlc3Qoa2V5KTtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuXHRcdGNvbnN0IHdyaXRhYmxlT3JDb25maWd1cmFibGVPd24gPSAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUgfHwgZGVzY3JpcHRvci5jb25maWd1cmFibGUpO1xuXHRcdGNvbnN0IGluY2x1ZGVkID0gb3B0aW9ucy5pbmNsdWRlID8gb3B0aW9ucy5pbmNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSkgOiAhb3B0aW9ucy5leGNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSk7XG5cdFx0Y29uc3Qgc2hvdWxkRmlsdGVyID0gaW5jbHVkZWQgJiYgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93bjtcblx0XHRjYWNoZWRba2V5XSA9IHNob3VsZEZpbHRlcjtcblx0XHRyZXR1cm4gc2hvdWxkRmlsdGVyO1xuXHR9O1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eShpbnB1dCwge1xuXHRcdGFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykge1xuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkoY2FjaGVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGlmaWVkID0gb3B0aW9ucy5leGNsdWRlTWFpbiA/IHRhcmdldCA6IHByb2Nlc3NGdW5jdGlvbih0YXJnZXQsIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0Y2FjaGUuc2V0KHRhcmdldCwgcGlmaWVkKTtcblx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KHBpZmllZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0fSxcblxuXHRcdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSB0YXJnZXRba2V5XTtcblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1leHRlbmQtbmF0aXZlL25vLXVzZS1leHRlbmQtbmF0aXZlXG5cdFx0XHRpZiAoIWZpbHRlcih0YXJnZXQsIGtleSkgfHwgcHJvcGVydHkgPT09IEZ1bmN0aW9uLnByb3RvdHlwZVtrZXldKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHByb3BlcnR5KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNvbnN0IHBpZmllZCA9IHByb2Nlc3NGdW5jdGlvbihwcm9wZXJ0eSwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRcdGNhY2hlLnNldChwcm9wZXJ0eSwgcGlmaWVkKTtcblx0XHRcdFx0cmV0dXJuIHBpZmllZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBwcm94eTtcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJwYW5lbHMuYjQzMjI0MGQuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);