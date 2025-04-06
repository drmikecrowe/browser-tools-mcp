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
})({"jrQb2":[function(require,module,exports) {
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
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
    "verbose": "false",
    "secure": false,
    "serverPort": 35375
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

},{}],"8oeFb":[function(require,module,exports) {
var _background = require("../../../background");

},{"../../../background":"14rpM"}],"14rpM":[function(require,module,exports) {
// background.ts - Migrated from Chrome extension to Plasmo
// Track URLs for each tab
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
// Validate server identity
async function validateServerIdentity(host, port) {
    try {
        const response = await fetch(`http://${host}:${port}/.identity`, {
            signal: AbortSignal.timeout(3000)
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
// Function to update the server with the current URL
async function updateServerWithUrl(tabId, url, source = "background_update") {
    try {
        console.log(`Background: Updating server with URL for tab ${tabId}: ${url} (source: ${source})`);
        // Get server settings from storage
        const result = await chrome.storage.local.get([
            "browserConnectorSettings"
        ]);
        const settings = result.browserConnectorSettings || {
            serverHost: "localhost",
            serverPort: 3025
        };
        // Validate server identity first
        const isValid = await validateServerIdentity(settings.serverHost, settings.serverPort);
        if (!isValid) {
            console.error("Cannot update URL: Not connected to a valid browser tools server");
            return;
        }
        // Send the URL update to the server
        const response = await fetch(`http://${settings.serverHost}:${settings.serverPort}/update-url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tabId,
                url,
                source
            }),
            signal: AbortSignal.timeout(5000)
        });
        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        console.log(`Background: Successfully updated server with URL for tab ${tabId}`);
    } catch (error) {
        console.error("Background: Error updating server with URL:", error);
    }
}
// Function to retest connection when a page is refreshed
function retestConnectionOnRefresh(tabId) {
    console.log(`Page refresh detected for tab ${tabId}, checking connection status`);
    // Notify devtools that a page refresh has occurred
    chrome.runtime.sendMessage({
        type: "CONNECTION_STATUS_UPDATE",
        isConnected: false,
        reason: "page_refresh"
    });
    // Also tell devtools to initiate auto-discovery
    chrome.runtime.sendMessage({
        type: "INITIATE_AUTO_DISCOVERY",
        reason: "page_refresh",
        forceRestart: true
    });
}
// Function to capture and send screenshot
async function captureAndSendScreenshot(message, settings, sendResponse) {
    try {
        console.log("Capturing screenshot for tab:", message.tabId);
        // Capture the tab
        const dataUrl = await chrome.tabs.captureVisibleTab(null, {
            format: "png"
        });
        // Get the current URL
        const url = await getCurrentTabUrl(message.tabId);
        // Send to server
        const response = await fetch(`http://${settings.serverHost}:${settings.serverPort}/screenshot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                screenshot: dataUrl,
                tabId: message.tabId,
                url: url,
                timestamp: new Date().toISOString(),
                path: settings.screenshotPath || ""
            })
        });
        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        const result = await response.json();
        // Send response back
        sendResponse({
            success: true,
            path: result.path,
            message: result.message
        });
    } catch (error) {
        console.error("Error capturing or sending screenshot:", error);
        sendResponse({
            success: false,
            error: error.message
        });
    }
}
// Listen for messages from the devtools panel
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
        return true; // Required to use sendResponse asynchronously
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
        return true; // Required to use sendResponse asynchronously
    }
    if (message.type === "CAPTURE_SCREENSHOT" && message.tabId) {
        // First get the server settings
        chrome.storage.local.get([
            "browserConnectorSettings"
        ], (result)=>{
            const settings = result.browserConnectorSettings || {
                serverHost: "localhost",
                serverPort: 3025
            };
            // Validate server identity first
            validateServerIdentity(settings.serverHost, settings.serverPort).then((isValid)=>{
                if (!isValid) {
                    console.error("Cannot capture screenshot: Not connected to a valid browser tools server");
                    sendResponse({
                        success: false,
                        error: "Not connected to a valid browser tools server. Please check your connection settings."
                    });
                    return;
                }
                // Continue with screenshot capture
                captureAndSendScreenshot(message, settings, sendResponse);
            }).catch((error)=>{
                console.error("Error validating server:", error);
                sendResponse({
                    success: false,
                    error: "Failed to validate server identity: " + error.message
                });
            });
        });
        return true; // Required to use sendResponse asynchronously
    }
});
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
        if (tab.url) {
            // Update our cache
            tabUrls.set(tabId, tab.url);
            // Send URL update to server if possible
            updateServerWithUrl(tabId, tab.url, "tab_activated");
        }
    });
});
// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId)=>{
    tabUrls.delete(tabId);
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5G9Z5"}],"5G9Z5":[function(require,module,exports) {
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

},{}]},["jrQb2","8oeFb"], "8oeFb", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksSUFBRSxXQUFXLFNBQVMsUUFBTSxFQUFFO0FBQUMsSUFBSSxJQUFFLElBQUksV0FBVyxTQUFTLE9BQUssQ0FBQztBQUFFLElBQUksSUFBRSxJQUFJLElBQUksSUFBRyxJQUFFLENBQUEsSUFBRyxFQUFFLElBQUksSUFBRyxJQUFFLEVBQUUsT0FBTyxDQUFBLElBQUcsRUFBRSxXQUFXLFNBQU8sRUFBRSxTQUFTLE1BQU0sSUFBSSxDQUFBLElBQUcsRUFBRSxNQUFNLE1BQU0sT0FBTyxDQUFDLEdBQUUsQ0FBQyxHQUFFLEVBQUUsR0FBSSxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUMsR0FBRSxDQUFBLEdBQUcsQ0FBQztBQUFHLElBQUksSUFBRSxFQUFFLGNBQWEsSUFBRSxJQUFJLEVBQUUsZ0JBQWMsSUFBSSxZQUFVLFFBQU8sSUFBRTtBQUFJLElBQUksSUFBRSxDQUFDLElBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxRQUFRLElBQUksRUFBRSxPQUFPLElBQUcsUUFBTztBQUFHLElBQUksSUFBRSxDQUFDLEdBQUcsSUFBSSxRQUFRLE1BQU0scUJBQWtCLE9BQU8sSUFBRyxRQUFPLElBQUcsSUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLHdCQUFvQixJQUFHLElBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSx3QkFBb0IsSUFBRyxJQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUcsSUFBSSxPQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUk7QUFBRyxJQUFJLElBQUU7SUFBSyxJQUFJLElBQUUsV0FBVyxTQUFTLFdBQVMsV0FBVyxRQUFRLFNBQVEsSUFBRSxJQUFJLFlBQVksRUFBRSxpQkFBZ0I7SUFBTSxFQUFFLFVBQVUsWUFBWSxJQUFHO0FBQUc7QUFBRSxJQUFJLElBQUU7SUFBQyxtQkFBa0I7SUFBTSxnQkFBZTtJQUFLLFdBQVU7SUFBTSxZQUFXO1FBQUM7S0FBNkI7SUFBQyxRQUFPO0lBQVksUUFBTztJQUFLLGlCQUFnQjtJQUE2RyxZQUFXO0lBQW1CLFdBQVU7SUFBbUIsV0FBVTtJQUFRLFVBQVM7SUFBTSxjQUFhO0FBQUs7QUFBRSxPQUFPLE9BQU8sZ0JBQWMsRUFBRTtBQUFTLFdBQVcsVUFBUTtJQUFDLE1BQUssRUFBRTtJQUFDLEtBQUk7UUFBQyxTQUFRLEVBQUU7SUFBTztBQUFDO0FBQUUsSUFBSSxJQUFFLE9BQU8sT0FBTztBQUFPLFNBQVMsRUFBRSxDQUFDO0lBQUUsRUFBRSxLQUFLLElBQUksRUFBQyxJQUFHLElBQUksQ0FBQyxNQUFJO1FBQUMsTUFBSyxPQUFPLE9BQU8sT0FBTyxDQUFDLEVBQUU7UUFBQyxrQkFBaUIsRUFBRTtRQUFDLG1CQUFrQixFQUFFO1FBQUMsUUFBTyxTQUFTLENBQUM7WUFBRSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBRyxZQUFXO1FBQUU7UUFBRSxTQUFRLFNBQVMsQ0FBQztZQUFFLElBQUksQ0FBQyxrQkFBa0IsS0FBSztRQUFFO0lBQUMsR0FBRSxPQUFPLE9BQU8sT0FBTyxDQUFDLEVBQUUsR0FBQyxLQUFLO0FBQUM7QUFBQyxPQUFPLE9BQU8sU0FBTztBQUFFLE9BQU8sT0FBTyxVQUFRLENBQUM7QUFBRSxJQUFJLElBQUUsV0FBVyxXQUFTLFdBQVcsVUFBUTtBQUFLLFNBQVM7SUFBSSxPQUFNLENBQUMsRUFBRSxRQUFNLEVBQUUsU0FBTyxZQUFVLFNBQVMsU0FBUyxRQUFRLFlBQVUsSUFBRSxTQUFTLFdBQVMsY0FBWSxFQUFFO0FBQUk7QUFBQyxTQUFTO0lBQUksT0FBTSxDQUFDLEVBQUUsUUFBTSxFQUFFLFNBQU8sWUFBVSxjQUFZLEVBQUU7QUFBSTtBQUFDLFNBQVM7SUFBSSxPQUFPLEVBQUUsUUFBTSxTQUFTO0FBQUk7QUFBQyxJQUFJLElBQUUsMEJBQXlCLElBQUU7QUFBMkIsSUFBSSxJQUFFLENBQUMsRUFBRSxFQUFFLFNBQU8sVUFBUSxPQUFPLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUFDLGVBQWUsRUFBRSxJQUFFLElBQUk7SUFBRSxPQUFPLElBQUc7UUFBQyxNQUFNLE1BQU07UUFBRztJQUFLLEVBQUMsT0FBSztRQUFDLE1BQU0sSUFBSSxRQUFRLENBQUEsSUFBRyxXQUFXLEdBQUU7SUFBRztBQUFDO0FBQUMsSUFBRyxFQUFFLFFBQVEsY0FBYyxxQkFBbUIsR0FBRTtJQUFDLElBQUksSUFBRSxFQUFFLFFBQVEsT0FBTztJQUE4QixXQUFXLGlCQUFpQixTQUFRLFNBQVMsQ0FBQztRQUFFLElBQUksSUFBRSxFQUFFLFFBQVE7UUFBSSxJQUFHLEVBQUUsV0FBVyxJQUFHO1lBQUMsSUFBSSxJQUFFLElBQUksSUFBSSxtQkFBbUIsRUFBRSxNQUFNLEVBQUU7WUFBVSxFQUFFLGFBQVcsRUFBRSxRQUFNLEVBQUUsU0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsR0FBRSxDQUFBLEVBQUUsYUFBYSxJQUFJLEtBQUksS0FBSyxNQUFNLGFBQVksRUFBRSxZQUFZLE1BQU0sR0FBRyxLQUFLLENBQUEsSUFBRyxJQUFJLFNBQVMsRUFBRSxNQUFLO29CQUFDLFNBQVE7d0JBQUMsZ0JBQWUsRUFBRSxRQUFRLElBQUksbUJBQWlCO29CQUFpQjtnQkFBQyxJQUFHLElBQUcsRUFBRSxZQUFZLElBQUksU0FBUyxjQUFhO2dCQUFDLFFBQU87Z0JBQUksWUFBVztZQUFTO1FBQUc7SUFBQztBQUFFO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBRyxFQUFDLFNBQVEsQ0FBQyxFQUFDLEdBQUM7SUFBRSxPQUFPLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQztBQUFDO0FBQUMsU0FBUyxFQUFFLElBQUUsR0FBRztJQUFFLElBQUksSUFBRTtJQUFJLE9BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBUSxTQUFTLGFBQVcsWUFBVSxDQUFDLDhCQUE4QixLQUFLLEtBQUcsUUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQUMsU0FBUyxFQUFFLENBQUM7SUFBRSxPQUFPLEVBQUUsV0FBUyxZQUFVLEVBQUUsOEJBQTRCLEVBQUU7QUFBUTtBQUFDLFNBQVMsRUFBRSxDQUFDO0lBQUUsSUFBRyxPQUFPLFdBQVcsWUFBVSxLQUFJO0lBQU8sSUFBSSxJQUFFLElBQUksVUFBVSxFQUFFLE9BQU8sT0FBSztJQUFJLE9BQU8sRUFBRSxpQkFBaUIsV0FBVSxlQUFlLENBQUM7UUFBRSxJQUFJLElBQUUsS0FBSyxNQUFNLEVBQUU7UUFBTSxNQUFNLEVBQUU7SUFBRSxJQUFHLEVBQUUsaUJBQWlCLFNBQVEsSUFBRztBQUFDO0FBQUMsU0FBUyxFQUFFLENBQUM7SUFBRSxJQUFHLE9BQU8sV0FBVyxZQUFVLEtBQUk7SUFBTyxJQUFJLElBQUUsSUFBSSxVQUFVO0lBQUssT0FBTyxFQUFFLGlCQUFpQixXQUFVLGVBQWUsQ0FBQztRQUFFLElBQUksSUFBRSxLQUFLLE1BQU0sRUFBRTtRQUFNLElBQUcsRUFBRSxTQUFPLFlBQVUsTUFBTSxFQUFFLEVBQUUsU0FBUSxFQUFFLFNBQU8sU0FBUSxLQUFJLElBQUksS0FBSyxFQUFFLFlBQVksS0FBSztZQUFDLElBQUksSUFBRSxFQUFFLGFBQVcsRUFBRTtZQUFNLEVBQUUsOEJBQTRCLEVBQUUsVUFBUSxDQUFDO0FBQ2p2RyxDQUFDLEdBQUMsSUFBRSxDQUFDOztBQUVMLENBQUMsR0FBQyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ2hCLENBQUM7UUFBRTtJQUFDLElBQUcsRUFBRSxpQkFBaUIsU0FBUSxJQUFHLEVBQUUsaUJBQWlCLFFBQU87UUFBSyxFQUFFLENBQUMscURBQXFELEVBQUUsRUFBRSxjQUFjLENBQUM7SUFBQyxJQUFHLEVBQUUsaUJBQWlCLFNBQVE7UUFBSyxFQUFFLENBQUMsb0VBQW9FLEVBQUUsRUFBRSxjQUFjLENBQUM7SUFBQyxJQUFHO0FBQUM7QUFBQyxJQUFJLElBQUUsT0FBTyxPQUFPLFFBQU8sSUFBRTtJQUFDLFlBQVcsQ0FBQztJQUFFLFdBQVUsQ0FBQztJQUFFLFdBQVUsQ0FBQztJQUFFLGFBQVksQ0FBQztJQUFFLGFBQVksSUFBSTtJQUFJLFdBQVUsSUFBSTtBQUFHO0FBQUUsZUFBZSxFQUFFLElBQUUsQ0FBQyxDQUFDO0lBQUUsSUFBRyxLQUFHLEVBQUUsY0FBWSxFQUFFLGFBQVk7UUFBQyxFQUFFO1FBQWlDLEtBQUksSUFBSSxLQUFLLEVBQUUsVUFBVSxFQUFFLFlBQVk7SUFBSztJQUFDLElBQUcsS0FBRyxFQUFFLGNBQWEsQ0FBQSxFQUFFLGFBQVcsRUFBRSxTQUFRLEdBQUc7UUFBQyxFQUFFO1FBQStCLElBQUksSUFBRSxNQUFNLEdBQUcsS0FBSyxNQUFNO1lBQUMsUUFBTyxDQUFDO1FBQUM7UUFBRyxLQUFJLElBQUksS0FBSyxFQUFFLFlBQVk7WUFBQyxJQUFJLElBQUUsRUFBRSxLQUFLLENBQUEsSUFBRyxFQUFFLE9BQUssRUFBRSxPQUFPLEtBQUs7WUFBSSxFQUFFLFlBQVk7Z0JBQUMsMEJBQXlCO1lBQUM7UUFBRTtRQUFDLEVBQUUsUUFBUTtJQUFRO0FBQUM7QUFBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUUsaUJBQWdCO0lBQUM7SUFBSSxJQUFJLElBQUUsRUFBRSxPQUFNO1FBQUksRUFBRSxpQ0FBZ0MsRUFBRSxjQUFZLEVBQUUsT0FBTyxDQUFBLElBQUcsRUFBRSxZQUFVLEVBQUUsU0FBUyxLQUFLLENBQUEsSUFBRyxFQUFFLE9BQU8sUUFBTyxFQUFFO1FBQUssSUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFBLElBQUcsRUFBRSxTQUFPO1FBQVEsSUFBRyxHQUFFO1lBQUMsSUFBSSxJQUFFLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQSxJQUFHLEVBQUUsTUFBSyxJQUFFLE9BQU8sT0FBTyxFQUFFLGNBQWMsSUFBSSxDQUFBLElBQUcsT0FBTyxPQUFPLElBQUk7WUFBTyxFQUFFLGNBQVksRUFBRSxNQUFNLENBQUEsSUFBRyxFQUFFLElBQUk7UUFBRztRQUFDO0lBQUc7SUFBRyxFQUFFLGlCQUFpQixRQUFPO1FBQUssSUFBSSxJQUFFLFlBQVksSUFBSSxFQUFFLEtBQUssU0FBUTtRQUFNLEVBQUUsaUJBQWlCLFNBQVEsSUFBSSxjQUFjO0lBQUcsSUFBRyxFQUFFLGlCQUFpQixTQUFRO1FBQVUsTUFBTSxLQUFJLEVBQUUsQ0FBQztJQUFFO0FBQUU7QUFBQyxFQUFFLE9BQU07SUFBSSxPQUFPLEVBQUUsdUNBQXNDLEVBQUU7UUFBTSxLQUFJO1lBQWUsRUFBRSxlQUFhLENBQUMsR0FBRTtZQUFJO1FBQU0sS0FBSTtZQUFjLEVBQUUsY0FBWSxDQUFDLEdBQUU7WUFBSTtJQUFNO0FBQUM7QUFBRyxFQUFFLFFBQVEsVUFBVSxZQUFZLFNBQVMsQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFLEtBQUssV0FBVyxJQUFHLElBQUUsRUFBRSxLQUFLLFdBQVc7SUFBRyxJQUFHLEtBQUcsR0FBRTtRQUFDLElBQUksSUFBRSxJQUFFLEVBQUUsWUFBVSxFQUFFO1FBQVksRUFBRSxJQUFJLElBQUcsRUFBRSxhQUFhLFlBQVk7WUFBSyxFQUFFLE9BQU87UUFBRSxJQUFHLEVBQUUsVUFBVSxZQUFZLFNBQVMsQ0FBQztZQUFFLEVBQUUsb0NBQW1DLElBQUcsRUFBRSx5QkFBd0IsQ0FBQSxFQUFFLGNBQVksQ0FBQyxDQUFBLEdBQUcsRUFBRSwyQkFBMEIsQ0FBQSxFQUFFLGdCQUFjLENBQUMsQ0FBQSxHQUFHO1FBQUc7SUFBRTtBQUFDO0FBQUcsRUFBRSxRQUFRLFVBQVUsWUFBWSxTQUFTLENBQUM7SUFBRSxPQUFPLEVBQUUsMEJBQXlCLENBQUEsRUFBRSw2Q0FBNEMsR0FBRSxHQUFHLENBQUM7QUFBQzs7O0FDSmw3RDs7O0FDQUEsMkRBQTJEO0FBRTNELDBCQUEwQjs7O0FBQzFCLE1BQU0sVUFBVSxJQUFJO0FBRXBCLDRDQUE0QztBQUM1QyxlQUFlLGlCQUFpQixLQUFhO0lBQzNDLElBQUk7UUFDRixRQUFRLElBQUksbUNBQW1DO1FBRS9DLG1DQUFtQztRQUNuQyxJQUFJLFFBQVEsSUFBSSxRQUFRO1lBQ3RCLE1BQU0sWUFBWSxRQUFRLElBQUk7WUFDOUIsUUFBUSxJQUFJLGlDQUFpQztZQUM3QyxPQUFPO1FBQ1Q7UUFFQSxnQ0FBZ0M7UUFDaEMsSUFBSTtZQUNGLE1BQU0sTUFBTSxNQUFNLE9BQU8sS0FBSyxJQUFJO1lBQ2xDLElBQUksT0FBTyxJQUFJLEtBQUs7Z0JBQ2xCLGdCQUFnQjtnQkFDaEIsUUFBUSxJQUFJLE9BQU8sSUFBSTtnQkFDdkIsUUFBUSxJQUFJLGlDQUFpQyxJQUFJO2dCQUNqRCxPQUFPLElBQUk7WUFDYixPQUNFLFFBQVEsSUFBSTtRQUVoQixFQUFFLE9BQU8sVUFBVTtZQUNqQixRQUFRLE1BQU0sa0NBQWtDO1FBQ2xEO1FBRUEsaUVBQWlFO1FBQ2pFLElBQUk7WUFDRixNQUFNLE9BQU8sTUFBTSxPQUFPLEtBQUssTUFBTTtnQkFDbkMsUUFBUTtnQkFDUixlQUFlO1lBQ2pCO1lBQ0EsSUFBSSxRQUFRLEtBQUssU0FBUyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSztnQkFDMUMsTUFBTSxZQUFZLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzFCLFFBQVEsSUFBSSx3Q0FBd0M7Z0JBQ3BELHlCQUF5QjtnQkFDekIsUUFBUSxJQUFJLE9BQU87Z0JBQ25CLE9BQU87WUFDVDtRQUNGLEVBQUUsT0FBTyxZQUFZO1lBQ25CLFFBQVEsTUFBTSxvQ0FBb0M7UUFDcEQ7UUFFQSxRQUFRLElBQUksMENBQTBDO1FBQ3RELE9BQU87SUFDVCxFQUFFLE9BQU8sT0FBTztRQUNkLFFBQVEsTUFBTSxzQ0FBc0M7UUFDcEQsT0FBTztJQUNUO0FBQ0Y7QUFFQSwyQkFBMkI7QUFDM0IsZUFBZSx1QkFBdUIsSUFBWSxFQUFFLElBQVk7SUFDOUQsSUFBSTtRQUNGLE1BQU0sV0FBVyxNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsRUFBRTtZQUMvRCxRQUFRLFlBQVksUUFBUTtRQUM5QjtRQUVBLElBQUksQ0FBQyxTQUFTLElBQUk7WUFDaEIsUUFBUSxNQUFNLENBQUMseUJBQXlCLEVBQUUsU0FBUyxPQUFPLENBQUM7WUFDM0QsT0FBTztRQUNUO1FBRUEsTUFBTSxXQUFXLE1BQU0sU0FBUztRQUVoQyxnQ0FBZ0M7UUFDaEMsSUFBSSxTQUFTLGNBQWMsOEJBQThCO1lBQ3ZELFFBQVEsTUFBTTtZQUNkLE9BQU87UUFDVDtRQUVBLE9BQU87SUFDVCxFQUFFLE9BQU8sT0FBTztRQUNkLFFBQVEsTUFBTSxxQ0FBcUM7UUFDbkQsT0FBTztJQUNUO0FBQ0Y7QUFFQSxxREFBcUQ7QUFDckQsZUFBZSxvQkFBb0IsS0FBYSxFQUFFLEdBQVcsRUFBRSxTQUFTLG1CQUFtQjtJQUN6RixJQUFJO1FBQ0YsUUFBUSxJQUFJLENBQUMsNkNBQTZDLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFL0YsbUNBQW1DO1FBQ25DLE1BQU0sU0FBUyxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUk7WUFBQztTQUEyQjtRQUMxRSxNQUFNLFdBQVcsT0FBTyw0QkFBNEI7WUFDbEQsWUFBWTtZQUNaLFlBQVk7UUFDZDtRQUVBLGlDQUFpQztRQUNqQyxNQUFNLFVBQVUsTUFBTSx1QkFBdUIsU0FBUyxZQUFZLFNBQVM7UUFDM0UsSUFBSSxDQUFDLFNBQVM7WUFDWixRQUFRLE1BQU07WUFDZDtRQUNGO1FBRUEsb0NBQW9DO1FBQ3BDLE1BQU0sV0FBVyxNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxXQUFXLENBQUMsRUFBRSxTQUFTLFdBQVcsV0FBVyxDQUFDLEVBQUU7WUFDOUYsUUFBUTtZQUNSLFNBQVM7Z0JBQ1AsZ0JBQWdCO1lBQ2xCO1lBQ0EsTUFBTSxLQUFLLFVBQVU7Z0JBQ25CO2dCQUNBO2dCQUNBO1lBQ0Y7WUFDQSxRQUFRLFlBQVksUUFBUTtRQUM5QjtRQUVBLElBQUksQ0FBQyxTQUFTLElBQ1osTUFBTSxJQUFJLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxTQUFTLE9BQU8sQ0FBQztRQUdwRSxRQUFRLElBQUksQ0FBQyx5REFBeUQsRUFBRSxNQUFNLENBQUM7SUFDakYsRUFBRSxPQUFPLE9BQU87UUFDZCxRQUFRLE1BQU0sK0NBQStDO0lBQy9EO0FBQ0Y7QUFFQSx5REFBeUQ7QUFDekQsU0FBUywwQkFBMEIsS0FBYTtJQUM5QyxRQUFRLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0lBRWhGLG1EQUFtRDtJQUNuRCxPQUFPLFFBQVEsWUFBWTtRQUN6QixNQUFNO1FBQ04sYUFBYTtRQUNiLFFBQVE7SUFDVjtJQUVBLGdEQUFnRDtJQUNoRCxPQUFPLFFBQVEsWUFBWTtRQUN6QixNQUFNO1FBQ04sUUFBUTtRQUNSLGNBQWM7SUFDaEI7QUFDRjtBQUVBLDBDQUEwQztBQUMxQyxlQUFlLHlCQUNiLE9BQVksRUFDWixRQUFhLEVBQ2IsWUFBcUM7SUFFckMsSUFBSTtRQUNGLFFBQVEsSUFBSSxpQ0FBaUMsUUFBUTtRQUVyRCxrQkFBa0I7UUFDbEIsTUFBTSxVQUFVLE1BQU0sT0FBTyxLQUFLLGtCQUFrQixNQUFNO1lBQUUsUUFBUTtRQUFNO1FBRTFFLHNCQUFzQjtRQUN0QixNQUFNLE1BQU0sTUFBTSxpQkFBaUIsUUFBUTtRQUUzQyxpQkFBaUI7UUFDakIsTUFBTSxXQUFXLE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxTQUFTLFdBQVcsQ0FBQyxFQUFFLFNBQVMsV0FBVyxXQUFXLENBQUMsRUFBRTtZQUM5RixRQUFRO1lBQ1IsU0FBUztnQkFDUCxnQkFBZ0I7WUFDbEI7WUFDQSxNQUFNLEtBQUssVUFBVTtnQkFDbkIsWUFBWTtnQkFDWixPQUFPLFFBQVE7Z0JBQ2YsS0FBSztnQkFDTCxXQUFXLElBQUksT0FBTztnQkFDdEIsTUFBTSxTQUFTLGtCQUFrQjtZQUNuQztRQUNGO1FBRUEsSUFBSSxDQUFDLFNBQVMsSUFDWixNQUFNLElBQUksTUFBTSxDQUFDLDhCQUE4QixFQUFFLFNBQVMsT0FBTyxDQUFDO1FBR3BFLE1BQU0sU0FBUyxNQUFNLFNBQVM7UUFFOUIscUJBQXFCO1FBQ3JCLGFBQWE7WUFDWCxTQUFTO1lBQ1QsTUFBTSxPQUFPO1lBQ2IsU0FBUyxPQUFPO1FBQ2xCO0lBQ0YsRUFBRSxPQUFPLE9BQU87UUFDZCxRQUFRLE1BQU0sMENBQTBDO1FBQ3hELGFBQWE7WUFDWCxTQUFTO1lBQ1QsT0FBTyxNQUFNO1FBQ2Y7SUFDRjtBQUNGO0FBRUEsOENBQThDO0FBQzlDLE9BQU8sUUFBUSxVQUFVLFlBQVksQ0FBQyxTQUFTLFFBQVE7SUFDckQsSUFBSSxRQUFRLFNBQVMscUJBQXFCLFFBQVEsT0FBTztRQUN2RCxpQkFBaUIsUUFBUSxPQUN0QixLQUFLLENBQUM7WUFDTCxhQUFhO2dCQUFFLFNBQVM7Z0JBQU0sS0FBSztZQUFJO1FBQ3pDLEdBQ0MsTUFBTSxDQUFDO1lBQ04sYUFBYTtnQkFBRSxTQUFTO2dCQUFPLE9BQU8sTUFBTTtZQUFRO1FBQ3REO1FBQ0YsT0FBTyxNQUFNLDhDQUE4QztJQUM3RDtJQUVBLDREQUE0RDtJQUM1RCxJQUFJLFFBQVEsU0FBUyx1QkFBdUIsUUFBUSxTQUFTLFFBQVEsS0FBSztRQUN4RSxRQUFRLElBQ04sQ0FBQywrREFBK0QsRUFBRSxRQUFRLE1BQU0sRUFBRSxFQUFFLFFBQVEsSUFBSSxDQUFDO1FBRW5HLG9CQUNFLFFBQVEsT0FDUixRQUFRLEtBQ1IsUUFBUSxVQUFVLG1CQUVqQixLQUFLO1lBQ0osSUFBSSxjQUFjLGFBQWE7Z0JBQUUsU0FBUztZQUFLO1FBQ2pELEdBQ0MsTUFBTSxDQUFDO1lBQ04sUUFBUSxNQUFNLCtDQUErQztZQUM3RCxJQUFJLGNBQ0YsYUFBYTtnQkFBRSxTQUFTO2dCQUFPLE9BQU8sTUFBTTtZQUFRO1FBQ3hEO1FBQ0YsT0FBTyxNQUFNLDhDQUE4QztJQUM3RDtJQUVBLElBQUksUUFBUSxTQUFTLHdCQUF3QixRQUFRLE9BQU87UUFDMUQsZ0NBQWdDO1FBQ2hDLE9BQU8sUUFBUSxNQUFNLElBQUk7WUFBQztTQUEyQixFQUFFLENBQUM7WUFDdEQsTUFBTSxXQUFXLE9BQU8sNEJBQTRCO2dCQUNsRCxZQUFZO2dCQUNaLFlBQVk7WUFDZDtZQUVBLGlDQUFpQztZQUNqQyx1QkFBdUIsU0FBUyxZQUFZLFNBQVMsWUFDbEQsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxTQUFTO29CQUNaLFFBQVEsTUFDTjtvQkFFRixhQUFhO3dCQUNYLFNBQVM7d0JBQ1QsT0FDRTtvQkFDSjtvQkFDQTtnQkFDRjtnQkFFQSxtQ0FBbUM7Z0JBQ25DLHlCQUF5QixTQUFTLFVBQVU7WUFDOUMsR0FDQyxNQUFNLENBQUM7Z0JBQ04sUUFBUSxNQUFNLDRCQUE0QjtnQkFDMUMsYUFBYTtvQkFDWCxTQUFTO29CQUNULE9BQU8seUNBQXlDLE1BQU07Z0JBQ3hEO1lBQ0Y7UUFDSjtRQUNBLE9BQU8sTUFBTSw4Q0FBOEM7SUFDN0Q7QUFDRjtBQUVBLGtFQUFrRTtBQUNsRSxPQUFPLEtBQUssVUFBVSxZQUFZLENBQUMsT0FBTyxZQUFZO0lBQ3BELG9CQUFvQjtJQUNwQixJQUFJLFdBQVcsS0FBSztRQUNsQixRQUFRLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLElBQUksRUFBRSxXQUFXLElBQUksQ0FBQztRQUM5RCxRQUFRLElBQUksT0FBTyxXQUFXO1FBRTlCLHdDQUF3QztRQUN4QyxvQkFBb0IsT0FBTyxXQUFXLEtBQUs7SUFDN0M7SUFFQSwrREFBK0Q7SUFDL0QsSUFBSSxXQUFXLFdBQVcsWUFBWTtRQUNwQywwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLEtBQUs7WUFDWCxRQUFRLElBQUksT0FBTyxJQUFJO1lBQ3ZCLHdDQUF3QztZQUN4QyxvQkFBb0IsT0FBTyxJQUFJLEtBQUs7UUFDdEM7UUFFQSwwQkFBMEI7SUFDNUI7QUFDRjtBQUVBLHFEQUFxRDtBQUNyRCxPQUFPLEtBQUssWUFBWSxZQUFZLENBQUM7SUFDbkMsTUFBTSxRQUFRLFdBQVc7SUFDekIsUUFBUSxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztJQUVyQyx5Q0FBeUM7SUFDekMsT0FBTyxLQUFLLElBQUksT0FBTyxDQUFDO1FBQ3RCLElBQUksT0FBTyxRQUFRLFdBQVc7WUFDNUIsUUFBUSxNQUFNLDJCQUEyQixPQUFPLFFBQVE7WUFDeEQ7UUFDRjtRQUVBLElBQUksSUFBSSxLQUFLO1lBQ1gsbUJBQW1CO1lBQ25CLFFBQVEsSUFBSSxPQUFPLElBQUk7WUFFdkIsd0NBQXdDO1lBQ3hDLG9CQUFvQixPQUFPLElBQUksS0FBSztRQUN0QztJQUNGO0FBQ0Y7QUFFQSxnQ0FBZ0M7QUFDaEMsT0FBTyxLQUFLLFVBQVUsWUFBWSxDQUFDO0lBQ2pDLFFBQVEsT0FBTztBQUNqQjs7O0FDOVRBLFFBQVEsaUJBQWlCLFNBQVUsQ0FBQztJQUNsQyxPQUFPLEtBQUssRUFBRSxhQUFhLElBQUk7UUFBQyxTQUFTO0lBQUM7QUFDNUM7QUFFQSxRQUFRLG9CQUFvQixTQUFVLENBQUM7SUFDckMsT0FBTyxlQUFlLEdBQUcsY0FBYztRQUFDLE9BQU87SUFBSTtBQUNyRDtBQUVBLFFBQVEsWUFBWSxTQUFVLE1BQU0sRUFBRSxJQUFJO0lBQ3hDLE9BQU8sS0FBSyxRQUFRLFFBQVEsU0FBVSxHQUFHO1FBQ3ZDLElBQUksUUFBUSxhQUFhLFFBQVEsZ0JBQWdCLEtBQUssZUFBZSxNQUNuRTtRQUdGLE9BQU8sZUFBZSxNQUFNLEtBQUs7WUFDL0IsWUFBWTtZQUNaLEtBQUs7Z0JBQ0gsT0FBTyxNQUFNLENBQUMsSUFBSTtZQUNwQjtRQUNGO0lBQ0Y7SUFFQSxPQUFPO0FBQ1Q7QUFFQSxRQUFRLFNBQVMsU0FBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUc7SUFDNUMsT0FBTyxlQUFlLE1BQU0sVUFBVTtRQUNwQyxZQUFZO1FBQ1osS0FBSztJQUNQO0FBQ0YiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLWRiYzY2ZWI5ODIxZjcyYWEuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwiYmFja2dyb3VuZC50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdT1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciBoPSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEI9bmV3IFNldCh1KSxfPWU9PkIuaGFzKGUpLEc9dS5maWx0ZXIoZT0+ZS5zdGFydHNXaXRoKFwiLS1cIikmJmUuaW5jbHVkZXMoXCI9XCIpKS5tYXAoZT0+ZS5zcGxpdChcIj1cIikpLnJlZHVjZSgoZSxbdCxvXSk9PihlW3RdPW8sZSkse30pO3ZhciBVPV8oXCItLWRyeS1ydW5cIiksZz0oKT0+XyhcIi0tdmVyYm9zZVwiKXx8aCgpLlZFUkJPU0U9PT1cInRydWVcIixOPWcoKTt2YXIgbT0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgeT0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLHY9KC4uLmUpPT5tKFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksZj0oLi4uZSk9Pm0oXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxNPTAsaT0oLi4uZSk9PmcoKSYmbShgXFx1ezFGN0UxfSAke00rK31gLC4uLmUpO3ZhciBiPSgpPT57bGV0IGU9Z2xvYmFsVGhpcy5icm93c2VyPy5ydW50aW1lfHxnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZSx0PSgpPT5zZXRJbnRlcnZhbChlLmdldFBsYXRmb3JtSW5mbywyNGUzKTtlLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcih0KSx0KCl9O3ZhciBuPXtcImlzQ29udGVudFNjcmlwdFwiOmZhbHNlLFwiaXNCYWNrZ3JvdW5kXCI6dHJ1ZSxcImlzUmVhY3RcIjpmYWxzZSxcInJ1bnRpbWVzXCI6W1wiYmFja2dyb3VuZC1zZXJ2aWNlLXJ1bnRpbWVcIl0sXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInBvcnRcIjoxODE1LFwiZW50cnlGaWxlUGF0aFwiOlwiL2hvbWUvbWNyb3dlL1Byb2dyYW1taW5nL1BlcnNvbmFsL2Jyb3dzZXItdG9vbHMtbWNwL3VuaXZlcnNhbC1leHRlbnNpb24vLnBsYXNtby9zdGF0aWMvYmFja2dyb3VuZC9pbmRleC50c1wiLFwiYnVuZGxlSWRcIjpcImMzMzg5MDhlNzA0YzkxZjFcIixcImVudkhhc2hcIjpcImQ5OWE1ZmZhNTdhY2Q2MzhcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjozNTM3NX07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGM9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBSKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/bG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIHgoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBkKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgUD1cIl9fcGxhc21vX3J1bnRpbWVfcGFnZV9cIixTPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7dmFyIE89YCR7bi5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7UigpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiBrKGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChPKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihjLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9Yy5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBzPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7cy5ob3N0bmFtZT09PW4uaG9zdCYmcy5wb3J0PT09YCR7bi5wb3J0fWA/KHMuc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gocykudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBFKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gQyhlPWQoKSl7bGV0IHQ9eCgpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIEwoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFQoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoTnVtYmVyKGQoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2F3YWl0IGUocyl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEwpLHR9ZnVuY3Rpb24gQShlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTtpZihzLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHMuYXNzZXRzKSxzLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCByIG9mIHMuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IGw9ci5jb2RlZnJhbWV8fHIuc3RhY2s7ZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIityLm1lc3NhZ2UrYFxuYCtsK2BcblxuYCtyLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PntmKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgdz1tb2R1bGUuYnVuZGxlLnBhcmVudCxhPXtidWlsZFJlYWR5OiExLGJnQ2hhbmdlZDohMSxjc0NoYW5nZWQ6ITEscGFnZUNoYW5nZWQ6ITEsc2NyaXB0UG9ydHM6bmV3IFNldCxwYWdlUG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gcChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJmEucGFnZUNoYW5nZWQpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgUGFnZVwiKTtmb3IobGV0IHQgb2YgYS5wYWdlUG9ydHMpdC5wb3N0TWVzc2FnZShudWxsKX1pZihlfHxhLmJ1aWxkUmVhZHkmJihhLmJnQ2hhbmdlZHx8YS5jc0NoYW5nZWQpKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIENTXCIpO2xldCB0PWF3YWl0IGM/LnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgbyBvZiBhLnNjcmlwdFBvcnRzKXtsZXQgcz10LnNvbWUocj0+ci5pZD09PW8uc2VuZGVyLnRhYj8uaWQpO28ucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2FjdGl2ZV90YWJfXzpzfSl9Yy5ydW50aW1lLnJlbG9hZCgpfX1pZighd3x8IXcuaXNQYXJjZWxSZXF1aXJlKXtiKCk7bGV0IGU9QShhc3luYyB0PT57aShcIkJHU1cgUnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYS5iZ0NoYW5nZWR8fD10LmZpbHRlcihzPT5zLmVudkhhc2g9PT1uLmVudkhhc2gpLnNvbWUocz0+RShtb2R1bGUuYnVuZGxlLHMuaWQpKTtsZXQgbz10LmZpbmQocz0+cy50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBzPW5ldyBTZXQodC5tYXAobD0+bC5pZCkpLHI9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGw9Pk9iamVjdC52YWx1ZXMobCkpLmZsYXQoKTthLmJnQ2hhbmdlZHx8PXIuZXZlcnkobD0+cy5oYXMobCkpfXAoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgaygpLHAoITApfSl9VChhc3luYyBlPT57c3dpdGNoKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLGUudHlwZSl7Y2FzZVwiYnVpbGRfcmVhZHlcIjp7YS5idWlsZFJlYWR5fHw9ITAscCgpO2JyZWFrfWNhc2VcImNzX2NoYW5nZWRcIjp7YS5jc0NoYW5nZWR8fD0hMCxwKCk7YnJlYWt9fX0pO2MucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7bGV0IHQ9ZS5uYW1lLnN0YXJ0c1dpdGgoUCksbz1lLm5hbWUuc3RhcnRzV2l0aChTKTtpZih0fHxvKXtsZXQgcz10P2EucGFnZVBvcnRzOmEuc2NyaXB0UG9ydHM7cy5hZGQoZSksZS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntzLmRlbGV0ZShlKX0pLGUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHIpe2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBzb3VyY2UgY2hhbmdlZFwiLHIpLHIuX19wbGFzbW9fY3NfY2hhbmdlZF9fJiYoYS5jc0NoYW5nZWR8fD0hMCksci5fX3BsYXNtb19wYWdlX2NoYW5nZWRfXyYmKGEucGFnZUNoYW5nZWR8fD0hMCkscCgpfSl9fSk7Yy5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiYoaShcIkJHU1cgUnVudGltZSAtIE9uIHRvcC1sZXZlbCBjb2RlIGNoYW5nZWRcIikscCgpKSwhMH0pO1xuIiwiaW1wb3J0IFwiLi4vLi4vLi4vYmFja2dyb3VuZFwiIiwiLy8gYmFja2dyb3VuZC50cyAtIE1pZ3JhdGVkIGZyb20gQ2hyb21lIGV4dGVuc2lvbiB0byBQbGFzbW9cblxuLy8gVHJhY2sgVVJMcyBmb3IgZWFjaCB0YWJcbmNvbnN0IHRhYlVybHMgPSBuZXcgTWFwPG51bWJlciwgc3RyaW5nPigpO1xuXG4vLyBGdW5jdGlvbiB0byBnZXQgdGhlIGN1cnJlbnQgVVJMIGZvciBhIHRhYlxuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFRhYlVybCh0YWJJZDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBHZXR0aW5nIFVSTCBmb3IgdGFiXCIsIHRhYklkKTtcblxuICAgIC8vIEZpcnN0IGNoZWNrIGlmIHdlIGhhdmUgaXQgY2FjaGVkXG4gICAgaWYgKHRhYlVybHMuaGFzKHRhYklkKSkge1xuICAgICAgY29uc3QgY2FjaGVkVXJsID0gdGFiVXJscy5nZXQodGFiSWQpO1xuICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBGb3VuZCBjYWNoZWQgVVJMOlwiLCBjYWNoZWRVcmwpO1xuICAgICAgcmV0dXJuIGNhY2hlZFVybDtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgZ2V0IGl0IGZyb20gdGhlIHRhYlxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YWIgPSBhd2FpdCBjaHJvbWUudGFicy5nZXQodGFiSWQpO1xuICAgICAgaWYgKHRhYiAmJiB0YWIudXJsKSB7XG4gICAgICAgIC8vIENhY2hlIHRoZSBVUkxcbiAgICAgICAgdGFiVXJscy5zZXQodGFiSWQsIHRhYi51cmwpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkJhY2tncm91bmQ6IEdvdCBVUkwgZnJvbSB0YWI6XCIsIHRhYi51cmwpO1xuICAgICAgICByZXR1cm4gdGFiLnVybDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQmFja2dyb3VuZDogVGFiIGV4aXN0cyBidXQgbm8gVVJMIGZvdW5kXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKHRhYkVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQmFja2dyb3VuZDogRXJyb3IgZ2V0dGluZyB0YWI6XCIsIHRhYkVycm9yKTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBjYW4ndCBnZXQgdGhlIHRhYiBkaXJlY3RseSwgdHJ5IHF1ZXJ5aW5nIGZvciBhY3RpdmUgdGFic1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0YWJzID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoe1xuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmICh0YWJzICYmIHRhYnMubGVuZ3RoID4gMCAmJiB0YWJzWzBdLnVybCkge1xuICAgICAgICBjb25zdCBhY3RpdmVVcmwgPSB0YWJzWzBdLnVybDtcbiAgICAgICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBHb3QgVVJMIGZyb20gYWN0aXZlIHRhYjpcIiwgYWN0aXZlVXJsKTtcbiAgICAgICAgLy8gQ2FjaGUgdGhpcyBVUkwgYXMgd2VsbFxuICAgICAgICB0YWJVcmxzLnNldCh0YWJJZCwgYWN0aXZlVXJsKTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVVybDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChxdWVyeUVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQmFja2dyb3VuZDogRXJyb3IgcXVlcnlpbmcgdGFiczpcIiwgcXVlcnlFcnJvcik7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJCYWNrZ3JvdW5kOiBDb3VsZCBub3QgZmluZCBVUkwgZm9yIHRhYlwiLCB0YWJJZCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkJhY2tncm91bmQ6IEVycm9yIGdldHRpbmcgdGFiIFVSTDpcIiwgZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIFZhbGlkYXRlIHNlcnZlciBpZGVudGl0eVxuYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eShob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH0vLmlkZW50aXR5YCwge1xuICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDMwMDApLCAvLyAzIHNlY29uZCB0aW1lb3V0XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIHNlcnZlciByZXNwb25zZTogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAvLyBWYWxpZGF0ZSB0aGUgc2VydmVyIHNpZ25hdHVyZVxuICAgIGlmIChpZGVudGl0eS5zaWduYXR1cmUgIT09IFwibWNwLWJyb3dzZXItY29ubmVjdG9yLTI0eDdcIikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgc2VydmVyIHNpZ25hdHVyZSAtIG5vdCB0aGUgYnJvd3NlciB0b29scyBzZXJ2ZXJcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHZhbGlkYXRpbmcgc2VydmVyIGlkZW50aXR5OlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2VydmVyIHdpdGggdGhlIGN1cnJlbnQgVVJMXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVTZXJ2ZXJXaXRoVXJsKHRhYklkOiBudW1iZXIsIHVybDogc3RyaW5nLCBzb3VyY2UgPSBcImJhY2tncm91bmRfdXBkYXRlXCIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhgQmFja2dyb3VuZDogVXBkYXRpbmcgc2VydmVyIHdpdGggVVJMIGZvciB0YWIgJHt0YWJJZH06ICR7dXJsfSAoc291cmNlOiAke3NvdXJjZX0pYCk7XG5cbiAgICAvLyBHZXQgc2VydmVyIHNldHRpbmdzIGZyb20gc3RvcmFnZVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJicm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIl0pO1xuICAgIGNvbnN0IHNldHRpbmdzID0gcmVzdWx0LmJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncyB8fCB7XG4gICAgICBzZXJ2ZXJIb3N0OiBcImxvY2FsaG9zdFwiLFxuICAgICAgc2VydmVyUG9ydDogMzAyNSxcbiAgICB9O1xuXG4gICAgLy8gVmFsaWRhdGUgc2VydmVyIGlkZW50aXR5IGZpcnN0XG4gICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZhbGlkYXRlU2VydmVySWRlbnRpdHkoc2V0dGluZ3Muc2VydmVySG9zdCwgc2V0dGluZ3Muc2VydmVyUG9ydCk7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2Fubm90IHVwZGF0ZSBVUkw6IE5vdCBjb25uZWN0ZWQgdG8gYSB2YWxpZCBicm93c2VyIHRvb2xzIHNlcnZlclwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSBVUkwgdXBkYXRlIHRvIHRoZSBzZXJ2ZXJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vJHtzZXR0aW5ncy5zZXJ2ZXJIb3N0fToke3NldHRpbmdzLnNlcnZlclBvcnR9L3VwZGF0ZS11cmxgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHRhYklkLFxuICAgICAgICB1cmwsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgIH0pLFxuICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KDUwMDApLCAvLyA1IHNlY29uZCB0aW1lb3V0XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNlcnZlciByZXNwb25kZWQgd2l0aCBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGBCYWNrZ3JvdW5kOiBTdWNjZXNzZnVsbHkgdXBkYXRlZCBzZXJ2ZXIgd2l0aCBVUkwgZm9yIHRhYiAke3RhYklkfWApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrZ3JvdW5kOiBFcnJvciB1cGRhdGluZyBzZXJ2ZXIgd2l0aCBVUkw6XCIsIGVycm9yKTtcbiAgfVxufVxuXG4vLyBGdW5jdGlvbiB0byByZXRlc3QgY29ubmVjdGlvbiB3aGVuIGEgcGFnZSBpcyByZWZyZXNoZWRcbmZ1bmN0aW9uIHJldGVzdENvbm5lY3Rpb25PblJlZnJlc2godGFiSWQ6IG51bWJlcik6IHZvaWQge1xuICBjb25zb2xlLmxvZyhgUGFnZSByZWZyZXNoIGRldGVjdGVkIGZvciB0YWIgJHt0YWJJZH0sIGNoZWNraW5nIGNvbm5lY3Rpb24gc3RhdHVzYCk7XG5cbiAgLy8gTm90aWZ5IGRldnRvb2xzIHRoYXQgYSBwYWdlIHJlZnJlc2ggaGFzIG9jY3VycmVkXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICB0eXBlOiBcIkNPTk5FQ1RJT05fU1RBVFVTX1VQREFURVwiLFxuICAgIGlzQ29ubmVjdGVkOiBmYWxzZSwgLy8gV2UgZG9uJ3Qga25vdyB5ZXQsIHNvIGFzc3VtZSBkaXNjb25uZWN0ZWRcbiAgICByZWFzb246IFwicGFnZV9yZWZyZXNoXCIsXG4gIH0pO1xuXG4gIC8vIEFsc28gdGVsbCBkZXZ0b29scyB0byBpbml0aWF0ZSBhdXRvLWRpc2NvdmVyeVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgdHlwZTogXCJJTklUSUFURV9BVVRPX0RJU0NPVkVSWVwiLFxuICAgIHJlYXNvbjogXCJwYWdlX3JlZnJlc2hcIixcbiAgICBmb3JjZVJlc3RhcnQ6IHRydWUsXG4gIH0pO1xufVxuXG4vLyBGdW5jdGlvbiB0byBjYXB0dXJlIGFuZCBzZW5kIHNjcmVlbnNob3RcbmFzeW5jIGZ1bmN0aW9uIGNhcHR1cmVBbmRTZW5kU2NyZWVuc2hvdChcbiAgbWVzc2FnZTogYW55LFxuICBzZXR0aW5nczogYW55LFxuICBzZW5kUmVzcG9uc2U6IChyZXNwb25zZTogYW55KSA9PiB2b2lkXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhcIkNhcHR1cmluZyBzY3JlZW5zaG90IGZvciB0YWI6XCIsIG1lc3NhZ2UudGFiSWQpO1xuXG4gICAgLy8gQ2FwdHVyZSB0aGUgdGFiXG4gICAgY29uc3QgZGF0YVVybCA9IGF3YWl0IGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKG51bGwsIHsgZm9ybWF0OiBcInBuZ1wiIH0pO1xuXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IFVSTFxuICAgIGNvbnN0IHVybCA9IGF3YWl0IGdldEN1cnJlbnRUYWJVcmwobWVzc2FnZS50YWJJZCk7XG5cbiAgICAvLyBTZW5kIHRvIHNlcnZlclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8ke3NldHRpbmdzLnNlcnZlckhvc3R9OiR7c2V0dGluZ3Muc2VydmVyUG9ydH0vc2NyZWVuc2hvdGAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgc2NyZWVuc2hvdDogZGF0YVVybCxcbiAgICAgICAgdGFiSWQ6IG1lc3NhZ2UudGFiSWQsXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgcGF0aDogc2V0dGluZ3Muc2NyZWVuc2hvdFBhdGggfHwgXCJcIixcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZXJ2ZXIgcmVzcG9uZGVkIHdpdGggc3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAvLyBTZW5kIHJlc3BvbnNlIGJhY2tcbiAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHBhdGg6IHJlc3VsdC5wYXRoLFxuICAgICAgbWVzc2FnZTogcmVzdWx0Lm1lc3NhZ2UsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNhcHR1cmluZyBvciBzZW5kaW5nIHNjcmVlbnNob3Q6XCIsIGVycm9yKTtcbiAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICB9KTtcbiAgfVxufVxuXG4vLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gdGhlIGRldnRvb2xzIHBhbmVsXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiR0VUX0NVUlJFTlRfVVJMXCIgJiYgbWVzc2FnZS50YWJJZCkge1xuICAgIGdldEN1cnJlbnRUYWJVcmwobWVzc2FnZS50YWJJZClcbiAgICAgIC50aGVuKCh1cmwpID0+IHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgdXJsOiB1cmwgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gUmVxdWlyZWQgdG8gdXNlIHNlbmRSZXNwb25zZSBhc3luY2hyb25vdXNseVxuICB9XG5cbiAgLy8gSGFuZGxlIGV4cGxpY2l0IHJlcXVlc3QgdG8gdXBkYXRlIHRoZSBzZXJ2ZXIgd2l0aCB0aGUgVVJMXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiVVBEQVRFX1NFUlZFUl9VUkxcIiAmJiBtZXNzYWdlLnRhYklkICYmIG1lc3NhZ2UudXJsKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQmFja2dyb3VuZDogUmVjZWl2ZWQgcmVxdWVzdCB0byB1cGRhdGUgc2VydmVyIHdpdGggVVJMIGZvciB0YWIgJHttZXNzYWdlLnRhYklkfTogJHttZXNzYWdlLnVybH1gXG4gICAgKTtcbiAgICB1cGRhdGVTZXJ2ZXJXaXRoVXJsKFxuICAgICAgbWVzc2FnZS50YWJJZCxcbiAgICAgIG1lc3NhZ2UudXJsLFxuICAgICAgbWVzc2FnZS5zb3VyY2UgfHwgXCJleHBsaWNpdF91cGRhdGVcIlxuICAgIClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHNlbmRSZXNwb25zZSkgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJCYWNrZ3JvdW5kOiBFcnJvciB1cGRhdGluZyBzZXJ2ZXIgd2l0aCBVUkw6XCIsIGVycm9yKTtcbiAgICAgICAgaWYgKHNlbmRSZXNwb25zZSlcbiAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gUmVxdWlyZWQgdG8gdXNlIHNlbmRSZXNwb25zZSBhc3luY2hyb25vdXNseVxuICB9XG5cbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJDQVBUVVJFX1NDUkVFTlNIT1RcIiAmJiBtZXNzYWdlLnRhYklkKSB7XG4gICAgLy8gRmlyc3QgZ2V0IHRoZSBzZXJ2ZXIgc2V0dGluZ3NcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJdLCAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBzZXR0aW5ncyA9IHJlc3VsdC5icm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfHwge1xuICAgICAgICBzZXJ2ZXJIb3N0OiBcImxvY2FsaG9zdFwiLFxuICAgICAgICBzZXJ2ZXJQb3J0OiAzMDI1LFxuICAgICAgfTtcblxuICAgICAgLy8gVmFsaWRhdGUgc2VydmVyIGlkZW50aXR5IGZpcnN0XG4gICAgICB2YWxpZGF0ZVNlcnZlcklkZW50aXR5KHNldHRpbmdzLnNlcnZlckhvc3QsIHNldHRpbmdzLnNlcnZlclBvcnQpXG4gICAgICAgIC50aGVuKChpc1ZhbGlkKSA9PiB7XG4gICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIkNhbm5vdCBjYXB0dXJlIHNjcmVlbnNob3Q6IE5vdCBjb25uZWN0ZWQgdG8gYSB2YWxpZCBicm93c2VyIHRvb2xzIHNlcnZlclwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOlxuICAgICAgICAgICAgICAgIFwiTm90IGNvbm5lY3RlZCB0byBhIHZhbGlkIGJyb3dzZXIgdG9vbHMgc2VydmVyLiBQbGVhc2UgY2hlY2sgeW91ciBjb25uZWN0aW9uIHNldHRpbmdzLlwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29udGludWUgd2l0aCBzY3JlZW5zaG90IGNhcHR1cmVcbiAgICAgICAgICBjYXB0dXJlQW5kU2VuZFNjcmVlbnNob3QobWVzc2FnZSwgc2V0dGluZ3MsIHNlbmRSZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdmFsaWRhdGluZyBzZXJ2ZXI6XCIsIGVycm9yKTtcbiAgICAgICAgICBzZW5kUmVzcG9uc2Uoe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gdmFsaWRhdGUgc2VydmVyIGlkZW50aXR5OiBcIiArIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlOyAvLyBSZXF1aXJlZCB0byB1c2Ugc2VuZFJlc3BvbnNlIGFzeW5jaHJvbm91c2x5XG4gIH1cbn0pO1xuXG4vLyBMaXN0ZW4gZm9yIHRhYiB1cGRhdGVzIHRvIGRldGVjdCBwYWdlIHJlZnJlc2hlcyBhbmQgVVJMIGNoYW5nZXNcbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGNoYW5nZUluZm8sIHRhYikgPT4ge1xuICAvLyBUcmFjayBVUkwgY2hhbmdlc1xuICBpZiAoY2hhbmdlSW5mby51cmwpIHtcbiAgICBjb25zb2xlLmxvZyhgVVJMIGNoYW5nZWQgaW4gdGFiICR7dGFiSWR9IHRvICR7Y2hhbmdlSW5mby51cmx9YCk7XG4gICAgdGFiVXJscy5zZXQodGFiSWQsIGNoYW5nZUluZm8udXJsKTtcblxuICAgIC8vIFNlbmQgVVJMIHVwZGF0ZSB0byBzZXJ2ZXIgaWYgcG9zc2libGVcbiAgICB1cGRhdGVTZXJ2ZXJXaXRoVXJsKHRhYklkLCBjaGFuZ2VJbmZvLnVybCwgXCJ0YWJfdXJsX2NoYW5nZVwiKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoaXMgaXMgYSBwYWdlIHJlZnJlc2ggKHN0YXR1cyBiZWNvbWluZyBcImNvbXBsZXRlXCIpXG4gIGlmIChjaGFuZ2VJbmZvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgLy8gVXBkYXRlIFVSTCBpbiBvdXIgY2FjaGVcbiAgICBpZiAodGFiLnVybCkge1xuICAgICAgdGFiVXJscy5zZXQodGFiSWQsIHRhYi51cmwpO1xuICAgICAgLy8gU2VuZCBVUkwgdXBkYXRlIHRvIHNlcnZlciBpZiBwb3NzaWJsZVxuICAgICAgdXBkYXRlU2VydmVyV2l0aFVybCh0YWJJZCwgdGFiLnVybCwgXCJwYWdlX2NvbXBsZXRlXCIpO1xuICAgIH1cblxuICAgIHJldGVzdENvbm5lY3Rpb25PblJlZnJlc2godGFiSWQpO1xuICB9XG59KTtcblxuLy8gTGlzdGVuIGZvciB0YWIgYWN0aXZhdGlvbiAoc3dpdGNoaW5nIGJldHdlZW4gdGFicylcbmNocm9tZS50YWJzLm9uQWN0aXZhdGVkLmFkZExpc3RlbmVyKChhY3RpdmVJbmZvKSA9PiB7XG4gIGNvbnN0IHRhYklkID0gYWN0aXZlSW5mby50YWJJZDtcbiAgY29uc29sZS5sb2coYFRhYiBhY3RpdmF0ZWQ6ICR7dGFiSWR9YCk7XG5cbiAgLy8gR2V0IHRoZSBVUkwgb2YgdGhlIG5ld2x5IGFjdGl2YXRlZCB0YWJcbiAgY2hyb21lLnRhYnMuZ2V0KHRhYklkLCAodGFiKSA9PiB7XG4gICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGdldHRpbmcgdGFiIGluZm86XCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRhYi51cmwpIHtcbiAgICAgIC8vIFVwZGF0ZSBvdXIgY2FjaGVcbiAgICAgIHRhYlVybHMuc2V0KHRhYklkLCB0YWIudXJsKTtcblxuICAgICAgLy8gU2VuZCBVUkwgdXBkYXRlIHRvIHNlcnZlciBpZiBwb3NzaWJsZVxuICAgICAgdXBkYXRlU2VydmVyV2l0aFVybCh0YWJJZCwgdGFiLnVybCwgXCJ0YWJfYWN0aXZhdGVkXCIpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gQ2xlYW4gdXAgd2hlbiB0YWJzIGFyZSBjbG9zZWRcbmNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcigodGFiSWQpID0+IHtcbiAgdGFiVXJscy5kZWxldGUodGFiSWQpO1xufSk7XG5cbmV4cG9ydCB7fTtcbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJpbmRleC5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);