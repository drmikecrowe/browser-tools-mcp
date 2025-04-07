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
})({"7jGo8":[function(require,module,exports) {
var u = globalThis.process?.argv || [];
var h = ()=>globalThis.process?.env || {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var b = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/home/mcrowe/Programming/Personal/browser-tools-mcp/universal-extension/.plasmo/static/background/index.ts",
    "bundleId": "d40ef941aeab42a0",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 34011
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function H(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function L(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function T(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", L), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", L), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    b();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
T(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"iJkwT":[function(require,module,exports) {
var _index = require("../../../background/index");

},{"../../../background/index":"fs2A2"}],"fs2A2":[function(require,module,exports) {
// Import the shared settings store
var _browserConnectorSettings = require("../store/browserConnectorSettings");
// Listen for messages from the devtools panel
let isConnectedToServer = false;
let browserConnectorSettings;
// Initialize settings
(0, _browserConnectorSettings.getSettings)().then((settings)=>{
    browserConnectorSettings = settings;
});
// Listen for settings changes
(0, _browserConnectorSettings.onSettingsChanged)((settings)=>{
    browserConnectorSettings = settings;
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.type === "GET_CURRENT_URL" && message.tabId) {
        getCurrentTabUrl(message.tabId).then((url)=>{
            sendResponse({
                success: true,
                url: url
            });
        }).catch((error)=>{
            sendResponse({
                success: false,
                error: error.message
            });
        });
        return true // Required to use sendResponse asynchronously
        ;
    }
    // Handle explicit request to update the server with the URL
    if (message.type === "UPDATE_SERVER_URL" && message.tabId && message.url) {
        console.log(`Background: Received request to update server with URL for tab ${message.tabId}: ${message.url}`);
        updateServerWithUrl(message.tabId, message.url, message.source || "explicit_update").then(()=>{
            if (sendResponse) sendResponse({
                success: true
            });
        }).catch((error)=>{
            console.error("Background: Error updating server with URL:", error);
            if (sendResponse) sendResponse({
                success: false,
                error: error.message
            });
        });
        return true // Required to use sendResponse asynchronously
        ;
    }
    // Handle screenshot capture requests
    if (message.type === "CAPTURE_SCREENSHOT" && message.tabId) {
        console.log("Background: Received screenshot capture request");
        // Check if we're connected to the server
        if (!isConnectedToServer) {
            console.error("Cannot capture screenshot: Not connected to a valid browser tools server");
            sendResponse({
                success: false,
                error: "Not connected to a valid browser tools server. Please check your connection settings."
            });
            return true // Keep the sendResponse function valid
            ;
        }
        // Continue with screenshot capture
        captureAndSendScreenshot(message, browserConnectorSettings, sendResponse);
        return true // Keep the sendResponse function valid
        ;
    }
    // Track WebSocket connection state
    if (message.type === "WEBSOCKET_CONNECTED") {
        console.log("Background: WebSocket connected to server");
        isConnectedToServer = true;
        return false;
    }
    if (message.type === "WEBSOCKET_CLOSED" || message.type === "SERVER_VALIDATION_FAILED") {
        console.log("Background: WebSocket disconnected from server");
        isConnectedToServer = false;
        return false;
    }
    return false;
});
// Validate server identity
async function validateServerIdentity(host, port) {
    try {
        const response = await fetch(`http://${host}:${port}/.identity`, {
            signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        if (!response.ok) {
            console.error(`Invalid server response: ${response.status}`);
            return false;
        }
        const identity = await response.json();
        // Validate the server signature
        if (identity.signature !== "mcp-browser-connector-24x7") {
            console.error("Invalid server signature - not the browser tools server");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error validating server identity:", error);
        return false;
    }
}
// Track URLs for each tab
const tabUrls = new Map();
// Function to get the current URL for a tab
async function getCurrentTabUrl(tabId) {
    try {
        console.log("Background: Getting URL for tab", tabId);
        // First check if we have it cached
        if (tabUrls.has(tabId)) {
            const cachedUrl = tabUrls.get(tabId);
            console.log("Background: Found cached URL:", cachedUrl);
            return cachedUrl;
        }
        // Otherwise get it from the tab
        try {
            const tab = await chrome.tabs.get(tabId);
            if (tab && tab.url) {
                // Cache the URL
                tabUrls.set(tabId, tab.url);
                console.log("Background: Got URL from tab:", tab.url);
                return tab.url;
            } else console.log("Background: Tab exists but no URL found");
        } catch (tabError) {
            console.error("Background: Error getting tab:", tabError);
        }
        // If we can't get the tab directly, try querying for active tabs
        try {
            const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });
            if (tabs && tabs.length > 0 && tabs[0].url) {
                const activeUrl = tabs[0].url;
                console.log("Background: Got URL from active tab:", activeUrl);
                // Cache this URL as well
                tabUrls.set(tabId, activeUrl);
                return activeUrl;
            }
        } catch (queryError) {
            console.error("Background: Error querying tabs:", queryError);
        }
        console.log("Background: Could not find URL for tab", tabId);
        return null;
    } catch (error) {
        console.error("Background: Error getting tab URL:", error);
        return null;
    }
}
// Listen for tab updates to detect page refreshes and URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    // Track URL changes
    if (changeInfo.url) {
        console.log(`URL changed in tab ${tabId} to ${changeInfo.url}`);
        tabUrls.set(tabId, changeInfo.url);
        // Send URL update to server if possible
        updateServerWithUrl(tabId, changeInfo.url, "tab_url_change");
    }
    // Check if this is a page refresh (status becoming "complete")
    if (changeInfo.status === "complete") {
        // Update URL in our cache
        if (tab.url) {
            tabUrls.set(tabId, tab.url);
            // Send URL update to server if possible
            updateServerWithUrl(tabId, tab.url, "page_complete");
        }
        retestConnectionOnRefresh(tabId);
    }
});
// Listen for tab activation (switching between tabs)
chrome.tabs.onActivated.addListener((activeInfo)=>{
    const tabId = activeInfo.tabId;
    console.log(`Tab activated: ${tabId}`);
    // Get the URL of the newly activated tab
    chrome.tabs.get(tabId, (tab)=>{
        if (chrome.runtime.lastError) {
            console.error("Error getting tab info:", chrome.runtime.lastError);
            return;
        }
        if (tab && tab.url) {
            console.log(`Active tab changed to ${tab.url}`);
            // Update our cache
            tabUrls.set(tabId, tab.url);
            // Send URL update to server if possible
            updateServerWithUrl(tabId, tab.url, "tab_activated");
        }
    });
});
// Function to update the server with the current URL
async function updateServerWithUrl(tabId, url, source = "background_update") {
    if (!url) {
        console.error("Cannot update server with empty URL");
        return;
    }
    console.log(`Updating server with URL for tab ${tabId}: ${url}`);
    // Maximum number of retry attempts
    const maxRetries = 3;
    let retryCount = 0;
    let success = false;
    while(retryCount < maxRetries && !success)try {
        // Send the URL to the server
        const serverUrl = `http://${browserConnectorSettings.serverHost}:${browserConnectorSettings.serverPort}/current-url`;
        console.log(`Attempt ${retryCount + 1}/${maxRetries} to update server with URL: ${url}`);
        const response = await fetch(serverUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                tabId: tabId,
                timestamp: Date.now(),
                source: source
            }),
            // Add a timeout to prevent hanging requests
            signal: AbortSignal.timeout(5000)
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(`Successfully updated server with URL: ${url}`, responseData);
            success = true;
        } else {
            console.error(`Server returned error: ${response.status} ${response.statusText}`);
            retryCount++;
            // Wait before retrying
            await new Promise((resolve)=>setTimeout(resolve, 500));
        }
    } catch (error) {
        console.error(`Error updating server with URL: ${error.message}`);
        retryCount++;
        // Wait before retrying
        await new Promise((resolve)=>setTimeout(resolve, 500));
    }
    if (!success) console.error(`Failed to update server with URL after ${maxRetries} attempts`);
}
// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId)=>{
    tabUrls.delete(tabId);
});
// Function to retest connection when a page is refreshed
async function retestConnectionOnRefresh(tabId) {
    console.log(`Page refreshed in tab ${tabId}, retesting connection...`);
    // Test the connection with the last known host and port
    const isConnected = await validateServerIdentity(browserConnectorSettings.serverHost, browserConnectorSettings.serverPort);
    // Notify all devtools instances about the connection status
    chrome.runtime.sendMessage({
        type: "CONNECTION_STATUS_UPDATE",
        isConnected: isConnected,
        tabId: tabId
    });
    // Always notify for page refresh, whether connected or not
    // This ensures any ongoing discovery is cancelled and restarted
    chrome.runtime.sendMessage({
        type: "INITIATE_AUTO_DISCOVERY",
        reason: "page_refresh",
        tabId: tabId,
        forceRestart: true // Add a flag to indicate this should force restart any ongoing processes
    });
    if (!isConnected) console.log("Connection test failed after page refresh, initiating auto-discovery...");
    else console.log("Connection test successful after page refresh");
}
// Function to capture and send screenshot
function captureAndSendScreenshot(message, settings, sendResponse) {
    console.log("Background: Starting screenshot capture process");
    // Get the inspected window's tab
    chrome.tabs.get(message.tabId, (tab)=>{
        if (chrome.runtime.lastError) {
            console.error("Error getting tab:", chrome.runtime.lastError);
            sendResponse({
                success: false,
                error: chrome.runtime.lastError.message
            });
            return;
        }
        // Get all windows to find the one containing our tab
        chrome.windows.getAll({
            populate: true
        }, (windows)=>{
            const targetWindow = windows.find((w)=>w.tabs.some((t)=>t.id === message.tabId));
            if (!targetWindow) {
                console.error("Could not find window containing the inspected tab");
                sendResponse({
                    success: false,
                    error: "Could not find window containing the inspected tab"
                });
                return;
            }
            console.log(`Background: Found target window ${targetWindow.id} for screenshot`);
            // Capture screenshot of the window containing our tab
            chrome.tabs.captureVisibleTab(targetWindow.id, {
                format: "png"
            }, (dataUrl)=>{
                // Ignore DevTools panel capture error if it occurs
                if (chrome.runtime.lastError && !chrome.runtime.lastError.message.includes("devtools://")) {
                    console.error("Error capturing screenshot:", chrome.runtime.lastError);
                    sendResponse({
                        success: false,
                        error: chrome.runtime.lastError.message
                    });
                    return;
                }
                // Send screenshot data to browser connector using configured settings
                const serverUrl = `http://${settings.serverHost}:${settings.serverPort}/screenshot`;
                console.log(`Background: Sending screenshot to ${serverUrl}`);
                fetch(serverUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        data: dataUrl,
                        path: message.screenshotPath
                    })
                }).then((response)=>{
                    if (!response.ok) throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                    return response.json();
                }).then((result)=>{
                    if (result.error) {
                        console.error("Error from server:", result.error);
                        sendResponse({
                            success: false,
                            error: result.error
                        });
                    } else {
                        console.log("Screenshot saved successfully:", result.path);
                        // Send success response even if DevTools capture failed
                        sendResponse({
                            success: true,
                            path: result.path,
                            title: tab.title || "Current Tab"
                        });
                    }
                }).catch((error)=>{
                    console.error("Error sending screenshot data:", error);
                    sendResponse({
                        success: false,
                        error: error.message || "Failed to save screenshot"
                    });
                });
            });
        });
    });
}

},{"../store/browserConnectorSettings":"fOoVm"}],"fOoVm":[function(require,module,exports) {
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

},{}]},["7jGo8","iJkwT"], "iJkwT", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxJQUFJLEtBQUssRUFBRTtZQUFDLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRSxFQUFDLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVE7WUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFFLElBQUcsTUFBSSxNQUFJO1FBQUM7UUFBQyxPQUFPO0lBQUMsRUFBRTtJQUFBLFNBQU8sT0FBTSxJQUFHLEFBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXO1lBQUM7U0FBRSxDQUFBLENBQUUsQ0FBQyxFQUFFLENBQUM7SUFBQSxhQUFXLE9BQU0sSUFBRyxJQUFJLENBQUMsa0JBQWdCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsT0FBTyxDQUFDLEdBQUUsSUFBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBRyxDQUFBLEdBQUcsQ0FBQyxHQUFHO0lBQUEsU0FBTyxPQUFNLEdBQUUsSUFBSSxNQUFNLElBQUksQ0FBQyxXQUFXO1lBQUMsQ0FBQyxFQUFFLEVBQUM7UUFBQyxHQUFHO0lBQUEsYUFBVyxPQUFNLElBQUksQ0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsT0FBTyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxLQUFJLElBQUksQ0FBQyxtQkFBaUIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFHLElBQUcsRUFBRztJQUFBLFFBQU0sT0FBTSxJQUFFLENBQUMsQ0FBQztRQUFJLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBTyxFQUFFO0lBQUEsWUFBVSxPQUFN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SztJQUNQO0FBQ0YiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLWI2MGE4ZTgwMGM2OWE3OGIuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwiYmFja2dyb3VuZC9pbmRleC50cyIsInN0b3JlL2Jyb3dzZXJDb25uZWN0b3JTZXR0aW5ncy50cyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErc3RvcmFnZUAxLjE1LjAvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9zdG9yYWdlL2Rpc3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlmeUA2LjEuMC9ub2RlX21vZHVsZXMvcGlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdT1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciBoPSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEI9bmV3IFNldCh1KSxfPWU9PkIuaGFzKGUpLEc9dS5maWx0ZXIoZT0+ZS5zdGFydHNXaXRoKFwiLS1cIikmJmUuaW5jbHVkZXMoXCI9XCIpKS5tYXAoZT0+ZS5zcGxpdChcIj1cIikpLnJlZHVjZSgoZSxbdCxvXSk9PihlW3RdPW8sZSkse30pO3ZhciBVPV8oXCItLWRyeS1ydW5cIiksZz0oKT0+XyhcIi0tdmVyYm9zZVwiKXx8aCgpLlZFUkJPU0U9PT1cInRydWVcIixOPWcoKTt2YXIgbT0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgeT0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLHY9KC4uLmUpPT5tKFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksZj0oLi4uZSk9Pm0oXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxNPTAsaT0oLi4uZSk9PmcoKSYmbShgXFx1ezFGN0UxfSAke00rK31gLC4uLmUpO3ZhciBiPSgpPT57bGV0IGU9Z2xvYmFsVGhpcy5icm93c2VyPy5ydW50aW1lfHxnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZSx0PSgpPT5zZXRJbnRlcnZhbChlLmdldFBsYXRmb3JtSW5mbywyNGUzKTtlLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcih0KSx0KCl9O3ZhciBuPXtcImlzQ29udGVudFNjcmlwdFwiOmZhbHNlLFwiaXNCYWNrZ3JvdW5kXCI6dHJ1ZSxcImlzUmVhY3RcIjpmYWxzZSxcInJ1bnRpbWVzXCI6W1wiYmFja2dyb3VuZC1zZXJ2aWNlLXJ1bnRpbWVcIl0sXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInBvcnRcIjoxODE1LFwiZW50cnlGaWxlUGF0aFwiOlwiL2hvbWUvbWNyb3dlL1Byb2dyYW1taW5nL1BlcnNvbmFsL2Jyb3dzZXItdG9vbHMtbWNwL3VuaXZlcnNhbC1leHRlbnNpb24vLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50c1wiLFwiYnVuZGxlSWRcIjpcImQ0MGVmOTQxYWVhYjQyYTBcIixcImVudkhhc2hcIjpcImU3OTJmYmJkYWE3OGVlODRcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjozNDAxMX07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGM9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBSKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/bG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIHgoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBkKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgUD1cIl9fcGxhc21vX3J1bnRpbWVfcGFnZV9cIixTPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7dmFyIE89YCR7bi5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7UigpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiBrKGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChPKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihjLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9Yy5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBzPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7cy5ob3N0bmFtZT09PW4uaG9zdCYmcy5wb3J0PT09YCR7bi5wb3J0fWA/KHMuc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gocykudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBFKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gQyhlPWQoKSl7bGV0IHQ9eCgpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIEwoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFQoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoTnVtYmVyKGQoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2F3YWl0IGUocyl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEwpLHR9ZnVuY3Rpb24gQShlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTtpZihzLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHMuYXNzZXRzKSxzLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCByIG9mIHMuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IGw9ci5jb2RlZnJhbWV8fHIuc3RhY2s7ZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIityLm1lc3NhZ2UrYFxuYCtsK2BcblxuYCtyLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PntmKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgdz1tb2R1bGUuYnVuZGxlLnBhcmVudCxhPXtidWlsZFJlYWR5OiExLGJnQ2hhbmdlZDohMSxjc0NoYW5nZWQ6ITEscGFnZUNoYW5nZWQ6ITEsc2NyaXB0UG9ydHM6bmV3IFNldCxwYWdlUG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gcChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJmEucGFnZUNoYW5nZWQpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgUGFnZVwiKTtmb3IobGV0IHQgb2YgYS5wYWdlUG9ydHMpdC5wb3N0TWVzc2FnZShudWxsKX1pZihlfHxhLmJ1aWxkUmVhZHkmJihhLmJnQ2hhbmdlZHx8YS5jc0NoYW5nZWQpKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIENTXCIpO2xldCB0PWF3YWl0IGM/LnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgbyBvZiBhLnNjcmlwdFBvcnRzKXtsZXQgcz10LnNvbWUocj0+ci5pZD09PW8uc2VuZGVyLnRhYj8uaWQpO28ucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2FjdGl2ZV90YWJfXzpzfSl9Yy5ydW50aW1lLnJlbG9hZCgpfX1pZighd3x8IXcuaXNQYXJjZWxSZXF1aXJlKXtiKCk7bGV0IGU9QShhc3luYyB0PT57aShcIkJHU1cgUnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYS5iZ0NoYW5nZWR8fD10LmZpbHRlcihzPT5zLmVudkhhc2g9PT1uLmVudkhhc2gpLnNvbWUocz0+RShtb2R1bGUuYnVuZGxlLHMuaWQpKTtsZXQgbz10LmZpbmQocz0+cy50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBzPW5ldyBTZXQodC5tYXAobD0+bC5pZCkpLHI9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGw9Pk9iamVjdC52YWx1ZXMobCkpLmZsYXQoKTthLmJnQ2hhbmdlZHx8PXIuZXZlcnkobD0+cy5oYXMobCkpfXAoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgaygpLHAoITApfSl9VChhc3luYyBlPT57c3dpdGNoKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLGUudHlwZSl7Y2FzZVwiYnVpbGRfcmVhZHlcIjp7YS5idWlsZFJlYWR5fHw9ITAscCgpO2JyZWFrfWNhc2VcImNzX2NoYW5nZWRcIjp7YS5jc0NoYW5nZWR8fD0hMCxwKCk7YnJlYWt9fX0pO2MucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7bGV0IHQ9ZS5uYW1lLnN0YXJ0c1dpdGgoUCksbz1lLm5hbWUuc3RhcnRzV2l0aChTKTtpZih0fHxvKXtsZXQgcz10P2EucGFnZVBvcnRzOmEuc2NyaXB0UG9ydHM7cy5hZGQoZSksZS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntzLmRlbGV0ZShlKX0pLGUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHIpe2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBzb3VyY2UgY2hhbmdlZFwiLHIpLHIuX19wbGFzbW9fY3NfY2hhbmdlZF9fJiYoYS5jc0NoYW5nZWR8fD0hMCksci5fX3BsYXNtb19wYWdlX2NoYW5nZWRfXyYmKGEucGFnZUNoYW5nZWR8fD0hMCkscCgpfSl9fSk7Yy5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiYoaShcIkJHU1cgUnVudGltZSAtIE9uIHRvcC1sZXZlbCBjb2RlIGNoYW5nZWRcIikscCgpKSwhMH0pO1xuIiwiaW1wb3J0IFwiLi4vLi4vLi4vYmFja2dyb3VuZC9pbmRleFwiIiwiLy8gSW1wb3J0IHRoZSBzaGFyZWQgc2V0dGluZ3Mgc3RvcmVcbmltcG9ydCB7XG4gIGdldFNldHRpbmdzLFxuICBvblNldHRpbmdzQ2hhbmdlZCxcbiAgc2F2ZVNldHRpbmdzXG59IGZyb20gXCIuLi9zdG9yZS9icm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIlxuaW1wb3J0IHR5cGUgeyBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfSBmcm9tIFwiLi4vc3RvcmUvYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJcblxuLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBkZXZ0b29scyBwYW5lbFxubGV0IGlzQ29ubmVjdGVkVG9TZXJ2ZXIgPSBmYWxzZVxubGV0IGJyb3dzZXJDb25uZWN0b3JTZXR0aW5nczogQnJvd3NlckNvbm5lY3RvclNldHRpbmdzXG5cbi8vIEluaXRpYWxpemUgc2V0dGluZ3NcbmdldFNldHRpbmdzKCkudGhlbigoc2V0dGluZ3MpID0+IHtcbiAgYnJvd3NlckNvbm5lY3RvclNldHRpbmdzID0gc2V0dGluZ3Ncbn0pXG5cbi8vIExpc3RlbiBmb3Igc2V0dGluZ3MgY2hhbmdlc1xub25TZXR0aW5nc0NoYW5nZWQoKHNldHRpbmdzKSA9PiB7XG4gIGJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncyA9IHNldHRpbmdzXG59KVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiR0VUX0NVUlJFTlRfVVJMXCIgJiYgbWVzc2FnZS50YWJJZCkge1xuICAgIGdldEN1cnJlbnRUYWJVcmwobWVzc2FnZS50YWJJZClcbiAgICAgIC50aGVuKCh1cmwpID0+IHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgdXJsOiB1cmwgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KVxuICAgICAgfSlcbiAgICByZXR1cm4gdHJ1ZSAvLyBSZXF1aXJlZCB0byB1c2Ugc2VuZFJlc3BvbnNlIGFzeW5jaHJvbm91c2x5XG4gIH1cblxuICAvLyBIYW5kbGUgZXhwbGljaXQgcmVxdWVzdCB0byB1cGRhdGUgdGhlIHNlcnZlciB3aXRoIHRoZSBVUkxcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJVUERBVEVfU0VSVkVSX1VSTFwiICYmIG1lc3NhZ2UudGFiSWQgJiYgbWVzc2FnZS51cmwpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBCYWNrZ3JvdW5kOiBSZWNlaXZlZCByZXF1ZXN0IHRvIHVwZGF0ZSBzZXJ2ZXIgd2l0aCBVUkwgZm9yIHRhYiAke21lc3NhZ2UudGFiSWR9OiAke21lc3NhZ2UudXJsfWBcbiAgICApXG4gICAgdXBkYXRlU2VydmVyV2l0aFVybChcbiAgICAgIG1lc3NhZ2UudGFiSWQsXG4gICAgICBtZXNzYWdlLnVybCxcbiAgICAgIG1lc3NhZ2Uuc291cmNlIHx8IFwiZXhwbGljaXRfdXBkYXRlXCJcbiAgICApXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmIChzZW5kUmVzcG9uc2UpIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrZ3JvdW5kOiBFcnJvciB1cGRhdGluZyBzZXJ2ZXIgd2l0aCBVUkw6XCIsIGVycm9yKVxuICAgICAgICBpZiAoc2VuZFJlc3BvbnNlKSBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSlcbiAgICAgIH0pXG4gICAgcmV0dXJuIHRydWUgLy8gUmVxdWlyZWQgdG8gdXNlIHNlbmRSZXNwb25zZSBhc3luY2hyb25vdXNseVxuICB9XG5cbiAgLy8gSGFuZGxlIHNjcmVlbnNob3QgY2FwdHVyZSByZXF1ZXN0c1xuICBpZiAobWVzc2FnZS50eXBlID09PSBcIkNBUFRVUkVfU0NSRUVOU0hPVFwiICYmIG1lc3NhZ2UudGFiSWQpIHtcbiAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IFJlY2VpdmVkIHNjcmVlbnNob3QgY2FwdHVyZSByZXF1ZXN0XCIpXG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlclxuICAgIGlmICghaXNDb25uZWN0ZWRUb1NlcnZlcikge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgXCJDYW5ub3QgY2FwdHVyZSBzY3JlZW5zaG90OiBOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXJcIlxuICAgICAgKVxuICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOlxuICAgICAgICAgIFwiTm90IGNvbm5lY3RlZCB0byBhIHZhbGlkIGJyb3dzZXIgdG9vbHMgc2VydmVyLiBQbGVhc2UgY2hlY2sgeW91ciBjb25uZWN0aW9uIHNldHRpbmdzLlwiXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRydWUgLy8gS2VlcCB0aGUgc2VuZFJlc3BvbnNlIGZ1bmN0aW9uIHZhbGlkXG4gICAgfVxuXG4gICAgLy8gQ29udGludWUgd2l0aCBzY3JlZW5zaG90IGNhcHR1cmVcbiAgICBjYXB0dXJlQW5kU2VuZFNjcmVlbnNob3QobWVzc2FnZSwgYnJvd3NlckNvbm5lY3RvclNldHRpbmdzLCBzZW5kUmVzcG9uc2UpXG4gICAgcmV0dXJuIHRydWUgLy8gS2VlcCB0aGUgc2VuZFJlc3BvbnNlIGZ1bmN0aW9uIHZhbGlkXG4gIH1cblxuICAvLyBUcmFjayBXZWJTb2NrZXQgY29ubmVjdGlvbiBzdGF0ZVxuICBpZiAobWVzc2FnZS50eXBlID09PSBcIldFQlNPQ0tFVF9DT05ORUNURURcIikge1xuICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogV2ViU29ja2V0IGNvbm5lY3RlZCB0byBzZXJ2ZXJcIilcbiAgICBpc0Nvbm5lY3RlZFRvU2VydmVyID0gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKFxuICAgIG1lc3NhZ2UudHlwZSA9PT0gXCJXRUJTT0NLRVRfQ0xPU0VEXCIgfHxcbiAgICBtZXNzYWdlLnR5cGUgPT09IFwiU0VSVkVSX1ZBTElEQVRJT05fRkFJTEVEXCJcbiAgKSB7XG4gICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBXZWJTb2NrZXQgZGlzY29ubmVjdGVkIGZyb20gc2VydmVyXCIpXG4gICAgaXNDb25uZWN0ZWRUb1NlcnZlciA9IGZhbHNlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn0pXG5cbi8vIFZhbGlkYXRlIHNlcnZlciBpZGVudGl0eVxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eShcbiAgaG9zdDogc3RyaW5nLFxuICBwb3J0OiBudW1iZXJcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vLmlkZW50aXR5YCwge1xuICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDMwMDApIC8vIDMgc2Vjb25kIHRpbWVvdXRcbiAgICB9KVxuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2U6ICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBpZGVudGl0eSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgLy8gVmFsaWRhdGUgdGhlIHNlcnZlciBzaWduYXR1cmVcbiAgICBpZiAoaWRlbnRpdHkuc2lnbmF0dXJlICE9PSBcIm1jcC1icm93c2VyLWNvbm5lY3Rvci0yNHg3XCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHNlcnZlciBzaWduYXR1cmUgLSBub3QgdGhlIGJyb3dzZXIgdG9vbHMgc2VydmVyXCIpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB2YWxpZGF0aW5nIHNlcnZlciBpZGVudGl0eTpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLy8gVHJhY2sgVVJMcyBmb3IgZWFjaCB0YWJcbmNvbnN0IHRhYlVybHMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPigpXG5cbi8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgY3VycmVudCBVUkwgZm9yIGEgdGFiXG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VGFiVXJsKHRhYklkOiBudW1iZXIpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IEdldHRpbmcgVVJMIGZvciB0YWJcIiwgdGFiSWQpXG5cbiAgICAvLyBGaXJzdCBjaGVjayBpZiB3ZSBoYXZlIGl0IGNhY2hlZFxuICAgIGlmICh0YWJVcmxzLmhhcyh0YWJJZCkpIHtcbiAgICAgIGNvbnN0IGNhY2hlZFVybCA9IHRhYlVybHMuZ2V0KHRhYklkKVxuICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBGb3VuZCBjYWNoZWQgVVJMOlwiLCBjYWNoZWRVcmwpXG4gICAgICByZXR1cm4gY2FjaGVkVXJsXG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlIGdldCBpdCBmcm9tIHRoZSB0YWJcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGFiID0gYXdhaXQgY2hyb21lLnRhYnMuZ2V0KHRhYklkKVxuICAgICAgaWYgKHRhYiAmJiB0YWIudXJsKSB7XG4gICAgICAgIC8vIENhY2hlIHRoZSBVUkxcbiAgICAgICAgdGFiVXJscy5zZXQodGFiSWQsIHRhYi51cmwpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogR290IFVSTCBmcm9tIHRhYjpcIiwgdGFiLnVybClcbiAgICAgICAgcmV0dXJuIHRhYi51cmxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogVGFiIGV4aXN0cyBidXQgbm8gVVJMIGZvdW5kXCIpXG4gICAgICB9XG4gICAgfSBjYXRjaCAodGFiRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrZ3JvdW5kOiBFcnJvciBnZXR0aW5nIHRhYjpcIiwgdGFiRXJyb3IpXG4gICAgfVxuXG4gICAgLy8gSWYgd2UgY2FuJ3QgZ2V0IHRoZSB0YWIgZGlyZWN0bHksIHRyeSBxdWVyeWluZyBmb3IgYWN0aXZlIHRhYnNcbiAgICB0cnkge1xuICAgICAgY29uc3QgdGFicyA9IGF3YWl0IGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICBjdXJyZW50V2luZG93OiB0cnVlXG4gICAgICB9KVxuICAgICAgaWYgKHRhYnMgJiYgdGFicy5sZW5ndGggPiAwICYmIHRhYnNbMF0udXJsKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVVybCA9IHRhYnNbMF0udXJsXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogR290IFVSTCBmcm9tIGFjdGl2ZSB0YWI6XCIsIGFjdGl2ZVVybClcbiAgICAgICAgLy8gQ2FjaGUgdGhpcyBVUkwgYXMgd2VsbFxuICAgICAgICB0YWJVcmxzLnNldCh0YWJJZCwgYWN0aXZlVXJsKVxuICAgICAgICByZXR1cm4gYWN0aXZlVXJsXG4gICAgICB9XG4gICAgfSBjYXRjaCAocXVlcnlFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkJhY2tncm91bmQ6IEVycm9yIHF1ZXJ5aW5nIHRhYnM6XCIsIHF1ZXJ5RXJyb3IpXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBDb3VsZCBub3QgZmluZCBVUkwgZm9yIHRhYlwiLCB0YWJJZClcbiAgICByZXR1cm4gbnVsbFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrZ3JvdW5kOiBFcnJvciBnZXR0aW5nIHRhYiBVUkw6XCIsIGVycm9yKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLy8gTGlzdGVuIGZvciB0YWIgdXBkYXRlcyB0byBkZXRlY3QgcGFnZSByZWZyZXNoZXMgYW5kIFVSTCBjaGFuZ2VzXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpID0+IHtcbiAgLy8gVHJhY2sgVVJMIGNoYW5nZXNcbiAgaWYgKGNoYW5nZUluZm8udXJsKSB7XG4gICAgY29uc29sZS5sb2coYFVSTCBjaGFuZ2VkIGluIHRhYiAke3RhYklkfSB0byAke2NoYW5nZUluZm8udXJsfWApXG4gICAgdGFiVXJscy5zZXQodGFiSWQsIGNoYW5nZUluZm8udXJsKVxuXG4gICAgLy8gU2VuZCBVUkwgdXBkYXRlIHRvIHNlcnZlciBpZiBwb3NzaWJsZVxuICAgIHVwZGF0ZVNlcnZlcldpdGhVcmwodGFiSWQsIGNoYW5nZUluZm8udXJsLCBcInRhYl91cmxfY2hhbmdlXCIpXG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgcGFnZSByZWZyZXNoIChzdGF0dXMgYmVjb21pbmcgXCJjb21wbGV0ZVwiKVxuICBpZiAoY2hhbmdlSW5mby5zdGF0dXMgPT09IFwiY29tcGxldGVcIikge1xuICAgIC8vIFVwZGF0ZSBVUkwgaW4gb3VyIGNhY2hlXG4gICAgaWYgKHRhYi51cmwpIHtcbiAgICAgIHRhYlVybHMuc2V0KHRhYklkLCB0YWIudXJsKVxuICAgICAgLy8gU2VuZCBVUkwgdXBkYXRlIHRvIHNlcnZlciBpZiBwb3NzaWJsZVxuICAgICAgdXBkYXRlU2VydmVyV2l0aFVybCh0YWJJZCwgdGFiLnVybCwgXCJwYWdlX2NvbXBsZXRlXCIpXG4gICAgfVxuXG4gICAgcmV0ZXN0Q29ubmVjdGlvbk9uUmVmcmVzaCh0YWJJZClcbiAgfVxufSlcblxuLy8gTGlzdGVuIGZvciB0YWIgYWN0aXZhdGlvbiAoc3dpdGNoaW5nIGJldHdlZW4gdGFicylcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKChhY3RpdmVJbmZvKSA9PiB7XG4gIGNvbnN0IHRhYklkID0gYWN0aXZlSW5mby50YWJJZFxuICBjb25zb2xlLmxvZyhgVGFiIGFjdGl2YXRlZDogJHt0YWJJZH1gKVxuXG4gIC8vIEdldCB0aGUgVVJMIG9mIHRoZSBuZXdseSBhY3RpdmF0ZWQgdGFiXG4gIGNocm9tZS50YWJzLmdldCh0YWJJZCwgKHRhYikgPT4ge1xuICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIHRhYiBpbmZvOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGFiICYmIHRhYi51cmwpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBBY3RpdmUgdGFiIGNoYW5nZWQgdG8gJHt0YWIudXJsfWApXG5cbiAgICAgIC8vIFVwZGF0ZSBvdXIgY2FjaGVcbiAgICAgIHRhYlVybHMuc2V0KHRhYklkLCB0YWIudXJsKVxuXG4gICAgICAvLyBTZW5kIFVSTCB1cGRhdGUgdG8gc2VydmVyIGlmIHBvc3NpYmxlXG4gICAgICB1cGRhdGVTZXJ2ZXJXaXRoVXJsKHRhYklkLCB0YWIudXJsLCBcInRhYl9hY3RpdmF0ZWRcIilcbiAgICB9XG4gIH0pXG59KVxuXG4vLyBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNlcnZlciB3aXRoIHRoZSBjdXJyZW50IFVSTFxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2VydmVyV2l0aFVybChcbiAgdGFiSWQ6IG51bWJlcixcbiAgdXJsOiBzdHJpbmcsXG4gIHNvdXJjZSA9IFwiYmFja2dyb3VuZF91cGRhdGVcIlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghdXJsKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkNhbm5vdCB1cGRhdGUgc2VydmVyIHdpdGggZW1wdHkgVVJMXCIpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgc2VydmVyIHdpdGggVVJMIGZvciB0YWIgJHt0YWJJZH06ICR7dXJsfWApXG5cbiAgLy8gTWF4aW11bSBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHNcbiAgY29uc3QgbWF4UmV0cmllcyA9IDNcbiAgbGV0IHJldHJ5Q291bnQgPSAwXG4gIGxldCBzdWNjZXNzID0gZmFsc2VcblxuICB3aGlsZSAocmV0cnlDb3VudCA8IG1heFJldHJpZXMgJiYgIXN1Y2Nlc3MpIHtcbiAgICB0cnkge1xuICAgICAgLy8gU2VuZCB0aGUgVVJMIHRvIHRoZSBzZXJ2ZXJcbiAgICAgIGNvbnN0IHNlcnZlclVybCA9IGBodHRwOi8vJHticm93c2VyQ29ubmVjdG9yU2V0dGluZ3Muc2VydmVySG9zdH06JHticm93c2VyQ29ubmVjdG9yU2V0dGluZ3Muc2VydmVyUG9ydH0vY3VycmVudC11cmxgXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYEF0dGVtcHQgJHtyZXRyeUNvdW50ICsgMX0vJHttYXhSZXRyaWVzfSB0byB1cGRhdGUgc2VydmVyIHdpdGggVVJMOiAke3VybH1gXG4gICAgICApXG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc2VydmVyVXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgdGFiSWQ6IHRhYklkLFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICB9KSxcbiAgICAgICAgLy8gQWRkIGEgdGltZW91dCB0byBwcmV2ZW50IGhhbmdpbmcgcmVxdWVzdHNcbiAgICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDUwMDApXG4gICAgICB9KVxuXG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBTdWNjZXNzZnVsbHkgdXBkYXRlZCBzZXJ2ZXIgd2l0aCBVUkw6ICR7dXJsfWAsXG4gICAgICAgICAgcmVzcG9uc2VEYXRhXG4gICAgICAgIClcbiAgICAgICAgc3VjY2VzcyA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFNlcnZlciByZXR1cm5lZCBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gXG4gICAgICAgIClcbiAgICAgICAgcmV0cnlDb3VudCsrXG4gICAgICAgIC8vIFdhaXQgYmVmb3JlIHJldHJ5aW5nXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMCkpXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHVwZGF0aW5nIHNlcnZlciB3aXRoIFVSTDogJHtlcnJvci5tZXNzYWdlfWApXG4gICAgICByZXRyeUNvdW50KytcbiAgICAgIC8vIFdhaXQgYmVmb3JlIHJldHJ5aW5nXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKVxuICAgIH1cbiAgfVxuXG4gIGlmICghc3VjY2Vzcykge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgRmFpbGVkIHRvIHVwZGF0ZSBzZXJ2ZXIgd2l0aCBVUkwgYWZ0ZXIgJHttYXhSZXRyaWVzfSBhdHRlbXB0c2BcbiAgICApXG4gIH1cbn1cblxuLy8gQ2xlYW4gdXAgd2hlbiB0YWJzIGFyZSBjbG9zZWRcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcigodGFiSWQpID0+IHtcbiAgdGFiVXJscy5kZWxldGUodGFiSWQpXG59KVxuXG4vLyBGdW5jdGlvbiB0byByZXRlc3QgY29ubmVjdGlvbiB3aGVuIGEgcGFnZSBpcyByZWZyZXNoZWRcbmFzeW5jIGZ1bmN0aW9uIHJldGVzdENvbm5lY3Rpb25PblJlZnJlc2godGFiSWQpIHtcbiAgY29uc29sZS5sb2coYFBhZ2UgcmVmcmVzaGVkIGluIHRhYiAke3RhYklkfSwgcmV0ZXN0aW5nIGNvbm5lY3Rpb24uLi5gKVxuXG4gIC8vIFRlc3QgdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgbGFzdCBrbm93biBob3N0IGFuZCBwb3J0XG4gIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eShcbiAgICBicm93c2VyQ29ubmVjdG9yU2V0dGluZ3Muc2VydmVySG9zdCxcbiAgICBicm93c2VyQ29ubmVjdG9yU2V0dGluZ3Muc2VydmVyUG9ydFxuICApXG5cbiAgLy8gTm90aWZ5IGFsbCBkZXZ0b29scyBpbnN0YW5jZXMgYWJvdXQgdGhlIGNvbm5lY3Rpb24gc3RhdHVzXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICB0eXBlOiBcIkNPTk5FQ1RJT05fU1RBVFVTX1VQREFURVwiLFxuICAgIGlzQ29ubmVjdGVkOiBpc0Nvbm5lY3RlZCxcbiAgICB0YWJJZDogdGFiSWRcbiAgfSlcblxuICAvLyBBbHdheXMgbm90aWZ5IGZvciBwYWdlIHJlZnJlc2gsIHdoZXRoZXIgY29ubmVjdGVkIG9yIG5vdFxuICAvLyBUaGlzIGVuc3VyZXMgYW55IG9uZ29pbmcgZGlzY292ZXJ5IGlzIGNhbmNlbGxlZCBhbmQgcmVzdGFydGVkXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICB0eXBlOiBcIklOSVRJQVRFX0FVVE9fRElTQ09WRVJZXCIsXG4gICAgcmVhc29uOiBcInBhZ2VfcmVmcmVzaFwiLFxuICAgIHRhYklkOiB0YWJJZCxcbiAgICBmb3JjZVJlc3RhcnQ6IHRydWUgLy8gQWRkIGEgZmxhZyB0byBpbmRpY2F0ZSB0aGlzIHNob3VsZCBmb3JjZSByZXN0YXJ0IGFueSBvbmdvaW5nIHByb2Nlc3Nlc1xuICB9KVxuXG4gIGlmICghaXNDb25uZWN0ZWQpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwiQ29ubmVjdGlvbiB0ZXN0IGZhaWxlZCBhZnRlciBwYWdlIHJlZnJlc2gsIGluaXRpYXRpbmcgYXV0by1kaXNjb3ZlcnkuLi5cIlxuICAgIClcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gdGVzdCBzdWNjZXNzZnVsIGFmdGVyIHBhZ2UgcmVmcmVzaFwiKVxuICB9XG59XG5cbi8vIEZ1bmN0aW9uIHRvIGNhcHR1cmUgYW5kIHNlbmQgc2NyZWVuc2hvdFxuZnVuY3Rpb24gY2FwdHVyZUFuZFNlbmRTY3JlZW5zaG90KG1lc3NhZ2UsIHNldHRpbmdzLCBzZW5kUmVzcG9uc2UpIHtcbiAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBTdGFydGluZyBzY3JlZW5zaG90IGNhcHR1cmUgcHJvY2Vzc1wiKVxuXG4gIC8vIEdldCB0aGUgaW5zcGVjdGVkIHdpbmRvdydzIHRhYlxuICBjaHJvbWUudGFicy5nZXQobWVzc2FnZS50YWJJZCwgKHRhYikgPT4ge1xuICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZXR0aW5nIHRhYjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZVxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEdldCBhbGwgd2luZG93cyB0byBmaW5kIHRoZSBvbmUgY29udGFpbmluZyBvdXIgdGFiXG4gICAgY2hyb21lLndpbmRvd3MuZ2V0QWxsKHsgcG9wdWxhdGU6IHRydWUgfSwgKHdpbmRvd3MpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldFdpbmRvdyA9IHdpbmRvd3MuZmluZCgodykgPT5cbiAgICAgICAgdy50YWJzLnNvbWUoKHQpID0+IHQuaWQgPT09IG1lc3NhZ2UudGFiSWQpXG4gICAgICApXG5cbiAgICAgIGlmICghdGFyZ2V0V2luZG93KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgZmluZCB3aW5kb3cgY29udGFpbmluZyB0aGUgaW5zcGVjdGVkIHRhYlwiKVxuICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBcIkNvdWxkIG5vdCBmaW5kIHdpbmRvdyBjb250YWluaW5nIHRoZSBpbnNwZWN0ZWQgdGFiXCJcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgQmFja2dyb3VuZDogRm91bmQgdGFyZ2V0IHdpbmRvdyAke3RhcmdldFdpbmRvdy5pZH0gZm9yIHNjcmVlbnNob3RgXG4gICAgICApXG5cbiAgICAgIC8vIENhcHR1cmUgc2NyZWVuc2hvdCBvZiB0aGUgd2luZG93IGNvbnRhaW5pbmcgb3VyIHRhYlxuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoXG4gICAgICAgIHRhcmdldFdpbmRvdy5pZCxcbiAgICAgICAgeyBmb3JtYXQ6IFwicG5nXCIgfSxcbiAgICAgICAgKGRhdGFVcmwpID0+IHtcbiAgICAgICAgICAvLyBJZ25vcmUgRGV2VG9vbHMgcGFuZWwgY2FwdHVyZSBlcnJvciBpZiBpdCBvY2N1cnNcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgJiZcbiAgICAgICAgICAgICFjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcImRldnRvb2xzOi8vXCIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIkVycm9yIGNhcHR1cmluZyBzY3JlZW5zaG90OlwiLFxuICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICBlcnJvcjogY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTZW5kIHNjcmVlbnNob3QgZGF0YSB0byBicm93c2VyIGNvbm5lY3RvciB1c2luZyBjb25maWd1cmVkIHNldHRpbmdzXG4gICAgICAgICAgY29uc3Qgc2VydmVyVXJsID0gYGh0dHA6Ly8ke3NldHRpbmdzLnNlcnZlckhvc3R9OiR7c2V0dGluZ3Muc2VydmVyUG9ydH0vc2NyZWVuc2hvdGBcbiAgICAgICAgICBjb25zb2xlLmxvZyhgQmFja2dyb3VuZDogU2VuZGluZyBzY3JlZW5zaG90IHRvICR7c2VydmVyVXJsfWApXG5cbiAgICAgICAgICBmZXRjaChzZXJ2ZXJVcmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBkYXRhOiBkYXRhVXJsLFxuICAgICAgICAgICAgICBwYXRoOiBtZXNzYWdlLnNjcmVlbnNob3RQYXRoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgIGBTZXJ2ZXIgcmV0dXJuZWQgJHtyZXNwb25zZS5zdGF0dXN9OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZyb20gc2VydmVyOlwiLCByZXN1bHQuZXJyb3IpXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiByZXN1bHQuZXJyb3IgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNjcmVlbnNob3Qgc2F2ZWQgc3VjY2Vzc2Z1bGx5OlwiLCByZXN1bHQucGF0aClcbiAgICAgICAgICAgICAgICAvLyBTZW5kIHN1Y2Nlc3MgcmVzcG9uc2UgZXZlbiBpZiBEZXZUb29scyBjYXB0dXJlIGZhaWxlZFxuICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgcGF0aDogcmVzdWx0LnBhdGgsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogdGFiLnRpdGxlIHx8IFwiQ3VycmVudCBUYWJcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIHNjcmVlbnNob3QgZGF0YTpcIiwgZXJyb3IpXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gc2F2ZSBzY3JlZW5zaG90XCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQge31cbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiQHBsYXNtb2hxL3N0b3JhZ2VcIlxuXG4vLyBEZWZpbmUgdGhlIHNldHRpbmdzIGludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3Mge1xuICBsb2dMaW1pdDogbnVtYmVyXG4gIHF1ZXJ5TGltaXQ6IG51bWJlclxuICBzdHJpbmdTaXplTGltaXQ6IG51bWJlclxuICBtYXhMb2dTaXplOiBudW1iZXJcbiAgc2hvd1JlcXVlc3RIZWFkZXJzOiBib29sZWFuXG4gIHNob3dSZXNwb25zZUhlYWRlcnM6IGJvb2xlYW5cbiAgc2NyZWVuc2hvdFBhdGg6IHN0cmluZ1xuICBzZXJ2ZXJIb3N0OiBzdHJpbmdcbiAgc2VydmVyUG9ydDogbnVtYmVyXG4gIGFsbG93QXV0b1Bhc3RlOiBib29sZWFuXG59XG5cbi8vIERlZmF1bHQgc2V0dGluZ3NcbmV4cG9ydCBjb25zdCBkZWZhdWx0U2V0dGluZ3M6IEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncyA9IHtcbiAgbG9nTGltaXQ6IDUwLFxuICBxdWVyeUxpbWl0OiAzMDAwMCxcbiAgc3RyaW5nU2l6ZUxpbWl0OiA1MDAsXG4gIG1heExvZ1NpemU6IDIwMDAwLFxuICBzaG93UmVxdWVzdEhlYWRlcnM6IGZhbHNlLFxuICBzaG93UmVzcG9uc2VIZWFkZXJzOiBmYWxzZSxcbiAgc2NyZWVuc2hvdFBhdGg6IFwiXCIsXG4gIHNlcnZlckhvc3Q6IFwibG9jYWxob3N0XCIsXG4gIHNlcnZlclBvcnQ6IDMwMjUsXG4gIGFsbG93QXV0b1Bhc3RlOiBmYWxzZVxufVxuXG4vLyBDcmVhdGUgYSBzdG9yYWdlIGluc3RhbmNlXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2Uoe1xuICBhcmVhOiBcImxvY2FsXCJcbn0pXG5cbi8vIEtleSBmb3Igc3RvcmluZyBzZXR0aW5nc1xuY29uc3QgU0VUVElOR1NfS0VZID0gXCJicm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIlxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBzZXR0aW5nc1xuICogQHJldHVybnMgUHJvbWlzZSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncz4ge1xuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHN0b3JhZ2UuZ2V0PEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncz4oU0VUVElOR1NfS0VZKVxuICByZXR1cm4gc2V0dGluZ3MgPyB7IC4uLmRlZmF1bHRTZXR0aW5ncywgLi4uc2V0dGluZ3MgfSA6IHsgLi4uZGVmYXVsdFNldHRpbmdzIH1cbn1cblxuLyoqXG4gKiBTYXZlIHNldHRpbmdzXG4gKiBAcGFyYW0gc2V0dGluZ3MgVGhlIHNldHRpbmdzIHRvIHNhdmVcbiAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHNldHRpbmdzIGFyZSBzYXZlZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKFxuICBzZXR0aW5nczogUGFydGlhbDxCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3M+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY3VycmVudFNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKVxuICBjb25zdCBuZXdTZXR0aW5ncyA9IHsgLi4uY3VycmVudFNldHRpbmdzLCAuLi5zZXR0aW5ncyB9XG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFNFVFRJTkdTX0tFWSwgbmV3U2V0dGluZ3MpXG4gIFxuICAvLyBOb3RpZnkgYWxsIHBhcnRzIG9mIHRoZSBleHRlbnNpb24gYWJvdXQgdGhlIHNldHRpbmdzIHVwZGF0ZVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgdHlwZTogXCJTRVRUSU5HU19VUERBVEVEXCIsXG4gICAgc2V0dGluZ3M6IG5ld1NldHRpbmdzXG4gIH0pXG59XG5cbi8qKlxuICogTGlzdGVuIGZvciBzZXR0aW5ncyBjaGFuZ2VzXG4gKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHNldHRpbmdzIGNoYW5nZVxuICogQHJldHVybnMgRnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uU2V0dGluZ3NDaGFuZ2VkKFxuICBjYWxsYmFjazogKHNldHRpbmdzOiBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MpID0+IHZvaWRcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBsaXN0ZW5lciA9IChjaGFuZ2VzLCBhcmVhKSA9PiB7XG4gICAgaWYgKGFyZWEgPT09IFwibG9jYWxcIiAmJiBTRVRUSU5HU19LRVkgaW4gY2hhbmdlcykge1xuICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSBjaGFuZ2VzW1NFVFRJTkdTX0tFWV0ubmV3VmFsdWVcbiAgICAgIGNhbGxiYWNrKG5ld1NldHRpbmdzKVxuICAgIH1cbiAgfVxuICBcbiAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKGxpc3RlbmVyKVxuICBcbiAgLy8gQWxzbyBsaXN0ZW4gZm9yIHJ1bnRpbWUgbWVzc2FnZXMgYWJvdXQgc2V0dGluZ3MgdXBkYXRlc1xuICBjb25zdCBtZXNzYWdlTGlzdGVuZXIgPSAobWVzc2FnZSkgPT4ge1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiU0VUVElOR1NfVVBEQVRFRFwiKSB7XG4gICAgICBjYWxsYmFjayhtZXNzYWdlLnNldHRpbmdzKVxuICAgIH1cbiAgfVxuICBcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VMaXN0ZW5lcilcbiAgXG4gIC8vIFJldHVybiBhIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKVxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihtZXNzYWdlTGlzdGVuZXIpXG4gIH1cbn1cbiIsImltcG9ydCBtIGZyb21cInBpZnlcIjt2YXIgbD0oKT0+e3RyeXtsZXQgZT0oZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudCkubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKXx8W107aWYoZVsxXT09PVwiQ2hyb21lXCIpcmV0dXJuIHBhcnNlSW50KGVbMl0pPDEwMHx8Z2xvYmFsVGhpcy5jaHJvbWUucnVudGltZT8uZ2V0TWFuaWZlc3QoKT8ubWFuaWZlc3RfdmVyc2lvbj09PTJ9Y2F0Y2h7cmV0dXJuITF9cmV0dXJuITF9O3ZhciBvPWNsYXNzeyNyOyN0O2dldCBwcmltYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI3R9I2U7Z2V0IHNlY29uZGFyeUNsaWVudCgpe3JldHVybiB0aGlzLiNlfSNhO2dldCBhcmVhKCl7cmV0dXJuIHRoaXMuI2F9Z2V0IGhhc1dlYkFwaSgpe3RyeXtyZXR1cm4gdHlwZW9mIHdpbmRvdzxcInVcIiYmISF3aW5kb3cubG9jYWxTdG9yYWdlfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX0jcz1uZXcgTWFwOyNpO2dldCBjb3BpZWRLZXlTZXQoKXtyZXR1cm4gdGhpcy4jaX1pc0NvcGllZD1lPT50aGlzLmhhc1dlYkFwaSYmKHRoaXMuYWxsQ29waWVkfHx0aGlzLmNvcGllZEtleVNldC5oYXMoZSkpOyNuPSExO2dldCBhbGxDb3BpZWQoKXtyZXR1cm4gdGhpcy4jbn1nZXRFeHRTdG9yYWdlQXBpPSgpPT5nbG9iYWxUaGlzLmJyb3dzZXI/LnN0b3JhZ2V8fGdsb2JhbFRoaXMuY2hyb21lPy5zdG9yYWdlO2dldCBoYXNFeHRlbnNpb25BcGkoKXt0cnl7cmV0dXJuISF0aGlzLmdldEV4dFN0b3JhZ2VBcGkoKX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19aXNXYXRjaFN1cHBvcnRlZD0oKT0+dGhpcy5oYXNFeHRlbnNpb25BcGk7a2V5TmFtZXNwYWNlPVwiXCI7aXNWYWxpZEtleT1lPT5lLnN0YXJ0c1dpdGgodGhpcy5rZXlOYW1lc3BhY2UpO2dldE5hbWVzcGFjZWRLZXk9ZT0+YCR7dGhpcy5rZXlOYW1lc3BhY2V9JHtlfWA7Z2V0VW5uYW1lc3BhY2VkS2V5PWU9PmUuc2xpY2UodGhpcy5rZXlOYW1lc3BhY2UubGVuZ3RoKTtzZXJkZT17c2VyaWFsaXplcjpKU09OLnN0cmluZ2lmeSxkZXNlcmlhbGl6ZXI6SlNPTi5wYXJzZX07Y29uc3RydWN0b3Ioe2FyZWE6ZT1cInN5bmNcIixhbGxDb3BpZWQ6dD0hMSxjb3BpZWRLZXlMaXN0OnM9W10sc2VyZGU6cj17fX09e30pe3RoaXMuc2V0Q29waWVkS2V5U2V0KHMpLHRoaXMuI2E9ZSx0aGlzLiNuPXQsdGhpcy5zZXJkZT17Li4udGhpcy5zZXJkZSwuLi5yfTt0cnl7dGhpcy5oYXNXZWJBcGkmJih0fHxzLmxlbmd0aD4wKSYmKHRoaXMuI2U9d2luZG93LmxvY2FsU3RvcmFnZSl9Y2F0Y2h7fXRyeXt0aGlzLmhhc0V4dGVuc2lvbkFwaSYmKHRoaXMuI3I9dGhpcy5nZXRFeHRTdG9yYWdlQXBpKCksbCgpP3RoaXMuI3Q9bSh0aGlzLiNyW3RoaXMuYXJlYV0se2V4Y2x1ZGU6W1wiZ2V0Qnl0ZXNJblVzZVwiXSxlcnJvckZpcnN0OiExfSk6dGhpcy4jdD10aGlzLiNyW3RoaXMuYXJlYV0pfWNhdGNoe319c2V0Q29waWVkS2V5U2V0KGUpe3RoaXMuI2k9bmV3IFNldChlKX1yYXdHZXRBbGw9KCk9PnRoaXMuI3Q/LmdldCgpO2dldEFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTtyZXR1cm4gT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzVmFsaWRLZXkodCkpLnJlZHVjZSgodCxbcyxyXSk9Pih0W3RoaXMuZ2V0VW5uYW1lc3BhY2VkS2V5KHMpXT1yLHQpLHt9KX07Y29weT1hc3luYyBlPT57bGV0IHQ9ZT09PXZvaWQgMDtpZighdCYmIXRoaXMuY29waWVkS2V5U2V0LmhhcyhlKXx8IXRoaXMuYWxsQ29waWVkfHwhdGhpcy5oYXNFeHRlbnNpb25BcGkpcmV0dXJuITE7bGV0IHM9dGhpcy5hbGxDb3BpZWQ/YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTphd2FpdCB0aGlzLiN0LmdldCgodD9bLi4udGhpcy5jb3BpZWRLZXlTZXRdOltlXSkubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSkpO2lmKCFzKXJldHVybiExO2xldCByPSExO2ZvcihsZXQgYSBpbiBzKXtsZXQgaT1zW2FdLG49dGhpcy4jZT8uZ2V0SXRlbShhKTt0aGlzLiNlPy5zZXRJdGVtKGEsaSkscnx8PWkhPT1ufXJldHVybiByfTtyYXdHZXQ9YXN5bmMgZT0+KGF3YWl0IHRoaXMucmF3R2V0TWFueShbZV0pKVtlXTtyYXdHZXRNYW55PWFzeW5jIGU9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpP2F3YWl0IHRoaXMuI3QuZ2V0KGUpOmUuZmlsdGVyKHRoaXMuaXNDb3BpZWQpLnJlZHVjZSgodCxzKT0+KHRbc109dGhpcy4jZT8uZ2V0SXRlbShzKSx0KSx7fSk7cmF3U2V0PWFzeW5jKGUsdCk9PmF3YWl0IHRoaXMucmF3U2V0TWFueSh7W2VdOnR9KTtyYXdTZXRNYW55PWFzeW5jIGU9Pih0aGlzLiNlJiZPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFt0XSk9PnRoaXMuaXNDb3BpZWQodCkpLmZvckVhY2goKFt0LHNdKT0+dGhpcy4jZS5zZXRJdGVtKHQscykpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiN0LnNldChlKSxudWxsKTtjbGVhcj1hc3luYyhlPSExKT0+e2UmJnRoaXMuI2U/LmNsZWFyKCksYXdhaXQgdGhpcy4jdC5jbGVhcigpfTtyYXdSZW1vdmU9YXN5bmMgZT0+e2F3YWl0IHRoaXMucmF3UmVtb3ZlTWFueShbZV0pfTtyYXdSZW1vdmVNYW55PWFzeW5jIGU9Pnt0aGlzLiNlJiZlLmZpbHRlcih0aGlzLmlzQ29waWVkKS5mb3JFYWNoKHQ9PnRoaXMuI2UucmVtb3ZlSXRlbSh0KSksdGhpcy5oYXNFeHRlbnNpb25BcGkmJmF3YWl0IHRoaXMuI3QucmVtb3ZlKGUpfTtyZW1vdmVBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMuZ2V0QWxsKCksdD1PYmplY3Qua2V5cyhlKTthd2FpdCB0aGlzLnJlbW92ZU1hbnkodCl9O3dhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jbyhlKSx0fTsjbz1lPT57Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxyPXRoaXMuI3MuZ2V0KHMpPy5jYWxsYmFja1NldHx8bmV3IFNldDtpZihyLmFkZChlW3RdKSxyLnNpemU+MSljb250aW51ZTtsZXQgYT0oaSxuKT0+e2lmKG4hPT10aGlzLmFyZWF8fCFpW3NdKXJldHVybjtsZXQgaD10aGlzLiNzLmdldChzKTtpZighaCl0aHJvdyBuZXcgRXJyb3IoYFN0b3JhZ2UgY29tbXMgZG9lcyBub3QgZXhpc3QgZm9yIG5zS2V5OiAke3N9YCk7UHJvbWlzZS5hbGwoW3RoaXMucGFyc2VWYWx1ZShpW3NdLm5ld1ZhbHVlKSx0aGlzLnBhcnNlVmFsdWUoaVtzXS5vbGRWYWx1ZSldKS50aGVuKChbeSxkXSk9Pntmb3IobGV0IHAgb2YgaC5jYWxsYmFja1NldClwKHtuZXdWYWx1ZTp5LG9sZFZhbHVlOmR9LG4pfSl9O3RoaXMuI3Iub25DaGFuZ2VkLmFkZExpc3RlbmVyKGEpLHRoaXMuI3Muc2V0KHMse2NhbGxiYWNrU2V0OnIsbGlzdGVuZXI6YX0pfX07dW53YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI2MoZSksdH07I2MoZSl7Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxyPWVbdF0sYT10aGlzLiNzLmdldChzKTthJiYoYS5jYWxsYmFja1NldC5kZWxldGUociksYS5jYWxsYmFja1NldC5zaXplPT09MCYmKHRoaXMuI3MuZGVsZXRlKHMpLHRoaXMuI3Iub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGEubGlzdGVuZXIpKSl9fXVud2F0Y2hBbGw9KCk9PnRoaXMuI2goKTsjaCgpe3RoaXMuI3MuZm9yRWFjaCgoe2xpc3RlbmVyOmV9KT0+dGhpcy4jci5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoZSkpLHRoaXMuI3MuY2xlYXIoKX1hc3luYyBnZXRJdGVtKGUpe3JldHVybiB0aGlzLmdldChlKX1hc3luYyBnZXRJdGVtcyhlKXtyZXR1cm4gYXdhaXQgdGhpcy5nZXRNYW55KGUpfWFzeW5jIHNldEl0ZW0oZSx0KXthd2FpdCB0aGlzLnNldChlLHQpfWFzeW5jIHNldEl0ZW1zKGUpe2F3YWl0IGF3YWl0IHRoaXMuc2V0TWFueShlKX1hc3luYyByZW1vdmVJdGVtKGUpe3JldHVybiB0aGlzLnJlbW92ZShlKX1hc3luYyByZW1vdmVJdGVtcyhlKXtyZXR1cm4gYXdhaXQgdGhpcy5yZW1vdmVNYW55KGUpfX0sZz1jbGFzcyBleHRlbmRzIG97Z2V0PWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSkscz1hd2FpdCB0aGlzLnJhd0dldCh0KTtyZXR1cm4gdGhpcy5wYXJzZVZhbHVlKHMpfTtnZXRNYW55PWFzeW5jIGU9PntsZXQgdD1lLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpLHM9YXdhaXQgdGhpcy5yYXdHZXRNYW55KHQpLHI9YXdhaXQgUHJvbWlzZS5hbGwoT2JqZWN0LnZhbHVlcyhzKS5tYXAodGhpcy5wYXJzZVZhbHVlKSk7cmV0dXJuIE9iamVjdC5rZXlzKHMpLnJlZHVjZSgoYSxpLG4pPT4oYVt0aGlzLmdldFVubmFtZXNwYWNlZEtleShpKV09cltuXSxhKSx7fSl9O3NldD1hc3luYyhlLHQpPT57bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHI9dGhpcy5zZXJkZS5zZXJpYWxpemVyKHQpO3JldHVybiB0aGlzLnJhd1NldChzLHIpfTtzZXRNYW55PWFzeW5jIGU9PntsZXQgdD1PYmplY3QuZW50cmllcyhlKS5yZWR1Y2UoKHMsW3IsYV0pPT4oc1t0aGlzLmdldE5hbWVzcGFjZWRLZXkocildPXRoaXMuc2VyZGUuc2VyaWFsaXplcihhKSxzKSx7fSk7cmV0dXJuIGF3YWl0IHRoaXMucmF3U2V0TWFueSh0KX07cmVtb3ZlPWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSk7cmV0dXJuIHRoaXMucmF3UmVtb3ZlKHQpfTtyZW1vdmVNYW55PWFzeW5jIGU9PntsZXQgdD1lLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpO3JldHVybiBhd2FpdCB0aGlzLnJhd1JlbW92ZU1hbnkodCl9O3NldE5hbWVzcGFjZT1lPT57dGhpcy5rZXlOYW1lc3BhY2U9ZX07cGFyc2VWYWx1ZT1hc3luYyBlPT57dHJ5e2lmKGUhPT12b2lkIDApcmV0dXJuIHRoaXMuc2VyZGUuZGVzZXJpYWxpemVyKGUpfWNhdGNoKHQpe2NvbnNvbGUuZXJyb3IodCl9fX07ZXhwb3J0e28gYXMgQmFzZVN0b3JhZ2UsZyBhcyBTdG9yYWdlfTtcbiIsImNvbnN0IHByb2Nlc3NGdW5jdGlvbiA9IChmdW5jdGlvbl8sIG9wdGlvbnMsIHByb3h5LCB1bndyYXBwZWQpID0+IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdGNvbnN0IFAgPSBvcHRpb25zLnByb21pc2VNb2R1bGU7XG5cblx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRpZiAob3B0aW9ucy5tdWx0aUFyZ3MpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoLi4ucmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0WzBdKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocmVzdWx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnNoaWZ0KCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoZXJyb3IsIHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaChyZXNvbHZlKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcyA9PT0gcHJveHkgPyB1bndyYXBwZWQgOiB0aGlzO1xuXHRcdFJlZmxlY3QuYXBwbHkoZnVuY3Rpb25fLCBzZWxmLCBhcmd1bWVudHNfKTtcblx0fSk7XG59O1xuXG5jb25zdCBmaWx0ZXJDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpZnkoaW5wdXQsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IHtcblx0XHRleGNsdWRlOiBbLy4rKD86U3luY3xTdHJlYW0pJC9dLFxuXHRcdGVycm9yRmlyc3Q6IHRydWUsXG5cdFx0cHJvbWlzZU1vZHVsZTogUHJvbWlzZSxcblx0XHQuLi5vcHRpb25zLFxuXHR9O1xuXG5cdGNvbnN0IG9iamVjdFR5cGUgPSB0eXBlb2YgaW5wdXQ7XG5cdGlmICghKGlucHV0ICE9PSBudWxsICYmIChvYmplY3RUeXBlID09PSAnb2JqZWN0JyB8fCBvYmplY3RUeXBlID09PSAnZnVuY3Rpb24nKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbnB1dFxcYCB0byBiZSBhIFxcYEZ1bmN0aW9uXFxgIG9yIFxcYE9iamVjdFxcYCwgZ290IFxcYCR7aW5wdXQgPT09IG51bGwgPyAnbnVsbCcgOiBvYmplY3RUeXBlfVxcYGApO1xuXHR9XG5cblx0Y29uc3QgZmlsdGVyID0gKHRhcmdldCwga2V5KSA9PiB7XG5cdFx0bGV0IGNhY2hlZCA9IGZpbHRlckNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0aWYgKCFjYWNoZWQpIHtcblx0XHRcdGNhY2hlZCA9IHt9O1xuXHRcdFx0ZmlsdGVyQ2FjaGUuc2V0KHRhcmdldCwgY2FjaGVkKTtcblx0XHR9XG5cblx0XHRpZiAoa2V5IGluIGNhY2hlZCkge1xuXHRcdFx0cmV0dXJuIGNhY2hlZFtrZXldO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1hdGNoID0gcGF0dGVybiA9PiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSA/IGtleSA9PT0gcGF0dGVybiA6IHBhdHRlcm4udGVzdChrZXkpO1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG5cdFx0Y29uc3Qgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93biA9IChkZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgZGVzY3JpcHRvci53cml0YWJsZSB8fCBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSk7XG5cdFx0Y29uc3QgaW5jbHVkZWQgPSBvcHRpb25zLmluY2x1ZGUgPyBvcHRpb25zLmluY2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKSA6ICFvcHRpb25zLmV4Y2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKTtcblx0XHRjb25zdCBzaG91bGRGaWx0ZXIgPSBpbmNsdWRlZCAmJiB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duO1xuXHRcdGNhY2hlZFtrZXldID0gc2hvdWxkRmlsdGVyO1xuXHRcdHJldHVybiBzaG91bGRGaWx0ZXI7XG5cdH07XG5cblx0Y29uc3QgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5cdGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGlucHV0LCB7XG5cdFx0YXBwbHkodGFyZ2V0LCB0aGlzQXJnLCBhcmdzKSB7XG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShjYWNoZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwaWZpZWQgPSBvcHRpb25zLmV4Y2x1ZGVNYWluID8gdGFyZ2V0IDogcHJvY2Vzc0Z1bmN0aW9uKHRhcmdldCwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRjYWNoZS5zZXQodGFyZ2V0LCBwaWZpZWQpO1xuXHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkocGlmaWVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHR9LFxuXG5cdFx0Z2V0KHRhcmdldCwga2V5KSB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWV4dGVuZC1uYXRpdmUvbm8tdXNlLWV4dGVuZC1uYXRpdmVcblx0XHRcdGlmICghZmlsdGVyKHRhcmdldCwga2V5KSB8fCBwcm9wZXJ0eSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlW2tleV0pIHtcblx0XHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQocHJvcGVydHkpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBjYWNoZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Y29uc3QgcGlmaWVkID0gcHJvY2Vzc0Z1bmN0aW9uKHByb3BlcnR5LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdFx0Y2FjaGUuc2V0KHByb3BlcnR5LCBwaWZpZWQpO1xuXHRcdFx0XHRyZXR1cm4gcGlmaWVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHByb3h5O1xufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImluZGV4LmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);