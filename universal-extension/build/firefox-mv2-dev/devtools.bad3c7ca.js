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
})({"5hjGe":[function(require,module,exports) {
var global = arguments[3];
var W = Object.create;
var P = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var G = Object.getOwnPropertyNames;
var X = Object.getPrototypeOf, J = Object.prototype.hasOwnProperty;
var q = (e, t, o, r)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let n of G(t))!J.call(e, n) && n !== o && P(e, n, {
        get: ()=>t[n],
        enumerable: !(r = V(t, n)) || r.enumerable
    });
    return e;
};
var z = (e, t, o)=>(o = e != null ? W(X(e)) : {}, q(t || !e || !e.__esModule ? P(o, "default", {
        value: e,
        enumerable: !0
    }) : o, e));
var y = globalThis.process?.argv || [];
var H = ()=>globalThis.process?.env || {};
var K = new Set(y), D = (e)=>K.has(e), ue = y.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var de = D("--dry-run"), _ = ()=>D("--verbose") || H().VERBOSE === "true", fe = _();
var x = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var k = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), T = (...e)=>x("\uD83D\uDD35 INFO", ...e), A = (...e)=>x("\uD83D\uDFE0 WARN", ...e), Q = 0, p = (...e)=>_() && x(`\u{1F7E1} ${Q++}`, ...e);
var c = {
    "isContentScript": false,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "page-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "/home/mcrowe/Programming/Personal/browser-tools-mcp/universal-extension/.plasmo/static/devtools.ts",
    "bundleId": "7b0e62dcbad3c7ca",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 42097
};
module.bundle.HMR_BUNDLE_ID = c.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: c.verbose
    }
};
var Y = module.bundle.Module;
function Z(e) {
    Y.call(this, e), this.hot = {
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
module.bundle.Module = Z;
module.bundle.hotData = {};
var d = globalThis.browser || globalThis.chrome || null;
async function m(e = !1) {
    e ? (p("Triggering full reload"), d.runtime.sendMessage({
        __plasmo_full_reload__: !0
    })) : globalThis.location?.reload?.();
}
function w() {
    return !c.host || c.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : c.host;
}
function L() {
    return !c.host || c.host === "0.0.0.0" ? "localhost" : c.host;
}
function f() {
    return c.port || location.port;
}
var S = "__plasmo_runtime_page_";
var i = {
    checkedAssets: {},
    assetsToDispose: [],
    assetsToAccept: []
}, B = ()=>{
    i.checkedAssets = {}, i.assetsToDispose = [], i.assetsToAccept = [];
};
function u(e, t) {
    let { modules: o } = e;
    if (!o) return [];
    let r = [], n, s, a;
    for(n in o)for(s in o[n][1])a = o[n][1][s], (a === t || Array.isArray(a) && a[a.length - 1] === t) && r.push([
        e,
        n
    ]);
    return e.parent && (r = r.concat(u(e.parent, t))), r;
}
function R(e, t, o) {
    if (C(e, t, o)) return !0;
    let r = u(module.bundle.root, t), n = !1;
    for(; r.length > 0;){
        let [s, a] = r.shift();
        if (C(s, a, null)) n = !0;
        else {
            let g = u(module.bundle.root, a);
            if (g.length === 0) {
                n = !1;
                break;
            }
            r.push(...g);
        }
    }
    return n;
}
function C(e, t, o) {
    let { modules: r } = e;
    if (!r) return !1;
    if (o && !o[e.HMR_BUNDLE_ID]) return e.parent ? R(e.parent, t, o) : !0;
    if (i.checkedAssets[t]) return !0;
    i.checkedAssets[t] = !0;
    let n = e.cache[t];
    return i.assetsToDispose.push([
        e,
        t
    ]), !n || n.hot && n.hot._acceptCallbacks.length ? (i.assetsToAccept.push([
        e,
        t
    ]), !0) : !1;
}
function M(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function ee(e) {
    if (e.type === "js" && typeof document < "u") return new Promise((t, o)=>{
        let r = document.createElement("script");
        r.src = `${e.url}?t=${Date.now()}`, e.outputFormat === "esmodule" && (r.type = "module"), r.addEventListener("load", ()=>t(r)), r.addEventListener("error", ()=>o(new Error(`Failed to download asset: ${e.id}`))), document.head?.appendChild(r);
    });
}
async function O(e) {
    global.parcelHotUpdate = Object.create(null), e.forEach((o)=>{
        o.url = d.runtime.getURL("/__plasmo_hmr_proxy__?url=" + encodeURIComponent(`${o.url}?t=${Date.now()}`));
    });
    let t = await Promise.all(e.map(ee));
    try {
        e.forEach(function(o) {
            $(module.bundle.root, o);
        });
    } finally{
        delete global.parcelHotUpdate, t && t.forEach((o)=>{
            o && document.head?.removeChild(o);
        });
    }
}
function te(e) {
    let t = e.cloneNode();
    t.onload = function() {
        e.parentNode !== null && e.parentNode.removeChild(e);
    }, t.setAttribute("href", e.getAttribute("href").split("?")[0] + "?" + Date.now()), e.parentNode.insertBefore(t, e.nextSibling);
}
var E = null;
function oe() {
    E || (E = setTimeout(function() {
        let e = document.querySelectorAll('link[rel="stylesheet"]');
        for(var t = 0; t < e.length; t++){
            let o = e[t].getAttribute("href"), r = w(), n = r === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + f()).test(o) : o.indexOf(r + ":" + f());
            /^https?:\/\//i.test(o) && o.indexOf(location.origin) !== 0 && !n || te(e[t]);
        }
        E = null;
    }, 47));
}
function $(e, t) {
    let { modules: o } = e;
    if (o) {
        if (t.type === "css") oe();
        else if (t.type === "js") {
            let r = t.depsByBundle[e.HMR_BUNDLE_ID];
            if (r) {
                if (o[t.id]) {
                    let s = o[t.id][1];
                    for(let a in s)if (!r[a] || r[a] !== s[a]) {
                        let l = s[a];
                        u(module.bundle.root, l).length === 1 && b(module.bundle.root, l);
                    }
                }
                let n = global.parcelHotUpdate[t.id];
                o[t.id] = [
                    n,
                    r
                ];
            } else e.parent && $(e.parent, t);
        }
    }
}
function b(e, t) {
    let o = e.modules;
    if (o) {
        if (o[t]) {
            let r = o[t][1], n = [];
            for(let s in r)u(module.bundle.root, r[s]).length === 1 && n.push(r[s]);
            delete o[t], delete e.cache[t], n.forEach((s)=>{
                b(module.bundle.root, s);
            });
        } else e.parent && b(e.parent, t);
    }
}
function v(e, t) {
    let o = e.cache[t];
    e.hotData[t] = {}, o && o.hot && (o.hot.data = e.hotData[t]), o && o.hot && o.hot._disposeCallbacks.length && o.hot._disposeCallbacks.forEach(function(r) {
        r(e.hotData[t]);
    }), delete e.cache[t];
}
function I(e, t) {
    e(t);
    let o = e.cache[t];
    if (o && o.hot && o.hot._acceptCallbacks.length) {
        let r = u(module.bundle.root, t);
        o.hot._acceptCallbacks.forEach(function(n) {
            let s = n(()=>r);
            s && s.length && (s.forEach(([a, l])=>{
                v(a, l);
            }), i.assetsToAccept.push.apply(i.assetsToAccept, s));
        });
    }
}
function re(e = f()) {
    let t = L();
    return `${c.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function ne(e) {
    typeof e.message == "string" && k("[plasmo/parcel-runtime]: " + e.message);
}
function N(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(re());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let n of r.diagnostics.ansi){
            let s = n.codeframe || n.stack;
            A("[plasmo/parcel-runtime]: " + n.message + `
` + s + `

` + n.hints.join(`
`));
        }
    }), t.addEventListener("error", ne), t.addEventListener("open", ()=>{
        T(`[plasmo/parcel-runtime]: Connected to HMR server for ${c.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        A(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${c.entryFilePath}`);
    }), t;
}
var j = z(require("3b082b100935236c"));
async function F() {
    j.default.injectIntoGlobalHook(window), window.$RefreshReg$ = function() {}, window.$RefreshSig$ = function() {
        return function(e) {
            return e;
        };
    };
}
var se = `${S}${module.id}__`, h, U = module.bundle.parent;
if (!U || !U.isParcelRequire) {
    try {
        h = d?.runtime.connect({
            name: se
        }), h.onDisconnect.addListener(()=>{
            m();
        }), c.isReact || h.onMessage.addListener(()=>{
            m();
        });
    } catch (e) {
        p(e);
    }
    N(async (e)=>{
        if (p("Page runtime - On HMR Update"), c.isReact) {
            B();
            let t = e.filter((r)=>r.envHash === c.envHash);
            if (t.some((r)=>r.type === "css" || r.type === "js" && R(module.bundle.root, r.id, r.depsByBundle))) try {
                await O(t);
                let r = {};
                for (let [s, a] of i.assetsToDispose)r[a] || (v(s, a), r[a] = !0);
                let n = {};
                for(let s = 0; s < i.assetsToAccept.length; s++){
                    let [a, l] = i.assetsToAccept[s];
                    n[l] || (I(a, l), n[l] = !0);
                }
            } catch (r) {
                c.verbose === "true" && (console.trace(r), alert(JSON.stringify(r))), await m(!0);
            }
        } else {
            let t = e.filter((o)=>o.envHash === c.envHash).some((o)=>M(module.bundle, o.id));
            p("Page runtime -", {
                sourceChanged: t
            }), t && h.postMessage({
                __plasmo_page_changed__: !0
            });
        }
    });
}
c.isReact && (p("Injecting react refresh"), F());

},{"3b082b100935236c":"j8e0a"}],"j8e0a":[function(require,module,exports) {
var oe = Object.create;
var H = Object.defineProperty;
var ae = Object.getOwnPropertyDescriptor;
var ue = Object.getOwnPropertyNames;
var se = Object.getPrototypeOf, le = Object.prototype.hasOwnProperty;
var z = (o, f)=>()=>(f || o((f = {
            exports: {}
        }).exports, f), f.exports), ce = (o, f)=>{
    for(var s in f)H(o, s, {
        get: f[s],
        enumerable: !0
    });
}, D = (o, f, s, y)=>{
    if (f && typeof f == "object" || typeof f == "function") for (let m of ue(f))!le.call(o, m) && m !== s && H(o, m, {
        get: ()=>f[m],
        enumerable: !(y = ae(f, m)) || y.enumerable
    });
    return o;
}, S = (o, f, s)=>(D(o, f, "default"), s && D(s, f, "default")), G = (o, f, s)=>(s = o != null ? oe(se(o)) : {}, D(f || !o || !o.__esModule ? H(s, "default", {
        value: o,
        enumerable: !0
    }) : s, o)), de = (o)=>D(H({}, "__esModule", {
        value: !0
    }), o);
var N = z((h)=>{
    "use strict";
    (function() {
        "use strict";
        var o = Symbol.for("react.forward_ref"), f = Symbol.for("react.memo"), s = typeof WeakMap == "function" ? WeakMap : Map, y = new Map, m = new s, b = new s, j = new s, E = [], C = new Map, O = new Map, p = new Set, _ = new Set, F = typeof WeakMap == "function" ? new WeakMap : null, T = !1;
        function B(e) {
            if (e.fullKey !== null) return e.fullKey;
            var r = e.ownKey, n;
            try {
                n = e.getCustomHooks();
            } catch (i) {
                return e.forceReset = !0, e.fullKey = r, r;
            }
            for(var t = 0; t < n.length; t++){
                var l = n[t];
                if (typeof l != "function") return e.forceReset = !0, e.fullKey = r, r;
                var d = b.get(l);
                if (d !== void 0) {
                    var a = B(d);
                    d.forceReset && (e.forceReset = !0), r += "\n---\n" + a;
                }
            }
            return e.fullKey = r, r;
        }
        function q(e, r) {
            var n = b.get(e), t = b.get(r);
            return n === void 0 && t === void 0 ? !0 : !(n === void 0 || t === void 0 || B(n) !== B(t) || t.forceReset);
        }
        function $(e) {
            return e.prototype && e.prototype.isReactComponent;
        }
        function k(e, r) {
            return $(e) || $(r) ? !1 : !!q(e, r);
        }
        function Y(e) {
            return j.get(e);
        }
        function Z(e) {
            var r = new Map;
            return e.forEach(function(n, t) {
                r.set(t, n);
            }), r;
        }
        function W(e) {
            var r = new Set;
            return e.forEach(function(n) {
                r.add(n);
            }), r;
        }
        function M(e, r) {
            try {
                return e[r];
            } catch (n) {
                return;
            }
        }
        function J() {
            if (E.length === 0 || T) return null;
            T = !0;
            try {
                var e = new Set, r = new Set, n = E;
                E = [], n.forEach(function(u) {
                    var c = u[0], v = u[1], R = c.current;
                    j.set(R, c), j.set(v, c), c.current = v, k(R, v) ? r.add(c) : e.add(c);
                });
                var t = {
                    updatedFamilies: r,
                    staleFamilies: e
                };
                C.forEach(function(u) {
                    u.setRefreshHandler(Y);
                });
                var l = !1, d = null, a = W(_), i = W(p), g = Z(O);
                if (a.forEach(function(u) {
                    var c = g.get(u);
                    if (c === void 0) throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
                    if (_.has(u), F !== null && F.has(u)) {
                        var v = F.get(u);
                        try {
                            c.scheduleRoot(u, v);
                        } catch (R) {
                            l || (l = !0, d = R);
                        }
                    }
                }), i.forEach(function(u) {
                    var c = g.get(u);
                    if (c === void 0) throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
                    p.has(u);
                    try {
                        c.scheduleRefresh(u, t);
                    } catch (v) {
                        l || (l = !0, d = v);
                    }
                }), l) throw d;
                return t;
            } finally{
                T = !1;
            }
        }
        function P(e, r) {
            if (e === null || typeof e != "function" && typeof e != "object" || m.has(e)) return;
            var n = y.get(r);
            if (n === void 0 ? (n = {
                current: e
            }, y.set(r, n)) : E.push([
                n,
                e
            ]), m.set(e, n), typeof e == "object" && e !== null) switch(M(e, "$$typeof")){
                case o:
                    P(e.render, r + "$render");
                    break;
                case f:
                    P(e.type, r + "$type");
                    break;
            }
        }
        function K(e, r) {
            var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, t = arguments.length > 3 ? arguments[3] : void 0;
            if (b.has(e) || b.set(e, {
                forceReset: n,
                ownKey: r,
                fullKey: null,
                getCustomHooks: t || function() {
                    return [];
                }
            }), typeof e == "object" && e !== null) switch(M(e, "$$typeof")){
                case o:
                    K(e.render, r, n, t);
                    break;
                case f:
                    K(e.type, r, n, t);
                    break;
            }
        }
        function x(e) {
            var r = b.get(e);
            r !== void 0 && B(r);
        }
        function Q(e) {
            return y.get(e);
        }
        function X(e) {
            return m.get(e);
        }
        function ee(e) {
            var r = new Set;
            return p.forEach(function(n) {
                var t = O.get(n);
                if (t === void 0) throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
                var l = t.findHostInstancesForRefresh(n, e);
                l.forEach(function(d) {
                    r.add(d);
                });
            }), r;
        }
        function re(e) {
            var r = e.__REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (r === void 0) {
                var n = 0;
                e.__REACT_DEVTOOLS_GLOBAL_HOOK__ = r = {
                    renderers: new Map,
                    supportsFiber: !0,
                    inject: function(a) {
                        return n++;
                    },
                    onScheduleFiberRoot: function(a, i, g) {},
                    onCommitFiberRoot: function(a, i, g, u) {},
                    onCommitFiberUnmount: function() {}
                };
            }
            if (r.isDisabled) {
                console.warn("Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.");
                return;
            }
            var t = r.inject;
            r.inject = function(a) {
                var i = t.apply(this, arguments);
                return typeof a.scheduleRefresh == "function" && typeof a.setRefreshHandler == "function" && C.set(i, a), i;
            }, r.renderers.forEach(function(a, i) {
                typeof a.scheduleRefresh == "function" && typeof a.setRefreshHandler == "function" && C.set(i, a);
            });
            var l = r.onCommitFiberRoot, d = r.onScheduleFiberRoot || function() {};
            r.onScheduleFiberRoot = function(a, i, g) {
                return T || (_.delete(i), F !== null && F.set(i, g)), d.apply(this, arguments);
            }, r.onCommitFiberRoot = function(a, i, g, u) {
                var c = C.get(a);
                if (c !== void 0) {
                    O.set(i, c);
                    var v = i.current, R = v.alternate;
                    if (R !== null) {
                        var L = R.memoizedState != null && R.memoizedState.element != null && p.has(i), A = v.memoizedState != null && v.memoizedState.element != null;
                        !L && A ? (p.add(i), _.delete(i)) : L && A || (L && !A ? (p.delete(i), u ? _.add(i) : O.delete(i)) : !L && !A && u && _.add(i));
                    } else p.add(i);
                }
                return l.apply(this, arguments);
            };
        }
        function ne() {
            return !1;
        }
        function te() {
            return p.size;
        }
        function fe() {
            var e, r, n = !1;
            return function(t, l, d, a) {
                if (typeof l == "string") return e || (e = t, r = typeof a == "function"), t != null && (typeof t == "function" || typeof t == "object") && K(t, l, d, a), t;
                !n && r && (n = !0, x(e));
            };
        }
        function ie(e) {
            switch(typeof e){
                case "function":
                    if (e.prototype != null) {
                        if (e.prototype.isReactComponent) return !0;
                        var r = Object.getOwnPropertyNames(e.prototype);
                        if (r.length > 1 || r[0] !== "constructor" || e.prototype.__proto__ !== Object.prototype) return !1;
                    }
                    var n = e.name || e.displayName;
                    return typeof n == "string" && /^[A-Z]/.test(n);
                case "object":
                    if (e != null) switch(M(e, "$$typeof")){
                        case o:
                        case f:
                            return !0;
                        default:
                            return !1;
                    }
                    return !1;
                default:
                    return !1;
            }
        }
        h._getMountedRootCount = te, h.collectCustomHooksForSignature = x, h.createSignatureFunctionForTransform = fe, h.findAffectedHostInstances = ee, h.getFamilyByID = Q, h.getFamilyByType = X, h.hasUnrecoverableErrors = ne, h.injectIntoGlobalHook = re, h.isLikelyComponentType = ie, h.performReactRefresh = J, h.register = P, h.setSignature = K;
    })();
});
var I = z((pe, V)=>{
    "use strict";
    V.exports = N();
});
var w = {};
ce(w, {
    default: ()=>he
});
module.exports = de(w);
var U = G(I());
S(w, G(I()), module.exports);
var he = U.default; /*! Bundled license information:

react-refresh/cjs/react-refresh-runtime.development.js:
  (**
   * @license React
   * react-refresh-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/ 

},{}],"fHqFv":[function(require,module,exports) {
// @ts-nocheck
var _indexTsx = require("../../devtools/index.tsx");

},{"../../devtools/index.tsx":"cavLD"}],"cavLD":[function(require,module,exports) {
var _devtools = require("./devtools");
// Initialize the DevTools panel
document.addEventListener("DOMContentLoaded", ()=>{
    // Create the main container
    const container = document.createElement("div");
    container.className = "browser-tools-devtools-panel";
    // Add header
    const header = document.createElement("h1");
    header.textContent = "BrowserTools MCP";
    container.appendChild(header);
    // Append to body
    document.body.appendChild(container);
    // Load the devtools script
    const script = document.createElement("script");
    script.src = "devtools.js";
    document.body.appendChild(script);
});

},{"./devtools":"285pM"}],"285pM":[function(require,module,exports) {
// devtools.js
// Store settings with defaults
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
// Initialize settings with defaults
let devtoolsSettings = {
    ...defaultSettings
};
// Keep track of debugger state
let isDebuggerAttached = false;
let attachDebuggerRetries = 0;
const currentTabId = chrome.devtools.inspectedWindow.tabId;
const MAX_ATTACH_RETRIES = 3;
const ATTACH_RETRY_DELAY = 1000; // 1 second
// Load saved settings on startup
chrome.storage.local.get([
    "browserConnectorSettings"
], (result)=>{
    if (result.browserConnectorSettings) devtoolsSettings = {
        ...devtoolsSettings,
        ...result.browserConnectorSettings
    };
});
// Listen for settings updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.type === "SETTINGS_UPDATED") {
        devtoolsSettings = message.settings;
        // If server settings changed and we have a WebSocket, reconnect
        if (ws && (message.settings.serverHost !== devtoolsSettings.serverHost || message.settings.serverPort !== devtoolsSettings.serverPort)) {
            console.log("Server settings changed, reconnecting WebSocket...");
            setupWebSocket();
        }
    }
    // Handle connection status updates from page refreshes
    if (message.type === "CONNECTION_STATUS_UPDATE") {
        console.log(`DevTools received connection status update: ${message.isConnected ? "Connected" : "Disconnected"}`);
        // If connection is lost, try to reestablish WebSocket only if we had a previous connection
        if (!message.isConnected && ws) {
            console.log("Connection lost after page refresh, will attempt to reconnect WebSocket");
            // Only reconnect if we actually have a WebSocket that might be stale
            if (ws && (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING)) {
                console.log("WebSocket is already closed or closing, will reconnect");
                setupWebSocket();
            }
        }
    }
    // Handle auto-discovery requests after page refreshes
    if (message.type === "INITIATE_AUTO_DISCOVERY") {
        console.log(`DevTools initiating WebSocket reconnect after page refresh (reason: ${message.reason})`);
        // For page refreshes with forceRestart, we should always reconnect if our current connection is not working
        if ((message.reason === "page_refresh" || message.forceRestart === true) && (!ws || ws.readyState !== WebSocket.OPEN)) {
            console.log("Page refreshed and WebSocket not open - forcing reconnection");
            // Close existing WebSocket if any
            if (ws) {
                console.log("Closing existing WebSocket due to page refresh");
                intentionalClosure = true; // Mark as intentional to prevent auto-reconnect
                try {
                    ws.close();
                } catch (e) {
                    console.error("Error closing WebSocket:", e);
                }
                ws = null;
                intentionalClosure = false; // Reset flag
            }
            // Clear any pending reconnect timeouts
            if (wsReconnectTimeout) {
                clearTimeout(wsReconnectTimeout);
                wsReconnectTimeout = null;
            }
            // Try to reestablish the WebSocket connection
            setupWebSocket();
        }
    }
});
// Utility to recursively truncate strings in any data structure
function truncateStringsInData(data, maxLength, depth = 0, path = "") {
    // Add depth limit to prevent circular references
    if (depth > 100) {
        console.warn("Max depth exceeded at path:", path);
        return "[MAX_DEPTH_EXCEEDED]";
    }
    console.log(`Processing at path: ${path}, type:`, typeof data);
    if (typeof data === "string") {
        if (data.length > maxLength) {
            console.log(`Truncating string at path ${path} from ${data.length} to ${maxLength}`);
            return data.substring(0, maxLength) + "... (truncated)";
        }
        return data;
    }
    if (Array.isArray(data)) {
        console.log(`Processing array at path ${path} with length:`, data.length);
        return data.map((item, index)=>truncateStringsInData(item, maxLength, depth + 1, `${path}[${index}]`));
    }
    if (typeof data === "object" && data !== null) {
        console.log(`Processing object at path ${path} with keys:`, Object.keys(data));
        const result = {};
        for (const [key, value] of Object.entries(data))try {
            result[key] = truncateStringsInData(value, maxLength, depth + 1, path ? `${path}.${key}` : key);
        } catch (e) {
            console.error(`Error processing key ${key} at path ${path}:`, e);
            result[key] = "[ERROR_PROCESSING]";
        }
        return result;
    }
    return data;
}
// Helper to calculate the size of an object
function calculateObjectSize(obj) {
    return JSON.stringify(obj).length;
}
// Helper to process array of objects with size limit
function processArrayWithSizeLimit(array, maxTotalSize, processFunc) {
    let currentSize = 0;
    const result = [];
    for (const item of array){
        // Process the item first
        const processedItem = processFunc(item);
        const itemSize = calculateObjectSize(processedItem);
        // Check if adding this item would exceed the limit
        if (currentSize + itemSize > maxTotalSize) {
            console.log(`Reached size limit (${currentSize}/${maxTotalSize}), truncating array`);
            break;
        }
        // Add item and update size
        result.push(processedItem);
        currentSize += itemSize;
        console.log(`Added item of size ${itemSize}, total size now: ${currentSize}`);
    }
    return result;
}
// Modified processJsonString to handle arrays with size limit
function processJsonString(jsonString, maxLength) {
    console.log("Processing string of length:", jsonString?.length);
    try {
        let parsed;
        try {
            parsed = JSON.parse(jsonString);
            console.log("Successfully parsed as JSON, structure:", JSON.stringify(Object.keys(parsed)));
        } catch (e) {
            console.log("Not valid JSON, treating as string");
            return truncateStringsInData(jsonString, maxLength, 0, "root");
        }
        // If it's an array, process with size limit
        if (Array.isArray(parsed)) {
            console.log("Processing array of objects with size limit");
            const processed = processArrayWithSizeLimit(parsed, devtoolsSettings.maxLogSize, (item)=>truncateStringsInData(item, maxLength, 0, "root"));
            const result = JSON.stringify(processed);
            console.log(`Processed array: ${parsed.length} -> ${processed.length} items`);
            return result;
        }
        // Otherwise process as before
        const processed = truncateStringsInData(parsed, maxLength, 0, "root");
        const result = JSON.stringify(processed);
        console.log("Processed JSON string length:", result.length);
        return result;
    } catch (e) {
        console.error("Error in processJsonString:", e);
        return jsonString.substring(0, maxLength) + "... (truncated)";
    }
}
// Helper to send logs to browser-connector
async function sendToBrowserConnector(logData) {
    if (!logData) {
        console.error("No log data provided to sendToBrowserConnector");
        return;
    }
    // First, ensure we're connecting to the right server
    if (!await validateServerIdentity()) {
        console.error("Cannot send logs: Not connected to a valid browser tools server");
        return;
    }
    console.log("Sending log data to browser connector:", {
        type: logData.type,
        timestamp: logData.timestamp
    });
    // Process any string fields that might contain JSON
    const processedData = {
        ...logData
    };
    if (logData.type === "network-request") {
        console.log("Processing network request");
        if (processedData.requestBody) {
            console.log("Request body size before:", processedData.requestBody.length);
            processedData.requestBody = processJsonString(processedData.requestBody, devtoolsSettings.stringSizeLimit);
            console.log("Request body size after:", processedData.requestBody.length);
        }
        if (processedData.responseBody) {
            console.log("Response body size before:", processedData.responseBody.length);
            processedData.responseBody = processJsonString(processedData.responseBody, devtoolsSettings.stringSizeLimit);
            console.log("Response body size after:", processedData.responseBody.length);
        }
    } else if (logData.type === "console-log" || logData.type === "console-error") {
        console.log("Processing console message");
        if (processedData.message) {
            console.log("Message size before:", processedData.message.length);
            processedData.message = processJsonString(processedData.message, devtoolsSettings.stringSizeLimit);
            console.log("Message size after:", processedData.message.length);
        }
    }
    // Add settings to the request
    const payload = {
        data: {
            ...processedData,
            timestamp: Date.now()
        },
        settings: {
            logLimit: devtoolsSettings.logLimit,
            queryLimit: devtoolsSettings.queryLimit,
            showRequestHeaders: devtoolsSettings.showRequestHeaders,
            showResponseHeaders: devtoolsSettings.showResponseHeaders
        }
    };
    const finalPayloadSize = JSON.stringify(payload).length;
    console.log("Final payload size:", finalPayloadSize);
    if (finalPayloadSize > 1000000) {
        console.warn("Warning: Large payload detected:", finalPayloadSize);
        console.warn("Payload preview:", JSON.stringify(payload).substring(0, 1000) + "...");
    }
    const serverUrl = `http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/extension-log`;
    console.log(`Sending log to ${serverUrl}`);
    fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then((response)=>{
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }).then((data)=>{
        console.log("Log sent successfully:", data);
    }).catch((error)=>{
        console.error("Error sending log:", error);
    });
}
// Validate server identity
async function validateServerIdentity() {
    try {
        console.log(`Validating server identity at http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity...`);
        // Use fetch with a timeout to prevent long-hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 5000); // Increased timeout to 5 seconds
        try {
            const response = await fetch(`http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                console.error(`Server identity validation failed: HTTP ${response.status} - ${response.statusText}`);
                // Notify about the connection failure
                chrome.runtime.sendMessage({
                    type: "SERVER_VALIDATION_FAILED",
                    reason: "http_error",
                    status: response.status,
                    statusText: response.statusText,
                    serverHost: devtoolsSettings.serverHost,
                    serverPort: devtoolsSettings.serverPort
                });
                return false;
            }
            const identity = await response.json();
            console.log("Server identity response:", identity);
            // Validate signature
            if (identity.signature !== "mcp-browser-connector-24x7") {
                console.error("Server identity validation failed: Invalid signature", identity);
                // Notify about the invalid signature
                chrome.runtime.sendMessage({
                    type: "SERVER_VALIDATION_FAILED",
                    reason: "invalid_signature",
                    receivedSignature: identity.signature,
                    serverHost: devtoolsSettings.serverHost,
                    serverPort: devtoolsSettings.serverPort
                });
                return false;
            }
            console.log(`Server identity confirmed: ${identity.name} v${identity.version}`);
            // Notify about successful validation
            chrome.runtime.sendMessage({
                type: "SERVER_VALIDATION_SUCCESS",
                serverInfo: identity,
                serverHost: devtoolsSettings.serverHost,
                serverPort: devtoolsSettings.serverPort
            });
            return true;
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    } catch (error) {
        console.error("Server identity validation failed:", error);
        console.error(`Failed to connect to http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/.identity`);
        // Notify about the connection error
        chrome.runtime.sendMessage({
            type: "SERVER_VALIDATION_FAILED",
            reason: "connection_error",
            error: error.message,
            serverHost: devtoolsSettings.serverHost,
            serverPort: devtoolsSettings.serverPort
        });
        return false;
    }
}
// Function to clear logs on the server
function wipeLogs() {
    console.log("Wiping all logs...");
    const serverUrl = `http://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/wipelogs`;
    console.log(`Sending wipe request to ${serverUrl}`);
    fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }).then((data)=>{
        console.log("Logs wiped successfully:", data);
    }).catch((error)=>{
        console.error("Error wiping logs:", error);
    });
}
// Listen for page refreshes
chrome.devtools.network.onNavigated.addListener((url)=>{
    console.log("Page navigated/refreshed - wiping logs");
    wipeLogs();
    // Send the new URL to the server
    if (ws && ws.readyState === WebSocket.OPEN && url) {
        console.log("Chrome Extension: Sending page-navigated event with URL:", url);
        ws.send(JSON.stringify({
            type: "page-navigated",
            url: url,
            tabId: chrome.devtools.inspectedWindow.tabId,
            timestamp: Date.now()
        }));
    }
});
// 1) Listen for network requests
chrome.devtools.network.onRequestFinished.addListener((request)=>{
    if (request._resourceType === "xhr" || request._resourceType === "fetch") request.getContent((responseBody)=>{
        const entry = {
            type: "network-request",
            url: request.request.url,
            method: request.request.method,
            status: request.response.status,
            requestHeaders: request.request.headers,
            responseHeaders: request.response.headers,
            requestBody: request.request.postData?.text ?? "",
            responseBody: responseBody ?? ""
        };
        sendToBrowserConnector(entry);
    });
});
// Helper function to attach debugger
async function attachDebugger() {
    // First check if we're already attached to this tab
    chrome.debugger.getTargets((targets)=>{
        const isAlreadyAttached = targets.some((target)=>target.tabId === currentTabId && target.attached);
        if (isAlreadyAttached) {
            console.log("Found existing debugger attachment, detaching first...");
            // Force detach first to ensure clean state
            chrome.debugger.detach({
                tabId: currentTabId
            }, ()=>{
                // Ignore any errors during detach
                if (chrome.runtime.lastError) console.log("Error during forced detach:", chrome.runtime.lastError);
                // Now proceed with fresh attachment
                performAttach();
            });
        } else // No existing attachment, proceed directly
        performAttach();
    });
}
function performAttach() {
    console.log("Performing debugger attachment to tab:", currentTabId);
    chrome.debugger.attach({
        tabId: currentTabId
    }, "1.3", ()=>{
        if (chrome.runtime.lastError) {
            console.error("Failed to attach debugger:", chrome.runtime.lastError);
            isDebuggerAttached = false;
            return;
        }
        isDebuggerAttached = true;
        console.log("Debugger successfully attached");
        // Add the event listener when attaching
        chrome.debugger.onEvent.addListener(consoleMessageListener);
        chrome.debugger.sendCommand({
            tabId: currentTabId
        }, "Runtime.enable", {}, ()=>{
            if (chrome.runtime.lastError) {
                console.error("Failed to enable runtime:", chrome.runtime.lastError);
                return;
            }
            console.log("Runtime API successfully enabled");
        });
    });
}
// Helper function to detach debugger
function detachDebugger() {
    // Remove the event listener first
    chrome.debugger.onEvent.removeListener(consoleMessageListener);
    // Check if debugger is actually attached before trying to detach
    chrome.debugger.getTargets((targets)=>{
        const isStillAttached = targets.some((target)=>target.tabId === currentTabId && target.attached);
        if (!isStillAttached) {
            console.log("Debugger already detached");
            isDebuggerAttached = false;
            return;
        }
        chrome.debugger.detach({
            tabId: currentTabId
        }, ()=>{
            if (chrome.runtime.lastError) console.warn("Warning during debugger detach:", chrome.runtime.lastError);
            isDebuggerAttached = false;
            console.log("Debugger detached");
        });
    });
}
// Move the console message listener outside the panel creation
const consoleMessageListener = (source, method, params)=>{
    // Only process events for our tab
    if (source.tabId !== currentTabId) return;
    if (method === "Runtime.exceptionThrown") {
        const entry = {
            type: "console-error",
            message: params.exceptionDetails.exception?.description || JSON.stringify(params.exceptionDetails),
            level: "error",
            timestamp: Date.now()
        };
        sendToBrowserConnector(entry);
    }
    if (method === "Runtime.consoleAPICalled") {
        // Process all arguments from the console call
        let formattedMessage = "";
        const args = params.args || [];
        // Extract all arguments and combine them
        if (args.length > 0) // Try to build a meaningful representation of all arguments
        try {
            formattedMessage = args.map((arg)=>{
                // Handle different types of arguments
                if (arg.type === "string") return arg.value;
                else if (arg.type === "object" && arg.preview) // For objects, include their preview or description
                return JSON.stringify(arg.preview);
                else if (arg.description) // Some objects have descriptions
                return arg.description;
                else // Fallback for other types
                return arg.value || arg.description || JSON.stringify(arg);
            }).join(" ");
        } catch (e) {
            // Fallback if processing fails
            console.error("Failed to process console arguments:", e);
            formattedMessage = args[0]?.value || "Unable to process console arguments";
        }
        const entry = {
            type: params.type === "error" ? "console-error" : "console-log",
            level: params.type,
            message: formattedMessage,
            timestamp: Date.now()
        };
        sendToBrowserConnector(entry);
    }
};
// 2) Use DevTools Protocol to capture console logs
chrome.devtools.panels.create("BrowserToolsMCP", "", "panel.html", (panel)=>{
    // Initial attach - we'll keep the debugger attached as long as DevTools is open
    attachDebugger();
    // Handle panel showing
    panel.onShown.addListener((panelWindow)=>{
        if (!isDebuggerAttached) attachDebugger();
    });
});
// Clean up when DevTools closes
window.addEventListener("unload", ()=>{
    // Detach debugger
    detachDebugger();
    // Set intentional closure flag before closing
    intentionalClosure = true;
    if (ws) {
        try {
            ws.close();
        } catch (e) {
            console.error("Error closing WebSocket during unload:", e);
        }
        ws = null;
    }
    if (wsReconnectTimeout) {
        clearTimeout(wsReconnectTimeout);
        wsReconnectTimeout = null;
    }
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
});
// Function to capture and send element data
function captureAndSendElement() {
    chrome.devtools.inspectedWindow.eval(`(function() {
      const el = $0;  // $0 is the currently selected element in DevTools
      if (!el) return null;

      const rect = el.getBoundingClientRect();

      return {
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        textContent: el.textContent?.substring(0, 100),
        attributes: Array.from(el.attributes).map(attr => ({
          name: attr.name,
          value: attr.value
        })),
        dimensions: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        },
        innerHTML: el.innerHTML.substring(0, 500)
      };
    })()`, (result, isException)=>{
        if (isException || !result) return;
        console.log("Element selected:", result);
        // Send to browser connector
        sendToBrowserConnector({
            type: "selected-element",
            timestamp: Date.now(),
            element: result
        });
    });
}
// Listen for element selection in the Elements panel
chrome.devtools.panels.elements.onSelectionChanged.addListener(()=>{
    captureAndSendElement();
});
// WebSocket connection management
let ws = null;
let wsReconnectTimeout = null;
let heartbeatInterval = null;
const WS_RECONNECT_DELAY = 5000; // 5 seconds
const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const WS_CONNECTION_TIMEOUT = 10000; // 10 seconds
// Add a flag to track if we need to reconnect after identity validation
let reconnectAfterValidation = false;
// Track if we're intentionally closing the connection
let intentionalClosure = false;
// Function to send a heartbeat to keep the WebSocket connection alive
function sendHeartbeat() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("Chrome Extension: Sending WebSocket heartbeat");
        ws.send(JSON.stringify({
            type: "heartbeat"
        }));
    }
}
async function setupWebSocket() {
    // Clear any pending timeouts
    if (wsReconnectTimeout) {
        clearTimeout(wsReconnectTimeout);
        wsReconnectTimeout = null;
    }
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
    // Close existing WebSocket if any
    if (ws) {
        // Set flag to indicate this is an intentional closure
        intentionalClosure = true;
        try {
            ws.close();
        } catch (e) {
            console.error("Error closing existing WebSocket:", e);
        }
        ws = null;
        intentionalClosure = false; // Reset flag
    }
    // Validate server identity before connecting
    console.log("Validating server identity before WebSocket connection...");
    const isValid = await validateServerIdentity();
    if (!isValid) {
        console.error("Cannot establish WebSocket: Not connected to a valid browser tools server");
        // Set flag to indicate we need to reconnect after a page refresh check
        reconnectAfterValidation = true;
        // Try again after delay
        wsReconnectTimeout = setTimeout(()=>{
            console.log("Attempting to reconnect WebSocket after validation failure");
            setupWebSocket();
        }, WS_RECONNECT_DELAY);
        return;
    }
    // Reset reconnect flag since validation succeeded
    reconnectAfterValidation = false;
    const wsUrl = `ws://${devtoolsSettings.serverHost}:${devtoolsSettings.serverPort}/extension-ws`;
    console.log(`Connecting to WebSocket at ${wsUrl}`);
    try {
        ws = new WebSocket(wsUrl);
        // Set a connection timeout
        const connectionTimeoutId = setTimeout(()=>{
            if (ws && ws.readyState !== WebSocket.OPEN) {
                console.error(`WebSocket connection timeout after ${WS_CONNECTION_TIMEOUT}ms`);
                // Force close and trigger reconnect
                try {
                    ws.close();
                } catch (e) {
                    console.error("Error closing timed out WebSocket:", e);
                }
            }
        }, WS_CONNECTION_TIMEOUT);
        ws.onopen = ()=>{
            // Clear the connection timeout
            clearTimeout(connectionTimeoutId);
            console.log(`Chrome Extension: WebSocket connected to ${wsUrl}`);
            // Start heartbeat to keep connection alive
            heartbeatInterval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
            // Notify that connection is successful
            chrome.runtime.sendMessage({
                type: "WEBSOCKET_CONNECTED",
                serverHost: devtoolsSettings.serverHost,
                serverPort: devtoolsSettings.serverPort
            });
            // Send the current URL to the server right after connection
            // This ensures the server has the URL even if no navigation occurs
            chrome.runtime.sendMessage({
                type: "GET_CURRENT_URL",
                tabId: chrome.devtools.inspectedWindow.tabId
            }, (response)=>{
                if (chrome.runtime.lastError) {
                    console.error("Chrome Extension: Error getting URL from background on connection:", chrome.runtime.lastError);
                    // If normal method fails, try fallback to chrome.tabs API directly
                    tryFallbackGetUrl();
                    return;
                }
                if (response && response.url) {
                    console.log("Chrome Extension: Got URL from background:", response.url);
                    ws.send(JSON.stringify({
                        type: "current-url",
                        url: response.url,
                        tabId: chrome.devtools.inspectedWindow.tabId,
                        timestamp: Date.now()
                    }));
                } else // If response exists but no URL, try fallback
                tryFallbackGetUrl();
            });
            // Fallback method to get URL directly
            function tryFallbackGetUrl() {
                console.log("Chrome Extension: Trying fallback method to get URL");
                // Try to get the URL directly using the tabs API
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, (tabs)=>{
                    if (chrome.runtime.lastError) {
                        console.error("Chrome Extension: Fallback URL retrieval failed:", chrome.runtime.lastError);
                        return;
                    }
                    const url = tabs && tabs[0] && tabs[0].url;
                    console.log("Chrome Extension: Got URL directly from tab:", url);
                    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({
                        type: "current-url",
                        url: url || null,
                        tabId: chrome.devtools.inspectedWindow.tabId,
                        timestamp: Date.now()
                    }));
                    else console.error("Chrome Extension: WebSocket not open to send URL");
                });
            }
        };
        ws.onerror = (error)=>{
            // Clear the connection timeout
            clearTimeout(connectionTimeoutId);
            console.error(`Chrome Extension: WebSocket error for ${wsUrl}:`, error);
            // Notify about the WebSocket error
            chrome.runtime.sendMessage({
                type: "WEBSOCKET_ERROR",
                error: "Connection error",
                serverHost: devtoolsSettings.serverHost,
                serverPort: devtoolsSettings.serverPort
            });
        };
        ws.onclose = (event)=>{
            // Clear the connection timeout
            clearTimeout(connectionTimeoutId);
            console.log(`Chrome Extension: WebSocket closed for ${wsUrl}:`, event);
            // Stop heartbeat
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval);
                heartbeatInterval = null;
            }
            // Don't reconnect if this was an intentional closure
            if (intentionalClosure) {
                console.log("Chrome Extension: Intentional WebSocket closure, not reconnecting");
                return;
            }
            // Only attempt to reconnect if the closure wasn't intentional
            // Code 1000 (Normal Closure) and 1001 (Going Away) are normal closures
            // Code 1005 often happens with clean closures in Chrome
            const isAbnormalClosure = !(event.code === 1000 || event.code === 1001);
            // Check if this was an abnormal closure or if we need to reconnect after validation
            if (isAbnormalClosure || reconnectAfterValidation) {
                console.log(`Chrome Extension: Will attempt to reconnect WebSocket (closure code: ${event.code})`);
                // Notify about the WebSocket closure
                chrome.runtime.sendMessage({
                    type: "WEBSOCKET_CLOSED",
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean,
                    willReconnect: true,
                    serverHost: devtoolsSettings.serverHost,
                    serverPort: devtoolsSettings.serverPort
                });
                // Try to reconnect after delay
                wsReconnectTimeout = setTimeout(()=>{
                    console.log(`Chrome Extension: Attempting to reconnect WebSocket to ${wsUrl}`);
                    setupWebSocket();
                }, WS_RECONNECT_DELAY);
            } else {
                console.log(`Chrome Extension: Normal WebSocket closure, not reconnecting automatically`);
                // Notify about the WebSocket closure
                chrome.runtime.sendMessage({
                    type: "WEBSOCKET_CLOSED",
                    code: event.code,
                    reason: event.reason,
                    wasClean: event.wasClean,
                    willReconnect: false,
                    serverHost: devtoolsSettings.serverHost,
                    serverPort: devtoolsSettings.serverPort
                });
            }
        };
        ws.onmessage = async (event)=>{
            try {
                const message = JSON.parse(event.data);
                // Don't log heartbeat responses to reduce noise
                if (message.type !== "heartbeat-response") console.log("Chrome Extension: Received WebSocket message:", message);
                // Handle different message types
                if (message.type === "heartbeat-response") ;
                else if (message.type === "take-screenshot") {
                    console.log("Chrome Extension: Taking screenshot...");
                    // Notify that we're processing a screenshot request
                    chrome.runtime.sendMessage({
                        type: "SCREENSHOT_REQUESTED",
                        requestId: message.requestId
                    });
                    // Capture screenshot of the current tab
                    chrome.tabs.captureVisibleTab(null, {
                        format: "png"
                    }, (dataUrl)=>{
                        if (chrome.runtime.lastError) {
                            console.error("Chrome Extension: Screenshot capture failed:", chrome.runtime.lastError);
                            // Send error to server via WebSocket
                            if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({
                                type: "screenshot-error",
                                error: chrome.runtime.lastError.message,
                                requestId: message.requestId
                            }));
                            else console.error("Chrome Extension: WebSocket not open to send screenshot error");
                            // Also notify background script about the failure
                            chrome.runtime.sendMessage({
                                type: "SCREENSHOT_FAILED",
                                error: chrome.runtime.lastError.message,
                                requestId: message.requestId
                            });
                            return;
                        }
                        console.log("Chrome Extension: Screenshot captured successfully");
                        // Just send the screenshot data, let the server handle paths
                        const response = {
                            type: "screenshot-data",
                            data: dataUrl,
                            requestId: message.requestId,
                            // Only include path if it's configured in settings
                            ...devtoolsSettings.screenshotPath && {
                                path: devtoolsSettings.screenshotPath
                            },
                            // Include auto-paste setting
                            autoPaste: devtoolsSettings.allowAutoPaste
                        };
                        console.log("Chrome Extension: Sending screenshot data response", {
                            ...response,
                            data: "[base64 data]"
                        });
                        // Check WebSocket state before sending
                        if (ws && ws.readyState === WebSocket.OPEN) try {
                            ws.send(JSON.stringify(response));
                            // Notify background script about success
                            chrome.runtime.sendMessage({
                                type: "SCREENSHOT_SUCCEEDED",
                                requestId: message.requestId
                            });
                        } catch (error) {
                            console.error("Chrome Extension: Error sending screenshot data:", error);
                            // Notify background script about the failure
                            chrome.runtime.sendMessage({
                                type: "SCREENSHOT_FAILED",
                                error: "Failed to send screenshot data: " + error.message,
                                requestId: message.requestId
                            });
                        }
                        else {
                            console.error(`Chrome Extension: WebSocket not open to send screenshot data (state: ${ws ? ws.readyState : "null"})`);
                            // Notify background script about the failure
                            chrome.runtime.sendMessage({
                                type: "SCREENSHOT_FAILED",
                                error: "WebSocket not open to send screenshot data",
                                requestId: message.requestId
                            });
                        }
                    });
                } else if (message.type === "get-current-url") {
                    console.log("Chrome Extension: Received request for current URL");
                    chrome.runtime.sendMessage({
                        type: "GET_CURRENT_URL",
                        tabId: chrome.devtools.inspectedWindow.tabId
                    }, (response)=>{
                        if (chrome.runtime.lastError) {
                            console.error("Chrome Extension: Error getting URL from background:", chrome.runtime.lastError);
                            console.log("Chrome Extension: Trying fallback method to get URL");
                            // Try to get the URL directly using the tabs API
                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (tabs)=>{
                                if (chrome.runtime.lastError) {
                                    console.error("Chrome Extension: Fallback URL retrieval failed:", chrome.runtime.lastError);
                                    // Send error response
                                    ws.send(JSON.stringify({
                                        type: "current-url-response",
                                        url: null,
                                        tabId: chrome.devtools.inspectedWindow.tabId,
                                        error: "Failed to get URL: " + chrome.runtime.lastError.message,
                                        requestId: message.requestId
                                    }));
                                    return;
                                }
                                const url = tabs && tabs[0] && tabs[0].url;
                                console.log("Chrome Extension: Got URL directly from tab:", url);
                                ws.send(JSON.stringify({
                                    type: "current-url-response",
                                    url: url || null,
                                    tabId: chrome.devtools.inspectedWindow.tabId,
                                    timestamp: Date.now(),
                                    requestId: message.requestId
                                }));
                            });
                            return;
                        }
                        if (response && response.url) {
                            console.log("Chrome Extension: Got URL from background for response:", response.url);
                            ws.send(JSON.stringify({
                                type: "current-url-response",
                                url: response.url,
                                tabId: chrome.devtools.inspectedWindow.tabId,
                                timestamp: Date.now(),
                                requestId: message.requestId
                            }));
                        } else {
                            // If response exists but no URL, try fallback
                            console.log("Chrome Extension: Trying fallback method to get URL");
                            // Try to get the URL directly using the tabs API
                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (tabs)=>{
                                if (chrome.runtime.lastError) {
                                    console.error("Chrome Extension: Fallback URL retrieval failed:", chrome.runtime.lastError);
                                    // Send error response
                                    ws.send(JSON.stringify({
                                        type: "current-url-response",
                                        url: null,
                                        tabId: chrome.devtools.inspectedWindow.tabId,
                                        error: "Failed to get URL: " + chrome.runtime.lastError.message,
                                        requestId: message.requestId
                                    }));
                                    return;
                                }
                                const url = tabs && tabs[0] && tabs[0].url;
                                console.log("Chrome Extension: Got URL directly from tab:", url);
                                ws.send(JSON.stringify({
                                    type: "current-url-response",
                                    url: url || null,
                                    tabId: chrome.devtools.inspectedWindow.tabId,
                                    timestamp: Date.now(),
                                    requestId: message.requestId
                                }));
                            });
                        }
                    });
                }
            } catch (error) {
                console.error("Chrome Extension: Error processing WebSocket message:", error);
            }
        };
    } catch (error) {
        console.error("Error creating WebSocket:", error);
        // Try again after delay
        wsReconnectTimeout = setTimeout(setupWebSocket, WS_RECONNECT_DELAY);
    }
}
// Initialize WebSocket connection when DevTools opens
setupWebSocket();
// Clean up WebSocket when DevTools closes
window.addEventListener("unload", ()=>{
    if (ws) ws.close();
    if (wsReconnectTimeout) clearTimeout(wsReconnectTimeout);
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
});

},{}]},["5hjGe","fHqFv"], "fHqFv", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxBQUFDLENBQUEsTUFBSSxLQUFHLE1BQU0sUUFBUSxNQUFJLENBQUMsQ0FBQyxFQUFFLFNBQU8sRUFBRSxLQUFHLENBQUEsS0FBSSxFQUFFLEtBQUs7UUFBQztRQUFFO0tBQUU7SUFBRSxPQUFPLEVBQUUsVUFBUyxDQUFBLElBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFPLEdBQUUsR0FBRztBQUFDO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUcsRUFBRSxHQUFFLEdBQUUsSUFBRyxPQUFNLENBQUM7SUFBRSxJQUFJLElBQUUsRUFBRSxPQUFPLE9BQU8sTUFBSyxJQUFHLElBQUUsQ0FBQztJQUFFLE1BQUssRUFBRSxTQUFPLEdBQUc7UUFBQyxJQUFHLENBQUMsR0FBRSxFQUFFLEdBQUMsRUFBRTtRQUFRLElBQUcsRUFBRSxHQUFFLEdBQUUsT0FBTSxJQUFFLENBQUM7YUFBTTtZQUFDLElBQUksSUFBRSxFQUFFLE9BQU8sT0FBTyxNQUFLO1lBQUcsSUFBRyxFQUFFLFdBQVMsR0FBRTtnQkFBQyxJQUFFLENBQUM7Z0JBQUU7WUFBSztZQUFDLEVBQUUsUUFBUTtRQUFFO0lBQUM7SUFBQyxPQUFPO0FBQUM7QUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBRyxFQUFDLFNBQVEsQ0FBQyxFQUFDLEdBQUM7SUFBRSxJQUFHLENBQUMsR0FBRSxPQUFNLENBQUM7SUFBRSxJQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUMsT0FBTyxFQUFFLFNBQU8sRUFBRSxFQUFFLFFBQU8sR0FBRSxLQUFHLENBQUM7SUFBRSxJQUFHLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBQyxPQUFNLENBQUM7SUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUMsQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQUMsT0FBTyxFQUFFLGdCQUFnQixLQUFLO1FBQUM7UUFBRTtLQUFFLEdBQUUsQ0FBQyxLQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksaUJBQWlCLFNBQVEsQ0FBQSxFQUFFLGVBQWUsS0FBSztRQUFDO1FBQUU7S0FBRSxHQUFFLENBQUMsQ0FBQSxJQUFHLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUcsRUFBQyxTQUFRLENBQUMsRUFBQyxHQUFDO0lBQUUsT0FBTyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsR0FBRyxDQUFDO0lBQUUsSUFBRyxFQUFFLFNBQU8sUUFBTSxPQUFPLFdBQVMsS0FBSSxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUU7UUFBSyxJQUFJLElBQUUsU0FBUyxjQUFjO1FBQVUsRUFBRSxNQUFJLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUMsRUFBRSxpQkFBZSxjQUFhLENBQUEsRUFBRSxPQUFLLFFBQU8sR0FBRyxFQUFFLGlCQUFpQixRQUFPLElBQUksRUFBRSxLQUFJLEVBQUUsaUJBQWlCLFNBQVEsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUksU0FBUyxNQUFNLFlBQVk7SUFBRTtBQUFFO0FBQUMsZUFBZSxFQUFFLENBQUM7SUFBRSxPQUFPLGtCQUFnQixPQUFPLE9BQU8sT0FBTSxFQUFFLFFBQVEsQ0FBQTtRQUFJLEVBQUUsTUFBSSxFQUFFLFFBQVEsT0FBTywrQkFBNkIsbUJBQW1CLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDO0lBQUU7SUFBRyxJQUFJLElBQUUsTUFBTSxRQUFRLElBQUksRUFBRSxJQUFJO0lBQUssSUFBRztRQUFDLEVBQUUsUUFBUSxTQUFTLENBQUM7WUFBRSxFQUFFLE9BQU8sT0FBTyxNQUFLO1FBQUU7SUFBRSxTQUFRO1FBQUMsT0FBTyxPQUFPLGlCQUFnQixLQUFHLEVBQUUsUUFBUSxDQUFBO1lBQUksS0FBRyxTQUFTLE1BQU0sWUFBWTtRQUFFO0lBQUU7QUFBQztBQUFDLFNBQVMsR0FBRyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUU7SUFBWSxFQUFFLFNBQU87UUFBVyxFQUFFLGVBQWEsUUFBTSxFQUFFLFdBQVcsWUFBWTtJQUFFLEdBQUUsRUFBRSxhQUFhLFFBQU8sRUFBRSxhQUFhLFFBQVEsTUFBTSxJQUFJLENBQUMsRUFBRSxHQUFDLE1BQUksS0FBSyxRQUFPLEVBQUUsV0FBVyxhQUFhLEdBQUUsRUFBRTtBQUFZO0FBQUMsSUFBSSxJQUFFO0FBQUssU0FBUztJQUFLLEtBQUksQ0FBQSxJQUFFLFdBQVc7UUFBVyxJQUFJLElBQUUsU0FBUyxpQkFBaUI7UUFBMEIsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJO1lBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxTQUFRLElBQUUsS0FBSSxJQUFFLE1BQUksY0FBWSxJQUFJLE9BQU8sbURBQWlELEtBQUssS0FBSyxLQUFHLEVBQUUsUUFBUSxJQUFFLE1BQUk7WUFBSyxnQkFBZ0IsS0FBSyxNQUFJLEVBQUUsUUFBUSxTQUFTLFlBQVUsS0FBRyxDQUFDLEtBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUFDO1FBQUMsSUFBRTtJQUFJLEdBQUUsR0FBRTtBQUFFO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBRyxFQUFDLFNBQVEsQ0FBQyxFQUFDLEdBQUM7SUFBRSxJQUFHLEdBQUU7UUFBQyxJQUFHLEVBQUUsU0FBTyxPQUFNO2FBQVUsSUFBRyxFQUFFLFNBQU8sTUFBSztZQUFDLElBQUksSUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLGNBQWM7WUFBQyxJQUFHLEdBQUU7Z0JBQUMsSUFBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUM7b0JBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBRyxDQUFDLENBQUMsRUFBRSxFQUFDO3dCQUFDLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRTt3QkFBQyxFQUFFLE9BQU8sT0FBTyxNQUFLLEdBQUcsV0FBUyxLQUFHLEVBQUUsT0FBTyxPQUFPLE1BQUs7b0JBQUU7Z0JBQUM7Z0JBQUMsSUFBSSxJQUFFLE9BQU8sZUFBZSxDQUFDLEVBQUUsR0FBRztnQkFBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUM7b0JBQUM7b0JBQUU7aUJBQUU7WUFBQSxPQUFNLEVBQUUsVUFBUSxFQUFFLEVBQUUsUUFBTztRQUFFO0lBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFO0lBQVEsSUFBRztRQUFFLElBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBQztZQUFDLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxJQUFFLEVBQUU7WUFBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsT0FBTyxPQUFPLE1BQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFTLEtBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsUUFBUSxDQUFBO2dCQUFJLEVBQUUsT0FBTyxPQUFPLE1BQUs7WUFBRTtRQUFFLE9BQU0sRUFBRSxVQUFRLEVBQUUsRUFBRSxRQUFPOztBQUFFO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7SUFBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFFLEtBQUcsRUFBRSxPQUFNLENBQUEsRUFBRSxJQUFJLE9BQUssRUFBRSxPQUFPLENBQUMsRUFBRSxBQUFELEdBQUcsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLGtCQUFrQixVQUFRLEVBQUUsSUFBSSxrQkFBa0IsUUFBUSxTQUFTLENBQUM7UUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7SUFBQyxJQUFHLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtBQUFBO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsRUFBRTtJQUFHLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQUMsSUFBRyxLQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksaUJBQWlCLFFBQU87UUFBQyxJQUFJLElBQUUsRUFBRSxPQUFPLE9BQU8sTUFBSztRQUFHLEVBQUUsSUFBSSxpQkFBaUIsUUFBUSxTQUFTLENBQUM7WUFBRSxJQUFJLElBQUUsRUFBRSxJQUFJO1lBQUcsS0FBRyxFQUFFLFVBQVMsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUUsRUFBRTtnQkFBSSxFQUFFLEdBQUU7WUFBRSxJQUFHLEVBQUUsZUFBZSxLQUFLLE1BQU0sRUFBRSxnQkFBZSxFQUFDO1FBQUU7SUFBRTtBQUFDO0FBQUMsU0FBUyxHQUFHLElBQUUsR0FBRztJQUFFLElBQUksSUFBRTtJQUFJLE9BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBUSxTQUFTLGFBQVcsWUFBVSxDQUFDLDhCQUE4QixLQUFLLEtBQUcsUUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQUMsU0FBUyxHQUFHLENBQUM7SUFBRSxPQUFPLEVBQUUsV0FBUyxZQUFVLEVBQUUsOEJBQTRCLEVBQUU7QUFBUTtBQUFDLFNBQVMsRUFBRSxDQUFDO0lBQUUsSUFBRyxPQUFPLFdBQVcsWUFBVSxLQUFJO0lBQU8sSUFBSSxJQUFFLElBQUksVUFBVTtJQUFNLE9BQU8sRUFBRSxpQkFBaUIsV0FBVSxlQUFlLENBQUM7UUFBRSxJQUFJLElBQUUsS0FBSyxNQUFNLEVBQUU7UUFBTSxJQUFHLEVBQUUsU0FBTyxZQUFVLE1BQU0sRUFBRSxFQUFFLFNBQVEsRUFBRSxTQUFPLFNBQVEsS0FBSSxJQUFJLEtBQUssRUFBRSxZQUFZLEtBQUs7WUFBQyxJQUFJLElBQUUsRUFBRSxhQUFXLEVBQUU7WUFBTSxFQUFFLDhCQUE0QixFQUFFLFVBQVEsQ0FBQztBQUMzM0wsQ0FBQyxHQUFDLElBQUUsQ0FBQzs7QUFFTCxDQUFDLEdBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNoQixDQUFDO1FBQUU7SUFBQyxJQUFHLEVBQUUsaUJBQWlCLFNBQVEsS0FBSSxFQUFFLGlCQUFpQixRQUFPO1FBQUssRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEVBQUUsY0FBYyxDQUFDO0lBQUMsSUFBRyxFQUFFLGlCQUFpQixTQUFRO1FBQUssRUFBRSxDQUFDLG9FQUFvRSxFQUFFLEVBQUUsY0FBYyxDQUFDO0lBQUMsSUFBRztBQUFDO0FBQUMsSUFBSSxJQUFFLEVBQUUsUUFBUTtBQUEwQixlQUFlO0lBQUksRUFBRSxRQUFRLHFCQUFxQixTQUFRLE9BQU8sZUFBYSxZQUFXLEdBQUUsT0FBTyxlQUFhO1FBQVcsT0FBTyxTQUFTLENBQUM7WUFBRSxPQUFPO1FBQUM7SUFBQztBQUFDO0FBQUMsSUFBSSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFDLEdBQUUsSUFBRSxPQUFPLE9BQU87QUFBTyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUUsaUJBQWdCO0lBQUMsSUFBRztRQUFDLElBQUUsR0FBRyxRQUFRLFFBQVE7WUFBQyxNQUFLO1FBQUUsSUFBRyxFQUFFLGFBQWEsWUFBWTtZQUFLO1FBQUcsSUFBRyxFQUFFLFdBQVMsRUFBRSxVQUFVLFlBQVk7WUFBSztRQUFHO0lBQUUsRUFBQyxPQUFNLEdBQUU7UUFBQyxFQUFFO0lBQUU7SUFBQyxFQUFFLE9BQU07UUFBSSxJQUFHLEVBQUUsaUNBQWdDLEVBQUUsU0FBUTtZQUFDO1lBQUksSUFBSSxJQUFFLEVBQUUsT0FBTyxDQUFBLElBQUcsRUFBRSxZQUFVLEVBQUU7WUFBUyxJQUFHLEVBQUUsS0FBSyxDQUFBLElBQUcsRUFBRSxTQUFPLFNBQU8sRUFBRSxTQUFPLFFBQU0sRUFBRSxPQUFPLE9BQU8sTUFBSyxFQUFFLElBQUcsRUFBRSxnQkFBZSxJQUFHO2dCQUFDLE1BQU0sRUFBRTtnQkFBRyxJQUFJLElBQUUsQ0FBQztnQkFBRSxLQUFJLElBQUcsQ0FBQyxHQUFFLEVBQUUsSUFBRyxFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFHLENBQUEsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7Z0JBQUcsSUFBSSxJQUFFLENBQUM7Z0JBQUUsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsZUFBZSxRQUFPLElBQUk7b0JBQUMsSUFBRyxDQUFDLEdBQUUsRUFBRSxHQUFDLEVBQUUsY0FBYyxDQUFDLEVBQUU7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBRyxDQUFBLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO2dCQUFFO1lBQUMsRUFBQyxPQUFNLEdBQUU7Z0JBQUMsRUFBRSxZQUFVLFVBQVMsQ0FBQSxRQUFRLE1BQU0sSUFBRyxNQUFNLEtBQUssVUFBVSxHQUFFLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFBRTtRQUFDLE9BQUs7WUFBQyxJQUFJLElBQUUsRUFBRSxPQUFPLENBQUEsSUFBRyxFQUFFLFlBQVUsRUFBRSxTQUFTLEtBQUssQ0FBQSxJQUFHLEVBQUUsT0FBTyxRQUFPLEVBQUU7WUFBSyxFQUFFLGtCQUFpQjtnQkFBQyxlQUFjO1lBQUMsSUFBRyxLQUFHLEVBQUUsWUFBWTtnQkFBQyx5QkFBd0IsQ0FBQztZQUFDO1FBQUU7SUFBQztBQUFFO0FBQUMsRUFBRSxXQUFVLENBQUEsRUFBRSw0QkFBMkIsR0FBRTs7O0FDSjMwQyxJQUFJLEtBQUcsT0FBTztBQUFPLElBQUksSUFBRSxPQUFPO0FBQWUsSUFBSSxLQUFHLE9BQU87QUFBeUIsSUFBSSxLQUFHLE9BQU87QUFBb0IsSUFBSSxLQUFHLE9BQU8sZ0JBQWUsS0FBRyxPQUFPLFVBQVU7QUFBZSxJQUFJLElBQUUsQ0FBQyxHQUFFLElBQUksSUFBSyxDQUFBLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRTtZQUFDLFNBQVEsQ0FBQztRQUFDLENBQUEsRUFBRyxTQUFRLElBQUcsRUFBRSxPQUFNLEdBQUcsS0FBRyxDQUFDLEdBQUU7SUFBSyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsR0FBRSxHQUFFO1FBQUMsS0FBSSxDQUFDLENBQUMsRUFBRTtRQUFDLFlBQVcsQ0FBQztJQUFDO0FBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUU7SUFBSyxJQUFHLEtBQUcsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVcsS0FBSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUUsTUFBSSxNQUFJLEtBQUcsRUFBRSxHQUFFLEdBQUU7UUFBQyxLQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFBQyxZQUFXLENBQUUsQ0FBQSxJQUFFLEdBQUcsR0FBRSxFQUFDLEtBQUksRUFBRTtJQUFVO0lBQUcsT0FBTztBQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFLLENBQUEsRUFBRSxHQUFFLEdBQUUsWUFBVyxLQUFHLEVBQUUsR0FBRSxHQUFFLFVBQVMsR0FBRyxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUssQ0FBQSxJQUFFLEtBQUcsT0FBSyxHQUFHLEdBQUcsTUFBSSxDQUFDLEdBQUUsRUFBRSxLQUFHLENBQUMsS0FBRyxDQUFDLEVBQUUsYUFBVyxFQUFFLEdBQUUsV0FBVTtRQUFDLE9BQU07UUFBRSxZQUFXLENBQUM7SUFBQyxLQUFHLEdBQUUsRUFBQyxHQUFHLEtBQUcsQ0FBQSxJQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUUsY0FBYTtRQUFDLE9BQU0sQ0FBQztJQUFDLElBQUc7QUFBRyxJQUFJLElBQUUsRUFBRSxDQUFBO0lBQUk7SUFBYyxDQUFBO1FBQVc7UUFBYSxJQUFJLElBQUUsT0FBTyxJQUFJLHNCQUFxQixJQUFFLE9BQU8sSUFBSSxlQUFjLElBQUUsT0FBTyxXQUFTLGFB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R0FBRSxFQUFFLElBQUksR0FBRSxJQUFHLE9BQU8sS0FBRyxZQUFVLE1BQUksTUFBSyxPQUFPLEVBQUUsR0FBRTtnQkFBYSxLQUFLO29CQUFFLEVBQUUsRUFBRSxRQUFPLElBQUU7b0JBQVc7Z0JBQU0sS0FBSztvQkFBRSxFQUFFLEVBQUUsTUFBSyxJQUFFO29CQUFTO1lBQUs7UUFBRTtRQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUFFLElBQUksSUFBRSxVQUFVLFNBQU8sS0FBRyxTQUFTLENBQUMsRUFBRSxLQUFHLEtBQUssSUFBRSxTQUFTLENBQUMsRUFBRSxHQUFDLENBQUMsR0FBRSxJQUFFLFVBQVUsU0FBTyxJQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUMsS0FBSztZQUFFLElBQUcsRUFBRSxJQUFJLE1BQUksRUFBRSxJQUFJLEdBQUU7Z0JBQUMsWUFBVztnQkFBRSxRQUFPO2dCQUFFLFNBQVE7Z0JBQUssZ0JBQWUsS0FBRztvQkFBVyxPQUFNLEVBQUU7Z0JBQUE7WUFBQyxJQUFHLE9BQU8sS0FBRyxZQUFVLE1BQUksTUFBSyxPQUFPLEVBQUUsR0FBRTtnQkFBYSxLQUFLO29CQUFFLEVBQUUsRUFBRSxRQUFPLEdBQUUsR0FBRTtvQkFBRztnQkFBTSxLQUFLO29CQUFFLEVBQUUsRUFBRSxNQUFLLEdBQUUsR0FBRTtvQkFBRztZQUFLO1FBQUM7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFHLElBQUksSUFBRSxFQUFFLElBQUk7WUFBRyxNQUFJLEtBQUssS0FBRyxFQUFFO1FBQUc7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFFLE9BQU8sRUFBRSxJQUFJO1FBQUU7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFFLE9BQU8sRUFBRSxJQUFJO1FBQUU7UUFBQyxTQUFTLEdBQUcsQ0FBQztZQUFHLElBQUksSUFBRSxJQUFJO1lBQUksT0FBTyxFQUFFLFFBQVEsU0FBUyxDQUFDO2dCQUFFLElBQUksSUFBRSxFQUFFLElBQUk7Z0JBQUcsSUFBRyxNQUFJLEtBQUssR0FBRSxNQUFNLElBQUksTUFBTTtnQkFB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QU8sd0JBQXdCLE9BQU8sUUFBUSxVQUFVO3dDQUN4RCxXQUFXLFFBQVE7b0NBQ3JCO29DQUVGO2dDQUNGO2dDQUVBLE1BQU0sTUFBTSxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztnQ0FDdkMsUUFBUSxJQUFJLGdEQUFnRDtnQ0FFNUQsR0FBRyxLQUNELEtBQUssVUFBVTtvQ0FDYixNQUFNO29DQUNOLEtBQUssT0FBTztvQ0FDWixPQUFPLE9BQU8sU0FBUyxnQkFBZ0I7b0NBQ3ZDLFdBQVcsS0FBSztvQ0FDaEIsV0FBVyxRQUFRO2dDQUNyQjs0QkFFSjt3QkFDRjtvQkFDRjtnQkFFSjtZQUNGLEVBQUUsT0FBTyxPQUFPO2dCQUNkLFFBQVEsTUFDTix5REFDQTtZQUVKO1FBQ0Y7SUFDRixFQUFFLE9BQU8sT0FBTztRQUNkLFFBQVEsTUFBTSw2QkFBNkI7UUFDM0Msd0JBQXdCO1FBQ3hCLHFCQUFxQixXQUFXLGdCQUFnQjtJQUNsRDtBQUNGO0FBRUEsc0RBQXNEO0FBQ3REO0FBRUEsMENBQTBDO0FBQzFDLE9BQU8saUJBQWlCLFVBQVU7SUFDaEMsSUFBSSxJQUNGLEdBQUc7SUFFTCxJQUFJLG9CQUNGLGFBQWE7SUFHZixJQUFJLG1CQUFtQjtRQUNyQixjQUFjO1FBQ2Qsb0JBQW9CO0lBQ3RCO0FBQ0YiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLWNlMTRmZDg3N2JjMWU5OWYuanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1yZXNvbHZlckAwLjE0LjEvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcmVzb2x2ZXIvZGlzdC9wb2x5ZmlsbHMvcmVhY3QtcmVmcmVzaC9ydW50aW1lLmpzIiwiLnBsYXNtby9zdGF0aWMvZGV2dG9vbHMudHMiLCJkZXZ0b29scy9pbmRleC50c3giLCJkZXZ0b29scy9kZXZ0b29scy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVz1PYmplY3QuY3JlYXRlO3ZhciBQPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgVj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO3ZhciBHPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO3ZhciBYPU9iamVjdC5nZXRQcm90b3R5cGVPZixKPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIHE9KGUsdCxvLHIpPT57aWYodCYmdHlwZW9mIHQ9PVwib2JqZWN0XCJ8fHR5cGVvZiB0PT1cImZ1bmN0aW9uXCIpZm9yKGxldCBuIG9mIEcodCkpIUouY2FsbChlLG4pJiZuIT09byYmUChlLG4se2dldDooKT0+dFtuXSxlbnVtZXJhYmxlOiEocj1WKHQsbikpfHxyLmVudW1lcmFibGV9KTtyZXR1cm4gZX07dmFyIHo9KGUsdCxvKT0+KG89ZSE9bnVsbD9XKFgoZSkpOnt9LHEodHx8IWV8fCFlLl9fZXNNb2R1bGU/UChvLFwiZGVmYXVsdFwiLHt2YWx1ZTplLGVudW1lcmFibGU6ITB9KTpvLGUpKTt2YXIgeT1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciBIPSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEs9bmV3IFNldCh5KSxEPWU9PksuaGFzKGUpLHVlPXkuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgZGU9RChcIi0tZHJ5LXJ1blwiKSxfPSgpPT5EKFwiLS12ZXJib3NlXCIpfHxIKCkuVkVSQk9TRT09PVwidHJ1ZVwiLGZlPV8oKTt2YXIgeD0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgaz0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLFQ9KC4uLmUpPT54KFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksQT0oLi4uZSk9PngoXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxRPTAscD0oLi4uZSk9Pl8oKSYmeChgXFx1ezFGN0UxfSAke1ErK31gLC4uLmUpO3ZhciBjPXtcImlzQ29udGVudFNjcmlwdFwiOmZhbHNlLFwiaXNCYWNrZ3JvdW5kXCI6ZmFsc2UsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcInBhZ2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvaG9tZS9tY3Jvd2UvUHJvZ3JhbW1pbmcvUGVyc29uYWwvYnJvd3Nlci10b29scy1tY3AvdW5pdmVyc2FsLWV4dGVuc2lvbi8ucGxhc21vL3N0YXRpYy9kZXZ0b29scy50c1wiLFwiYnVuZGxlSWRcIjpcIjdiMGU2MmRjYmFkM2M3Y2FcIixcImVudkhhc2hcIjpcImU3OTJmYmJkYWE3OGVlODRcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjo0MjA5N307bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPWMuYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpjLnZlcmJvc2V9fTt2YXIgWT1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBaKGUpe1kuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9Wjttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGQ9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDthc3luYyBmdW5jdGlvbiBtKGU9ITEpe2U/KHAoXCJUcmlnZ2VyaW5nIGZ1bGwgcmVsb2FkXCIpLGQucnVudGltZS5zZW5kTWVzc2FnZSh7X19wbGFzbW9fZnVsbF9yZWxvYWRfXzohMH0pKTpnbG9iYWxUaGlzLmxvY2F0aW9uPy5yZWxvYWQ/LigpfWZ1bmN0aW9uIHcoKXtyZXR1cm4hYy5ob3N0fHxjLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpjLmhvc3R9ZnVuY3Rpb24gTCgpe3JldHVybiFjLmhvc3R8fGMuaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6Yy5ob3N0fWZ1bmN0aW9uIGYoKXtyZXR1cm4gYy5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBTPVwiX19wbGFzbW9fcnVudGltZV9wYWdlX1wiO3ZhciBpPXtjaGVja2VkQXNzZXRzOnt9LGFzc2V0c1RvRGlzcG9zZTpbXSxhc3NldHNUb0FjY2VwdDpbXX0sQj0oKT0+e2kuY2hlY2tlZEFzc2V0cz17fSxpLmFzc2V0c1RvRGlzcG9zZT1bXSxpLmFzc2V0c1RvQWNjZXB0PVtdfTtmdW5jdGlvbiB1KGUsdCl7bGV0e21vZHVsZXM6b309ZTtpZighbylyZXR1cm5bXTtsZXQgcj1bXSxuLHMsYTtmb3IobiBpbiBvKWZvcihzIGluIG9bbl1bMV0pYT1vW25dWzFdW3NdLChhPT09dHx8QXJyYXkuaXNBcnJheShhKSYmYVthLmxlbmd0aC0xXT09PXQpJiZyLnB1c2goW2Usbl0pO3JldHVybiBlLnBhcmVudCYmKHI9ci5jb25jYXQodShlLnBhcmVudCx0KSkpLHJ9ZnVuY3Rpb24gUihlLHQsbyl7aWYoQyhlLHQsbykpcmV0dXJuITA7bGV0IHI9dShtb2R1bGUuYnVuZGxlLnJvb3QsdCksbj0hMTtmb3IoO3IubGVuZ3RoPjA7KXtsZXRbcyxhXT1yLnNoaWZ0KCk7aWYoQyhzLGEsbnVsbCkpbj0hMDtlbHNle2xldCBnPXUobW9kdWxlLmJ1bmRsZS5yb290LGEpO2lmKGcubGVuZ3RoPT09MCl7bj0hMTticmVha31yLnB1c2goLi4uZyl9fXJldHVybiBufWZ1bmN0aW9uIEMoZSx0LG8pe2xldHttb2R1bGVzOnJ9PWU7aWYoIXIpcmV0dXJuITE7aWYobyYmIW9bZS5ITVJfQlVORExFX0lEXSlyZXR1cm4gZS5wYXJlbnQ/UihlLnBhcmVudCx0LG8pOiEwO2lmKGkuY2hlY2tlZEFzc2V0c1t0XSlyZXR1cm4hMDtpLmNoZWNrZWRBc3NldHNbdF09ITA7bGV0IG49ZS5jYWNoZVt0XTtyZXR1cm4gaS5hc3NldHNUb0Rpc3Bvc2UucHVzaChbZSx0XSksIW58fG4uaG90JiZuLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aD8oaS5hc3NldHNUb0FjY2VwdC5wdXNoKFtlLHRdKSwhMCk6ITF9ZnVuY3Rpb24gTShlLHQpe2xldHttb2R1bGVzOm99PWU7cmV0dXJuIG8/ISFvW3RdOiExfWZ1bmN0aW9uIGVlKGUpe2lmKGUudHlwZT09PVwianNcIiYmdHlwZW9mIGRvY3VtZW50PFwidVwiKXJldHVybiBuZXcgUHJvbWlzZSgodCxvKT0+e2xldCByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7ci5zcmM9YCR7ZS51cmx9P3Q9JHtEYXRlLm5vdygpfWAsZS5vdXRwdXRGb3JtYXQ9PT1cImVzbW9kdWxlXCImJihyLnR5cGU9XCJtb2R1bGVcIiksci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCgpPT50KHIpKSxyLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCgpPT5vKG5ldyBFcnJvcihgRmFpbGVkIHRvIGRvd25sb2FkIGFzc2V0OiAke2UuaWR9YCkpKSxkb2N1bWVudC5oZWFkPy5hcHBlbmRDaGlsZChyKX0pfWFzeW5jIGZ1bmN0aW9uIE8oZSl7Z2xvYmFsLnBhcmNlbEhvdFVwZGF0ZT1PYmplY3QuY3JlYXRlKG51bGwpLGUuZm9yRWFjaChvPT57by51cmw9ZC5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGAke28udXJsfT90PSR7RGF0ZS5ub3coKX1gKSl9KTtsZXQgdD1hd2FpdCBQcm9taXNlLmFsbChlLm1hcChlZSkpO3RyeXtlLmZvckVhY2goZnVuY3Rpb24obyl7JChtb2R1bGUuYnVuZGxlLnJvb3Qsbyl9KX1maW5hbGx5e2RlbGV0ZSBnbG9iYWwucGFyY2VsSG90VXBkYXRlLHQmJnQuZm9yRWFjaChvPT57byYmZG9jdW1lbnQuaGVhZD8ucmVtb3ZlQ2hpbGQobyl9KX19ZnVuY3Rpb24gdGUoZSl7bGV0IHQ9ZS5jbG9uZU5vZGUoKTt0Lm9ubG9hZD1mdW5jdGlvbigpe2UucGFyZW50Tm9kZSE9PW51bGwmJmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKX0sdC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnNwbGl0KFwiP1wiKVswXStcIj9cIitEYXRlLm5vdygpKSxlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsZS5uZXh0U2libGluZyl9dmFyIEU9bnVsbDtmdW5jdGlvbiBvZSgpe0V8fChFPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKTtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrKyl7bGV0IG89ZVt0XS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLHI9dygpLG49cj09PVwibG9jYWxob3N0XCI/bmV3IFJlZ0V4cChcIl4oaHR0cHM/OlxcXFwvXFxcXC8oMC4wLjAuMHwxMjcuMC4wLjEpfGxvY2FsaG9zdCk6XCIrZigpKS50ZXN0KG8pOm8uaW5kZXhPZihyK1wiOlwiK2YoKSk7L15odHRwcz86XFwvXFwvL2kudGVzdChvKSYmby5pbmRleE9mKGxvY2F0aW9uLm9yaWdpbikhPT0wJiYhbnx8dGUoZVt0XSl9RT1udWxsfSw0NykpfWZ1bmN0aW9uICQoZSx0KXtsZXR7bW9kdWxlczpvfT1lO2lmKG8pe2lmKHQudHlwZT09PVwiY3NzXCIpb2UoKTtlbHNlIGlmKHQudHlwZT09PVwianNcIil7bGV0IHI9dC5kZXBzQnlCdW5kbGVbZS5ITVJfQlVORExFX0lEXTtpZihyKXtpZihvW3QuaWRdKXtsZXQgcz1vW3QuaWRdWzFdO2ZvcihsZXQgYSBpbiBzKWlmKCFyW2FdfHxyW2FdIT09c1thXSl7bGV0IGw9c1thXTt1KG1vZHVsZS5idW5kbGUucm9vdCxsKS5sZW5ndGg9PT0xJiZiKG1vZHVsZS5idW5kbGUucm9vdCxsKX19bGV0IG49Z2xvYmFsLnBhcmNlbEhvdFVwZGF0ZVt0LmlkXTtvW3QuaWRdPVtuLHJdfWVsc2UgZS5wYXJlbnQmJiQoZS5wYXJlbnQsdCl9fX1mdW5jdGlvbiBiKGUsdCl7bGV0IG89ZS5tb2R1bGVzO2lmKG8paWYob1t0XSl7bGV0IHI9b1t0XVsxXSxuPVtdO2ZvcihsZXQgcyBpbiByKXUobW9kdWxlLmJ1bmRsZS5yb290LHJbc10pLmxlbmd0aD09PTEmJm4ucHVzaChyW3NdKTtkZWxldGUgb1t0XSxkZWxldGUgZS5jYWNoZVt0XSxuLmZvckVhY2gocz0+e2IobW9kdWxlLmJ1bmRsZS5yb290LHMpfSl9ZWxzZSBlLnBhcmVudCYmYihlLnBhcmVudCx0KX1mdW5jdGlvbiB2KGUsdCl7bGV0IG89ZS5jYWNoZVt0XTtlLmhvdERhdGFbdF09e30sbyYmby5ob3QmJihvLmhvdC5kYXRhPWUuaG90RGF0YVt0XSksbyYmby5ob3QmJm8uaG90Ll9kaXNwb3NlQ2FsbGJhY2tzLmxlbmd0aCYmby5ob3QuX2Rpc3Bvc2VDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihyKXtyKGUuaG90RGF0YVt0XSl9KSxkZWxldGUgZS5jYWNoZVt0XX1mdW5jdGlvbiBJKGUsdCl7ZSh0KTtsZXQgbz1lLmNhY2hlW3RdO2lmKG8mJm8uaG90JiZvLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aCl7bGV0IHI9dShtb2R1bGUuYnVuZGxlLnJvb3QsdCk7by5ob3QuX2FjY2VwdENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2xldCBzPW4oKCk9PnIpO3MmJnMubGVuZ3RoJiYocy5mb3JFYWNoKChbYSxsXSk9Pnt2KGEsbCl9KSxpLmFzc2V0c1RvQWNjZXB0LnB1c2guYXBwbHkoaS5hc3NldHNUb0FjY2VwdCxzKSl9KX19ZnVuY3Rpb24gcmUoZT1mKCkpe2xldCB0PUwoKTtyZXR1cm5gJHtjLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIn06Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBuZShlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZrKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gTihlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQocmUoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcj1KU09OLnBhcnNlKG8uZGF0YSk7aWYoci50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShyLmFzc2V0cyksci50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgbiBvZiByLmRpYWdub3N0aWNzLmFuc2kpe2xldCBzPW4uY29kZWZyYW1lfHxuLnN0YWNrO0EoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrbi5tZXNzYWdlK2BcbmArcytgXG5cbmArbi5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLG5lKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntUKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7Yy5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e0EoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtjLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciBqPXoocmVxdWlyZShcInJlYWN0LXJlZnJlc2gvcnVudGltZVwiKSk7YXN5bmMgZnVuY3Rpb24gRigpe2ouZGVmYXVsdC5pbmplY3RJbnRvR2xvYmFsSG9vayh3aW5kb3cpLHdpbmRvdy4kUmVmcmVzaFJlZyQ9ZnVuY3Rpb24oKXt9LHdpbmRvdy4kUmVmcmVzaFNpZyQ9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGV9fX12YXIgc2U9YCR7U30ke21vZHVsZS5pZH1fX2AsaCxVPW1vZHVsZS5idW5kbGUucGFyZW50O2lmKCFVfHwhVS5pc1BhcmNlbFJlcXVpcmUpe3RyeXtoPWQ/LnJ1bnRpbWUuY29ubmVjdCh7bmFtZTpzZX0pLGgub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57bSgpfSksYy5pc1JlYWN0fHxoLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigoKT0+e20oKX0pfWNhdGNoKGUpe3AoZSl9Tihhc3luYyBlPT57aWYocChcIlBhZ2UgcnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYy5pc1JlYWN0KXtCKCk7bGV0IHQ9ZS5maWx0ZXIocj0+ci5lbnZIYXNoPT09Yy5lbnZIYXNoKTtpZih0LnNvbWUocj0+ci50eXBlPT09XCJjc3NcInx8ci50eXBlPT09XCJqc1wiJiZSKG1vZHVsZS5idW5kbGUucm9vdCxyLmlkLHIuZGVwc0J5QnVuZGxlKSkpdHJ5e2F3YWl0IE8odCk7bGV0IHI9e307Zm9yKGxldFtzLGFdb2YgaS5hc3NldHNUb0Rpc3Bvc2UpclthXXx8KHYocyxhKSxyW2FdPSEwKTtsZXQgbj17fTtmb3IobGV0IHM9MDtzPGkuYXNzZXRzVG9BY2NlcHQubGVuZ3RoO3MrKyl7bGV0W2EsbF09aS5hc3NldHNUb0FjY2VwdFtzXTtuW2xdfHwoSShhLGwpLG5bbF09ITApfX1jYXRjaChyKXtjLnZlcmJvc2U9PT1cInRydWVcIiYmKGNvbnNvbGUudHJhY2UociksYWxlcnQoSlNPTi5zdHJpbmdpZnkocikpKSxhd2FpdCBtKCEwKX19ZWxzZXtsZXQgdD1lLmZpbHRlcihvPT5vLmVudkhhc2g9PT1jLmVudkhhc2gpLnNvbWUobz0+TShtb2R1bGUuYnVuZGxlLG8uaWQpKTtwKFwiUGFnZSBydW50aW1lIC1cIix7c291cmNlQ2hhbmdlZDp0fSksdCYmaC5wb3N0TWVzc2FnZSh7X19wbGFzbW9fcGFnZV9jaGFuZ2VkX186ITB9KX19KX1jLmlzUmVhY3QmJihwKFwiSW5qZWN0aW5nIHJlYWN0IHJlZnJlc2hcIiksRigpKTtcbiIsInZhciBvZT1PYmplY3QuY3JlYXRlO3ZhciBIPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgYWU9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgdWU9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7dmFyIHNlPU9iamVjdC5nZXRQcm90b3R5cGVPZixsZT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciB6PShvLGYpPT4oKT0+KGZ8fG8oKGY9e2V4cG9ydHM6e319KS5leHBvcnRzLGYpLGYuZXhwb3J0cyksY2U9KG8sZik9Pntmb3IodmFyIHMgaW4gZilIKG8scyx7Z2V0OmZbc10sZW51bWVyYWJsZTohMH0pfSxEPShvLGYscyx5KT0+e2lmKGYmJnR5cGVvZiBmPT1cIm9iamVjdFwifHx0eXBlb2YgZj09XCJmdW5jdGlvblwiKWZvcihsZXQgbSBvZiB1ZShmKSkhbGUuY2FsbChvLG0pJiZtIT09cyYmSChvLG0se2dldDooKT0+ZlttXSxlbnVtZXJhYmxlOiEoeT1hZShmLG0pKXx8eS5lbnVtZXJhYmxlfSk7cmV0dXJuIG99LFM9KG8sZixzKT0+KEQobyxmLFwiZGVmYXVsdFwiKSxzJiZEKHMsZixcImRlZmF1bHRcIikpLEc9KG8sZixzKT0+KHM9byE9bnVsbD9vZShzZShvKSk6e30sRChmfHwhb3x8IW8uX19lc01vZHVsZT9IKHMsXCJkZWZhdWx0XCIse3ZhbHVlOm8sZW51bWVyYWJsZTohMH0pOnMsbykpLGRlPW89PkQoSCh7fSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxvKTt2YXIgTj16KGg9PntcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1TeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIiksZj1TeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKSxzPXR5cGVvZiBXZWFrTWFwPT1cImZ1bmN0aW9uXCI/V2Vha01hcDpNYXAseT1uZXcgTWFwLG09bmV3IHMsYj1uZXcgcyxqPW5ldyBzLEU9W10sQz1uZXcgTWFwLE89bmV3IE1hcCxwPW5ldyBTZXQsXz1uZXcgU2V0LEY9dHlwZW9mIFdlYWtNYXA9PVwiZnVuY3Rpb25cIj9uZXcgV2Vha01hcDpudWxsLFQ9ITE7ZnVuY3Rpb24gQihlKXtpZihlLmZ1bGxLZXkhPT1udWxsKXJldHVybiBlLmZ1bGxLZXk7dmFyIHI9ZS5vd25LZXksbjt0cnl7bj1lLmdldEN1c3RvbUhvb2tzKCl9Y2F0Y2goaSl7cmV0dXJuIGUuZm9yY2VSZXNldD0hMCxlLmZ1bGxLZXk9cixyfWZvcih2YXIgdD0wO3Q8bi5sZW5ndGg7dCsrKXt2YXIgbD1uW3RdO2lmKHR5cGVvZiBsIT1cImZ1bmN0aW9uXCIpcmV0dXJuIGUuZm9yY2VSZXNldD0hMCxlLmZ1bGxLZXk9cixyO3ZhciBkPWIuZ2V0KGwpO2lmKGQhPT12b2lkIDApe3ZhciBhPUIoZCk7ZC5mb3JjZVJlc2V0JiYoZS5mb3JjZVJlc2V0PSEwKSxyKz1cIlxcbi0tLVxcblwiK2F9fXJldHVybiBlLmZ1bGxLZXk9cixyfWZ1bmN0aW9uIHEoZSxyKXt2YXIgbj1iLmdldChlKSx0PWIuZ2V0KHIpO3JldHVybiBuPT09dm9pZCAwJiZ0PT09dm9pZCAwPyEwOiEobj09PXZvaWQgMHx8dD09PXZvaWQgMHx8QihuKSE9PUIodCl8fHQuZm9yY2VSZXNldCl9ZnVuY3Rpb24gJChlKXtyZXR1cm4gZS5wcm90b3R5cGUmJmUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnR9ZnVuY3Rpb24gayhlLHIpe3JldHVybiAkKGUpfHwkKHIpPyExOiEhcShlLHIpfWZ1bmN0aW9uIFkoZSl7cmV0dXJuIGouZ2V0KGUpfWZ1bmN0aW9uIFooZSl7dmFyIHI9bmV3IE1hcDtyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKG4sdCl7ci5zZXQodCxuKX0pLHJ9ZnVuY3Rpb24gVyhlKXt2YXIgcj1uZXcgU2V0O3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24obil7ci5hZGQobil9KSxyfWZ1bmN0aW9uIE0oZSxyKXt0cnl7cmV0dXJuIGVbcl19Y2F0Y2gobil7cmV0dXJufX1mdW5jdGlvbiBKKCl7aWYoRS5sZW5ndGg9PT0wfHxUKXJldHVybiBudWxsO1Q9ITA7dHJ5e3ZhciBlPW5ldyBTZXQscj1uZXcgU2V0LG49RTtFPVtdLG4uZm9yRWFjaChmdW5jdGlvbih1KXt2YXIgYz11WzBdLHY9dVsxXSxSPWMuY3VycmVudDtqLnNldChSLGMpLGouc2V0KHYsYyksYy5jdXJyZW50PXYsayhSLHYpP3IuYWRkKGMpOmUuYWRkKGMpfSk7dmFyIHQ9e3VwZGF0ZWRGYW1pbGllczpyLHN0YWxlRmFtaWxpZXM6ZX07Qy5mb3JFYWNoKGZ1bmN0aW9uKHUpe3Uuc2V0UmVmcmVzaEhhbmRsZXIoWSl9KTt2YXIgbD0hMSxkPW51bGwsYT1XKF8pLGk9VyhwKSxnPVooTyk7aWYoYS5mb3JFYWNoKGZ1bmN0aW9uKHUpe3ZhciBjPWcuZ2V0KHUpO2lmKGM9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgaGVscGVycyBmb3IgYSByb290LiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0IFJlZnJlc2guXCIpO2lmKF8uaGFzKHUpLEYhPT1udWxsJiZGLmhhcyh1KSl7dmFyIHY9Ri5nZXQodSk7dHJ5e2Muc2NoZWR1bGVSb290KHUsdil9Y2F0Y2goUil7bHx8KGw9ITAsZD1SKX19fSksaS5mb3JFYWNoKGZ1bmN0aW9uKHUpe3ZhciBjPWcuZ2V0KHUpO2lmKGM9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgaGVscGVycyBmb3IgYSByb290LiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0IFJlZnJlc2guXCIpO3AuaGFzKHUpO3RyeXtjLnNjaGVkdWxlUmVmcmVzaCh1LHQpfWNhdGNoKHYpe2x8fChsPSEwLGQ9dil9fSksbCl0aHJvdyBkO3JldHVybiB0fWZpbmFsbHl7VD0hMX19ZnVuY3Rpb24gUChlLHIpe3tpZihlPT09bnVsbHx8dHlwZW9mIGUhPVwiZnVuY3Rpb25cIiYmdHlwZW9mIGUhPVwib2JqZWN0XCJ8fG0uaGFzKGUpKXJldHVybjt2YXIgbj15LmdldChyKTtpZihuPT09dm9pZCAwPyhuPXtjdXJyZW50OmV9LHkuc2V0KHIsbikpOkUucHVzaChbbixlXSksbS5zZXQoZSxuKSx0eXBlb2YgZT09XCJvYmplY3RcIiYmZSE9PW51bGwpc3dpdGNoKE0oZSxcIiQkdHlwZW9mXCIpKXtjYXNlIG86UChlLnJlbmRlcixyK1wiJHJlbmRlclwiKTticmVhaztjYXNlIGY6UChlLnR5cGUscitcIiR0eXBlXCIpO2JyZWFrfX19ZnVuY3Rpb24gSyhlLHIpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmYXJndW1lbnRzWzJdIT09dm9pZCAwP2FyZ3VtZW50c1syXTohMSx0PWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwO2lmKGIuaGFzKGUpfHxiLnNldChlLHtmb3JjZVJlc2V0Om4sb3duS2V5OnIsZnVsbEtleTpudWxsLGdldEN1c3RvbUhvb2tzOnR8fGZ1bmN0aW9uKCl7cmV0dXJuW119fSksdHlwZW9mIGU9PVwib2JqZWN0XCImJmUhPT1udWxsKXN3aXRjaChNKGUsXCIkJHR5cGVvZlwiKSl7Y2FzZSBvOksoZS5yZW5kZXIscixuLHQpO2JyZWFrO2Nhc2UgZjpLKGUudHlwZSxyLG4sdCk7YnJlYWt9fWZ1bmN0aW9uIHgoZSl7e3ZhciByPWIuZ2V0KGUpO3IhPT12b2lkIDAmJkIocil9fWZ1bmN0aW9uIFEoZSl7cmV0dXJuIHkuZ2V0KGUpfWZ1bmN0aW9uIFgoZSl7cmV0dXJuIG0uZ2V0KGUpfWZ1bmN0aW9uIGVlKGUpe3t2YXIgcj1uZXcgU2V0O3JldHVybiBwLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHQ9Ty5nZXQobik7aWYodD09PXZvaWQgMCl0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBoZWxwZXJzIGZvciBhIHJvb3QuIFRoaXMgaXMgYSBidWcgaW4gUmVhY3QgUmVmcmVzaC5cIik7dmFyIGw9dC5maW5kSG9zdEluc3RhbmNlc0ZvclJlZnJlc2gobixlKTtsLmZvckVhY2goZnVuY3Rpb24oZCl7ci5hZGQoZCl9KX0pLHJ9fWZ1bmN0aW9uIHJlKGUpe3t2YXIgcj1lLl9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztpZihyPT09dm9pZCAwKXt2YXIgbj0wO2UuX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fPXI9e3JlbmRlcmVyczpuZXcgTWFwLHN1cHBvcnRzRmliZXI6ITAsaW5qZWN0OmZ1bmN0aW9uKGEpe3JldHVybiBuKyt9LG9uU2NoZWR1bGVGaWJlclJvb3Q6ZnVuY3Rpb24oYSxpLGcpe30sb25Db21taXRGaWJlclJvb3Q6ZnVuY3Rpb24oYSxpLGcsdSl7fSxvbkNvbW1pdEZpYmVyVW5tb3VudDpmdW5jdGlvbigpe319fWlmKHIuaXNEaXNhYmxlZCl7Y29uc29sZS53YXJuKFwiU29tZXRoaW5nIGhhcyBzaGltbWVkIHRoZSBSZWFjdCBEZXZUb29scyBnbG9iYWwgaG9vayAoX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fKS4gRmFzdCBSZWZyZXNoIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhpcyBzaGltIGFuZCB3aWxsIGJlIGRpc2FibGVkLlwiKTtyZXR1cm59dmFyIHQ9ci5pbmplY3Q7ci5pbmplY3Q9ZnVuY3Rpb24oYSl7dmFyIGk9dC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7cmV0dXJuIHR5cGVvZiBhLnNjaGVkdWxlUmVmcmVzaD09XCJmdW5jdGlvblwiJiZ0eXBlb2YgYS5zZXRSZWZyZXNoSGFuZGxlcj09XCJmdW5jdGlvblwiJiZDLnNldChpLGEpLGl9LHIucmVuZGVyZXJzLmZvckVhY2goZnVuY3Rpb24oYSxpKXt0eXBlb2YgYS5zY2hlZHVsZVJlZnJlc2g9PVwiZnVuY3Rpb25cIiYmdHlwZW9mIGEuc2V0UmVmcmVzaEhhbmRsZXI9PVwiZnVuY3Rpb25cIiYmQy5zZXQoaSxhKX0pO3ZhciBsPXIub25Db21taXRGaWJlclJvb3QsZD1yLm9uU2NoZWR1bGVGaWJlclJvb3R8fGZ1bmN0aW9uKCl7fTtyLm9uU2NoZWR1bGVGaWJlclJvb3Q9ZnVuY3Rpb24oYSxpLGcpe3JldHVybiBUfHwoXy5kZWxldGUoaSksRiE9PW51bGwmJkYuc2V0KGksZykpLGQuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxyLm9uQ29tbWl0RmliZXJSb290PWZ1bmN0aW9uKGEsaSxnLHUpe3ZhciBjPUMuZ2V0KGEpO2lmKGMhPT12b2lkIDApe08uc2V0KGksYyk7dmFyIHY9aS5jdXJyZW50LFI9di5hbHRlcm5hdGU7aWYoUiE9PW51bGwpe3ZhciBMPVIubWVtb2l6ZWRTdGF0ZSE9bnVsbCYmUi5tZW1vaXplZFN0YXRlLmVsZW1lbnQhPW51bGwmJnAuaGFzKGkpLEE9di5tZW1vaXplZFN0YXRlIT1udWxsJiZ2Lm1lbW9pemVkU3RhdGUuZWxlbWVudCE9bnVsbDshTCYmQT8ocC5hZGQoaSksXy5kZWxldGUoaSkpOkwmJkF8fChMJiYhQT8ocC5kZWxldGUoaSksdT9fLmFkZChpKTpPLmRlbGV0ZShpKSk6IUwmJiFBJiZ1JiZfLmFkZChpKSl9ZWxzZSBwLmFkZChpKX1yZXR1cm4gbC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX1mdW5jdGlvbiBuZSgpe3JldHVybiExfWZ1bmN0aW9uIHRlKCl7cmV0dXJuIHAuc2l6ZX1mdW5jdGlvbiBmZSgpe3t2YXIgZSxyLG49ITE7cmV0dXJuIGZ1bmN0aW9uKHQsbCxkLGEpe2lmKHR5cGVvZiBsPT1cInN0cmluZ1wiKXJldHVybiBlfHwoZT10LHI9dHlwZW9mIGE9PVwiZnVuY3Rpb25cIiksdCE9bnVsbCYmKHR5cGVvZiB0PT1cImZ1bmN0aW9uXCJ8fHR5cGVvZiB0PT1cIm9iamVjdFwiKSYmSyh0LGwsZCxhKSx0OyFuJiZyJiYobj0hMCx4KGUpKX19fWZ1bmN0aW9uIGllKGUpe3N3aXRjaCh0eXBlb2YgZSl7Y2FzZVwiZnVuY3Rpb25cIjp7aWYoZS5wcm90b3R5cGUhPW51bGwpe2lmKGUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpcmV0dXJuITA7dmFyIHI9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5wcm90b3R5cGUpO2lmKHIubGVuZ3RoPjF8fHJbMF0hPT1cImNvbnN0cnVjdG9yXCJ8fGUucHJvdG90eXBlLl9fcHJvdG9fXyE9PU9iamVjdC5wcm90b3R5cGUpcmV0dXJuITF9dmFyIG49ZS5uYW1lfHxlLmRpc3BsYXlOYW1lO3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcIiYmL15bQS1aXS8udGVzdChuKX1jYXNlXCJvYmplY3RcIjp7aWYoZSE9bnVsbClzd2l0Y2goTShlLFwiJCR0eXBlb2ZcIikpe2Nhc2UgbzpjYXNlIGY6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX1yZXR1cm4hMX1kZWZhdWx0OnJldHVybiExfX1oLl9nZXRNb3VudGVkUm9vdENvdW50PXRlLGguY29sbGVjdEN1c3RvbUhvb2tzRm9yU2lnbmF0dXJlPXgsaC5jcmVhdGVTaWduYXR1cmVGdW5jdGlvbkZvclRyYW5zZm9ybT1mZSxoLmZpbmRBZmZlY3RlZEhvc3RJbnN0YW5jZXM9ZWUsaC5nZXRGYW1pbHlCeUlEPVEsaC5nZXRGYW1pbHlCeVR5cGU9WCxoLmhhc1VucmVjb3ZlcmFibGVFcnJvcnM9bmUsaC5pbmplY3RJbnRvR2xvYmFsSG9vaz1yZSxoLmlzTGlrZWx5Q29tcG9uZW50VHlwZT1pZSxoLnBlcmZvcm1SZWFjdFJlZnJlc2g9SixoLnJlZ2lzdGVyPVAsaC5zZXRTaWduYXR1cmU9S30pKCl9KTt2YXIgST16KChwZSxWKT0+e1widXNlIHN0cmljdFwiO1YuZXhwb3J0cz1OKCl9KTt2YXIgdz17fTtjZSh3LHtkZWZhdWx0OigpPT5oZX0pO21vZHVsZS5leHBvcnRzPWRlKHcpO3ZhciBVPUcoSSgpKTtTKHcsRyhJKCkpLG1vZHVsZS5leHBvcnRzKTt2YXIgaGU9VS5kZWZhdWx0O1xuLyohIEJ1bmRsZWQgbGljZW5zZSBpbmZvcm1hdGlvbjpcblxucmVhY3QtcmVmcmVzaC9janMvcmVhY3QtcmVmcmVzaC1ydW50aW1lLmRldmVsb3BtZW50LmpzOlxuICAoKipcbiAgICogQGxpY2Vuc2UgUmVhY3RcbiAgICogcmVhY3QtcmVmcmVzaC1ydW50aW1lLmRldmVsb3BtZW50LmpzXG4gICAqXG4gICAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICAgKlxuICAgKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAgICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICAgKilcbiovXG4iLCIvLyBAdHMtbm9jaGVja1xuaW1wb3J0IFwiLi4vLi4vZGV2dG9vbHMvaW5kZXgudHN4XCJcbiIsImltcG9ydCBcIi4vZGV2dG9vbHNcIlxuXG4vLyBJbml0aWFsaXplIHRoZSBEZXZUb29scyBwYW5lbFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBDcmVhdGUgdGhlIG1haW4gY29udGFpbmVyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImJyb3dzZXItdG9vbHMtZGV2dG9vbHMtcGFuZWxcIjtcbiAgXG4gIC8vIEFkZCBoZWFkZXJcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJyb3dzZXJUb29scyBNQ1BcIjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIFxuICAvLyBBcHBlbmQgdG8gYm9keVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gIFxuICAvLyBMb2FkIHRoZSBkZXZ0b29scyBzY3JpcHRcbiAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgc2NyaXB0LnNyYyA9IFwiZGV2dG9vbHMuanNcIjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufSk7XG5cbi8vIEV4cG9ydCBhbiBlbXB0eSBvYmplY3QgdG8gc2F0aXNmeSBUeXBlU2NyaXB0IG1vZHVsZSByZXF1aXJlbWVudHNcbmV4cG9ydCB7fTtcbiIsIi8vIGRldnRvb2xzLmpzXG5cbi8vIFN0b3JlIHNldHRpbmdzIHdpdGggZGVmYXVsdHNcbmNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgbG9nTGltaXQ6IDUwLFxuICBxdWVyeUxpbWl0OiAzMDAwMCxcbiAgc3RyaW5nU2l6ZUxpbWl0OiA1MDAsXG4gIG1heExvZ1NpemU6IDIwMDAwLFxuICBzaG93UmVxdWVzdEhlYWRlcnM6IGZhbHNlLFxuICBzaG93UmVzcG9uc2VIZWFkZXJzOiBmYWxzZSxcbiAgc2NyZWVuc2hvdFBhdGg6IFwiXCIsIC8vIEFkZCBuZXcgc2V0dGluZyBmb3Igc2NyZWVuc2hvdCBwYXRoXG4gIHNlcnZlckhvc3Q6IFwibG9jYWxob3N0XCIsIC8vIERlZmF1bHQgc2VydmVyIGhvc3RcbiAgc2VydmVyUG9ydDogMzAyNSwgLy8gRGVmYXVsdCBzZXJ2ZXIgcG9ydFxuICBhbGxvd0F1dG9QYXN0ZTogZmFsc2UsIC8vIERlZmF1bHQgYXV0by1wYXN0ZSBzZXR0aW5nXG59O1xuXG4vLyBJbml0aWFsaXplIHNldHRpbmdzIHdpdGggZGVmYXVsdHNcbmxldCBkZXZ0b29sc1NldHRpbmdzID0geyAuLi5kZWZhdWx0U2V0dGluZ3MgfTtcblxuLy8gS2VlcCB0cmFjayBvZiBkZWJ1Z2dlciBzdGF0ZVxubGV0IGlzRGVidWdnZXJBdHRhY2hlZCA9IGZhbHNlO1xubGV0IGF0dGFjaERlYnVnZ2VyUmV0cmllcyA9IDA7XG5jb25zdCBjdXJyZW50VGFiSWQgPSBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkO1xuY29uc3QgTUFYX0FUVEFDSF9SRVRSSUVTID0gMztcbmNvbnN0IEFUVEFDSF9SRVRSWV9ERUxBWSA9IDEwMDA7IC8vIDEgc2Vjb25kXG5cbi8vIExvYWQgc2F2ZWQgc2V0dGluZ3Mgb24gc3RhcnR1cFxuY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImJyb3dzZXJDb25uZWN0b3JTZXR0aW5nc1wiXSwgKHJlc3VsdCkgPT4ge1xuICBpZiAocmVzdWx0LmJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncykge1xuICAgIGRldnRvb2xzU2V0dGluZ3MgPSB7IC4uLmRldnRvb2xzU2V0dGluZ3MsIC4uLnJlc3VsdC5icm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfTtcbiAgfVxufSk7XG5cbi8vIExpc3RlbiBmb3Igc2V0dGluZ3MgdXBkYXRlc1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICBpZiAobWVzc2FnZS50eXBlID09PSBcIlNFVFRJTkdTX1VQREFURURcIikge1xuICAgIGRldnRvb2xzU2V0dGluZ3MgPSBtZXNzYWdlLnNldHRpbmdzO1xuXG4gICAgLy8gSWYgc2VydmVyIHNldHRpbmdzIGNoYW5nZWQgYW5kIHdlIGhhdmUgYSBXZWJTb2NrZXQsIHJlY29ubmVjdFxuICAgIGlmIChcbiAgICAgIHdzICYmXG4gICAgICAobWVzc2FnZS5zZXR0aW5ncy5zZXJ2ZXJIb3N0ICE9PSBkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3QgfHxcbiAgICAgICAgbWVzc2FnZS5zZXR0aW5ncy5zZXJ2ZXJQb3J0ICE9PSBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnQpXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNlcnZlciBzZXR0aW5ncyBjaGFuZ2VkLCByZWNvbm5lY3RpbmcgV2ViU29ja2V0Li4uXCIpO1xuICAgICAgc2V0dXBXZWJTb2NrZXQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgY29ubmVjdGlvbiBzdGF0dXMgdXBkYXRlcyBmcm9tIHBhZ2UgcmVmcmVzaGVzXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiQ09OTkVDVElPTl9TVEFUVVNfVVBEQVRFXCIpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBEZXZUb29scyByZWNlaXZlZCBjb25uZWN0aW9uIHN0YXR1cyB1cGRhdGU6ICR7XG4gICAgICAgIG1lc3NhZ2UuaXNDb25uZWN0ZWQgPyBcIkNvbm5lY3RlZFwiIDogXCJEaXNjb25uZWN0ZWRcIlxuICAgICAgfWBcbiAgICApO1xuXG4gICAgLy8gSWYgY29ubmVjdGlvbiBpcyBsb3N0LCB0cnkgdG8gcmVlc3RhYmxpc2ggV2ViU29ja2V0IG9ubHkgaWYgd2UgaGFkIGEgcHJldmlvdXMgY29ubmVjdGlvblxuICAgIGlmICghbWVzc2FnZS5pc0Nvbm5lY3RlZCAmJiB3cykge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiQ29ubmVjdGlvbiBsb3N0IGFmdGVyIHBhZ2UgcmVmcmVzaCwgd2lsbCBhdHRlbXB0IHRvIHJlY29ubmVjdCBXZWJTb2NrZXRcIlxuICAgICAgKTtcblxuICAgICAgLy8gT25seSByZWNvbm5lY3QgaWYgd2UgYWN0dWFsbHkgaGF2ZSBhIFdlYlNvY2tldCB0aGF0IG1pZ2h0IGJlIHN0YWxlXG4gICAgICBpZiAoXG4gICAgICAgIHdzICYmXG4gICAgICAgICh3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEIHx8XG4gICAgICAgICAgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NJTkcpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXZWJTb2NrZXQgaXMgYWxyZWFkeSBjbG9zZWQgb3IgY2xvc2luZywgd2lsbCByZWNvbm5lY3RcIik7XG4gICAgICAgIHNldHVwV2ViU29ja2V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gSGFuZGxlIGF1dG8tZGlzY292ZXJ5IHJlcXVlc3RzIGFmdGVyIHBhZ2UgcmVmcmVzaGVzXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiSU5JVElBVEVfQVVUT19ESVNDT1ZFUllcIikge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYERldlRvb2xzIGluaXRpYXRpbmcgV2ViU29ja2V0IHJlY29ubmVjdCBhZnRlciBwYWdlIHJlZnJlc2ggKHJlYXNvbjogJHttZXNzYWdlLnJlYXNvbn0pYFxuICAgICk7XG5cbiAgICAvLyBGb3IgcGFnZSByZWZyZXNoZXMgd2l0aCBmb3JjZVJlc3RhcnQsIHdlIHNob3VsZCBhbHdheXMgcmVjb25uZWN0IGlmIG91ciBjdXJyZW50IGNvbm5lY3Rpb24gaXMgbm90IHdvcmtpbmdcbiAgICBpZiAoXG4gICAgICAobWVzc2FnZS5yZWFzb24gPT09IFwicGFnZV9yZWZyZXNoXCIgfHwgbWVzc2FnZS5mb3JjZVJlc3RhcnQgPT09IHRydWUpICYmXG4gICAgICAoIXdzIHx8IHdzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKVxuICAgICkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiUGFnZSByZWZyZXNoZWQgYW5kIFdlYlNvY2tldCBub3Qgb3BlbiAtIGZvcmNpbmcgcmVjb25uZWN0aW9uXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIENsb3NlIGV4aXN0aW5nIFdlYlNvY2tldCBpZiBhbnlcbiAgICAgIGlmICh3cykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNsb3NpbmcgZXhpc3RpbmcgV2ViU29ja2V0IGR1ZSB0byBwYWdlIHJlZnJlc2hcIik7XG4gICAgICAgIGludGVudGlvbmFsQ2xvc3VyZSA9IHRydWU7IC8vIE1hcmsgYXMgaW50ZW50aW9uYWwgdG8gcHJldmVudCBhdXRvLXJlY29ubmVjdFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2xvc2luZyBXZWJTb2NrZXQ6XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHdzID0gbnVsbDtcbiAgICAgICAgaW50ZW50aW9uYWxDbG9zdXJlID0gZmFsc2U7IC8vIFJlc2V0IGZsYWdcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYXIgYW55IHBlbmRpbmcgcmVjb25uZWN0IHRpbWVvdXRzXG4gICAgICBpZiAod3NSZWNvbm5lY3RUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh3c1JlY29ubmVjdFRpbWVvdXQpO1xuICAgICAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBUcnkgdG8gcmVlc3RhYmxpc2ggdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uXG4gICAgICBzZXR1cFdlYlNvY2tldCgpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIFV0aWxpdHkgdG8gcmVjdXJzaXZlbHkgdHJ1bmNhdGUgc3RyaW5ncyBpbiBhbnkgZGF0YSBzdHJ1Y3R1cmVcbmZ1bmN0aW9uIHRydW5jYXRlU3RyaW5nc0luRGF0YShkYXRhLCBtYXhMZW5ndGgsIGRlcHRoID0gMCwgcGF0aCA9IFwiXCIpIHtcbiAgLy8gQWRkIGRlcHRoIGxpbWl0IHRvIHByZXZlbnQgY2lyY3VsYXIgcmVmZXJlbmNlc1xuICBpZiAoZGVwdGggPiAxMDApIHtcbiAgICBjb25zb2xlLndhcm4oXCJNYXggZGVwdGggZXhjZWVkZWQgYXQgcGF0aDpcIiwgcGF0aCk7XG4gICAgcmV0dXJuIFwiW01BWF9ERVBUSF9FWENFRURFRF1cIjtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBQcm9jZXNzaW5nIGF0IHBhdGg6ICR7cGF0aH0sIHR5cGU6YCwgdHlwZW9mIGRhdGEpO1xuXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmIChkYXRhLmxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBUcnVuY2F0aW5nIHN0cmluZyBhdCBwYXRoICR7cGF0aH0gZnJvbSAke2RhdGEubGVuZ3RofSB0byAke21heExlbmd0aH1gXG4gICAgICApO1xuICAgICAgcmV0dXJuIGRhdGEuc3Vic3RyaW5nKDAsIG1heExlbmd0aCkgKyBcIi4uLiAodHJ1bmNhdGVkKVwiO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgY29uc29sZS5sb2coYFByb2Nlc3NpbmcgYXJyYXkgYXQgcGF0aCAke3BhdGh9IHdpdGggbGVuZ3RoOmAsIGRhdGEubGVuZ3RoKTtcbiAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKGl0ZW0sIG1heExlbmd0aCwgZGVwdGggKyAxLCBgJHtwYXRofVske2luZGV4fV1gKVxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFByb2Nlc3Npbmcgb2JqZWN0IGF0IHBhdGggJHtwYXRofSB3aXRoIGtleXM6YCxcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0cnVuY2F0ZVN0cmluZ3NJbkRhdGEoXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgbWF4TGVuZ3RoLFxuICAgICAgICAgIGRlcHRoICsgMSxcbiAgICAgICAgICBwYXRoID8gYCR7cGF0aH0uJHtrZXl9YCA6IGtleVxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBwcm9jZXNzaW5nIGtleSAke2tleX0gYXQgcGF0aCAke3BhdGh9OmAsIGUpO1xuICAgICAgICByZXN1bHRba2V5XSA9IFwiW0VSUk9SX1BST0NFU1NJTkddXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLy8gSGVscGVyIHRvIGNhbGN1bGF0ZSB0aGUgc2l6ZSBvZiBhbiBvYmplY3RcbmZ1bmN0aW9uIGNhbGN1bGF0ZU9iamVjdFNpemUob2JqKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopLmxlbmd0aDtcbn1cblxuLy8gSGVscGVyIHRvIHByb2Nlc3MgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIHNpemUgbGltaXRcbmZ1bmN0aW9uIHByb2Nlc3NBcnJheVdpdGhTaXplTGltaXQoYXJyYXksIG1heFRvdGFsU2l6ZSwgcHJvY2Vzc0Z1bmMpIHtcbiAgbGV0IGN1cnJlbnRTaXplID0gMDtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGFycmF5KSB7XG4gICAgLy8gUHJvY2VzcyB0aGUgaXRlbSBmaXJzdFxuICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBwcm9jZXNzRnVuYyhpdGVtKTtcbiAgICBjb25zdCBpdGVtU2l6ZSA9IGNhbGN1bGF0ZU9iamVjdFNpemUocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAvLyBDaGVjayBpZiBhZGRpbmcgdGhpcyBpdGVtIHdvdWxkIGV4Y2VlZCB0aGUgbGltaXRcbiAgICBpZiAoY3VycmVudFNpemUgKyBpdGVtU2l6ZSA+IG1heFRvdGFsU2l6ZSkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBSZWFjaGVkIHNpemUgbGltaXQgKCR7Y3VycmVudFNpemV9LyR7bWF4VG90YWxTaXplfSksIHRydW5jYXRpbmcgYXJyYXlgXG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gQWRkIGl0ZW0gYW5kIHVwZGF0ZSBzaXplXG4gICAgcmVzdWx0LnB1c2gocHJvY2Vzc2VkSXRlbSk7XG4gICAgY3VycmVudFNpemUgKz0gaXRlbVNpemU7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQWRkZWQgaXRlbSBvZiBzaXplICR7aXRlbVNpemV9LCB0b3RhbCBzaXplIG5vdzogJHtjdXJyZW50U2l6ZX1gXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIE1vZGlmaWVkIHByb2Nlc3NKc29uU3RyaW5nIHRvIGhhbmRsZSBhcnJheXMgd2l0aCBzaXplIGxpbWl0XG5mdW5jdGlvbiBwcm9jZXNzSnNvblN0cmluZyhqc29uU3RyaW5nLCBtYXhMZW5ndGgpIHtcbiAgY29uc29sZS5sb2coXCJQcm9jZXNzaW5nIHN0cmluZyBvZiBsZW5ndGg6XCIsIGpzb25TdHJpbmc/Lmxlbmd0aCk7XG4gIHRyeSB7XG4gICAgbGV0IHBhcnNlZDtcbiAgICB0cnkge1xuICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIlN1Y2Nlc3NmdWxseSBwYXJzZWQgYXMgSlNPTiwgc3RydWN0dXJlOlwiLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhwYXJzZWQpKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vdCB2YWxpZCBKU09OLCB0cmVhdGluZyBhcyBzdHJpbmdcIik7XG4gICAgICByZXR1cm4gdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKGpzb25TdHJpbmcsIG1heExlbmd0aCwgMCwgXCJyb290XCIpO1xuICAgIH1cblxuICAgIC8vIElmIGl0J3MgYW4gYXJyYXksIHByb2Nlc3Mgd2l0aCBzaXplIGxpbWl0XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgY29uc29sZS5sb2coXCJQcm9jZXNzaW5nIGFycmF5IG9mIG9iamVjdHMgd2l0aCBzaXplIGxpbWl0XCIpO1xuICAgICAgY29uc3QgcHJvY2Vzc2VkID0gcHJvY2Vzc0FycmF5V2l0aFNpemVMaW1pdChcbiAgICAgICAgcGFyc2VkLFxuICAgICAgICBkZXZ0b29sc1NldHRpbmdzLm1heExvZ1NpemUsXG4gICAgICAgIChpdGVtKSA9PiB0cnVuY2F0ZVN0cmluZ3NJbkRhdGEoaXRlbSwgbWF4TGVuZ3RoLCAwLCBcInJvb3RcIilcbiAgICAgICk7XG4gICAgICBjb25zdCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShwcm9jZXNzZWQpO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBQcm9jZXNzZWQgYXJyYXk6ICR7cGFyc2VkLmxlbmd0aH0gLT4gJHtwcm9jZXNzZWQubGVuZ3RofSBpdGVtc2BcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSBwcm9jZXNzIGFzIGJlZm9yZVxuICAgIGNvbnN0IHByb2Nlc3NlZCA9IHRydW5jYXRlU3RyaW5nc0luRGF0YShwYXJzZWQsIG1heExlbmd0aCwgMCwgXCJyb290XCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHByb2Nlc3NlZCk7XG4gICAgY29uc29sZS5sb2coXCJQcm9jZXNzZWQgSlNPTiBzdHJpbmcgbGVuZ3RoOlwiLCByZXN1bHQubGVuZ3RoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIHByb2Nlc3NKc29uU3RyaW5nOlwiLCBlKTtcbiAgICByZXR1cm4ganNvblN0cmluZy5zdWJzdHJpbmcoMCwgbWF4TGVuZ3RoKSArIFwiLi4uICh0cnVuY2F0ZWQpXCI7XG4gIH1cbn1cblxuLy8gSGVscGVyIHRvIHNlbmQgbG9ncyB0byBicm93c2VyLWNvbm5lY3RvclxuYXN5bmMgZnVuY3Rpb24gc2VuZFRvQnJvd3NlckNvbm5lY3Rvcihsb2dEYXRhKSB7XG4gIGlmICghbG9nRGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJObyBsb2cgZGF0YSBwcm92aWRlZCB0byBzZW5kVG9Ccm93c2VyQ29ubmVjdG9yXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZpcnN0LCBlbnN1cmUgd2UncmUgY29ubmVjdGluZyB0byB0aGUgcmlnaHQgc2VydmVyXG4gIGlmICghKGF3YWl0IHZhbGlkYXRlU2VydmVySWRlbnRpdHkoKSkpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJDYW5ub3Qgc2VuZCBsb2dzOiBOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXJcIlxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc29sZS5sb2coXCJTZW5kaW5nIGxvZyBkYXRhIHRvIGJyb3dzZXIgY29ubmVjdG9yOlwiLCB7XG4gICAgdHlwZTogbG9nRGF0YS50eXBlLFxuICAgIHRpbWVzdGFtcDogbG9nRGF0YS50aW1lc3RhbXAsXG4gIH0pO1xuXG4gIC8vIFByb2Nlc3MgYW55IHN0cmluZyBmaWVsZHMgdGhhdCBtaWdodCBjb250YWluIEpTT05cbiAgY29uc3QgcHJvY2Vzc2VkRGF0YSA9IHsgLi4ubG9nRGF0YSB9O1xuXG4gIGlmIChsb2dEYXRhLnR5cGUgPT09IFwibmV0d29yay1yZXF1ZXN0XCIpIHtcbiAgICBjb25zb2xlLmxvZyhcIlByb2Nlc3NpbmcgbmV0d29yayByZXF1ZXN0XCIpO1xuICAgIGlmIChwcm9jZXNzZWREYXRhLnJlcXVlc3RCb2R5KSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJSZXF1ZXN0IGJvZHkgc2l6ZSBiZWZvcmU6XCIsXG4gICAgICAgIHByb2Nlc3NlZERhdGEucmVxdWVzdEJvZHkubGVuZ3RoXG4gICAgICApO1xuICAgICAgcHJvY2Vzc2VkRGF0YS5yZXF1ZXN0Qm9keSA9IHByb2Nlc3NKc29uU3RyaW5nKFxuICAgICAgICBwcm9jZXNzZWREYXRhLnJlcXVlc3RCb2R5LFxuICAgICAgICBkZXZ0b29sc1NldHRpbmdzLnN0cmluZ1NpemVMaW1pdFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiUmVxdWVzdCBib2R5IHNpemUgYWZ0ZXI6XCIsIHByb2Nlc3NlZERhdGEucmVxdWVzdEJvZHkubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3NlZERhdGEucmVzcG9uc2VCb2R5KSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJSZXNwb25zZSBib2R5IHNpemUgYmVmb3JlOlwiLFxuICAgICAgICBwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keS5sZW5ndGhcbiAgICAgICk7XG4gICAgICBwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keSA9IHByb2Nlc3NKc29uU3RyaW5nKFxuICAgICAgICBwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keSxcbiAgICAgICAgZGV2dG9vbHNTZXR0aW5ncy5zdHJpbmdTaXplTGltaXRcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJSZXNwb25zZSBib2R5IHNpemUgYWZ0ZXI6XCIsXG4gICAgICAgIHByb2Nlc3NlZERhdGEucmVzcG9uc2VCb2R5Lmxlbmd0aFxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXG4gICAgbG9nRGF0YS50eXBlID09PSBcImNvbnNvbGUtbG9nXCIgfHxcbiAgICBsb2dEYXRhLnR5cGUgPT09IFwiY29uc29sZS1lcnJvclwiXG4gICkge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBjb25zb2xlIG1lc3NhZ2VcIik7XG4gICAgaWYgKHByb2Nlc3NlZERhdGEubWVzc2FnZSkge1xuICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIHNpemUgYmVmb3JlOlwiLCBwcm9jZXNzZWREYXRhLm1lc3NhZ2UubGVuZ3RoKTtcbiAgICAgIHByb2Nlc3NlZERhdGEubWVzc2FnZSA9IHByb2Nlc3NKc29uU3RyaW5nKFxuICAgICAgICBwcm9jZXNzZWREYXRhLm1lc3NhZ2UsXG4gICAgICAgIGRldnRvb2xzU2V0dGluZ3Muc3RyaW5nU2l6ZUxpbWl0XG4gICAgICApO1xuICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIHNpemUgYWZ0ZXI6XCIsIHByb2Nlc3NlZERhdGEubWVzc2FnZS5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBzZXR0aW5ncyB0byB0aGUgcmVxdWVzdFxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIGRhdGE6IHtcbiAgICAgIC4uLnByb2Nlc3NlZERhdGEsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfSxcbiAgICBzZXR0aW5nczoge1xuICAgICAgbG9nTGltaXQ6IGRldnRvb2xzU2V0dGluZ3MubG9nTGltaXQsXG4gICAgICBxdWVyeUxpbWl0OiBkZXZ0b29sc1NldHRpbmdzLnF1ZXJ5TGltaXQsXG4gICAgICBzaG93UmVxdWVzdEhlYWRlcnM6IGRldnRvb2xzU2V0dGluZ3Muc2hvd1JlcXVlc3RIZWFkZXJzLFxuICAgICAgc2hvd1Jlc3BvbnNlSGVhZGVyczogZGV2dG9vbHNTZXR0aW5ncy5zaG93UmVzcG9uc2VIZWFkZXJzLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgZmluYWxQYXlsb2FkU2l6ZSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLmxlbmd0aDtcbiAgY29uc29sZS5sb2coXCJGaW5hbCBwYXlsb2FkIHNpemU6XCIsIGZpbmFsUGF5bG9hZFNpemUpO1xuXG4gIGlmIChmaW5hbFBheWxvYWRTaXplID4gMTAwMDAwMCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IExhcmdlIHBheWxvYWQgZGV0ZWN0ZWQ6XCIsIGZpbmFsUGF5bG9hZFNpemUpO1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiUGF5bG9hZCBwcmV2aWV3OlwiLFxuICAgICAgSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkuc3Vic3RyaW5nKDAsIDEwMDApICsgXCIuLi5cIlxuICAgICk7XG4gIH1cblxuICBjb25zdCBzZXJ2ZXJVcmwgPSBgaHR0cDovLyR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0fToke2RldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydH0vZXh0ZW5zaW9uLWxvZ2A7XG4gIGNvbnNvbGUubG9nKGBTZW5kaW5nIGxvZyB0byAke3NlcnZlclVybH1gKTtcblxuICBmZXRjaChzZXJ2ZXJVcmwsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkxvZyBzZW50IHN1Y2Nlc3NmdWxseTpcIiwgZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2VuZGluZyBsb2c6XCIsIGVycm9yKTtcbiAgICB9KTtcbn1cblxuLy8gVmFsaWRhdGUgc2VydmVyIGlkZW50aXR5XG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVNlcnZlcklkZW50aXR5KCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFZhbGlkYXRpbmcgc2VydmVyIGlkZW50aXR5IGF0IGh0dHA6Ly8ke2RldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdH06JHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnR9Ly5pZGVudGl0eS4uLmBcbiAgICApO1xuXG4gICAgLy8gVXNlIGZldGNoIHdpdGggYSB0aW1lb3V0IHRvIHByZXZlbnQgbG9uZy1oYW5naW5nIHJlcXVlc3RzXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgNTAwMCk7IC8vIEluY3JlYXNlZCB0aW1lb3V0IHRvIDUgc2Vjb25kc1xuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cDovLyR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0fToke2RldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydH0vLmlkZW50aXR5YCxcbiAgICAgICAge1xuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFNlcnZlciBpZGVudGl0eSB2YWxpZGF0aW9uIGZhaWxlZDogSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30gLSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgY29ubmVjdGlvbiBmYWlsdXJlXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiBcIlNFUlZFUl9WQUxJREFUSU9OX0ZBSUxFRFwiLFxuICAgICAgICAgIHJlYXNvbjogXCJodHRwX2Vycm9yXCIsXG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgICBzZXJ2ZXJIb3N0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICAgICAgc2VydmVyUG9ydDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coXCJTZXJ2ZXIgaWRlbnRpdHkgcmVzcG9uc2U6XCIsIGlkZW50aXR5KTtcblxuICAgICAgLy8gVmFsaWRhdGUgc2lnbmF0dXJlXG4gICAgICBpZiAoaWRlbnRpdHkuc2lnbmF0dXJlICE9PSBcIm1jcC1icm93c2VyLWNvbm5lY3Rvci0yNHg3XCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlNlcnZlciBpZGVudGl0eSB2YWxpZGF0aW9uIGZhaWxlZDogSW52YWxpZCBzaWduYXR1cmVcIiwgaWRlbnRpdHkpO1xuXG4gICAgICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgaW52YWxpZCBzaWduYXR1cmVcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6IFwiU0VSVkVSX1ZBTElEQVRJT05fRkFJTEVEXCIsXG4gICAgICAgICAgcmVhc29uOiBcImludmFsaWRfc2lnbmF0dXJlXCIsXG4gICAgICAgICAgcmVjZWl2ZWRTaWduYXR1cmU6IGlkZW50aXR5LnNpZ25hdHVyZSxcbiAgICAgICAgICBzZXJ2ZXJIb3N0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICAgICAgc2VydmVyUG9ydDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgU2VydmVyIGlkZW50aXR5IGNvbmZpcm1lZDogJHtpZGVudGl0eS5uYW1lfSB2JHtpZGVudGl0eS52ZXJzaW9ufWBcbiAgICAgICk7XG5cbiAgICAgIC8vIE5vdGlmeSBhYm91dCBzdWNjZXNzZnVsIHZhbGlkYXRpb25cbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogXCJTRVJWRVJfVkFMSURBVElPTl9TVUNDRVNTXCIsXG4gICAgICAgIHNlcnZlckluZm86IGlkZW50aXR5LFxuICAgICAgICBzZXJ2ZXJIb3N0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICAgIHNlcnZlclBvcnQ6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydCxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChmZXRjaEVycm9yKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIHRocm93IGZldGNoRXJyb3I7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTZXJ2ZXIgaWRlbnRpdHkgdmFsaWRhdGlvbiBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gY29ubmVjdCB0byBodHRwOi8vJHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3R9OiR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0fS8uaWRlbnRpdHlgKTtcblxuICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgY29ubmVjdGlvbiBlcnJvclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwiU0VSVkVSX1ZBTElEQVRJT05fRkFJTEVEXCIsXG4gICAgICByZWFzb246IFwiY29ubmVjdGlvbl9lcnJvclwiLFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UsXG4gICAgICBzZXJ2ZXJIb3N0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnQsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRnVuY3Rpb24gdG8gY2xlYXIgbG9ncyBvbiB0aGUgc2VydmVyXG5mdW5jdGlvbiB3aXBlTG9ncygpIHtcbiAgY29uc29sZS5sb2coXCJXaXBpbmcgYWxsIGxvZ3MuLi5cIik7XG5cbiAgY29uc3Qgc2VydmVyVXJsID0gYGh0dHA6Ly8ke2RldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdH06JHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnR9L3dpcGVsb2dzYDtcbiAgY29uc29sZS5sb2coYFNlbmRpbmcgd2lwZSByZXF1ZXN0IHRvICR7c2VydmVyVXJsfWApO1xuXG4gIGZldGNoKHNlcnZlclVybCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IgJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9ncyB3aXBlZCBzdWNjZXNzZnVsbHk6XCIsIGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHdpcGluZyBsb2dzOlwiLCBlcnJvcik7XG4gICAgfSk7XG59XG5cbi8vIExpc3RlbiBmb3IgcGFnZSByZWZyZXNoZXNcbmNocm9tZS5kZXZ0b29scy5uZXR3b3JrLm9uTmF2aWdhdGVkLmFkZExpc3RlbmVyKCh1cmwpID0+IHtcbiAgY29uc29sZS5sb2coXCJQYWdlIG5hdmlnYXRlZC9yZWZyZXNoZWQgLSB3aXBpbmcgbG9nc1wiKTtcbiAgd2lwZUxvZ3MoKTtcblxuICAvLyBTZW5kIHRoZSBuZXcgVVJMIHRvIHRoZSBzZXJ2ZXJcbiAgaWYgKHdzICYmIHdzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOICYmIHVybCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBTZW5kaW5nIHBhZ2UtbmF2aWdhdGVkIGV2ZW50IHdpdGggVVJMOlwiLFxuICAgICAgdXJsXG4gICAgKTtcbiAgICB3cy5zZW5kKFxuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0eXBlOiBcInBhZ2UtbmF2aWdhdGVkXCIsXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG59KTtcblxuLy8gMSkgTGlzdGVuIGZvciBuZXR3b3JrIHJlcXVlc3RzXG5jaHJvbWUuZGV2dG9vbHMubmV0d29yay5vblJlcXVlc3RGaW5pc2hlZC5hZGRMaXN0ZW5lcigocmVxdWVzdCkgPT4ge1xuICBpZiAocmVxdWVzdC5fcmVzb3VyY2VUeXBlID09PSBcInhoclwiIHx8IHJlcXVlc3QuX3Jlc291cmNlVHlwZSA9PT0gXCJmZXRjaFwiKSB7XG4gICAgcmVxdWVzdC5nZXRDb250ZW50KChyZXNwb25zZUJvZHkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgICB0eXBlOiBcIm5ldHdvcmstcmVxdWVzdFwiLFxuICAgICAgICB1cmw6IHJlcXVlc3QucmVxdWVzdC51cmwsXG4gICAgICAgIG1ldGhvZDogcmVxdWVzdC5yZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgcmVxdWVzdEhlYWRlcnM6IHJlcXVlc3QucmVxdWVzdC5oZWFkZXJzLFxuICAgICAgICByZXNwb25zZUhlYWRlcnM6IHJlcXVlc3QucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHJlcXVlc3QucmVxdWVzdC5wb3N0RGF0YT8udGV4dCA/PyBcIlwiLFxuICAgICAgICByZXNwb25zZUJvZHk6IHJlc3BvbnNlQm9keSA/PyBcIlwiLFxuICAgICAgfTtcbiAgICAgIHNlbmRUb0Jyb3dzZXJDb25uZWN0b3IoZW50cnkpO1xuICAgIH0pO1xuICB9XG59KTtcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGF0dGFjaCBkZWJ1Z2dlclxuYXN5bmMgZnVuY3Rpb24gYXR0YWNoRGVidWdnZXIoKSB7XG4gIC8vIEZpcnN0IGNoZWNrIGlmIHdlJ3JlIGFscmVhZHkgYXR0YWNoZWQgdG8gdGhpcyB0YWJcbiAgY2hyb21lLmRlYnVnZ2VyLmdldFRhcmdldHMoKHRhcmdldHMpID0+IHtcbiAgICBjb25zdCBpc0FscmVhZHlBdHRhY2hlZCA9IHRhcmdldHMuc29tZShcbiAgICAgICh0YXJnZXQpID0+IHRhcmdldC50YWJJZCA9PT0gY3VycmVudFRhYklkICYmIHRhcmdldC5hdHRhY2hlZFxuICAgICk7XG5cbiAgICBpZiAoaXNBbHJlYWR5QXR0YWNoZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgZXhpc3RpbmcgZGVidWdnZXIgYXR0YWNobWVudCwgZGV0YWNoaW5nIGZpcnN0Li4uXCIpO1xuICAgICAgLy8gRm9yY2UgZGV0YWNoIGZpcnN0IHRvIGVuc3VyZSBjbGVhbiBzdGF0ZVxuICAgICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiBjdXJyZW50VGFiSWQgfSwgKCkgPT4ge1xuICAgICAgICAvLyBJZ25vcmUgYW55IGVycm9ycyBkdXJpbmcgZGV0YWNoXG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmb3JjZWQgZGV0YWNoOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdyBwcm9jZWVkIHdpdGggZnJlc2ggYXR0YWNobWVudFxuICAgICAgICBwZXJmb3JtQXR0YWNoKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gZXhpc3RpbmcgYXR0YWNobWVudCwgcHJvY2VlZCBkaXJlY3RseVxuICAgICAgcGVyZm9ybUF0dGFjaCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1BdHRhY2goKSB7XG4gIGNvbnNvbGUubG9nKFwiUGVyZm9ybWluZyBkZWJ1Z2dlciBhdHRhY2htZW50IHRvIHRhYjpcIiwgY3VycmVudFRhYklkKTtcbiAgY2hyb21lLmRlYnVnZ2VyLmF0dGFjaCh7IHRhYklkOiBjdXJyZW50VGFiSWQgfSwgXCIxLjNcIiwgKCkgPT4ge1xuICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gYXR0YWNoIGRlYnVnZ2VyOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xuICAgICAgaXNEZWJ1Z2dlckF0dGFjaGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaXNEZWJ1Z2dlckF0dGFjaGVkID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyhcIkRlYnVnZ2VyIHN1Y2Nlc3NmdWxseSBhdHRhY2hlZFwiKTtcblxuICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgd2hlbiBhdHRhY2hpbmdcbiAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcihjb25zb2xlTWVzc2FnZUxpc3RlbmVyKTtcblxuICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZChcbiAgICAgIHsgdGFiSWQ6IGN1cnJlbnRUYWJJZCB9LFxuICAgICAgXCJSdW50aW1lLmVuYWJsZVwiLFxuICAgICAge30sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGVuYWJsZSBydW50aW1lOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIlJ1bnRpbWUgQVBJIHN1Y2Nlc3NmdWxseSBlbmFibGVkXCIpO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZGV0YWNoIGRlYnVnZ2VyXG5mdW5jdGlvbiBkZXRhY2hEZWJ1Z2dlcigpIHtcbiAgLy8gUmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciBmaXJzdFxuICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5yZW1vdmVMaXN0ZW5lcihjb25zb2xlTWVzc2FnZUxpc3RlbmVyKTtcblxuICAvLyBDaGVjayBpZiBkZWJ1Z2dlciBpcyBhY3R1YWxseSBhdHRhY2hlZCBiZWZvcmUgdHJ5aW5nIHRvIGRldGFjaFxuICBjaHJvbWUuZGVidWdnZXIuZ2V0VGFyZ2V0cygodGFyZ2V0cykgPT4ge1xuICAgIGNvbnN0IGlzU3RpbGxBdHRhY2hlZCA9IHRhcmdldHMuc29tZShcbiAgICAgICh0YXJnZXQpID0+IHRhcmdldC50YWJJZCA9PT0gY3VycmVudFRhYklkICYmIHRhcmdldC5hdHRhY2hlZFxuICAgICk7XG5cbiAgICBpZiAoIWlzU3RpbGxBdHRhY2hlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJEZWJ1Z2dlciBhbHJlYWR5IGRldGFjaGVkXCIpO1xuICAgICAgaXNEZWJ1Z2dlckF0dGFjaGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiBjdXJyZW50VGFiSWQgfSwgKCkgPT4ge1xuICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJXYXJuaW5nIGR1cmluZyBkZWJ1Z2dlciBkZXRhY2g6XCIsXG4gICAgICAgICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpc0RlYnVnZ2VyQXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnZXIgZGV0YWNoZWRcIik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBNb3ZlIHRoZSBjb25zb2xlIG1lc3NhZ2UgbGlzdGVuZXIgb3V0c2lkZSB0aGUgcGFuZWwgY3JlYXRpb25cbmNvbnN0IGNvbnNvbGVNZXNzYWdlTGlzdGVuZXIgPSAoc291cmNlLCBtZXRob2QsIHBhcmFtcykgPT4ge1xuICAvLyBPbmx5IHByb2Nlc3MgZXZlbnRzIGZvciBvdXIgdGFiXG4gIGlmIChzb3VyY2UudGFiSWQgIT09IGN1cnJlbnRUYWJJZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChtZXRob2QgPT09IFwiUnVudGltZS5leGNlcHRpb25UaHJvd25cIikge1xuICAgIGNvbnN0IGVudHJ5ID0ge1xuICAgICAgdHlwZTogXCJjb25zb2xlLWVycm9yXCIsXG4gICAgICBtZXNzYWdlOlxuICAgICAgICBwYXJhbXMuZXhjZXB0aW9uRGV0YWlscy5leGNlcHRpb24/LmRlc2NyaXB0aW9uIHx8XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHBhcmFtcy5leGNlcHRpb25EZXRhaWxzKSxcbiAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfTtcbiAgICBzZW5kVG9Ccm93c2VyQ29ubmVjdG9yKGVudHJ5KTtcbiAgfVxuXG4gIGlmIChtZXRob2QgPT09IFwiUnVudGltZS5jb25zb2xlQVBJQ2FsbGVkXCIpIHtcbiAgICAvLyBQcm9jZXNzIGFsbCBhcmd1bWVudHMgZnJvbSB0aGUgY29uc29sZSBjYWxsXG4gICAgbGV0IGZvcm1hdHRlZE1lc3NhZ2UgPSBcIlwiO1xuICAgIGNvbnN0IGFyZ3MgPSBwYXJhbXMuYXJncyB8fCBbXTtcblxuICAgIC8vIEV4dHJhY3QgYWxsIGFyZ3VtZW50cyBhbmQgY29tYmluZSB0aGVtXG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gVHJ5IHRvIGJ1aWxkIGEgbWVhbmluZ2Z1bCByZXByZXNlbnRhdGlvbiBvZiBhbGwgYXJndW1lbnRzXG4gICAgICB0cnkge1xuICAgICAgICBmb3JtYXR0ZWRNZXNzYWdlID0gYXJnc1xuICAgICAgICAgIC5tYXAoKGFyZykgPT4ge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGRpZmZlcmVudCB0eXBlcyBvZiBhcmd1bWVudHNcbiAgICAgICAgICAgIGlmIChhcmcudHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICByZXR1cm4gYXJnLnZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcudHlwZSA9PT0gXCJvYmplY3RcIiAmJiBhcmcucHJldmlldykge1xuICAgICAgICAgICAgICAvLyBGb3Igb2JqZWN0cywgaW5jbHVkZSB0aGVpciBwcmV2aWV3IG9yIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmcucHJldmlldyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZy5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAvLyBTb21lIG9iamVjdHMgaGF2ZSBkZXNjcmlwdGlvbnNcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEZhbGxiYWNrIGZvciBvdGhlciB0eXBlc1xuICAgICAgICAgICAgICByZXR1cm4gYXJnLnZhbHVlIHx8IGFyZy5kZXNjcmlwdGlvbiB8fCBKU09OLnN0cmluZ2lmeShhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBGYWxsYmFjayBpZiBwcm9jZXNzaW5nIGZhaWxzXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcHJvY2VzcyBjb25zb2xlIGFyZ3VtZW50czpcIiwgZSk7XG4gICAgICAgIGZvcm1hdHRlZE1lc3NhZ2UgPVxuICAgICAgICAgIGFyZ3NbMF0/LnZhbHVlIHx8IFwiVW5hYmxlIHRvIHByb2Nlc3MgY29uc29sZSBhcmd1bWVudHNcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IHtcbiAgICAgIHR5cGU6IHBhcmFtcy50eXBlID09PSBcImVycm9yXCIgPyBcImNvbnNvbGUtZXJyb3JcIiA6IFwiY29uc29sZS1sb2dcIixcbiAgICAgIGxldmVsOiBwYXJhbXMudHlwZSxcbiAgICAgIG1lc3NhZ2U6IGZvcm1hdHRlZE1lc3NhZ2UsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfTtcbiAgICBzZW5kVG9Ccm93c2VyQ29ubmVjdG9yKGVudHJ5KTtcbiAgfVxufTtcblxuLy8gMikgVXNlIERldlRvb2xzIFByb3RvY29sIHRvIGNhcHR1cmUgY29uc29sZSBsb2dzXG5jaHJvbWUuZGV2dG9vbHMucGFuZWxzLmNyZWF0ZShcIkJyb3dzZXJUb29sc01DUFwiLCBcIlwiLCBcInBhbmVsLmh0bWxcIiwgKHBhbmVsKSA9PiB7XG4gIC8vIEluaXRpYWwgYXR0YWNoIC0gd2UnbGwga2VlcCB0aGUgZGVidWdnZXIgYXR0YWNoZWQgYXMgbG9uZyBhcyBEZXZUb29scyBpcyBvcGVuXG4gIGF0dGFjaERlYnVnZ2VyKCk7XG5cbiAgLy8gSGFuZGxlIHBhbmVsIHNob3dpbmdcbiAgcGFuZWwub25TaG93bi5hZGRMaXN0ZW5lcigocGFuZWxXaW5kb3cpID0+IHtcbiAgICBpZiAoIWlzRGVidWdnZXJBdHRhY2hlZCkge1xuICAgICAgYXR0YWNoRGVidWdnZXIoKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIENsZWFuIHVwIHdoZW4gRGV2VG9vbHMgY2xvc2VzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLCAoKSA9PiB7XG4gIC8vIERldGFjaCBkZWJ1Z2dlclxuICBkZXRhY2hEZWJ1Z2dlcigpO1xuXG4gIC8vIFNldCBpbnRlbnRpb25hbCBjbG9zdXJlIGZsYWcgYmVmb3JlIGNsb3NpbmdcbiAgaW50ZW50aW9uYWxDbG9zdXJlID0gdHJ1ZTtcblxuICBpZiAod3MpIHtcbiAgICB0cnkge1xuICAgICAgd3MuY2xvc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2xvc2luZyBXZWJTb2NrZXQgZHVyaW5nIHVubG9hZDpcIiwgZSk7XG4gICAgfVxuICAgIHdzID0gbnVsbDtcbiAgfVxuXG4gIGlmICh3c1JlY29ubmVjdFRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQod3NSZWNvbm5lY3RUaW1lb3V0KTtcbiAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRJbnRlcnZhbCk7XG4gICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSBudWxsO1xuICB9XG59KTtcblxuLy8gRnVuY3Rpb24gdG8gY2FwdHVyZSBhbmQgc2VuZCBlbGVtZW50IGRhdGFcbmZ1bmN0aW9uIGNhcHR1cmVBbmRTZW5kRWxlbWVudCgpIHtcbiAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKFxuICAgIGAoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBlbCA9ICQwOyAgLy8gJDAgaXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IGluIERldlRvb2xzXG4gICAgICBpZiAoIWVsKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YWdOYW1lOiBlbC50YWdOYW1lLFxuICAgICAgICBpZDogZWwuaWQsXG4gICAgICAgIGNsYXNzTmFtZTogZWwuY2xhc3NOYW1lLFxuICAgICAgICB0ZXh0Q29udGVudDogZWwudGV4dENvbnRlbnQ/LnN1YnN0cmluZygwLCAxMDApLFxuICAgICAgICBhdHRyaWJ1dGVzOiBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLm1hcChhdHRyID0+ICh7XG4gICAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICAgIHZhbHVlOiBhdHRyLnZhbHVlXG4gICAgICAgIH0pKSxcbiAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgICBsZWZ0OiByZWN0LmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgaW5uZXJIVE1MOiBlbC5pbm5lckhUTUwuc3Vic3RyaW5nKDAsIDUwMClcbiAgICAgIH07XG4gICAgfSkoKWAsXG4gICAgKHJlc3VsdCwgaXNFeGNlcHRpb24pID0+IHtcbiAgICAgIGlmIChpc0V4Y2VwdGlvbiB8fCAhcmVzdWx0KSByZXR1cm47XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiRWxlbWVudCBzZWxlY3RlZDpcIiwgcmVzdWx0KTtcblxuICAgICAgLy8gU2VuZCB0byBicm93c2VyIGNvbm5lY3RvclxuICAgICAgc2VuZFRvQnJvd3NlckNvbm5lY3Rvcih7XG4gICAgICAgIHR5cGU6IFwic2VsZWN0ZWQtZWxlbWVudFwiLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIGVsZW1lbnQ6IHJlc3VsdCxcbiAgICAgIH0pO1xuICAgIH1cbiAgKTtcbn1cblxuLy8gTGlzdGVuIGZvciBlbGVtZW50IHNlbGVjdGlvbiBpbiB0aGUgRWxlbWVudHMgcGFuZWxcbmNocm9tZS5kZXZ0b29scy5wYW5lbHMuZWxlbWVudHMub25TZWxlY3Rpb25DaGFuZ2VkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY2FwdHVyZUFuZFNlbmRFbGVtZW50KCk7XG59KTtcblxuLy8gV2ViU29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlbWVudFxubGV0IHdzID0gbnVsbDtcbmxldCB3c1JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xubGV0IGhlYXJ0YmVhdEludGVydmFsID0gbnVsbDtcbmNvbnN0IFdTX1JFQ09OTkVDVF9ERUxBWSA9IDUwMDA7IC8vIDUgc2Vjb25kc1xuY29uc3QgSEVBUlRCRUFUX0lOVEVSVkFMID0gMzAwMDA7IC8vIDMwIHNlY29uZHNcbmNvbnN0IFdTX0NPTk5FQ1RJT05fVElNRU9VVCA9IDEwMDAwOyAvLyAxMCBzZWNvbmRzXG4vLyBBZGQgYSBmbGFnIHRvIHRyYWNrIGlmIHdlIG5lZWQgdG8gcmVjb25uZWN0IGFmdGVyIGlkZW50aXR5IHZhbGlkYXRpb25cbmxldCByZWNvbm5lY3RBZnRlclZhbGlkYXRpb24gPSBmYWxzZTtcbi8vIFRyYWNrIGlmIHdlJ3JlIGludGVudGlvbmFsbHkgY2xvc2luZyB0aGUgY29ubmVjdGlvblxubGV0IGludGVudGlvbmFsQ2xvc3VyZSA9IGZhbHNlO1xuXG4vLyBGdW5jdGlvbiB0byBzZW5kIGEgaGVhcnRiZWF0IHRvIGtlZXAgdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uIGFsaXZlXG5mdW5jdGlvbiBzZW5kSGVhcnRiZWF0KCkge1xuICBpZiAod3MgJiYgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFNlbmRpbmcgV2ViU29ja2V0IGhlYXJ0YmVhdFwiKTtcbiAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJoZWFydGJlYXRcIiB9KSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBXZWJTb2NrZXQoKSB7XG4gIC8vIENsZWFyIGFueSBwZW5kaW5nIHRpbWVvdXRzXG4gIGlmICh3c1JlY29ubmVjdFRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQod3NSZWNvbm5lY3RUaW1lb3V0KTtcbiAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuICB9XG5cbiAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRJbnRlcnZhbCk7XG4gICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSBudWxsO1xuICB9XG5cbiAgLy8gQ2xvc2UgZXhpc3RpbmcgV2ViU29ja2V0IGlmIGFueVxuICBpZiAod3MpIHtcbiAgICAvLyBTZXQgZmxhZyB0byBpbmRpY2F0ZSB0aGlzIGlzIGFuIGludGVudGlvbmFsIGNsb3N1cmVcbiAgICBpbnRlbnRpb25hbENsb3N1cmUgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICB3cy5jbG9zZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjbG9zaW5nIGV4aXN0aW5nIFdlYlNvY2tldDpcIiwgZSk7XG4gICAgfVxuICAgIHdzID0gbnVsbDtcbiAgICBpbnRlbnRpb25hbENsb3N1cmUgPSBmYWxzZTsgLy8gUmVzZXQgZmxhZ1xuICB9XG5cbiAgLy8gVmFsaWRhdGUgc2VydmVyIGlkZW50aXR5IGJlZm9yZSBjb25uZWN0aW5nXG4gIGNvbnNvbGUubG9nKFwiVmFsaWRhdGluZyBzZXJ2ZXIgaWRlbnRpdHkgYmVmb3JlIFdlYlNvY2tldCBjb25uZWN0aW9uLi4uXCIpO1xuICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eSgpO1xuXG4gIGlmICghaXNWYWxpZCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIkNhbm5vdCBlc3RhYmxpc2ggV2ViU29ja2V0OiBOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXJcIlxuICAgICk7XG4gICAgLy8gU2V0IGZsYWcgdG8gaW5kaWNhdGUgd2UgbmVlZCB0byByZWNvbm5lY3QgYWZ0ZXIgYSBwYWdlIHJlZnJlc2ggY2hlY2tcbiAgICByZWNvbm5lY3RBZnRlclZhbGlkYXRpb24gPSB0cnVlO1xuXG4gICAgLy8gVHJ5IGFnYWluIGFmdGVyIGRlbGF5XG4gICAgd3NSZWNvbm5lY3RUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkF0dGVtcHRpbmcgdG8gcmVjb25uZWN0IFdlYlNvY2tldCBhZnRlciB2YWxpZGF0aW9uIGZhaWx1cmVcIik7XG4gICAgICBzZXR1cFdlYlNvY2tldCgpO1xuICAgIH0sIFdTX1JFQ09OTkVDVF9ERUxBWSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVzZXQgcmVjb25uZWN0IGZsYWcgc2luY2UgdmFsaWRhdGlvbiBzdWNjZWVkZWRcbiAgcmVjb25uZWN0QWZ0ZXJWYWxpZGF0aW9uID0gZmFsc2U7XG5cbiAgY29uc3Qgd3NVcmwgPSBgd3M6Ly8ke2RldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdH06JHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnR9L2V4dGVuc2lvbi13c2A7XG4gIGNvbnNvbGUubG9nKGBDb25uZWN0aW5nIHRvIFdlYlNvY2tldCBhdCAke3dzVXJsfWApO1xuXG4gIHRyeSB7XG4gICAgd3MgPSBuZXcgV2ViU29ja2V0KHdzVXJsKTtcbiAgICBcbiAgICAvLyBTZXQgYSBjb25uZWN0aW9uIHRpbWVvdXRcbiAgICBjb25zdCBjb25uZWN0aW9uVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAod3MgJiYgd3MucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2ViU29ja2V0IGNvbm5lY3Rpb24gdGltZW91dCBhZnRlciAke1dTX0NPTk5FQ1RJT05fVElNRU9VVH1tc2ApO1xuICAgICAgICAvLyBGb3JjZSBjbG9zZSBhbmQgdHJpZ2dlciByZWNvbm5lY3RcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3cy5jbG9zZSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNsb3NpbmcgdGltZWQgb3V0IFdlYlNvY2tldDpcIiwgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBXU19DT05ORUNUSU9OX1RJTUVPVVQpO1xuXG4gICAgd3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgLy8gQ2xlYXIgdGhlIGNvbm5lY3Rpb24gdGltZW91dFxuICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0SWQpO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhgQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IGNvbm5lY3RlZCB0byAke3dzVXJsfWApO1xuXG4gICAgICAvLyBTdGFydCBoZWFydGJlYXQgdG8ga2VlcCBjb25uZWN0aW9uIGFsaXZlXG4gICAgICBoZWFydGJlYXRJbnRlcnZhbCA9IHNldEludGVydmFsKHNlbmRIZWFydGJlYXQsIEhFQVJUQkVBVF9JTlRFUlZBTCk7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGF0IGNvbm5lY3Rpb24gaXMgc3VjY2Vzc2Z1bFxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICB0eXBlOiBcIldFQlNPQ0tFVF9DT05ORUNURURcIixcbiAgICAgICAgc2VydmVySG9zdDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnQsXG4gICAgICB9KTtcblxuICAgICAgLy8gU2VuZCB0aGUgY3VycmVudCBVUkwgdG8gdGhlIHNlcnZlciByaWdodCBhZnRlciBjb25uZWN0aW9uXG4gICAgICAvLyBUaGlzIGVuc3VyZXMgdGhlIHNlcnZlciBoYXMgdGhlIFVSTCBldmVuIGlmIG5vIG5hdmlnYXRpb24gb2NjdXJzXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiR0VUX0NVUlJFTlRfVVJMXCIsXG4gICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgIH0sXG4gICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogRXJyb3IgZ2V0dGluZyBVUkwgZnJvbSBiYWNrZ3JvdW5kIG9uIGNvbm5lY3Rpb246XCIsXG4gICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gSWYgbm9ybWFsIG1ldGhvZCBmYWlscywgdHJ5IGZhbGxiYWNrIHRvIGNocm9tZS50YWJzIEFQSSBkaXJlY3RseVxuICAgICAgICAgICAgdHJ5RmFsbGJhY2tHZXRVcmwoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UudXJsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBHb3QgVVJMIGZyb20gYmFja2dyb3VuZDpcIixcbiAgICAgICAgICAgICAgcmVzcG9uc2UudXJsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd3Muc2VuZChcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmxcIixcbiAgICAgICAgICAgICAgICB1cmw6IHJlc3BvbnNlLnVybCxcbiAgICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiByZXNwb25zZSBleGlzdHMgYnV0IG5vIFVSTCwgdHJ5IGZhbGxiYWNrXG4gICAgICAgICAgICB0cnlGYWxsYmFja0dldFVybCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgLy8gRmFsbGJhY2sgbWV0aG9kIHRvIGdldCBVUkwgZGlyZWN0bHlcbiAgICAgIGZ1bmN0aW9uIHRyeUZhbGxiYWNrR2V0VXJsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFRyeWluZyBmYWxsYmFjayBtZXRob2QgdG8gZ2V0IFVSTFwiKTtcblxuICAgICAgICAvLyBUcnkgdG8gZ2V0IHRoZSBVUkwgZGlyZWN0bHkgdXNpbmcgdGhlIHRhYnMgQVBJXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBGYWxsYmFjayBVUkwgcmV0cmlldmFsIGZhaWxlZDpcIixcbiAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHVybCA9IHRhYnMgJiYgdGFic1swXSAmJiB0YWJzWzBdLnVybDtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IEdvdCBVUkwgZGlyZWN0bHkgZnJvbSB0YWI6XCIsIHVybCk7XG5cbiAgICAgICAgICBpZiAod3MgJiYgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIHdzLnNlbmQoXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImN1cnJlbnQtdXJsXCIsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IG5vdCBvcGVuIHRvIHNlbmQgVVJMXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdzLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgIC8vIENsZWFyIHRoZSBjb25uZWN0aW9uIHRpbWVvdXRcbiAgICAgIGNsZWFyVGltZW91dChjb25uZWN0aW9uVGltZW91dElkKTtcbiAgICAgIFxuICAgICAgY29uc29sZS5lcnJvcihgQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IGVycm9yIGZvciAke3dzVXJsfTpgLCBlcnJvcik7XG4gICAgICBcbiAgICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgV2ViU29ja2V0IGVycm9yXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6IFwiV0VCU09DS0VUX0VSUk9SXCIsXG4gICAgICAgIGVycm9yOiBcIkNvbm5lY3Rpb24gZXJyb3JcIixcbiAgICAgICAgc2VydmVySG9zdDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgd3Mub25jbG9zZSA9IChldmVudCkgPT4ge1xuICAgICAgLy8gQ2xlYXIgdGhlIGNvbm5lY3Rpb24gdGltZW91dFxuICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0SWQpO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhgQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IGNsb3NlZCBmb3IgJHt3c1VybH06YCwgZXZlbnQpO1xuXG4gICAgICAvLyBTdG9wIGhlYXJ0YmVhdFxuICAgICAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaGVhcnRiZWF0SW50ZXJ2YWwpO1xuICAgICAgICBoZWFydGJlYXRJbnRlcnZhbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IHJlY29ubmVjdCBpZiB0aGlzIHdhcyBhbiBpbnRlbnRpb25hbCBjbG9zdXJlXG4gICAgICBpZiAoaW50ZW50aW9uYWxDbG9zdXJlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogSW50ZW50aW9uYWwgV2ViU29ja2V0IGNsb3N1cmUsIG5vdCByZWNvbm5lY3RpbmdcIlxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgYXR0ZW1wdCB0byByZWNvbm5lY3QgaWYgdGhlIGNsb3N1cmUgd2Fzbid0IGludGVudGlvbmFsXG4gICAgICAvLyBDb2RlIDEwMDAgKE5vcm1hbCBDbG9zdXJlKSBhbmQgMTAwMSAoR29pbmcgQXdheSkgYXJlIG5vcm1hbCBjbG9zdXJlc1xuICAgICAgLy8gQ29kZSAxMDA1IG9mdGVuIGhhcHBlbnMgd2l0aCBjbGVhbiBjbG9zdXJlcyBpbiBDaHJvbWVcbiAgICAgIGNvbnN0IGlzQWJub3JtYWxDbG9zdXJlID0gIShldmVudC5jb2RlID09PSAxMDAwIHx8IGV2ZW50LmNvZGUgPT09IDEwMDEpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIHdhcyBhbiBhYm5vcm1hbCBjbG9zdXJlIG9yIGlmIHdlIG5lZWQgdG8gcmVjb25uZWN0IGFmdGVyIHZhbGlkYXRpb25cbiAgICAgIGlmIChpc0Fibm9ybWFsQ2xvc3VyZSB8fCByZWNvbm5lY3RBZnRlclZhbGlkYXRpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYENocm9tZSBFeHRlbnNpb246IFdpbGwgYXR0ZW1wdCB0byByZWNvbm5lY3QgV2ViU29ja2V0IChjbG9zdXJlIGNvZGU6ICR7ZXZlbnQuY29kZX0pYFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgV2ViU29ja2V0IGNsb3N1cmVcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6IFwiV0VCU09DS0VUX0NMT1NFRFwiLFxuICAgICAgICAgIGNvZGU6IGV2ZW50LmNvZGUsXG4gICAgICAgICAgcmVhc29uOiBldmVudC5yZWFzb24sXG4gICAgICAgICAgd2FzQ2xlYW46IGV2ZW50Lndhc0NsZWFuLFxuICAgICAgICAgIHdpbGxSZWNvbm5lY3Q6IHRydWUsXG4gICAgICAgICAgc2VydmVySG9zdDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICAgIHNlcnZlclBvcnQ6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVHJ5IHRvIHJlY29ubmVjdCBhZnRlciBkZWxheVxuICAgICAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBDaHJvbWUgRXh0ZW5zaW9uOiBBdHRlbXB0aW5nIHRvIHJlY29ubmVjdCBXZWJTb2NrZXQgdG8gJHt3c1VybH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXR1cFdlYlNvY2tldCgpO1xuICAgICAgICB9LCBXU19SRUNPTk5FQ1RfREVMQVkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYENocm9tZSBFeHRlbnNpb246IE5vcm1hbCBXZWJTb2NrZXQgY2xvc3VyZSwgbm90IHJlY29ubmVjdGluZyBhdXRvbWF0aWNhbGx5YFxuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgLy8gTm90aWZ5IGFib3V0IHRoZSBXZWJTb2NrZXQgY2xvc3VyZVxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogXCJXRUJTT0NLRVRfQ0xPU0VEXCIsXG4gICAgICAgICAgY29kZTogZXZlbnQuY29kZSxcbiAgICAgICAgICByZWFzb246IGV2ZW50LnJlYXNvbixcbiAgICAgICAgICB3YXNDbGVhbjogZXZlbnQud2FzQ2xlYW4sXG4gICAgICAgICAgd2lsbFJlY29ubmVjdDogZmFsc2UsXG4gICAgICAgICAgc2VydmVySG9zdDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICAgIHNlcnZlclBvcnQ6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdzLm9ubWVzc2FnZSA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cbiAgICAgICAgLy8gRG9uJ3QgbG9nIGhlYXJ0YmVhdCByZXNwb25zZXMgdG8gcmVkdWNlIG5vaXNlXG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgIT09IFwiaGVhcnRiZWF0LXJlc3BvbnNlXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFJlY2VpdmVkIFdlYlNvY2tldCBtZXNzYWdlOlwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBkaWZmZXJlbnQgbWVzc2FnZSB0eXBlc1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBcImhlYXJ0YmVhdC1yZXNwb25zZVwiKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBSZWNlaXZlZCBoZWFydGJlYXQgcmVzcG9uc2VcIik7XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSBcInRha2Utc2NyZWVuc2hvdFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBUYWtpbmcgc2NyZWVuc2hvdC4uLlwiKTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBOb3RpZnkgdGhhdCB3ZSdyZSBwcm9jZXNzaW5nIGEgc2NyZWVuc2hvdCByZXF1ZXN0XG4gICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogXCJTQ1JFRU5TSE9UX1JFUVVFU1RFRFwiLFxuICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBDYXB0dXJlIHNjcmVlbnNob3Qgb2YgdGhlIGN1cnJlbnQgdGFiXG4gICAgICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIobnVsbCwgeyBmb3JtYXQ6IFwicG5nXCIgfSwgKGRhdGFVcmwpID0+IHtcbiAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IFNjcmVlbnNob3QgY2FwdHVyZSBmYWlsZWQ6XCIsXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBTZW5kIGVycm9yIHRvIHNlcnZlciB2aWEgV2ViU29ja2V0XG4gICAgICAgICAgICAgIGlmICh3cyAmJiB3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgICAgIHdzLnNlbmQoXG4gICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2NyZWVuc2hvdC1lcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNocm9tZSBFeHRlbnNpb246IFdlYlNvY2tldCBub3Qgb3BlbiB0byBzZW5kIHNjcmVlbnNob3QgZXJyb3JcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIEFsc28gbm90aWZ5IGJhY2tncm91bmQgc2NyaXB0IGFib3V0IHRoZSBmYWlsdXJlXG4gICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlNDUkVFTlNIT1RfRkFJTEVEXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFNjcmVlbnNob3QgY2FwdHVyZWQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBKdXN0IHNlbmQgdGhlIHNjcmVlbnNob3QgZGF0YSwgbGV0IHRoZSBzZXJ2ZXIgaGFuZGxlIHBhdGhzXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgdHlwZTogXCJzY3JlZW5zaG90LWRhdGFcIixcbiAgICAgICAgICAgICAgZGF0YTogZGF0YVVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgLy8gT25seSBpbmNsdWRlIHBhdGggaWYgaXQncyBjb25maWd1cmVkIGluIHNldHRpbmdzXG4gICAgICAgICAgICAgIC4uLihkZXZ0b29sc1NldHRpbmdzLnNjcmVlbnNob3RQYXRoICYmIHsgcGF0aDogZGV2dG9vbHNTZXR0aW5ncy5zY3JlZW5zaG90UGF0aCB9KSxcbiAgICAgICAgICAgICAgLy8gSW5jbHVkZSBhdXRvLXBhc3RlIHNldHRpbmdcbiAgICAgICAgICAgICAgYXV0b1Bhc3RlOiBkZXZ0b29sc1NldHRpbmdzLmFsbG93QXV0b1Bhc3RlLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBTZW5kaW5nIHNjcmVlbnNob3QgZGF0YSByZXNwb25zZVwiLCB7XG4gICAgICAgICAgICAgIC4uLnJlc3BvbnNlLFxuICAgICAgICAgICAgICBkYXRhOiBcIltiYXNlNjQgZGF0YV1cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBXZWJTb2NrZXQgc3RhdGUgYmVmb3JlIHNlbmRpbmdcbiAgICAgICAgICAgIGlmICh3cyAmJiB3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgYmFja2dyb3VuZCBzY3JpcHQgYWJvdXQgc3VjY2Vzc1xuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiU0NSRUVOU0hPVF9TVUNDRUVERURcIixcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkNocm9tZSBFeHRlbnNpb246IEVycm9yIHNlbmRpbmcgc2NyZWVuc2hvdCBkYXRhOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gTm90aWZ5IGJhY2tncm91bmQgc2NyaXB0IGFib3V0IHRoZSBmYWlsdXJlXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJTQ1JFRU5TSE9UX0ZBSUxFRFwiLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIHNlbmQgc2NyZWVuc2hvdCBkYXRhOiBcIiArIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIGBDaHJvbWUgRXh0ZW5zaW9uOiBXZWJTb2NrZXQgbm90IG9wZW4gdG8gc2VuZCBzY3JlZW5zaG90IGRhdGEgKHN0YXRlOiAke3dzID8gd3MucmVhZHlTdGF0ZSA6IFwibnVsbFwifSlgXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvLyBOb3RpZnkgYmFja2dyb3VuZCBzY3JpcHQgYWJvdXQgdGhlIGZhaWx1cmVcbiAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiU0NSRUVOU0hPVF9GQUlMRURcIixcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJXZWJTb2NrZXQgbm90IG9wZW4gdG8gc2VuZCBzY3JlZW5zaG90IGRhdGFcIixcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiZ2V0LWN1cnJlbnQtdXJsXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFJlY2VpdmVkIHJlcXVlc3QgZm9yIGN1cnJlbnQgVVJMXCIpO1xuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiBcIkdFVF9DVVJSRU5UX1VSTFwiLFxuICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEVycm9yIGdldHRpbmcgVVJMIGZyb20gYmFja2dyb3VuZDpcIixcbiAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFRyeWluZyBmYWxsYmFjayBtZXRob2QgdG8gZ2V0IFVSTFwiKTtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZ2V0IHRoZSBVUkwgZGlyZWN0bHkgdXNpbmcgdGhlIHRhYnMgQVBJXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEZhbGxiYWNrIFVSTCByZXRyaWV2YWwgZmFpbGVkOlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBlcnJvciByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmwtcmVzcG9uc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYklkOiBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBVUkw6IFwiICsgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdGFicyAmJiB0YWJzWzBdICYmIHRhYnNbMF0udXJsO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBHb3QgVVJMIGRpcmVjdGx5IGZyb20gdGFiOlwiLCB1cmwpO1xuXG4gICAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjdXJyZW50LXVybC1yZXNwb25zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS51cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogR290IFVSTCBmcm9tIGJhY2tncm91bmQgZm9yIHJlc3BvbnNlOlwiLFxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudXJsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImN1cnJlbnQtdXJsLXJlc3BvbnNlXCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgICAgICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIHJlc3BvbnNlIGV4aXN0cyBidXQgbm8gVVJMLCB0cnkgZmFsbGJhY2tcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFRyeWluZyBmYWxsYmFjayBtZXRob2QgdG8gZ2V0IFVSTFwiKTtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZ2V0IHRoZSBVUkwgZGlyZWN0bHkgdXNpbmcgdGhlIHRhYnMgQVBJXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEZhbGxiYWNrIFVSTCByZXRyaWV2YWwgZmFpbGVkOlwiLFxuICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBlcnJvciByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmwtcmVzcG9uc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYklkOiBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBVUkw6IFwiICsgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gdGFicyAmJiB0YWJzWzBdICYmIHRhYnNbMF0udXJsO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBHb3QgVVJMIGRpcmVjdGx5IGZyb20gdGFiOlwiLCB1cmwpO1xuXG4gICAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJjdXJyZW50LXVybC1yZXNwb25zZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEVycm9yIHByb2Nlc3NpbmcgV2ViU29ja2V0IG1lc3NhZ2U6XCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyBXZWJTb2NrZXQ6XCIsIGVycm9yKTtcbiAgICAvLyBUcnkgYWdhaW4gYWZ0ZXIgZGVsYXlcbiAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KHNldHVwV2ViU29ja2V0LCBXU19SRUNPTk5FQ1RfREVMQVkpO1xuICB9XG59XG5cbi8vIEluaXRpYWxpemUgV2ViU29ja2V0IGNvbm5lY3Rpb24gd2hlbiBEZXZUb29scyBvcGVuc1xuc2V0dXBXZWJTb2NrZXQoKTtcblxuLy8gQ2xlYW4gdXAgV2ViU29ja2V0IHdoZW4gRGV2VG9vbHMgY2xvc2VzXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLCAoKSA9PiB7XG4gIGlmICh3cykge1xuICAgIHdzLmNsb3NlKCk7XG4gIH1cbiAgaWYgKHdzUmVjb25uZWN0VGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh3c1JlY29ubmVjdFRpbWVvdXQpO1xuICB9XG5cbiAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRJbnRlcnZhbCk7XG4gICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSBudWxsO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJkZXZ0b29scy5iYWQzYzdjYS5qcy5tYXAifQ==
 globalThis.define=__define;  })(globalThis.define);