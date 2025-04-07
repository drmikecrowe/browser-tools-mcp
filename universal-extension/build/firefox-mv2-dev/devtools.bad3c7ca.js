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
})({"4QfJw":[function(require,module,exports) {
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
    "serverPort": 34011
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
var j = z(require("af8101c438b194e8"));
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

},{"af8101c438b194e8":"j8e0a"}],"j8e0a":[function(require,module,exports) {
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
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _devtools = require("./devtools");
var _panelHtml = require("url:./panels/panel.html");
var _panelHtmlDefault = parcelHelpers.interopDefault(_panelHtml);
chrome.devtools.panels.create("BrowserTools MCP", null, // See: https://github.com/PlasmoHQ/plasmo/issues/106#issuecomment-1188539625
(0, _panelHtmlDefault.default).split("/").pop());
function IndexDevtools() {
    return /*#__PURE__*/ React.createElement("h2", {
        __source: {
            fileName: "devtools/index.tsx",
            lineNumber: 14,
            columnNumber: 5
        },
        __self: this
    }, "Welcome to your ", /*#__PURE__*/ React.createElement("a", {
        href: "https://www.plasmo.com",
        __source: {
            fileName: "devtools/index.tsx",
            lineNumber: 15,
            columnNumber: 23
        },
        __self: this
    }, "Plasmo"), " Extension!");
}
exports.default = IndexDevtools;

},{"./devtools":"285pM","url:./panels/panel.html":"4RPLr","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"285pM":[function(require,module,exports) {
// devtools.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "devtoolsSettings", ()=>devtoolsSettings);
parcelHelpers.export(exports, "currentTabId", ()=>currentTabId);
var _attachDebugger = require("./utils/attachDebugger");
var _captureAndSendElement = require("./utils/captureAndSendElement");
var _detachDebugger = require("./utils/detachDebugger");
var _sendToBrowserConnector = require("./utils/sendToBrowserConnector");
var _websockets = require("./utils/websockets");
var _wipeLogs = require("./utils/wipeLogs");
var _browserConnectorSettings = require("../store/browserConnectorSettings");
let devtoolsSettings;
const currentTabId = chrome.devtools.inspectedWindow.tabId;
// Load settings on startup
(0, _browserConnectorSettings.getSettings)().then((settings)=>{
    devtoolsSettings = settings;
    // Initialize WebSocket connection when DevTools opens
    (0, _websockets.setupWebSocket)(devtoolsSettings);
});
// Listen for settings updates
(0, _browserConnectorSettings.onSettingsChanged)((settings)=>{
    const oldSettings = devtoolsSettings;
    devtoolsSettings = settings;
    // If server settings changed and we have a WebSocket, reconnect
    if ((0, _websockets.ws) && (oldSettings.serverHost !== settings.serverHost || oldSettings.serverPort !== settings.serverPort)) {
        console.log("Server settings changed, reconnecting WebSocket...");
        (0, _websockets.handleReconnectAfterPageRefresh)(settings);
    }
});
// Listen for page refreshes
chrome.devtools.network.onNavigated.addListener((url)=>{
    console.log("Page navigated/refreshed - wiping logs");
    (0, _wipeLogs.wipeLogs)();
    // Send the new URL to the server
    if ((0, _websockets.ws) && (0, _websockets.ws).readyState === WebSocket.OPEN && url) {
        console.log("Chrome Extension: Sending page-navigated event with URL:", url);
        (0, _websockets.ws).send(JSON.stringify({
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
        (0, _sendToBrowserConnector.sendToBrowserConnector)(entry);
    });
});
// Listen for element selection in the Elements panel
chrome.devtools.panels.elements.onSelectionChanged.addListener(()=>{
    (0, _captureAndSendElement.captureAndSendElement)();
});
// 2) Use DevTools Protocol to capture console logs
chrome.devtools.panels.create("BrowserToolsMCP", "", "panel.html", (panel)=>{
    // Initial attach - we'll keep the debugger attached as long as DevTools is open
    (0, _attachDebugger.attachDebugger)();
    // Handle panel showing
    panel.onShown.addListener((panelWindow)=>{
        if (!(0, _detachDebugger.isDebuggerAttached)) (0, _attachDebugger.attachDebugger)();
    });
});
// Clean up when DevTools closes
window.addEventListener("unload", ()=>{
    // Detach debugger
    (0, _detachDebugger.detachDebugger)();
    // Clean up all WebSocket resources
    (0, _websockets.cleanupWebSocketResources)();
});
// Listen for connection status updates from page refreshes
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    // Handle connection status updates from page refreshes
    if (message.type === "CONNECTION_STATUS_UPDATE") {
        console.log(`DevTools received connection status update: ${message.isConnected ? "Connected" : "Disconnected"}`);
        // If connection is lost, try to reestablish WebSocket only if we had a previous connection
        if (!message.isConnected && (0, _websockets.ws)) {
            console.log("Connection lost after page refresh, will attempt to reconnect WebSocket");
            // Only reconnect if we actually have a WebSocket that might be stale
            if ((0, _websockets.ws) && ((0, _websockets.ws).readyState === WebSocket.CLOSED || (0, _websockets.ws).readyState === WebSocket.CLOSING)) {
                console.log("WebSocket is already closed or closing, will reconnect");
                (0, _websockets.setupWebSocket)(devtoolsSettings);
            }
        }
    }
    // Handle auto-discovery requests after page refreshes
    if (message.type === "INITIATE_AUTO_DISCOVERY") {
        console.log(`DevTools initiating WebSocket reconnect after page refresh (reason: ${message.reason})`);
        // For page refreshes with forceRestart, we should always reconnect if our current connection is not working
        if ((message.reason === "page_refresh" || message.forceRestart === true) && (!(0, _websockets.ws) || (0, _websockets.ws).readyState !== WebSocket.OPEN)) {
            console.log("Page refreshed and WebSocket not open - forcing reconnection");
            // Use the utility function to handle reconnection
            (0, _websockets.handleReconnectAfterPageRefresh)(devtoolsSettings);
        }
    }
});

},{"./utils/attachDebugger":"gRzbw","./utils/captureAndSendElement":"72ndH","./utils/detachDebugger":"eUFot","./utils/sendToBrowserConnector":"aJExg","./utils/websockets":"6n2r0","./utils/wipeLogs":"j1FfB","../store/browserConnectorSettings":"fOoVm","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"gRzbw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Helper function to attach debugger
parcelHelpers.export(exports, "attachDebugger", ()=>attachDebugger);
var _performAttach = require("../performAttach");
var _devtools = require("../devtools");
async function attachDebugger(callback) {
    // First check if we're already attached to this tab
    chrome.debugger.getTargets((targets)=>{
        const isAlreadyAttached = targets.some((target)=>target.tabId === (0, _devtools.currentTabId) && target.attached);
        if (isAlreadyAttached) {
            console.log("Found existing debugger attachment, detaching first...");
            // Force detach first to ensure clean state
            chrome.debugger.detach({
                tabId: (0, _devtools.currentTabId)
            }, ()=>{
                // Ignore any errors during detach
                if (chrome.runtime.lastError) console.log("Error during forced detach:", chrome.runtime.lastError);
                // Now proceed with fresh attachment
                (0, _performAttach.performAttach)(callback);
            });
        } else // No existing attachment, proceed directly
        (0, _performAttach.performAttach)(callback);
    });
}

},{"../performAttach":"clch1","../devtools":"285pM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"clch1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "performAttach", ()=>performAttach);
var _devtools = require("./devtools");
var _consoleMessageListener = require("./utils/consoleMessageListener");
var _detachDebugger = require("./utils/detachDebugger");
function performAttach(callback) {
    console.log("Performing debugger attachment to tab:", (0, _devtools.currentTabId));
    chrome.debugger.attach({
        tabId: (0, _devtools.currentTabId)
    }, "1.3", ()=>{
        if (chrome.runtime.lastError) {
            console.error("Failed to attach debugger:", chrome.runtime.lastError);
            (0, _detachDebugger.setDebuggerAttached)(false, callback);
            return;
        }
        (0, _detachDebugger.setDebuggerAttached)(true, callback);
        console.log("Debugger successfully attached");
        // Add the event listener when attaching
        chrome.debugger.onEvent.addListener((0, _consoleMessageListener.consoleMessageListener));
        chrome.debugger.sendCommand({
            tabId: (0, _devtools.currentTabId)
        }, "Runtime.enable", {}, ()=>{
            if (chrome.runtime.lastError) {
                console.error("Failed to enable runtime:", chrome.runtime.lastError);
                return;
            }
            console.log("Runtime API successfully enabled");
        });
    });
}

},{"./devtools":"285pM","./utils/consoleMessageListener":"3OOzN","./utils/detachDebugger":"eUFot","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"3OOzN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "consoleMessageListener", ()=>consoleMessageListener);
var _devtools = require("../devtools");
var _sendToBrowserConnector = require("./sendToBrowserConnector");
const consoleMessageListener = (source, method, params)=>{
    // Only process events for our tab
    if (source.tabId !== (0, _devtools.currentTabId)) return;
    if (method === "Runtime.exceptionThrown") {
        const entry = {
            type: "console-error",
            message: params.exceptionDetails.exception?.description || JSON.stringify(params.exceptionDetails),
            level: "error",
            timestamp: Date.now()
        };
        (0, _sendToBrowserConnector.sendToBrowserConnector)(entry);
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
        (0, _sendToBrowserConnector.sendToBrowserConnector)(entry);
    }
};

},{"../devtools":"285pM","./sendToBrowserConnector":"aJExg","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"aJExg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Helper to send logs to browser-connector
parcelHelpers.export(exports, "sendToBrowserConnector", ()=>sendToBrowserConnector);
var _validateServerIdentity = require("~devtools/utils/validateServerIdentity");
var _devtools = require("../devtools");
var _processJsonString = require("./processJsonString");
async function sendToBrowserConnector(logData) {
    if (!logData) {
        console.error("No log data provided to sendToBrowserConnector");
        return;
    }
    // First, ensure we're connecting to the right server
    if (!await (0, _validateServerIdentity.validateServerIdentity)()) {
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
            processedData.requestBody = (0, _processJsonString.processJsonString)(processedData.requestBody, (0, _devtools.devtoolsSettings).stringSizeLimit);
            console.log("Request body size after:", processedData.requestBody.length);
        }
        if (processedData.responseBody) {
            console.log("Response body size before:", processedData.responseBody.length);
            processedData.responseBody = (0, _processJsonString.processJsonString)(processedData.responseBody, (0, _devtools.devtoolsSettings).stringSizeLimit);
            console.log("Response body size after:", processedData.responseBody.length);
        }
    } else if (logData.type === "console-log" || logData.type === "console-error") {
        console.log("Processing console message");
        if (processedData.message) {
            console.log("Message size before:", processedData.message.length);
            processedData.message = (0, _processJsonString.processJsonString)(processedData.message, (0, _devtools.devtoolsSettings).stringSizeLimit);
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
            logLimit: (0, _devtools.devtoolsSettings).logLimit,
            queryLimit: (0, _devtools.devtoolsSettings).queryLimit,
            showRequestHeaders: (0, _devtools.devtoolsSettings).showRequestHeaders,
            showResponseHeaders: (0, _devtools.devtoolsSettings).showResponseHeaders
        }
    };
    const finalPayloadSize = JSON.stringify(payload).length;
    console.log("Final payload size:", finalPayloadSize);
    if (finalPayloadSize > 1000000) {
        console.warn("Warning: Large payload detected:", finalPayloadSize);
        console.warn("Payload preview:", JSON.stringify(payload).substring(0, 1000) + "...");
    }
    const serverUrl = `http://${(0, _devtools.devtoolsSettings).serverHost}:${(0, _devtools.devtoolsSettings).serverPort}/extension-log`;
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

},{"~devtools/utils/validateServerIdentity":"8VGV9","../devtools":"285pM","./processJsonString":"WYKzJ","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"8VGV9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Validate server identity
parcelHelpers.export(exports, "validateServerIdentity", ()=>validateServerIdentity);
var _devtools = require("../devtools");
async function validateServerIdentity() {
    try {
        console.log(`Validating server identity at http://${(0, _devtools.devtoolsSettings).serverHost}:${(0, _devtools.devtoolsSettings).serverPort}/.identity...`);
        // Use fetch with a timeout to prevent long-hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 5000) // Increased timeout to 5 seconds
        ;
        try {
            const response = await fetch(`http://${(0, _devtools.devtoolsSettings).serverHost}:${(0, _devtools.devtoolsSettings).serverPort}/.identity`, {
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
                    serverHost: (0, _devtools.devtoolsSettings).serverHost,
                    serverPort: (0, _devtools.devtoolsSettings).serverPort
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
                    serverHost: (0, _devtools.devtoolsSettings).serverHost,
                    serverPort: (0, _devtools.devtoolsSettings).serverPort
                });
                return false;
            }
            console.log(`Server identity confirmed: ${identity.name} v${identity.version}`);
            // Notify about successful validation
            chrome.runtime.sendMessage({
                type: "SERVER_VALIDATION_SUCCESS",
                serverInfo: identity,
                serverHost: (0, _devtools.devtoolsSettings).serverHost,
                serverPort: (0, _devtools.devtoolsSettings).serverPort
            });
            return true;
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    } catch (error) {
        console.error("Server identity validation failed:", error);
        console.error(`Failed to connect to http://${(0, _devtools.devtoolsSettings).serverHost}:${(0, _devtools.devtoolsSettings).serverPort}/.identity`);
        // Notify about the connection error
        chrome.runtime.sendMessage({
            type: "SERVER_VALIDATION_FAILED",
            reason: "connection_error",
            error: error.message,
            serverHost: (0, _devtools.devtoolsSettings).serverHost,
            serverPort: (0, _devtools.devtoolsSettings).serverPort
        });
        return false;
    }
}

},{"../devtools":"285pM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6dfwG":[function(require,module,exports) {
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

},{}],"WYKzJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Modified processJsonString to handle arrays with size limit
parcelHelpers.export(exports, "processJsonString", ()=>processJsonString);
var _processArrayWithSizeLimit = require("~devtools/utils/processArrayWithSizeLimit");
var _truncateStringsInData = require("~devtools/utils/truncateStringsInData");
var _devtools = require("../devtools");
function processJsonString(jsonString, maxLength) {
    console.log("Processing string of length:", jsonString?.length);
    try {
        let parsed;
        try {
            parsed = JSON.parse(jsonString);
            console.log("Successfully parsed as JSON, structure:", JSON.stringify(Object.keys(parsed)));
        } catch (e) {
            console.log("Not valid JSON, treating as string");
            return (0, _truncateStringsInData.truncateStringsInData)(jsonString, maxLength, 0, "root");
        }
        // If it's an array, process with size limit
        if (Array.isArray(parsed)) {
            console.log("Processing array of objects with size limit");
            const processed = (0, _processArrayWithSizeLimit.processArrayWithSizeLimit)(parsed, (0, _devtools.devtoolsSettings).maxLogSize, (item)=>(0, _truncateStringsInData.truncateStringsInData)(item, maxLength, 0, "root"));
            const result = JSON.stringify(processed);
            console.log(`Processed array: ${parsed.length} -> ${processed.length} items`);
            return result;
        }
        // Otherwise process as before
        const processed = (0, _truncateStringsInData.truncateStringsInData)(parsed, maxLength, 0, "root");
        const result = JSON.stringify(processed);
        console.log("Processed JSON string length:", result.length);
        return result;
    } catch (e) {
        console.error("Error in processJsonString:", e);
        return jsonString.substring(0, maxLength) + "... (truncated)";
    }
}

},{"~devtools/utils/processArrayWithSizeLimit":"k29Ee","~devtools/utils/truncateStringsInData":"4s8tB","../devtools":"285pM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"k29Ee":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Helper to process array of objects with size limit
parcelHelpers.export(exports, "processArrayWithSizeLimit", ()=>processArrayWithSizeLimit);
var _calculateObjectSize = require("~devtools/utils/calculateObjectSize");
function processArrayWithSizeLimit(array, maxTotalSize, processFunc) {
    let currentSize = 0;
    const result = [];
    for (const item of array){
        // Process the item first
        const processedItem = processFunc(item);
        const itemSize = (0, _calculateObjectSize.calculateObjectSize)(processedItem);
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

},{"~devtools/utils/calculateObjectSize":"6wSsQ","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6wSsQ":[function(require,module,exports) {
// Helper to calculate the size of an object
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calculateObjectSize", ()=>calculateObjectSize);
function calculateObjectSize(obj) {
    return JSON.stringify(obj).length;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"4s8tB":[function(require,module,exports) {
// Utility to recursively truncate strings in any data structure
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "truncateStringsInData", ()=>truncateStringsInData);
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"eUFot":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Get current debugger state
parcelHelpers.export(exports, "isDebuggerAttached", ()=>isDebuggerAttached);
// Set debugger state and notify listeners if provided
parcelHelpers.export(exports, "setDebuggerAttached", ()=>setDebuggerAttached);
// Helper function to detach debugger
parcelHelpers.export(exports, "detachDebugger", ()=>detachDebugger);
var _consoleMessageListener = require("./consoleMessageListener");
var _devtools = require("../devtools");
// Track debugger state locally
let _isDebuggerAttached = false;
function isDebuggerAttached() {
    return _isDebuggerAttached;
}
function setDebuggerAttached(attached, callback) {
    _isDebuggerAttached = attached;
    if (callback) callback(attached);
}
function detachDebugger(callback) {
    // Remove the event listener first
    chrome.debugger.onEvent.removeListener((0, _consoleMessageListener.consoleMessageListener));
    // Check if debugger is actually attached before trying to detach
    chrome.debugger.getTargets((targets)=>{
        const isStillAttached = targets.some((target)=>target.tabId === (0, _devtools.currentTabId) && target.attached);
        if (!isStillAttached) {
            console.log("Debugger already detached");
            setDebuggerAttached(false, callback);
            return;
        }
        chrome.debugger.detach({
            tabId: (0, _devtools.currentTabId)
        }, ()=>{
            if (chrome.runtime.lastError) console.warn("Warning during debugger detach:", chrome.runtime.lastError);
            setDebuggerAttached(false, callback);
            console.log("Debugger detached");
        });
    });
}

},{"./consoleMessageListener":"3OOzN","../devtools":"285pM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"72ndH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Function to capture and send element data
parcelHelpers.export(exports, "captureAndSendElement", ()=>captureAndSendElement);
var _sendToBrowserConnector = require("./sendToBrowserConnector");
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
        (0, _sendToBrowserConnector.sendToBrowserConnector)({
            type: "selected-element",
            timestamp: Date.now(),
            element: result
        });
    });
}

},{"./sendToBrowserConnector":"aJExg","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"6n2r0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ws", ()=>ws);
parcelHelpers.export(exports, "wsReconnectTimeout", ()=>wsReconnectTimeout);
parcelHelpers.export(exports, "heartbeatInterval", ()=>heartbeatInterval);
parcelHelpers.export(exports, "WS_RECONNECT_DELAY", ()=>WS_RECONNECT_DELAY);
parcelHelpers.export(exports, "HEARTBEAT_INTERVAL", ()=>HEARTBEAT_INTERVAL);
parcelHelpers.export(exports, "WS_CONNECTION_TIMEOUT", ()=>WS_CONNECTION_TIMEOUT);
parcelHelpers.export(exports, "reconnectAfterValidation", ()=>reconnectAfterValidation);
parcelHelpers.export(exports, "intentionalClosure", ()=>intentionalClosure);
/**
 * Safely close the WebSocket connection
 */ parcelHelpers.export(exports, "closeWebSocket", ()=>closeWebSocket);
/**
 * Clear any pending WebSocket reconnect timeouts
 */ parcelHelpers.export(exports, "clearReconnectTimeout", ()=>clearReconnectTimeout);
/**
 * Clear the heartbeat interval
 */ parcelHelpers.export(exports, "clearHeartbeatInterval", ()=>clearHeartbeatInterval);
/**
 * Perform complete cleanup of all WebSocket resources
 */ parcelHelpers.export(exports, "cleanupWebSocketResources", ()=>cleanupWebSocketResources);
parcelHelpers.export(exports, "setupWebSocket", ()=>setupWebSocket);
/**
 * Close existing WebSocket connection and reset state
 */ parcelHelpers.export(exports, "closeExistingWebSocket", ()=>closeExistingWebSocket);
/**
 * Handle reconnection after page refresh
 * @param settings DevTools settings object
 */ parcelHelpers.export(exports, "handleReconnectAfterPageRefresh", ()=>handleReconnectAfterPageRefresh);
var _validateServerIdentity = require("./validateServerIdentity");
let ws = null;
let wsReconnectTimeout = null;
let heartbeatInterval = null;
const WS_RECONNECT_DELAY = 5000 // 5 seconds
;
const HEARTBEAT_INTERVAL = 30000 // 30 seconds
;
const WS_CONNECTION_TIMEOUT = 10000 // 10 seconds
;
let reconnectAfterValidation = false;
let intentionalClosure = false;
function closeWebSocket() {
    // Set intentional closure flag before closing
    intentionalClosure = true;
    if (ws) {
        try {
            ws.close();
            console.log("WebSocket closed successfully");
        } catch (e) {
            console.error("Error closing WebSocket:", e);
        }
        ws = null;
    }
    // Reset flag after closing
    intentionalClosure = false;
}
function clearReconnectTimeout() {
    if (wsReconnectTimeout) {
        clearTimeout(wsReconnectTimeout);
        wsReconnectTimeout = null;
        console.log("WebSocket reconnect timeout cleared");
    }
}
function clearHeartbeatInterval() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
        console.log("WebSocket heartbeat interval cleared");
    }
}
function cleanupWebSocketResources() {
    // Set intentional closure flag before closing
    intentionalClosure = true;
    // Close the WebSocket connection
    if (ws) {
        try {
            ws.close();
        } catch (e) {
            console.error("Error closing WebSocket during cleanup:", e);
        }
        ws = null;
    }
    // Clear any pending timeouts
    if (wsReconnectTimeout) {
        clearTimeout(wsReconnectTimeout);
        wsReconnectTimeout = null;
    }
    // Clear the heartbeat interval
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
    console.log("All WebSocket resources cleaned up");
}
// Function to send a heartbeat to keep the WebSocket connection alive
function sendHeartbeat() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("Chrome Extension: Sending WebSocket heartbeat");
        ws.send(JSON.stringify({
            type: "heartbeat"
        }));
    }
}
async function setupWebSocket(devToolsSettings) {
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
        intentionalClosure = false // Reset flag
        ;
    }
    // Validate server identity before connecting
    console.log("Validating server identity before WebSocket connection...");
    const isValid = await (0, _validateServerIdentity.validateServerIdentity)();
    if (!isValid) {
        console.error("Cannot establish WebSocket: Not connected to a valid browser tools server");
        // Set flag to indicate we need to reconnect after a page refresh check
        reconnectAfterValidation = true;
        // Try again after delay
        wsReconnectTimeout = setTimeout(()=>{
            console.log("Attempting to reconnect WebSocket after validation failure");
            setupWebSocket(devToolsSettings);
        }, WS_RECONNECT_DELAY);
        return;
    }
    // Reset reconnect flag since validation succeeded
    reconnectAfterValidation = false;
    const wsUrl = `ws://${devToolsSettings.serverHost}:${devToolsSettings.serverPort}/extension-ws`;
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
                serverHost: devToolsSettings.serverHost,
                serverPort: devToolsSettings.serverPort
            });
            // Send the current URL to the server right after connection
            // This ensures the server has the URL even if no navigation occurs
            chrome.runtime.sendMessage({
                type: "GET_CURRENT_URL",
                tabId: chrome.devtools.inspectedWindow.tabId
            }, (response)=>{
                if (chrome.runtime.lastError) {
                    console.error("Chrome Extension: Error getting URL from background on connection:", chrome.runtime.lastError);
                    // Send error response since we can't get the URL
                    ws.send(JSON.stringify({
                        type: "current-url-response",
                        url: null,
                        tabId: chrome.devtools.inspectedWindow.tabId,
                        error: "Failed to get URL: " + chrome.runtime.lastError.message,
                        requestId: null
                    }));
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
                serverHost: devToolsSettings.serverHost,
                serverPort: devToolsSettings.serverPort
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
                    serverHost: devToolsSettings.serverHost,
                    serverPort: devToolsSettings.serverPort
                });
                // Try to reconnect after delay
                wsReconnectTimeout = setTimeout(()=>{
                    console.log(`Chrome Extension: Attempting to reconnect WebSocket to ${wsUrl}`);
                    setupWebSocket(devToolsSettings);
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
                    serverHost: devToolsSettings.serverHost,
                    serverPort: devToolsSettings.serverPort
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
                            ...devToolsSettings.screenshotPath && {
                                path: devToolsSettings.screenshotPath
                            },
                            // Include auto-paste setting
                            autoPaste: devToolsSettings.allowAutoPaste
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
                            // Send error response since we can't get the URL
                            ws.send(JSON.stringify({
                                type: "current-url-response",
                                url: null,
                                tabId: chrome.devtools.inspectedWindow.tabId,
                                error: "Failed to get URL: " + chrome.runtime.lastError.message,
                                requestId: message.requestId
                            }));
                            return;
                        }
                        // Successfully got URL from background script
                        console.log("Chrome Extension: Got URL from background:", response.url);
                        ws.send(JSON.stringify({
                            type: "current-url-response",
                            url: response.url,
                            tabId: chrome.devtools.inspectedWindow.tabId,
                            requestId: message.requestId
                        }));
                    });
                }
            } catch (error) {
                console.error("Chrome Extension: Error processing WebSocket message:", error);
            }
        };
    } catch (error) {
        console.error("Error creating WebSocket:", error);
        // Try again after delay
        wsReconnectTimeout = setTimeout(()=>{
            setupWebSocket(devToolsSettings);
        }, WS_RECONNECT_DELAY);
    }
}
function closeExistingWebSocket() {
    if (ws) {
        console.log("Closing existing WebSocket");
        intentionalClosure = true // Mark as intentional to prevent auto-reconnect
        ;
        try {
            ws.close();
        } catch (e) {
            console.error("Error closing WebSocket:", e);
        }
        ws = null;
        intentionalClosure = false // Reset flag
        ;
    }
}
function handleReconnectAfterPageRefresh(settings) {
    // Close existing WebSocket if any
    closeExistingWebSocket();
    // Clear any pending reconnect timeouts
    clearReconnectTimeout();
    // Try to reestablish the WebSocket connection
    setupWebSocket(settings);
}

},{"./validateServerIdentity":"8VGV9","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"j1FfB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Function to clear logs on the server
parcelHelpers.export(exports, "wipeLogs", ()=>wipeLogs);
var _devtools = require("../devtools");
function wipeLogs() {
    console.log("Wiping all logs...");
    const serverUrl = `http://${(0, _devtools.devtoolsSettings).serverHost}:${(0, _devtools.devtoolsSettings).serverPort}/wipelogs`;
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

},{"../devtools":"285pM","@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"fOoVm":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"6dfwG"}],"4RPLr":[function(require,module,exports) {
module.exports = require("a8c41a842f94b76b").getBundleURL("az1z2") + "panel.7a8e5c54.html" + "?" + Date.now();

},{"a8c41a842f94b76b":"lSi2Y"}],"lSi2Y":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["4QfJw","fHqFv"], "fHqFv", "parcelRequire3a77")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxBQUFDLENBQUEsTUFBSSxLQUFHLE1BQU0sUUFBUSxNQUFJLENBQUMsQ0FBQyxFQUFFLFNBQU8sRUFBRSxLQUFHLENBQUEsS0FBSSxFQUFFLEtBQUs7UUFBQztRQUFFO0tBQUU7SUFBRSxPQUFPLEVBQUUsVUFBUyxDQUFBLElBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFPLEdBQUUsR0FBRztBQUFDO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUcsRUFBRSxHQUFFLEdBQUUsSUFBRyxPQUFNLENBQUM7SUFBRSxJQUFJLElBQUUsRUFBRSxPQUFPLE9BQU8sTUFBSyxJQUFHLElBQUUsQ0FBQztJQUFFLE1BQUssRUFBRSxTQUFPLEdBQUc7UUFBQyxJQUFHLENBQUMsR0FBRSxFQUFFLEdBQUMsRUFBRTtRQUFRLElBQUcsRUFBRSxHQUFFLEdBQUUsT0FBTSxJQUFFLENBQUM7YUFBTTtZQUFDLElBQUksSUFBRSxFQUFFLE9BQU8sT0FBTyxNQUFLO1lBQUcsSUFBRyxFQUFFLFdBQVMsR0FBRTtnQkFBQyxJQUFFLENBQUM7Z0JBQUU7WUFBSztZQUFDLEVBQUUsUUFBUTtRQUFFO0lBQUM7SUFBQyxPQUFPO0FBQUM7QUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBRyxFQUFDLFNBQVEsQ0FBQyxFQUFDLEdBQUM7SUFBRSxJQUFHLENBQUMsR0FBRSxPQUFNLENBQUM7SUFBRSxJQUFHLEtBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUMsT0FBTyxFQUFFLFNBQU8sRUFBRSxFQUFFLFFBQU8sR0FBRSxLQUFHLENBQUM7SUFBRSxJQUFHLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBQyxPQUFNLENBQUM7SUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUMsQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQUMsT0FBTyxFQUFFLGdCQUFnQixLQUFLO1FBQUM7UUFBRTtLQUFFLEdBQUUsQ0FBQyxLQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksaUJBQWlCLFNBQVEsQ0FBQSxFQUFFLGVBQWUsS0FBSztRQUFDO1FBQUU7S0FBRSxHQUFFLENBQUMsQ0FBQSxJQUFHLENBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUcsRUFBQyxTQUFRLENBQUMsRUFBQyxHQUFDO0lBQUUsT0FBTyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUM7QUFBQztBQUFDLFNBQVMsR0FBRyxDQUFDO0lBQUUsSUFBRyxFQUFFLFNBQU8sUUFBTSxPQUFPLFdBQVMsS0FBSSxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUU7UUFBSyxJQUFJLElBQUUsU0FBUyxjQUFjO1FBQVUsRUFBRSxNQUFJLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUMsRUFBRSxpQkFBZSxjQUFhLENBQUEsRUFBRSxPQUFLLFFBQU8sR0FBRyxFQUFFLGlCQUFpQixRQUFPLElBQUksRUFBRSxLQUFJLEVBQUUsaUJBQWlCLFNBQVEsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsR0FBRyxDQUFDLEtBQUksU0FBUyxNQUFNLFlBQVk7SUFBRTtBQUFFO0FBQUMsZUFBZSxFQUFFLENBQUM7SUFBRSxPQUFPLGtCQUFnQixPQUFPLE9BQU8sT0FBTSxFQUFFLFFBQVEsQ0FBQTtRQUFJLEVBQUUsTUFBSSxFQUFFLFFBQVEsT0FBTywrQkFBNkIsbUJBQW1CLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEtBQUssTUFBTSxDQUFDO0lBQUU7SUFBRyxJQUFJLElBQUUsTUFBTSxRQUFRLElBQUksRUFBRSxJQUFJO0lBQUssSUFBRztRQUFDLEVBQUUsUUFBUSxTQUFTLENBQUM7WUFBRSxFQUFFLE9BQU8sT0FBTyxNQUFLO1FBQUU7SUFBRSxTQUFRO1FBQUMsT0FBTyxPQUFPLGlCQUFnQixLQUFHLEVBQUUsUUFBUSxDQUFBO1lBQUksS0FBRyxTQUFTLE1BQU0sWUFBWTtRQUFFO0lBQUU7QUFBQztBQUFDLFNBQVMsR0FBRyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUU7SUFBWSxFQUFFLFNBQU87UUFBVyxFQUFFLGVBQWEsUUFBTSxFQUFFLFdBQVcsWUFBWTtJQUFFLEdBQUUsRUFBRSxhQUFhLFFBQU8sRUFBRSxhQUFhLFFBQVEsTUFBTSxJQUFJLENBQUMsRUFBRSxHQUFDLE1BQUksS0FBSyxRQUFPLEVBQUUsV0FBVyxhQUFhLEdBQUUsRUFBRTtBQUFZO0FBQUMsSUFBSSxJQUFFO0FBQUssU0FBUztJQUFLLEtBQUksQ0FBQSxJQUFFLFdBQVc7UUFBVyxJQUFJLElBQUUsU0FBUyxpQkFBaUI7UUFBMEIsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJO1lBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxTQUFRLElBQUUsS0FBSSxJQUFFLE1BQUksY0FBWSxJQUFJLE9BQU8sbURBQWlELEtBQUssS0FBSyxLQUFHLEVBQUUsUUFBUSxJQUFFLE1BQUk7WUFBSyxnQkFBZ0IsS0FBSyxNQUFJLEVBQUUsUUFBUSxTQUFTLFlBQVUsS0FBRyxDQUFDLEtBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUFDO1FBQUMsSUFBRTtJQUFJLEdBQUUsR0FBRTtBQUFFO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBRyxFQUFDLFNBQVEsQ0FBQyxFQUFDLEdBQUM7SUFBRSxJQUFHLEdBQUU7UUFBQyxJQUFHLEVBQUUsU0FBTyxPQUFNO2FBQVUsSUFBRyxFQUFFLFNBQU8sTUFBSztZQUFDLElBQUksSUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLGNBQWM7WUFBQyxJQUFHLEdBQUU7Z0JBQUMsSUFBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUM7b0JBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBRyxDQUFDLENBQUMsRUFBRSxFQUFDO3dCQUFDLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRTt3QkFBQyxFQUFFLE9BQU8sT0FBTyxNQUFLLEdBQUcsV0FBUyxLQUFHLEVBQUUsT0FBTyxPQUFPLE1BQUs7b0JBQUU7Z0JBQUM7Z0JBQUMsSUFBSSxJQUFFLE9BQU8sZUFBZSxDQUFDLEVBQUUsR0FBRztnQkFBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUM7b0JBQUM7b0JBQUU7aUJBQUU7WUFBQSxPQUFNLEVBQUUsVUFBUSxFQUFFLEVBQUUsUUFBTztRQUFFO0lBQUM7QUFBQztBQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztJQUFFLElBQUksSUFBRSxFQUFFO0lBQVEsSUFBRztRQUFFLElBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBQztZQUFDLElBQUksSUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxJQUFFLEVBQUU7WUFBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsT0FBTyxPQUFPLE1BQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFTLEtBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsUUFBUSxDQUFBO2dCQUFJLEVBQUUsT0FBTyxPQUFPLE1BQUs7WUFBRTtRQUFFLE9BQU0sRUFBRSxVQUFRLEVBQUUsRUFBRSxRQUFPOztBQUFFO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsSUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7SUFBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFFLEtBQUcsRUFBRSxPQUFNLENBQUEsRUFBRSxJQUFJLE9BQUssRUFBRSxPQUFPLENBQUMsRUFBRSxBQUFELEdBQUcsS0FBRyxFQUFFLE9BQUssRUFBRSxJQUFJLGtCQUFrQixVQUFRLEVBQUUsSUFBSSxrQkFBa0IsUUFBUSxTQUFTLENBQUM7UUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7SUFBQyxJQUFHLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtBQUFBO0FBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBQUUsRUFBRTtJQUFHLElBQUksSUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO0lBQUMsSUFBRyxLQUFHLEVBQUUsT0FBSyxFQUFFLElBQUksaUJBQWlCLFFBQU87UUFBQyxJQUFJLElBQUUsRUFBRSxPQUFPLE9BQU8sTUFBSztRQUFHLEVBQUUsSUFBSSxpQkFBaUIsUUFBUSxTQUFTLENBQUM7WUFBRSxJQUFJLElBQUUsRUFBRSxJQUFJO1lBQUcsS0FBRyxFQUFFLFVBQVMsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUUsRUFBRTtnQkFBSSxFQUFFLEdBQUU7WUFBRSxJQUFHLEVBQUUsZUFBZSxLQUFLLE1BQU0sRUFBRSxnQkFBZSxFQUFDO1FBQUU7SUFBRTtBQUFDO0FBQUMsU0FBUyxHQUFHLElBQUUsR0FBRztJQUFFLElBQUksSUFBRTtJQUFJLE9BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBUSxTQUFTLGFBQVcsWUFBVSxDQUFDLDhCQUE4QixLQUFLLEtBQUcsUUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUFBO0FBQUMsU0FBUyxHQUFHLENBQUM7SUFBRSxPQUFPLEVBQUUsV0FBUyxZQUFVLEVBQUUsOEJBQTRCLEVBQUU7QUFBUTtBQUFDLFNBQVMsRUFBRSxDQUFDO0lBQUUsSUFBRyxPQUFPLFdBQVcsWUFBVSxLQUFJO0lBQU8sSUFBSSxJQUFFLElBQUksVUFBVTtJQUFNLE9BQU8sRUFBRSxpQkFBaUIsV0FBVSxlQUFlLENBQUM7UUFBRSxJQUFJLElBQUUsS0FBSyxNQUFNLEVBQUU7UUFBTSxJQUFHLEVBQUUsU0FBTyxZQUFVLE1BQU0sRUFBRSxFQUFFLFNBQVEsRUFBRSxTQUFPLFNBQVEsS0FBSSxJQUFJLEtBQUssRUFBRSxZQUFZLEtBQUs7WUFBQyxJQUFJLElBQUUsRUFBRSxhQUFXLEVBQUU7WUFBTSxFQUFFLDhCQUE0QixFQUFFLFVBQVEsQ0FBQztBQUMzM0wsQ0FBQyxHQUFDLElBQUUsQ0FBQzs7QUFFTCxDQUFDLEdBQUMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUNoQixDQUFDO1FBQUU7SUFBQyxJQUFHLEVBQUUsaUJBQWlCLFNBQVEsS0FBSSxFQUFFLGlCQUFpQixRQUFPO1FBQUssRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEVBQUUsY0FBYyxDQUFDO0lBQUMsSUFBRyxFQUFFLGlCQUFpQixTQUFRO1FBQUssRUFBRSxDQUFDLG9FQUFvRSxFQUFFLEVBQUUsY0FBYyxDQUFDO0lBQUMsSUFBRztBQUFDO0FBQUMsSUFBSSxJQUFFLEVBQUUsUUFBUTtBQUEwQixlQUFlO0lBQUksRUFBRSxRQUFRLHFCQUFxQixTQUFRLE9BQU8sZUFBYSxZQUFXLEdBQUUsT0FBTyxlQUFhO1FBQVcsT0FBTyxTQUFTLENBQUM7WUFBRSxPQUFPO1FBQUM7SUFBQztBQUFDO0FBQUMsSUFBSSxLQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsQ0FBQyxFQUFDLEdBQUUsSUFBRSxPQUFPLE9BQU87QUFBTyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUUsaUJBQWdCO0lBQUMsSUFBRztRQUFDLElBQUUsR0FBRyxRQUFRLFFBQVE7WUFBQyxNQUFLO1FBQUUsSUFBRyxFQUFFLGFBQWEsWUFBWTtZQUFLO1FBQUcsSUFBRyxFQUFFLFdBQVMsRUFBRSxVQUFVLFlBQVk7WUFBSztRQUFHO0lBQUUsRUFBQyxPQUFNLEdBQUU7UUFBQyxFQUFFO0lBQUU7SUFBQyxFQUFFLE9BQU07UUFBSSxJQUFHLEVBQUUsaUNBQWdDLEVBQUUsU0FBUTtZQUFDO1lBQUksSUFBSSxJQUFFLEVBQUUsT0FBTyxDQUFBLElBQUcsRUFBRSxZQUFVLEVBQUU7WUFBUyxJQUFHLEVBQUUsS0FBSyxDQUFBLElBQUcsRUFBRSxTQUFPLFNBQU8sRUFBRSxTQUFPLFFBQU0sRUFBRSxPQUFPLE9BQU8sTUFBSyxFQUFFLElBQUcsRUFBRSxnQkFBZSxJQUFHO2dCQUFDLE1BQU0sRUFBRTtnQkFBRyxJQUFJLElBQUUsQ0FBQztnQkFBRSxLQUFJLElBQUcsQ0FBQyxHQUFFLEVBQUUsSUFBRyxFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFHLENBQUEsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7Z0JBQUcsSUFBSSxJQUFFLENBQUM7Z0JBQUUsSUFBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsZUFBZSxRQUFPLElBQUk7b0JBQUMsSUFBRyxDQUFDLEdBQUUsRUFBRSxHQUFDLEVBQUUsY0FBYyxDQUFDLEVBQUU7b0JBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBRyxDQUFBLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO2dCQUFFO1lBQUMsRUFBQyxPQUFNLEdBQUU7Z0JBQUMsRUFBRSxZQUFVLFVBQVMsQ0FBQSxRQUFRLE1BQU0sSUFBRyxNQUFNLEtBQUssVUFBVSxHQUFFLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFBRTtRQUFDLE9BQUs7WUFBQyxJQUFJLElBQUUsRUFBRSxPQUFPLENBQUEsSUFBRyxFQUFFLFlBQVUsRUFBRSxTQUFTLEtBQUssQ0FBQSxJQUFHLEVBQUUsT0FBTyxRQUFPLEVBQUU7WUFBSyxFQUFFLGtCQUFpQjtnQkFBQyxlQUFjO1lBQUMsSUFBRyxLQUFHLEVBQUUsWUFBWTtnQkFBQyx5QkFBd0IsQ0FBQztZQUFDO1FBQUU7SUFBQztBQUFFO0FBQUMsRUFBRSxXQUFVLENBQUEsRUFBRSw0QkFBMkIsR0FBRTs7O0FDSjMwQyxJQUFJLEtBQUcsT0FBTztBQUFPLElBQUksSUFBRSxPQUFPO0FBQWUsSUFBSSxLQUFHLE9BQU87QUFBeUIsSUFBSSxLQUFHLE9BQU87QUFBb0IsSUFBSSxLQUFHLE9BQU8sZ0JBQWUsS0FBRyxPQUFPLFVBQVU7QUFBZSxJQUFJLElBQUUsQ0FBQyxHQUFFLElBQUksSUFBSyxDQUFBLEtBQUcsRUFBRSxBQUFDLENBQUEsSUFBRTtZQUFDLFNBQVEsQ0FBQztRQUFDLENBQUEsRUFBRyxTQUFRLElBQUcsRUFBRSxPQUFNLEdBQUcsS0FBRyxDQUFDLEdBQUU7SUFBSyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsR0FBRSxHQUFFO1FBQUMsS0FBSSxDQUFDLENBQUMsRUFBRTtRQUFDLFlBQVcsQ0FBQztJQUFDO0FBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUU7SUFBSyxJQUFHLEtBQUcsT0FBTyxLQUFHLFlBQVUsT0FBTyxLQUFHLFlBQVcsS0FBSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUUsTUFBSSxNQUFJLEtBQUcsRUFBRSxHQUFFLEdBQUU7UUFBQyxLQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFBQyxZQUFXLENBQUUsQ0FBQSxJQUFFLEdBQUcsR0FBRSxFQUFDLEtBQUksRUFBRTtJQUFVO0lBQUcsT0FBTztBQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFLLENBQUEsRUFBRSxHQUFFLEdBQUUsWUFBVyxLQUFHLEVBQUUsR0FBRSxHQUFFLFVBQVMsR0FBRyxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUssQ0FBQSxJQUFFLEtBQUcsT0FBSyxHQUFHLEdBQUcsTUFBSSxDQUFDLEdBQUUsRUFBRSxLQUFHLENBQUMsS0FBRyxDQUFDLEVBQUUsYUFBVyxFQUFFLEdBQUUsV0FBVTtRQUFDLE9BQU07UUFBRSxZQUFXLENBQUM7SUFBQyxLQUFHLEdBQUUsRUFBQyxHQUFHLEtBQUcsQ0FBQSxJQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUUsY0FBYTtRQUFDLE9BQU0sQ0FBQztJQUFDLElBQUc7QUFBRyxJQUFJLElBQUUsRUFBRSxDQUFBO0lBQUk7SUFBYyxDQUFBO1FBQVc7UUFBYSxJQUFJLElBQUUsT0FBTyxJQUFJLHNCQUFxQixJQUFFLE9BQU8sSUFBSSxlQUFjLElBQUUsT0FBTyxXQUFTLGFB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R0FBRSxFQUFFLElBQUksR0FBRSxJQUFHLE9BQU8sS0FBRyxZQUFVLE1BQUksTUFBSyxPQUFPLEVBQUUsR0FBRTtnQkFBYSxLQUFLO29CQUFFLEVBQUUsRUFBRSxRQUFPLElBQUU7b0JBQVc7Z0JBQU0sS0FBSztvQkFBRSxFQUFFLEVBQUUsTUFBSyxJQUFFO29CQUFTO1lBQUs7UUFBRTtRQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUFFLElBQUksSUFBRSxVQUFVLFNBQU8sS0FBRyxTQUFTLENBQUMsRUFBRSxLQUFHLEtBQUssSUFBRSxTQUFTLENBQUMsRUFBRSxHQUFDLENBQUMsR0FBRSxJQUFFLFVBQVUsU0FBTyxJQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUMsS0FBSztZQUFFLElBQUcsRUFBRSxJQUFJLE1BQUksRUFBRSxJQUFJLEdBQUU7Z0JBQUMsWUFBVztnQkFBRSxRQUFPO2dCQUFFLFNBQVE7Z0JBQUssZ0JBQWUsS0FBRztvQkFBVyxPQUFNLEVBQUU7Z0JBQUE7WUFBQyxJQUFHLE9BQU8sS0FBRyxZQUFVLE1BQUksTUFBSyxPQUFPLEVBQUUsR0FBRTtnQkFBYSxLQUFLO29CQUFFLEVBQUUsRUFBRSxRQUFPLEdBQUUsR0FBRTtvQkFBRztnQkFBTSxLQUFLO29CQUFFLEVBQUUsRUFBRSxNQUFLLEdBQUUsR0FBRTtvQkFBRztZQUFLO1FBQUM7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFHLElBQUksSUFBRSxFQUFFLElBQUk7WUFBRyxNQUFJLEtBQUssS0FBRyxFQUFFO1FBQUc7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFFLE9BQU8sRUFBRSxJQUFJO1FBQUU7UUFBQyxTQUFTLEVBQUUsQ0FBQztZQUFFLE9BQU8sRUFBRSxJQUFJO1FBQUU7UUFBQyxTQUFTLEdBQUcsQ0FBQztZQUFHLElBQUksSUFBRSxJQUFJO1lBQUksT0FBTyxFQUFFLFFBQVEsU0FBUyxDQUFDO2dCQUFFLElBQUksSUFBRSxFQUFFLElBQUk7Z0JBQUcsSUFBRyxNQUFJLEtBQUssR0FBRSxNQUFNLElBQUksTUFBTTtnQkFB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QUFFLFFBQVE7WUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFFLElBQUcsTUFBSSxNQUFJO1FBQUM7UUFBQyxPQUFPO0lBQUMsRUFBRTtJQUFBLFNBQU8sT0FBTSxJQUFHLEFBQUMsQ0FBQSxNQUFNLElBQUksQ0FBQyxXQUFXO1lBQUM7U0FBRSxDQUFBLENBQUUsQ0FBQyxFQUFFLENBQUM7SUFBQSxhQUFXLE9BQU0sSUFBRyxJQUFJLENBQUMsa0JBQWdCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsT0FBTyxDQUFDLEdBQUUsSUFBSyxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBRyxDQUFBLEdBQUcsQ0FBQyxHQUFHO0lBQUEsU0FBTyxPQUFNLEdBQUUsSUFBSSxNQUFNLElBQUksQ0FBQyxXQUFXO1lBQUMsQ0FBQyxFQUFFLEVBQUM7UUFBQyxHQUFHO0lBQUEsYUFBVyxPQUFNLElBQUksQ0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsT0FBTyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRSxLQUFJLElBQUksQ0FBQyxtQkFBaUIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFHLElBQUcsRUFBRztJQUFBLFFBQU0sT0FBTSxJQUFFLENBQUMsQ0FBQztRQUFJLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBTyxFQUFFO0lBQUEsWUFBVSxPQUFNO1FBQUksTUFBTSxJQUFJLENBQUMsY0FBYztZQUFDO1NBQUU7SUFBQyxFQUFFO0lBQUEsZ0JBQWMsT0FBTTtRQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsUUFBUSxDQUFBLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSSxJQUFJLENBQUMsbUJBQWlCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87SUFBRSxFQUFFO0lBQUEsWUFBVTtRQUFVLElBQUksSUFBRSxNQUFNLElBQUksQ0FBQyxVQUFTLElBQUUsT0FBTyxLQUFLO1FBQUcsTUFBTSxJQUFJLENBQUMsV0FBVztJQUFFLEVBQUU7SUFBQSxRQUFNLENBQUE7UUFBSSxJQUFJLElBQUUsSUFBSSxDQUFDO1FBQW1CLE9BQU8sS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRztJQUFDLEVBQUU7SUFBQSxDQUFDLENBQUMsR0FBQyxDQUFBO1FBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtZQUFDLElBQUksSUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUcsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLGVBQWEsSUFBSTtZQUFJLElBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUUsRUFBRSxPQUFLLEdBQUU7WUFBUyxJQUFJLElBQUUsQ0FBQyxHQUFFO2dCQUFLLElBQUcsTUFBSSxJQUFJLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQU8sSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUFHLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsd0NBQXdDLEVBQUUsRUFBRSxDQUFDO2dCQUFFLFFBQVEsSUFBSTtvQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFFLEVBQUU7b0JBQUksS0FBSSxJQUFJLEtBQUssRUFBRSxZQUFZLEVBQUU7d0JBQUMsVUFBUzt3QkFBRSxVQUFTO29CQUFDLEdBQUU7Z0JBQUU7WUFBRTtZQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLFlBQVksSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFFO2dCQUFDLGFBQVk7Z0JBQUUsVUFBUztZQUFDO1FBQUU7SUFBQyxFQUFFO0lBQUEsVUFBUSxDQUFBO1FBQUksSUFBSSxJQUFFLElBQUksQ0FBQztRQUFtQixPQUFPLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUc7SUFBQyxFQUFFO0lBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFFLElBQUksSUFBSSxLQUFLLEVBQUU7WUFBQyxJQUFJLElBQUUsSUFBSSxDQUFDLGlCQUFpQixJQUFHLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQUcsS0FBSSxDQUFBLEVBQUUsWUFBWSxPQUFPLElBQUcsRUFBRSxZQUFZLFNBQU8sS0FBSSxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsZUFBZSxFQUFFLFNBQVEsQ0FBQztRQUFFO0lBQUM7SUFBQyxhQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQUEsQ0FBQyxDQUFDO1FBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsZUFBZSxLQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFPO0lBQUMsTUFBTSxRQUFRLENBQUMsRUFBQztRQUFDLE9BQU8sSUFBSSxDQUFDLElBQUk7SUFBRTtJQUFDLE1BQU0sU0FBUyxDQUFDLEVBQUM7UUFBQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFFBQVE7SUFBRTtJQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFFO0lBQUU7SUFBQyxNQUFNLFNBQVMsQ0FBQyxFQUFDO1FBQUMsTUFBTSxNQUFNLElBQUksQ0FBQyxRQUFRO0lBQUU7SUFBQyxNQUFNLFdBQVcsQ0FBQyxFQUFDO1FBQUMsT0FBTyxJQUFJLENBQUMsT0FBTztJQUFFO0lBQUMsTUFBTSxZQUFZLENBQUMsRUFBQztRQUFDLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVztJQUFFO0FBQUMsR0FBRSxJQUFFLGNBQWM7SUFBRSxNQUFJLE9BQU07UUFBSSxJQUFJLElBQUUsSUFBSSxDQUFDLGlCQUFpQixJQUFHLElBQUUsTUFBTSxJQUFJLENBQUMsT0FBTztRQUFHLE9BQU8sSUFBSSxDQUFDLFdBQVc7SUFBRSxFQUFFO0lBQUEsVUFBUSxPQUFNO1FBQUksSUFBSSxJQUFFLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQWtCLElBQUUsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFHLElBQUUsTUFBTSxRQUFRLElBQUksT0FBTyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFBYSxPQUFPLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFFLEdBQUUsSUFBSyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUEsR0FBRyxDQUFDO0lBQUUsRUFBRTtJQUFBLE1BQUksT0FBTSxHQUFFO1FBQUssSUFBSSxJQUFFLElBQUksQ0FBQyxpQkFBaUIsSUFBRyxJQUFFLElBQUksQ0FBQyxNQUFNLFdBQVc7UUFBRyxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUU7SUFBRSxFQUFFO0lBQUEsVUFBUSxPQUFNO1FBQUksSUFBSSxJQUFFLE9BQU8sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFFLENBQUMsR0FBRSxFQUFFLEdBQUksQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUMsSUFBSSxDQUFDLE1BQU0sV0FBVyxJQUFHLENBQUEsR0FBRyxDQUFDO1FBQUcsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXO0lBQUUsRUFBRTtJQUFBLFNBQU8sT0FBTTtRQUFJLElBQUksSUFBRSxJQUFJLENBQUMsaUJBQWlCO1FBQUcsT0FBTyxJQUFJLENBQUMsVUFBVTtJQUFFLEVBQUU7SUFBQSxhQUFXLE9BQU07UUFBSSxJQUFJLElBQUUsRUFBRSxJQUFJLElBQUksQ0FBQztRQUFrQixPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWM7SUFBRSxFQUFFO0lBQUEsZUFBYSxDQUFBO1FBQUksSUFBSSxDQUFDLGVBQWE7SUFBQyxFQUFFO0lBQUEsYUFBVyxPQUFNO1FBQUksSUFBRztZQUFDLElBQUcsTUFBSSxLQUFLLEdBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxhQUFhO1FBQUUsRUFBQyxPQUFNLEdBQUU7WUFBQyxRQUFRLE1BQU07UUFBRTtJQUFDLEVBQUM7QUFBQTs7Ozs7NkNDb0N0eEo7QUFwQ3hCLE1BQU0sa0JBQWtCLENBQUMsV0FBVyxTQUFTLE9BQU8sWUFBYyxTQUFVLEdBQUcsVUFBVTtRQUN4RixNQUFNLElBQUksUUFBUTtRQUVsQixPQUFPLElBQUksRUFBRSxDQUFDLFNBQVM7WUFDdEIsSUFBSSxRQUFRLFdBQ1gsV0FBVyxLQUFLLENBQUMsR0FBRztnQkFDbkIsSUFBSSxRQUFRO29CQUNYLElBQUksTUFBTSxDQUFDLEVBQUUsRUFDWixPQUFPO3lCQUNEO3dCQUNOLE9BQU87d0JBQ1AsUUFBUTtvQkFDVDt1QkFFQSxRQUFRO1lBRVY7aUJBQ00sSUFBSSxRQUFRLFlBQ2xCLFdBQVcsS0FBSyxDQUFDLE9BQU87Z0JBQ3ZCLElBQUksT0FDSCxPQUFPO3FCQUVQLFFBQVE7WUFFVjtpQkFFQSxXQUFXLEtBQUs7WUFHakIsTUFBTSxPQUFPLElBQUksS0FBSyxRQUFRLFlBQVksSUFBSTtZQUM5QyxRQUFRLE1BQU0sV0FBVyxNQUFNO1FBQ2hDO0lBQ0Q7QUFFQSxNQUFNLGNBQWMsSUFBSTtBQUVULFNBQVMsS0FBSyxLQUFLLEVBQUUsT0FBTztJQUMxQyxVQUFVO1FBQ1QsU0FBUztZQUFDO1NBQXFCO1FBQy9CLFlBQVk7UUFDWixlQUFlO1FBQ2YsR0FBRyxPQUFPO0lBQ1g7SUFFQSxNQUFNLGFBQWEsT0FBTztJQUMxQixJQUFJLENBQUUsQ0FBQSxVQUFVLFFBQVMsQ0FBQSxlQUFlLFlBQVksZUFBZSxVQUFTLENBQUMsR0FDNUUsTUFBTSxJQUFJLFVBQVUsQ0FBQyw2REFBNkQsRUFBRSxVQUFVLE9BQU8sU0FBUyxXQUFXLEVBQUUsQ0FBQztJQUc3SCxNQUFNLFNBQVMsQ0FBQyxRQUFRO1FBQ3ZCLElBQUksU0FBUyxZQUFZLElBQUk7UUFFN0IsSUFBSSxDQUFDLFFBQVE7WUFDWixTQUFTLENBQUM7WUFDVixZQUFZLElBQUksUUFBUTtRQUN6QjtRQUVBLElBQUksT0FBTyxRQUNWLE9BQU8sTUFBTSxDQUFDLElBQUk7UUFHbkIsTUFBTSxRQUFRLENBQUEsVUFBVyxBQUFDLE9BQU8sWUFBWSxZQUFZLE9BQU8sUUFBUSxXQUFZLFFBQVEsVUFBVSxRQUFRLEtBQUs7UUFDbkgsTUFBTSxhQUFhLFFBQVEseUJBQXlCLFFBQVE7UUFDNUQsTUFBTSw0QkFBNkIsZUFBZSxhQUFhLFdBQVcsWUFBWSxXQUFXO1FBQ2pHLE1BQU0sV0FBVyxRQUFRLFVBQVUsUUFBUSxRQUFRLEtBQUssQ0FBQSxVQUFXLE1BQU0sWUFBWSxDQUFDLFFBQVEsUUFBUSxLQUFLLENBQUEsVUFBVyxNQUFNO1FBQzVILE1BQU0sZUFBZSxZQUFZO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDZCxPQUFPO0lBQ1I7SUFFQSxNQUFNLFFBQVEsSUFBSTtJQUVsQixNQUFNLFFBQVEsSUFBSSxNQUFNLE9BQU87UUFDOUIsT0FBTSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUk7WUFDMUIsTUFBTSxTQUFTLE1BQU0sSUFBSTtZQUV6QixJQUFJLFFBQ0gsT0FBTyxRQUFRLE1BQU0sUUFBUSxTQUFTO1lBR3ZDLE1BQU0sU0FBUyxRQUFRLGNBQWMsU0FBUyxnQkFBZ0IsUUFBUSxTQUFTLE9BQU87WUFDdEYsTUFBTSxJQUFJLFFBQVE7WUFDbEIsT0FBTyxRQUFRLE1BQU0sUUFBUSxTQUFTO1FBQ3ZDO1FBRUEsS0FBSSxNQUFNLEVBQUUsR0FBRztZQUNkLE1BQU0sV0FBVyxNQUFNLENBQUMsSUFBSTtZQUU1QixxRUFBcUU7WUFDckUsSUFBSSxDQUFDLE9BQU8sUUFBUSxRQUFRLGFBQWEsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUMvRCxPQUFPO1lBR1IsTUFBTSxTQUFTLE1BQU0sSUFBSTtZQUV6QixJQUFJLFFBQ0gsT0FBTztZQUdSLElBQUksT0FBTyxhQUFhLFlBQVk7Z0JBQ25DLE1BQU0sU0FBUyxnQkFBZ0IsVUFBVSxTQUFTLE9BQU87Z0JBQ3pELE1BQU0sSUFBSSxVQUFVO2dCQUNwQixPQUFPO1lBQ1I7WUFFQSxPQUFPO1FBQ1I7SUFDRDtJQUVBLE9BQU87QUFDUjs7O0FDOUdBLE9BQU8sVUFBVSxRQUFRLG9CQUF3QixhQUFhLFdBQVcsd0JBQXdCLE1BQU0sS0FBSzs7O0FDQTVHO0FBRUEsSUFBSSxZQUFZLENBQUM7QUFFakIsU0FBUyxtQkFBbUIsRUFBRTtJQUM1QixJQUFJLFFBQVEsU0FBUyxDQUFDLEdBQUc7SUFFekIsSUFBSSxDQUFDLE9BQU87UUFDVixRQUFRO1FBQ1IsU0FBUyxDQUFDLEdBQUcsR0FBRztJQUNsQjtJQUVBLE9BQU87QUFDVDtBQUVBLFNBQVM7SUFDUCxJQUFJO1FBQ0YsTUFBTSxJQUFJO0lBQ1osRUFBRSxPQUFPLEtBQUs7UUFDWixJQUFJLFVBQVUsQUFBQyxDQUFBLEtBQUssSUFBSSxLQUFJLEVBQUcsTUFBTTtRQUVyQyxJQUFJLFNBQ0YsMkVBQTJFO1FBQzNFLG1FQUFtRTtRQUNuRSxPQUFPLFdBQVcsT0FBTyxDQUFDLEVBQUU7SUFFaEM7SUFFQSxPQUFPO0FBQ1Q7QUFFQSxTQUFTLFdBQVcsR0FBRztJQUNyQixPQUFPLEFBQUMsQ0FBQSxLQUFLLEdBQUUsRUFBRyxRQUFRLDJFQUEyRSxRQUFRO0FBQy9HLEVBQUUsa0ZBQWtGO0FBR3BGLFNBQVMsVUFBVSxHQUFHO0lBQ3BCLElBQUksVUFBVSxBQUFDLENBQUEsS0FBSyxHQUFFLEVBQUcsTUFBTTtJQUUvQixJQUFJLENBQUMsU0FDSCxNQUFNLElBQUksTUFBTTtJQUdsQixPQUFPLE9BQU8sQ0FBQyxFQUFFO0FBQ25CO0FBRUEsUUFBUSxlQUFlO0FBQ3ZCLFFBQVEsYUFBYTtBQUNyQixRQUFRLFlBQVkiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErcGFyY2VsLXJ1bnRpbWVAMC4yNS4yL25vZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLTUyNzBjMTAyZjNmMzgxNzAuanMiLCJub2RlX21vZHVsZXMvLnBucG0vQHBsYXNtb2hxK3BhcmNlbC1yZXNvbHZlckAwLjE0LjEvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcmVzb2x2ZXIvZGlzdC9wb2x5ZmlsbHMvcmVhY3QtcmVmcmVzaC9ydW50aW1lLmpzIiwiLnBsYXNtby9zdGF0aWMvZGV2dG9vbHMudHMiLCJkZXZ0b29scy9pbmRleC50c3giLCJkZXZ0b29scy9kZXZ0b29scy50cyIsImRldnRvb2xzL3V0aWxzL2F0dGFjaERlYnVnZ2VyLnRzIiwiZGV2dG9vbHMvcGVyZm9ybUF0dGFjaC50cyIsImRldnRvb2xzL3V0aWxzL2NvbnNvbGVNZXNzYWdlTGlzdGVuZXIudHMiLCJkZXZ0b29scy91dGlscy9zZW5kVG9Ccm93c2VyQ29ubmVjdG9yLnRzIiwiZGV2dG9vbHMvdXRpbHMvdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eS50cyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3RyYW5zZm9ybWVyLWpzQDIuOS4zX0BwYXJjZWwrY29yZUAyLjkuMy9ub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImRldnRvb2xzL3V0aWxzL3Byb2Nlc3NKc29uU3RyaW5nLnRzIiwiZGV2dG9vbHMvdXRpbHMvcHJvY2Vzc0FycmF5V2l0aFNpemVMaW1pdC50cyIsImRldnRvb2xzL3V0aWxzL2NhbGN1bGF0ZU9iamVjdFNpemUudHMiLCJkZXZ0b29scy91dGlscy90cnVuY2F0ZVN0cmluZ3NJbkRhdGEudHMiLCJkZXZ0b29scy91dGlscy9kZXRhY2hEZWJ1Z2dlci50cyIsImRldnRvb2xzL3V0aWxzL2NhcHR1cmVBbmRTZW5kRWxlbWVudC50cyIsImRldnRvb2xzL3V0aWxzL3dlYnNvY2tldHMudHMiLCJkZXZ0b29scy91dGlscy93aXBlTG9ncy50cyIsInN0b3JlL2Jyb3dzZXJDb25uZWN0b3JTZXR0aW5ncy50cyIsIi4uL25vZGVfbW9kdWxlcy8ucG5wbS9AcGxhc21vaHErc3RvcmFnZUAxLjE1LjAvbm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9zdG9yYWdlL2Rpc3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvLnBucG0vcGlmeUA2LjEuMC9ub2RlX21vZHVsZXMvcGlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi44LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL3J1bnRpbWUtNTQ1OWU2MmRkZDY2ZTUxMS5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtanNAMi44LjNfQHBhcmNlbCtjb3JlQDIuOS4zL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL2hlbHBlcnMvYnVuZGxlLXVybC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVz1PYmplY3QuY3JlYXRlO3ZhciBQPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgVj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO3ZhciBHPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO3ZhciBYPU9iamVjdC5nZXRQcm90b3R5cGVPZixKPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIHE9KGUsdCxvLHIpPT57aWYodCYmdHlwZW9mIHQ9PVwib2JqZWN0XCJ8fHR5cGVvZiB0PT1cImZ1bmN0aW9uXCIpZm9yKGxldCBuIG9mIEcodCkpIUouY2FsbChlLG4pJiZuIT09byYmUChlLG4se2dldDooKT0+dFtuXSxlbnVtZXJhYmxlOiEocj1WKHQsbikpfHxyLmVudW1lcmFibGV9KTtyZXR1cm4gZX07dmFyIHo9KGUsdCxvKT0+KG89ZSE9bnVsbD9XKFgoZSkpOnt9LHEodHx8IWV8fCFlLl9fZXNNb2R1bGU/UChvLFwiZGVmYXVsdFwiLHt2YWx1ZTplLGVudW1lcmFibGU6ITB9KTpvLGUpKTt2YXIgeT1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciBIPSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEs9bmV3IFNldCh5KSxEPWU9PksuaGFzKGUpLHVlPXkuZmlsdGVyKGU9PmUuc3RhcnRzV2l0aChcIi0tXCIpJiZlLmluY2x1ZGVzKFwiPVwiKSkubWFwKGU9PmUuc3BsaXQoXCI9XCIpKS5yZWR1Y2UoKGUsW3Qsb10pPT4oZVt0XT1vLGUpLHt9KTt2YXIgZGU9RChcIi0tZHJ5LXJ1blwiKSxfPSgpPT5EKFwiLS12ZXJib3NlXCIpfHxIKCkuVkVSQk9TRT09PVwidHJ1ZVwiLGZlPV8oKTt2YXIgeD0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgaz0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLFQ9KC4uLmUpPT54KFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksQT0oLi4uZSk9PngoXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxRPTAscD0oLi4uZSk9Pl8oKSYmeChgXFx1ezFGN0UxfSAke1ErK31gLC4uLmUpO3ZhciBjPXtcImlzQ29udGVudFNjcmlwdFwiOmZhbHNlLFwiaXNCYWNrZ3JvdW5kXCI6ZmFsc2UsXCJpc1JlYWN0XCI6ZmFsc2UsXCJydW50aW1lc1wiOltcInBhZ2UtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCIvaG9tZS9tY3Jvd2UvUHJvZ3JhbW1pbmcvUGVyc29uYWwvYnJvd3Nlci10b29scy1tY3AvdW5pdmVyc2FsLWV4dGVuc2lvbi8ucGxhc21vL3N0YXRpYy9kZXZ0b29scy50c1wiLFwiYnVuZGxlSWRcIjpcIjdiMGU2MmRjYmFkM2M3Y2FcIixcImVudkhhc2hcIjpcImU3OTJmYmJkYWE3OGVlODRcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjozNDAxMX07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPWMuYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpjLnZlcmJvc2V9fTt2YXIgWT1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBaKGUpe1kuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9Wjttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGQ9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDthc3luYyBmdW5jdGlvbiBtKGU9ITEpe2U/KHAoXCJUcmlnZ2VyaW5nIGZ1bGwgcmVsb2FkXCIpLGQucnVudGltZS5zZW5kTWVzc2FnZSh7X19wbGFzbW9fZnVsbF9yZWxvYWRfXzohMH0pKTpnbG9iYWxUaGlzLmxvY2F0aW9uPy5yZWxvYWQ/LigpfWZ1bmN0aW9uIHcoKXtyZXR1cm4hYy5ob3N0fHxjLmhvc3Q9PT1cIjAuMC4wLjBcIj9sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKT09PTA/bG9jYXRpb24uaG9zdG5hbWU6XCJsb2NhbGhvc3RcIjpjLmhvc3R9ZnVuY3Rpb24gTCgpe3JldHVybiFjLmhvc3R8fGMuaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6Yy5ob3N0fWZ1bmN0aW9uIGYoKXtyZXR1cm4gYy5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBTPVwiX19wbGFzbW9fcnVudGltZV9wYWdlX1wiO3ZhciBpPXtjaGVja2VkQXNzZXRzOnt9LGFzc2V0c1RvRGlzcG9zZTpbXSxhc3NldHNUb0FjY2VwdDpbXX0sQj0oKT0+e2kuY2hlY2tlZEFzc2V0cz17fSxpLmFzc2V0c1RvRGlzcG9zZT1bXSxpLmFzc2V0c1RvQWNjZXB0PVtdfTtmdW5jdGlvbiB1KGUsdCl7bGV0e21vZHVsZXM6b309ZTtpZighbylyZXR1cm5bXTtsZXQgcj1bXSxuLHMsYTtmb3IobiBpbiBvKWZvcihzIGluIG9bbl1bMV0pYT1vW25dWzFdW3NdLChhPT09dHx8QXJyYXkuaXNBcnJheShhKSYmYVthLmxlbmd0aC0xXT09PXQpJiZyLnB1c2goW2Usbl0pO3JldHVybiBlLnBhcmVudCYmKHI9ci5jb25jYXQodShlLnBhcmVudCx0KSkpLHJ9ZnVuY3Rpb24gUihlLHQsbyl7aWYoQyhlLHQsbykpcmV0dXJuITA7bGV0IHI9dShtb2R1bGUuYnVuZGxlLnJvb3QsdCksbj0hMTtmb3IoO3IubGVuZ3RoPjA7KXtsZXRbcyxhXT1yLnNoaWZ0KCk7aWYoQyhzLGEsbnVsbCkpbj0hMDtlbHNle2xldCBnPXUobW9kdWxlLmJ1bmRsZS5yb290LGEpO2lmKGcubGVuZ3RoPT09MCl7bj0hMTticmVha31yLnB1c2goLi4uZyl9fXJldHVybiBufWZ1bmN0aW9uIEMoZSx0LG8pe2xldHttb2R1bGVzOnJ9PWU7aWYoIXIpcmV0dXJuITE7aWYobyYmIW9bZS5ITVJfQlVORExFX0lEXSlyZXR1cm4gZS5wYXJlbnQ/UihlLnBhcmVudCx0LG8pOiEwO2lmKGkuY2hlY2tlZEFzc2V0c1t0XSlyZXR1cm4hMDtpLmNoZWNrZWRBc3NldHNbdF09ITA7bGV0IG49ZS5jYWNoZVt0XTtyZXR1cm4gaS5hc3NldHNUb0Rpc3Bvc2UucHVzaChbZSx0XSksIW58fG4uaG90JiZuLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aD8oaS5hc3NldHNUb0FjY2VwdC5wdXNoKFtlLHRdKSwhMCk6ITF9ZnVuY3Rpb24gTShlLHQpe2xldHttb2R1bGVzOm99PWU7cmV0dXJuIG8/ISFvW3RdOiExfWZ1bmN0aW9uIGVlKGUpe2lmKGUudHlwZT09PVwianNcIiYmdHlwZW9mIGRvY3VtZW50PFwidVwiKXJldHVybiBuZXcgUHJvbWlzZSgodCxvKT0+e2xldCByPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7ci5zcmM9YCR7ZS51cmx9P3Q9JHtEYXRlLm5vdygpfWAsZS5vdXRwdXRGb3JtYXQ9PT1cImVzbW9kdWxlXCImJihyLnR5cGU9XCJtb2R1bGVcIiksci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCgpPT50KHIpKSxyLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCgpPT5vKG5ldyBFcnJvcihgRmFpbGVkIHRvIGRvd25sb2FkIGFzc2V0OiAke2UuaWR9YCkpKSxkb2N1bWVudC5oZWFkPy5hcHBlbmRDaGlsZChyKX0pfWFzeW5jIGZ1bmN0aW9uIE8oZSl7Z2xvYmFsLnBhcmNlbEhvdFVwZGF0ZT1PYmplY3QuY3JlYXRlKG51bGwpLGUuZm9yRWFjaChvPT57by51cmw9ZC5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGAke28udXJsfT90PSR7RGF0ZS5ub3coKX1gKSl9KTtsZXQgdD1hd2FpdCBQcm9taXNlLmFsbChlLm1hcChlZSkpO3RyeXtlLmZvckVhY2goZnVuY3Rpb24obyl7JChtb2R1bGUuYnVuZGxlLnJvb3Qsbyl9KX1maW5hbGx5e2RlbGV0ZSBnbG9iYWwucGFyY2VsSG90VXBkYXRlLHQmJnQuZm9yRWFjaChvPT57byYmZG9jdW1lbnQuaGVhZD8ucmVtb3ZlQ2hpbGQobyl9KX19ZnVuY3Rpb24gdGUoZSl7bGV0IHQ9ZS5jbG9uZU5vZGUoKTt0Lm9ubG9hZD1mdW5jdGlvbigpe2UucGFyZW50Tm9kZSE9PW51bGwmJmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKX0sdC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLnNwbGl0KFwiP1wiKVswXStcIj9cIitEYXRlLm5vdygpKSxlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsZS5uZXh0U2libGluZyl9dmFyIEU9bnVsbDtmdW5jdGlvbiBvZSgpe0V8fChFPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtsZXQgZT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKTtmb3IodmFyIHQ9MDt0PGUubGVuZ3RoO3QrKyl7bGV0IG89ZVt0XS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpLHI9dygpLG49cj09PVwibG9jYWxob3N0XCI/bmV3IFJlZ0V4cChcIl4oaHR0cHM/OlxcXFwvXFxcXC8oMC4wLjAuMHwxMjcuMC4wLjEpfGxvY2FsaG9zdCk6XCIrZigpKS50ZXN0KG8pOm8uaW5kZXhPZihyK1wiOlwiK2YoKSk7L15odHRwcz86XFwvXFwvL2kudGVzdChvKSYmby5pbmRleE9mKGxvY2F0aW9uLm9yaWdpbikhPT0wJiYhbnx8dGUoZVt0XSl9RT1udWxsfSw0NykpfWZ1bmN0aW9uICQoZSx0KXtsZXR7bW9kdWxlczpvfT1lO2lmKG8pe2lmKHQudHlwZT09PVwiY3NzXCIpb2UoKTtlbHNlIGlmKHQudHlwZT09PVwianNcIil7bGV0IHI9dC5kZXBzQnlCdW5kbGVbZS5ITVJfQlVORExFX0lEXTtpZihyKXtpZihvW3QuaWRdKXtsZXQgcz1vW3QuaWRdWzFdO2ZvcihsZXQgYSBpbiBzKWlmKCFyW2FdfHxyW2FdIT09c1thXSl7bGV0IGw9c1thXTt1KG1vZHVsZS5idW5kbGUucm9vdCxsKS5sZW5ndGg9PT0xJiZiKG1vZHVsZS5idW5kbGUucm9vdCxsKX19bGV0IG49Z2xvYmFsLnBhcmNlbEhvdFVwZGF0ZVt0LmlkXTtvW3QuaWRdPVtuLHJdfWVsc2UgZS5wYXJlbnQmJiQoZS5wYXJlbnQsdCl9fX1mdW5jdGlvbiBiKGUsdCl7bGV0IG89ZS5tb2R1bGVzO2lmKG8paWYob1t0XSl7bGV0IHI9b1t0XVsxXSxuPVtdO2ZvcihsZXQgcyBpbiByKXUobW9kdWxlLmJ1bmRsZS5yb290LHJbc10pLmxlbmd0aD09PTEmJm4ucHVzaChyW3NdKTtkZWxldGUgb1t0XSxkZWxldGUgZS5jYWNoZVt0XSxuLmZvckVhY2gocz0+e2IobW9kdWxlLmJ1bmRsZS5yb290LHMpfSl9ZWxzZSBlLnBhcmVudCYmYihlLnBhcmVudCx0KX1mdW5jdGlvbiB2KGUsdCl7bGV0IG89ZS5jYWNoZVt0XTtlLmhvdERhdGFbdF09e30sbyYmby5ob3QmJihvLmhvdC5kYXRhPWUuaG90RGF0YVt0XSksbyYmby5ob3QmJm8uaG90Ll9kaXNwb3NlQ2FsbGJhY2tzLmxlbmd0aCYmby5ob3QuX2Rpc3Bvc2VDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihyKXtyKGUuaG90RGF0YVt0XSl9KSxkZWxldGUgZS5jYWNoZVt0XX1mdW5jdGlvbiBJKGUsdCl7ZSh0KTtsZXQgbz1lLmNhY2hlW3RdO2lmKG8mJm8uaG90JiZvLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aCl7bGV0IHI9dShtb2R1bGUuYnVuZGxlLnJvb3QsdCk7by5ob3QuX2FjY2VwdENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2xldCBzPW4oKCk9PnIpO3MmJnMubGVuZ3RoJiYocy5mb3JFYWNoKChbYSxsXSk9Pnt2KGEsbCl9KSxpLmFzc2V0c1RvQWNjZXB0LnB1c2guYXBwbHkoaS5hc3NldHNUb0FjY2VwdCxzKSl9KX19ZnVuY3Rpb24gcmUoZT1mKCkpe2xldCB0PUwoKTtyZXR1cm5gJHtjLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIn06Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBuZShlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZrKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gTihlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQocmUoKSk7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixhc3luYyBmdW5jdGlvbihvKXtsZXQgcj1KU09OLnBhcnNlKG8uZGF0YSk7aWYoci50eXBlPT09XCJ1cGRhdGVcIiYmYXdhaXQgZShyLmFzc2V0cyksci50eXBlPT09XCJlcnJvclwiKWZvcihsZXQgbiBvZiByLmRpYWdub3N0aWNzLmFuc2kpe2xldCBzPW4uY29kZWZyYW1lfHxuLnN0YWNrO0EoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrbi5tZXNzYWdlK2BcbmArcytgXG5cbmArbi5oaW50cy5qb2luKGBcbmApKX19KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLG5lKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9PntUKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7Yy5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e0EoYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtjLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciBqPXoocmVxdWlyZShcInJlYWN0LXJlZnJlc2gvcnVudGltZVwiKSk7YXN5bmMgZnVuY3Rpb24gRigpe2ouZGVmYXVsdC5pbmplY3RJbnRvR2xvYmFsSG9vayh3aW5kb3cpLHdpbmRvdy4kUmVmcmVzaFJlZyQ9ZnVuY3Rpb24oKXt9LHdpbmRvdy4kUmVmcmVzaFNpZyQ9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGV9fX12YXIgc2U9YCR7U30ke21vZHVsZS5pZH1fX2AsaCxVPW1vZHVsZS5idW5kbGUucGFyZW50O2lmKCFVfHwhVS5pc1BhcmNlbFJlcXVpcmUpe3RyeXtoPWQ/LnJ1bnRpbWUuY29ubmVjdCh7bmFtZTpzZX0pLGgub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57bSgpfSksYy5pc1JlYWN0fHxoLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigoKT0+e20oKX0pfWNhdGNoKGUpe3AoZSl9Tihhc3luYyBlPT57aWYocChcIlBhZ2UgcnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYy5pc1JlYWN0KXtCKCk7bGV0IHQ9ZS5maWx0ZXIocj0+ci5lbnZIYXNoPT09Yy5lbnZIYXNoKTtpZih0LnNvbWUocj0+ci50eXBlPT09XCJjc3NcInx8ci50eXBlPT09XCJqc1wiJiZSKG1vZHVsZS5idW5kbGUucm9vdCxyLmlkLHIuZGVwc0J5QnVuZGxlKSkpdHJ5e2F3YWl0IE8odCk7bGV0IHI9e307Zm9yKGxldFtzLGFdb2YgaS5hc3NldHNUb0Rpc3Bvc2UpclthXXx8KHYocyxhKSxyW2FdPSEwKTtsZXQgbj17fTtmb3IobGV0IHM9MDtzPGkuYXNzZXRzVG9BY2NlcHQubGVuZ3RoO3MrKyl7bGV0W2EsbF09aS5hc3NldHNUb0FjY2VwdFtzXTtuW2xdfHwoSShhLGwpLG5bbF09ITApfX1jYXRjaChyKXtjLnZlcmJvc2U9PT1cInRydWVcIiYmKGNvbnNvbGUudHJhY2UociksYWxlcnQoSlNPTi5zdHJpbmdpZnkocikpKSxhd2FpdCBtKCEwKX19ZWxzZXtsZXQgdD1lLmZpbHRlcihvPT5vLmVudkhhc2g9PT1jLmVudkhhc2gpLnNvbWUobz0+TShtb2R1bGUuYnVuZGxlLG8uaWQpKTtwKFwiUGFnZSBydW50aW1lIC1cIix7c291cmNlQ2hhbmdlZDp0fSksdCYmaC5wb3N0TWVzc2FnZSh7X19wbGFzbW9fcGFnZV9jaGFuZ2VkX186ITB9KX19KX1jLmlzUmVhY3QmJihwKFwiSW5qZWN0aW5nIHJlYWN0IHJlZnJlc2hcIiksRigpKTtcbiIsInZhciBvZT1PYmplY3QuY3JlYXRlO3ZhciBIPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgYWU9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjt2YXIgdWU9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7dmFyIHNlPU9iamVjdC5nZXRQcm90b3R5cGVPZixsZT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O3ZhciB6PShvLGYpPT4oKT0+KGZ8fG8oKGY9e2V4cG9ydHM6e319KS5leHBvcnRzLGYpLGYuZXhwb3J0cyksY2U9KG8sZik9Pntmb3IodmFyIHMgaW4gZilIKG8scyx7Z2V0OmZbc10sZW51bWVyYWJsZTohMH0pfSxEPShvLGYscyx5KT0+e2lmKGYmJnR5cGVvZiBmPT1cIm9iamVjdFwifHx0eXBlb2YgZj09XCJmdW5jdGlvblwiKWZvcihsZXQgbSBvZiB1ZShmKSkhbGUuY2FsbChvLG0pJiZtIT09cyYmSChvLG0se2dldDooKT0+ZlttXSxlbnVtZXJhYmxlOiEoeT1hZShmLG0pKXx8eS5lbnVtZXJhYmxlfSk7cmV0dXJuIG99LFM9KG8sZixzKT0+KEQobyxmLFwiZGVmYXVsdFwiKSxzJiZEKHMsZixcImRlZmF1bHRcIikpLEc9KG8sZixzKT0+KHM9byE9bnVsbD9vZShzZShvKSk6e30sRChmfHwhb3x8IW8uX19lc01vZHVsZT9IKHMsXCJkZWZhdWx0XCIse3ZhbHVlOm8sZW51bWVyYWJsZTohMH0pOnMsbykpLGRlPW89PkQoSCh7fSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxvKTt2YXIgTj16KGg9PntcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1TeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIiksZj1TeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKSxzPXR5cGVvZiBXZWFrTWFwPT1cImZ1bmN0aW9uXCI/V2Vha01hcDpNYXAseT1uZXcgTWFwLG09bmV3IHMsYj1uZXcgcyxqPW5ldyBzLEU9W10sQz1uZXcgTWFwLE89bmV3IE1hcCxwPW5ldyBTZXQsXz1uZXcgU2V0LEY9dHlwZW9mIFdlYWtNYXA9PVwiZnVuY3Rpb25cIj9uZXcgV2Vha01hcDpudWxsLFQ9ITE7ZnVuY3Rpb24gQihlKXtpZihlLmZ1bGxLZXkhPT1udWxsKXJldHVybiBlLmZ1bGxLZXk7dmFyIHI9ZS5vd25LZXksbjt0cnl7bj1lLmdldEN1c3RvbUhvb2tzKCl9Y2F0Y2goaSl7cmV0dXJuIGUuZm9yY2VSZXNldD0hMCxlLmZ1bGxLZXk9cixyfWZvcih2YXIgdD0wO3Q8bi5sZW5ndGg7dCsrKXt2YXIgbD1uW3RdO2lmKHR5cGVvZiBsIT1cImZ1bmN0aW9uXCIpcmV0dXJuIGUuZm9yY2VSZXNldD0hMCxlLmZ1bGxLZXk9cixyO3ZhciBkPWIuZ2V0KGwpO2lmKGQhPT12b2lkIDApe3ZhciBhPUIoZCk7ZC5mb3JjZVJlc2V0JiYoZS5mb3JjZVJlc2V0PSEwKSxyKz1cIlxcbi0tLVxcblwiK2F9fXJldHVybiBlLmZ1bGxLZXk9cixyfWZ1bmN0aW9uIHEoZSxyKXt2YXIgbj1iLmdldChlKSx0PWIuZ2V0KHIpO3JldHVybiBuPT09dm9pZCAwJiZ0PT09dm9pZCAwPyEwOiEobj09PXZvaWQgMHx8dD09PXZvaWQgMHx8QihuKSE9PUIodCl8fHQuZm9yY2VSZXNldCl9ZnVuY3Rpb24gJChlKXtyZXR1cm4gZS5wcm90b3R5cGUmJmUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnR9ZnVuY3Rpb24gayhlLHIpe3JldHVybiAkKGUpfHwkKHIpPyExOiEhcShlLHIpfWZ1bmN0aW9uIFkoZSl7cmV0dXJuIGouZ2V0KGUpfWZ1bmN0aW9uIFooZSl7dmFyIHI9bmV3IE1hcDtyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKG4sdCl7ci5zZXQodCxuKX0pLHJ9ZnVuY3Rpb24gVyhlKXt2YXIgcj1uZXcgU2V0O3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24obil7ci5hZGQobil9KSxyfWZ1bmN0aW9uIE0oZSxyKXt0cnl7cmV0dXJuIGVbcl19Y2F0Y2gobil7cmV0dXJufX1mdW5jdGlvbiBKKCl7aWYoRS5sZW5ndGg9PT0wfHxUKXJldHVybiBudWxsO1Q9ITA7dHJ5e3ZhciBlPW5ldyBTZXQscj1uZXcgU2V0LG49RTtFPVtdLG4uZm9yRWFjaChmdW5jdGlvbih1KXt2YXIgYz11WzBdLHY9dVsxXSxSPWMuY3VycmVudDtqLnNldChSLGMpLGouc2V0KHYsYyksYy5jdXJyZW50PXYsayhSLHYpP3IuYWRkKGMpOmUuYWRkKGMpfSk7dmFyIHQ9e3VwZGF0ZWRGYW1pbGllczpyLHN0YWxlRmFtaWxpZXM6ZX07Qy5mb3JFYWNoKGZ1bmN0aW9uKHUpe3Uuc2V0UmVmcmVzaEhhbmRsZXIoWSl9KTt2YXIgbD0hMSxkPW51bGwsYT1XKF8pLGk9VyhwKSxnPVooTyk7aWYoYS5mb3JFYWNoKGZ1bmN0aW9uKHUpe3ZhciBjPWcuZ2V0KHUpO2lmKGM9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgaGVscGVycyBmb3IgYSByb290LiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0IFJlZnJlc2guXCIpO2lmKF8uaGFzKHUpLEYhPT1udWxsJiZGLmhhcyh1KSl7dmFyIHY9Ri5nZXQodSk7dHJ5e2Muc2NoZWR1bGVSb290KHUsdil9Y2F0Y2goUil7bHx8KGw9ITAsZD1SKX19fSksaS5mb3JFYWNoKGZ1bmN0aW9uKHUpe3ZhciBjPWcuZ2V0KHUpO2lmKGM9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgaGVscGVycyBmb3IgYSByb290LiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0IFJlZnJlc2guXCIpO3AuaGFzKHUpO3RyeXtjLnNjaGVkdWxlUmVmcmVzaCh1LHQpfWNhdGNoKHYpe2x8fChsPSEwLGQ9dil9fSksbCl0aHJvdyBkO3JldHVybiB0fWZpbmFsbHl7VD0hMX19ZnVuY3Rpb24gUChlLHIpe3tpZihlPT09bnVsbHx8dHlwZW9mIGUhPVwiZnVuY3Rpb25cIiYmdHlwZW9mIGUhPVwib2JqZWN0XCJ8fG0uaGFzKGUpKXJldHVybjt2YXIgbj15LmdldChyKTtpZihuPT09dm9pZCAwPyhuPXtjdXJyZW50OmV9LHkuc2V0KHIsbikpOkUucHVzaChbbixlXSksbS5zZXQoZSxuKSx0eXBlb2YgZT09XCJvYmplY3RcIiYmZSE9PW51bGwpc3dpdGNoKE0oZSxcIiQkdHlwZW9mXCIpKXtjYXNlIG86UChlLnJlbmRlcixyK1wiJHJlbmRlclwiKTticmVhaztjYXNlIGY6UChlLnR5cGUscitcIiR0eXBlXCIpO2JyZWFrfX19ZnVuY3Rpb24gSyhlLHIpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmYXJndW1lbnRzWzJdIT09dm9pZCAwP2FyZ3VtZW50c1syXTohMSx0PWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwO2lmKGIuaGFzKGUpfHxiLnNldChlLHtmb3JjZVJlc2V0Om4sb3duS2V5OnIsZnVsbEtleTpudWxsLGdldEN1c3RvbUhvb2tzOnR8fGZ1bmN0aW9uKCl7cmV0dXJuW119fSksdHlwZW9mIGU9PVwib2JqZWN0XCImJmUhPT1udWxsKXN3aXRjaChNKGUsXCIkJHR5cGVvZlwiKSl7Y2FzZSBvOksoZS5yZW5kZXIscixuLHQpO2JyZWFrO2Nhc2UgZjpLKGUudHlwZSxyLG4sdCk7YnJlYWt9fWZ1bmN0aW9uIHgoZSl7e3ZhciByPWIuZ2V0KGUpO3IhPT12b2lkIDAmJkIocil9fWZ1bmN0aW9uIFEoZSl7cmV0dXJuIHkuZ2V0KGUpfWZ1bmN0aW9uIFgoZSl7cmV0dXJuIG0uZ2V0KGUpfWZ1bmN0aW9uIGVlKGUpe3t2YXIgcj1uZXcgU2V0O3JldHVybiBwLmZvckVhY2goZnVuY3Rpb24obil7dmFyIHQ9Ty5nZXQobik7aWYodD09PXZvaWQgMCl0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBoZWxwZXJzIGZvciBhIHJvb3QuIFRoaXMgaXMgYSBidWcgaW4gUmVhY3QgUmVmcmVzaC5cIik7dmFyIGw9dC5maW5kSG9zdEluc3RhbmNlc0ZvclJlZnJlc2gobixlKTtsLmZvckVhY2goZnVuY3Rpb24oZCl7ci5hZGQoZCl9KX0pLHJ9fWZ1bmN0aW9uIHJlKGUpe3t2YXIgcj1lLl9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXztpZihyPT09dm9pZCAwKXt2YXIgbj0wO2UuX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fPXI9e3JlbmRlcmVyczpuZXcgTWFwLHN1cHBvcnRzRmliZXI6ITAsaW5qZWN0OmZ1bmN0aW9uKGEpe3JldHVybiBuKyt9LG9uU2NoZWR1bGVGaWJlclJvb3Q6ZnVuY3Rpb24oYSxpLGcpe30sb25Db21taXRGaWJlclJvb3Q6ZnVuY3Rpb24oYSxpLGcsdSl7fSxvbkNvbW1pdEZpYmVyVW5tb3VudDpmdW5jdGlvbigpe319fWlmKHIuaXNEaXNhYmxlZCl7Y29uc29sZS53YXJuKFwiU29tZXRoaW5nIGhhcyBzaGltbWVkIHRoZSBSZWFjdCBEZXZUb29scyBnbG9iYWwgaG9vayAoX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fKS4gRmFzdCBSZWZyZXNoIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhpcyBzaGltIGFuZCB3aWxsIGJlIGRpc2FibGVkLlwiKTtyZXR1cm59dmFyIHQ9ci5pbmplY3Q7ci5pbmplY3Q9ZnVuY3Rpb24oYSl7dmFyIGk9dC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7cmV0dXJuIHR5cGVvZiBhLnNjaGVkdWxlUmVmcmVzaD09XCJmdW5jdGlvblwiJiZ0eXBlb2YgYS5zZXRSZWZyZXNoSGFuZGxlcj09XCJmdW5jdGlvblwiJiZDLnNldChpLGEpLGl9LHIucmVuZGVyZXJzLmZvckVhY2goZnVuY3Rpb24oYSxpKXt0eXBlb2YgYS5zY2hlZHVsZVJlZnJlc2g9PVwiZnVuY3Rpb25cIiYmdHlwZW9mIGEuc2V0UmVmcmVzaEhhbmRsZXI9PVwiZnVuY3Rpb25cIiYmQy5zZXQoaSxhKX0pO3ZhciBsPXIub25Db21taXRGaWJlclJvb3QsZD1yLm9uU2NoZWR1bGVGaWJlclJvb3R8fGZ1bmN0aW9uKCl7fTtyLm9uU2NoZWR1bGVGaWJlclJvb3Q9ZnVuY3Rpb24oYSxpLGcpe3JldHVybiBUfHwoXy5kZWxldGUoaSksRiE9PW51bGwmJkYuc2V0KGksZykpLGQuYXBwbHkodGhpcyxhcmd1bWVudHMpfSxyLm9uQ29tbWl0RmliZXJSb290PWZ1bmN0aW9uKGEsaSxnLHUpe3ZhciBjPUMuZ2V0KGEpO2lmKGMhPT12b2lkIDApe08uc2V0KGksYyk7dmFyIHY9aS5jdXJyZW50LFI9di5hbHRlcm5hdGU7aWYoUiE9PW51bGwpe3ZhciBMPVIubWVtb2l6ZWRTdGF0ZSE9bnVsbCYmUi5tZW1vaXplZFN0YXRlLmVsZW1lbnQhPW51bGwmJnAuaGFzKGkpLEE9di5tZW1vaXplZFN0YXRlIT1udWxsJiZ2Lm1lbW9pemVkU3RhdGUuZWxlbWVudCE9bnVsbDshTCYmQT8ocC5hZGQoaSksXy5kZWxldGUoaSkpOkwmJkF8fChMJiYhQT8ocC5kZWxldGUoaSksdT9fLmFkZChpKTpPLmRlbGV0ZShpKSk6IUwmJiFBJiZ1JiZfLmFkZChpKSl9ZWxzZSBwLmFkZChpKX1yZXR1cm4gbC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX1mdW5jdGlvbiBuZSgpe3JldHVybiExfWZ1bmN0aW9uIHRlKCl7cmV0dXJuIHAuc2l6ZX1mdW5jdGlvbiBmZSgpe3t2YXIgZSxyLG49ITE7cmV0dXJuIGZ1bmN0aW9uKHQsbCxkLGEpe2lmKHR5cGVvZiBsPT1cInN0cmluZ1wiKXJldHVybiBlfHwoZT10LHI9dHlwZW9mIGE9PVwiZnVuY3Rpb25cIiksdCE9bnVsbCYmKHR5cGVvZiB0PT1cImZ1bmN0aW9uXCJ8fHR5cGVvZiB0PT1cIm9iamVjdFwiKSYmSyh0LGwsZCxhKSx0OyFuJiZyJiYobj0hMCx4KGUpKX19fWZ1bmN0aW9uIGllKGUpe3N3aXRjaCh0eXBlb2YgZSl7Y2FzZVwiZnVuY3Rpb25cIjp7aWYoZS5wcm90b3R5cGUhPW51bGwpe2lmKGUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpcmV0dXJuITA7dmFyIHI9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5wcm90b3R5cGUpO2lmKHIubGVuZ3RoPjF8fHJbMF0hPT1cImNvbnN0cnVjdG9yXCJ8fGUucHJvdG90eXBlLl9fcHJvdG9fXyE9PU9iamVjdC5wcm90b3R5cGUpcmV0dXJuITF9dmFyIG49ZS5uYW1lfHxlLmRpc3BsYXlOYW1lO3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcIiYmL15bQS1aXS8udGVzdChuKX1jYXNlXCJvYmplY3RcIjp7aWYoZSE9bnVsbClzd2l0Y2goTShlLFwiJCR0eXBlb2ZcIikpe2Nhc2UgbzpjYXNlIGY6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX1yZXR1cm4hMX1kZWZhdWx0OnJldHVybiExfX1oLl9nZXRNb3VudGVkUm9vdENvdW50PXRlLGguY29sbGVjdEN1c3RvbUhvb2tzRm9yU2lnbmF0dXJlPXgsaC5jcmVhdGVTaWduYXR1cmVGdW5jdGlvbkZvclRyYW5zZm9ybT1mZSxoLmZpbmRBZmZlY3RlZEhvc3RJbnN0YW5jZXM9ZWUsaC5nZXRGYW1pbHlCeUlEPVEsaC5nZXRGYW1pbHlCeVR5cGU9WCxoLmhhc1VucmVjb3ZlcmFibGVFcnJvcnM9bmUsaC5pbmplY3RJbnRvR2xvYmFsSG9vaz1yZSxoLmlzTGlrZWx5Q29tcG9uZW50VHlwZT1pZSxoLnBlcmZvcm1SZWFjdFJlZnJlc2g9SixoLnJlZ2lzdGVyPVAsaC5zZXRTaWduYXR1cmU9S30pKCl9KTt2YXIgST16KChwZSxWKT0+e1widXNlIHN0cmljdFwiO1YuZXhwb3J0cz1OKCl9KTt2YXIgdz17fTtjZSh3LHtkZWZhdWx0OigpPT5oZX0pO21vZHVsZS5leHBvcnRzPWRlKHcpO3ZhciBVPUcoSSgpKTtTKHcsRyhJKCkpLG1vZHVsZS5leHBvcnRzKTt2YXIgaGU9VS5kZWZhdWx0O1xuLyohIEJ1bmRsZWQgbGljZW5zZSBpbmZvcm1hdGlvbjpcblxucmVhY3QtcmVmcmVzaC9janMvcmVhY3QtcmVmcmVzaC1ydW50aW1lLmRldmVsb3BtZW50LmpzOlxuICAoKipcbiAgICogQGxpY2Vuc2UgUmVhY3RcbiAgICogcmVhY3QtcmVmcmVzaC1ydW50aW1lLmRldmVsb3BtZW50LmpzXG4gICAqXG4gICAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICAgKlxuICAgKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAgICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICAgKilcbiovXG4iLCIvLyBAdHMtbm9jaGVja1xuaW1wb3J0IFwiLi4vLi4vZGV2dG9vbHMvaW5kZXgudHN4XCJcbiIsImltcG9ydCBcIi4vZGV2dG9vbHNcIlxuXG5pbXBvcnQgSFRNTCBmcm9tIFwidXJsOi4vcGFuZWxzL3BhbmVsLmh0bWxcIlxuXG5jaHJvbWUuZGV2dG9vbHMucGFuZWxzLmNyZWF0ZShcbiAgXCJCcm93c2VyVG9vbHMgTUNQXCIsXG4gIG51bGwsXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL1BsYXNtb0hRL3BsYXNtby9pc3N1ZXMvMTA2I2lzc3VlY29tbWVudC0xMTg4NTM5NjI1XG4gIEhUTUwuc3BsaXQoXCIvXCIpLnBvcCgpXG4pXG5cbmZ1bmN0aW9uIEluZGV4RGV2dG9vbHMoKSB7XG4gIHJldHVybiAoXG4gICAgPGgyPlxuICAgICAgV2VsY29tZSB0byB5b3VyIDxhIGhyZWY9XCJodHRwczovL3d3dy5wbGFzbW8uY29tXCI+UGxhc21vPC9hPiBFeHRlbnNpb24hXG4gICAgPC9oMj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleERldnRvb2xzXG4iLCIvLyBkZXZ0b29scy5qc1xuXG5pbXBvcnQgeyBhdHRhY2hEZWJ1Z2dlciB9IGZyb20gXCIuL3V0aWxzL2F0dGFjaERlYnVnZ2VyXCJcbmltcG9ydCB7IGNhcHR1cmVBbmRTZW5kRWxlbWVudCB9IGZyb20gXCIuL3V0aWxzL2NhcHR1cmVBbmRTZW5kRWxlbWVudFwiXG5pbXBvcnQgeyBkZXRhY2hEZWJ1Z2dlciwgaXNEZWJ1Z2dlckF0dGFjaGVkIH0gZnJvbSBcIi4vdXRpbHMvZGV0YWNoRGVidWdnZXJcIlxuaW1wb3J0IHsgc2VuZFRvQnJvd3NlckNvbm5lY3RvciB9IGZyb20gXCIuL3V0aWxzL3NlbmRUb0Jyb3dzZXJDb25uZWN0b3JcIlxuaW1wb3J0IHtcbiAgY2xlYW51cFdlYlNvY2tldFJlc291cmNlcyxcbiAgaGFuZGxlUmVjb25uZWN0QWZ0ZXJQYWdlUmVmcmVzaCxcbiAgc2V0dXBXZWJTb2NrZXQsXG4gIHdzXG59IGZyb20gXCIuL3V0aWxzL3dlYnNvY2tldHNcIlxuaW1wb3J0IHsgd2lwZUxvZ3MgfSBmcm9tIFwiLi91dGlscy93aXBlTG9nc1wiXG5pbXBvcnQge1xuICBnZXRTZXR0aW5ncyxcbiAgb25TZXR0aW5nc0NoYW5nZWQsXG59IGZyb20gXCIuLi9zdG9yZS9icm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIlxuaW1wb3J0IHR5cGUgeyBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MgfSBmcm9tIFwiLi4vc3RvcmUvYnJvd3NlckNvbm5lY3RvclNldHRpbmdzXCJcblxuLy8gSW5pdGlhbGl6ZSBzZXR0aW5ncyB3aXRoIGRlZmF1bHRzXG5leHBvcnQgbGV0IGRldnRvb2xzU2V0dGluZ3M6IEJyb3dzZXJDb25uZWN0b3JTZXR0aW5nc1xuXG4vLyBLZWVwIHRyYWNrIG9mIGRlYnVnZ2VyIHN0YXRlXG5leHBvcnQgY29uc3QgY3VycmVudFRhYklkID0gY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZFxuXG4vLyBMb2FkIHNldHRpbmdzIG9uIHN0YXJ0dXBcbmdldFNldHRpbmdzKCkudGhlbihzZXR0aW5ncyA9PiB7XG4gIGRldnRvb2xzU2V0dGluZ3MgPSBzZXR0aW5nc1xuICBcbiAgLy8gSW5pdGlhbGl6ZSBXZWJTb2NrZXQgY29ubmVjdGlvbiB3aGVuIERldlRvb2xzIG9wZW5zXG4gIHNldHVwV2ViU29ja2V0KGRldnRvb2xzU2V0dGluZ3MpXG59KVxuXG4vLyBMaXN0ZW4gZm9yIHNldHRpbmdzIHVwZGF0ZXNcbm9uU2V0dGluZ3NDaGFuZ2VkKHNldHRpbmdzID0+IHtcbiAgY29uc3Qgb2xkU2V0dGluZ3MgPSBkZXZ0b29sc1NldHRpbmdzXG4gIGRldnRvb2xzU2V0dGluZ3MgPSBzZXR0aW5nc1xuXG4gIC8vIElmIHNlcnZlciBzZXR0aW5ncyBjaGFuZ2VkIGFuZCB3ZSBoYXZlIGEgV2ViU29ja2V0LCByZWNvbm5lY3RcbiAgaWYgKFxuICAgIHdzICYmXG4gICAgKG9sZFNldHRpbmdzLnNlcnZlckhvc3QgIT09IHNldHRpbmdzLnNlcnZlckhvc3QgfHxcbiAgICAgIG9sZFNldHRpbmdzLnNlcnZlclBvcnQgIT09IHNldHRpbmdzLnNlcnZlclBvcnQpXG4gICkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIHNldHRpbmdzIGNoYW5nZWQsIHJlY29ubmVjdGluZyBXZWJTb2NrZXQuLi5cIilcbiAgICBoYW5kbGVSZWNvbm5lY3RBZnRlclBhZ2VSZWZyZXNoKHNldHRpbmdzKVxuICB9XG59KVxuXG4vLyBMaXN0ZW4gZm9yIHBhZ2UgcmVmcmVzaGVzXG5jaHJvbWUuZGV2dG9vbHMubmV0d29yay5vbk5hdmlnYXRlZC5hZGRMaXN0ZW5lcigodXJsKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiUGFnZSBuYXZpZ2F0ZWQvcmVmcmVzaGVkIC0gd2lwaW5nIGxvZ3NcIilcbiAgd2lwZUxvZ3MoKVxuXG4gIC8vIFNlbmQgdGhlIG5ldyBVUkwgdG8gdGhlIHNlcnZlclxuICBpZiAod3MgJiYgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4gJiYgdXJsKSB7XG4gICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBTZW5kaW5nIHBhZ2UtbmF2aWdhdGVkIGV2ZW50IHdpdGggVVJMOlwiLCB1cmwpXG4gICAgd3Muc2VuZChcbiAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdHlwZTogXCJwYWdlLW5hdmlnYXRlZFwiLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKVxuICAgICAgfSlcbiAgICApXG4gIH1cbn0pXG5cbi8vIDEpIExpc3RlbiBmb3IgbmV0d29yayByZXF1ZXN0c1xuY2hyb21lLmRldnRvb2xzLm5ldHdvcmsub25SZXF1ZXN0RmluaXNoZWQuYWRkTGlzdGVuZXIoKHJlcXVlc3QpID0+IHtcbiAgaWYgKHJlcXVlc3QuX3Jlc291cmNlVHlwZSA9PT0gXCJ4aHJcIiB8fCByZXF1ZXN0Ll9yZXNvdXJjZVR5cGUgPT09IFwiZmV0Y2hcIikge1xuICAgIHJlcXVlc3QuZ2V0Q29udGVudCgocmVzcG9uc2VCb2R5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHtcbiAgICAgICAgdHlwZTogXCJuZXR3b3JrLXJlcXVlc3RcIixcbiAgICAgICAgdXJsOiByZXF1ZXN0LnJlcXVlc3QudXJsLFxuICAgICAgICBtZXRob2Q6IHJlcXVlc3QucmVxdWVzdC5tZXRob2QsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5yZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHJlcXVlc3RIZWFkZXJzOiByZXF1ZXN0LnJlcXVlc3QuaGVhZGVycyxcbiAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiByZXF1ZXN0LnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgIHJlcXVlc3RCb2R5OiByZXF1ZXN0LnJlcXVlc3QucG9zdERhdGE/LnRleHQgPz8gXCJcIixcbiAgICAgICAgcmVzcG9uc2VCb2R5OiByZXNwb25zZUJvZHkgPz8gXCJcIlxuICAgICAgfVxuICAgICAgc2VuZFRvQnJvd3NlckNvbm5lY3RvcihlbnRyeSlcbiAgICB9KVxuICB9XG59KVxuXG4vLyBMaXN0ZW4gZm9yIGVsZW1lbnQgc2VsZWN0aW9uIGluIHRoZSBFbGVtZW50cyBwYW5lbFxuY2hyb21lLmRldnRvb2xzLnBhbmVscy5lbGVtZW50cy5vblNlbGVjdGlvbkNoYW5nZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICBjYXB0dXJlQW5kU2VuZEVsZW1lbnQoKVxufSlcblxuLy8gMikgVXNlIERldlRvb2xzIFByb3RvY29sIHRvIGNhcHR1cmUgY29uc29sZSBsb2dzXG5jaHJvbWUuZGV2dG9vbHMucGFuZWxzLmNyZWF0ZShcIkJyb3dzZXJUb29sc01DUFwiLCBcIlwiLCBcInBhbmVsLmh0bWxcIiwgKHBhbmVsKSA9PiB7XG4gIC8vIEluaXRpYWwgYXR0YWNoIC0gd2UnbGwga2VlcCB0aGUgZGVidWdnZXIgYXR0YWNoZWQgYXMgbG9uZyBhcyBEZXZUb29scyBpcyBvcGVuXG4gIGF0dGFjaERlYnVnZ2VyKClcblxuICAvLyBIYW5kbGUgcGFuZWwgc2hvd2luZ1xuICBwYW5lbC5vblNob3duLmFkZExpc3RlbmVyKChwYW5lbFdpbmRvdykgPT4ge1xuICAgIGlmICghaXNEZWJ1Z2dlckF0dGFjaGVkKSB7XG4gICAgICBhdHRhY2hEZWJ1Z2dlcigpXG4gICAgfVxuICB9KVxufSlcblxuLy8gQ2xlYW4gdXAgd2hlbiBEZXZUb29scyBjbG9zZXNcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidW5sb2FkXCIsICgpID0+IHtcbiAgLy8gRGV0YWNoIGRlYnVnZ2VyXG4gIGRldGFjaERlYnVnZ2VyKClcblxuICAvLyBDbGVhbiB1cCBhbGwgV2ViU29ja2V0IHJlc291cmNlc1xuICBjbGVhbnVwV2ViU29ja2V0UmVzb3VyY2VzKClcbn0pXG5cbi8vIExpc3RlbiBmb3IgY29ubmVjdGlvbiBzdGF0dXMgdXBkYXRlcyBmcm9tIHBhZ2UgcmVmcmVzaGVzXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIC8vIEhhbmRsZSBjb25uZWN0aW9uIHN0YXR1cyB1cGRhdGVzIGZyb20gcGFnZSByZWZyZXNoZXNcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJDT05ORUNUSU9OX1NUQVRVU19VUERBVEVcIikge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYERldlRvb2xzIHJlY2VpdmVkIGNvbm5lY3Rpb24gc3RhdHVzIHVwZGF0ZTogJHtcbiAgICAgICAgbWVzc2FnZS5pc0Nvbm5lY3RlZCA/IFwiQ29ubmVjdGVkXCIgOiBcIkRpc2Nvbm5lY3RlZFwiXG4gICAgICB9YFxuICAgIClcblxuICAgIC8vIElmIGNvbm5lY3Rpb24gaXMgbG9zdCwgdHJ5IHRvIHJlZXN0YWJsaXNoIFdlYlNvY2tldCBvbmx5IGlmIHdlIGhhZCBhIHByZXZpb3VzIGNvbm5lY3Rpb25cbiAgICBpZiAoIW1lc3NhZ2UuaXNDb25uZWN0ZWQgJiYgd3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIkNvbm5lY3Rpb24gbG9zdCBhZnRlciBwYWdlIHJlZnJlc2gsIHdpbGwgYXR0ZW1wdCB0byByZWNvbm5lY3QgV2ViU29ja2V0XCJcbiAgICAgIClcblxuICAgICAgLy8gT25seSByZWNvbm5lY3QgaWYgd2UgYWN0dWFsbHkgaGF2ZSBhIFdlYlNvY2tldCB0aGF0IG1pZ2h0IGJlIHN0YWxlXG4gICAgICBpZiAoXG4gICAgICAgIHdzICYmXG4gICAgICAgICh3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEIHx8XG4gICAgICAgICAgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NJTkcpXG4gICAgICApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXZWJTb2NrZXQgaXMgYWxyZWFkeSBjbG9zZWQgb3IgY2xvc2luZywgd2lsbCByZWNvbm5lY3RcIilcbiAgICAgICAgc2V0dXBXZWJTb2NrZXQoZGV2dG9vbHNTZXR0aW5ncylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgYXV0by1kaXNjb3ZlcnkgcmVxdWVzdHMgYWZ0ZXIgcGFnZSByZWZyZXNoZXNcbiAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJJTklUSUFURV9BVVRPX0RJU0NPVkVSWVwiKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgRGV2VG9vbHMgaW5pdGlhdGluZyBXZWJTb2NrZXQgcmVjb25uZWN0IGFmdGVyIHBhZ2UgcmVmcmVzaCAocmVhc29uOiAke21lc3NhZ2UucmVhc29ufSlgXG4gICAgKVxuXG4gICAgLy8gRm9yIHBhZ2UgcmVmcmVzaGVzIHdpdGggZm9yY2VSZXN0YXJ0LCB3ZSBzaG91bGQgYWx3YXlzIHJlY29ubmVjdCBpZiBvdXIgY3VycmVudCBjb25uZWN0aW9uIGlzIG5vdCB3b3JraW5nXG4gICAgaWYgKFxuICAgICAgKG1lc3NhZ2UucmVhc29uID09PSBcInBhZ2VfcmVmcmVzaFwiIHx8IG1lc3NhZ2UuZm9yY2VSZXN0YXJ0ID09PSB0cnVlKSAmJlxuICAgICAgKCF3cyB8fCB3cy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTilcbiAgICApIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIlBhZ2UgcmVmcmVzaGVkIGFuZCBXZWJTb2NrZXQgbm90IG9wZW4gLSBmb3JjaW5nIHJlY29ubmVjdGlvblwiXG4gICAgICApXG5cbiAgICAgIC8vIFVzZSB0aGUgdXRpbGl0eSBmdW5jdGlvbiB0byBoYW5kbGUgcmVjb25uZWN0aW9uXG4gICAgICBoYW5kbGVSZWNvbm5lY3RBZnRlclBhZ2VSZWZyZXNoKGRldnRvb2xzU2V0dGluZ3MpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgcGVyZm9ybUF0dGFjaCB9IGZyb20gXCIuLi9wZXJmb3JtQXR0YWNoXCJcbmltcG9ydCB7IGN1cnJlbnRUYWJJZCB9IGZyb20gXCIuLi9kZXZ0b29sc1wiXG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBhdHRhY2ggZGVidWdnZXJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdHRhY2hEZWJ1Z2dlcihjYWxsYmFjaz86IChhdHRhY2hlZDogYm9vbGVhbikgPT4gdm9pZCkge1xuICAvLyBGaXJzdCBjaGVjayBpZiB3ZSdyZSBhbHJlYWR5IGF0dGFjaGVkIHRvIHRoaXMgdGFiXG4gIGNocm9tZS5kZWJ1Z2dlci5nZXRUYXJnZXRzKCh0YXJnZXRzKSA9PiB7XG4gICAgY29uc3QgaXNBbHJlYWR5QXR0YWNoZWQgPSB0YXJnZXRzLnNvbWUoXG4gICAgICAodGFyZ2V0KSA9PiB0YXJnZXQudGFiSWQgPT09IGN1cnJlbnRUYWJJZCAmJiB0YXJnZXQuYXR0YWNoZWRcbiAgICApXG5cbiAgICBpZiAoaXNBbHJlYWR5QXR0YWNoZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgZXhpc3RpbmcgZGVidWdnZXIgYXR0YWNobWVudCwgZGV0YWNoaW5nIGZpcnN0Li4uXCIpXG4gICAgICAvLyBGb3JjZSBkZXRhY2ggZmlyc3QgdG8gZW5zdXJlIGNsZWFuIHN0YXRlXG4gICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IGN1cnJlbnRUYWJJZCB9LCAoKSA9PiB7XG4gICAgICAgIC8vIElnbm9yZSBhbnkgZXJyb3JzIGR1cmluZyBkZXRhY2hcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGZvcmNlZCBkZXRhY2g6XCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3cgcHJvY2VlZCB3aXRoIGZyZXNoIGF0dGFjaG1lbnRcbiAgICAgICAgcGVyZm9ybUF0dGFjaChjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIGV4aXN0aW5nIGF0dGFjaG1lbnQsIHByb2NlZWQgZGlyZWN0bHlcbiAgICAgIHBlcmZvcm1BdHRhY2goY2FsbGJhY2spXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0IHsgY3VycmVudFRhYklkIH0gZnJvbSBcIi4vZGV2dG9vbHNcIlxuaW1wb3J0IHsgY29uc29sZU1lc3NhZ2VMaXN0ZW5lciB9IGZyb20gXCIuL3V0aWxzL2NvbnNvbGVNZXNzYWdlTGlzdGVuZXJcIlxuaW1wb3J0IHsgc2V0RGVidWdnZXJBdHRhY2hlZCB9IGZyb20gXCIuL3V0aWxzL2RldGFjaERlYnVnZ2VyXCJcblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1BdHRhY2goY2FsbGJhY2s/OiAoYXR0YWNoZWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgY29uc29sZS5sb2coXCJQZXJmb3JtaW5nIGRlYnVnZ2VyIGF0dGFjaG1lbnQgdG8gdGFiOlwiLCBjdXJyZW50VGFiSWQpXG4gIGNocm9tZS5kZWJ1Z2dlci5hdHRhY2goeyB0YWJJZDogY3VycmVudFRhYklkIH0sIFwiMS4zXCIsICgpID0+IHtcbiAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGF0dGFjaCBkZWJ1Z2dlcjpcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgc2V0RGVidWdnZXJBdHRhY2hlZChmYWxzZSwgY2FsbGJhY2spXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXREZWJ1Z2dlckF0dGFjaGVkKHRydWUsIGNhbGxiYWNrKVxuICAgIGNvbnNvbGUubG9nKFwiRGVidWdnZXIgc3VjY2Vzc2Z1bGx5IGF0dGFjaGVkXCIpXG5cbiAgICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHdoZW4gYXR0YWNoaW5nXG4gICAgY2hyb21lLmRlYnVnZ2VyLm9uRXZlbnQuYWRkTGlzdGVuZXIoY29uc29sZU1lc3NhZ2VMaXN0ZW5lcilcblxuICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZChcbiAgICAgIHsgdGFiSWQ6IGN1cnJlbnRUYWJJZCB9LFxuICAgICAgXCJSdW50aW1lLmVuYWJsZVwiLFxuICAgICAge30sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGVuYWJsZSBydW50aW1lOlwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJSdW50aW1lIEFQSSBzdWNjZXNzZnVsbHkgZW5hYmxlZFwiKVxuICAgICAgfVxuICAgIClcbiAgfSlcbn1cbiIsImltcG9ydCB7IGN1cnJlbnRUYWJJZCB9IGZyb20gXCIuLi9kZXZ0b29sc1wiXG5pbXBvcnQgeyBzZW5kVG9Ccm93c2VyQ29ubmVjdG9yIH0gZnJvbSBcIi4vc2VuZFRvQnJvd3NlckNvbm5lY3RvclwiXG5cbi8vIE1vdmUgdGhlIGNvbnNvbGUgbWVzc2FnZSBsaXN0ZW5lciBvdXRzaWRlIHRoZSBwYW5lbCBjcmVhdGlvblxuXG5leHBvcnQgY29uc3QgY29uc29sZU1lc3NhZ2VMaXN0ZW5lciA9IChzb3VyY2UsIG1ldGhvZCwgcGFyYW1zKSA9PiB7XG4gIC8vIE9ubHkgcHJvY2VzcyBldmVudHMgZm9yIG91ciB0YWJcbiAgaWYgKHNvdXJjZS50YWJJZCAhPT0gY3VycmVudFRhYklkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobWV0aG9kID09PSBcIlJ1bnRpbWUuZXhjZXB0aW9uVGhyb3duXCIpIHtcbiAgICBjb25zdCBlbnRyeSA9IHtcbiAgICAgIHR5cGU6IFwiY29uc29sZS1lcnJvclwiLFxuICAgICAgbWVzc2FnZTpcbiAgICAgICAgcGFyYW1zLmV4Y2VwdGlvbkRldGFpbHMuZXhjZXB0aW9uPy5kZXNjcmlwdGlvbiB8fFxuICAgICAgICBKU09OLnN0cmluZ2lmeShwYXJhbXMuZXhjZXB0aW9uRGV0YWlscyksXG4gICAgICBsZXZlbDogXCJlcnJvclwiLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgfVxuICAgIHNlbmRUb0Jyb3dzZXJDb25uZWN0b3IoZW50cnkpXG4gIH1cblxuICBpZiAobWV0aG9kID09PSBcIlJ1bnRpbWUuY29uc29sZUFQSUNhbGxlZFwiKSB7XG4gICAgLy8gUHJvY2VzcyBhbGwgYXJndW1lbnRzIGZyb20gdGhlIGNvbnNvbGUgY2FsbFxuICAgIGxldCBmb3JtYXR0ZWRNZXNzYWdlID0gXCJcIlxuICAgIGNvbnN0IGFyZ3MgPSBwYXJhbXMuYXJncyB8fCBbXVxuXG4gICAgLy8gRXh0cmFjdCBhbGwgYXJndW1lbnRzIGFuZCBjb21iaW5lIHRoZW1cbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBUcnkgdG8gYnVpbGQgYSBtZWFuaW5nZnVsIHJlcHJlc2VudGF0aW9uIG9mIGFsbCBhcmd1bWVudHNcbiAgICAgIHRyeSB7XG4gICAgICAgIGZvcm1hdHRlZE1lc3NhZ2UgPSBhcmdzXG4gICAgICAgICAgLm1hcCgoYXJnKSA9PiB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZGlmZmVyZW50IHR5cGVzIG9mIGFyZ3VtZW50c1xuICAgICAgICAgICAgaWYgKGFyZy50eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhcmcudmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLnR5cGUgPT09IFwib2JqZWN0XCIgJiYgYXJnLnByZXZpZXcpIHtcbiAgICAgICAgICAgICAgLy8gRm9yIG9iamVjdHMsIGluY2x1ZGUgdGhlaXIgcHJldmlldyBvciBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnLnByZXZpZXcpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZy5kZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAvLyBTb21lIG9iamVjdHMgaGF2ZSBkZXNjcmlwdGlvbnNcbiAgICAgICAgICAgICAgcmV0dXJuIGFyZy5kZXNjcmlwdGlvblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG90aGVyIHR5cGVzXG4gICAgICAgICAgICAgIHJldHVybiBhcmcudmFsdWUgfHwgYXJnLmRlc2NyaXB0aW9uIHx8IEpTT04uc3RyaW5naWZ5KGFyZylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5qb2luKFwiIFwiKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBGYWxsYmFjayBpZiBwcm9jZXNzaW5nIGZhaWxzXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcHJvY2VzcyBjb25zb2xlIGFyZ3VtZW50czpcIiwgZSlcbiAgICAgICAgZm9ybWF0dGVkTWVzc2FnZSA9XG4gICAgICAgICAgYXJnc1swXT8udmFsdWUgfHwgXCJVbmFibGUgdG8gcHJvY2VzcyBjb25zb2xlIGFyZ3VtZW50c1wiXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSB7XG4gICAgICB0eXBlOiBwYXJhbXMudHlwZSA9PT0gXCJlcnJvclwiID8gXCJjb25zb2xlLWVycm9yXCIgOiBcImNvbnNvbGUtbG9nXCIsXG4gICAgICBsZXZlbDogcGFyYW1zLnR5cGUsXG4gICAgICBtZXNzYWdlOiBmb3JtYXR0ZWRNZXNzYWdlLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgfVxuICAgIHNlbmRUb0Jyb3dzZXJDb25uZWN0b3IoZW50cnkpXG4gIH1cbn1cbiIsImltcG9ydCB7IHZhbGlkYXRlU2VydmVySWRlbnRpdHkgfSBmcm9tIFwifmRldnRvb2xzL3V0aWxzL3ZhbGlkYXRlU2VydmVySWRlbnRpdHlcIlxuXG5pbXBvcnQgeyBkZXZ0b29sc1NldHRpbmdzIH0gZnJvbSBcIi4uL2RldnRvb2xzXCJcbmltcG9ydCB7IHByb2Nlc3NKc29uU3RyaW5nIH0gZnJvbSBcIi4vcHJvY2Vzc0pzb25TdHJpbmdcIlxuXG4vLyBIZWxwZXIgdG8gc2VuZCBsb2dzIHRvIGJyb3dzZXItY29ubmVjdG9yXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFRvQnJvd3NlckNvbm5lY3Rvcihsb2dEYXRhKSB7XG4gIGlmICghbG9nRGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJObyBsb2cgZGF0YSBwcm92aWRlZCB0byBzZW5kVG9Ccm93c2VyQ29ubmVjdG9yXCIpXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBGaXJzdCwgZW5zdXJlIHdlJ3JlIGNvbm5lY3RpbmcgdG8gdGhlIHJpZ2h0IHNlcnZlclxuICBpZiAoIShhd2FpdCB2YWxpZGF0ZVNlcnZlcklkZW50aXR5KCkpKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIFwiQ2Fubm90IHNlbmQgbG9nczogTm90IGNvbm5lY3RlZCB0byBhIHZhbGlkIGJyb3dzZXIgdG9vbHMgc2VydmVyXCJcbiAgICApXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgbG9nIGRhdGEgdG8gYnJvd3NlciBjb25uZWN0b3I6XCIsIHtcbiAgICB0eXBlOiBsb2dEYXRhLnR5cGUsXG4gICAgdGltZXN0YW1wOiBsb2dEYXRhLnRpbWVzdGFtcFxuICB9KVxuXG4gIC8vIFByb2Nlc3MgYW55IHN0cmluZyBmaWVsZHMgdGhhdCBtaWdodCBjb250YWluIEpTT05cbiAgY29uc3QgcHJvY2Vzc2VkRGF0YSA9IHsgLi4ubG9nRGF0YSB9XG5cbiAgaWYgKGxvZ0RhdGEudHlwZSA9PT0gXCJuZXR3b3JrLXJlcXVlc3RcIikge1xuICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBuZXR3b3JrIHJlcXVlc3RcIilcbiAgICBpZiAocHJvY2Vzc2VkRGF0YS5yZXF1ZXN0Qm9keSkge1xuICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IGJvZHkgc2l6ZSBiZWZvcmU6XCIsIHByb2Nlc3NlZERhdGEucmVxdWVzdEJvZHkubGVuZ3RoKVxuICAgICAgcHJvY2Vzc2VkRGF0YS5yZXF1ZXN0Qm9keSA9IHByb2Nlc3NKc29uU3RyaW5nKFxuICAgICAgICBwcm9jZXNzZWREYXRhLnJlcXVlc3RCb2R5LFxuICAgICAgICBkZXZ0b29sc1NldHRpbmdzLnN0cmluZ1NpemVMaW1pdFxuICAgICAgKVxuICAgICAgY29uc29sZS5sb2coXCJSZXF1ZXN0IGJvZHkgc2l6ZSBhZnRlcjpcIiwgcHJvY2Vzc2VkRGF0YS5yZXF1ZXN0Qm9keS5sZW5ndGgpXG4gICAgfVxuICAgIGlmIChwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keSkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiUmVzcG9uc2UgYm9keSBzaXplIGJlZm9yZTpcIixcbiAgICAgICAgcHJvY2Vzc2VkRGF0YS5yZXNwb25zZUJvZHkubGVuZ3RoXG4gICAgICApXG4gICAgICBwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keSA9IHByb2Nlc3NKc29uU3RyaW5nKFxuICAgICAgICBwcm9jZXNzZWREYXRhLnJlc3BvbnNlQm9keSxcbiAgICAgICAgZGV2dG9vbHNTZXR0aW5ncy5zdHJpbmdTaXplTGltaXRcbiAgICAgIClcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIlJlc3BvbnNlIGJvZHkgc2l6ZSBhZnRlcjpcIixcbiAgICAgICAgcHJvY2Vzc2VkRGF0YS5yZXNwb25zZUJvZHkubGVuZ3RoXG4gICAgICApXG4gICAgfVxuICB9IGVsc2UgaWYgKFxuICAgIGxvZ0RhdGEudHlwZSA9PT0gXCJjb25zb2xlLWxvZ1wiIHx8XG4gICAgbG9nRGF0YS50eXBlID09PSBcImNvbnNvbGUtZXJyb3JcIlxuICApIHtcbiAgICBjb25zb2xlLmxvZyhcIlByb2Nlc3NpbmcgY29uc29sZSBtZXNzYWdlXCIpXG4gICAgaWYgKHByb2Nlc3NlZERhdGEubWVzc2FnZSkge1xuICAgICAgY29uc29sZS5sb2coXCJNZXNzYWdlIHNpemUgYmVmb3JlOlwiLCBwcm9jZXNzZWREYXRhLm1lc3NhZ2UubGVuZ3RoKVxuICAgICAgcHJvY2Vzc2VkRGF0YS5tZXNzYWdlID0gcHJvY2Vzc0pzb25TdHJpbmcoXG4gICAgICAgIHByb2Nlc3NlZERhdGEubWVzc2FnZSxcbiAgICAgICAgZGV2dG9vbHNTZXR0aW5ncy5zdHJpbmdTaXplTGltaXRcbiAgICAgIClcbiAgICAgIGNvbnNvbGUubG9nKFwiTWVzc2FnZSBzaXplIGFmdGVyOlwiLCBwcm9jZXNzZWREYXRhLm1lc3NhZ2UubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBzZXR0aW5ncyB0byB0aGUgcmVxdWVzdFxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIGRhdGE6IHtcbiAgICAgIC4uLnByb2Nlc3NlZERhdGEsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICB9LFxuICAgIHNldHRpbmdzOiB7XG4gICAgICBsb2dMaW1pdDogZGV2dG9vbHNTZXR0aW5ncy5sb2dMaW1pdCxcbiAgICAgIHF1ZXJ5TGltaXQ6IGRldnRvb2xzU2V0dGluZ3MucXVlcnlMaW1pdCxcbiAgICAgIHNob3dSZXF1ZXN0SGVhZGVyczogZGV2dG9vbHNTZXR0aW5ncy5zaG93UmVxdWVzdEhlYWRlcnMsXG4gICAgICBzaG93UmVzcG9uc2VIZWFkZXJzOiBkZXZ0b29sc1NldHRpbmdzLnNob3dSZXNwb25zZUhlYWRlcnNcbiAgICB9XG4gIH1cblxuICBjb25zdCBmaW5hbFBheWxvYWRTaXplID0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkubGVuZ3RoXG4gIGNvbnNvbGUubG9nKFwiRmluYWwgcGF5bG9hZCBzaXplOlwiLCBmaW5hbFBheWxvYWRTaXplKVxuXG4gIGlmIChmaW5hbFBheWxvYWRTaXplID4gMTAwMDAwMCkge1xuICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IExhcmdlIHBheWxvYWQgZGV0ZWN0ZWQ6XCIsIGZpbmFsUGF5bG9hZFNpemUpXG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJQYXlsb2FkIHByZXZpZXc6XCIsXG4gICAgICBKU09OLnN0cmluZ2lmeShwYXlsb2FkKS5zdWJzdHJpbmcoMCwgMTAwMCkgKyBcIi4uLlwiXG4gICAgKVxuICB9XG5cbiAgY29uc3Qgc2VydmVyVXJsID0gYGh0dHA6Ly8ke2RldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdH06JHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnR9L2V4dGVuc2lvbi1sb2dgXG4gIGNvbnNvbGUubG9nKGBTZW5kaW5nIGxvZyB0byAke3NlcnZlclVybH1gKVxuXG4gIGZldGNoKHNlcnZlclVybCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciAke3Jlc3BvbnNlLnN0YXR1c31gKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9nIHNlbnQgc3VjY2Vzc2Z1bGx5OlwiLCBkYXRhKVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlbmRpbmcgbG9nOlwiLCBlcnJvcilcbiAgICB9KVxufVxuIiwiaW1wb3J0IHsgZGV2dG9vbHNTZXR0aW5ncyB9IGZyb20gXCIuLi9kZXZ0b29sc1wiXG5cbi8vIFZhbGlkYXRlIHNlcnZlciBpZGVudGl0eVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eSgpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBWYWxpZGF0aW5nIHNlcnZlciBpZGVudGl0eSBhdCBodHRwOi8vJHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3R9OiR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0fS8uaWRlbnRpdHkuLi5gXG4gICAgKVxuXG4gICAgLy8gVXNlIGZldGNoIHdpdGggYSB0aW1lb3V0IHRvIHByZXZlbnQgbG9uZy1oYW5naW5nIHJlcXVlc3RzXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCA1MDAwKSAvLyBJbmNyZWFzZWQgdGltZW91dCB0byA1IHNlY29uZHNcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cDovLyR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0fToke2RldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydH0vLmlkZW50aXR5YCxcbiAgICAgICAge1xuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWxcbiAgICAgICAgfVxuICAgICAgKVxuXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKVxuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYFNlcnZlciBpZGVudGl0eSB2YWxpZGF0aW9uIGZhaWxlZDogSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30gLSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YFxuICAgICAgICApXG5cbiAgICAgICAgLy8gTm90aWZ5IGFib3V0IHRoZSBjb25uZWN0aW9uIGZhaWx1cmVcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6IFwiU0VSVkVSX1ZBTElEQVRJT05fRkFJTEVEXCIsXG4gICAgICAgICAgcmVhc29uOiBcImh0dHBfZXJyb3JcIixcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIHNlcnZlckhvc3Q6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdCxcbiAgICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnRcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc3QgaWRlbnRpdHkgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VydmVyIGlkZW50aXR5IHJlc3BvbnNlOlwiLCBpZGVudGl0eSlcblxuICAgICAgLy8gVmFsaWRhdGUgc2lnbmF0dXJlXG4gICAgICBpZiAoaWRlbnRpdHkuc2lnbmF0dXJlICE9PSBcIm1jcC1icm93c2VyLWNvbm5lY3Rvci0yNHg3XCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIlNlcnZlciBpZGVudGl0eSB2YWxpZGF0aW9uIGZhaWxlZDogSW52YWxpZCBzaWduYXR1cmVcIixcbiAgICAgICAgICBpZGVudGl0eVxuICAgICAgICApXG5cbiAgICAgICAgLy8gTm90aWZ5IGFib3V0IHRoZSBpbnZhbGlkIHNpZ25hdHVyZVxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogXCJTRVJWRVJfVkFMSURBVElPTl9GQUlMRURcIixcbiAgICAgICAgICByZWFzb246IFwiaW52YWxpZF9zaWduYXR1cmVcIixcbiAgICAgICAgICByZWNlaXZlZFNpZ25hdHVyZTogaWRlbnRpdHkuc2lnbmF0dXJlLFxuICAgICAgICAgIHNlcnZlckhvc3Q6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdCxcbiAgICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnRcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBTZXJ2ZXIgaWRlbnRpdHkgY29uZmlybWVkOiAke2lkZW50aXR5Lm5hbWV9IHYke2lkZW50aXR5LnZlcnNpb259YFxuICAgICAgKVxuXG4gICAgICAvLyBOb3RpZnkgYWJvdXQgc3VjY2Vzc2Z1bCB2YWxpZGF0aW9uXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6IFwiU0VSVkVSX1ZBTElEQVRJT05fU1VDQ0VTU1wiLFxuICAgICAgICBzZXJ2ZXJJbmZvOiBpZGVudGl0eSxcbiAgICAgICAgc2VydmVySG9zdDogZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZ0b29sc1NldHRpbmdzLnNlcnZlclBvcnRcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBjYXRjaCAoZmV0Y2hFcnJvcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZClcbiAgICAgIHRocm93IGZldGNoRXJyb3JcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlNlcnZlciBpZGVudGl0eSB2YWxpZGF0aW9uIGZhaWxlZDpcIiwgZXJyb3IpXG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIGBGYWlsZWQgdG8gY29ubmVjdCB0byBodHRwOi8vJHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3R9OiR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0fS8uaWRlbnRpdHlgXG4gICAgKVxuXG4gICAgLy8gTm90aWZ5IGFib3V0IHRoZSBjb25uZWN0aW9uIGVycm9yXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogXCJTRVJWRVJfVkFMSURBVElPTl9GQUlMRURcIixcbiAgICAgIHJlYXNvbjogXCJjb25uZWN0aW9uX2Vycm9yXCIsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSxcbiAgICAgIHNlcnZlckhvc3Q6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVySG9zdCxcbiAgICAgIHNlcnZlclBvcnQ6IGRldnRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydFxuICAgIH0pXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgcHJvY2Vzc0FycmF5V2l0aFNpemVMaW1pdCB9IGZyb20gXCJ+ZGV2dG9vbHMvdXRpbHMvcHJvY2Vzc0FycmF5V2l0aFNpemVMaW1pdFwiXG5pbXBvcnQgeyB0cnVuY2F0ZVN0cmluZ3NJbkRhdGEgfSBmcm9tIFwifmRldnRvb2xzL3V0aWxzL3RydW5jYXRlU3RyaW5nc0luRGF0YVwiXG5cbmltcG9ydCB7IGRldnRvb2xzU2V0dGluZ3MgfSBmcm9tIFwiLi4vZGV2dG9vbHNcIlxuXG4vLyBNb2RpZmllZCBwcm9jZXNzSnNvblN0cmluZyB0byBoYW5kbGUgYXJyYXlzIHdpdGggc2l6ZSBsaW1pdFxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NKc29uU3RyaW5nKGpzb25TdHJpbmcsIG1heExlbmd0aCkge1xuICBjb25zb2xlLmxvZyhcIlByb2Nlc3Npbmcgc3RyaW5nIG9mIGxlbmd0aDpcIiwganNvblN0cmluZz8ubGVuZ3RoKVxuICB0cnkge1xuICAgIGxldCBwYXJzZWRcbiAgICB0cnkge1xuICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKVxuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiU3VjY2Vzc2Z1bGx5IHBhcnNlZCBhcyBKU09OLCBzdHJ1Y3R1cmU6XCIsXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHBhcnNlZCkpXG4gICAgICApXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coXCJOb3QgdmFsaWQgSlNPTiwgdHJlYXRpbmcgYXMgc3RyaW5nXCIpXG4gICAgICByZXR1cm4gdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKGpzb25TdHJpbmcsIG1heExlbmd0aCwgMCwgXCJyb290XCIpXG4gICAgfVxuXG4gICAgLy8gSWYgaXQncyBhbiBhcnJheSwgcHJvY2VzcyB3aXRoIHNpemUgbGltaXRcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJzZWQpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlByb2Nlc3NpbmcgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIHNpemUgbGltaXRcIilcbiAgICAgIGNvbnN0IHByb2Nlc3NlZCA9IHByb2Nlc3NBcnJheVdpdGhTaXplTGltaXQoXG4gICAgICAgIHBhcnNlZCxcbiAgICAgICAgZGV2dG9vbHNTZXR0aW5ncy5tYXhMb2dTaXplLFxuICAgICAgICAoaXRlbSkgPT4gdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKGl0ZW0sIG1heExlbmd0aCwgMCwgXCJyb290XCIpXG4gICAgICApXG4gICAgICBjb25zdCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeShwcm9jZXNzZWQpXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFByb2Nlc3NlZCBhcnJheTogJHtwYXJzZWQubGVuZ3RofSAtPiAke3Byb2Nlc3NlZC5sZW5ndGh9IGl0ZW1zYFxuICAgICAgKVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSBwcm9jZXNzIGFzIGJlZm9yZVxuICAgIGNvbnN0IHByb2Nlc3NlZCA9IHRydW5jYXRlU3RyaW5nc0luRGF0YShwYXJzZWQsIG1heExlbmd0aCwgMCwgXCJyb290XCIpXG4gICAgY29uc3QgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkocHJvY2Vzc2VkKVxuICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2VkIEpTT04gc3RyaW5nIGxlbmd0aDpcIiwgcmVzdWx0Lmxlbmd0aClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gcHJvY2Vzc0pzb25TdHJpbmc6XCIsIGUpXG4gICAgcmV0dXJuIGpzb25TdHJpbmcuc3Vic3RyaW5nKDAsIG1heExlbmd0aCkgKyBcIi4uLiAodHJ1bmNhdGVkKVwiXG4gIH1cbn1cbiIsImltcG9ydCB7IGNhbGN1bGF0ZU9iamVjdFNpemUgfSBmcm9tIFwifmRldnRvb2xzL3V0aWxzL2NhbGN1bGF0ZU9iamVjdFNpemVcIlxuXG4vLyBIZWxwZXIgdG8gcHJvY2VzcyBhcnJheSBvZiBvYmplY3RzIHdpdGggc2l6ZSBsaW1pdFxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0FycmF5V2l0aFNpemVMaW1pdChhcnJheSwgbWF4VG90YWxTaXplLCBwcm9jZXNzRnVuYykge1xuICBsZXQgY3VycmVudFNpemUgPSAwXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgZm9yIChjb25zdCBpdGVtIG9mIGFycmF5KSB7XG4gICAgLy8gUHJvY2VzcyB0aGUgaXRlbSBmaXJzdFxuICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBwcm9jZXNzRnVuYyhpdGVtKVxuICAgIGNvbnN0IGl0ZW1TaXplID0gY2FsY3VsYXRlT2JqZWN0U2l6ZShwcm9jZXNzZWRJdGVtKVxuXG4gICAgLy8gQ2hlY2sgaWYgYWRkaW5nIHRoaXMgaXRlbSB3b3VsZCBleGNlZWQgdGhlIGxpbWl0XG4gICAgaWYgKGN1cnJlbnRTaXplICsgaXRlbVNpemUgPiBtYXhUb3RhbFNpemUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgUmVhY2hlZCBzaXplIGxpbWl0ICgke2N1cnJlbnRTaXplfS8ke21heFRvdGFsU2l6ZX0pLCB0cnVuY2F0aW5nIGFycmF5YFxuICAgICAgKVxuICAgICAgYnJlYWtcbiAgICB9XG5cbiAgICAvLyBBZGQgaXRlbSBhbmQgdXBkYXRlIHNpemVcbiAgICByZXN1bHQucHVzaChwcm9jZXNzZWRJdGVtKVxuICAgIGN1cnJlbnRTaXplICs9IGl0ZW1TaXplXG4gICAgY29uc29sZS5sb2coXG4gICAgICBgQWRkZWQgaXRlbSBvZiBzaXplICR7aXRlbVNpemV9LCB0b3RhbCBzaXplIG5vdzogJHtjdXJyZW50U2l6ZX1gXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIiwiLy8gSGVscGVyIHRvIGNhbGN1bGF0ZSB0aGUgc2l6ZSBvZiBhbiBvYmplY3RcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZU9iamVjdFNpemUob2JqKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmopLmxlbmd0aFxufVxuIiwiLy8gVXRpbGl0eSB0byByZWN1cnNpdmVseSB0cnVuY2F0ZSBzdHJpbmdzIGluIGFueSBkYXRhIHN0cnVjdHVyZVxuXG5leHBvcnQgZnVuY3Rpb24gdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKGRhdGEsIG1heExlbmd0aCwgZGVwdGggPSAwLCBwYXRoID0gXCJcIikge1xuICAvLyBBZGQgZGVwdGggbGltaXQgdG8gcHJldmVudCBjaXJjdWxhciByZWZlcmVuY2VzXG4gIGlmIChkZXB0aCA+IDEwMCkge1xuICAgIGNvbnNvbGUud2FybihcIk1heCBkZXB0aCBleGNlZWRlZCBhdCBwYXRoOlwiLCBwYXRoKVxuICAgIHJldHVybiBcIltNQVhfREVQVEhfRVhDRUVERURdXCJcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBQcm9jZXNzaW5nIGF0IHBhdGg6ICR7cGF0aH0sIHR5cGU6YCwgdHlwZW9mIGRhdGEpXG5cbiAgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYFRydW5jYXRpbmcgc3RyaW5nIGF0IHBhdGggJHtwYXRofSBmcm9tICR7ZGF0YS5sZW5ndGh9IHRvICR7bWF4TGVuZ3RofWBcbiAgICAgIClcbiAgICAgIHJldHVybiBkYXRhLnN1YnN0cmluZygwLCBtYXhMZW5ndGgpICsgXCIuLi4gKHRydW5jYXRlZClcIlxuICAgIH1cbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICBjb25zb2xlLmxvZyhgUHJvY2Vzc2luZyBhcnJheSBhdCBwYXRoICR7cGF0aH0gd2l0aCBsZW5ndGg6YCwgZGF0YS5sZW5ndGgpXG4gICAgcmV0dXJuIGRhdGEubWFwKChpdGVtLCBpbmRleCkgPT5cbiAgICAgIHRydW5jYXRlU3RyaW5nc0luRGF0YShpdGVtLCBtYXhMZW5ndGgsIGRlcHRoICsgMSwgYCR7cGF0aH1bJHtpbmRleH1dYClcbiAgICApXG4gIH1cblxuICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYFByb2Nlc3Npbmcgb2JqZWN0IGF0IHBhdGggJHtwYXRofSB3aXRoIGtleXM6YCxcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpXG4gICAgKVxuICAgIGNvbnN0IHJlc3VsdCA9IHt9XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJ1bmNhdGVTdHJpbmdzSW5EYXRhKFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIG1heExlbmd0aCxcbiAgICAgICAgICBkZXB0aCArIDEsXG4gICAgICAgICAgcGF0aCA/IGAke3BhdGh9LiR7a2V5fWAgOiBrZXlcbiAgICAgICAgKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBwcm9jZXNzaW5nIGtleSAke2tleX0gYXQgcGF0aCAke3BhdGh9OmAsIGUpXG4gICAgICAgIHJlc3VsdFtrZXldID0gXCJbRVJST1JfUFJPQ0VTU0lOR11cIlxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICByZXR1cm4gZGF0YVxufVxuIiwiaW1wb3J0IHsgY29uc29sZU1lc3NhZ2VMaXN0ZW5lciB9IGZyb20gXCIuL2NvbnNvbGVNZXNzYWdlTGlzdGVuZXJcIlxuaW1wb3J0IHsgY3VycmVudFRhYklkIH0gZnJvbSBcIi4uL2RldnRvb2xzXCJcblxuLy8gVHJhY2sgZGVidWdnZXIgc3RhdGUgbG9jYWxseVxubGV0IF9pc0RlYnVnZ2VyQXR0YWNoZWQgPSBmYWxzZVxuXG4vLyBHZXQgY3VycmVudCBkZWJ1Z2dlciBzdGF0ZVxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVidWdnZXJBdHRhY2hlZCgpOiBib29sZWFuIHtcbiAgcmV0dXJuIF9pc0RlYnVnZ2VyQXR0YWNoZWRcbn1cblxuLy8gU2V0IGRlYnVnZ2VyIHN0YXRlIGFuZCBub3RpZnkgbGlzdGVuZXJzIGlmIHByb3ZpZGVkXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVidWdnZXJBdHRhY2hlZChhdHRhY2hlZDogYm9vbGVhbiwgY2FsbGJhY2s/OiAoYXR0YWNoZWQ6IGJvb2xlYW4pID0+IHZvaWQpOiB2b2lkIHtcbiAgX2lzRGVidWdnZXJBdHRhY2hlZCA9IGF0dGFjaGVkXG4gIGlmIChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKGF0dGFjaGVkKVxuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBkZXRhY2ggZGVidWdnZXJcbmV4cG9ydCBmdW5jdGlvbiBkZXRhY2hEZWJ1Z2dlcihjYWxsYmFjaz86IChhdHRhY2hlZDogYm9vbGVhbikgPT4gdm9pZCkge1xuICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGZpcnN0XG4gIGNocm9tZS5kZWJ1Z2dlci5vbkV2ZW50LnJlbW92ZUxpc3RlbmVyKGNvbnNvbGVNZXNzYWdlTGlzdGVuZXIpXG5cbiAgLy8gQ2hlY2sgaWYgZGVidWdnZXIgaXMgYWN0dWFsbHkgYXR0YWNoZWQgYmVmb3JlIHRyeWluZyB0byBkZXRhY2hcbiAgY2hyb21lLmRlYnVnZ2VyLmdldFRhcmdldHMoKHRhcmdldHMpID0+IHtcbiAgICBjb25zdCBpc1N0aWxsQXR0YWNoZWQgPSB0YXJnZXRzLnNvbWUoXG4gICAgICAodGFyZ2V0KSA9PiB0YXJnZXQudGFiSWQgPT09IGN1cnJlbnRUYWJJZCAmJiB0YXJnZXQuYXR0YWNoZWRcbiAgICApXG5cbiAgICBpZiAoIWlzU3RpbGxBdHRhY2hlZCkge1xuICAgICAgY29uc29sZS5sb2coXCJEZWJ1Z2dlciBhbHJlYWR5IGRldGFjaGVkXCIpXG4gICAgICBzZXREZWJ1Z2dlckF0dGFjaGVkKGZhbHNlLCBjYWxsYmFjaylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNocm9tZS5kZWJ1Z2dlci5kZXRhY2goeyB0YWJJZDogY3VycmVudFRhYklkIH0sICgpID0+IHtcbiAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiV2FybmluZyBkdXJpbmcgZGVidWdnZXIgZGV0YWNoOlwiLFxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZXREZWJ1Z2dlckF0dGFjaGVkKGZhbHNlLCBjYWxsYmFjaylcbiAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnZXIgZGV0YWNoZWRcIilcbiAgICB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc2VuZFRvQnJvd3NlckNvbm5lY3RvciB9IGZyb20gXCIuL3NlbmRUb0Jyb3dzZXJDb25uZWN0b3JcIlxuXG4vLyBGdW5jdGlvbiB0byBjYXB0dXJlIGFuZCBzZW5kIGVsZW1lbnQgZGF0YVxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVBbmRTZW5kRWxlbWVudCgpIHtcbiAgY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy5ldmFsKFxuICAgIGAoZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBlbCA9ICQwOyAgLy8gJDAgaXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IGluIERldlRvb2xzXG4gICAgICBpZiAoIWVsKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YWdOYW1lOiBlbC50YWdOYW1lLFxuICAgICAgICBpZDogZWwuaWQsXG4gICAgICAgIGNsYXNzTmFtZTogZWwuY2xhc3NOYW1lLFxuICAgICAgICB0ZXh0Q29udGVudDogZWwudGV4dENvbnRlbnQ/LnN1YnN0cmluZygwLCAxMDApLFxuICAgICAgICBhdHRyaWJ1dGVzOiBBcnJheS5mcm9tKGVsLmF0dHJpYnV0ZXMpLm1hcChhdHRyID0+ICh7XG4gICAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICAgIHZhbHVlOiBhdHRyLnZhbHVlXG4gICAgICAgIH0pKSxcbiAgICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgdG9wOiByZWN0LnRvcCxcbiAgICAgICAgICBsZWZ0OiByZWN0LmxlZnRcbiAgICAgICAgfSxcbiAgICAgICAgaW5uZXJIVE1MOiBlbC5pbm5lckhUTUwuc3Vic3RyaW5nKDAsIDUwMClcbiAgICAgIH07XG4gICAgfSkoKWAsXG4gICAgKHJlc3VsdCwgaXNFeGNlcHRpb24pID0+IHtcbiAgICAgIGlmIChpc0V4Y2VwdGlvbiB8fCAhcmVzdWx0KSByZXR1cm5cblxuICAgICAgY29uc29sZS5sb2coXCJFbGVtZW50IHNlbGVjdGVkOlwiLCByZXN1bHQpXG5cbiAgICAgIC8vIFNlbmQgdG8gYnJvd3NlciBjb25uZWN0b3JcbiAgICAgIHNlbmRUb0Jyb3dzZXJDb25uZWN0b3Ioe1xuICAgICAgICB0eXBlOiBcInNlbGVjdGVkLWVsZW1lbnRcIixcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICBlbGVtZW50OiByZXN1bHRcbiAgICAgIH0pXG4gICAgfVxuICApXG59XG4iLCJpbXBvcnQgeyB2YWxpZGF0ZVNlcnZlcklkZW50aXR5IH0gZnJvbSBcIi4vdmFsaWRhdGVTZXJ2ZXJJZGVudGl0eVwiXG5cbi8qKlxuICogV2ViU29ja2V0IGNvbm5lY3Rpb24gdXRpbGl0aWVzIGZvciB0aGUgRGV2VG9vbHMgZXh0ZW5zaW9uXG4gKi9cblxuLy8gV2ViU29ja2V0IGNvbm5lY3Rpb24gbWFuYWdlbWVudFxuZXhwb3J0IGxldCB3czogV2ViU29ja2V0IHwgbnVsbCA9IG51bGxcbmV4cG9ydCBsZXQgd3NSZWNvbm5lY3RUaW1lb3V0OiBOb2RlSlMuVGltZW91dCB8IG51bGwgPSBudWxsXG5leHBvcnQgbGV0IGhlYXJ0YmVhdEludGVydmFsOiBOb2RlSlMuVGltZW91dCB8IG51bGwgPSBudWxsXG5leHBvcnQgY29uc3QgV1NfUkVDT05ORUNUX0RFTEFZID0gNTAwMCAvLyA1IHNlY29uZHNcbmV4cG9ydCBjb25zdCBIRUFSVEJFQVRfSU5URVJWQUwgPSAzMDAwMCAvLyAzMCBzZWNvbmRzXG5leHBvcnQgY29uc3QgV1NfQ09OTkVDVElPTl9USU1FT1VUID0gMTAwMDAgLy8gMTAgc2Vjb25kc1xuXG4vLyBBZGQgYSBmbGFnIHRvIHRyYWNrIGlmIHdlIG5lZWQgdG8gcmVjb25uZWN0IGFmdGVyIGlkZW50aXR5IHZhbGlkYXRpb25cbmV4cG9ydCBsZXQgcmVjb25uZWN0QWZ0ZXJWYWxpZGF0aW9uID0gZmFsc2Vcbi8vIFRyYWNrIGlmIHdlJ3JlIGludGVudGlvbmFsbHkgY2xvc2luZyB0aGUgY29ubmVjdGlvblxuZXhwb3J0IGxldCBpbnRlbnRpb25hbENsb3N1cmUgPSBmYWxzZVxuXG4vKipcbiAqIFNhZmVseSBjbG9zZSB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlV2ViU29ja2V0KCk6IHZvaWQge1xuICAvLyBTZXQgaW50ZW50aW9uYWwgY2xvc3VyZSBmbGFnIGJlZm9yZSBjbG9zaW5nXG4gIGludGVudGlvbmFsQ2xvc3VyZSA9IHRydWVcblxuICBpZiAod3MpIHtcbiAgICB0cnkge1xuICAgICAgd3MuY2xvc2UoKVxuICAgICAgY29uc29sZS5sb2coXCJXZWJTb2NrZXQgY2xvc2VkIHN1Y2Nlc3NmdWxseVwiKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjbG9zaW5nIFdlYlNvY2tldDpcIiwgZSlcbiAgICB9XG4gICAgd3MgPSBudWxsXG4gIH1cbiAgXG4gIC8vIFJlc2V0IGZsYWcgYWZ0ZXIgY2xvc2luZ1xuICBpbnRlbnRpb25hbENsb3N1cmUgPSBmYWxzZVxufVxuXG4vKipcbiAqIENsZWFyIGFueSBwZW5kaW5nIFdlYlNvY2tldCByZWNvbm5lY3QgdGltZW91dHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyUmVjb25uZWN0VGltZW91dCgpOiB2b2lkIHtcbiAgaWYgKHdzUmVjb25uZWN0VGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh3c1JlY29ubmVjdFRpbWVvdXQpXG4gICAgd3NSZWNvbm5lY3RUaW1lb3V0ID0gbnVsbFxuICAgIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IHJlY29ubmVjdCB0aW1lb3V0IGNsZWFyZWRcIilcbiAgfVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBoZWFydGJlYXQgaW50ZXJ2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFySGVhcnRiZWF0SW50ZXJ2YWwoKTogdm9pZCB7XG4gIGlmIChoZWFydGJlYXRJbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaGVhcnRiZWF0SW50ZXJ2YWwpXG4gICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSBudWxsXG4gICAgY29uc29sZS5sb2coXCJXZWJTb2NrZXQgaGVhcnRiZWF0IGludGVydmFsIGNsZWFyZWRcIilcbiAgfVxufVxuXG4vKipcbiAqIFBlcmZvcm0gY29tcGxldGUgY2xlYW51cCBvZiBhbGwgV2ViU29ja2V0IHJlc291cmNlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cFdlYlNvY2tldFJlc291cmNlcygpOiB2b2lkIHtcbiAgLy8gU2V0IGludGVudGlvbmFsIGNsb3N1cmUgZmxhZyBiZWZvcmUgY2xvc2luZ1xuICBpbnRlbnRpb25hbENsb3N1cmUgPSB0cnVlXG4gIFxuICAvLyBDbG9zZSB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb25cbiAgaWYgKHdzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHdzLmNsb3NlKClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2xvc2luZyBXZWJTb2NrZXQgZHVyaW5nIGNsZWFudXA6XCIsIGUpXG4gICAgfVxuICAgIHdzID0gbnVsbFxuICB9XG4gIFxuICAvLyBDbGVhciBhbnkgcGVuZGluZyB0aW1lb3V0c1xuICBpZiAod3NSZWNvbm5lY3RUaW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHdzUmVjb25uZWN0VGltZW91dClcbiAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBudWxsXG4gIH1cbiAgXG4gIC8vIENsZWFyIHRoZSBoZWFydGJlYXQgaW50ZXJ2YWxcbiAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRJbnRlcnZhbClcbiAgICBoZWFydGJlYXRJbnRlcnZhbCA9IG51bGxcbiAgfVxuICBcbiAgY29uc29sZS5sb2coXCJBbGwgV2ViU29ja2V0IHJlc291cmNlcyBjbGVhbmVkIHVwXCIpXG59XG5cbi8vIEZ1bmN0aW9uIHRvIHNlbmQgYSBoZWFydGJlYXQgdG8ga2VlcCB0aGUgV2ViU29ja2V0IGNvbm5lY3Rpb24gYWxpdmVcbmZ1bmN0aW9uIHNlbmRIZWFydGJlYXQoKSB7XG4gIGlmICh3cyAmJiB3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgIGNvbnNvbGUubG9nKFwiQ2hyb21lIEV4dGVuc2lvbjogU2VuZGluZyBXZWJTb2NrZXQgaGVhcnRiZWF0XCIpXG4gICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7IHR5cGU6IFwiaGVhcnRiZWF0XCIgfSkpXG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNldHVwV2ViU29ja2V0KGRldlRvb2xzU2V0dGluZ3MpIHtcbiAgLy8gQ2xlYXIgYW55IHBlbmRpbmcgdGltZW91dHNcbiAgaWYgKHdzUmVjb25uZWN0VGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh3c1JlY29ubmVjdFRpbWVvdXQpXG4gICAgd3NSZWNvbm5lY3RUaW1lb3V0ID0gbnVsbFxuICB9XG5cbiAgaWYgKGhlYXJ0YmVhdEludGVydmFsKSB7XG4gICAgY2xlYXJJbnRlcnZhbChoZWFydGJlYXRJbnRlcnZhbClcbiAgICBoZWFydGJlYXRJbnRlcnZhbCA9IG51bGxcbiAgfVxuXG4gIC8vIENsb3NlIGV4aXN0aW5nIFdlYlNvY2tldCBpZiBhbnlcbiAgaWYgKHdzKSB7XG4gICAgLy8gU2V0IGZsYWcgdG8gaW5kaWNhdGUgdGhpcyBpcyBhbiBpbnRlbnRpb25hbCBjbG9zdXJlXG4gICAgaW50ZW50aW9uYWxDbG9zdXJlID0gdHJ1ZVxuICAgIHRyeSB7XG4gICAgICB3cy5jbG9zZSgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNsb3NpbmcgZXhpc3RpbmcgV2ViU29ja2V0OlwiLCBlKVxuICAgIH1cbiAgICB3cyA9IG51bGxcbiAgICBpbnRlbnRpb25hbENsb3N1cmUgPSBmYWxzZSAvLyBSZXNldCBmbGFnXG4gIH1cblxuICAvLyBWYWxpZGF0ZSBzZXJ2ZXIgaWRlbnRpdHkgYmVmb3JlIGNvbm5lY3RpbmdcbiAgY29uc29sZS5sb2coXCJWYWxpZGF0aW5nIHNlcnZlciBpZGVudGl0eSBiZWZvcmUgV2ViU29ja2V0IGNvbm5lY3Rpb24uLi5cIilcbiAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZhbGlkYXRlU2VydmVySWRlbnRpdHkoKVxuXG4gIGlmICghaXNWYWxpZCkge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIkNhbm5vdCBlc3RhYmxpc2ggV2ViU29ja2V0OiBOb3QgY29ubmVjdGVkIHRvIGEgdmFsaWQgYnJvd3NlciB0b29scyBzZXJ2ZXJcIlxuICAgIClcbiAgICAvLyBTZXQgZmxhZyB0byBpbmRpY2F0ZSB3ZSBuZWVkIHRvIHJlY29ubmVjdCBhZnRlciBhIHBhZ2UgcmVmcmVzaCBjaGVja1xuICAgIHJlY29ubmVjdEFmdGVyVmFsaWRhdGlvbiA9IHRydWVcblxuICAgIC8vIFRyeSBhZ2FpbiBhZnRlciBkZWxheVxuICAgIHdzUmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJBdHRlbXB0aW5nIHRvIHJlY29ubmVjdCBXZWJTb2NrZXQgYWZ0ZXIgdmFsaWRhdGlvbiBmYWlsdXJlXCIpXG4gICAgICBzZXR1cFdlYlNvY2tldChkZXZUb29sc1NldHRpbmdzKVxuICAgIH0sIFdTX1JFQ09OTkVDVF9ERUxBWSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIFJlc2V0IHJlY29ubmVjdCBmbGFnIHNpbmNlIHZhbGlkYXRpb24gc3VjY2VlZGVkXG4gIHJlY29ubmVjdEFmdGVyVmFsaWRhdGlvbiA9IGZhbHNlXG5cbiAgY29uc3Qgd3NVcmwgPSBgd3M6Ly8ke2RldlRvb2xzU2V0dGluZ3Muc2VydmVySG9zdH06JHtkZXZUb29sc1NldHRpbmdzLnNlcnZlclBvcnR9L2V4dGVuc2lvbi13c2BcbiAgY29uc29sZS5sb2coYENvbm5lY3RpbmcgdG8gV2ViU29ja2V0IGF0ICR7d3NVcmx9YClcblxuICB0cnkge1xuICAgIHdzID0gbmV3IFdlYlNvY2tldCh3c1VybClcblxuICAgIC8vIFNldCBhIGNvbm5lY3Rpb24gdGltZW91dFxuICAgIGNvbnN0IGNvbm5lY3Rpb25UaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh3cyAmJiB3cy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBXZWJTb2NrZXQgY29ubmVjdGlvbiB0aW1lb3V0IGFmdGVyICR7V1NfQ09OTkVDVElPTl9USU1FT1VUfW1zYFxuICAgICAgICApXG4gICAgICAgIC8vIEZvcmNlIGNsb3NlIGFuZCB0cmlnZ2VyIHJlY29ubmVjdFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHdzLmNsb3NlKClcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjbG9zaW5nIHRpbWVkIG91dCBXZWJTb2NrZXQ6XCIsIGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBXU19DT05ORUNUSU9OX1RJTUVPVVQpXG5cbiAgICB3cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAvLyBDbGVhciB0aGUgY29ubmVjdGlvbiB0aW1lb3V0XG4gICAgICBjbGVhclRpbWVvdXQoY29ubmVjdGlvblRpbWVvdXRJZClcblxuICAgICAgY29uc29sZS5sb2coYENocm9tZSBFeHRlbnNpb246IFdlYlNvY2tldCBjb25uZWN0ZWQgdG8gJHt3c1VybH1gKVxuXG4gICAgICAvLyBTdGFydCBoZWFydGJlYXQgdG8ga2VlcCBjb25uZWN0aW9uIGFsaXZlXG4gICAgICBoZWFydGJlYXRJbnRlcnZhbCA9IHNldEludGVydmFsKHNlbmRIZWFydGJlYXQsIEhFQVJUQkVBVF9JTlRFUlZBTClcblxuICAgICAgLy8gTm90aWZ5IHRoYXQgY29ubmVjdGlvbiBpcyBzdWNjZXNzZnVsXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6IFwiV0VCU09DS0VUX0NPTk5FQ1RFRFwiLFxuICAgICAgICBzZXJ2ZXJIb3N0OiBkZXZUb29sc1NldHRpbmdzLnNlcnZlckhvc3QsXG4gICAgICAgIHNlcnZlclBvcnQ6IGRldlRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydFxuICAgICAgfSlcblxuICAgICAgLy8gU2VuZCB0aGUgY3VycmVudCBVUkwgdG8gdGhlIHNlcnZlciByaWdodCBhZnRlciBjb25uZWN0aW9uXG4gICAgICAvLyBUaGlzIGVuc3VyZXMgdGhlIHNlcnZlciBoYXMgdGhlIFVSTCBldmVuIGlmIG5vIG5hdmlnYXRpb24gb2NjdXJzXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwiR0VUX0NVUlJFTlRfVVJMXCIsXG4gICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWRcbiAgICAgICAgfSxcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBFcnJvciBnZXR0aW5nIFVSTCBmcm9tIGJhY2tncm91bmQgb24gY29ubmVjdGlvbjpcIixcbiAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIC8vIFNlbmQgZXJyb3IgcmVzcG9uc2Ugc2luY2Ugd2UgY2FuJ3QgZ2V0IHRoZSBVUkxcbiAgICAgICAgICAgIHdzLnNlbmQoXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImN1cnJlbnQtdXJsLXJlc3BvbnNlXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIHRhYklkOiBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBnZXQgVVJMOiBcIiArIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbnVsbFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnVybCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogR290IFVSTCBmcm9tIGJhY2tncm91bmQ6XCIsXG4gICAgICAgICAgICAgIHJlc3BvbnNlLnVybFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgd3Muc2VuZChcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmxcIixcbiAgICAgICAgICAgICAgICB1cmw6IHJlc3BvbnNlLnVybCxcbiAgICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgcmVzcG9uc2UgZXhpc3RzIGJ1dCBubyBVUkwsIHRyeSBmYWxsYmFja1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogVHJ5aW5nIGZhbGxiYWNrIG1ldGhvZCB0byBnZXQgVVJMXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgdGhlIFVSTCBkaXJlY3RseSB1c2luZyB0aGUgdGFicyBBUElcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBGYWxsYmFjayBVUkwgcmV0cmlldmFsIGZhaWxlZDpcIixcbiAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvclxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHVybCA9IHRhYnMgJiYgdGFic1swXSAmJiB0YWJzWzBdLnVybFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IEdvdCBVUkwgZGlyZWN0bHkgZnJvbSB0YWI6XCIsIHVybClcblxuICAgICAgICAgICAgICBpZiAod3MgJiYgd3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImN1cnJlbnQtdXJsXCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHRhYklkOiBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkLFxuICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDaHJvbWUgRXh0ZW5zaW9uOiBXZWJTb2NrZXQgbm90IG9wZW4gdG8gc2VuZCBVUkxcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcblxuICAgICAgLy8gRmFsbGJhY2sgbWV0aG9kIHRvIGdldCBVUkwgZGlyZWN0bHlcbiAgICAgIGZ1bmN0aW9uIHRyeUZhbGxiYWNrR2V0VXJsKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFRyeWluZyBmYWxsYmFjayBtZXRob2QgdG8gZ2V0IFVSTFwiKVxuXG4gICAgICAgIC8vIFRyeSB0byBnZXQgdGhlIFVSTCBkaXJlY3RseSB1c2luZyB0aGUgdGFicyBBUElcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEZhbGxiYWNrIFVSTCByZXRyaWV2YWwgZmFpbGVkOlwiLFxuICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHVybCA9IHRhYnMgJiYgdGFic1swXSAmJiB0YWJzWzBdLnVybFxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hyb21lIEV4dGVuc2lvbjogR290IFVSTCBkaXJlY3RseSBmcm9tIHRhYjpcIiwgdXJsKVxuXG4gICAgICAgICAgaWYgKHdzICYmIHdzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJjdXJyZW50LXVybFwiLFxuICAgICAgICAgICAgICAgIHVybDogdXJsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDaHJvbWUgRXh0ZW5zaW9uOiBXZWJTb2NrZXQgbm90IG9wZW4gdG8gc2VuZCBVUkxcIilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgd3Mub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgLy8gQ2xlYXIgdGhlIGNvbm5lY3Rpb24gdGltZW91dFxuICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0SWQpXG5cbiAgICAgIGNvbnNvbGUuZXJyb3IoYENocm9tZSBFeHRlbnNpb246IFdlYlNvY2tldCBlcnJvciBmb3IgJHt3c1VybH06YCwgZXJyb3IpXG5cbiAgICAgIC8vIE5vdGlmeSBhYm91dCB0aGUgV2ViU29ja2V0IGVycm9yXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgIHR5cGU6IFwiV0VCU09DS0VUX0VSUk9SXCIsXG4gICAgICAgIGVycm9yOiBcIkNvbm5lY3Rpb24gZXJyb3JcIixcbiAgICAgICAgc2VydmVySG9zdDogZGV2VG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZUb29sc1NldHRpbmdzLnNlcnZlclBvcnRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgd3Mub25jbG9zZSA9IChldmVudCkgPT4ge1xuICAgICAgLy8gQ2xlYXIgdGhlIGNvbm5lY3Rpb24gdGltZW91dFxuICAgICAgY2xlYXJUaW1lb3V0KGNvbm5lY3Rpb25UaW1lb3V0SWQpXG5cbiAgICAgIGNvbnNvbGUubG9nKGBDaHJvbWUgRXh0ZW5zaW9uOiBXZWJTb2NrZXQgY2xvc2VkIGZvciAke3dzVXJsfTpgLCBldmVudClcblxuICAgICAgLy8gU3RvcCBoZWFydGJlYXRcbiAgICAgIGlmIChoZWFydGJlYXRJbnRlcnZhbCkge1xuICAgICAgICBjbGVhckludGVydmFsKGhlYXJ0YmVhdEludGVydmFsKVxuICAgICAgICBoZWFydGJlYXRJbnRlcnZhbCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgLy8gRG9uJ3QgcmVjb25uZWN0IGlmIHRoaXMgd2FzIGFuIGludGVudGlvbmFsIGNsb3N1cmVcbiAgICAgIGlmIChpbnRlbnRpb25hbENsb3N1cmUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBJbnRlbnRpb25hbCBXZWJTb2NrZXQgY2xvc3VyZSwgbm90IHJlY29ubmVjdGluZ1wiXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgYXR0ZW1wdCB0byByZWNvbm5lY3QgaWYgdGhlIGNsb3N1cmUgd2Fzbid0IGludGVudGlvbmFsXG4gICAgICAvLyBDb2RlIDEwMDAgKE5vcm1hbCBDbG9zdXJlKSBhbmQgMTAwMSAoR29pbmcgQXdheSkgYXJlIG5vcm1hbCBjbG9zdXJlc1xuICAgICAgLy8gQ29kZSAxMDA1IG9mdGVuIGhhcHBlbnMgd2l0aCBjbGVhbiBjbG9zdXJlcyBpbiBDaHJvbWVcbiAgICAgIGNvbnN0IGlzQWJub3JtYWxDbG9zdXJlID0gIShldmVudC5jb2RlID09PSAxMDAwIHx8IGV2ZW50LmNvZGUgPT09IDEwMDEpXG5cbiAgICAgIC8vIENoZWNrIGlmIHRoaXMgd2FzIGFuIGFibm9ybWFsIGNsb3N1cmUgb3IgaWYgd2UgbmVlZCB0byByZWNvbm5lY3QgYWZ0ZXIgdmFsaWRhdGlvblxuICAgICAgaWYgKGlzQWJub3JtYWxDbG9zdXJlIHx8IHJlY29ubmVjdEFmdGVyVmFsaWRhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgQ2hyb21lIEV4dGVuc2lvbjogV2lsbCBhdHRlbXB0IHRvIHJlY29ubmVjdCBXZWJTb2NrZXQgKGNsb3N1cmUgY29kZTogJHtldmVudC5jb2RlfSlgXG4gICAgICAgIClcblxuICAgICAgICAvLyBOb3RpZnkgYWJvdXQgdGhlIFdlYlNvY2tldCBjbG9zdXJlXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiBcIldFQlNPQ0tFVF9DTE9TRURcIixcbiAgICAgICAgICBjb2RlOiBldmVudC5jb2RlLFxuICAgICAgICAgIHJlYXNvbjogZXZlbnQucmVhc29uLFxuICAgICAgICAgIHdhc0NsZWFuOiBldmVudC53YXNDbGVhbixcbiAgICAgICAgICB3aWxsUmVjb25uZWN0OiB0cnVlLFxuICAgICAgICAgIHNlcnZlckhvc3Q6IGRldlRvb2xzU2V0dGluZ3Muc2VydmVySG9zdCxcbiAgICAgICAgICBzZXJ2ZXJQb3J0OiBkZXZUb29sc1NldHRpbmdzLnNlcnZlclBvcnRcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBUcnkgdG8gcmVjb25uZWN0IGFmdGVyIGRlbGF5XG4gICAgICAgIHdzUmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYENocm9tZSBFeHRlbnNpb246IEF0dGVtcHRpbmcgdG8gcmVjb25uZWN0IFdlYlNvY2tldCB0byAke3dzVXJsfWBcbiAgICAgICAgICApXG4gICAgICAgICAgc2V0dXBXZWJTb2NrZXQoZGV2VG9vbHNTZXR0aW5ncylcbiAgICAgICAgfSwgV1NfUkVDT05ORUNUX0RFTEFZKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYENocm9tZSBFeHRlbnNpb246IE5vcm1hbCBXZWJTb2NrZXQgY2xvc3VyZSwgbm90IHJlY29ubmVjdGluZyBhdXRvbWF0aWNhbGx5YFxuICAgICAgICApXG5cbiAgICAgICAgLy8gTm90aWZ5IGFib3V0IHRoZSBXZWJTb2NrZXQgY2xvc3VyZVxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogXCJXRUJTT0NLRVRfQ0xPU0VEXCIsXG4gICAgICAgICAgY29kZTogZXZlbnQuY29kZSxcbiAgICAgICAgICByZWFzb246IGV2ZW50LnJlYXNvbixcbiAgICAgICAgICB3YXNDbGVhbjogZXZlbnQud2FzQ2xlYW4sXG4gICAgICAgICAgd2lsbFJlY29ubmVjdDogZmFsc2UsXG4gICAgICAgICAgc2VydmVySG9zdDogZGV2VG9vbHNTZXR0aW5ncy5zZXJ2ZXJIb3N0LFxuICAgICAgICAgIHNlcnZlclBvcnQ6IGRldlRvb2xzU2V0dGluZ3Muc2VydmVyUG9ydFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHdzLm9ubWVzc2FnZSA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSlcblxuICAgICAgICAvLyBEb24ndCBsb2cgaGVhcnRiZWF0IHJlc3BvbnNlcyB0byByZWR1Y2Ugbm9pc2VcbiAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSAhPT0gXCJoZWFydGJlYXQtcmVzcG9uc2VcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hyb21lIEV4dGVuc2lvbjogUmVjZWl2ZWQgV2ViU29ja2V0IG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgZGlmZmVyZW50IG1lc3NhZ2UgdHlwZXNcbiAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJoZWFydGJlYXQtcmVzcG9uc2VcIikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2hyb21lIEV4dGVuc2lvbjogUmVjZWl2ZWQgaGVhcnRiZWF0IHJlc3BvbnNlXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gXCJ0YWtlLXNjcmVlbnNob3RcIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hyb21lIEV4dGVuc2lvbjogVGFraW5nIHNjcmVlbnNob3QuLi5cIilcblxuICAgICAgICAgIC8vIE5vdGlmeSB0aGF0IHdlJ3JlIHByb2Nlc3NpbmcgYSBzY3JlZW5zaG90IHJlcXVlc3RcbiAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiBcIlNDUkVFTlNIT1RfUkVRVUVTVEVEXCIsXG4gICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC8vIENhcHR1cmUgc2NyZWVuc2hvdCBvZiB0aGUgY3VycmVudCB0YWJcbiAgICAgICAgICBjaHJvbWUudGFicy5jYXB0dXJlVmlzaWJsZVRhYihudWxsLCB7IGZvcm1hdDogXCJwbmdcIiB9LCAoZGF0YVVybCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogU2NyZWVuc2hvdCBjYXB0dXJlIGZhaWxlZDpcIixcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3JcbiAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgIC8vIFNlbmQgZXJyb3IgdG8gc2VydmVyIHZpYSBXZWJTb2NrZXRcbiAgICAgICAgICAgICAgaWYgKHdzICYmIHdzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICAgICAgICAgICAgd3Muc2VuZChcbiAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzY3JlZW5zaG90LWVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IG5vdCBvcGVuIHRvIHNlbmQgc2NyZWVuc2hvdCBlcnJvclwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gQWxzbyBub3RpZnkgYmFja2dyb3VuZCBzY3JpcHQgYWJvdXQgdGhlIGZhaWx1cmVcbiAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiU0NSRUVOU0hPVF9GQUlMRURcIixcbiAgICAgICAgICAgICAgICBlcnJvcjogY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZFxuICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFNjcmVlbnNob3QgY2FwdHVyZWQgc3VjY2Vzc2Z1bGx5XCIpXG5cbiAgICAgICAgICAgIC8vIEp1c3Qgc2VuZCB0aGUgc2NyZWVuc2hvdCBkYXRhLCBsZXQgdGhlIHNlcnZlciBoYW5kbGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICB0eXBlOiBcInNjcmVlbnNob3QtZGF0YVwiLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhVXJsLFxuICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuICAgICAgICAgICAgICAvLyBPbmx5IGluY2x1ZGUgcGF0aCBpZiBpdCdzIGNvbmZpZ3VyZWQgaW4gc2V0dGluZ3NcbiAgICAgICAgICAgICAgLi4uKGRldlRvb2xzU2V0dGluZ3Muc2NyZWVuc2hvdFBhdGggJiYge1xuICAgICAgICAgICAgICAgIHBhdGg6IGRldlRvb2xzU2V0dGluZ3Muc2NyZWVuc2hvdFBhdGhcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIC8vIEluY2x1ZGUgYXV0by1wYXN0ZSBzZXR0aW5nXG4gICAgICAgICAgICAgIGF1dG9QYXN0ZTogZGV2VG9vbHNTZXR0aW5ncy5hbGxvd0F1dG9QYXN0ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IFNlbmRpbmcgc2NyZWVuc2hvdCBkYXRhIHJlc3BvbnNlXCIsIHtcbiAgICAgICAgICAgICAgLi4ucmVzcG9uc2UsXG4gICAgICAgICAgICAgIGRhdGE6IFwiW2Jhc2U2NCBkYXRhXVwiXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBDaGVjayBXZWJTb2NrZXQgc3RhdGUgYmVmb3JlIHNlbmRpbmdcbiAgICAgICAgICAgIGlmICh3cyAmJiB3cy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKVxuXG4gICAgICAgICAgICAgICAgLy8gTm90aWZ5IGJhY2tncm91bmQgc2NyaXB0IGFib3V0IHN1Y2Nlc3NcbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBcIlNDUkVFTlNIT1RfU1VDQ0VFREVEXCIsXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgICAgXCJDaHJvbWUgRXh0ZW5zaW9uOiBFcnJvciBzZW5kaW5nIHNjcmVlbnNob3QgZGF0YTpcIixcbiAgICAgICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgLy8gTm90aWZ5IGJhY2tncm91bmQgc2NyaXB0IGFib3V0IHRoZSBmYWlsdXJlXG4gICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgdHlwZTogXCJTQ1JFRU5TSE9UX0ZBSUxFRFwiLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIHNlbmQgc2NyZWVuc2hvdCBkYXRhOiBcIiArIGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBgQ2hyb21lIEV4dGVuc2lvbjogV2ViU29ja2V0IG5vdCBvcGVuIHRvIHNlbmQgc2NyZWVuc2hvdCBkYXRhIChzdGF0ZTogJHt3cyA/IHdzLnJlYWR5U3RhdGUgOiBcIm51bGxcIn0pYFxuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgLy8gTm90aWZ5IGJhY2tncm91bmQgc2NyaXB0IGFib3V0IHRoZSBmYWlsdXJlXG4gICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlNDUkVFTlNIT1RfRkFJTEVEXCIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiV2ViU29ja2V0IG5vdCBvcGVuIHRvIHNlbmQgc2NyZWVuc2hvdCBkYXRhXCIsXG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiBtZXNzYWdlLnJlcXVlc3RJZFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS50eXBlID09PSBcImdldC1jdXJyZW50LXVybFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJDaHJvbWUgRXh0ZW5zaW9uOiBSZWNlaXZlZCByZXF1ZXN0IGZvciBjdXJyZW50IFVSTFwiKVxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiBcIkdFVF9DVVJSRU5UX1VSTFwiLFxuICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiQ2hyb21lIEV4dGVuc2lvbjogRXJyb3IgZ2V0dGluZyBVUkwgZnJvbSBiYWNrZ3JvdW5kOlwiLFxuICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yXG4gICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgLy8gU2VuZCBlcnJvciByZXNwb25zZSBzaW5jZSB3ZSBjYW4ndCBnZXQgdGhlIFVSTFxuICAgICAgICAgICAgICAgIHdzLnNlbmQoXG4gICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmwtcmVzcG9uc2VcIixcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0YWJJZDogY2hyb21lLmRldnRvb2xzLmluc3BlY3RlZFdpbmRvdy50YWJJZCxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIGdldCBVUkw6IFwiICsgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWRcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gU3VjY2Vzc2Z1bGx5IGdvdCBVUkwgZnJvbSBiYWNrZ3JvdW5kIHNjcmlwdFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNocm9tZSBFeHRlbnNpb246IEdvdCBVUkwgZnJvbSBiYWNrZ3JvdW5kOlwiLCByZXNwb25zZS51cmwpXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB3cy5zZW5kKFxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY3VycmVudC11cmwtcmVzcG9uc2VcIixcbiAgICAgICAgICAgICAgICAgIHVybDogcmVzcG9uc2UudXJsLFxuICAgICAgICAgICAgICAgICAgdGFiSWQ6IGNocm9tZS5kZXZ0b29scy5pbnNwZWN0ZWRXaW5kb3cudGFiSWQsXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkNocm9tZSBFeHRlbnNpb246IEVycm9yIHByb2Nlc3NpbmcgV2ViU29ja2V0IG1lc3NhZ2U6XCIsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgV2ViU29ja2V0OlwiLCBlcnJvcilcbiAgICAvLyBUcnkgYWdhaW4gYWZ0ZXIgZGVsYXlcbiAgICB3c1JlY29ubmVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldHVwV2ViU29ja2V0KGRldlRvb2xzU2V0dGluZ3MpXG4gICAgfSwgV1NfUkVDT05ORUNUX0RFTEFZKVxuICB9XG59XG5cbi8qKlxuICogQ2xvc2UgZXhpc3RpbmcgV2ViU29ja2V0IGNvbm5lY3Rpb24gYW5kIHJlc2V0IHN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUV4aXN0aW5nV2ViU29ja2V0KCk6IHZvaWQge1xuICBpZiAod3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNsb3NpbmcgZXhpc3RpbmcgV2ViU29ja2V0XCIpXG4gICAgaW50ZW50aW9uYWxDbG9zdXJlID0gdHJ1ZSAvLyBNYXJrIGFzIGludGVudGlvbmFsIHRvIHByZXZlbnQgYXV0by1yZWNvbm5lY3RcbiAgICB0cnkge1xuICAgICAgd3MuY2xvc2UoKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjbG9zaW5nIFdlYlNvY2tldDpcIiwgZSlcbiAgICB9XG4gICAgd3MgPSBudWxsXG4gICAgaW50ZW50aW9uYWxDbG9zdXJlID0gZmFsc2UgLy8gUmVzZXQgZmxhZ1xuICB9XG59XG5cbi8qKlxuICogSGFuZGxlIHJlY29ubmVjdGlvbiBhZnRlciBwYWdlIHJlZnJlc2hcbiAqIEBwYXJhbSBzZXR0aW5ncyBEZXZUb29scyBzZXR0aW5ncyBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVJlY29ubmVjdEFmdGVyUGFnZVJlZnJlc2goc2V0dGluZ3M6IGFueSk6IHZvaWQge1xuICAvLyBDbG9zZSBleGlzdGluZyBXZWJTb2NrZXQgaWYgYW55XG4gIGNsb3NlRXhpc3RpbmdXZWJTb2NrZXQoKVxuICBcbiAgLy8gQ2xlYXIgYW55IHBlbmRpbmcgcmVjb25uZWN0IHRpbWVvdXRzXG4gIGNsZWFyUmVjb25uZWN0VGltZW91dCgpXG4gIFxuICAvLyBUcnkgdG8gcmVlc3RhYmxpc2ggdGhlIFdlYlNvY2tldCBjb25uZWN0aW9uXG4gIHNldHVwV2ViU29ja2V0KHNldHRpbmdzKVxufVxuIiwiaW1wb3J0IHsgZGV2dG9vbHNTZXR0aW5ncyB9IGZyb20gXCIuLi9kZXZ0b29sc1wiXG5cbi8vIEZ1bmN0aW9uIHRvIGNsZWFyIGxvZ3Mgb24gdGhlIHNlcnZlclxuZXhwb3J0IGZ1bmN0aW9uIHdpcGVMb2dzKCkge1xuICBjb25zb2xlLmxvZyhcIldpcGluZyBhbGwgbG9ncy4uLlwiKVxuXG4gIGNvbnN0IHNlcnZlclVybCA9IGBodHRwOi8vJHtkZXZ0b29sc1NldHRpbmdzLnNlcnZlckhvc3R9OiR7ZGV2dG9vbHNTZXR0aW5ncy5zZXJ2ZXJQb3J0fS93aXBlbG9nc2BcbiAgY29uc29sZS5sb2coYFNlbmRpbmcgd2lwZSByZXF1ZXN0IHRvICR7c2VydmVyVXJsfWApXG5cbiAgZmV0Y2goc2VydmVyVXJsLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJMb2dzIHdpcGVkIHN1Y2Nlc3NmdWxseTpcIiwgZGF0YSlcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aXBpbmcgbG9nczpcIiwgZXJyb3IpXG4gICAgfSlcbn1cbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiQHBsYXNtb2hxL3N0b3JhZ2VcIlxuXG4vLyBEZWZpbmUgdGhlIHNldHRpbmdzIGludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3Mge1xuICBsb2dMaW1pdDogbnVtYmVyXG4gIHF1ZXJ5TGltaXQ6IG51bWJlclxuICBzdHJpbmdTaXplTGltaXQ6IG51bWJlclxuICBtYXhMb2dTaXplOiBudW1iZXJcbiAgc2hvd1JlcXVlc3RIZWFkZXJzOiBib29sZWFuXG4gIHNob3dSZXNwb25zZUhlYWRlcnM6IGJvb2xlYW5cbiAgc2NyZWVuc2hvdFBhdGg6IHN0cmluZ1xuICBzZXJ2ZXJIb3N0OiBzdHJpbmdcbiAgc2VydmVyUG9ydDogbnVtYmVyXG4gIGFsbG93QXV0b1Bhc3RlOiBib29sZWFuXG59XG5cbi8vIERlZmF1bHQgc2V0dGluZ3NcbmV4cG9ydCBjb25zdCBkZWZhdWx0U2V0dGluZ3M6IEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncyA9IHtcbiAgbG9nTGltaXQ6IDUwLFxuICBxdWVyeUxpbWl0OiAzMDAwMCxcbiAgc3RyaW5nU2l6ZUxpbWl0OiA1MDAsXG4gIG1heExvZ1NpemU6IDIwMDAwLFxuICBzaG93UmVxdWVzdEhlYWRlcnM6IGZhbHNlLFxuICBzaG93UmVzcG9uc2VIZWFkZXJzOiBmYWxzZSxcbiAgc2NyZWVuc2hvdFBhdGg6IFwiXCIsXG4gIHNlcnZlckhvc3Q6IFwibG9jYWxob3N0XCIsXG4gIHNlcnZlclBvcnQ6IDMwMjUsXG4gIGFsbG93QXV0b1Bhc3RlOiBmYWxzZVxufVxuXG4vLyBDcmVhdGUgYSBzdG9yYWdlIGluc3RhbmNlXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2Uoe1xuICBhcmVhOiBcImxvY2FsXCJcbn0pXG5cbi8vIEtleSBmb3Igc3RvcmluZyBzZXR0aW5nc1xuY29uc3QgU0VUVElOR1NfS0VZID0gXCJicm93c2VyQ29ubmVjdG9yU2V0dGluZ3NcIlxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBzZXR0aW5nc1xuICogQHJldHVybnMgUHJvbWlzZSB3aXRoIHRoZSBjdXJyZW50IHNldHRpbmdzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncz4ge1xuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHN0b3JhZ2UuZ2V0PEJyb3dzZXJDb25uZWN0b3JTZXR0aW5ncz4oU0VUVElOR1NfS0VZKVxuICByZXR1cm4gc2V0dGluZ3MgPyB7IC4uLmRlZmF1bHRTZXR0aW5ncywgLi4uc2V0dGluZ3MgfSA6IHsgLi4uZGVmYXVsdFNldHRpbmdzIH1cbn1cblxuLyoqXG4gKiBTYXZlIHNldHRpbmdzXG4gKiBAcGFyYW0gc2V0dGluZ3MgVGhlIHNldHRpbmdzIHRvIHNhdmVcbiAqIEByZXR1cm5zIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHNldHRpbmdzIGFyZSBzYXZlZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVNldHRpbmdzKFxuICBzZXR0aW5nczogUGFydGlhbDxCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3M+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY3VycmVudFNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKVxuICBjb25zdCBuZXdTZXR0aW5ncyA9IHsgLi4uY3VycmVudFNldHRpbmdzLCAuLi5zZXR0aW5ncyB9XG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFNFVFRJTkdTX0tFWSwgbmV3U2V0dGluZ3MpXG4gIFxuICAvLyBOb3RpZnkgYWxsIHBhcnRzIG9mIHRoZSBleHRlbnNpb24gYWJvdXQgdGhlIHNldHRpbmdzIHVwZGF0ZVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgdHlwZTogXCJTRVRUSU5HU19VUERBVEVEXCIsXG4gICAgc2V0dGluZ3M6IG5ld1NldHRpbmdzXG4gIH0pXG59XG5cbi8qKlxuICogTGlzdGVuIGZvciBzZXR0aW5ncyBjaGFuZ2VzXG4gKiBAcGFyYW0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHNldHRpbmdzIGNoYW5nZVxuICogQHJldHVybnMgRnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uU2V0dGluZ3NDaGFuZ2VkKFxuICBjYWxsYmFjazogKHNldHRpbmdzOiBCcm93c2VyQ29ubmVjdG9yU2V0dGluZ3MpID0+IHZvaWRcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBsaXN0ZW5lciA9IChjaGFuZ2VzLCBhcmVhKSA9PiB7XG4gICAgaWYgKGFyZWEgPT09IFwibG9jYWxcIiAmJiBTRVRUSU5HU19LRVkgaW4gY2hhbmdlcykge1xuICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSBjaGFuZ2VzW1NFVFRJTkdTX0tFWV0ubmV3VmFsdWVcbiAgICAgIGNhbGxiYWNrKG5ld1NldHRpbmdzKVxuICAgIH1cbiAgfVxuICBcbiAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKGxpc3RlbmVyKVxuICBcbiAgLy8gQWxzbyBsaXN0ZW4gZm9yIHJ1bnRpbWUgbWVzc2FnZXMgYWJvdXQgc2V0dGluZ3MgdXBkYXRlc1xuICBjb25zdCBtZXNzYWdlTGlzdGVuZXIgPSAobWVzc2FnZSkgPT4ge1xuICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IFwiU0VUVElOR1NfVVBEQVRFRFwiKSB7XG4gICAgICBjYWxsYmFjayhtZXNzYWdlLnNldHRpbmdzKVxuICAgIH1cbiAgfVxuICBcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VMaXN0ZW5lcilcbiAgXG4gIC8vIFJldHVybiBhIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKVxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5yZW1vdmVMaXN0ZW5lcihtZXNzYWdlTGlzdGVuZXIpXG4gIH1cbn1cbiIsImltcG9ydCBtIGZyb21cInBpZnlcIjt2YXIgbD0oKT0+e3RyeXtsZXQgZT0oZ2xvYmFsVGhpcy5uYXZpZ2F0b3I/LnVzZXJBZ2VudCkubWF0Y2goLyhvcGVyYXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8bXNpZXx0cmlkZW50KD89XFwvKSlcXC8/XFxzKihcXGQrKS9pKXx8W107aWYoZVsxXT09PVwiQ2hyb21lXCIpcmV0dXJuIHBhcnNlSW50KGVbMl0pPDEwMHx8Z2xvYmFsVGhpcy5jaHJvbWUucnVudGltZT8uZ2V0TWFuaWZlc3QoKT8ubWFuaWZlc3RfdmVyc2lvbj09PTJ9Y2F0Y2h7cmV0dXJuITF9cmV0dXJuITF9O3ZhciBvPWNsYXNzeyNyOyN0O2dldCBwcmltYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI3R9I2U7Z2V0IHNlY29uZGFyeUNsaWVudCgpe3JldHVybiB0aGlzLiNlfSNhO2dldCBhcmVhKCl7cmV0dXJuIHRoaXMuI2F9Z2V0IGhhc1dlYkFwaSgpe3RyeXtyZXR1cm4gdHlwZW9mIHdpbmRvdzxcInVcIiYmISF3aW5kb3cubG9jYWxTdG9yYWdlfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX0jcz1uZXcgTWFwOyNpO2dldCBjb3BpZWRLZXlTZXQoKXtyZXR1cm4gdGhpcy4jaX1pc0NvcGllZD1lPT50aGlzLmhhc1dlYkFwaSYmKHRoaXMuYWxsQ29waWVkfHx0aGlzLmNvcGllZEtleVNldC5oYXMoZSkpOyNuPSExO2dldCBhbGxDb3BpZWQoKXtyZXR1cm4gdGhpcy4jbn1nZXRFeHRTdG9yYWdlQXBpPSgpPT5nbG9iYWxUaGlzLmJyb3dzZXI/LnN0b3JhZ2V8fGdsb2JhbFRoaXMuY2hyb21lPy5zdG9yYWdlO2dldCBoYXNFeHRlbnNpb25BcGkoKXt0cnl7cmV0dXJuISF0aGlzLmdldEV4dFN0b3JhZ2VBcGkoKX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19aXNXYXRjaFN1cHBvcnRlZD0oKT0+dGhpcy5oYXNFeHRlbnNpb25BcGk7a2V5TmFtZXNwYWNlPVwiXCI7aXNWYWxpZEtleT1lPT5lLnN0YXJ0c1dpdGgodGhpcy5rZXlOYW1lc3BhY2UpO2dldE5hbWVzcGFjZWRLZXk9ZT0+YCR7dGhpcy5rZXlOYW1lc3BhY2V9JHtlfWA7Z2V0VW5uYW1lc3BhY2VkS2V5PWU9PmUuc2xpY2UodGhpcy5rZXlOYW1lc3BhY2UubGVuZ3RoKTtzZXJkZT17c2VyaWFsaXplcjpKU09OLnN0cmluZ2lmeSxkZXNlcmlhbGl6ZXI6SlNPTi5wYXJzZX07Y29uc3RydWN0b3Ioe2FyZWE6ZT1cInN5bmNcIixhbGxDb3BpZWQ6dD0hMSxjb3BpZWRLZXlMaXN0OnM9W10sc2VyZGU6cj17fX09e30pe3RoaXMuc2V0Q29waWVkS2V5U2V0KHMpLHRoaXMuI2E9ZSx0aGlzLiNuPXQsdGhpcy5zZXJkZT17Li4udGhpcy5zZXJkZSwuLi5yfTt0cnl7dGhpcy5oYXNXZWJBcGkmJih0fHxzLmxlbmd0aD4wKSYmKHRoaXMuI2U9d2luZG93LmxvY2FsU3RvcmFnZSl9Y2F0Y2h7fXRyeXt0aGlzLmhhc0V4dGVuc2lvbkFwaSYmKHRoaXMuI3I9dGhpcy5nZXRFeHRTdG9yYWdlQXBpKCksbCgpP3RoaXMuI3Q9bSh0aGlzLiNyW3RoaXMuYXJlYV0se2V4Y2x1ZGU6W1wiZ2V0Qnl0ZXNJblVzZVwiXSxlcnJvckZpcnN0OiExfSk6dGhpcy4jdD10aGlzLiNyW3RoaXMuYXJlYV0pfWNhdGNoe319c2V0Q29waWVkS2V5U2V0KGUpe3RoaXMuI2k9bmV3IFNldChlKX1yYXdHZXRBbGw9KCk9PnRoaXMuI3Q/LmdldCgpO2dldEFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTtyZXR1cm4gT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzVmFsaWRLZXkodCkpLnJlZHVjZSgodCxbcyxyXSk9Pih0W3RoaXMuZ2V0VW5uYW1lc3BhY2VkS2V5KHMpXT1yLHQpLHt9KX07Y29weT1hc3luYyBlPT57bGV0IHQ9ZT09PXZvaWQgMDtpZighdCYmIXRoaXMuY29waWVkS2V5U2V0LmhhcyhlKXx8IXRoaXMuYWxsQ29waWVkfHwhdGhpcy5oYXNFeHRlbnNpb25BcGkpcmV0dXJuITE7bGV0IHM9dGhpcy5hbGxDb3BpZWQ/YXdhaXQgdGhpcy5yYXdHZXRBbGwoKTphd2FpdCB0aGlzLiN0LmdldCgodD9bLi4udGhpcy5jb3BpZWRLZXlTZXRdOltlXSkubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSkpO2lmKCFzKXJldHVybiExO2xldCByPSExO2ZvcihsZXQgYSBpbiBzKXtsZXQgaT1zW2FdLG49dGhpcy4jZT8uZ2V0SXRlbShhKTt0aGlzLiNlPy5zZXRJdGVtKGEsaSkscnx8PWkhPT1ufXJldHVybiByfTtyYXdHZXQ9YXN5bmMgZT0+KGF3YWl0IHRoaXMucmF3R2V0TWFueShbZV0pKVtlXTtyYXdHZXRNYW55PWFzeW5jIGU9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpP2F3YWl0IHRoaXMuI3QuZ2V0KGUpOmUuZmlsdGVyKHRoaXMuaXNDb3BpZWQpLnJlZHVjZSgodCxzKT0+KHRbc109dGhpcy4jZT8uZ2V0SXRlbShzKSx0KSx7fSk7cmF3U2V0PWFzeW5jKGUsdCk9PmF3YWl0IHRoaXMucmF3U2V0TWFueSh7W2VdOnR9KTtyYXdTZXRNYW55PWFzeW5jIGU9Pih0aGlzLiNlJiZPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFt0XSk9PnRoaXMuaXNDb3BpZWQodCkpLmZvckVhY2goKFt0LHNdKT0+dGhpcy4jZS5zZXRJdGVtKHQscykpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiN0LnNldChlKSxudWxsKTtjbGVhcj1hc3luYyhlPSExKT0+e2UmJnRoaXMuI2U/LmNsZWFyKCksYXdhaXQgdGhpcy4jdC5jbGVhcigpfTtyYXdSZW1vdmU9YXN5bmMgZT0+e2F3YWl0IHRoaXMucmF3UmVtb3ZlTWFueShbZV0pfTtyYXdSZW1vdmVNYW55PWFzeW5jIGU9Pnt0aGlzLiNlJiZlLmZpbHRlcih0aGlzLmlzQ29waWVkKS5mb3JFYWNoKHQ9PnRoaXMuI2UucmVtb3ZlSXRlbSh0KSksdGhpcy5oYXNFeHRlbnNpb25BcGkmJmF3YWl0IHRoaXMuI3QucmVtb3ZlKGUpfTtyZW1vdmVBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMuZ2V0QWxsKCksdD1PYmplY3Qua2V5cyhlKTthd2FpdCB0aGlzLnJlbW92ZU1hbnkodCl9O3dhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jbyhlKSx0fTsjbz1lPT57Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxyPXRoaXMuI3MuZ2V0KHMpPy5jYWxsYmFja1NldHx8bmV3IFNldDtpZihyLmFkZChlW3RdKSxyLnNpemU+MSljb250aW51ZTtsZXQgYT0oaSxuKT0+e2lmKG4hPT10aGlzLmFyZWF8fCFpW3NdKXJldHVybjtsZXQgaD10aGlzLiNzLmdldChzKTtpZighaCl0aHJvdyBuZXcgRXJyb3IoYFN0b3JhZ2UgY29tbXMgZG9lcyBub3QgZXhpc3QgZm9yIG5zS2V5OiAke3N9YCk7UHJvbWlzZS5hbGwoW3RoaXMucGFyc2VWYWx1ZShpW3NdLm5ld1ZhbHVlKSx0aGlzLnBhcnNlVmFsdWUoaVtzXS5vbGRWYWx1ZSldKS50aGVuKChbeSxkXSk9Pntmb3IobGV0IHAgb2YgaC5jYWxsYmFja1NldClwKHtuZXdWYWx1ZTp5LG9sZFZhbHVlOmR9LG4pfSl9O3RoaXMuI3Iub25DaGFuZ2VkLmFkZExpc3RlbmVyKGEpLHRoaXMuI3Muc2V0KHMse2NhbGxiYWNrU2V0OnIsbGlzdGVuZXI6YX0pfX07dW53YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI2MoZSksdH07I2MoZSl7Zm9yKGxldCB0IGluIGUpe2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleSh0KSxyPWVbdF0sYT10aGlzLiNzLmdldChzKTthJiYoYS5jYWxsYmFja1NldC5kZWxldGUociksYS5jYWxsYmFja1NldC5zaXplPT09MCYmKHRoaXMuI3MuZGVsZXRlKHMpLHRoaXMuI3Iub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGEubGlzdGVuZXIpKSl9fXVud2F0Y2hBbGw9KCk9PnRoaXMuI2goKTsjaCgpe3RoaXMuI3MuZm9yRWFjaCgoe2xpc3RlbmVyOmV9KT0+dGhpcy4jci5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoZSkpLHRoaXMuI3MuY2xlYXIoKX1hc3luYyBnZXRJdGVtKGUpe3JldHVybiB0aGlzLmdldChlKX1hc3luYyBnZXRJdGVtcyhlKXtyZXR1cm4gYXdhaXQgdGhpcy5nZXRNYW55KGUpfWFzeW5jIHNldEl0ZW0oZSx0KXthd2FpdCB0aGlzLnNldChlLHQpfWFzeW5jIHNldEl0ZW1zKGUpe2F3YWl0IGF3YWl0IHRoaXMuc2V0TWFueShlKX1hc3luYyByZW1vdmVJdGVtKGUpe3JldHVybiB0aGlzLnJlbW92ZShlKX1hc3luYyByZW1vdmVJdGVtcyhlKXtyZXR1cm4gYXdhaXQgdGhpcy5yZW1vdmVNYW55KGUpfX0sZz1jbGFzcyBleHRlbmRzIG97Z2V0PWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSkscz1hd2FpdCB0aGlzLnJhd0dldCh0KTtyZXR1cm4gdGhpcy5wYXJzZVZhbHVlKHMpfTtnZXRNYW55PWFzeW5jIGU9PntsZXQgdD1lLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpLHM9YXdhaXQgdGhpcy5yYXdHZXRNYW55KHQpLHI9YXdhaXQgUHJvbWlzZS5hbGwoT2JqZWN0LnZhbHVlcyhzKS5tYXAodGhpcy5wYXJzZVZhbHVlKSk7cmV0dXJuIE9iamVjdC5rZXlzKHMpLnJlZHVjZSgoYSxpLG4pPT4oYVt0aGlzLmdldFVubmFtZXNwYWNlZEtleShpKV09cltuXSxhKSx7fSl9O3NldD1hc3luYyhlLHQpPT57bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHI9dGhpcy5zZXJkZS5zZXJpYWxpemVyKHQpO3JldHVybiB0aGlzLnJhd1NldChzLHIpfTtzZXRNYW55PWFzeW5jIGU9PntsZXQgdD1PYmplY3QuZW50cmllcyhlKS5yZWR1Y2UoKHMsW3IsYV0pPT4oc1t0aGlzLmdldE5hbWVzcGFjZWRLZXkocildPXRoaXMuc2VyZGUuc2VyaWFsaXplcihhKSxzKSx7fSk7cmV0dXJuIGF3YWl0IHRoaXMucmF3U2V0TWFueSh0KX07cmVtb3ZlPWFzeW5jIGU9PntsZXQgdD10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSk7cmV0dXJuIHRoaXMucmF3UmVtb3ZlKHQpfTtyZW1vdmVNYW55PWFzeW5jIGU9PntsZXQgdD1lLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpO3JldHVybiBhd2FpdCB0aGlzLnJhd1JlbW92ZU1hbnkodCl9O3NldE5hbWVzcGFjZT1lPT57dGhpcy5rZXlOYW1lc3BhY2U9ZX07cGFyc2VWYWx1ZT1hc3luYyBlPT57dHJ5e2lmKGUhPT12b2lkIDApcmV0dXJuIHRoaXMuc2VyZGUuZGVzZXJpYWxpemVyKGUpfWNhdGNoKHQpe2NvbnNvbGUuZXJyb3IodCl9fX07ZXhwb3J0e28gYXMgQmFzZVN0b3JhZ2UsZyBhcyBTdG9yYWdlfTtcbiIsImNvbnN0IHByb2Nlc3NGdW5jdGlvbiA9IChmdW5jdGlvbl8sIG9wdGlvbnMsIHByb3h5LCB1bndyYXBwZWQpID0+IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdGNvbnN0IFAgPSBvcHRpb25zLnByb21pc2VNb2R1bGU7XG5cblx0cmV0dXJuIG5ldyBQKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRpZiAob3B0aW9ucy5tdWx0aUFyZ3MpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoLi4ucmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdFx0XHRpZiAocmVzdWx0WzBdKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QocmVzdWx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnNoaWZ0KCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLmVycm9yRmlyc3QpIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaCgoZXJyb3IsIHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGFyZ3VtZW50c18ucHVzaChyZXNvbHZlKTtcblx0XHR9XG5cblx0XHRjb25zdCBzZWxmID0gdGhpcyA9PT0gcHJveHkgPyB1bndyYXBwZWQgOiB0aGlzO1xuXHRcdFJlZmxlY3QuYXBwbHkoZnVuY3Rpb25fLCBzZWxmLCBhcmd1bWVudHNfKTtcblx0fSk7XG59O1xuXG5jb25zdCBmaWx0ZXJDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpZnkoaW5wdXQsIG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IHtcblx0XHRleGNsdWRlOiBbLy4rKD86U3luY3xTdHJlYW0pJC9dLFxuXHRcdGVycm9yRmlyc3Q6IHRydWUsXG5cdFx0cHJvbWlzZU1vZHVsZTogUHJvbWlzZSxcblx0XHQuLi5vcHRpb25zLFxuXHR9O1xuXG5cdGNvbnN0IG9iamVjdFR5cGUgPSB0eXBlb2YgaW5wdXQ7XG5cdGlmICghKGlucHV0ICE9PSBudWxsICYmIChvYmplY3RUeXBlID09PSAnb2JqZWN0JyB8fCBvYmplY3RUeXBlID09PSAnZnVuY3Rpb24nKSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBpbnB1dFxcYCB0byBiZSBhIFxcYEZ1bmN0aW9uXFxgIG9yIFxcYE9iamVjdFxcYCwgZ290IFxcYCR7aW5wdXQgPT09IG51bGwgPyAnbnVsbCcgOiBvYmplY3RUeXBlfVxcYGApO1xuXHR9XG5cblx0Y29uc3QgZmlsdGVyID0gKHRhcmdldCwga2V5KSA9PiB7XG5cdFx0bGV0IGNhY2hlZCA9IGZpbHRlckNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0aWYgKCFjYWNoZWQpIHtcblx0XHRcdGNhY2hlZCA9IHt9O1xuXHRcdFx0ZmlsdGVyQ2FjaGUuc2V0KHRhcmdldCwgY2FjaGVkKTtcblx0XHR9XG5cblx0XHRpZiAoa2V5IGluIGNhY2hlZCkge1xuXHRcdFx0cmV0dXJuIGNhY2hlZFtrZXldO1xuXHRcdH1cblxuXHRcdGNvbnN0IG1hdGNoID0gcGF0dGVybiA9PiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSA/IGtleSA9PT0gcGF0dGVybiA6IHBhdHRlcm4udGVzdChrZXkpO1xuXHRcdGNvbnN0IGRlc2NyaXB0b3IgPSBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG5cdFx0Y29uc3Qgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93biA9IChkZXNjcmlwdG9yID09PSB1bmRlZmluZWQgfHwgZGVzY3JpcHRvci53cml0YWJsZSB8fCBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSk7XG5cdFx0Y29uc3QgaW5jbHVkZWQgPSBvcHRpb25zLmluY2x1ZGUgPyBvcHRpb25zLmluY2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKSA6ICFvcHRpb25zLmV4Y2x1ZGUuc29tZShlbGVtZW50ID0+IG1hdGNoKGVsZW1lbnQpKTtcblx0XHRjb25zdCBzaG91bGRGaWx0ZXIgPSBpbmNsdWRlZCAmJiB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duO1xuXHRcdGNhY2hlZFtrZXldID0gc2hvdWxkRmlsdGVyO1xuXHRcdHJldHVybiBzaG91bGRGaWx0ZXI7XG5cdH07XG5cblx0Y29uc3QgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5cdGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGlucHV0LCB7XG5cdFx0YXBwbHkodGFyZ2V0LCB0aGlzQXJnLCBhcmdzKSB7XG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShjYWNoZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBwaWZpZWQgPSBvcHRpb25zLmV4Y2x1ZGVNYWluID8gdGFyZ2V0IDogcHJvY2Vzc0Z1bmN0aW9uKHRhcmdldCwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRjYWNoZS5zZXQodGFyZ2V0LCBwaWZpZWQpO1xuXHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkocGlmaWVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHR9LFxuXG5cdFx0Z2V0KHRhcmdldCwga2V5KSB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWV4dGVuZC1uYXRpdmUvbm8tdXNlLWV4dGVuZC1uYXRpdmVcblx0XHRcdGlmICghZmlsdGVyKHRhcmdldCwga2V5KSB8fCBwcm9wZXJ0eSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlW2tleV0pIHtcblx0XHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQocHJvcGVydHkpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBjYWNoZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Y29uc3QgcGlmaWVkID0gcHJvY2Vzc0Z1bmN0aW9uKHByb3BlcnR5LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdFx0Y2FjaGUuc2V0KHByb3BlcnR5LCBwaWZpZWQpO1xuXHRcdFx0XHRyZXR1cm4gcGlmaWVkO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHByb3h5O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2hlbHBlcnMvYnVuZGxlLXVybCcpLmdldEJ1bmRsZVVSTCgnYXoxejInKSArIFwicGFuZWwuN2E4ZTVjNTQuaHRtbFwiICsgXCI/XCIgKyBEYXRlLm5vdygpOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYnVuZGxlVVJMID0ge307XG5cbmZ1bmN0aW9uIGdldEJ1bmRsZVVSTENhY2hlZChpZCkge1xuICB2YXIgdmFsdWUgPSBidW5kbGVVUkxbaWRdO1xuXG4gIGlmICghdmFsdWUpIHtcbiAgICB2YWx1ZSA9IGdldEJ1bmRsZVVSTCgpO1xuICAgIGJ1bmRsZVVSTFtpZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0QnVuZGxlVVJMKCkge1xuICB0cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9ICgnJyArIGVyci5zdGFjaykubWF0Y2goLyhodHRwcz98ZmlsZXxmdHB8KGNocm9tZXxtb3p8c2FmYXJpLXdlYiktZXh0ZW5zaW9uKTpcXC9cXC9bXilcXG5dKy9nKTtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAvLyBUaGUgZmlyc3QgdHdvIHN0YWNrIGZyYW1lcyB3aWxsIGJlIHRoaXMgZnVuY3Rpb24gYW5kIGdldEJ1bmRsZVVSTENhY2hlZC5cbiAgICAgIC8vIFVzZSB0aGUgM3JkIG9uZSwgd2hpY2ggd2lsbCBiZSBhIHJ1bnRpbWUgaW4gdGhlIG9yaWdpbmFsIGJ1bmRsZS5cbiAgICAgIHJldHVybiBnZXRCYXNlVVJMKG1hdGNoZXNbMl0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnLyc7XG59XG5cbmZ1bmN0aW9uIGdldEJhc2VVUkwodXJsKSB7XG4gIHJldHVybiAoJycgKyB1cmwpLnJlcGxhY2UoL14oKD86aHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvLispXFwvW14vXSskLywgJyQxJykgKyAnLyc7XG59IC8vIFRPRE86IFJlcGxhY2UgdXNlcyB3aXRoIGBuZXcgVVJMKHVybCkub3JpZ2luYCB3aGVuIGllMTEgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC5cblxuXG5mdW5jdGlvbiBnZXRPcmlnaW4odXJsKSB7XG4gIHZhciBtYXRjaGVzID0gKCcnICsgdXJsKS5tYXRjaCgvKGh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcL1teL10rLyk7XG5cbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcmlnaW4gbm90IGZvdW5kJyk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlc1swXTtcbn1cblxuZXhwb3J0cy5nZXRCdW5kbGVVUkwgPSBnZXRCdW5kbGVVUkxDYWNoZWQ7XG5leHBvcnRzLmdldEJhc2VVUkwgPSBnZXRCYXNlVVJMO1xuZXhwb3J0cy5nZXRPcmlnaW4gPSBnZXRPcmlnaW47Il0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImRldnRvb2xzLmJhZDNjN2NhLmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);