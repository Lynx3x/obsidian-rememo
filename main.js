"use strict";
var require$$0 = require("obsidian");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0);
const MEMOS_VIEW_TYPE = "memos_view";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var react = { exports: {} };
var react_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l = objectAssign, n$1 = 60103, p$1 = 60106;
react_production_min.Fragment = 60107;
react_production_min.StrictMode = 60108;
react_production_min.Profiler = 60114;
var q$1 = 60109, r$1 = 60110, t$2 = 60112;
react_production_min.Suspense = 60113;
var u = 60115, v = 60116;
if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  n$1 = w("react.element");
  p$1 = w("react.portal");
  react_production_min.Fragment = w("react.fragment");
  react_production_min.StrictMode = w("react.strict_mode");
  react_production_min.Profiler = w("react.profiler");
  q$1 = w("react.provider");
  r$1 = w("react.context");
  t$2 = w("react.forward_ref");
  react_production_min.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}
var x = "function" === typeof Symbol && Symbol.iterator;
function y$1(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var A = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, B$1 = {};
function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B$1;
  this.updater = c || A;
}
C.prototype.isReactComponent = {};
C.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};
C.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function D$1() {
}
D$1.prototype = C.prototype;
function E$1(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B$1;
  this.updater = c || A;
}
var F$1 = E$1.prototype = new D$1();
F$1.constructor = E$1;
l(F$1, C.prototype);
F$1.isPureReactComponent = true;
var G$1 = { current: null }, H$1 = Object.prototype.hasOwnProperty, I$1 = { key: true, ref: true, __self: true, __source: true };
function J(a, b, c) {
  var e, d = {}, k = null, h2 = null;
  if (null != b)
    for (e in void 0 !== b.ref && (h2 = b.ref), void 0 !== b.key && (k = "" + b.key), b)
      H$1.call(b, e) && !I$1.hasOwnProperty(e) && (d[e] = b[e]);
  var g2 = arguments.length - 2;
  if (1 === g2)
    d.children = c;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    d.children = f2;
  }
  if (a && a.defaultProps)
    for (e in g2 = a.defaultProps, g2)
      void 0 === d[e] && (d[e] = g2[e]);
  return { $$typeof: n$1, type: a, key: k, ref: h2, props: d, _owner: G$1.current };
}
function K(a, b) {
  return { $$typeof: n$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === n$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var M$1 = /\/+/g;
function N$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function O$1(a, b, c, e, d) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k)
    a = null;
  var h2 = false;
  if (null === a)
    h2 = true;
  else
    switch (k) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case n$1:
          case p$1:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a, d = d(h2), a = "" === e ? "." + N$1(h2, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M$1, "$&/") + "/"), O$1(d, b, c, "", function(a2) {
      return a2;
    })) : null != d && (L(d) && (d = K(d, c + (!d.key || h2 && h2.key === d.key ? "" : ("" + d.key).replace(M$1, "$&/") + "/") + a)), b.push(d)), 1;
  h2 = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a))
    for (var g2 = 0; g2 < a.length; g2++) {
      k = a[g2];
      var f2 = e + N$1(k, g2);
      h2 += O$1(k, b, c, f2, d);
    }
  else if (f2 = y$1(a), "function" === typeof f2)
    for (a = f2.call(a), g2 = 0; !(k = a.next()).done; )
      k = k.value, f2 = e + N$1(k, g2++), h2 += O$1(k, b, c, f2, d);
  else if ("object" === k)
    throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h2;
}
function P$1(a, b, c) {
  if (null == a)
    return a;
  var e = [], d = 0;
  O$1(a, e, "", "", function(a2) {
    return b.call(c, a2, d++);
  });
  return e;
}
function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function(b2) {
      0 === a._status && (b2 = b2.default, a._status = 1, a._result = b2);
    }, function(b2) {
      0 === a._status && (a._status = 2, a._result = b2);
    });
  }
  if (1 === a._status)
    return a._result;
  throw a._result;
}
var R$1 = { current: null };
function S$1() {
  var a = R$1.current;
  if (null === a)
    throw Error(z(321));
  return a;
}
var T$1 = { ReactCurrentDispatcher: R$1, ReactCurrentBatchConfig: { transition: 0 }, ReactCurrentOwner: G$1, IsSomeRendererActing: { current: false }, assign: l };
react_production_min.Children = { map: P$1, forEach: function(a, b, c) {
  P$1(a, function() {
    b.apply(this, arguments);
  }, c);
}, count: function(a) {
  var b = 0;
  P$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return P$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!L(a))
    throw Error(z(143));
  return a;
} };
react_production_min.Component = C;
react_production_min.PureComponent = E$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T$1;
react_production_min.cloneElement = function(a, b, c) {
  if (null === a || void 0 === a)
    throw Error(z(267, a));
  var e = l({}, a.props), d = a.key, k = a.ref, h2 = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h2 = G$1.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g2 = a.type.defaultProps;
    for (f2 in b)
      H$1.call(b, f2) && !I$1.hasOwnProperty(f2) && (e[f2] = void 0 === b[f2] && void 0 !== g2 ? g2[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    e.children = c;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    e.children = g2;
  }
  return {
    $$typeof: n$1,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h2
  };
};
react_production_min.createContext = function(a, b) {
  void 0 === b && (b = null);
  a = { $$typeof: r$1, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
  a.Provider = { $$typeof: q$1, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = J;
react_production_min.createFactory = function(a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: t$2, render: a };
};
react_production_min.isValidElement = L;
react_production_min.lazy = function(a) {
  return { $$typeof: v, _payload: { _status: -1, _result: a }, _init: Q };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: u, type: a, compare: void 0 === b ? null : b };
};
react_production_min.useCallback = function(a, b) {
  return S$1().useCallback(a, b);
};
react_production_min.useContext = function(a, b) {
  return S$1().useContext(a, b);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useEffect = function(a, b) {
  return S$1().useEffect(a, b);
};
react_production_min.useImperativeHandle = function(a, b, c) {
  return S$1().useImperativeHandle(a, b, c);
};
react_production_min.useLayoutEffect = function(a, b) {
  return S$1().useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return S$1().useMemo(a, b);
};
react_production_min.useReducer = function(a, b, c) {
  return S$1().useReducer(a, b, c);
};
react_production_min.useRef = function(a) {
  return S$1().useRef(a);
};
react_production_min.useState = function(a) {
  return S$1().useState(a);
};
react_production_min.version = "17.0.2";
{
  react.exports = react_production_min;
}
var React = react.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  var f2, g2, h2, k;
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
    var t2 = null, u2 = null, w2 = function() {
      if (null !== t2)
        try {
          var a = exports.unstable_now();
          t2(true, a);
          t2 = null;
        } catch (b) {
          throw setTimeout(w2, 0), b;
        }
    };
    f2 = function(a) {
      null !== t2 ? setTimeout(f2, 0, a) : (t2 = a, setTimeout(w2, 0));
    };
    g2 = function(a, b) {
      u2 = setTimeout(a, b);
    };
    h2 = function() {
      clearTimeout(u2);
    };
    exports.unstable_shouldYield = function() {
      return false;
    };
    k = exports.unstable_forceFrameRate = function() {
    };
  } else {
    var x2 = window.setTimeout, y2 = window.clearTimeout;
    if ("undefined" !== typeof console) {
      var z2 = window.cancelAnimationFrame;
      "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      "function" !== typeof z2 && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    }
    var A2 = false, B2 = null, C2 = -1, D2 = 5, E2 = 0;
    exports.unstable_shouldYield = function() {
      return exports.unstable_now() >= E2;
    };
    k = function() {
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    var F2 = new MessageChannel(), G2 = F2.port2;
    F2.port1.onmessage = function() {
      if (null !== B2) {
        var a = exports.unstable_now();
        E2 = a + D2;
        try {
          B2(true, a) ? G2.postMessage(null) : (A2 = false, B2 = null);
        } catch (b) {
          throw G2.postMessage(null), b;
        }
      } else
        A2 = false;
    };
    f2 = function(a) {
      B2 = a;
      A2 || (A2 = true, G2.postMessage(null));
    };
    g2 = function(a, b) {
      C2 = x2(function() {
        a(exports.unstable_now());
      }, b);
    };
    h2 = function() {
      y2(C2);
      C2 = -1;
    };
  }
  function H2(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; ; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (void 0 !== e && 0 < I2(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function J2(a) {
    a = a[0];
    return void 0 === a ? null : a;
  }
  function K2(a) {
    var b = a[0];
    if (void 0 !== b) {
      var c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length; d < e; ) {
            var m2 = 2 * (d + 1) - 1, n2 = a[m2], v2 = m2 + 1, r2 = a[v2];
            if (void 0 !== n2 && 0 > I2(n2, c))
              void 0 !== r2 && 0 > I2(r2, n2) ? (a[d] = r2, a[v2] = c, d = v2) : (a[d] = n2, a[m2] = c, d = m2);
            else if (void 0 !== r2 && 0 > I2(r2, c))
              a[d] = r2, a[v2] = c, d = v2;
            else
              break a;
          }
      }
      return b;
    }
    return null;
  }
  function I2(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  var L2 = [], M2 = [], N2 = 1, O2 = null, P2 = 3, Q2 = false, R2 = false, S2 = false;
  function T2(a) {
    for (var b = J2(M2); null !== b; ) {
      if (null === b.callback)
        K2(M2);
      else if (b.startTime <= a)
        K2(M2), b.sortIndex = b.expirationTime, H2(L2, b);
      else
        break;
      b = J2(M2);
    }
  }
  function U2(a) {
    S2 = false;
    T2(a);
    if (!R2)
      if (null !== J2(L2))
        R2 = true, f2(V2);
      else {
        var b = J2(M2);
        null !== b && g2(U2, b.startTime - a);
      }
  }
  function V2(a, b) {
    R2 = false;
    S2 && (S2 = false, h2());
    Q2 = true;
    var c = P2;
    try {
      T2(b);
      for (O2 = J2(L2); null !== O2 && (!(O2.expirationTime > b) || a && !exports.unstable_shouldYield()); ) {
        var d = O2.callback;
        if ("function" === typeof d) {
          O2.callback = null;
          P2 = O2.priorityLevel;
          var e = d(O2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? O2.callback = e : O2 === J2(L2) && K2(L2);
          T2(b);
        } else
          K2(L2);
        O2 = J2(L2);
      }
      if (null !== O2)
        var m2 = true;
      else {
        var n2 = J2(M2);
        null !== n2 && g2(U2, n2.startTime - b);
        m2 = false;
      }
      return m2;
    } finally {
      O2 = null, P2 = c, Q2 = false;
    }
  }
  var W2 = k;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    R2 || Q2 || (R2 = true, f2(V2));
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return P2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return J2(L2);
  };
  exports.unstable_next = function(a) {
    switch (P2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = P2;
    }
    var c = P2;
    P2 = b;
    try {
      return a();
    } finally {
      P2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = W2;
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = P2;
    P2 = a;
    try {
      return b();
    } finally {
      P2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: N2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, H2(M2, a), null === J2(L2) && a === J2(M2) && (S2 ? h2() : S2 = true, g2(U2, c - d))) : (a.sortIndex = e, H2(L2, a), R2 || Q2 || (R2 = true, f2(V2)));
    return a;
  };
  exports.unstable_wrapCallback = function(a) {
    var b = P2;
    return function() {
      var c = P2;
      P2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        P2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
/** @license React v17.0.2
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = react.exports, m$1 = objectAssign, r = scheduler.exports;
function y(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
if (!aa)
  throw Error(y(227));
var ba = /* @__PURE__ */ new Set(), ca = {};
function da$1(a, b) {
  ea(a, b);
  ea(a + "Capture", b);
}
function ea(a, b) {
  ca[a] = b;
  for (a = 0; a < b.length; a++)
    ba.add(b[a]);
}
var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ia = Object.prototype.hasOwnProperty, ja$1 = {}, ka = {};
function la(a) {
  if (ia.call(ka, a))
    return true;
  if (ia.call(ja$1, a))
    return false;
  if (ha.test(a))
    return ka[a] = true;
  ja$1[a] = true;
  return false;
}
function ma(a, b, c, d) {
  if (null !== c && 0 === c.type)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (null !== c)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function na(a, b, c, d) {
  if (null === b || "undefined" === typeof b || ma(a, b, c, d))
    return true;
  if (d)
    return false;
  if (null !== c)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function B(a, b, c, d, e, f2, g2) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  D[a] = new B(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  D[b] = new B(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  D[a] = new B(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  D[a] = new B(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  D[a] = new B(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  D[a] = new B(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  D[a] = new B(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  D[a] = new B(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  D[a] = new B(a, 5, false, a.toLowerCase(), null, false, false);
});
var oa = /[\-:]([a-z])/g;
function pa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    oa,
    pa
  );
  D[b] = new B(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  D[a] = new B(a, 1, false, a.toLowerCase(), null, false, false);
});
D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  D[a] = new B(a, 1, false, a.toLowerCase(), null, true, true);
});
function qa(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;
  var f2 = null !== e ? 0 === e.type : d ? false : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? false : true;
  f2 || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}
var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, sa = 60103, ta = 60106, ua = 60107, wa = 60108, xa = 60114, ya = 60109, za = 60110, Aa = 60112, Ba = 60113, Ca = 60120, Da = 60115, Ea = 60116, Fa = 60121, Ga = 60128, Ha = 60129, Ia = 60130, Ja = 60131;
if ("function" === typeof Symbol && Symbol.for) {
  var E = Symbol.for;
  sa = E("react.element");
  ta = E("react.portal");
  ua = E("react.fragment");
  wa = E("react.strict_mode");
  xa = E("react.profiler");
  ya = E("react.provider");
  za = E("react.context");
  Aa = E("react.forward_ref");
  Ba = E("react.suspense");
  Ca = E("react.suspense_list");
  Da = E("react.memo");
  Ea = E("react.lazy");
  Fa = E("react.block");
  E("react.scope");
  Ga = E("react.opaque.id");
  Ha = E("react.debug_trace_mode");
  Ia = E("react.offscreen");
  Ja = E("react.legacy_hidden");
}
var Ka = "function" === typeof Symbol && Symbol.iterator;
function La(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = Ka && a[Ka] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var Ma;
function Na(a) {
  if (void 0 === Ma)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      Ma = b && b[1] || "";
    }
  return "\n" + Ma + a;
}
var Oa = false;
function Pa(a, b) {
  if (!a || Oa)
    return "";
  Oa = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (k) {
          var d = k;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (k) {
          d = k;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (k) {
        d = k;
      }
      a();
    }
  } catch (k) {
    if (k && d && "string" === typeof k.stack) {
      for (var e = k.stack.split("\n"), f2 = d.stack.split("\n"), g2 = e.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e[g2] !== f2[h2]; )
        h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--)
        if (e[g2] !== f2[h2]) {
          if (1 !== g2 || 1 !== h2) {
            do
              if (g2--, h2--, 0 > h2 || e[g2] !== f2[h2])
                return "\n" + e[g2].replace(" at new ", " at ");
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    Oa = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
}
function Qa(a) {
  switch (a.tag) {
    case 5:
      return Na(a.type);
    case 16:
      return Na("Lazy");
    case 13:
      return Na("Suspense");
    case 19:
      return Na("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Pa(a.type, false), a;
    case 11:
      return a = Pa(a.type.render, false), a;
    case 22:
      return a = Pa(a.type._render, false), a;
    case 1:
      return a = Pa(a.type, true), a;
    default:
      return "";
  }
}
function Ra(a) {
  if (null == a)
    return null;
  if ("function" === typeof a)
    return a.displayName || a.name || null;
  if ("string" === typeof a)
    return a;
  switch (a) {
    case ua:
      return "Fragment";
    case ta:
      return "Portal";
    case xa:
      return "Profiler";
    case wa:
      return "StrictMode";
    case Ba:
      return "Suspense";
    case Ca:
      return "SuspenseList";
  }
  if ("object" === typeof a)
    switch (a.$$typeof) {
      case za:
        return (a.displayName || "Context") + ".Consumer";
      case ya:
        return (a._context.displayName || "Context") + ".Provider";
      case Aa:
        var b = a.render;
        b = b.displayName || b.name || "";
        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");
      case Da:
        return Ra(a.type);
      case Fa:
        return Ra(a._render);
      case Ea:
        b = a._payload;
        a = a._init;
        try {
          return Ra(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a)
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return m$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function $a(a, b) {
  b = b.checked;
  null != b && qa(a, "checked", b, false);
}
function ab(a, b) {
  $a(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c)
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function cb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function bb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a)
    null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
function db(a) {
  var b = "";
  aa.Children.forEach(a, function(a2) {
    null != a2 && (b += a2);
  });
  return b;
}
function eb(a, b) {
  a = m$1({ children: void 0 }, b);
  if (b = db(b.children))
    a.children = b;
  return a;
}
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML)
    throw Error(y(91));
  return m$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b)
        throw Error(y(92));
      if (Array.isArray(c)) {
        if (!(1 >= c.length))
          throw Error(y(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
var kb = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
function lb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function mb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var nb, ob = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if (a.namespaceURI !== kb.svg || "innerHTML" in a)
    a.innerHTML = b;
  else {
    nb = nb || document.createElement("div");
    nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = nb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function pb(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var qb = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, rb = ["Webkit", "ms", "Moz", "O"];
Object.keys(qb).forEach(function(a) {
  rb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    qb[b] = qb[a];
  });
});
function sb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
}
function tb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = sb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var ub = m$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function vb(a, b) {
  if (b) {
    if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
      throw Error(y(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children)
        throw Error(y(60));
      if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML))
        throw Error(y(61));
    }
    if (null != b.style && "object" !== typeof b.style)
      throw Error(y(62));
  }
}
function wb(a, b) {
  if (-1 === a.indexOf("-"))
    return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb)
      throw Error(y(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb(a, b, c, d, e) {
  return a(b, c, d, e);
}
function Ib() {
}
var Jb = Gb, Kb = false, Lb = false;
function Mb() {
  if (null !== zb || null !== Ab)
    Ib(), Fb();
}
function Nb(a, b, c) {
  if (Lb)
    return a(b, c);
  Lb = true;
  try {
    return Jb(a, b, c);
  } finally {
    Lb = false, Mb();
  }
}
function Ob(a, b) {
  var c = a.stateNode;
  if (null === c)
    return null;
  var d = Db(c);
  if (null === d)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && "function" !== typeof c)
    throw Error(y(231, b, typeof c));
  return c;
}
var Pb = false;
if (fa)
  try {
    var Qb = {};
    Object.defineProperty(Qb, "passive", { get: function() {
      Pb = true;
    } });
    window.addEventListener("test", Qb, Qb);
    window.removeEventListener("test", Qb, Qb);
  } catch (a) {
    Pb = false;
  }
function Rb(a, b, c, d, e, f2, g2, h2, k) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (n2) {
    this.onError(n2);
  }
}
var Sb = false, Tb = null, Ub = false, Vb = null, Wb = { onError: function(a) {
  Sb = true;
  Tb = a;
} };
function Xb(a, b, c, d, e, f2, g2, h2, k) {
  Sb = false;
  Tb = null;
  Rb.apply(Wb, arguments);
}
function Yb(a, b, c, d, e, f2, g2, h2, k) {
  Xb.apply(this, arguments);
  if (Sb) {
    if (Sb) {
      var l2 = Tb;
      Sb = false;
      Tb = null;
    } else
      throw Error(y(198));
    Ub || (Ub = true, Vb = l2);
  }
}
function Zb(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function $b(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b)
      return b.dehydrated;
  }
  return null;
}
function ac(a) {
  if (Zb(a) !== a)
    throw Error(y(188));
}
function bc(a) {
  var b = a.alternate;
  if (!b) {
    b = Zb(a);
    if (null === b)
      throw Error(y(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e)
      break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c)
          return ac(e), a;
        if (f2 === d)
          return ac(e), b;
        f2 = f2.sibling;
      }
      throw Error(y(188));
    }
    if (c.return !== d.return)
      c = e, d = f2;
    else {
      for (var g2 = false, h2 = e.child; h2; ) {
        if (h2 === c) {
          g2 = true;
          c = e;
          d = f2;
          break;
        }
        if (h2 === d) {
          g2 = true;
          d = e;
          c = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c) {
            g2 = true;
            c = f2;
            d = e;
            break;
          }
          if (h2 === d) {
            g2 = true;
            d = f2;
            c = e;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2)
          throw Error(y(189));
      }
    }
    if (c.alternate !== d)
      throw Error(y(190));
  }
  if (3 !== c.tag)
    throw Error(y(188));
  return c.stateNode.current === c ? a : b;
}
function cc(a) {
  a = bc(a);
  if (!a)
    return null;
  for (var b = a; ; ) {
    if (5 === b.tag || 6 === b.tag)
      return b;
    if (b.child)
      b.child.return = b, b = b.child;
    else {
      if (b === a)
        break;
      for (; !b.sibling; ) {
        if (!b.return || b.return === a)
          return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return null;
}
function dc(a, b) {
  for (var c = a.alternate; null !== b; ) {
    if (b === a || b === c)
      return true;
    b = b.return;
  }
  return false;
}
var ec, fc, gc, hc, ic = false, jc = [], kc = null, lc = null, mc = null, nc = /* @__PURE__ */ new Map(), oc = /* @__PURE__ */ new Map(), pc = [], qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a, b, c, d, e) {
  return { blockedOn: a, domEventName: b, eventSystemFlags: c | 16, nativeEvent: e, targetContainers: [d] };
}
function sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      kc = null;
      break;
    case "dragenter":
    case "dragleave":
      lc = null;
      break;
    case "mouseover":
    case "mouseout":
      mc = null;
      break;
    case "pointerover":
    case "pointerout":
      nc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      oc.delete(b.pointerId);
  }
}
function tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2)
    return a = rc(b, c, d, e, f2), null !== b && (b = Cb(b), null !== b && fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return kc = tc(kc, a, b, c, d, e), true;
    case "dragenter":
      return lc = tc(lc, a, b, c, d, e), true;
    case "mouseover":
      return mc = tc(mc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      nc.set(f2, tc(nc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, oc.set(f2, tc(oc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function vc(a) {
  var b = wc(a.target);
  if (null !== b) {
    var c = Zb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = $b(c), null !== b) {
          a.blockedOn = b;
          hc(a.lanePriority, function() {
            r.unstable_runWithPriority(a.priority, function() {
              gc(c);
            });
          });
          return;
        }
      } else if (3 === b && c.stateNode.hydrate) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function xc(a) {
  if (null !== a.blockedOn)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null !== c)
      return b = Cb(c), null !== b && fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function zc(a, b, c) {
  xc(a) && c.delete(b);
}
function Ac() {
  for (ic = false; 0 < jc.length; ) {
    var a = jc[0];
    if (null !== a.blockedOn) {
      a = Cb(a.blockedOn);
      null !== a && ec(a);
      break;
    }
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null !== c) {
        a.blockedOn = c;
        break;
      }
      b.shift();
    }
    null === a.blockedOn && jc.shift();
  }
  null !== kc && xc(kc) && (kc = null);
  null !== lc && xc(lc) && (lc = null);
  null !== mc && xc(mc) && (mc = null);
  nc.forEach(zc);
  oc.forEach(zc);
}
function Bc(a, b) {
  a.blockedOn === b && (a.blockedOn = null, ic || (ic = true, r.unstable_scheduleCallback(r.unstable_NormalPriority, Ac)));
}
function Cc(a) {
  function b(b2) {
    return Bc(b2, a);
  }
  if (0 < jc.length) {
    Bc(jc[0], a);
    for (var c = 1; c < jc.length; c++) {
      var d = jc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== kc && Bc(kc, a);
  null !== lc && Bc(lc, a);
  null !== mc && Bc(mc, a);
  nc.forEach(b);
  oc.forEach(b);
  for (c = 0; c < pc.length; c++)
    d = pc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < pc.length && (c = pc[0], null === c.blockedOn); )
    vc(c), null === c.blockedOn && pc.shift();
}
function Dc(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var Ec = { animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd") }, Fc = {}, Gc = {};
fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
function Hc(a) {
  if (Fc[a])
    return Fc[a];
  if (!Ec[a])
    return a;
  var b = Ec[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Gc)
      return Fc[a] = b[c];
  return a;
}
var Ic = Hc("animationend"), Jc = Hc("animationiteration"), Kc = Hc("animationstart"), Lc = Hc("transitionend"), Mc = /* @__PURE__ */ new Map(), Nc = /* @__PURE__ */ new Map(), Oc = [
  "abort",
  "abort",
  Ic,
  "animationEnd",
  Jc,
  "animationIteration",
  Kc,
  "animationStart",
  "canplay",
  "canPlay",
  "canplaythrough",
  "canPlayThrough",
  "durationchange",
  "durationChange",
  "emptied",
  "emptied",
  "encrypted",
  "encrypted",
  "ended",
  "ended",
  "error",
  "error",
  "gotpointercapture",
  "gotPointerCapture",
  "load",
  "load",
  "loadeddata",
  "loadedData",
  "loadedmetadata",
  "loadedMetadata",
  "loadstart",
  "loadStart",
  "lostpointercapture",
  "lostPointerCapture",
  "playing",
  "playing",
  "progress",
  "progress",
  "seeking",
  "seeking",
  "stalled",
  "stalled",
  "suspend",
  "suspend",
  "timeupdate",
  "timeUpdate",
  Lc,
  "transitionEnd",
  "waiting",
  "waiting"
];
function Pc(a, b) {
  for (var c = 0; c < a.length; c += 2) {
    var d = a[c], e = a[c + 1];
    e = "on" + (e[0].toUpperCase() + e.slice(1));
    Nc.set(d, b);
    Mc.set(d, e);
    da$1(e, [d]);
  }
}
var Qc = r.unstable_now;
Qc();
var F = 8;
function Rc(a) {
  if (0 !== (1 & a))
    return F = 15, 1;
  if (0 !== (2 & a))
    return F = 14, 2;
  if (0 !== (4 & a))
    return F = 13, 4;
  var b = 24 & a;
  if (0 !== b)
    return F = 12, b;
  if (0 !== (a & 32))
    return F = 11, 32;
  b = 192 & a;
  if (0 !== b)
    return F = 10, b;
  if (0 !== (a & 256))
    return F = 9, 256;
  b = 3584 & a;
  if (0 !== b)
    return F = 8, b;
  if (0 !== (a & 4096))
    return F = 7, 4096;
  b = 4186112 & a;
  if (0 !== b)
    return F = 6, b;
  b = 62914560 & a;
  if (0 !== b)
    return F = 5, b;
  if (a & 67108864)
    return F = 4, 67108864;
  if (0 !== (a & 134217728))
    return F = 3, 134217728;
  b = 805306368 & a;
  if (0 !== b)
    return F = 2, b;
  if (0 !== (1073741824 & a))
    return F = 1, 1073741824;
  F = 8;
  return a;
}
function Sc(a) {
  switch (a) {
    case 99:
      return 15;
    case 98:
      return 10;
    case 97:
    case 96:
      return 8;
    case 95:
      return 2;
    default:
      return 0;
  }
}
function Tc(a) {
  switch (a) {
    case 15:
    case 14:
      return 99;
    case 13:
    case 12:
    case 11:
    case 10:
      return 98;
    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(y(358, a));
  }
}
function Uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c)
    return F = 0;
  var d = 0, e = 0, f2 = a.expiredLanes, g2 = a.suspendedLanes, h2 = a.pingedLanes;
  if (0 !== f2)
    d = f2, e = F = 15;
  else if (f2 = c & 134217727, 0 !== f2) {
    var k = f2 & ~g2;
    0 !== k ? (d = Rc(k), e = F) : (h2 &= f2, 0 !== h2 && (d = Rc(h2), e = F));
  } else
    f2 = c & ~g2, 0 !== f2 ? (d = Rc(f2), e = F) : 0 !== h2 && (d = Rc(h2), e = F);
  if (0 === d)
    return 0;
  d = 31 - Vc(d);
  d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;
  if (0 !== b && b !== d && 0 === (b & g2)) {
    Rc(b);
    if (e <= F)
      return b;
    F = e;
  }
  b = a.entangledLanes;
  if (0 !== b)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function Wc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function Xc(a, b) {
  switch (a) {
    case 15:
      return 1;
    case 14:
      return 2;
    case 12:
      return a = Yc(24 & ~b), 0 === a ? Xc(10, b) : a;
    case 10:
      return a = Yc(192 & ~b), 0 === a ? Xc(8, b) : a;
    case 8:
      return a = Yc(3584 & ~b), 0 === a && (a = Yc(4186112 & ~b), 0 === a && (a = 512)), a;
    case 2:
      return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
  }
  throw Error(y(358, a));
}
function Yc(a) {
  return a & -a;
}
function Zc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function $c(a, b, c) {
  a.pendingLanes |= b;
  var d = b - 1;
  a.suspendedLanes &= d;
  a.pingedLanes &= d;
  a = a.eventTimes;
  b = 31 - Vc(b);
  a[b] = c;
}
var Vc = Math.clz32 ? Math.clz32 : ad, bd = Math.log, cd = Math.LN2;
function ad(a) {
  return 0 === a ? 32 : 31 - (bd(a) / cd | 0) | 0;
}
var dd = r.unstable_UserBlockingPriority, ed = r.unstable_runWithPriority, fd = true;
function gd(a, b, c, d) {
  Kb || Ib();
  var e = hd, f2 = Kb;
  Kb = true;
  try {
    Hb(e, a, b, c, d);
  } finally {
    (Kb = f2) || Mb();
  }
}
function id$1(a, b, c, d) {
  ed(dd, hd.bind(null, a, b, c, d));
}
function hd(a, b, c, d) {
  if (fd) {
    var e;
    if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a))
      a = rc(null, a, b, c, d), jc.push(a);
    else {
      var f2 = yc(a, b, c, d);
      if (null === f2)
        e && sc(a, d);
      else {
        if (e) {
          if (-1 < qc.indexOf(a)) {
            a = rc(f2, a, b, c, d);
            jc.push(a);
            return;
          }
          if (uc(f2, a, b, c, d))
            return;
          sc(a, d);
        }
        jd(a, b, d, null, c);
      }
    }
  }
}
function yc(a, b, c, d) {
  var e = xb(d);
  e = wc(e);
  if (null !== e) {
    var f2 = Zb(e);
    if (null === f2)
      e = null;
    else {
      var g2 = f2.tag;
      if (13 === g2) {
        e = $b(f2);
        if (null !== e)
          return e;
        e = null;
      } else if (3 === g2) {
        if (f2.stateNode.hydrate)
          return 3 === f2.tag ? f2.stateNode.containerInfo : null;
        e = null;
      } else
        f2 !== e && (e = null);
    }
  }
  jd(a, b, d, e, c);
  return null;
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g2 = c - a;
  for (d = 1; d <= g2 && b[c - d] === e[f2 - d]; d++)
    ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g2) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  m$1(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = m$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = m$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = m$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = m$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = m$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = m$1({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = m$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = m$1({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b)
      return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = m$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = m$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = m$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = m$1({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = fa && "CompositionEvent" in window, be = null;
fa && "documentMode" in document && (be = document.documentMode);
var ce = fa && "TextEvent" in window && !be, de$1 = fa && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie)
    return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b))
    return a;
}
function ve(a, b) {
  if ("change" === a)
    return b;
}
var we = false;
if (fa) {
  var xe;
  if (fa) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    a = re;
    if (Kb)
      a(b);
    else {
      Kb = true;
      try {
        Gb(a, b);
      } finally {
        Kb = false, Mb();
      }
    }
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a)
    return te(qe);
}
function Ee(a, b) {
  if ("click" === a)
    return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a)
    return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge, Ie = Object.prototype.hasOwnProperty;
function Je(a, b) {
  if (He(a, b))
    return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++)
    if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]]))
      return false;
  return true;
}
function Ke(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Le(a, b) {
  var c = Ke(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Ke(c);
  }
}
function Me(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Ne() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Xa(a.document);
  }
  return b;
}
function Oe(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
var Pe = fa && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
Pc(
  "cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),
  0
);
Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
Pc(Oc, 2);
for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
  Nc.set(Ve[We], 0);
ea("onMouseEnter", ["mouseout", "mouseover"]);
ea("onMouseLeave", ["mouseout", "mouseover"]);
ea("onPointerEnter", ["pointerout", "pointerover"]);
ea("onPointerLeave", ["pointerout", "pointerover"]);
da$1("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
da$1("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
da$1("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
da$1("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
da$1("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
da$1("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Yb(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b)
        for (var g2 = d.length - 1; 0 <= g2; g2--) {
          var h2 = d[g2], k = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k !== f2 && e.isPropagationStopped())
            break a;
          Ze(e, h2, l2);
          f2 = k;
        }
      else
        for (g2 = 0; g2 < d.length; g2++) {
          h2 = d[g2];
          k = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k !== f2 && e.isPropagationStopped())
            break a;
          Ze(e, h2, l2);
          f2 = k;
        }
    }
  }
  if (Ub)
    throw a = Vb, Ub = false, Vb = null, a;
}
function G(a, b) {
  var c = $e(b), d = a + "__bubble";
  c.has(d) || (af(b, a, 2, false), c.add(d));
}
var bf = "_reactListening" + Math.random().toString(36).slice(2);
function cf(a) {
  a[bf] || (a[bf] = true, ba.forEach(function(b) {
    Ye.has(b) || df(b, false, a, null);
    df(b, true, a, null);
  }));
}
function df(a, b, c, d) {
  var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, f2 = c;
  "selectionchange" === a && 9 !== c.nodeType && (f2 = c.ownerDocument);
  if (null !== d && !b && Ye.has(a)) {
    if ("scroll" !== a)
      return;
    e |= 2;
    f2 = d;
  }
  var g2 = $e(f2), h2 = a + "__" + (b ? "capture" : "bubble");
  g2.has(h2) || (b && (e |= 4), af(f2, a, e, b), g2.add(h2));
}
function af(a, b, c, d) {
  var e = Nc.get(b);
  switch (void 0 === e ? 2 : e) {
    case 0:
      e = gd;
      break;
    case 1:
      e = id$1;
      break;
    default:
      e = hd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function jd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d)
    a:
      for (; ; ) {
        if (null === d)
          return;
        var g2 = d.tag;
        if (3 === g2 || 4 === g2) {
          var h2 = d.stateNode.containerInfo;
          if (h2 === e || 8 === h2.nodeType && h2.parentNode === e)
            break;
          if (4 === g2)
            for (g2 = d.return; null !== g2; ) {
              var k = g2.tag;
              if (3 === k || 4 === k) {
                if (k = g2.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                  return;
              }
              g2 = g2.return;
            }
          for (; null !== h2; ) {
            g2 = wc(h2);
            if (null === g2)
              return;
            k = g2.tag;
            if (5 === k || 6 === k) {
              d = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d = d.return;
      }
  Nb(function() {
    var d2 = f2, e2 = xb(c), g3 = [];
    a: {
      var h3 = Mc.get(a);
      if (void 0 !== h3) {
        var k2 = td, x2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c))
              break a;
          case "keydown":
          case "keyup":
            k2 = Rd;
            break;
          case "focusin":
            x2 = "focus";
            k2 = Fd;
            break;
          case "focusout":
            x2 = "blur";
            k2 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k2 = Fd;
            break;
          case "click":
            if (2 === c.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k2 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k2 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k2 = Vd;
            break;
          case Ic:
          case Jc:
          case Kc:
            k2 = Hd;
            break;
          case Lc:
            k2 = Xd;
            break;
          case "scroll":
            k2 = vd;
            break;
          case "wheel":
            k2 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k2 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k2 = Td;
        }
        var w2 = 0 !== (b & 4), z2 = !w2 && "scroll" === a, u2 = w2 ? null !== h3 ? h3 + "Capture" : null : h3;
        w2 = [];
        for (var t2 = d2, q2; null !== t2; ) {
          q2 = t2;
          var v2 = q2.stateNode;
          5 === q2.tag && null !== v2 && (q2 = v2, null !== u2 && (v2 = Ob(t2, u2), null != v2 && w2.push(ef(t2, v2, q2))));
          if (z2)
            break;
          t2 = t2.return;
        }
        0 < w2.length && (h3 = new k2(h3, x2, null, c, e2), g3.push({ event: h3, listeners: w2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h3 = "mouseover" === a || "pointerover" === a;
        k2 = "mouseout" === a || "pointerout" === a;
        if (h3 && 0 === (b & 16) && (x2 = c.relatedTarget || c.fromElement) && (wc(x2) || x2[ff]))
          break a;
        if (k2 || h3) {
          h3 = e2.window === e2 ? e2 : (h3 = e2.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k2) {
            if (x2 = c.relatedTarget || c.toElement, k2 = d2, x2 = x2 ? wc(x2) : null, null !== x2 && (z2 = Zb(x2), x2 !== z2 || 5 !== x2.tag && 6 !== x2.tag))
              x2 = null;
          } else
            k2 = null, x2 = d2;
          if (k2 !== x2) {
            w2 = Bd;
            v2 = "onMouseLeave";
            u2 = "onMouseEnter";
            t2 = "mouse";
            if ("pointerout" === a || "pointerover" === a)
              w2 = Td, v2 = "onPointerLeave", u2 = "onPointerEnter", t2 = "pointer";
            z2 = null == k2 ? h3 : ue(k2);
            q2 = null == x2 ? h3 : ue(x2);
            h3 = new w2(v2, t2 + "leave", k2, c, e2);
            h3.target = z2;
            h3.relatedTarget = q2;
            v2 = null;
            wc(e2) === d2 && (w2 = new w2(u2, t2 + "enter", x2, c, e2), w2.target = q2, w2.relatedTarget = z2, v2 = w2);
            z2 = v2;
            if (k2 && x2)
              b: {
                w2 = k2;
                u2 = x2;
                t2 = 0;
                for (q2 = w2; q2; q2 = gf(q2))
                  t2++;
                q2 = 0;
                for (v2 = u2; v2; v2 = gf(v2))
                  q2++;
                for (; 0 < t2 - q2; )
                  w2 = gf(w2), t2--;
                for (; 0 < q2 - t2; )
                  u2 = gf(u2), q2--;
                for (; t2--; ) {
                  if (w2 === u2 || null !== u2 && w2 === u2.alternate)
                    break b;
                  w2 = gf(w2);
                  u2 = gf(u2);
                }
                w2 = null;
              }
            else
              w2 = null;
            null !== k2 && hf(g3, h3, k2, w2, false);
            null !== x2 && null !== z2 && hf(g3, z2, x2, w2, true);
          }
        }
      }
      a: {
        h3 = d2 ? ue(d2) : window;
        k2 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k2 || "input" === k2 && "file" === h3.type)
          var J2 = ve;
        else if (me(h3))
          if (we)
            J2 = Fe;
          else {
            J2 = De;
            var K2 = Ce;
          }
        else
          (k2 = h3.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (J2 = Ee);
        if (J2 && (J2 = J2(a, d2))) {
          ne(g3, J2, c, e2);
          break a;
        }
        K2 && K2(a, h3, d2);
        "focusout" === a && (K2 = h3._wrapperState) && K2.controlled && "number" === h3.type && bb(h3, "number", h3.value);
      }
      K2 = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(K2) || "true" === K2.contentEditable)
            Qe = K2, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g3, c, e2);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g3, c, e2);
      }
      var Q2;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var L2 = "onCompositionStart";
              break b;
            case "compositionend":
              L2 = "onCompositionEnd";
              break b;
            case "compositionupdate":
              L2 = "onCompositionUpdate";
              break b;
          }
          L2 = void 0;
        }
      else
        ie ? ge(a, c) && (L2 = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (L2 = "onCompositionStart");
      L2 && (de$1 && "ko" !== c.locale && (ie || "onCompositionStart" !== L2 ? "onCompositionEnd" === L2 && ie && (Q2 = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K2 = oe(d2, L2), 0 < K2.length && (L2 = new Ld(L2, a, null, c, e2), g3.push({ event: L2, listeners: K2 }), Q2 ? L2.data = Q2 : (Q2 = he(c), null !== Q2 && (L2.data = Q2))));
      if (Q2 = ce ? je(a, c) : ke(a, c))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld(
          "onBeforeInput",
          "beforeinput",
          null,
          c,
          e2
        ), g3.push({ event: e2, listeners: d2 }), e2.data = Q2);
    }
    se(g3, b);
  });
}
function ef(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Ob(a, c), null != f2 && d.unshift(ef(a, f2, e)), f2 = Ob(a, b), null != f2 && d.push(ef(a, f2, e)));
    a = a.return;
  }
  return d;
}
function gf(a) {
  if (null === a)
    return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function hf(a, b, c, d, e) {
  for (var f2 = b._reactName, g2 = []; null !== c && c !== d; ) {
    var h2 = c, k = h2.alternate, l2 = h2.stateNode;
    if (null !== k && k === d)
      break;
    5 === h2.tag && null !== l2 && (h2 = l2, e ? (k = Ob(c, f2), null != k && g2.unshift(ef(c, k, h2))) : e || (k = Ob(c, f2), null != k && g2.push(ef(c, k, h2))));
    c = c.return;
  }
  0 !== g2.length && a.push({ event: b, listeners: g2 });
}
function jf() {
}
var kf = null, lf = null;
function mf(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }
  return false;
}
function nf(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var of = "function" === typeof setTimeout ? setTimeout : void 0, pf = "function" === typeof clearTimeout ? clearTimeout : void 0;
function qf(a) {
  1 === a.nodeType ? a.textContent = "" : 9 === a.nodeType && (a = a.body, null != a && (a.textContent = ""));
}
function rf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b)
      break;
  }
  return a;
}
function sf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b)
          return a;
        b--;
      } else
        "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var tf = 0;
function uf(a) {
  return { $$typeof: Ga, toString: a, valueOf: a };
}
var vf = Math.random().toString(36).slice(2), wf = "__reactFiber$" + vf, xf = "__reactProps$" + vf, ff = "__reactContainer$" + vf, yf = "__reactEvents$" + vf;
function wc(a) {
  var b = a[wf];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[ff] || c[wf]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child)
        for (a = sf(a); null !== a; ) {
          if (c = a[wf])
            return c;
          a = sf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[wf] || a[ff];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag)
    return a.stateNode;
  throw Error(y(33));
}
function Db(a) {
  return a[xf] || null;
}
function $e(a) {
  var b = a[yf];
  void 0 === b && (b = a[yf] = /* @__PURE__ */ new Set());
  return b;
}
var zf = [], Af = -1;
function Bf(a) {
  return { current: a };
}
function H(a) {
  0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
}
function I(a, b) {
  Af++;
  zf[Af] = a.current;
  a.current = b;
}
var Cf = {}, M = Bf(Cf), N = Bf(false), Df = Cf;
function Ef(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Cf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c)
    e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Ff(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function Gf() {
  H(N);
  H(M);
}
function Hf(a, b, c) {
  if (M.current !== Cf)
    throw Error(y(168));
  I(M, b);
  I(N, c);
}
function If(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext)
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in a))
      throw Error(y(108, Ra(b) || "Unknown", e));
  return m$1({}, c, d);
}
function Jf(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
  Df = M.current;
  I(M, a);
  I(N, N.current);
  return true;
}
function Kf(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(y(169));
  c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
  I(N, c);
}
var Lf = null, Mf = null, Nf = r.unstable_runWithPriority, Of = r.unstable_scheduleCallback, Pf = r.unstable_cancelCallback, Qf = r.unstable_shouldYield, Rf = r.unstable_requestPaint, Sf = r.unstable_now, Tf = r.unstable_getCurrentPriorityLevel, Uf = r.unstable_ImmediatePriority, Vf = r.unstable_UserBlockingPriority, Wf = r.unstable_NormalPriority, Xf = r.unstable_LowPriority, Yf = r.unstable_IdlePriority, Zf = {}, $f = void 0 !== Rf ? Rf : function() {
}, ag = null, bg = null, cg = false, dg = Sf(), O = 1e4 > dg ? Sf : function() {
  return Sf() - dg;
};
function eg() {
  switch (Tf()) {
    case Uf:
      return 99;
    case Vf:
      return 98;
    case Wf:
      return 97;
    case Xf:
      return 96;
    case Yf:
      return 95;
    default:
      throw Error(y(332));
  }
}
function fg(a) {
  switch (a) {
    case 99:
      return Uf;
    case 98:
      return Vf;
    case 97:
      return Wf;
    case 96:
      return Xf;
    case 95:
      return Yf;
    default:
      throw Error(y(332));
  }
}
function gg(a, b) {
  a = fg(a);
  return Nf(a, b);
}
function hg(a, b, c) {
  a = fg(a);
  return Of(a, b, c);
}
function ig() {
  if (null !== bg) {
    var a = bg;
    bg = null;
    Pf(a);
  }
  jg();
}
function jg() {
  if (!cg && null !== ag) {
    cg = true;
    var a = 0;
    try {
      var b = ag;
      gg(99, function() {
        for (; a < b.length; a++) {
          var c = b[a];
          do
            c = c(true);
          while (null !== c);
        }
      });
      ag = null;
    } catch (c) {
      throw null !== ag && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
    } finally {
      cg = false;
    }
  }
}
var kg = ra.ReactCurrentBatchConfig;
function lg(a, b) {
  if (a && a.defaultProps) {
    b = m$1({}, b);
    a = a.defaultProps;
    for (var c in a)
      void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
var mg = Bf(null), ng = null, og = null, pg = null;
function qg() {
  pg = og = ng = null;
}
function rg(a) {
  var b = mg.current;
  H(mg);
  a.type._context._currentValue = b;
}
function sg(a, b) {
  for (; null !== a; ) {
    var c = a.alternate;
    if ((a.childLanes & b) === b)
      if (null === c || (c.childLanes & b) === b)
        break;
      else
        c.childLanes |= b;
    else
      a.childLanes |= b, null !== c && (c.childLanes |= b);
    a = a.return;
  }
}
function tg(a, b) {
  ng = a;
  pg = og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (ug = true), a.firstContext = null);
}
function vg(a, b) {
  if (pg !== a && false !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b)
      pg = a, b = 1073741823;
    b = { context: a, observedBits: b, next: null };
    if (null === og) {
      if (null === ng)
        throw Error(y(308));
      og = b;
      ng.dependencies = { lanes: 0, firstContext: b, responders: null };
    } else
      og = og.next = b;
  }
  return a._currentValue;
}
var wg = false;
function xg(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null }, effects: null };
}
function yg(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function zg(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function Ag(a, b) {
  a = a.updateQueue;
  if (null !== a) {
    a = a.shared;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
}
function Bg(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g2 = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g2 : f2 = f2.next = g2;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else
      e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function Cg(a, b, c, d) {
  var e = a.updateQueue;
  wg = false;
  var f2 = e.firstBaseUpdate, g2 = e.lastBaseUpdate, h2 = e.shared.pending;
  if (null !== h2) {
    e.shared.pending = null;
    var k = h2, l2 = k.next;
    k.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k;
    var n2 = a.alternate;
    if (null !== n2) {
      n2 = n2.updateQueue;
      var A2 = n2.lastBaseUpdate;
      A2 !== g2 && (null === A2 ? n2.firstBaseUpdate = l2 : A2.next = l2, n2.lastBaseUpdate = k);
    }
  }
  if (null !== f2) {
    A2 = e.baseState;
    g2 = 0;
    n2 = l2 = k = null;
    do {
      h2 = f2.lane;
      var p2 = f2.eventTime;
      if ((d & h2) === h2) {
        null !== n2 && (n2 = n2.next = {
          eventTime: p2,
          lane: 0,
          tag: f2.tag,
          payload: f2.payload,
          callback: f2.callback,
          next: null
        });
        a: {
          var C2 = a, x2 = f2;
          h2 = b;
          p2 = c;
          switch (x2.tag) {
            case 1:
              C2 = x2.payload;
              if ("function" === typeof C2) {
                A2 = C2.call(p2, A2, h2);
                break a;
              }
              A2 = C2;
              break a;
            case 3:
              C2.flags = C2.flags & -4097 | 64;
            case 0:
              C2 = x2.payload;
              h2 = "function" === typeof C2 ? C2.call(p2, A2, h2) : C2;
              if (null === h2 || void 0 === h2)
                break a;
              A2 = m$1({}, A2, h2);
              break a;
            case 2:
              wg = true;
          }
        }
        null !== f2.callback && (a.flags |= 32, h2 = e.effects, null === h2 ? e.effects = [f2] : h2.push(f2));
      } else
        p2 = { eventTime: p2, lane: h2, tag: f2.tag, payload: f2.payload, callback: f2.callback, next: null }, null === n2 ? (l2 = n2 = p2, k = A2) : n2 = n2.next = p2, g2 |= h2;
      f2 = f2.next;
      if (null === f2)
        if (h2 = e.shared.pending, null === h2)
          break;
        else
          f2 = h2.next, h2.next = null, e.lastBaseUpdate = h2, e.shared.pending = null;
    } while (1);
    null === n2 && (k = A2);
    e.baseState = k;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = n2;
    Dg |= g2;
    a.lanes = g2;
    a.memoizedState = A2;
  }
}
function Eg(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e)
          throw Error(y(191, e));
        e.call(d);
      }
    }
}
var Fg = new aa.Component().refs;
function Gg(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : m$1({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Kg = { isMounted: function(a) {
  return (a = a._reactInternals) ? Zb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = Hg(), e = Ig(a), f2 = zg(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  Ag(a, f2);
  Jg(a, e, d);
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = Hg(), e = Ig(a), f2 = zg(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  Ag(a, f2);
  Jg(a, e, d);
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = Hg(), d = Ig(a), e = zg(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  Ag(a, e);
  Jg(a, d, c);
} };
function Lg(a, b, c, d, e, f2, g2) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g2) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f2) : true;
}
function Mg(a, b, c) {
  var d = false, e = Cf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = vg(f2) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Kg;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Ng(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
}
function Og(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Fg;
  xg(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = vg(f2) : (f2 = Ff(b) ? Df : M.current, e.context = Ef(a, f2));
  Cg(a, c, e, d);
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Gg(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4);
}
var Pg = Array.isArray;
function Qg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag)
          throw Error(y(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(y(147, a));
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e)
        return b.ref;
      b = function(a2) {
        var b2 = d.refs;
        b2 === Fg && (b2 = d.refs = {});
        null === a2 ? delete b2[e] : b2[e] = a2;
      };
      b._stringRef = e;
      return b;
    }
    if ("string" !== typeof a)
      throw Error(y(284));
    if (!c._owner)
      throw Error(y(290, a));
  }
  return a;
}
function Rg(a, b) {
  if ("textarea" !== a.type)
    throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
}
function Sg(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.lastEffect;
      null !== d2 ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
      c2.nextEffect = null;
      c2.flags = 8;
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; null !== d2; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
      null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Tg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return c2;
    d2 = b2.alternate;
    if (null !== d2)
      return d2 = d2.index, d2 < c2 ? (b2.flags = 2, c2) : d2;
    b2.flags = 2;
    return c2;
  }
  function g2(b2) {
    a && null === b2.alternate && (b2.flags = 2);
    return b2;
  }
  function h2(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag)
      return b2 = Ug(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k(a2, b2, c2, d2) {
    if (null !== b2 && b2.elementType === c2.type)
      return d2 = e(b2, c2.props), d2.ref = Qg(a2, b2, c2), d2.return = a2, d2;
    d2 = Vg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Qg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = Wg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function n2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag)
      return b2 = Xg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function A2(a2, b2, c2) {
    if ("string" === typeof b2 || "number" === typeof b2)
      return b2 = Ug("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case sa:
          return c2 = Vg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Qg(a2, null, b2), c2.return = a2, c2;
        case ta:
          return b2 = Wg(b2, a2.mode, c2), b2.return = a2, b2;
      }
      if (Pg(b2) || La(b2))
        return b2 = Xg(
          b2,
          a2.mode,
          c2,
          null
        ), b2.return = a2, b2;
      Rg(a2, b2);
    }
    return null;
  }
  function p2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 || "number" === typeof c2)
      return null !== e2 ? null : h2(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case sa:
          return c2.key === e2 ? c2.type === ua ? n2(a2, b2, c2.props.children, d2, e2) : k(a2, b2, c2, d2) : null;
        case ta:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
      }
      if (Pg(c2) || La(c2))
        return null !== e2 ? null : n2(a2, b2, c2, d2, null);
      Rg(a2, c2);
    }
    return null;
  }
  function C2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 || "number" === typeof d2)
      return a2 = a2.get(c2) || null, h2(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case sa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, d2.type === ua ? n2(b2, a2, d2.props.children, e2, d2.key) : k(b2, a2, d2, e2);
        case ta:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
      }
      if (Pg(d2) || La(d2))
        return a2 = a2.get(c2) || null, n2(b2, a2, d2, e2, null);
      Rg(b2, d2);
    }
    return null;
  }
  function x2(e2, g3, h3, k2) {
    for (var l3 = null, t2 = null, u2 = g3, z2 = g3 = 0, q2 = null; null !== u2 && z2 < h3.length; z2++) {
      u2.index > z2 ? (q2 = u2, u2 = null) : q2 = u2.sibling;
      var n3 = p2(e2, u2, h3[z2], k2);
      if (null === n3) {
        null === u2 && (u2 = q2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g3 = f2(n3, g3, z2);
      null === t2 ? l3 = n3 : t2.sibling = n3;
      t2 = n3;
      u2 = q2;
    }
    if (z2 === h3.length)
      return c(e2, u2), l3;
    if (null === u2) {
      for (; z2 < h3.length; z2++)
        u2 = A2(e2, h3[z2], k2), null !== u2 && (g3 = f2(u2, g3, z2), null === t2 ? l3 = u2 : t2.sibling = u2, t2 = u2);
      return l3;
    }
    for (u2 = d(e2, u2); z2 < h3.length; z2++)
      q2 = C2(u2, e2, z2, h3[z2], k2), null !== q2 && (a && null !== q2.alternate && u2.delete(null === q2.key ? z2 : q2.key), g3 = f2(q2, g3, z2), null === t2 ? l3 = q2 : t2.sibling = q2, t2 = q2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    return l3;
  }
  function w2(e2, g3, h3, k2) {
    var l3 = La(h3);
    if ("function" !== typeof l3)
      throw Error(y(150));
    h3 = l3.call(h3);
    if (null == h3)
      throw Error(y(151));
    for (var t2 = l3 = null, u2 = g3, z2 = g3 = 0, q2 = null, n3 = h3.next(); null !== u2 && !n3.done; z2++, n3 = h3.next()) {
      u2.index > z2 ? (q2 = u2, u2 = null) : q2 = u2.sibling;
      var w3 = p2(e2, u2, n3.value, k2);
      if (null === w3) {
        null === u2 && (u2 = q2);
        break;
      }
      a && u2 && null === w3.alternate && b(e2, u2);
      g3 = f2(w3, g3, z2);
      null === t2 ? l3 = w3 : t2.sibling = w3;
      t2 = w3;
      u2 = q2;
    }
    if (n3.done)
      return c(e2, u2), l3;
    if (null === u2) {
      for (; !n3.done; z2++, n3 = h3.next())
        n3 = A2(e2, n3.value, k2), null !== n3 && (g3 = f2(n3, g3, z2), null === t2 ? l3 = n3 : t2.sibling = n3, t2 = n3);
      return l3;
    }
    for (u2 = d(e2, u2); !n3.done; z2++, n3 = h3.next())
      n3 = C2(u2, e2, z2, n3.value, k2), null !== n3 && (a && null !== n3.alternate && u2.delete(null === n3.key ? z2 : n3.key), g3 = f2(n3, g3, z2), null === t2 ? l3 = n3 : t2.sibling = n3, t2 = n3);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    return l3;
  }
  return function(a2, d2, f3, h3) {
    var k2 = "object" === typeof f3 && null !== f3 && f3.type === ua && null === f3.key;
    k2 && (f3 = f3.props.children);
    var l3 = "object" === typeof f3 && null !== f3;
    if (l3)
      switch (f3.$$typeof) {
        case sa:
          a: {
            l3 = f3.key;
            for (k2 = d2; null !== k2; ) {
              if (k2.key === l3) {
                switch (k2.tag) {
                  case 7:
                    if (f3.type === ua) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f3.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                    break;
                  default:
                    if (k2.elementType === f3.type) {
                      c(a2, k2.sibling);
                      d2 = e(k2, f3.props);
                      d2.ref = Qg(a2, k2, f3);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                }
                c(a2, k2);
                break;
              } else
                b(a2, k2);
              k2 = k2.sibling;
            }
            f3.type === ua ? (d2 = Xg(f3.props.children, a2.mode, h3, f3.key), d2.return = a2, a2 = d2) : (h3 = Vg(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = Qg(a2, d2, f3), h3.return = a2, a2 = h3);
          }
          return g2(a2);
        case ta:
          a: {
            for (k2 = f3.key; null !== d2; ) {
              if (d2.key === k2)
                if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Wg(f3, a2.mode, h3);
            d2.return = a2;
            a2 = d2;
          }
          return g2(a2);
      }
    if ("string" === typeof f3 || "number" === typeof f3)
      return f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Ug(f3, a2.mode, h3), d2.return = a2, a2 = d2), g2(a2);
    if (Pg(f3))
      return x2(a2, d2, f3, h3);
    if (La(f3))
      return w2(a2, d2, f3, h3);
    l3 && Rg(a2, f3);
    if ("undefined" === typeof f3 && !k2)
      switch (a2.tag) {
        case 1:
        case 22:
        case 0:
        case 11:
        case 15:
          throw Error(y(152, Ra(a2.type) || "Component"));
      }
    return c(a2, d2);
  };
}
var Yg = Sg(true), Zg = Sg(false), $g = {}, ah = Bf($g), bh = Bf($g), ch = Bf($g);
function dh(a) {
  if (a === $g)
    throw Error(y(174));
  return a;
}
function eh(a, b) {
  I(ch, b);
  I(bh, a);
  I(ah, $g);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
  }
  H(ah);
  I(ah, b);
}
function fh() {
  H(ah);
  H(bh);
  H(ch);
}
function gh(a) {
  dh(ch.current);
  var b = dh(ah.current);
  var c = mb(b, a.type);
  b !== c && (I(bh, a), I(ah, c));
}
function hh(a) {
  bh.current === a && (H(ah), H(bh));
}
var P = Bf(0);
function ih(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
        return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 64))
        return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var jh = null, kh = null, lh = false;
function mh(a, b) {
  var c = nh(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.flags = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}
function oh(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, true) : false;
    case 13:
      return false;
    default:
      return false;
  }
}
function ph(a) {
  if (lh) {
    var b = kh;
    if (b) {
      var c = b;
      if (!oh(a, b)) {
        b = rf(c.nextSibling);
        if (!b || !oh(a, b)) {
          a.flags = a.flags & -1025 | 2;
          lh = false;
          jh = a;
          return;
        }
        mh(jh, c);
      }
      jh = a;
      kh = rf(b.firstChild);
    } else
      a.flags = a.flags & -1025 | 2, lh = false, jh = a;
  }
}
function qh(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
    a = a.return;
  jh = a;
}
function rh(a) {
  if (a !== jh)
    return false;
  if (!lh)
    return qh(a), lh = true, false;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !nf(b, a.memoizedProps))
    for (b = kh; b; )
      mh(a, b), b = rf(b.nextSibling);
  qh(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a)
      throw Error(y(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              kh = rf(a.nextSibling);
              break a;
            }
            b--;
          } else
            "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      kh = null;
    }
  } else
    kh = jh ? rf(a.stateNode.nextSibling) : null;
  return true;
}
function sh() {
  kh = jh = null;
  lh = false;
}
var th = [];
function uh() {
  for (var a = 0; a < th.length; a++)
    th[a]._workInProgressVersionPrimary = null;
  th.length = 0;
}
var vh = ra.ReactCurrentDispatcher, wh = ra.ReactCurrentBatchConfig, xh = 0, R = null, S = null, T = null, yh = false, zh = false;
function Ah() {
  throw Error(y(321));
}
function Bh(a, b) {
  if (null === b)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!He(a[c], b[c]))
      return false;
  return true;
}
function Ch(a, b, c, d, e, f2) {
  xh = f2;
  R = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  vh.current = null === a || null === a.memoizedState ? Dh : Eh;
  a = c(d, e);
  if (zh) {
    f2 = 0;
    do {
      zh = false;
      if (!(25 > f2))
        throw Error(y(301));
      f2 += 1;
      T = S = null;
      b.updateQueue = null;
      vh.current = Fh;
      a = c(d, e);
    } while (zh);
  }
  vh.current = Gh;
  b = null !== S && null !== S.next;
  xh = 0;
  T = S = R = null;
  yh = false;
  if (b)
    throw Error(y(300));
  return a;
}
function Hh() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === T ? R.memoizedState = T = a : T = T.next = a;
  return T;
}
function Ih() {
  if (null === S) {
    var a = R.alternate;
    a = null !== a ? a.memoizedState : null;
  } else
    a = S.next;
  var b = null === T ? R.memoizedState : T.next;
  if (null !== b)
    T = b, S = a;
  else {
    if (null === a)
      throw Error(y(310));
    S = a;
    a = { memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null };
    null === T ? R.memoizedState = T = a : T = T.next = a;
  }
  return T;
}
function Jh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Kh(a) {
  var b = Ih(), c = b.queue;
  if (null === c)
    throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = S, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g2 = e.next;
      e.next = f2.next;
      f2.next = g2;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    e = e.next;
    d = d.baseState;
    var h2 = g2 = f2 = null, k = e;
    do {
      var l2 = k.lane;
      if ((xh & l2) === l2)
        null !== h2 && (h2 = h2.next = { lane: 0, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
      else {
        var n2 = {
          lane: l2,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        };
        null === h2 ? (g2 = h2 = n2, f2 = d) : h2 = h2.next = n2;
        R.lanes |= l2;
        Dg |= l2;
      }
      k = k.next;
    } while (null !== k && k !== e);
    null === h2 ? f2 = d : h2.next = g2;
    He(d, b.memoizedState) || (ug = true);
    b.memoizedState = d;
    b.baseState = f2;
    b.baseQueue = h2;
    c.lastRenderedState = d;
  }
  return [b.memoizedState, c.dispatch];
}
function Lh(a) {
  var b = Ih(), c = b.queue;
  if (null === c)
    throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g2 = e = e.next;
    do
      f2 = a(f2, g2.action), g2 = g2.next;
    while (g2 !== e);
    He(f2, b.memoizedState) || (ug = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Mh(a, b, c) {
  var d = b._getVersion;
  d = d(b._source);
  var e = b._workInProgressVersionPrimary;
  if (null !== e)
    a = e === d;
  else if (a = a.mutableReadLanes, a = (xh & a) === a)
    b._workInProgressVersionPrimary = d, th.push(b);
  if (a)
    return c(b._source);
  th.push(b);
  throw Error(y(350));
}
function Nh(a, b, c, d) {
  var e = U;
  if (null === e)
    throw Error(y(349));
  var f2 = b._getVersion, g2 = f2(b._source), h2 = vh.current, k = h2.useState(function() {
    return Mh(e, b, c);
  }), l2 = k[1], n2 = k[0];
  k = T;
  var A2 = a.memoizedState, p2 = A2.refs, C2 = p2.getSnapshot, x2 = A2.source;
  A2 = A2.subscribe;
  var w2 = R;
  a.memoizedState = { refs: p2, source: b, subscribe: d };
  h2.useEffect(function() {
    p2.getSnapshot = c;
    p2.setSnapshot = l2;
    var a2 = f2(b._source);
    if (!He(g2, a2)) {
      a2 = c(b._source);
      He(n2, a2) || (l2(a2), a2 = Ig(w2), e.mutableReadLanes |= a2 & e.pendingLanes);
      a2 = e.mutableReadLanes;
      e.entangledLanes |= a2;
      for (var d2 = e.entanglements, h3 = a2; 0 < h3; ) {
        var k2 = 31 - Vc(h3), v2 = 1 << k2;
        d2[k2] |= a2;
        h3 &= ~v2;
      }
    }
  }, [c, b, d]);
  h2.useEffect(function() {
    return d(b._source, function() {
      var a2 = p2.getSnapshot, c2 = p2.setSnapshot;
      try {
        c2(a2(b._source));
        var d2 = Ig(w2);
        e.mutableReadLanes |= d2 & e.pendingLanes;
      } catch (q2) {
        c2(function() {
          throw q2;
        });
      }
    });
  }, [b, d]);
  He(C2, c) && He(x2, b) && He(A2, d) || (a = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n2 }, a.dispatch = l2 = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n2 = Mh(e, b, c), k.memoizedState = k.baseState = n2);
  return n2;
}
function Ph(a, b, c) {
  var d = Ih();
  return Nh(d, a, b, c);
}
function Qh(a) {
  var b = Hh();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a };
  a = a.dispatch = Oh.bind(null, R, a);
  return [b.memoizedState, a];
}
function Rh(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = R.updateQueue;
  null === b ? (b = { lastEffect: null }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function Sh(a) {
  var b = Hh();
  a = { current: a };
  return b.memoizedState = a;
}
function Th() {
  return Ih().memoizedState;
}
function Uh(a, b, c, d) {
  var e = Hh();
  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
}
function Vh(a, b, c, d) {
  var e = Ih();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== S) {
    var g2 = S.memoizedState;
    f2 = g2.destroy;
    if (null !== d && Bh(d, g2.deps)) {
      Rh(b, c, f2, d);
      return;
    }
  }
  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, f2, d);
}
function Wh(a, b) {
  return Uh(516, 4, a, b);
}
function Xh(a, b) {
  return Vh(516, 4, a, b);
}
function Yh(a, b) {
  return Vh(4, 2, a, b);
}
function Zh(a, b) {
  if ("function" === typeof b)
    return a = a(), b(a), function() {
      b(null);
    };
  if (null !== b && void 0 !== b)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function $h(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return Vh(4, 2, Zh.bind(null, b, a), c);
}
function ai() {
}
function bi(a, b) {
  var c = Ih();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Bh(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ci(a, b) {
  var c = Ih();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Bh(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function di(a, b) {
  var c = eg();
  gg(98 > c ? 98 : c, function() {
    a(true);
  });
  gg(97 < c ? 97 : c, function() {
    var c2 = wh.transition;
    wh.transition = 1;
    try {
      a(false), b();
    } finally {
      wh.transition = c2;
    }
  });
}
function Oh(a, b, c) {
  var d = Hg(), e = Ig(a), f2 = { lane: e, action: c, eagerReducer: null, eagerState: null, next: null }, g2 = b.pending;
  null === g2 ? f2.next = f2 : (f2.next = g2.next, g2.next = f2);
  b.pending = f2;
  g2 = a.alternate;
  if (a === R || null !== g2 && g2 === R)
    zh = yh = true;
  else {
    if (0 === a.lanes && (null === g2 || 0 === g2.lanes) && (g2 = b.lastRenderedReducer, null !== g2))
      try {
        var h2 = b.lastRenderedState, k = g2(h2, c);
        f2.eagerReducer = g2;
        f2.eagerState = k;
        if (He(k, h2))
          return;
      } catch (l2) {
      } finally {
      }
    Jg(a, e, d);
  }
}
var Gh = { readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false }, Dh = { readContext: vg, useCallback: function(a, b) {
  Hh().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: vg, useEffect: Wh, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return Uh(4, 2, Zh.bind(
    null,
    b,
    a
  ), c);
}, useLayoutEffect: function(a, b) {
  return Uh(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Hh();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Hh();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  a = a.dispatch = Oh.bind(null, R, a);
  return [d.memoizedState, a];
}, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Qh(a), c = b[0], d = b[1];
  Wh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Qh(false), b = a[0];
  a = di.bind(null, a[1]);
  Sh(a);
  return [a, b];
}, useMutableSource: function(a, b, c) {
  var d = Hh();
  d.memoizedState = { refs: { getSnapshot: b, setSnapshot: null }, source: a, subscribe: c };
  return Nh(d, a, b, c);
}, useOpaqueIdentifier: function() {
  if (lh) {
    var a = false, b = uf(function() {
      a || (a = true, c("r:" + (tf++).toString(36)));
      throw Error(y(355));
    }), c = Qh(b)[1];
    0 === (R.mode & 2) && (R.flags |= 516, Rh(
      5,
      function() {
        c("r:" + (tf++).toString(36));
      },
      void 0,
      null
    ));
    return b;
  }
  b = "r:" + (tf++).toString(36);
  Qh(b);
  return b;
}, unstable_isNewReconciler: false }, Eh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
  return Kh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Kh(Jh), c = b[0], d = b[1];
  Xh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Kh(Jh)[0];
  return [
    Th().current,
    a
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Kh(Jh)[0];
}, unstable_isNewReconciler: false }, Fh = { readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
  return Lh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a) {
  var b = Lh(Jh), c = b[0], d = b[1];
  Xh(function() {
    var b2 = wh.transition;
    wh.transition = 1;
    try {
      d(a);
    } finally {
      wh.transition = b2;
    }
  }, [a]);
  return c;
}, useTransition: function() {
  var a = Lh(Jh)[0];
  return [
    Th().current,
    a
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Lh(Jh)[0];
}, unstable_isNewReconciler: false }, ei = ra.ReactCurrentOwner, ug = false;
function fi(a, b, c, d) {
  b.child = null === a ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
}
function gi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  tg(b, e);
  d = Ch(a, b, c, d, f2, e);
  if (null !== a && !ug)
    return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi$1(a, b, e);
  b.flags |= 1;
  fi(a, b, d, e);
  return b.child;
}
function ii(a, b, c, d, e, f2) {
  if (null === a) {
    var g2 = c.type;
    if ("function" === typeof g2 && !ji(g2) && void 0 === g2.defaultProps && null === c.compare && void 0 === c.defaultProps)
      return b.tag = 15, b.type = g2, ki(a, b, g2, d, e, f2);
    a = Vg(c.type, null, d, b, b.mode, f2);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  g2 = a.child;
  if (0 === (e & f2) && (e = g2.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a.ref === b.ref))
    return hi$1(a, b, f2);
  b.flags |= 1;
  a = Tg(g2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function ki(a, b, c, d, e, f2) {
  if (null !== a && Je(a.memoizedProps, d) && a.ref === b.ref)
    if (ug = false, 0 !== (f2 & e))
      0 !== (a.flags & 16384) && (ug = true);
    else
      return b.lanes = a.lanes, hi$1(a, b, f2);
  return li(a, b, c, d, f2);
}
function mi(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode)
    if (0 === (b.mode & 4))
      b.memoizedState = { baseLanes: 0 }, ni(b, c);
    else if (0 !== (c & 1073741824))
      b.memoizedState = { baseLanes: 0 }, ni(b, null !== f2 ? f2.baseLanes : c);
    else
      return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a }, ni(b, a), null;
  else
    null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
  fi(a, b, e, c);
  return b.child;
}
function oi(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c)
    b.flags |= 128;
}
function li(a, b, c, d, e) {
  var f2 = Ff(c) ? Df : M.current;
  f2 = Ef(b, f2);
  tg(b, e);
  c = Ch(a, b, c, d, f2, e);
  if (null !== a && !ug)
    return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi$1(a, b, e);
  b.flags |= 1;
  fi(a, b, c, e);
  return b.child;
}
function pi(a, b, c, d, e) {
  if (Ff(c)) {
    var f2 = true;
    Jf(b);
  } else
    f2 = false;
  tg(b, e);
  if (null === b.stateNode)
    null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = true;
  else if (null === a) {
    var g2 = b.stateNode, h2 = b.memoizedProps;
    g2.props = h2;
    var k = g2.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = vg(l2) : (l2 = Ff(c) ? Df : M.current, l2 = Ef(b, l2));
    var n2 = c.getDerivedStateFromProps, A2 = "function" === typeof n2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    A2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d || k !== l2) && Ng(b, g2, d, l2);
    wg = false;
    var p2 = b.memoizedState;
    g2.state = p2;
    Cg(b, d, g2, e);
    k = b.memoizedState;
    h2 !== d || p2 !== k || N.current || wg ? ("function" === typeof n2 && (Gg(b, c, n2, d), k = b.memoizedState), (h2 = wg || Lg(b, c, h2, d, p2, k, l2)) ? (A2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b.flags |= 4)) : ("function" === typeof g2.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g2.props = d, g2.state = k, g2.context = l2, d = h2) : ("function" === typeof g2.componentDidMount && (b.flags |= 4), d = false);
  } else {
    g2 = b.stateNode;
    yg(a, b);
    h2 = b.memoizedProps;
    l2 = b.type === b.elementType ? h2 : lg(b.type, h2);
    g2.props = l2;
    A2 = b.pendingProps;
    p2 = g2.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
    var C2 = c.getDerivedStateFromProps;
    (n2 = "function" === typeof C2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== A2 || p2 !== k) && Ng(b, g2, d, k);
    wg = false;
    p2 = b.memoizedState;
    g2.state = p2;
    Cg(b, d, g2, e);
    var x2 = b.memoizedState;
    h2 !== A2 || p2 !== x2 || N.current || wg ? ("function" === typeof C2 && (Gg(b, c, C2, d), x2 = b.memoizedState), (l2 = wg || Lg(b, c, l2, d, p2, x2, k)) ? (n2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(
      d,
      x2,
      k
    ), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d, x2, k)), "function" === typeof g2.componentDidUpdate && (b.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x2), g2.props = d, g2.state = x2, g2.context = k, d = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 256), d = false);
  }
  return qi(a, b, c, d, f2, e);
}
function qi(a, b, c, d, e, f2) {
  oi(a, b);
  var g2 = 0 !== (b.flags & 64);
  if (!d && !g2)
    return e && Kf(b, c, false), hi$1(a, b, f2);
  d = b.stateNode;
  ei.current = b;
  var h2 = g2 && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g2 ? (b.child = Yg(b, a.child, null, f2), b.child = Yg(b, null, h2, f2)) : fi(a, b, h2, f2);
  b.memoizedState = d.state;
  e && Kf(b, c, true);
  return b.child;
}
function ri(a) {
  var b = a.stateNode;
  b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, false);
  eh(a, b.containerInfo);
}
var si = { dehydrated: null, retryLane: 0 };
function ti(a, b, c) {
  var d = b.pendingProps, e = P.current, f2 = false, g2;
  (g2 = 0 !== (b.flags & 64)) || (g2 = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  g2 ? (f2 = true, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || true === d.unstable_avoidThisFallback || (e |= 1);
  I(P, e & 1);
  if (null === a) {
    void 0 !== d.fallback && ph(b);
    a = d.children;
    e = d.fallback;
    if (f2)
      return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, a;
    if ("number" === typeof d.unstable_expectedLoadTime)
      return a = ui(b, a, e, c), b.child.memoizedState = { baseLanes: c }, b.memoizedState = si, b.lanes = 33554432, a;
    c = vi({ mode: "visible", children: a }, b.mode, c, null);
    c.return = b;
    return b.child = c;
  }
  if (null !== a.memoizedState) {
    if (f2)
      return d = wi(a, b, d.children, d.fallback, c), f2 = b.child, e = a.child.memoizedState, f2.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f2.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
    c = xi(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }
  if (f2)
    return d = wi(a, b, d.children, d.fallback, c), f2 = b.child, e = a.child.memoizedState, f2.memoizedState = null === e ? { baseLanes: c } : { baseLanes: e.baseLanes | c }, f2.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
  c = xi(a, b, d.children, c);
  b.memoizedState = null;
  return c;
}
function ui(a, b, c, d) {
  var e = a.mode, f2 = a.child;
  b = { mode: "hidden", children: b };
  0 === (e & 2) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = b) : f2 = vi(b, e, 0, null);
  c = Xg(c, e, d, null);
  f2.return = a;
  c.return = a;
  f2.sibling = c;
  a.child = f2;
  return c;
}
function xi(a, b, c, d) {
  var e = a.child;
  a = e.sibling;
  c = Tg(e, { mode: "visible", children: c });
  0 === (b.mode & 2) && (c.lanes = d);
  c.return = b;
  c.sibling = null;
  null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
  return b.child = c;
}
function wi(a, b, c, d, e) {
  var f2 = b.mode, g2 = a.child;
  a = g2.sibling;
  var h2 = { mode: "hidden", children: c };
  0 === (f2 & 2) && b.child !== g2 ? (c = b.child, c.childLanes = 0, c.pendingProps = h2, g2 = c.lastEffect, null !== g2 ? (b.firstEffect = c.firstEffect, b.lastEffect = g2, g2.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g2, h2);
  null !== a ? d = Tg(a, d) : (d = Xg(d, f2, e, null), d.flags |= 2);
  d.return = b;
  c.return = b;
  c.sibling = d;
  b.child = c;
  return d;
}
function yi(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  sg(a.return, b);
}
function zi(a, b, c, d, e, f2) {
  var g2 = a.memoizedState;
  null === g2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e, lastEffect: f2 } : (g2.isBackwards = b, g2.rendering = null, g2.renderingStartTime = 0, g2.last = d, g2.tail = c, g2.tailMode = e, g2.lastEffect = f2);
}
function Ai(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  fi(a, b, d.children, c);
  d = P.current;
  if (0 !== (d & 2))
    d = d & 1 | 2, b.flags |= 64;
  else {
    if (null !== a && 0 !== (a.flags & 64))
      a:
        for (a = b.child; null !== a; ) {
          if (13 === a.tag)
            null !== a.memoizedState && yi(a, c);
          else if (19 === a.tag)
            yi(a, c);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  I(P, d);
  if (0 === (b.mode & 2))
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; )
          a = c.alternate, null !== a && null === ih(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        zi(b, false, e, c, f2, b.lastEffect);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === ih(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        zi(b, true, c, null, f2, b.lastEffect);
        break;
      case "together":
        zi(b, false, null, null, void 0, b.lastEffect);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function hi$1(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  Dg |= b.lanes;
  if (0 !== (c & b.childLanes)) {
    if (null !== a && b.child !== a.child)
      throw Error(y(153));
    if (null !== b.child) {
      a = b.child;
      c = Tg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; )
        a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  return null;
}
var Bi, Ci, Di, Ei;
Bi = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag)
      a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Ci = function() {
};
Di = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    dh(ah.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "option":
        e = eb(a, e);
        d = eb(a, d);
        f2 = [];
        break;
      case "select":
        e = m$1({}, e, { value: void 0 });
        d = m$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = jf);
    }
    vb(c, d);
    var g2;
    c = null;
    for (l2 in e)
      if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2])
        if ("style" === l2) {
          var h2 = e[l2];
          for (g2 in h2)
            h2.hasOwnProperty(g2) && (c || (c = {}), c[g2] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ca.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k = d[l2];
      h2 = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k !== h2 && (null != k || null != h2))
        if ("style" === l2)
          if (h2) {
            for (g2 in h2)
              !h2.hasOwnProperty(g2) || k && k.hasOwnProperty(g2) || (c || (c = {}), c[g2] = "");
            for (g2 in k)
              k.hasOwnProperty(g2) && h2[g2] !== k[g2] && (c || (c = {}), c[g2] = k[g2]);
          } else
            c || (f2 || (f2 = []), f2.push(l2, c)), c = k;
        else
          "dangerouslySetInnerHTML" === l2 ? (k = k ? k.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k && h2 !== k && (f2 = f2 || []).push(l2, k)) : "children" === l2 ? "string" !== typeof k && "number" !== typeof k || (f2 = f2 || []).push(l2, "" + k) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ca.hasOwnProperty(l2) ? (null != k && "onScroll" === l2 && G("scroll", a), f2 || h2 === k || (f2 = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f2 = f2 || []).push(l2, k));
    }
    c && (f2 = f2 || []).push(
      "style",
      c
    );
    var l2 = f2;
    if (b.updateQueue = l2)
      b.flags |= 4;
  }
};
Ei = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Fi(a, b) {
  if (!lh)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; )
          null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; )
          null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function Gi(a, b, c) {
  var d = b.pendingProps;
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return Ff(b.type) && Gf(), null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      d = b.stateNode;
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child)
        rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
      Ci(b);
      return null;
    case 5:
      hh(b);
      var e = dh(ch.current);
      c = b.type;
      if (null !== a && null != b.stateNode)
        Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);
      else {
        if (!d) {
          if (null === b.stateNode)
            throw Error(y(166));
          return null;
        }
        a = dh(ah.current);
        if (rh(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[wf] = b;
          d[xf] = f2;
          switch (c) {
            case "dialog":
              G("cancel", d);
              G("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", d);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Xe.length; a++)
                G(Xe[a], d);
              break;
            case "source":
              G("error", d);
              break;
            case "img":
            case "image":
            case "link":
              G("error", d);
              G("load", d);
              break;
            case "details":
              G("toggle", d);
              break;
            case "input":
              Za(d, f2);
              G("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              G("invalid", d);
              break;
            case "textarea":
              hb(d, f2), G("invalid", d);
          }
          vb(c, f2);
          a = null;
          for (var g2 in f2)
            f2.hasOwnProperty(g2) && (e = f2[g2], "children" === g2 ? "string" === typeof e ? d.textContent !== e && (a = ["children", e]) : "number" === typeof e && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g2) && null != e && "onScroll" === g2 && G("scroll", d));
          switch (c) {
            case "input":
              Va(d);
              cb(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = jf);
          }
          d = a;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g2 = 9 === e.nodeType ? e : e.ownerDocument;
          a === kb.html && (a = lb(c));
          a === kb.html ? "script" === c ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g2.createElement(c, { is: d.is }) : (a = g2.createElement(c), "select" === c && (g2 = a, d.multiple ? g2.multiple = true : d.size && (g2.size = d.size))) : a = g2.createElementNS(a, c);
          a[wf] = b;
          a[xf] = d;
          Bi(a, b, false, false);
          b.stateNode = a;
          g2 = wb(c, d);
          switch (c) {
            case "dialog":
              G("cancel", a);
              G("close", a);
              e = d;
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", a);
              e = d;
              break;
            case "video":
            case "audio":
              for (e = 0; e < Xe.length; e++)
                G(Xe[e], a);
              e = d;
              break;
            case "source":
              G("error", a);
              e = d;
              break;
            case "img":
            case "image":
            case "link":
              G("error", a);
              G("load", a);
              e = d;
              break;
            case "details":
              G("toggle", a);
              e = d;
              break;
            case "input":
              Za(a, d);
              e = Ya(a, d);
              G("invalid", a);
              break;
            case "option":
              e = eb(a, d);
              break;
            case "select":
              a._wrapperState = { wasMultiple: !!d.multiple };
              e = m$1({}, d, { value: void 0 });
              G("invalid", a);
              break;
            case "textarea":
              hb(a, d);
              e = gb(a, d);
              G("invalid", a);
              break;
            default:
              e = d;
          }
          vb(c, e);
          var h2 = e;
          for (f2 in h2)
            if (h2.hasOwnProperty(f2)) {
              var k = h2[f2];
              "style" === f2 ? tb(a, k) : "dangerouslySetInnerHTML" === f2 ? (k = k ? k.__html : void 0, null != k && ob(a, k)) : "children" === f2 ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a, k) : "number" === typeof k && pb(a, "" + k) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ca.hasOwnProperty(f2) ? null != k && "onScroll" === f2 && G("scroll", a) : null != k && qa(a, f2, k, g2));
            }
          switch (c) {
            case "input":
              Va(a);
              cb(a, d, false);
              break;
            case "textarea":
              Va(a);
              jb(a);
              break;
            case "option":
              null != d.value && a.setAttribute("value", "" + Sa(d.value));
              break;
            case "select":
              a.multiple = !!d.multiple;
              f2 = d.value;
              null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, true);
              break;
            default:
              "function" === typeof e.onClick && (a.onclick = jf);
          }
          mf(c, d) && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 128);
      }
      return null;
    case 6:
      if (a && null != b.stateNode)
        Ei(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode)
          throw Error(y(166));
        c = dh(ch.current);
        dh(ah.current);
        rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
      }
      return null;
    case 13:
      H(P);
      d = b.memoizedState;
      if (0 !== (b.flags & 64))
        return b.lanes = c, b;
      d = null !== d;
      c = false;
      null === a ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a.memoizedState;
      if (d && !c && 0 !== (b.mode & 2))
        if (null === a && true !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1))
          0 === V && (V = 3);
        else {
          if (0 === V || 3 === V)
            V = 4;
          null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
        }
      if (d || c)
        b.flags |= 4;
      return null;
    case 4:
      return fh(), Ci(b), null === a && cf(b.stateNode.containerInfo), null;
    case 10:
      return rg(b), null;
    case 17:
      return Ff(b.type) && Gf(), null;
    case 19:
      H(P);
      d = b.memoizedState;
      if (null === d)
        return null;
      f2 = 0 !== (b.flags & 64);
      g2 = d.rendering;
      if (null === g2)
        if (f2)
          Fi(d, false);
        else {
          if (0 !== V || null !== a && 0 !== (a.flags & 64))
            for (a = b.child; null !== a; ) {
              g2 = ih(a);
              if (null !== g2) {
                b.flags |= 64;
                Fi(d, false);
                f2 = g2.updateQueue;
                null !== f2 && (b.updateQueue = f2, b.flags |= 4);
                null === d.lastEffect && (b.firstEffect = null);
                b.lastEffect = d.lastEffect;
                d = c;
                for (c = b.child; null !== c; )
                  f2 = c, a = d, f2.flags &= 2, f2.nextEffect = null, f2.firstEffect = null, f2.lastEffect = null, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                I(P, P.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          null !== d.tail && O() > Ji && (b.flags |= 64, f2 = true, Fi(d, false), b.lanes = 33554432);
        }
      else {
        if (!f2)
          if (a = ih(g2), null !== a) {
            if (b.flags |= 64, f2 = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, true), null === d.tail && "hidden" === d.tailMode && !g2.alternate && !lh)
              return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
          } else
            2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f2 = true, Fi(d, false), b.lanes = 33554432);
        d.isBackwards ? (g2.sibling = b.child, b.child = g2) : (c = d.last, null !== c ? c.sibling = g2 : b.child = g2, d.last = g2);
      }
      return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f2 ? b & 1 | 2 : b & 1), c) : null;
    case 23:
    case 24:
      return Ki(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
  }
  throw Error(y(156, b.tag));
}
function Li(a) {
  switch (a.tag) {
    case 1:
      Ff(a.type) && Gf();
      var b = a.flags;
      return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      b = a.flags;
      if (0 !== (b & 64))
        throw Error(y(285));
      a.flags = b & -4097 | 64;
      return a;
    case 5:
      return hh(a), null;
    case 13:
      return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;
    case 19:
      return H(P), null;
    case 4:
      return fh(), null;
    case 10:
      return rg(a), null;
    case 23:
    case 24:
      return Ki(), null;
    default:
      return null;
  }
}
function Mi(a, b) {
  try {
    var c = "", d = b;
    do
      c += Qa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e };
}
function Ni(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Oi = "function" === typeof WeakMap ? WeakMap : Map;
function Pi(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Qi || (Qi = true, Ri = d);
    Ni(a, b);
  };
  return c;
}
function Si(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      Ni(a, b);
      return d(e);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    "function" !== typeof d && (null === Ti ? Ti = /* @__PURE__ */ new Set([this]) : Ti.add(this), Ni(a, b));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
var Ui = "function" === typeof WeakSet ? WeakSet : Set;
function Vi(a) {
  var b = a.ref;
  if (null !== b)
    if ("function" === typeof b)
      try {
        b(null);
      } catch (c) {
        Wi(a, c);
      }
    else
      b.current = null;
}
function Xi(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (b.flags & 256 && null !== a) {
        var c = a.memoizedProps, d = a.memoizedState;
        a = b.stateNode;
        b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
        a.__reactInternalSnapshotBeforeUpdate = b;
      }
      return;
    case 3:
      b.flags & 256 && qf(b.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(y(163));
}
function Yi(a, b, c) {
  switch (c.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      b = c.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        a = b = b.next;
        do {
          if (3 === (a.tag & 3)) {
            var d = a.create;
            a.destroy = d();
          }
          a = a.next;
        } while (a !== b);
      }
      b = c.updateQueue;
      b = null !== b ? b.lastEffect : null;
      if (null !== b) {
        a = b = b.next;
        do {
          var e = a;
          d = e.next;
          e = e.tag;
          0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a), $i(c, a));
          a = d;
        } while (a !== b);
      }
      return;
    case 1:
      a = c.stateNode;
      c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(
        d,
        b.memoizedState,
        a.__reactInternalSnapshotBeforeUpdate
      )));
      b = c.updateQueue;
      null !== b && Eg(c, b, a);
      return;
    case 3:
      b = c.updateQueue;
      if (null !== b) {
        a = null;
        if (null !== c.child)
          switch (c.child.tag) {
            case 5:
              a = c.child.stateNode;
              break;
            case 1:
              a = c.child.stateNode;
          }
        Eg(c, b, a);
      }
      return;
    case 5:
      a = c.stateNode;
      null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
    case 23:
    case 24:
      return;
  }
  throw Error(y(163));
}
function aj(a, b) {
  for (var c = a; ; ) {
    if (5 === c.tag) {
      var d = c.stateNode;
      if (b)
        d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";
      else {
        d = c.stateNode;
        var e = c.memoizedProps.style;
        e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
        d.style.display = sb("display", e);
      }
    } else if (6 === c.tag)
      c.stateNode.nodeValue = b ? "" : c.memoizedProps;
    else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === a)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === a)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
}
function bj(a, b) {
  if (Mf && "function" === typeof Mf.onCommitFiberUnmount)
    try {
      Mf.onCommitFiberUnmount(Lf, b);
    } catch (f2) {
    }
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      a = b.updateQueue;
      if (null !== a && (a = a.lastEffect, null !== a)) {
        var c = a = a.next;
        do {
          var d = c, e = d.destroy;
          d = d.tag;
          if (void 0 !== e)
            if (0 !== (d & 4))
              Zi(b, c);
            else {
              d = b;
              try {
                e();
              } catch (f2) {
                Wi(d, f2);
              }
            }
          c = c.next;
        } while (c !== a);
      }
      break;
    case 1:
      Vi(b);
      a = b.stateNode;
      if ("function" === typeof a.componentWillUnmount)
        try {
          a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
        } catch (f2) {
          Wi(
            b,
            f2
          );
        }
      break;
    case 5:
      Vi(b);
      break;
    case 4:
      cj(a, b);
  }
}
function dj(a) {
  a.alternate = null;
  a.child = null;
  a.dependencies = null;
  a.firstEffect = null;
  a.lastEffect = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.return = null;
  a.updateQueue = null;
}
function ej(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function fj(a) {
  a: {
    for (var b = a.return; null !== b; ) {
      if (ej(b))
        break a;
      b = b.return;
    }
    throw Error(y(160));
  }
  var c = b;
  b = c.stateNode;
  switch (c.tag) {
    case 5:
      var d = false;
      break;
    case 3:
      b = b.containerInfo;
      d = true;
      break;
    case 4:
      b = b.containerInfo;
      d = true;
      break;
    default:
      throw Error(y(161));
  }
  c.flags & 16 && (pb(b, ""), c.flags &= -17);
  a:
    b:
      for (c = a; ; ) {
        for (; null === c.sibling; ) {
          if (null === c.return || ej(c.return)) {
            c = null;
            break a;
          }
          c = c.return;
        }
        c.sibling.return = c.return;
        for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag; ) {
          if (c.flags & 2)
            continue b;
          if (null === c.child || 4 === c.tag)
            continue b;
          else
            c.child.return = c, c = c.child;
        }
        if (!(c.flags & 2)) {
          c = c.stateNode;
          break a;
        }
      }
  d ? gj(a, c, b) : hj(a, c, b);
}
function gj(a, b, c) {
  var d = a.tag, e = 5 === d || 6 === d;
  if (e)
    a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));
  else if (4 !== d && (a = a.child, null !== a))
    for (gj(a, b, c), a = a.sibling; null !== a; )
      gj(a, b, c), a = a.sibling;
}
function hj(a, b, c) {
  var d = a.tag, e = 5 === d || 6 === d;
  if (e)
    a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a))
    for (hj(a, b, c), a = a.sibling; null !== a; )
      hj(a, b, c), a = a.sibling;
}
function cj(a, b) {
  for (var c = b, d = false, e, f2; ; ) {
    if (!d) {
      d = c.return;
      a:
        for (; ; ) {
          if (null === d)
            throw Error(y(160));
          e = d.stateNode;
          switch (d.tag) {
            case 5:
              f2 = false;
              break a;
            case 3:
              e = e.containerInfo;
              f2 = true;
              break a;
            case 4:
              e = e.containerInfo;
              f2 = true;
              break a;
          }
          d = d.return;
        }
      d = true;
    }
    if (5 === c.tag || 6 === c.tag) {
      a:
        for (var g2 = a, h2 = c, k = h2; ; )
          if (bj(g2, k), null !== k.child && 4 !== k.tag)
            k.child.return = k, k = k.child;
          else {
            if (k === h2)
              break a;
            for (; null === k.sibling; ) {
              if (null === k.return || k.return === h2)
                break a;
              k = k.return;
            }
            k.sibling.return = k.return;
            k = k.sibling;
          }
      f2 ? (g2 = e, h2 = c.stateNode, 8 === g2.nodeType ? g2.parentNode.removeChild(h2) : g2.removeChild(h2)) : e.removeChild(c.stateNode);
    } else if (4 === c.tag) {
      if (null !== c.child) {
        e = c.stateNode.containerInfo;
        f2 = true;
        c.child.return = c;
        c = c.child;
        continue;
      }
    } else if (bj(a, c), null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b)
        return;
      c = c.return;
      4 === c.tag && (d = false);
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
}
function ij(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      var c = b.updateQueue;
      c = null !== c ? c.lastEffect : null;
      if (null !== c) {
        var d = c = c.next;
        do
          3 === (d.tag & 3) && (a = d.destroy, d.destroy = void 0, void 0 !== a && a()), d = d.next;
        while (d !== c);
      }
      return;
    case 1:
      return;
    case 5:
      c = b.stateNode;
      if (null != c) {
        d = b.memoizedProps;
        var e = null !== a ? a.memoizedProps : d;
        a = b.type;
        var f2 = b.updateQueue;
        b.updateQueue = null;
        if (null !== f2) {
          c[xf] = d;
          "input" === a && "radio" === d.type && null != d.name && $a(c, d);
          wb(a, e);
          b = wb(a, d);
          for (e = 0; e < f2.length; e += 2) {
            var g2 = f2[e], h2 = f2[e + 1];
            "style" === g2 ? tb(c, h2) : "dangerouslySetInnerHTML" === g2 ? ob(c, h2) : "children" === g2 ? pb(c, h2) : qa(c, g2, h2, b);
          }
          switch (a) {
            case "input":
              ab(c, d);
              break;
            case "textarea":
              ib(c, d);
              break;
            case "select":
              a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f2 = d.value, null != f2 ? fb(c, !!d.multiple, f2, false) : a !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, true) : fb(c, !!d.multiple, d.multiple ? [] : "", false));
          }
        }
      }
      return;
    case 6:
      if (null === b.stateNode)
        throw Error(y(162));
      b.stateNode.nodeValue = b.memoizedProps;
      return;
    case 3:
      c = b.stateNode;
      c.hydrate && (c.hydrate = false, Cc(c.containerInfo));
      return;
    case 12:
      return;
    case 13:
      null !== b.memoizedState && (jj = O(), aj(b.child, true));
      kj(b);
      return;
    case 19:
      kj(b);
      return;
    case 17:
      return;
    case 23:
    case 24:
      aj(b, null !== b.memoizedState);
      return;
  }
  throw Error(y(163));
}
function kj(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Ui());
    b.forEach(function(b2) {
      var d = lj.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function mj(a, b) {
  return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : false;
}
var nj = Math.ceil, oj = ra.ReactCurrentDispatcher, pj = ra.ReactCurrentOwner, X = 0, U = null, Y = null, W = 0, qj = 0, rj = Bf(0), V = 0, sj = null, tj = 0, Dg = 0, Hi = 0, uj = 0, vj = null, jj = 0, Ji = Infinity;
function wj() {
  Ji = O() + 500;
}
var Z = null, Qi = false, Ri = null, Ti = null, xj = false, yj = null, zj = 90, Aj = [], Bj = [], Cj = null, Dj = 0, Ej = null, Fj = -1, Gj = 0, Hj = 0, Ij = null, Jj = false;
function Hg() {
  return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
}
function Ig(a) {
  a = a.mode;
  if (0 === (a & 2))
    return 1;
  if (0 === (a & 4))
    return 99 === eg() ? 1 : 2;
  0 === Gj && (Gj = tj);
  if (0 !== kg.transition) {
    0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
    a = Gj;
    var b = 4186112 & ~Hj;
    b &= -b;
    0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
    return b;
  }
  a = eg();
  0 !== (X & 4) && 98 === a ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
  return a;
}
function Jg(a, b, c) {
  if (50 < Dj)
    throw Dj = 0, Ej = null, Error(y(185));
  a = Kj(a, b);
  if (null === a)
    return null;
  $c(a, b, c);
  a === U && (Hi |= b, 4 === V && Ii(a, W));
  var d = eg();
  1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a) : (Mj(a, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = /* @__PURE__ */ new Set([a]) : Cj.add(a)), Mj(a, c));
  vj = a;
}
function Kj(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; )
    a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
function Mj(a, b) {
  for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f2 = a.expirationTimes, g2 = a.pendingLanes; 0 < g2; ) {
    var h2 = 31 - Vc(g2), k = 1 << h2, l2 = f2[h2];
    if (-1 === l2) {
      if (0 === (k & d) || 0 !== (k & e)) {
        l2 = b;
        Rc(k);
        var n2 = F;
        f2[h2] = 10 <= n2 ? l2 + 250 : 6 <= n2 ? l2 + 5e3 : -1;
      }
    } else
      l2 <= b && (a.expiredLanes |= k);
    g2 &= ~k;
  }
  d = Uc(a, a === U ? W : 0);
  b = F;
  if (0 === d)
    null !== c && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);
  else {
    if (null !== c) {
      if (a.callbackPriority === b)
        return;
      c !== Zf && Pf(c);
    }
    15 === b ? (c = Lj.bind(null, a), null === ag ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Nj(a) {
  Fj = -1;
  Hj = Gj = 0;
  if (0 !== (X & 48))
    throw Error(y(327));
  var b = a.callbackNode;
  if (Oj() && a.callbackNode !== b)
    return null;
  var c = Uc(a, a === U ? W : 0);
  if (0 === c)
    return null;
  var d = c;
  var e = X;
  X |= 16;
  var f2 = Pj();
  if (U !== a || W !== d)
    wj(), Qj(a, d);
  do
    try {
      Rj();
      break;
    } catch (h2) {
      Sj(a, h2);
    }
  while (1);
  qg();
  oj.current = f2;
  X = e;
  null !== Y ? d = 0 : (U = null, W = 0, d = V);
  if (0 !== (tj & Hi))
    Qj(a, 0);
  else if (0 !== d) {
    2 === d && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), c = Wc(a), 0 !== c && (d = Tj(a, c)));
    if (1 === d)
      throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
    a.finishedWork = a.current.alternate;
    a.finishedLanes = c;
    switch (d) {
      case 0:
      case 1:
        throw Error(y(345));
      case 2:
        Uj(a);
        break;
      case 3:
        Ii(a, c);
        if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
          if (0 !== Uc(a, 0))
            break;
          e = a.suspendedLanes;
          if ((e & c) !== c) {
            Hg();
            a.pingedLanes |= a.suspendedLanes & e;
            break;
          }
          a.timeoutHandle = of(Uj.bind(null, a), d);
          break;
        }
        Uj(a);
        break;
      case 4:
        Ii(a, c);
        if ((c & 4186112) === c)
          break;
        d = a.eventTimes;
        for (e = -1; 0 < c; ) {
          var g2 = 31 - Vc(c);
          f2 = 1 << g2;
          g2 = d[g2];
          g2 > e && (e = g2);
          c &= ~f2;
        }
        c = e;
        c = O() - c;
        c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;
        if (10 < c) {
          a.timeoutHandle = of(Uj.bind(null, a), c);
          break;
        }
        Uj(a);
        break;
      case 5:
        Uj(a);
        break;
      default:
        throw Error(y(329));
    }
  }
  Mj(a, O());
  return a.callbackNode === b ? Nj.bind(null, a) : null;
}
function Ii(a, b) {
  b &= ~uj;
  b &= ~Hi;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - Vc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Lj(a) {
  if (0 !== (X & 48))
    throw Error(y(327));
  Oj();
  if (a === U && 0 !== (a.expiredLanes & W)) {
    var b = W;
    var c = Tj(a, b);
    0 !== (tj & Hi) && (b = Uc(a, b), c = Tj(a, b));
  } else
    b = Uc(a, 0), c = Tj(a, b);
  0 !== a.tag && 2 === c && (X |= 64, a.hydrate && (a.hydrate = false, qf(a.containerInfo)), b = Wc(a), 0 !== b && (c = Tj(a, b)));
  if (1 === c)
    throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Uj(a);
  Mj(a, O());
  return null;
}
function Vj() {
  if (null !== Cj) {
    var a = Cj;
    Cj = null;
    a.forEach(function(a2) {
      a2.expiredLanes |= 24 & a2.pendingLanes;
      Mj(a2, O());
    });
  }
  ig();
}
function Wj(a, b) {
  var c = X;
  X |= 1;
  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
}
function Xj(a, b) {
  var c = X;
  X &= -2;
  X |= 8;
  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
}
function ni(a, b) {
  I(rj, qj);
  qj |= b;
  tj |= b;
}
function Ki() {
  qj = rj.current;
  H(rj);
}
function Qj(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, pf(c));
  if (null !== Y)
    for (c = Y.return; null !== c; ) {
      var d = c;
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && Gf();
          break;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          break;
        case 5:
          hh(d);
          break;
        case 4:
          fh();
          break;
        case 13:
          H(P);
          break;
        case 19:
          H(P);
          break;
        case 10:
          rg(d);
          break;
        case 23:
        case 24:
          Ki();
      }
      c = c.return;
    }
  U = a;
  Y = Tg(a.current, null);
  W = qj = tj = b;
  V = 0;
  sj = null;
  uj = Hi = Dg = 0;
}
function Sj(a, b) {
  do {
    var c = Y;
    try {
      qg();
      vh.current = Gh;
      if (yh) {
        for (var d = R.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        yh = false;
      }
      xh = 0;
      T = S = R = null;
      zh = false;
      pj.current = null;
      if (null === c || null === c.return) {
        V = 1;
        sj = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g2 = c.return, h2 = c, k = b;
        b = W;
        h2.flags |= 2048;
        h2.firstEffect = h2.lastEffect = null;
        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l2 = k;
          if (0 === (h2.mode & 2)) {
            var n2 = h2.alternate;
            n2 ? (h2.updateQueue = n2.updateQueue, h2.memoizedState = n2.memoizedState, h2.lanes = n2.lanes) : (h2.updateQueue = null, h2.memoizedState = null);
          }
          var A2 = 0 !== (P.current & 1), p2 = g2;
          do {
            var C2;
            if (C2 = 13 === p2.tag) {
              var x2 = p2.memoizedState;
              if (null !== x2)
                C2 = null !== x2.dehydrated ? true : false;
              else {
                var w2 = p2.memoizedProps;
                C2 = void 0 === w2.fallback ? false : true !== w2.unstable_avoidThisFallback ? true : A2 ? false : true;
              }
            }
            if (C2) {
              var z2 = p2.updateQueue;
              if (null === z2) {
                var u2 = /* @__PURE__ */ new Set();
                u2.add(l2);
                p2.updateQueue = u2;
              } else
                z2.add(l2);
              if (0 === (p2.mode & 2)) {
                p2.flags |= 64;
                h2.flags |= 16384;
                h2.flags &= -2981;
                if (1 === h2.tag)
                  if (null === h2.alternate)
                    h2.tag = 17;
                  else {
                    var t2 = zg(-1, 1);
                    t2.tag = 2;
                    Ag(h2, t2);
                  }
                h2.lanes |= 1;
                break a;
              }
              k = void 0;
              h2 = b;
              var q2 = f2.pingCache;
              null === q2 ? (q2 = f2.pingCache = new Oi(), k = /* @__PURE__ */ new Set(), q2.set(l2, k)) : (k = q2.get(l2), void 0 === k && (k = /* @__PURE__ */ new Set(), q2.set(l2, k)));
              if (!k.has(h2)) {
                k.add(h2);
                var v2 = Yj.bind(null, f2, l2, h2);
                l2.then(v2, v2);
              }
              p2.flags |= 4096;
              p2.lanes = b;
              break a;
            }
            p2 = p2.return;
          } while (null !== p2);
          k = Error((Ra(h2.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        }
        5 !== V && (V = 2);
        k = Mi(k, h2);
        p2 = g2;
        do {
          switch (p2.tag) {
            case 3:
              f2 = k;
              p2.flags |= 4096;
              b &= -b;
              p2.lanes |= b;
              var J2 = Pi(p2, f2, b);
              Bg(p2, J2);
              break a;
            case 1:
              f2 = k;
              var K2 = p2.type, Q2 = p2.stateNode;
              if (0 === (p2.flags & 64) && ("function" === typeof K2.getDerivedStateFromError || null !== Q2 && "function" === typeof Q2.componentDidCatch && (null === Ti || !Ti.has(Q2)))) {
                p2.flags |= 4096;
                b &= -b;
                p2.lanes |= b;
                var L2 = Si(p2, f2, b);
                Bg(p2, L2);
                break a;
              }
          }
          p2 = p2.return;
        } while (null !== p2);
      }
      Zj(c);
    } catch (va) {
      b = va;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Pj() {
  var a = oj.current;
  oj.current = Gh;
  return null === a ? Gh : a;
}
function Tj(a, b) {
  var c = X;
  X |= 16;
  var d = Pj();
  U === a && W === b || Qj(a, b);
  do
    try {
      ak();
      break;
    } catch (e) {
      Sj(a, e);
    }
  while (1);
  qg();
  X = c;
  oj.current = d;
  if (null !== Y)
    throw Error(y(261));
  U = null;
  W = 0;
  return V;
}
function ak() {
  for (; null !== Y; )
    bk(Y);
}
function Rj() {
  for (; null !== Y && !Qf(); )
    bk(Y);
}
function bk(a) {
  var b = ck(a.alternate, a, qj);
  a.memoizedProps = a.pendingProps;
  null === b ? Zj(a) : Y = b;
  pj.current = null;
}
function Zj(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 2048)) {
      c = Gi(c, b, qj);
      if (null !== c) {
        Y = c;
        return;
      }
      c = b;
      if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
        for (var d = 0, e = c.child; null !== e; )
          d |= e.lanes | e.childLanes, e = e.sibling;
        c.childLanes = d;
      }
      null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
    } else {
      c = Li(b);
      if (null !== c) {
        c.flags &= 2047;
        Y = c;
        return;
      }
      null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === V && (V = 5);
}
function Uj(a) {
  var b = eg();
  gg(99, dk.bind(null, a, b));
  return null;
}
function dk(a, b) {
  do
    Oj();
  while (null !== yj);
  if (0 !== (X & 48))
    throw Error(y(327));
  var c = a.finishedWork;
  if (null === c)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(y(177));
  a.callbackNode = null;
  var d = c.lanes | c.childLanes, e = d, f2 = a.pendingLanes & ~e;
  a.pendingLanes = e;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= e;
  a.mutableReadLanes &= e;
  a.entangledLanes &= e;
  e = a.entanglements;
  for (var g2 = a.eventTimes, h2 = a.expirationTimes; 0 < f2; ) {
    var k = 31 - Vc(f2), l2 = 1 << k;
    e[k] = 0;
    g2[k] = -1;
    h2[k] = -1;
    f2 &= ~l2;
  }
  null !== Cj && 0 === (d & 24) && Cj.has(a) && Cj.delete(a);
  a === U && (Y = U = null, W = 0);
  1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;
  if (null !== d) {
    e = X;
    X |= 32;
    pj.current = null;
    kf = fd;
    g2 = Ne();
    if (Oe(g2)) {
      if ("selectionStart" in g2)
        h2 = { start: g2.selectionStart, end: g2.selectionEnd };
      else
        a:
          if (h2 = (h2 = g2.ownerDocument) && h2.defaultView || window, (l2 = h2.getSelection && h2.getSelection()) && 0 !== l2.rangeCount) {
            h2 = l2.anchorNode;
            f2 = l2.anchorOffset;
            k = l2.focusNode;
            l2 = l2.focusOffset;
            try {
              h2.nodeType, k.nodeType;
            } catch (va) {
              h2 = null;
              break a;
            }
            var n2 = 0, A2 = -1, p2 = -1, C2 = 0, x2 = 0, w2 = g2, z2 = null;
            b:
              for (; ; ) {
                for (var u2; ; ) {
                  w2 !== h2 || 0 !== f2 && 3 !== w2.nodeType || (A2 = n2 + f2);
                  w2 !== k || 0 !== l2 && 3 !== w2.nodeType || (p2 = n2 + l2);
                  3 === w2.nodeType && (n2 += w2.nodeValue.length);
                  if (null === (u2 = w2.firstChild))
                    break;
                  z2 = w2;
                  w2 = u2;
                }
                for (; ; ) {
                  if (w2 === g2)
                    break b;
                  z2 === h2 && ++C2 === f2 && (A2 = n2);
                  z2 === k && ++x2 === l2 && (p2 = n2);
                  if (null !== (u2 = w2.nextSibling))
                    break;
                  w2 = z2;
                  z2 = w2.parentNode;
                }
                w2 = u2;
              }
            h2 = -1 === A2 || -1 === p2 ? null : { start: A2, end: p2 };
          } else
            h2 = null;
      h2 = h2 || { start: 0, end: 0 };
    } else
      h2 = null;
    lf = { focusedElem: g2, selectionRange: h2 };
    fd = false;
    Ij = null;
    Jj = false;
    Z = d;
    do
      try {
        ek();
      } catch (va) {
        if (null === Z)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (null !== Z);
    Ij = null;
    Z = d;
    do
      try {
        for (g2 = a; null !== Z; ) {
          var t2 = Z.flags;
          t2 & 16 && pb(Z.stateNode, "");
          if (t2 & 128) {
            var q2 = Z.alternate;
            if (null !== q2) {
              var v2 = q2.ref;
              null !== v2 && ("function" === typeof v2 ? v2(null) : v2.current = null);
            }
          }
          switch (t2 & 1038) {
            case 2:
              fj(Z);
              Z.flags &= -3;
              break;
            case 6:
              fj(Z);
              Z.flags &= -3;
              ij(Z.alternate, Z);
              break;
            case 1024:
              Z.flags &= -1025;
              break;
            case 1028:
              Z.flags &= -1025;
              ij(Z.alternate, Z);
              break;
            case 4:
              ij(Z.alternate, Z);
              break;
            case 8:
              h2 = Z;
              cj(g2, h2);
              var J2 = h2.alternate;
              dj(h2);
              null !== J2 && dj(J2);
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (null === Z)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (null !== Z);
    v2 = lf;
    q2 = Ne();
    t2 = v2.focusedElem;
    g2 = v2.selectionRange;
    if (q2 !== t2 && t2 && t2.ownerDocument && Me(t2.ownerDocument.documentElement, t2)) {
      null !== g2 && Oe(t2) && (q2 = g2.start, v2 = g2.end, void 0 === v2 && (v2 = q2), "selectionStart" in t2 ? (t2.selectionStart = q2, t2.selectionEnd = Math.min(v2, t2.value.length)) : (v2 = (q2 = t2.ownerDocument || document) && q2.defaultView || window, v2.getSelection && (v2 = v2.getSelection(), h2 = t2.textContent.length, J2 = Math.min(g2.start, h2), g2 = void 0 === g2.end ? J2 : Math.min(g2.end, h2), !v2.extend && J2 > g2 && (h2 = g2, g2 = J2, J2 = h2), h2 = Le(t2, J2), f2 = Le(t2, g2), h2 && f2 && (1 !== v2.rangeCount || v2.anchorNode !== h2.node || v2.anchorOffset !== h2.offset || v2.focusNode !== f2.node || v2.focusOffset !== f2.offset) && (q2 = q2.createRange(), q2.setStart(h2.node, h2.offset), v2.removeAllRanges(), J2 > g2 ? (v2.addRange(q2), v2.extend(f2.node, f2.offset)) : (q2.setEnd(f2.node, f2.offset), v2.addRange(q2))))));
      q2 = [];
      for (v2 = t2; v2 = v2.parentNode; )
        1 === v2.nodeType && q2.push({ element: v2, left: v2.scrollLeft, top: v2.scrollTop });
      "function" === typeof t2.focus && t2.focus();
      for (t2 = 0; t2 < q2.length; t2++)
        v2 = q2[t2], v2.element.scrollLeft = v2.left, v2.element.scrollTop = v2.top;
    }
    fd = !!kf;
    lf = kf = null;
    a.current = c;
    Z = d;
    do
      try {
        for (t2 = a; null !== Z; ) {
          var K2 = Z.flags;
          K2 & 36 && Yi(t2, Z.alternate, Z);
          if (K2 & 128) {
            q2 = void 0;
            var Q2 = Z.ref;
            if (null !== Q2) {
              var L2 = Z.stateNode;
              switch (Z.tag) {
                case 5:
                  q2 = L2;
                  break;
                default:
                  q2 = L2;
              }
              "function" === typeof Q2 ? Q2(q2) : Q2.current = q2;
            }
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (null === Z)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (null !== Z);
    Z = null;
    $f();
    X = e;
  } else
    a.current = c;
  if (xj)
    xj = false, yj = a, zj = b;
  else
    for (Z = d; null !== Z; )
      b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K2 = Z, K2.sibling = null, K2.stateNode = null), Z = b;
  d = a.pendingLanes;
  0 === d && (Ti = null);
  1 === d ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
  c = c.stateNode;
  if (Mf && "function" === typeof Mf.onCommitFiberRoot)
    try {
      Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
    } catch (va) {
    }
  Mj(a, O());
  if (Qi)
    throw Qi = false, a = Ri, Ri = null, a;
  if (0 !== (X & 8))
    return null;
  ig();
  return null;
}
function ek() {
  for (; null !== Z; ) {
    var a = Z.alternate;
    Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = true) : 13 === Z.tag && mj(a, Z) && dc(Z, Ij) && (Jj = true));
    var b = Z.flags;
    0 !== (b & 256) && Xi(a, Z);
    0 === (b & 512) || xj || (xj = true, hg(97, function() {
      Oj();
      return null;
    }));
    Z = Z.nextEffect;
  }
}
function Oj() {
  if (90 !== zj) {
    var a = 97 < zj ? 97 : zj;
    zj = 90;
    return gg(a, fk);
  }
  return false;
}
function $i(a, b) {
  Aj.push(b, a);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function Zi(a, b) {
  Bj.push(b, a);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function fk() {
  if (null === yj)
    return false;
  var a = yj;
  yj = null;
  if (0 !== (X & 48))
    throw Error(y(331));
  var b = X;
  X |= 32;
  var c = Bj;
  Bj = [];
  for (var d = 0; d < c.length; d += 2) {
    var e = c[d], f2 = c[d + 1], g2 = e.destroy;
    e.destroy = void 0;
    if ("function" === typeof g2)
      try {
        g2();
      } catch (k) {
        if (null === f2)
          throw Error(y(330));
        Wi(f2, k);
      }
  }
  c = Aj;
  Aj = [];
  for (d = 0; d < c.length; d += 2) {
    e = c[d];
    f2 = c[d + 1];
    try {
      var h2 = e.create;
      e.destroy = h2();
    } catch (k) {
      if (null === f2)
        throw Error(y(330));
      Wi(f2, k);
    }
  }
  for (h2 = a.current.firstEffect; null !== h2; )
    a = h2.nextEffect, h2.nextEffect = null, h2.flags & 8 && (h2.sibling = null, h2.stateNode = null), h2 = a;
  X = b;
  ig();
  return true;
}
function gk(a, b, c) {
  b = Mi(c, b);
  b = Pi(a, b, 1);
  Ag(a, b);
  b = Hg();
  a = Kj(a, 1);
  null !== a && ($c(a, 1, b), Mj(a, b));
}
function Wi(a, b) {
  if (3 === a.tag)
    gk(a, a, b);
  else
    for (var c = a.return; null !== c; ) {
      if (3 === c.tag) {
        gk(c, a, b);
        break;
      } else if (1 === c.tag) {
        var d = c.stateNode;
        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
          a = Mi(b, a);
          var e = Si(c, a, 1);
          Ag(c, e);
          e = Hg();
          c = Kj(c, 1);
          if (null !== c)
            $c(c, 1, e), Mj(c, e);
          else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d)))
            try {
              d.componentDidCatch(b, a);
            } catch (f2) {
            }
          break;
        }
      }
      c = c.return;
    }
}
function Yj(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = Hg();
  a.pingedLanes |= a.suspendedLanes & c;
  U === a && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
  Mj(a, b);
}
function lj(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = 0;
  0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
  c = Hg();
  a = Kj(a, b);
  null !== a && ($c(a, b, c), Mj(a, c));
}
var ck;
ck = function(a, b, c) {
  var d = b.lanes;
  if (null !== a)
    if (a.memoizedProps !== b.pendingProps || N.current)
      ug = true;
    else if (0 !== (c & d))
      ug = 0 !== (a.flags & 16384) ? true : false;
    else {
      ug = false;
      switch (b.tag) {
        case 3:
          ri(b);
          sh();
          break;
        case 5:
          gh(b);
          break;
        case 1:
          Ff(b.type) && Jf(b);
          break;
        case 4:
          eh(b, b.stateNode.containerInfo);
          break;
        case 10:
          d = b.memoizedProps.value;
          var e = b.type._context;
          I(mg, e._currentValue);
          e._currentValue = d;
          break;
        case 13:
          if (null !== b.memoizedState) {
            if (0 !== (c & b.child.childLanes))
              return ti(a, b, c);
            I(P, P.current & 1);
            b = hi$1(a, b, c);
            return null !== b ? b.sibling : null;
          }
          I(P, P.current & 1);
          break;
        case 19:
          d = 0 !== (c & b.childLanes);
          if (0 !== (a.flags & 64)) {
            if (d)
              return Ai(a, b, c);
            b.flags |= 64;
          }
          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          I(P, P.current);
          if (d)
            break;
          else
            return null;
        case 23:
        case 24:
          return b.lanes = 0, mi(a, b, c);
      }
      return hi$1(a, b, c);
    }
  else
    ug = false;
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      d = b.type;
      null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      a = b.pendingProps;
      e = Ef(b, M.current);
      tg(b, c);
      e = Ch(null, b, d, a, e, c);
      b.flags |= 1;
      if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        b.memoizedState = null;
        b.updateQueue = null;
        if (Ff(d)) {
          var f2 = true;
          Jf(b);
        } else
          f2 = false;
        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        xg(b);
        var g2 = d.getDerivedStateFromProps;
        "function" === typeof g2 && Gg(b, d, g2, a);
        e.updater = Kg;
        b.stateNode = e;
        e._reactInternals = b;
        Og(b, d, a, c);
        b = qi(null, b, d, true, f2, c);
      } else
        b.tag = 0, fi(null, b, e, c), b = b.child;
      return b;
    case 16:
      e = b.elementType;
      a: {
        null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        f2 = e._init;
        e = f2(e._payload);
        b.type = e;
        f2 = b.tag = hk(e);
        a = lg(e, a);
        switch (f2) {
          case 0:
            b = li(null, b, e, a, c);
            break a;
          case 1:
            b = pi(null, b, e, a, c);
            break a;
          case 11:
            b = gi(null, b, e, a, c);
            break a;
          case 14:
            b = ii(null, b, e, lg(e.type, a), d, c);
            break a;
        }
        throw Error(y(306, e, ""));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);
    case 3:
      ri(b);
      d = b.updateQueue;
      if (null === a || null === d)
        throw Error(y(282));
      d = b.pendingProps;
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      yg(a, b);
      Cg(b, d, null, c);
      d = b.memoizedState.element;
      if (d === e)
        sh(), b = hi$1(a, b, c);
      else {
        e = b.stateNode;
        if (f2 = e.hydrate)
          kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f2 = lh = true;
        if (f2) {
          a = e.mutableSourceEagerHydrationData;
          if (null != a)
            for (e = 0; e < a.length; e += 2)
              f2 = a[e], f2._workInProgressVersionPrimary = a[e + 1], th.push(f2);
          c = Zg(b, null, d, c);
          for (b.child = c; c; )
            c.flags = c.flags & -3 | 1024, c = c.sibling;
        } else
          fi(a, b, d, c), sh();
        b = b.child;
      }
      return b;
    case 5:
      return gh(b), null === a && ph(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e.children, nf(d, e) ? g2 = null : null !== f2 && nf(d, f2) && (b.flags |= 16), oi(a, b), fi(a, b, g2, c), b.child;
    case 6:
      return null === a && ph(b), null;
    case 13:
      return ti(a, b, c);
    case 4:
      return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);
    case 7:
      return fi(a, b, b.pendingProps, c), b.child;
    case 8:
      return fi(
        a,
        b,
        b.pendingProps.children,
        c
      ), b.child;
    case 12:
      return fi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g2 = b.memoizedProps;
        f2 = e.value;
        var h2 = b.type._context;
        I(mg, h2._currentValue);
        h2._currentValue = f2;
        if (null !== g2)
          if (h2 = g2.value, f2 = He(h2, f2) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h2, f2) : 1073741823) | 0, 0 === f2) {
            if (g2.children === e.children && !N.current) {
              b = hi$1(a, b, c);
              break a;
            }
          } else
            for (h2 = b.child, null !== h2 && (h2.return = b); null !== h2; ) {
              var k = h2.dependencies;
              if (null !== k) {
                g2 = h2.child;
                for (var l2 = k.firstContext; null !== l2; ) {
                  if (l2.context === d && 0 !== (l2.observedBits & f2)) {
                    1 === h2.tag && (l2 = zg(-1, c & -c), l2.tag = 2, Ag(h2, l2));
                    h2.lanes |= c;
                    l2 = h2.alternate;
                    null !== l2 && (l2.lanes |= c);
                    sg(h2.return, c);
                    k.lanes |= c;
                    break;
                  }
                  l2 = l2.next;
                }
              } else
                g2 = 10 === h2.tag ? h2.type === b.type ? null : h2.child : h2.child;
              if (null !== g2)
                g2.return = h2;
              else
                for (g2 = h2; null !== g2; ) {
                  if (g2 === b) {
                    g2 = null;
                    break;
                  }
                  h2 = g2.sibling;
                  if (null !== h2) {
                    h2.return = g2.return;
                    g2 = h2;
                    break;
                  }
                  g2 = g2.return;
                }
              h2 = g2;
            }
        fi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, f2 = b.pendingProps, d = f2.children, tg(b, c), e = vg(
        e,
        f2.unstable_observedBits
      ), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;
    case 14:
      return e = b.type, f2 = lg(e, b.pendingProps), f2 = lg(e.type, f2), ii(a, b, e, f2, d, c);
    case 15:
      return ki(a, b, b.type, b.pendingProps, d, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = true, Jf(b)) : a = false, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, true, a, c);
    case 19:
      return Ai(a, b, c);
    case 23:
      return mi(a, b, c);
    case 24:
      return mi(a, b, c);
  }
  throw Error(y(156, b.tag));
};
function ik(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function nh(a, b, c, d) {
  return new ik(a, b, c, d);
}
function ji(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function hk(a) {
  if ("function" === typeof a)
    return ji(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Aa)
      return 11;
    if (a === Da)
      return 14;
  }
  return 2;
}
function Tg(a, b) {
  var c = a.alternate;
  null === c ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Vg(a, b, c, d, e, f2) {
  var g2 = 2;
  d = a;
  if ("function" === typeof a)
    ji(a) && (g2 = 1);
  else if ("string" === typeof a)
    g2 = 5;
  else
    a:
      switch (a) {
        case ua:
          return Xg(c.children, e, f2, b);
        case Ha:
          g2 = 8;
          e |= 16;
          break;
        case wa:
          g2 = 8;
          e |= 1;
          break;
        case xa:
          return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f2, a;
        case Ba:
          return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f2, a;
        case Ca:
          return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f2, a;
        case Ia:
          return vi(c, e, f2, b);
        case Ja:
          return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f2, a;
        default:
          if ("object" === typeof a && null !== a)
            switch (a.$$typeof) {
              case ya:
                g2 = 10;
                break a;
              case za:
                g2 = 9;
                break a;
              case Aa:
                g2 = 11;
                break a;
              case Da:
                g2 = 14;
                break a;
              case Ea:
                g2 = 16;
                d = null;
                break a;
              case Fa:
                g2 = 22;
                break a;
            }
          throw Error(y(130, null == a ? a : typeof a, ""));
      }
  b = nh(g2, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Xg(a, b, c, d) {
  a = nh(7, a, d, b);
  a.lanes = c;
  return a;
}
function vi(a, b, c, d) {
  a = nh(23, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  return a;
}
function Ug(a, b, c) {
  a = nh(6, a, null, b);
  a.lanes = c;
  return a;
}
function Wg(a, b, c) {
  b = nh(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function jk(a, b, c) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = Zc(0);
  this.expirationTimes = Zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = Zc(0);
  this.mutableSourceEagerHydrationData = null;
}
function kk(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: ta, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function lk(a, b, c, d) {
  var e = b.current, f2 = Hg(), g2 = Ig(e);
  a:
    if (c) {
      c = c._reactInternals;
      b: {
        if (Zb(c) !== c || 1 !== c.tag)
          throw Error(y(170));
        var h2 = c;
        do {
          switch (h2.tag) {
            case 3:
              h2 = h2.stateNode.context;
              break b;
            case 1:
              if (Ff(h2.type)) {
                h2 = h2.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }
          }
          h2 = h2.return;
        } while (null !== h2);
        throw Error(y(171));
      }
      if (1 === c.tag) {
        var k = c.type;
        if (Ff(k)) {
          c = If(c, k, h2);
          break a;
        }
      }
      c = h2;
    } else
      c = Cf;
  null === b.context ? b.context = c : b.pendingContext = c;
  b = zg(f2, g2);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  Ag(e, b);
  Jg(e, g2, f2);
  return g2;
}
function mk(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function nk(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function ok(a, b) {
  nk(a, b);
  (a = a.alternate) && nk(a, b);
}
function pk() {
  return null;
}
function qk(a, b, c) {
  var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
  c = new jk(a, b, null != c && true === c.hydrate);
  b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
  c.current = b;
  b.stateNode = c;
  xg(b);
  a[ff] = c.current;
  cf(8 === a.nodeType ? a.parentNode : a);
  if (d)
    for (a = 0; a < d.length; a++) {
      b = d[a];
      var e = b._getVersion;
      e = e(b._source);
      null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
    }
  this._internalRoot = c;
}
qk.prototype.render = function(a) {
  lk(a, this._internalRoot, null, null);
};
qk.prototype.unmount = function() {
  var a = this._internalRoot, b = a.containerInfo;
  lk(null, a, null, function() {
    b[ff] = null;
  });
};
function rk(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function sk(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b)
    for (var c; c = a.lastChild; )
      a.removeChild(c);
  return new qk(a, 0, b ? { hydrate: true } : void 0);
}
function tk(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g2 = f2._internalRoot;
    if ("function" === typeof e) {
      var h2 = e;
      e = function() {
        var a2 = mk(g2);
        h2.call(a2);
      };
    }
    lk(b, g2, a, e);
  } else {
    f2 = c._reactRootContainer = sk(c, d);
    g2 = f2._internalRoot;
    if ("function" === typeof e) {
      var k = e;
      e = function() {
        var a2 = mk(g2);
        k.call(a2);
      };
    }
    Xj(function() {
      lk(b, g2, a, e);
    });
  }
  return mk(g2);
}
ec = function(a) {
  if (13 === a.tag) {
    var b = Hg();
    Jg(a, 4, b);
    ok(a, 4);
  }
};
fc = function(a) {
  if (13 === a.tag) {
    var b = Hg();
    Jg(a, 67108864, b);
    ok(a, 67108864);
  }
};
gc = function(a) {
  if (13 === a.tag) {
    var b = Hg(), c = Ig(a);
    Jg(a, c, b);
    ok(a, c);
  }
};
hc = function(a, b) {
  return b();
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      ab(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e)
              throw Error(y(90));
            Wa(d);
            ab(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Wj;
Hb = function(a, b, c, d, e) {
  var f2 = X;
  X |= 4;
  try {
    return gg(98, a.bind(null, b, c, d, e));
  } finally {
    X = f2, 0 === X && (wj(), ig());
  }
};
Ib = function() {
  0 === (X & 49) && (Vj(), Oj());
};
Jb = function(a, b) {
  var c = X;
  X |= 2;
  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
};
function uk(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!rk(b))
    throw Error(y(200));
  return kk(a, b, null, c);
}
var vk = { Events: [Cb, ue, Db, Eb, Fb, Oj, { current: false }] }, wk = { findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom" };
var xk = { bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = cc(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yk.isDisabled && yk.supportsFiber)
    try {
      Lf = yk.inject(xk), Mf = yk;
    } catch (a) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
reactDom_production_min.createPortal = uk;
reactDom_production_min.findDOMNode = function(a) {
  if (null == a)
    return null;
  if (1 === a.nodeType)
    return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render)
      throw Error(y(188));
    throw Error(y(268, Object.keys(a)));
  }
  a = cc(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a, b) {
  var c = X;
  if (0 !== (c & 48))
    return a(b);
  X |= 1;
  try {
    if (a)
      return gg(99, a.bind(null, b));
  } finally {
    X = c, ig();
  }
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!rk(b))
    throw Error(y(200));
  return tk(null, a, b, true, c);
};
reactDom_production_min.render = function(a, b, c) {
  if (!rk(b))
    throw Error(y(200));
  return tk(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!rk(a))
    throw Error(y(40));
  return a._reactRootContainer ? (Xj(function() {
    tk(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[ff] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Wj;
reactDom_production_min.unstable_createPortal = function(a, b) {
  return uk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!rk(c))
    throw Error(y(200));
  if (null == a || void 0 === a._reactInternals)
    throw Error(y(38));
  return tk(a, b, c, false, d);
};
reactDom_production_min.version = "17.0.2";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var ReactDOM = reactDom.exports;
var app$1 = "";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react.exports, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if ("function" === typeof Symbol && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, k) {
  var b, d = {}, e = null, l2 = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l2 = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: g, type: c, key: e, ref: l2, props: d, _owner: m.current };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const Fragment = jsxRuntime.exports.Fragment;
const Provider = (props) => {
  const {
    children,
    store,
    context: Context
  } = props;
  const [appState, setAppState] = react.exports.useState(store.getState());
  react.exports.useEffect(() => {
    const unsubscribe = store.subscribe((ns) => {
      setAppState(ns);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ jsx(Context.Provider, {
    value: appState,
    children
  });
};
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducersObj = {};
  for (const key of reducerKeys) {
    if (typeof reducers[key] === "function") {
      finalReducersObj[key] = reducers[key];
    }
  }
  return (state = {}, action) => {
    let hasChanged = false;
    const nextState = {};
    for (const key of reducerKeys) {
      const prevStateForKey = state[key];
      const nextStateForKey = finalReducersObj[key](prevStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
function createStore(preloadedState, reducer2) {
  const listeners = [];
  let currentState = preloadedState;
  const dispatch = (action) => {
    const nextState = reducer2(currentState, action);
    const prevState = currentState;
    currentState = nextState;
    for (const cb2 of listeners) {
      cb2(currentState, prevState);
    }
  };
  const subscribe = (listener) => {
    let isSubscribed = true;
    listeners.push(listener);
    return () => {
      if (!isSubscribed) {
        return;
      }
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
      isSubscribed = false;
    };
  };
  const getState = () => {
    return currentState;
  };
  return {
    dispatch,
    getState,
    subscribe
  };
}
function reducer$8(state, action) {
  switch (action.type) {
    case "SET_MARK_MEMO_ID": {
      if (action.payload.markMemoId === state.markMemoId) {
        return state;
      }
      return {
        ...state,
        markMemoId: action.payload.markMemoId
      };
    }
    case "SET_EDIT_MEMO_ID": {
      if (action.payload.editMemoId === state.editMemoId) {
        return state;
      }
      return {
        ...state,
        editMemoId: action.payload.editMemoId
      };
    }
    case "SET_COMMENT_MEMO_ID": {
      if (action.payload.commentMemoId === state.commentMemoId) {
        return state;
      }
      return {
        ...state,
        commentMemoId: action.payload.commentMemoId
      };
    }
    case "SET_MOBILE_VIEW": {
      if (action.payload.isMobileView === state.isMobileView) {
        return state;
      }
      return {
        ...state,
        isMobileView: action.payload.isMobileView
      };
    }
    case "SET_CHANGED_BY_MEMOS": {
      if (action.payload.changedByMemos === state.changedByMemos) {
        return state;
      }
      return {
        ...state,
        changedByMemos: action.payload.changedByMemos
      };
    }
    case "SET_SHOW_SIDEBAR_IN_MOBILE_VIEW": {
      if (action.payload.showSiderbarInMobileView === state.showSiderbarInMobileView) {
        return state;
      }
      return {
        ...state,
        showSiderbarInMobileView: action.payload.showSiderbarInMobileView
      };
    }
    case "SET_APP_SETTING": {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$6 = {
  markMemoId: "",
  editMemoId: "",
  commentMemoId: "",
  shouldSplitMemoWord: true,
  shouldHideImageUrl: true,
  shouldUseMarkdownParser: true,
  useTinyUndoHistoryCache: false,
  isMobileView: false,
  showSiderbarInMobileView: false,
  changedByMemos: false
};
function reducer$7(state, action) {
  switch (action.type) {
    case "SET_LOCATION": {
      return action.payload;
    }
    case "SET_PATHNAME": {
      if (action.payload.pathname === state.pathname) {
        return state;
      }
      return {
        ...state,
        pathname: action.payload.pathname
      };
    }
    case "SET_HASH": {
      if (action.payload.hash === state.hash) {
        return state;
      }
      return {
        ...state,
        hash: action.payload.hash
      };
    }
    case "SET_QUERY": {
      return {
        ...state,
        query: {
          ...action.payload
        }
      };
    }
    case "SET_TAG_QUERY": {
      if (action.payload.tag === state.query.tag) {
        return state;
      }
      return {
        ...state,
        query: {
          ...state.query,
          tag: action.payload.tag
        }
      };
    }
    case "SET_DURATION_QUERY": {
      if (action.payload.duration === state.query.duration) {
        return state;
      }
      return {
        ...state,
        query: {
          ...state.query,
          duration: {
            ...state.query.duration,
            ...action.payload.duration
          }
        }
      };
    }
    case "SET_TYPE": {
      if (action.payload.type === state.query.type) {
        return state;
      }
      return {
        ...state,
        query: {
          ...state.query,
          type: action.payload.type
        }
      };
    }
    case "SET_TEXT": {
      if (action.payload.text === state.query.text) {
        return state;
      }
      return {
        ...state,
        query: {
          ...state.query,
          text: action.payload.text
        }
      };
    }
    case "SET_QUERY_FILTER": {
      if (action.payload === state.query.filter) {
        return state;
      }
      return {
        ...state,
        query: {
          ...state.query,
          filter: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$5 = {
  pathname: "/",
  hash: "",
  query: {
    tag: "",
    duration: null,
    type: "",
    text: "",
    filter: ""
  }
};
var main$1 = {};
Object.defineProperty(main$1, "__esModule", { value: true });
var obsidian = require$$0__default["default"];
const DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
const DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
const DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";
const DEFAULT_QUARTERLY_NOTE_FORMAT = "YYYY-[Q]Q";
const DEFAULT_YEARLY_NOTE_FORMAT = "YYYY";
function shouldUsePeriodicNotesSettings(periodicity) {
  var _a, _b;
  const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a[periodicity]) == null ? void 0 : _b.enabled);
}
function getDailyNoteSettings() {
  var _a, _b, _c, _d;
  try {
    const { internalPlugins, plugins } = window.app;
    if (shouldUsePeriodicNotesSettings("daily")) {
      const { format: format2, folder: folder2, template: template2 } = ((_b = (_a = plugins.getPlugin("periodic-notes")) == null ? void 0 : _a.settings) == null ? void 0 : _b.daily) || {};
      return {
        format: format2 || DEFAULT_DAILY_NOTE_FORMAT,
        folder: (folder2 == null ? void 0 : folder2.trim()) || "",
        template: (template2 == null ? void 0 : template2.trim()) || ""
      };
    }
    const { folder, format, template } = ((_d = (_c = internalPlugins.getPluginById("daily-notes")) == null ? void 0 : _c.instance) == null ? void 0 : _d.options) || {};
    return {
      format: format || DEFAULT_DAILY_NOTE_FORMAT,
      folder: (folder == null ? void 0 : folder.trim()) || "",
      template: (template == null ? void 0 : template.trim()) || ""
    };
  } catch (err) {
    console.info("No custom daily note settings found!", err);
  }
}
function getWeeklyNoteSettings() {
  var _a, _b, _c, _d, _e, _f, _g;
  try {
    const pluginManager = window.app.plugins;
    const calendarSettings = (_a = pluginManager.getPlugin("calendar")) == null ? void 0 : _a.options;
    const periodicNotesSettings = (_c = (_b = pluginManager.getPlugin("periodic-notes")) == null ? void 0 : _b.settings) == null ? void 0 : _c.weekly;
    if (shouldUsePeriodicNotesSettings("weekly")) {
      return {
        format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
        folder: ((_d = periodicNotesSettings.folder) == null ? void 0 : _d.trim()) || "",
        template: ((_e = periodicNotesSettings.template) == null ? void 0 : _e.trim()) || ""
      };
    }
    const settings = calendarSettings || {};
    return {
      format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
      folder: ((_f = settings.weeklyNoteFolder) == null ? void 0 : _f.trim()) || "",
      template: ((_g = settings.weeklyNoteTemplate) == null ? void 0 : _g.trim()) || ""
    };
  } catch (err) {
    console.info("No custom weekly note settings found!", err);
  }
}
function getMonthlyNoteSettings() {
  var _a, _b, _c, _d;
  const pluginManager = window.app.plugins;
  try {
    const settings = shouldUsePeriodicNotesSettings("monthly") && ((_b = (_a = pluginManager.getPlugin("periodic-notes")) == null ? void 0 : _a.settings) == null ? void 0 : _b.monthly) || {};
    return {
      format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
      folder: ((_c = settings.folder) == null ? void 0 : _c.trim()) || "",
      template: ((_d = settings.template) == null ? void 0 : _d.trim()) || ""
    };
  } catch (err) {
    console.info("No custom monthly note settings found!", err);
  }
}
function getQuarterlyNoteSettings() {
  var _a, _b, _c, _d;
  const pluginManager = window.app.plugins;
  try {
    const settings = shouldUsePeriodicNotesSettings("quarterly") && ((_b = (_a = pluginManager.getPlugin("periodic-notes")) == null ? void 0 : _a.settings) == null ? void 0 : _b.quarterly) || {};
    return {
      format: settings.format || DEFAULT_QUARTERLY_NOTE_FORMAT,
      folder: ((_c = settings.folder) == null ? void 0 : _c.trim()) || "",
      template: ((_d = settings.template) == null ? void 0 : _d.trim()) || ""
    };
  } catch (err) {
    console.info("No custom quarterly note settings found!", err);
  }
}
function getYearlyNoteSettings() {
  var _a, _b, _c, _d;
  const pluginManager = window.app.plugins;
  try {
    const settings = shouldUsePeriodicNotesSettings("yearly") && ((_b = (_a = pluginManager.getPlugin("periodic-notes")) == null ? void 0 : _a.settings) == null ? void 0 : _b.yearly) || {};
    return {
      format: settings.format || DEFAULT_YEARLY_NOTE_FORMAT,
      folder: ((_c = settings.folder) == null ? void 0 : _c.trim()) || "",
      template: ((_d = settings.template) == null ? void 0 : _d.trim()) || ""
    };
  } catch (err) {
    console.info("No custom yearly note settings found!", err);
  }
}
function join(...partSegments) {
  let parts = [];
  for (let i = 0, l2 = partSegments.length; i < l2; i++) {
    parts = parts.concat(partSegments[i].split("/"));
  }
  const newParts = [];
  for (let i = 0, l2 = parts.length; i < l2; i++) {
    const part = parts[i];
    if (!part || part === ".")
      continue;
    else
      newParts.push(part);
  }
  if (parts[0] === "")
    newParts.unshift("");
  return newParts.join("/");
}
function basename(fullPath) {
  let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
  if (base.lastIndexOf(".") != -1)
    base = base.substring(0, base.lastIndexOf("."));
  return base;
}
async function ensureFolderExists(path) {
  const dirs = path.replace(/\\/g, "/").split("/");
  dirs.pop();
  if (dirs.length) {
    const dir = join(...dirs);
    if (!window.app.vault.getAbstractFileByPath(dir)) {
      await window.app.vault.createFolder(dir);
    }
  }
}
async function getNotePath(directory, filename) {
  if (!filename.endsWith(".md")) {
    filename += ".md";
  }
  const path = obsidian.normalizePath(join(directory, filename));
  await ensureFolderExists(path);
  return path;
}
async function getTemplateInfo(template) {
  const { metadataCache, vault } = window.app;
  const templatePath = obsidian.normalizePath(template);
  if (templatePath === "/") {
    return Promise.resolve(["", null]);
  }
  try {
    const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
    const contents = await vault.cachedRead(templateFile);
    const IFoldInfo = window.app.foldManager.load(templateFile);
    return [contents, IFoldInfo];
  } catch (err) {
    console.error(`Failed to read the daily note template '${templatePath}'`, err);
    new obsidian.Notice("Failed to read the daily note template");
    return ["", null];
  }
}
function getDateUID(date, granularity = "day") {
  const ts = date.clone().startOf(granularity).format();
  return `${granularity}-${ts}`;
}
function removeEscapedCharacters(format) {
  return format.replace(/\[[^\]]*\]/g, "");
}
function isFormatAmbiguous(format, granularity) {
  if (granularity === "week") {
    const cleanFormat = removeEscapedCharacters(format);
    return /w{1,2}/i.test(cleanFormat) && (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat));
  }
  return false;
}
function getDateFromFile(file, granularity) {
  return getDateFromFilename(file.basename, granularity);
}
function getDateFromPath(path, granularity) {
  return getDateFromFilename(basename(path), granularity);
}
function getDateFromFilename(filename, granularity) {
  const getSettings = {
    day: getDailyNoteSettings,
    week: getWeeklyNoteSettings,
    month: getMonthlyNoteSettings,
    quarter: getQuarterlyNoteSettings,
    year: getYearlyNoteSettings
  };
  const format = getSettings[granularity]().format.split("/").pop();
  const noteDate = window.moment(filename, format, true);
  if (!noteDate.isValid()) {
    return null;
  }
  if (isFormatAmbiguous(format, granularity)) {
    if (granularity === "week") {
      const cleanFormat = removeEscapedCharacters(format);
      if (/w{1,2}/i.test(cleanFormat)) {
        return window.moment(
          filename,
          format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""),
          false
        );
      }
    }
  }
  return noteDate;
}
class DailyNotesFolderMissingError$1 extends Error {
}
async function createDailyNote(date) {
  const app2 = window.app;
  const { vault } = app2;
  const moment = window.moment;
  const { template, format, folder } = getDailyNoteSettings();
  const [templateContents, IFoldInfo] = await getTemplateInfo(template);
  const filename = date.format(format);
  const normalizedPath = await getNotePath(folder, filename);
  try {
    const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
      const now = moment();
      const currentDate = date.clone().set({
        hour: now.get("hour"),
        minute: now.get("minute"),
        second: now.get("second")
      });
      if (calc) {
        currentDate.add(parseInt(timeDelta, 10), unit);
      }
      if (momentFormat) {
        return currentDate.format(momentFormat.substring(1).trim());
      }
      return currentDate.format(format);
    }).replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format)).replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format)));
    app2.foldManager.save(createdFile, IFoldInfo);
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${normalizedPath}'`, err);
    new obsidian.Notice("Unable to create new file.");
  }
}
function getDailyNote(date, dailyNotes) {
  var _a;
  return (_a = dailyNotes[getDateUID(date, "day")]) != null ? _a : null;
}
function getAllDailyNotes() {
  const { vault } = window.app;
  const { folder } = getDailyNoteSettings();
  const dailyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
  if (!dailyNotesFolder) {
    throw new DailyNotesFolderMissingError$1("Failed to find daily notes folder");
  }
  const dailyNotes = {};
  obsidian.Vault.recurseChildren(dailyNotesFolder, (note) => {
    if (note instanceof obsidian.TFile) {
      const date = getDateFromFile(note, "day");
      if (date) {
        const dateString = getDateUID(date, "day");
        dailyNotes[dateString] = note;
      }
    }
  });
  return dailyNotes;
}
class WeeklyNotesFolderMissingError extends Error {
}
function getDaysOfWeek() {
  const { moment } = window;
  let weekStart = moment.localeData()._week.dow;
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  while (weekStart) {
    daysOfWeek.push(daysOfWeek.shift());
    weekStart--;
  }
  return daysOfWeek;
}
function getDayOfWeekNumericalValue(dayOfWeekName) {
  return getDaysOfWeek().indexOf(dayOfWeekName.toLowerCase());
}
async function createWeeklyNote(date) {
  const { vault } = window.app;
  const { template, format, folder } = getWeeklyNoteSettings();
  const [templateContents, IFoldInfo] = await getTemplateInfo(template);
  const filename = date.format(format);
  const normalizedPath = await getNotePath(folder, filename);
  try {
    const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
      const now = window.moment();
      const currentDate = date.clone().set({
        hour: now.get("hour"),
        minute: now.get("minute"),
        second: now.get("second")
      });
      if (calc) {
        currentDate.add(parseInt(timeDelta, 10), unit);
      }
      if (momentFormat) {
        return currentDate.format(momentFormat.substring(1).trim());
      }
      return currentDate.format(format);
    }).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
      const day = getDayOfWeekNumericalValue(dayOfWeek);
      return date.weekday(day).format(momentFormat.trim());
    }));
    window.app.foldManager.save(createdFile, IFoldInfo);
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${normalizedPath}'`, err);
    new obsidian.Notice("Unable to create new file.");
  }
}
function getWeeklyNote(date, weeklyNotes) {
  var _a;
  return (_a = weeklyNotes[getDateUID(date, "week")]) != null ? _a : null;
}
function getAllWeeklyNotes() {
  const weeklyNotes = {};
  if (!appHasWeeklyNotesPluginLoaded()) {
    return weeklyNotes;
  }
  const { vault } = window.app;
  const { folder } = getWeeklyNoteSettings();
  const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
  if (!weeklyNotesFolder) {
    throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
  }
  obsidian.Vault.recurseChildren(weeklyNotesFolder, (note) => {
    if (note instanceof obsidian.TFile) {
      const date = getDateFromFile(note, "week");
      if (date) {
        const dateString = getDateUID(date, "week");
        weeklyNotes[dateString] = note;
      }
    }
  });
  return weeklyNotes;
}
class MonthlyNotesFolderMissingError extends Error {
}
async function createMonthlyNote(date) {
  const { vault } = window.app;
  const { template, format, folder } = getMonthlyNoteSettings();
  const [templateContents, IFoldInfo] = await getTemplateInfo(template);
  const filename = date.format(format);
  const normalizedPath = await getNotePath(folder, filename);
  try {
    const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
      const now = window.moment();
      const currentDate = date.clone().set({
        hour: now.get("hour"),
        minute: now.get("minute"),
        second: now.get("second")
      });
      if (calc) {
        currentDate.add(parseInt(timeDelta, 10), unit);
      }
      if (momentFormat) {
        return currentDate.format(momentFormat.substring(1).trim());
      }
      return currentDate.format(format);
    }).replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename));
    window.app.foldManager.save(createdFile, IFoldInfo);
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${normalizedPath}'`, err);
    new obsidian.Notice("Unable to create new file.");
  }
}
function getMonthlyNote(date, monthlyNotes) {
  var _a;
  return (_a = monthlyNotes[getDateUID(date, "month")]) != null ? _a : null;
}
function getAllMonthlyNotes() {
  const monthlyNotes = {};
  if (!appHasMonthlyNotesPluginLoaded()) {
    return monthlyNotes;
  }
  const { vault } = window.app;
  const { folder } = getMonthlyNoteSettings();
  const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
  if (!monthlyNotesFolder) {
    throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
  }
  obsidian.Vault.recurseChildren(monthlyNotesFolder, (note) => {
    if (note instanceof obsidian.TFile) {
      const date = getDateFromFile(note, "month");
      if (date) {
        const dateString = getDateUID(date, "month");
        monthlyNotes[dateString] = note;
      }
    }
  });
  return monthlyNotes;
}
class QuarterlyNotesFolderMissingError extends Error {
}
async function createQuarterlyNote(date) {
  const { vault } = window.app;
  const { template, format, folder } = getQuarterlyNoteSettings();
  const [templateContents, IFoldInfo] = await getTemplateInfo(template);
  const filename = date.format(format);
  const normalizedPath = await getNotePath(folder, filename);
  try {
    const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
      const now = window.moment();
      const currentDate = date.clone().set({
        hour: now.get("hour"),
        minute: now.get("minute"),
        second: now.get("second")
      });
      if (calc) {
        currentDate.add(parseInt(timeDelta, 10), unit);
      }
      if (momentFormat) {
        return currentDate.format(momentFormat.substring(1).trim());
      }
      return currentDate.format(format);
    }).replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename));
    window.app.foldManager.save(createdFile, IFoldInfo);
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${normalizedPath}'`, err);
    new obsidian.Notice("Unable to create new file.");
  }
}
function getQuarterlyNote(date, quarterly) {
  var _a;
  return (_a = quarterly[getDateUID(date, "quarter")]) != null ? _a : null;
}
function getAllQuarterlyNotes() {
  const quarterly = {};
  if (!appHasQuarterlyNotesPluginLoaded()) {
    return quarterly;
  }
  const { vault } = window.app;
  const { folder } = getQuarterlyNoteSettings();
  const quarterlyFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
  if (!quarterlyFolder) {
    throw new QuarterlyNotesFolderMissingError("Failed to find quarterly notes folder");
  }
  obsidian.Vault.recurseChildren(quarterlyFolder, (note) => {
    if (note instanceof obsidian.TFile) {
      const date = getDateFromFile(note, "quarter");
      if (date) {
        const dateString = getDateUID(date, "quarter");
        quarterly[dateString] = note;
      }
    }
  });
  return quarterly;
}
class YearlyNotesFolderMissingError extends Error {
}
async function createYearlyNote(date) {
  const { vault } = window.app;
  const { template, format, folder } = getYearlyNoteSettings();
  const [templateContents, IFoldInfo] = await getTemplateInfo(template);
  const filename = date.format(format);
  const normalizedPath = await getNotePath(folder, filename);
  try {
    const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
      const now = window.moment();
      const currentDate = date.clone().set({
        hour: now.get("hour"),
        minute: now.get("minute"),
        second: now.get("second")
      });
      if (calc) {
        currentDate.add(parseInt(timeDelta, 10), unit);
      }
      if (momentFormat) {
        return currentDate.format(momentFormat.substring(1).trim());
      }
      return currentDate.format(format);
    }).replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename));
    window.app.foldManager.save(createdFile, IFoldInfo);
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${normalizedPath}'`, err);
    new obsidian.Notice("Unable to create new file.");
  }
}
function getYearlyNote(date, yearlyNotes) {
  var _a;
  return (_a = yearlyNotes[getDateUID(date, "year")]) != null ? _a : null;
}
function getAllYearlyNotes() {
  const yearlyNotes = {};
  if (!appHasYearlyNotesPluginLoaded()) {
    return yearlyNotes;
  }
  const { vault } = window.app;
  const { folder } = getYearlyNoteSettings();
  const yearlyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
  if (!yearlyNotesFolder) {
    throw new YearlyNotesFolderMissingError("Failed to find yearly notes folder");
  }
  obsidian.Vault.recurseChildren(yearlyNotesFolder, (note) => {
    if (note instanceof obsidian.TFile) {
      const date = getDateFromFile(note, "year");
      if (date) {
        const dateString = getDateUID(date, "year");
        yearlyNotes[dateString] = note;
      }
    }
  });
  return yearlyNotes;
}
function appHasDailyNotesPluginLoaded() {
  var _a, _b;
  const { app: app2 } = window;
  const dailyNotesPlugin = app2.internalPlugins.plugins["daily-notes"];
  if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
    return true;
  }
  const periodicNotes = app2.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a.daily) == null ? void 0 : _b.enabled);
}
function appHasWeeklyNotesPluginLoaded() {
  var _a, _b;
  const { app: app2 } = window;
  if (app2.plugins.getPlugin("calendar")) {
    return true;
  }
  const periodicNotes = app2.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a.weekly) == null ? void 0 : _b.enabled);
}
function appHasMonthlyNotesPluginLoaded() {
  var _a, _b;
  const { app: app2 } = window;
  const periodicNotes = app2.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a.monthly) == null ? void 0 : _b.enabled);
}
function appHasQuarterlyNotesPluginLoaded() {
  var _a, _b;
  const { app: app2 } = window;
  const periodicNotes = app2.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a.quarterly) == null ? void 0 : _b.enabled);
}
function appHasYearlyNotesPluginLoaded() {
  var _a, _b;
  const { app: app2 } = window;
  const periodicNotes = app2.plugins.getPlugin("periodic-notes");
  return periodicNotes && ((_b = (_a = periodicNotes.settings) == null ? void 0 : _a.yearly) == null ? void 0 : _b.enabled);
}
function getPeriodicNoteSettings(granularity) {
  const getSettings = {
    day: getDailyNoteSettings,
    week: getWeeklyNoteSettings,
    month: getMonthlyNoteSettings,
    quarter: getQuarterlyNoteSettings,
    year: getYearlyNoteSettings
  }[granularity];
  return getSettings();
}
function createPeriodicNote(granularity, date) {
  const createFn = {
    day: createDailyNote,
    month: createMonthlyNote,
    week: createWeeklyNote
  };
  return createFn[granularity](date);
}
main$1.DEFAULT_DAILY_NOTE_FORMAT = DEFAULT_DAILY_NOTE_FORMAT;
main$1.DEFAULT_MONTHLY_NOTE_FORMAT = DEFAULT_MONTHLY_NOTE_FORMAT;
main$1.DEFAULT_QUARTERLY_NOTE_FORMAT = DEFAULT_QUARTERLY_NOTE_FORMAT;
main$1.DEFAULT_WEEKLY_NOTE_FORMAT = DEFAULT_WEEKLY_NOTE_FORMAT;
main$1.DEFAULT_YEARLY_NOTE_FORMAT = DEFAULT_YEARLY_NOTE_FORMAT;
var appHasDailyNotesPluginLoaded_1 = main$1.appHasDailyNotesPluginLoaded = appHasDailyNotesPluginLoaded;
main$1.appHasMonthlyNotesPluginLoaded = appHasMonthlyNotesPluginLoaded;
main$1.appHasQuarterlyNotesPluginLoaded = appHasQuarterlyNotesPluginLoaded;
main$1.appHasWeeklyNotesPluginLoaded = appHasWeeklyNotesPluginLoaded;
main$1.appHasYearlyNotesPluginLoaded = appHasYearlyNotesPluginLoaded;
var createDailyNote_1 = main$1.createDailyNote = createDailyNote;
main$1.createMonthlyNote = createMonthlyNote;
main$1.createPeriodicNote = createPeriodicNote;
main$1.createQuarterlyNote = createQuarterlyNote;
main$1.createWeeklyNote = createWeeklyNote;
main$1.createYearlyNote = createYearlyNote;
var getAllDailyNotes_1 = main$1.getAllDailyNotes = getAllDailyNotes;
main$1.getAllMonthlyNotes = getAllMonthlyNotes;
main$1.getAllQuarterlyNotes = getAllQuarterlyNotes;
main$1.getAllWeeklyNotes = getAllWeeklyNotes;
main$1.getAllYearlyNotes = getAllYearlyNotes;
var getDailyNote_1 = main$1.getDailyNote = getDailyNote;
var getDailyNoteSettings_1 = main$1.getDailyNoteSettings = getDailyNoteSettings;
var getDateFromFile_1 = main$1.getDateFromFile = getDateFromFile;
main$1.getDateFromPath = getDateFromPath;
main$1.getDateUID = getDateUID;
main$1.getMonthlyNote = getMonthlyNote;
main$1.getMonthlyNoteSettings = getMonthlyNoteSettings;
main$1.getPeriodicNoteSettings = getPeriodicNoteSettings;
main$1.getQuarterlyNote = getQuarterlyNote;
main$1.getQuarterlyNoteSettings = getQuarterlyNoteSettings;
main$1.getTemplateInfo = getTemplateInfo;
main$1.getWeeklyNote = getWeeklyNote;
main$1.getWeeklyNoteSettings = getWeeklyNoteSettings;
main$1.getYearlyNote = getYearlyNote;
main$1.getYearlyNoteSettings = getYearlyNoteSettings;
var ar = {};
var cz = {};
var da = {};
var de = {};
var en = {
  welcome: "Welcome to the Memos",
  ribbonIconTitle: "Rememo",
  to: "to",
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthsShort: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
  weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  year: null,
  month: null,
  "Basic Options": "Basic Options",
  "User name in Memos": "User name in Memos",
  "Set your user name here. 'Memos \u{1F60F}' By default": "Set your user name here. 'Memos \u{1F60F}' By default",
  "Insert after heading": "Insert after heading",
  "You should set the same heading below if you want to insert and process memos below the same heading.": "You should set the same heading below if you want to insert and process memos below the same heading.",
  "Allows admonitions to be created using ": "Allows admonitions to be created using ",
  "Process Memos below": "Process Memos below",
  "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.": "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.",
  "Save Memo button label": "Save Memo button label",
  "The text shown on the save Memo button in the UI. 'NOTEIT' by default.": "The text shown on the save Memo button in the UI. 'NOTEIT' by default.",
  "Focus on editor when open memos": "Focus on editor when open memos",
  "Focus on editor when open memos. Focus by default.": "Focus on editor when open memos. Focus by default.",
  "Open daily memos with open memos": "Open daily memos with open memos",
  "Open daily memos with open memos. Open by default.": "Open daily memos with open memos. Open by default.",
  "Open Memos when obsidian opens": "Open Memos when obsidian opens",
  "When enable this, Memos will open when Obsidian opens. False by default.": "When enable this, Memos will open when Obsidian opens. False by default.",
  "Hide done tasks in Memo list": "Hide done tasks in Memo list",
  "Hide all done tasks in Memo list. Show done tasks by default.": "Hide all done tasks in Memo list. Show done tasks by default.",
  "Advanced Options": "Advanced Options",
  "UI language for date": "UI language for date",
  "Translates the date UI language. Only 'en' and 'zh' are available.": "Translates the date UI language. Only 'en' and 'zh' are available.",
  "Default prefix": "Default prefix",
  "Time display format": "Time display format",
  "Time display format description": "Time in the UI: HH:mm:ss (with seconds, default) or HH:mm (without seconds). This option only affects display - data in your note files is never modified.",
  "Set the default prefix when create memo, 'List' by default.": "Set the default prefix when create memo, 'List' by default.",
  "Default insert date format": "Default insert date format",
  "Set the default date format when insert date by @, 'Tasks' by default.": "Set the default date format when insert date by @, 'Tasks' by default.",
  "Default editor position on mobile": "Default editor position on mobile",
  "Set the default editor position on Mobile, 'Top' by default.": "Set the default editor position on Mobile, 'Top' by default.",
  "Use button to show editor on mobile": "Use button to show editor on mobile",
  "Set a float button to call editor on mobile. Only when editor located at the bottom works.": "Set a float button to call editor on mobile. Only when editor located at the bottom works.",
  "Show Time When Copy Results": "Show Time When Copy Results",
  "Show time when you copy results, like 12:00. Copy time by default.": "Show time when you copy results, like 12:00. Copy time by default.",
  "Show Date When Copy Results": "Show Date When Copy Results",
  "Show date when you copy results, like [[2022-01-01]]. Copy date by default.": "Show date when you copy results, like [[2022-01-01]]. Copy date by default.",
  "Add Blank Line Between Different Date": "Add Blank Line Between Different Date",
  "Add blank line when copy result with date. No blank line by default.": "Add blank line when copy result with date. No blank line by default.",
  "Share Options": "Share Options",
  "Share Memos Image Footer Start": "Share Memos Image Footer Start",
  "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default": "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default",
  "Share Memos Image Footer End": "Share Memos Image Footer End",
  "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default": "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default",
  "Save Shared Image To Folder For Mobile": "Save Shared Image To Folder For Mobile",
  "Save image to folder for mobile. False by Default": "Save image to folder for mobile. False by Default",
  "Say Thank You": "Say Thank You",
  Donate: "Donate",
  "If you like this plugin, consider donating to support continued development:": "If you like this plugin, consider donating to support continued development:",
  "File Name of Recycle Bin": "File Name of Recycle Bin",
  "Set the filename for recycle bin. 'delete' By default": "Set the filename for recycle bin. 'delete' By default",
  "File Name of Query File": "File Name of Query File",
  "Set the filename for query file. 'query' By default": "Set the filename for query file. 'query' By default",
  "Use Tags In Vault": "Use Tags In Vault",
  "Use tags in vault rather than only in Memos. False by default.": "Use tags in vault rather than only in Memos. False by default.",
  "Ready to convert image into background": "Ready to convert image into background",
  List: "List",
  Task: "Task",
  Top: "Top",
  Bottom: "Bottom",
  TAG: "TAG",
  DAY: "DAY",
  QUERY: "QUERY",
  EDIT: "EDIT",
  PIN: "PIN",
  UNPIN: "UNPIN",
  DELETE: "DELETE",
  "CONFIRM\uFF01": "CONFIRM\uFF01",
  "CREATE FILTER": "CREATE FILTER",
  "Comment it...": "Comment it...",
  Settings: "Settings",
  "Recycle bin": "Recycle bin",
  "Audit data": "Audit data",
  "About Me": "About Me",
  "Fetching data...": "Fetching data...",
  "Here is No Zettels.": "Here is No Zettels.",
  "Frequently Used Tags": "Frequently Used Tags",
  "What do you think now...": "What do you think now...",
  READ: "READ",
  MARK: "MARK",
  SHARE: "SHARE",
  SOURCE: "SOURCE",
  RESTORE: "RESTORE",
  "DELETE AT": "DELETE AT",
  "Noooop!": "Noooop!",
  "All Data is Loaded \u{1F389}": "All Data is Loaded \u{1F389}",
  "Quick filter": "Quick filter",
  TYPE: "TYPE",
  LINKED: "LINKED",
  "NO TAGS": "NO TAGS",
  "HAS LINKS": "HAS LINKS",
  "HAS IMAGES": "HAS IMAGES",
  INCLUDE: "INCLUDE",
  EXCLUDE: "EXCLUDE",
  TEXT: "TEXT",
  IS: "IS",
  ISNOT: "ISNOT",
  SELECT: "SELECT",
  "ADD FILTER TERMS": "ADD FILTER TERMS",
  FILTER: "FILTER",
  TITLE: "TITLE",
  "CREATE QUERY": "CREATE QUERY",
  "EDIT QUERY": "EDIT QUERY",
  MATCH: "MATCH",
  TIMES: "TIMES",
  "Share Memo Image": "Share Memo Image",
  "\u2197Click the button to save": "\u2197Click the button to save",
  "Image is generating...": "Image is generating...",
  "Image is loading...": "Image is loading...",
  "Loading...": "Loading...",
  "\u{1F61F} Cannot load image, image link maybe broken": "\u{1F61F} Cannot load image, image link maybe broken",
  "Daily Memos": "Daily Memos",
  "CANCEL EDIT": "CANCEL EDIT",
  "Write to date": "Write to date",
  "Write on": "Write on",
  "Back to now": "Back to now",
  Today: "Today",
  Time: "Time",
  "LINK TO THE": "LINK TO THE",
  "Mobile Options": "Mobile Options",
  "Experimental Options": "Experimental Options",
  "Don't support web image yet, please input image path in vault": "Don't support web image yet, please input image path in vault",
  "Background Image in Dark Theme": "Background Image in Dark Theme",
  "Background Image in Light Theme": "Background Image in Light Theme",
  'Set background image in dark theme. Set something like "Daily/one.png"': 'Set background image in dark theme. Set something like "Daily/one.png"',
  'Set background image in light theme. Set something like "Daily/one.png"': 'Set background image in light theme. Set something like "Daily/one.png"',
  'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default': 'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default',
  "Default Memo Composition": "Default Memo Composition",
  "Show Tasks Label": "Show Tasks Label",
  "Show tasks label near the time text. False by default": "Show tasks label near the time text. False by default",
  "Please Open Memos First": "Please Open Memos First",
  DATE: "DATE",
  OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED: "OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED",
  BEFORE: "BEFORE",
  AFTER: "AFTER",
  "Allow Comments On Memos": "Allow Comments On Memos",
  "You can comment on memos. False by default": "You can comment on memos. False by default",
  Import: "Import",
  "TITLE CANNOT BE NULL!": "TITLE CANNOT BE NULL!",
  "FILTER CANNOT BE NULL!": "FILTER CANNOT BE NULL!",
  "Comments In Original DailyNotes/Notes": "Comments In Original DailyNotes/Notes",
  "You should install Dataview Plugin ver 0.5.9 or later to use this feature.": "You should install Dataview Plugin ver 0.5.9 or later to use this feature.",
  "Open Memos Successfully": "Open Memos Successfully",
  "Fetch Error": "\u{1F62D} Fetch Error",
  "Copied to clipboard Successfully": "Copied to clipboard Successfully",
  "Check if you opened Daily Notes Plugin Or Periodic Notes Plugin": "Check if you opened Daily Notes Plugin Or Periodic Notes Plugin",
  "Please finish the last filter setting first": "Please finish the last filter setting first",
  "Close Memos Successfully": "Close Memos Successfully",
  "Insert as Memo": "Insert as Memo",
  "Insert file as memo content": "Insert file as memo content",
  "Image load failed": "Image load failed",
  "Content cannot be empty": "Content cannot be empty",
  "Unable to create new file.": "Unable to create new file.",
  "Failed to fetch deleted memos: ": "Failed to fetch deleted memos: ",
  "RESTORE SUCCEED": "RESTORE SUCCEED",
  "Save Memo button icon": "Save Memo button icon",
  "The icon shown on the save Memo button in the UI.": "The icon shown on the save Memo button in the UI.",
  "Fetch Memos From Particular Notes": "Fetch Memos From Particular Notes",
  'You can set any Dataview Query for memos to fetch it. All memos in those notes will show on list. "#memo" by default': 'You can set any Dataview Query for memos to fetch it. All memos in those notes will show on list. "#memo" by default',
  "Allow Memos to Fetch Memo from Notes": "Allow Memos to Fetch Memo from Notes",
  "Use Memos to manage all memos in your notes, not only in daily notes. False by default": "Use Memos to manage all memos in your notes, not only in daily notes. False by default",
  "Always Show Memo Comments": "Always Show Memo Comments",
  "Always show memo comments on memos. False by default": "Always show memo comments on memos. False by default",
  "You didn't set folder for daily notes in both periodic-notes and daily-notes plugins.": "You didn't set folder for daily notes in both periodic-notes and daily-notes plugins.",
  "Please check your daily note plugin OR periodic notes plugin settings": "Please check your daily note plugin OR periodic notes plugin settings",
  "Use Which Plugin's Default Configuration": "Use Which Plugin's Default Configuration",
  "Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.": "Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.",
  Daily: "Daily",
  "Always Show Leaf Sidebar on PC": "Always Show Leaf Sidebar on PC",
  "Show left sidebar on PC even when the leaf width is less than 875px. False by default.": "Show left sidebar on PC even when the leaf width is less than 875px. False by default.",
  "You didn't set format for daily notes in both periodic-notes and daily-notes plugins.": "You didn't set format for daily notes in both periodic-notes and daily-notes plugins."
};
var enGB = {};
var es = {};
var fr = {
  welcome: "Bienvenue dans M\xE9mo !",
  ribbonIconTitle: "M\xE9mos",
  months: [
    "Janvier",
    "F\xE9vrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "D\xE9cembre"
  ],
  monthsShort: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
  weekDays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  weekDaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  to: "\xE0",
  year: null,
  month: null,
  "Basic Options": "Options basique",
  "User name in Memos": "Username dans M\xE9mos",
  "Set your user name here. 'Memos \u{1F60F}' By default": "D\xE9finissez votre username ici. D\xE9faut : 'Memo \u{1F60F}'",
  "Insert after heading": "Ins\xE9rer apr\xE8s le titre",
  "You should set the same heading below if you want to insert and process memos below the same heading.": "Vous devez d\xE9finir le m\xEAme titre en-dessous si vous voulez ins\xE9rer et traiter des m\xE9mos sous le m\xEAme titre.",
  "Allows admonitions to be created using ": "Permet de cr\xE9er des admonitions en utilisant",
  "Process Memos below": "Ins\xE9rer M\xE9mo sous",
  "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.": "Seulement les entr\xE9e sous cette section/phrase dans vos notes seront consid\xE9r\xE9s. S'il n'existe pas, aucune notes ne sera trait\xE9 pour ce fichier.",
  "Save Memo button label": "Titre du bouton de sauvegarde",
  "The text shown on the save Memo button in the UI. 'NOTEIT' by default.": "Le texte affich\xE9 sur le bouton de sauvegarde dans l'UI. D\xE9faut : 'NOTEIT'",
  "Focus on editor when open memos": "Focus sur l'\xE9diteur lors de l'ouverture du m\xE9mo.",
  "Focus on editor when open memos. Focus by default.": "Focus sur l'\xE9diteur lors de l'ouverture du m\xE9mo. Focus par d\xE9faut.",
  "Open daily memos with open memos": "Ouvrir les m\xE9mos quotidiens quand m\xE9mo est ouvert.",
  "Open daily memos with open memos. Open by default.": "Ouvrir les m\xE9mos quotidiens quand m\xE9mo est ouvert.",
  "Open Memos when obsidian opens": "Ouvrir M\xE9mo quand Obsidian est ouvert.",
  "When enable this, Memos will open when Obsidian opens. False by default.": "Quand activ\xE9, Memo sera ouvert quand Obsidian \xE0 l'ouverture d'Obsidian. D\xE9sactiv\xE9 par d\xE9faut.",
  "Hide done tasks in Memo list": "Masquer les t\xE2ches accomplies dans la liste des m\xE9mos.",
  "Hide all done tasks in Memo list. Show done tasks by default.": "Masquer les t\xE2ches accomplies dans les m\xE9mos. Affiche les t\xE2ches accomplies par d\xE9faut.",
  "Advanced Options": "Options avanc\xE9es",
  "UI language for date": "Langue de l'UI pour la date",
  "Translates the date UI language. Only 'en' and 'zh' are available.": "Traduit la langue des dates dans l'UI. Seuls 'en', 'fr' et 'zh' sont disponibles. ",
  "Default prefix": "Pr\xE9fix par d\xE9faut.",
  "Set the default prefix when create memo, 'List' by default.": "D\xE9finit le pr\xE9fix par d\xE9faut lors de la cr\xE9ation d'un m\xE9mo. D\xE9fault : 'Liste'",
  "Default insert date format": "Format de la date ins\xE9r\xE9e par d\xE9faut.",
  "Default editor position on mobile": "Position par d\xE9faut de l'\xE9diteur sur mobile.",
  "Set the default date format when insert date by @, 'Tasks' by default.": "D\xE9finit le format de la date par d\xE9faut lors de l'insertion de la date par @. D\xE9faut : 'T\xE2ches'.",
  "Set the default editor position on Mobile, 'Top' by default.": "Position par d\xE9faut de l'\xE9diteur sur le mobile. D\xE9faut : 'Haut'.",
  "Use button to show editor on mobile": "Utilisation du bouton pour afficher l'\xE9diteur sur le mobile.",
  "Show Time When Copy Results": "Aficher l'heure quand les r\xE9sultats sont copi\xE9s",
  "Set a float button to call editor on mobile. Only when editor located at the bottom works.": "Place un bouton flottant pour appeler l'\xE9diteur sur mobile. Fonctionne uniquement quand l'\xE9diteur est plac\xE9 en bas.",
  "Show time when you copy results, like 12:00. Copy time by default.": "Affiche l'heure quand les r\xE9sultats sont copi\xE9s, comme '12:00'. Copie l'heure par d\xE9faut",
  "Show Date When Copy Results": "Affiche la date quand les r\xE9sultats sont copi\xE9s",
  "Show date when you copy results, like [[2022-01-01]]. Copy date by default.": "Affiche la date quand les r\xE9sultats sont copi\xE9s, comme [[2022-01-01]]. Par d\xE9faut, copie la date.",
  "Add Blank Line Between Different Date": "Ajoute une ligne entre les diff\xE9rentes dates.",
  "Add blank line when copy result with date. No blank line by default.": "Ajoute une ligne lors de la copie du r\xE9sultat avec la date. Pas de ligne par d\xE9faut.",
  "Share Options": "Options de partage",
  "Share Memos Image Footer Start": "D\xE9but du pied de page \u2014 Partage de m\xE9mo de m\xE9mos",
  "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default": "D\xE9finissez ce que vous voulez ici, utilisez {MemosNum} pour afficher le nombre de m\xE9mos, {UsedDay} pour les jours. Par d\xE9faut : '{MemosNum} Memos {UsedDay} Days.",
  "Share Memos Image Footer End": "Fin du pied de page \u2014 Partage de m\xE9mo",
  "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default": "D\xE9finissez ce que vous voulez ici. Utilisez {UserName} comme username. Par d\xE9faut : '\u270D\uFE0F By {UserName}'",
  "Save Shared Image To Folder For Mobile": "Sauvegarde des images partag\xE9s dans un dossier sur mobile.",
  "Save image to folder for mobile. False by Default": "Sauvegarder les images dans un dossier sur mobile. D\xE9sactiv\xE9 par d\xE9faut.",
  "Say Thank You": "Dites Merci",
  Donate: "Faire un don",
  "If you like this plugin, consider donating to support continued development:": "Si vous aimez ce plugin, envisagez de faire un don pour soutenir le d\xE9veloppement continu :",
  "File Name of Recycle Bin": "Nom de la corbeille",
  "Set the filename for recycle bin. 'delete' By default": "D\xE9finition du nom de la poubelle. D\xE9faut : 'Delete'",
  "Set the filename for query file. 'query' By default": "D\xE9finit le nom de fichier pour les requ\xEAte. D\xE9faut : 'Query'",
  "Use Tags In Vault": "Utiliser des tags dans le Coffre",
  "Use tags in vault rather than only in Memos. False by default.": "Utiliser des tags du coffre plut\xF4t que ceux que seulement dans M\xE9mo. D\xE9sactiv\xE9 par d\xE9faut.",
  "Ready to convert image into background": "Pr\xEAt pour convertir des image en arri\xE8re-plan.",
  List: "Liste",
  Task: "T\xE2che",
  Top: "Haut",
  Bottom: "Bas",
  TAG: "TAG",
  DAY: "JOUR",
  QUERY: "RECHERCHE",
  EDIT: "EDITER",
  PIN: "PIN",
  UNPIN: "\xC9PINGLER",
  DELETE: "DES\xC9PINGLER",
  "CONFIRM\uFF01": "CONFIRMER \uFF01",
  "CREATE FILTER": "CR\xC9ER FILTRE",
  Settings: "Param\xE8tres",
  "Recycle bin": "Corbeille",
  "About Me": "\xC0 propos de moi",
  "Fetching data...": "R\xE9cup\xE9ration des donn\xE9es...",
  "Here is No Zettels.": "Il n'y a pas de Zettels.",
  "Frequently Used Tags": "Tags fr\xE9quemment utilis\xE9s",
  "What do you think now...": "Que pensez-vous maintenant...",
  READ: "LU",
  MARK: "MARQUER",
  SHARE: "PARTAGER",
  SOURCE: "SOURCE",
  RESTORE: "RESTAURER",
  "DELETE AT": "SUPPRIMER",
  "Noooop!": "Noooop!",
  "All Data is Loaded \u{1F389}": "Toutes les donn\xE9es sont charg\xE9es \u{1F389}",
  "Quick filter": "Filtre rapide",
  TYPE: "TYPE",
  LINKED: "LIEN",
  "NO TAGS": "PAS DE TAGS",
  "HAS LINKS": "A DES LIENS",
  "HAS IMAGES": "A DES IMAGES",
  INCLUDE: "INCLUS",
  EXCLUDE: "EXCLUS",
  TEXT: "TEXTE",
  IS: "EST",
  ISNOT: "N'EST PAS",
  SELECT: "SELECTION",
  "ADD FILTER TERMS": "AJOUTER DES TERMES FILTR\xC9",
  FILTER: "FILTRE",
  TITLE: "TITRE",
  "CREATE QUERY": "CR\xC9ER UNE RECHERCHE",
  "EDIT QUERY": "\xC9DITER UNE RECHERCHE",
  MATCH: "MATCH",
  TIMES: "HEURE",
  "Share Memo Image": "Partager un m\xE9mo image",
  "\u2197Click the button to save": "\u2197Clique pour sauvegarder",
  "Image is generating...": "G\xE9n\xE9ration de l'image...",
  "Image is loading...": "Image en chargement...",
  "Loading...": "Chargement...",
  "\u{1F61F} Cannot load image, image link maybe broken": "\u{1F61F} Impossible de charger l'image, le lien peut \xEAtre bris\xE9",
  "Daily Memos": "M\xE9mo quotidien",
  "CANCEL EDIT": "ANNULER L'\xC9DITION",
  "LINK TO THE": "LIENS \xC0",
  "Mobile Options": "Options mobile",
  "Don't support web image yet, please input image path in vault": "Ne supporte pas les images webs. Merci d'ins\xE9rer le chemin de l'image depuis le coffre.",
  "Background Image in Dark Theme": "Image de fond en th\xE8me sombre",
  "Background Image in Light Theme": "Image de fond en th\xE8me clair",
  'Set background image in dark theme. Set something like "Daily/one.png"': "D\xE9finir l'image de fond en th\xE8me sombre. D\xE9finir 'Daily/one.png' par exemple.",
  'Set background image in light theme. Set something like "Daily/one.png"': "D\xE9finir l'image de fond en th\xE8me clair. D\xE9finir 'Daily/one.png' par exemple.",
  'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default': 'D\xE9finir la composition par d\xE9faut du m\xE9mo, vous devez utiliser {TIME} comme "HH:mm" et {CONTENT} comme contenu. "{TIME} {CONTENT}" par d\xE9faut',
  "Default Memo Composition": "Composition par d\xE9faut du m\xE9mo",
  "Show Tasks Label": "Afficher les \xE9tiquettes des t\xE2ches",
  "Show tasks label near the time text. False by default": "Afficher les \xE9tiquettes des t\xE2ches \xE0 c\xF4t\xE9 du texte horaire. D\xE9sactiv\xE9 par d\xE9faut.",
  "Please Open Memos First": "Merci d'ouvrir les m\xE9mos en premier"
};
var hi = {};
var id = {};
var it = {};
var ja = {};
var ko = {};
var nl = {};
var no = {};
var pl = {};
var pt = {
  welcome: "Bem-vindo ao Memos!",
  ribbonIconTitle: "Rememo",
  months: [
    "Janeiro",
    "Fevereiro",
    "Mar\xE7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthsShort: ["Jan.", "Fev.", "Mar.", "Abr.", "Maio", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."],
  weekDays: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
  weekDaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
  to: "para",
  year: null,
  month: null,
  "Basic Options": "Op\xE7\xF5es B\xE1sicas",
  "User name in Memos": "Nome de Usu\xE1rio no Memos",
  "Set your user name here. 'Memos \u{1F60F}' By default": "Defina o nome de usu\xE1rio. Padr\xE3o: 'Memos \u{1F60F}'.",
  "Insert after heading": "Inserir ap\xF3s o cabe\xE7alho",
  "You should set the same heading below if you want to insert and process memos below the same heading.": "Deve definir o mesmo cabe\xE7alho na configura\xE7\xE3o posterior se pretende inserir e processar memorandos abaixo do cabe\xE7alho aqui definido.",
  "Allows admonitions to be created using ": "Permitir que Admonitions sejam criadas usando ",
  "Process Memos below": "Processar Memorandos abaixo do Cabe\xE7alho",
  "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.": "Somente as entradas abaixo deste cabe\xE7alho ser\xE3o processadas nas suas notas. Se n\xE3o configurar esta funcionalidade, nenhuma nota ser\xE1 processada para o ficheiro respetivo.",
  "Save Memo button label": "Legenda do Bot\xE3o de Guardar Memorandos",
  "The text shown on the save Memo button in the UI. 'NOTEIT' by default.": 'Define o texto apresentado na UI do bot\xE3o guardar memorandos. Padr\xE3o: "NOTEIT".',
  "Focus on editor when open memos": "Focar no Editor ao iniciar o Memos",
  "Focus on Editor when open memos. Focus by default.": 'Focar no editor ao iniciar o Memos. Padr\xE3o: "Focar".',
  "Open daily memos with open memos": "Abrir memorandos di\xE1rios ao iniciar o Memos",
  "Open daily memos with open memos. Open by default.": 'Abrir memorandos di\xE1rios ao iniciar o Memos. Padr\xE3o: "Abrir".',
  "Open Memos when obsidian opens": "Abrir Memos quando o Obsidian inicia",
  "When enable this, Memos will open when Obsidian opens. False by default.": 'Quando esta op\xE7\xE3o est\xE1 activa, o Memos abrir\xE1 quando o Obsidian inicia. Padr\xE3o: "Falso".',
  "Hide done tasks in Memo list": "Ocultar tarefas conclu\xEDdas na lista de memorandos",
  "Hide all done tasks in Memo list. Show done tasks by default.": 'Ocultar todas as tarefas conclu\xEDdas na lista de memorandos. Padr\xE3o: "Mostrar tarefas conclu\xEDdas".',
  "Advanced Options": "Op\xE7\xF5es Avan\xE7adas",
  "UI language for date": "Idioma na UI da Data ",
  "Translates the date UI language. Only 'en' and 'zh' are available.": "Define o idioma na UI da Data. De momento, apenas 'en', 'fr', 'pt' e 'zh' est\xE3o dispon\xEDveis.",
  "Default prefix": "Prefixo Padr\xE3o",
  "Set the default prefix when create memo, 'List' by default.": "Define o prefixo padr\xE3o quando um memorando \xE9 criado. Padr\xE3o: 'Lista'.",
  "Default insert date format": "Formato Padr\xE3o para Inser\xE7\xE3o de Data",
  "Set the default date format when insert date by @, 'Tasks' by default.": "Define o formato de Data padr\xE3o ao inserir a data usando '@'. Padr\xE3o: 'Tarefas'.",
  "Default editor position on mobile": "Posi\xE7\xE3o Padr\xE3o do Editor de Memorandos na Vers\xE3o M\xF3vel",
  "Set the default editor position on Mobile, 'Top' by default.": "Define a posi\xE7\xE3o padr\xE3o do editor de memorandos na vers\xE3o m\xF3vel. Padr\xE3o: 'Topo'.",
  "Use button to show editor on mobile": "Usar Bot\xE3o para Mostrar o Editor na Vers\xE3o M\xF3vel",
  "Set a float button to call editor on mobile. Only when editor located at the bottom works.": "Define um bot\xE3o flutuante para abrir o editor na vers\xE3o m\xF3vel. Op\xE7\xE3o dispon\xEDvel somente quando a posi\xE7\xE3o do editor est\xE1 definida para 'Fundo'.",
  "Show Time When Copy Results": "Mostrar a Hora ao Copiar os Resultados",
  "Show time when you copy results, like 12:00. Copy time by default.": "Mostrar a Hora, no formato '12:00', ao copiar os resultados. Padr\xE3o: 'Copiar a hora'.",
  "Show Date When Copy Results": "Mostrar a Data ao Copiar os Resultados",
  "Show date when you copy results, like [[2022-01-01]]. Copy date by default.": 'Mostrar a Data, no formato [[2022-01-01]], ao copiar os resultados. Padr\xE3o: "Copiar a hora".',
  "Add Blank Line Between Different Date": "Adicionar Linha em Branco entre Datas Diferentes.",
  "Add blank line when copy result with date. No blank line by default.": 'Adicionar linha em branco ao copiar resultados com Data. Padr\xE3o: "N\xE3o adicionar linha."',
  "Share Options": "Op\xE7\xF5es de Partilha",
  "Share Memos Image Footer Start": "Partilhar a Imagem de um memorando - In\xEDcio do Rodap\xE9",
  "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default": "Defina como preferir, use {MemosNum} para mostrar o n\xFAmero de memorandos e use {UsedDay} para dias. 'Padr\xE3o: {MemosNum} Memorandos {UsedDay} Dias'.",
  "Share Memos Image Footer End": "Partilhar a Imagem de um memorando - Fim do Rodap\xE9",
  "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default": "Defina como preferir, use {UserName} como o seu nome de usu\xE1rio. Padr\xE3o: '\u270D\uFE0F Por {UserName}'.",
  "Save Shared Image To Folder For Mobile": "Guardar a Imagem Partilhada para Pasta na Vers\xE3o M\xF3vel",
  "Save image to folder for mobile. False by Default": 'Guardar a imagem partilhada para pasta na vers\xE3o m\xF3vel. Padr\xE3o: "Falso".',
  "Say Thank You": "Agrade\xE7a",
  Donate: "Doar",
  "If you like this plugin, consider donating to support continued development:": "Se gosta deste plugin, considere doar para apoiar o seu desenvolvimento cont\xEDnuo:",
  "File Name of Recycle Bin": "Nome da Reciclagem",
  "Set the filename for recycle bin. 'delete' By default": "Define o nome do ficheiro para a Reciclagem. Padr\xE3o: 'delete'.",
  "File Name of Query File": "Nome do Ficheiro de Query",
  "Set the filename for query file. 'query' By default": "Define o nome do ficheiro de Query. Padr\xE3o: 'Query'.",
  "Use Tags In Vault": "Usar Tags no Vault",
  "Use tags in vault rather than only in Memos. False by default.": 'Usar as Tags do Vault e n\xE3o somente dos memorandos. Padr\xE3o: "Falso".',
  "Ready to convert image into background": "Pronto para converter imagem em fundo",
  List: "Lista",
  Task: "Tarefa",
  Top: "Topo",
  Bottom: "Fundo",
  TAG: "TAG",
  DAY: "DIA",
  QUERY: "QUERY",
  EDIT: "EDITAR",
  PIN: "FIXAR",
  UNPIN: "DESAFIXAR",
  DELETE: "ELIMINAR",
  "CONFIRM\uFF01": "CONFIRMAR\uFF01",
  "CREATE FILTER": "CRIAR FILTRO",
  Settings: "Defini\xE7\xF5es",
  "Recycle bin": "Reciclagem",
  "About Me": "Acerca de mim",
  "Fetching data...": "A obter dados...",
  "Here is No Zettels.": "N\xE3o existem Zettels.",
  "Frequently Used Tags": "Tags Usadas Frequentemente",
  "What do you think now...": "Em que est\xE1 a pensar...",
  READ: "LER",
  MARK: "ASSINALAR",
  SHARE: "PARTILHAR",
  SOURCE: "ORIGEM",
  RESTORE: "RESTAURAR",
  "DELETE AT": "ELIMINADO EM",
  "Noooop!": "Noooop!",
  "All Data is Loaded \u{1F389}": "Todos os Dados foram Carregados \u{1F389}",
  "Quick filter": "Filtro r\xE1pido",
  TYPE: "TIPO",
  LINKED: "LINKED",
  "NO TAGS": "SEM TAGS",
  "HAS LINKS": "TEM LINKS",
  "HAS IMAGES": "TEM IMAGENS",
  INCLUDE: "INCLUIR",
  EXCLUDE: "EXCLUIR",
  TEXT: "TEXTO",
  IS: "\xC9",
  ISNOT: "N\xC3O \xC9",
  SELECT: "SELECCIONAR",
  "ADD FILTER TERMS": "ADICIONAR TERMOS DE FILTRAGEM",
  FILTER: "FILTRAR",
  TITLE: "T\xCDTULO",
  "CREATE QUERY": "CRIAR QUERY",
  "EDIT QUERY": "EDITAR QUERY",
  MATCH: "IGUALA",
  TIMES: "VEZES",
  "Share Memo Image": "Partilhar Imagem de Memo",
  "\u2197Click the button to save": "\u2197Clique no bot\xE3o para guardar",
  "Image is generating...": "A gerar Imagem..",
  "Image is loading...": "A carregar Imagem...",
  "Loading...": "Carregando...",
  "\u{1F61F} Cannot load image, image link maybe broken": "\u{1F61F} N\xE3o \xE9 poss\xEDvel carregar a imagem, o link da imagem pode estar incorrecto",
  "Daily Memos": "Memos Di\xE1rios",
  "CANCEL EDIT": "CANCELAR EDI\xC7\xC3O",
  "LINK TO THE": "LINK PARA O",
  "Mobile Options": "Op\xE7\xF5es M\xF3veis",
  "Don't support web image yet, please input image path in vault": "Ainda n\xE3o existe suporte para imagens de web. Por favor, insira o link para uma imagem do vault",
  "Experimental Options": "Op\xE7\xF5es Experimentais",
  "Background Image in Dark Theme": "Imagem de Fundo no Tema Escuro",
  "Background Image in Light Theme": "Imagem de Fundo no Tema Claro",
  'Set background image in dark theme. Set something like "Daily/one.png"': 'Defina a imagem de fundo para o tema escuro. Defina da seguinte forma: "Daily/one.png".',
  'Set background image in light theme. Set something like "Daily/one.png"': 'Defina a imagem de fundo para o tema claro. Defina da seguinte forma: "Daily/one.png".',
  'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default': 'Defina a composi\xE7\xE3o padr\xE3o do memorando, deve usar {TIME} como "HH:mm" e {CONTENT} como conte\xFAdo. Padr\xE3o: "{TIME} {CONTENT}".',
  "Default Memo Composition": "Composi\xE7\xE3o Padr\xE3o de um Memorando",
  "Show Tasks Label": "Mostrar Etiquetas de Tarefas",
  "Show tasks label near the time text. False by default": 'Mostrar etiquetas de tarefas pr\xF3ximas do texto de tempo. Padr\xE3o: "Falso".',
  "Please Open Memos First": "Por favor, abra o Memos primeiro",
  DATE: "DATA",
  OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED: "OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED",
  BEFORE: "ANTES",
  AFTER: "DEPOIS",
  "Allow Comments On Memos": "Permitir Coment\xE1rios nos Memorandos",
  "You can comment on memos. False by default": 'Permite que comente os memorandos. Padr\xE3o: "Falso".',
  Import: "Importar",
  "TITLE CANNOT BE NULL!": "O T\xCDTULO N\xC3O PODE SER NULO!",
  "FILTER CANNOT BE NULL!": "O FILTRO N\xC3O PODE SER NULO!",
  "Comments In Original DailyNotes/Notes": "Coment\xE1rios nas Notas/Notas Di\xE1rias Originais",
  "You should install Dataview Plug-in ver 0.5.9 or later to use this feature.": "Deve instalar a vers\xE3o 0.5.9 ou posterior do plugin Dataview para usar esta funcionalidade.",
  "Open Memos Successfully": "Memos Iniciado com Sucesso",
  "Fetch Error": "\u{1F62D} Erro de Fetch",
  "Copied to clipboard Successfully": "Copiado para a \xE1rea de transfer\xEAncia com sucesso",
  "Check if you opened Daily Notes Plugin Or Periodic Notes Plugin": "Verifique se abriu o plugin de Notas Di\xE1rias ou de Notas Peri\xF3dicas",
  "Please finish the last filter setting first": "Por favor, termine  primeiro a configura\xE7\xE3o do \xFAltimo filtro",
  "Close Memos Successfully": "Memos Fechado com Sucesso",
  "Insert as Memo": "Inserir como um Memorando",
  "Insert file as memo content": "Inserir ficheiro como conte\xFAdo de um memorando",
  "Image load failed": "Falha no carregamento da imagem",
  "Content cannot be empty": "O Conte\xFAdo n\xE3o pode estar vazio",
  "Unable to create new file.": "N\xE3o foi poss\xEDvel criar um novo ficheiro.",
  "Failed to fetch deleted memos: ": "Falha no fetch dos memorandos removidos: ",
  "RESTORE SUCCEED": "RESTAURO BEM SUCEDIDO",
  "Save Memo button icon": "\xCDcone do Bot\xE3o para Guardar Memorandos",
  "The icon shown on the save Memo button in the UI.": "O \xEDcone exibido na UI do bot\xE3o para guardar memorandos.",
  "Fetch Memos From Particular Notes": "Obter Memorandos de Notas Espec\xEDficas",
  'You can set any Dataview Query for memos to fetch it. All memos in those notes will show on list. "#memo" by default': 'Pode definir qualquer Query de Dataview para o Memos procurar. Todos os memorandos nessas notas ser\xE3o mostrados na lista. Padr\xE3o: "#memo".',
  "Allow Memos to Fetch Memo from Notes": "Permitir que o Memos Obtenha memorandos das Notas",
  "Use Memos to manage all memos in your notes, not only in daily notes. False by default": 'Use o Memos para gerir todos os memorandos nas suas notas e n\xE3o apenas nas notas di\xE1rias. Padr\xE3o: "Falso".',
  "Always Show Memo Comments": "Mostrar Coment\xE1rios dos Memorandos",
  "Always show memo comments on memos. False by default": 'Mostrar sempre os coment\xE1rios dos memorandos. Padr\xE3o: "Falso".',
  "You didn't set folder for daily notes in both periodic-notes and daily-notes plugins.": "N\xE3o definiu a pasta para as notas di\xE1rias, quer no plugin the Notas Peri\xF3dicas ou de Notas Di\xE1rias.",
  "Please check your daily note plugin OR periodic notes plugin settings": "Por favor, verifique as configura\xE7\xF5es dos plugins de Notas Di\xE1rias OU de Notas Peri\xF3dicas",
  "Use Which Plugin's Default Configuration": "Usar a Configura\xE7\xE3o Padr\xE3o do Plugin",
  "Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.": "O Memos usa a configura\xE7\xE3o padr\xE3o do plugin seleccionado para obter memorandos diariamente. Padr\xE3o: 'Notas Di\xE1rias'.",
  Daily: "Di\xE1rio"
};
var ptBR = {
  welcome: "Bem-vindo ao Memos!",
  ribbonIconTitle: "Rememo",
  months: [
    "Janeiro",
    "Fevereiro",
    "Mar\xE7o",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  monthsShort: ["Jan.", "Fev.", "Mar.", "Abr.", "Maio", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."],
  weekDays: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
  weekDaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
  to: "para",
  year: null,
  month: null,
  "Basic Options": "Op\xE7\xF5es B\xE1sicas",
  "User name in Memos": "Nome de Usu\xE1rio no Memos",
  "Set your user name here. 'Memos \u{1F60F}' By default": "Defina o nome de usu\xE1rio. Padr\xE3o: 'Memos \u{1F60F}'.",
  "Insert after heading": "Inserir ap\xF3s o cabe\xE7alho",
  "You should set the same heading below if you want to insert and process memos below the same heading.": "Deve definir o mesmo cabe\xE7alho na configura\xE7\xE3o posterior se pretende inserir e processar memorandos abaixo do cabe\xE7alho aqui definido.",
  "Allows admonitions to be created using ": "Permitir que Admonitions sejam criadas usando ",
  "Process Memos below": "Processar Memorandos abaixo do Cabe\xE7alho",
  "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.": "Somente as entradas abaixo deste cabe\xE7alho ser\xE3o processadas nas suas notas. Se n\xE3o configurar esta funcionalidade, nenhuma nota ser\xE1 processada para o ficheiro respetivo.",
  "Save Memo button label": "Legenda do Bot\xE3o de Guardar Memorandos",
  "The text shown on the save Memo button in the UI. 'NOTEIT' by default.": 'Define o texto apresentado na UI do bot\xE3o guardar memorandos. Padr\xE3o: "NOTEIT".',
  "Focus on editor when open memos": "Focar no Editor ao iniciar o Memos",
  "Focus on Editor when open memos. Focus by default.": 'Focar no editor ao iniciar o Memos. Padr\xE3o: "Focar".',
  "Open daily memos with open memos": "Abrir memorandos di\xE1rios ao iniciar o Memos",
  "Open daily memos with open memos. Open by default.": 'Abrir memorandos di\xE1rios ao iniciar o Memos. Padr\xE3o: "Abrir".',
  "Open Memos when obsidian opens": "Abrir Memos quando o Obsidian inicia",
  "When enable this, Memos will open when Obsidian opens. False by default.": 'Quando esta op\xE7\xE3o est\xE1 activa, o Memos abrir\xE1 quando o Obsidian inicia. Padr\xE3o: "Falso".',
  "Hide done tasks in Memo list": "Ocultar tarefas conclu\xEDdas na lista de memorandos",
  "Hide all done tasks in Memo list. Show done tasks by default.": 'Ocultar todas as tarefas conclu\xEDdas na lista de memorandos. Padr\xE3o: "Mostrar tarefas conclu\xEDdas".',
  "Advanced Options": "Op\xE7\xF5es Avan\xE7adas",
  "UI language for date": "Idioma na UI da Data ",
  "Translates the date UI language. Only 'en' and 'zh' are available.": "Define o idioma na UI da Data. De momento, apenas 'en', 'fr', 'pt' e 'zh' est\xE3o dispon\xEDveis.",
  "Default prefix": "Prefixo Padr\xE3o",
  "Set the default prefix when create memo, 'List' by default.": "Define o prefixo padr\xE3o quando um memorando \xE9 criado. Padr\xE3o: 'Lista'.",
  "Default insert date format": "Formato Padr\xE3o para Inser\xE7\xE3o de Data",
  "Set the default date format when insert date by @, 'Tasks' by default.": "Define o formato de Data padr\xE3o ao inserir a data usando '@'. Padr\xE3o: 'Tarefas'.",
  "Default editor position on mobile": "Posi\xE7\xE3o Padr\xE3o do Editor de Memorandos na Vers\xE3o M\xF3vel",
  "Set the default editor position on Mobile, 'Top' by default.": "Define a posi\xE7\xE3o padr\xE3o do editor de memorandos na vers\xE3o m\xF3vel. Padr\xE3o: 'Topo'.",
  "Use button to show editor on mobile": "Usar Bot\xE3o para Mostrar o Editor na Vers\xE3o M\xF3vel",
  "Set a float button to call editor on mobile. Only when editor located at the bottom works.": "Define um bot\xE3o flutuante para abrir o editor na vers\xE3o m\xF3vel. Op\xE7\xE3o dispon\xEDvel somente quando a posi\xE7\xE3o do editor est\xE1 definida para 'Fundo'.",
  "Show Time When Copy Results": "Mostrar a Hora ao Copiar os Resultados",
  "Show time when you copy results, like 12:00. Copy time by default.": "Mostrar a Hora, no formato '12:00', ao copiar os resultados. Padr\xE3o: 'Copiar a hora'.",
  "Show Date When Copy Results": "Mostrar a Data ao Copiar os Resultados",
  "Show date when you copy results, like [[2022-01-01]]. Copy date by default.": 'Mostrar a Data, no formato [[2022-01-01]], ao copiar os resultados. Padr\xE3o: "Copiar a hora".',
  "Add Blank Line Between Different Date": "Adicionar Linha em Branco entre Datas Diferentes.",
  "Add blank line when copy result with date. No blank line by default.": 'Adicionar linha em branco ao copiar resultados com Data. Padr\xE3o: "N\xE3o adicionar linha."',
  "Share Options": "Op\xE7\xF5es de Partilha",
  "Share Memos Image Footer Start": "Partilhar a Imagem de um memorando - In\xEDcio do Rodap\xE9",
  "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default": "Defina como preferir, use {MemosNum} para mostrar o n\xFAmero de memorandos e use {UsedDay} para dias. 'Padr\xE3o: {MemosNum} Memorandos {UsedDay} Dias'.",
  "Share Memos Image Footer End": "Partilhar a Imagem de um memorando - Fim do Rodap\xE9",
  "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default": "Defina como preferir, use {UserName} como o seu nome de usu\xE1rio. Padr\xE3o: '\u270D\uFE0F Por {UserName}'.",
  "Save Shared Image To Folder For Mobile": "Guardar a Imagem Partilhada para Pasta na Vers\xE3o M\xF3vel",
  "Save image to folder for mobile. False by Default": 'Guardar a imagem partilhada para pasta na vers\xE3o m\xF3vel. Padr\xE3o: "Falso".',
  "Say Thank You": "Agrade\xE7a",
  Donate: "Doar",
  "If you like this plugin, consider donating to support continued development:": "Se gosta deste plugin, considere doar para apoiar o seu desenvolvimento cont\xEDnuo:",
  "File Name of Recycle Bin": "Nome da Reciclagem",
  "Set the filename for recycle bin. 'delete' By default": "Define o nome do ficheiro para a Reciclagem. Padr\xE3o: 'delete'.",
  "File Name of Query File": "Nome do Ficheiro de Query",
  "Set the filename for query file. 'query' By default": "Define o nome do ficheiro de Query. Padr\xE3o: 'Query'.",
  "Use Tags In Vault": "Usar Tags no Vault",
  "Use tags in vault rather than only in Memos. False by default.": 'Usar as Tags do Vault e n\xE3o somente dos memorandos. Padr\xE3o: "Falso".',
  "Ready to convert image into background": "Pronto para converter imagem em fundo",
  List: "Lista",
  Task: "Tarefa",
  Top: "Topo",
  Bottom: "Fundo",
  TAG: "TAG",
  DAY: "DIA",
  QUERY: "QUERY",
  EDIT: "EDITAR",
  PIN: "FIXAR",
  UNPIN: "DESAFIXAR",
  DELETE: "ELIMINAR",
  "CONFIRM\uFF01": "CONFIRMAR\uFF01",
  "CREATE FILTER": "CRIAR FILTRO",
  Settings: "Defini\xE7\xF5es",
  "Recycle bin": "Reciclagem",
  "About Me": "Acerca de mim",
  "Fetching data...": "A obter dados...",
  "Here is No Zettels.": "N\xE3o existem Zettels.",
  "Frequently Used Tags": "Tags Usadas Frequentemente",
  "What do you think now...": "Em que est\xE1 a pensar...",
  READ: "LER",
  MARK: "ASSINALAR",
  SHARE: "PARTILHAR",
  SOURCE: "ORIGEM",
  RESTORE: "RESTAURAR",
  "DELETE AT": "ELIMINADO EM",
  "Noooop!": "Noooop!",
  "All Data is Loaded \u{1F389}": "Todos os Dados foram Carregados \u{1F389}",
  "Quick filter": "Filtro r\xE1pido",
  TYPE: "TIPO",
  LINKED: "LINKED",
  "NO TAGS": "SEM TAGS",
  "HAS LINKS": "TEM LINKS",
  "HAS IMAGES": "TEM IMAGENS",
  INCLUDE: "INCLUIR",
  EXCLUDE: "EXCLUIR",
  TEXT: "TEXTO",
  IS: "\xC9",
  ISNOT: "N\xC3O \xC9",
  SELECT: "SELECCIONAR",
  "ADD FILTER TERMS": "ADICIONAR TERMOS DE FILTRAGEM",
  FILTER: "FILTRAR",
  TITLE: "T\xCDTULO",
  "CREATE QUERY": "CRIAR QUERY",
  "EDIT QUERY": "EDITAR QUERY",
  MATCH: "IGUALA",
  TIMES: "VEZES",
  "Share Memo Image": "Partilhar Imagem de Memo",
  "\u2197Click the button to save": "\u2197Clique no bot\xE3o para guardar",
  "Image is generating...": "A gerar Imagem..",
  "Image is loading...": "A carregar Imagem...",
  "Loading...": "Carregando...",
  "\u{1F61F} Cannot load image, image link maybe broken": "\u{1F61F} N\xE3o \xE9 poss\xEDvel carregar a imagem, o link da imagem pode estar incorrecto",
  "Daily Memos": "Memos Di\xE1rios",
  "CANCEL EDIT": "CANCELAR EDI\xC7\xC3O",
  "LINK TO THE": "LINK PARA O",
  "Mobile Options": "Op\xE7\xF5es M\xF3veis",
  "Don't support web image yet, please input image path in vault": "Ainda n\xE3o existe suporte para imagens de web. Por favor, insira o link para uma imagem do vault",
  "Experimental Options": "Op\xE7\xF5es Experimentais",
  "Background Image in Dark Theme": "Imagem de Fundo no Tema Escuro",
  "Background Image in Light Theme": "Imagem de Fundo no Tema Claro",
  'Set background image in dark theme. Set something like "Daily/one.png"': 'Defina a imagem de fundo para o tema escuro. Defina da seguinte forma: "Daily/one.png".',
  'Set background image in light theme. Set something like "Daily/one.png"': 'Defina a imagem de fundo para o tema claro. Defina da seguinte forma: "Daily/one.png".',
  'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default': 'Defina a composi\xE7\xE3o padr\xE3o do memorando, deve usar {TIME} como "HH:mm" e {CONTENT} como conte\xFAdo. Padr\xE3o: "{TIME} {CONTENT}".',
  "Default Memo Composition": "Composi\xE7\xE3o Padr\xE3o de um Memorando",
  "Show Tasks Label": "Mostrar Etiquetas de Tarefas",
  "Show tasks label near the time text. False by default": 'Mostrar etiquetas de tarefas pr\xF3ximas do texto de tempo. Padr\xE3o: "Falso".',
  "Please Open Memos First": "Por favor, abra o Memos primeiro",
  DATE: "DATA",
  OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED: "OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED",
  BEFORE: "ANTES",
  AFTER: "DEPOIS",
  "Allow Comments On Memos": "Permitir Coment\xE1rios nos Memorandos",
  "You can comment on memos. False by default": 'Permite que comente os memorandos. Padr\xE3o: "Falso".',
  Import: "Importar",
  "TITLE CANNOT BE NULL!": "O T\xCDTULO N\xC3O PODE SER NULO!",
  "FILTER CANNOT BE NULL!": "O FILTRO N\xC3O PODE SER NULO!",
  "Comments In Original DailyNotes/Notes": "Coment\xE1rios nas Notas/Notas Di\xE1rias Originais",
  "You should install Dataview Plug-in ver 0.5.9 or later to use this feature.": "Deve instalar a vers\xE3o 0.5.9 ou posterior do plugin Dataview para usar esta funcionalidade.",
  "Open Memos Successfully": "Memos Iniciado com Sucesso",
  "Fetch Error": "\u{1F62D} Erro de Fetch",
  "Copied to clipboard Successfully": "Copiado para a \xE1rea de transfer\xEAncia com sucesso",
  "Check if you opened Daily Notes Plugin Or Periodic Notes Plugin": "Verifique se abriu o plugin de Notas Di\xE1rias ou de Notas Peri\xF3dicas",
  "Please finish the last filter setting first": "Por favor, termine  primeiro a configura\xE7\xE3o do \xFAltimo filtro",
  "Close Memos Successfully": "Memos Fechado com Sucesso",
  "Insert as Memo": "Inserir como um Memorando",
  "Insert file as memo content": "Inserir ficheiro como conte\xFAdo de um memorando",
  "Image load failed": "Falha no carregamento da imagem",
  "Content cannot be empty": "O Conte\xFAdo n\xE3o pode estar vazio",
  "Unable to create new file.": "N\xE3o foi poss\xEDvel criar um novo ficheiro.",
  "Failed to fetch deleted memos: ": "Falha no fetch dos memorandos removidos: ",
  "RESTORE SUCCEED": "RESTAURO BEM SUCEDIDO",
  "Save Memo button icon": "\xCDcone do Bot\xE3o para Guardar Memorandos",
  "The icon shown on the save Memo button in the UI.": "O \xEDcone exibido na UI do bot\xE3o para guardar memorandos.",
  "Fetch Memos From Particular Notes": "Obter Memorandos de Notas Espec\xEDficas",
  'You can set any Dataview Query for memos to fetch it. All memos in those notes will show on list. "#memo" by default': 'Pode definir qualquer Query de Dataview para o Memos procurar. Todos os memorandos nessas notas ser\xE3o mostrados na lista. Padr\xE3o: "#memo".',
  "Allow Memos to Fetch Memo from Notes": "Permitir que o Memos Obtenha memorandos das Notas",
  "Use Memos to manage all memos in your notes, not only in daily notes. False by default": 'Use o Memos para gerir todos os memorandos nas suas notas e n\xE3o apenas nas notas di\xE1rias. Padr\xE3o: "Falso".',
  "Always Show Memo Comments": "Mostrar Coment\xE1rios dos Memorandos",
  "Always show memo comments on memos. False by default": 'Mostrar sempre os coment\xE1rios dos memorandos. Padr\xE3o: "Falso".',
  "You didn't set folder for daily notes in both periodic-notes and daily-notes plugins.": "N\xE3o definiu a pasta para as notas di\xE1rias, quer no plugin the Notas Peri\xF3dicas ou de Notas Di\xE1rias.",
  "Please check your daily note plugin OR periodic notes plugin settings": "Por favor, verifique as configura\xE7\xF5es dos plugins de Notas Di\xE1rias OU de Notas Peri\xF3dicas",
  "Use Which Plugin's Default Configuration": "Usar a Configura\xE7\xE3o Padr\xE3o do Plugin",
  "Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.": "O Memos usa a configura\xE7\xE3o padr\xE3o do plugin seleccionado para obter memorandos diariamente. Padr\xE3o: 'Notas Di\xE1rias'.",
  Daily: "Di\xE1rio"
};
var ro = {};
var ru = {};
var tr = {};
var zhCN = {
  welcome: "\u6B22\u8FCE\u4F7F\u7528 Memos ",
  ribbonIconTitle: "Rememo",
  months: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
  monthsShort: [null, null, null, null, null, null, null, null, null, null, null, null],
  weekDays: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
  weekDaysShort: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
  to: "\u81F3",
  year: "\u5E74",
  month: "\u6708",
  "Basic Options": "\u57FA\u7840\u9009\u9879",
  "User name in Memos": "\u5728 Memos \u4E2D\u663E\u793A\u7684\u7528\u6237\u540D",
  "Set your user name here. 'Memos \u{1F60F}' By default": "\u5728\u8FD9\u91CC\u8BBE\u7F6E\u4F60\u559C\u6B22\u7684\u7528\u6237\u540D\u3002 \u9ED8\u8BA4\u4E3A 'Memos \u{1F60F}'",
  "Insert after heading": "\u5728\u6307\u5B9A\u6807\u9898\u540E\u63D2\u5165 Memo",
  "You should set the same heading below if you want to insert and process memos below the same heading.": "\u4F60\u5982\u679C\u60F3\u8981\u63D2\u5165\u6807\u9898\u7684\u540C\u65F6\u663E\u793A\u5BF9\u5E94\u6807\u9898\u4E0B\u7684 Memo\uFF0C\u4F60\u5FC5\u987B\u4FDD\u8BC1\u5F53\u524D\u8BBE\u7F6E\u4E0E\u4E0B\u65B9\u7684\u89E3\u6790\u8BBE\u7F6E\u662F\u4E00\u81F4\u7684\u3002\u5F53\u4E3A\u7A7A\u65F6\u63D2\u5165\u5230\u6587\u672B",
  "Process Memos below": "\u89E3\u6790\u6307\u5B9A\u6807\u9898\u540E\u7684 Memo",
  "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file.": "\u53EA\u6709\u5728\u8BBE\u7F6E\u7684\u6807\u9898\u540E\u7684 Memo \u624D\u4F1A\u88AB\u89E3\u6790\u3002\u5F53\u4E3A\u7A7A\u65F6\u89E3\u6790\u5168\u6587\u7684 Memo",
  "Save Memo button label": "\u4FDD\u5B58\u6309\u94AE\u4E0A\u7684\u6587\u672C",
  "The text shown on the save Memo button in the UI. 'NOTEIT' by default.": "\u5728\u4FDD\u5B58\u6309\u94AE\u4E0A\u5C55\u793A\u7684\u6587\u672C\u3002\u9ED8\u8BA4\u4E3A 'NOTEIT'",
  "Focus on editor when open memos": "\u81EA\u52A8\u805A\u7126\u5230 Memos \u8F93\u5165\u6846",
  "Focus on editor when open memos. Focus by default.": "\u5F53\u6253\u5F00 Memos \u7684\u65F6\u5019\u81EA\u52A8\u805A\u7126\u5230 Memos \u8F93\u5165\u6846\u3002\u9ED8\u8BA4\u5F00\u542F",
  "Open daily memos with open memos": "\u6253\u5F00\u6BCF\u65E5 Memo \u7684\u65F6\u5019\u6253\u5F00 Memos \u754C\u9762",
  "Open daily memos with open memos. Open by default.": "\u6253\u5F00\u6BCF\u65E5 Memo \u7684\u65F6\u5019\u6253\u5F00 Memos \u754C\u9762\u3002\u9ED8\u8BA4\u5F00\u542F",
  "Open Memos when obsidian opens": "\u5F53\u5F00\u542F Obsidian \u7684\u65F6\u5019\u81EA\u52A8\u6253\u5F00 Memos",
  "When enable this, Memos will open when Obsidian opens. False by default.": "\u5F53\u5F00\u542F\u8BE5\u9009\u9879, Memos \u4F1A\u5728 Obsidian \u6253\u5F00\u65F6\u81EA\u52A8\u6253\u5F00\u3002\u9ED8\u8BA4\u4E0D\u5F00\u542F\u3002",
  "Hide done tasks in Memo list": "\u5728 memo \u5217\u8868\u4E2D\u9690\u85CF\u5DF2\u5B8C\u6210 memo",
  "Hide all done tasks in Memo list. Show done tasks by default.": "\u5728 memo \u5217\u8868\u4E2D\u9690\u85CF\u5DF2\u5B8C\u6210 memo\u3002\u9ED8\u8BA4\u4E0D\u5F00\u542F",
  "Advanced Options": "\u8FDB\u9636\u9009\u9879",
  "UI language for date": "\u9488\u5BF9\u65E5\u671F\u5C55\u793A\u7684\u8BED\u8A00\u754C\u9762",
  "Translates the date UI language. Only 'en' and 'zh' are available.": "\u5BF9\u65E5\u671F\u7684\u4E0D\u540C\u7FFB\u8BD1\u3002\u76EE\u524D\u53EA\u80FD\u9009\u62E9 'en' \u548C 'zh'\uFF08\u672A\u6765\u4F1A\u5E9F\u7F6E\uFF09",
  "Default prefix": "\u9ED8\u8BA4\u524D\u7F00",
  "Time display format": "\u65F6\u95F4\u663E\u793A\u683C\u5F0F",
  "Time display format description": "\u754C\u9762\u65F6\u95F4\u663E\u793A HH:mm:ss\uFF08\u5E26\u79D2\uFF0C\u9ED8\u8BA4\uFF09\u6216 HH:mm\uFF08\u4E0D\u5E26\u79D2\uFF09\u3002\u8BE5\u9009\u9879\u53EA\u5F71\u54CD\u663E\u793A\uFF0C\u4E0D\u4F1A\u4FEE\u6539\u65E5\u8BB0\u6587\u4EF6\u91CC\u7684\u6570\u636E\u3002",
  "Set the default prefix when create memo, 'List' by default.": "\u8BBE\u7F6E\u9ED8\u8BA4\u7684\u524D\u7F00\u6837\u5F0F\u3002\u9ED8\u8BA4\u4E3A\u5217\u8868",
  "Default insert date format": "\u63D2\u5165\u65E5\u671F\u9644\u5E26\u7684\u6837\u5F0F",
  "Set the default date format when insert date by @, 'Tasks' by default.": "\u5F53\u4F7F\u7528 @ \u6765\u5FEB\u901F\u63D2\u5165\u65E5\u671F\u65F6\uFF0C\u63D2\u5165\u65E5\u671F\u9644\u5E26\u7684\u6837\u5F0F\uFF0C\u9ED8\u8BA4\u4E3A 'Tasks' \u6837\u5F0F",
  "Default editor position on mobile": "\u5728\u79FB\u52A8\u7AEF\u4E0A\u7684\u9ED8\u8BA4\u7F16\u8F91\u5668\u4F4D\u7F6E",
  "Set the default editor position on Mobile, 'Top' by default.": "\u8BBE\u7F6E\u5728\u79FB\u52A8\u7AEF\u4E0A\u7684\u9ED8\u8BA4\u7F16\u8F91\u5668\u4F4D\u7F6E\uFF0C\u9ED8\u8BA4\u5728\u9876\u90E8\u3002",
  "Use button to show editor on mobile": "\u5F53\u7F16\u8F91\u5668\u4F4D\u7F6E\u5728\u5E95\u90E8\u65F6\uFF0C\u7528\u6309\u94AE\u6765\u5524\u51FA\u7F16\u8F91\u5668",
  "Set a float button to call editor on mobile. Only when editor located at the bottom works.": "\u8BBE\u7F6E\u4E00\u4E2A\u6D6E\u52A8\u6309\u94AE\u6765\u5524\u51FA\u7F16\u8F91\u5668\u3002\u5F53\u5728\u79FB\u52A8\u7AEF\u4E0A\u542F\u7528\u8BE5\u9009\u9879\u624D\u4F1A\u751F\u6548",
  "Show Time When Copy Results": "\u5F53\u590D\u5236\u68C0\u7D22\u7ED3\u679C\u65F6\u9644\u5E26\u65F6\u95F4",
  "Show time when you copy results, like 12:00. Copy time by default.": "\u5728\u590D\u5236\u68C0\u7D22\u7ED3\u679C\u65F6\u9644\u5E26\u5176\u65F6\u95F4\uFF0C\u4F8B\u5982 12:00 \u3002\u9ED8\u8BA4\u5F00\u542F",
  "Show Date When Copy Results": "\u5F53\u590D\u5236\u68C0\u7D22\u7ED3\u679C\u65F6\u9644\u5E26\u65E5\u671F",
  "Show date when you copy results, like [[2022-01-01]]. Copy date by default.": "\u5728\u590D\u5236\u68C0\u7D22\u7ED3\u679C\u65F6\u9644\u5E26\u5176\u65E5\u671F\uFF0C\u4F8B\u5982 [[2022-01-01]]\u3002\u9ED8\u8BA4\u5F00\u542F",
  "Add Blank Line Between Different Date": "\u5728\u590D\u5236\u65E5\u671F\u7684\u65F6\u5019\u52A0\u4E0A\u7A7A\u884C",
  "Add blank line when copy result with date. No blank line by default.": "\u5728\u590D\u5236\u65E5\u671F\u7684\u65F6\u5019\u5728\u76F8\u90BB\u7684\u65E5\u671F\u4E4B\u95F4\u52A0\u4E0A\u7A7A\u884C\u3002\u9ED8\u8BA4\u65E0\u7A7A\u884C",
  "Share Options": "\u5206\u4EAB\u9009\u9879",
  "Share Memos Image Footer Start": "\u5206\u4EAB memo \u56FE\u7247\u7684\u5DE6\u8FB9\u9875\u811A",
  "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default": "\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u8BBE\u7F6E\u4F60\u60F3\u8981\u7684\u4EFB\u610F\u6587\u672C\uFF0C\u7528 {MemosNum} \u6765\u5C55\u793A\u4F60\u8BB0\u5F55\u7684 memo \u6570\u91CF\uFF0C{UsedDay} \u6765\u5C55\u793A\u4F7F\u7528\u65E5\u671F\u3002\u9ED8\u8BA4\u4E3A'{MemosNum} Memos {UsedDay} Days'",
  "Share Memos Image Footer End": "\u5206\u4EAB memo \u56FE\u7247\u7684\u53F3\u8FB9\u9875\u811A",
  "Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default": "\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u8BBE\u7F6E\u4F60\u60F3\u8981\u7684\u4EFB\u610F\u6587\u672C\uFF0C\u7528 {UserName} \u6765\u5C55\u793A\u4F60\u7684\u7528\u6237\u540D\u3002\u9ED8\u8BA4\u4E3A '\u270D\uFE0F By {UserName}'",
  "Save Shared Image To Folder For Mobile": "\u5F53\u5728\u79FB\u52A8\u7AEF\u4E0A\u65F6\u4FDD\u5B58\u56FE\u7247\u5230\u6587\u4EF6\u5939",
  "Save image to folder for mobile. False by Default": "\u5F53\u5728\u79FB\u52A8\u7AEF\u4E0A\u65F6\uFF0C\u4FDD\u5B58\u751F\u6210\u7684\u56FE\u7247\u5230\u6587\u4EF6\u5939",
  "Say Thank You": "\u611F\u8C22\u5F00\u53D1",
  Donate: "\u6350\u8D60",
  "If you like this plugin, consider donating to support continued development:": "\u5982\u679C\u4F60\u559C\u6B22\u8FD9\u4E2A\u63D2\u4EF6\uFF0C\u800C\u4E14\u4E5F\u5E0C\u671B\u7ED9\u6211\u4E70\u9E21\u817F\uFF0C\u90A3\u4E48\u53EF\u4EE5\u8003\u8651 Github \u9875\u9762\u53F3\u8FB9\u7684 Sponsor~",
  "File Name of Recycle Bin": "\u56DE\u6536\u7AD9\u7684\u6587\u4EF6\u540D",
  "Set the filename for recycle bin. 'delete' By default": "\u7ED9\u56DE\u6536\u7AD9\u8BBE\u7F6E\u4E00\u4E2A\u6587\u4EF6\u540D\u3002\u9ED8\u8BA4\u4E3A'delete'",
  "File Name of Query File": "\u68C0\u7D22\u6587\u4EF6\u7684\u6587\u4EF6\u540D",
  "Set the filename for query file. 'query' By default": "\u8BBE\u7F6E\u5B58\u653E\u68C0\u7D22\u5F0F\u7684\u6587\u4EF6\u7684\u6587\u4EF6\u540D\u3002\u9ED8\u8BA4\u4E3A'query'",
  "Use Tags In Vault": "\u4F7F\u7528\u5728\u5E93\u5185\u7684\u6240\u6709\u6807\u7B7E",
  "Use tags in vault rather than only in Memos. False by default.": "\u4F7F\u7528\u5728\u5E93\u5185\u7684\u800C\u4E0D\u662F Memos \u5185\u7684\u6807\u7B7E\u3002\u9ED8\u8BA4\u5173\u95ED",
  "Don't support web image yet, please input image path in vault": "\u6682\u4E0D\u652F\u6301\u7F51\u7EDC\u56FE\u7247\uFF0C\u8BF7\u4F7F\u7528\u672C\u5730\u56FE\u7247",
  "Ready to convert image into background": "\u6B63\u5728\u5C06\u56FE\u7247\u8F6C\u6362\u4E3A\u80CC\u666F\u56FE",
  List: "\u5217\u8868",
  Task: "\u4EFB\u52A1",
  Top: "\u9876\u90E8",
  Bottom: "\u5E95\u90E8",
  TAG: "\u6807\u7B7E",
  DAY: "\u5929",
  QUERY: "\u68C0\u7D22\u5F0F",
  EDIT: "\u7F16\u8F91",
  PIN: "\u7F6E\u9876",
  UNPIN: "\u53D6\u6D88\u7F6E\u9876",
  DELETE: "\u5220\u9664",
  "CONFIRM\uFF01": "\u786E\u5B9A\u5220\u9664",
  "CREATE FILTER": "\u521B\u5EFA\u68C0\u7D22\u5F0F",
  Settings: "\u8BBE\u7F6E",
  "Recycle bin": "\u56DE\u6536\u7AD9",
  "Audit data": "\u6570\u636E\u4F53\u68C0",
  "About Me": "\u5173\u4E8E",
  "Fetching data...": "\u83B7\u53D6\u6570\u636E\u4E2D...",
  "Here is No Zettels.": "\u6CA1\u6709\u627E\u5230 memo",
  "Frequently Used Tags": "\u5E38\u7528\u6807\u7B7E",
  "What do you think now...": "\u4F60\u73B0\u5728\u5728\u60F3\u4EC0\u4E48\uFF1F",
  READ: "\u9605\u8BFB",
  MARK: "\u5F15\u7528",
  SHARE: "\u5206\u4EAB",
  SOURCE: "\u6765\u6E90",
  RESTORE: "\u6062\u590D",
  "DELETE AT": "\u5220\u9664\u4E8E",
  "Noooop!": "\u5565\u90FD\u6CA1\u6709\uFF01",
  "All Data is Loaded \u{1F389}": "\u6240\u6709\u6570\u636E\u90FD\u52A0\u8F7D\u597D\u5566 \u{1F389}",
  "Quick filter": "\u5FEB\u901F\u7B5B\u9009",
  TYPE: "\u7C7B\u578B",
  LINKED: "\u6709\u94FE\u63A5",
  "NO TAGS": "\u65E0\u6807\u7B7E",
  "HAS LINKS": "\u6709\u8D85\u94FE\u63A5",
  "HAS IMAGES": "\u6709\u56FE\u7247",
  INCLUDE: "\u5305\u62EC",
  EXCLUDE: "\u6392\u9664",
  TEXT: "\u6587\u672C",
  IS: "\u662F",
  ISNOT: "\u4E0D\u662F",
  SELECT: "\u9009\u62E9",
  "ADD FILTER TERMS": "\u6DFB\u52A0\u68C0\u7D22\u6761\u4EF6",
  FILTER: "\u68C0\u7D22\u5668",
  TITLE: "\u6807\u9898",
  "CREATE QUERY": "\u521B\u5EFA\u68C0\u7D22\u5F0F",
  "EDIT QUERY": "\u7F16\u8F91\u68C0\u7D22\u5F0F",
  MATCH: "\u5339\u914D",
  TIMES: "\u6B21",
  "Share Memo Image": "\u5206\u4EAB Memo \u56FE\u7247",
  "\u2197Click the button to save": "\u2197\u70B9\u51FB\u53F3\u4E0A\u89D2\u7684\u6309\u94AE\u6765\u4FDD\u5B58",
  "Image is generating...": "\u56FE\u7247\u6B63\u5728\u751F\u6210\u4E2D...",
  "Image is loading...": "\u56FE\u7247\u6B63\u5728\u52A0\u8F7D\u4E2D...",
  "\u{1F61F} Cannot load image, image link maybe broken": "\u{1F61F} \u65E0\u6CD5\u52A0\u8F7D\u56FE\u7247\uFF0C\u56FE\u7247\u94FE\u63A5\u4E5F\u8BB8\u4E0D\u5B58\u5728",
  "Loading...": "\u52AA\u529B\u52A0\u8F7D\u4E2D...",
  "Daily Memos": "\u6BCF\u65E5 Memos",
  "CANCEL EDIT": "\u53D6\u6D88\u7F16\u8F91",
  "Write to date": "\u8BBE\u7F6E\u5199\u5165\u65E5\u671F",
  "Write on": "\u5199\u5165",
  "Back to now": "\u6062\u590D\u73B0\u5728",
  Today: "\u4ECA\u5929",
  Time: "\u65F6\u95F4",
  "LINK TO THE": "\u94FE\u63A5\u5230",
  "Mobile Options": "\u79FB\u52A8\u7AEF\u9009\u9879",
  "Experimental Options": "\u5B9E\u9A8C\u6027\u9009\u9879",
  "Background Image in Dark Theme": "\u6DF1\u8272\u4E3B\u9898\u7684\u80CC\u666F\u56FE",
  "Background Image in Light Theme": "\u6D45\u8272\u4E3B\u9898\u7684\u80CC\u666F\u56FE",
  'Set background image in dark theme. Set something like "Daily/one.png"': '\u8BBE\u7F6E\u6DF1\u8272\u4E3B\u9898\u7684\u80CC\u666F\u56FE\u3002\u8BF7\u8BBE\u7F6E\u7C7B\u4F3C"Daily/one.png"\u7684\u8DEF\u5F84',
  'Set background image in light theme. Set something like "Daily/one.png"': '\u8BBE\u7F6E\u6D45\u8272\u4E3B\u9898\u7684\u80CC\u666F\u56FE\u3002\u8BF7\u8BBE\u7F6E\u7C7B\u4F3C"Daily/one.png"\u7684\u8DEF\u5F84',
  'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default': '\u8BBE\u7F6E\u9ED8\u8BA4 Memo \u7EC4\u6210\uFF0C\u4F60\u5FC5\u987B\u8981\u4F7F\u7528 {TIME} \u4F5C\u4E3A "HH:mm" \u800C\u4E14\u8981\u8BBE\u7F6E {CONTENT} \u4F5C\u4E3A\u5185\u5BB9\u8BC6\u522B\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C Memo \u57FA\u4E8E "{TIME} {CONTENT}" \u8BC6\u522B',
  "Default Memo Composition": "\u9ED8\u8BA4 Memo \u7EC4\u6210",
  "Show Tasks Label": "\u5C55\u793A\u4EFB\u52A1\u6807\u7B7E",
  "Show tasks label near the time text. False by default": "\u5728 Memo \u7684\u65F6\u95F4\u65C1\u5C55\u793A\u4EFB\u52A1\u6807\u7B7E\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4E0D\u5C55\u793A",
  "Please Open Memos First": "\u8BF7\u5148\u6253\u5F00 Memos",
  "Comment it...": "\u8BC4\u8BBA...",
  DATE: "\u65E5\u671F",
  OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED: "Obsidian Natrual DATES language \u63D2\u4EF6\u6CA1\u542F\u52A8",
  BEFORE: "\u5728\u4E4B\u524D",
  AFTER: "\u5728\u4E4B\u540E",
  "Allow Comments On Memos": "\u5141\u8BB8\u5728 Memos \u4E0A\u8BC4\u8BBA",
  "You can comment on memos. False by default": "\u4F60\u53EF\u4EE5\u5728 Memos \u70B9\u51FB\u56FE\u6807\u8FDB\u884C\u8BC4\u8BBA\u4E86\u3002\u9ED8\u8BA4\u4E0D\u5F00\u542F",
  Import: "\u5BFC\u5165",
  "TITLE CANNOT BE NULL!": "\u6807\u9898\u4E0D\u53EF\u4EE5\u4E3A\u7A7A\uFF01",
  "FILTER CANNOT BE NULL!": "\u7B5B\u9009\u5668\u4E0D\u53EF\u4EE5\u4E3A\u7A7A\uFF01",
  "Comments In Original DailyNotes/Notes": "\u5728\u539F\u6587\u4EF6\u4E2D\u8FDB\u884C\u8BC4\u8BBA",
  "You should install Dataview Plugin ver 0.5.9 or later to use this feature.": "\u4F60\u9700\u8981\u5B89\u88C5 0.5.9 \u7248\u672C\u4EE5\u4E0A\u7684 Dataview \u63D2\u4EF6\u6765\u4F7F\u7528\u8BE5\u529F\u80FD",
  "Open Memos Successfully": "\u6210\u529F\u6253\u5F00 Memos ",
  "Fetch Error": "\u{1F62D} Memos \u83B7\u53D6\u5931\u8D25",
  "Copied to clipboard Successfully": "\u590D\u5236\u6210\u529F",
  "Check if you opened Daily Notes Plugin Or Periodic Notes Plugin": "\u8BF7\u68C0\u67E5\u4F60\u6709\u6CA1\u6709\u5F00\u542F\u65E5\u8BB0\u63D2\u4EF6\u6216\u8005 Periodic Notes \u63D2\u4EF6\u4E14\u542F\u7528\u4E86\u65E5\u8BB0\u6A21\u5F0F",
  "Please finish the last filter setting first": "\u5148\u5B8C\u5584\u4E0A\u4E00\u4E2A\u8FC7\u6EE4\u5668\u5427",
  "Close Memos Successfully": "\u6210\u529F\u5173\u95ED Memos ",
  "Insert as Memo": "\u63D2\u5165\u5185\u5BB9\u4E3A Memo",
  "Insert file as memo content": "\u63D2\u5165\u6587\u4EF6\u4E3A Memo",
  "Image load failed": "\u6709\u4E2A\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\u4E86\u{1F61F}",
  "Content cannot be empty": "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\u5440",
  "Unable to create new file.": "\u65E0\u6CD5\u65B0\u5EFA\u6587\u4EF6",
  "Failed to fetch deleted memos: ": "\u65E0\u6CD5\u83B7\u53D6\u5DF2\u5220\u9664\u7684 Memos \uFF1A",
  "RESTORE SUCCEED": "\u6210\u529F\u6062\u590D Memo",
  "Save Memo button icon": "\u4FDD\u5B58\u6309\u94AE\u4E0A\u7684\u56FE\u6807",
  "The icon shown on the save Memo button in the UI.": "\u4F60\u53EF\u4EE5\u8BBE\u7F6E\u4FDD\u5B58\u6309\u94AE\u4E0A\u7684\u56FE\u6807",
  "Fetch Memos From Particular Notes": "\u4ECE\u6307\u5B9A\u7684\u6587\u4EF6\u4E2D\u83B7\u53D6 Memos",
  'You can set any Dataview Query for memos to fetch it. All memos in those notes will show on list. "#memo" by default': '\u4F60\u53EF\u4EE5\u7ED9\u7B14\u8BB0\u8BBE\u7F6E\u6307\u5B9A\u68C0\u7D22\u5F0F\u6765\u8BA9 Memos \u53EF\u4EE5\u7D22\u5F15\u5230\u5B83\u3002\u9ED8\u8BA4\u4E3A "#memo" ',
  "Allow Memos to Fetch Memo from Notes": "\u5141\u8BB8 Memos \u4ECE\u7B14\u8BB0\u4E2D\u83B7\u53D6 Memo",
  "Use Memos to manage all memos in your notes, not only in daily notes. False by default": "\u4F7F\u7528 Memos \u6765\u7BA1\u7406\u4F60\u7B14\u8BB0\u4E2D\u7684 Memos\uFF0C\u4E0D\u5355\u53EA DailyNotes \u4E2D\u7684\u5185\u5BB9\u3002\u9ED8\u8BA4\u4E3A\u5173\u95ED",
  "Always Show Memo Comments": "\u8BC4\u8BBA\u5C06\u603B\u662F\u53EF\u89C1",
  "Always show memo comments on memos. False by default": "\u5F53\u5F00\u542F\u540E\u8BC4\u8BBA\u603B\u662F\u4F1A\u5728 Memo \u7684\u4E0B\u65B9\u5C55\u793A\u3002\u9ED8\u8BA4\u4E3A\u5173\u95ED",
  "You didn't set folder for daily notes in both periodic-notes and daily-notes plugins.": "\u4F60\u5728 Periodic Notes \u63D2\u4EF6\u548C\u65E5\u8BB0\u63D2\u4EF6\u90FD\u6CA1\u8BBE\u7F6E\u65E5\u8BB0\u7684\u6240\u5728\u6587\u4EF6\u5939",
  "Please check your daily note plugin OR periodic notes plugin settings": "\u8BF7\u68C0\u67E5\u4F60\u7684\u65E5\u8BB0\u63D2\u4EF6\u548C/\u6216 Periodic Notes \u63D2\u4EF6\u7684\u8BBE\u7F6E",
  "Use Which Plugin's Default Configuration": "\u4F7F\u7528\u54EA\u4E2A\u63D2\u4EF6\u7684\u9ED8\u8BA4\u65E5\u8BB0\u914D\u7F6E",
  "Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.": "Memos \u91C7\u7528\u6307\u5B9A\u63D2\u4EF6\u7684\u9ED8\u8BA4\u914D\u7F6E\u6765\u83B7\u53D6 Memos\u3002\u9ED8\u8BA4\u4E3A\u65E5\u8BB0\u63D2\u4EF6\u3002",
  Daily: "\u65E5\u8BB0\u63D2\u4EF6",
  "Always Show Leaf Sidebar on PC": "\u5728 PC \u4E0A\u603B\u662F\u5C55\u793A\u5DE6\u4FA7\u680F",
  "Show left sidebar on PC even when the leaf width is less than 875px. False by default.": "\u5728 PC \u4E0A\u5373\u4F7F\u9875\u9762\u5BBD\u5EA6\u5C0F\u4E8E 875px \u65F6\u90FD\u5C55\u793A\u5DE6\u4FA7\u680F\u3002\u9ED8\u8BA4\u4E3A\u5173\u95ED",
  "You didn't set format for daily notes in both periodic-notes and daily-notes plugins.": "\u4F60\u5728 Periodic Notes \u63D2\u4EF6\u548C\u65E5\u8BB0\u63D2\u4EF6\u90FD\u6CA1\u8BBE\u7F6E\u65E5\u8BB0\u7684\u683C\u5F0F"
};
var zhTW = {};
const localeMap = {
  ar,
  cs: cz,
  da,
  de,
  en,
  "en-gb": enGB,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  nl,
  nn: no,
  pl,
  pt,
  "pt-br": ptBR,
  ro,
  ru,
  tr,
  "zh-cn": zhCN,
  "zh-tw": zhTW
};
const locale = localeMap[require$$0.moment.locale()];
function t$1(str) {
  return locale && locale[str] || en[str];
}
var utils;
((utils2) => {
  function getNowTimeStamp() {
    return parseInt(require$$0.moment().format("x"));
  }
  utils2.getNowTimeStamp = getNowTimeStamp;
  function getOSVersion() {
    const appVersion = navigator.userAgent;
    let detectedOS = "Unknown";
    if (appVersion.indexOf("Win") != -1) {
      detectedOS = "Windows";
    } else if (appVersion.indexOf("Mac") != -1) {
      detectedOS = "MacOS";
    } else if (appVersion.indexOf("Linux") != -1) {
      detectedOS = "Linux";
    }
    return detectedOS;
  }
  utils2.getOSVersion = getOSVersion;
  function getTimeStampByDate(t2) {
    if (typeof t2 === "string") {
      t2 = t2.replaceAll("-", "/");
    }
    return new Date(t2).getTime();
  }
  utils2.getTimeStampByDate = getTimeStampByDate;
  function getDateStampByDate(t2) {
    const d = new Date(getTimeStampByDate(t2));
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }
  utils2.getDateStampByDate = getDateStampByDate;
  function getDateString(t2) {
    const d = new Date(getTimeStampByDate(t2));
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    return `${year}/${month}/${date}`;
  }
  utils2.getDateString = getDateString;
  function getTimeString(t2, showSeconds = true) {
    const d = new Date(getTimeStampByDate(t2));
    const hours = d.getHours();
    const mins = d.getMinutes();
    const secs = d.getSeconds();
    const hoursStr = hours < 10 ? "0" + hours : hours;
    const minsStr = mins < 10 ? "0" + mins : mins;
    const secsStr = secs < 10 ? "0" + secs : secs;
    return `${hoursStr}:${minsStr}${showSeconds ? ":" + secsStr : ""}`;
  }
  utils2.getTimeString = getTimeString;
  function getDateTimeString(t2, showSeconds = true) {
    const d = new Date(getTimeStampByDate(t2));
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const hours = d.getHours();
    const mins = d.getMinutes();
    const secs = d.getSeconds();
    const monthStr = month < 10 ? "0" + month : month;
    const dateStr = date < 10 ? "0" + date : date;
    const hoursStr = hours < 10 ? "0" + hours : hours;
    const minsStr = mins < 10 ? "0" + mins : mins;
    const secsStr = secs < 10 ? "0" + secs : secs;
    return `${year}/${monthStr}/${dateStr} ${hoursStr}:${minsStr}${showSeconds ? ":" + secsStr : ""}`;
  }
  utils2.getDateTimeString = getDateTimeString;
  function dedupe(data) {
    return Array.from(new Set(data));
  }
  utils2.dedupe = dedupe;
  function dedupeObjectWithId(data, getKey) {
    const idSet = /* @__PURE__ */ new Set();
    const result = [];
    const keyOf = getKey || ((d) => d.id);
    for (const d of data) {
      const key = keyOf(d);
      if (!idSet.has(key)) {
        idSet.add(key);
        result.push(d);
      }
    }
    return result;
  }
  utils2.dedupeObjectWithId = dedupeObjectWithId;
  function debounce2(fn2, delay) {
    let timer = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(fn2, delay);
      } else {
        timer = setTimeout(fn2, delay);
      }
    };
  }
  utils2.debounce = debounce2;
  function debouncePlus(fn2, delay, immdiate = false, resultCallback) {
    let timer = null;
    let isInvoke = false;
    function _debounce(...arg) {
      if (timer)
        clearTimeout(timer);
      if (immdiate && !isInvoke) {
        const result = fn2.apply(this, arg);
        if (resultCallback && typeof resultCallback === "function")
          resultCallback(result);
        isInvoke = true;
      } else {
        timer = window.setTimeout(() => {
          const result = fn2.apply(this, arg);
          if (resultCallback && typeof resultCallback === "function")
            resultCallback(result);
          isInvoke = false;
          timer = null;
        }, delay);
      }
    }
    _debounce.cancel = function() {
      if (timer)
        clearTimeout(timer);
      timer = null;
      isInvoke = false;
    };
    return _debounce;
  }
  utils2.debouncePlus = debouncePlus;
  function throttle(fn2, delay) {
    let valid = true;
    return () => {
      if (!valid) {
        return false;
      }
      valid = false;
      setTimeout(() => {
        fn2();
        valid = true;
      }, delay);
    };
  }
  utils2.throttle = throttle;
  function transformObjectToParamsString(object) {
    const params = [];
    const keys = Object.keys(object).sort();
    for (const key of keys) {
      const val = object[key];
      if (val) {
        if (typeof val === "object") {
          params.push(...transformObjectToParamsString(val).split("&"));
        } else {
          params.push(`${key}=${val}`);
        }
      }
    }
    return params.join("&");
  }
  utils2.transformObjectToParamsString = transformObjectToParamsString;
  function transformParamsStringToObject(paramsString) {
    const object = {};
    const params = paramsString.split("&");
    for (const p2 of params) {
      const [key, val] = p2.split("=");
      if (key && val) {
        object[key] = val;
      }
    }
    return object;
  }
  utils2.transformParamsStringToObject = transformParamsStringToObject;
  function filterObjectNullKeys(object) {
    if (!object) {
      return {};
    }
    const finalObject = {};
    const keys = Object.keys(object).sort();
    for (const key of keys) {
      const val = object[key];
      if (typeof val === "object") {
        const temp = filterObjectNullKeys(JSON.parse(JSON.stringify(val)));
        if (temp && Object.keys(temp).length > 0) {
          finalObject[key] = temp;
        }
      } else {
        if (val) {
          finalObject[key] = val;
        }
      }
    }
    return finalObject;
  }
  utils2.filterObjectNullKeys = filterObjectNullKeys;
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        console.warn("Copy to clipboard failed.", error);
      }
    } else {
      console.warn("Copy to clipboard failed, methods not supports.");
    }
  }
  utils2.copyTextToClipboard = copyTextToClipboard;
  function getImageSize(src) {
    return new Promise((resolve) => {
      const imgEl = new Image();
      imgEl.onload = () => {
        const { width, height } = imgEl;
        if (width > 0 && height > 0) {
          resolve({ width, height });
        } else {
          resolve({ width: 0, height: 0 });
        }
      };
      imgEl.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      imgEl.className = "hidden";
      imgEl.src = src;
      document.body.appendChild(imgEl);
      imgEl.remove();
    });
  }
  utils2.getImageSize = getImageSize;
  async function createDailyNoteCheck(date) {
    var _a;
    let file;
    switch (UseDailyOrPeriodic) {
      case "Daily":
      default:
        file = await createDailyNote_1(date);
        break;
      case "Periodic":
        file = await ((_a = window.app.plugins.getPlugin("periodic-notes")) == null ? void 0 : _a.createDailyNote("day", date));
        break;
    }
    return file;
  }
  utils2.createDailyNoteCheck = createDailyNoteCheck;
})(utils || (utils = {}));
function getDailyNoteFormat() {
  var _a, _b, _c, _d, _e, _f;
  let dailyNoteFormat = "";
  let dailyNoteTempForPeriodicNotes = "";
  const folderFromPeriodicNotesNew = (_c = (_b = (_a = window.app.plugins.getPlugin("periodic-notes")) == null ? void 0 : _a.calendarSetManager) == null ? void 0 : _b.getActiveConfig("day")) == null ? void 0 : _c.folder;
  const folderFromPeriodicNotes = (_f = (_e = (_d = window.app.plugins.getPlugin("periodic-notes")) == null ? void 0 : _d.settings) == null ? void 0 : _e.daily) == null ? void 0 : _f.format;
  if (folderFromPeriodicNotesNew === void 0) {
    dailyNoteTempForPeriodicNotes = folderFromPeriodicNotes;
  } else {
    dailyNoteTempForPeriodicNotes = folderFromPeriodicNotesNew;
  }
  switch (UseDailyOrPeriodic) {
    case "Daily":
      dailyNoteFormat = getDailyNoteSettings_1().format || "YYYY-MM-DD";
      break;
    case "Periodic":
      dailyNoteFormat = dailyNoteTempForPeriodicNotes || "YYYY-MM-DD";
      break;
    default:
      dailyNoteFormat = getDailyNoteSettings_1().format || "YYYY-MM-DD";
      break;
  }
  if (dailyNoteFormat === "" || dailyNoteFormat === void 0) {
    new require$$0.Notice(t$1("You didn't set format for daily notes in both periodic-notes and daily-notes plugins."));
  }
  return dailyNoteFormat;
}
function getDailyNotePath() {
  var _a, _b, _c, _d, _e, _f;
  let dailyNotePath = "";
  let dailyNoteTempForPeriodicNotes = "";
  const folderFromPeriodicNotesNew = (_c = (_b = (_a = window.app.plugins.getPlugin("periodic-notes")) == null ? void 0 : _a.calendarSetManager) == null ? void 0 : _b.getActiveConfig("day")) == null ? void 0 : _c.folder;
  const folderFromPeriodicNotes = (_f = (_e = (_d = window.app.plugins.getPlugin("periodic-notes")) == null ? void 0 : _d.settings) == null ? void 0 : _e.daily) == null ? void 0 : _f.folder;
  if (folderFromPeriodicNotesNew === void 0) {
    dailyNoteTempForPeriodicNotes = folderFromPeriodicNotes;
  } else {
    dailyNoteTempForPeriodicNotes = folderFromPeriodicNotesNew;
  }
  switch (UseDailyOrPeriodic) {
    case "Daily":
      dailyNotePath = getDailyNoteSettings_1().folder || "";
      break;
    case "Periodic":
      dailyNotePath = dailyNoteTempForPeriodicNotes || "";
      break;
    default:
      dailyNotePath = getDailyNoteSettings_1().folder || "";
      break;
  }
  if (dailyNotePath === "" || dailyNotePath === void 0) {
    new require$$0.Notice(t$1("You didn't set folder for daily notes in both periodic-notes and daily-notes plugins."));
  }
  return dailyNotePath;
}
var utils$1 = utils;
function reducer$6(state, action) {
  switch (action.type) {
    case "SET_MEMOS": {
      const memos = utils$1.dedupeObjectWithId(
        action.payload.memos.sort(
          (a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)
        ),
        (m2) => m2.hasId || m2.id
      );
      return {
        ...state,
        memos: [...memos]
      };
    }
    case "SET_TAGS": {
      return {
        ...state,
        tags: action.payload.tags,
        tagsNum: action.payload.tagsNum
      };
    }
    case "INSERT_MEMO": {
      const memos = utils$1.dedupeObjectWithId(
        [action.payload.memo, ...state.memos].sort(
          (a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)
        ),
        (m2) => m2.hasId || m2.id
      );
      return {
        ...state,
        memos
      };
    }
    case "DELETE_MEMO_BY_ID": {
      return {
        ...state,
        memos: [...state.memos].filter((memo2) => memo2.id !== action.payload.id)
      };
    }
    case "EDIT_MEMO": {
      const memos = state.memos.map((m2) => {
        if (m2.id === action.payload.id) {
          return {
            ...m2,
            ...action.payload
          };
        } else {
          return m2;
        }
      });
      return {
        ...state,
        memos
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$4 = {
  memos: [],
  tags: [],
  tagsNum: {}
};
function reducer$5(state, action) {
  switch (action.type) {
    case "SIGN_IN": {
      return {
        user: action.payload.user
      };
    }
    case "SIGN_OUT": {
      return {
        user: null
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$3 = { user: null };
function reducer$4(state, action) {
  switch (action.type) {
    case "SET_QUERIES": {
      const queries = utils$1.dedupeObjectWithId(
        action.payload.queries.sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)).sort((a, b) => {
          var _a, _b;
          return utils$1.getTimeStampByDate((_a = b.pinnedAt) != null ? _a : 0) - utils$1.getTimeStampByDate((_b = a.pinnedAt) != null ? _b : 0);
        })
      );
      return {
        ...state,
        queries
      };
    }
    case "INSERT_QUERY": {
      const queries = utils$1.dedupeObjectWithId(
        [action.payload.query, ...state.queries].sort(
          (a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)
        )
      );
      return {
        ...state,
        queries
      };
    }
    case "DELETE_QUERY_BY_ID": {
      return {
        ...state,
        queries: [...state.queries].filter((query) => query.id !== action.payload.id)
      };
    }
    case "UPDATE_QUERY": {
      const queries = state.queries.map((m2) => {
        if (m2.id === action.payload.id) {
          return {
            ...m2,
            ...action.payload
          };
        } else {
          return m2;
        }
      });
      return {
        ...state,
        queries
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$2 = {
  queries: []
};
function reducer$3(state, action) {
  switch (action.type) {
    case "SET_DAILYNOTES": {
      const dailyNotes = getAllDailyNotes_1();
      return {
        ...state,
        dailyNotes
      };
    }
    case "SET_APP": {
      return {
        ...state,
        app: action.payload.app
      };
    }
    default: {
      return state;
    }
  }
}
const defaultState$1 = {
  dailyNotes: null,
  app: null
};
const defaultState = {
  settings: {}
};
const reducer$2 = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return { ...state, settings: action.payload.settings };
    default:
      return state;
  }
};
const appStore = createStore(
  {
    globalState: defaultState$6,
    locationState: defaultState$5,
    memoState: defaultState$4,
    userState: defaultState$3,
    queryState: defaultState$2,
    dailyNotesState: defaultState$1,
    settingsState: defaultState
  },
  combineReducers({
    globalState: reducer$8,
    locationState: reducer$7,
    memoState: reducer$6,
    userState: reducer$5,
    queryState: reducer$4,
    dailyNotesState: reducer$3,
    settingsState: reducer$2
  })
);
const appContext = react.exports.createContext(appStore.getState());
(() => {
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
      if (Object.prototype.toString.call(str).toLowerCase() === "[object regexp]") {
        return this.replace(str, newStr);
      }
      return this.replace(new RegExp(str, "g"), newStr);
    };
  }
})();
var global$1 = "";
const SHOW_SIDERBAR_MOBILE_CLASSNAME = "mobile-show-sidebar";
const ANIMATION_DURATION = 200;
const DAILY_TIMESTAMP = 3600 * 24 * 1e3;
const TAG_REG = /\s#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
const FIRST_TAG_REG = /(<p>|<br>)#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
const NOP_FIRST_TAG_REG = /^#([\p{Letter}\p{Emoji_Presentation}\p{Number}\/_-]+)/gu;
const LINK_REG = /(\s|：|>|^)((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]))/g;
const MD_LINK_REG = /\[([\s\S]*?)\]\(([\s\S]*?)\)/gu;
const IMAGE_URL_REG = /([^\s<\\*>']+\.(jpeg|jpg|gif|png|svg|webp|bmp))(\]\])?(\))?/g;
const MARKDOWN_URL_REG = /(!\[([^\]]*)(\|)?(.*?)\]\((.*?)("(?:.*[^"])")?\s*\))/g;
const MARKDOWN_WEB_URL_REG = /(\s|：|^)(http[s]?:\/\/)([^\/\s]+\/)(\S*?\.(?:jpeg|jpg|gif|png|svg|bmp|webp)(?:[?#][^\s)]*)?)(?!\))/g;
const WIKI_IMAGE_URL_REG = /!\[\[((.*?)\.(jpeg|jpg|gif|png|svg|bmp|webp))?(\|)?(.*?)\]\]/g;
const MEMO_LINK_REG = /\[@(.+?)\]\((.+?)\)/g;
class DailyNotesService {
  getState() {
    return appStore.getState().dailyNotesState;
  }
  getApp(app2) {
    appStore.dispatch({
      type: "SET_APP",
      payload: {
        app: app2
      }
    });
    return app2;
  }
  async getMyAllDailyNotes() {
    const dailyNotes = getAllDailyNotes_1();
    appStore.dispatch({
      type: "SET_DAILYNOTES",
      payload: {
        dailyNotes
      }
    });
    return dailyNotes;
  }
  async getDailyNoteByMemo(date) {
    const { dailyNotes } = this.getState();
    const dailyNote = getDailyNote_1(date, dailyNotes);
    return dailyNote;
  }
}
const dailyNotesService = new DailyNotesService();
var storage;
((storage2) => {
  function get(keys) {
    const data = {};
    for (const key of keys) {
      try {
        const stringifyValue = localStorage.getItem(key);
        if (stringifyValue !== null) {
          const val = JSON.parse(stringifyValue);
          data[key] = val;
        }
      } catch (error) {
        console.error("Get storage failed in ", key, error);
      }
    }
    return data;
  }
  storage2.get = get;
  function set(data) {
    for (const key in data) {
      try {
        const stringifyValue = JSON.stringify(data[key]);
        localStorage.setItem(key, stringifyValue);
      } catch (error) {
        console.error("Save storage failed in ", key, error);
      }
    }
  }
  storage2.set = set;
  function remove(keys) {
    for (const key of keys) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error("Remove storage failed in ", key, error);
      }
    }
  }
  storage2.remove = remove;
  function emitStorageChangedEvent() {
    var _a;
    const iframeEl = document.createElement("iframe");
    iframeEl.style.display = "none";
    document.body.appendChild(iframeEl);
    (_a = iframeEl.contentWindow) == null ? void 0 : _a.localStorage.setItem("t", Date.now().toString());
    iframeEl.remove();
  }
  storage2.emitStorageChangedEvent = emitStorageChangedEvent;
})(storage || (storage = {}));
class GlobalStateService {
  constructor() {
    var _a, _b, _c, _d;
    this.getState = () => {
      return appStore.getState().globalState;
    };
    this.setEditMemoId = (editMemoId) => {
      appStore.dispatch({
        type: "SET_EDIT_MEMO_ID",
        payload: {
          editMemoId
        }
      });
    };
    this.setCommentMemoId = (commentMemoId) => {
      appStore.dispatch({
        type: "SET_COMMENT_MEMO_ID",
        payload: {
          commentMemoId
        }
      });
    };
    this.setMarkMemoId = (markMemoId) => {
      appStore.dispatch({
        type: "SET_MARK_MEMO_ID",
        payload: {
          markMemoId
        }
      });
    };
    this.setIsMobileView = (isMobileView) => {
      appStore.dispatch({
        type: "SET_MOBILE_VIEW",
        payload: {
          isMobileView
        }
      });
    };
    this.setChangedByMemos = (changedByMemos) => {
      appStore.dispatch({
        type: "SET_CHANGED_BY_MEMOS",
        payload: {
          changedByMemos
        }
      });
    };
    this.setShowSiderbarInMobileView = (showSiderbarInMobileView) => {
      appStore.dispatch({
        type: "SET_SHOW_SIDEBAR_IN_MOBILE_VIEW",
        payload: {
          showSiderbarInMobileView
        }
      });
    };
    this.setAppSetting = (appSetting) => {
      appStore.dispatch({
        type: "SET_APP_SETTING",
        payload: appSetting
      });
      storage.set(appSetting);
    };
    const cachedSetting = storage.get([
      "shouldSplitMemoWord",
      "shouldHideImageUrl",
      "shouldUseMarkdownParser",
      "useTinyUndoHistoryCache"
    ]);
    const defaultAppSetting = {
      shouldSplitMemoWord: (_a = cachedSetting.shouldSplitMemoWord) != null ? _a : true,
      shouldHideImageUrl: (_b = cachedSetting.shouldHideImageUrl) != null ? _b : true,
      shouldUseMarkdownParser: (_c = cachedSetting.shouldUseMarkdownParser) != null ? _c : true,
      useTinyUndoHistoryCache: (_d = cachedSetting.useTinyUndoHistoryCache) != null ? _d : false
    };
    this.setAppSetting(defaultAppSetting);
  }
}
const globalStateService = new GlobalStateService();
class LocationService {
  constructor() {
    this.updateStateWithLocation = () => {
      var _a, _b, _c, _d, _e, _f;
      const { pathname, search, hash: hash2 } = window.location;
      const urlParams = new URLSearchParams(search);
      const state = {
        pathname: "/",
        hash: "",
        query: {
          tag: "",
          duration: null,
          text: "",
          type: "",
          filter: ""
        }
      };
      state.query.tag = (_a = urlParams.get("tag")) != null ? _a : "";
      state.query.type = (_b = urlParams.get("type")) != null ? _b : "";
      state.query.text = (_c = urlParams.get("text")) != null ? _c : "";
      state.query.filter = (_d = urlParams.get("filter")) != null ? _d : "";
      const from = parseInt((_e = urlParams.get("from")) != null ? _e : "0");
      const to = parseInt((_f = urlParams.get("to")) != null ? _f : "0");
      if (to > from && to !== 0) {
        state.query.duration = {
          from,
          to
        };
      }
      state.hash = hash2;
      state.pathname = this.getValidPathname(pathname);
      appStore.dispatch({
        type: "SET_LOCATION",
        payload: state
      });
    };
    this.getState = () => {
      return appStore.getState().locationState;
    };
    this.clearQuery = () => {
      appStore.dispatch({
        type: "SET_QUERY",
        payload: {
          tag: "",
          duration: null,
          text: "",
          type: "",
          filter: ""
        }
      });
    };
    this.setQuery = (query) => {
      appStore.dispatch({
        type: "SET_QUERY",
        payload: query
      });
    };
    this.setHash = (hash2) => {
      appStore.dispatch({
        type: "SET_HASH",
        payload: {
          hash: hash2
        }
      });
    };
    this.setPathname = (pathname) => {
      appStore.dispatch({
        type: "SET_PATHNAME",
        payload: {
          pathname
        }
      });
    };
    this.pushHistory = (pathname) => {
      appStore.dispatch({
        type: "SET_PATHNAME",
        payload: {
          pathname
        }
      });
    };
    this.replaceHistory = (pathname) => {
      appStore.dispatch({
        type: "SET_PATHNAME",
        payload: {
          pathname
        }
      });
    };
    this.setMemoTypeQuery = (type = "") => {
      appStore.dispatch({
        type: "SET_TYPE",
        payload: {
          type
        }
      });
    };
    this.setMemoFilter = (filterId) => {
      appStore.dispatch({
        type: "SET_QUERY_FILTER",
        payload: filterId
      });
    };
    this.setTextQuery = (text) => {
      appStore.dispatch({
        type: "SET_TEXT",
        payload: {
          text
        }
      });
    };
    this.setTimeQuery = (duration) => {
      appStore.dispatch({
        type: "SET_DURATION_QUERY",
        payload: {
          duration
        }
      });
    };
    this.setTagQuery = (tag) => {
      appStore.dispatch({
        type: "SET_TAG_QUERY",
        payload: {
          tag
        }
      });
    };
    this.setFromAndToQuery = (from, to) => {
      appStore.dispatch({
        type: "SET_DURATION_QUERY",
        payload: {
          duration: { from, to }
        }
      });
    };
    this.getValidPathname = (pathname) => {
      if (["/", "/homeboard", "/recycle"].includes(pathname)) {
        return pathname;
      } else {
        return "/";
      }
    };
    this.updateStateWithLocation();
    window.onpopstate = () => {
      this.updateStateWithLocation();
    };
  }
}
const locationService = new LocationService();
function extractDeletedAt(content) {
  const m2 = /(\sdeletedAt:\s*\d{14})\s*$/.exec(content);
  if (m2) {
    const deletedAt = /(\d{14})$/.exec(m2[1])[1];
    return {
      isDeleted: true,
      deletedAt,
      rest: content.slice(0, m2.index).trimEnd()
    };
  }
  return { isDeleted: false, deletedAt: "", rest: content };
}
function extractMemoTaskTypeFromLine(line) {
  const match = /^[\s-*]*\[(.{1})\]/.exec(line);
  return match ? match[1] : "";
}
const getTaskType = (memoTaskType) => {
  if (memoTaskType === " ")
    return "TASK-TODO";
  if (memoTaskType === "x" || memoTaskType === "X")
    return "TASK-DONE";
  return "TASK-" + memoTaskType;
};
const serializeMemoLine = (fields) => {
  const { isTask, content } = fields;
  const time = fields.time !== void 0 ? fields.time : "";
  let line = isTask ? "- [ ] " : "- ";
  if (DefaultMemoComposition === "") {
    line += time !== "" ? `${time} ${content}` : content;
  } else {
    line += DefaultMemoComposition.replace(/{TIME}/g, time).replace(/{CONTENT}/g, content);
  }
  return line;
};
const INDENT_UNIT = 4;
function getIndentWidth(line) {
  let width = 0;
  for (const ch2 of line) {
    if (ch2 === " ")
      width += 1;
    else if (ch2 === "	")
      width += INDENT_UNIT;
    else
      break;
  }
  return width;
}
function getIndentLevel(indentWidth) {
  return Math.round(indentWidth / INDENT_UNIT);
}
function extractMemoTime(rawContent) {
  const t2 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(rawContent);
  if (t2) {
    return {
      time: t2[3] ? `${t2[1]}:${t2[2]}:${t2[3]}` : `${t2[1]}:${t2[2]}`,
      isOld: !t2[3],
      rest: rawContent.slice(t2[0].length).replace(/^ /, "")
    };
  }
  const ts = /^(\d{14})\s?(.*)$/.exec(rawContent);
  if (ts) {
    const hh2 = ts[1].slice(8, 10);
    const mm = ts[1].slice(10, 12);
    const ss = ts[1].slice(12, 14);
    return { time: `${hh2}:${mm}:${ss}`, isOld: true, rest: ts[2].trim() };
  }
  return { time: "", isOld: false, rest: rawContent.trim() };
}
async function escapeRegExp(text) {
  return await text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function getLinesInString(input) {
  const lines = [];
  let tempString = input;
  while (tempString.contains("\n")) {
    const lineEndIndex = tempString.indexOf("\n");
    lines.push(tempString.slice(0, lineEndIndex));
    tempString = tempString.slice(lineEndIndex + 1);
  }
  lines.push(tempString);
  return lines;
}
async function waitForInsert(MemoContent, isTASK, insertDate) {
  const removeEnter = MemoContent.replace(/\n/g, "<br>").replace(/(<br>)(<br>)/g, "$1 $2");
  const date = insertDate ? insertDate : require$$0.moment();
  const timeText = date.format("HH:mm:ss");
  const generatedId = Math.random().toString(36).slice(-6);
  const newEvent = serializeMemoLine({ isTask: isTASK, time: timeText, content: removeEnter }) + " ^" + generatedId;
  const memoType = isTASK ? "TASK-TODO" : "JOURNAL";
  const memo2 = {
    id: "",
    content: removeEnter,
    deletedAt: "",
    createdAt: date.format("YYYY/MM/DD HH:mm:ss"),
    updatedAt: date.format("YYYY/MM/DD HH:mm:ss"),
    memoType,
    path: "",
    hasId: generatedId,
    linkId: ""
  };
  await writeMemoToDailyNote(date, newEvent, memo2);
  return memo2;
}
async function writeMemoToDailyNote(date, newEvent, memo2) {
  const { vault } = appStore.getState().dailyNotesState.app === void 0 ? app : appStore.getState().dailyNotesState.app;
  let lineNum;
  const dailyNotes = await getAllDailyNotes_1();
  const existingFile = getDailyNote_1(date, dailyNotes);
  if (!existingFile) {
    const file = await utils$1.createDailyNoteCheck(date);
    const fileContents = await vault.read(file) || "";
    const newFileContent = await insertAfterHandler(InsertAfter || "", newEvent || "", fileContents);
    if (newFileContent.content) {
      await vault.modify(file, newFileContent.content);
      if (newFileContent.posNum === -1) {
        const allLines = getAllLinesFromFile$9(newFileContent.content);
        lineNum = allLines.length + 1;
      } else {
        lineNum = newFileContent.posNum + 1;
      }
    }
    memo2.path = file.path;
  } else {
    const fileContents = await vault.read(existingFile) || "";
    const newFileContent = await insertAfterHandler(InsertAfter || "", newEvent || "", fileContents);
    await vault.modify(existingFile, newFileContent.content);
    if (newFileContent.posNum === -1) {
      const allLines = getAllLinesFromFile$9(newFileContent.content);
      lineNum = allLines.length + 1;
    } else {
      lineNum = newFileContent.posNum + 1;
    }
    memo2.path = existingFile.path;
  }
  memo2.id = date.format("YYYYMMDDHHmmss") + lineNum;
}
async function insertAfterHandler(targetString, formatted, fileContent) {
  const targetRegex = new RegExp(`s*${await escapeRegExp(targetString)}s*`);
  const fileContentLines = getLinesInString(fileContent);
  const targetPosition = fileContentLines.findIndex((line) => targetRegex.test(line));
  const targetNotFound = targetPosition === -1;
  if (targetNotFound) {
    console.log("unable to find insert after line in file.");
  }
  const nextHeaderPositionAfterTargetPosition = fileContentLines.slice(targetPosition + 1).findIndex((line) => /^#+ |---/.test(line));
  const foundNextHeader = nextHeaderPositionAfterTargetPosition !== -1;
  if (foundNextHeader) {
    let insertPosition = targetPosition;
    for (let i = nextHeaderPositionAfterTargetPosition + targetPosition; i > targetPosition; i--) {
      const lineIsNewline = /^[\s\n ]*$/.test(fileContentLines[i]);
      if (!lineIsNewline) {
        insertPosition = i;
        break;
      }
    }
    return await insertTextAfterPositionInBody(formatted, fileContent, insertPosition, foundNextHeader);
  } else {
    return await insertTextAfterPositionInBody(formatted, fileContent, fileContentLines.length - 1, foundNextHeader);
  }
}
async function insertTextAfterPositionInBody(text, body, pos, found) {
  if (pos === -1) {
    return {
      content: `${body}
${text}`,
      posNum: -1
    };
  }
  const splitContent = body.split("\n");
  if (found) {
    const pre = splitContent.slice(0, pos + 1).join("\n");
    const post = splitContent.slice(pos + 1).join("\n");
    return {
      content: `${pre}
${text}
${post}`,
      posNum: pos
    };
  } else {
    const pre = splitContent.slice(0, pos + 1).join("\n");
    const post = splitContent.slice(pos + 1).join("\n");
    if (/[\s\S]*?/g.test(post)) {
      return {
        content: `${pre}
${text}`,
        posNum: pos
      };
    } else {
      return {
        content: `${pre}${text}
${post}`,
        posNum: pos
      };
    }
  }
}
const getAllLinesFromFile$9 = (cache) => cache.split(/\r?\n/);
function convertDailyNotes(notes) {
  return notes;
}
async function changeMemo(memoid, originalContent, content, memoType, path) {
  const { dailyNotes } = dailyNotesService.getState();
  const { vault, metadataCache } = appStore.getState().dailyNotesState.app;
  const timeString = memoid.slice(0, 14);
  const idString = parseInt(memoid.slice(14));
  let changeDate;
  if (/^\d{14}/g.test(content)) {
    changeDate = require$$0.moment(content.slice(0, 14), "YYYYMMDDHHmmss");
  } else {
    changeDate = require$$0.moment(timeString, "YYYYMMDDHHmmss");
  }
  let file;
  if (path !== void 0) {
    file = metadataCache.getFirstLinkpathDest("", path);
  } else {
    const notes = convertDailyNotes(dailyNotes);
    const dailyNote = getDailyNote_1(changeDate, notes);
    file = dailyNote;
  }
  if (!file) {
    throw new Error("File not found");
  }
  const fileContent = await vault.read(file);
  const fileLines = getAllLinesFromFile$8(fileContent);
  const removeEnter = content.replace(/\n/g, "<br>").replace(/(<br>)(<br>)/g, "$1 $2");
  const originalLine = fileLines[idString];
  const newLine = fileLines[idString].replace(originalContent, removeEnter);
  const newFileContent = fileContent.replace(originalLine, newLine);
  await vault.modify(file, newFileContent);
  return {
    id: memoid,
    content: removeEnter,
    user_id: 1,
    deletedAt: "",
    createdAt: changeDate.format("YYYY/MM/DD HH:mm:ss"),
    updatedAt: changeDate.format("YYYY/MM/DD HH:mm:ss"),
    memoType: memoType || "JOURNAL",
    hasId: memoid.slice(-6),
    linkId: "",
    path: file.path
  };
}
const getAllLinesFromFile$8 = (cache) => cache.split(/\r?\n/);
const getAllLinesFromFile$7 = (cache) => cache.split(/\r?\n/);
async function commentMemo(MemoContent, isList2, path, oriID, hasID) {
  const { vault, metadataCache } = appStore.getState().dailyNotesState.app === void 0 ? app : appStore.getState().dailyNotesState.app;
  const removeEnter = MemoContent.replace(/\n/g, "<br>").replace(/(<br>)(<br>)/g, "$1 $2").trim();
  if (path === void 0) {
    throw new Error("commentMemo: missing path");
  }
  const file = metadataCache.getFirstLinkpathDest("", path);
  if (!file) {
    throw new Error("commentMemo: cannot find file " + path);
  }
  const fileContents = await vault.read(file);
  const lines = getAllLinesFromFile$7(fileContents);
  let parentLineIdx = -1;
  if (hasID) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("^" + hasID)) {
        parentLineIdx = i;
        break;
      }
    }
  }
  if (parentLineIdx === -1 && oriID) {
    const lineNo = parseInt(oriID.slice(14));
    if (!isNaN(lineNo) && lineNo >= 0 && lineNo < lines.length) {
      parentLineIdx = lineNo;
    }
  }
  if (parentLineIdx === -1) {
    throw new Error("commentMemo: cannot locate parent memo line");
  }
  const parentLine = lines[parentLineIdx];
  const indentMatch = /^(\s*)/.exec(parentLine);
  const baseIndent = indentMatch ? indentMatch[1] : "";
  const commentIndent = baseIndent + "    ";
  let insertIdx = parentLineIdx;
  for (let i = parentLineIdx + 1; i < lines.length; i++) {
    const l2 = lines[i];
    if (l2.trim() === "") {
      insertIdx = i;
      break;
    }
    if (/^#{1,}/.test(l2)) {
      insertIdx = i;
      break;
    }
    const lIndentMatch = /^(\s*)/.exec(l2);
    const lIndent = lIndentMatch ? lIndentMatch[1] : "";
    if (lIndent.length <= baseIndent.length && /^\s*[-*]\s/.test(l2)) {
      insertIdx = i - 1;
      break;
    }
    insertIdx = i;
  }
  const time = require$$0.moment();
  const generatedId = Math.random().toString(36).slice(-6);
  const commentLine = `${commentIndent}- ${time.format("HH:mm:ss")} ${removeEnter} ^${generatedId}`;
  const newLines = [...lines.slice(0, insertIdx + 1), commentLine, ...lines.slice(insertIdx + 1)];
  await vault.modify(file, newLines.join("\n"));
  return {
    id: time.format("YYYYMMDDHHmmss") + (insertIdx + 1),
    content: removeEnter,
    deletedAt: "",
    createdAt: time.format("YYYY/MM/DD HH:mm:ss"),
    updatedAt: time.format("YYYY/MM/DD HH:mm:ss"),
    memoType: "JOURNAL",
    path: file.path,
    hasId: generatedId,
    linkId: hasID || ""
  };
}
class DailyNotesFolderMissingError extends Error {
}
async function getRemainingMemos(note) {
  if (!note) {
    return 0;
  }
  const { vault } = appStore.getState().dailyNotesState.app;
  let fileContents = await vault.read(note);
  let regexMatch;
  if (DefaultMemoComposition != "" && /{TIME}/g.test(DefaultMemoComposition) && /{CONTENT}/g.test(DefaultMemoComposition)) {
    regexMatch = "(-|\\*) (\\[(.{1})\\]\\s)?" + DefaultMemoComposition.replace(/{TIME}/g, "((\\<time\\>)?\\d{1,2}:\\d{2}(:\\d{2})?(\\<\\/time\\>)?)?").replace(/ {CONTENT}/g, "(.*)$");
  } else {
    regexMatch = "(-|\\*) (\\[(.{1})\\]\\s)?((\\<time\\>)?\\d{1,2}\\:\\d{2}(\\:\\d{2})?)?";
  }
  const regexMatchRe = new RegExp(regexMatch, "gm");
  const matchLength = (fileContents.match(regexMatchRe) || []).length;
  const re2 = new RegExp(ProcessEntriesBelow.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g");
  const processEntriesHeader = (fileContents.match(re2) || []).length;
  fileContents = null;
  if (processEntriesHeader) {
    return matchLength;
  }
  return 0;
}
async function getMemosFromDailyNote(dailyNote, allMemos, commentMemos) {
  if (!dailyNote) {
    return [];
  }
  const { vault } = appStore.getState().dailyNotesState.app;
  const Memos2 = await getRemainingMemos(dailyNote);
  if (Memos2 === 0)
    return;
  let fileContents = await vault.read(dailyNote);
  let fileLines = getAllLinesFromFile$6(fileContents);
  const baseDate = getDateFromFile_1(dailyNote, "day");
  let processHeaderFound = ProcessEntriesBelow === "";
  const indentStack = [];
  for (let i = 0; i < fileLines.length; i++) {
    const line = fileLines[i];
    if (line.length === 0)
      continue;
    if (lineContainsParseBelowToken(line)) {
      processHeaderFound = true;
      indentStack.length = 0;
      continue;
    }
    if (processHeaderFound && /^#{1,} /g.test(line)) {
      processHeaderFound = false;
      continue;
    }
    if (!processHeaderFound)
      continue;
    if (!/^\s*[-*]\s/.test(line))
      continue;
    const indent = getIndentLevel(getIndentWidth(line));
    const stripped = line.replace(/^\s*[-*]\s(\[(?:.{1})\]\s?)?/, "");
    const { time, rest } = extractMemoTime(stripped);
    const memoDate = require$$0.moment(baseDate);
    if (time) {
      const [h2, m2, s] = time.split(":").map((x2) => parseInt(x2));
      memoDate.hours(h2).minutes(m2);
      if (!isNaN(s))
        memoDate.seconds(s);
    }
    let content = rest;
    let hasId = "";
    const idMatch = /\^(\S{6})\s*$/.exec(content);
    if (idMatch) {
      hasId = idMatch[1];
      content = content.slice(0, -8).trimEnd();
    } else {
      hasId = Math.random().toString(36).slice(-6);
    }
    let isDeleted = false;
    let deletedAt = "";
    const delMatch = extractDeletedAt(content);
    if (delMatch.isDeleted) {
      isDeleted = true;
      deletedAt = delMatch.deletedAt;
      content = delMatch.rest;
    }
    let linkId = "";
    if (indent > 0) {
      while (indentStack.length > 0 && indentStack[indentStack.length - 1].level >= indent) {
        indentStack.pop();
      }
      const parent = indentStack.length > 0 ? indentStack[indentStack.length - 1] : null;
      if (parent)
        linkId = parent.hasId;
    } else {
      indentStack.length = 0;
    }
    indentStack.push({ level: indent, hasId });
    const memoType = /^\s*[-*]\s\[(.{1})\]\s/.test(line) ? getTaskType(extractMemoTaskTypeFromLine(line)) : "JOURNAL";
    allMemos.push({
      id: memoDate.format("YYYYMMDDHHmmss") + i,
      content,
      user_id: 1,
      createdAt: memoDate.format("YYYY/MM/DD HH:mm:ss"),
      updatedAt: memoDate.format("YYYY/MM/DD HH:mm:ss"),
      memoType,
      hasId,
      linkId,
      isDeleted,
      deletedAt,
      path: dailyNote.path
    });
  }
  fileLines = null;
  fileContents = null;
}
async function getMemos(onBatch) {
  const memos = [];
  const { vault } = appStore.getState().dailyNotesState.app;
  const folder = getDailyNotePath();
  if (folder === "" || folder === void 0) {
    new require$$0.Notice(t$1("Please check your daily note plugin OR periodic notes plugin settings"));
    return;
  }
  const dailyNotesFolder = vault.getAbstractFileByPath(require$$0.normalizePath(folder));
  if (!dailyNotesFolder) {
    throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
  }
  const dailyNotes = getAllDailyNotes_1();
  const files = Object.entries(dailyNotes).filter(([, f2]) => f2 instanceof require$$0.TFile && f2.extension === "md").sort((a, b) => b[0].localeCompare(a[0]));
  const BATCH_SIZE = 5;
  for (let i = 0; i < files.length; i++) {
    await getMemosFromDailyNote(files[i][1], memos);
    if (onBatch && (i + 1) % BATCH_SIZE === 0) {
      await onBatch([...memos]);
    }
  }
  if (onBatch && files.length > 0) {
    await onBatch([...memos]);
  }
  return { memos, commentMemos: [] };
}
const getAllLinesFromFile$6 = (cache) => cache.split(/\r?\n/);
const lineContainsParseBelowToken = (line) => {
  if (ProcessEntriesBelow === "") {
    return false;
  }
  const re2 = new RegExp(ProcessEntriesBelow.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "");
  return re2.test(line);
};
async function obHideMemo(memoid) {
  const { dailyNotes } = dailyNotesService.getState();
  if (/\d{14,}/.test(memoid)) {
    const { vault } = appStore.getState().dailyNotesState.app;
    const timeString = memoid.slice(0, 13);
    const idString = parseInt(memoid.slice(14));
    const changeDate = require$$0.moment(timeString, "YYYYMMDDHHmmSS");
    const dailyNote = getDailyNote_1(changeDate, dailyNotes);
    if (!dailyNote)
      return null;
    const fileContent = await vault.read(dailyNote);
    const fileLines = getAllLinesFromFile$5(fileContent);
    const targetIdx = idString < fileLines.length ? idString : -1;
    if (targetIdx === -1)
      return null;
    const line = fileLines[targetIdx];
    const now = require$$0.moment();
    const now14 = now.format("YYYYMMDDHHmmss");
    const deletedAtStr = " deletedAt: " + now14;
    let newLine;
    if (/\s*\^(\S{6})\s*$/.test(line)) {
      newLine = line.replace(/\s*\^(\S{6})\s*$/, deletedAtStr + " ^$1");
    } else {
      newLine = line.trimEnd() + deletedAtStr;
    }
    if (newLine === line)
      return null;
    fileLines[targetIdx] = newLine;
    await vault.modify(dailyNote, fileLines.join("\n"));
    return dailyNote;
  }
  return null;
}
const getAllLinesFromFile$5 = (cache) => cache.split(/\r?\n/);
async function restoreMemoFromLine(memoid) {
  const { dailyNotes } = dailyNotesService.getState();
  if (!/\d{14,}/.test(memoid))
    return null;
  const { vault } = appStore.getState().dailyNotesState.app;
  const timeString = memoid.slice(0, 13);
  const idString = parseInt(memoid.slice(14));
  const changeDate = require$$0.moment(timeString, "YYYYMMDDHHmmSS");
  const dailyNote = getDailyNote_1(changeDate, dailyNotes);
  if (!dailyNote)
    return null;
  const fileContent = await vault.read(dailyNote);
  const fileLines = getAllLinesFromFile$5(fileContent);
  const targetIdx = idString < fileLines.length ? idString : -1;
  if (targetIdx === -1)
    return null;
  const line = fileLines[targetIdx];
  const newLine = line.replace(/\s*deletedAt:\s*\d{14}/, "");
  if (newLine === line)
    return null;
  fileLines[targetIdx] = newLine;
  await vault.modify(dailyNote, fileLines.join("\n"));
  return dailyNote;
}
async function deleteMemoFromLine(memoid) {
  const { dailyNotes } = dailyNotesService.getState();
  if (!/\d{14,}/.test(memoid))
    return null;
  const { vault } = appStore.getState().dailyNotesState.app;
  const timeString = memoid.slice(0, 13);
  const idString = parseInt(memoid.slice(14));
  const changeDate = require$$0.moment(timeString, "YYYYMMDDHHmmSS");
  const dailyNote = getDailyNote_1(changeDate, dailyNotes);
  if (!dailyNote)
    return null;
  const fileContent = await vault.read(dailyNote);
  const fileLines = getAllLinesFromFile$5(fileContent);
  const targetIdx = idString < fileLines.length ? idString : -1;
  if (targetIdx === -1)
    return null;
  const parentIndent = getIndentWidth(fileLines[targetIdx]);
  let endIdx = targetIdx;
  for (let i = targetIdx + 1; i < fileLines.length; i++) {
    const l2 = fileLines[i];
    if (l2.trim() === "" || /^#{1,}/.test(l2))
      break;
    if (getIndentWidth(l2) <= parentIndent)
      break;
    endIdx = i;
  }
  const newLines = [...fileLines.slice(0, targetIdx), ...fileLines.slice(endIdx + 1)];
  await vault.modify(dailyNote, newLines.join("\n"));
  return dailyNote;
}
class MemoService {
  constructor() {
    this.initialized = false;
  }
  getState() {
    return appStore.getState().memoState;
  }
  async fetchAllMemos() {
    const accumulatedMemos = [];
    await getMemos(async (batchMemos) => {
      accumulatedMemos.push(...batchMemos);
      this.updateMemoStore(accumulatedMemos);
    });
    if (!this.initialized) {
      this.initialized = true;
    }
    return accumulatedMemos;
  }
  async fetchMemosFromFile(file) {
    const memos = [];
    await getMemosFromDailyNote(file, memos);
    const { memoState } = appStore.getState();
    const others = memoState.memos.filter((m2) => m2.path !== file.path);
    this.updateMemoStore([...others, ...memos]);
  }
  async fetchDeletedMemos() {
    const deletedMemos = this.getState().memos.filter((m2) => m2.isDeleted);
    return deletedMemos.sort(
      (a, b) => new Date(b.deletedAt || "").getTime() - new Date(a.deletedAt || "").getTime()
    );
  }
  pushMemo(memo2) {
    appStore.dispatch({
      type: "INSERT_MEMO",
      payload: { memo: { ...memo2 } }
    });
  }
  pushCommentMemo(memo2) {
    appStore.dispatch({
      type: "INSERT_MEMO",
      payload: { memo: { ...memo2 } }
    });
  }
  getMemoById(id2) {
    return this.getState().memos.find((m2) => m2.id === id2) || null;
  }
  getCommentMemoById(id2) {
    return this.getState().memos.find((m2) => m2.id === id2 && m2.linkId) || null;
  }
  async hideMemoById(id2) {
    const file = await obHideMemo(id2);
    if (file) {
      await this.fetchMemosFromFile(file);
    }
  }
  async restoreMemoById(id2) {
    const file = await restoreMemoFromLine(id2);
    if (file) {
      await this.fetchMemosFromFile(file);
    }
  }
  async deleteMemoById(id2) {
    await deleteMemoFromLine(id2);
  }
  editMemo(memo2) {
    appStore.dispatch({
      type: "EDIT_MEMO",
      payload: memo2
    });
  }
  editCommentMemo(memo2) {
    appStore.dispatch({
      type: "EDIT_MEMO",
      payload: memo2
    });
  }
  updateTagsState() {
    const { memos } = this.getState();
    const uniqueTags = /* @__PURE__ */ new Set();
    const tagCounts = {};
    memos.forEach((memo2) => {
      const tags = this.extractTagsFromContent(memo2.content);
      tags.forEach((tag) => {
        uniqueTags.add(tag);
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    appStore.dispatch({
      type: "SET_TAGS",
      payload: {
        tags: Array.from(uniqueTags),
        tagsNum: tagCounts
      }
    });
  }
  clearMemos() {
    appStore.dispatch({
      type: "SET_MEMOS",
      payload: { memos: [] }
    });
  }
  async getLinkedMemos(memoId) {
    return this.getState().memos.filter((m2) => m2.content.includes(memoId));
  }
  async getCommentMemos(memoId) {
    return this.getState().memos.filter((m2) => m2.linkId === memoId);
  }
  async createMemo(text, isTask, date) {
    return await waitForInsert(text, isTask, date);
  }
  async createCommentMemo(params) {
    return await commentMemo(params.text, params.isList, params.path, params.ID, params.hasID);
  }
  async importMemos(text, isList2, date) {
    return await waitForInsert(text, isList2, date);
  }
  async updateMemo(params) {
    return await changeMemo(
      params.memoId,
      params.originalText,
      params.text,
      params.type,
      params.path
    );
  }
  extractTagsFromContent(content) {
    const tags = /* @__PURE__ */ new Set();
    const matches = [
      ...content.match(TAG_REG) || [],
      ...content.match(NOP_FIRST_TAG_REG) || [],
      ...content.match(FIRST_TAG_REG) || []
    ];
    matches.forEach((match) => {
      if (TAG_REG.test(match)) {
        tags.add(match.replace(TAG_REG, "$1").trim());
      } else if (NOP_FIRST_TAG_REG.test(match)) {
        tags.add(match.replace(NOP_FIRST_TAG_REG, "$1").trim());
      } else if (FIRST_TAG_REG.test(match)) {
        tags.add(match.replace(FIRST_TAG_REG, "$2").trim());
      }
    });
    return Array.from(tags);
  }
  updateMemoStore(memos) {
    appStore.dispatch({
      type: "SET_MEMOS",
      payload: { memos }
    });
  }
}
const memoService = new MemoService();
const findQuery = async () => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
  const queryList2 = [];
  const filePath = getDailyNotePath();
  const absolutePath = filePath + "/" + QueryFileName + ".md";
  const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
  if (queryFile instanceof require$$0.TFile) {
    const fileContents = await vault.read(queryFile);
    const fileLines = getAllLinesFromFile$4(fileContents);
    if (fileLines && fileLines.length != 0) {
      for (let i = 0; i < fileLines.length; i++) {
        if (fileLines[i] === "")
          continue;
        const createdDateString = getCreatedDateFromLine(fileLines[i]);
        const createdDate = require$$0.moment(createdDateString, "YYYYMMDDHHmmss").format("YYYY/MM/DD HH:mm:ss");
        const updatedDate = createdDate;
        const id2 = createdDateString + getIDFromLine$1(fileLines[i]);
        const querystring = getStringFromLine(fileLines[i]);
        const title = getTitleFromLine(fileLines[i]);
        let pinnedDate;
        if (/^(.+)pinnedAt(.+)$/.test(fileLines[i])) {
          pinnedDate = require$$0.moment(getPinnedDateFromLine$1(fileLines[i]), "YYYYMMDDHHmmss");
          queryList2.push({
            createdAt: createdDate,
            id: id2,
            pinnedAt: pinnedDate.format("YYYY/MM/DD HH:mm:ss"),
            querystring,
            title,
            updatedAt: updatedDate,
            userId: ""
          });
        } else if (/^(.+)\[\](.+)?$/.test(fileLines[i])) {
          queryList2.push({
            createdAt: createdDate,
            id: id2,
            pinnedAt: "",
            querystring: "",
            title,
            updatedAt: updatedDate,
            userId: ""
          });
        } else {
          queryList2.push({
            createdAt: createdDate,
            id: id2,
            pinnedAt: "",
            querystring,
            title,
            updatedAt: updatedDate,
            userId: ""
          });
        }
      }
    }
  }
  return queryList2;
};
const getAllLinesFromFile$4 = (cache) => cache.split(/\r?\n/);
const getCreatedDateFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})/.exec(line)) == null ? void 0 : _a[1];
};
const getIDFromLine$1 = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s/.exec(line)) == null ? void 0 : _a[2];
};
const getStringFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)?\])/.exec(line)) == null ? void 0 : _a[4];
};
const getTitleFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])/.exec(line)) == null ? void 0 : _a[3];
};
const getPinnedDateFromLine$1 = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])\s(pinnedAt: (\d{14}))/.exec(line)) == null ? void 0 : _a[7];
};
async function deleteQueryForever(queryID) {
  const { vault, metadataCache } = appStore.getState().dailyNotesState.app;
  if (/\d{14,}/.test(queryID)) {
    const filePath = getDailyNotePath();
    const absolutePath = filePath + "/" + QueryFileName + ".md";
    const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
    if (queryFile instanceof require$$0.TFile) {
      let fileContents = await vault.read(queryFile);
      let fileLines = getAllLinesFromFile$3(fileContents);
      if (fileLines.length === 0) {
        return;
      } else {
        const lineNum = parseInt(queryID.slice(14));
        const line = fileLines[lineNum - 1];
        if (/^\d{14,}(.+)$/.test(line)) {
          const newFileContent = fileContents.replace(line, "");
          await vault.modify(queryFile, newFileContent);
        }
      }
      fileLines = null;
      fileContents = null;
    }
  }
}
const getAllLinesFromFile$3 = (cache) => cache.split(/\r?\n/);
const createObsidianQuery = async (title, querystring) => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
  const filePath = getDailyNotePath();
  const absolutePath = filePath + "/" + QueryFileName + ".md";
  const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
  if (queryFile instanceof require$$0.TFile) {
    const fileContents = await vault.read(queryFile);
    const fileLines = getAllLinesFromFile$2(fileContents);
    const date = require$$0.moment();
    const createdDate = date.format("YYYY/MM/DD HH:mm:ss");
    const updatedDate = createdDate;
    let lineNum;
    if (fileLines.length === 1 && fileLines[0] === "") {
      lineNum = 1;
    } else {
      lineNum = fileLines.length + 1;
    }
    const id2 = date.format("YYYYMMDDHHmmss") + lineNum;
    await createQueryInFile(queryFile, fileContents, id2, title, querystring);
    return [
      {
        createdAt: createdDate,
        id: id2,
        pinnedAt: "",
        querystring,
        title,
        updatedAt: updatedDate,
        userId: ""
      }
    ];
  } else {
    const queryFilePath = require$$0.normalizePath(absolutePath);
    const file = await createQueryFile(queryFilePath);
    const fileContents = await vault.read(file);
    const date = require$$0.moment();
    const createdDate = date.format("YYYY/MM/DD HH:mm:ss");
    const updatedDate = createdDate;
    const id2 = date.format("YYYYMMDDHHmmss") + 1;
    await createQueryInFile(file, fileContents, id2, title, querystring);
    return [
      {
        createdAt: createdDate,
        id: id2,
        pinnedAt: "",
        querystring,
        title,
        updatedAt: updatedDate,
        userId: ""
      }
    ];
  }
};
const createQueryInFile = async (file, fileContent, id2, title, queryString) => {
  const { vault } = appStore.getState().dailyNotesState.app;
  let newContent;
  if (fileContent === "") {
    newContent = id2 + " " + title + " " + queryString;
  } else {
    newContent = fileContent + "\n" + id2 + " " + title + " " + queryString;
  }
  await vault.modify(file, newContent);
  return true;
};
const createQueryFile = async (path) => {
  const { vault } = appStore.getState().dailyNotesState.app;
  try {
    const createdFile = await vault.create(path, "");
    return createdFile;
  } catch (err) {
    console.error(`Failed to create file: '${path}'`, err);
    new require$$0.Notice(t("Unable to create new file."));
  }
};
const getAllLinesFromFile$2 = (cache) => cache.split(/\r?\n/);
const updateObsidianQuery = async (queryId, title, queryString) => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
  const filePath = getDailyNotePath();
  const absolutePath = filePath + "/" + QueryFileName + ".md";
  const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
  if (queryFile instanceof require$$0.TFile) {
    const fileContents = await vault.read(queryFile);
    const fileLines = getAllLinesFromFile$1(fileContents);
    let lineID;
    if (/^\d{1,3}$/.test(queryId)) {
      lineID = queryId;
    } else {
      lineID = getIDFromLine(queryId);
    }
    const lineNum = parseInt(lineID) - 1;
    if (fileLines && fileLines.length != 0) {
      const oldContent = fileLines[lineNum];
      const date = require$$0.moment();
      const updatedDateString = date.format("YYYYMMDDHHmmss");
      const updatedDate = date.format("YYYY/MM/DD HH:mm:ss");
      const newLineNum = lineNum + 1;
      const id2 = updatedDateString + newLineNum;
      if (/^(.+)pinnedAt(.+)$/.test(oldContent)) {
        const pinnedString = getPinnedStringFromLine(oldContent);
        const pinnedDateString = getPinnedDateFromLine(oldContent);
        const newContent = id2 + " " + title + " " + queryString + " " + pinnedString;
        const pinnedAtDate = require$$0.moment(pinnedDateString, "YYYYMMDDHHmmss").format("YYYY/MM/DD HH:mm:ss");
        const newFileContents = fileContents.replace(oldContent, newContent);
        await vault.modify(queryFile, newFileContents);
        return [
          {
            createdAt: updatedDate,
            id: id2,
            pinnedAt: pinnedAtDate,
            querystring: queryString,
            title,
            updatedAt: updatedDate,
            userId: ""
          }
        ];
      } else {
        const newContent = id2 + " " + title + " " + queryString;
        const newFileContents = fileContents.replace(oldContent, newContent);
        await vault.modify(queryFile, newFileContents);
        return [
          {
            createdAt: updatedDate,
            id: id2,
            pinnedAt: "",
            querystring: queryString,
            title,
            updatedAt: updatedDate,
            userId: ""
          }
        ];
      }
    }
  }
};
const getAllLinesFromFile$1 = (cache) => cache.split(/\r?\n/);
const getIDFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})/.exec(line)) == null ? void 0 : _a[2];
};
const getPinnedStringFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])\s(pinnedAt: (\d{14})\d+)/.exec(line)) == null ? void 0 : _a[6];
};
const getPinnedDateFromLine = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])\s(pinnedAt: (\d{14})\d+)/.exec(line)) == null ? void 0 : _a[7];
};
const pinQueryInFile = async (queryID) => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
  if (/\d{14,}/.test(queryID)) {
    const filePath = getDailyNotePath();
    const absolutePath = filePath + "/" + QueryFileName + ".md";
    const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
    if (!(queryFile instanceof require$$0.TFile)) {
      return;
    }
    const fileContents = await vault.read(queryFile);
    const fileLines = getAllLinesFromFile(fileContents);
    const date = require$$0.moment();
    const originalLineNum = parseInt(queryID.slice(14));
    const originalContent = fileLines[originalLineNum - 1];
    const pinnedAtDate = date.format("YYYY/MM/DD HH:mm:ss");
    let lineNum;
    if (fileLines.length === 1 && fileLines[0] === "") {
      lineNum = 1;
    } else {
      lineNum = fileLines.length + 1;
    }
    const pinnedAtDateID = date.format("YYYYMMDDHHmmss") + lineNum;
    const newQuery = originalContent + " pinnedAt: " + pinnedAtDateID;
    const newContent = fileContents.replace(originalContent, newQuery);
    await vault.modify(queryFile, newContent);
    return pinnedAtDate;
  }
};
const unpinQueryInFile = async (queryID) => {
  const { metadataCache, vault } = appStore.getState().dailyNotesState.app;
  const filePath = getDailyNotePath();
  const absolutePath = filePath + "/" + QueryFileName + ".md";
  const queryFile = metadataCache.getFirstLinkpathDest("", absolutePath);
  if (!(queryFile instanceof require$$0.TFile)) {
    return;
  }
  const fileContents = await vault.read(queryFile);
  const fileLines = getAllLinesFromFile(fileContents);
  const originalLineNum = parseInt(queryID.slice(14));
  const originalContent = fileLines[originalLineNum - 1];
  const pinnedAtString = extractPinnedAtfromText(originalContent);
  const newFileContents = fileContents.replace(pinnedAtString, "");
  await vault.modify(queryFile, newFileContents);
  return;
};
const getAllLinesFromFile = (cache) => cache.split(/\r?\n/);
const extractPinnedAtfromText = (line) => {
  var _a;
  return (_a = /^(\d{14})(\d{1,})\s(.+)\s(\[(.+)\])(\spinnedAt: (\d{14,}))$/.exec(line)) == null ? void 0 : _a[6];
};
class QueryService {
  getState() {
    return appStore.getState().queryState;
  }
  async getMyAllQueries() {
    const data = await findQuery();
    appStore.dispatch({
      type: "SET_QUERIES",
      payload: {
        queries: data
      }
    });
    return data;
  }
  getQueryById(id2) {
    for (const q2 of this.getState().queries) {
      if (q2.id === id2) {
        return q2;
      }
    }
  }
  pushQuery(query) {
    appStore.dispatch({
      type: "INSERT_QUERY",
      payload: {
        query: {
          ...query
        }
      }
    });
  }
  editQuery(query) {
    appStore.dispatch({
      type: "UPDATE_QUERY",
      payload: query
    });
  }
  async deleteQuery(queryId) {
    await deleteQueryForever(queryId);
    appStore.dispatch({
      type: "DELETE_QUERY_BY_ID",
      payload: {
        id: queryId
      }
    });
  }
  async createQuery(title, querystring) {
    const data = await createObsidianQuery(title, querystring);
    return data;
  }
  async updateQuery(queryId, title, querystring) {
    const data = await updateObsidianQuery(queryId, title, querystring);
    return data;
  }
  async pinQuery(queryId) {
    await pinQueryInFile(queryId);
  }
  async unpinQuery(queryId) {
    await unpinQueryInFile(queryId);
  }
}
const queryService = new QueryService();
class ResourceService {
  async upload(file) {
    const { vault, fileManager } = appStore.getState().dailyNotesState.app;
    const fileArray = await file.arrayBuffer();
    const ext = getExt(file.type);
    const dailyNotes = getAllDailyNotes_1();
    const date = require$$0.moment();
    const existingFile = getDailyNote_1(date, dailyNotes);
    let newFile;
    if (!existingFile) {
      const dailyFile = await createDailyNote_1(date);
      newFile = await vault.createBinary(
        await vault.getAvailablePathForAttachments(`Pasted Image ${require$$0.moment().format("YYYYMMDDHHmmss")}`, ext, dailyFile),
        fileArray
      );
    } else if (existingFile instanceof require$$0.TFile) {
      newFile = await vault.createBinary(
        await vault.getAvailablePathForAttachments(
          `Pasted Image ${require$$0.moment().format("YYYYMMDDHHmmss")}`,
          ext,
          existingFile
        ),
        fileArray
      );
    }
    return fileManager.generateMarkdownLink(newFile, newFile.path, "", "");
  }
  async parseHtml(html) {
    const output = await html.text();
    const el = document.createElement("html");
    el.innerHTML = output;
    const elementsByClassName = el.getElementsByClassName("memo");
    for (let i = 0; i < elementsByClassName.length; i++) {
      const source = elementsByClassName[i].getElementsByClassName("content")[0].innerHTML.replace(/\s{16}?<p><\/p>/g, "").replace(/\s{16}?<p>/g, "").replace(/<\/p>/g, "").replace(/<strong>/g, "**").replace(/<\/strong>/g, "**").replace(/^\s{16}/g, "");
      const importedMemo = await memoService.importMemos(
        source,
        true,
        require$$0.moment(elementsByClassName[i].getElementsByClassName("time")[0].innerHTML)
      );
      memoService.pushMemo(importedMemo);
    }
  }
}
const getExt = (line) => {
  var _a;
  return (_a = /^image\/(.+)$/.exec(line)) == null ? void 0 : _a[1];
};
const resourceService = new ResourceService();
var dialog = "";
const BaseDialog = (props) => {
  const {
    children,
    className,
    clickSpaceDestroy,
    destroy
  } = props;
  const handleSpaceClicked = () => {
    if (clickSpaceDestroy) {
      destroy();
    }
  };
  const handleEscClicked = (e) => {
    const {
      key
    } = e;
    if (key === "Escape") {
      destroy();
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: `dialog-wrapper ${className}`,
    onClick: handleSpaceClicked,
    onKeyPress: handleEscClicked,
    children: /* @__PURE__ */ jsx("div", {
      className: "dialog-container",
      onClick: (e) => e.stopPropagation(),
      children
    })
  });
};
function showDialog(config, DialogComponent, props) {
  const tempDiv = document.createElement("div");
  document.body.append(tempDiv);
  setTimeout(() => {
    var _a;
    (_a = tempDiv.firstElementChild) == null ? void 0 : _a.classList.add("showup");
  }, 0);
  const cbs = {
    destroy: () => {
      var _a, _b;
      (_a = tempDiv.firstElementChild) == null ? void 0 : _a.classList.remove("showup");
      (_b = tempDiv.firstElementChild) == null ? void 0 : _b.classList.add("showoff");
      setTimeout(() => {
        tempDiv.remove();
        ReactDOM.unmountComponentAtNode(tempDiv);
      }, ANIMATION_DURATION);
    }
  };
  const dialogProps = {
    ...props,
    destroy: cbs.destroy
  };
  let Fragment2 = /* @__PURE__ */ jsx(BaseDialog, {
    destroy: cbs.destroy,
    clickSpaceDestroy: true,
    ...config,
    children: /* @__PURE__ */ jsx(DialogComponent, {
      ...dialogProps
    })
  });
  if (config.useAppContext) {
    Fragment2 = /* @__PURE__ */ jsx(Provider, {
      store: appStore,
      context: appContext,
      children: Fragment2
    });
  }
  ReactDOM.render(Fragment2, tempDiv);
  return cbs;
}
var aboutSiteDialog = "";
function SvgClose(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "#37352f",
    viewBox: "0 0 24 24",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
  }));
}
const AboutSiteDialog = ({
  destroy
}) => {
  const handleCloseBtnClick = () => {
    destroy();
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "dialog-header-container",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "title-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F920}"
        }), "About ", /* @__PURE__ */ jsx("b", {
          children: "Rememo"
        })]
      }), /* @__PURE__ */ jsx("button", {
        className: "btn close-btn",
        onClick: handleCloseBtnClick,
        children: /* @__PURE__ */ jsx(SvgClose, {
          className: "icon-img"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-content-container",
      children: ["Hi, I am Quorafind(Boninall), if you are interested in this project, please support my work and enthusiasm by buying me a coffee on ", /* @__PURE__ */ jsx("a", {
        href: "https://www.buymeacoffee.com/boninall",
        children: "https://www.buymeacoffee.com/boninall"
      }), /* @__PURE__ */ jsx("a", {
        href: "https://www.buymeacoffee.com/boninall",
        children: /* @__PURE__ */ jsx("img", {
          src: `https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=boninall&button_colour=6495ED&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00`
        })
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
        children: ["\u57FA\u4E8E ", /* @__PURE__ */ jsx("a", {
          href: "https://github.com/justmemos/memos",
          children: "memos"
        }), " \u5F00\u6E90\u9879\u76EE\u6240\u6784\u5EFA\u7684\u9879\u76EE\u3002 NOTE: Based on", " ", /* @__PURE__ */ jsx("a", {
          href: "https://github.com/justmemos/memos",
          children: "memos"
        }), " project to build."]
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
        children: ["\u{1F3D7} This project is working in progress, ", /* @__PURE__ */ jsx("br", {}), " and very pleasure to welcome your", " ", /* @__PURE__ */ jsx("a", {
          href: "https://github.com/Quorafind/obsidian-memos/issues",
          children: "issues"
        }), " and", " ", /* @__PURE__ */ jsx("a", {
          href: "https://github.com/Quorafind/obsidian-memos/pulls",
          children: "Pull Request"
        }), "."]
      }), /* @__PURE__ */ jsx("hr", {}), /* @__PURE__ */ jsxs("p", {
        className: "normal-text",
        children: ["Last updated on ", /* @__PURE__ */ jsx("span", {
          className: "pre-text",
          children: "2022/01/04 22:55:15"
        }), " \u{1F389}"]
      })]
    })]
  });
};
function showAboutSiteDialog() {
  showDialog({
    className: "about-site-dialog"
  }, AboutSiteDialog);
}
const LEGACY_TIME_REG = /^(\s*[-*]\s(\[[^\]]{1}\]\s+)?)(\d{14})(?=\s|$)/;
function toClockTime(ts) {
  return `${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}`;
}
const legacyTimeRule = {
  id: "legacy-time",
  name: "\u65E7 14 \u4F4D\u65F6\u95F4\u6233",
  why: "\u884C\u9996\u662F\u65E7\u7248 14 \u4F4D\u65F6\u95F4\u6233\uFF08YYYYMMDDHHmmss\uFF09\u3002\u65F6\u95F4\u5E94\u7EDF\u4E00\u4E3A HH:mm:ss\uFF08\u5E26\u79D2\uFF09\u2014\u2014\u65E7\u7248\u8BFB\u53D6\u7AEF\u4F1A\u628A\u5B83\u5F53\u201C\u65E7\u683C\u5F0F\u201D\u53CD\u590D\u8981\u6C42\u56DE\u5199\u3002\u4FEE\u590D\uFF1A\u53EA\u66FF\u6362\u65F6\u95F4\u4F4D\u4E3A HH:mm:ss\uFF0C\u5185\u5BB9\u4E0E ^id \u4E0D\u52A8\u3002",
  severity: "warning",
  detect(ctx) {
    const issues = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx])
        return;
      const m2 = LEGACY_TIME_REG.exec(line);
      if (m2) {
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          fixedLine: `${m2[1]}${toClockTime(m2[3])}${line.slice(m2[0].length)}`
        });
      }
    });
    return issues;
  }
};
const ID_AT_END$1 = /\^([A-Za-z0-9]{6})\s*$/;
function randomId$1(exclude) {
  let id2 = "";
  do {
    id2 = Math.random().toString(36).slice(-6);
  } while (exclude.has(id2));
  return id2;
}
const dupIdRule = {
  id: "dup-id",
  name: "\u91CD\u590D ^id",
  why: "\u540C\u4E00\u6587\u4EF6\u91CC\u51FA\u73B0\u91CD\u590D\u7684 ^id\u3002^id \u662F memo/\u8BC4\u8BBA\u7684\u6301\u4E45\u4E3B\u952E\uFF0C\u91CD\u590D\u4F1A\u4F7F\u8BC4\u8BBA\u5F52\u5C5E\u3001\u56DE\u6536\u7AD9\u3001\u5F15\u7528\u5168\u90E8\u6B67\u4E49\u3002\u4FEE\u590D\uFF1A\u4FDD\u7559\u7B2C\u4E00\u4E2A\u51FA\u73B0\u7684 id\uFF0C\u540E\u7EED\u91CD\u590D\u884C\u6362\u6210\u4E00\u4E2A\u65B0\u7684\u968F\u673A ^id\uFF08\u5F15\u7528\u65B9\u82E5\u6307\u5411\u88AB\u6362\u6389\u7684\u65E7 id \u9700\u4E00\u5E76\u8FC1\u79FB\u2014\u2014\u8BE5\u573A\u666F\u5728\u8FC1\u79FB\u89C4\u5219\u4E2D\u5904\u7406\uFF09\u3002",
  severity: "error",
  detect(ctx) {
    const seen = /* @__PURE__ */ new Map();
    const occupied = /* @__PURE__ */ new Set();
    ctx.lines.forEach((line) => {
      const m2 = ID_AT_END$1.exec(line);
      if (m2)
        occupied.add(m2[1]);
    });
    const issues = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx])
        return;
      const m2 = ID_AT_END$1.exec(line);
      if (!m2)
        return;
      const id2 = m2[1];
      if (seen.has(id2)) {
        const fresh = randomId$1(occupied);
        occupied.add(fresh);
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          note: `\u9996\u6B21\u51FA\u73B0\u5728\u7B2C ${seen.get(id2)} \u884C`,
          fixedLine: line.slice(0, m2.index) + "^" + fresh
        });
      } else {
        seen.set(id2, idx + 1);
      }
    });
    return issues;
  }
};
const TOP_BULLET = /^[-*]\s(\[[^\]]{1}\]\s+)?/;
const INDENT_BULLET = /^\s{1,}[-*]\s/;
const ID_AT_END = /\^([A-Za-z0-9]{6})\s*$/;
const PURE_HEADER = /^[-*]\s(\[[^\]]{1}\]\s+)?\d{1,2}:\d{2}(?::\d{2})?(\s+\[deletedAt:[^\]]*\])?\s*\^[A-Za-z0-9]{6}\s*$/;
function detectEra(lines) {
  for (const line of lines) {
    if (TOP_BULLET.test(line)) {
      return PURE_HEADER.test(line) ? "new" : "old";
    }
  }
  return "unknown";
}
function randomId() {
  return Math.random().toString(36).slice(-6);
}
const missingIdRule = {
  id: "missing-id",
  name: "\u7F3A\u5C11 ^id",
  why: "\u5217\u8868\u884C\uFF08memo/\u8BC4\u8BBA\uFF09\u6CA1\u6709\u884C\u5C3E ^id\u3002\u6CA1\u6709\u6301\u4E45\u5757 id \u7684\u884C\uFF0C\u4E00\u65E6\u884C\u53F7\u53D8\u5316\u5C31\u65E0\u6CD5\u88AB\u7F16\u8F91\u3001\u8BC4\u8BBA\u3001\u56DE\u6536\u6216\u5F15\u7528\uFF08Obsidian \u539F\u751F ^id \u662F\u884C\u632A\u4F4D\u4E0D\u53D8\u7684\uFF09\u3002\u4FEE\u590D\uFF1A\u884C\u5C3E\u8865\u4E00\u4E2A 6 \u4F4D\u968F\u673A ^id\u3002",
  severity: "warning",
  detect(ctx) {
    const era = detectEra(ctx.lines);
    const issues = [];
    ctx.lines.forEach((line, idx) => {
      if (!ctx.inScope[idx])
        return;
      const isTop = TOP_BULLET.test(line);
      const isIndent = INDENT_BULLET.test(line);
      if (!isTop && !isIndent)
        return;
      if (era === "new" && isIndent)
        return;
      if (ID_AT_END.test(line))
        return;
      issues.push({
        ruleId: this.id,
        path: ctx.path,
        line: idx + 1,
        raw: line,
        fixedLine: `${line.trimEnd()} ^${randomId()}`
      });
    });
    return issues;
  }
};
const BR_REG = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;
const bareBrRule = {
  id: "bare-br",
  name: "\u65E7 <br> \u6362\u884C\u7F16\u7801",
  why: "\u884C\u5185\u5B58\u5728\u65E7\u7248\u6362\u884C\u7F16\u7801 <br>\u3002\u65E7\u5355\u884C\u683C\u5F0F\u5DF2\u5F03\u7528\uFF1A<br> \u65E0\u6CD5\u8868\u8FBE\u5757\u7EA7 markdown\uFF08\u5217\u8868/\u4EE3\u7801\u5757\u9700\u8981\u771F\u5B9E\u6362\u884C\uFF09\uFF0C\u539F\u6587\u4EF6\u89C2\u611F\u4E5F\u5DEE\u3002\u5904\u7406\u65B9\u5F0F\u4E0D\u662F\u9010\u884C\u4FEE\u8865\u2014\u2014\u542B <br> \u7684\u6587\u4EF6\u5E94\u6574\u4F53\u8FC1\u79FB\u5230\u65B0\u5361\u7247\u5757\u683C\u5F0F\uFF08\u8FC1\u79FB\u529F\u80FD\u968F P1.5 \u63D0\u4F9B\uFF0C\u5C4A\u65F6\u6B64\u89C4\u5219\u4F1A\u81EA\u52A8\u5347\u7EA7\u4E3A\u53EF\u4FEE\u590D\uFF09\u3002",
  severity: "info",
  detect(ctx) {
    const affectedLines = ctx.lines.filter((l2) => BR_REG.test(l2));
    if (affectedLines.length === 0)
      return [];
    const issues = [];
    ctx.lines.forEach((line, idx) => {
      var _a;
      if (!ctx.inScope[idx])
        return;
      const count = ((_a = line.match(BR_REG)) != null ? _a : []).length;
      if (count > 0) {
        issues.push({
          ruleId: this.id,
          path: ctx.path,
          line: idx + 1,
          raw: line,
          note: `\u8BE5\u884C\u542B ${count} \u5904 <br>\uFF1B\u672C\u6587\u4EF6\u5171 ${affectedLines.length} \u884C\u53D7\u5F71\u54CD\uFF0C\u5EFA\u8BAE\u6574\u4F53\u8FC1\u79FB`
        });
      }
    });
    return issues;
  }
};
const rules = [legacyTimeRule, dupIdRule, missingIdRule, bareBrRule];
const ruleById = Object.fromEntries(rules.map((r2) => [r2.id, r2]));
function readLines(file) {
  return file.vault.cachedRead(file).then((content) => content.split("\n"));
}
function computeScope(lines, processBelow) {
  const inScope = new Array(lines.length).fill(false);
  const tokenRe = processBelow ? new RegExp(processBelow.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")) : null;
  let active = !tokenRe;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (tokenRe && !active && tokenRe.test(line))
      active = true;
    if (active && /^#{1,} /.test(line))
      active = false;
    if (active)
      inScope[i] = true;
  }
  return inScope;
}
async function runAudit(onProgress) {
  var _a, _b;
  const app2 = appStore.getState().dailyNotesState.app;
  app2.vault;
  const dailyNotes = getAllDailyNotes_1();
  const files = Object.entries(dailyNotes).filter(([, f2]) => f2 instanceof require$$0.TFile && f2.extension === "md").map(([, f2]) => f2).sort((a, b) => b.path.localeCompare(a.path));
  const issues = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress == null ? void 0 : onProgress(i + 1, files.length);
    let lines;
    try {
      lines = await readLines(file);
    } catch {
      continue;
    }
    const ctx = { path: file.path, lines, inScope: computeScope(lines, (_a = appStore.getState().settingsState.settings.ProcessEntriesBelow) != null ? _a : "") };
    for (const rule of rules) {
      issues.push(...rule.detect(ctx));
    }
  }
  const byRule = {};
  for (const rule of rules)
    byRule[rule.id] = [];
  for (const issue of issues)
    (_b = byRule[issue.ruleId]) == null ? void 0 : _b.push(issue);
  return { issues, byRule, scannedFiles: files.length };
}
async function applyFixes(issues) {
  var _a;
  const fixable = issues.filter((i) => i.fixedLine);
  if (fixable.length === 0)
    return { applied: 0, skipped: 0, backupDir: "", changedFiles: 0 };
  const app2 = appStore.getState().dailyNotesState.app;
  const vault = app2.vault;
  const adapter = vault.adapter;
  const picked = /* @__PURE__ */ new Map();
  let skipped = 0;
  for (const issue of fixable) {
    const key = `${issue.path}#${issue.line}`;
    if (picked.has(key))
      skipped++;
    else
      picked.set(key, issue);
  }
  const pickedIssues = [...picked.values()];
  const ts = require$$0.moment().format("YYYYMMDD-HHmmss");
  const backupDir = require$$0.normalizePath(".rememo-backup/audit-" + ts);
  try {
    await adapter.mkdir(require$$0.normalizePath(".rememo-backup"));
  } catch {
  }
  await adapter.mkdir(backupDir);
  const byPath = /* @__PURE__ */ new Map();
  for (const issue of pickedIssues) {
    const list = (_a = byPath.get(issue.path)) != null ? _a : [];
    list.push(issue);
    byPath.set(issue.path, list);
  }
  let applied = 0;
  let changedFiles = 0;
  for (const [path, pathIssues] of byPath) {
    const file = vault.getAbstractFileByPath(path);
    if (!(file instanceof require$$0.TFile))
      continue;
    const lines = await readLines(file);
    const fileName = file.name;
    await adapter.write(require$$0.normalizePath(`${backupDir}/${fileName}`), lines.join("\n"));
    let changed = false;
    const handledLines = /* @__PURE__ */ new Set();
    for (const issue of pathIssues) {
      const lineIdx = issue.line - 1;
      if (lineIdx < 0 || lineIdx >= lines.length)
        continue;
      if (handledLines.has(lineIdx))
        continue;
      handledLines.add(lineIdx);
      lines[lineIdx] = issue.fixedLine;
      applied++;
      changed = true;
    }
    if (changed) {
      await vault.modify(file, lines.join("\n"));
      changedFiles++;
    }
  }
  return { applied, skipped, backupDir, changedFiles };
}
var auditDialog = "";
const IGNORED_KEY = "auditIgnoredLines";
const lineKey = (path, line) => `${path}#${line}`;
const loadIgnored = () => {
  var _a;
  return (_a = storage.get([IGNORED_KEY])[IGNORED_KEY]) != null ? _a : {};
};
const saveIgnored = (map) => storage.set({
  [IGNORED_KEY]: map
});
const SEVERITY_ORDER = {
  error: 0,
  warning: 1,
  info: 2
};
const AuditDialog = ({
  destroy
}) => {
  const [result, setResult] = react.exports.useState(null);
  const [busy, setBusy] = react.exports.useState(false);
  const [progress, setProgress] = react.exports.useState(null);
  const [ignored, setIgnored] = react.exports.useState(loadIgnored());
  const [collapsedFiles, setCollapsedFiles] = react.exports.useState({});
  const [msg, setMsg] = react.exports.useState("");
  const scan = async () => {
    var _a;
    setBusy(true);
    setMsg("");
    try {
      const res = await runAudit((done, total) => setProgress({
        done,
        total
      }));
      setResult(res);
    } catch (e) {
      setMsg(`\u626B\u63CF\u5931\u8D25\uFF1A${(_a = e == null ? void 0 : e.message) != null ? _a : e}`);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };
  react.exports.useEffect(() => {
    scan();
  }, []);
  const runFixLoop = async (pred, scopeLabel) => {
    setBusy(true);
    setMsg("");
    let appliedTotal = 0;
    try {
      for (let round2 = 0; round2 < 6; round2++) {
        const res = await runAudit();
        setResult(res);
        const targets = res.issues.filter((i) => i.fixedLine && pred(i) && !ignored[lineKey(i.path, i.line)]);
        if (targets.length === 0) {
          setMsg(appliedTotal > 0 ? `${scopeLabel}\uFF1A\u5DF2\u4FEE\u590D ${appliedTotal} \u5904 \u2705` : `${scopeLabel}\uFF1A\u6CA1\u6709\u53EF\u81EA\u52A8\u4FEE\u590D\u7684\u95EE\u9898`);
          return;
        }
        const out = await applyFixes(targets);
        appliedTotal += out.applied;
        if (out.applied === 0) {
          setMsg(`${scopeLabel}\uFF1A\u65E0\u6CD5\u7EE7\u7EED\u81EA\u52A8\u4FEE\u590D\uFF08\u5269\u4F59\u95EE\u9898\u9700\u4EBA\u5DE5/\u8FC1\u79FB\uFF09\uFF0C\u5DF2\u4FEE ${appliedTotal} \u5904`);
          return;
        }
      }
      setMsg(`${scopeLabel}\uFF1A\u5DF2\u8FBE\u4FEE\u590D\u8F6E\u6B21\u4E0A\u9650\uFF0C\u8BF7\u518D\u70B9\u4E00\u6B21\u300C\u91CD\u65B0\u4F53\u68C0\u300D\u786E\u8BA4\u5269\u4F59\u9879`);
    } finally {
      setBusy(false);
    }
    await scan();
  };
  const fixOneLine = (path, line) => runFixLoop((i) => i.path === path && i.line === line, `\u7B2C ${line} \u884C`);
  const fixAll = () => runFixLoop(() => true, "\u4E00\u952E\u4FEE\u590D");
  const toggleIgnore = (path, line) => {
    const key = lineKey(path, line);
    const next = {
      ...ignored
    };
    if (next[key])
      delete next[key];
    else
      next[key] = true;
    setIgnored(next);
    saveIgnored(next);
  };
  const openFile = async (path, line) => {
    const app2 = appStore.getState().dailyNotesState.app;
    const file = app2.vault.getAbstractFileByPath(path);
    if (file instanceof require$$0.TFile) {
      const leaf = app2.workspace.getLeaf(false);
      await leaf.openFile(file, {
        active: true,
        eState: {
          line: Math.max(line - 1, 0)
        }
      });
    }
  };
  const tree = react.exports.useMemo(() => {
    var _a;
    if (!result)
      return [];
    const byPath = /* @__PURE__ */ new Map();
    for (const issue of result.issues) {
      if (ignored[lineKey(issue.path, issue.line)])
        continue;
      let byLine = byPath.get(issue.path);
      if (!byLine) {
        byLine = /* @__PURE__ */ new Map();
        byPath.set(issue.path, byLine);
      }
      const list = (_a = byLine.get(issue.line)) != null ? _a : [];
      list.push(issue);
      byLine.set(issue.line, list);
    }
    return [...byPath.entries()].map(([path, byLine]) => ({
      path,
      lines: [...byLine.entries()].sort((a, b) => a[0] - b[0]).map(([line, issues]) => ({
        line,
        issues: issues.sort((a, b) => {
          var _a2, _b, _c, _d;
          return SEVERITY_ORDER[(_b = (_a2 = ruleById[a.ruleId]) == null ? void 0 : _a2.severity) != null ? _b : "info"] - SEVERITY_ORDER[(_d = (_c = ruleById[b.ruleId]) == null ? void 0 : _c.severity) != null ? _d : "info"] || a.ruleId.localeCompare(b.ruleId);
        })
      }))
    })).sort((a, b) => b.path.localeCompare(a.path));
  }, [result, ignored]);
  const stats = result ? {
    files: tree.length,
    lines: tree.reduce((n2, f2) => n2 + f2.lines.length, 0),
    issues: result.issues.filter((i) => !ignored[lineKey(i.path, i.line)]).length,
    fixableLines: tree.reduce((n2, f2) => n2 + f2.lines.filter((l2) => l2.issues.some((i) => i.fixedLine)).length, 0)
  } : null;
  const shortName = (path) => {
    var _a;
    return (_a = path.split("/").pop()) != null ? _a : path;
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "dialog-header-container",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "title-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1FA7A}"
        }), " \u6570\u636E\u4F53\u68C0"]
      }), /* @__PURE__ */ jsx("button", {
        className: "btn close-btn",
        onClick: destroy,
        children: "\u2715"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-content-container audit-content",
      children: [busy && /* @__PURE__ */ jsx("div", {
        className: "audit-busy",
        children: progress ? `\u626B\u63CF\u4E2D\u2026 ${progress.done}/${progress.total}` : "\u5904\u7406\u4E2D\u2026"
      }), !busy && result && /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsxs("div", {
          className: "audit-toolbar",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "audit-stats",
            children: ["\u6709\u95EE\u9898\u6587\u4EF6 ", stats == null ? void 0 : stats.files, " \xB7 memo ", stats == null ? void 0 : stats.lines, " \u6761 \xB7 \u95EE\u9898 ", stats == null ? void 0 : stats.issues, " \u4E2A", stats && stats.fixableLines > 0 ? `\uFF08\u53EF\u4FEE ${stats.fixableLines} \u6761\uFF09` : ""]
          }), /* @__PURE__ */ jsx("button", {
            className: "btn refresh-btn",
            onClick: scan,
            children: "\u91CD\u65B0\u4F53\u68C0"
          }), stats && stats.fixableLines > 0 && /* @__PURE__ */ jsxs("button", {
            className: "btn fix-all-btn",
            onClick: fixAll,
            disabled: busy,
            children: ["\u4E00\u952E\u4FEE\u590D\u5168\u90E8\uFF08", stats.fixableLines, " \u6761\uFF09"]
          })]
        }), msg && /* @__PURE__ */ jsx("div", {
          className: "audit-msg",
          children: msg
        }), tree.length === 0 ? /* @__PURE__ */ jsx("div", {
          className: "audit-empty",
          children: "\u6CA1\u53D1\u73B0\u95EE\u9898 \u{1F389}"
        }) : /* @__PURE__ */ jsx("div", {
          className: "audit-file-list",
          children: tree.map((file) => {
            const collapsed = !!collapsedFiles[file.path];
            const errCount = file.lines.reduce((n2, l2) => n2 + l2.issues.filter((i) => {
              var _a;
              return ((_a = ruleById[i.ruleId]) == null ? void 0 : _a.severity) === "error";
            }).length, 0);
            return /* @__PURE__ */ jsxs("section", {
              className: "audit-file",
              children: [/* @__PURE__ */ jsxs("header", {
                className: "audit-file-header",
                onClick: () => setCollapsedFiles({
                  ...collapsedFiles,
                  [file.path]: !collapsed
                }),
                children: [/* @__PURE__ */ jsx("span", {
                  className: "chevron",
                  children: collapsed ? "\u25B8" : "\u25BE"
                }), /* @__PURE__ */ jsx("span", {
                  className: "audit-file-name",
                  title: file.path,
                  children: shortName(file.path)
                }), errCount > 0 && /* @__PURE__ */ jsxs("span", {
                  className: "audit-file-err",
                  children: [errCount, " \u5904\u9519\u8BEF"]
                }), /* @__PURE__ */ jsxs("span", {
                  className: "audit-file-count",
                  children: [file.lines.length, " \u6761 memo"]
                })]
              }), !collapsed && /* @__PURE__ */ jsx("div", {
                className: "audit-line-list",
                children: file.lines.map(({
                  line,
                  issues
                }) => {
                  const key = lineKey(file.path, line);
                  const fixable = issues.some((i) => i.fixedLine);
                  const raw = issues[0].raw;
                  return /* @__PURE__ */ jsxs("div", {
                    className: "audit-line",
                    children: [/* @__PURE__ */ jsxs("div", {
                      className: "audit-line-head",
                      children: [/* @__PURE__ */ jsxs("span", {
                        className: "audit-line-no",
                        children: ["L", line]
                      }), /* @__PURE__ */ jsx("span", {
                        className: "audit-line-preview",
                        title: raw,
                        children: raw
                      })]
                    }), /* @__PURE__ */ jsx("div", {
                      className: "audit-line-badges",
                      children: issues.map((issue) => {
                        var _a, _b;
                        const rule = ruleById[issue.ruleId];
                        return /* @__PURE__ */ jsx("span", {
                          className: `badge badge-${(_a = rule == null ? void 0 : rule.severity) != null ? _a : "info"}`,
                          title: rule == null ? void 0 : rule.why,
                          children: (_b = rule == null ? void 0 : rule.name) != null ? _b : issue.ruleId
                        }, issue.ruleId);
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      className: "audit-line-actions",
                      children: [fixable && /* @__PURE__ */ jsx("button", {
                        className: "btn fix-one-btn",
                        onClick: () => fixOneLine(file.path, line),
                        disabled: busy,
                        children: "\u4FEE\u590D\u8FD9\u6761"
                      }), /* @__PURE__ */ jsx("button", {
                        className: "btn view-btn",
                        onClick: () => openFile(file.path, line),
                        children: "\u67E5\u770B"
                      }), /* @__PURE__ */ jsx("button", {
                        className: "btn ignore-btn",
                        onClick: () => toggleIgnore(file.path, line),
                        children: "\u5FFD\u7565"
                      })]
                    })]
                  }, key);
                })
              })]
            }, file.path);
          })
        })]
      })]
    })]
  });
};
function showAuditDialog() {
  showDialog({
    className: "audit-dialog"
  }, AuditDialog);
}
var menuBtnsPopup = "";
const MenuBtnsPopup = (props) => {
  const {
    shownStatus,
    setShownStatus
  } = props;
  const {
    app: app2
  } = dailyNotesService.getState();
  const popupElRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (shownStatus) {
      const handleClickOutside = (event) => {
        var _a;
        if (!((_a = popupElRef.current) == null ? void 0 : _a.contains(event.target))) {
          event.stopPropagation();
        }
        setShownStatus(false);
      };
      window.addEventListener("click", handleClickOutside, {
        capture: true,
        once: true
      });
    }
  }, [shownStatus]);
  const handleUploadFile = react.exports.useCallback(async (file) => {
    const {
      type
    } = file;
    if (!type.startsWith("text")) {
      return;
    }
    try {
      const image2 = await resourceService.parseHtml(file);
      return `${image2}`;
    } catch (error) {
      new require$$0.Notice(error);
    }
  }, []);
  const handleImportBtnClick = react.exports.useCallback(() => {
    const inputEl = document.createElement("input");
    document.body.appendChild(inputEl);
    inputEl.type = "file";
    inputEl.multiple = false;
    inputEl.accept = "text/html";
    inputEl.onchange = async () => {
      if (!inputEl.files || inputEl.files.length === 0) {
        return;
      }
      const file = inputEl.files[0];
      await handleUploadFile(file);
      document.body.removeChild(inputEl);
    };
    inputEl.click();
  }, []);
  const handleMyAccountBtnClick = () => {
    app2.setting.open();
    app2.setting.openTabById("obsidian-memos");
  };
  const handleMemosTrashBtnClick = () => {
    locationService.pushHistory("/recycle");
  };
  const handleAboutBtnClick = () => {
    showAboutSiteDialog();
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `menu-btns-popup ${shownStatus ? "" : "hidden"}`,
    ref: popupElRef,
    children: [/* @__PURE__ */ jsxs("button", {
      className: "btn action-btn",
      onClick: handleMyAccountBtnClick,
      children: [/* @__PURE__ */ jsx("span", {
        className: "icon",
        children: "\u{1F464}"
      }), " ", t$1("Settings")]
    }), /* @__PURE__ */ jsxs("button", {
      className: "btn action-btn",
      onClick: handleMemosTrashBtnClick,
      children: [/* @__PURE__ */ jsx("span", {
        className: "icon",
        children: "\u{1F5D1}\uFE0F"
      }), " ", t$1("Recycle bin")]
    }), /* @__PURE__ */ jsxs("button", {
      className: "btn action-btn",
      onClick: showAuditDialog,
      children: [/* @__PURE__ */ jsx("span", {
        className: "icon",
        children: "\u{1FA7A}"
      }), " ", t$1("Audit data")]
    }), /* @__PURE__ */ jsxs("button", {
      className: "btn action-btn",
      onClick: handleImportBtnClick,
      children: [/* @__PURE__ */ jsx("span", {
        className: "icon",
        children: "\u{1F4C2}"
      }), " ", t$1("Import")]
    }), /* @__PURE__ */ jsxs("button", {
      className: "btn action-btn",
      onClick: handleAboutBtnClick,
      children: [/* @__PURE__ */ jsx("span", {
        className: "icon",
        children: "\u{1F920}"
      }), " ", t$1("About Me")]
    })]
  });
};
const cachedResourceMap = /* @__PURE__ */ new Map();
const convertResourceToDataURL = async (url, useCache = true) => {
  const { vault } = dailyNotesService.getState().app;
  if (useCache && cachedResourceMap.has(url)) {
    return Promise.resolve(cachedResourceMap.get(url));
  }
  if (!/(http|https)/g.test(url)) {
    if (await vault.adapter.exists(url)) {
      const buffer = await vault.adapter.readBinary(url);
      const arr = new Uint8Array(buffer);
      const blob = new Blob([arr], { type: "image/png" });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result;
          cachedResourceMap.set(url, base64Url);
          resolve(base64Url);
        };
        reader.readAsDataURL(blob);
      });
    }
  } else {
    try {
      const buffer = (await downloadFile(url)).buffer;
      const blob = new Blob([buffer], { type: "image/png" });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result;
          cachedResourceMap.set(url, base64Url);
          resolve(base64Url);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log("error in grabReleaseFileFromRepository", URL, error);
    }
  }
};
const downloadFile = async (url) => {
  const response = await fetch(url, {
    mode: "no-cors"
  });
  if (response.status !== 200) {
    return {
      ok: false,
      msg: response.statusText
    };
  }
  const buffer = await response.arrayBuffer();
  try {
    return {
      ok: true,
      msg: "ok",
      buffer
    };
  } catch (err) {
    return {
      ok: false,
      msg: err
    };
  }
};
const getCloneStyledElement = async (element) => {
  const clonedElementContainer = document.createElement(element.tagName);
  clonedElementContainer.innerHTML = element.innerHTML;
  const applyStyles2 = async (sourceElement, clonedElement) => {
    var _a;
    if (!sourceElement || !clonedElement) {
      return;
    }
    const sourceStyles = window.getComputedStyle(sourceElement);
    if (sourceElement.tagName === "IMG") {
      try {
        const url = await convertResourceToDataURL(
          (_a = sourceElement.getAttribute("path")) != null ? _a : sourceElement.getAttribute("src")
        );
        clonedElement.src = url;
      } catch (error) {
      }
    } else if (sourceElement.className === "property-image") {
      try {
        const imageUrl = sourceElement.style.backgroundImage;
        const url = await convertResourceToDataURL(imageUrl);
        clonedElement.style.backgroundImage = url;
      } catch (error) {
      }
    }
    for (const item of sourceStyles) {
      clonedElement.style.setProperty(
        item,
        sourceStyles.getPropertyValue(item),
        sourceStyles.getPropertyPriority(item)
      );
    }
    for (let i = 0; i < clonedElement.childElementCount; i++) {
      await applyStyles2(sourceElement.children[i], clonedElement.children[i]);
    }
  };
  await applyStyles2(element, clonedElementContainer);
  return clonedElementContainer;
};
const getFontsStyleElement = async (element) => {
  const styleSheets = element.ownerDocument.styleSheets;
  const fontFamilyStyles = [];
  for (const sheet of styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.constructor.name === "CSSFontFaceRule") {
        fontFamilyStyles.push(rule.style);
      }
    }
  }
  const styleElement = document.createElement("style");
  return styleElement;
};
const getElementSize = (element) => {
  const { width, height } = window.getComputedStyle(element);
  return {
    width: parseInt(width.replace("px", "")),
    height: parseInt(height.replace("px", ""))
  };
};
const convertSVGToDataURL = (svg) => {
  const xml = new XMLSerializer().serializeToString(svg);
  const url = encodeURIComponent(xml);
  return `data:image/svg+xml;charset=utf-8,${url}`;
};
const generateSVGElement = (width, height, element) => {
  const xmlNS = "http://www.w3.org/2000/svg";
  const svgElement = document.createElementNS(xmlNS, "svg");
  svgElement.setAttribute("width", `${width}`);
  svgElement.setAttribute("height", `${height}`);
  svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const foreignObject = document.createElementNS(xmlNS, "foreignObject");
  foreignObject.setAttribute("width", "100%");
  foreignObject.setAttribute("height", "100%");
  foreignObject.setAttribute("x", "0");
  foreignObject.setAttribute("y", "0");
  foreignObject.setAttribute("externalResourcesRequired", "true");
  foreignObject.appendChild(element);
  svgElement.appendChild(foreignObject);
  return svgElement;
};
const toSVG = async (element, options) => {
  const { width, height } = getElementSize(element);
  const clonedElement = await getCloneStyledElement(element);
  if (options == null ? void 0 : options.backgroundColor) {
    clonedElement.style.backgroundColor = options.backgroundColor;
  }
  const svg = generateSVGElement(width, height, clonedElement);
  svg.prepend(await getFontsStyleElement(element));
  const url = convertSVGToDataURL(svg);
  return url;
};
const toCanvas = async (element, options) => {
  const url = await toSVG(element, options);
  const imageEl = new Image();
  imageEl.src = url;
  const ratio = (options == null ? void 0 : options.pixelRatio) || 1;
  const { width, height } = getElementSize(element);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return Promise.reject("Canvas error");
  }
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}`;
  canvas.style.height = `${height}`;
  if ((options == null ? void 0 : options.backgroundColor) || document.body.className.contains("theme-dark")) {
    context.fillStyle = options.backgroundColor || "#1f1f1f";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  return new Promise((resolve) => {
    imageEl.onload = () => {
      context.drawImage(imageEl, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    };
  });
};
const toImage = async (element, options) => {
  const canvas = await toCanvas(element, options);
  return canvas.toDataURL();
};
function useToggle(initialState = false) {
  const [state, setState] = react.exports.useState(initialState);
  const toggle = react.exports.useCallback((nextState) => {
    if (nextState !== void 0) {
      setState(nextState);
    } else {
      setState((state2) => !state2);
    }
  }, []);
  return [state, toggle];
}
function useLoading(initialState = true) {
  const [state, setState] = react.exports.useState({ isLoading: initialState, isFailed: false, isSucceed: false });
  return {
    ...state,
    setLoading: () => {
      setState({
        ...state,
        isLoading: true,
        isFailed: false,
        isSucceed: false
      });
    },
    setFinish: () => {
      setState({
        ...state,
        isLoading: false,
        isFailed: false,
        isSucceed: true
      });
    },
    setError: () => {
      setState({
        ...state,
        isLoading: false,
        isFailed: true,
        isSucceed: false
      });
    }
  };
}
const MODULE_CAROUSEL = "carousel";
const MODULE_CONTROLLER = "controller";
const MODULE_NAVIGATION = "navigation";
const MODULE_NO_SCROLL = "no-scroll";
const MODULE_PORTAL = "portal";
const MODULE_ROOT = "root";
const MODULE_TOOLBAR = "toolbar";
const PLUGIN_ZOOM = "zoom";
const SLIDE_STATUS_LOADING = "loading";
const SLIDE_STATUS_ERROR = "error";
const SLIDE_STATUS_COMPLETE = "complete";
const SLIDE_STATUS_PLACEHOLDER = "placeholder";
const activeSlideStatus = (status) => `active-slide-${status}`;
const CLASS_FULLSIZE = "fullsize";
const CLASS_FLEX_CENTER = "flex_center";
const CLASS_NO_SCROLL = "no_scroll";
const CLASS_NO_SCROLL_PADDING = "no_scroll_padding";
const CLASS_SLIDE_WRAPPER = "slide_wrapper";
const CLASS_SLIDE_WRAPPER_INTERACTIVE = "slide_wrapper_interactive";
const ACTION_PREV = "prev";
const ACTION_NEXT = "next";
const ACTION_SWIPE = "swipe";
const ACTION_CLOSE = "close";
const EVENT_ON_POINTER_DOWN = "onPointerDown";
const EVENT_ON_POINTER_MOVE = "onPointerMove";
const EVENT_ON_POINTER_UP = "onPointerUp";
const EVENT_ON_POINTER_LEAVE = "onPointerLeave";
const EVENT_ON_POINTER_CANCEL = "onPointerCancel";
const EVENT_ON_KEY_DOWN = "onKeyDown";
const EVENT_ON_KEY_UP = "onKeyUp";
const EVENT_ON_WHEEL = "onWheel";
const VK_ESCAPE = "Escape";
const VK_ARROW_LEFT = "ArrowLeft";
const VK_ARROW_RIGHT = "ArrowRight";
const ELEMENT_BUTTON = "button";
const ELEMENT_ICON = "icon";
const IMAGE_FIT_CONTAIN = "contain";
const IMAGE_FIT_COVER = "cover";
const UNKNOWN_ACTION_TYPE = "Unknown action type";
const cssPrefix$3 = "yarl__";
function clsx(...classes) {
  return [...classes].filter(Boolean).join(" ");
}
function cssClass(name) {
  return `${cssPrefix$3}${name}`;
}
function cssVar(name) {
  return `--${cssPrefix$3}${name}`;
}
function composePrefix(base, prefix) {
  return `${base}${prefix ? `_${prefix}` : ""}`;
}
function makeComposePrefix(base) {
  return (prefix) => composePrefix(base, prefix);
}
function label(labels, defaultLabel) {
  var _a;
  return (_a = labels === null || labels === void 0 ? void 0 : labels[defaultLabel]) !== null && _a !== void 0 ? _a : defaultLabel;
}
function cleanup(...cleaners) {
  return () => {
    cleaners.forEach((cleaner) => {
      cleaner();
    });
  };
}
function makeUseContext(name, contextName, context) {
  return () => {
    const ctx = react.exports.useContext(context);
    if (!ctx) {
      throw new Error(`${name} must be used within a ${contextName}.Provider`);
    }
    return ctx;
  };
}
function hasWindow() {
  return typeof window !== "undefined";
}
function round$1(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
function isImageSlide(slide) {
  return slide.type === void 0 || slide.type === "image";
}
function isImageFitCover(image2, imageFit) {
  return image2.imageFit === IMAGE_FIT_COVER || image2.imageFit !== IMAGE_FIT_CONTAIN && imageFit === IMAGE_FIT_COVER;
}
function parseInt$1(value) {
  return typeof value === "string" ? Number.parseInt(value, 10) : value;
}
function parseLengthPercentage(input) {
  if (typeof input === "number") {
    return { pixel: input };
  }
  if (typeof input === "string") {
    const value = parseInt$1(input);
    return input.endsWith("%") ? { percent: value } : { pixel: value };
  }
  return { pixel: 0 };
}
function computeSlideRect(containerRect, padding) {
  const paddingValue = parseLengthPercentage(padding);
  const paddingPixels = paddingValue.percent !== void 0 ? containerRect.width / 100 * paddingValue.percent : paddingValue.pixel;
  return {
    width: Math.max(containerRect.width - 2 * paddingPixels, 0),
    height: Math.max(containerRect.height - 2 * paddingPixels, 0)
  };
}
function devicePixelRatio() {
  return (hasWindow() ? window === null || window === void 0 ? void 0 : window.devicePixelRatio : void 0) || 1;
}
function getSlideIndex(index, slidesCount) {
  return slidesCount > 0 ? (index % slidesCount + slidesCount) % slidesCount : 0;
}
function hasSlides(slides) {
  return slides.length > 0;
}
function getSlide(slides, index) {
  return slides[getSlideIndex(index, slides.length)];
}
function getSlideIfPresent(slides, index) {
  return hasSlides(slides) ? getSlide(slides, index) : void 0;
}
function getSlideKey(slide) {
  return isImageSlide(slide) ? slide.src : void 0;
}
function addToolbarButton(toolbar, key, button) {
  if (!button)
    return toolbar;
  const { buttons, ...restToolbar } = toolbar;
  const index = buttons.findIndex((item) => item === key);
  const buttonWithKey = react.exports.isValidElement(button) ? react.exports.cloneElement(button, { key }, null) : button;
  if (index >= 0) {
    const result = [...buttons];
    result.splice(index, 1, buttonWithKey);
    return { buttons: result, ...restToolbar };
  }
  return { buttons: [buttonWithKey, ...buttons], ...restToolbar };
}
function calculatePreload(carousel, slides, minimum = 0) {
  return Math.min(carousel.preload, Math.max(carousel.finite ? slides.length - 1 : Math.floor(slides.length / 2), minimum));
}
const isReact19 = Number(react.exports.version.split(".")[0]) >= 19;
function makeInertWhen(condition) {
  const legacyValue = condition ? "" : void 0;
  return { inert: isReact19 ? condition : legacyValue };
}
const LightboxDefaultProps = {
  open: false,
  close: () => {
  },
  index: 0,
  slides: [],
  render: {},
  plugins: [],
  toolbar: { buttons: [ACTION_CLOSE] },
  labels: {},
  animation: {
    fade: 250,
    swipe: 500,
    easing: {
      fade: "ease",
      swipe: "ease-out",
      navigation: "ease-in-out"
    }
  },
  carousel: {
    finite: false,
    preload: 2,
    padding: "16px",
    spacing: "30%",
    imageFit: IMAGE_FIT_CONTAIN,
    imageProps: {}
  },
  controller: {
    ref: null,
    focus: true,
    aria: false,
    touchAction: "none",
    closeOnPullUp: false,
    closeOnPullDown: false,
    closeOnBackdropClick: false,
    preventDefaultWheelX: true,
    preventDefaultWheelY: false
  },
  portal: {},
  noScroll: {
    disabled: false
  },
  on: {},
  styles: {},
  className: ""
};
function createModule(name, component) {
  return { name, component };
}
function createNode(module2, children) {
  return { module: module2, children };
}
function traverseNode(node, target, apply) {
  if (node.module.name === target) {
    return apply(node);
  }
  if (node.children) {
    return [
      createNode(node.module, node.children.flatMap((n2) => {
        var _a;
        return (_a = traverseNode(n2, target, apply)) !== null && _a !== void 0 ? _a : [];
      }))
    ];
  }
  return [node];
}
function traverse(nodes, target, apply) {
  return nodes.flatMap((node) => {
    var _a;
    return (_a = traverseNode(node, target, apply)) !== null && _a !== void 0 ? _a : [];
  });
}
function withPlugins(root, plugins = [], augmentations = []) {
  let config = root;
  const contains2 = (target) => {
    const nodes = [...config];
    while (nodes.length > 0) {
      const node = nodes.pop();
      if ((node === null || node === void 0 ? void 0 : node.module.name) === target)
        return true;
      if (node === null || node === void 0 ? void 0 : node.children)
        nodes.push(...node.children);
    }
    return false;
  };
  const addParent = (target, module2) => {
    if (target === "") {
      config = [createNode(module2, config)];
      return;
    }
    config = traverse(config, target, (node) => [createNode(module2, [node])]);
  };
  const append = (target, module2) => {
    config = traverse(config, target, (node) => [createNode(node.module, [createNode(module2, node.children)])]);
  };
  const addChild = (target, module2, precede) => {
    config = traverse(config, target, (node) => {
      var _a;
      return [
        createNode(node.module, [
          ...precede ? [createNode(module2)] : [],
          ...(_a = node.children) !== null && _a !== void 0 ? _a : [],
          ...!precede ? [createNode(module2)] : []
        ])
      ];
    });
  };
  const addSibling = (target, module2, precede) => {
    config = traverse(config, target, (node) => [
      ...precede ? [createNode(module2)] : [],
      node,
      ...!precede ? [createNode(module2)] : []
    ]);
  };
  const addModule = (module2) => {
    append(MODULE_CONTROLLER, module2);
  };
  const replace = (target, module2) => {
    config = traverse(config, target, (node) => [createNode(module2, node.children)]);
  };
  const remove = (target) => {
    config = traverse(config, target, (node) => node.children);
  };
  const augment = (augmentation) => {
    augmentations.push(augmentation);
  };
  plugins.forEach((plugin) => {
    plugin({
      contains: contains2,
      addParent,
      append,
      addChild,
      addSibling,
      addModule,
      replace,
      remove,
      augment
    });
  });
  return {
    config,
    augmentation: (props) => augmentations.reduce((acc, augmentation) => augmentation(acc), props)
  };
}
const DocumentContext = react.exports.createContext(null);
const useDocumentContext = makeUseContext("useDocument", "DocumentContext", DocumentContext);
function DocumentContextProvider({ nodeRef, children }) {
  const context = react.exports.useMemo(() => {
    const getOwnerDocument = (node) => {
      var _a;
      return ((_a = node || nodeRef.current) === null || _a === void 0 ? void 0 : _a.ownerDocument) || document;
    };
    const getOwnerWindow = (node) => {
      var _a;
      return ((_a = getOwnerDocument(node)) === null || _a === void 0 ? void 0 : _a.defaultView) || window;
    };
    return { getOwnerDocument, getOwnerWindow };
  }, [nodeRef]);
  return react.exports.createElement(DocumentContext.Provider, { value: context }, children);
}
const EventsContext = react.exports.createContext(null);
const useEvents = makeUseContext("useEvents", "EventsContext", EventsContext);
function EventsProvider({ children }) {
  const [subscriptions] = react.exports.useState({});
  react.exports.useEffect(() => () => {
    Object.keys(subscriptions).forEach((topic) => delete subscriptions[topic]);
  }, [subscriptions]);
  const context = react.exports.useMemo(() => {
    const unsubscribe = (topic, callback) => {
      var _a;
      (_a = subscriptions[topic]) === null || _a === void 0 ? void 0 : _a.splice(0, subscriptions[topic].length, ...subscriptions[topic].filter((cb2) => cb2 !== callback));
    };
    const subscribe = (topic, callback) => {
      if (!subscriptions[topic]) {
        subscriptions[topic] = [];
      }
      subscriptions[topic].push(callback);
      return () => unsubscribe(topic, callback);
    };
    const publish = (...[topic, event]) => {
      var _a;
      (_a = subscriptions[topic]) === null || _a === void 0 ? void 0 : _a.forEach((callback) => callback(event));
    };
    return { publish, subscribe, unsubscribe };
  }, [subscriptions]);
  return react.exports.createElement(EventsContext.Provider, { value: context }, children);
}
const LightboxPropsContext = react.exports.createContext(null);
const useLightboxProps = makeUseContext("useLightboxProps", "LightboxPropsContext", LightboxPropsContext);
function LightboxPropsProvider({ children, ...props }) {
  return react.exports.createElement(LightboxPropsContext.Provider, { value: props }, children);
}
const LightboxStateContext = react.exports.createContext(null);
const useLightboxState = makeUseContext("useLightboxState", "LightboxStateContext", LightboxStateContext);
const LightboxDispatchContext = react.exports.createContext(null);
const useLightboxDispatch = makeUseContext("useLightboxDispatch", "LightboxDispatchContext", LightboxDispatchContext);
function reducer$1(state, action) {
  switch (action.type) {
    case "swipe": {
      const { slides } = state;
      const increment = (action === null || action === void 0 ? void 0 : action.increment) || 0;
      const globalIndex = state.globalIndex + increment;
      const currentIndex = getSlideIndex(globalIndex, slides.length);
      const currentSlide = getSlideIfPresent(slides, currentIndex);
      const animation = increment || action.duration ? {
        increment,
        duration: action.duration,
        easing: action.easing
      } : void 0;
      return { slides, currentIndex, globalIndex, currentSlide, animation };
    }
    case "update":
      if (action.slides !== state.slides || action.index !== state.currentIndex) {
        return {
          slides: action.slides,
          currentIndex: action.index,
          globalIndex: action.index,
          currentSlide: getSlideIfPresent(action.slides, action.index)
        };
      }
      return state;
    default:
      throw new Error(UNKNOWN_ACTION_TYPE);
  }
}
function LightboxStateProvider({ slides, index, children }) {
  const [state, dispatch] = react.exports.useReducer(reducer$1, {
    slides,
    currentIndex: index,
    globalIndex: index,
    currentSlide: getSlideIfPresent(slides, index)
  });
  react.exports.useEffect(() => {
    dispatch({ type: "update", slides, index });
  }, [slides, index]);
  const context = react.exports.useMemo(() => ({ ...state, state, dispatch }), [state, dispatch]);
  return react.exports.createElement(
    LightboxDispatchContext.Provider,
    { value: dispatch },
    react.exports.createElement(LightboxStateContext.Provider, { value: context }, children)
  );
}
const TimeoutsContext = react.exports.createContext(null);
const useTimeouts = makeUseContext("useTimeouts", "TimeoutsContext", TimeoutsContext);
function TimeoutsProvider({ children }) {
  const [timeouts] = react.exports.useState([]);
  react.exports.useEffect(() => () => {
    timeouts.forEach((tid) => window.clearTimeout(tid));
    timeouts.splice(0, timeouts.length);
  }, [timeouts]);
  const context = react.exports.useMemo(() => {
    const removeTimeout = (id2) => {
      timeouts.splice(0, timeouts.length, ...timeouts.filter((tid) => tid !== id2));
    };
    const setTimeout2 = (fn2, delay) => {
      const id2 = window.setTimeout(() => {
        removeTimeout(id2);
        fn2();
      }, delay);
      timeouts.push(id2);
      return id2;
    };
    const clearTimeout2 = (id2) => {
      if (id2 !== void 0) {
        removeTimeout(id2);
        window.clearTimeout(id2);
      }
    };
    return { setTimeout: setTimeout2, clearTimeout: clearTimeout2 };
  }, [timeouts]);
  return react.exports.createElement(TimeoutsContext.Provider, { value: context }, children);
}
const IconButton = react.exports.forwardRef(function IconButton2({ label: label$1, className, icon: Icon, renderIcon, onClick, style, ...rest }, ref) {
  const { styles: styles2, labels } = useLightboxProps();
  const buttonLabel = label(labels, label$1);
  return react.exports.createElement("button", { ref, type: "button", title: buttonLabel, "aria-label": buttonLabel, className: clsx(cssClass(ELEMENT_BUTTON), className), onClick, style: { ...style, ...styles2.button }, ...rest }, renderIcon ? renderIcon() : react.exports.createElement(Icon, { className: cssClass(ELEMENT_ICON), style: styles2.icon }));
});
function svgIcon(name, children) {
  const icon = (props) => react.exports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24", "aria-hidden": "true", focusable: "false", ...props }, children);
  icon.displayName = name;
  return icon;
}
function createIcon(name, glyph) {
  return svgIcon(name, react.exports.createElement(
    "g",
    { fill: "currentColor" },
    react.exports.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
    glyph
  ));
}
const CloseIcon = createIcon("Close", react.exports.createElement("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }));
const PreviousIcon = createIcon("Previous", react.exports.createElement("path", { d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" }));
const NextIcon = createIcon("Next", react.exports.createElement("path", { d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" }));
const LoadingIcon = createIcon("Loading", react.exports.createElement(react.exports.Fragment, null, Array.from({ length: 8 }).map((_, index, array) => react.exports.createElement("line", { key: index, x1: "12", y1: "6.5", x2: "12", y2: "1.8", strokeLinecap: "round", strokeWidth: "2.6", stroke: "currentColor", strokeOpacity: 1 / array.length * (index + 1), transform: `rotate(${360 / array.length * index}, 12, 12)` }))));
const ErrorIcon = createIcon("Error", react.exports.createElement("path", { d: "M21.9,21.9l-8.49-8.49l0,0L3.59,3.59l0,0L2.1,2.1L0.69,3.51L3,5.83V19c0,1.1,0.9,2,2,2h13.17l2.31,2.31L21.9,21.9z M5,18 l3.5-4.5l2.5,3.01L12.17,15l3,3H5z M21,18.17L5.83,3H19c1.1,0,2,0.9,2,2V18.17z" }));
const useLayoutEffect = hasWindow() ? react.exports.useLayoutEffect : react.exports.useEffect;
function useMotionPreference() {
  const [reduceMotion, setReduceMotion] = react.exports.useState(false);
  react.exports.useEffect(() => {
    var _a, _b;
    const mediaQuery = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.matches);
    const listener = (event) => setReduceMotion(event.matches);
    (_b = mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.addEventListener) === null || _b === void 0 ? void 0 : _b.call(mediaQuery, "change", listener);
    return () => {
      var _a2;
      return (_a2 = mediaQuery === null || mediaQuery === void 0 ? void 0 : mediaQuery.removeEventListener) === null || _a2 === void 0 ? void 0 : _a2.call(mediaQuery, "change", listener);
    };
  }, []);
  return reduceMotion;
}
function currentTransformation(node) {
  let x2 = 0;
  let y2 = 0;
  let z2 = 0;
  const matrix = window.getComputedStyle(node).transform;
  const matcher = matrix.match(/matrix.*\((.+)\)/);
  if (matcher) {
    const values = matcher[1].split(",").map(parseInt$1);
    if (values.length === 6) {
      x2 = values[4];
      y2 = values[5];
    } else if (values.length === 16) {
      x2 = values[12];
      y2 = values[13];
      z2 = values[14];
    }
  }
  return { x: x2, y: y2, z: z2 };
}
function useAnimation(nodeRef, computeAnimation) {
  const snapshot = react.exports.useRef();
  const animation = react.exports.useRef();
  const reduceMotion = useMotionPreference();
  useLayoutEffect(() => {
    var _a, _b, _c;
    if (nodeRef.current && snapshot.current !== void 0 && !reduceMotion) {
      const { keyframes, duration, easing, onfinish } = computeAnimation(snapshot.current, nodeRef.current.getBoundingClientRect(), currentTransformation(nodeRef.current)) || {};
      if (keyframes && duration) {
        (_a = animation.current) === null || _a === void 0 ? void 0 : _a.cancel();
        animation.current = void 0;
        try {
          animation.current = (_c = (_b = nodeRef.current).animate) === null || _c === void 0 ? void 0 : _c.call(_b, keyframes, { duration, easing });
        } catch (err) {
          console.error(err);
        }
        if (animation.current) {
          animation.current.onfinish = () => {
            animation.current = void 0;
            onfinish === null || onfinish === void 0 ? void 0 : onfinish();
          };
        }
      }
    }
    snapshot.current = void 0;
  });
  return {
    prepareAnimation: (currentSnapshot) => {
      snapshot.current = currentSnapshot;
    },
    isAnimationPlaying: () => {
      var _a;
      return ((_a = animation.current) === null || _a === void 0 ? void 0 : _a.playState) === "running";
    }
  };
}
function useContainerRect() {
  const containerRef = react.exports.useRef(null);
  const observerRef = react.exports.useRef();
  const [containerRect, setContainerRect] = react.exports.useState();
  const setContainerRef = react.exports.useCallback((node) => {
    containerRef.current = node;
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = void 0;
    }
    const updateContainerRect = () => {
      if (node) {
        const styles2 = window.getComputedStyle(node);
        const parse = (value) => parseFloat(value) || 0;
        setContainerRect({
          width: Math.round(node.clientWidth - parse(styles2.paddingLeft) - parse(styles2.paddingRight)),
          height: Math.round(node.clientHeight - parse(styles2.paddingTop) - parse(styles2.paddingBottom))
        });
      } else {
        setContainerRect(void 0);
      }
    };
    updateContainerRect();
    if (node && typeof ResizeObserver !== "undefined") {
      observerRef.current = new ResizeObserver(updateContainerRect);
      observerRef.current.observe(node);
    }
  }, []);
  return { setContainerRef, containerRef, containerRect };
}
function useDelay() {
  const timeoutId = react.exports.useRef();
  const { setTimeout: setTimeout2, clearTimeout: clearTimeout2 } = useTimeouts();
  return react.exports.useCallback((callback, delay) => {
    clearTimeout2(timeoutId.current);
    timeoutId.current = setTimeout2(callback, delay > 0 ? delay : 0);
  }, [setTimeout2, clearTimeout2]);
}
function useEventCallback(fn2) {
  const ref = react.exports.useRef(fn2);
  useLayoutEffect(() => {
    ref.current = fn2;
  });
  return react.exports.useCallback((...args) => {
    var _a;
    return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref, ...args);
  }, []);
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function useForkRef(refA, refB) {
  return react.exports.useMemo(() => refA == null && refB == null ? null : (refValue) => {
    setRef(refA, refValue);
    setRef(refB, refValue);
  }, [refA, refB]);
}
function useLoseFocus(focus, disabled = false) {
  const focused = react.exports.useRef();
  useLayoutEffect(() => {
    if (disabled && focused.current) {
      focused.current = false;
      focus();
    }
  }, [disabled, focus]);
  const onFocus = react.exports.useCallback(() => {
    focused.current = true;
  }, []);
  const onBlur = react.exports.useCallback(() => {
    focused.current = false;
  }, []);
  return { onFocus, onBlur };
}
function useRTL() {
  const [isRTL, setIsRTL] = react.exports.useState(false);
  useLayoutEffect(() => {
    setIsRTL(window.getComputedStyle(window.document.documentElement).direction === "rtl");
  }, []);
  return isRTL;
}
function useSensors() {
  const [subscribers] = react.exports.useState({});
  const notifySubscribers = react.exports.useCallback((type, event) => {
    var _a;
    (_a = subscribers[type]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => {
      if (!event.isPropagationStopped())
        listener(event);
    });
  }, [subscribers]);
  const registerSensors = react.exports.useMemo(() => ({
    onPointerDown: (event) => notifySubscribers(EVENT_ON_POINTER_DOWN, event),
    onPointerMove: (event) => notifySubscribers(EVENT_ON_POINTER_MOVE, event),
    onPointerUp: (event) => notifySubscribers(EVENT_ON_POINTER_UP, event),
    onPointerLeave: (event) => notifySubscribers(EVENT_ON_POINTER_LEAVE, event),
    onPointerCancel: (event) => notifySubscribers(EVENT_ON_POINTER_CANCEL, event),
    onKeyDown: (event) => notifySubscribers(EVENT_ON_KEY_DOWN, event),
    onKeyUp: (event) => notifySubscribers(EVENT_ON_KEY_UP, event),
    onWheel: (event) => notifySubscribers(EVENT_ON_WHEEL, event)
  }), [notifySubscribers]);
  const subscribeSensors = react.exports.useCallback((type, callback) => {
    if (!subscribers[type]) {
      subscribers[type] = [];
    }
    subscribers[type].unshift(callback);
    return () => {
      const listeners = subscribers[type];
      if (listeners) {
        listeners.splice(0, listeners.length, ...listeners.filter((el) => el !== callback));
      }
    };
  }, [subscribers]);
  return { registerSensors, subscribeSensors };
}
function useThrottle(callback, delay) {
  const lastCallbackTime = react.exports.useRef(0);
  const delayCallback = useDelay();
  const executeCallback = useEventCallback((...args) => {
    lastCallbackTime.current = Date.now();
    callback(args);
  });
  return react.exports.useCallback((...args) => {
    delayCallback(() => {
      executeCallback(args);
    }, delay - (Date.now() - lastCallbackTime.current));
  }, [delay, executeCallback, delayCallback]);
}
const slidePrefix = makeComposePrefix("slide");
const slideImagePrefix = makeComposePrefix("slide_image");
function ImageSlide({ slide: image2, offset: offset2, render, rect, imageFit, imageProps, onClick, onLoad, onError, style }) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [status, setStatus] = react.exports.useState(SLIDE_STATUS_LOADING);
  const { publish } = useEvents();
  const { setTimeout: setTimeout2 } = useTimeouts();
  const imageRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (offset2 === 0) {
      publish(activeSlideStatus(status));
    }
  }, [offset2, status, publish]);
  const handleLoading = useEventCallback((img) => {
    ("decode" in img ? img.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (!img.parentNode) {
        return;
      }
      setStatus(SLIDE_STATUS_COMPLETE);
      setTimeout2(() => {
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(img);
      }, 0);
    });
  });
  const setImageRef = react.exports.useCallback((img) => {
    imageRef.current = img;
    if (img === null || img === void 0 ? void 0 : img.complete) {
      handleLoading(img);
    }
  }, [handleLoading]);
  const handleOnLoad = react.exports.useCallback((event) => {
    handleLoading(event.currentTarget);
  }, [handleLoading]);
  const handleOnError = useEventCallback(() => {
    setStatus(SLIDE_STATUS_ERROR);
    onError === null || onError === void 0 ? void 0 : onError();
  });
  const cover = isImageFitCover(image2, imageFit);
  const nonInfinite = (value, fallback) => Number.isFinite(value) ? value : fallback;
  const maxWidth = nonInfinite(Math.max(...((_b = (_a = image2.srcSet) === null || _a === void 0 ? void 0 : _a.map((x2) => x2.width)) !== null && _b !== void 0 ? _b : []).concat(image2.width ? [image2.width] : []).filter(Boolean)), ((_c = imageRef.current) === null || _c === void 0 ? void 0 : _c.naturalWidth) || 0);
  const maxHeight = nonInfinite(Math.max(...((_e = (_d = image2.srcSet) === null || _d === void 0 ? void 0 : _d.map((x2) => x2.height)) !== null && _e !== void 0 ? _e : []).concat(image2.height ? [image2.height] : []).filter(Boolean)), ((_f = imageRef.current) === null || _f === void 0 ? void 0 : _f.naturalHeight) || 0);
  const defaultStyle = maxWidth && maxHeight ? {
    maxWidth: `min(${maxWidth}px, 100%)`,
    maxHeight: `min(${maxHeight}px, 100%)`
  } : {
    maxWidth: "100%",
    maxHeight: "100%"
  };
  const srcSet = (_g = image2.srcSet) === null || _g === void 0 ? void 0 : _g.sort((a, b) => a.width - b.width).map((item) => `${item.src} ${item.width}w`).join(", ");
  const estimateActualWidth = () => rect && !cover && image2.width && image2.height ? rect.height / image2.height * image2.width : Number.MAX_VALUE;
  const sizes = srcSet && rect && hasWindow() ? `${Math.round(Math.min(estimateActualWidth(), rect.width))}px` : void 0;
  const { style: imagePropsStyle, className: imagePropsClassName, ...restImageProps } = imageProps || {};
  return react.exports.createElement(
    react.exports.Fragment,
    null,
    react.exports.createElement("img", { ref: setImageRef, onLoad: handleOnLoad, onError: handleOnError, onClick, draggable: false, className: clsx(cssClass(slideImagePrefix()), cover && cssClass(slideImagePrefix("cover")), status !== SLIDE_STATUS_COMPLETE && cssClass(slideImagePrefix("loading")), imagePropsClassName), style: { ...defaultStyle, ...style, ...imagePropsStyle }, ...restImageProps, alt: image2.alt, sizes, srcSet, src: image2.src }),
    status !== SLIDE_STATUS_COMPLETE && react.exports.createElement(
      "div",
      { className: cssClass(slidePrefix(SLIDE_STATUS_PLACEHOLDER)) },
      status === SLIDE_STATUS_LOADING && ((render === null || render === void 0 ? void 0 : render.iconLoading) ? render.iconLoading() : react.exports.createElement(LoadingIcon, { className: clsx(cssClass(ELEMENT_ICON), cssClass(slidePrefix(SLIDE_STATUS_LOADING))) })),
      status === SLIDE_STATUS_ERROR && ((render === null || render === void 0 ? void 0 : render.iconError) ? render.iconError() : react.exports.createElement(ErrorIcon, { className: clsx(cssClass(ELEMENT_ICON), cssClass(slidePrefix(SLIDE_STATUS_ERROR))) }))
    )
  );
}
const LightboxRoot = react.exports.forwardRef(function LightboxRoot2({ className, children, ...rest }, ref) {
  const nodeRef = react.exports.useRef(null);
  return react.exports.createElement(
    DocumentContextProvider,
    { nodeRef },
    react.exports.createElement("div", { ref: useForkRef(ref, nodeRef), className: clsx(cssClass("root"), className), ...rest }, children)
  );
});
var SwipeState;
(function(SwipeState2) {
  SwipeState2[SwipeState2["NONE"] = 0] = "NONE";
  SwipeState2[SwipeState2["SWIPE"] = 1] = "SWIPE";
  SwipeState2[SwipeState2["PULL"] = 2] = "PULL";
  SwipeState2[SwipeState2["ANIMATION"] = 3] = "ANIMATION";
})(SwipeState || (SwipeState = {}));
function usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled) {
  react.exports.useEffect(() => !disabled ? cleanup(subscribeSensors(EVENT_ON_POINTER_DOWN, onPointerDown), subscribeSensors(EVENT_ON_POINTER_MOVE, onPointerMove), subscribeSensors(EVENT_ON_POINTER_UP, onPointerUp), subscribeSensors(EVENT_ON_POINTER_LEAVE, onPointerUp), subscribeSensors(EVENT_ON_POINTER_CANCEL, onPointerUp)) : () => {
  }, [subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled]);
}
var Gesture;
(function(Gesture2) {
  Gesture2[Gesture2["NONE"] = 0] = "NONE";
  Gesture2[Gesture2["SWIPE"] = 1] = "SWIPE";
  Gesture2[Gesture2["PULL"] = 2] = "PULL";
})(Gesture || (Gesture = {}));
const SWIPE_THRESHOLD = 30;
function usePointerSwipe(subscribeSensors, isSwipeValid, containerWidth, swipeAnimationDuration, onSwipeStart, onSwipeProgress, onSwipeFinish, onSwipeCancel, pullUpEnabled, pullDownEnabled, onPullStart, onPullProgress, onPullFinish, onPullCancel) {
  const offset2 = react.exports.useRef(0);
  const pointers = react.exports.useRef([]);
  const activePointer = react.exports.useRef();
  const startTime = react.exports.useRef(0);
  const gesture = react.exports.useRef(Gesture.NONE);
  const clearPointer = react.exports.useCallback((event) => {
    if (activePointer.current === event.pointerId) {
      activePointer.current = void 0;
      gesture.current = Gesture.NONE;
    }
    const currentPointers = pointers.current;
    currentPointers.splice(0, currentPointers.length, ...currentPointers.filter((p2) => p2.pointerId !== event.pointerId));
  }, []);
  const addPointer = react.exports.useCallback((event) => {
    clearPointer(event);
    event.persist();
    pointers.current.push(event);
  }, [clearPointer]);
  const onPointerDown = useEventCallback((event) => {
    addPointer(event);
  });
  const exceedsPullThreshold = (value, threshold) => pullDownEnabled && value > threshold || pullUpEnabled && value < -threshold;
  const onPointerUp = useEventCallback((event) => {
    if (pointers.current.find((x2) => x2.pointerId === event.pointerId) && activePointer.current === event.pointerId) {
      const duration = Date.now() - startTime.current;
      const currentOffset = offset2.current;
      if (gesture.current === Gesture.SWIPE) {
        if (Math.abs(currentOffset) > 0.3 * containerWidth || Math.abs(currentOffset) > 5 && duration < swipeAnimationDuration) {
          onSwipeFinish(currentOffset, duration);
        } else {
          onSwipeCancel(currentOffset);
        }
      } else if (gesture.current === Gesture.PULL) {
        if (exceedsPullThreshold(currentOffset, 2 * SWIPE_THRESHOLD)) {
          onPullFinish(currentOffset, duration);
        } else {
          onPullCancel(currentOffset);
        }
      }
      offset2.current = 0;
      gesture.current = Gesture.NONE;
    }
    clearPointer(event);
  });
  const onPointerMove = useEventCallback((event) => {
    const pointer = pointers.current.find((p2) => p2.pointerId === event.pointerId);
    if (pointer) {
      const isCurrentPointer = activePointer.current === event.pointerId;
      if (event.buttons === 0) {
        if (isCurrentPointer && offset2.current !== 0) {
          onPointerUp(event);
        } else {
          clearPointer(pointer);
        }
        return;
      }
      const deltaX = event.clientX - pointer.clientX;
      const deltaY = event.clientY - pointer.clientY;
      if (activePointer.current === void 0) {
        const startGesture = (newGesture) => {
          addPointer(event);
          activePointer.current = event.pointerId;
          startTime.current = Date.now();
          gesture.current = newGesture;
        };
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD && isSwipeValid(deltaX)) {
          startGesture(Gesture.SWIPE);
          onSwipeStart();
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && exceedsPullThreshold(deltaY, SWIPE_THRESHOLD)) {
          startGesture(Gesture.PULL);
          onPullStart();
        }
      } else if (isCurrentPointer) {
        if (gesture.current === Gesture.SWIPE) {
          offset2.current = deltaX;
          onSwipeProgress(deltaX);
        } else if (gesture.current === Gesture.PULL) {
          offset2.current = deltaY;
          onPullProgress(deltaY);
        }
      }
    }
  });
  usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp);
}
function usePreventWheelDefaults({ preventDefaultWheelX, preventDefaultWheelY }) {
  const ref = react.exports.useRef(null);
  const listener = useEventCallback((event) => {
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (horizontal && preventDefaultWheelX || !horizontal && preventDefaultWheelY || event.ctrlKey) {
      event.preventDefault();
    }
  });
  return react.exports.useCallback((node) => {
    var _a;
    if (node) {
      node.addEventListener("wheel", listener, { passive: false });
    } else {
      (_a = ref.current) === null || _a === void 0 ? void 0 : _a.removeEventListener("wheel", listener);
    }
    ref.current = node;
  }, [listener]);
}
function useWheelSwipe(swipeState, subscribeSensors, isSwipeValid, containerWidth, swipeAnimationDuration, onSwipeStart, onSwipeProgress, onSwipeFinish, onSwipeCancel) {
  const offset2 = react.exports.useRef(0);
  const intent = react.exports.useRef(0);
  const intentCleanup = react.exports.useRef();
  const resetCleanup = react.exports.useRef();
  const wheelInertia = react.exports.useRef(0);
  const wheelInertiaCleanup = react.exports.useRef();
  const startTime = react.exports.useRef(0);
  const { setTimeout: setTimeout2, clearTimeout: clearTimeout2 } = useTimeouts();
  const cancelSwipeIntentCleanup = react.exports.useCallback(() => {
    if (intentCleanup.current) {
      clearTimeout2(intentCleanup.current);
      intentCleanup.current = void 0;
    }
  }, [clearTimeout2]);
  const cancelSwipeResetCleanup = react.exports.useCallback(() => {
    if (resetCleanup.current) {
      clearTimeout2(resetCleanup.current);
      resetCleanup.current = void 0;
    }
  }, [clearTimeout2]);
  const handleCleanup = useEventCallback(() => {
    if (swipeState !== SwipeState.SWIPE) {
      offset2.current = 0;
      startTime.current = 0;
      cancelSwipeIntentCleanup();
      cancelSwipeResetCleanup();
    }
  });
  react.exports.useEffect(handleCleanup, [swipeState, handleCleanup]);
  const handleCancelSwipe = useEventCallback((currentSwipeOffset) => {
    resetCleanup.current = void 0;
    if (offset2.current === currentSwipeOffset) {
      onSwipeCancel(offset2.current);
    }
  });
  const onWheel = useEventCallback((event) => {
    if (event.ctrlKey) {
      return;
    }
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      return;
    }
    const setWheelInertia = (inertia) => {
      wheelInertia.current = inertia;
      clearTimeout2(wheelInertiaCleanup.current);
      wheelInertiaCleanup.current = inertia > 0 ? setTimeout2(() => {
        wheelInertia.current = 0;
        wheelInertiaCleanup.current = void 0;
      }, 300) : void 0;
    };
    if (swipeState === SwipeState.NONE) {
      if (Math.abs(event.deltaX) <= 1.2 * Math.abs(wheelInertia.current)) {
        setWheelInertia(event.deltaX);
        return;
      }
      if (!isSwipeValid(-event.deltaX)) {
        return;
      }
      intent.current += event.deltaX;
      cancelSwipeIntentCleanup();
      if (Math.abs(intent.current) > 30) {
        intent.current = 0;
        setWheelInertia(0);
        startTime.current = Date.now();
        onSwipeStart();
      } else {
        const currentSwipeIntent = intent.current;
        intentCleanup.current = setTimeout2(() => {
          intentCleanup.current = void 0;
          if (currentSwipeIntent === intent.current) {
            intent.current = 0;
          }
        }, swipeAnimationDuration);
      }
    } else if (swipeState === SwipeState.SWIPE) {
      let newSwipeOffset = offset2.current - event.deltaX;
      newSwipeOffset = Math.min(Math.abs(newSwipeOffset), containerWidth) * Math.sign(newSwipeOffset);
      offset2.current = newSwipeOffset;
      onSwipeProgress(newSwipeOffset);
      cancelSwipeResetCleanup();
      if (Math.abs(newSwipeOffset) > 0.2 * containerWidth) {
        setWheelInertia(event.deltaX);
        onSwipeFinish(newSwipeOffset, Date.now() - startTime.current);
        return;
      }
      resetCleanup.current = setTimeout2(() => handleCancelSwipe(newSwipeOffset), 2 * swipeAnimationDuration);
    } else {
      setWheelInertia(event.deltaX);
    }
  });
  react.exports.useEffect(() => subscribeSensors(EVENT_ON_WHEEL, onWheel), [subscribeSensors, onWheel]);
}
const cssContainerPrefix = makeComposePrefix("container");
const ControllerContext = react.exports.createContext(null);
const useController = makeUseContext("useController", "ControllerContext", ControllerContext);
function Controller({ children, ...props }) {
  var _a;
  const { carousel, animation, controller, on, styles: styles2, render } = props;
  const { closeOnPullUp, closeOnPullDown, preventDefaultWheelX, preventDefaultWheelY } = controller;
  const [toolbarWidth, setToolbarWidth] = react.exports.useState();
  const state = useLightboxState();
  const dispatch = useLightboxDispatch();
  const [swipeState, setSwipeState] = react.exports.useState(SwipeState.NONE);
  const swipeOffset = react.exports.useRef(0);
  const pullOffset = react.exports.useRef(0);
  const pullOpacity = react.exports.useRef(1);
  const { registerSensors, subscribeSensors } = useSensors();
  const { subscribe, publish } = useEvents();
  const cleanupAnimationIncrement = useDelay();
  const cleanupSwipeOffset = useDelay();
  const cleanupPullOffset = useDelay();
  const { containerRef, setContainerRef, containerRect } = useContainerRect();
  const handleContainerRef = useForkRef(usePreventWheelDefaults({ preventDefaultWheelX, preventDefaultWheelY }), setContainerRef);
  const carouselRef = react.exports.useRef(null);
  const setCarouselRef = useForkRef(carouselRef, void 0);
  const { getOwnerDocument } = useDocumentContext();
  const isRTL = useRTL();
  const rtl = (value) => (isRTL ? -1 : 1) * (typeof value === "number" ? value : 1);
  const focus = useEventCallback(() => {
    var _a2;
    return (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.focus();
  });
  const getLightboxProps = useEventCallback(() => props);
  const getLightboxState = useEventCallback(() => state);
  const prev = react.exports.useCallback((params) => publish(ACTION_PREV, params), [publish]);
  const next = react.exports.useCallback((params) => publish(ACTION_NEXT, params), [publish]);
  const close = react.exports.useCallback(() => publish(ACTION_CLOSE), [publish]);
  const isSwipeValid = (offset2) => !(carousel.finite && (rtl(offset2) > 0 && state.currentIndex === 0 || rtl(offset2) < 0 && state.currentIndex === state.slides.length - 1));
  const setSwipeOffset = (offset2) => {
    var _a2;
    swipeOffset.current = offset2;
    (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.style.setProperty(cssVar("swipe_offset"), `${Math.round(offset2)}px`);
  };
  const setPullOffset = (offset2) => {
    var _a2, _b;
    pullOffset.current = offset2;
    pullOpacity.current = (() => {
      const threshold = 60;
      const minOpacity = 0.5;
      const offsetValue = (() => {
        if (closeOnPullDown && offset2 > 0)
          return offset2;
        if (closeOnPullUp && offset2 < 0)
          return -offset2;
        return 0;
      })();
      return Math.min(Math.max(round$1(1 - offsetValue / threshold * (1 - minOpacity), 2), minOpacity), 1);
    })();
    (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.style.setProperty(cssVar("pull_offset"), `${Math.round(offset2)}px`);
    (_b = containerRef.current) === null || _b === void 0 ? void 0 : _b.style.setProperty(cssVar("pull_opacity"), `${pullOpacity.current}`);
  };
  const { prepareAnimation: preparePullAnimation } = useAnimation(carouselRef, (snapshot, rect, translate) => {
    if (carouselRef.current && containerRect) {
      return {
        keyframes: [
          {
            transform: `translate(0, ${snapshot.rect.y - rect.y + translate.y}px)`,
            opacity: snapshot.opacity
          },
          { transform: "translate(0, 0)", opacity: 1 }
        ],
        duration: snapshot.duration,
        easing: animation.easing.fade
      };
    }
    return void 0;
  });
  const pull = (offset2, cancel) => {
    if (closeOnPullUp || closeOnPullDown) {
      setPullOffset(offset2);
      let duration = 0;
      if (carouselRef.current) {
        duration = animation.fade * (cancel ? 2 : 1);
        preparePullAnimation({
          rect: carouselRef.current.getBoundingClientRect(),
          opacity: pullOpacity.current,
          duration
        });
      }
      cleanupPullOffset(() => {
        setPullOffset(0);
        setSwipeState(SwipeState.NONE);
      }, duration);
      setSwipeState(SwipeState.ANIMATION);
      if (!cancel) {
        close();
      }
    }
  };
  const { prepareAnimation, isAnimationPlaying } = useAnimation(carouselRef, (snapshot, rect, translate) => {
    var _a2;
    if (carouselRef.current && containerRect && ((_a2 = state.animation) === null || _a2 === void 0 ? void 0 : _a2.duration)) {
      const parsedSpacing = parseLengthPercentage(carousel.spacing);
      const spacingValue = (parsedSpacing.percent ? parsedSpacing.percent * containerRect.width / 100 : parsedSpacing.pixel) || 0;
      return {
        keyframes: [
          {
            transform: `translate(${rtl(state.globalIndex - snapshot.index) * (containerRect.width + spacingValue) + snapshot.rect.x - rect.x + translate.x}px, 0)`
          },
          { transform: "translate(0, 0)" }
        ],
        duration: state.animation.duration,
        easing: state.animation.easing
      };
    }
    return void 0;
  });
  const swipe = useEventCallback((action) => {
    var _a2, _b;
    const currentSwipeOffset = action.offset || 0;
    const swipeDuration = !currentSwipeOffset ? (_a2 = animation.navigation) !== null && _a2 !== void 0 ? _a2 : animation.swipe : animation.swipe;
    const swipeEasing = !currentSwipeOffset && !isAnimationPlaying() ? animation.easing.navigation : animation.easing.swipe;
    let { direction } = action;
    const count = (_b = action.count) !== null && _b !== void 0 ? _b : 1;
    let newSwipeState = SwipeState.ANIMATION;
    let newSwipeAnimationDuration = swipeDuration * count;
    if (!direction) {
      const containerWidth = containerRect === null || containerRect === void 0 ? void 0 : containerRect.width;
      const elapsedTime = action.duration || 0;
      const expectedTime = containerWidth ? swipeDuration / containerWidth * Math.abs(currentSwipeOffset) : swipeDuration;
      if (count !== 0) {
        if (elapsedTime < expectedTime) {
          newSwipeAnimationDuration = newSwipeAnimationDuration / expectedTime * Math.max(elapsedTime, expectedTime / 5);
        } else if (containerWidth) {
          newSwipeAnimationDuration = swipeDuration / containerWidth * (containerWidth - Math.abs(currentSwipeOffset));
        }
        direction = rtl(currentSwipeOffset) > 0 ? ACTION_PREV : ACTION_NEXT;
      } else {
        newSwipeAnimationDuration = swipeDuration / 2;
      }
    }
    let increment = 0;
    if (direction === ACTION_PREV) {
      if (isSwipeValid(rtl(1))) {
        increment = -count;
      } else {
        newSwipeState = SwipeState.NONE;
        newSwipeAnimationDuration = swipeDuration;
      }
    } else if (direction === ACTION_NEXT) {
      if (isSwipeValid(rtl(-1))) {
        increment = count;
      } else {
        newSwipeState = SwipeState.NONE;
        newSwipeAnimationDuration = swipeDuration;
      }
    }
    newSwipeAnimationDuration = Math.round(newSwipeAnimationDuration);
    cleanupSwipeOffset(() => {
      setSwipeOffset(0);
      setSwipeState(SwipeState.NONE);
    }, newSwipeAnimationDuration);
    if (carouselRef.current) {
      prepareAnimation({
        rect: carouselRef.current.getBoundingClientRect(),
        index: state.globalIndex
      });
    }
    setSwipeState(newSwipeState);
    publish(ACTION_SWIPE, {
      type: "swipe",
      increment,
      duration: newSwipeAnimationDuration,
      easing: swipeEasing
    });
  });
  react.exports.useEffect(() => {
    var _a2, _b;
    if (((_a2 = state.animation) === null || _a2 === void 0 ? void 0 : _a2.increment) && ((_b = state.animation) === null || _b === void 0 ? void 0 : _b.duration)) {
      cleanupAnimationIncrement(() => dispatch({ type: "swipe", increment: 0 }), state.animation.duration);
    }
  }, [state.animation, dispatch, cleanupAnimationIncrement]);
  const swipeParams = [
    subscribeSensors,
    isSwipeValid,
    (containerRect === null || containerRect === void 0 ? void 0 : containerRect.width) || 0,
    animation.swipe,
    () => setSwipeState(SwipeState.SWIPE),
    (offset2) => setSwipeOffset(offset2),
    (offset2, duration) => swipe({ offset: offset2, duration, count: 1 }),
    (offset2) => swipe({ offset: offset2, count: 0 })
  ];
  const pullParams = [
    () => {
      if (closeOnPullDown) {
        setSwipeState(SwipeState.PULL);
      }
    },
    (offset2) => setPullOffset(offset2),
    (offset2) => pull(offset2),
    (offset2) => pull(offset2, true)
  ];
  usePointerSwipe(...swipeParams, closeOnPullUp, closeOnPullDown, ...pullParams);
  useWheelSwipe(swipeState, ...swipeParams);
  const focusOnMount = useEventCallback(() => {
    if (controller.focus && getOwnerDocument().querySelector(`.${cssClass(MODULE_PORTAL)} .${cssClass(cssContainerPrefix())}`)) {
      focus();
    }
  });
  react.exports.useEffect(focusOnMount, [focusOnMount]);
  const onViewCallback = useEventCallback(() => {
    var _a2;
    (_a2 = on.view) === null || _a2 === void 0 ? void 0 : _a2.call(on, { index: state.currentIndex });
  });
  react.exports.useEffect(onViewCallback, [state.globalIndex, onViewCallback]);
  react.exports.useEffect(() => cleanup(subscribe(ACTION_PREV, (action) => swipe({ direction: ACTION_PREV, ...action })), subscribe(ACTION_NEXT, (action) => swipe({ direction: ACTION_NEXT, ...action })), subscribe(ACTION_SWIPE, (action) => dispatch(action))), [subscribe, swipe, dispatch]);
  const context = react.exports.useMemo(() => ({
    prev,
    next,
    close,
    focus,
    slideRect: containerRect ? computeSlideRect(containerRect, carousel.padding) : { width: 0, height: 0 },
    containerRect: containerRect || { width: 0, height: 0 },
    subscribeSensors,
    containerRef,
    setCarouselRef,
    toolbarWidth,
    setToolbarWidth
  }), [
    prev,
    next,
    close,
    focus,
    subscribeSensors,
    containerRect,
    containerRef,
    setCarouselRef,
    toolbarWidth,
    setToolbarWidth,
    carousel.padding
  ]);
  react.exports.useImperativeHandle(controller.ref, () => ({
    prev,
    next,
    close,
    focus,
    getLightboxProps,
    getLightboxState
  }), [prev, next, close, focus, getLightboxProps, getLightboxState]);
  return react.exports.createElement("div", { ref: handleContainerRef, className: clsx(cssClass(cssContainerPrefix()), cssClass(CLASS_FLEX_CENTER)), style: {
    ...swipeState === SwipeState.SWIPE ? { [cssVar("swipe_offset")]: `${Math.round(swipeOffset.current)}px` } : null,
    ...swipeState === SwipeState.PULL ? {
      [cssVar("pull_offset")]: `${Math.round(pullOffset.current)}px`,
      [cssVar("pull_opacity")]: `${pullOpacity.current}`
    } : null,
    ...controller.touchAction !== "none" ? { [cssVar("controller_touch_action")]: controller.touchAction } : null,
    ...styles2.container
  }, ...controller.aria ? { role: "presentation", "aria-live": "polite" } : null, tabIndex: -1, ...registerSensors }, containerRect && react.exports.createElement(
    ControllerContext.Provider,
    { value: context },
    children,
    (_a = render.controls) === null || _a === void 0 ? void 0 : _a.call(render)
  ));
}
const ControllerModule = createModule(MODULE_CONTROLLER, Controller);
function cssPrefix$2(value) {
  return composePrefix(MODULE_CAROUSEL, value);
}
function cssSlidePrefix(value) {
  return composePrefix("slide", value);
}
function CarouselSlide({ slide, offset: offset2 }) {
  const containerRef = react.exports.useRef(null);
  const { currentIndex } = useLightboxState();
  const { slideRect, close, focus } = useController();
  const { render, carousel: { imageFit, imageProps }, on: { click: onClick }, controller: { closeOnBackdropClick }, styles: { slide: style } } = useLightboxProps();
  const { getOwnerDocument } = useDocumentContext();
  const offscreen = offset2 !== 0;
  react.exports.useEffect(() => {
    var _a;
    if (offscreen && ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(getOwnerDocument().activeElement))) {
      focus();
    }
  }, [offscreen, focus, getOwnerDocument]);
  const renderSlide = () => {
    var _a, _b, _c, _d;
    let rendered = (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, { slide, offset: offset2, rect: slideRect });
    if (!rendered && isImageSlide(slide)) {
      rendered = react.exports.createElement(ImageSlide, { slide, offset: offset2, render, rect: slideRect, imageFit, imageProps, onClick: !offscreen ? () => onClick === null || onClick === void 0 ? void 0 : onClick({ index: currentIndex }) : void 0 });
    }
    return rendered ? react.exports.createElement(
      react.exports.Fragment,
      null,
      (_b = render.slideHeader) === null || _b === void 0 ? void 0 : _b.call(render, { slide }),
      ((_c = render.slideContainer) !== null && _c !== void 0 ? _c : ({ children }) => children)({ slide, children: rendered }),
      (_d = render.slideFooter) === null || _d === void 0 ? void 0 : _d.call(render, { slide })
    ) : null;
  };
  const handleBackdropClick = (event) => {
    const container = containerRef.current;
    const target = event.target instanceof HTMLElement ? event.target : void 0;
    if (closeOnBackdropClick && target && container && (target === container || Array.from(container.children).find((x2) => x2 === target) && target.classList.contains(cssClass(CLASS_SLIDE_WRAPPER)))) {
      close();
    }
  };
  return react.exports.createElement("div", { ref: containerRef, className: clsx(cssClass(cssSlidePrefix()), !offscreen && cssClass(cssSlidePrefix("current")), cssClass(CLASS_FLEX_CENTER)), ...makeInertWhen(offscreen), onClick: handleBackdropClick, style }, renderSlide());
}
function Placeholder() {
  const style = useLightboxProps().styles.slide;
  return react.exports.createElement("div", { className: cssClass("slide"), style });
}
function Carousel({ carousel }) {
  const { slides, currentIndex, globalIndex } = useLightboxState();
  const { setCarouselRef } = useController();
  const spacingValue = parseLengthPercentage(carousel.spacing);
  const paddingValue = parseLengthPercentage(carousel.padding);
  const preload = calculatePreload(carousel, slides, 1);
  const items = [];
  if (hasSlides(slides)) {
    for (let index = currentIndex - preload; index <= currentIndex + preload; index += 1) {
      const slide = getSlide(slides, index);
      const key = globalIndex - currentIndex + index;
      const placeholder = carousel.finite && (index < 0 || index > slides.length - 1);
      items.push(!placeholder ? {
        key: [`${key}`, getSlideKey(slide)].filter(Boolean).join("|"),
        offset: index - currentIndex,
        slide
      } : { key });
    }
  }
  return react.exports.createElement("div", { ref: setCarouselRef, className: clsx(cssClass(cssPrefix$2()), items.length > 0 && cssClass(cssPrefix$2("with_slides"))), style: {
    [`${cssVar(cssPrefix$2("slides_count"))}`]: items.length,
    [`${cssVar(cssPrefix$2("spacing_px"))}`]: spacingValue.pixel || 0,
    [`${cssVar(cssPrefix$2("spacing_percent"))}`]: spacingValue.percent || 0,
    [`${cssVar(cssPrefix$2("padding_px"))}`]: paddingValue.pixel || 0,
    [`${cssVar(cssPrefix$2("padding_percent"))}`]: paddingValue.percent || 0
  } }, items.map(({ key, slide, offset: offset2 }) => slide ? react.exports.createElement(CarouselSlide, { key, slide, offset: offset2 }) : react.exports.createElement(Placeholder, { key })));
}
const CarouselModule = createModule(MODULE_CAROUSEL, Carousel);
function useNavigationState() {
  const { carousel } = useLightboxProps();
  const { slides, currentIndex } = useLightboxState();
  const prevDisabled = slides.length === 0 || carousel.finite && currentIndex === 0;
  const nextDisabled = slides.length === 0 || carousel.finite && currentIndex === slides.length - 1;
  return { prevDisabled, nextDisabled };
}
function useKeyboardNavigation(subscribeSensors) {
  var _a;
  const isRTL = useRTL();
  const { publish } = useEvents();
  const { animation } = useLightboxProps();
  const { prevDisabled, nextDisabled } = useNavigationState();
  const throttle = ((_a = animation.navigation) !== null && _a !== void 0 ? _a : animation.swipe) / 2;
  const prev = useThrottle(() => publish(ACTION_PREV), throttle);
  const next = useThrottle(() => publish(ACTION_NEXT), throttle);
  const handleKeyDown = useEventCallback((event) => {
    switch (event.key) {
      case VK_ESCAPE:
        publish(ACTION_CLOSE);
        break;
      case VK_ARROW_LEFT:
        if (!(isRTL ? nextDisabled : prevDisabled))
          (isRTL ? next : prev)();
        break;
      case VK_ARROW_RIGHT:
        if (!(isRTL ? prevDisabled : nextDisabled))
          (isRTL ? prev : next)();
        break;
    }
  });
  react.exports.useEffect(() => subscribeSensors(EVENT_ON_KEY_DOWN, handleKeyDown), [subscribeSensors, handleKeyDown]);
}
function NavigationButton({ label: label2, icon, renderIcon, action, onClick, disabled, style }) {
  return react.exports.createElement(IconButton, { label: label2, icon, renderIcon, className: cssClass(`navigation_${action}`), disabled, onClick, style, ...useLoseFocus(useController().focus, disabled) });
}
function Navigation({ render: { buttonPrev, buttonNext, iconPrev, iconNext }, styles: styles2 }) {
  const { prev, next, subscribeSensors } = useController();
  const { prevDisabled, nextDisabled } = useNavigationState();
  useKeyboardNavigation(subscribeSensors);
  return react.exports.createElement(
    react.exports.Fragment,
    null,
    buttonPrev ? buttonPrev() : react.exports.createElement(NavigationButton, { label: "Previous", action: ACTION_PREV, icon: PreviousIcon, renderIcon: iconPrev, style: styles2.navigationPrev, disabled: prevDisabled, onClick: prev }),
    buttonNext ? buttonNext() : react.exports.createElement(NavigationButton, { label: "Next", action: ACTION_NEXT, icon: NextIcon, renderIcon: iconNext, style: styles2.navigationNext, disabled: nextDisabled, onClick: next })
  );
}
const NavigationModule = createModule(MODULE_NAVIGATION, Navigation);
const noScroll = cssClass(CLASS_NO_SCROLL);
const noScrollPadding = cssClass(CLASS_NO_SCROLL_PADDING);
function isHTMLElement$1(element) {
  return "style" in element;
}
function padScrollbar(element, padding, rtl) {
  const styles2 = window.getComputedStyle(element);
  const property = rtl ? "padding-left" : "padding-right";
  const computedValue = rtl ? styles2.paddingLeft : styles2.paddingRight;
  const originalValue = element.style.getPropertyValue(property);
  element.style.setProperty(property, `${(parseInt$1(computedValue) || 0) + padding}px`);
  return () => {
    if (originalValue) {
      element.style.setProperty(property, originalValue);
    } else {
      element.style.removeProperty(property);
    }
  };
}
function NoScroll({ noScroll: { disabled }, children }) {
  const rtl = useRTL();
  const { getOwnerDocument, getOwnerWindow } = useDocumentContext();
  react.exports.useEffect(() => {
    if (disabled)
      return () => {
      };
    const cleanup2 = [];
    const ownerWindow = getOwnerWindow();
    const { body, documentElement } = getOwnerDocument();
    const scrollbar = Math.round(ownerWindow.innerWidth - documentElement.clientWidth);
    if (scrollbar > 0) {
      cleanup2.push(padScrollbar(body, scrollbar, rtl));
      const elements = body.getElementsByTagName("*");
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        if (isHTMLElement$1(element) && ownerWindow.getComputedStyle(element).getPropertyValue("position") === "fixed" && !element.classList.contains(noScrollPadding)) {
          cleanup2.push(padScrollbar(element, scrollbar, rtl));
        }
      }
    }
    body.classList.add(noScroll);
    return () => {
      body.classList.remove(noScroll);
      cleanup2.forEach((clean) => clean());
    };
  }, [rtl, disabled, getOwnerDocument, getOwnerWindow]);
  return react.exports.createElement(react.exports.Fragment, null, children);
}
const NoScrollModule = createModule(MODULE_NO_SCROLL, NoScroll);
function cssPrefix$1(value) {
  return composePrefix(MODULE_PORTAL, value);
}
function setAttribute(element, attribute, value) {
  const previousValue = element.getAttribute(attribute);
  element.setAttribute(attribute, value);
  return () => {
    if (previousValue) {
      element.setAttribute(attribute, previousValue);
    } else {
      element.removeAttribute(attribute);
    }
  };
}
function Portal({ children, animation, styles: styles2, className, on, portal, close }) {
  const [mounted, setMounted] = react.exports.useState(false);
  const [visible, setVisible] = react.exports.useState(false);
  const cleanup2 = react.exports.useRef([]);
  const restoreFocus = react.exports.useRef(null);
  const { setTimeout: setTimeout2 } = useTimeouts();
  const { subscribe } = useEvents();
  const reduceMotion = useMotionPreference();
  const animationDuration = !reduceMotion ? animation.fade : 0;
  react.exports.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      setVisible(false);
    };
  }, []);
  const handleCleanup = useEventCallback(() => {
    cleanup2.current.forEach((clean) => clean());
    cleanup2.current = [];
  });
  const handleClose = useEventCallback(() => {
    var _a;
    setVisible(false);
    handleCleanup();
    (_a = on.exiting) === null || _a === void 0 ? void 0 : _a.call(on);
    setTimeout2(() => {
      var _a2;
      (_a2 = on.exited) === null || _a2 === void 0 ? void 0 : _a2.call(on);
      close();
    }, animationDuration);
  });
  react.exports.useEffect(() => subscribe(ACTION_CLOSE, handleClose), [subscribe, handleClose]);
  const handleEnter = useEventCallback((node) => {
    var _a, _b, _c;
    node.scrollTop;
    setVisible(true);
    (_a = on.entering) === null || _a === void 0 ? void 0 : _a.call(on);
    const elements = (_c = (_b = node.parentNode) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : [];
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (["TEMPLATE", "SCRIPT", "STYLE"].indexOf(element.tagName) === -1 && element !== node) {
        cleanup2.current.push(setAttribute(element, "inert", ""));
        cleanup2.current.push(setAttribute(element, "aria-hidden", "true"));
      }
    }
    cleanup2.current.push(() => {
      var _a2, _b2;
      (_b2 = (_a2 = restoreFocus.current) === null || _a2 === void 0 ? void 0 : _a2.focus) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
    });
    setTimeout2(() => {
      var _a2;
      (_a2 = on.entered) === null || _a2 === void 0 ? void 0 : _a2.call(on);
    }, animationDuration);
  });
  const handleRef = react.exports.useCallback((node) => {
    if (node) {
      handleEnter(node);
    } else {
      handleCleanup();
    }
  }, [handleEnter, handleCleanup]);
  return mounted ? reactDom.exports.createPortal(react.exports.createElement(LightboxRoot, { ref: handleRef, className: clsx(className, cssClass(cssPrefix$1()), cssClass(CLASS_NO_SCROLL_PADDING), visible && cssClass(cssPrefix$1("open"))), role: "presentation", "aria-live": "polite", style: {
    ...animation.fade !== LightboxDefaultProps.animation.fade ? { [cssVar("fade_animation_duration")]: `${animationDuration}ms` } : null,
    ...animation.easing.fade !== LightboxDefaultProps.animation.easing.fade ? { [cssVar("fade_animation_timing_function")]: animation.easing.fade } : null,
    ...styles2.root
  }, onFocus: (event) => {
    if (!restoreFocus.current) {
      restoreFocus.current = event.relatedTarget;
    }
  } }, children), portal.root || document.body) : null;
}
const PortalModule = createModule(MODULE_PORTAL, Portal);
function Root({ children }) {
  return react.exports.createElement(react.exports.Fragment, null, children);
}
const RootModule = createModule(MODULE_ROOT, Root);
function cssPrefix(value) {
  return composePrefix(MODULE_TOOLBAR, value);
}
function Toolbar({ toolbar: { buttons }, render: { buttonClose, iconClose }, styles: styles2 }) {
  const { close, setToolbarWidth } = useController();
  const { setContainerRef, containerRect } = useContainerRect();
  useLayoutEffect(() => {
    setToolbarWidth(containerRect === null || containerRect === void 0 ? void 0 : containerRect.width);
  }, [setToolbarWidth, containerRect === null || containerRect === void 0 ? void 0 : containerRect.width]);
  const renderCloseButton = () => {
    if (buttonClose)
      return buttonClose();
    return react.exports.createElement(IconButton, { key: ACTION_CLOSE, label: "Close", icon: CloseIcon, renderIcon: iconClose, onClick: close });
  };
  return react.exports.createElement("div", { ref: setContainerRef, style: styles2.toolbar, className: cssClass(cssPrefix()) }, buttons === null || buttons === void 0 ? void 0 : buttons.map((button) => button === ACTION_CLOSE ? renderCloseButton() : button));
}
const ToolbarModule = createModule(MODULE_TOOLBAR, Toolbar);
function renderNode(node, props) {
  var _a;
  return react.exports.createElement(node.module.component, { key: node.module.name, ...props }, (_a = node.children) === null || _a === void 0 ? void 0 : _a.map((child) => renderNode(child, props)));
}
function mergeAnimation(defaultAnimation, animation = {}) {
  const { easing: defaultAnimationEasing, ...restDefaultAnimation } = defaultAnimation;
  const { easing, ...restAnimation } = animation;
  return {
    easing: { ...defaultAnimationEasing, ...easing },
    ...restDefaultAnimation,
    ...restAnimation
  };
}
function Lightbox({ carousel, animation, render, toolbar, controller, noScroll: noScroll2, on, plugins, slides, index, ...restProps }) {
  const { animation: defaultAnimation, carousel: defaultCarousel, render: defaultRender, toolbar: defaultToolbar, controller: defaultController, noScroll: defaultNoScroll, on: defaultOn, slides: defaultSlides, index: defaultIndex, plugins: defaultPlugins, ...restDefaultProps } = LightboxDefaultProps;
  const { config, augmentation } = withPlugins([
    createNode(PortalModule, [
      createNode(NoScrollModule, [
        createNode(ControllerModule, [
          createNode(CarouselModule),
          createNode(ToolbarModule),
          createNode(NavigationModule)
        ])
      ])
    ])
  ], plugins || defaultPlugins);
  const props = augmentation({
    animation: mergeAnimation(defaultAnimation, animation),
    carousel: { ...defaultCarousel, ...carousel },
    render: { ...defaultRender, ...render },
    toolbar: { ...defaultToolbar, ...toolbar },
    controller: { ...defaultController, ...controller },
    noScroll: { ...defaultNoScroll, ...noScroll2 },
    on: { ...defaultOn, ...on },
    ...restDefaultProps,
    ...restProps
  });
  if (!props.open)
    return null;
  return react.exports.createElement(
    LightboxPropsProvider,
    { ...props },
    react.exports.createElement(
      LightboxStateProvider,
      { slides: slides || defaultSlides, index: parseInt$1(index || defaultIndex) },
      react.exports.createElement(
        TimeoutsProvider,
        null,
        react.exports.createElement(EventsProvider, null, renderNode(createNode(RootModule, config), props))
      )
    )
  );
}
const defaultZoomProps = {
  maxZoomPixelRatio: 1,
  zoomInMultiplier: 2,
  doubleTapDelay: 300,
  doubleClickDelay: 500,
  doubleClickMaxStops: 2,
  keyboardMoveDistance: 50,
  wheelZoomDistanceFactor: 100,
  pinchZoomDistanceFactor: 100,
  scrollToZoom: false
};
const resolveZoomProps = (zoom) => ({
  ...defaultZoomProps,
  ...zoom
});
function useZoomAnimation(zoom, offsetX, offsetY, zoomWrapperRef) {
  const zoomAnimation = react.exports.useRef();
  const zoomAnimationStart = react.exports.useRef();
  const { zoom: zoomAnimationDuration } = useLightboxProps().animation;
  const reduceMotion = useMotionPreference();
  const playZoomAnimation = useEventCallback(() => {
    var _a, _b, _c;
    (_a = zoomAnimation.current) === null || _a === void 0 ? void 0 : _a.cancel();
    zoomAnimation.current = void 0;
    if (zoomAnimationStart.current && (zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current)) {
      try {
        zoomAnimation.current = (_c = (_b = zoomWrapperRef.current).animate) === null || _c === void 0 ? void 0 : _c.call(_b, [
          { transform: zoomAnimationStart.current },
          { transform: `scale(${zoom}) translateX(${offsetX}px) translateY(${offsetY}px)` }
        ], {
          duration: !reduceMotion ? zoomAnimationDuration !== null && zoomAnimationDuration !== void 0 ? zoomAnimationDuration : 500 : 0,
          easing: zoomAnimation.current ? "ease-out" : "ease-in-out"
        });
      } catch (err) {
        console.error(err);
      }
      zoomAnimationStart.current = void 0;
      if (zoomAnimation.current) {
        zoomAnimation.current.onfinish = () => {
          zoomAnimation.current = void 0;
        };
      }
    }
  });
  useLayoutEffect(playZoomAnimation, [zoom, offsetX, offsetY, playZoomAnimation]);
  return react.exports.useCallback(() => {
    zoomAnimationStart.current = (zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current) ? window.getComputedStyle(zoomWrapperRef.current).transform : void 0;
  }, [zoomWrapperRef]);
}
function useZoomCallback(zoom, disabled) {
  const { on } = useLightboxProps();
  const onZoomCallback = useEventCallback(() => {
    var _a;
    if (!disabled) {
      (_a = on.zoom) === null || _a === void 0 ? void 0 : _a.call(on, { zoom });
    }
  });
  react.exports.useEffect(onZoomCallback, [zoom, onZoomCallback]);
}
function useZoomProps() {
  const { zoom } = useLightboxProps();
  return resolveZoomProps(zoom);
}
function useZoomImageRect(slideRect, imageDimensions) {
  var _a, _b;
  let imageRect = { width: 0, height: 0 };
  let maxImageRect = { width: 0, height: 0 };
  const { currentSlide } = useLightboxState();
  const { imageFit } = useLightboxProps().carousel;
  const { maxZoomPixelRatio } = useZoomProps();
  if (slideRect && currentSlide) {
    const slide = { ...currentSlide, ...imageDimensions };
    if (isImageSlide(slide)) {
      const cover = isImageFitCover(slide, imageFit);
      const width = Math.max(...(((_a = slide.srcSet) === null || _a === void 0 ? void 0 : _a.map((x2) => x2.width)) || []).concat(slide.width ? [slide.width] : []));
      const height = Math.max(...(((_b = slide.srcSet) === null || _b === void 0 ? void 0 : _b.map((x2) => x2.height)) || []).concat(slide.height ? [slide.height] : []));
      if (width > 0 && height > 0 && slideRect.width > 0 && slideRect.height > 0) {
        maxImageRect = cover ? {
          width: Math.round(Math.min(width, slideRect.width / slideRect.height * height)),
          height: Math.round(Math.min(height, slideRect.height / slideRect.width * width))
        } : { width, height };
        maxImageRect = {
          width: maxImageRect.width * maxZoomPixelRatio,
          height: maxImageRect.height * maxZoomPixelRatio
        };
        imageRect = cover ? {
          width: Math.min(slideRect.width, maxImageRect.width, width),
          height: Math.min(slideRect.height, maxImageRect.height, height)
        } : {
          width: Math.round(Math.min(slideRect.width, slideRect.height / height * width, width)),
          height: Math.round(Math.min(slideRect.height, slideRect.width / width * height, height))
        };
      }
    }
  }
  const maxZoom = imageRect.width ? Math.max(round$1(maxImageRect.width / imageRect.width, 5), 1) : 1;
  return { imageRect, maxZoom };
}
function distance(pointerA, pointerB) {
  return ((pointerA.clientX - pointerB.clientX) ** 2 + (pointerA.clientY - pointerB.clientY) ** 2) ** 0.5;
}
function scaleZoom(value, delta, factor = 100, clamp = 2) {
  return value * Math.min(1 + Math.abs(delta / factor), clamp) ** Math.sign(delta);
}
function useZoomSensors(zoom, maxZoom, disabled, changeZoom, changeOffsets, zoomWrapperRef) {
  const activePointers = react.exports.useRef([]);
  const lastPointerDown = react.exports.useRef(0);
  const pinchZoomDistance = react.exports.useRef();
  const { globalIndex } = useLightboxState();
  const { getOwnerWindow } = useDocumentContext();
  const { containerRef, subscribeSensors } = useController();
  const { keyboardMoveDistance, zoomInMultiplier, wheelZoomDistanceFactor, scrollToZoom, doubleTapDelay, doubleClickDelay, doubleClickMaxStops, pinchZoomDistanceFactor } = useZoomProps();
  const translateCoordinates = react.exports.useCallback((event) => {
    if (containerRef.current) {
      const { pageX, pageY } = event;
      const { scrollX, scrollY } = getOwnerWindow();
      const { left: left2, top: top2, width, height } = containerRef.current.getBoundingClientRect();
      return [pageX - left2 - scrollX - width / 2, pageY - top2 - scrollY - height / 2];
    }
    return [];
  }, [containerRef, getOwnerWindow]);
  const onKeyDown = useEventCallback((event) => {
    const preventDefault = () => {
      event.preventDefault();
      event.stopPropagation();
    };
    if (zoom > 1) {
      const move = (deltaX, deltaY) => {
        preventDefault();
        changeOffsets(deltaX, deltaY);
      };
      if (event.key === "ArrowDown") {
        move(0, keyboardMoveDistance);
      } else if (event.key === "ArrowUp") {
        move(0, -keyboardMoveDistance);
      } else if (event.key === "ArrowLeft") {
        move(-keyboardMoveDistance, 0);
      } else if (event.key === "ArrowRight") {
        move(keyboardMoveDistance, 0);
      }
    }
    const handleChangeZoom = (zoomValue) => {
      preventDefault();
      changeZoom(zoomValue);
    };
    const hasMeta = () => event.getModifierState("Meta");
    if (event.key === "+" || event.key === "=" && hasMeta()) {
      handleChangeZoom(zoom * zoomInMultiplier);
    } else if (event.key === "-" || event.key === "_" && hasMeta()) {
      handleChangeZoom(zoom / zoomInMultiplier);
    } else if (event.key === "0" && hasMeta()) {
      handleChangeZoom(1);
    }
  });
  const onWheel = useEventCallback((event) => {
    if (event.ctrlKey || scrollToZoom) {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.stopPropagation();
        changeZoom(scaleZoom(zoom, -event.deltaY, wheelZoomDistanceFactor), true, ...translateCoordinates(event));
        return;
      }
    }
    if (zoom > 1) {
      event.stopPropagation();
      if (!scrollToZoom) {
        changeOffsets(event.deltaX, event.deltaY);
      }
    }
  });
  const clearPointer = react.exports.useCallback((event) => {
    const pointers = activePointers.current;
    pointers.splice(0, pointers.length, ...pointers.filter((p2) => p2.pointerId !== event.pointerId));
  }, []);
  const replacePointer = react.exports.useCallback((event) => {
    clearPointer(event);
    event.persist();
    activePointers.current.push(event);
  }, [clearPointer]);
  const onPointerDown = useEventCallback((event) => {
    var _a;
    const pointers = activePointers.current;
    if (event.pointerType === "mouse" && event.buttons > 1 || !((_a = zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
      return;
    }
    if (zoom > 1) {
      event.stopPropagation();
    }
    const { timeStamp } = event;
    if (pointers.length === 0 && timeStamp - lastPointerDown.current < (event.pointerType === "touch" ? doubleTapDelay : doubleClickDelay)) {
      lastPointerDown.current = 0;
      changeZoom(zoom !== maxZoom ? zoom * Math.max(maxZoom ** (1 / doubleClickMaxStops), zoomInMultiplier) : 1, false, ...translateCoordinates(event));
    } else {
      lastPointerDown.current = timeStamp;
    }
    replacePointer(event);
    if (pointers.length === 2) {
      pinchZoomDistance.current = distance(pointers[0], pointers[1]);
    }
  });
  const onPointerMove = useEventCallback((event) => {
    const pointers = activePointers.current;
    const activePointer = pointers.find((p2) => p2.pointerId === event.pointerId);
    if (pointers.length === 2 && pinchZoomDistance.current) {
      event.stopPropagation();
      replacePointer(event);
      const currentDistance = distance(pointers[0], pointers[1]);
      const delta = currentDistance - pinchZoomDistance.current;
      if (Math.abs(delta) > 0) {
        changeZoom(scaleZoom(zoom, delta, pinchZoomDistanceFactor), true, ...pointers.map((x2) => translateCoordinates(x2)).reduce((acc, coordinate) => coordinate.map((x2, i) => acc[i] + x2 / 2)));
        pinchZoomDistance.current = currentDistance;
      }
      return;
    }
    if (zoom > 1) {
      event.stopPropagation();
      if (activePointer) {
        if (pointers.length === 1) {
          changeOffsets((activePointer.clientX - event.clientX) / zoom, (activePointer.clientY - event.clientY) / zoom);
        }
        replacePointer(event);
      }
    }
  });
  const onPointerUp = react.exports.useCallback((event) => {
    const pointers = activePointers.current;
    if (pointers.length === 2 && pointers.find((p2) => p2.pointerId === event.pointerId)) {
      pinchZoomDistance.current = void 0;
    }
    clearPointer(event);
  }, [clearPointer]);
  const cleanupSensors = react.exports.useCallback(() => {
    const pointers = activePointers.current;
    pointers.splice(0, pointers.length);
    lastPointerDown.current = 0;
    pinchZoomDistance.current = void 0;
  }, []);
  usePointerEvents(subscribeSensors, onPointerDown, onPointerMove, onPointerUp, disabled);
  react.exports.useEffect(cleanupSensors, [globalIndex, cleanupSensors]);
  react.exports.useEffect(() => {
    if (!disabled) {
      return cleanup(cleanupSensors, subscribeSensors(EVENT_ON_KEY_DOWN, onKeyDown), subscribeSensors(EVENT_ON_WHEEL, onWheel));
    }
    return () => {
    };
  }, [disabled, subscribeSensors, cleanupSensors, onKeyDown, onWheel]);
}
function useZoomState(imageRect, maxZoom, zoomWrapperRef) {
  const [zoom, setZoom] = react.exports.useState(1);
  const [offsetX, setOffsetX] = react.exports.useState(0);
  const [offsetY, setOffsetY] = react.exports.useState(0);
  const animate = useZoomAnimation(zoom, offsetX, offsetY, zoomWrapperRef);
  const { currentSlide, globalIndex } = useLightboxState();
  const { containerRect, slideRect } = useController();
  const { zoomInMultiplier } = useZoomProps();
  const currentSource = currentSlide && isImageSlide(currentSlide) ? currentSlide.src : void 0;
  const disabled = !currentSource || !(zoomWrapperRef === null || zoomWrapperRef === void 0 ? void 0 : zoomWrapperRef.current);
  useLayoutEffect(() => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  }, [globalIndex, currentSource]);
  const changeOffsets = react.exports.useCallback((dx, dy, targetZoom) => {
    const newZoom = targetZoom || zoom;
    const newOffsetX = offsetX - (dx || 0);
    const newOffsetY = offsetY - (dy || 0);
    const maxOffsetX = (imageRect.width * newZoom - slideRect.width) / 2 / newZoom;
    const maxOffsetY = (imageRect.height * newZoom - slideRect.height) / 2 / newZoom;
    setOffsetX(Math.min(Math.abs(newOffsetX), Math.max(maxOffsetX, 0)) * Math.sign(newOffsetX));
    setOffsetY(Math.min(Math.abs(newOffsetY), Math.max(maxOffsetY, 0)) * Math.sign(newOffsetY));
  }, [zoom, offsetX, offsetY, slideRect, imageRect.width, imageRect.height]);
  const changeZoom = react.exports.useCallback((targetZoom, rapid, dx, dy) => {
    const newZoom = round$1(Math.min(Math.max(targetZoom + 1e-3 < maxZoom ? targetZoom : maxZoom, 1), maxZoom), 5);
    if (newZoom === zoom)
      return;
    if (!rapid) {
      animate();
    }
    changeOffsets(dx ? dx * (1 / zoom - 1 / newZoom) : 0, dy ? dy * (1 / zoom - 1 / newZoom) : 0, newZoom);
    setZoom(newZoom);
  }, [zoom, maxZoom, changeOffsets, animate]);
  const handleControllerRectChange = useEventCallback(() => {
    if (zoom > 1) {
      if (zoom > maxZoom) {
        changeZoom(maxZoom, true);
      }
      changeOffsets();
    }
  });
  useLayoutEffect(handleControllerRectChange, [containerRect.width, containerRect.height, handleControllerRectChange]);
  const zoomIn = react.exports.useCallback(() => changeZoom(zoom * zoomInMultiplier), [zoom, zoomInMultiplier, changeZoom]);
  const zoomOut = react.exports.useCallback(() => changeZoom(zoom / zoomInMultiplier), [zoom, zoomInMultiplier, changeZoom]);
  return { zoom, offsetX, offsetY, disabled, changeOffsets, changeZoom, zoomIn, zoomOut };
}
const ZoomControllerContext = react.exports.createContext(null);
const useZoom = makeUseContext("useZoom", "ZoomControllerContext", ZoomControllerContext);
function ZoomContextProvider({ children }) {
  const [zoomWrapper, setZoomWrapper] = react.exports.useState();
  const { slideRect } = useController();
  const { imageRect, maxZoom } = useZoomImageRect(slideRect, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.imageDimensions);
  const { zoom, offsetX, offsetY, disabled, changeZoom, changeOffsets, zoomIn, zoomOut } = useZoomState(imageRect, maxZoom, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.zoomWrapperRef);
  useZoomCallback(zoom, disabled);
  useZoomSensors(zoom, maxZoom, disabled, changeZoom, changeOffsets, zoomWrapper === null || zoomWrapper === void 0 ? void 0 : zoomWrapper.zoomWrapperRef);
  const zoomRef = react.exports.useMemo(() => ({ zoom, maxZoom, offsetX, offsetY, disabled, zoomIn, zoomOut, changeZoom }), [zoom, maxZoom, offsetX, offsetY, disabled, zoomIn, zoomOut, changeZoom]);
  react.exports.useImperativeHandle(useZoomProps().ref, () => zoomRef, [zoomRef]);
  const context = react.exports.useMemo(() => ({ ...zoomRef, setZoomWrapper }), [zoomRef, setZoomWrapper]);
  return react.exports.createElement(ZoomControllerContext.Provider, { value: context }, children);
}
const ZoomInIcon = createIcon("ZoomIn", react.exports.createElement(
  react.exports.Fragment,
  null,
  react.exports.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
  react.exports.createElement("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" })
));
const ZoomOutIcon = createIcon("ZoomOut", react.exports.createElement("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" }));
const ZoomButton = react.exports.forwardRef(function ZoomButton2({ zoomIn, onLoseFocus }, ref) {
  const wasEnabled = react.exports.useRef(false);
  const wasFocused = react.exports.useRef(false);
  const { zoom, maxZoom, zoomIn: zoomInCallback, zoomOut: zoomOutCallback, disabled: zoomDisabled } = useZoom();
  const { render } = useLightboxProps();
  const disabled = zoomDisabled || (zoomIn ? zoom >= maxZoom : zoom <= 1);
  react.exports.useEffect(() => {
    if (disabled && wasEnabled.current && wasFocused.current) {
      onLoseFocus();
    }
    if (!disabled) {
      wasEnabled.current = true;
    }
  }, [disabled, onLoseFocus]);
  return react.exports.createElement(IconButton, { ref, disabled, label: zoomIn ? "Zoom in" : "Zoom out", icon: zoomIn ? ZoomInIcon : ZoomOutIcon, renderIcon: zoomIn ? render.iconZoomIn : render.iconZoomOut, onClick: zoomIn ? zoomInCallback : zoomOutCallback, onFocus: () => {
    wasFocused.current = true;
  }, onBlur: () => {
    wasFocused.current = false;
  } });
});
function ZoomButtonsGroup() {
  const zoomInRef = react.exports.useRef(null);
  const zoomOutRef = react.exports.useRef(null);
  const { focus } = useController();
  const focusSibling = react.exports.useCallback((sibling) => {
    var _a, _b;
    if (!((_a = sibling.current) === null || _a === void 0 ? void 0 : _a.disabled)) {
      (_b = sibling.current) === null || _b === void 0 ? void 0 : _b.focus();
    } else {
      focus();
    }
  }, [focus]);
  const focusZoomIn = react.exports.useCallback(() => focusSibling(zoomInRef), [focusSibling]);
  const focusZoomOut = react.exports.useCallback(() => focusSibling(zoomOutRef), [focusSibling]);
  return react.exports.createElement(
    react.exports.Fragment,
    null,
    react.exports.createElement(ZoomButton, { zoomIn: true, ref: zoomInRef, onLoseFocus: focusZoomOut }),
    react.exports.createElement(ZoomButton, { ref: zoomOutRef, onLoseFocus: focusZoomIn })
  );
}
function ZoomToolbarControl() {
  const { render } = useLightboxProps();
  const zoomRef = useZoom();
  if (render.buttonZoom) {
    return react.exports.createElement(react.exports.Fragment, null, render.buttonZoom(zoomRef));
  }
  return react.exports.createElement(ZoomButtonsGroup, null);
}
function isResponsiveImageSlide(slide) {
  var _a;
  return (((_a = slide.srcSet) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0;
}
function reducer({ current, preload }, { type, source }) {
  switch (type) {
    case "fetch":
      if (!current) {
        return { current: source };
      }
      return { current, preload: source };
    case "done":
      if (source === preload) {
        return { current: source };
      }
      return { current, preload };
    default:
      throw new Error(UNKNOWN_ACTION_TYPE);
  }
}
function ResponsiveImage(props) {
  var _a, _b;
  const [{ current, preload }, dispatch] = react.exports.useReducer(reducer, {});
  const { slide: image2, rect, imageFit, render, interactive } = props;
  const srcSet = image2.srcSet.sort((a, b) => a.width - b.width);
  const width = (_a = image2.width) !== null && _a !== void 0 ? _a : srcSet[srcSet.length - 1].width;
  const height = (_b = image2.height) !== null && _b !== void 0 ? _b : srcSet[srcSet.length - 1].height;
  const cover = isImageFitCover(image2, imageFit);
  const maxWidth = Math.max(...srcSet.map((x2) => x2.width));
  const targetWidth = Math.min((cover ? Math.max : Math.min)(rect.width, width * (rect.height / height)), maxWidth);
  const pixelDensity = devicePixelRatio();
  const handleResize = useEventCallback(() => {
    var _a2;
    const targetSource = (_a2 = srcSet.find((x2) => x2.width >= targetWidth * pixelDensity)) !== null && _a2 !== void 0 ? _a2 : srcSet[srcSet.length - 1];
    if (!current || srcSet.findIndex((x2) => x2.src === current) < srcSet.findIndex((x2) => x2 === targetSource)) {
      dispatch({ type: "fetch", source: targetSource.src });
    }
  });
  useLayoutEffect(handleResize, [rect.width, rect.height, pixelDensity, handleResize]);
  const handlePreload = useEventCallback((currentPreload) => dispatch({ type: "done", source: currentPreload }));
  const style = {
    WebkitTransform: !interactive ? "translateZ(0)" : "initial"
  };
  if (!cover) {
    Object.assign(style, rect.width / rect.height < width / height ? { width: "100%", height: "auto" } : { width: "auto", height: "100%" });
  }
  return react.exports.createElement(
    react.exports.Fragment,
    null,
    preload && preload !== current && react.exports.createElement(ImageSlide, { key: "preload", ...props, slide: { ...image2, src: preload, srcSet: void 0 }, style: { position: "absolute", visibility: "hidden", ...style }, onLoad: () => handlePreload(preload), render: {
      ...render,
      iconLoading: () => null,
      iconError: () => null
    } }),
    current && react.exports.createElement(ImageSlide, { key: "current", ...props, slide: { ...image2, src: current, srcSet: void 0 }, style })
  );
}
function ZoomWrapper({ render, slide, offset: offset2, rect }) {
  var _a;
  const [imageDimensions, setImageDimensions] = react.exports.useState();
  const zoomWrapperRef = react.exports.useRef(null);
  const { zoom, maxZoom, offsetX, offsetY, setZoomWrapper } = useZoom();
  const interactive = zoom > 1;
  const { carousel, on } = useLightboxProps();
  const { currentIndex } = useLightboxState();
  useLayoutEffect(() => {
    if (offset2 === 0) {
      setZoomWrapper({ zoomWrapperRef, imageDimensions });
      return () => setZoomWrapper(void 0);
    }
    return () => {
    };
  }, [offset2, imageDimensions, setZoomWrapper]);
  let rendered = (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, { slide, offset: offset2, rect, zoom, maxZoom });
  if (!rendered && isImageSlide(slide)) {
    const slideProps = {
      slide,
      offset: offset2,
      rect,
      render,
      imageFit: carousel.imageFit,
      imageProps: carousel.imageProps,
      onClick: offset2 === 0 ? () => {
        var _a2;
        return (_a2 = on.click) === null || _a2 === void 0 ? void 0 : _a2.call(on, { index: currentIndex });
      } : void 0
    };
    rendered = isResponsiveImageSlide(slide) ? react.exports.createElement(ResponsiveImage, { ...slideProps, slide, interactive, rect: offset2 === 0 ? { width: rect.width * zoom, height: rect.height * zoom } : rect }) : react.exports.createElement(ImageSlide, { onLoad: (img) => setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight }), ...slideProps });
  }
  if (!rendered)
    return null;
  return react.exports.createElement("div", { ref: zoomWrapperRef, className: clsx(cssClass(CLASS_FULLSIZE), cssClass(CLASS_FLEX_CENTER), cssClass(CLASS_SLIDE_WRAPPER), interactive && cssClass(CLASS_SLIDE_WRAPPER_INTERACTIVE)), style: offset2 === 0 ? { transform: `scale(${zoom}) translateX(${offsetX}px) translateY(${offsetY}px)` } : void 0 }, rendered);
}
const Zoom = ({ augment, addModule }) => {
  augment(({ zoom: zoomProps, toolbar, render, controller, ...restProps }) => {
    const zoom = resolveZoomProps(zoomProps);
    return {
      zoom,
      toolbar: addToolbarButton(toolbar, PLUGIN_ZOOM, react.exports.createElement(ZoomToolbarControl, null)),
      render: {
        ...render,
        slide: (props) => {
          var _a;
          return isImageSlide(props.slide) ? react.exports.createElement(ZoomWrapper, { render, ...props }) : (_a = render.slide) === null || _a === void 0 ? void 0 : _a.call(render, props);
        }
      },
      controller: { ...controller, preventDefaultWheelY: zoom.scrollToZoom },
      ...restProps
    };
  });
  addModule(createModule(PLUGIN_ZOOM, ZoomContextProvider));
};
var styles = "";
var previewLightbox = "";
const LightboxHost = ({
  slides,
  startIndex,
  onClose
}) => {
  const [open, setOpen] = React.useState(true);
  const hasMultipleImages = slides.length > 1;
  return /* @__PURE__ */ jsx(Lightbox, {
    open,
    close: () => {
      setOpen(false);
      onClose();
    },
    slides: slides.map((s) => ({
      src: s.src,
      filepath: s.filepath
    })),
    index: Math.min(startIndex, Math.max(0, slides.length - 1)),
    plugins: [Zoom],
    zoom: {
      maxZoomPixelRatio: 5,
      zoomInMultiplier: 1.5,
      wheelZoomDistanceFactor: 300,
      pinchZoomDistanceFactor: 300,
      scrollToZoom: true,
      doubleClickMaxStops: 2,
      doubleClickDelay: 300,
      keyboardMoveDistance: 50
    },
    carousel: {
      finite: !hasMultipleImages,
      preload: slides.length
    },
    toolbar: {
      buttons: ["zoom", "close"]
    },
    render: {
      iconLoading: () => /* @__PURE__ */ jsx("div", {
        children: t$1("Image is loading...")
      }),
      iconError: () => /* @__PURE__ */ jsx("div", {
        children: t$1("\u{1F61F} Cannot load image, image link maybe broken")
      }),
      buttonPrev: hasMultipleImages ? void 0 : () => null,
      buttonNext: hasMultipleImages ? void 0 : () => null
    },
    controller: {
      closeOnBackdropClick: true,
      closeOnPullDown: true
    }
  });
};
let lightboxHost = null;
function showPreviewImageDialog(imgUrl, filepath, allImages, startIndex = 0) {
  if (lightboxHost) {
    ReactDOM.unmountComponentAtNode(lightboxHost);
    lightboxHost.remove();
    lightboxHost = null;
  }
  const host = document.createElement("div");
  document.body.appendChild(host);
  lightboxHost = host;
  const slides = allImages && allImages.length > 0 ? allImages : [{
    src: imgUrl,
    filepath
  }];
  const cleanup2 = () => {
    if (lightboxHost) {
      ReactDOM.unmountComponentAtNode(lightboxHost);
      lightboxHost.remove();
      lightboxHost = null;
    }
  };
  ReactDOM.render(/* @__PURE__ */ jsx(LightboxHost, {
    slides,
    startIndex,
    onClose: cleanup2
  }), host);
}
const getPathOfImage = (vault, image2) => vault.getResourcePath(image2);
const urlOnly = (raw) => {
  const at = raw.search(/https?:\/\//);
  return at >= 0 ? raw.slice(at) : raw.trim();
};
const resolveFilePath = (app2, rawName, altText) => {
  const file = app2.metadataCache.getFirstLinkpathDest(decodeURIComponent(rawName), "");
  if (file === null) {
    return null;
  }
  const asFile = file;
  return {
    linkText: rawName,
    altText: altText || "",
    path: getPathOfImage(app2.vault, asFile),
    filepath: asFile.path
  };
};
const resolveWikiInternalLink = (app2, linkText) => {
  const m2 = new RegExp(WIKI_IMAGE_URL_REG.source).exec(linkText);
  if (!m2) {
    return null;
  }
  return resolveFilePath(app2, m2[1] || "", m2[5] || "");
};
const resolveMDInternalLink = (app2, linkText) => {
  const m2 = new RegExp(MARKDOWN_URL_REG.source).exec(linkText);
  if (!m2) {
    return null;
  }
  return resolveFilePath(app2, m2[5] || "", m2[2] || "");
};
function parseMemoImages(content, app2) {
  const external = [];
  const internal = [];
  const webReg = new RegExp(MARKDOWN_WEB_URL_REG.source, "g");
  let webMatch;
  while ((webMatch = webReg.exec(content)) !== null) {
    const url = urlOnly(webMatch[0]);
    if (url && !external.includes(url)) {
      external.push(url);
    }
  }
  const mdReg = new RegExp(MARKDOWN_URL_REG.source, "g");
  let mdMatch;
  while ((mdMatch = mdReg.exec(content)) !== null) {
    const link = mdMatch[0];
    const target = mdMatch[5] || "";
    if (/^https?:\/\//.test(target.trim())) {
      if (!external.includes(target.trim())) {
        external.push(target.trim());
      }
    } else {
      const resolved = resolveMDInternalLink(app2, link);
      if (resolved) {
        internal.push(resolved);
      }
    }
  }
  const wikiReg = new RegExp(WIKI_IMAGE_URL_REG.source, "g");
  let wikiMatch;
  while ((wikiMatch = wikiReg.exec(content)) !== null) {
    const resolved = resolveWikiInternalLink(app2, wikiMatch[0]);
    if (resolved) {
      internal.push(resolved);
    }
  }
  const all = [
    ...external.map((src) => ({ src })),
    ...internal.map((l2) => ({ src: l2.path, filepath: l2.filepath }))
  ];
  return { external, internal, all };
}
var react_1 = react.exports;
var isFunction = function(setStateAction) {
  return typeof setStateAction === "function";
};
var useStateRef = function(initialState) {
  var _a = react_1.useState(initialState), state = _a[0], setState = _a[1];
  var ref = react_1.useRef(state);
  var dispatch = react_1.useCallback(function(setStateAction) {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction;
    setState(ref.current);
  }, []);
  return [state, dispatch, ref];
};
var dist = useStateRef;
const CODE_BLOCK_REG = /```([\s\S]*?)```/g;
const BOLD_TEXT_REG = /\*\*(.+?)\*\*/g;
const EM_TEXT_REG = /\*(.+?)\*/g;
const TODO_BLOCK_REG = /\[ \] /g;
const DONE_BLOCK_REG = /\[.{1}\] /g;
const DOT_LI_REG = /^[*-]/g;
const NUM_LI_REG = /(\d+)\. /g;
const INTERNAL_MD_REG = /\[\[([^\]]+)\]\]/g;
const EXRERNAL_MD_REG = /\[([^\]]+)\]\((([^\]]+).md)\)/g;
const parseMarkedToHtml = (markedStr, memoid) => {
  const htmlText = markedStr.replace(CODE_BLOCK_REG, "<pre lang=''>$1</pre>").replace(DOT_LI_REG, "<span class='counter-block'>\u2022</span>").replace(NUM_LI_REG, "<span class='counter-block'>$1.</span>").replace(TODO_BLOCK_REG, "<span class='todo-block' data-type='todo'>\u2B1C</span>").replace(DONE_BLOCK_REG, "<span class='todo-block' data-type='done'>\u2705</span>").replace(BOLD_TEXT_REG, "<strong>$1</strong>").replace(EM_TEXT_REG, "<em>$1</em>").replace(/&lt;br&gt;/g, "</p><p>").replace(/&amp;/g, "&");
  let newHtmlText = htmlText;
  if (memoid) {
    if (INTERNAL_MD_REG.test(htmlText)) {
      const internalMD = htmlText.match(INTERNAL_MD_REG);
      for (let i = 0; i < internalMD.length; i++) {
        if (!/(jpeg|jpg|gif|png|svg|bmp|webp)/g.test(internalMD[i])) {
          const internalContent = getContentFromInternalLink(internalMD[i]);
          if (/\|/g.test(internalContent)) {
            const [link, label2] = internalContent.split("|");
            const replaceMent = replaceMd(link, label2);
            newHtmlText = htmlText.replace(internalMD[i], replaceMent);
          } else {
            const link = internalContent;
            const label2 = "";
            const replaceMent = replaceMd(link, label2);
            newHtmlText = newHtmlText.replace(internalMD[i], replaceMent);
          }
        }
      }
    }
    if (EXRERNAL_MD_REG.test(htmlText)) {
      const externalMD = htmlText.match(EXRERNAL_MD_REG);
      for (let i = 0; i < externalMD.length; i++) {
        if (!/(jpeg|jpg|gif|png|svg|bmp|webp)/g.test(externalMD[i])) {
          const link = getContentFromExternalLink(externalMD[i]);
          const label2 = getLabelFromExternalLink(externalMD[i]);
          const replaceMent = replaceMd(link, label2);
          newHtmlText = htmlText.replace(externalMD[i], replaceMent);
        }
      }
    }
  }
  return newHtmlText;
};
const replaceMd = (internalLink, label2) => {
  const { metadataCache } = appStore.getState().dailyNotesState.app;
  const file = metadataCache.getFirstLinkpathDest(decodeURIComponent(internalLink), "");
  if (file instanceof require$$0.TFile) {
    if (label2) {
      return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link">${label2}</a>`;
    } else {
      return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link">${internalLink}</a>`;
    }
  } else if (label2) {
    return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link is-unresolved">${label2}</a>`;
  } else {
    return `<a data-href="${internalLink}" data-type="link" data-filepath="${internalLink}" class="internal-link is-unresolved">${internalLink}</a>`;
  }
};
const getContentFromInternalLink = (line) => {
  var _a;
  return (_a = /\[\[([^\]]+)\]\]/g.exec(line)) == null ? void 0 : _a[1];
};
const getLabelFromExternalLink = (line) => {
  var _a;
  return (_a = EXRERNAL_MD_REG.exec(line)) == null ? void 0 : _a[1];
};
const getContentFromExternalLink = (line) => {
  var _a;
  return (_a = /\[([^\]]+)\]\((([^\]]+).md)\)/g.exec(line)) == null ? void 0 : _a[3];
};
const parseHtmlToRawText = (htmlStr) => {
  const tempEl = document.createElement("div");
  tempEl.className = "memo-content-text";
  tempEl.innerHTML = htmlStr;
  const text = tempEl.innerText;
  return text;
};
const parseRawTextToHtml = (rawTextStr) => {
  const htmlText = rawTextStr.replace(/\n/g, "<br> ");
  return htmlText;
};
const encodeHtml = (htmlStr) => {
  const t2 = document.createElement("div");
  t2.textContent = htmlStr;
  return t2.innerHTML;
};
var memoCardDialog = "";
function SvgEdit(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
  }));
}
var image = "";
const Image$1 = (props) => {
  const {
    className,
    imgUrl,
    alt,
    referrerPolicy,
    filepath,
    allImages,
    index
  } = props;
  const handleImageClick = () => {
    if (allImages && typeof index === "number") {
      showPreviewImageDialog(imgUrl, filepath, allImages, index);
    } else {
      showPreviewImageDialog(imgUrl, filepath);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "image-container " + className,
    onClick: handleImageClick,
    style: props.style,
    children: /* @__PURE__ */ jsx("img", {
      src: imgUrl,
      alt,
      decoding: "async",
      loading: "lazy",
      referrerPolicy,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })
  });
};
const MAX_COLS = 3;
const GAP = 2;
const CELL_WIDTH = 110;
const SINGLE_CELL_WIDTH = 160;
const MemoImage = (props) => {
  const {
    memo: memo2
  } = props;
  const {
    app: app2
  } = appStore.getState().dailyNotesState;
  const {
    all
  } = parseMemoImages(memo2, app2);
  if (all.length === 0) {
    return null;
  }
  const count = all.length;
  const cols = count >= MAX_COLS ? MAX_COLS : count;
  const cell = count === 1 ? SINGLE_CELL_WIDTH : CELL_WIDTH;
  const gridWidth = cols * cell + (cols - 1) * GAP;
  const imageGridStyles = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: `${GAP}px`,
    marginTop: "4px",
    width: `${gridWidth}px`,
    maxWidth: "100%"
  };
  const imageItemStyles = {
    aspectRatio: "1 / 1",
    overflow: "hidden"
  };
  const imageStyle = {
    width: "100%",
    height: "100%"
  };
  return /* @__PURE__ */ jsx("div", {
    className: "images-wrapper",
    style: imageGridStyles,
    children: all.map((image2, idx) => /* @__PURE__ */ jsx("div", {
      style: imageItemStyles,
      children: /* @__PURE__ */ jsx(Image$1, {
        className: "memo-img",
        imgUrl: image2.src,
        alt: "",
        filepath: image2.filepath,
        style: imageStyle,
        referrerPolicy: !image2.filepath ? "no-referrer" : void 0,
        allImages: all,
        index: idx
      })
    }, idx))
  });
};
const MemoCardDialog = (props) => {
  const showSeconds = appStore.getState().settingsState.settings.TimeFormat !== "HH:mm";
  const [memo2, setMemo] = react.exports.useState({
    ...props.memo,
    createdAtStr: utils$1.getDateTimeString(props.memo.createdAt, showSeconds)
  });
  const [linkMemos, setLinkMemos] = react.exports.useState([]);
  const [linkedMemos, setLinkedMemos] = react.exports.useState([]);
  react.exports.useEffect(() => {
    const fetchLinkedMemos = async () => {
      try {
        const linkMemos2 = [];
        const matchedArr = [...memo2.content.matchAll(MEMO_LINK_REG)];
        for (const matchRes of matchedArr) {
          if (matchRes && matchRes.length === 3) {
            const id2 = matchRes[2];
            const memoTemp = memoService.getMemoById(id2);
            if (memoTemp) {
              linkMemos2.push({
                ...memoTemp,
                createdAtStr: utils$1.getDateTimeString(memoTemp.createdAt, showSeconds),
                dateStr: utils$1.getDateString(memoTemp.createdAt)
              });
            }
          }
        }
        setLinkMemos([...linkMemos2]);
        const linkedMemos2 = await memoService.getLinkedMemos(memo2.id);
        setLinkedMemos(linkedMemos2.sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)).map((m2) => ({
          ...m2,
          createdAtStr: utils$1.getDateTimeString(m2.createdAt, showSeconds),
          dateStr: utils$1.getDateString(m2.createdAt)
        })));
      } catch (error) {
      }
    };
    fetchLinkedMemos();
  }, [memo2.id]);
  const handleMemoContentClick = react.exports.useCallback(async (e) => {
    var _a;
    const targetEl = e.target;
    if (targetEl.className === "memo-link-text") {
      const nextMemoId = (_a = targetEl.dataset) == null ? void 0 : _a.value;
      const memoTemp = memoService.getMemoById(nextMemoId != null ? nextMemoId : "");
      if (memoTemp) {
        const nextMemo = {
          ...memoTemp,
          createdAtStr: utils$1.getDateTimeString(memoTemp.createdAt)
        };
        setLinkMemos([]);
        setLinkedMemos([]);
        setMemo(nextMemo);
      } else {
        new require$$0.Notice("MEMO Not Found");
        targetEl.classList.remove("memo-link-text");
      }
    }
  }, []);
  const handleLinkedMemoClick = react.exports.useCallback((memo22) => {
    setLinkMemos([]);
    setLinkedMemos([]);
    setMemo(memo22);
  }, []);
  const handleEditMemoBtnClick = react.exports.useCallback(() => {
    props.destroy();
    globalStateService.setEditMemoId(memo2.id);
  }, [memo2.id]);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "memo-card-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "header-container",
        children: [/* @__PURE__ */ jsx("p", {
          className: "time-text",
          children: memo2.createdAtStr
        }), /* @__PURE__ */ jsxs("div", {
          className: "btns-container",
          children: [/* @__PURE__ */ jsx("button", {
            className: "btn edit-btn",
            onClick: handleEditMemoBtnClick,
            children: /* @__PURE__ */ jsx(SvgEdit, {
              className: "icon-img"
            })
          }), /* @__PURE__ */ jsx("button", {
            className: "btn close-btn",
            onClick: props.destroy,
            children: /* @__PURE__ */ jsx(SvgClose, {
              className: "icon-img"
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "memo-container",
        children: [/* @__PURE__ */ jsx("div", {
          className: "memo-content-text",
          onClick: handleMemoContentClick,
          dangerouslySetInnerHTML: {
            __html: formatMemoContent(memo2.content)
          }
        }), /* @__PURE__ */ jsx(MemoImage, {
          memo: memo2.content
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "layer-container"
      }), linkMemos.map((_, idx) => {
        if (idx < 4) {
          return /* @__PURE__ */ jsx("div", {
            className: "background-layer-container",
            style: {
              bottom: (idx + 1) * -3 + "px",
              left: (idx + 1) * 5 + "px",
              width: `calc(100% - ${(idx + 1) * 10}px)`,
              zIndex: -idx - 1
            }
          }, idx);
        } else {
          return null;
        }
      })]
    }), linkMemos.length > 0 ? /* @__PURE__ */ jsxs("div", {
      className: "linked-memos-wrapper",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "normal-text",
        children: [t$1("LINKED"), " ", linkMemos.length, " MEMO", " "]
      }), linkMemos.map((m2) => {
        const rawtext = parseHtmlToRawText(formatMemoContent(m2.content)).replaceAll("\n", " ");
        return /* @__PURE__ */ jsxs("div", {
          className: "linked-memo-container",
          onClick: () => handleLinkedMemoClick(m2),
          children: [/* @__PURE__ */ jsxs("span", {
            className: "time-text",
            children: [m2.dateStr, " "]
          }), rawtext]
        }, m2.id);
      })]
    }) : null, linkedMemos.length > 0 ? /* @__PURE__ */ jsxs("div", {
      className: "linked-memos-wrapper",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "normal-text",
        children: [linkedMemos.length, " MEMO ", t$1("LINK TO THE"), " MEMO"]
      }), linkedMemos.map((m2) => {
        const rawtext = parseHtmlToRawText(formatMemoContent(m2.content)).replaceAll("\n", " ");
        return /* @__PURE__ */ jsxs("div", {
          className: "linked-memo-container",
          onClick: () => handleLinkedMemoClick(m2),
          children: [/* @__PURE__ */ jsxs("span", {
            className: "time-text",
            children: [m2.dateStr, " "]
          }), rawtext]
        }, m2.id);
      })]
    }) : null]
  });
};
function showMemoCardDialog(memo2) {
  showDialog({
    className: "memo-card-dialog"
  }, MemoCardDialog, {
    memo: memo2
  });
}
const OnlyWhen = (props) => {
  const {
    children,
    when
  } = props;
  return when ? /* @__PURE__ */ jsx(Fragment, {
    children
  }) : null;
};
const Only = OnlyWhen;
var shareMemoImageDialog = "";
var lightBackground = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgd2lkdGg9IjExNDYuMzE4MjgiIGhlaWdodD0iODAxLjAwMzYxIiB2aWV3Qm94PSIwIDAgMTE0Ni4zMTgyOCA4MDEuMDAzNjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNMTA1MC42OTkxOCw1MTQuNTA4MmE0NTYuMjQ5MTMsNDU2LjI0OTEzLDAsMCwxLTM3LjM4MDEzLTI2MS44N2MzLjYwMDEtMjMuMSw5LjQ0MDA2LTQ2Ljg1LDI0LjQzMDE4LTY0Ljc5LDE0LjM4OTg5LTE3LjIzLDM5LjM0OTg1LTI3LjM3LDYwLjAyOTktMTkuMjktMTMuNTY5OTQtMjkuNjEtNDcuNzYtNDYuNS04MC41OS00Ny4zMy0zNC4wOS0uODYtNjYuOTIsMTIuNS05Ny4yNSwyOC4xLTMwLjMzLDE1LjYtNTkuNjUsMzMuODEwMDYtOTIuMjEsNDMuOTktNTMuNSwxNi43Mi0xMTEuOTEsMTAuMzQtMTY1LjUtNi4wOS01My41OC0xNi40NC0xMDMuNjItNDIuNDctMTU0LjYyLTY1LjcxLTUxLjAxLTIzLjI0LTEwNC4xNy00NC4wMy0xNjAuMDEtNDguOTEtNTUuODQtNC44Ny0xMTUuMjUsNy44OS0xNTcuMjQsNDUuMDFzLTYxLjg3LDEwMS4yOC0zOC4yNywxNTIuMTFjMTQuMjUsMzAuNyw0Mi4yMiw1NC4zMiw1Mi4wNCw4Ni43LDEyLjMyLDQwLjY1LTcuMDgsODMuOTYtMzAuNDEsMTE5LjQ1LTIzLjM0LDM1LjQ5LTUxLjgsNjkuNTgtNjAuNDcsMTExLjE2LTguMDEsMzguMzgsMi43Miw3OC4wMiwyNC4wNSwxMTEuMzhhMTk3LjM0NDY4LDE5Ny4zNDQ2OCwwLDAsMCwzNS43NCw0MS42MWM0My4wOSwzNy45MSw5OC43Nyw1OC4xNSwxNTQuMTcsNzMuMTMsMjAwLjI3LDU0LjE3LDQxNi4xMyw0OS4yOSw2MTMuNzUtMTMuODgsMzQuOTktMTEuMTgsNjkuOTUtMjQuNDMsOTkuMzItNDYuNDgsMTkuMTYtMTQuMzgsMzUuODMtMzMuMDIsNDYuMzktNTQuMzVhMTE0LjEwNTc0LDExNC4xMDU3NCwwLDAsMCwxMS4xMy0zNi4xODAwNUMxMTA0LjQzOTE3LDYxMC4xNzgxOSwxMDcyLjk2OTIsNTYyLjA1ODE5LDEwNTAuNjk5MTgsNTE0LjUwODJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzZjNjNmZiIvPjxnIG9wYWNpdHk9IjAuMTciPjxwYXRoIGQ9Ik04OTAuNzUwMzIsMjQ2LjQ1MTQ1YzkuNjQxNzEtNC4yMDM5NC05LjkxMTYzLTYuNjUxMTktMzIuMDk1ODUtNy40NTU4MnMtNDkuMDIwNjEtLjc2MDExLTYzLjE5NzU2LTMuMDQ4NzVjLTEzLjcxMTE0LTIuMjEzNDMtMTIuNzAwOS02LjE0OTA3LTEzLjg1NDI3LTkuNzE0ODlzLTYuNDI0NDYtNy4yMjItMjcuODE5MjgtOC4wMTQ3Yy0yNi42NjA3LS45ODc3NC03MC42MjU4MSwyLjgxNDM0LTkwLjc1MTcxLjUzMTczLTE4Ljc4MTIxLTIuMTMwMTEtNy42MTcyMy04LjgxMTgyLTM1LjAwMzQ0LTkuMDY3NTUtMTUuNjM4MzctLjE0Ni0zNS43ODQ5LDIuMDU2ODItNTMuMTg1NzcsMi41ODg0NC0xNi4zMzY0Ny40OTkwOS0yOC40MjIxNi0uNTM0NDEtMzYuOTAzNTctMS45MjRzLTE0LjM4ODc1LTMuMTUxMjYtMjMuOTM0MTMtNC4zNzg2NGMtMjUuMDYwNjgtMy4yMjI0LTc0LjA5MTMzLTIuMTM5MjUtMTE3Ljg1MywxLjk5MDcxcy04MS4yNzM0NCwxMC44OTgxNi0xMDIuNDI4ODksMTcuNjAxNzUtMjcuMDAwMjksMTMuMzAzNzYtMjIuMDcyMzksMTguOTAwNzFjMy4xNDY3NCwzLjU3NCwxMS4xOTkxNSw2LjkxNTg1LDMwLjczMjM1LDguMzUyLDM2LjUzNTU1LDIuNjg2MjEsMTAxLjU4Mzg3LTEuOTM3NSwxMzkuMzM3MTMuNTA2NDUsMjEuMDQxNSwxLjM2MjEzLDMwLjM3NjQsNC43MzkyNCw0OC44MzgxMiw2LjU4NzE2LDE5LjgzNDA3LDEuOTg1MjgsNDguODY5MzUsMi4wOTA1MSw3Ny4zOTY1NiwyLjA0MzQxLDU5LjM5NzIxLS4wOTgwNywxMjAuMzEzNy0uNzA4MjksMTgyLjQyOTk0LTEuODI3NDcsMjUuOTQ0ODYtLjQ2NzQ1LDUzLjEzLTEuMDc1Miw4MC43Mzc2MS0zLjMwMjg5czU1Ljc2NjIzLTYuNTI1OTEsNjEuNTkwNzYtMTAuNTU1MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiNmZmYiLz48L2c+PHBhdGggZD0iTTEwOTkuMjU5MTEsMTcyLjA0ODE4Yy0uNDYtMS4xOC0uOTYtMi4zNS0xLjQ4LTMuNDkuODQuMzMsMS42ODAwNi42OSwyLjUxLDEuMDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzZjNjNmZiIvPjxwYXRoIGQ9Ik02NDguNzQ0ODIsMzE0LjU4NDNjLTcuNjY5MzUtMTIuNjg0NDUtMTYuNzU3MjEtMjYuMjI3NjctMzAuOTg5NTUtMzAuMzY5NTMtMTYuNDgyLTQuNzk2NS0zMy40MTMxOSw0LjczMTkzLTQ3Ljc3NDczLDE0LjEzNDUzYTEzOTIuMTU2OTIsMTM5Mi4xNTY5MiwwLDAsMC0xMjMuODkzMzgsOTEuMjgzMTFsLjA0MzMxLjQ5MjM5cTQ2LjIyNTU2LTMuMTg3ODEsOTIuNDUxLTYuMzc1NTVjMjIuMjY1MzItMS41MzU0Niw0NS4yOTU1Ny0zLjI4MjcsNjQuOTcxOTUtMTMuODE1Niw3LjQ2NjUyLTMuOTk2ODMsMTQuNzQ0NzUtOS4zMzU3OSwyMy4yMDU1NS05LjcwNzgyLDEwLjUxMTc1LS40NjIxNywxOS42NzczMyw2Ljg3OTIzLDI2Ljg4MDIsMTQuNTQ5MzEsNDIuNjA3MzIsNDUuMzcxLDU0LjkzNywxMTQuNzU0MSwxMDIuNzM4MTcsMTU0LjYxNTkyQTE1MTYuOTk0NTgsMTUxNi45OTQ1OCwwLDAsMCw2NDguNzQ0ODIsMzE0LjU4NDNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iI2YyZjJmMiIvPjxwYXRoIGQ9Ik05MTAuNjQ1NzYsNjk5LjQxMjdjLTQuNzExNjgtNS45NDk1OC02LjYzNjkxLTcuMzQzLTExLjI4NDU3LTEzLjM0NzYxUTg0Mi41OTY4LDYxMi42NDg3Miw3OTIuNjUzMjcsNTM0LjI3MjcycS0zMy45MjM1My01My4yMzAwNS02NC40ODI3NS0xMDguNTA0MzktMTQuNTQ4NjMtMjYuMjc4MDgtMjguMjk5NjEtNTIuOTY4NzItMTAuNjcwNDMtMjAuNjk1Mi0yMC44NjQ2LTQxLjYzNzkzYy0xLjk0MzU3LTMuOTg3ODEtMy44MzIwOS03Ljk5MzkzLTUuNzExMjItMTIuMDA5MjItNC40Mjc4OC05LjQ0MjMyLTguNzczNC0xOC45MzA0Ny0xMy40Mzk0Mi0yOC4yNDQ0OS01LjMxNjg3LTEwLjYxNTcxLTExLjc4OTA1LTIxLjc0NDg1LTIxLjU1MjU5LTI4Ljg3N2EyOS40MDQ5LDI5LjQwNDksMCwwLDAtMTUuMzE4NTUtNS44OTQ1N2MtNy45NDgtLjUxMzM3LTE1LjI4MTg1LDIuNzY4NTQtMjIuMTc1NjksNi4zNTI5NC01MC40Mzg1OCwyNi4zMDEtOTcuNjU5MjEsNTkuMjc1ODktMTQwLjM2OTU5LDk2Ljc5NzcxQTczMC43Nzc4MSw3MzAuNzc3ODEsMCwwLDAsMzQ2LjM5NzQ4LDQ4NS44Nzg0M2MtMS4wMDgsMS40MzkyNy0zLjM5MTYzLjA2NDE4LTIuMzc0MTktMS4zODQyMnE2LjAwOTM1LTguNDk4MTgsMTIuMjU2ODEtMTYuODEyODhBNzM0LjgxNzQyLDczNC44MTc0MiwwLDAsMSw1NDMuODc5NzIsMjkyLjY5NTZxMTguMjQ4MjUtMTEuODI1NzksMzcuMTgyNjktMjIuNTQyNDVjNi4zNjIwNi0zLjYwMjc1LDEyLjc1MTg4LTcuMTU5NjcsMTkuMjUxMzYtMTAuNDk2NTMsNi4zNzE0Ny0zLjI3Mjc0LDEzLjEzNjg0LTYuMjE1NDcsMjAuNDE1NjMtNi4zMjU0NywyNC43NzAxMS0uMzg1LDM3LjU5NTQsMjcuNjY3LDQ2LjQwNTA2LDQ2LjU0MjQ4cTQuMTUyODMsOC45MTA2LDguNDA2MzYsMTcuNzY2MjYsMTYuMDc0ODEsMzMuNjIxMDYsMzMuMzg3MjksNjYuNjI4LDEwLjY4NDUzLDIwLjM3OSwyMS44MzY4Myw0MC41MTk1NSwzNC43MDcxLDYyLjcxODE2LDczLjc3ODU0LDEyMi44OTdjMzQuNTA1OSw1My4xNDI5LDY4LjczNjUxLDEwMC4wODg3NCwxMDguMDQ1ODYsMTQ5Ljc4NDczQzkxMy42NzEyNCw2OTguODQ0MzMsOTExLjczNzA2LDcwMC44MDYxNSw5MTAuNjQ1NzYsNjk5LjQxMjdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iI2U0ZTRlNCIvPjxwYXRoIGQ9Ik00NTcuOTkxMiwzNDUuNDM1MmMtMS40MzkxMS0xLjYwNDI4LTIuODY5MjYtMy4yMDg1Ni00LjMxNzc3LTQuODEyODQtMTEuNDIyNDQtMTIuNjMyNTktMjMuNjc4OC0yNS4xMTg0Ny0zOS4zNjQ0LTMyLjM2MDY3YTU3LjExMDIxLDU3LjExMDIxLDAsMCwwLTIzLjkyNjc4LTUuNTQ2MjJjLTguNTYyMTMuMDI3NTMtMTYuOTMxNzgsMi4yNzM0OC0yNC44NDMwNyw1LjQxNzkyLTMuNzQwMzQsMS40OTQyOC03LjM5ODMxLDMuMTkwMjEtMTEuMDAwNzgsNC45OTYxNC00LjExNjM0LDIuMDcxODItOC4xNTkyNyw0LjI4MTE4LTEyLjE4MzQsNi41MDg4M3EtMTEuMzMxMTIsNi4yNzA0NC0yMi4zNjgxNiwxMy4wOTA5LTIxLjk2MDYsMTMuNTcyMi00Mi41NDU2NSwyOS4yMTYyMy0xMC42NzExMSw4LjExMzExLTIwLjkwMTc1LDE2Ljc1Nzg4LTkuNTE1NTcsOC4wMzA1Mi0xOC42NDYxOCwxNi40OTJjLTEuMzAxNjgsMS4yMDA5MS0zLjI0NTI2LS43NDI1NS0xLjk0MzU4LTEuOTQzNDcsMS42MDQyOC0xLjQ5NDI4LDMuMjI2OTItMi45NzkzOCw0Ljg0OTU1LTQuNDQ2MTJxNi44NzU0OS02LjIxNTQ3LDEzLjk3MTItMTIuMTkyNTgsMTIuOTM5MjEtMTAuOTE4MjcsMjYuNTQ4NTEtMjAuOTkzMTIsMjEuMTYyOTUtMTUuNjc2MTQsNDMuNzgyODktMjkuMjI1NCwxMS4zMDM2LTYuNzY1NDcsMjIuOTE4MjktMTIuOTYyNmMyLjMzNzkzLTEuMjQ2NzQsNC43MDMxNy0yLjQ2Niw3LjA5NTcxLTMuNjIxMWExMTMuMTE0MzUsMTEzLjExNDM1LDAsMCwxLDE2Ljg2Nzc4LTYuODY2MzEsNjAuMDA2MjYsNjAuMDA2MjYsMCwwLDEsMjUuNDc2LTIuNTAyNjYsNjYuMzI3MjUsNjYuMzI3MjUsMCwwLDEsMjMuNTA1MTIsOC4xMzE0YzE1LjQwMDkxLDguNjA4MTIsMjcuMzQ1NzMsMjEuOTE5LDM4Ljk3MDA1LDM0LjkwOTE2QzQ2MS4xMDg0NCwzNDQuODAyNjUsNDU5LjE3MzgyLDM0Ni43NTUyOSw0NTcuOTkxMiwzNDUuNDM1MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjZTRlNGU0Ii8+PHBhdGggZD0iTTc3My41NTE2Niw0NzYuMzQyMTZsMzYuOTA0NjItMTMuNDk4LDE4LjMyMzI3LTYuNzAxODJjNS45Njc1OC0yLjE4MjY3LDExLjkyMDgyLTQuNjY3NDcsMTguMDg5ODktNi4yMzAzN2EyOC41Mzg2OCwyOC41Mzg2OCwwLDAsMSwxNi4zNzM1NS4yMDg2MiwzNy43MzczMSwzNy43MzczMSwwLDAsMSwxMi43NzEsNy45MTY2NywxMDMuNjM4NzEsMTAzLjYzODcxLDAsMCwxLDEwLjQ3NDg4LDExLjE4NjQyYzMuOTg5MzIsNC43OTQyNiw3LjkxOTcsOS42Mzg3OCwxMS44Njc3MiwxNC40NjcwNnEyNC40NDEzNSwyOS44OTA5Myw0OC41NjMwNiw2MC4wNDEzNCwyNC4xMjExOCwzMC4xNDk5MSw0Ny45MTk4MSw2MC41NTYsMjMuODU2ODEsMzAuNDgwNDIsNDcuMzg1NDgsNjEuMjE1NzMsMi44ODIzLDMuNzY1MTksNS43NTk2Nyw3LjUzNDE1YzEuMDU5OCwxLjM4ODA5LDMuNDQ5NDguMDE5NjIsMi4zNzQ3MS0xLjM4ODA3cS0yMy43MDIyNS0zMS4wNDQ0MS00Ny43MzQ5MS02MS44MzQ2NC0yNC4wOTE3Ny0zMC44NjM4My00OC41MTY0Ni02MS40NjU4Ni0yNC40MjQyMy0zMC42MDE0Mi00OS4xNzg1NC02MC45Mzc0NC02LjE2Ny03LjU1NzYtMTIuMzU0NDQtMTUuMDk4NThjLTMuNDc5NTQtNC4yNDA3Mi02LjkxOTg0LTguNTI3MTgtMTAuNzM2MjktMTIuNDc0MjYtNy4wMDUzOC03LjI0NTE2LTE1Ljc1NzcyLTEzLjY0Nzk0LTI2LjIzNDM3LTEzLjgyMTY3LTYuMTU5NzItLjEwMjE0LTEyLjEyMSwxLjg1MjQ4LTE3Ljg0NCwzLjkyMjg4LTYuMTY5NjcsMi4yMzItMTIuMzI0NTUsNC41MDU3MS0xOC40ODYzMiw2Ljc1OTRMNzgyLjExMTIzLDQ3MC4yOTIxbC05LjI5MDY4LDMuMzk4MTFjLTEuNjQ4NzQuNjAzLS45MzY1LDMuMjYxODkuNzMxMTEsMi42NTE5NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjZTRlNGU0Ii8+PHBhdGggZD0iTTQwOS40NTI0OCwzMjQuMTU3MzNjLTE4Ljc1NDExLTkuNjM4NjYtNDIuNzcxMzctNy43NTA4Ny02MC4wMDUwNyw0LjI5MTE5QTg1NS44NDUzMiw4NTUuODQ1MzIsMCwwLDEsNDQ2LjgxOCwzNTEuMTc0MzRDNDMzLjUzNTM3LDM0My4zOTA0LDQyMy4xNDUyMSwzMzEuMTk0NzUsNDA5LjQ1MjQ4LDMyNC4xNTczM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjZjJmMmYyIi8+PHBhdGggZD0iTTM0OS4yNjI4MiwzMjguNDE1MzQsMzQ1LjY1MjQsMzMxLjM1YzEuMjIxMjMtMS4wMjcxMywyLjQ5MDgtMS45OTAxMywzLjc5NS0yLjkwMTQ0QzM0OS4zODU4LDMyOC40Mzc4OSwzNDkuMzI0NDIsMzI4LjQyNiwzNDkuMjYyODIsMzI4LjQxNTM0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiNmMmYyZjIiLz48cGF0aCBkPSJNODc0LjYyNDM2LDQ3Ni40NzdjLTMuNjMyNzktNC40MjIwNi03LjU2MDQ2LTkuMDUyMjItMTIuOTk0MjEtMTAuODQ4MzZsLTUuMDczMDguMjAwMDlhNTc1LjQzNjI5LDU3NS40MzYyOSwwLDAsMCwxNTMuMjY3MjksMTc1LjIyMDU2UTk0Mi4yMjQzNyw1NTguNzYzMTcsODc0LjYyNDM2LDQ3Ni40NzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iI2YyZjJmMiIvPjxwYXRoIGQ9Ik0xMDg2LjY2OTE1LDY5OC40NDgyYy0xMC41NjAwNiwyMS4zMy0yNy4yMywzOS45Ny00Ni4zOSw1NC4zNS0yOS4zNywyMi4wNS02NC4zMywzNS4zLTk5LjMyLDQ2LjQ4LTE5Ny42Miw2My4xNy00MTMuNDgsNjguMDUtNjEzLjc1LDEzLjg4LTU1LjQtMTQuOTgtMTExLjA4LTM1LjIyLTE1NC4xNy03My4xM2ExOTcuMzQ0NjgsMTk3LjM0NDY4LDAsMCwxLTM1Ljc0LTQxLjYxYzU3LjM1LTMxLjUyLDEyNi44Ni00My40LDE5My4xOS00MS45NSw5NS4wOSwyLjA4LDE4Ny45NiwyNy40NiwyODIuMTYsNDAuNTlhMTEwMi42NjksMTEwMi42NjksMCwwLDAsMzM0LjA0LTQuNmMzOC4zMTk5NC02LjQzLDc3Ljk4LTE0Ljg0LDExNS40OS00LjY2QTk1LjE0OTU0LDk1LjE0OTU0LDAsMCwxLDEwODYuNjY5MTUsNjk4LjQ0ODJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzNmM2Q1NiIvPjxjaXJjbGUgY3g9IjE3OS4zMTgyOCIgY3k9IjUxIiByPSI1MSIgZmlsbD0iI2NjYyIvPjxwYXRoIGQ9Ik0zNjIuMzA4OTIsOTcuODQwNDJDMzQ4LjgxMTg1LDgzLjY4MTYsMzMzLjEzNjQzLDcwLjc2NSwzMTQuNTc5NjEsNjMuOTM5NDhhNzYuNzE1MjEsNzYuNzE1MjEsMCwwLDAtMTUuOTg2MzMtNC4wMTczNGMtLjA0Mzg4LS4wMDYtLjA4NTQ1LjAwMjg3LS4xMjkwOS0uMDAwNjdhMi4zNTU3NiwyLjM1NTc2LDAsMCwwLS4yNjk2NS0uMDUyOTIsNjEuNTM4OCw2MS41Mzg4LDAsMCwwLTIyLjg0MTMxLDEuMzc5LDYzLjEwNzM1LDYzLjEwNzM1LDAsMCwwLTEwLjYzNTE5LDMuNzA0OSw5My4wMDQ2Nyw5My4wMDQ2NywwLDAsMC05Ljk3OTQzLDUuNjU1NTdBNjQuOTA4MzIsNjQuOTA4MzIsMCwwLDEsMjMyLjY4NjMsNzguODM0OGE3NC4xODc3LDc0LjE4NzcsMCwwLDEtMTEuODQ0MDYsMS4xNjI0OGMtMy40NDcxNC4wNjkxNS02LjY5OC4xODg5LTkuOTY0LDEuNDM0MjZhMjMuOTE1NzMsMjMuOTE1NzMsMCwwLDAtMTQuNTY0OTQsMTUuNzcwNTEsMS41NTA3OCwxLjU1MDc4LDAsMCwwLC42ODkzMywxLjY5NGMuODgzNDkuNjMyNzUsMS43NDQ3NiwxLjM1MDY1LDIuNjczLDEuOTE0MzdhOC4zMzkyMiw4LjMzOTIyLDAsMCwwLDIuNjExLjcxMjA5cTIuMjEzNjYuNDY3MTEsNC40MzI5Mi45MDY5Myw4LjE3NTg0LDEuNjE5OTIsMTYuNDE5NjIsMi44Njc5MiwxNi42ODEsMi41MjUyLDMzLjU0MjE3LDMuNTU3NTVhMzczLjQ4MTMyLDM3My40ODEzMiwwLDAsMCw2Ny41MTAyNi0yLjAyOUEzNzQuNzcxNDQsMzc0Ljc3MTQ0LDAsMCwwLDM2MS42NDcsMTAwLjM0NzUsMS41MTM5LDEuNTEzOSwwLDAsMCwzNjIuMzA4OTIsOTcuODQwNDJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iI2YwZjBmMCIvPjxwYXRoIGQ9Ik0yMDguNTc5NjEsMTMxLjkzOTQ4YTc2LjcxNTIxLDc2LjcxNTIxLDAsMCwwLTE1Ljk4NjMzLTQuMDE3MzRjLS4wNDM4OC0uMDA2LS4wODU0NS4wMDI4Ny0uMTI5MDktLjAwMDY3YTIuMzU1NzYsMi4zNTU3NiwwLDAsMC0uMjY5NjUtLjA1MjkyLDYxLjUzODgsNjEuNTM4OCwwLDAsMC0yMi44NDEzMSwxLjM3OSw2My4xMDczNSw2My4xMDczNSwwLDAsMC0xMC42MzUxOSwzLjcwNDksOTMuMDA0NjcsOTMuMDA0NjcsMCwwLDAtOS45Nzk0Myw1LjY1NTU3LDY0LjkwODMyLDY0LjkwODMyLDAsMCwxLTIyLjA1MjMxLDguMjI2ODEsNzQuMTg3Nyw3NC4xODc3LDAsMCwxLTExLjg0NDA2LDEuMTYyNDhjLTMuNDQ3MTQuMDY5MTUtNi42OTguMTg4OS05Ljk2NCwxLjQzNDI2YTIzLjkxNTczLDIzLjkxNTczLDAsMCwwLTE0LjU2NDk0LDE1Ljc3MDUxLDEuNTUwNzgsMS41NTA3OCwwLDAsMCwuNjg5MzMsMS42OTRjLjg4MzQ5LjYzMjc1LDEuNzQ0NzYsMS4zNTA2NSwyLjY3MywxLjkxNDM3YTguMzM5MjIsOC4zMzkyMiwwLDAsMCwyLjYxMS43MTIwOXEyLjIxMzY2LjQ2NzEyLDQuNDMyOTIuOTA2OTMsOC4xNzU4NCwxLjYxOTkyLDE2LjQxOTYyLDIuODY3OTIsMTYuNjgxLDIuNTI1MiwzMy41NDIxNywzLjU1NzU1YTM3My40ODEzMiwzNzMuNDgxMzIsMCwwLDAsNjcuNTEwMjYtMi4wMjlBMzc0Ljc3MTQ0LDM3NC43NzE0NCwwLDAsMCwyNTUuNjQ3LDE2OC4zNDc1YTEuNTEzOSwxLjUxMzksMCwwLDAsLjY2MTkzLTIuNTA3MDhDMjQyLjgxMTg1LDE1MS42ODE2LDIyNy4xMzY0MywxMzguNzY1LDIwOC41Nzk2MSwxMzEuOTM5NDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iI2YwZjBmMCIvPjxwb2x5Z29uIHBvaW50cz0iMTA0Ny40MTEgNTg4LjE0MiAxMDc0LjU3NiA1NjcuNTE4IDEwODcuODE2IDU4MC43NTkgMTA0My41NjMgNjExLjA0MiAxMDQ3LjQxMSA1ODguMTQyIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTEwNDguOTE2MzUsNjk0LjQyNzgxSDk1NS45OTI2OWwzLjI1OTA3LTEwLjU1OTg3LDAsMGMyMC4xOTkzLTcuMzEyMjcsOC44NTMzMy0yMy4wMjk1NywyOC4wNjc1MS0zMi42MzY2Niw0Ni45OTY4LTIzLjQ5ODQsNjUuMTkxMTgtOTMuNjIwMDYsNTguMzA5MzItMTIxLjMzOTM1bDMwLjc5OC0xLjMwMjIxUzExMTguOTU4NzcsNjQ5LjM3NDc2LDEwNDguOTE2MzUsNjk0LjQyNzgxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNMTEyOC4yNDY1Myw2NDQuNzg4ODhhMTUuNjE4OTMsMTUuNjE4OTMsMCwwLDEtMjAuMTgyNzIuMzc3NTlsLS4wNjA0LS4wNDk2MS0uMDAyMDctLjA3NzY3YTE0Ljk2NDgzLDE0Ljk2NDgzLDAsMCwwLS42LTMuODE5MzYsMTAuNjkwNzcsMTAuNjkwNzcsMCwwLDEtLjM4ODE4LDIuNjQzNjZsLS4wNzc4NC4yODk5MS0uMjA4NzMtLjIxNTQ5Yy0uMTgwMjctLjE4NTg5LS4zNTQ3NC0uMzc0NzItLjUxODU5LS41NjFhMTUuNzUwODgsMTUuNzUwODgsMCwwLDEtMi4zOTktMy42MzI2OSw0NS45MTYyMyw0NS45MTYyMywwLDAsMC0xMi43NC0xNS44Nzk3MiwyMi4yOTIzNywyMi4yOTIzNywwLDAsMS0yLjY3MjctMi41NzE3MiwyMi4wMzQxNSwyMi4wMzQxNSwwLDAsMSwyNy42Njk1NS0zMy41NjkxMWwuMTM3NjcuMDgwNi0uMDcxNDguMTQyNWExMS40Nzc1NiwxMS40Nzc1NiwwLDAsMS0yLjA0Nzg4LDIuOTU0LDE0Ljk2ODI5LDE0Ljk2ODI5LDAsMCwwLDMuMTUzOTUtMi4yNzg2NWwuMTAwMDYtLjA5NDM2LjExMzM3LjA3ODE4YTIyLjEyNzkzLDIyLjEyNzkzLDAsMCwxLDQuMDI5NCwzLjU4NjdsLjEyODQ0LjE0NzI2YTkuODM2NDMsOS44MzY0MywwLDAsMCw3LjI4Mzc1LDMuMzYxMjMsMTUuNjE0LDE1LjYxNCwwLDAsMSwxNS4xMTk0NywxOC4yOTI5MWwtLjAxNzY5LjEwMzE1LS4xMDAzNC4wMzA0YTEzLjM5ODY2LDEzLjM5ODY2LDAsMCwxLTUuNDU2OTQuNjgwODgsMTUuMjIyMDgsMTUuMjIyMDgsMCwwLDAsNC44NjA2MSwxLjIxNzRsLjIxNjU0LjAxNzE4LS4wNjg3NC4yMDYxOWExNS42MDM1LDE1LjYwMzUsMCwwLDEtNC41MDMzOSw2Ljc5bC0uMDU5MjguMDUxODctLjA2Mjk0LjA1NTA5YTE1LjMzMjksMTUuMzMyOSwwLDAsMC01LjI5NywxMC42NDI3MkExNS43MzM0NSwxNS43MzM0NSwwLDAsMSwxMTI4LjI0NjUzLDY0NC43ODg4OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTExMzEuMDg5LDYzOS43NjkzNGExNS41NzQxOCwxNS41NzQxOCwwLDAsMS0uMTc1NiwxLjY3ODk0LDE1Ljc4NTIxLDE1Ljc4NTIxLDAsMCwwLDIuNTM3NzItNy44MjA0N2MuMDIwNzEtLjQyNjM3LjA2NTQ2LS44NTExLjEyNTQ5LTEuMjczOTNBMTQuODE0MSwxNC44MTQxLDAsMCwwLDExMzEuMDg5LDYzOS43NjkzNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTExMzYuMDAzMzEsNjIwLjc4OWExNS4xOTgxNSwxNS4xOTgxNSwwLDAsMCwzLjg4NDE4LDEuMDk4MjIsMTUuNjMsMTUuNjMsMCwwLDAsMS40MjMyMi0xLjczNjQ3QTEzLjI0MzYzLDEzLjI0MzYzLDAsMCwxLDExMzYuMDAzMzEsNjIwLjc4OVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTExNDEuNzI3MzYsNjE1LjY2MDgyYTE1LjcwOTA3LDE1LjcwOTA3LDAsMCwxLS4xMTExMiw0LjA1MTk0LDE1LjUyOTA4LDE1LjUyOTA4LDAsMCwwLDEuNzU3NTgtMy42MjQ1NWwuMDY4NzQtLjIwNjItLjIxNjU1LS4wMTcxOEExNS4wOTQ3MiwxNS4wOTQ3MiwwLDAsMSwxMTQxLjcyNzM2LDYxNS42NjA4MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTExNDAuMjgyNDEsNjAwLjgzOTY3YTE1LjY1MDc5LDE1LjY1MDc5LDAsMCwwLTExLjQ2MTQ5LTUuMjk5NTgsOS44MzY0OSw5LjgzNjQ5LDAsMCwxLTcuMjgzNzgtMy4zNjEyNGwtLjEyODQzLS4xNDcyNmEyMi4xMjc4NSwyMi4xMjc4NSwwLDAsMC00LjAyOTM5LTMuNTg2NjlsLS4xMTMzOC0uMDc4MTctLjEwMDA1LjA5NDM0YTE0Ljk2NzYsMTQuOTY3NiwwLDAsMS0zLjE1NCwyLjI3ODY1LDExLjQ3ODMyLDExLjQ3ODMyLDAsMCwwLDIuMDQ3OTQtMi45NTRsLjA3MTQ2LS4xNDI1LS4xMzc2Ni0uMDgwNTlhMjIuMDE3NzcsMjIuMDE3NzcsMCwwLDAtMzIuNjIxMTMsMTQuMjU0MiwyMi4wMjE4MiwyMi4wMjE4MiwwLDAsMSwzMC4yNTktOC4xMTI2OGwuMTM3NjUuMDgwNTktLjA3MTQ1LjE0MjVhMTEuNDc4MTQsMTEuNDc4MTQsMCwwLDEtMi4wNDc5NCwyLjk1NCwxNC45Njc1NCwxNC45Njc1NCwwLDAsMCwzLjE1NC0yLjI3ODY1bC4xMDAwNi0uMDk0MzQuMTEzMzguMDc4MTdhMjIuMTI4NTcsMjIuMTI4NTcsMCwwLDEsNC4wMjkzOSwzLjU4NjdsLjEyODQzLjE0NzI1YTkuODM2NDMsOS44MzY0MywwLDAsMCw3LjI4Mzc3LDMuMzYxMjQsMTUuNjE2NzUsMTUuNjE2NzUsMCwwLDEsMTUuMTAzNDcsMTIuODM0ODgsMTguOTI3MTQsMTguOTI3MTQsMCwwLDAsMi4yNjAwNS0uNTVsLjEwMDM0LS4wMzAzOS4wMTc3Ni0uMTAzMTRBMTUuNTU0LDE1LjU1NCwwLDAsMCwxMTQwLjI4MjQxLDYwMC44Mzk2N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTExNzMuMTU5MTMsNTM2LjU0MDY1YTUwLjI5MTQxLDUwLjI5MTQxLDAsMCwxLTQyLjAwNyw0OS41OTk2NWwtLjI0ODQuMDQwNTMtLjE5MjE5LS4xNjAxNmE0OC4xODU2NSw0OC4xODU2NSwwLDAsMC0xMC41MTAwOC02LjY3MTU5LDM0LjQyMzE2LDM0LjQyMzE2LDAsMCwxLDUuNTY2Miw2LjU2MDQ3bC41MzUzNy44MDQ2OS0uOTY0ODUuMDQ2NDFjLS44MzI4LjA0MDUzLTEuNjYwMzguMDYwOC0yLjQ1OTE5LjA2MDhhNTAuNzE1NTQsNTAuNzE1NTQsMCwwLDEtMTMuODg0NDUtMS45MjUxM2MtMjAuNTE3NDgtNS44Mzc0OC00Mi41NTAyMi02LjgzNTY3LTY1LjQ4NTcxLTIuOTY3MTFhNzEuNzc4NTYsNzEuNzc4NTYsMCwwLDEtMTEuOTAxNDcuOTkzQTcwLjk0Nzg3LDcwLjk0Nzg3LDAsMCwxLDEwMDkuMjg3LDQ0NC42MzcyM2wuNDg3NjUtLjE2MTQ2LjE5MjUxLjQ3NTg5YTM2Ljk1NjU5LDM2Ljk1NjU5LDAsMCwxLDIuNzg3LDExLjIzMzA2LDQ4LjE5NjM1LDQ4LjE5NjM1LDAsMCwwLDEuMTk3ODktMTIuNDcxMTZsLS4wMTUzNi0uNDQyNTUuNDMwMTMtLjEwNzg2YTcxLjI0OTM5LDcxLjI0OTM5LDAsMCwxLDE3LjI0MDUxLTIuMTE0N2wuNjI5MTguMDAyNjJhMzEuNjcyMjgsMzEuNjcyMjgsMCwwLDAsMjMuNjE2LTEwLjQ2MjM3LDUwLjI3NTY4LDUwLjI3NTY4LDAsMCwxLDc2LjM4MDE2LDIuMzQ2MTFsLjIxMTguMjYyMTMtLjEzOTkuMzA3MjNjLTIuOTM3NjksNi40NzQ4NC02LjEzODE4LDExLjE5MTg5LTkuOTU4MzYsMTQuNjQxNDNhNDkuMDEzNDMsNDkuMDEzNDMsMCwwLDAsMTMuMjc5NzgtOS4xNjI4MmwuNTAyLS40ODcuMzUyMzQuNjA0NjZBNTAuMjQyMTQsNTAuMjQyMTQsMCwwLDEsMTE0My4zMiw0NjQuNDI3OGwtLjAwMDY1LjI1MzYzYy0uMDAwNjUuMDg5NTYtLjAwMDY1LjE3OTc3LS4wMDA2NS4yNjkzMiwwLDEzLjYxMzE3LDUuMjY0MTksMjYuNTE1NzcsMTQuNDY2ODksMzUuNDM5MzRBNTAuNjYwMjEsNTAuNjYwMjEsMCwwLDEsMTE3My4xNTkxMyw1MzYuNTQwNjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzNmM2Q1NiIvPjxnIG9wYWNpdHk9IjAuMTUiPjxwYXRoIGQ9Ik0xMTExLjY4ODY4LDQxNy43MTcxM2EzNS41MTksMzUuNTE5LDAsMCwxLTYuMzM1MDksNy43NzE1OSw0OC44ODkyOSw0OC44ODkyOSwwLDAsMCw5Ljg5ODIzLTYuMTg2NVExMTEzLjUwMjI4LDQxOC40NDAzOCwxMTExLjY4ODY4LDQxNy43MTcxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIi8+PHBhdGggZD0iTTExNDAuNzkyOTMsNDc3LjczMzIzYTUwLjQ4MTkxLDUwLjQ4MTkxLDAsMCwxLDcuMjI5ODEsOC44MDc3NSw1MS4zOTI4OCw1MS4zOTI4OCwwLDAsMS00LjcwNDA1LTIxLjU5MDIyYzAtLjA4OTU3LDAtLjE3OTc4LjAwMDY1LS4yNjkzMmwuMDAwNjQtLjI1MzY0YTUwLjI0MjQ1LDUwLjI0MjQ1LDAsMCwwLTYuODM5NTYtMjUuMzI3MzVsLS4zNTIzNS0uNjA0NjgtLjUwMjA3LjQ4N2E0OS4xMjYxNiw0OS4xMjYxNiwwLDAsMS05LjE3MDQzLDYuOTgzQTQ4Ljk3MTg1LDQ4Ljk3MTg1LDAsMCwwLDExNDAuNzkyOTMsNDc3LjczMzIzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiLz48cGF0aCBkPSJNMTEyNi4zMjczMyw0NDEuNzcwOTNsLS4wMDA2NS4yNTM2NGMtLjAwMDY0LjA4OTU0LS4wMDA2NC4xNzk3NS0uMDAwNjQuMjY5MzEsMCwuNDkzNTUuMDA4OTQuOTg1ODUuMDIyNzIsMS40NzczOWE1Mi4zNjQ4LDUyLjM2NDgsMCwwLDAsNS45NTU4Ny0xMC4yNjcwOWwuMTM5ODUtLjMwNzI1LS4yMTE3Ni0uMjYyMTJhNTAuNjg4MTEsNTAuNjg4MTEsMCwwLDAtOS4wOTYtOC43OTczM0E1MC4zNTYyMSw1MC4zNTYyMSwwLDAsMSwxMTI2LjMyNzMzLDQ0MS43NzA5M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIi8+PHBhdGggZD0iTTExNTcuNzg1NTksNTAwLjM5MDFhNDUuNDU5MzQsNDUuNDU5MzQsMCwwLDEtNi40MDgzOC03Ljc5NjY2LDUwLjIyOTcsNTAuMjI5NywwLDAsMS0zNy4yMTc3Miw3MC44OWwtLjI0ODQxLjA0MDU0LS4xOTIxNy0uMTYwMTZhNDguMTg4LDQ4LjE4OCwwLDAsMC0xMC41MTAxLTYuNjcxNTksMzQuNDIyNjIsMzQuNDIyNjIsMCwwLDEsNS41NjYxNyw2LjU2MDQ2bC41MzU0LjgwNDcxLS45NjQ4Mi4wNDY0Yy0uODMyODYuMDQwNTQtMS42NjA0MS4wNjA4LTIuNDU5Mi4wNjA4YTUwLjcxNTQ5LDUwLjcxNTQ5LDAsMCwxLTEzLjg4NDQ4LTEuOTI1MTRjLTIwLjUxNzQ5LTUuODM3NDctNDIuNTUwMjItNi44MzU2Ni02NS40ODU3LTIuOTY3MWE3MS43NzkzLDcxLjc3OTMsMCwwLDEtMTEuOTAxNDUuOTkzLDcwLjYyMzg5LDcwLjYyMzg5LDAsMCwxLTQ3LjEyLTE3Ljk2OSw3MS4wMTExOCw3MS4wMTExOCwwLDAsMCw2NC4xMTI3LDQwLjYyNTksNzEuNzc5NDcsNzEuNzc5NDcsMCwwLDAsMTEuOTAxNDUtLjk5Mjk0YzIyLjkzNTQ3LTMuODY4NTcsNDQuOTY4MjEtMi44NzAzNyw2NS40ODU3LDIuOTY3MDlhNTAuNzE1NDMsNTAuNzE1NDMsMCwwLDAsMTMuODg0NDgsMS45MjUxNGMuNzk4NzgsMCwxLjYyNjM0LS4wMjAyNiwyLjQ1OTE5LS4wNjA4bC45NjQ4My0uMDQ2NC0uNTM1NC0uODA0NzFhMzQuNDIyNjMsMzQuNDIyNjMsMCwwLDAtNS41NjYxOC02LjU2MDQ1LDQ4LjE4Nzc0LDQ4LjE4Nzc0LDAsMCwxLDEwLjUxMDExLDYuNjcxNTlsLjE5MjE3LjE2MDE2LjI0ODQxLS4wNDA1NWE1MC4yNTM5Miw1MC4yNTM5MiwwLDAsMCwyNi42MzM0NC04NS43NTAxOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIi8+PC9nPjxwb2x5Z29uIHBvaW50cz0iMTM0LjAzNSA1NjAuOTczIDk3LjIyMyA1MzMuMDI1IDc5LjI4IDU1MC45NjggMTM5LjI1IDU5Mi4wMDcgMTM0LjAzNSA1NjAuOTczIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTE5NS4yMSw2ODcuNDI3ODFoMTI1LjkyNjZMMzE2LjcyLDY3My4xMTc0N2wwLDBjLTI3LjM3MzMyLTkuOTA5My0xMS45OTc2OS0zMS4yMDg3OS0zOC4wMzYtNDQuMjI4LTYzLjY4ODI3LTMxLjg0NDE0LTg4LjM0NDYtMTI2Ljg3MDM1LTc5LjAxODU2LTE2NC40MzQ0N2wtNDEuNzM2MjUtMS43NjQ3MVMxMDAuMjkxMTMsNjI2LjM3MzY0LDE5NS4yMSw2ODcuNDI3ODFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik04MC41NTM2NSw2MDUuMjUyMTlhMjAuNzc4NiwyMC43Nzg2LDAsMCwwLTcuMTc4MzMtMTQuNDIyNjFjLS4wMjgzLS4wMjQ4OS0uMDU2ODEtLjA1LS4wODUyOS0uMDc0NjVsLS4wODAzNC0uMDcwM2EyMS4xNDUzOSwyMS4xNDUzOSwwLDAsMS02LjEwMjgzLTkuMjAxNDhsLS4wOTMxNS0uMjc5NDIuMjkzNDUtLjAyMzI5YTIwLjYyODMsMjAuNjI4MywwLDAsMCw2LjU4NjkxLTEuNjQ5NzcsMTguMTU3MjYsMTguMTU3MjYsMCwwLDEtNy4zOTUtLjkyMjdsLS4xMzYtLjA0MTItLjAyNC0uMTM5NzlhMjEuMTU5NTMsMjEuMTU5NTMsMCwwLDEsMjAuNDg5MzItMjQuNzg5ODUsMTMuMzI5ODcsMTMuMzI5ODcsMCwwLDAsOS44NzA2Ni00LjU1NWwuMTc0MDYtLjE5OTU2YTI5Ljk4NjgsMjkuOTg2OCwwLDAsMSw1LjQ2MDQ5LTQuODYwNTVsLjE1MzY0LS4xMDYuMTM1NTkuMTI3ODZhMjAuMjg0NSwyMC4yODQ1LDAsMCwwLDQuMjc0MTEsMy4wODgsMTUuNTU0LDE1LjU1NCwwLDAsMS0yLjc3NTE5LTQuMDAzMTJsLS4wOTY4OC0uMTkzMTIuMTg2NTctLjEwOTIzQTI5Ljg1OTg0LDI5Ljg1OTg0LDAsMCwxLDE0MS43MDgxOCw1ODguMzE4YTMwLjIwOSwzMC4yMDksMCwwLDEtMy42MjE5NSwzLjQ4NTExLDYyLjIyNCw2Mi4yMjQsMCwwLDAtMTcuMjY0ODMsMjEuNTE5NTksMjEuMzQ0NDcsMjEuMzQ0NDcsMCwwLDEtMy4yNTEsNC45MjI4OWMtLjIyMi4yNTI0NC0uNDU4NDguNTA4MzQtLjcwMjc3Ljc2MDI2bC0uMjgyODYuMjkyLS4xMDU0OS0uMzkyODdhMTQuNDg3NDIsMTQuNDg3NDIsMCwwLDEtLjUyNi0zLjU4MjU5LDIwLjI3OTYxLDIwLjI3OTYxLDAsMCwwLS44MTMsNS4xNzU4NWwtLjAwMjgxLjEwNTI1LS4wODE4NS4wNjcyNGEyMS4xNTAzNywyMS4xNTAzNywwLDAsMS0zNC41MDE5Mi0xNS40MTg1M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjM2YzZDU2Ii8+PHBhdGggZD0iTTgzLjg1MjY2LDYxMy4zNTY3M2EyMS4xMDM3NCwyMS4xMDM3NCwwLDAsMCwuMjM4LDIuMjc1MjQsMjEuMzkxNTYsMjEuMzkxNTYsMCwwLDEtMy40MzktMTAuNTk4Yy0uMDI4MDYtLjU3NzgxLS4wODg3MS0xLjE1MzM5LS4xNzAwNi0xLjcyNjM5QTIwLjA3NTYyLDIwLjA3NTYyLDAsMCwxLDgzLjg1MjY2LDYxMy4zNTY3M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTc3LjE5Myw1ODcuNjM1MjRhMjAuNTk2ODEsMjAuNTk2ODEsMCwwLDEtNS4yNjM3LDEuNDg4MjYsMjEuMTgwMjksMjEuMTgwMjksMCwwLDEtMS45Mjg2OC0yLjM1MzJBMTcuOTQ3MzEsMTcuOTQ3MzEsMCwwLDAsNzcuMTkzLDU4Ny42MzUyNFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBvcGFjaXR5PSIwLjE1Ii8+PHBhdGggZD0iTTY5LjQzNiw1ODAuNjg1NzlhMjEuMjg4OTMsMjEuMjg4OTMsMCwwLDAsLjE1MDYsNS40OTEsMjEuMDQzODksMjEuMDQzODksMCwwLDEtMi4zODE4LTQuOTExODZsLS4wOTMxNi0uMjc5NDMuMjkzNDYtLjAyMzI5QTIwLjQ1MTcsMjAuNDUxNywwLDAsMCw2OS40MzYsNTgwLjY4NTc5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIG9wYWNpdHk9IjAuMTUiLz48cGF0aCBkPSJNNzEuMzk0MTUsNTYwLjYwMDczYTIxLjIwOTMxLDIxLjIwOTMxLDAsMCwxLDE1LjUzMjE4LTcuMTgxNzksMTMuMzMsMTMuMzMsMCwwLDAsOS44NzA2OS00LjU1NWwuMTc0LS4xOTk1NWEyOS45ODcxNywyOS45ODcxNywwLDAsMSw1LjQ2MDQ4LTQuODYwNTZsLjE1MzY0LS4xMDU5My4xMzU1OS4xMjc4NWEyMC4yODM3NywyMC4yODM3NywwLDAsMCw0LjI3NDE1LDMuMDg3OTQsMTUuNTU0NzQsMTUuNTU0NzQsMCwwLDEtMi43NzUyOS00LjAwMzEybC0uMDk2ODMtLjE5MzEyLjE4NjU1LS4xMDkyMUEyOS44Mzc2NCwyOS44Mzc2NCwwLDAsMSwxNDguNTE2MjcsNTYxLjkyNWEyOS44NDMxNSwyOS44NDMxNSwwLDAsMC00MS4wMDU4NS0xMC45OTRsLS4xODY1NS4xMDkyMS4wOTY4My4xOTMxMWExNS41NTQ4LDE1LjU1NDgsMCwwLDAsMi43NzUyOSw0LjAwMzEzLDIwLjI4NDEyLDIwLjI4NDEyLDAsMCwxLTQuMjc0MTUtMy4wODc5NGwtLjEzNTU5LS4xMjc4Ni0uMTUzNjQuMTA1OTRhMjkuOTg3MTEsMjkuOTg3MTEsMCwwLDAtNS40NjA0OCw0Ljg2MDU1bC0uMTc0LjE5OTU2YTEzLjMzLDEzLjMzLDAsMCwxLTkuODcwNjksNC41NTVBMjEuMTYzMTYsMjEuMTYzMTYsMCwwLDAsNjkuNjU5NzUsNTc5LjEzNWEyNS42NDg0NSwyNS42NDg0NSwwLDAsMS0zLjA2MjczLS43NDUyOWwtLjEzNi0uMDQxMTgtLjAyNDA3LS4xMzk3OEEyMS4wNzgyNCwyMS4wNzgyNCwwLDAsMSw3MS4zOTQxNSw1NjAuNjAwNzNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgb3BhY2l0eT0iMC4xNSIvPjxwYXRoIGQ9Ik00Ny42NzQ1NCw0MjQuNDc1MjljMTIuNDcxMTQtMTIuMDkyODksMTkuNjA1LTI5LjU3OCwxOS42MDUtNDguMDI2LDAtLjEyMTM2LDAtLjI0MzYxLS4wMDA4OS0uMzY1bC0uMDAwODgtLjM0MzcyYTY4LjA4NjExLDY4LjA4NjExLDAsMCwxLDkuMjY4NzYtMzQuMzIyNjZsLjQ3NzQ4LS44MTk0Mi42ODAzNC42NmE2Ni40MjEyMiw2Ni40MjEyMiwwLDAsMCwxNy45OTYyNSwxMi40MTcxMWMtNS4xNzctNC42NzQ2OS05LjUxNDE0LTExLjA2NzA2LTEzLjQ5NTItMTkuODQxNWwtLjE4OTU3LS40MTYzNi4yODctLjM1NTIzYTY4LjEzMTY4LDY4LjEzMTY4LDAsMCwxLDEwMy41MDc0OS0zLjE3OTM1LDQyLjkyMTEsNDIuOTIxMSwwLDAsMCwzMi4wMDM0OCwxNC4xNzgybC44NTI2NC0uMDAzNTVhOTYuNTU0NjcsOTYuNTU0NjcsMCwwLDEsMjMuMzYzNjksMi44NjU3NmwuNTgyODkuMTQ2MTctLjAyMDgxLjU5OTczYTY1LjMxMzA3LDY1LjMxMzA3LDAsMCwwLDEuNjIzMzQsMTYuOTAwNDQsNTAuMDgyMjcsNTAuMDgyMjcsMCwwLDEsMy43NzY4Ni0xNS4yMjI2MmwuMjYwODktLjY0NDkxLjY2MDg1LjIxODgxYTk2LjE0NTg1LDk2LjE0NTg1LDAsMCwxLTMwLjI0NzcxLDE4Ny4zOTg0OEE5Ny4yNzE5Miw5Ny4yNzE5MiwwLDAsMSwyMDIuNTM4LDUzNC45NzRjLTMxLjA4MTMtNS4yNDI1My02MC45MzkyMy0zLjg4OTgyLTg4Ljc0Mzc0LDQuMDIwOTJhNjguNzI3ODcsNjguNzI3ODcsMCwwLDEtMTguODE1NjcsMi42MDg4NmMtMS4wODI1MiwwLTIuMjA0LS4wMjc0Ny0zLjMzMjYxLS4wODIzOWwtMS4zMDc1My0uMDYyOUw5MS4wNjQsNTQwLjM2OGE0Ni42NDk2OCw0Ni42NDk2OCwwLDAsMSw3LjU0MzEtOC44OTA1LDY1LjI5OTgxLDY1LjI5OTgxLDAsMCwwLTE0LjI0Mjg2LDkuMDQxMWwtLjI2MDQ1LjIxNy0uMzM2NjItLjA1NDkyQTY4LjEwMjE5LDY4LjEwMjE5LDAsMCwxLDQ3LjY3NDU0LDQyNC40NzUyOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjM2YzZDU2Ii8+PGcgb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTExMC4xNDMyOCwzMTIuNDRhNDguMTM0MzgsNDguMTM0MzgsMCwwLDAsOC41ODUwOCwxMC41MzE3Niw2Ni4yNTI4Myw2Ni4yNTI4MywwLDAsMS0xMy40MTM3LTguMzgzNzFRMTA3LjY4NTU2LDMxMy40MjAxNiwxMTAuMTQzMjgsMzEyLjQ0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiLz48cGF0aCBkPSJNNzAuNzAyMzEsMzkzLjc3MTU3YTY4LjQxMSw2OC40MTEsMCwwLDAtOS43OTc1NiwxMS45MzU5Miw2OS42NDU3Nyw2OS42NDU3NywwLDAsMCw2LjM3NDc1LTI5LjI1ODI1YzAtLjEyMTM3LDAtLjI0MzYyLS4wMDA4OC0uMzY1bC0uMDAwODctLjM0MzcyYTY4LjA4NjYxLDY4LjA4NjYxLDAsMCwxLDkuMjY4NzEtMzQuMzIyNjZsLjQ3NzUtLjgxOTQ0LjY4MDM5LjY2YTY2LjU3MzgsNjYuNTczOCwwLDAsMCwxMi40Mjc0MSw5LjQ2MzA1Qzg4Ljk3MTk0LDM2Ny4zMTA0OSw4Mi4wNDYsMzgyLjc3MTg5LDcwLjcwMjMxLDM5My43NzE1N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIi8+PHBhdGggZD0iTTkwLjMwNTU1LDM0NS4wMzY4M2wuMDAwODcuMzQzNzJjLjAwMDg4LjEyMTM0LjAwMDg4LjI0MzU5LjAwMDg4LjM2NSwwLC42Njg4NC0uMDEyMTIsMS4zMzYtLjAzMDgsMi4wMDIxQTcwLjk2MjQsNzAuOTYyNCwwLDAsMSw4Mi4yMDUzNCwzMzMuODM0bC0uMTg5NTMtLjQxNjM3LjI4Ny0uMzU1MjJhNjguNjkwNDQsNjguNjkwNDQsMCwwLDEsMTIuMzI2NTktMTEuOTIxODFBNjguMjQwODYsNjguMjQwODYsMCwwLDAsOTAuMzA1NTUsMzQ1LjAzNjgzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiLz48cGF0aCBkPSJNNDcuNjc0NTEsNDI0LjQ3NTNhNjEuNjA1MjUsNjEuNjA1MjUsMCwwLDAsOC42ODQ0LTEwLjU2NTc1LDY4LjA2OTM4LDY4LjA2OTM4LDAsMCwwLDUwLjQzNiw5Ni4wNjc0MWwuMzM2NjQuMDU0OTQuMjYwNDItLjIxN2E2NS4zMDI1Myw2NS4zMDI1MywwLDAsMSwxNC4yNDI4OS05LjA0MTA4LDQ2LjY0NzY3LDQ2LjY0NzY3LDAsMCwwLTcuNTQzMDYsOC44OTA0N2wtLjcyNTU2LDEuMDkwNTIsMS4zMDc1LjA2Mjg3YzEuMTI4NjUuMDU0OTQsMi4yNTAxMi4wODIzOSwzLjMzMjYxLjA4MjM5YTY4LjcyNzYyLDY4LjcyNzYyLDAsMCwwLDE4LjgxNTcyLTIuNjA4ODZjMjcuODA0NTEtNy45MTA3Miw1Ny42NjI0NC05LjI2MzQ0LDg4Ljc0MzcyLTQuMDIwOWE5Ny4yNzI2Miw5Ny4yNzI2MiwwLDAsMCwxNi4xMjgzOSwxLjM0NTYsOTUuNzA2OSw5NS43MDY5LDAsMCwwLDYzLjg1NTMtMjQuMzUwOTQsOTYuMjMxNjUsOTYuMjMxNjUsMCwwLDEtODYuODgzMDksNTUuMDU0NjdBOTcuMjcyNDUsOTcuMjcyNDUsMCwwLDEsMjAyLjUzOCw1MzQuOTc0Yy0zMS4wODEyOS01LjI0MjU0LTYwLjkzOTIyLTMuODg5ODItODguNzQzNzMsNC4wMjA5YTY4LjcyNzYzLDY4LjcyNzYzLDAsMCwxLTE4LjgxNTcyLDIuNjA4ODdjLTEuMDgyNDksMC0yLjIwNC0uMDI3NDYtMy4zMzI2MS0uMDgyNGwtMS4zMDc0OS0uMDYyODdMOTEuMDY0LDU0MC4zNjhhNDYuNjQ4MzQsNDYuNjQ4MzQsMCwwLDEsNy41NDMwNi04Ljg5MDQ3LDY1LjMwMjUzLDY1LjMwMjUzLDAsMCwwLTE0LjI0Mjg5LDkuMDQxMDhsLS4yNjA0Mi4yMTctLjMzNjYzLS4wNTQ5NEE2OC4xMDIxOSw2OC4xMDIxOSwwLDAsMSw0Ny42NzQ1MSw0MjQuNDc1M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIi8+PC9nPjxjaXJjbGUgY3g9IjQ2MC4zMTgyOCIgY3k9IjE4NSIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjgzNC4zMTgyOCIgY3k9IjMwNSIgcj0iMyIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9Ijg5Mi4zMTgyOCIgY3k9IjE3MCIgcj0iMyIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjM1NS4zMTgyOCIgY3k9IjgwIiByPSIzIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzI1LjMxODI4IiBjeT0iMjAxIiByPSIzIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTc5LjMxODI4IiBjeT0iMTcwIiByPSIzIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNjk2LjMxODI4IiBjeT0iMTk1IiByPSIzIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwMy4zMTgyOCIgY3k9Ijk4IiByPSIzIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMyOC45NTkyOSw0MTMuNTYzMjdjLTMuNzk5NTgtNy4wMzUtNC4zMy0xNi4yNTUzNy4zMzUzMS0yMi43NDg1OWEzNi44Mzg0MywzNi44Mzg0MywwLDAsMCwxNC42NzUwNywyMC41OTkzYzIuNzcxODEsMS44ODcxOSw2LjA1MTI0LDMuNjk3NTgsNi45OTk0Nyw2LjkxNGE4LjIzNDg4LDguMjM0ODgsMCwwLDEtLjg1ODY0LDYuMDQ0NDUsMjQuNDU3MSwyNC40NTcxLDAsMCwxLTMuNzk1MDUsNC45NTQ5NGwtLjEzNDMzLjUwMzI1QzMzOS4zMDI2OCw0MjUuNzU0NDMsMzMyLjc1ODg2LDQyMC41OTgyOSwzMjguOTU5MjksNDEzLjU2MzI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNOTEwLjk1OTI5LDYxMi41NjMyN2MtMy43OTk1OC03LjAzNS00LjMzLTE2LjI1NTM3LjMzNTMxLTIyLjc0ODU5YTM2LjgzODQzLDM2LjgzODQzLDAsMCwwLDE0LjY3NTA3LDIwLjU5OTNjMi43NzE4MSwxLjg4NzE5LDYuMDUxMjQsMy42OTc1OCw2Ljk5OTQ3LDYuOTE0YTguMjM0ODgsOC4yMzQ4OCwwLDAsMS0uODU4NjQsNi4wNDQ0NSwyNC40NTcxLDI0LjQ1NzEsMCwwLDEtMy43OTUsNC45NTQ5NGwtLjEzNDMzLjUwMzI1QzkyMS4zMDI2OCw2MjQuNzU0NDMsOTE0Ljc1ODg2LDYxOS41OTgyOSw5MTAuOTU5MjksNjEyLjU2MzI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNNTkxLjk1OTI5LDQ0OS41NjMyN2MtMy43OTk1OC03LjAzNS00LjMzLTE2LjI1NTM3LjMzNTMxLTIyLjc0ODU5YTM2LjgzODQzLDM2LjgzODQzLDAsMCwwLDE0LjY3NTA3LDIwLjU5OTNjMi43NzE4MSwxLjg4NzE5LDYuMDUxMjQsMy42OTc1OCw2Ljk5OTQ3LDYuOTE0YTguMjM0ODgsOC4yMzQ4OCwwLDAsMS0uODU4NjQsNi4wNDQ0NSwyNC40NTcxLDI0LjQ1NzEsMCwwLDEtMy43OTUsNC45NTQ5NGwtLjEzNDMzLjUwMzI1QzYwMi4zMDI2OCw0NjEuNzU0NDMsNTk1Ljc1ODg2LDQ1Ni41OTgyOSw1OTEuOTU5MjksNDQ5LjU2MzI3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNMjg3Ljk1OTI5LDU2NS41NjMyN2MtMy43OTk1OC03LjAzNS00LjMzLTE2LjI1NTM3LjMzNTMxLTIyLjc0ODU5YTM2LjgzODQzLDM2LjgzODQzLDAsMCwwLDE0LjY3NTA3LDIwLjU5OTNjMi43NzE4MSwxLjg4NzE5LDYuMDUxMjQsMy42OTc1OCw2Ljk5OTQ3LDYuOTE0YTguMjM0ODgsOC4yMzQ4OCwwLDAsMS0uODU4NjQsNi4wNDQ0NSwyNC40NTcxLDI0LjQ1NzEsMCwwLDEtMy43OTUwNSw0Ljk1NDk0bC0uMTM0MzMuNTAzMjVDMjk4LjMwMjY4LDU3Ny43NTQ0MywyOTEuNzU4ODYsNTcyLjU5ODI5LDI4Ny45NTkyOSw1NjUuNTYzMjdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzNmM2Q1NiIvPjxwYXRoIGQ9Ik0yNDkuOTU5MjksNjUxLjU2MzI3Yy0zLjc5OTU4LTcuMDM1LTQuMzMtMTYuMjU1MzcuMzM1MzEtMjIuNzQ4NTlhMzYuODM4NDMsMzYuODM4NDMsMCwwLDAsMTQuNjc1MDcsMjAuNTk5M2MyLjc3MTgxLDEuODg3MTksNi4wNTEyNCwzLjY5NzU4LDYuOTk5NDcsNi45MTRhOC4yMzQ4OCw4LjIzNDg4LDAsMCwxLS44NTg2NCw2LjA0NDQ1LDI0LjQ1NzEsMjQuNDU3MSwwLDAsMS0zLjc5NTA1LDQuOTU0OTRsLS4xMzQzMy41MDMyNUMyNjAuMzAyNjgsNjYzLjc1NDQzLDI1My43NTg4Niw2NTguNTk4MjksMjQ5Ljk1OTI5LDY1MS41NjMyN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjM2YzZDU2Ii8+PHJlY3QgeD0iODQzLjMxODI4IiB5PSI2OCIgd2lkdGg9IjExIiBoZWlnaHQ9IjU4OSIgZmlsbD0iIzNmM2Q1NiIvPjxyZWN0IHg9IjgxMy4zMTgyOCIgeT0iMjAiIHdpZHRoPSI3MiIgaGVpZ2h0PSI3MiIgcng9IjM1Ljk5OTk2IiBmaWxsPSIjZmY2NTgyIi8+PHBhdGggZD0iTTQxOC42NDI2Myw0MjQuMTM4NWMwLDExLjQ3NzcxLDEyLjUxNTcyLDIxLjY3ODIzLDIzLjk5MzQ0LDIxLjY3ODIzczE3LjU3MS0xMC4yMDA1MiwxNy41NzEtMjEuNjc4MjNhMjAuNzgyMjQsMjAuNzgyMjQsMCwwLDAtNDEuNTY0NDgsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjMmYyZTQxIi8+PHBvbHlnb24gcG9pbnRzPSIzOTguNDcxIDQ4NC40ODkgNDM3LjA2NyA0ODMuMDA1IDQzOS4yOTQgNDQyLjkyNSAzOTQuNzYgNDQyLjkyNSAzOTguNDcxIDQ4NC40ODkiIGZpbGw9IiNmZmI4YjgiLz48cGF0aCBkPSJNNDAwLjgxMzY0LDU2MS40OTI4YTYuMTgyMzEsNi4xODIzMSwwLDAsMC0uMzY0OTQtOS40NzI4bDcuMDA3MzktMjAuODIyMzUtMTEuMDM3NzUsMi45MTctNC45NjIxMywxOS4zMjYwNWE2LjIxNTgxLDYuMjE1ODEsMCwwLDAsOS4zNTc0Myw4LjA1MjE1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiNmZmI2YjYiLz48Y2lyY2xlIGN4PSI0MTUuNzU4MzUiIGN5PSIzODEuNjI0NzgiIHI9IjE0LjY5ODA0IiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTQ0Mi45NjA0Nyw0MjkuNjQzNzlsLTEwLjczMjUzLS4yODQyNmExLjUwNCwxLjUwNCwwLDAsMS0xLjI4MDE0LS43ODczOGwtMy41ODc4Ny02LjY1NTE0YTEuNDk3ODMsMS40OTc4MywwLDAsMSwuMzk1NjMtMS44OTEzOEw0NDEuNzk4MTgsNDA5LjA0N2ExLjQ5Njc5LDEuNDk2NzksMCwwLDEsMS4yNTYxOC0uMjgwMzdsMTEuMzQxODQsMi41ODQyMmExLjQ5OSwxLjQ5OSwwLDAsMSwxLjEwNjYsMS4wNDMxNGw0LjQ0MTMsMTUuMjk0OTJhMS40OTkzNSwxLjQ5OTM1LDAsMCwxLTEuNTEzODksMS45MTZsLTUuNTYwMi0uMjc3NzlhMS41MDcyNCwxLjUwNzI0LDAsMCwxLTEuMzQ3NDctMS4wMjc2bC0uMjMwNTItLjY5ODY3YS4xNzM0Mi4xNzM0MiwwLDAsMC0uMzM4LjA1NDM5LDEuNDk5NzQsMS40OTk3NCwwLDAsMS0xLjU3MzQ2LDEuNDk3N2wtMS44NDA4OC0uMDkxOTRhMS40OTU0LDEuNDk1NCwwLDAsMS0xLjM5Ni0xLjIwNWwtLjc5Mzg1LTMuOTkyNTZhLjE3MzIuMTczMiwwLDAsMC0uMzQxODguMDEzNTlsLS41MTg2Niw0LjQ0MmExLjQ5MiwxLjQ5MiwwLDAsMS0xLjQ4NzM0LDEuMzI1NDZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik00MzIuMjUxNSw0NDkuNTgwNzlsMTkuMDAzMjMuMjUzMzEsNi4xODQ4MSw3Ljg1MzQ2LDkuOTU2ODQsMi4zNDgxLDIuNTg3OCwxNC45NTQyN2MxLjI5Mzc1LDcuNDc2MjQtLjA3OTc5LDEyLjIxMDg5LTMuODgwNzYsMTguNzc3NTFsMCwwLS40NTUyMiwxMi45MTc3MS41MDMuOTE0MjZhMi4wOTM2NCwyLjA5MzY0LDAsMCwxLS42MzExOSwyLjcyMjY3aDBhNC4yNzcyNiw0LjI3NzI2LDAsMCwxLC4xMTc1MiwyLjgxNDkxbC0uMjQ1MjguODEwNDZzLS43MDc4Myw1LjY2MjYxLTQwLjgzMjM5LS4yOTI5M2EzLjk1NjMyLDMuOTU2MzIsMCwwLDEtMy4zNDM0NS0zLjM5ODZoMGEyLjk1NDA2LDIuOTU0MDYsMCwwLDEtLjU0Ny0zLjQwMzhsLjA4MTc1LS4xNjM0OC0uNDEyLS40ODUyOWEzLjE3NywzLjE3NywwLDAsMS0uMTYwOC0zLjkwNjU5aDBsLTUuNzY2NTItNDEuMjUyMTcsMTEuOTExOTItMy43MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTQxOS4xNjg2Miw0NjQuOTkyODhsLTQuNzU2ODQtMy45NDgyOHMtNC4yMjk1MiwxLjI1MDEzLTcuMTgzMzQsOS41ODA3Ny0xMy4wODk1Nyw3MS41MjY1Ni0xMy4wODk1Nyw3MS41MjY1NmwxMS44NzU1Ny01LjkzNzc4LDE2LjgzOTItNDYuNDMwODVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik01MjQuODE5NDYsNTMyLjI3NGE2LjE4MjI4LDYuMTgyMjgsMCwwLDEtNy4wOTExNi02LjI5MTQ3bC0yMC41NDE0Ny03Ljc5MjQyLDkuMjU3LTYuNjgyLDE4LjA4NzMzLDguNDI0MjRhNi4yMTU4MSw2LjIxNTgxLDAsMCwxLC4yODgzMSwxMi4zNDE2MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjZmZiNmI2Ii8+PHBhdGggZD0iTTQ2MS44ODA2MSw0NjQuNjMyNTNsMy4yMjQ3MS01LjI3NDI1czQuNDA2NTUtLjE4NDU2LDkuODk1MjgsNi43NDM1M2MyLjgxMzczLDMuNTUxNjEsMjEuMDQ4NzQsMzQuMDE3MTksMjEuMDQ4NzQsMzQuMDE3MTlsMTYuODYzMTEsMTQuMDU1NDYtMTMuODA2MjgsNC45MzA4MS0xNi4yNzE2OS02LjkwMzE0LTE4LjI0NC0zMC4wNzhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzJmMmU0MSIvPjxwb2x5Z29uIHBvaW50cz0iNDM1LjU1NSA2NjYuODEgNDQ0LjczOSA2NjYuODEgNDQ5LjEwOCA2MzEuMzg1IDQzNS41NTMgNjMxLjM4NiA0MzUuNTU1IDY2Ni44MSIgZmlsbD0iI2ZmYjZiNiIvPjxwb2x5Z29uIHBvaW50cz0iMzU1LjE1NyA2NjEuMDk5IDM2NC4wNDQgNjYzLjQxNSAzNzcuMjA4IDYzMC4yMzggMzY0LjA5MSA2MjYuODE5IDM1NS4xNTcgNjYxLjA5OSIgZmlsbD0iI2ZmYjZiNiIvPjxwYXRoIGQ9Ik00NjAuMTE3ODcsNzExLjc3NzYzbDE0LjUxODI2LS44NjY1NXY2LjIyMDI2bDEzLjgwMjkzLDkuNTMyNzlhMy44ODU0MSwzLjg4NTQxLDAsMCwxLTIuMjA3ODIsNy4wODI3NEg0NjguOTQ2N2wtMi45NzkyNS02LjE1Mjc5LTEuMTYzMjUsNi4xNTI3OWgtNi41MTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjYuODQwODYgLTQ5LjQ5ODE5KSIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik0zODAuMTMxMTEsNzA1LjQyODU4bDE0LjI2NzQsMi44MjM1LTEuNTY5LDYuMDE5MTMsMTAuOTUyMTEsMTIuNzA2MTVhMy44ODU0MSwzLjg4NTQxLDAsMCwxLTMuOTIzLDYuMjk2ODNMMzgzLjEzMyw3MjguOTE0NDFsLTEuMzMxLTYuNzA1MzEtMi42Nzc1OSw1LjY2MDQzLTYuMzA2MjQtMS42NDM4MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTM4My4xMjQ4LDY4OC4zMTkzMWwyNi45MjA4MS01NS4zMzAyMSwyLjExMzUzLTY1LjQ5MDkxQzQwNi4zMzIzMyw1NTYuNjc3LDQyMy40OTEsNTMyLjgwNSw0MjMuNDkxLDUzMi44MDV2LTkuMjQ0OTFsNDEuOTE4NTIsNy45MDgxMnYwYTIwMS4yMTQ4OSwyMDEuMjE0ODksMCwwLDEsMTIuMjYxNTEsNzMuMDYwMjZMNDc1Ljk4Miw2OTQuMDQ3MzRoLjUyOTg3YTMuMzE1MjcsMy4zMTUyNywwLDEsMSwwLDYuNjMwNTNINDU5LjkzNTVhMy4zMTUyNywzLjMxNTI3LDAsMSwxLDAtNi42MzA1M2guNDI3NEw0NDguNDYzMSw1ODAuMTYzNTFsLTEzLjgzNjU0LDU2LjE5ODgxTDQwMS4xODksNjg4LjEwNjZhMy4zMDY5LDMuMzA2OSwwLDAsMS0uMjY1MjQsNi42MDM3OUgzODQuMzQ3MzlhMy4zMTE4MiwzLjMxMTgyLDAsMCwxLTEuMjIyNTktNi4zOTEwOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTM4Mi43NTg0MSw0MjYuMjk2NDdjNi4xOTM5NS02LjA1OTM1LDEwLjA5Mjc5LTE0LjAyNzczLDE1LjIyMjU1LTIxLjAxMTA4LDUuMTI5Ni02Ljk4MzI3LDEyLjM1NDcyLTEzLjM4MjQsMjEuMDEwODMtMTMuNzcwMjZhMTMuMDM3ODYsMTMuMDM3ODYsMCwwLDEsOC4xNjU3OSwyLjEyOSw4LjMwNTQxLDguMzA1NDEsMCwwLDEsMy42MDQ1NSw3LjM2NzQxYy45MTM4LTIuNTY2NzQsNC45OTcxOC0zLjE0NTMsNi41ODgtLjkzMzMxLDEuNTkwNjIsMi4yMTE5MS0uMjU3MjIsNS44OTg5My0yLjk4MTE1LDUuOTQ4MzhsLS4yNjcxLTEuMDU2NjZhMTguMjQ4NzcsMTguMjQ4NzcsMCwwLDEtMTEuODAxNDEsNy44MzYxMywyLjk3ODMsMi45NzgzLDAsMCwxLTMuMzU1MjYtMy44NTQyNUM0MDkuNTkwODcsNDEwLjgwNjY2LDQxMi41NjA1Miw0MjguMjUyMzQsNDA3LDQzNnMtMjEuNDUyNTksNi45OTU1MS0zMC44MjkwNyw4LjczNTNjLTkuMDU0NjYsMS42OC0xNy44NTg1Ny0zLjM0NzU2LTI1LjY5OTMxLTguMTc4QTM4LjI3MTUsMzguMjcxNSwwLDAsMCwzODIuNzU4NDEsNDI2LjI5NjQ3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2Ljg0MDg2IC00OS40OTgxOSkiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNNzMyLjY4OTg5LDYzNi45MDM3Myw3MDQuNDcyNzUsNjI0LjQ1NVY2MTMuNzUyNjVsMTAuMDU2MS0uMDU2NTFhNy40NjkxOCw3LjQ2OTE4LDAsMCwwLDcuMDQ0LTUuMTA3MTRsNy4wNjQzNy0yMS4xOTMwNWE3LjQ2OTI0LDcuNDY5MjQsMCwwLDAtNy4wODYtOS44MzEyMkg3MDQuNDcyNzV2LTkuOTU5SDcyNS45MTNhNy40NjkyNSw3LjQ2OTI1LDAsMCwwLDcuMjc5MzctNS43OTU4NGw0Ljg2NS0yMS4xNjI4NmE3LjQ2OTIzLDcuNDY5MjMsMCwwLDAtNy4yNzkzNy05LjE0MjY1SDcwNC40NzI3NXYtMi40ODk3NWE0Ljk3OTQ5LDQuOTc5NDksMCwwLDAtOS45NTksMHYyLjQ4OTc1SDUxOC4xNTY2di0yLjQ4OTc1YTQuOTc5NSw0Ljk3OTUsMCwwLDAtOS45NTksMHYyLjQ4OTc1SDQ4Ny4yODY4YTcuNDY5MjMsNy40NjkyMywwLDAsMC03LjI3OTM3LDkuMTQyNjVsNC44NjUsMjEuMTYyODZhNy40NjkyNSw3LjQ2OTI1LDAsMCwwLDcuMjc5MzcsNS43OTU4NEg1MDguMTk3NnY5Ljk1OUg0OTYuNTEzMjhhNy40NjkyMyw3LjQ2OTIzLDAsMCwwLTcuMTA5MjcsOS43Nmw3LjIxMDQxLDIyLjM3NzExYTcuNDY5MjUsNy40NjkyNSwwLDAsMCw3LjE1MTIzLDUuMTc4MzdsNC40MzItLjAyNDlWNjI0LjQ1NWwtMjIuODIyNjksMTIuNDQ4NzRhNy40NjkyMiw3LjQ2OTIyLDAsMCwwLTcuNDY5MjQsNy40NjkyMnYwYTcuNDY5MjUsNy40NjkyNSwwLDAsMCw3LjQ2OTI0LDcuNDY5MjVINTA4LjE5NzZ2NTQuNzc0NDZhNC45Nzk1LDQuOTc5NSwwLDAsMCw5Ljk1OSwwVjY1MS44NDIyMkg2OTQuNTEzNzZ2NTQuNzc0NDZhNC45Nzk0OSw0Ljk3OTQ5LDAsMCwwLDkuOTU5LDBWNjUxLjg0MjIyaDI4LjIxNzE0YTcuNDY5MjUsNy40NjkyNSwwLDAsMCw3LjQ2OTI1LTcuNDY5MjV2MEE3LjQ2OTIyLDcuNDY5MjIsMCwwLDAsNzMyLjY4OTg5LDYzNi45MDM3M1ptLTIxNC41MzMyOS02OS4yOThINjk0LjUxMzc2djkuOTU5SDUxOC4xNTY2Wm0wLDU2Ljg0OTI1di05LjY1NTYzbDE3Ni4zNTcxNi0uOTkwNzZWNjI0LjQ1NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNi44NDA4NiAtNDkuNDk4MTkpIiBmaWxsPSIjM2YzZDU2Ii8+PC9zdmc+";
var darkBackground = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgd2lkdGg9Ijg1NS45Mzk1OCIgaGVpZ2h0PSI2MzAuMDY2MDgiIHZpZXdCb3g9IjAgMCA4NTUuOTM5NTggNjMwLjA2NjA4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTkzNS40MzIzNCw0NzIuNTU3NjdjLTMuNzMsNDMuMDgtMjIuNTEsODQuNzEtNDkuMywxMTkuMTRxLTEuNjgsMi4xNi0zLjQsNC4yOC0zLjg3LDQuNzctNy45NCw5LjM2LTQuOTgsNS42NTUtMTAuMjUsMTEuMDUwMDUtNC4yOSw0LjQzOTk0LTguNzgsOC42ODk5NC0zLjQ2NSwzLjMxNS03LjAxLDYuNWMtMjguNDMsMjUuNjktNjEuMDksNDYuODktOTQuNzQsNjUuNDMwMDUtNjUuNjcsMzYuMTctMTM3LjY1LDYzLjU2OTk1LTIxMi41Miw2Ny41Ni03NC44NiwzLjk4LTE1My4wMS0xNy40Ni0yMDcuOTEtNjguNTItNzMuOTktNjguODEtOTQuNjM5OTUtMTgzLjU4LTY0LjYtMjgwLjA1LDE5Ljk4LTY0LjE4LDYwLjc2LTEyMi4yNCwxMTYuMjYtMTYwLjE2LDU1LjAyLTM3LjU5LDEyNC40My01NC41MSwxOTAuMTItNDMuNDQ5OTUsNTIuNDQtMzEuODcwMDYsMTIxLjA5LTMyLjQ4LDE3OC4xLTguODksMzAuNDIsMTIuNTksNTcuNzIsMzEuMzEsODEuNjcsNTMuOTNhMzM5LjM0MzM3LDMzOS4zNDMzNywwLDAsMSwzMC43MiwzMy4yM3ExLjQ1NSwxLjc4NSwyLjg4LDMuNiw1Ljk3LDcuNTQ1LDExLjU1LDE1LjQsOC4wMSwxMS4yNjUsMTUuMjEsMjMuMDNjMS4zMiwyLjE2LDIuNjMsNC4zMywzLjkxLDYuNTIuODYsMS40NywxLjczLDIuOTUsMi41OCw0LjQ0YS4yOTc3Ni4yOTc3NiwwLDAsMSwuMDQuMWMxMy4zMSwyMy40MSwyNC4xOSw0OC4zOSwyOS44NjAwNSw3NC41LDEsNC42MiwxLjg0LDkuMjYsMi40OSwxMy45NHYuMDFxLjg1NSw1Ljk1NSwxLjI5LDExLjk3QTE3Ni45NzcxMSwxNzYuOTc3MTEsMCwwLDEsOTM1LjQzMjM0LDQ3Mi41NTc2N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNNzQwLjA3Mzg2LDUzNy42ODQxMiw1OTEuNjEyMzMsNDE0LjAwNjI3LDczNS44NDAyNyw1NDIuNjM4YTMuNDQxNjEsMy40NDE2MSwwLDEsMCw0LjIzMzU5LTQuOTUzODZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjAzMDIxIC0xMzQuOTY2OTYpIiBmaWxsPSIjZjBmMGYwIiBvcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIyMjcuNTgyMTIiIGN5PSIyNTAuNzgwNzEiIHI9Ijg5IiBmaWxsPSIjZjJmMmYyIi8+PHBhdGggZD0iTTQ3OC42MTIzMywzNzkuNzQ3NjdhODAuOTkzNjksODAuOTkzNjksMCwwLDEtODEsODEsODEuNTcxNjEsODEuNTcxNjEsMCwwLDEtMjcuOC00LjksODEuMDU0ODksODEuMDU0ODksMCwxLDEsMTA4LjgtNzYuMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIyMTEuNTgyMTIiIGN5PSIyMTcuNzgwNzEiIHI9IjI1IiBmaWxsPSIjZTRlNGU0Ii8+PHBhdGggZD0iTTQ3NS40NTIzNiwzNTcuMjc3NjRhMjUuMDAxMTUsMjUuMDAxMTUsMCwwLDEtMjcuNi00MS4wOEE4MS4wNTI3OSw4MS4wNTI3OSwwLDAsMSw0NzUuNDUyMzYsMzU3LjI3NzY0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4wMzAyMSAtMTM0Ljk2Njk2KSIgZmlsbD0iI2YyZjJmMiIvPjxjaXJjbGUgY3g9IjI1Mi41ODIxMiIgY3k9IjI3MS43ODA3MSIgcj0iOSIgZmlsbD0iI2U0ZTRlNCIvPjxwYXRoIGQ9Ik0zODcuNjEyMzMsNDU3Ljc0NzY3YTkuMDQ1ODEsOS4wNDU4MSwwLDAsMS0uMzEsMi4zNCw3OS41Mjc3NCw3OS41Mjc3NCwwLDAsMS0xNy40OS00LjI0LDkuMDAxNTcsOS4wMDE1NywwLDAsMSwxNy44LDEuOVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiNmMmYyZjIiLz48cGF0aCBkPSJNMzM0LjYxMjMzLDM3NS43NDc2N2ExOC4wMDIsMTguMDAyLDAsMCwxLTE2LjgsMTcuOTYsODEuNTQ3NzMsODEuNTQ3NzMsMCwwLDEsMS43Ni0zNS43MUExOC4wMDAyNiwxOC4wMDAyNiwwLDAsMSwzMzQuNjEyMzMsMzc1Ljc0NzY3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4wMzAyMSAtMTM0Ljk2Njk2KSIgZmlsbD0iI2YyZjJmMiIvPjxjaXJjbGUgY3g9IjYwNi40NTY1MyIgY3k9IjIwOC40ODMwNSIgcj0iMy43MDIzNCIgZmlsbD0iIzZjNjNmZiIvPjxjaXJjbGUgY3g9IjU3Mi4zMDIzMSIgY3k9IjExOS45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjIyNS4zMDIzMSIgY3k9IjU0My45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjU4NC41ODE0NCIgY3k9IjMzMS41OTQwMiIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjMwNS40NTY1MyIgY3k9IjM1MC40ODMwNSIgcj0iMy43MDIzNCIgZmlsbD0iIzZjNjNmZiIvPjxjaXJjbGUgY3g9IjE3MS40NTY1MyIgY3k9IjQxNi40ODMwNSIgcj0iMTcuNDgzMDUiIGZpbGw9IiM2YzYzZmYiLz48Y2lyY2xlIGN4PSIyNjcuMzAyMzEiIGN5PSI0MzUuOTQ4NTEiIHI9IjIuMTYzMDciIGZpbGw9IiNmMGYwZjAiLz48Y2lyY2xlIGN4PSI0ODcuMzAyMzEiIGN5PSI5Ny45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjM1OC4zMDIzMSIgY3k9IjU1OC45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjMyNi4zMDIzMSIgY3k9IjExNy45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjM4Mi4zMDIzMSIgY3k9IjIyMi45NDg1MSIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjI5Ni41ODE0NCIgY3k9IjQ4MC41OTQwMiIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjU0OS41ODE0NCIgY3k9IjQ5NC41OTQwMiIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjQzNy41ODE0NCIgY3k9IjM2OC41OTQwMiIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjQ5NC41ODE0NCIgY3k9IjIyMi41OTQwMiIgcj0iMi4xNjMwNyIgZmlsbD0iI2YwZjBmMCIvPjxjaXJjbGUgY3g9IjU5OC4yMTIwNCIgY3k9IjI5Mi42NTQ3MyIgcj0iNC4yODg4OSIgZmlsbD0iI2ZmNjU4NCIvPjxjaXJjbGUgY3g9IjQyNC4yMTIwNCIgY3k9IjE1MC42NTQ3MyIgcj0iNC4yODg4OSIgZmlsbD0iI2ZmNjU4NCIvPjxjaXJjbGUgY3g9IjQyNC4yMTIwNCIgY3k9IjQ0NS42NTQ3MyIgcj0iNC4yODg4OSIgZmlsbD0iI2ZmNjU4NCIvPjxwYXRoIGQ9Ik04NjMuNDUyMzYsNjA1LjMzNzY0YTcuNjk0LDcuNjk0LDAsMCwwLTcuMzksNS41OCw3LjM4OTYsNy4zODk2LDAsMCwwLS4zLDIuMTJ2MTIuMDRxNC40ODUtNC4yNDQ5NCw4Ljc4LTguNjg5OTQsNS4yNjUtNS40MDAwNiwxMC4yNS0xMS4wNTAwNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiM2YzYzZmYiLz48cGF0aCBkPSJNODkwLjY4MTE4LDY2Ny44OTgwNnEtMTkuMzY4MTYsMC00Mi40NTY1NC0xLjQ2Mzg2Yy03OS42MTM3Ny01LjA1NTY3LTE4Mi43Mzc4LTIyLjYzMjgyLTI5MC4zNzYtNDkuNDkyMTktMTA3LjYzNzctMjYuODU5MzgtMjA2LjkzMDE4LTU5Ljc5Mzk1LTI3OS41ODU0NS05Mi43MzQzOC0zNS4zOTI1OC0xNi4wNDY4Ny02Mi41NTYxNS0zMS4yMzYzMi04MC43MzUzNS00NS4xNDc0Ni0xOS4yNDcwNy0xNC43MjcwNS0yNy42NjYtMjcuNTY0LTI1LjAyMzkzLTM4LjE1MjgzLDUuMTQ4LTIwLjYyODkxLDUwLjczMS0yNS4xNDIwOSw4OC4wNjQtMjUuMjk1NDFsLjAxMjY5LDNjLTUxLjI2ODA2LjIxMDQ1LTgxLjUxMzY3LDguMzg2NzItODUuMTY1NTIsMjMuMDIyLTQuNjUxODYsMTguNjQwMTQsMzMuMjg2NjIsNDcuNzQwNzMsMTA0LjA4NjkxLDc5Ljg0MTMxLDcyLjQ5NTYxLDMyLjg2ODE3LDE3MS42MDU0Nyw2NS43MzkyNiwyNzkuMDczMjQsOTIuNTU2NjQsMTA3LjQ2NzI5LDI2LjgxNjQxLDIxMC40MDEzNyw0NC4zNjMyOCwyODkuODM5ODUsNDkuNDA4MjEsNzcuNTc4NjEsNC45Mjc3MywxMjQuNzQzMTYtMi45Mzc1LDEyOS4zOTQ1My0yMS41NzgxMywzLjg2MTgxLTE1LjQ3NjU2LTIxLjU5ODE1LTM4LjI3NTM5LTcxLjY4OTQ2LTY0LjE5ODI0bDEuMzc4OTEtMi42NjQwNmMzNi4zOTcsMTguODM1OTMsNzguNjQ1NTEsNDUuODUxNTYsNzMuMjIxNjgsNjcuNTg4ODYtMi42NDI1OCwxMC41ODg4Ny0xNi4xMDU0NywxNy45NjQ4NS00MC4wMTUxNCwyMS45MjI4NUM5MjcuMDc2Miw2NjYuNzY3Miw5MTAuMzM1NDgsNjY3Ljg5ODA2LDg5MC42ODExOCw2NjcuODk4MDZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjAzMDIxIC0xMzQuOTY2OTYpIiBmaWxsPSIjNmM2M2ZmIi8+PGNpcmNsZSBjeD0iNzE0LjU4MjEyIiBjeT0iMjA4Ljc4MDcxIiByPSIxMDAuNSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik04ODYuNjEyMzMsMjQxLjc0NzY3YTEwMiwxMDIsMCwxLDAsMTAyLDEwMkExMDEuNjM1LDEwMS42MzUsMCwwLDAsODg2LjYxMjMzLDI0MS43NDc2N1ptMCwyMDFhOTksOTksMCwxLDEsOTktOTlBOTguNjE3NjcsOTguNjE3NjcsMCwwLDEsODg2LjYxMjMzLDQ0Mi43NDc2N1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNNzk4LjQxNywzNjcuODE4NDdhMi4wMDA3OCwyLjAwMDc4LDAsMCwxLTEuOTU3LTEuNTk3NjUsOTcuNjY5MjQsOTcuNjY5MjQsMCwwLDEsMjIuMzQwODItODMuMTM1MjYsMiwyLDAsMCwxLDIuOTg2MzMsMi42NjExNEE5My41OTY4Miw5My41OTY4MiwwLDAsMCw4MDAuMzc4LDM2NS40MTUxNWEyLjAwMjI4LDIuMDAyMjgsMCwwLDEtMS45NjA5NCwyLjQwMzMyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4wMzAyMSAtMTM0Ljk2Njk2KSIgZmlsbD0iIzJmMmU0MSIvPjxjaXJjbGUgY3g9IjcxNC41MTkyNCIgY3k9IjIzOC4yNzM3MyIgcj0iNjMuODc3MDIiIGZpbGw9IiM2YzYzZmYiLz48cGF0aCBkPSJNODY2LjI0ODA1LDM5Ny4zNTY2NmMtNC4xNDA2Mi0uMTE1LTkuMjkzODUtLjI1ODY5LTEzLjI2Mzg0LTMuMTU4NzRhMTAuMTg2MTgsMTAuMTg2MTgsMCwwLDEtNC4wMDgwNi03LjYwNjA3LDYuODUyMTMsNi44NTIxMywwLDAsMSwyLjMzMDA3LTUuNjI3NjNjMi4wNzM1Mi0xLjc1MjE2LDUuMTAxMzktMi4xNjMxMyw4LjM2NDQxLTEuMjA0MmwtMy4zODA3Ni0yNC43MDYxLDIuNDgxNzQtLjM0LDMuOTc0NDQsMjkuMDQ1MTgtMi4wNzI0NS0uOTUxYy0yLjQwMjctMS4xMDIwNS01LjcwMDg4LTEuNjYyODUtNy43NTA0LjA2OTExYTQuNDAyNjMsNC40MDI2MywwLDAsMC0xLjQ0Mzc1LDMuNjI2NTksNy42OTg4Nyw3LjY5ODg3LDAsMCwwLDIuOTgyNDYsNS42NzEwN2MzLjA4OTQ5LDIuMjU2NjgsNy4xOTcwOCwyLjU0Nzc5LDExLjg1NTg1LDIuNjc4WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4wMzAyMSAtMTM0Ljk2Njk2KSIgZmlsbD0iIzJmMmU0MSIvPjxyZWN0IHg9IjY1OC40OTQ5MyIgeT0iMjIyLjIxNzY3IiB3aWR0aD0iMTMuNDkxMzMiIGhlaWdodD0iMi41MDQ5OCIgZmlsbD0iIzJmMmU0MSIvPjxyZWN0IHg9IjcwMS4wNzk2MSIgeT0iMjIyLjIxNzY1IiB3aWR0aD0iMTMuNDkxMzMiIGhlaWdodD0iMi41MDQ5OCIgZmlsbD0iIzJmMmU0MSIvPjxwYXRoIGQ9Ik04ODkuMjMyMzMsNDUyLjkwNzY1aC01Ny45YTguMTQ3MTYsOC4xNDcxNiwwLDAsMC04LjEzOTk1LDguMTR2MTI4LjMzYTQ3LjY2OTU1LDQ3LjY2OTU1LDAsMCwwLDI1LjU2LDQyLjE5OTk1cTMuNTU1LTMuMTgsNy4wMS02LjUsNC40ODUtNC4yNDQ5NCw4Ljc4LTguNjg5OTQsNS4yNjUtNS40MDAwNiwxMC4yNS0xMS4wNTAwNSw0LjA4MDA2LTQuNTksNy45NC05LjM2LDEuNzI1LTIuMTE1LDMuNC00LjI4YzI2Ljc5LTM0LjQzLDQ1LjU3LTc2LjA2LDQ5LjMtMTE5LjE0QTY0LjA0ODU0LDY0LjA0ODU0LDAsMCwwLDg4OS4yMzIzMyw0NTIuOTA3NjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjAzMDIxIC0xMzQuOTY2OTYpIiBmaWxsPSIjMmYyZTQxIi8+PHBhdGggZD0iTTg5MS4zNDIzMSw0NzkuNjg3NjdhMTQuNjExMzYsMTQuNjExMzYsMCwwLDAtMTAuNDMtNC4xNywxNC40NjUsMTQuNDY1LDAsMCwwLTkuMTYsMy4zNjAwNSwxMy4xMjI2MywxMy4xMjI2MywwLDAsMC0xLjE3LDEuMDdsLTQ3LjM4OTk1LDQ4LjYtMzQuMzcsMzUuMjVhNi44MDA2MSw2LjgwMDYxLDAsMCwwLTEuMjgsMS44LDcuMjk1NzMsNy4yOTU3MywwLDAsMC0uNzcsMy4zMiw3LjE2NzUxLDcuMTY3NTEsMCwwLDAsMi4xODAwNiw1LjA3bDEuMzUsMS4zMiw5LjgsOS41NS4wMS0uMDFhNy4yOTA3Myw3LjI5MDczLDAsMCwwLDQuNjYsMS42Myw3LjE2Nyw3LjE2NywwLDAsMCw1LjA3LTIuMThsMS41OS0xLjYyLDExLjM4LTExLjY3LjM4LS4zOSw2OC40MS03MC4xNmExNC42OTEyOCwxNC42OTEyOCwwLDAsMC0uMjYtMjAuNzdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjAzMDIxIC0xMzQuOTY2OTYpIiBmaWxsPSIjNmM2M2ZmIi8+PHBhdGggZD0iTTg5MC44NjE1MiwzNDMuNDRjMi4xMTI0LTQuNDY2NTgtLjA1MzQ5LTkuMjM3NjEtMy43NjM3OC0xMi4wOTA3Mi00LjY3NTU3LTMuNTk1MzktMTAuNzIyMS0zLjAwMDg1LTE2LjA0MDA4LTEuMjk5MDUtNS44MjIzOCwxLjg2MzItMTEuNTEzNjYsNS4yMTYwOC0xNy44MDM4Myw1LjAyMzM3YTExLjEzMDU4LDExLjEzMDU4LDAsMCwxLTEwLjI0NDA3LTcuMjc3NjRjLTMuMzY4Ny04LjYzOS40MzU2MS0xOC4yOTQ4OCw2LjI5OTcxLTI0Ljg0NjgxYTM0LjI2NzY2LDM0LjI2NzY2LDAsMCwxLDI2LjU0NC0xMS41ODYsMzQuNjQ5ODksMzQuNjQ5ODksMCwwLDEsMjguMDY4LDE2LjkwMjYsMS41NDA3OSwxLjU0MDc5LDAsMCwwLDIuMDUyMjkuNTM4MTMsMzYuODgyMjUsMzYuODgyMjUsMCwwLDEsMjguMzkzNzctLjcxNDMyLDM2LjI4OTg0LDM2LjI4OTg0LDAsMCwxLDIyLjU4MDQyLDM0LjQ5MTg4Yy0uMDUsMS45MzEyMiwyLjk1MDA1LDEuOTMwMSwzLDBhMzkuODkxNTUsMzkuODkxNTUsMCwwLDAtMTAuNTk5MjgtMjcuODEyNDksMzguNzE4NzEsMzguNzE4NzEsMCwwLDAtMjcuNTY2ODEtMTIuMTY3NzIsMzkuMzM2NDEsMzkuMzM2NDEsMCwwLDAtMTcuMzIyMjYsMy42MTIyM2wyLjA1MjI5LjUzODEzYTM3LjY5ODg2LDM3LjY5ODg2LDAsMCwwLTI1LjA5ODgtMTcuNzI4LDM2LjQ4NTQyLDM2LjQ4NTQyLDAsMCwwLTI5LjQyMzg0LDcuMzI3NzJjLTcuNzAxNjUsNi4wMjcwNy0xMy41Mzg0OSwxNS4zODAxNi0xMy4xNzUxOSwyNS40MTA3MS4xNTcyMSw0LjM0MDQ3LDEuNDQ3MTMsOC43OTYsNC40NjA2LDEyLjAzMDUxLDMuODU5ODEsNC4xNDI4Nyw5LjYyMjI5LDQuODU5NDQsMTQuOTQ2MzEsMy43OTgsNy4wNzU1NC0xLjQxMDcxLDEzLjUzNTMzLTYuMDY0NDksMjAuOTExMzMtNS45MjExM2ExMC4yMTE2NCwxMC4yMTE2NCwwLDAsMSw3LjY0MTcsMy40NDUzYzEuNjI0NTUsMS44MzMzNSwyLjYwNDIsNC40NzA0MiwxLjQ5NzE2LDYuODExMjItLjgyMDk0LDEuNzM1ODUsMS43NjQ2MywzLjI2MDI2LDIuNTkwNDEsMS41MTQxNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzIuMDMwMjEgLTEzNC45NjY5NikiIGZpbGw9IiMyZjJlNDEiLz48cGF0aCBkPSJNNDEyLjA5NDI2LDcwNC4zMjI4N2MtMzUuNTk5MTIuMDAxLTY4LjY5NDMzLTEuMjIwNzEtOTguMzIyMjYtMy42ODU1NS0zOC43MjY1Ni0zLjIyMjY2LTY5LjQxNDU1LTguNDAzMzItOTEuMjEwNDUtMTUuMzk2NDgtMjMuMDc2NjYtNy40MDUyOC0zNS4zMTkzNC0xNi42NjctMzYuMzg4MTgtMjcuNTI4MzItMi4wODMtMjEuMTU4MjEsMzkuMzM0LTQwLjcyNDYxLDc0LjQ0NTMxLTUzLjQxMzA5bDEuMDE5NTMsMi44MjIyN2MtNDguMjE2OCwxNy40MjM4Mi03My45NTcsMzUuMjg2MTMtNzIuNDc5NDksNTAuMjk3ODUsMS44ODE4MywxOS4xMTkxNCw0Ny4zOTIwOSwzMy43ODEyNSwxMjQuODYxODEsNDAuMjI3NTQsNzkuMzI1Miw2LjYwMDU4LDE4My43MTcyOSw0LjI2MTcyLDI5My45NDcyNy02LjU4OTg1LDExMC4yMy0xMC44NDg2MywyMTMuMDc1NjgtMjguOTA2MjUsMjg5LjU5MTMxLTUwLjg0NTcsNzQuNzI2MDctMjEuNDI1NzgsMTE2LjUwNDg4LTQ0LjY3OTY5LDExNC42MjMtNjMuNzk4ODMtMS41NjI1LTE1Ljg3NC0zMy4yMDI2NC0yOC43OTMtODkuMDkxOC0zNi4zNzg5bC40MDMzMi0yLjk3MjY2YzQwLjYwOTg2LDUuNTExNzIsODkuNDc5NDksMTYuNzYxNzIsOTEuNjczODMsMzkuMDU3NjIsMS4wNjkzMywxMC44NjEzMi05LjEzMzMsMjIuMzMyLTMwLjMyMjc2LDM0LjA5Mzc1LTIwLjAxNDY1LDExLjEwOTM3LTQ5LjEwMzUxLDIyLjE3Mjg1LTg2LjQ1ODQ5LDMyLjg4MjgxLTc2LjY4NTA2LDIxLjk4ODI4LTE3OS43MTk3Myw0MC4wODEwNS0yOTAuMTI0NTEsNTAuOTQ4MjRDNTM5LjAwMjQ3LDcwMC44Niw0NzIuMDE2NjMsNzA0LjMyMjg3LDQxMi4wOTQyNiw3MDQuMzIyODdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcyLjAzMDIxIC0xMzQuOTY2OTYpIiBmaWxsPSIjNmM2M2ZmIi8+PGNpcmNsZSBjeD0iODM4LjQ1NjUzIiBjeT0iNDM0LjQ4MzA1IiByPSIxNy40ODMwNSIgZmlsbD0iIzZjNjNmZiIvPjxjaXJjbGUgY3g9IjMzMS40NTY1MyIgY3k9IjE3LjQ4MzA1IiByPSIxNy40ODMwNSIgZmlsbD0iI2U2ZTZlNiIvPjxjaXJjbGUgY3g9IjE5LjQ1NjUzIiBjeT0iNDMzLjQ4MzA1IiByPSIxNy40ODMwNSIgZmlsbD0iI2U2ZTZlNiIvPjxjaXJjbGUgY3g9IjEyNy40NTY1MyIgY3k9IjEwOC40ODMwNSIgcj0iMTAuNzAyMzQiIGZpbGw9IiNmZjY1ODQiLz48Y2lyY2xlIGN4PSI3Ny40NTY1MyIgY3k9IjUxNC40ODMwNSIgcj0iMTAuNzAyMzQiIGZpbGw9IiNmZjY1ODQiLz48Y2lyY2xlIGN4PSI4MDcuNDU2NTMiIGN5PSIzMzkuNDgzMDUiIHI9IjEwLjcwMjM0IiBmaWxsPSIjZmY2NTg0Ii8+PGNpcmNsZSBjeD0iNjQ1LjQ1NjUzIiBjeT0iNTk4LjQ4MzA1IiByPSIxNy40ODMwNSIgZmlsbD0iI2U2ZTZlNiIvPjwvc3ZnPg==";
function SvgShare(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("g", null, /* @__PURE__ */ react.exports.createElement("rect", {
    fill: "none",
    height: 24,
    width: 24
  })), /* @__PURE__ */ react.exports.createElement("g", null, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M16,5l-1.42,1.42l-1.59-1.59V16h-1.98V4.83L9.42,6.42L8,5l4-4L16,5z M20,10v11c0,1.1-0.9,2-2,2H6c-1.11,0-2-0.9-2-2V10 c0-1.11,0.89-2,2-2h3v2H6v11h12V10h-3V8h3C19.1,8,20,8.89,20,10z"
  })));
}
const ShareMemoImageDialog = (props) => {
  const {
    memo: propsMemo,
    destroy
  } = props;
  const {
    memos
  } = appStore.getState().memoState;
  const {
    settings
  } = appStore.getState().settingsState;
  const {
    AutoSaveWhenOnMobile,
    DefaultDarkBackgroundImage,
    DefaultLightBackgroundImage,
    ShareFooterEnd,
    ShareFooterStart,
    UserName
  } = settings;
  let memosLength;
  let createdDays;
  if (memos.length) {
    memosLength = memos.length - 1;
    createdDays = memos ? Math.ceil((Date.now() - utils$1.getTimeStampByDate(memos[memosLength].createdAt)) / 1e3 / 3600 / 24) : 0;
  }
  const memo2 = {
    ...propsMemo,
    createdAtStr: utils$1.getDateTimeString(propsMemo.createdAt)
  };
  const footerEnd = ShareFooterEnd.replace("{UserName}", UserName);
  const footerStart = ShareFooterStart.replace("{MemosNum}", memos.length.toString()).replace("{UsedDay}", createdDays.toString());
  const {
    app: app2
  } = appStore.getState().dailyNotesState;
  const {
    external: externalImageUrls,
    internal: internalImageUrls
  } = parseMemoImages(memo2.content, app2);
  const [shortcutImgUrl, setShortcutImgUrl] = react.exports.useState("");
  const [imgAmount, setImgAmount] = react.exports.useState(externalImageUrls.length);
  const memoElRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (imgAmount > 0) {
      return;
    }
    changeBackgroundImage();
    setTimeout(() => {
      if (!memoElRef.current) {
        return;
      }
      let shareDialogBackgroundColor;
      if (document.body.className.contains("theme-dark")) {
        shareDialogBackgroundColor = "#727171";
      } else {
        shareDialogBackgroundColor = "#eaeaea";
      }
      toImage(memoElRef.current, {
        backgroundColor: shareDialogBackgroundColor,
        pixelRatio: window.devicePixelRatio * 2
      }).then((url) => {
        setShortcutImgUrl(url);
      }).catch(() => {
      });
    }, ANIMATION_DURATION);
  }, [imgAmount]);
  const handleCloseBtnClick = () => {
    destroy();
  };
  const convertBase64ToBlob = (base64, type) => {
    const bytes = window.atob(base64);
    const ab2 = new ArrayBuffer(bytes.length);
    const ia2 = new Uint8Array(ab2);
    for (let i = 0; i < bytes.length; i++) {
      ia2[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab2], {
      type
    });
  };
  const convertBackgroundToBase64 = async (path) => {
    const {
      vault
    } = dailyNotesService.getState().app;
    const buffer = await vault.adapter.readBinary(path);
    const arr = new Uint8Array(buffer);
    const blob = new Blob([arr], {
      type: "image/png"
    });
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result;
        resolve(base64Url);
      };
      reader.readAsDataURL(blob);
    });
  };
  const changeBackgroundImage = async () => {
    const {
      app: app22
    } = dailyNotesService.getState();
    let imageUrl;
    let imagePath;
    const lightBackgroundImage = encodeURI(lightBackground);
    const darkBackgroundImage = encodeURI(darkBackground);
    if (document.body.className.contains("theme-light")) {
      if (await app22.vault.adapter.exists(DefaultLightBackgroundImage) && /\.(png|svg|jpg|jpeg)/g.test(DefaultLightBackgroundImage)) {
        imagePath = DefaultLightBackgroundImage;
        imageUrl = await convertBackgroundToBase64(imagePath);
      } else {
        imageUrl = lightBackgroundImage;
      }
    } else if (document.body.className.contains("theme-dark")) {
      if (await app22.vault.adapter.exists(DefaultDarkBackgroundImage) && /\.(png|svg|jpg|jpeg)/g.test(DefaultDarkBackgroundImage)) {
        imagePath = DefaultDarkBackgroundImage;
        imageUrl = await convertBackgroundToBase64(imagePath);
      } else {
        imageUrl = darkBackgroundImage;
      }
    }
    const memoShareDiv = document.querySelector(".dialog-wrapper .memo-background .property-image");
    memoShareDiv.style.backgroundImage = "url('" + imageUrl + "')";
    if (document.body.className.contains("theme-dark")) {
      memoShareDiv.style.backgroundColor = "#1f1f1f";
    }
  };
  const handleCopytoClipboardBtnClick = async () => {
    const {
      vault
    } = appStore.getState().dailyNotesState.app;
    const divs = document.querySelector(".memo-shortcut-img");
    const myBase64 = divs.getAttribute("src").split("base64,")[1];
    const blobInput = convertBase64ToBlob(myBase64, "image/png");
    let aFile;
    if (AutoSaveWhenOnMobile && require$$0.Platform.isMobile) {
      blobInput.arrayBuffer().then(async (buffer) => {
        const ext = "png";
        const dailyNotes = getAllDailyNotes_1();
        for (const string in dailyNotes) {
          if (dailyNotes[string] instanceof require$$0.TFile) {
            aFile = dailyNotes[string];
            break;
          }
        }
        if (aFile !== void 0) {
          await vault.createBinary(
            await vault.getAvailablePathForAttachments(`Pasted Image ${require$$0.moment().format("YYYYMMDDHHmmss")}`, ext, aFile),
            buffer
          );
        }
      });
    }
    const clipboardItemInput = new ClipboardItem({
      "image/png": blobInput
    });
    window.navigator["clipboard"].write([clipboardItemInput]);
    new require$$0.Notice("Send to clipboard successfully");
  };
  const handleImageOnLoad = (ev) => {
    if (ev.type === "error") {
      new require$$0.Notice(t$1("Image load failed"));
      ev.target.remove();
    }
    setImgAmount((n2) => n2 - 1);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "dialog-header-container",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "title-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F970}"
        }), t$1("Share Memo Image")]
      }), /* @__PURE__ */ jsxs("div", {
        className: "btn-group",
        children: [/* @__PURE__ */ jsx("button", {
          className: "btn copy-btn",
          onClick: handleCopytoClipboardBtnClick,
          children: /* @__PURE__ */ jsx(SvgShare, {
            className: "icon-img"
          })
        }), /* @__PURE__ */ jsx("button", {
          className: "btn close-btn",
          onClick: handleCloseBtnClick,
          children: /* @__PURE__ */ jsx(SvgClose, {
            className: "icon-img"
          })
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-content-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: `tip-words-container ${shortcutImgUrl ? "finish" : "loading"}`,
        children: /* @__PURE__ */ jsx("p", {
          className: "tip-text",
          children: shortcutImgUrl ? t$1("\u2197Click the button to save") : t$1("Image is generating...")
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "memo-container",
        ref: memoElRef,
        children: [/* @__PURE__ */ jsx(Only, {
          when: shortcutImgUrl !== "",
          children: /* @__PURE__ */ jsx("img", {
            className: "memo-shortcut-img",
            src: shortcutImgUrl
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "memo-background",
          children: [/* @__PURE__ */ jsx("div", {
            className: "property-image",
            style: {
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }
          }), /* @__PURE__ */ jsx("span", {
            className: "background-container"
          }), /* @__PURE__ */ jsx("div", {
            className: "memo-content-text",
            dangerouslySetInnerHTML: {
              __html: formatMemoContent(memo2.content)
            }
          }), /* @__PURE__ */ jsx(Only, {
            when: externalImageUrls.length > 0,
            children: /* @__PURE__ */ jsx("div", {
              className: "images-container",
              children: externalImageUrls.map((imgUrl, idx) => /* @__PURE__ */ jsx("img", {
                src: imgUrl,
                alt: "",
                referrerPolicy: "no-referrer",
                onLoad: handleImageOnLoad,
                onError: handleImageOnLoad
              }, idx))
            })
          }), /* @__PURE__ */ jsx(Only, {
            when: internalImageUrls.length > 0,
            children: /* @__PURE__ */ jsx("div", {
              className: "images-container internal-embed image-embed is-loaded",
              children: internalImageUrls.map((imgUrl, idx) => /* @__PURE__ */ jsx("img", {
                className: "memo-img",
                src: imgUrl.path,
                alt: imgUrl.altText,
                path: imgUrl.filepath
              }, idx))
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "watermark-container",
            children: [/* @__PURE__ */ jsxs("span", {
              className: "normal-text footer-start",
              children: [/* @__PURE__ */ jsx("div", {
                className: "property-social-icons"
              }), /* @__PURE__ */ jsx("span", {
                className: "name-text",
                children: footerStart
              })]
            }), /* @__PURE__ */ jsx("span", {
              className: "normal-text footer-end",
              children: /* @__PURE__ */ jsx("span", {
                className: "name-text",
                children: footerEnd
              })
            })]
          })]
        })]
      })]
    })]
  });
};
function showShareMemoImageDialog(memo2) {
  showDialog({
    className: "share-memo-image-dialog"
  }, ShareMemoImageDialog, {
    memo: memo2
  });
}
var memo = "";
const showMemoInDailyNotes = async (memoId, memoPath) => {
  const { app: app2 } = dailyNotesService.getState();
  const lineNum = parseInt(memoId.slice(14));
  const file = app2.metadataCache.getFirstLinkpathDest("", memoPath);
  if (!require$$0.Platform.isMobile) {
    const leaf = app2.workspace.splitActiveLeaf();
    leaf.openFile(file, { eState: { line: lineNum } });
  } else {
    let leaf = app2.workspace.activeLeaf;
    if (leaf === null) {
      leaf = app2.workspace.getLeaf(true);
    }
    leaf.openFile(file, { eState: { line: lineNum } });
  }
  return;
};
function SvgMore(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "#37352f",
    viewBox: "0 0 24 24",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
}
function SvgComment(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    t: 1650249616615,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 2597,
    width: 20,
    height: 20,
    fill: "currentColor",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z",
    fill: "currentColor",
    "p-id": 2598
  }));
}
function SvgDelete(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "currentColor",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  }));
}
function SvgTaskBlank(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
  }));
}
function SvgTask(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"
  }));
}
function SvgSend(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "currentColor",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
  }));
}
const CommentInput = react.exports.forwardRef((props, ref) => {
  const {
    placeholder,
    showCancelBtn,
    onConfirmBtnClick,
    onCancelBtnClick
  } = props;
  const [value, setValue] = react.exports.useState("");
  const textareaRef = react.exports.useRef(null);
  react.exports.useImperativeHandle(ref, () => ({
    get element() {
      return textareaRef.current;
    },
    focus: () => {
      var _a;
      (_a = textareaRef.current) == null ? void 0 : _a.focus();
    },
    insertText: (text) => {
      const el = textareaRef.current;
      if (!el)
        return;
      const start2 = el.selectionStart;
      const end2 = el.selectionEnd;
      const next = el.value.slice(0, start2) + text + el.value.slice(end2);
      setValue(next);
      requestAnimationFrame(() => {
        el.focus();
        el.setSelectionRange(start2 + text.length, start2 + text.length);
      });
    },
    setContent: (text) => {
      setValue(text);
    },
    getContent: () => {
      var _a, _b;
      return (_b = (_a = textareaRef.current) == null ? void 0 : _a.value) != null ? _b : "";
    }
  }), []);
  const handleSend = () => {
    const content = value.trim();
    if (content === "")
      return;
    setValue("");
    onConfirmBtnClick(content);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "memo-comment-input",
    children: [/* @__PURE__ */ jsx("textarea", {
      className: "memo-comment-input-textarea",
      ref: textareaRef,
      placeholder: placeholder || t$1("Comment it..."),
      value,
      onChange: (e) => setValue(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }
    }), showCancelBtn ? /* @__PURE__ */ jsx("button", {
      className: "memo-comment-cancel-btn",
      onClick: onCancelBtnClick,
      children: t$1("Cancel")
    }) : null, /* @__PURE__ */ jsx("button", {
      className: "memo-comment-send-btn",
      onClick: handleSend,
      disabled: !value.trim(),
      title: "Send",
      children: /* @__PURE__ */ jsx(SvgSend, {
        className: "icon-img"
      })
    })]
  });
});
const Memo = (props) => {
  var _a;
  const {
    globalState
  } = react.exports.useContext(appContext);
  const {
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  const {
    DefaultEditorLocation,
    ShowCommentOnMemos,
    ShowTaskLabel,
    UseButtonToShowEditor
  } = settings;
  const {
    memo: propsMemo
  } = props;
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  const memoCommentRef = react.exports.useRef(null);
  const [isCommentShown, toggleComment] = useToggle(false);
  const [isCommentListShown, toggleCommentList] = useToggle(ShowCommentOnMemos);
  const [commentMemos, setCommentMemos, commentMemosRef] = dist([]);
  const [replyTo, setReplyTo] = dist(null);
  const replyToRef = react.exports.useRef(null);
  const setReplyToBoth = react.exports.useCallback((m2) => {
    replyToRef.current = m2;
    setReplyTo(m2);
  }, []);
  const [, setAddRandomIDflag, RandomIDRef] = dist(false);
  const [menuOpen, setMenuOpen] = dist(false);
  const memoCardRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const handleMouseDown = (e) => {
      const target = e.target;
      if (memoCardRef.current && !memoCardRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);
  const handleMoreMenuClick = react.exports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((v2) => !v2);
  }, []);
  const handleMoreActionClick = react.exports.useCallback((e) => {
    const el = e.target;
    if (!el.closest(".delete-btn")) {
      setMenuOpen(false);
    }
  }, []);
  react.exports.useEffect(() => {
    if (!memoCommentRef.current) {
      return;
    }
    const fetchCommentMemos = async () => {
      const allCommentMemos = memoService.getState().memos.filter((m2) => m2.linkId === propsMemo.hasId).sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt));
      setCommentMemos(allCommentMemos);
    };
    fetchCommentMemos();
  }, [propsMemo.content, propsMemo.id]);
  react.exports.useEffect(() => {
    if (!memoCommentRef.current) {
      return;
    }
    const handlePasteEvent = async (event) => {
      var _a2;
      if (event.clipboardData && event.clipboardData.files.length > 0) {
        event.preventDefault();
        const file = event.clipboardData.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          (_a2 = memoCommentRef.current) == null ? void 0 : _a2.insertText(url);
        }
      }
    };
    const handleDropEvent = async (event) => {
      var _a2;
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          (_a2 = memoCommentRef.current) == null ? void 0 : _a2.insertText(url);
        }
      }
    };
    const handleClickEvent = () => {
      var _a2, _b;
      handleContentChange((_b = (_a2 = memoCommentRef.current) == null ? void 0 : _a2.element.value) != null ? _b : "");
    };
    const handleKeyDownEvent = () => {
      setTimeout(() => {
        var _a2, _b;
        handleContentChange((_b = (_a2 = memoCommentRef.current) == null ? void 0 : _a2.element.value) != null ? _b : "");
      });
    };
    memoCommentRef.current.element.addEventListener("paste", handlePasteEvent);
    memoCommentRef.current.element.addEventListener("drop", handleDropEvent);
    memoCommentRef.current.element.addEventListener("click", handleClickEvent);
    memoCommentRef.current.element.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      var _a2, _b;
      (_a2 = memoCommentRef.current) == null ? void 0 : _a2.element.removeEventListener("paste", handlePasteEvent);
      (_b = memoCommentRef.current) == null ? void 0 : _b.element.removeEventListener("drop", handleDropEvent);
    };
  }, []);
  const handleCancelBtnClick = react.exports.useCallback(() => {
    var _a2;
    globalStateService.setCommentMemoId("");
    (_a2 = memoCommentRef.current) == null ? void 0 : _a2.setContent("");
    toggleComment(false);
  }, []);
  const handleContentChange = react.exports.useCallback((content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    if (tempDiv.innerText.trim() === "") {
      content = "";
    }
    setTimeout(() => {
      var _a2;
      (_a2 = memoCommentRef.current) == null ? void 0 : _a2.focus();
    });
  }, []);
  const handleSaveBtnClick = react.exports.useCallback(async (content) => {
    var _a2, _b;
    if (content === "") {
      new require$$0.Notice(t$1("Content cannot be empty"));
      return;
    }
    const {
      commentMemoId
    } = globalStateService.getState();
    content = content.replaceAll("&nbsp;", " ");
    globalStateService.setChangedByMemos(true);
    try {
      if (commentMemoId) {
        (_a2 = memoCommentRef.current) == null ? void 0 : _a2.setContent("");
        const memo2 = memoService.getCommentMemoById(commentMemoId);
        if (!memo2) {
          throw new Error("Memo not found");
        }
        const prevMemo = memo2;
        content = content.trim();
        if (prevMemo && prevMemo.content !== content) {
          const editedMemo = await memoService.updateMemo({
            memoId: prevMemo.id,
            originalText: prevMemo.content,
            text: content,
            type: prevMemo.memoType,
            path: prevMemo.path
          });
          memoService.editCommentMemo(editedMemo);
          setCommentMemos(commentMemosRef.current.map((m2) => {
            if (m2.id.slice(14) === commentMemoId.slice(14) && m2.path === prevMemo.path) {
              return editedMemo;
            }
            return m2;
          }));
        }
        globalStateService.setCommentMemoId("");
        toggleComment(false);
      } else {
        const parent = replyToRef.current || propsMemo;
        let randomId2 = parent.hasId || "";
        if (!randomId2) {
          randomId2 = Math.random().toString(36).slice(-6);
          setAddRandomIDflag(true);
        }
        (_b = memoCommentRef.current) == null ? void 0 : _b.setContent("");
        const newMemo = await memoService.createCommentMemo({
          text: content.trim(),
          isList: true,
          path: parent.path,
          ID: parent.id,
          hasID: randomId2
        });
        memoService.pushCommentMemo(newMemo);
        setCommentMemos(memoService.getState().memos.filter((m2) => m2.linkId === propsMemo.hasId).sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)));
        setReplyToBoth(null);
        toggleComment(false);
        if (RandomIDRef.current) {
          const editedMemo = await memoService.updateMemo({
            memoId: parent.id,
            originalText: parent.content,
            text: parent.content + " ^" + randomId2,
            type: parent.memoType
          });
          editedMemo.updatedAt = utils$1.getDateTimeString(Date.now());
          memoService.editMemo(editedMemo);
          setAddRandomIDflag(false);
        }
      }
    } catch (error) {
      new require$$0.Notice(error.message);
    }
  }, []);
  const handleUploadFile = react.exports.useCallback(async (file) => {
    const {
      type
    } = file;
    if (!type.startsWith("image")) {
      return;
    }
    try {
      const image2 = await resourceService.upload(file);
      const url = `${image2}`;
      return url;
    } catch (error) {
      new require$$0.Notice(error);
    }
  }, []);
  const handleShowMemoStoryDialog = () => {
    showMemoCardDialog(propsMemo);
  };
  const handleMarkMemoClick = () => {
    if (UseButtonToShowEditor && DefaultEditorLocation === "Bottom") {
      const elem = document.querySelector("div[data-type='memos_view'] .view-content .memo-show-editor-button");
      if (elem == null ? void 0 : elem.onclick) {
        elem.onclick.call(elem, new MouseEvent("click"));
      }
    }
    globalStateService.setMarkMemoId(propsMemo.id);
  };
  const handleEditMemoClick = () => {
    if (UseButtonToShowEditor && DefaultEditorLocation === "Bottom" && require$$0.Platform.isMobile) {
      const elem = document.querySelector("div[data-type='memos_view'] .view-content .memo-show-editor-button");
      if (elem.onclick) {
        elem.onclick.call(elem, new MouseEvent("click"));
      }
    }
    globalStateService.setEditMemoId(propsMemo.id);
  };
  const handleSourceMemoClick = (m2) => {
    showMemoInDailyNotes(m2.id, m2.path || "");
  };
  const animateShred = () => {
    var _a2;
    const el = memoCardRef.current;
    if (!el) {
      return Promise.resolve();
    }
    const w2 = el.offsetWidth;
    const h2 = el.offsetHeight;
    if (w2 < 8 || h2 < 8) {
      return Promise.resolve();
    }
    const host = (_a2 = el.offsetParent) != null ? _a2 : el.parentElement;
    if (!host) {
      return Promise.resolve();
    }
    const x2 = el.offsetLeft;
    const y2 = el.offsetTop;
    const N2 = 8;
    const band = w2 / N2;
    const cloneTemplate = el.cloneNode(true);
    cloneTemplate.querySelectorAll(".more-action-btns-wrapper").forEach((n2) => {
      n2.style.display = "none";
    });
    const overlay = document.createElement("div");
    overlay.style.cssText = `position:absolute;left:${x2}px;top:${y2}px;width:${w2}px;height:${h2}px;pointer-events:none;z-index:50;`;
    for (let i = 0; i < N2; i++) {
      const outer = document.createElement("div");
      outer.style.cssText = `position:absolute;top:0;left:${i * band}px;width:${band}px;height:100%;overflow:hidden;`;
      const inner = document.createElement("div");
      inner.style.cssText = `position:absolute;top:0;left:${-i * band}px;width:${w2}px;height:auto;`;
      inner.appendChild(cloneTemplate.cloneNode(true));
      outer.appendChild(inner);
      overlay.appendChild(outer);
    }
    host.appendChild(overlay);
    el.style.visibility = "hidden";
    const rnd = (min2, max2) => min2 + Math.random() * (max2 - min2);
    Array.from(overlay.children).forEach((outer) => {
      outer.animate([{
        transform: "translate(0,0) rotate(0deg)",
        opacity: 1
      }, {
        transform: `translate(${rnd(-3, 3)}px, ${rnd(40, 130)}px) rotate(${rnd(-14, 14)}deg)`,
        opacity: 0
      }], {
        duration: rnd(240, 430),
        delay: rnd(0, 30),
        easing: "cubic-bezier(0.2, 0.6, 0.4, 1)",
        fill: "both"
      });
    });
    return new Promise((resolve) => {
      window.setTimeout(() => {
        overlay.remove();
        if (document.contains(el)) {
          el.style.visibility = "";
        }
        resolve();
      }, 460);
    });
  };
  const handleDeleteMemoClick = async () => {
    if (!showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn();
      return;
    }
    setMenuOpen(false);
    const shredDone = animateShred();
    try {
      await memoService.hideMemoById(propsMemo.id);
    } catch (error) {
      new require$$0.Notice(error.message);
    }
    await shredDone;
    if (globalStateService.getState().editMemoId === propsMemo.id) {
      globalStateService.setEditMemoId("");
    }
  };
  const handleMouseLeaveMemoWrapper = () => {
    if (showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn(false);
    }
  };
  const handleGenMemoImageBtnClick = () => {
    showShareMemoImageDialog(propsMemo);
  };
  const handleMemoTypeShow = () => {
    if (!ShowTaskLabel) {
      return null;
    }
    if (propsMemo.memoType === "TASK-TODO") {
      return /* @__PURE__ */ jsx(SvgTaskBlank, {});
    } else if (propsMemo.memoType === "TASK-DONE") {
      return /* @__PURE__ */ jsx(SvgTask, {});
    }
    return null;
  };
  const handleMemoDoubleClick = react.exports.useCallback((event) => {
    if (event) {
      handleEditMemoClick();
    }
  }, []);
  const handleMemoContentClick = async (e, m2) => {
    var _a2;
    const targetEl = e.target;
    if (e.ctrlKey || e.metaKey) {
      handleSourceMemoClick(m2);
    }
    if (targetEl.className === "memo-link-text") {
      const memoId = (_a2 = targetEl.dataset) == null ? void 0 : _a2.value;
      const memoTemp = memoService.getMemoById(memoId != null ? memoId : "");
      if (memoTemp) {
        showMemoCardDialog(memoTemp);
      } else {
        new require$$0.Notice("MEMO Not Found");
        targetEl.classList.remove("memo-link-text");
      }
    } else if (targetEl.className === "todo-block")
      ;
  };
  const handleCommentBlock = () => {
    setReplyToBoth(null);
    if (!isCommentShown) {
      toggleComment(true);
    } else {
      toggleComment(false);
    }
    if (!isCommentListShown) {
      toggleCommentList(true);
    } else if (!ShowCommentOnMemos && isCommentListShown) {
      toggleCommentList(false);
    }
  };
  const handleEditCommentClick = react.exports.useCallback((memo2) => {
    var _a2, _b;
    globalStateService.setCommentMemoId(memo2.id);
    if (!isCommentShown) {
      toggleComment(true);
    }
    (_a2 = memoCommentRef.current) == null ? void 0 : _a2.focus();
    (_b = memoCommentRef.current) == null ? void 0 : _b.setContent(memo2.content.trim());
  }, []);
  const showEditStatus = Boolean(globalState.commentMemoId);
  const handleReplyClick = react.exports.useCallback((comment) => {
    const current = replyToRef.current;
    if (current && current.id === comment.id) {
      setReplyToBoth(null);
      toggleComment(false);
    } else {
      setReplyToBoth(comment);
      toggleComment(true);
      setTimeout(() => {
        var _a2;
        (_a2 = memoCommentRef.current) == null ? void 0 : _a2.focus();
      }, 0);
    }
  }, []);
  const handleDeleteCommentClick = react.exports.useCallback(async (comment) => {
    await memoService.hideMemoById(comment.id);
    setCommentMemos(memoService.getState().memos.filter((m2) => m2.linkId === propsMemo.hasId && !m2.isDeleted).sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)));
  }, [propsMemo.hasId]);
  const imageProps = {
    memo: propsMemo.content
  };
  return /* @__PURE__ */ jsxs("div", {
    ref: memoCardRef,
    className: `memo-wrapper ${"memos-" + propsMemo.id} ${propsMemo.memoType}${menuOpen ? " menu-open" : ""}`,
    onMouseLeave: handleMouseLeaveMemoWrapper,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "memo-top-wrapper",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "memo-top-left-wrapper",
        children: [/* @__PURE__ */ jsx("span", {
          className: "time-text",
          onClick: handleShowMemoStoryDialog,
          children: utils$1.getDateTimeString(propsMemo.createdAt, settings.TimeFormat !== "HH:mm")
        }), /* @__PURE__ */ jsx("div", {
          className: `memo-type-img ${(propsMemo.memoType === "TASK-TODO" || propsMemo.memoType === "TASK-DONE") && ShowTaskLabel ? "" : "hidden"}`,
          children: (_a = handleMemoTypeShow()) != null ? _a : ""
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "memo-top-right-wrapper",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "comment-button-wrapper",
          children: [/* @__PURE__ */ jsx(SvgComment, {
            className: "icon-img",
            onClick: handleCommentBlock
          }), commentMemos.length > 0 ? /* @__PURE__ */ jsx("div", {
            className: "comment-text-count",
            children: commentMemos.length
          }) : null]
        }), /* @__PURE__ */ jsxs("div", {
          className: "btns-container",
          children: [/* @__PURE__ */ jsx("span", {
            className: "btn more-action-btn",
            onClick: handleMoreMenuClick,
            children: /* @__PURE__ */ jsx(SvgMore, {
              className: "icon-img"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "more-action-btns-wrapper",
            onClick: handleMoreActionClick,
            children: /* @__PURE__ */ jsxs("div", {
              className: "more-action-btns-container",
              children: [/* @__PURE__ */ jsx("span", {
                className: "btn",
                onClick: handleShowMemoStoryDialog,
                children: t$1("READ")
              }), /* @__PURE__ */ jsx("span", {
                className: "btn",
                onClick: handleMarkMemoClick,
                children: t$1("MARK")
              }), /* @__PURE__ */ jsx("span", {
                className: "btn",
                onClick: handleGenMemoImageBtnClick,
                children: t$1("SHARE")
              }), /* @__PURE__ */ jsx("span", {
                className: "btn",
                onClick: handleEditMemoClick,
                children: t$1("EDIT")
              }), /* @__PURE__ */ jsx("span", {
                className: "btn",
                onClick: () => handleSourceMemoClick(propsMemo),
                children: t$1("SOURCE")
              }), /* @__PURE__ */ jsx("span", {
                className: `btn delete-btn ${showConfirmDeleteBtn ? "final-confirm" : ""}`,
                onClick: handleDeleteMemoClick,
                children: showConfirmDeleteBtn ? t$1("CONFIRM\uFF01") : t$1("DELETE")
              })]
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "memo-content-text",
      onClick: (e) => handleMemoContentClick(e, propsMemo),
      onDoubleClick: handleMemoDoubleClick,
      dangerouslySetInnerHTML: {
        __html: formatMemoContent(propsMemo.content, propsMemo.id)
      }
    }), /* @__PURE__ */ jsx(MemoImage, {
      ...imageProps
    }), /* @__PURE__ */ jsxs("div", {
      className: `memo-comment-wrapper`,
      children: [commentMemos.length > 0 && isCommentListShown ? /* @__PURE__ */ jsx("div", {
        className: `memo-comment-list`,
        children: commentMemos.filter((m2) => !m2.isDeleted).map((m2, idx) => /* @__PURE__ */ jsx(MemoComment, {
          comment: m2,
          allMemos: memoService.getState().memos,
          onContentClick: handleMemoContentClick,
          onEdit: handleEditCommentClick,
          onReply: handleReplyClick,
          onDelete: handleDeleteCommentClick
        }, m2.id || idx))
      }) : null, /* @__PURE__ */ jsxs("div", {
        className: `memo-comment-inputer ${isCommentShown ? "" : "hidden"}`,
        children: [replyTo && replyTo.id !== propsMemo.id ? /* @__PURE__ */ jsxs("div", {
          className: "memo-comment-replying",
          children: ["\u56DE\u590D: ", replyTo.content.slice(0, 30)]
        }) : null, /* @__PURE__ */ jsx(CommentInput, {
          ref: memoCommentRef,
          placeholder: t$1("Comment it..."),
          showCancelBtn: showEditStatus,
          onConfirmBtnClick: handleSaveBtnClick,
          onCancelBtnClick: handleCancelBtnClick
        })]
      })]
    })]
  });
};
function formatMemoContent(content, memoid) {
  content = encodeHtml(content);
  content = parseRawTextToHtml(content).split("<br>").map((t2) => {
    return `<p>${t2 !== "" ? t2 : "<br>"}</p>`;
  }).join("");
  const {
    shouldUseMarkdownParser,
    shouldHideImageUrl
  } = globalStateService.getState();
  if (shouldUseMarkdownParser) {
    content = parseMarkedToHtml(content, memoid);
  }
  if (shouldHideImageUrl) {
    content = content.replace(WIKI_IMAGE_URL_REG, "").replace(MARKDOWN_URL_REG, "").replace(IMAGE_URL_REG, "");
  }
  content = content.replace(LINK_REG, "$1<a class='link' target='_blank' rel='noreferrer' href='$2'>$2</a>").replace(MD_LINK_REG, "<a class='link' target='_blank' rel='noreferrer' href='$2'>$1</a>").replace(MEMO_LINK_REG, "<span class='memo-link-text' data-value='$2'>$1</span>").replace(/\^\S{6}/g, "");
  const tagsCollect = (content2) => {
    let tags = [...content2.matchAll(TAG_REG)];
    tags = [...tags, ...content2.matchAll(FIRST_TAG_REG)];
    tags.sort((tag, tag2) => tag.index - tag2.index);
    content2 = content2.replace(TAG_REG, "").replace(FIRST_TAG_REG, "");
    let tagsComponent = `<p>`;
    if (tags.length > 0) {
      for (const tag of tags) {
        tagsComponent += `<span class='tag-span'>#${tag[tag.length - 1]}</span>`;
      }
      {
        content2 += tagsComponent;
      }
    }
    return content2;
  };
  content = tagsCollect(content);
  const tempDivContainer = document.createElement("div");
  tempDivContainer.innerHTML = content;
  for (let i = 0; i < tempDivContainer.children.length; i++) {
    const c = tempDivContainer.children[i];
    if (c.tagName === "P" && c.textContent === "") {
      c.remove();
      i--;
      continue;
    }
  }
  return tempDivContainer.innerHTML;
}
const MemoComment = ({
  comment,
  allMemos,
  onContentClick,
  onEdit,
  onReply,
  onDelete
}) => {
  const {
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  const children = allMemos.filter((m2) => m2.linkId === comment.hasId && !m2.isDeleted).sort((a, b) => utils$1.getTimeStampByDate(a.createdAt) - utils$1.getTimeStampByDate(b.createdAt));
  const [hovered, setHovered] = dist(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "memo-comment-item",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "memo-comment",
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: [/* @__PURE__ */ jsx("div", {
        className: "memo-comment-time",
        children: utils$1.getDateTimeString(comment.createdAt, settings.TimeFormat !== "HH:mm")
      }), /* @__PURE__ */ jsx("div", {
        className: "memo-comment-text",
        onClick: (e) => onContentClick(e, comment),
        onDoubleClick: () => onEdit(comment),
        dangerouslySetInnerHTML: {
          __html: formatMemoContent(comment.content.trim(), comment.id)
        }
      }), /* @__PURE__ */ jsxs("div", {
        className: `memo-comment-actions ${hovered ? "" : "hidden"}`,
        children: [/* @__PURE__ */ jsx("button", {
          className: "memo-comment-reply-btn",
          onClick: () => onReply(comment),
          title: t$1("Reply"),
          children: /* @__PURE__ */ jsx(SvgComment, {
            className: "icon-img"
          })
        }), /* @__PURE__ */ jsx("button", {
          className: "memo-comment-delete-btn",
          onClick: () => onDelete(comment),
          title: t$1("Delete"),
          children: /* @__PURE__ */ jsx(SvgDelete, {
            className: "icon-img"
          })
        })]
      })]
    }), children.length > 0 ? /* @__PURE__ */ jsx("div", {
      className: "memo-comment-children",
      children: children.map((c) => /* @__PURE__ */ jsx(MemoComment, {
        comment: c,
        allMemos,
        onContentClick,
        onEdit,
        onReply,
        onDelete
      }, c.id))
    }) : null]
  });
};
var Memo$1 = react.exports.memo(Memo);
var dailyMemo = "";
const DailyMemo = (props) => {
  const {
    app: app2
  } = appStore.getState().dailyNotesState;
  const {
    memo: propsMemo
  } = props;
  const showSeconds = appStore.getState().settingsState.settings.TimeFormat !== "HH:mm";
  const memo2 = {
    ...propsMemo,
    createdAtStr: utils$1.getDateTimeString(propsMemo.createdAt, showSeconds),
    timeStr: utils$1.getTimeString(propsMemo.createdAt, showSeconds)
  };
  const {
    external,
    internal
  } = parseMemoImages(memo2.content, app2);
  const allImages = [...external.map((u2) => ({
    src: u2
  })), ...internal.map((img) => ({
    src: img.path,
    filepath: img.filepath
  }))];
  return /* @__PURE__ */ jsxs("div", {
    className: "daily-memo-wrapper",
    children: [/* @__PURE__ */ jsx("div", {
      className: "time-wrapper",
      children: /* @__PURE__ */ jsx("span", {
        className: "normal-text",
        children: memo2.timeStr
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "memo-content-container",
      children: [/* @__PURE__ */ jsx("div", {
        className: "memo-content-text",
        dangerouslySetInnerHTML: {
          __html: formatMemoContent(memo2.content)
        }
      }), /* @__PURE__ */ jsx(Only, {
        when: external.length > 0,
        children: /* @__PURE__ */ jsx("div", {
          className: "images-container",
          children: external.map((imgUrl, idx) => /* @__PURE__ */ jsx(Image$1, {
            className: "memo-img",
            imgUrl,
            alt: "",
            referrerPolicy: "no-referrer",
            allImages,
            index: idx
          }, idx))
        })
      }), /* @__PURE__ */ jsx(Only, {
        when: internal.length > 0,
        children: /* @__PURE__ */ jsx("div", {
          className: "images-container internal-embed image-embed is-loaded",
          children: internal.map((imgUrl, idx) => /* @__PURE__ */ jsx(Image$1, {
            className: "memo-img",
            imgUrl: imgUrl.path,
            alt: imgUrl.altText,
            filepath: imgUrl.filepath,
            allImages,
            index: external.length + idx
          }, idx))
        })
      })]
    })]
  });
};
var datePicker = "";
function SvgArrowLeft(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
  }));
}
function SvgArrowRight(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"
  }));
}
const DatePicker = (props) => {
  var _a, _b;
  const {
    className,
    datestamp,
    handleDateStampChange
  } = props;
  const [currentDateStamp, setCurrentDateStamp] = react.exports.useState(getMonthFirstDayDateStamp(datestamp));
  react.exports.useEffect(() => {
    setCurrentDateStamp(getMonthFirstDayDateStamp(datestamp));
  }, [datestamp]);
  const firstDate = new Date(currentDateStamp);
  const firstDateDay = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
  const dayList = [];
  for (let i = 0; i < firstDateDay; i++) {
    dayList.push({
      date: 0,
      datestamp: firstDate.getTime() - DAILY_TIMESTAMP * (7 - i)
    });
  }
  const dayAmount = getMonthDayAmount(currentDateStamp);
  for (let i = 1; i <= dayAmount; i++) {
    dayList.push({
      date: i,
      datestamp: firstDate.getTime() + DAILY_TIMESTAMP * (i - 1)
    });
  }
  const handleDateItemClick = (datestamp2) => {
    handleDateStampChange(datestamp2);
  };
  const handleChangeMonthBtnClick = (i) => {
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth() + 1;
    let nextDateStamp = 0;
    if (month === 1 && i === -1) {
      nextDateStamp = new Date(`${year - 1}/12/1`).getTime();
    } else if (month === 12 && i === 1) {
      nextDateStamp = new Date(`${year + 1}/1/1`).getTime();
    } else {
      nextDateStamp = new Date(`${year}/${month + i}/1`).getTime();
    }
    setCurrentDateStamp(getMonthFirstDayDateStamp(nextDateStamp));
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `date-picker-wrapper ${className}`,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "date-picker-header",
      children: [/* @__PURE__ */ jsx("span", {
        className: "btn-text",
        onClick: () => handleChangeMonthBtnClick(-1),
        children: /* @__PURE__ */ jsx(SvgArrowLeft, {
          className: "icon-img"
        })
      }), /* @__PURE__ */ jsxs("span", {
        className: "normal-text",
        children: [firstDate.getFullYear(), " ", t$1("year"), " ", (_a = t$1("monthsShort")[firstDate.getMonth()]) != null ? _a : firstDate.getMonth() + 1, " ", (_b = t$1("month")) != null ? _b : ""]
      }), /* @__PURE__ */ jsx("span", {
        className: "btn-text",
        onClick: () => handleChangeMonthBtnClick(1),
        children: /* @__PURE__ */ jsx(SvgArrowRight, {
          className: "icon-img"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "date-picker-day-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "date-picker-day-header",
        children: [/* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[0]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[1]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[2]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[3]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[4]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[5]
        }), /* @__PURE__ */ jsx("span", {
          className: "day-item",
          children: t$1("weekDaysShort")[6]
        })]
      }), dayList.map((d) => {
        if (d.date === 0) {
          return /* @__PURE__ */ jsx("span", {
            className: "day-item null",
            children: ""
          }, d.datestamp);
        } else {
          return /* @__PURE__ */ jsx("span", {
            className: `day-item ${d.datestamp === datestamp ? "current" : ""}`,
            onClick: () => handleDateItemClick(d.datestamp),
            children: d.date
          }, d.datestamp);
        }
      })]
    })]
  });
};
function getMonthDayAmount(datestamp) {
  const dateTemp = new Date(datestamp);
  const currentDate = new Date(`${dateTemp.getFullYear()}/${dateTemp.getMonth() + 1}/1`);
  const nextMonthDate = currentDate.getMonth() === 11 ? new Date(`${currentDate.getFullYear() + 1}/1/1`) : new Date(`${currentDate.getFullYear()}/${currentDate.getMonth() + 2}/1`);
  return (nextMonthDate.getTime() - currentDate.getTime()) / DAILY_TIMESTAMP;
}
function getMonthFirstDayDateStamp(timestamp) {
  const dateTemp = new Date(timestamp);
  const currentDate = new Date(`${dateTemp.getFullYear()}/${dateTemp.getMonth() + 1}/1`);
  return currentDate.getTime();
}
var dailyMemoDiaryDialog = "";
const DailyMemoDiaryDialog = (props) => {
  const loadingState = useLoading();
  const [memos, setMemos] = react.exports.useState([]);
  const [currentDateStamp, setCurrentDateStamp] = react.exports.useState(utils$1.getDateStampByDate(utils$1.getDateString(props.currentDateStamp)));
  const [showDatePicker, toggleShowDatePicker] = useToggle(false);
  const memosElRef = react.exports.useRef(null);
  const currentDate = new Date(currentDateStamp);
  const {
    vault
  } = appStore.getState().dailyNotesState.app;
  react.exports.useEffect(() => {
    const setDailyMemos = () => {
      const dailyMemos = memoService.getState().memos.filter((a) => utils$1.getTimeStampByDate(a.createdAt) >= currentDateStamp && utils$1.getTimeStampByDate(a.createdAt) < currentDateStamp + DAILY_TIMESTAMP).sort((a, b) => utils$1.getTimeStampByDate(a.createdAt) - utils$1.getTimeStampByDate(b.createdAt));
      setMemos(dailyMemos);
      loadingState.setFinish();
    };
    setDailyMemos();
  }, [currentDateStamp]);
  const convertBase64ToBlob = (base64, type) => {
    var bytes = window.atob(base64);
    var ab2 = new ArrayBuffer(bytes.length);
    var ia2 = new Uint8Array(ab2);
    for (var i = 0; i < bytes.length; i++) {
      ia2[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab2], {
      type
    });
  };
  const handleShareBtnClick = async () => {
    toggleShowDatePicker(false);
    setTimeout(() => {
      if (!memosElRef.current) {
        return;
      }
      toImage(memosElRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: window.devicePixelRatio * 2
      }).then((url) => {
        if (appStore.getState().settingsState.settings.AutoSaveWhenOnMobile && require$$0.Platform.isMobile) {
          const myBase64 = url.split("base64,")[1];
          const blobInput = convertBase64ToBlob(myBase64, "image/png");
          blobInput.arrayBuffer().then(async (buffer) => {
            let aFile;
            const ext = "png";
            const dailyNotes = getAllDailyNotes_1();
            for (const string in dailyNotes) {
              if (dailyNotes[string] instanceof require$$0.TFile) {
                aFile = dailyNotes[string];
                break;
              }
            }
            if (aFile !== void 0) {
              await vault.createBinary(
                await vault.getAvailablePathForAttachments(`Pasted Image ${require$$0.moment().format("YYYYMMDDHHmmss")}`, ext, aFile),
                buffer
              );
            }
          });
        }
        showPreviewImageDialog(url);
      }).catch(() => {
      });
    }, 0);
  };
  const handleDataPickerChange = (datestamp) => {
    setCurrentDateStamp(datestamp);
    toggleShowDatePicker(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      className: "dialog-header-container",
      children: /* @__PURE__ */ jsxs("div", {
        className: "header-wrapper",
        children: [/* @__PURE__ */ jsx("p", {
          className: "title-text",
          children: t$1("Daily Memos")
        }), /* @__PURE__ */ jsxs("div", {
          className: "btns-container",
          children: [/* @__PURE__ */ jsx("span", {
            className: "btn-text",
            onClick: () => setCurrentDateStamp(currentDateStamp - DAILY_TIMESTAMP),
            children: /* @__PURE__ */ jsx(SvgArrowLeft, {
              className: "icon-img"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "btn-text",
            onClick: () => setCurrentDateStamp(currentDateStamp + DAILY_TIMESTAMP),
            children: /* @__PURE__ */ jsx(SvgArrowRight, {
              className: "icon-img"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "btn-text share-btn",
            onClick: handleShareBtnClick,
            children: /* @__PURE__ */ jsx(SvgShare, {
              className: "icon-img"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "btn-text",
            onClick: () => props.destroy(),
            children: /* @__PURE__ */ jsx(SvgClose, {
              className: "icon-img"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-content-container",
      ref: memosElRef,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "date-card-container",
        onClick: () => toggleShowDatePicker(),
        children: [/* @__PURE__ */ jsx("div", {
          className: "year-text",
          children: currentDate.getFullYear()
        }), /* @__PURE__ */ jsxs("div", {
          className: "date-container",
          children: [/* @__PURE__ */ jsx("div", {
            className: "month-text",
            children: t$1("months")[currentDate.getMonth()]
          }), /* @__PURE__ */ jsx("div", {
            className: "date-text",
            children: currentDate.getDate()
          }), /* @__PURE__ */ jsx("div", {
            className: "day-text",
            children: t$1("weekDays")[currentDate.getDay()]
          })]
        })]
      }), /* @__PURE__ */ jsx(DatePicker, {
        className: `date-picker ${showDatePicker ? "" : "hidden"}`,
        datestamp: currentDateStamp,
        handleDateStampChange: handleDataPickerChange
      }), loadingState.isLoading ? /* @__PURE__ */ jsx("div", {
        className: "tip-container",
        children: /* @__PURE__ */ jsx("p", {
          className: "tip-text",
          children: t$1("Loading...")
        })
      }) : memos.length === 0 ? /* @__PURE__ */ jsx("div", {
        className: "tip-container",
        children: /* @__PURE__ */ jsx("p", {
          className: "tip-text",
          children: t$1("Noooop!")
        })
      }) : /* @__PURE__ */ jsx("div", {
        className: "dailymemos-wrapper",
        children: memos.map((memo2) => /* @__PURE__ */ jsx(DailyMemo, {
          memo: memo2
        }, `${memo2.id}-${memo2.updatedAt}`))
      })]
    })]
  });
};
function showDailyMemoDiaryDialog(datestamp = Date.now()) {
  showDialog({
    className: "daily-memo-diary-dialog"
  }, DailyMemoDiaryDialog, {
    currentDateStamp: datestamp
  });
}
var userBanner = "";
const UserBanner = () => {
  const {
    memoState: {
      memos,
      tags
    },
    userState: {
      user
    },
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  const username = user ? user.username : settings.UserName;
  let memosLength;
  let createdDays;
  if (memos.length) {
    memosLength = memos.length - 1;
    createdDays = memos ? Math.ceil((Date.now() - utils$1.getTimeStampByDate(memos[memosLength].createdAt)) / 1e3 / 3600 / 24) + 1 : 0;
  }
  const [shouldShowPopupBtns, setShouldShowPopupBtns] = react.exports.useState(false);
  const handleUsernameClick = react.exports.useCallback(() => {
    locationService.pushHistory("/");
    locationService.clearQuery();
  }, []);
  const handlePopupBtnClick = () => {
    const sidebarEl = document.querySelector(".memos-sidebar-wrapper");
    const popupEl = document.querySelector(".menu-btns-popup");
    popupEl.style.top = 70 - sidebarEl.scrollTop + "px";
    setShouldShowPopupBtns(true);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "user-banner-container",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "userinfo-header-container",
      children: [/* @__PURE__ */ jsx("p", {
        className: "username-text",
        onClick: handleUsernameClick,
        children: username
      }), /* @__PURE__ */ jsx("span", {
        className: "action-btn menu-popup-btn",
        onClick: handlePopupBtnClick,
        children: /* @__PURE__ */ jsx(SvgMore, {
          className: "icon-img"
        })
      }), /* @__PURE__ */ jsx(MenuBtnsPopup, {
        shownStatus: shouldShowPopupBtns,
        setShownStatus: setShouldShowPopupBtns
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "status-text-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "status-text memos-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "amount-text",
          children: memos.length
        }), /* @__PURE__ */ jsx("span", {
          className: "type-text",
          children: "MEMO"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "status-text tags-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "amount-text",
          children: tags.length
        }), /* @__PURE__ */ jsx("span", {
          className: "type-text",
          children: t$1("TAG")
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "status-text duration-text",
        onClick: () => showDailyMemoDiaryDialog(),
        children: [/* @__PURE__ */ jsx("span", {
          className: "amount-text",
          children: createdDays != null ? createdDays : 0
        }), /* @__PURE__ */ jsx("span", {
          className: "type-text",
          children: t$1("DAY")
        })]
      })]
    })]
  });
};
const relationConsts = [
  { text: "AND", value: "AND" },
  { text: "OR", value: "OR" }
];
const filterConsts = {
  TAG: {
    value: "TAG",
    text: t$1("TAG"),
    operators: [
      {
        text: t$1("INCLUDE"),
        value: "CONTAIN"
      },
      {
        text: t$1("EXCLUDE"),
        value: "NOT_CONTAIN"
      }
    ]
  },
  TYPE: {
    value: "TYPE",
    text: t$1("TYPE"),
    operators: [
      {
        value: "IS",
        text: t$1("IS")
      },
      {
        value: "IS_NOT",
        text: t$1("ISNOT")
      }
    ],
    values: [
      {
        value: "CONNECTED",
        text: t$1("LINKED")
      },
      {
        value: "NOT_TAGGED",
        text: t$1("NO TAGS")
      },
      {
        value: "LINKED",
        text: t$1("HAS LINKS")
      },
      {
        value: "IMAGED",
        text: t$1("HAS IMAGES")
      }
    ]
  },
  TEXT: {
    value: "TEXT",
    text: t$1("TEXT"),
    operators: [
      {
        value: "CONTAIN",
        text: t$1("INCLUDE")
      },
      {
        value: "NOT_CONTAIN",
        text: t$1("EXCLUDE")
      }
    ]
  },
  DATE: {
    value: "DATE",
    text: t$1("DATE"),
    operators: [
      {
        value: "NOT_CONTAIN",
        text: t$1("BEFORE")
      },
      {
        value: "CONTAIN",
        text: t$1("AFTER")
      }
    ]
  }
};
const memoSpecialTypes = filterConsts["TYPE"].values;
const getTextWithMemoType = (type) => {
  for (const t2 of memoSpecialTypes) {
    if (t2.value === type) {
      return t2.text;
    }
  }
  return "";
};
const getDefaultFilter = () => {
  return {
    type: "TAG",
    value: {
      operator: "CONTAIN",
      value: ""
    },
    relation: "AND"
  };
};
const checkShouldShowMemoWithFilters = (memo2, filters) => {
  let shouldShow = true;
  for (const f2 of filters) {
    const { relation } = f2;
    const r2 = checkShouldShowMemo(memo2, f2);
    if (relation === "OR") {
      shouldShow = shouldShow || r2;
    } else {
      shouldShow = shouldShow && r2;
    }
  }
  return shouldShow;
};
const checkShouldShowMemo = (memo2, filter) => {
  var _a, _b;
  const {
    type,
    value: { operator, value }
  } = filter;
  if (value === "") {
    return true;
  }
  let shouldShow = true;
  if (type === "TAG") {
    let contained = true;
    const tagsSet = /* @__PURE__ */ new Set();
    for (const t2 of Array.from((_a = memo2.content.match(TAG_REG)) != null ? _a : [])) {
      const tag = t2.replace(TAG_REG, "$1").trim();
      const items = tag.split("/");
      let temp = "";
      for (const i of items) {
        temp += i;
        tagsSet.add(temp);
        temp += "/";
      }
    }
    for (const t2 of Array.from((_b = memo2.content.match(NOP_FIRST_TAG_REG)) != null ? _b : [])) {
      const tag = t2.replace(NOP_FIRST_TAG_REG, "$1").trim();
      const items = tag.split("/");
      let temp = "";
      for (const i of items) {
        temp += i;
        tagsSet.add(temp);
        temp += "/";
      }
    }
    if (!tagsSet.has(value)) {
      contained = false;
    }
    if (operator === "NOT_CONTAIN") {
      contained = !contained;
    }
    shouldShow = contained;
  } else if (type === "TYPE") {
    let matched = false;
    if (value === "NOT_TAGGED" && memo2.content.match(TAG_REG) === null) {
      matched = true;
    } else if (value === "LINKED" && memo2.content.match(LINK_REG) !== null) {
      matched = true;
    } else if (value === "IMAGED" && memo2.content.match(IMAGE_URL_REG) !== null) {
      matched = true;
    } else if (value === "CONNECTED" && memo2.content.match(MEMO_LINK_REG) !== null) {
      matched = true;
    }
    if (operator === "IS_NOT") {
      matched = !matched;
    }
    shouldShow = matched;
  } else if (type === "TEXT") {
    let contained = memo2.content.includes(value);
    if (operator === "NOT_CONTAIN") {
      contained = !contained;
    }
    shouldShow = contained;
  } else if (type === "DATE") {
    if (!app.plugins.enabledPlugins.has("nldates-obsidian")) {
      new require$$0.Notice(t$1("OBSIDIAN_NLDATES_PLUGIN_NOT_ENABLED"));
    } else {
      const nldatesPlugin = app.plugins.getPlugin("nldates-obsidian");
      const parsedResult = nldatesPlugin.parseDate(value);
      let contained;
      if (parsedResult.date !== null) {
        contained = parsedResult.moment.isBefore(require$$0.moment(memo2.createdAt), "day");
      }
      if (operator === "NOT_CONTAIN") {
        contained = !contained;
      }
      shouldShow = contained;
    }
  }
  shouldShow = memo2.linkId === "" ? shouldShow : false;
  return shouldShow;
};
var selector = "";
const nullItem = {
  text: t$1("SELECT"),
  value: ""
};
const Selector = (props) => {
  const {
    className,
    dataSource,
    handleValueChanged,
    value
  } = props;
  const [showSelector, toggleSelectorStatus] = useToggle(false);
  const seletorElRef = react.exports.useRef(null);
  let currentItem = nullItem;
  for (const d of dataSource) {
    if (d.value === value) {
      currentItem = d;
      break;
    }
  }
  react.exports.useEffect(() => {
    if (showSelector) {
      const handleClickOutside = (event) => {
        var _a;
        if (!((_a = seletorElRef.current) == null ? void 0 : _a.contains(event.target))) {
          toggleSelectorStatus(false);
        }
      };
      window.addEventListener("click", handleClickOutside, {
        capture: true,
        once: true
      });
    }
  }, [showSelector]);
  const handleItemClick = (item) => {
    if (handleValueChanged) {
      handleValueChanged(item.value);
    }
    toggleSelectorStatus(false);
  };
  const handleCurrentValueClick = (event) => {
    event.stopPropagation();
    toggleSelectorStatus();
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `selector-wrapper ${className != null ? className : ""}`,
    ref: seletorElRef,
    children: [/* @__PURE__ */ jsxs("div", {
      className: `current-value-container ${showSelector ? "active" : ""}`,
      onClick: handleCurrentValueClick,
      children: [/* @__PURE__ */ jsx("span", {
        className: "value-text",
        children: currentItem.text
      }), /* @__PURE__ */ jsx("span", {
        className: "arrow-text",
        children: /* @__PURE__ */ jsx(SvgArrowRight, {
          className: "icon-img"
        })
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: `items-wrapper ${showSelector ? "" : "hidden"}`,
      children: dataSource.map((d) => {
        return /* @__PURE__ */ jsx("div", {
          className: `item-container ${d.value === value ? "selected" : ""}`,
          onClick: () => {
            handleItemClick(d);
          },
          children: d.text
        }, d.value);
      })
    })]
  });
};
var Selector$1 = react.exports.memo(Selector);
var createQueryDialog = "";
const CreateQueryDialog = (props) => {
  const {
    destroy,
    queryId
  } = props;
  const [title, setTitle] = react.exports.useState("");
  const [filters, setFilters] = react.exports.useState([]);
  const requestState = useLoading(false);
  const shownMemoLength = memoService.getState().memos.filter((memo2) => {
    return checkShouldShowMemoWithFilters(memo2, filters);
  }).length;
  react.exports.useEffect(() => {
    const queryTemp = queryService.getQueryById(queryId != null ? queryId : "");
    if (queryTemp) {
      setTitle(queryTemp.title);
      const temp = JSON.parse(queryTemp.querystring);
      if (Array.isArray(temp)) {
        setFilters(temp);
      }
    }
  }, [queryId]);
  const handleTitleInputChange = (e) => {
    const text = e.target.value;
    setTitle(text);
  };
  const handleSaveBtnClick = async () => {
    if (!title) {
      new require$$0.Notice(t$1("TITLE CANNOT BE NULL!"));
      return;
    }
    if (filters.length === 0) {
      new require$$0.Notice(t$1("FILTER CANNOT BE NULL!"));
      return;
    }
    try {
      if (queryId) {
        const editedQuery = await queryService.updateQuery(queryId, title, JSON.stringify(filters));
        queryService.editQuery(editedQuery);
        queryService.getMyAllQueries();
      } else {
        const query = await queryService.createQuery(title, JSON.stringify(filters));
        queryService.pushQuery(query);
        queryService.getMyAllQueries();
      }
    } catch (error) {
      new require$$0.Notice(error.message);
    }
    destroy();
  };
  const handleAddFilterBenClick = () => {
    if (filters.length > 0) {
      const lastFilter = filters[filters.length - 1];
      if (lastFilter.value.value === "") {
        new require$$0.Notice(t$1("Please finish the last filter setting first"));
        return;
      }
    }
    setFilters([...filters, getDefaultFilter()]);
  };
  const handleFilterChange = react.exports.useCallback((index, filter) => {
    setFilters((filters2) => {
      const temp = [...filters2];
      temp[index] = filter;
      return temp;
    });
  }, []);
  const handleFilterRemove = react.exports.useCallback((index) => {
    setFilters((filters2) => {
      const temp = filters2.filter((_, i) => i !== index);
      return temp;
    });
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: "dialog-header-container",
      children: [/* @__PURE__ */ jsxs("p", {
        className: "title-text",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F516}"
        }), queryId ? t$1("EDIT QUERY") : t$1("CREATE QUERY")]
      }), /* @__PURE__ */ jsx("button", {
        className: "btn close-btn",
        onClick: destroy,
        children: /* @__PURE__ */ jsx(SvgClose, {
          className: "icon-img"
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-content-container",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "form-item-container input-form-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "normal-text",
          children: t$1("TITLE")
        }), /* @__PURE__ */ jsx("input", {
          className: "title-input",
          type: "text",
          value: title,
          onChange: handleTitleInputChange
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "form-item-container filter-form-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "normal-text",
          children: t$1("FILTER")
        }), /* @__PURE__ */ jsxs("div", {
          className: "filters-wrapper",
          children: [filters.map((f2, index) => {
            return /* @__PURE__ */ jsx(MemoFilterInputer, {
              index,
              filter: f2,
              handleFilterChange,
              handleFilterRemove
            }, index);
          }), /* @__PURE__ */ jsx("div", {
            className: "create-filter-btn",
            onClick: handleAddFilterBenClick,
            children: t$1("ADD FILTER TERMS")
          })]
        })]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "dialog-footer-container",
      children: [/* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsxs("div", {
        className: "btns-container",
        children: [/* @__PURE__ */ jsxs("span", {
          className: `tip-text ${filters.length === 0 && "hidden"}`,
          children: [t$1("MATCH"), " Memo ", /* @__PURE__ */ jsx("strong", {
            children: shownMemoLength
          }), " ", t$1("TIMES")]
        }), /* @__PURE__ */ jsx("button", {
          className: `btn save-btn ${requestState.isLoading ? "requesting" : ""}`,
          onClick: handleSaveBtnClick,
          children: "SAVE"
        })]
      })]
    })]
  });
};
const FilterInputer = (props) => {
  const {
    index,
    filter,
    handleFilterChange,
    handleFilterRemove
  } = props;
  const {
    type
  } = filter;
  const [inputElements, setInputElements] = react.exports.useState(/* @__PURE__ */ jsx(Fragment, {}));
  react.exports.useEffect(() => {
    let operatorElement = /* @__PURE__ */ jsx(Fragment, {});
    if (Object.keys(filterConsts).includes(type)) {
      operatorElement = /* @__PURE__ */ jsx(Selector$1, {
        className: "operator-selector",
        dataSource: Object.values(filterConsts[type].operators),
        value: filter.value.operator,
        handleValueChanged: handleOperatorChange
      });
    }
    let valueElement = /* @__PURE__ */ jsx(Fragment, {});
    switch (type) {
      case "TYPE": {
        valueElement = /* @__PURE__ */ jsx(Selector$1, {
          className: "value-selector",
          dataSource: filterConsts["TYPE"].values,
          value: filter.value.value,
          handleValueChanged: handleValueChange
        });
        break;
      }
      case "TAG": {
        valueElement = /* @__PURE__ */ jsx(Selector$1, {
          className: "value-selector",
          dataSource: memoService.getState().tags.sort().map((t2) => {
            return {
              text: t2,
              value: t2
            };
          }),
          value: filter.value.value,
          handleValueChanged: handleValueChange
        });
        break;
      }
      case "TEXT": {
        valueElement = /* @__PURE__ */ jsx("input", {
          type: "text",
          className: "value-inputer",
          value: filter.value.value,
          onChange: (event) => {
            handleValueChange(event.target.value);
            event.target.focus();
          }
        });
        break;
      }
      case "DATE": {
        valueElement = /* @__PURE__ */ jsx("input", {
          type: "text",
          className: "value-inputer",
          value: filter.value.value,
          onChange: (event) => {
            handleValueChange(event.target.value);
            event.target.focus();
          }
        });
        break;
      }
    }
    setInputElements(/* @__PURE__ */ jsxs(Fragment, {
      children: [operatorElement, valueElement]
    }));
  }, [type, filter]);
  const handleRelationChange = react.exports.useCallback((value) => {
    if (["AND", "OR"].includes(value)) {
      handleFilterChange(index, {
        ...filter,
        relation: value
      });
    }
  }, [filter]);
  const handleTypeChange = react.exports.useCallback((value) => {
    if (filter.type !== value) {
      const ops = Object.values(filterConsts[value].operators);
      handleFilterChange(index, {
        ...filter,
        type: value,
        value: {
          operator: ops[0].value,
          value: ""
        }
      });
    }
  }, [filter]);
  const handleOperatorChange = react.exports.useCallback((value) => {
    handleFilterChange(index, {
      ...filter,
      value: {
        ...filter.value,
        operator: value
      }
    });
  }, [filter]);
  const handleValueChange = react.exports.useCallback((value) => {
    handleFilterChange(index, {
      ...filter,
      value: {
        ...filter.value,
        value
      }
    });
  }, [filter]);
  const handleRemoveBtnClick = () => {
    handleFilterRemove(index);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "memo-filter-input-wrapper",
    children: [index > 0 ? /* @__PURE__ */ jsx(Selector$1, {
      className: "relation-selector",
      dataSource: relationConsts,
      value: filter.relation,
      handleValueChanged: handleRelationChange
    }) : null, /* @__PURE__ */ jsx(Selector$1, {
      className: "type-selector",
      dataSource: Object.values(filterConsts),
      value: filter.type,
      handleValueChanged: handleTypeChange
    }), inputElements, /* @__PURE__ */ jsx(SvgClose, {
      className: "remove-btn",
      onClick: handleRemoveBtnClick
    })]
  });
};
const MemoFilterInputer = react.exports.memo(FilterInputer);
function showCreateQueryDialog(queryId) {
  showDialog({
    className: "create-query-dialog"
  }, CreateQueryDialog, {
    queryId
  });
}
var queryList = "";
function SvgMoreWhite(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    fill: "#FFF",
    viewBox: "0 0 24 24",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    fill: "none",
    d: "M0 0h24v24H0V0z"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  }));
}
const QueryList = () => {
  const {
    queryState: {
      queries
    },
    locationState: {
      query: {
        filter
      }
    }
  } = react.exports.useContext(appContext);
  const loadingState = useLoading();
  const sortedQueries = queries.sort((a, b) => utils$1.getTimeStampByDate(b.createdAt) - utils$1.getTimeStampByDate(a.createdAt)).sort((a, b) => {
    var _a, _b;
    return utils$1.getTimeStampByDate((_a = b.pinnedAt) != null ? _a : 0) - utils$1.getTimeStampByDate((_b = a.pinnedAt) != null ? _b : 0);
  });
  react.exports.useEffect(() => {
    queryService.getMyAllQueries().catch(() => {
    }).finally(() => {
      loadingState.setFinish();
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "queries-wrapper",
    children: [/* @__PURE__ */ jsxs("p", {
      className: "title-text",
      children: [/* @__PURE__ */ jsx("span", {
        className: "normal-text",
        children: t$1("QUERY")
      }), /* @__PURE__ */ jsx("span", {
        className: "btn",
        onClick: () => showCreateQueryDialog(),
        children: "+"
      })]
    }), /* @__PURE__ */ jsx(Only, {
      when: loadingState.isSucceed && sortedQueries.length === 0,
      children: /* @__PURE__ */ jsx("div", {
        className: "create-query-btn-container",
        children: /* @__PURE__ */ jsx("span", {
          className: "btn",
          onClick: () => showCreateQueryDialog(),
          children: t$1("CREATE FILTER")
        })
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "queries-container",
      children: sortedQueries.map((q2) => {
        return /* @__PURE__ */ jsx(QueryItemContainer, {
          query: q2,
          isActive: q2.id === filter
        }, q2.id);
      })
    })]
  });
};
const QueryItemContainer = (props) => {
  const {
    query,
    isActive
  } = props;
  const [showActionBtns, toggleShowActionBtns] = useToggle(false);
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  const handleQueryClick = () => {
    if (isActive) {
      locationService.setMemoFilter("");
    } else {
      locationService.setMemoFilter(query.id);
    }
  };
  const handleShowActionBtnClick = (event) => {
    event.stopPropagation();
    toggleShowActionBtns();
  };
  const handleActionBtnContainerMouseLeave = () => {
    toggleShowActionBtns(false);
  };
  const handleDeleteMemoClick = async (event) => {
    event.stopPropagation();
    if (showConfirmDeleteBtn) {
      try {
        await queryService.deleteQuery(query.id);
      } catch (error) {
        new require$$0.Notice(error.message);
      }
    } else {
      toggleConfirmDeleteBtn();
    }
  };
  const handleEditQueryBtnClick = (event) => {
    event.stopPropagation();
    showCreateQueryDialog(query.id);
  };
  const handlePinQueryBtnClick = async (event) => {
    event.stopPropagation();
    try {
      if (query.pinnedAt) {
        await queryService.unpinQuery(query.id);
        queryService.editQuery({
          ...query,
          pinnedAt: ""
        });
      } else {
        await queryService.pinQuery(query.id);
        queryService.editQuery({
          ...query,
          pinnedAt: utils$1.getDateTimeString(Date.now())
        });
      }
    } catch (error) {
    }
  };
  const handleDeleteBtnMouseLeave = () => {
    toggleConfirmDeleteBtn(false);
  };
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: `query-item-container ${isActive ? "active" : ""}`,
      onClick: handleQueryClick,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "query-text-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "#"
        }), /* @__PURE__ */ jsx("span", {
          className: "query-text",
          children: query.title
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "btns-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "action-btn toggle-btn",
          onClick: handleShowActionBtnClick,
          children: isActive ? /* @__PURE__ */ jsx(SvgMoreWhite, {}) : /* @__PURE__ */ jsx(SvgMore, {})
        }), /* @__PURE__ */ jsx("div", {
          className: `action-btns-wrapper ${showActionBtns ? "" : "hidden"}`,
          onMouseLeave: handleActionBtnContainerMouseLeave,
          children: /* @__PURE__ */ jsxs("div", {
            className: "action-btns-container",
            children: [/* @__PURE__ */ jsx("span", {
              className: "btn",
              onClick: handlePinQueryBtnClick,
              children: query.pinnedAt ? t$1("UNPIN") : t$1("PIN")
            }), /* @__PURE__ */ jsx("span", {
              className: "btn",
              onClick: handleEditQueryBtnClick,
              children: t$1("EDIT")
            }), /* @__PURE__ */ jsx("span", {
              className: `btn delete-btn ${showConfirmDeleteBtn ? "final-confirm" : ""}`,
              onClick: handleDeleteMemoClick,
              onMouseLeave: handleDeleteBtnMouseLeave,
              children: showConfirmDeleteBtn ? t$1("CONFIRM\uFF01") : t$1("DELETE")
            })]
          })
        })]
      })]
    })
  });
};
var tagList = "";
const TagList = () => {
  const {
    locationState: {
      query: {
        tag: tagQuery
      }
    },
    memoState: {
      tags: tagsText,
      tagsNum: tagsCount,
      memos
    }
  } = react.exports.useContext(appContext);
  const [tags, setTags] = react.exports.useState([]);
  react.exports.useEffect(() => {
    memoService.updateTagsState();
  }, [memos]);
  react.exports.useEffect(() => {
    const sortedTags = Array.from(tagsText).sort();
    const root = {
      subTags: []
    };
    for (const tag of sortedTags) {
      const subtags = tag.split("/");
      let tempObj = root;
      let tagText = "";
      for (let i = 0; i < subtags.length; i++) {
        const key = subtags[i];
        if (i === 0) {
          tagText += key;
        } else {
          tagText += "/" + key;
        }
        let obj = null;
        for (const t2 of tempObj.subTags) {
          if (t2.text === tagText) {
            obj = t2;
            break;
          }
        }
        if (!obj) {
          obj = {
            key,
            text: tagText,
            count: tagsCount[tagText],
            subTags: []
          };
          tempObj.subTags.push(obj);
        }
        tempObj = obj;
      }
    }
    setTags(root.subTags);
  }, [tagsText]);
  return /* @__PURE__ */ jsxs("div", {
    className: "tags-wrapper",
    children: [/* @__PURE__ */ jsx("p", {
      className: "title-text",
      children: t$1("Frequently Used Tags")
    }), /* @__PURE__ */ jsxs("div", {
      className: "tags-container",
      children: [tags.map((t2, idx) => /* @__PURE__ */ jsx(TagItemContainer, {
        tag: t2,
        tagQuery
      }, t2.text + "-" + idx)), /* @__PURE__ */ jsx(Only, {
        when: tags.length < 5 && memoService.initialized,
        children: /* @__PURE__ */ jsxs("p", {
          className: "tag-tip-container",
          children: ["Input", /* @__PURE__ */ jsx("span", {
            className: "code-text",
            children: "#Tag "
          }), "to create tag..."]
        })
      })]
    })]
  });
};
const TagItemContainer = (props) => {
  const {
    tag,
    tagQuery
  } = props;
  const isActive = tagQuery === tag.text;
  const hasSubTags = tag.subTags.length > 0;
  const [showSubTags, toggleSubTags] = useToggle(false);
  const handleTagClick = () => {
    if (isActive) {
      locationService.setTagQuery("");
    } else {
      utils$1.copyTextToClipboard(`#${tag.text} `);
      if (!["/", "/recycle"].includes(locationService.getState().pathname)) {
        locationService.setPathname("/");
      }
      locationService.setTagQuery(tag.text);
    }
  };
  const handleToggleBtnClick = (event) => {
    event.stopPropagation();
    toggleSubTags();
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      className: `tag-item-container ${isActive ? "active" : ""}`,
      onClick: handleTagClick,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "tag-text-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "#"
        }), /* @__PURE__ */ jsx("span", {
          className: "tag-text",
          children: tag.key
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "btns-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "tag-count",
          children: tag.count
        }), hasSubTags ? /* @__PURE__ */ jsx("span", {
          className: `action-btn toggle-btn ${showSubTags ? "shown" : ""}`,
          onClick: handleToggleBtnClick,
          children: /* @__PURE__ */ jsx(SvgArrowRight, {
            className: "icon-img"
          })
        }) : null]
      })]
    }), hasSubTags ? /* @__PURE__ */ jsx("div", {
      className: `subtags-container ${showSubTags ? "" : "hidden"}`,
      children: tag.subTags.map((st, idx) => /* @__PURE__ */ jsx(TagItemContainer, {
        tag: st,
        tagQuery
      }, st.text + "-" + idx))
    }) : null]
  });
};
var usageHeatMap = "";
const tableConfig = {
  width: 12,
  height: 7
};
const getInitialUsageStat = (usedDaysAmount, beginDayTimestamp) => {
  const initialUsageStat = [];
  for (let i = 0; i <= usedDaysAmount; i++) {
    initialUsageStat.push({
      timestamp: parseInt(require$$0.moment(beginDayTimestamp).add(i, "days").format("x")),
      count: 0
    });
  }
  return initialUsageStat;
};
const UsageHeatMap = () => {
  const todayTimeStamp = parseInt(require$$0.moment().endOf("day").format("x"));
  const todayDay = new Date(todayTimeStamp).getDay() || 7;
  const nullCell = new Array(7 - todayDay).fill(0);
  const usedDaysAmount = (tableConfig.width - 1) * tableConfig.height + todayDay;
  const beginDayTimestamp = parseInt(require$$0.moment().startOf("day").subtract(usedDaysAmount, "days").format("x"));
  const startDate = require$$0.moment().startOf("day").subtract(usedDaysAmount, "days");
  const {
    memoState: {
      memos
    }
  } = react.exports.useContext(appContext);
  const newMemos = memos.filter((memo2) => memo2.linkId === "");
  const [allStat, setAllStat] = dist(getInitialUsageStat(usedDaysAmount, beginDayTimestamp));
  const [popupStat, setPopupStat] = dist(null);
  const [currentStat, setCurrentStat] = dist(null);
  const [fromTo, setFromTo, fromToRef] = dist("");
  const containerElRef = react.exports.useRef(null);
  const popupRef = react.exports.useRef(null);
  react.exports.useEffect(() => {
    const newStat = getInitialUsageStat(usedDaysAmount, beginDayTimestamp);
    for (const m2 of newMemos) {
      const creationDate = require$$0.moment(m2.createdAt.replaceAll("/", "-")).startOf("day");
      const index = creationDate.diff(startDate, "days");
      if (index >= 0 && index < newStat.length) {
        newStat[index].count += 1;
      }
    }
    setAllStat([...newStat]);
  }, [memos]);
  const handleUsageStatItemMouseEnter = react.exports.useCallback((event, item) => {
    var _a, _b;
    setPopupStat(item);
    if (!popupRef.current) {
      return;
    }
    const {
      isMobileView
    } = globalStateService.getState();
    const targetEl = event.target;
    const sidebarEl = document.querySelector(".memos-sidebar-wrapper");
    popupRef.current.style.left = targetEl.offsetLeft - ((_b = (_a = containerElRef.current) == null ? void 0 : _a.offsetLeft) != null ? _b : 0) + "px";
    let topValue = targetEl.offsetTop;
    if (!isMobileView) {
      topValue -= sidebarEl.scrollTop;
    }
    popupRef.current.style.top = topValue + "px";
  }, []);
  const handleUsageStatItemMouseLeave = react.exports.useCallback(() => {
    setPopupStat(null);
  }, []);
  const handleUsageStatItemClick = react.exports.useCallback((event, item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (((_a = locationService.getState().query.duration) == null ? void 0 : _a.from) === item.timestamp && require$$0.moment((_b = locationService.getState().query.duration) == null ? void 0 : _b.from).diff((_c = locationService.getState().query.duration) == null ? void 0 : _c.to, "day") == 0) {
      locationService.setFromAndToQuery(0, 0);
      setCurrentStat(null);
      setFromTo(null);
    } else if (((_d = locationService.getState().query.duration) == null ? void 0 : _d.from) !== item.timestamp && ((_e = locationService.getState().query.duration) == null ? void 0 : _e.from) > 0 && event.shiftKey) {
      const timeStampDays = require$$0.moment(item.timestamp).endOf("day").diff((_f = locationService.getState().query.duration) == null ? void 0 : _f.to, "day");
      if (timeStampDays > 0 && require$$0.moment((_g = locationService.getState().query.duration) == null ? void 0 : _g.from).diff((_h = locationService.getState().query.duration) == null ? void 0 : _h.to, "day") == 0) {
        setFromTo("from");
      } else if (timeStampDays < 0 && require$$0.moment((_i = locationService.getState().query.duration) == null ? void 0 : _i.from).diff((_j = locationService.getState().query.duration) == null ? void 0 : _j.to, "day") == 0) {
        setFromTo("to");
      }
      if (require$$0.moment((_k = locationService.getState().query.duration) == null ? void 0 : _k.from).isBefore(item.timestamp)) {
        if (fromToRef.current === "to") {
          if (timeStampDays < 0) {
            locationService.setFromAndToQuery(item.timestamp, (_l = locationService.getState().query.duration) == null ? void 0 : _l.to);
          } else {
            locationService.setFromAndToQuery(parseInt(require$$0.moment((_m = locationService.getState().query.duration) == null ? void 0 : _m.to).startOf("day").format("x")), parseInt(require$$0.moment(item.timestamp).endOf("day").format("x")));
            setFromTo("from");
          }
        } else if (fromToRef.current === "from") {
          if (timeStampDays < 0) {
            locationService.setFromAndToQuery((_n = locationService.getState().query.duration) == null ? void 0 : _n.from, parseInt(require$$0.moment(item.timestamp).endOf("day").format("x")));
          } else {
            locationService.setFromAndToQuery((_o = locationService.getState().query.duration) == null ? void 0 : _o.from, parseInt(require$$0.moment(item.timestamp).endOf("day").format("x")));
          }
        }
      } else {
        if (fromToRef.current === "to") {
          locationService.setFromAndToQuery(item.timestamp, (_p = locationService.getState().query.duration) == null ? void 0 : _p.to);
        } else if (fromToRef.current === "from") {
          locationService.setFromAndToQuery(item.timestamp, parseInt(require$$0.moment((_q = locationService.getState().query.duration) == null ? void 0 : _q.from).endOf("day").format("x")));
          setFromTo("to");
        }
      }
    } else if (((_r = locationService.getState().query.duration) == null ? void 0 : _r.from) === 0 && event.shiftKey) {
      locationService.setFromAndToQuery(item.timestamp, parseInt(require$$0.moment().endOf("day").format("x")));
    } else if (item.count > 0 && (event.ctrlKey || event.metaKey)) {
      const {
        app: app2,
        dailyNotes
      } = dailyNotesService.getState();
      const file = getDailyNote_1(require$$0.moment(item.timestamp), dailyNotes);
      if (!require$$0.Platform.isMobile) {
        const leaf = app2.workspace.splitActiveLeaf();
        leaf.openFile(file);
      } else {
        let leaf = app2.workspace.activeLeaf;
        if (leaf === null) {
          leaf = app2.workspace.getLeaf(true);
        }
        leaf.openFile(file);
      }
    } else if (item.count > 0 && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
      if (!["/", "/recycle"].includes(locationService.getState().pathname)) {
        locationService.setPathname("/");
      }
      locationService.setFromAndToQuery(item.timestamp, utils$1.getTimeStampByDate(require$$0.moment(item.timestamp + DAILY_TIMESTAMP).subtract(1, "days").endOf("day").format("YYYY-MM-DD HH:mm:ss")));
      setCurrentStat(item);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "usage-heat-map-wrapper",
    ref: containerElRef,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "day-tip-text-container",
      children: [/* @__PURE__ */ jsx("span", {
        className: "tip-text",
        children: t$1("weekDaysShort")[0]
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text"
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text",
        children: t$1("weekDaysShort")[2]
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text"
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text",
        children: t$1("weekDaysShort")[4]
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text"
      }), /* @__PURE__ */ jsx("span", {
        className: "tip-text",
        children: t$1("weekDaysShort")[6]
      })]
    }), /* @__PURE__ */ jsxs("div", {
      ref: popupRef,
      className: "usage-detail-container pop-up " + (popupStat ? "" : "hidden"),
      children: [popupStat == null ? void 0 : popupStat.count, " memos on", " ", /* @__PURE__ */ jsx("span", {
        className: "date-text",
        children: new Date(popupStat == null ? void 0 : popupStat.timestamp).toDateString()
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "usage-heat-map",
      children: [allStat.map((v2, i) => {
        const count = v2.count;
        const colorLevel = count <= 0 ? "" : count <= 1 ? "stat-day-L1-bg" : count <= 2 ? "stat-day-L2-bg" : count <= 4 ? "stat-day-L3-bg" : "stat-day-L4-bg";
        return /* @__PURE__ */ jsx("span", {
          className: `stat-container ${colorLevel} ${currentStat === v2 ? "current" : ""} ${todayTimeStamp === v2.timestamp ? "today" : ""}`,
          onMouseEnter: (e) => handleUsageStatItemMouseEnter(e, v2),
          onMouseLeave: handleUsageStatItemMouseLeave,
          onClick: (e) => handleUsageStatItemClick(e, v2)
        }, i);
      }), nullCell.map((v2, i) => /* @__PURE__ */ jsx("span", {
        className: "stat-container null"
      }, i))]
    })]
  });
};
var siderbar = "";
const Sidebar = () => {
  const {
    locationState,
    globalState: {
      isMobileView,
      showSiderbarInMobileView
    }
  } = react.exports.useContext(appContext);
  const wrapperElRef = react.exports.useRef(null);
  const handleClickOutsideOfWrapper = react.exports.useMemo(() => {
    return (event) => {
      var _a, _b, _c;
      const siderbarShown = globalStateService.getState().showSiderbarInMobileView;
      if (!siderbarShown) {
        window.removeEventListener("click", handleClickOutsideOfWrapper, {
          capture: true
        });
        return;
      }
      if (!((_a = wrapperElRef.current) == null ? void 0 : _a.contains(event.target))) {
        if ((_c = (_b = wrapperElRef.current) == null ? void 0 : _b.parentNode) == null ? void 0 : _c.contains(event.target)) {
          if (siderbarShown) {
            event.stopPropagation();
          }
          globalStateService.setShowSiderbarInMobileView(false);
          window.removeEventListener("click", handleClickOutsideOfWrapper, {
            capture: true
          });
        }
      }
    };
  }, []);
  react.exports.useEffect(() => {
    globalStateService.setShowSiderbarInMobileView(false);
  }, [locationState]);
  react.exports.useEffect(() => {
    if (showSiderbarInMobileView) {
      document.body.classList.add(SHOW_SIDERBAR_MOBILE_CLASSNAME);
    } else {
      document.body.classList.remove(SHOW_SIDERBAR_MOBILE_CLASSNAME);
    }
  }, [showSiderbarInMobileView]);
  react.exports.useEffect(() => {
    if (isMobileView && showSiderbarInMobileView) {
      window.addEventListener("click", handleClickOutsideOfWrapper, {
        capture: true
      });
    }
  }, [isMobileView, showSiderbarInMobileView]);
  return /* @__PURE__ */ jsxs("aside", {
    className: "memos-sidebar-wrapper",
    ref: wrapperElRef,
    children: [/* @__PURE__ */ jsx(UserBanner, {}), /* @__PURE__ */ jsx(UsageHeatMap, {}), /* @__PURE__ */ jsx(QueryList, {}), /* @__PURE__ */ jsx(TagList, {})]
  });
};
var home = "";
function Home() {
  const {
    locationState: {
      pathname
    }
  } = react.exports.useContext(appContext);
  const loadingState = useLoading();
  react.exports.useEffect(() => {
    loadingState.setFinish();
  }, []);
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("section", {
      id: "page-wrapper",
      children: [/* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
        className: "content-wrapper",
        children: homeRouterSwitch(pathname)
      })]
    })
  });
}
const appRouter = {
  "*": /* @__PURE__ */ jsx(Home, {})
};
const getInitialAction = () => {
  return {
    type: "initialText",
    value: "",
    timestamp: Date.now(),
    selectionStart: 0,
    selectionEnd: 0
  };
};
const defaultConfig = {
  initialValue: "",
  interval: 300
};
class TinyUndo {
  constructor(element, config = defaultConfig) {
    this.listeners = [];
    this.runUndo = () => {
      const cursorPosition = this.actions[this.currentIndex].selectionStart;
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.element.value = this.actions[this.currentIndex].value;
      this.element.setSelectionRange(cursorPosition, cursorPosition);
      this.dispatchChange();
    };
    this.runRedo = () => {
      if (this.currentIndex < this.actions.length - 1) {
        this.currentIndex++;
      }
      const cursorPosition = this.actions[this.currentIndex].selectionEnd;
      this.element.value = this.actions[this.currentIndex].value;
      this.element.setSelectionRange(cursorPosition, cursorPosition);
      this.dispatchChange();
    };
    this.getActions = () => {
      return this.actions;
    };
    this.setState = (actions, index) => {
      this.actions = [...actions];
      this.currentIndex = index < this.actions.length ? index : this.actions.length - 1;
      this.dispatchChange();
    };
    this.resetState = () => {
      this.actions = [getInitialAction()];
      this.currentIndex = 0;
      this.dispatchChange();
    };
    this.destroy = () => {
      this.rmEventListeners();
    };
    this.subscribe = (callback) => {
      this.listeners.push(callback);
    };
    this.handleElementKeydown = (event) => {
      const keyboardEvent = event;
      if (keyboardEvent.key === "z" && !keyboardEvent.shiftKey && (keyboardEvent.metaKey || keyboardEvent.ctrlKey)) {
        event.preventDefault();
        this.runUndo();
      } else if (keyboardEvent.key === "z" && keyboardEvent.shiftKey && (keyboardEvent.metaKey || keyboardEvent.ctrlKey) || keyboardEvent.key === "y" && (keyboardEvent.metaKey || keyboardEvent.ctrlKey)) {
        event.preventDefault();
        this.runRedo();
      }
    };
    this.handleElementInput = (event) => {
      const inputEvent = event;
      const lastAction = this.actions[this.currentIndex];
      this.pushNewAction({
        type: inputEvent.inputType,
        value: this.element.value,
        timestamp: Date.now(),
        selectionStart: this.element.selectionEnd - (this.element.value.length - lastAction.value.length),
        selectionEnd: this.element.selectionEnd
      });
    };
    this.addEventListeners = () => {
      this.element.addEventListener("keydown", this.handleElementKeydown);
      this.element.addEventListener("input", this.handleElementInput);
    };
    this.rmEventListeners = () => {
      this.element.removeEventListener("keydown", this.handleElementKeydown);
      this.element.removeEventListener("input", this.handleElementInput);
    };
    this.pushNewAction = (action) => {
      const lastAction = this.actions[this.currentIndex];
      if (lastAction && lastAction.type === action.type && action.timestamp - lastAction.timestamp < this.config.interval) {
        this.actions[this.currentIndex] = Object.assign(Object.assign({}, lastAction), { value: action.value, selectionEnd: action.selectionEnd, timestamp: action.timestamp });
      } else {
        if (this.config.maxSize && this.currentIndex >= this.config.maxSize) {
          this.actions.shift();
          this.actions[0] = getInitialAction();
        } else {
          this.currentIndex++;
        }
        this.actions[this.currentIndex] = action;
        this.actions = this.actions.slice(0, this.currentIndex + 1);
      }
      this.dispatchChange();
    };
    this.dispatchChange = () => {
      for (const cb2 of this.listeners) {
        cb2([...this.actions], this.currentIndex);
      }
    };
    this.element = element;
    this.config = Object.assign(Object.assign({}, defaultConfig), config);
    if (this.config.initialActions && this.config.initialActions.length > 0) {
      this.actions = this.config.initialActions;
      if (this.config.initialIndex !== void 0 && this.config.initialIndex < this.actions.length) {
        this.currentIndex = this.config.initialIndex;
      } else {
        this.currentIndex = this.actions.length - 1;
      }
    } else {
      this.actions = [getInitialAction()];
      this.currentIndex = 0;
      if (this.config.initialValue !== "") {
        this.actions.push({
          type: "insertText",
          value: this.config.initialValue,
          timestamp: Date.now(),
          selectionStart: 0,
          selectionEnd: this.config.initialValue.length
        });
        this.currentIndex++;
      }
    }
    this.element.value = this.actions[this.currentIndex].value;
    this.addEventListeners();
  }
}
function useRefresh() {
  const [, setBoolean] = react.exports.useState(false);
  const refresh = react.exports.useCallback(() => {
    setBoolean((ps) => {
      return !ps;
    });
  }, []);
  return refresh;
}
var editor = "";
var textareaCaret = { exports: {} };
(function(module2) {
  (function() {
    var properties = [
      "direction",
      "boxSizing",
      "width",
      "height",
      "overflowX",
      "overflowY",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderStyle",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "fontStyle",
      "fontVariant",
      "fontWeight",
      "fontStretch",
      "fontSize",
      "fontSizeAdjust",
      "lineHeight",
      "fontFamily",
      "textAlign",
      "textTransform",
      "textIndent",
      "textDecoration",
      "letterSpacing",
      "wordSpacing",
      "tabSize",
      "MozTabSize"
    ];
    var isBrowser = typeof window !== "undefined";
    var isFirefox = isBrowser && window.mozInnerScreenX != null;
    function getCaretCoordinates2(element, position, options) {
      if (!isBrowser) {
        throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");
      }
      var debug = options && options.debug || false;
      if (debug) {
        var el = document.querySelector("#input-textarea-caret-position-mirror-div");
        if (el) {
          el.parentNode.removeChild(el);
        }
      }
      var div = document.createElement("div");
      div.id = "input-textarea-caret-position-mirror-div";
      document.body.appendChild(div);
      var style = div.style;
      var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
      style.whiteSpace = "pre-wrap";
      if (element.nodeName !== "INPUT")
        style.wordWrap = "break-word";
      style.position = "absolute";
      if (!debug)
        style.visibility = "hidden";
      properties.forEach(function(prop) {
        style[prop] = computed[prop];
      });
      if (isFirefox) {
        if (element.scrollHeight > parseInt(computed.height))
          style.overflowY = "scroll";
      } else {
        style.overflow = "hidden";
      }
      div.textContent = element.value.substring(0, position);
      if (element.nodeName === "INPUT")
        div.textContent = div.textContent.replace(/\s/g, "\xA0");
      var span = document.createElement("span");
      span.textContent = element.value.substring(position) || ".";
      div.appendChild(span);
      var coordinates = {
        top: span.offsetTop + parseInt(computed["borderTopWidth"]),
        left: span.offsetLeft + parseInt(computed["borderLeftWidth"])
      };
      if (debug) {
        span.style.backgroundColor = "#aaa";
      } else {
        document.body.removeChild(div);
      }
      return coordinates;
    }
    {
      module2.exports = getCaretCoordinates2;
    }
  })();
})(textareaCaret);
var getCaretCoordinates = textareaCaret.exports;
var NativeCustomEvent = commonjsGlobal.CustomEvent;
function useNative() {
  try {
    var p2 = new NativeCustomEvent("cat", { detail: { foo: "bar" } });
    return "cat" === p2.type && "bar" === p2.detail.foo;
  } catch (e) {
  }
  return false;
}
var customEvent = useNative() ? NativeCustomEvent : "undefined" !== typeof document && "function" === typeof document.createEvent ? function CustomEvent(type, params) {
  var e = document.createEvent("CustomEvent");
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} : function CustomEvent2(type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
};
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof22(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof2 = function _typeof22(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof2(obj);
}
function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof3(obj2) {
      return _typeof2(obj2);
    };
  } else {
    _typeof = function _typeof3(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : _typeof2(obj2);
    };
  }
  return _typeof(obj);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var KEY_CODES = {
  ESC: 27,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  TAB: 9
};
var Listener = function Listener2() {
  var _this = this;
  _classCallCheck(this, Listener2);
  this.startListen = function(ref) {
    if (!ref)
      return;
    ref.addEventListener("keydown", _this.f);
  };
  this.stopListen = function(ref) {
    if (!ref)
      return;
    ref.removeEventListener("keydown", _this.f);
  };
  this.add = function(keyCodes, fn2) {
    var keyCode = keyCodes;
    if (typeof keyCode !== "object")
      keyCode = [keyCode];
    _this.listeners[_this.index] = {
      keyCode,
      fn: fn2
    };
    return _this.index++;
  };
  this.remove = function(id2) {
    delete _this.listeners[id2];
  };
  this.removeAll = function() {
    _this.listeners = {};
    _this.index = 1;
  };
  this.index = 1;
  this.listeners = {};
  this.f = function(e) {
    if (!e)
      return;
    var code = e.keyCode || e.which;
    Object.values(_this.listeners).forEach(function(_ref) {
      var keyCode = _ref.keyCode, fn2 = _ref.fn;
      if (keyCode.includes(code)) {
        e.stopPropagation();
        e.preventDefault();
        fn2(e);
      }
    });
  };
};
var Listeners = new Listener();
var Item = /* @__PURE__ */ function(_React$Component) {
  _inherits(Item2, _React$Component);
  function Item2() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, Item2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Item2)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.selectItem = function() {
      var _this$props = _this.props, item = _this$props.item, onSelectHandler = _this$props.onSelectHandler;
      onSelectHandler(item);
    };
    return _this;
  }
  _createClass(Item2, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.item !== nextProps.item || this.props.selected !== nextProps.selected || this.props.style !== nextProps.style || this.props.className !== nextProps.className) {
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props, Component = _this$props2.component, style = _this$props2.style, onClickHandler = _this$props2.onClickHandler, item = _this$props2.item, selected = _this$props2.selected, className = _this$props2.className, innerRef = _this$props2.innerRef;
      return React.createElement("li", {
        className: "rta__item  ".concat(selected === true ? "rta__item--selected" : "", " ").concat(className || ""),
        style
      }, React.createElement("div", {
        className: "rta__entity ".concat(selected === true ? "rta__entity--selected" : ""),
        role: "button",
        tabIndex: 0,
        onClick: onClickHandler,
        onFocus: this.selectItem,
        onMouseEnter: this.selectItem,
        onTouchStart: function onTouchStart() {
          _this2.clicked = true;
          _this2.selectItem();
        },
        onTouchEnd: function onTouchEnd(e) {
          e.preventDefault();
          if (_this2.clicked) {
            onClickHandler(e);
          }
        },
        onTouchMove: function onTouchMove() {
          _this2.clicked = false;
        },
        onTouchCancel: function onTouchCancel() {
          _this2.clicked = false;
        },
        ref: innerRef
      }, React.createElement(Component, {
        selected,
        entity: item
      })));
    }
  }]);
  return Item2;
}(React.Component);
var List = /* @__PURE__ */ function(_React$Component) {
  _inherits(List2, _React$Component);
  function List2() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, List2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(List2)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      selectedItem: null
    };
    _this.cachedIdOfItems = /* @__PURE__ */ new Map();
    _this.onPressEnter = function(e) {
      if (typeof e !== "undefined") {
        e.preventDefault();
      }
      var values = _this.props.values;
      _this.modifyText(values[_this.getPositionInList()]);
    };
    _this.getPositionInList = function() {
      var values = _this.props.values;
      var selectedItem = _this.state.selectedItem;
      if (!selectedItem)
        return 0;
      return values.findIndex(function(a) {
        return _this.getId(a) === _this.getId(selectedItem);
      });
    };
    _this.getId = function(item) {
      if (_this.cachedIdOfItems.has(item)) {
        return _this.cachedIdOfItems.get(item);
      }
      var textToReplace = _this.props.getTextToReplace(item);
      var computeId = function computeId2() {
        if (textToReplace) {
          if (textToReplace.key) {
            return textToReplace.key;
          }
          if (typeof item === "string" || !item.key) {
            return textToReplace.text;
          }
        }
        if (!item.key) {
          throw new Error("Item ".concat(JSON.stringify(item), ' has to have defined "key" property'));
        }
        return item.key;
      };
      var id2 = computeId();
      _this.cachedIdOfItems.set(item, id2);
      return id2;
    };
    _this.listeners = [];
    _this.itemsRef = {};
    _this.modifyText = function(value) {
      if (!value)
        return;
      var onSelect = _this.props.onSelect;
      onSelect(value);
    };
    _this.selectItem = function(item) {
      var keyboard = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var onItemHighlighted = _this.props.onItemHighlighted;
      if (_this.state.selectedItem === item)
        return;
      _this.setState({
        selectedItem: item
      }, function() {
        onItemHighlighted(item);
        if (keyboard) {
          _this.props.dropdownScroll(_this.itemsRef[_this.getId(item)]);
        }
      });
    };
    _this.scroll = function(e) {
      e.preventDefault();
      var values = _this.props.values;
      var code = e.keyCode || e.which;
      var oldPosition = _this.getPositionInList();
      var newPosition;
      switch (code) {
        case KEY_CODES.DOWN:
          newPosition = oldPosition + 1;
          break;
        case KEY_CODES.UP:
          newPosition = oldPosition - 1;
          break;
        default:
          newPosition = oldPosition;
          break;
      }
      newPosition = (newPosition % values.length + values.length) % values.length;
      _this.selectItem(values[newPosition], [KEY_CODES.DOWN, KEY_CODES.UP].includes(code));
    };
    _this.isSelected = function(item) {
      var selectedItem = _this.state.selectedItem;
      if (!selectedItem)
        return false;
      return _this.getId(selectedItem) === _this.getId(item);
    };
    return _this;
  }
  _createClass(List2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listeners.push(Listeners.add([KEY_CODES.DOWN, KEY_CODES.UP], this.scroll), Listeners.add([KEY_CODES.ENTER, KEY_CODES.TAB], this.onPressEnter));
      var values = this.props.values;
      if (values && values[0])
        this.selectItem(values[0]);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var _this2 = this;
      var oldValues = _ref.values;
      var values = this.props.values;
      var oldValuesSerialized = oldValues.map(function(val) {
        return _this2.getId(val);
      }).join("");
      var newValuesSerialized = values.map(function(val) {
        return _this2.getId(val);
      }).join("");
      if (oldValuesSerialized !== newValuesSerialized && values && values[0]) {
        this.selectItem(values[0]);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var listener;
      while (this.listeners.length) {
        listener = this.listeners.pop();
        Listeners.remove(listener);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props, values = _this$props.values, component = _this$props.component, style = _this$props.style, itemClassName = _this$props.itemClassName, className = _this$props.className, itemStyle = _this$props.itemStyle;
      return React.createElement("ul", {
        className: "rta__list ".concat(className || ""),
        style
      }, values.map(function(item) {
        return React.createElement(Item, {
          key: _this3.getId(item),
          innerRef: function innerRef(ref) {
            _this3.itemsRef[_this3.getId(item)] = ref;
          },
          selected: _this3.isSelected(item),
          item,
          className: itemClassName,
          style: itemStyle,
          onClickHandler: _this3.onPressEnter,
          onSelectHandler: _this3.selectItem,
          component
        });
      }));
    }
  }]);
  return List2;
}(React.Component);
function defaultScrollToItem(container, item) {
  var itemHeight = parseInt(getComputedStyle(item).getPropertyValue("height"), 10);
  var containerHight = parseInt(getComputedStyle(container).getPropertyValue("height"), 10) - itemHeight;
  var itemOffsetTop = item.offsetTop;
  var actualScrollTop = container.scrollTop;
  if (itemOffsetTop < actualScrollTop + containerHight && actualScrollTop < itemOffsetTop) {
    return;
  }
  container.scrollTop = itemOffsetTop;
}
var DEFAULT_CARET_POSITION = "next";
var POSITION_CONFIGURATION = {
  X: {
    LEFT: "rta__autocomplete--left",
    RIGHT: "rta__autocomplete--right"
  },
  Y: {
    TOP: "rta__autocomplete--top",
    BOTTOM: "rta__autocomplete--bottom"
  }
};
var errorMessage = function errorMessage2(message) {
  return console.error("RTA: dataProvider fails: ".concat(message, "\n    \nCheck the documentation or create issue if you think it's bug. https://github.com/webscopeio/react-textarea-autocomplete/issues"));
};
var reservedRegexChars = [".", "^", "$", "*", "+", "-", "?", "(", ")", "[", "]", "{", "}", "\\", "|"];
var escapeRegex = function escapeRegex2(text) {
  return _toConsumableArray(text).map(function(character) {
    return reservedRegexChars.includes(character) ? "\\".concat(character) : character;
  }).join("");
};
var Autocomplete = /* @__PURE__ */ function(_React$Component) {
  _inherits(Autocomplete2, _React$Component);
  function Autocomplete2() {
    _classCallCheck(this, Autocomplete2);
    return _possibleConstructorReturn(this, _getPrototypeOf(Autocomplete2).apply(this, arguments));
  }
  _createClass(Autocomplete2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var boundariesElement = this.props.boundariesElement;
      if (typeof boundariesElement === "string") {
        var elem = document.querySelector(boundariesElement);
        if (!elem) {
          throw new Error("RTA: Invalid prop boundariesElement: it has to be string or HTMLElement.");
        }
        this.containerElem = elem;
      } else if (boundariesElement instanceof HTMLElement) {
        this.containerElem = boundariesElement;
      } else {
        throw new Error("RTA: Invalid prop boundariesElement: it has to be string or HTMLElement.");
      }
      if (!this.containerElem || !this.containerElem.contains(this.ref)) {
        {
          throw new Error("RTA: Invalid prop boundariesElement: it has to be one of the parents of the RTA.");
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$ref$classList, _this$ref$classList2;
      var top2 = this.props.top || 0;
      var left2 = this.props.left || 0;
      var usedClasses = [];
      var unusedClasses = [];
      var topPosition = 0;
      var leftPosition = 0;
      var containerBounds = this.containerElem.getBoundingClientRect();
      var dropdownBounds = this.ref.getBoundingClientRect();
      var textareaBounds = this.props.textareaRef.getBoundingClientRect();
      var computedStyle = window.getComputedStyle(this.ref);
      var marginTop = parseInt(computedStyle.getPropertyValue("margin-top"), 10);
      var marginBottom = parseInt(computedStyle.getPropertyValue("margin-bottom"), 10);
      var marginLeft = parseInt(computedStyle.getPropertyValue("margin-left"), 10);
      var marginRight = parseInt(computedStyle.getPropertyValue("margin-right"), 10);
      var dropdownBottom = marginTop + marginBottom + textareaBounds.top + top2 + dropdownBounds.height;
      var dropdownRight = marginLeft + marginRight + textareaBounds.left + left2 + dropdownBounds.width;
      if (dropdownRight > containerBounds.right && textareaBounds.left + left2 > dropdownBounds.width) {
        leftPosition = left2 - dropdownBounds.width;
        usedClasses.push(POSITION_CONFIGURATION.X.LEFT);
        unusedClasses.push(POSITION_CONFIGURATION.X.RIGHT);
      } else {
        leftPosition = left2;
        usedClasses.push(POSITION_CONFIGURATION.X.RIGHT);
        unusedClasses.push(POSITION_CONFIGURATION.X.LEFT);
      }
      if (dropdownBottom > containerBounds.bottom && textareaBounds.top + top2 > dropdownBounds.height) {
        topPosition = top2 - dropdownBounds.height;
        usedClasses.push(POSITION_CONFIGURATION.Y.TOP);
        unusedClasses.push(POSITION_CONFIGURATION.Y.BOTTOM);
      } else {
        topPosition = top2;
        usedClasses.push(POSITION_CONFIGURATION.Y.BOTTOM);
        unusedClasses.push(POSITION_CONFIGURATION.Y.TOP);
      }
      if (this.props.renderToBody) {
        topPosition += textareaBounds.top;
        leftPosition += textareaBounds.left;
      }
      this.ref.style.top = "".concat(topPosition, "px");
      this.ref.style.left = "".concat(leftPosition, "px");
      (_this$ref$classList = this.ref.classList).remove.apply(_this$ref$classList, unusedClasses);
      (_this$ref$classList2 = this.ref.classList).add.apply(_this$ref$classList2, usedClasses);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props, style = _this$props.style, className = _this$props.className, innerRef = _this$props.innerRef, children = _this$props.children, renderToBody = _this$props.renderToBody;
      var body = document.body;
      var autocompleteContainer = React.createElement("div", {
        ref: function ref(_ref) {
          _this.ref = _ref;
          innerRef(_ref);
        },
        className: "rta__autocomplete ".concat(className || ""),
        style
      }, children);
      return renderToBody && body !== null ? ReactDOM.createPortal(autocompleteContainer, body) : autocompleteContainer;
    }
  }]);
  return Autocomplete2;
}(React.Component);
var ReactTextareaAutocomplete = /* @__PURE__ */ function(_React$Component2) {
  _inherits(ReactTextareaAutocomplete2, _React$Component2);
  function ReactTextareaAutocomplete2(_props) {
    var _this2;
    _classCallCheck(this, ReactTextareaAutocomplete2);
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ReactTextareaAutocomplete2).call(this, _props));
    _this2.state = {
      top: null,
      left: null,
      currentTrigger: null,
      actualToken: "",
      data: null,
      value: "",
      dataLoading: false,
      selectionEnd: 0,
      component: null,
      textToReplace: null
    };
    _this2.escListenerInit = function() {
      if (!_this2.escListener) {
        _this2.escListener = Listeners.add(KEY_CODES.ESC, _this2._closeAutocomplete);
      }
    };
    _this2.escListenerDestroy = function() {
      if (_this2.escListener) {
        Listeners.remove(_this2.escListener);
        _this2.escListener = null;
      }
    };
    _this2.getSelectionPosition = function() {
      if (!_this2.textareaRef)
        return null;
      return {
        selectionStart: _this2.textareaRef.selectionStart,
        selectionEnd: _this2.textareaRef.selectionEnd
      };
    };
    _this2.getSelectedText = function() {
      if (!_this2.textareaRef)
        return null;
      var _this2$textareaRef = _this2.textareaRef, selectionStart = _this2$textareaRef.selectionStart, selectionEnd = _this2$textareaRef.selectionEnd;
      if (selectionStart === selectionEnd)
        return null;
      return _this2.state.value.substr(selectionStart, selectionEnd - selectionStart);
    };
    _this2.setCaretPosition = function() {
      var position = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      if (!_this2.textareaRef)
        return;
      _this2.textareaRef.focus();
      _this2.textareaRef.setSelectionRange(position, position);
    };
    _this2.getCaretPosition = function() {
      if (!_this2.textareaRef) {
        return 0;
      }
      var position = _this2.textareaRef.selectionEnd;
      return position;
    };
    _this2._handleCaretChange = function(e) {
      var cleanLastTrigger = function cleanLastTrigger2() {
        var beforeHandle = _this2.getCaretPosition() - 1;
        _this2.lastTrigger = _this2.lastTrigger ? beforeHandle : 0;
      };
      if (e.type === "keydown") {
        var code = e.keyCode || e.which;
        switch (code) {
          case KEY_CODES.UP:
          case KEY_CODES.DOWN:
            if (!_this2._isAutocompleteOpen()) {
              cleanLastTrigger();
            }
            break;
          case KEY_CODES.LEFT:
          case KEY_CODES.RIGHT:
            cleanLastTrigger();
            break;
        }
        return;
      }
      cleanLastTrigger();
    };
    _this2._onSelect = function(item) {
      var _this2$state = _this2.state, selectionEnd = _this2$state.selectionEnd, currentTrigger = _this2$state.currentTrigger, textareaValue = _this2$state.value;
      var onItemSelected = _this2.props.onItemSelected;
      if (!currentTrigger)
        return;
      var getTextToReplaceForCurrentTrigger = _this2._getTextToReplace(currentTrigger);
      if (!getTextToReplaceForCurrentTrigger) {
        _this2._closeAutocomplete();
        return;
      }
      var newToken = getTextToReplaceForCurrentTrigger(item);
      if (!newToken) {
        _this2._closeAutocomplete();
        return;
      }
      if (onItemSelected) {
        onItemSelected({
          currentTrigger,
          item
        });
      }
      var computeCaretPosition = function computeCaretPosition2(position, token, startToken) {
        switch (position) {
          case "start":
            return startToken;
          case "next":
          case "end":
            return startToken + token.length;
          default:
            if (!Number.isInteger(position)) {
              throw new Error('RTA: caretPosition should be "start", "next", "end" or number.');
            }
            return position;
        }
      };
      var textToModify = textareaValue.slice(0, selectionEnd);
      var escapedCurrentTrigger = escapeRegex(currentTrigger);
      var triggerOffset = textToModify.length - textToModify.lastIndexOf(currentTrigger);
      var startOfTokenPosition = textToModify.search(new RegExp("(?!".concat(escapedCurrentTrigger, ")$"))) - triggerOffset;
      var newTokenString = newToken.caretPosition === "next" ? "".concat(newToken.text, " ") : newToken.text;
      var newCaretPosition = computeCaretPosition(newToken.caretPosition, newTokenString, startOfTokenPosition);
      var modifiedText = textToModify.substring(0, startOfTokenPosition) + newTokenString;
      var newValue = textareaValue.replace(textToModify, modifiedText);
      _this2.setState({
        value: newValue,
        dataLoading: false
      }, function() {
        var insertedTrigger = _this2.tokenRegExpEnding.exec(newTokenString);
        var insertedTriggerModifier = insertedTrigger ? insertedTrigger[0].length : 1;
        _this2.lastTrigger = newCaretPosition ? newCaretPosition - insertedTriggerModifier : newCaretPosition;
        _this2.textareaRef.value = newValue;
        _this2.textareaRef.selectionEnd = newCaretPosition;
        _this2._changeHandler();
        var scrollTop = _this2.textareaRef.scrollTop;
        _this2.setCaretPosition(newCaretPosition);
        if (window.chrome) {
          _this2.textareaRef.scrollTop = scrollTop;
        }
      });
    };
    _this2._getTextToReplace = function(currentTrigger) {
      var triggerSettings = _this2.props.trigger[currentTrigger];
      if (!currentTrigger || !triggerSettings)
        return null;
      var output = triggerSettings.output;
      return function(item) {
        if (typeof item === "object" && (!output || typeof output !== "function")) {
          throw new Error('Output functor is not defined! If you are using items as object you have to define "output" function. https://github.com/webscopeio/react-textarea-autocomplete#trigger-type');
        }
        if (output) {
          var textToReplace = output(item, currentTrigger);
          if (textToReplace === void 0 || typeof textToReplace === "number") {
            throw new Error('Output functor should return string or object in shape {text: string, caretPosition: string | number}.\nGot "'.concat(String(textToReplace), '". Check the implementation for trigger "').concat(currentTrigger, '"\n\nSee https://github.com/webscopeio/react-textarea-autocomplete#trigger-type for more information.\n'));
          }
          if (textToReplace === null)
            return null;
          if (typeof textToReplace === "string") {
            return {
              text: textToReplace,
              caretPosition: DEFAULT_CARET_POSITION
            };
          }
          if (!textToReplace.text && typeof textToReplace.text !== "string") {
            throw new Error('Output "text" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger "'.concat(currentTrigger, '"\n'));
          }
          if (!textToReplace.caretPosition) {
            throw new Error('Output "caretPosition" is not defined! Object should has shape {text: string, caretPosition: string | number}. Check the implementation for trigger "'.concat(currentTrigger, '"\n'));
          }
          return textToReplace;
        }
        if (typeof item !== "string") {
          throw new Error("Output item should be string\n");
        }
        return {
          text: "".concat(currentTrigger).concat(item).concat(currentTrigger),
          caretPosition: DEFAULT_CARET_POSITION
        };
      };
    };
    _this2._getCurrentTriggerSettings = function() {
      var currentTrigger = _this2.state.currentTrigger;
      if (!currentTrigger)
        return null;
      return _this2.props.trigger[currentTrigger];
    };
    _this2._getValuesFromProvider = function() {
      var _this2$state2 = _this2.state, currentTrigger = _this2$state2.currentTrigger, actualToken2 = _this2$state2.actualToken;
      var triggerSettings = _this2._getCurrentTriggerSettings();
      if (!currentTrigger || !triggerSettings) {
        return;
      }
      var dataProvider = triggerSettings.dataProvider, component = triggerSettings.component;
      if (typeof dataProvider !== "function") {
        throw new Error("Trigger provider has to be a function!");
      }
      _this2.setState({
        dataLoading: true
      });
      var providedData = dataProvider(actualToken2);
      if (!(providedData instanceof Promise)) {
        providedData = Promise.resolve(providedData);
      }
      providedData.then(function(data) {
        if (!Array.isArray(data)) {
          throw new Error("Trigger provider has to provide an array!");
        }
        if (typeof component !== "function") {
          throw new Error("Component should be defined!");
        }
        if (currentTrigger !== _this2.state.currentTrigger)
          return;
        if (!data.length) {
          _this2._closeAutocomplete();
          return;
        }
        _this2.setState({
          dataLoading: false,
          data,
          component
        });
      }).catch(function(e) {
        return errorMessage(e.message);
      });
    };
    _this2._getSuggestions = function() {
      var _this2$state3 = _this2.state, currentTrigger = _this2$state3.currentTrigger, data = _this2$state3.data;
      if (!currentTrigger || !data || data && !data.length)
        return null;
      return data;
    };
    _this2._createRegExp = function() {
      var trigger = _this2.props.trigger;
      _this2.tokenRegExp = new RegExp("(".concat(Object.keys(trigger).sort(function(a, b) {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        return 0;
      }).map(function(a) {
        return escapeRegex(a);
      }).join("|"), ")((?:(?!\\1)[^\\s])*$)"));
      _this2.tokenRegExpEnding = new RegExp("(".concat(Object.keys(trigger).sort(function(a, b) {
        if (a < b) {
          return 1;
        }
        if (a > b) {
          return -1;
        }
        return 0;
      }).map(function(a) {
        return escapeRegex(a);
      }).join("|"), ")$"));
    };
    _this2._closeAutocomplete = function() {
      var currentTrigger = _this2.state.currentTrigger;
      _this2.escListenerDestroy();
      _this2.setState({
        data: null,
        dataLoading: false,
        currentTrigger: null
      }, function() {
        if (currentTrigger)
          _this2._onItemHighlightedHandler(null);
      });
    };
    _this2._cleanUpProps = function() {
      var props = _objectSpread({}, _this2.props);
      var notSafe = ["loadingComponent", "boundariesElement", "containerStyle", "minChar", "scrollToItem", "ref", "innerRef", "onChange", "onCaretPositionChange", "className", "value", "trigger", "listStyle", "itemStyle", "containerStyle", "loaderStyle", "className", "containerClassName", "listClassName", "itemClassName", "loaderClassName", "dropdownStyle", "dropdownClassName", "movePopupAsYouType", "textAreaComponent", "renderToBody", "onItemSelected", "onItemHighlighted"];
      for (var prop in props) {
        if (notSafe.includes(prop))
          delete props[prop];
      }
      return props;
    };
    _this2._changeHandler = function(e) {
      var _this2$props = _this2.props, trigger = _this2$props.trigger, onChange = _this2$props.onChange, minChar = _this2$props.minChar, onCaretPositionChange = _this2$props.onCaretPositionChange, movePopupAsYouType = _this2$props.movePopupAsYouType;
      var _this2$state4 = _this2.state, top2 = _this2$state4.top, left2 = _this2$state4.left;
      var event = e;
      if (!event) {
        event = new customEvent("change", {
          bubbles: true
        });
        _this2.textareaRef.dispatchEvent(event);
      }
      var textarea = event.target || _this2.textareaRef;
      var selectionEnd = textarea.selectionEnd;
      var value = textarea.value;
      _this2.lastValueBubbledEvent = value;
      if (onChange && event) {
        event.persist && event.persist();
        onChange(new Proxy(event, {
          get: function get(original, prop, receiver) {
            if (prop === "target") {
              return textarea;
            }
            return Reflect.get(original, prop, receiver);
          }
        }));
      }
      if (onCaretPositionChange) {
        var caretPosition = _this2.getCaretPosition();
        onCaretPositionChange(caretPosition);
      }
      _this2.setState({
        value
      });
      var setTopLeft = function setTopLeft2() {
        var _getCaretCoordinates = getCaretCoordinates(textarea, selectionEnd), newTop = _getCaretCoordinates.top, newLeft = _getCaretCoordinates.left;
        _this2.setState({
          top: newTop - _this2.textareaRef.scrollTop || 0,
          left: newLeft
        });
      };
      var cleanLastTrigger = function cleanLastTrigger2(triggerLength) {
        _this2.lastTrigger = selectionEnd - triggerLength;
        _this2._closeAutocomplete();
        setTopLeft();
      };
      if (selectionEnd <= _this2.lastTrigger) {
        var _affectedTextareaValue = value.slice(0, selectionEnd);
        var _newTrigger = _this2.tokenRegExp.exec(_affectedTextareaValue);
        cleanLastTrigger(_newTrigger ? _newTrigger[0].length : 0);
      }
      var affectedTextareaValue = value.slice(_this2.lastTrigger, selectionEnd);
      var tokenMatch = _this2.tokenRegExp.exec(affectedTextareaValue);
      var lastToken = tokenMatch && tokenMatch[0];
      var currentTrigger = tokenMatch && tokenMatch[1] || null;
      var currentTriggerLength = currentTrigger ? currentTrigger.length - 1 : 0;
      var newTrigger = _this2.tokenRegExpEnding.exec(affectedTextareaValue);
      if (newTrigger) {
        cleanLastTrigger(newTrigger[0].length);
      } else if (!_this2._isAutocompleteOpen()) {
        _this2._closeAutocomplete();
      }
      if ((!lastToken || lastToken.length <= minChar + currentTriggerLength) && (_this2.state.currentTrigger && !trigger[_this2.state.currentTrigger].allowWhitespace || !_this2.state.currentTrigger)) {
        _this2._closeAutocomplete();
        return;
      }
      if (currentTrigger && trigger[currentTrigger].afterWhitespace && !/\s/.test(value[selectionEnd - lastToken.length - 1]) && value[selectionEnd - lastToken.length - 1] !== void 0) {
        _this2._closeAutocomplete();
        return;
      }
      if (_this2.state.currentTrigger && trigger[_this2.state.currentTrigger].allowWhitespace) {
        tokenMatch = new RegExp("".concat(escapeRegex(_this2.state.currentTrigger), ".*$")).exec(value.slice(0, selectionEnd));
        lastToken = tokenMatch && tokenMatch[0];
        if (!lastToken) {
          _this2._closeAutocomplete();
          return;
        }
        currentTrigger = Object.keys(trigger).find(function(a) {
          return a.slice(0, currentTriggerLength + 1) === lastToken.slice(0, currentTriggerLength + 1);
        }) || null;
      }
      var actualToken2 = lastToken.slice(1);
      if (!currentTrigger) {
        return;
      }
      if (movePopupAsYouType || top2 === null && left2 === null || _this2.state.currentTrigger !== currentTrigger) {
        setTopLeft();
      }
      _this2.escListenerInit();
      var textToReplace = _this2._getTextToReplace(currentTrigger);
      _this2.setState({
        selectionEnd,
        currentTrigger,
        textToReplace,
        actualToken: actualToken2
      }, function() {
        try {
          _this2._getValuesFromProvider();
        } catch (err) {
          errorMessage(err.message);
        }
      });
    };
    _this2._selectHandler = function(e) {
      var _this2$props2 = _this2.props, onCaretPositionChange = _this2$props2.onCaretPositionChange, onSelect = _this2$props2.onSelect;
      if (onCaretPositionChange) {
        var caretPosition = _this2.getCaretPosition();
        onCaretPositionChange(caretPosition);
      }
      if (onSelect) {
        e.persist();
        onSelect(e);
      }
    };
    _this2._shouldStayOpen = function(e) {
      var el = e.relatedTarget;
      if (el === null) {
        el = document.activeElement;
      }
      if (_this2.dropdownRef && el instanceof Node && _this2.dropdownRef.contains(el)) {
        return true;
      }
      return false;
    };
    _this2._onClick = function(e) {
      var onClick = _this2.props.onClick;
      if (onClick) {
        e.persist();
        onClick(e);
      }
      if (_this2._shouldStayOpen(e)) {
        return;
      }
      _this2._closeAutocomplete();
    };
    _this2._onBlur = function(e) {
      var onBlur = _this2.props.onBlur;
      if (onBlur) {
        e.persist();
        onBlur(e);
      }
      if (_this2._shouldStayOpen(e)) {
        return;
      }
      _this2._closeAutocomplete();
    };
    _this2._onScrollHandler = function() {
      _this2._closeAutocomplete();
    };
    _this2._onItemHighlightedHandler = function(item) {
      var onItemHighlighted = _this2.props.onItemHighlighted;
      var currentTrigger = _this2.state.currentTrigger;
      if (onItemHighlighted) {
        if (typeof onItemHighlighted === "function") {
          onItemHighlighted({
            currentTrigger,
            item
          });
        } else {
          throw new Error("`onItemHighlighted` has to be a function");
        }
      }
    };
    _this2._dropdownScroll = function(item) {
      var scrollToItem = _this2.props.scrollToItem;
      if (!scrollToItem)
        return;
      if (scrollToItem === true) {
        defaultScrollToItem(_this2.dropdownRef, item);
        return;
      }
      if (typeof scrollToItem !== "function" || scrollToItem.length !== 2) {
        throw new Error("`scrollToItem` has to be boolean (true for default implementation) or function with two parameters: container, item.");
      }
      scrollToItem(_this2.dropdownRef, item);
    };
    _this2._isAutocompleteOpen = function() {
      var _this2$state5 = _this2.state, dataLoading = _this2$state5.dataLoading, currentTrigger = _this2$state5.currentTrigger;
      var suggestionData = _this2._getSuggestions();
      return !!((dataLoading || suggestionData) && currentTrigger);
    };
    _this2._textareaRef = function(ref) {
      _this2.props.innerRef && _this2.props.innerRef(ref);
      _this2.textareaRef = ref;
    };
    _this2.lastTrigger = 0;
    _this2.escListener = null;
    var _this2$props3 = _this2.props, loadingComponent = _this2$props3.loadingComponent, _trigger = _this2$props3.trigger, _value = _this2$props3.value;
    if (_value)
      _this2.state.value = _value;
    _this2._createRegExp();
    if (!loadingComponent) {
      throw new Error("RTA: loadingComponent is not defined");
    }
    if (!_trigger) {
      throw new Error("RTA: trigger is not defined");
    }
    return _this2;
  }
  _createClass(ReactTextareaAutocomplete2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Listeners.startListen(this.textareaRef);
      this.textareaRef && this.textareaRef.addEventListener("focus", this._handleCaretChange);
      this.textareaRef && this.textareaRef.addEventListener("click", this._handleCaretChange);
      this.textareaRef && this.textareaRef.addEventListener("keydown", this._handleCaretChange);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var oldTrigger = _ref2.trigger, oldValue = _ref2.value;
      var _this$props2 = this.props, trigger = _this$props2.trigger, value = _this$props2.value;
      if (Object.keys(trigger).join("") !== Object.keys(oldTrigger).join("")) {
        this._createRegExp();
      }
      if (oldValue !== value && this.lastValueBubbledEvent !== value) {
        this.lastTrigger = 0;
        this._changeHandler();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.escListenerDestroy();
      Listeners.stopListen(this.textareaRef);
      this.textareaRef && this.textareaRef.removeEventListener("focus", this._handleCaretChange);
      this.textareaRef && this.textareaRef.removeEventListener("click", this._handleCaretChange);
      this.textareaRef && this.textareaRef.removeEventListener("keydown", this._handleCaretChange);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props, Loader = _this$props3.loadingComponent, style = _this$props3.style, className = _this$props3.className, listStyle = _this$props3.listStyle, itemStyle = _this$props3.itemStyle, boundariesElement = _this$props3.boundariesElement, movePopupAsYouType = _this$props3.movePopupAsYouType, listClassName = _this$props3.listClassName, itemClassName = _this$props3.itemClassName, dropdownClassName = _this$props3.dropdownClassName, dropdownStyle = _this$props3.dropdownStyle, containerStyle = _this$props3.containerStyle, containerClassName = _this$props3.containerClassName, loaderStyle = _this$props3.loaderStyle, loaderClassName = _this$props3.loaderClassName, textAreaComponent = _this$props3.textAreaComponent, renderToBody = _this$props3.renderToBody;
      var _this$state = this.state, left2 = _this$state.left, top2 = _this$state.top, dataLoading = _this$state.dataLoading, component = _this$state.component, value = _this$state.value, textToReplace = _this$state.textToReplace;
      var isAutocompleteOpen = this._isAutocompleteOpen();
      var suggestionData = this._getSuggestions();
      var extraAttrs = {};
      var TextAreaComponent;
      if (textAreaComponent.component) {
        TextAreaComponent = textAreaComponent.component;
        extraAttrs[textAreaComponent.ref] = this._textareaRef;
      } else {
        TextAreaComponent = textAreaComponent;
        extraAttrs.ref = this._textareaRef;
      }
      return React.createElement("div", {
        className: "rta ".concat(dataLoading === true ? "rta--loading" : "", " ").concat(containerClassName || ""),
        style: containerStyle
      }, React.createElement(TextAreaComponent, Object.assign({}, this._cleanUpProps(), {
        className: "rta__textarea ".concat(className || ""),
        onChange: this._changeHandler,
        onSelect: this._selectHandler,
        onScroll: this._onScrollHandler,
        onClick: this._onClick,
        onBlur: this._onBlur,
        value,
        style
      }, extraAttrs)), isAutocompleteOpen && React.createElement(Autocomplete, {
        innerRef: function innerRef(ref) {
          _this3.dropdownRef = ref;
        },
        top: top2,
        left: left2,
        style: dropdownStyle,
        className: dropdownClassName,
        movePopupAsYouType,
        boundariesElement,
        textareaRef: this.textareaRef,
        renderToBody
      }, suggestionData && component && textToReplace && React.createElement(List, {
        values: suggestionData,
        component,
        style: listStyle,
        className: listClassName,
        itemClassName,
        itemStyle,
        getTextToReplace: textToReplace,
        onItemHighlighted: this._onItemHighlightedHandler,
        onSelect: this._onSelect,
        dropdownScroll: this._dropdownScroll
      }), dataLoading && React.createElement("div", {
        className: "rta__loader ".concat(suggestionData !== null ? "rta__loader--suggestion-data" : "rta__loader--empty-suggestion-data", " ").concat(loaderClassName || ""),
        style: loaderStyle
      }, React.createElement(Loader, {
        data: suggestionData
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref3) {
      var value = _ref3.value;
      if (value === null || value === void 0)
        return null;
      return {
        value
      };
    }
  }]);
  return ReactTextareaAutocomplete2;
}(React.Component);
ReactTextareaAutocomplete.defaultProps = {
  movePopupAsYouType: false,
  value: null,
  minChar: 1,
  boundariesElement: "body",
  scrollToItem: true,
  textAreaComponent: "textarea",
  renderToBody: false
};
const etTags = () => {
  const { app: app2 } = dailyNotesService.getState();
  const tags = app2.metadataCache.getTags();
  return [...Object.keys(tags)].map((p2) => p2.split("#").pop());
};
const usedTags = (seletecText) => {
  let allTags;
  if (UseVaultTags) {
    allTags = etTags();
  } else {
    const { tags } = memoService.getState();
    allTags = tags;
  }
  const lowerCaseInputStr = seletecText.toLowerCase();
  const usedTags2 = [];
  allTags.forEach((tag) => {
    if (tag && tag.toLowerCase().contains(lowerCaseInputStr)) {
      usedTags2.push({
        name: tag,
        char: tag
      });
    }
  });
  return usedTags2;
};
var suggest = "";
const getSuggestions = (inputStr) => {
  const { app: app2 } = dailyNotesService.getState();
  const query = (inputStr.startsWith("[") ? inputStr.slice(1) : inputStr).toLowerCase();
  const results = [];
  app2.vault.getAllLoadedFiles().forEach((file) => {
    if (!(file instanceof require$$0.TFile))
      return;
    const ext = file.extension;
    if (!(ext === "md" || ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif"))
      return;
    const base = file.basename.toLowerCase();
    const path = file.path.toLowerCase();
    let score = 0;
    if (!query) {
      score = 1;
    } else if (base === query) {
      score = 100;
    } else if (base.startsWith(query)) {
      score = 60;
    } else if (base.includes(query)) {
      score = 40;
    } else if (path.includes(query)) {
      score = 20;
    } else {
      return;
    }
    results.push({
      name: file.basename,
      char: file.name,
      file,
      score
    });
  });
  results.sort((a, b) => b.score - a.score || a.file.path.localeCompare(b.file.path));
  return results.map(({ score, ...item }) => item);
};
const TItem = ({
  entity: {
    name,
    char,
    file
  }
}) => {
  var _a;
  if (!file) {
    return /* @__PURE__ */ jsx("div", {
      className: "rta-sug-tag",
      children: char
    });
  }
  const dir = ((_a = file.parent) == null ? void 0 : _a.path) && file.parent.path !== "/" ? file.parent.path : "";
  return /* @__PURE__ */ jsxs("div", {
    className: "rta-sug-file",
    children: [/* @__PURE__ */ jsx("span", {
      className: "rta-sug-name",
      children: file.extension === "md" ? file.basename : file.name
    }), dir ? /* @__PURE__ */ jsx("span", {
      className: "rta-sug-path",
      children: dir
    }) : null]
  });
};
const Loading = ({
  data
}) => {
  return /* @__PURE__ */ jsx("div", {
    children: "Loading"
  });
};
let actualToken;
const Editor = react.exports.forwardRef((props, ref) => {
  var _a, _b;
  const {
    globalState: {
      useTinyUndoHistoryCache
    }
  } = react.exports.useContext(appContext);
  const {
    className,
    inputerType,
    initialContent,
    placeholder,
    showConfirmBtn,
    showCancelBtn,
    onConfirmBtnClick: handleConfirmBtnClickCallback,
    onCancelBtnClick: handleCancelBtnClickCallback,
    onContentChange: handleContentChangeCallback
  } = props;
  const editorRef = react.exports.useRef(null);
  const tinyUndoRef = react.exports.useRef(null);
  const refresh = useRefresh();
  const [, setHeight, currentHeightRef] = dist(0);
  react.exports.useEffect(() => {
    const leaves = app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    let memosHeight;
    let leafView;
    if (leaves.length > 0) {
      const leaf = leaves[0];
      leafView = leaf.view.containerEl;
      memosHeight = leafView.offsetHeight;
    } else {
      leafView = document;
      memosHeight = window.outerHeight;
    }
    setHeight(memosHeight);
  }, []);
  react.exports.useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    if (initialContent) {
      editorRef.current.value = initialContent;
      refresh();
    }
  }, []);
  react.exports.useEffect(() => {
    var _a2;
    if (useTinyUndoHistoryCache) {
      if (!editorRef.current) {
        return;
      }
      const {
        tinyUndoActionsCache,
        tinyUndoIndexCache
      } = storage.get(["tinyUndoActionsCache", "tinyUndoIndexCache"]);
      tinyUndoRef.current = new TinyUndo(editorRef.current, {
        interval: 5e3,
        initialActions: tinyUndoActionsCache,
        initialIndex: tinyUndoIndexCache
      });
      tinyUndoRef.current.subscribe((actions, index) => {
        storage.set({
          tinyUndoActionsCache: actions,
          tinyUndoIndexCache: index
        });
      });
      return () => {
        var _a3;
        (_a3 = tinyUndoRef.current) == null ? void 0 : _a3.destroy();
      };
    } else {
      (_a2 = tinyUndoRef.current) == null ? void 0 : _a2.destroy();
      tinyUndoRef.current = null;
      storage.remove(["tinyUndoActionsCache", "tinyUndoIndexCache"]);
    }
  }, [useTinyUndoHistoryCache]);
  react.exports.useEffect(() => {
    var _a2;
    if (editorRef.current) {
      editorRef.current.style.height = "auto";
      editorRef.current.style.height = ((_a2 = editorRef.current.scrollHeight) != null ? _a2 : 0) + "px";
    }
  }, [(_a = editorRef.current) == null ? void 0 : _a.value]);
  react.exports.useImperativeHandle(ref, () => ({
    element: editorRef.current,
    focus: () => {
      var _a2;
      if (FocusOnEditor) {
        (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
      }
    },
    insertText: (rawText) => {
      if (!editorRef.current) {
        return;
      }
      const prevValue = editorRef.current.value;
      editorRef.current.value = prevValue.slice(0, editorRef.current.selectionStart) + rawText + prevValue.slice(editorRef.current.selectionStart);
      handleContentChangeCallback(editorRef.current.value);
      refresh();
    },
    setContent: (text) => {
      if (editorRef.current) {
        editorRef.current.value = text;
        handleContentChangeCallback(editorRef.current.value);
        refresh();
      }
    },
    getContent: () => {
      var _a2, _b2;
      return (_b2 = (_a2 = editorRef.current) == null ? void 0 : _a2.value) != null ? _b2 : "";
    },
    clear: () => {
      var _a2;
      if (!editorRef.current) {
        return;
      }
      editorRef.current.value = "";
      handleContentChangeCallback("");
      refresh();
      (_a2 = tinyUndoRef.current) == null ? void 0 : _a2.resetState();
    },
    setEditable: (editable) => {
      if (editorRef.current) {
        editorRef.current.readOnly = !editable;
      }
    }
  }), []);
  const handleInsertTrigger = (event) => {
    if (!editorRef.current) {
      return;
    }
    const {
      fileManager
    } = appStore.getState().dailyNotesState.app;
    if (event.currentTrigger === "#") {
      const prevValue = editorRef.current.value;
      let removeCharNum;
      if (actualToken !== null && actualToken !== void 0) {
        removeCharNum = actualToken.length;
      } else {
        removeCharNum = 0;
      }
      let behindCharNum = editorRef.current.selectionStart;
      for (let i = 0; i < prevValue.length; i++) {
        if (!/\s/g.test(prevValue[behindCharNum])) {
          behindCharNum++;
        }
      }
      editorRef.current.value = prevValue.slice(0, editorRef.current.selectionStart - removeCharNum) + event.item.char + prevValue.slice(behindCharNum);
      handleContentChangeCallback(editorRef.current.value);
      refresh();
    } else if (event.currentTrigger === "[[") {
      const filePath = fileManager.generateMarkdownLink(event.item.file, event.item.file.path, "", "");
      const prevValue = editorRef.current.value;
      let removeCharNum;
      if (actualToken !== null && actualToken !== void 0) {
        if (filePath.contains("[[")) {
          removeCharNum = actualToken.length + 1;
        } else if (event.item.file.extension !== "md") {
          removeCharNum = actualToken.length + 1;
        } else {
          removeCharNum = actualToken.length + 2;
        }
      } else {
        removeCharNum = 2;
      }
      let behindCharNum = editorRef.current.selectionStart;
      for (let i = 0; i < prevValue.length; i++) {
        if (!/\s/g.test(prevValue[behindCharNum])) {
          behindCharNum++;
        }
      }
      editorRef.current.value = prevValue.slice(0, editorRef.current.selectionStart - removeCharNum) + filePath + prevValue.slice(behindCharNum);
      handleContentChangeCallback(editorRef.current.value);
      refresh();
    }
  };
  const handleEditorInput = react.exports.useCallback(() => {
    var _a2, _b2;
    handleContentChangeCallback((_b2 = (_a2 = editorRef.current) == null ? void 0 : _a2.value) != null ? _b2 : "");
    refresh();
  }, []);
  const handleEditorKeyDown = react.exports.useCallback((event) => {
    event.stopPropagation();
    if (event.code === "Enter") {
      if (event.metaKey || event.ctrlKey) {
        handleCommonConfirmBtnClick();
      }
    }
    refresh();
  }, []);
  const handleCommonConfirmBtnClick = react.exports.useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    if (inputerType === "memo") {
      editorRef.current.value = getEditorContentCache2();
    }
    handleConfirmBtnClickCallback(editorRef.current.value);
    refresh();
  }, []);
  const handleCommonCancelBtnClick = react.exports.useCallback(() => {
    handleCancelBtnClickCallback();
  }, []);
  const getEditorContentCache2 = () => {
    var _a2;
    return (_a2 = storage.get(["editorContentCache"]).editorContentCache) != null ? _a2 : "";
  };
  const getEditorContent = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.value = getEditorContentCache2();
    return editorRef.current.value;
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "common-editor-wrapper " + className,
    children: [inputerType === "memo" ? /* @__PURE__ */ jsx(ReactTextareaAutocomplete, {
      className: "common-editor-inputer scroll",
      loadingComponent: Loading,
      placeholder,
      movePopupAsYouType: true,
      value: getEditorContent(),
      innerRef: (textarea) => {
        editorRef.current = textarea;
      },
      onInput: handleEditorInput,
      onKeyDown: handleEditorKeyDown,
      style: {
        minHeight: 48,
        maxHeight: `${currentHeightRef.current > 400 ? currentHeightRef.current - 400 : 100}px`
      },
      dropdownStyle: {
        minWidth: 180,
        maxHeight: 250,
        overflowY: "auto"
      },
      minChar: 0,
      onItemSelected: handleInsertTrigger,
      scrollToItem: true,
      trigger: {
        "#": {
          dataProvider: (token) => {
            actualToken = token;
            return usedTags(token).map(({
              name,
              char
            }) => ({
              name,
              char
            }));
          },
          component: TItem,
          afterWhitespace: true,
          output: (item) => item.char
        },
        "[[": {
          dataProvider: (token) => {
            actualToken = token;
            return getSuggestions(token).slice(0, 10).map(({
              name,
              char,
              file
            }) => ({
              name,
              char,
              file
            }));
          },
          component: TItem,
          afterWhitespace: true,
          output: (item) => item.char
        }
      }
    }) : /* @__PURE__ */ jsx("textarea", {
      style: {
        minHeight: 48
      },
      className: "common-editor-inputer scroll",
      rows: 1,
      placeholder,
      ref: editorRef,
      onInput: handleEditorInput,
      onKeyDown: handleEditorKeyDown
    }), /* @__PURE__ */ jsxs("div", {
      className: "common-tools-wrapper",
      children: [/* @__PURE__ */ jsx("div", {
        className: "common-tools-container",
        children: /* @__PURE__ */ jsx(Only, {
          when: props.tools !== void 0,
          children: props.tools
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "btns-container",
        children: [/* @__PURE__ */ jsx(Only, {
          when: showCancelBtn,
          children: /* @__PURE__ */ jsx("button", {
            className: "action-btn cancel-btn",
            onClick: handleCommonCancelBtnClick,
            children: t$1("CANCEL EDIT")
          })
        }), /* @__PURE__ */ jsx(Only, {
          when: showConfirmBtn,
          children: /* @__PURE__ */ jsx("button", {
            className: "action-btn confirm-btn",
            disabled: !((_b = editorRef.current) == null ? void 0 : _b.value),
            onClick: handleCommonConfirmBtnClick,
            title: "Send",
            children: /* @__PURE__ */ jsx(SvgSend, {
              className: "icon-img"
            })
          })
        })]
      })]
    })]
  });
});
var memoEditor = "";
var memoWriteDate = "";
function SvgTag(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#000000",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("g", null, /* @__PURE__ */ react.exports.createElement("rect", {
    fill: "none",
    height: 24,
    width: 24
  })), /* @__PURE__ */ react.exports.createElement("g", null, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M20,10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4H20z M14,14h-4v-4h4V14z"
  })));
}
function SvgImage(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#000000",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
  }));
}
function SvgJournal(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    t: 1642406967115,
    className: "icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": 1652,
    width: 26,
    height: 26,
    fill: "#1296db",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M544 800.128l-320 0.16-0.064-96.32-0.064-160-0.032-64-0.096-160-0.032-96h576.128L800 223.776 800.256 800 544 800.128zM799.84 160H223.712A63.808 63.808 0 0 0 160 223.744v576.544c0 35.136 28.608 63.68 63.744 63.68h576.512A63.808 63.808 0 0 0 864 800.32V223.744A64 64 0 0 0 799.84 160z",
    "p-id": 1653
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M680.608 320h-224a32 32 0 0 0 0 64h224a32 32 0 0 0 0-64M680.608 480h-224a32 32 0 0 0 0 64h224a32 32 0 0 0 0-64M680.608 640h-224a32 32 0 0 0 0 64h224a32 32 0 0 0 0-64M352 320a32 32 0 1 0 0 64 32 32 0 0 0 0-64M352 480a32 32 0 1 0 0 64 32 32 0 0 0 0-64M352 640a32 32 0 1 0 0 64 32 32 0 0 0 0-64",
    "p-id": 1654
  }));
}
function SvgCheckboxActive(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"
  }));
}
function SvgCalendar(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "#000000",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7v-5z"
  }));
}
var showEditorSvg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgY2xhc3M9Imljb24iIHAtaWQ9IjYxOTQiIHQ9IjE2NDI1NjQ0NTIyMDgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTUxMiAzMkMyNDggMzIgMzIgMjQ4IDMyIDUxMnMyMTYgNDgwIDQ4MCA0ODAgNDgwLTIxNiA0ODAtNDgwUzc3NiAzMiA1MTIgMzJ6IiBwLWlkPSI2MTk1Ii8+PHBhdGggZD0iTTUxMiAwQzIyOC44IDAgMCAyMjguOCAwIDUxMnMyMjguOCA1MTIgNTEyIDUxMiA1MTItMjI4LjggNTEyLTUxMlM3OTUuMiAwIDUxMiAweiBtMCA5OTJDMjQ4IDk5MiAzMiA3NzYgMzIgNTEyUzI0OCAzMiA1MTIgMzJzNDgwIDIxNiA0ODAgNDgwLTIxNiA0ODAtNDgwIDQ4MHoiIHAtaWQ9IjYxOTYiLz48cGF0aCBmaWxsPSIjOURFOEY3IiBkPSJNNTEyIDUxMm0tMzkyIDBhMzkyIDM5MiAwIDEgMCA3ODQgMCAzOTIgMzkyIDAgMSAwLTc4NCAwWiIgcC1pZD0iNjE5NyIvPjxwYXRoIGZpbGw9IiMxQTE3MTgiIGQ9Ik03ODQgNDk2SDUyOFYyNDBoLTMydjI1NkgyNDB2MzJoMjU2djI1NmgzMlY1MjhoMjU2eiIgcC1pZD0iNjE5OCIvPjwvc3ZnPg==";
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? react.exports.useLayoutEffect : react.exports.useEffect;
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x2 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance2 = _ref[1];
  skidding = skidding || 0;
  distance2 = (distance2 || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance2,
    y: skidding
  } : {
    x: skidding,
    y: distance2
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    var it2;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size)
        return false;
      it2 = a.entries();
      while (!(i = it2.next()).done)
        if (!b.has(i.value[0]))
          return false;
      it2 = a.entries();
      while (!(i = it2.next()).done)
        if (!equal(i.value[1], b.get(i.value[0])))
          return false;
      return true;
    }
    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size)
        return false;
      it2 = a.entries();
      while (!(i = it2.next()).done)
        if (!b.has(i.value[0]))
          return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (a[i] !== b[i])
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    if (hasElementType && a instanceof Element)
      return false;
    for (i = length; i-- !== 0; ) {
      if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys[i]], b[keys[i]]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || "").match(/stack|recursion/i)) {
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    throw error;
  }
};
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = react.exports.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = react.exports.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = react.exports.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        reactDom.exports.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = react.exports.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if (reactFastCompare(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = react.exports.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper$1 = options.createPopper || createPopper;
    var popperInstance = createPopper$1(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};
const WriteDatePopover = (props) => {
  const {
    anchorEl,
    value,
    onSet,
    onClear,
    onClose
  } = props;
  const [draftDateMs, setDraftDateMs] = react.exports.useState(() => require$$0.moment(value != null ? value : require$$0.moment()).startOf("day").valueOf());
  const [draftTime, setDraftTime] = react.exports.useState(() => require$$0.moment(value != null ? value : require$$0.moment()).format("HH:mm"));
  const [popperEl, setPopperEl] = react.exports.useState(null);
  const {
    styles: styles2,
    attributes
  } = usePopper(anchorEl, popperEl, {
    placement: "bottom-start",
    modifiers: [{
      name: "flip",
      options: {
        fallbackPlacements: ["top-start"]
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: 8
      }
    }]
  });
  react.exports.useEffect(() => {
    if (!anchorEl) {
      return;
    }
    const handleMouseDown = (e) => {
      const target = e.target;
      if (popperEl && popperEl.contains(target)) {
        return;
      }
      if (anchorEl.contains(target)) {
        return;
      }
      onClose();
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorEl, popperEl, onClose]);
  if (!anchorEl) {
    return null;
  }
  const handleConfirm = () => {
    const [h2 = 0, m2 = 0] = draftTime.split(":").map((n2) => parseInt(n2));
    const target = require$$0.moment(draftDateMs).hours(h2).minutes(m2).seconds(0).milliseconds(0);
    onSet(target);
    onClose();
  };
  const handleToday = () => {
    setDraftDateMs(require$$0.moment().startOf("day").valueOf());
  };
  const handleClear = () => {
    onClear();
    onClose();
  };
  const draftLabel = require$$0.moment(draftDateMs).format("YYYY-MM-DD");
  return /* @__PURE__ */ jsxs("div", {
    ref: setPopperEl,
    className: "memo-write-date-popover",
    style: styles2.popper,
    ...attributes.popper,
    role: "dialog",
    children: [/* @__PURE__ */ jsx(DatePicker, {
      className: "editor-date-picker",
      datestamp: draftDateMs,
      handleDateStampChange: (ms) => setDraftDateMs(ms)
    }), /* @__PURE__ */ jsxs("div", {
      className: "write-date-row",
      children: [/* @__PURE__ */ jsx("span", {
        className: "write-date-label",
        children: t$1("Time")
      }), /* @__PURE__ */ jsx("input", {
        className: "write-date-time",
        type: "time",
        value: draftTime,
        step: "60",
        onChange: (e) => setDraftTime(e.target.value)
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "write-date-actions",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "write-date-ghost-actions",
        children: [/* @__PURE__ */ jsx("span", {
          className: "ghost-btn",
          onClick: handleToday,
          children: t$1("Today")
        }), value && /* @__PURE__ */ jsx("span", {
          className: "ghost-btn danger",
          onClick: handleClear,
          children: t$1("Back to now")
        })]
      }), /* @__PURE__ */ jsxs("button", {
        className: "write-date-confirm",
        onClick: handleConfirm,
        children: [t$1("Write on"), " ", draftLabel, " ", draftTime]
      })]
    })]
  });
};
let isList;
let isEditor = false;
let isEditorGo = false;
const SQUASH_TOTAL_MS = 130;
const SQUASH_LAUNCH_MS = 90;
const MemoEditor = () => {
  const {
    globalState
  } = react.exports.useContext(appContext);
  const {
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  const {
    DefaultEditorLocation,
    DefaultPrefix,
    FocusOnEditor: FocusOnEditor2,
    UseButtonToShowEditor
  } = settings;
  const {
    app: app2
  } = dailyNotesService.getState();
  const [isListShown, toggleList] = useToggle(false);
  const [isEditorShown, toggleEditor] = dist(false);
  const editorRef = react.exports.useRef(null);
  const editorWrapperRef = react.exports.useRef(null);
  const sendingRef = react.exports.useRef(false);
  const skipNextFocusRef = react.exports.useRef(false);
  const prevGlobalStateRef = react.exports.useRef(globalState);
  const [targetDate, setTargetDate, targetDateRef] = dist(null);
  const [isWriteDateOpen, setIsWriteDateOpen] = dist(false);
  const [calAnchor, setCalAnchor] = dist(null);
  react.exports.useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    if (DefaultPrefix === "List") {
      isList = false;
      toggleList(false);
    } else {
      isList = true;
      toggleList(true);
    }
    isEditor = false;
  }, []);
  react.exports.useEffect(() => {
    var _a;
    if (!editorRef.current) {
      return;
    }
    const leaves = app2.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    let memosWidth;
    if (leaves.length > 0) {
      const leaf = leaves[0];
      memosWidth = leaf.width > 0 ? leaf.width : window.outerWidth;
    } else {
      memosWidth = window.outerWidth;
    }
    if ((require$$0.Platform.isMobile === true || memosWidth < 875) && UseButtonToShowEditor) {
      toggleEditor(true);
    }
    if (FocusOnEditor2) {
      (_a = editorRef.current) == null ? void 0 : _a.focus();
    }
  }, []);
  react.exports.useEffect(() => {
    var _a, _b;
    if (!editorRef.current) {
      return;
    }
    if (UseButtonToShowEditor === true && DefaultEditorLocation === "Bottom" && require$$0.Platform.isMobile === true && window.innerWidth < 875) {
      const leaves = app2.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
      let memosHeight;
      let leafView;
      if (leaves.length > 0) {
        const leaf = leaves[0];
        leafView = leaf.view.containerEl;
        memosHeight = leafView.offsetHeight;
      } else {
        leafView = document;
        memosHeight = window.innerHeight;
      }
      const divThis = document.createElement("img");
      const memoEditorDiv = leafView.querySelector("div[data-type='memos_view'] .view-content .memo-editor-wrapper");
      divThis.src = `${showEditorSvg}`;
      if (isEditorShown) {
        divThis.className = "memo-show-editor-button hidden";
      } else {
        divThis.className = "memo-show-editor-button";
      }
      const buttonTop = memosHeight - 200;
      const buttonLeft = window.innerWidth / 2 - 25;
      divThis.style.top = buttonTop + "px";
      divThis.style.left = buttonLeft + "px";
      divThis.onclick = function() {
        const scaleElementAni = divThis.animate([
          {
            transform: "rotate(0deg) scale(1)"
          },
          {
            transform: "rotate(60deg) scale(1.5)"
          }
        ], {
          duration: 300,
          iterations: Infinity
        });
        setTimeout(() => {
          var _a2, _b2;
          divThis.className = "memo-show-editor-button hidden";
          if (isEditor) {
            handleShowEditor(false);
            (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
            scaleElementAni.reverse();
          } else {
            handleShowEditor();
            (_b2 = editorRef.current) == null ? void 0 : _b2.focus();
            scaleElementAni.reverse();
          }
        }, 300);
      };
      leafView.querySelector(".content-wrapper").prepend(divThis);
      const memolistScroll = leafView.querySelector(".memolist-wrapper");
      memolistScroll.onscroll = function() {
        if (isEditor && !isEditorGo) {
          isEditorGo = true;
          const scaleEditorElementAni = memoEditorDiv.animate([
            {
              transform: "scale(1)",
              opacity: 1
            },
            {
              transform: "scale(0.4)",
              opacity: 0
            }
          ], {
            duration: 300,
            iterations: 1
          });
          let scaleOneElementAni;
          setTimeout(() => {
            scaleOneElementAni = divThis.animate([
              {
                transform: "rotate(20deg) scale(1.5)"
              },
              {
                transform: "rotate(0deg) scale(1)"
              }
            ], {
              duration: 100,
              iterations: 1
            });
          }, 300);
          setTimeout(() => {
            handleShowEditor(true);
            divThis.className = "memo-show-editor-button";
          }, 300);
          setTimeout(() => {
            scaleOneElementAni.cancel();
            scaleEditorElementAni.reverse();
          }, 700);
        }
      };
    } else if (UseButtonToShowEditor === false && DefaultEditorLocation === "Bottom" && require$$0.Platform.isMobile === true && window.innerWidth < 875) {
      handleShowEditor(false);
      if (FocusOnEditor2) {
        (_a = editorRef.current) == null ? void 0 : _a.focus();
      }
    } else {
      if (!isEditor) {
        handleShowEditor(false);
      }
      if (FocusOnEditor2) {
        (_b = editorRef.current) == null ? void 0 : _b.focus();
      }
    }
  }, []);
  react.exports.useEffect(() => {
    var _a, _b, _c, _d, _e;
    if (globalState.markMemoId) {
      const editorCurrentValue = (_a = editorRef.current) == null ? void 0 : _a.getContent();
      const memoLinkText = `${editorCurrentValue ? "\n" : ""}${t$1("MARK")}: [@MEMO](${globalState.markMemoId})`;
      (_b = editorRef.current) == null ? void 0 : _b.insertText(memoLinkText);
      globalStateService.setMarkMemoId("");
    }
    if (globalState.editMemoId && globalState.editMemoId !== prevGlobalStateRef.current.editMemoId) {
      const editMemo = memoService.getMemoById(globalState.editMemoId);
      if (editMemo) {
        (_d = editorRef.current) == null ? void 0 : _d.setContent((_c = editMemo.content.replace(/<br>/g, "\n").replace(/ \^\S{6}$/, "")) != null ? _c : "");
        (_e = editorRef.current) == null ? void 0 : _e.focus();
      }
    }
    prevGlobalStateRef.current = globalState;
  }, [globalState.markMemoId, globalState.editMemoId]);
  react.exports.useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    const handlePasteEvent = async (event) => {
      var _a;
      if (event.clipboardData && event.clipboardData.files.length > 0) {
        event.preventDefault();
        const file = event.clipboardData.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          (_a = editorRef.current) == null ? void 0 : _a.insertText(url);
        }
      }
    };
    const handleDropEvent = async (event) => {
      var _a;
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const url = await handleUploadFile(file);
        if (url) {
          (_a = editorRef.current) == null ? void 0 : _a.insertText(url);
        }
      }
    };
    const handleClickEvent = () => {
      var _a, _b;
      handleContentChange((_b = (_a = editorRef.current) == null ? void 0 : _a.element.value) != null ? _b : "");
    };
    const handleKeyDownEvent = () => {
      setTimeout(() => {
        var _a, _b;
        handleContentChange((_b = (_a = editorRef.current) == null ? void 0 : _a.element.value) != null ? _b : "");
      });
    };
    editorRef.current.element.addEventListener("paste", handlePasteEvent);
    editorRef.current.element.addEventListener("drop", handleDropEvent);
    editorRef.current.element.addEventListener("click", handleClickEvent);
    editorRef.current.element.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      var _a, _b;
      (_a = editorRef.current) == null ? void 0 : _a.element.removeEventListener("paste", handlePasteEvent);
      (_b = editorRef.current) == null ? void 0 : _b.element.removeEventListener("drop", handleDropEvent);
    };
  }, [editorRef.current]);
  const handleUploadFile = react.exports.useCallback(async (file) => {
    const {
      type
    } = file;
    if (!type.startsWith("image")) {
      return;
    }
    try {
      const image2 = await resourceService.upload(file);
      return `${image2}`;
    } catch (error) {
      new require$$0.Notice(error);
    }
  }, []);
  const squashEditor = () => {
    const el = editorWrapperRef.current;
    if (!el) {
      return;
    }
    el.style.transformOrigin = "50% 0%";
    const anim = el.animate([
      {
        transform: "scale(1, 1)",
        offset: 0,
        easing: "cubic-bezier(0.33, 1, 0.68, 1)"
      },
      {
        transform: "scale(1, 0.94)",
        offset: 0.28
      },
      {
        transform: "scale(1, 0.94)",
        offset: 0.7
      },
      {
        transform: "scale(1, 1)",
        offset: 0.76
      },
      {
        transform: "scale(1, 1)",
        offset: 1
      }
    ], {
      duration: SQUASH_TOTAL_MS
    });
    anim.onfinish = () => {
      anim.cancel();
      el.style.transformOrigin = "";
    };
  };
  const handleSaveBtnClick = react.exports.useCallback(async (content) => {
    var _a, _b;
    if (content === "") {
      new require$$0.Notice(t$1("Content cannot be empty"));
      return;
    }
    if (sendingRef.current) {
      return;
    }
    const {
      editMemoId
    } = globalStateService.getState();
    content = content.replaceAll("&nbsp;", " ");
    const finishSend = () => {
      var _a2, _b2;
      (_a2 = editorRef.current) == null ? void 0 : _a2.clear();
      (_b2 = editorRef.current) == null ? void 0 : _b2.setEditable(true);
      setEditorContentCache("");
      sendingRef.current = false;
    };
    try {
      if (editMemoId) {
        setEditorContentCache("");
        const prevMemo = memoService.getMemoById(editMemoId);
        content = content + (prevMemo.hasId === "" ? "" : " ^" + prevMemo.hasId);
        if (prevMemo && prevMemo.content !== content) {
          const editedMemo = await memoService.updateMemo({
            memoId: prevMemo.id,
            originalText: prevMemo.content,
            text: content,
            type: prevMemo.memoType,
            path: prevMemo.path
          });
          editedMemo.updatedAt = utils$1.getDateTimeString(Date.now());
          memoService.editMemo(editedMemo);
        }
        globalStateService.setEditMemoId("");
        finishSend();
      } else {
        sendingRef.current = true;
        (_a = editorRef.current) == null ? void 0 : _a.setEditable(false);
        const target = targetDateRef.current;
        const sendContent = content.trimStart();
        const squashStart = Date.now();
        squashEditor();
        const newMemo = await memoService.createMemo(sendContent, isList, target != null ? target : void 0);
        const remaining = Math.max(0, SQUASH_LAUNCH_MS - (Date.now() - squashStart));
        window.setTimeout(() => {
          finishSend();
          memoService.pushMemo(newMemo);
          locationService.clearQuery();
        }, remaining);
      }
    } catch (error) {
      sendingRef.current = false;
      (_b = editorRef.current) == null ? void 0 : _b.setEditable(true);
      new require$$0.Notice(error.message);
    }
  }, []);
  const handleCancelBtnClick = react.exports.useCallback(() => {
    var _a, _b, _c;
    globalStateService.setEditMemoId("");
    skipNextFocusRef.current = true;
    (_a = editorRef.current) == null ? void 0 : _a.setContent("");
    setEditorContentCache("");
    (_c = (_b = editorRef.current) == null ? void 0 : _b.element) == null ? void 0 : _c.blur();
  }, []);
  const handleContentChange = react.exports.useCallback((content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    if (tempDiv.innerText.trim() === "") {
      content = "";
    }
    setEditorContentCache(content);
    if (!editorRef.current) {
      return;
    }
    setTimeout(() => {
      var _a;
      if (skipNextFocusRef.current) {
        skipNextFocusRef.current = false;
        return;
      }
      (_a = editorRef.current) == null ? void 0 : _a.focus();
    });
  }, []);
  const handleChangeStatus = () => {
    if (!editorRef.current) {
      return;
    }
    if (isList) {
      isList = false;
      toggleList(false);
    } else {
      isList = true;
      toggleList(true);
    }
  };
  const handleShowEditor = (flag) => {
    if (!editorRef.current) {
      return;
    }
    if (isEditor || flag === true) {
      isEditor = false;
      toggleEditor(true);
    } else {
      isEditor = true;
      isEditorGo = false;
      toggleEditor(false);
    }
  };
  const handleTagTextBtnClick = react.exports.useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    const currentValue = editorRef.current.getContent();
    const selectionStart = editorRef.current.element.selectionStart;
    const prevString = currentValue.slice(0, selectionStart);
    const nextString = currentValue.slice(selectionStart);
    let nextValue = prevString + "# " + nextString;
    let cursorIndex = prevString.length + 1;
    if (prevString.endsWith("#") && nextString.startsWith(" ")) {
      nextValue = prevString.slice(0, prevString.length - 1) + nextString.slice(1);
      cursorIndex = prevString.length - 1;
    }
    editorRef.current.element.value = nextValue;
    editorRef.current.element.setSelectionRange(cursorIndex, cursorIndex);
    editorRef.current.focus();
    handleContentChange(editorRef.current.element.value);
  }, []);
  const handleUploadFileBtnClick = react.exports.useCallback(() => {
    const inputEl = document.createElement("input");
    document.body.appendChild(inputEl);
    inputEl.type = "file";
    inputEl.multiple = false;
    inputEl.accept = "image/png, image/gif, image/jpeg";
    inputEl.onchange = async () => {
      var _a;
      if (!inputEl.files || inputEl.files.length === 0) {
        return;
      }
      const file = inputEl.files[0];
      const url = await handleUploadFile(file);
      if (url) {
        (_a = editorRef.current) == null ? void 0 : _a.insertText(url);
      }
      document.body.removeChild(inputEl);
    };
    inputEl.click();
  }, []);
  const showEditStatus = Boolean(globalState.editMemoId);
  const toggleWriteDateOpen = () => setIsWriteDateOpen((v2) => !v2);
  const handleClearTargetDate = () => {
    setTargetDate(null);
    setIsWriteDateOpen(false);
  };
  const editorConfig = react.exports.useMemo(() => ({
    className: "memo-editor",
    inputerType: "memo",
    initialContent: getEditorContentCache(),
    placeholder: t$1("What do you think now..."),
    showConfirmBtn: true,
    showCancelBtn: showEditStatus,
    showTools: true,
    onConfirmBtnClick: handleSaveBtnClick,
    onCancelBtnClick: handleCancelBtnClick,
    onContentChange: handleContentChange
  }), [showEditStatus]);
  return /* @__PURE__ */ jsxs("div", {
    ref: editorWrapperRef,
    className: `memo-editor-wrapper ${showEditStatus ? "edit-ing" : ""} ${isEditorShown ? "hidden" : ""}`,
    children: [/* @__PURE__ */ jsx("p", {
      className: `tip-text ${showEditStatus ? "" : "hidden"}`,
      children: "Modifying..."
    }), /* @__PURE__ */ jsx(Editor, {
      ref: editorRef,
      ...editorConfig,
      tools: /* @__PURE__ */ jsxs(Fragment, {
        children: [!showEditStatus && /* @__PURE__ */ jsx("span", {
          ref: setCalAnchor,
          className: `memo-write-date-anchor ${isWriteDateOpen ? "active" : ""}`,
          title: t$1("Write to date"),
          onClick: (e) => {
            e.stopPropagation();
            toggleWriteDateOpen();
          },
          children: /* @__PURE__ */ jsx(SvgCalendar, {
            className: "action-btn write-date"
          })
        }), /* @__PURE__ */ jsx(SvgTag, {
          className: "action-btn add-tag",
          onClick: handleTagTextBtnClick
        }), /* @__PURE__ */ jsx(SvgImage, {
          className: "action-btn file-upload",
          onClick: handleUploadFileBtnClick
        }), !isListShown ? /* @__PURE__ */ jsx(SvgJournal, {
          className: "action-btn list-or-task",
          onClick: handleChangeStatus
        }) : /* @__PURE__ */ jsx(SvgCheckboxActive, {
          className: "action-btn list-or-task",
          onClick: handleChangeStatus
        })]
      })
    }), !showEditStatus && targetDate && /* @__PURE__ */ jsxs("div", {
      className: "memo-write-date-target",
      onClick: toggleWriteDateOpen,
      children: [/* @__PURE__ */ jsx(SvgCalendar, {
        className: "icon-img"
      }), /* @__PURE__ */ jsxs("span", {
        className: "target-text",
        children: [t$1("Write on"), " ", targetDate.format("YYYY-MM-DD HH:mm")]
      }), /* @__PURE__ */ jsx("span", {
        className: "target-clear",
        title: t$1("Back to now"),
        onClick: (e) => {
          e.stopPropagation();
          handleClearTargetDate();
        },
        children: "\u2715"
      })]
    }), isWriteDateOpen && /* @__PURE__ */ jsx(WriteDatePopover, {
      anchorEl: calAnchor,
      value: targetDate,
      onSet: setTargetDate,
      onClear: handleClearTargetDate,
      onClose: () => setIsWriteDateOpen(false)
    })]
  });
};
function getEditorContentCache() {
  var _a;
  return (_a = storage.get(["editorContentCache"]).editorContentCache) != null ? _a : "";
}
function setEditorContentCache(content) {
  storage.set({
    editorContentCache: content
  });
}
var searchBar = "";
function SvgSearch(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
  }));
}
const SearchBar = () => {
  const {
    locationState: {
      query: {
        type: memoType
      }
    }
  } = react.exports.useContext(appContext);
  const [isSearchBarShow, toggleSearchbar] = useToggle(false);
  const handleMemoTypeItemClick = (type) => {
    const {
      type: prevType
    } = locationService.getState().query;
    if (type === prevType) {
      type = "";
    }
    locationService.setMemoTypeQuery(type);
  };
  const handleTextQueryInput = (event) => {
    const text = event.currentTarget.value;
    if (!text.contains(" -time: ")) {
      locationService.setTextQuery(text);
      return;
    }
    const time = text.split(" -time: ")[1];
    const times = time.length > 10 ? time.match(/\d{4}-\d{2}-\d{2}/g) : null;
    if (times === null || times === void 0) {
      locationService.setTextQuery(text.split(" -time: ")[0]);
      return;
    }
    if (times.length === 1) {
      const startMoment = require$$0.moment(times[0]);
      locationService.setTimeQuery({
        from: startMoment.startOf("day").valueOf(),
        to: startMoment.endOf("day").valueOf()
      });
    } else if (times.length === 2) {
      const startMoment = require$$0.moment(times[0]);
      const endMoment = require$$0.moment(times[1]);
      locationService.setTimeQuery({
        from: startMoment.startOf("day").valueOf(),
        to: endMoment.endOf("day").valueOf()
      });
    }
    locationService.setTextQuery(text.split(" -time: ")[0]);
    return;
  };
  const mouseIn = () => {
    toggleSearchbar(true);
  };
  const mouseOut = () => {
    toggleSearchbar(false);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "search-bar-container",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "search-bar-inputer",
      children: [/* @__PURE__ */ jsx(SvgSearch, {
        className: "icon-img"
      }), /* @__PURE__ */ jsx("input", {
        className: "text-input",
        type: "text",
        onMouseOver: mouseIn,
        onMouseOut: mouseOut,
        placeholder: isSearchBarShow ? "Type Here" : "",
        onChange: handleTextQueryInput
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "quickly-action-wrapper",
      children: /* @__PURE__ */ jsxs("div", {
        className: "quickly-action-container",
        children: [/* @__PURE__ */ jsx("p", {
          className: "title-text",
          children: t$1("Quick filter")
        }), /* @__PURE__ */ jsxs("div", {
          className: "section-container types-container",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "section-text",
            children: [t$1("TYPE"), ":"]
          }), /* @__PURE__ */ jsx("div", {
            className: "values-container",
            children: memoSpecialTypes.map((t2, idx) => {
              return /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: `type-item ${memoType === t2.value ? "selected" : ""}`,
                  onClick: () => {
                    handleMemoTypeItemClick(t2.value);
                  },
                  children: t2.text
                }), idx + 1 < memoSpecialTypes.length ? /* @__PURE__ */ jsx("span", {
                  className: "split-text",
                  children: "/"
                }) : null]
              }, t2.value);
            })
          })]
        })]
      })
    })]
  });
};
var memosHeader = "";
function SvgMenu(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    height: "24px",
    viewBox: "0 0 24 24",
    width: "24px",
    fill: "#37352f",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
  }));
}
const MemosHeader = () => {
  const {
    locationState: {
      query: {
        filter
      }
    },
    globalState: {
      isMobileView
    },
    queryState: {
      queries
    }
  } = react.exports.useContext(appContext);
  const [titleText, setTitleText] = react.exports.useState("Rememo");
  react.exports.useEffect(() => {
    const query = queryService.getQueryById(filter);
    if (query) {
      setTitleText(query.title);
    } else {
      setTitleText("Rememo");
    }
  }, [filter, queries]);
  const handleMemoTextClick = react.exports.useCallback(() => {
    memoService.fetchAllMemos().catch(() => {
    });
  }, []);
  const handleShowSidebarBtnClick = react.exports.useCallback(() => {
    globalStateService.setShowSiderbarInMobileView(true);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "section-header-container memos-header-container",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "title-text",
      onClick: handleMemoTextClick,
      children: [/* @__PURE__ */ jsx(Only, {
        when: isMobileView,
        children: /* @__PURE__ */ jsx("button", {
          className: "action-btn",
          onClick: handleShowSidebarBtnClick,
          children: /* @__PURE__ */ jsx(SvgMenu, {
            className: "icon-img"
          })
        })
      }), /* @__PURE__ */ jsx("span", {
        className: "normal-text",
        children: titleText
      })]
    }), /* @__PURE__ */ jsx(SearchBar, {})]
  });
};
var memoFilter = "";
function SvgCopy(props) {
  return /* @__PURE__ */ react.exports.createElement("svg", {
    width: 24,
    height: 24,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props
  }, /* @__PURE__ */ react.exports.createElement("path", {
    d: "M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163",
    stroke: "#333",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /* @__PURE__ */ react.exports.createElement("path", {
    d: "M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z",
    fill: "none",
    stroke: "#333",
    strokeWidth: 3,
    strokeLinejoin: "round"
  }));
}
var memolist = "";
var pagination = "";
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1)
    return null;
  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages.map((page, index) => {
      if (page === "ellipsis") {
        return /* @__PURE__ */ jsx("span", {
          className: "ellipsis",
          children: "..."
        }, `ellipsis-${index}`);
      }
      return /* @__PURE__ */ jsx("button", {
        className: `page-number ${currentPage === page ? "active" : ""}`,
        onClick: () => onPageChange(page),
        children: page
      }, page);
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "pagination-container",
    children: [/* @__PURE__ */ jsx("button", {
      className: "nav-button",
      onClick: () => onPageChange(currentPage - 1),
      disabled: currentPage === 1,
      children: "\u4E0A\u4E00\u9875"
    }), /* @__PURE__ */ jsx("div", {
      className: "page-numbers",
      children: renderPageNumbers()
    }), /* @__PURE__ */ jsx("button", {
      className: "nav-button",
      onClick: () => onPageChange(currentPage + 1),
      disabled: currentPage === totalPages,
      children: "\u4E0B\u4E00\u9875"
    })]
  });
};
let copyShownMemos;
const ITEMS_PER_PAGE = 10;
const MemoList = () => {
  const {
    locationState: {
      query
    },
    memoState: {
      memos
    },
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  const [currentPage, setCurrentPage] = react.exports.useState(1);
  const [isFetching, setFetchStatus] = react.exports.useState(true);
  const wrapperElement = react.exports.useRef(null);
  const layoutSnapRef = react.exports.useRef({
    keys: [],
    tops: []
  });
  const lastInsertAnimRef = react.exports.useRef(0);
  const {
    tag: tagQuery,
    duration,
    type: memoContentType,
    text: textQuery,
    filter: queryId
  } = query;
  const queryFilter = queryService.getQueryById(queryId);
  const showMemoFilter = Boolean(tagQuery || duration && duration.from < duration.to || memoContentType || textQuery || queryFilter);
  const shownMemos = showMemoFilter || queryFilter || settings.HideDoneTasks ? memos.filter((memo2) => {
    var _a, _b, _c;
    let shouldShow = true;
    if (memo2.isDeleted) {
      shouldShow = false;
    }
    if (memo2.memoType !== void 0) {
      if (settings.HideDoneTasks && memo2.memoType === "TASK-DONE") {
        shouldShow = false;
      }
    }
    if (memo2.linkId) {
      shouldShow = false;
    }
    if (queryFilter) {
      const filters = JSON.parse(queryFilter.querystring);
      if (Array.isArray(filters)) {
        shouldShow = checkShouldShowMemoWithFilters(memo2, filters);
      }
    }
    if (tagQuery) {
      const tagsSet = /* @__PURE__ */ new Set();
      for (const t2 of Array.from((_a = memo2.content.match(TAG_REG)) != null ? _a : [])) {
        const tag = t2.replace(TAG_REG, "$1").trim();
        const items = tag.split("/");
        let temp = "";
        for (const i of items) {
          temp += i;
          tagsSet.add(temp);
          temp += "/";
        }
      }
      for (const t2 of Array.from((_b = memo2.content.match(NOP_FIRST_TAG_REG)) != null ? _b : [])) {
        const tag = t2.replace(NOP_FIRST_TAG_REG, "$1").trim();
        const items = tag.split("/");
        let temp = "";
        for (const i of items) {
          temp += i;
          tagsSet.add(temp);
          temp += "/";
        }
      }
      for (const t2 of Array.from((_c = memo2.content.match(FIRST_TAG_REG)) != null ? _c : [])) {
        const tag = t2.replace(FIRST_TAG_REG, "$2").trim();
        const items = tag.split("/");
        let temp = "";
        for (const i of items) {
          temp += i;
          tagsSet.add(temp);
          temp += "/";
        }
      }
      if (!tagsSet.has(tagQuery)) {
        shouldShow = false;
      }
    }
    if (duration && duration.from < duration.to && (utils$1.getTimeStampByDate(memo2.createdAt) < duration.from || utils$1.getTimeStampByDate(memo2.createdAt) > duration.to)) {
      shouldShow = false;
    }
    if (memoContentType) {
      if (memoContentType === "NOT_TAGGED" && (memo2.content.match(TAG_REG) !== null || memo2.content.match(NOP_FIRST_TAG_REG) !== null)) {
        shouldShow = false;
      } else if (memoContentType === "LINKED" && memo2.content.match(LINK_REG) === null) {
        shouldShow = false;
      } else if (memoContentType === "IMAGED" && memo2.content.match(IMAGE_URL_REG) === null) {
        shouldShow = false;
      } else if (memoContentType === "CONNECTED" && memo2.content.match(MEMO_LINK_REG) === null) {
        shouldShow = false;
      }
    }
    if (textQuery && !memo2.content.includes(textQuery)) {
      shouldShow = false;
    }
    return shouldShow;
  }) : memos.filter((memo2) => {
    return !memo2.linkId && !memo2.isDeleted;
  });
  copyShownMemos = shownMemos;
  const totalPages = Math.ceil(shownMemos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMemos = shownMemos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (page) => {
    var _a;
    setCurrentPage(page);
    (_a = wrapperElement.current) == null ? void 0 : _a.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  react.exports.useEffect(() => {
    setCurrentPage(1);
  }, [query, memos.length]);
  react.exports.useEffect(() => {
    setTimeout(() => {
      memoService.fetchAllMemos().then(() => {
        setFetchStatus(false);
      }).catch(() => {
        new require$$0.Notice(t$1("Fetch Error"));
      });
    }, 400);
    dailyNotesService.getMyAllDailyNotes().then(() => {
      setFetchStatus(false);
    }).catch(() => {
      new require$$0.Notice("\u{1F62D} Fetch DailyNotes Error");
    });
    dailyNotesService.getState();
    memoService.getState();
  }, []);
  react.exports.useEffect(() => {
    var _a;
    (_a = wrapperElement.current) == null ? void 0 : _a.scrollTo({
      top: 0
    });
  }, [query]);
  react.exports.useLayoutEffect(() => {
    const container = wrapperElement.current;
    if (!container) {
      return;
    }
    const cards = Array.from(container.querySelectorAll(".memo-wrapper"));
    const getMemoId = (el) => {
      var _a, _b;
      return (_b = (_a = /(?:^|\s)memos-([^\s]+)/.exec(el.className)) == null ? void 0 : _a[1]) != null ? _b : "";
    };
    const keys = cards.map(getMemoId);
    const prev = layoutSnapRef.current;
    const containerTop = container.getBoundingClientRect().top;
    const tops = cards.map((c) => c.getBoundingClientRect().top - containerTop);
    const firstIsNew = prev.keys.length > 0 && keys[0] !== prev.keys[0] && !prev.keys.includes(keys[0]);
    const lengthOk = keys.length === prev.keys.length + 1 || keys.length === prev.keys.length;
    const tailIsPrevHead = lengthOk && keys.slice(1).join("|") === prev.keys.slice(0, keys.length - 1).join("|");
    const isTopInsert = firstIsNew && lengthOk && tailIsPrevHead && Date.now() - lastInsertAnimRef.current > 2500;
    if (isTopInsert) {
      lastInsertAnimRef.current = Date.now();
      cards.forEach((card, idx) => {
        var _a;
        if (idx === 0) {
          return;
        }
        const delta = ((_a = prev.tops[idx - 1]) != null ? _a : 0) - tops[idx];
        if (Math.abs(delta) > 1) {
          const anim = card.animate([{
            transform: `translateY(${delta}px)`
          }, {
            transform: "none"
          }], {
            duration: 120,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
          });
          anim.onfinish = () => anim.cancel();
        }
      });
      const first = cards[0];
      if (first) {
        const anim = first.animate([{
          transform: "translateY(-150px)",
          opacity: 0,
          offset: 0
        }, {
          transform: "translateY(12px)",
          opacity: 1,
          offset: 0.55
        }, {
          transform: "translateY(-2px)",
          opacity: 1,
          offset: 0.82
        }, {
          transform: "none",
          opacity: 1,
          offset: 1
        }], {
          duration: 160,
          easing: "cubic-bezier(0.12, 0.8, 0.2, 1)"
        });
        anim.onfinish = () => anim.cancel();
      }
    }
    let removalAt = -1;
    if (prev.keys.length > 0 && keys.length === prev.keys.length - 1) {
      let j = 0;
      let missing = -1;
      let okSeq = true;
      for (let i = 0; i < prev.keys.length; i++) {
        if (j < keys.length && prev.keys[i] === keys[j]) {
          j++;
        } else if (missing === -1) {
          missing = i;
        } else {
          okSeq = false;
          break;
        }
      }
      if (okSeq && j === keys.length) {
        removalAt = missing;
      }
    }
    if (removalAt >= 0) {
      cards.forEach((card, idx) => {
        var _a;
        const prevIdx = idx < removalAt ? idx : idx + 1;
        const delta = ((_a = prev.tops[prevIdx]) != null ? _a : 0) - tops[idx];
        if (Math.abs(delta) > 1) {
          const anim = card.animate([{
            transform: `translateY(${delta}px)`
          }, {
            transform: "none"
          }], {
            duration: 160,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"
          });
          anim.onfinish = () => anim.cancel();
        }
      });
    }
    layoutSnapRef.current = {
      keys,
      tops
    };
  });
  const handleMemoListClick = react.exports.useCallback((event) => {
    const {
      workspace
    } = appStore.getState().dailyNotesState.app;
    const targetEl = event.target;
    if (targetEl.tagName === "SPAN" && targetEl.className === "tag-span") {
      const tagName = targetEl.innerText.slice(1);
      const currTagQuery = locationService.getState().query.tag;
      if (currTagQuery === tagName) {
        locationService.setTagQuery("");
      } else {
        locationService.setTagQuery(tagName);
      }
    } else if (targetEl.tagName === "A" && targetEl.className === "internal-link") {
      const sourcePath = targetEl.getAttribute("data-filepath") || "";
      if (sourcePath) {
        if (require$$0.Platform.isMobile) {
          workspace.openLinkText(sourcePath, sourcePath, false);
        } else {
          workspace.openLinkText(sourcePath, sourcePath, true);
        }
      }
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: `memolist-wrapper ${isFetching ? "" : "completed"}`,
    onClick: handleMemoListClick,
    ref: wrapperElement,
    children: [paginatedMemos.map((memo2) => /* @__PURE__ */ jsx(Memo$1, {
      memo: memo2
    }, `${memo2.id}-${memo2.updatedAt}`)), /* @__PURE__ */ jsx("div", {
      className: "status-text-container",
      children: /* @__PURE__ */ jsx("p", {
        className: "status-text",
        children: isFetching ? t$1("Fetching data...") : shownMemos.length === 0 ? t$1("Noooop!") : showMemoFilter ? "" : currentPage === totalPages ? t$1("All Data is Loaded \u{1F389}") : ""
      })
    }), !isFetching && shownMemos.length > 0 && /* @__PURE__ */ jsx(Pagination, {
      currentPage,
      totalPages,
      onPageChange: handlePageChange
    })]
  });
};
const CommentOnMemos = true;
const getMemosByDate = (memos) => {
  const dataArr = [];
  memos.map((mapItem) => {
    if (dataArr.length == 0) {
      dataArr.push({ date: require$$0.moment(mapItem.createdAt, "YYYY/MM/DD HH:mm:ss").format("YYYY-MM-DD"), have: [mapItem] });
    } else {
      const res = dataArr.some((item) => {
        if (item.date == require$$0.moment(mapItem.createdAt, "YYYY/MM/DD HH:mm:ss").format("YYYY-MM-DD")) {
          item.have.push(mapItem);
          return true;
        }
      });
      if (!res) {
        dataArr.push({ date: require$$0.moment(mapItem.createdAt, "YYYY/MM/DD HH:mm:ss").format("YYYY-MM-DD"), have: [mapItem] });
      }
    }
  });
  return dataArr;
};
const getCommentMemos = (memos) => {
  return memoService.getState().memos.filter((m2) => m2.linkId === memos.hasId).sort((a, b) => utils$1.getTimeStampByDate(a.createdAt) - utils$1.getTimeStampByDate(b.createdAt)).map((m2) => ({
    ...m2,
    createdAtStr: utils$1.getDateTimeString(m2.createdAt),
    dateStr: utils$1.getDateString(m2.createdAt)
  }));
};
const transferMemosIntoText = (memosArray) => {
  let outputText = "";
  let dataArr = [];
  let indent = "";
  const dailyNotesformat = getDailyNoteFormat();
  memosArray.map((mapItem) => {
    dataArr = mapItem.have;
    if (ShowDate) {
      outputText = outputText + "- [[" + require$$0.moment(mapItem.date, "YYYY-MM-DD").format(dailyNotesformat) + "]]\n";
      indent = "    ";
    }
    if (ShowTime) {
      for (let i = 0; i < dataArr.length; i++) {
        const time = require$$0.moment(dataArr[i].createdAt, "YYYY/MM/DD HH:mm:ss").format("HH:mm");
        let formatContent;
        if (DefaultMemoComposition != "" && /{TIME}/g.test(DefaultMemoComposition) && /{CONTENT}/g.test(DefaultMemoComposition)) {
          formatContent = DefaultMemoComposition.replace(/{TIME}/g, time).replace(/{CONTENT}/g, dataArr[i].content);
        } else {
          formatContent = time + " " + dataArr[i].content;
        }
        if (dataArr[i].memoType === "JOURNAL") {
          outputText = outputText + indent + "- " + formatContent + "\n";
        } else {
          if (dataArr[i].memoType === "TASK-TODO") {
            outputText = outputText + indent + "- [ ] " + formatContent + "\n";
          } else if (dataArr[i].memoType === "TASK-DONE") {
            outputText = outputText + indent + "- [x] " + formatContent + "\n";
          } else {
            const taskMark = dataArr[i].memoType.match(/TASK-(.*)?/g)[1];
            outputText = outputText + indent + "- [" + taskMark + "] " + formatContent + "\n";
          }
        }
        outputText = outputText.replace(/ \^\S{6}/g, "");
        {
          if (dataArr[i].hasId !== void 0) {
            const commentMemos = getCommentMemos(dataArr[i]);
            if (commentMemos.length > 0) {
              commentMemos.map((cm) => {
                let memoType = "- ";
                if (cm.memoType === "TASK-TODO") {
                  memoType = "- [ ] ";
                } else if (cm.memoType === "TASK-DONE") {
                  memoType = "- [x] ";
                } else if (cm.memoType.match(/TASK-(.*)?/g)) {
                  memoType = "- [" + cm.memoType.match(/TASK-(.*)?/g)[1] + "] ";
                }
                outputText = outputText + indent + (ShowDate ? "    " + memoType + "[[" + require$$0.moment(cm.createdAt).format(dailyNotesformat) + "]] " : "    " + memoType) + require$$0.moment(cm.createdAt).format("HH:mm") + " " + cm.content + "\n";
              });
            }
          }
        }
      }
    } else {
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].memoType === "JOURNAL") {
          outputText = outputText + indent + "- " + dataArr[i].content + "\n";
        } else {
          if (dataArr[i].memoType === "TASK-TODO") {
            outputText = outputText + indent + "- [ ] " + dataArr[i].content + "\n";
          } else if (dataArr[i].memoType === "TASK-DONE") {
            outputText = outputText + indent + "- [x] " + dataArr[i].content + "\n";
          } else {
            const taskMark = dataArr[i].memoType.match(/TASK-(.*)?/g)[1];
            outputText = outputText + indent + "- [" + taskMark + "] " + dataArr[i].content + "\n";
          }
        }
        outputText = outputText.replace(/ \^\S{6}/g, "");
        {
          if (dataArr[i].hasId !== void 0) {
            const commentMemos = getCommentMemos(dataArr[i]);
            if (commentMemos.length > 0) {
              commentMemos.map((cm) => {
                let memoType = "- ";
                if (cm.memoType === "TASK-TODO") {
                  memoType = "- [ ] ";
                } else if (cm.memoType === "TASK-DONE") {
                  memoType = "- [x] ";
                } else if (cm.memoType.match(/TASK-(.*)?/g)) {
                  memoType = "- [" + cm.memoType.match(/TASK-(.*)?/g)[1] + "] ";
                }
                outputText = outputText + indent + "    " + memoType + cm.content + "\n";
              });
            }
          }
        }
      }
    }
    if (ShowDate && AddBlankLineWhenDate && !CommentOnMemos) {
      outputText = outputText + "\n";
    }
  });
  return outputText.replace(/<br>/g, "\n    ");
};
const MemoFilter = () => {
  const {
    locationState: {
      query
    }
  } = react.exports.useContext(appContext);
  const {
    tag: tagQuery,
    duration,
    type: memoType,
    text: textQuery,
    filter
  } = query;
  const queryFilter = queryService.getQueryById(filter);
  const showFilter = Boolean(tagQuery || duration && duration.from < duration.to || memoType || textQuery || queryFilter);
  const handleCopyClick = async () => {
    if (!(copyShownMemos.length > 0)) {
      return;
    }
    const memosByDate = getMemosByDate(copyShownMemos);
    const queryDailyMemos = transferMemosIntoText(memosByDate);
    await utils$1.copyTextToClipboard(queryDailyMemos);
    new require$$0.Notice(t$1("Copied to clipboard Successfully"));
  };
  return /* @__PURE__ */ jsxs("div", {
    className: `filter-query-container ${showFilter ? "" : "hidden"}`,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "filter-query",
      children: [/* @__PURE__ */ jsx("span", {
        className: "tip-text",
        children: "FILTER: "
      }), /* @__PURE__ */ jsxs("div", {
        className: "filter-item-container " + (queryFilter ? "" : "hidden"),
        onClick: () => {
          locationService.setMemoFilter("");
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F516}"
        }), " ", queryFilter == null ? void 0 : queryFilter.title]
      }), /* @__PURE__ */ jsxs("div", {
        className: "filter-item-container " + (tagQuery ? "" : "hidden"),
        onClick: () => {
          locationService.setTagQuery("");
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F3F7}\uFE0F"
        }), " ", tagQuery]
      }), /* @__PURE__ */ jsxs("div", {
        className: "filter-item-container " + (memoType ? "" : "hidden"),
        onClick: () => {
          locationService.setMemoTypeQuery("");
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F4E6}"
        }), " ", getTextWithMemoType(memoType)]
      }), duration && duration.from < duration.to ? /* @__PURE__ */ jsxs("div", {
        className: "filter-item-container",
        onClick: () => {
          locationService.setFromAndToQuery(0, 0);
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F5D3}\uFE0F"
        }), " ", require$$0.moment(duration.from, "x").format("YYYY/MM/DD"), " ", t$1("to"), " ", require$$0.moment(duration.to, "x").add(1, "days").format("YYYY/MM/DD")]
      }) : null, /* @__PURE__ */ jsxs("div", {
        className: "filter-item-container " + (textQuery ? "" : "hidden"),
        onClick: () => {
          locationService.setTextQuery("");
        },
        children: [/* @__PURE__ */ jsx("span", {
          className: "icon-text",
          children: "\u{1F50D}"
        }), " ", textQuery]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "copy-memo",
      onClick: handleCopyClick,
      children: /* @__PURE__ */ jsx(SvgCopy, {
        className: "icon-img"
      })
    })]
  });
};
function Memos$1() {
  const {
    settingsState: {
      settings
    }
  } = react.exports.useContext(appContext);
  if (require$$0.Platform.isMobile && settings.DefaultEditorLocation === "Bottom") {
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(MemosHeader, {}), /* @__PURE__ */ jsx(MemoFilter, {}), /* @__PURE__ */ jsx(MemoList, {}), /* @__PURE__ */ jsx(MemoEditor, {})]
    });
  } else {
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [/* @__PURE__ */ jsx(MemosHeader, {}), /* @__PURE__ */ jsx(MemoEditor, {}), /* @__PURE__ */ jsx(MemoFilter, {}), /* @__PURE__ */ jsx(MemoList, {})]
    });
  }
}
const DeletedMemo = (props) => {
  const {
    memo: propsMemo,
    handleDeletedMemoAction
  } = props;
  const showSeconds = appStore.getState().settingsState.settings.TimeFormat !== "HH:mm";
  const deletedAtStr = propsMemo.deletedAt ? require$$0.moment(propsMemo.deletedAt, "YYYYMMDDHHmmss").format(showSeconds ? "YYYY/MM/DD HH:mm:ss" : "YYYY/MM/DD HH:mm") : utils$1.getDateTimeString(Date.now(), showSeconds);
  const memo2 = {
    ...propsMemo,
    createdAtStr: utils$1.getDateTimeString(propsMemo.createdAt, showSeconds),
    deletedAtStr
  };
  const [showConfirmDeleteBtn, toggleConfirmDeleteBtn] = useToggle(false);
  const rootRef = react.exports.useRef(null);
  const animateOut = (up) => {
    const el = rootRef.current;
    if (!el) {
      return Promise.resolve();
    }
    const anim = el.animate(up ? [{
      transform: "none",
      opacity: 1,
      offset: 0
    }, {
      transform: "translateY(-4px) scale(0.98)",
      opacity: 1,
      offset: 0.4
    }, {
      transform: "translateY(-14px) scale(0.96)",
      opacity: 0,
      offset: 1
    }] : [{
      transform: "none",
      opacity: 1,
      offset: 0
    }, {
      transform: "translateY(2px) scale(0.98)",
      opacity: 1,
      offset: 0.3
    }, {
      transform: "translateY(14px) scale(0.95)",
      opacity: 0,
      offset: 1
    }], {
      duration: 200,
      easing: "ease-in"
    });
    return anim.finished.catch(() => void 0);
  };
  const handleDeleteMemoClick = async () => {
    if (showConfirmDeleteBtn) {
      try {
        await animateOut(false);
        await memoService.deleteMemoById(memo2.id);
        handleDeletedMemoAction(memo2.id);
      } catch (error) {
        new require$$0.Notice(error.message);
      }
    } else {
      toggleConfirmDeleteBtn();
    }
  };
  const handleRestoreMemoClick = async () => {
    try {
      await animateOut(true);
      await memoService.restoreMemoById(memo2.id);
      handleDeletedMemoAction(memo2.id);
      new require$$0.Notice(t$1("RESTORE SUCCEED"));
    } catch (error) {
      new require$$0.Notice(error.message);
    }
  };
  const handleMouseLeaveMemoWrapper = () => {
    if (showConfirmDeleteBtn) {
      toggleConfirmDeleteBtn(false);
    }
  };
  const allMemos = memoService.getState().memos;
  let topParent = null;
  if (propsMemo.linkId) {
    let current = allMemos.find((m2) => m2.hasId === propsMemo.linkId);
    let guard = 0;
    while (current && current.linkId && guard < 10) {
      current = allMemos.find((m2) => m2.hasId === current.linkId) || null;
      guard++;
    }
    topParent = current;
  }
  const collectChildren = (parentHasId) => {
    const direct = allMemos.filter((m2) => m2.linkId === parentHasId);
    let result = [];
    for (const d of direct) {
      result = result.concat(d, collectChildren(d.hasId));
    }
    return result;
  };
  const childComments = propsMemo.hasId ? collectChildren(propsMemo.hasId) : [];
  return /* @__PURE__ */ jsxs("div", {
    ref: rootRef,
    className: `memo-wrapper ${"memos-" + memo2.id}`,
    onMouseLeave: handleMouseLeaveMemoWrapper,
    children: [/* @__PURE__ */ jsxs("div", {
      className: "memo-top-wrapper",
      children: [/* @__PURE__ */ jsxs("span", {
        className: "time-text",
        children: [t$1("DELETE AT"), " ", memo2.deletedAtStr]
      }), /* @__PURE__ */ jsxs("div", {
        className: "btns-container",
        children: [/* @__PURE__ */ jsx("span", {
          className: "btn more-action-btn",
          children: /* @__PURE__ */ jsx(SvgMore, {
            className: "icon-img"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "more-action-btns-wrapper",
          children: /* @__PURE__ */ jsxs("div", {
            className: "more-action-btns-container",
            children: [/* @__PURE__ */ jsx("span", {
              className: "btn restore-btn",
              onClick: handleRestoreMemoClick,
              children: t$1("RESTORE")
            }), /* @__PURE__ */ jsx("span", {
              className: `btn delete-btn ${showConfirmDeleteBtn ? "final-confirm" : ""}`,
              onClick: handleDeleteMemoClick,
              children: showConfirmDeleteBtn ? t$1("CONFIRM\uFF01") : t$1("DELETE")
            })]
          })
        })]
      })]
    }), topParent ? /* @__PURE__ */ jsxs("div", {
      className: "deleted-memo-parent",
      children: ["\u6765\u81EA: ", topParent.content.slice(0, 40)]
    }) : null, /* @__PURE__ */ jsx("div", {
      className: "memo-content-text",
      dangerouslySetInnerHTML: {
        __html: formatMemoContent(memo2.content)
      }
    }), /* @__PURE__ */ jsx(MemoImage, {
      memo: memo2.content
    }), childComments.length > 0 ? /* @__PURE__ */ jsxs("div", {
      className: "deleted-memo-children",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "deleted-memo-children-count",
        children: ["\u5305\u542B ", childComments.length, " \u6761\u5B50\u8BC4\u8BBA"]
      }), childComments.slice(0, 5).map((c) => /* @__PURE__ */ jsx("div", {
        className: "deleted-memo-child",
        dangerouslySetInnerHTML: {
          __html: formatMemoContent(c.content.trim())
        }
      }, c.id)), childComments.length > 5 ? /* @__PURE__ */ jsx("div", {
        className: "deleted-memo-children-more",
        children: "..."
      }) : null]
    }) : null]
  });
};
var memoTrash = "";
const MemoTrash = () => {
  const {
    locationState: {
      query
    },
    globalState: {
      isMobileView
    }
  } = react.exports.useContext(appContext);
  const loadingState = useLoading();
  const [deletedMemos, setDeletedMemos] = react.exports.useState([]);
  const {
    tag: tagQuery,
    duration,
    type: memoType,
    text: textQuery,
    filter: queryId
  } = query;
  const queryFilter = queryService.getQueryById(queryId);
  const showMemoFilter = Boolean(tagQuery || duration && duration.from < duration.to || memoType || textQuery || queryFilter);
  const shownMemos = showMemoFilter || queryFilter ? deletedMemos.filter((memo2) => {
    var _a, _b;
    let shouldShow = true;
    if (queryFilter) {
      const filters = JSON.parse(queryFilter.querystring);
      if (Array.isArray(filters)) {
        shouldShow = checkShouldShowMemoWithFilters(memo2, filters);
      }
    }
    if (tagQuery) {
      const tagsSet = /* @__PURE__ */ new Set();
      for (const t2 of Array.from((_a = memo2.content.match(TAG_REG)) != null ? _a : [])) {
        const tag = t2.replace(TAG_REG, "$1").trim();
        const items = tag.split("/");
        let temp = "";
        for (const i of items) {
          temp += i;
          tagsSet.add(temp);
          temp += "/";
        }
      }
      for (const t2 of Array.from((_b = memo2.content.match(NOP_FIRST_TAG_REG)) != null ? _b : [])) {
        const tag = t2.replace(NOP_FIRST_TAG_REG, "$1").trim();
        const items = tag.split("/");
        let temp = "";
        for (const i of items) {
          temp += i;
          tagsSet.add(temp);
          temp += "/";
        }
      }
      if (!tagsSet.has(tagQuery)) {
        shouldShow = false;
      }
    }
    if (duration && duration.from < duration.to && (utils$1.getTimeStampByDate(memo2.createdAt) < duration.from || utils$1.getTimeStampByDate(memo2.createdAt) > duration.to)) {
      shouldShow = false;
    }
    if (memoType) {
      if (memoType === "NOT_TAGGED" && memo2.content.match(TAG_REG) !== null) {
        shouldShow = false;
      } else if (memoType === "LINKED" && memo2.content.match(LINK_REG) === null) {
        shouldShow = false;
      } else if (memoType === "IMAGED" && memo2.content.match(IMAGE_URL_REG) === null) {
        shouldShow = false;
      } else if (memoType === "CONNECTED" && memo2.content.match(MEMO_LINK_REG) === null) {
        shouldShow = false;
      }
    }
    if (textQuery && !memo2.content.includes(textQuery)) {
      shouldShow = false;
    }
    return shouldShow;
  }) : deletedMemos;
  react.exports.useEffect(() => {
    memoService.fetchAllMemos();
    memoService.fetchDeletedMemos().then((result) => {
      if (result.length !== 0) {
        setDeletedMemos(result);
      }
    }).catch((error) => {
      new require$$0.Notice(t$1("Failed to fetch deleted memos: ") + error);
    }).finally(() => {
      loadingState.setFinish();
    });
    locationService.clearQuery();
  }, []);
  const handleDeletedMemoAction = react.exports.useCallback((memoId) => {
    setDeletedMemos((deletedMemos2) => deletedMemos2.filter((memo2) => memo2.id !== memoId));
  }, []);
  const handleShowSidebarBtnClick = react.exports.useCallback(() => {
    globalStateService.setShowSiderbarInMobileView(true);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "memo-trash-wrapper",
    children: [/* @__PURE__ */ jsx("div", {
      className: "section-header-container",
      children: /* @__PURE__ */ jsxs("div", {
        className: "title-text",
        children: [/* @__PURE__ */ jsx(Only, {
          when: isMobileView,
          children: /* @__PURE__ */ jsx("button", {
            className: "action-btn",
            onClick: handleShowSidebarBtnClick,
            children: /* @__PURE__ */ jsx(SvgMenu, {
              className: "icon-img"
            })
          })
        }), /* @__PURE__ */ jsx("span", {
          className: "normal-text",
          children: t$1("Recycle bin")
        })]
      })
    }), /* @__PURE__ */ jsx(MemoFilter, {}), loadingState.isLoading ? /* @__PURE__ */ jsx("div", {
      className: "tip-text-container",
      children: /* @__PURE__ */ jsx("p", {
        className: "tip-text",
        children: t$1("Fetching data...")
      })
    }) : deletedMemos.length === 0 ? /* @__PURE__ */ jsx("div", {
      className: "tip-text-container",
      children: /* @__PURE__ */ jsx("p", {
        className: "tip-text",
        children: t$1("Here is No Zettels.")
      })
    }) : /* @__PURE__ */ jsx("div", {
      className: "deleted-memos-container",
      children: shownMemos.map((memo2) => /* @__PURE__ */ jsx(DeletedMemo, {
        memo: memo2,
        handleDeletedMemoAction
      }, `${memo2.id}-${memo2.updatedAt}`))
    })]
  });
};
const homeRouter = {
  "/recycle": /* @__PURE__ */ jsx(MemoTrash, {}),
  "*": /* @__PURE__ */ jsx(Memos$1, {})
};
const routerSwitch = (router) => {
  return (pathname) => {
    for (const key of Object.keys(router)) {
      if (key === pathname) {
        return router[key];
      }
    }
    return router["*"];
  };
};
const appRouterSwitch = routerSwitch(appRouter);
const homeRouterSwitch = routerSwitch(homeRouter);
function StrictApp() {
  return /* @__PURE__ */ jsx(Provider, {
    store: appStore,
    context: appContext,
    children: /* @__PURE__ */ jsx(App, {})
  });
}
function App() {
  const {
    locationState: {
      pathname
    }
  } = react.exports.useContext(appContext);
  if (!appHasDailyNotesPluginLoaded_1() && !window.app.plugins.getPlugin("periodic-notes")) {
    new require$$0.Notice(t$1("Check if you opened Daily Notes Plugin Or Periodic Notes Plugin"));
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: appRouterSwitch(pathname)
  });
}
class Memos extends require$$0.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }
  getDisplayText() {
    return "Rememo";
  }
  getIcon() {
    return "Memos";
  }
  getViewType() {
    return MEMOS_VIEW_TYPE;
  }
  onMemosSettingsUpdate() {
    memoService.clearMemos();
    memoService.fetchAllMemos();
  }
  async onFileDeleted(file) {
    if (getDateFromFile_1(file, "day")) {
      await dailyNotesService.getMyAllDailyNotes();
      memoService.clearMemos();
      memoService.fetchAllMemos();
    }
  }
  async onFileModified(file) {
    const date = getDateFromFile_1(file, "day");
    console.log("debounce");
    if (globalStateService.getState().changedByMemos) {
      globalStateService.setChangedByMemos(false);
      return;
    }
    if (date && this.memosComponent) {
      memoService.fetchMemosFromFile(file);
    }
  }
  onFileCreated(file) {
    if (this.app.workspace.layoutReady && this.memosComponent) {
      if (getDateFromFile_1(file, "day")) {
        dailyNotesService.getMyAllDailyNotes();
      }
    }
  }
  async handleResize() {
    const leaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (leaves.length > 0) {
      const leaf = leaves[0];
      if (leaf.width > 875) {
        globalStateService.setIsMobileView(false);
        leaf.view.containerEl.classList.remove("mobile-view");
        globalStateService.setIsMobileView(leaf.width <= 875);
        return;
      }
      if (ShowLeftSideBar && !require$$0.Platform.isMobile) {
        return;
      }
      globalStateService.setIsMobileView(true);
      leaf.view.containerEl.classList.add("mobile-view");
      globalStateService.setIsMobileView(leaf.width <= 875);
    }
  }
  async onOpen() {
    this.onMemosSettingsUpdate = this.onMemosSettingsUpdate.bind(this);
    this.onFileCreated = this.onFileCreated.bind(this);
    this.onFileDeleted = this.onFileDeleted.bind(this);
    this.onFileModified = this.onFileModified.bind(this);
    this.registerEvent(
      this.app.workspace.on("obsidian-memos:settings-updated", this.onMemosSettingsUpdate)
    );
    this.registerEvent(this.app.vault.on("create", this.onFileCreated));
    this.registerEvent(this.app.vault.on("delete", this.onFileDeleted));
    this.registerEvent(this.app.vault.on("modify", require$$0.debounce(this.onFileModified, 2e3, true)));
    this.registerEvent(
      this.app.workspace.on("resize", () => {
        this.handleResize();
      })
    );
    dailyNotesService.getApp(this.app);
    appStore.dispatch({ type: "SET_SETTINGS", payload: { settings: this.plugin.settings } });
    InsertAfter = this.plugin.settings.InsertAfter;
    this.plugin.settings.UserName;
    ProcessEntriesBelow = this.plugin.settings.ProcessEntriesBelow;
    this.plugin.settings.DefaultPrefix;
    this.plugin.settings.DefaultEditorLocation;
    this.plugin.settings.UseButtonToShowEditor;
    FocusOnEditor = this.plugin.settings.FocusOnEditor;
    OpenDailyMemosWithMemos = this.plugin.settings.OpenDailyMemosWithMemos;
    this.plugin.settings.HideDoneTasks;
    this.plugin.settings.ShareFooterStart;
    this.plugin.settings.ShareFooterEnd;
    this.plugin.settings.OpenMemosAutomatically;
    ShowTime = this.plugin.settings.ShowTime;
    ShowDate = this.plugin.settings.ShowDate;
    AddBlankLineWhenDate = this.plugin.settings.AddBlankLineWhenDate;
    this.plugin.settings.AutoSaveWhenOnMobile;
    QueryFileName = this.plugin.settings.QueryFileName;
    this.plugin.settings.DeleteFileName;
    UseVaultTags = this.plugin.settings.UseVaultTags;
    this.plugin.settings.DefaultDarkBackgroundImage;
    this.plugin.settings.DefaultLightBackgroundImage;
    DefaultMemoComposition = this.plugin.settings.DefaultMemoComposition;
    this.plugin.settings.ShowTaskLabel;
    this.plugin.settings.ShowCommentOnMemos;
    UseDailyOrPeriodic = this.plugin.settings.UseDailyOrPeriodic;
    ShowLeftSideBar = this.plugin.settings.ShowLeftSideBar;
    this.memosComponent = React.createElement(StrictApp);
    ReactDOM.render(this.memosComponent, this.contentEl);
  }
  async onClose() {
  }
}
let InsertAfter;
let ProcessEntriesBelow;
let FocusOnEditor;
let OpenDailyMemosWithMemos;
let ShowTime;
let ShowDate;
let AddBlankLineWhenDate;
let QueryFileName;
let UseVaultTags;
let DefaultMemoComposition;
let UseDailyOrPeriodic;
let ShowLeftSideBar;
const icons = {
  Memos: `<svg t="1641348507339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2120" width="100" height="100"><path d="M126.692653 478.099639l-90.757281 0c-19.019408 0-34.437336 15.423923-34.437336 34.417356 0 18.992434 15.416929 34.477297 34.437336 34.477297l90.757281 0c19.013414 0 34.42335-15.484863 34.42335-34.477297C161.116003 493.523561 145.706067 478.099639 126.692653 478.099639zM244.662333 243.526943c13.742566-13.110184 14.310011-34.948836 1.185841-48.706388l-62.644762-65.668806c-13.128167-13.762547-34.974811-14.229091-48.717377-1.118906s-14.261059 34.911872-1.132893 48.674419l62.644762 65.668806C209.123074 256.13262 230.919767 256.637127 244.662333 243.526943zM543.066631 957.422083l-60.603757 0c-18.654764 0-33.794964 15.147193-33.794964 33.862898 0 18.661757 15.1402 32.71502 33.794964 32.71502l60.603757 0c18.654764 0 33.794964-14.053262 33.794964-32.71502C576.861595 972.568277 561.721395 957.422083 543.066631 957.422083zM988.076617 479.050709l-90.757281 0c-19.019408 0-34.437336 15.423923-34.437336 34.417356s15.416929 34.477297 34.437336 34.477297l90.757281 0c19.013414 0 34.42335-15.484863 34.42335-34.477297S1007.09003 479.050709 988.076617 479.050709zM512.268737 192.765564c-172.737143 0-312.75527 150.079292-312.75527 322.746503 0 125.630192 74.080583 233.957298 180.936128 283.703669l0 84.51838c0 16.762614 15.410935 31.35435 34.42335 31.35435 0.598415 0 1.193833-0.014985 1.785255-0.042958 0.618395 0.026974 1.239788 0.042958 1.867175 0.042958l187.479731 0c5.905227 0 11.455802-1.220807 16.288078-3.477601 12.231044-4.657447 20.795671-15.383962 20.795671-27.87575l0-84.052835c107.391021-49.534578 181.935151-158.147405 181.935151-284.168214C825.024007 342.843857 684.997888 192.765564 512.268737 192.765564zM574.863548 742.713968l0 80.17063c0 3.159911-0.221783 5.976158-0.642372 8.496694l0 19.092336-124.910895 0 0-17.71768c-0.423586-2.856208-0.642372-6.123015-0.642372-9.870351l0-80.443363c-99.204024-27.75387-171.970892-118.821847-171.970892-226.930167 0-130.094827 105.4689-245.507007 235.571719-245.507007s235.563727 115.41218 235.563727 245.507007C747.832465 623.984031 674.578074 715.293772 574.863548 742.713968zM895.407204 129.328576c-13.429872-13.429872-35.233558-13.439862-48.677416 0.004995l-64.174267 64.175266c-13.448853 13.448853-13.443858 35.257534-0.013986 48.687406 13.429872 13.429872 35.281511 13.477825 48.730364 0.028972l64.175266-64.175266C908.889025 164.605092 908.837076 142.758448 895.407204 129.328576zM511.796199 159.617967c18.992434 0 34.417356-15.410935 34.417356-34.42335l0-90.757281c0-19.019408-15.423923-34.437336-34.417356-34.437336-18.992434 0-34.477297 15.416929-34.477297 34.437336l0 90.757281C477.317903 144.208031 492.802766 159.617967 511.796199 159.617967z" fill="currentColor" p-id="2121"></path></svg>`
};
function addIcons() {
  Object.keys(icons).forEach((key) => {
    require$$0.addIcon(key, icons[key]);
  });
}
const DEFAULT_SETTINGS = {
  StartDate: "Sunday",
  InsertAfter: "# Journal",
  UserName: "MEMO \u{1F609}",
  ProcessEntriesBelow: "",
  Language: "en",
  ShareFooterStart: "{MemosNum} Memos {UsedDay} Day",
  ShareFooterEnd: "\u270D\uFE0F by {UserName}",
  DefaultPrefix: "List",
  UseDailyOrPeriodic: "Daily",
  DefaultEditorLocation: "Top",
  UseButtonToShowEditor: false,
  FocusOnEditor: true,
  OpenDailyMemosWithMemos: true,
  HideDoneTasks: false,
  ShowTaskLabel: false,
  OpenMemosAutomatically: false,
  ShowTime: true,
  ShowDate: true,
  AddBlankLineWhenDate: false,
  AutoSaveWhenOnMobile: false,
  DeleteFileName: "delete",
  QueryFileName: "query",
  UseVaultTags: false,
  DefaultLightBackgroundImage: "",
  DefaultDarkBackgroundImage: "",
  DefaultMemoComposition: "{TIME} {CONTENT}",
  ShowCommentOnMemos: false,
  ShowLeftSideBar: false,
  TimeFormat: "HH:mm:ss"
};
class MemosSettingTab extends require$$0.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.applyDebounceTimer = 0;
    this.plugin = plugin;
  }
  applySettingsUpdate() {
    clearTimeout(this.applyDebounceTimer);
    const plugin = this.plugin;
    this.applyDebounceTimer = window.setTimeout(() => {
      plugin.saveSettings();
    }, 100);
    memoService.updateTagsState();
  }
  async changeFileName(originalFileName, fileName) {
    const filePath = getDailyNotePath();
    const absolutePath = filePath + "/" + originalFileName + ".md";
    const newFilePath = filePath + "/" + fileName + ".md";
    const getFile = this.app.vault.getAbstractFileByPath(absolutePath);
    await this.app.fileManager.renameFile(getFile, newFilePath);
  }
  async hide() {
  }
  async display() {
    await this.plugin.loadSettings();
    const { containerEl } = this;
    this.containerEl.empty();
    this.containerEl.createEl("h1", { text: t$1("Basic Options") });
    new require$$0.Setting(containerEl).setName(t$1("User name in Memos")).setDesc(t$1("Set your user name here. 'Memos \u{1F60F}' By default")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.UserName).setValue(this.plugin.settings.UserName).onChange(async (value) => {
        this.plugin.settings.UserName = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Insert after heading")).setDesc(
      t$1("You should set the same heading below if you want to insert and process memos below the same heading.")
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.InsertAfter).setValue(this.plugin.settings.InsertAfter).onChange(async (value) => {
        this.plugin.settings.InsertAfter = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Process Memos below")).setDesc(
      t$1(
        "Only entries below this string/section in your notes will be processed. If it does not exist no notes will be processed for that file."
      )
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.ProcessEntriesBelow).setValue(this.plugin.settings.ProcessEntriesBelow).onChange(async (value) => {
        this.plugin.settings.ProcessEntriesBelow = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Focus on editor when open memos")).setDesc(t$1("Focus on editor when open memos. Focus by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.FocusOnEditor).onChange(async (value) => {
        this.plugin.settings.FocusOnEditor = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Open daily memos with open memos")).setDesc(t$1("Open daily memos with open memos. Open by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.OpenDailyMemosWithMemos).onChange(async (value) => {
        this.plugin.settings.OpenDailyMemosWithMemos = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Open Memos when obsidian opens")).setDesc(t$1("When enable this, Memos will open when Obsidian opens. False by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.OpenMemosAutomatically).onChange(async (value) => {
        this.plugin.settings.OpenMemosAutomatically = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Hide done tasks in Memo list")).setDesc(t$1("Hide all done tasks in Memo list. Show done tasks by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.HideDoneTasks).onChange(async (value) => {
        this.plugin.settings.HideDoneTasks = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Show Tasks Label")).setDesc(t$1("Show tasks label near the time text. False by default")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.ShowTaskLabel).onChange(async (value) => {
        this.plugin.settings.ShowTaskLabel = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Use Tags In Vault")).setDesc(t$1("Use tags in vault rather than only in Memos. False by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.UseVaultTags).onChange(async (value) => {
        this.plugin.settings.UseVaultTags = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Always Show Leaf Sidebar on PC")).setDesc(t$1("Show left sidebar on PC even when the leaf width is less than 875px. False by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.ShowLeftSideBar).onChange(async (value) => {
        this.plugin.settings.ShowLeftSideBar = value;
        this.applySettingsUpdate();
      })
    );
    this.containerEl.createEl("h1", { text: t$1("Advanced Options") });
    let dropdown;
    new require$$0.Setting(containerEl).setName(t$1("Default prefix")).setDesc(t$1("Set the default prefix when create memo, 'List' by default.")).addDropdown(async (d) => {
      dropdown = d;
      dropdown.addOption("List", t$1("List"));
      dropdown.addOption("Task", t$1("Task"));
      dropdown.setValue(this.plugin.settings.DefaultPrefix).onChange(async (value) => {
        this.plugin.settings.DefaultPrefix = value;
        this.applySettingsUpdate();
      });
    });
    new require$$0.Setting(containerEl).setName(t$1("Time display format")).setDesc(t$1("Time display format description")).addDropdown(async (d) => {
      dropdown = d;
      dropdown.addOption("HH:mm:ss", "HH:mm:ss");
      dropdown.addOption("HH:mm", "HH:mm");
      dropdown.setValue(this.plugin.settings.TimeFormat).onChange(async (value) => {
        this.plugin.settings.TimeFormat = value;
        this.applySettingsUpdate();
      });
    });
    new require$$0.Setting(containerEl).setName(t$1("Show Time When Copy Results")).setDesc(t$1("Show time when you copy results, like 12:00. Copy time by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.ShowTime).onChange(async (value) => {
        this.plugin.settings.ShowTime = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Show Date When Copy Results")).setDesc(t$1("Show date when you copy results, like [[2022-01-01]]. Copy date by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.ShowDate).onChange(async (value) => {
        this.plugin.settings.ShowDate = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Add Blank Line Between Different Date")).setDesc(t$1("Add blank line when copy result with date. No blank line by default.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.AddBlankLineWhenDate).onChange(async (value) => {
        this.plugin.settings.AddBlankLineWhenDate = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("File Name of Recycle Bin")).setDesc(t$1("Set the filename for recycle bin. 'delete' By default")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.DeleteFileName).setValue(this.plugin.settings.DeleteFileName).onChange(async (value) => {
        await this.changeFileName(this.plugin.settings.DeleteFileName, value);
        this.plugin.settings.DeleteFileName = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("File Name of Query File")).setDesc(t$1("Set the filename for query file. 'query' By default")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.QueryFileName).setValue(this.plugin.settings.QueryFileName).onChange(async (value) => {
        await this.changeFileName(this.plugin.settings.QueryFileName, value);
        this.plugin.settings.QueryFileName = value;
        this.applySettingsUpdate();
      })
    );
    this.containerEl.createEl("h1", { text: t$1("Mobile Options") });
    new require$$0.Setting(containerEl).setName(t$1("Default editor position on mobile")).setDesc(t$1("Set the default editor position on Mobile, 'Top' by default.")).addDropdown(async (d) => {
      dropdown = d;
      dropdown.addOption("Top", t$1("Top"));
      dropdown.addOption("Bottom", t$1("Bottom"));
      dropdown.setValue(this.plugin.settings.DefaultEditorLocation).onChange(async (value) => {
        this.plugin.settings.DefaultEditorLocation = value;
        this.applySettingsUpdate();
      });
    });
    new require$$0.Setting(containerEl).setName(t$1("Use button to show editor on mobile")).setDesc(t$1("Set a float button to call editor on mobile. Only when editor located at the bottom works.")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.UseButtonToShowEditor).onChange(async (value) => {
        this.plugin.settings.UseButtonToShowEditor = value;
        this.applySettingsUpdate();
      })
    );
    this.containerEl.createEl("h1", { text: t$1("Share Options") });
    new require$$0.Setting(containerEl).setName(t$1("Share Memos Image Footer Start")).setDesc(
      t$1(
        "Set anything you want here, use {MemosNum} to display Number of memos, {UsedDay} for days. '{MemosNum} Memos {UsedDay} Days' By default"
      )
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.ShareFooterStart).setValue(this.plugin.settings.ShareFooterStart).onChange(async (value) => {
        this.plugin.settings.ShareFooterStart = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Share Memos Image Footer End")).setDesc(t$1("Set anything you want here, use {UserName} as your username. '\u270D\uFE0F By {UserName}' By default")).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.ShareFooterEnd).setValue(this.plugin.settings.ShareFooterEnd).onChange(async (value) => {
        this.plugin.settings.ShareFooterEnd = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Background Image in Light Theme")).setDesc(t$1('Set background image in light theme. Set something like "Daily/one.png"')).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.DefaultLightBackgroundImage).setValue(this.plugin.settings.DefaultLightBackgroundImage).onChange(async (value) => {
        this.plugin.settings.DefaultLightBackgroundImage = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Background Image in Dark Theme")).setDesc(t$1('Set background image in dark theme. Set something like "Daily/one.png"')).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.DefaultDarkBackgroundImage).setValue(this.plugin.settings.DefaultDarkBackgroundImage).onChange(async (value) => {
        this.plugin.settings.DefaultDarkBackgroundImage = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Save Shared Image To Folder For Mobile")).setDesc(t$1("Save image to folder for mobile. False by Default")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.AutoSaveWhenOnMobile).onChange(async (value) => {
        this.plugin.settings.AutoSaveWhenOnMobile = value;
        this.applySettingsUpdate();
      })
    );
    this.containerEl.createEl("h1", { text: t$1("Experimental Options") });
    new require$$0.Setting(containerEl).setName(t$1("Use Which Plugin's Default Configuration")).setDesc(t$1("Memos use the plugin's default configuration to fetch memos from daily, 'Daily' by default.")).addDropdown(async (d) => {
      dropdown = d;
      dropdown.addOption("Daily", t$1("Daily"));
      dropdown.addOption("Periodic", "Periodic");
      dropdown.setValue(this.plugin.settings.UseDailyOrPeriodic).onChange(async (value) => {
        this.plugin.settings.UseDailyOrPeriodic = value;
        this.applySettingsUpdate();
      });
    });
    new require$$0.Setting(containerEl).setName(t$1("Default Memo Composition")).setDesc(
      t$1(
        'Set default memo composition, you should use {TIME} as "HH:mm" and {CONTENT} as content. "{TIME} {CONTENT}" by default'
      )
    ).addText(
      (text) => text.setPlaceholder(DEFAULT_SETTINGS.DefaultMemoComposition).setValue(this.plugin.settings.DefaultMemoComposition).onChange(async (value) => {
        this.plugin.settings.DefaultMemoComposition = value;
        this.applySettingsUpdate();
      })
    );
    new require$$0.Setting(containerEl).setName(t$1("Always Show Memo Comments")).setDesc(t$1("Always show memo comments on memos. False by default")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.ShowCommentOnMemos).onChange(async (value) => {
        this.plugin.settings.ShowCommentOnMemos = value;
        this.applySettingsUpdate();
      })
    );
    this.containerEl.createEl("h1", { text: t$1("Say Thank You") });
    new require$$0.Setting(containerEl).setName(t$1("Donate")).setDesc(t$1("If you like this plugin, consider donating to support continued development:")).addButton((bt) => {
      bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/boninall"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=boninall&button_colour=6495ED&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
    });
  }
}
class MemosPlugin extends require$$0.Plugin {
  async onload() {
    console.log("obsidian-memos loading...");
    await this.loadSettings();
    this.registerView(MEMOS_VIEW_TYPE, (leaf) => new Memos(leaf, this));
    this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));
    console.log(t$1("welcome"));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    appStore.dispatch({ type: "SET_SETTINGS", payload: { settings: this.settings } });
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(MEMOS_VIEW_TYPE);
    new require$$0.Notice(t$1("Close Memos Successfully"));
  }
  registerMobileEvent() {
    this.registerEvent(
      this.app.workspace.on("receive-text-menu", (menu, source) => {
        menu.addItem((item) => {
          item.setIcon("popup-open").setTitle(t$1("Insert as Memo")).onClick(async () => {
            const newMemo = await memoService.createMemo(source, false);
            memoService.pushMemo(newMemo);
          });
        });
      })
    );
    this.registerEvent(
      this.app.workspace.on("receive-files-menu", (menu, source) => {
        menu.addItem((item) => {
          item.setIcon("popup-open").setTitle(t$1("Insert file as memo content")).onClick(async () => {
            const fileName = source.map((file) => {
              return this.app.fileManager.generateMarkdownLink(file, file.path);
            });
            const newMemo = await memoService.createMemo(fileName.join("\n"), false);
            memoService.pushMemo(newMemo);
          });
        });
      })
    );
  }
  onRegisterProjectView(data, contentEl) {
    contentEl.createEl("h1", { text: "Debug" });
    const ul = contentEl.createEl("ul");
    for (const field of data.fields) {
      ul.createEl("li", {
        text: field.name
      });
    }
  }
  async onLayoutReady() {
    addIcons();
    this.addSettingTab(new MemosSettingTab(this.app, this));
    this.addCommand({
      id: "open-memos",
      name: "Open Memos",
      callback: () => this.openMemos(),
      hotkeys: []
    });
    this.addCommand({
      id: "focus-on-memos-editor",
      name: "Focus On Memos Editor",
      callback: () => this.focusOnEditor(),
      hotkeys: []
    });
    this.addCommand({
      id: "show-daily-memo",
      name: "Show Daily Memo",
      callback: () => this.openDailyMemo(),
      hotkeys: []
    });
    this.addCommand({
      id: "note-it",
      name: "Note It",
      callback: () => this.noteIt(),
      hotkeys: []
    });
    this.addCommand({
      id: "focus-on-search-bar",
      name: "Search It",
      callback: () => this.searchIt(),
      hotkeys: []
    });
    this.addCommand({
      id: "change-status",
      name: "Change Status Between Task Or List",
      callback: () => this.changeStatus(),
      hotkeys: []
    });
    this.addCommand({
      id: "show-memos-in-popover",
      name: "Show Memos in Popover",
      callback: () => this.showInPopover(),
      hotkeys: []
    });
    if (require$$0.Platform.isMobile) {
      this.registerMobileEvent();
    }
    this.addRibbonIcon("Memos", t$1("ribbonIconTitle"), () => {
      new require$$0.Notice(t$1("Open Memos Successfully"));
      this.openMemos();
    });
    const leaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (!(leaves.length > 0)) {
      return;
    }
    if (this.settings.FocusOnEditor) {
      const leaf = leaves[0];
      leaf.view.containerEl.querySelector("textarea").focus();
      return;
    }
    if (!this.settings.OpenMemosAutomatically) {
      return;
    }
    this.openMemos();
  }
  openDailyMemo() {
    const workspaceLeaves = this.app.workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (OpenDailyMemosWithMemos && workspaceLeaves.length === 0) {
      this.openMemos();
    }
    showDailyMemoDiaryDialog();
  }
  async openMemos() {
    const workspace = this.app.workspace;
    workspace.detachLeavesOfType(MEMOS_VIEW_TYPE);
    const leaf = workspace.getLeaf(true);
    await leaf.setViewState({ type: MEMOS_VIEW_TYPE });
    workspace.revealLeaf(leaf);
    if (!FocusOnEditor) {
      return;
    }
    if (leaf.view.containerEl.querySelector("textarea") !== void 0) {
      leaf.view.containerEl.querySelector("textarea").focus();
    }
  }
  searchIt() {
    const workspace = this.app.workspace;
    const leaves = workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (!(leaves.length > 0)) {
      this.openMemos();
      return;
    }
    const leaf = leaves[0];
    workspace.setActiveLeaf(leaf);
    leaf.view.containerEl.querySelector(".search-bar-inputer .text-input").focus();
  }
  focusOnEditor() {
    const workspace = this.app.workspace;
    const leaves = workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (!(leaves.length > 0)) {
      this.openMemos();
      return;
    }
    const leaf = leaves[0];
    workspace.setActiveLeaf(leaf);
    leaf.view.containerEl.querySelector("textarea").focus();
  }
  noteIt() {
    const workspace = this.app.workspace;
    const leaves = workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (!(leaves.length > 0)) {
      new require$$0.Notice(t$1("Please Open Memos First"));
      return;
    }
    const leaf = leaves[0];
    workspace.setActiveLeaf(leaf);
    leaf.view.containerEl.querySelector(".memo-editor .confirm-btn").click();
  }
  changeStatus() {
    const workspace = this.app.workspace;
    const leaves = workspace.getLeavesOfType(MEMOS_VIEW_TYPE);
    if (!(leaves.length > 0)) {
      new require$$0.Notice(t$1("Please Open Memos First"));
      return;
    }
    const leaf = leaves[0];
    workspace.setActiveLeaf(leaf);
    leaf.view.containerEl.querySelector(".list-or-task").click();
  }
  async showInPopover() {
    var _a;
    const workspace = this.app.workspace;
    workspace.detachLeavesOfType(MEMOS_VIEW_TYPE);
    const leaf = await ((_a = window.app.plugins.getPlugin("obsidian-hover-editor")) == null ? void 0 : _a.spawnPopover());
    await leaf.setViewState({ type: MEMOS_VIEW_TYPE });
    workspace.revealLeaf(leaf);
    leaf.view.containerEl.classList.add("mobile-view");
    if (!FocusOnEditor) {
      return;
    }
    if (leaf.view.containerEl.querySelector("textarea") !== void 0) {
      leaf.view.containerEl.querySelector("textarea").focus();
    }
  }
}
module.exports = MemosPlugin;
