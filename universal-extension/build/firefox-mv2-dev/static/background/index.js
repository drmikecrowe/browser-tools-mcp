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
})({"dr60V":[function(require,module,exports) {
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
    "serverPort": 42097
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
var _background = require("../../../background");

},{"../../../background":"lgUzI"}],"lgUzI":[function(require,module,exports) {
// Listen for messages from the devtools panel
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let isConnectedToServer = false;
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
            return true; // Keep the sendResponse function valid
        }
        // First get the server settings
        chrome.storage.local.get([
            "browserConnectorSettings"
        ], (result)=>{
            const settings = result.browserConnectorSettings || {
                serverHost: "localhost",
                serverPort: 3025
            };
            // Continue with screenshot capture
            captureAndSendScreenshot(message, settings, sendResponse);
        });
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
// background.ts - Migrated from Chrome extension to Plasmo
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
    // Get server settings from storage
    chrome.storage.local.get([
        "browserConnectorSettings"
    ], async (result)=>{
        const settings = result.browserConnectorSettings || {
            serverHost: "localhost",
            serverPort: 3025
        };
        // Maximum number of retry attempts
        const maxRetries = 3;
        let retryCount = 0;
        let success = false;
        while(retryCount < maxRetries && !success)try {
            // Send the URL to the server
            const serverUrl = `http://${settings.serverHost}:${settings.serverPort}/current-url`;
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
    });
}
// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId)=>{
    tabUrls.delete(tabId);
});
// Function to retest connection when a page is refreshed
async function retestConnectionOnRefresh(tabId) {
    console.log(`Page refreshed in tab ${tabId}, retesting connection...`);
    // Get the saved settings
    chrome.storage.local.get([
        "browserConnectorSettings"
    ], async (result)=>{
        const settings = result.browserConnectorSettings || {
            serverHost: "localhost",
            serverPort: 3025
        };
        // Test the connection with the last known host and port
        const isConnected = await validateServerIdentity(settings.serverHost, settings.serverPort);
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
    });
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

},{}]},["dr60V","iJkwT"], "iJkwT", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0NBQWtDO29CQUNoRCxhQUFhO3dCQUNYLFNBQVM7d0JBQ1QsT0FBTyxNQUFNLFdBQVc7b0JBQzFCO2dCQUNGO1lBQ0o7UUFDRjtJQUNGO0FBQ0Y7OztBQ3hhQSxRQUFRLGlCQUFpQixTQUFVLENBQUM7SUFDbEMsT0FBTyxLQUFLLEVBQUUsYUFBYSxJQUFJO1FBQUMsU0FBUztJQUFDO0FBQzVDO0FBRUEsUUFBUSxvQkFBb0IsU0FBVSxDQUFDO0lBQ3JDLE9BQU8sZUFBZSxHQUFHLGNBQWM7UUFBQyxPQUFPO0lBQUk7QUFDckQ7QUFFQSxRQUFRLFlBQVksU0FBVSxNQUFNLEVBQUUsSUFBSTtJQUN4QyxPQUFPLEtBQUssUUFBUSxRQUFRLFNBQVUsR0FBRztRQUN2QyxJQUFJLFFBQVEsYUFBYSxRQUFRLGdCQUFnQixLQUFLLGVBQWUsTUFDbkU7UUFHRixPQUFPLGVBQWUsTUFBTSxLQUFLO1lBQy9CLFlBQVk7WUFDWixLQUFLO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUk7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUEsUUFBUSxTQUFTLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHO0lBQzVDLE9BQU8sZUFBZSxNQUFNLFVBQVU7UUFDcEMsWUFBWTtRQUNaLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1ydW50aW1lQDAuMjUuMi9ub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS0zYzcyZTBjMTIzNTFhNDE4LmpzIiwiLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50cyIsImJhY2tncm91bmQudHMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBhcmNlbCt0cmFuc2Zvcm1lci1qc0AyLjkuM19AcGFyY2VsK2NvcmVAMi45LjMvbm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHU9Z2xvYmFsVGhpcy5wcm9jZXNzPy5hcmd2fHxbXTt2YXIgaD0oKT0+Z2xvYmFsVGhpcy5wcm9jZXNzPy5lbnZ8fHt9O3ZhciBCPW5ldyBTZXQodSksXz1lPT5CLmhhcyhlKSxHPXUuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgVT1fKFwiLS1kcnktcnVuXCIpLGc9KCk9Pl8oXCItLXZlcmJvc2VcIil8fGgoKS5WRVJCT1NFPT09XCJ0cnVlXCIsTj1nKCk7dmFyIG09KGU9XCJcIiwuLi50KT0+Y29uc29sZS5sb2coZS5wYWRFbmQoOSksXCJ8XCIsLi4udCk7dmFyIHk9KC4uLmUpPT5jb25zb2xlLmVycm9yKFwiXFx1ezFGNTM0fSBFUlJPUlwiLnBhZEVuZCg5KSxcInxcIiwuLi5lKSx2PSguLi5lKT0+bShcIlxcdXsxRjUzNX0gSU5GT1wiLC4uLmUpLGY9KC4uLmUpPT5tKFwiXFx1ezFGN0UwfSBXQVJOXCIsLi4uZSksTT0wLGk9KC4uLmUpPT5nKCkmJm0oYFxcdXsxRjdFMX0gJHtNKyt9YCwuLi5lKTt2YXIgYj0oKT0+e2xldCBlPWdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnJ1bnRpbWUsdD0oKT0+c2V0SW50ZXJ2YWwoZS5nZXRQbGF0Zm9ybUluZm8sMjRlMyk7ZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIodCksdCgpfTt2YXIgbj17XCJpc0NvbnRlbnRTY3JpcHRcIjpmYWxzZSxcImlzQmFja2dyb3VuZFwiOnRydWUsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcImJhY2tncm91bmQtc2VydmljZS1ydW50aW1lXCJdLFwiaG9zdFwiOlwibG9jYWxob3N0XCIsXCJwb3J0XCI6MTgxNSxcImVudHJ5RmlsZVBhdGhcIjpcIi9ob21lL21jcm93ZS9Qcm9ncmFtbWluZy9QZXJzb25hbC9icm93c2VyLXRvb2xzLW1jcC91bml2ZXJzYWwtZXh0ZW5zaW9uLy5wbGFzbW8vc3RhdGljL2JhY2tncm91bmQvaW5kZXgudHNcIixcImJ1bmRsZUlkXCI6XCJkNDBlZjk0MWFlYWI0MmEwXCIsXCJlbnZIYXNoXCI6XCJlNzkyZmJiZGFhNzhlZTg0XCIsXCJ2ZXJib3NlXCI6XCJmYWxzZVwiLFwic2VjdXJlXCI6ZmFsc2UsXCJzZXJ2ZXJQb3J0XCI6NDIwOTd9O21vZHVsZS5idW5kbGUuSE1SX0JVTkRMRV9JRD1uLmJ1bmRsZUlkO2dsb2JhbFRoaXMucHJvY2Vzcz17YXJndjpbXSxlbnY6e1ZFUkJPU0U6bi52ZXJib3NlfX07dmFyIEQ9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU7ZnVuY3Rpb24gSChlKXtELmNhbGwodGhpcyxlKSx0aGlzLmhvdD17ZGF0YTptb2R1bGUuYnVuZGxlLmhvdERhdGFbZV0sX2FjY2VwdENhbGxiYWNrczpbXSxfZGlzcG9zZUNhbGxiYWNrczpbXSxhY2NlcHQ6ZnVuY3Rpb24odCl7dGhpcy5fYWNjZXB0Q2FsbGJhY2tzLnB1c2godHx8ZnVuY3Rpb24oKXt9KX0sZGlzcG9zZTpmdW5jdGlvbih0KXt0aGlzLl9kaXNwb3NlQ2FsbGJhY2tzLnB1c2godCl9fSxtb2R1bGUuYnVuZGxlLmhvdERhdGFbZV09dm9pZCAwfW1vZHVsZS5idW5kbGUuTW9kdWxlPUg7bW9kdWxlLmJ1bmRsZS5ob3REYXRhPXt9O3ZhciBjPWdsb2JhbFRoaXMuYnJvd3Nlcnx8Z2xvYmFsVGhpcy5jaHJvbWV8fG51bGw7ZnVuY3Rpb24gUigpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP2xvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpPT09MD9sb2NhdGlvbi5ob3N0bmFtZTpcImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiB4KCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/XCJsb2NhbGhvc3RcIjpuLmhvc3R9ZnVuY3Rpb24gZCgpe3JldHVybiBuLnBvcnR8fGxvY2F0aW9uLnBvcnR9dmFyIFA9XCJfX3BsYXNtb19ydW50aW1lX3BhZ2VfXCIsUz1cIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiO3ZhciBPPWAke24uc2VjdXJlP1wiaHR0cHNcIjpcImh0dHBcIn06Ly8ke1IoKX06JHtkKCl9L2A7YXN5bmMgZnVuY3Rpb24gayhlPTE0NzApe2Zvcig7Oyl0cnl7YXdhaXQgZmV0Y2goTyk7YnJlYWt9Y2F0Y2h7YXdhaXQgbmV3IFByb21pc2Uobz0+c2V0VGltZW91dChvLGUpKX19aWYoYy5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbj09PTMpe2xldCBlPWMucnVudGltZS5nZXRVUkwoXCIvX19wbGFzbW9faG1yX3Byb3h5X18/dXJsPVwiKTtnbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJmZXRjaFwiLGZ1bmN0aW9uKHQpe2xldCBvPXQucmVxdWVzdC51cmw7aWYoby5zdGFydHNXaXRoKGUpKXtsZXQgcz1uZXcgVVJMKGRlY29kZVVSSUNvbXBvbmVudChvLnNsaWNlKGUubGVuZ3RoKSkpO3MuaG9zdG5hbWU9PT1uLmhvc3QmJnMucG9ydD09PWAke24ucG9ydH1gPyhzLnNlYXJjaFBhcmFtcy5zZXQoXCJ0XCIsRGF0ZS5ub3coKS50b1N0cmluZygpKSx0LnJlc3BvbmRXaXRoKGZldGNoKHMpLnRoZW4ocj0+bmV3IFJlc3BvbnNlKHIuYm9keSx7aGVhZGVyczp7XCJDb250ZW50LVR5cGVcIjpyLmhlYWRlcnMuZ2V0KFwiQ29udGVudC1UeXBlXCIpPz9cInRleHQvamF2YXNjcmlwdFwifX0pKSkpOnQucmVzcG9uZFdpdGgobmV3IFJlc3BvbnNlKFwiUGxhc21vIEhNUlwiLHtzdGF0dXM6MjAwLHN0YXR1c1RleHQ6XCJUZXN0aW5nXCJ9KSl9fSl9ZnVuY3Rpb24gRShlLHQpe2xldHttb2R1bGVzOm99PWU7cmV0dXJuIG8/ISFvW3RdOiExfWZ1bmN0aW9uIEMoZT1kKCkpe2xldCB0PXgoKTtyZXR1cm5gJHtuLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIn06Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBMKGUpe3R5cGVvZiBlLm1lc3NhZ2U9PVwic3RyaW5nXCImJnkoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrZS5tZXNzYWdlKX1mdW5jdGlvbiBUKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChDKE51bWJlcihkKCkpKzEpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTthd2FpdCBlKHMpfSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixMKSx0fWZ1bmN0aW9uIEEoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcz1KU09OLnBhcnNlKG8uZGF0YSk7aWYocy50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShzLmFzc2V0cykscy50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgciBvZiBzLmRpYWdub3N0aWNzLmFuc2kpe2xldCBsPXIuY29kZWZyYW1lfHxyLnN0YWNrO2YoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrci5tZXNzYWdlK2BcbmArbCtgXG5cbmArci5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEwpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e3YoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0ZWQgdG8gSE1SIHNlcnZlciBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57ZihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgaXMgY2xvc2VkIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHR9dmFyIHc9bW9kdWxlLmJ1bmRsZS5wYXJlbnQsYT17YnVpbGRSZWFkeTohMSxiZ0NoYW5nZWQ6ITEsY3NDaGFuZ2VkOiExLHBhZ2VDaGFuZ2VkOiExLHNjcmlwdFBvcnRzOm5ldyBTZXQscGFnZVBvcnRzOm5ldyBTZXR9O2FzeW5jIGZ1bmN0aW9uIHAoZT0hMSl7aWYoZXx8YS5idWlsZFJlYWR5JiZhLnBhZ2VDaGFuZ2VkKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIFBhZ2VcIik7Zm9yKGxldCB0IG9mIGEucGFnZVBvcnRzKXQucG9zdE1lc3NhZ2UobnVsbCl9aWYoZXx8YS5idWlsZFJlYWR5JiYoYS5iZ0NoYW5nZWR8fGEuY3NDaGFuZ2VkKSl7aShcIkJHU1cgUnVudGltZSAtIHJlbG9hZGluZyBDU1wiKTtsZXQgdD1hd2FpdCBjPy50YWJzLnF1ZXJ5KHthY3RpdmU6ITB9KTtmb3IobGV0IG8gb2YgYS5zY3JpcHRQb3J0cyl7bGV0IHM9dC5zb21lKHI9PnIuaWQ9PT1vLnNlbmRlci50YWI/LmlkKTtvLnBvc3RNZXNzYWdlKHtfX3BsYXNtb19jc19hY3RpdmVfdGFiX186c30pfWMucnVudGltZS5yZWxvYWQoKX19aWYoIXd8fCF3LmlzUGFyY2VsUmVxdWlyZSl7YigpO2xldCBlPUEoYXN5bmMgdD0+e2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBITVIgVXBkYXRlXCIpLGEuYmdDaGFuZ2VkfHw9dC5maWx0ZXIocz0+cy5lbnZIYXNoPT09bi5lbnZIYXNoKS5zb21lKHM9PkUobW9kdWxlLmJ1bmRsZSxzLmlkKSk7bGV0IG89dC5maW5kKHM9PnMudHlwZT09PVwianNvblwiKTtpZihvKXtsZXQgcz1uZXcgU2V0KHQubWFwKGw9PmwuaWQpKSxyPU9iamVjdC52YWx1ZXMoby5kZXBzQnlCdW5kbGUpLm1hcChsPT5PYmplY3QudmFsdWVzKGwpKS5mbGF0KCk7YS5iZ0NoYW5nZWR8fD1yLmV2ZXJ5KGw9PnMuaGFzKGwpKX1wKCl9KTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntsZXQgdD1zZXRJbnRlcnZhbCgoKT0+ZS5zZW5kKFwicGluZ1wiKSwyNGUzKTtlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT5jbGVhckludGVydmFsKHQpKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsYXN5bmMoKT0+e2F3YWl0IGsoKSxwKCEwKX0pfVQoYXN5bmMgZT0+e3N3aXRjaChpKFwiQkdTVyBSdW50aW1lIC0gT24gQnVpbGQgUmVwYWNrYWdlZFwiKSxlLnR5cGUpe2Nhc2VcImJ1aWxkX3JlYWR5XCI6e2EuYnVpbGRSZWFkeXx8PSEwLHAoKTticmVha31jYXNlXCJjc19jaGFuZ2VkXCI6e2EuY3NDaGFuZ2VkfHw9ITAscCgpO2JyZWFrfX19KTtjLnJ1bnRpbWUub25Db25uZWN0LmFkZExpc3RlbmVyKGZ1bmN0aW9uKGUpe2xldCB0PWUubmFtZS5zdGFydHNXaXRoKFApLG89ZS5uYW1lLnN0YXJ0c1dpdGgoUyk7aWYodHx8byl7bGV0IHM9dD9hLnBhZ2VQb3J0czphLnNjcmlwdFBvcnRzO3MuYWRkKGUpLGUub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57cy5kZWxldGUoZSl9KSxlLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyKXtpKFwiQkdTVyBSdW50aW1lIC0gT24gc291cmNlIGNoYW5nZWRcIixyKSxyLl9fcGxhc21vX2NzX2NoYW5nZWRfXyYmKGEuY3NDaGFuZ2VkfHw9ITApLHIuX19wbGFzbW9fcGFnZV9jaGFuZ2VkX18mJihhLnBhZ2VDaGFuZ2VkfHw9ITApLHAoKX0pfX0pO2MucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQuX19wbGFzbW9fZnVsbF9yZWxvYWRfXyYmKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiB0b3AtbGV2ZWwgY29kZSBjaGFuZ2VkXCIpLHAoKSksITB9KTtcbiIsImltcG9ydCBcIi4uLy4uLy4uL2JhY2tncm91bmRcIiIsIi8vIExpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgZGV2dG9vbHMgcGFuZWxcbmxldCBpc0Nvbm5lY3RlZFRvU2VydmVyID0gZmFsc2U7XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJHRVRfQ1VSUkVOVF9VUkxcIiAmJiBtZXNzYWdlLnRhYklkKSB7XG4gICAgZ2V0Q3VycmVudFRhYlVybChtZXNzYWdlLnRhYklkKVxuICAgICAgLnRoZW4oKHVybCkgPT4ge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlLCB1cmw6IHVybCB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pXG4gICAgICB9KVxuICAgIHJldHVybiB0cnVlIC8vIFJlcXVpcmVkIHRvIHVzZSBzZW5kUmVzcG9uc2UgYXN5bmNocm9ub3VzbHlcbiAgfVxuXG4gIC8vIEhhbmRsZSBleHBsaWNpdCByZXF1ZXN0IHRvIHVwZGF0ZSB0aGUgc2VydmVyIHdpdGggdGhlIFVSTFxuICBpZiAobWVzc2FnZS50eXBlID09PSBcIlVQREFURV9TRVJWRVJfVVJMXCIgJiYgbWVzc2FnZS50YWJJZCAmJiBtZXNzYWdlLnVybCkge1xuICAgIGNvbnNvbGUubG9nKGBCYWNrZ3JvdW5kOiBSZWNlaXZlZCByZXF1ZXN0IHRvIHVwZGF0ZSBzZXJ2ZXIgd2l0aCBVUkwgZm9yIHRhYiAke21lc3NhZ2UudGFiSWR9OiAke21lc3NhZ2UudXJsfWApXG4gICAgdXBkYXRlU2VydmVyV2l0aFVybChtZXNzYWdlLnRhYklkLCBtZXNzYWdlLnVybCwgbWVzc2FnZS5zb3VyY2UgfHwgXCJleHBsaWNpdF91cGRhdGVcIilcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHNlbmRSZXNwb25zZSkgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkJhY2tncm91bmQ6IEVycm9yIHVwZGF0aW5nIHNlcnZlciB3aXRoIFVSTDpcIiwgZXJyb3IpXG4gICAgICAgIGlmIChzZW5kUmVzcG9uc2UpIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KVxuICAgICAgfSlcbiAgICByZXR1cm4gdHJ1ZSAvLyBSZXF1aXJlZCB0byB1c2Ugc2VuZFJlc3BvbnNlIGFzeW5jaHJvbm91c2x5XG4gIH1cblxuICAvLyBIYW5kbGUgc2NyZWVuc2hvdCBjYXB0dXJlIHJlcXVlc3RzXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiQ0FQVFVSRV9TQ1JFRU5TSE9UXCIgJiYgbWVzc2FnZS50YWJJZCkge1xuICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogUmVjZWl2ZWQgc2NyZWVuc2hvdCBjYXB0dXJlIHJlcXVlc3RcIik7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSdyZSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlclxuICAgIGlmICghaXNDb25uZWN0ZWRUb1NlcnZlcikge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgXCJDYW5ub3QgY2FwdHVyZSBzY3JlZW5zaG90OiBOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXJcIlxuICAgICAgKTtcbiAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBlcnJvcjogXCJOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXIuIFBsZWFzZSBjaGVjayB5b3VyIGNvbm5lY3Rpb24gc2V0dGluZ3MuXCIsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSBzZW5kUmVzcG9uc2UgZnVuY3Rpb24gdmFsaWRcbiAgICB9XG5cbiAgICAvLyBGaXJzdCBnZXQgdGhlIHNlcnZlciBzZXR0aW5nc1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJicm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIl0sIChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gcmVzdWx0LmJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncyB8fCB7XG4gICAgICAgIHNlcnZlckhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICAgIHNlcnZlclBvcnQ6IDMwMjVcbiAgICAgIH1cblxuICAgICAgLy8gQ29udGludWUgd2l0aCBzY3JlZW5zaG90IGNhcHR1cmVcbiAgICAgIGNhcHR1cmVBbmRTZW5kU2NyZWVuc2hvdChtZXNzYWdlLCBzZXR0aW5ncywgc2VuZFJlc3BvbnNlKTtcbiAgICB9KVxuICAgIHJldHVybiB0cnVlIC8vIEtlZXAgdGhlIHNlbmRSZXNwb25zZSBmdW5jdGlvbiB2YWxpZFxuICB9XG5cbiAgLy8gVHJhY2sgV2ViU29ja2V0IGNvbm5lY3Rpb24gc3RhdGVcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJXRUJTT0NLRVRfQ09OTkVDVEVEXCIpIHtcbiAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IFdlYlNvY2tldCBjb25uZWN0ZWQgdG8gc2VydmVyXCIpO1xuICAgIGlzQ29ubmVjdGVkVG9TZXJ2ZXIgPSB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiV0VCU09DS0VUX0NMT1NFRFwiIHx8IG1lc3NhZ2UudHlwZSA9PT0gXCJTRVJWRVJfVkFMSURBVElPTl9GQUlMRURcIikge1xuICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogV2ViU29ja2V0IGRpc2Nvbm5lY3RlZCBmcm9tIHNlcnZlclwiKTtcbiAgICBpc0Nvbm5lY3RlZFRvU2VydmVyID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSlcblxuLy8gVmFsaWRhdGUgc2VydmVyIGlkZW50aXR5XG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNlcnZlcklkZW50aXR5KFxuICBob3N0OiBzdHJpbmcsXG4gIHBvcnQ6IG51bWJlclxuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLyR7aG9zdH06JHtwb3J0fS8uaWRlbnRpdHlgLCB7XG4gICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQoMzAwMCkgLy8gMyBzZWNvbmQgdGltZW91dFxuICAgIH0pXG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHNlcnZlciByZXNwb25zZTogJHtyZXNwb25zZS5zdGF0dXN9YClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG5cbiAgICAvLyBWYWxpZGF0ZSB0aGUgc2VydmVyIHNpZ25hdHVyZVxuICAgIGlmIChpZGVudGl0eS5zaWduYXR1cmUgIT09IFwibWNwLWJyb3dzZXItY29ubmVjdG9yLTI0eDdcIikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgc2VydmVyIHNpZ25hdHVyZSAtIG5vdCB0aGUgYnJvd3NlciB0b29scyBzZXJ2ZXJcIilcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHZhbGlkYXRpbmcgc2VydmVyIGlkZW50aXR5OlwiLCBlcnJvcilcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG4vLyBiYWNrZ3JvdW5kLnRzIC0gTWlncmF0ZWQgZnJvbSBDaHJvbWUgZXh0ZW5zaW9uIHRvIFBsYXNtb1xuXG4vLyBUcmFjayBVUkxzIGZvciBlYWNoIHRhYlxuY29uc3QgdGFiVXJscyA9IG5ldyBNYXA8bnVtYmVyLCBzdHJpbmc+KClcblxuLy8gRnVuY3Rpb24gdG8gZ2V0IHRoZSBjdXJyZW50IFVSTCBmb3IgYSB0YWJcbmFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRUYWJVcmwodGFiSWQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogR2V0dGluZyBVUkwgZm9yIHRhYlwiLCB0YWJJZClcblxuICAgIC8vIEZpcnN0IGNoZWNrIGlmIHdlIGhhdmUgaXQgY2FjaGVkXG4gICAgaWYgKHRhYlVybHMuaGFzKHRhYklkKSkge1xuICAgICAgY29uc3QgY2FjaGVkVXJsID0gdGFiVXJscy5nZXQodGFiSWQpXG4gICAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IEZvdW5kIGNhY2hlZCBVUkw6XCIsIGNhY2hlZFVybClcbiAgICAgIHJldHVybiBjYWNoZWRVcmxcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgZ2V0IGl0IGZyb20gdGhlIHRhYlxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YWIgPSBhd2FpdCBjaHJvbWUudGFicy5nZXQodGFiSWQpXG4gICAgICBpZiAodGFiICYmIHRhYi51cmwpIHtcbiAgICAgICAgLy8gQ2FjaGUgdGhlIFVSTFxuICAgICAgICB0YWJVcmxzLnNldCh0YWJJZCwgdGFiLnVybClcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBHb3QgVVJMIGZyb20gdGFiOlwiLCB0YWIudXJsKVxuICAgICAgICByZXR1cm4gdGFiLnVybFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBUYWIgZXhpc3RzIGJ1dCBubyBVUkwgZm91bmRcIilcbiAgICAgIH1cbiAgICB9IGNhdGNoICh0YWJFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkJhY2tncm91bmQ6IEVycm9yIGdldHRpbmcgdGFiOlwiLCB0YWJFcnJvcilcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBjYW4ndCBnZXQgdGhlIHRhYiBkaXJlY3RseSwgdHJ5IHF1ZXJ5aW5nIGZvciBhY3RpdmUgdGFic1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcbiAgICAgIH0pXG4gICAgICBpZiAodGFicyAmJiB0YWJzLmxlbmd0aCA+IDAgJiYgdGFic1swXS51cmwpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlVXJsID0gdGFic1swXS51cmxcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBHb3QgVVJMIGZyb20gYWN0aXZlIHRhYjpcIiwgYWN0aXZlVXJsKVxuICAgICAgICAvLyBDYWNoZSB0aGlzIFVSTCBhcyB3ZWxsXG4gICAgICAgIHRhYlVybHMuc2V0KHRhYklkLCBhY3RpdmVVcmwpXG4gICAgICAgIHJldHVybiBhY3RpdmVVcmxcbiAgICAgIH1cbiAgICB9IGNhdGNoIChxdWVyeUVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQmFja2dyb3VuZDogRXJyb3IgcXVlcnlpbmcgdGFiczpcIiwgcXVlcnlFcnJvcilcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IENvdWxkIG5vdCBmaW5kIFVSTCBmb3IgdGFiXCIsIHRhYklkKVxuICAgIHJldHVybiBudWxsXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkJhY2tncm91bmQ6IEVycm9yIGdldHRpbmcgdGFiIFVSTDpcIiwgZXJyb3IpXG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG4vLyBMaXN0ZW4gZm9yIHRhYiB1cGRhdGVzIHRvIGRldGVjdCBwYWdlIHJlZnJlc2hlcyBhbmQgVVJMIGNoYW5nZXNcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICAvLyBUcmFjayBVUkwgY2hhbmdlc1xuICBpZiAoY2hhbmdlSW5mby51cmwpIHtcbiAgICBjb25zb2xlLmxvZyhgVVJMIGNoYW5nZWQgaW4gdGFiICR7dGFiSWR9IHRvICR7Y2hhbmdlSW5mby51cmx9YClcbiAgICB0YWJVcmxzLnNldCh0YWJJZCwgY2hhbmdlSW5mby51cmwpXG5cbiAgICAvLyBTZW5kIFVSTCB1cGRhdGUgdG8gc2VydmVyIGlmIHBvc3NpYmxlXG4gICAgdXBkYXRlU2VydmVyV2l0aFVybCh0YWJJZCwgY2hhbmdlSW5mby51cmwsIFwidGFiX3VybF9jaGFuZ2VcIilcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgaXMgYSBwYWdlIHJlZnJlc2ggKHN0YXR1cyBiZWNvbWluZyBcImNvbXBsZXRlXCIpXG4gIGlmIChjaGFuZ2VJbmZvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgLy8gVXBkYXRlIFVSTCBpbiBvdXIgY2FjaGVcbiAgICBpZiAodGFiLnVybCkge1xuICAgICAgdGFiVXJscy5zZXQodGFiSWQsIHRhYi51cmwpXG4gICAgICAvLyBTZW5kIFVSTCB1cGRhdGUgdG8gc2VydmVyIGlmIHBvc3NpYmxlXG4gICAgICB1cGRhdGVTZXJ2ZXJXaXRoVXJsKHRhYklkLCB0YWIudXJsLCBcInBhZ2VfY29tcGxldGVcIilcbiAgICB9XG5cbiAgICByZXRlc3RDb25uZWN0aW9uT25SZWZyZXNoKHRhYklkKVxuICB9XG59KVxuXG4vLyBMaXN0ZW4gZm9yIHRhYiBhY3RpdmF0aW9uIChzd2l0Y2hpbmcgYmV0d2VlbiB0YWJzKVxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKGFjdGl2ZUluZm8pID0+IHtcbiAgY29uc3QgdGFiSWQgPSBhY3RpdmVJbmZvLnRhYklkXG4gIGNvbnNvbGUubG9nKGBUYWIgYWN0aXZhdGVkOiAke3RhYklkfWApXG5cbiAgLy8gR2V0IHRoZSBVUkwgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCB0YWJcbiAgY2hyb21lLnRhYnMuZ2V0KHRhYklkLCAodGFiKSA9PiB7XG4gICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdldHRpbmcgdGFiIGluZm86XCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0YWIgJiYgdGFiLnVybCkge1xuICAgICAgY29uc29sZS5sb2coYEFjdGl2ZSB0YWIgY2hhbmdlZCB0byAke3RhYi51cmx9YClcblxuICAgICAgLy8gVXBkYXRlIG91ciBjYWNoZVxuICAgICAgdGFiVXJscy5zZXQodGFiSWQsIHRhYi51cmwpXG5cbiAgICAgIC8vIFNlbmQgVVJMIHVwZGF0ZSB0byBzZXJ2ZXIgaWYgcG9zc2libGVcbiAgICAgIHVwZGF0ZVNlcnZlcldpdGhVcmwodGFiSWQsIHRhYi51cmwsIFwidGFiX2FjdGl2YXRlZFwiKVxuICAgIH1cbiAgfSlcbn0pXG5cbi8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2VydmVyIHdpdGggdGhlIGN1cnJlbnQgVVJMXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVTZXJ2ZXJXaXRoVXJsKFxuICB0YWJJZDogbnVtYmVyLFxuICB1cmw6IHN0cmluZyxcbiAgc291cmNlID0gXCJiYWNrZ3JvdW5kX3VwZGF0ZVwiXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCF1cmwpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBzZXJ2ZXIgd2l0aCBlbXB0eSBVUkxcIilcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBVcGRhdGluZyBzZXJ2ZXIgd2l0aCBVUkwgZm9yIHRhYiAke3RhYklkfTogJHt1cmx9YClcblxuICAvLyBHZXQgc2VydmVyIHNldHRpbmdzIGZyb20gc3RvcmFnZVxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJdLCBhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSByZXN1bHQuYnJvd3NlckNvbm5lY3RvclNldHRpbmdzIHx8IHtcbiAgICAgIHNlcnZlckhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICBzZXJ2ZXJQb3J0OiAzMDI1XG4gICAgfVxuXG4gICAgLy8gTWF4aW11bSBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHNcbiAgICBjb25zdCBtYXhSZXRyaWVzID0gM1xuICAgIGxldCByZXRyeUNvdW50ID0gMFxuICAgIGxldCBzdWNjZXNzID0gZmFsc2VcblxuICAgIHdoaWxlIChyZXRyeUNvdW50IDwgbWF4UmV0cmllcyAmJiAhc3VjY2Vzcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gU2VuZCB0aGUgVVJMIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgY29uc3Qgc2VydmVyVXJsID0gYGh0dHA6Ly8ke3NldHRpbmdzLnNlcnZlckhvc3R9OiR7c2V0dGluZ3Muc2VydmVyUG9ydH0vY3VycmVudC11cmxgXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBBdHRlbXB0ICR7cmV0cnlDb3VudCArIDF9LyR7bWF4UmV0cmllc30gdG8gdXBkYXRlIHNlcnZlciB3aXRoIFVSTDogJHt1cmx9YFxuICAgICAgICApXG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChzZXJ2ZXJVcmwsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHRhYklkOiB0YWJJZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICAgICAgfSksXG4gICAgICAgICAgLy8gQWRkIGEgdGltZW91dCB0byBwcmV2ZW50IGhhbmdpbmcgcmVxdWVzdHNcbiAgICAgICAgICBzaWduYWw6IEFib3J0U2lnbmFsLnRpbWVvdXQoNTAwMClcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBTdWNjZXNzZnVsbHkgdXBkYXRlZCBzZXJ2ZXIgd2l0aCBVUkw6ICR7dXJsfWAsXG4gICAgICAgICAgICByZXNwb25zZURhdGFcbiAgICAgICAgICApXG4gICAgICAgICAgc3VjY2VzcyA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFNlcnZlciByZXR1cm5lZCBlcnJvcjogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHJ5Q291bnQrK1xuICAgICAgICAgIC8vIFdhaXQgYmVmb3JlIHJldHJ5aW5nXG4gICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTAwKSlcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgdXBkYXRpbmcgc2VydmVyIHdpdGggVVJMOiAke2Vycm9yLm1lc3NhZ2V9YClcbiAgICAgICAgcmV0cnlDb3VudCsrXG4gICAgICAgIC8vIFdhaXQgYmVmb3JlIHJldHJ5aW5nXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMCkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgRmFpbGVkIHRvIHVwZGF0ZSBzZXJ2ZXIgd2l0aCBVUkwgYWZ0ZXIgJHttYXhSZXRyaWVzfSBhdHRlbXB0c2BcbiAgICAgIClcbiAgICB9XG4gIH0pXG59XG5cbi8vIENsZWFuIHVwIHdoZW4gdGFicyBhcmUgY2xvc2VkXG5jaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoKHRhYklkKSA9PiB7XG4gIHRhYlVybHMuZGVsZXRlKHRhYklkKVxufSlcblxuLy8gRnVuY3Rpb24gdG8gcmV0ZXN0IGNvbm5lY3Rpb24gd2hlbiBhIHBhZ2UgaXMgcmVmcmVzaGVkXG5hc3luYyBmdW5jdGlvbiByZXRlc3RDb25uZWN0aW9uT25SZWZyZXNoKHRhYklkKSB7XG4gIGNvbnNvbGUubG9nKGBQYWdlIHJlZnJlc2hlZCBpbiB0YWIgJHt0YWJJZH0sIHJldGVzdGluZyBjb25uZWN0aW9uLi4uYClcblxuICAvLyBHZXQgdGhlIHNhdmVkIHNldHRpbmdzXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJicm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIl0sIGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHJlc3VsdC5icm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfHwge1xuICAgICAgc2VydmVySG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICAgIHNlcnZlclBvcnQ6IDMwMjVcbiAgICB9XG5cbiAgICAvLyBUZXN0IHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIGxhc3Qga25vd24gaG9zdCBhbmQgcG9ydFxuICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gYXdhaXQgdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eShcbiAgICAgIHNldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICBzZXR0aW5ncy5zZXJ2ZXJQb3J0XG4gICAgKVxuXG4gICAgLy8gTm90aWZ5IGFsbCBkZXZ0b29scyBpbnN0YW5jZXMgYWJvdXQgdGhlIGNvbm5lY3Rpb24gc3RhdHVzXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJDT05ORUNUSU9OX1NUQVRVU19VUERBVEVcIixcbiAgICAgIGlzQ29ubmVjdGVkOiBpc0Nvbm5lY3RlZCxcbiAgICAgIHRhYklkOiB0YWJJZFxuICAgIH0pXG5cbiAgICAvLyBBbHdheXMgbm90aWZ5IGZvciBwYWdlIHJlZnJlc2gsIHdoZXRoZXIgY29ubmVjdGVkIG9yIG5vdFxuICAgIC8vIFRoaXMgZW5zdXJlcyBhbnkgb25nb2luZyBkaXNjb3ZlcnkgaXMgY2FuY2VsbGVkIGFuZCByZXN0YXJ0ZWRcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIklOSVRJQVRFX0FVVE9fRElTQ09WRVJZXCIsXG4gICAgICByZWFzb246IFwicGFnZV9yZWZyZXNoXCIsXG4gICAgICB0YWJJZDogdGFiSWQsXG4gICAgICBmb3JjZVJlc3RhcnQ6IHRydWUgLy8gQWRkIGEgZmxhZyB0byBpbmRpY2F0ZSB0aGlzIHNob3VsZCBmb3JjZSByZXN0YXJ0IGFueSBvbmdvaW5nIHByb2Nlc3Nlc1xuICAgIH0pXG5cbiAgICBpZiAoIWlzQ29ubmVjdGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJDb25uZWN0aW9uIHRlc3QgZmFpbGVkIGFmdGVyIHBhZ2UgcmVmcmVzaCwgaW5pdGlhdGluZyBhdXRvLWRpc2NvdmVyeS4uLlwiXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0ZXN0IHN1Y2Nlc3NmdWwgYWZ0ZXIgcGFnZSByZWZyZXNoXCIpXG4gICAgfVxuICB9KVxufVxuXG4vLyBGdW5jdGlvbiB0byBjYXB0dXJlIGFuZCBzZW5kIHNjcmVlbnNob3RcbmZ1bmN0aW9uIGNhcHR1cmVBbmRTZW5kU2NyZWVuc2hvdChtZXNzYWdlLCBzZXR0aW5ncywgc2VuZFJlc3BvbnNlKSB7XG4gIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogU3RhcnRpbmcgc2NyZWVuc2hvdCBjYXB0dXJlIHByb2Nlc3NcIik7XG4gIFxuICAvLyBHZXQgdGhlIGluc3BlY3RlZCB3aW5kb3cncyB0YWJcbiAgY2hyb21lLnRhYnMuZ2V0KG1lc3NhZ2UudGFiSWQsICh0YWIpID0+IHtcbiAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2V0dGluZyB0YWI6XCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgYWxsIHdpbmRvd3MgdG8gZmluZCB0aGUgb25lIGNvbnRhaW5pbmcgb3VyIHRhYlxuICAgIGNocm9tZS53aW5kb3dzLmdldEFsbCh7IHBvcHVsYXRlOiB0cnVlIH0sICh3aW5kb3dzKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRXaW5kb3cgPSB3aW5kb3dzLmZpbmQoKHcpID0+XG4gICAgICAgIHcudGFicy5zb21lKCh0KSA9PiB0LmlkID09PSBtZXNzYWdlLnRhYklkKVxuICAgICAgKTtcblxuICAgICAgaWYgKCF0YXJnZXRXaW5kb3cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBmaW5kIHdpbmRvdyBjb250YWluaW5nIHRoZSBpbnNwZWN0ZWQgdGFiXCIpO1xuICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBcIkNvdWxkIG5vdCBmaW5kIHdpbmRvdyBjb250YWluaW5nIHRoZSBpbnNwZWN0ZWQgdGFiXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coYEJhY2tncm91bmQ6IEZvdW5kIHRhcmdldCB3aW5kb3cgJHt0YXJnZXRXaW5kb3cuaWR9IGZvciBzY3JlZW5zaG90YCk7XG5cbiAgICAgIC8vIENhcHR1cmUgc2NyZWVuc2hvdCBvZiB0aGUgd2luZG93IGNvbnRhaW5pbmcgb3VyIHRhYlxuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIodGFyZ2V0V2luZG93LmlkLCB7IGZvcm1hdDogXCJwbmdcIiB9LCAoZGF0YVVybCkgPT4ge1xuICAgICAgICAvLyBJZ25vcmUgRGV2VG9vbHMgcGFuZWwgY2FwdHVyZSBlcnJvciBpZiBpdCBvY2N1cnNcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciAmJiAhY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJkZXZ0b29sczovL1wiKSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjYXB0dXJpbmcgc2NyZWVuc2hvdDpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VuZCBzY3JlZW5zaG90IGRhdGEgdG8gYnJvd3NlciBjb25uZWN0b3IgdXNpbmcgY29uZmlndXJlZCBzZXR0aW5nc1xuICAgICAgICBjb25zdCBzZXJ2ZXJVcmwgPSBgaHR0cDovLyR7c2V0dGluZ3Muc2VydmVySG9zdH06JHtzZXR0aW5ncy5zZXJ2ZXJQb3J0fS9zY3JlZW5zaG90YDtcbiAgICAgICAgY29uc29sZS5sb2coYEJhY2tncm91bmQ6IFNlbmRpbmcgc2NyZWVuc2hvdCB0byAke3NlcnZlclVybH1gKTtcblxuICAgICAgICBmZXRjaChzZXJ2ZXJVcmwsIHtcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgZGF0YTogZGF0YVVybCxcbiAgICAgICAgICAgIHBhdGg6IG1lc3NhZ2Uuc2NyZWVuc2hvdFBhdGgsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VydmVyIHJldHVybmVkICR7cmVzcG9uc2Uuc3RhdHVzfTogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZyb20gc2VydmVyOlwiLCByZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IHJlc3VsdC5lcnJvciB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2NyZWVuc2hvdCBzYXZlZCBzdWNjZXNzZnVsbHk6XCIsIHJlc3VsdC5wYXRoKTtcbiAgICAgICAgICAgICAgLy8gU2VuZCBzdWNjZXNzIHJlc3BvbnNlIGV2ZW4gaWYgRGV2VG9vbHMgY2FwdHVyZSBmYWlsZWRcbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdGg6IHJlc3VsdC5wYXRoLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0YWIudGl0bGUgfHwgXCJDdXJyZW50IFRhYlwiLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzZW5kaW5nIHNjcmVlbnNob3QgZGF0YTpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIHNhdmUgc2NyZWVuc2hvdFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7fVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImluZGV4LmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);