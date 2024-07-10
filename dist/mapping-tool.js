var Yr = !1, Vr = !1, ee = [], Kr = -1;
function nc(t) {
  rc(t);
}
function rc(t) {
  ee.includes(t) || ee.push(t), ic();
}
function Ta(t) {
  let e = ee.indexOf(t);
  e !== -1 && e > Kr && ee.splice(e, 1);
}
function ic() {
  !Vr && !Yr && (Yr = !0, queueMicrotask(oc));
}
function oc() {
  Yr = !1, Vr = !0;
  for (let t = 0; t < ee.length; t++)
    ee[t](), Kr = t;
  ee.length = 0, Kr = -1, Vr = !1;
}
var ke, he, Pe, Oa, Gr = !0;
function ac(t) {
  Gr = !1, t(), Gr = !0;
}
function sc(t) {
  ke = t.reactive, Pe = t.release, he = (e) => t.effect(e, { scheduler: (n) => {
    Gr ? nc(n) : n();
  } }), Oa = t.raw;
}
function Eo(t) {
  he = t;
}
function uc(t) {
  let e = () => {
  };
  return [(r) => {
    let i = he(r);
    return t._x_effects || (t._x_effects = /* @__PURE__ */ new Set(), t._x_runEffects = () => {
      t._x_effects.forEach((o) => o());
    }), t._x_effects.add(i), e = () => {
      i !== void 0 && (t._x_effects.delete(i), Pe(i));
    }, i;
  }, () => {
    e();
  }];
}
function Ca(t, e) {
  let n = !0, r, i = he(() => {
    let o = t();
    JSON.stringify(o), n ? r = o : queueMicrotask(() => {
      e(o, r), r = o;
    }), n = !1;
  });
  return () => Pe(i);
}
var ka = [], Pa = [], Da = [];
function cc(t) {
  Da.push(t);
}
function Ai(t, e) {
  typeof e == "function" ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e)) : (e = t, Pa.push(e));
}
function Na(t) {
  ka.push(t);
}
function La(t, e, n) {
  t._x_attributeCleanups || (t._x_attributeCleanups = {}), t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []), t._x_attributeCleanups[e].push(n);
}
function $a(t, e) {
  t._x_attributeCleanups && Object.entries(t._x_attributeCleanups).forEach(([n, r]) => {
    (e === void 0 || e.includes(n)) && (r.forEach((i) => i()), delete t._x_attributeCleanups[n]);
  });
}
function fc(t) {
  if (t._x_cleanups)
    for (; t._x_cleanups.length; )
      t._x_cleanups.pop()();
}
var Ei = new MutationObserver(ki), Ti = !1;
function Oi() {
  Ei.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), Ti = !0;
}
function Ia() {
  lc(), Ei.disconnect(), Ti = !1;
}
var Ue = [];
function lc() {
  let t = Ei.takeRecords();
  Ue.push(() => t.length > 0 && ki(t));
  let e = Ue.length;
  queueMicrotask(() => {
    if (Ue.length === e)
      for (; Ue.length > 0; )
        Ue.shift()();
  });
}
function ot(t) {
  if (!Ti)
    return t();
  Ia();
  let e = t();
  return Oi(), e;
}
var Ci = !1, Hn = [];
function hc() {
  Ci = !0;
}
function dc() {
  Ci = !1, ki(Hn), Hn = [];
}
function ki(t) {
  if (Ci) {
    Hn = Hn.concat(t);
    return;
  }
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (let o = 0; o < t.length; o++)
    if (!t[o].target._x_ignoreMutationObserver && (t[o].type === "childList" && (t[o].addedNodes.forEach((a) => a.nodeType === 1 && e.add(a)), t[o].removedNodes.forEach((a) => a.nodeType === 1 && n.add(a))), t[o].type === "attributes")) {
      let a = t[o].target, s = t[o].attributeName, u = t[o].oldValue, f = () => {
        r.has(a) || r.set(a, []), r.get(a).push({ name: s, value: a.getAttribute(s) });
      }, d = () => {
        i.has(a) || i.set(a, []), i.get(a).push(s);
      };
      a.hasAttribute(s) && u === null ? f() : a.hasAttribute(s) ? (d(), f()) : d();
    }
  i.forEach((o, a) => {
    $a(a, o);
  }), r.forEach((o, a) => {
    ka.forEach((s) => s(a, o));
  });
  for (let o of n)
    e.has(o) || Pa.forEach((a) => a(o));
  e.forEach((o) => {
    o._x_ignoreSelf = !0, o._x_ignore = !0;
  });
  for (let o of e)
    n.has(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, Da.forEach((a) => a(o)), o._x_ignore = !0, o._x_ignoreSelf = !0);
  e.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }), e = null, n = null, r = null, i = null;
}
function Fa(t) {
  return dn(xe(t));
}
function hn(t, e, n) {
  return t._x_dataStack = [e, ...xe(n || t)], () => {
    t._x_dataStack = t._x_dataStack.filter((r) => r !== e);
  };
}
function xe(t) {
  return t._x_dataStack ? t._x_dataStack : typeof ShadowRoot == "function" && t instanceof ShadowRoot ? xe(t.host) : t.parentNode ? xe(t.parentNode) : [];
}
function dn(t) {
  return new Proxy({ objects: t }, pc);
}
var pc = {
  ownKeys({ objects: t }) {
    return Array.from(
      new Set(t.flatMap((e) => Object.keys(e)))
    );
  },
  has({ objects: t }, e) {
    return e == Symbol.unscopables ? !1 : t.some(
      (n) => Object.prototype.hasOwnProperty.call(n, e) || Reflect.has(n, e)
    );
  },
  get({ objects: t }, e, n) {
    return e == "toJSON" ? gc : Reflect.get(
      t.find(
        (r) => Reflect.has(r, e)
      ) || {},
      e,
      n
    );
  },
  set({ objects: t }, e, n, r) {
    const i = t.find(
      (a) => Object.prototype.hasOwnProperty.call(a, e)
    ) || t[t.length - 1], o = Object.getOwnPropertyDescriptor(i, e);
    return o != null && o.set && (o != null && o.get) ? o.set.call(r, n) || !0 : Reflect.set(i, e, n);
  }
};
function gc() {
  return Reflect.ownKeys(this).reduce((e, n) => (e[n] = Reflect.get(this, n), e), {});
}
function Ra(t) {
  let e = (r) => typeof r == "object" && !Array.isArray(r) && r !== null, n = (r, i = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([o, { value: a, enumerable: s }]) => {
      if (s === !1 || a === void 0 || typeof a == "object" && a !== null && a.__v_skip)
        return;
      let u = i === "" ? o : `${i}.${o}`;
      typeof a == "object" && a !== null && a._x_interceptor ? r[o] = a.initialize(t, u, o) : e(a) && a !== r && !(a instanceof Element) && n(a, u);
    });
  };
  return n(t);
}
function Ua(t, e = () => {
}) {
  let n = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(r, i, o) {
      return t(this.initialValue, () => mc(r, i), (a) => Xr(r, i, a), i, o);
    }
  };
  return e(n), (r) => {
    if (typeof r == "object" && r !== null && r._x_interceptor) {
      let i = n.initialize.bind(n);
      n.initialize = (o, a, s) => {
        let u = r.initialize(o, a, s);
        return n.initialValue = u, i(o, a, s);
      };
    } else
      n.initialValue = r;
    return n;
  };
}
function mc(t, e) {
  return e.split(".").reduce((n, r) => n[r], t);
}
function Xr(t, e, n) {
  if (typeof e == "string" && (e = e.split(".")), e.length === 1)
    t[e[0]] = n;
  else {
    if (e.length === 0)
      throw error;
    return t[e[0]] || (t[e[0]] = {}), Xr(t[e[0]], e.slice(1), n);
  }
}
var Ha = {};
function St(t, e) {
  Ha[t] = e;
}
function Zr(t, e) {
  return Object.entries(Ha).forEach(([n, r]) => {
    let i = null;
    function o() {
      if (i)
        return i;
      {
        let [a, s] = Ya(e);
        return i = { interceptor: Ua, ...a }, Ai(e, s), i;
      }
    }
    Object.defineProperty(t, `$${n}`, {
      get() {
        return r(e, o());
      },
      enumerable: !1
    });
  }), t;
}
function vc(t, e, n, ...r) {
  try {
    return n(...r);
  } catch (i) {
    rn(i, t, e);
  }
}
function rn(t, e, n = void 0) {
  t = Object.assign(
    t ?? { message: "No error message given." },
    { el: e, expression: n }
  ), console.warn(`Alpine Expression Error: ${t.message}

${n ? 'Expression: "' + n + `"

` : ""}`, e), setTimeout(() => {
    throw t;
  }, 0);
}
var Nn = !0;
function ja(t) {
  let e = Nn;
  Nn = !1;
  let n = t();
  return Nn = e, n;
}
function ne(t, e, n = {}) {
  let r;
  return mt(t, e)((i) => r = i, n), r;
}
function mt(...t) {
  return Wa(...t);
}
var Wa = Ba;
function yc(t) {
  Wa = t;
}
function Ba(t, e) {
  let n = {};
  Zr(n, t);
  let r = [n, ...xe(t)], i = typeof e == "function" ? _c(r, e) : wc(r, e, t);
  return vc.bind(null, t, e, i);
}
function _c(t, e) {
  return (n = () => {
  }, { scope: r = {}, params: i = [] } = {}) => {
    let o = e.apply(dn([r, ...t]), i);
    jn(n, o);
  };
}
var kr = {};
function bc(t, e) {
  if (kr[t])
    return kr[t];
  let n = Object.getPrototypeOf(async function() {
  }).constructor, r = /^[\n\s]*if.*\(.*\)/.test(t.trim()) || /^(let|const)\s/.test(t.trim()) ? `(async()=>{ ${t} })()` : t, o = (() => {
    try {
      let a = new n(
        ["__self", "scope"],
        `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`
      );
      return Object.defineProperty(a, "name", {
        value: `[Alpine] ${t}`
      }), a;
    } catch (a) {
      return rn(a, e, t), Promise.resolve();
    }
  })();
  return kr[t] = o, o;
}
function wc(t, e, n) {
  let r = bc(e, n);
  return (i = () => {
  }, { scope: o = {}, params: a = [] } = {}) => {
    r.result = void 0, r.finished = !1;
    let s = dn([o, ...t]);
    if (typeof r == "function") {
      let u = r(r, s).catch((f) => rn(f, n, e));
      r.finished ? (jn(i, r.result, s, a, n), r.result = void 0) : u.then((f) => {
        jn(i, f, s, a, n);
      }).catch((f) => rn(f, n, e)).finally(() => r.result = void 0);
    }
  };
}
function jn(t, e, n, r, i) {
  if (Nn && typeof e == "function") {
    let o = e.apply(n, r);
    o instanceof Promise ? o.then((a) => jn(t, a, n, r)).catch((a) => rn(a, i, e)) : t(o);
  } else typeof e == "object" && e instanceof Promise ? e.then((o) => t(o)) : t(e);
}
var Pi = "x-";
function De(t = "") {
  return Pi + t;
}
function xc(t) {
  Pi = t;
}
var Wn = {};
function nt(t, e) {
  return Wn[t] = e, {
    before(n) {
      if (!Wn[n]) {
        console.warn(String.raw`Cannot find directive \`${n}\`. \`${t}\` will use the default order of execution`);
        return;
      }
      const r = te.indexOf(n);
      te.splice(r >= 0 ? r : te.indexOf("DEFAULT"), 0, t);
    }
  };
}
function Mc(t) {
  return Object.keys(Wn).includes(t);
}
function Di(t, e, n) {
  if (e = Array.from(e), t._x_virtualDirectives) {
    let o = Object.entries(t._x_virtualDirectives).map(([s, u]) => ({ name: s, value: u })), a = qa(o);
    o = o.map((s) => a.find((u) => u.name === s.name) ? {
      name: `x-bind:${s.name}`,
      value: `"${s.value}"`
    } : s), e = e.concat(o);
  }
  let r = {};
  return e.map(Ga((o, a) => r[o] = a)).filter(Za).map(Ec(r, n)).sort(Tc).map((o) => Ac(t, o));
}
function qa(t) {
  return Array.from(t).map(Ga()).filter((e) => !Za(e));
}
var Jr = !1, Ve = /* @__PURE__ */ new Map(), za = Symbol();
function Sc(t) {
  Jr = !0;
  let e = Symbol();
  za = e, Ve.set(e, []);
  let n = () => {
    for (; Ve.get(e).length; )
      Ve.get(e).shift()();
    Ve.delete(e);
  }, r = () => {
    Jr = !1, n();
  };
  t(n), r();
}
function Ya(t) {
  let e = [], n = (s) => e.push(s), [r, i] = uc(t);
  return e.push(i), [{
    Alpine: gn,
    effect: r,
    cleanup: n,
    evaluateLater: mt.bind(mt, t),
    evaluate: ne.bind(ne, t)
  }, () => e.forEach((s) => s())];
}
function Ac(t, e) {
  let n = () => {
  }, r = Wn[e.type] || n, [i, o] = Ya(t);
  La(t, e.original, o);
  let a = () => {
    t._x_ignore || t._x_ignoreSelf || (r.inline && r.inline(t, e, i), r = r.bind(r, t, e, i), Jr ? Ve.get(za).push(r) : r());
  };
  return a.runCleanups = o, a;
}
var Va = (t, e) => ({ name: n, value: r }) => (n.startsWith(t) && (n = n.replace(t, e)), { name: n, value: r }), Ka = (t) => t;
function Ga(t = () => {
}) {
  return ({ name: e, value: n }) => {
    let { name: r, value: i } = Xa.reduce((o, a) => a(o), { name: e, value: n });
    return r !== e && t(r, e), { name: r, value: i };
  };
}
var Xa = [];
function Ni(t) {
  Xa.push(t);
}
function Za({ name: t }) {
  return Ja().test(t);
}
var Ja = () => new RegExp(`^${Pi}([^:^.]+)\\b`);
function Ec(t, e) {
  return ({ name: n, value: r }) => {
    let i = n.match(Ja()), o = n.match(/:([a-zA-Z0-9\-_:]+)/), a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], s = e || t[n] || n;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((u) => u.replace(".", "")),
      expression: r,
      original: s
    };
  };
}
var Qr = "DEFAULT", te = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  Qr,
  "teleport"
];
function Tc(t, e) {
  let n = te.indexOf(t.type) === -1 ? Qr : t.type, r = te.indexOf(e.type) === -1 ? Qr : e.type;
  return te.indexOf(n) - te.indexOf(r);
}
function tn(t, e, n = {}) {
  t.dispatchEvent(
    new CustomEvent(e, {
      detail: n,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function Wt(t, e) {
  if (typeof ShadowRoot == "function" && t instanceof ShadowRoot) {
    Array.from(t.children).forEach((i) => Wt(i, e));
    return;
  }
  let n = !1;
  if (e(t, () => n = !0), n)
    return;
  let r = t.firstElementChild;
  for (; r; )
    Wt(r, e), r = r.nextElementSibling;
}
function xt(t, ...e) {
  console.warn(`Alpine Warning: ${t}`, ...e);
}
var To = !1;
function Oc() {
  To && xt("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), To = !0, document.body || xt("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), tn(document, "alpine:init"), tn(document, "alpine:initializing"), Oi(), cc((e) => Ft(e, Wt)), Ai((e) => os(e)), Na((e, n) => {
    Di(e, n).forEach((r) => r());
  });
  let t = (e) => !rr(e.parentElement, !0);
  Array.from(document.querySelectorAll(es().join(","))).filter(t).forEach((e) => {
    Ft(e);
  }), tn(document, "alpine:initialized"), setTimeout(() => {
    Pc();
  });
}
var Li = [], Qa = [];
function ts() {
  return Li.map((t) => t());
}
function es() {
  return Li.concat(Qa).map((t) => t());
}
function ns(t) {
  Li.push(t);
}
function rs(t) {
  Qa.push(t);
}
function rr(t, e = !1) {
  return pn(t, (n) => {
    if ((e ? es() : ts()).some((i) => n.matches(i)))
      return !0;
  });
}
function pn(t, e) {
  if (t) {
    if (e(t))
      return t;
    if (t._x_teleportBack && (t = t._x_teleportBack), !!t.parentElement)
      return pn(t.parentElement, e);
  }
}
function Cc(t) {
  return ts().some((e) => t.matches(e));
}
var is = [];
function kc(t) {
  is.push(t);
}
function Ft(t, e = Wt, n = () => {
}) {
  Sc(() => {
    e(t, (r, i) => {
      n(r, i), is.forEach((o) => o(r, i)), Di(r, r.attributes).forEach((o) => o()), r._x_ignore && i();
    });
  });
}
function os(t, e = Wt) {
  e(t, (n) => {
    $a(n), fc(n);
  });
}
function Pc() {
  [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ].forEach(([e, n, r]) => {
    Mc(n) || r.some((i) => {
      if (document.querySelector(i))
        return xt(`found "${i}", but missing ${e} plugin`), !0;
    });
  });
}
var ti = [], $i = !1;
function Ii(t = () => {
}) {
  return queueMicrotask(() => {
    $i || setTimeout(() => {
      ei();
    });
  }), new Promise((e) => {
    ti.push(() => {
      t(), e();
    });
  });
}
function ei() {
  for ($i = !1; ti.length; )
    ti.shift()();
}
function Dc() {
  $i = !0;
}
function Fi(t, e) {
  return Array.isArray(e) ? Oo(t, e.join(" ")) : typeof e == "object" && e !== null ? Nc(t, e) : typeof e == "function" ? Fi(t, e()) : Oo(t, e);
}
function Oo(t, e) {
  let n = (i) => i.split(" ").filter((o) => !t.classList.contains(o)).filter(Boolean), r = (i) => (t.classList.add(...i), () => {
    t.classList.remove(...i);
  });
  return e = e === !0 ? e = "" : e || "", r(n(e));
}
function Nc(t, e) {
  let n = (s) => s.split(" ").filter(Boolean), r = Object.entries(e).flatMap(([s, u]) => u ? n(s) : !1).filter(Boolean), i = Object.entries(e).flatMap(([s, u]) => u ? !1 : n(s)).filter(Boolean), o = [], a = [];
  return i.forEach((s) => {
    t.classList.contains(s) && (t.classList.remove(s), a.push(s));
  }), r.forEach((s) => {
    t.classList.contains(s) || (t.classList.add(s), o.push(s));
  }), () => {
    a.forEach((s) => t.classList.add(s)), o.forEach((s) => t.classList.remove(s));
  };
}
function ir(t, e) {
  return typeof e == "object" && e !== null ? Lc(t, e) : $c(t, e);
}
function Lc(t, e) {
  let n = {};
  return Object.entries(e).forEach(([r, i]) => {
    n[r] = t.style[r], r.startsWith("--") || (r = Ic(r)), t.style.setProperty(r, i);
  }), setTimeout(() => {
    t.style.length === 0 && t.removeAttribute("style");
  }), () => {
    ir(t, n);
  };
}
function $c(t, e) {
  let n = t.getAttribute("style", e);
  return t.setAttribute("style", e), () => {
    t.setAttribute("style", n || "");
  };
}
function Ic(t) {
  return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function ni(t, e = () => {
}) {
  let n = !1;
  return function() {
    n ? e.apply(this, arguments) : (n = !0, t.apply(this, arguments));
  };
}
nt("transition", (t, { value: e, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? Rc(t, n, e) : Fc(t, r, e));
});
function Fc(t, e, n) {
  as(t, Fi, ""), {
    enter: (i) => {
      t._x_transition.enter.during = i;
    },
    "enter-start": (i) => {
      t._x_transition.enter.start = i;
    },
    "enter-end": (i) => {
      t._x_transition.enter.end = i;
    },
    leave: (i) => {
      t._x_transition.leave.during = i;
    },
    "leave-start": (i) => {
      t._x_transition.leave.start = i;
    },
    "leave-end": (i) => {
      t._x_transition.leave.end = i;
    }
  }[n](e);
}
function Rc(t, e, n) {
  as(t, ir);
  let r = !e.includes("in") && !e.includes("out") && !n, i = r || e.includes("in") || ["enter"].includes(n), o = r || e.includes("out") || ["leave"].includes(n);
  e.includes("in") && !r && (e = e.filter((x, S) => S < e.indexOf("out"))), e.includes("out") && !r && (e = e.filter((x, S) => S > e.indexOf("out")));
  let a = !e.includes("opacity") && !e.includes("scale"), s = a || e.includes("opacity"), u = a || e.includes("scale"), f = s ? 0 : 1, d = u ? He(e, "scale", 95) / 100 : 1, l = He(e, "delay", 0) / 1e3, c = He(e, "origin", "center"), h = "opacity, transform", p = He(e, "duration", 150) / 1e3, g = He(e, "duration", 75) / 1e3, v = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i && (t._x_transition.enter.during = {
    transformOrigin: c,
    transitionDelay: `${l}s`,
    transitionProperty: h,
    transitionDuration: `${p}s`,
    transitionTimingFunction: v
  }, t._x_transition.enter.start = {
    opacity: f,
    transform: `scale(${d})`
  }, t._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), o && (t._x_transition.leave.during = {
    transformOrigin: c,
    transitionDelay: `${l}s`,
    transitionProperty: h,
    transitionDuration: `${g}s`,
    transitionTimingFunction: v
  }, t._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, t._x_transition.leave.end = {
    opacity: f,
    transform: `scale(${d})`
  });
}
function as(t, e, n = {}) {
  t._x_transition || (t._x_transition = {
    enter: { during: n, start: n, end: n },
    leave: { during: n, start: n, end: n },
    in(r = () => {
    }, i = () => {
    }) {
      ri(t, e, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, r, i);
    },
    out(r = () => {
    }, i = () => {
    }) {
      ri(t, e, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, r, i);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(t, e, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let o = () => i(n);
  if (e) {
    t._x_transition && (t._x_transition.enter || t._x_transition.leave) ? t._x_transition.enter && (Object.entries(t._x_transition.enter.during).length || Object.entries(t._x_transition.enter.start).length || Object.entries(t._x_transition.enter.end).length) ? t._x_transition.in(n) : o() : t._x_transition ? t._x_transition.in(n) : o();
    return;
  }
  t._x_hidePromise = t._x_transition ? new Promise((a, s) => {
    t._x_transition.out(() => {
    }, () => a(r)), t._x_transitioning && t._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(r), queueMicrotask(() => {
    let a = ss(t);
    a ? (a._x_hideChildren || (a._x_hideChildren = []), a._x_hideChildren.push(t)) : i(() => {
      let s = (u) => {
        let f = Promise.all([
          u._x_hidePromise,
          ...(u._x_hideChildren || []).map(s)
        ]).then(([d]) => d == null ? void 0 : d());
        return delete u._x_hidePromise, delete u._x_hideChildren, f;
      };
      s(t).catch((u) => {
        if (!u.isFromCancelledTransition)
          throw u;
      });
    });
  });
};
function ss(t) {
  let e = t.parentNode;
  if (e)
    return e._x_hidePromise ? e : ss(e);
}
function ri(t, e, { during: n, start: r, end: i } = {}, o = () => {
}, a = () => {
}) {
  if (t._x_transitioning && t._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0) {
    o(), a();
    return;
  }
  let s, u, f;
  Uc(t, {
    start() {
      s = e(t, r);
    },
    during() {
      u = e(t, n);
    },
    before: o,
    end() {
      s(), f = e(t, i);
    },
    after: a,
    cleanup() {
      u(), f();
    }
  });
}
function Uc(t, e) {
  let n, r, i, o = ni(() => {
    ot(() => {
      n = !0, r || e.before(), i || (e.end(), ei()), e.after(), t.isConnected && e.cleanup(), delete t._x_transitioning;
    });
  });
  t._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: ni(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      o();
    }),
    finish: o
  }, ot(() => {
    e.start(), e.during();
  }), Dc(), requestAnimationFrame(() => {
    if (n)
      return;
    let a = Number(getComputedStyle(t).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, s = Number(getComputedStyle(t).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    a === 0 && (a = Number(getComputedStyle(t).animationDuration.replace("s", "")) * 1e3), ot(() => {
      e.before();
    }), r = !0, requestAnimationFrame(() => {
      n || (ot(() => {
        e.end();
      }), ei(), setTimeout(t._x_transitioning.finish, a + s), i = !0);
    });
  });
}
function He(t, e, n) {
  if (t.indexOf(e) === -1)
    return n;
  const r = t[t.indexOf(e) + 1];
  if (!r || e === "scale" && isNaN(r))
    return n;
  if (e === "duration" || e === "delay") {
    let i = r.match(/([0-9]+)ms/);
    if (i)
      return i[1];
  }
  return e === "origin" && ["top", "right", "left", "center", "bottom"].includes(t[t.indexOf(e) + 2]) ? [r, t[t.indexOf(e) + 2]].join(" ") : r;
}
var Bt = !1;
function Gt(t, e = () => {
}) {
  return (...n) => Bt ? e(...n) : t(...n);
}
function Hc(t) {
  return (...e) => Bt && t(...e);
}
var us = [];
function or(t) {
  us.push(t);
}
function jc(t, e) {
  us.forEach((n) => n(t, e)), Bt = !0, cs(() => {
    Ft(e, (n, r) => {
      r(n, () => {
      });
    });
  }), Bt = !1;
}
var ii = !1;
function Wc(t, e) {
  e._x_dataStack || (e._x_dataStack = t._x_dataStack), Bt = !0, ii = !0, cs(() => {
    Bc(e);
  }), Bt = !1, ii = !1;
}
function Bc(t) {
  let e = !1;
  Ft(t, (r, i) => {
    Wt(r, (o, a) => {
      if (e && Cc(o))
        return a();
      e = !0, i(o, a);
    });
  });
}
function cs(t) {
  let e = he;
  Eo((n, r) => {
    let i = e(n);
    return Pe(i), () => {
    };
  }), t(), Eo(e);
}
function fs(t, e, n, r = []) {
  switch (t._x_bindings || (t._x_bindings = ke({})), t._x_bindings[e] = n, e = r.includes("camel") ? Zc(e) : e, e) {
    case "value":
      qc(t, n);
      break;
    case "style":
      Yc(t, n);
      break;
    case "class":
      zc(t, n);
      break;
    case "selected":
    case "checked":
      Vc(t, e, n);
      break;
    default:
      ls(t, e, n);
      break;
  }
}
function qc(t, e) {
  if (t.type === "radio")
    t.attributes.value === void 0 && (t.value = e), window.fromModel && (typeof e == "boolean" ? t.checked = Ln(t.value) === e : t.checked = Co(t.value, e));
  else if (t.type === "checkbox")
    Number.isInteger(e) ? t.value = e : !Array.isArray(e) && typeof e != "boolean" && ![null, void 0].includes(e) ? t.value = String(e) : Array.isArray(e) ? t.checked = e.some((n) => Co(n, t.value)) : t.checked = !!e;
  else if (t.tagName === "SELECT")
    Xc(t, e);
  else {
    if (t.value === e)
      return;
    t.value = e === void 0 ? "" : e;
  }
}
function zc(t, e) {
  t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedClasses = Fi(t, e);
}
function Yc(t, e) {
  t._x_undoAddedStyles && t._x_undoAddedStyles(), t._x_undoAddedStyles = ir(t, e);
}
function Vc(t, e, n) {
  ls(t, e, n), Gc(t, e, n);
}
function ls(t, e, n) {
  [null, void 0, !1].includes(n) && Jc(e) ? t.removeAttribute(e) : (hs(e) && (n = e), Kc(t, e, n));
}
function Kc(t, e, n) {
  t.getAttribute(e) != n && t.setAttribute(e, n);
}
function Gc(t, e, n) {
  t[e] !== n && (t[e] = n);
}
function Xc(t, e) {
  const n = [].concat(e).map((r) => r + "");
  Array.from(t.options).forEach((r) => {
    r.selected = n.includes(r.value);
  });
}
function Zc(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, n) => n.toUpperCase());
}
function Co(t, e) {
  return t == e;
}
function Ln(t) {
  return [1, "1", "true", "on", "yes", !0].includes(t) ? !0 : [0, "0", "false", "off", "no", !1].includes(t) ? !1 : t ? !!t : null;
}
function hs(t) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(t);
}
function Jc(t) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(t);
}
function Qc(t, e, n) {
  return t._x_bindings && t._x_bindings[e] !== void 0 ? t._x_bindings[e] : ds(t, e, n);
}
function tf(t, e, n, r = !0) {
  if (t._x_bindings && t._x_bindings[e] !== void 0)
    return t._x_bindings[e];
  if (t._x_inlineBindings && t._x_inlineBindings[e] !== void 0) {
    let i = t._x_inlineBindings[e];
    return i.extract = r, ja(() => ne(t, i.expression));
  }
  return ds(t, e, n);
}
function ds(t, e, n) {
  let r = t.getAttribute(e);
  return r === null ? typeof n == "function" ? n() : n : r === "" ? !0 : hs(e) ? !![e, "true"].includes(r) : r;
}
function ps(t, e) {
  var n;
  return function() {
    var r = this, i = arguments, o = function() {
      n = null, t.apply(r, i);
    };
    clearTimeout(n), n = setTimeout(o, e);
  };
}
function gs(t, e) {
  let n;
  return function() {
    let r = this, i = arguments;
    n || (t.apply(r, i), n = !0, setTimeout(() => n = !1, e));
  };
}
function ms({ get: t, set: e }, { get: n, set: r }) {
  let i = !0, o, a = he(() => {
    let s = t(), u = n();
    if (i)
      r(Pr(s)), i = !1;
    else {
      let f = JSON.stringify(s), d = JSON.stringify(u);
      f !== o ? r(Pr(s)) : f !== d && e(Pr(u));
    }
    o = JSON.stringify(t()), JSON.stringify(n());
  });
  return () => {
    Pe(a);
  };
}
function Pr(t) {
  return typeof t == "object" ? JSON.parse(JSON.stringify(t)) : t;
}
function ef(t) {
  (Array.isArray(t) ? t : [t]).forEach((n) => n(gn));
}
var Qt = {}, ko = !1;
function nf(t, e) {
  if (ko || (Qt = ke(Qt), ko = !0), e === void 0)
    return Qt[t];
  Qt[t] = e, typeof e == "object" && e !== null && e.hasOwnProperty("init") && typeof e.init == "function" && Qt[t].init(), Ra(Qt[t]);
}
function rf() {
  return Qt;
}
var vs = {};
function of(t, e) {
  let n = typeof e != "function" ? () => e : e;
  return t instanceof Element ? ys(t, n()) : (vs[t] = n, () => {
  });
}
function af(t) {
  return Object.entries(vs).forEach(([e, n]) => {
    Object.defineProperty(t, e, {
      get() {
        return (...r) => n(...r);
      }
    });
  }), t;
}
function ys(t, e, n) {
  let r = [];
  for (; r.length; )
    r.pop()();
  let i = Object.entries(e).map(([a, s]) => ({ name: a, value: s })), o = qa(i);
  return i = i.map((a) => o.find((s) => s.name === a.name) ? {
    name: `x-bind:${a.name}`,
    value: `"${a.value}"`
  } : a), Di(t, i, n).map((a) => {
    r.push(a.runCleanups), a();
  }), () => {
    for (; r.length; )
      r.pop()();
  };
}
var _s = {};
function sf(t, e) {
  _s[t] = e;
}
function uf(t, e) {
  return Object.entries(_s).forEach(([n, r]) => {
    Object.defineProperty(t, n, {
      get() {
        return (...i) => r.bind(e)(...i);
      },
      enumerable: !1
    });
  }), t;
}
var cf = {
  get reactive() {
    return ke;
  },
  get release() {
    return Pe;
  },
  get effect() {
    return he;
  },
  get raw() {
    return Oa;
  },
  version: "3.14.1",
  flushAndStopDeferringMutations: dc,
  dontAutoEvaluateFunctions: ja,
  disableEffectScheduling: ac,
  startObservingMutations: Oi,
  stopObservingMutations: Ia,
  setReactivityEngine: sc,
  onAttributeRemoved: La,
  onAttributesAdded: Na,
  closestDataStack: xe,
  skipDuringClone: Gt,
  onlyDuringClone: Hc,
  addRootSelector: ns,
  addInitSelector: rs,
  interceptClone: or,
  addScopeToNode: hn,
  deferMutations: hc,
  mapAttributes: Ni,
  evaluateLater: mt,
  interceptInit: kc,
  setEvaluator: yc,
  mergeProxies: dn,
  extractProp: tf,
  findClosest: pn,
  onElRemoved: Ai,
  closestRoot: rr,
  destroyTree: os,
  interceptor: Ua,
  // INTERNAL: not public API and is subject to change without major release.
  transition: ri,
  // INTERNAL
  setStyles: ir,
  // INTERNAL
  mutateDom: ot,
  directive: nt,
  entangle: ms,
  throttle: gs,
  debounce: ps,
  evaluate: ne,
  initTree: Ft,
  nextTick: Ii,
  prefixed: De,
  prefix: xc,
  plugin: ef,
  magic: St,
  store: nf,
  start: Oc,
  clone: Wc,
  // INTERNAL
  cloneNode: jc,
  // INTERNAL
  bound: Qc,
  $data: Fa,
  watch: Ca,
  walk: Wt,
  data: sf,
  bind: of
}, gn = cf;
function ff(t, e) {
  const n = /* @__PURE__ */ Object.create(null), r = t.split(",");
  for (let i = 0; i < r.length; i++)
    n[r[i]] = !0;
  return (i) => !!n[i];
}
var lf = Object.freeze({}), hf = Object.prototype.hasOwnProperty, ar = (t, e) => hf.call(t, e), re = Array.isArray, en = (t) => bs(t) === "[object Map]", df = (t) => typeof t == "string", Ri = (t) => typeof t == "symbol", sr = (t) => t !== null && typeof t == "object", pf = Object.prototype.toString, bs = (t) => pf.call(t), ws = (t) => bs(t).slice(8, -1), Ui = (t) => df(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, gf = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, mf = gf((t) => t.charAt(0).toUpperCase() + t.slice(1)), xs = (t, e) => t !== e && (t === t || e === e), oi = /* @__PURE__ */ new WeakMap(), je = [], Ot, ie = Symbol("iterate"), ai = Symbol("Map key iterate");
function vf(t) {
  return t && t._isEffect === !0;
}
function yf(t, e = lf) {
  vf(t) && (t = t.raw);
  const n = wf(t, e);
  return e.lazy || n(), n;
}
function _f(t) {
  t.active && (Ms(t), t.options.onStop && t.options.onStop(), t.active = !1);
}
var bf = 0;
function wf(t, e) {
  const n = function() {
    if (!n.active)
      return t();
    if (!je.includes(n)) {
      Ms(n);
      try {
        return Mf(), je.push(n), Ot = n, t();
      } finally {
        je.pop(), Ss(), Ot = je[je.length - 1];
      }
    }
  };
  return n.id = bf++, n.allowRecurse = !!e.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = t, n.deps = [], n.options = e, n;
}
function Ms(t) {
  const { deps: e } = t;
  if (e.length) {
    for (let n = 0; n < e.length; n++)
      e[n].delete(t);
    e.length = 0;
  }
}
var Me = !0, Hi = [];
function xf() {
  Hi.push(Me), Me = !1;
}
function Mf() {
  Hi.push(Me), Me = !0;
}
function Ss() {
  const t = Hi.pop();
  Me = t === void 0 ? !0 : t;
}
function Mt(t, e, n) {
  if (!Me || Ot === void 0)
    return;
  let r = oi.get(t);
  r || oi.set(t, r = /* @__PURE__ */ new Map());
  let i = r.get(n);
  i || r.set(n, i = /* @__PURE__ */ new Set()), i.has(Ot) || (i.add(Ot), Ot.deps.push(i), Ot.options.onTrack && Ot.options.onTrack({
    effect: Ot,
    target: t,
    type: e,
    key: n
  }));
}
function qt(t, e, n, r, i, o) {
  const a = oi.get(t);
  if (!a)
    return;
  const s = /* @__PURE__ */ new Set(), u = (d) => {
    d && d.forEach((l) => {
      (l !== Ot || l.allowRecurse) && s.add(l);
    });
  };
  if (e === "clear")
    a.forEach(u);
  else if (n === "length" && re(t))
    a.forEach((d, l) => {
      (l === "length" || l >= r) && u(d);
    });
  else
    switch (n !== void 0 && u(a.get(n)), e) {
      case "add":
        re(t) ? Ui(n) && u(a.get("length")) : (u(a.get(ie)), en(t) && u(a.get(ai)));
        break;
      case "delete":
        re(t) || (u(a.get(ie)), en(t) && u(a.get(ai)));
        break;
      case "set":
        en(t) && u(a.get(ie));
        break;
    }
  const f = (d) => {
    d.options.onTrigger && d.options.onTrigger({
      effect: d,
      target: t,
      key: n,
      type: e,
      newValue: r,
      oldValue: i,
      oldTarget: o
    }), d.options.scheduler ? d.options.scheduler(d) : d();
  };
  s.forEach(f);
}
var Sf = /* @__PURE__ */ ff("__proto__,__v_isRef,__isVue"), As = new Set(Object.getOwnPropertyNames(Symbol).map((t) => Symbol[t]).filter(Ri)), Af = /* @__PURE__ */ Es(), Ef = /* @__PURE__ */ Es(!0), Po = /* @__PURE__ */ Tf();
function Tf() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const r = J(this);
      for (let o = 0, a = this.length; o < a; o++)
        Mt(r, "get", o + "");
      const i = r[e](...n);
      return i === -1 || i === !1 ? r[e](...n.map(J)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      xf();
      const r = J(this)[e].apply(this, n);
      return Ss(), r;
    };
  }), t;
}
function Es(t = !1, e = !1) {
  return function(r, i, o) {
    if (i === "__v_isReactive")
      return !t;
    if (i === "__v_isReadonly")
      return t;
    if (i === "__v_raw" && o === (t ? e ? jf : ks : e ? Hf : Cs).get(r))
      return r;
    const a = re(r);
    if (!t && a && ar(Po, i))
      return Reflect.get(Po, i, o);
    const s = Reflect.get(r, i, o);
    return (Ri(i) ? As.has(i) : Sf(i)) || (t || Mt(r, "get", i), e) ? s : si(s) ? !a || !Ui(i) ? s.value : s : sr(s) ? t ? Ps(s) : qi(s) : s;
  };
}
var Of = /* @__PURE__ */ Cf();
function Cf(t = !1) {
  return function(n, r, i, o) {
    let a = n[r];
    if (!t && (i = J(i), a = J(a), !re(n) && si(a) && !si(i)))
      return a.value = i, !0;
    const s = re(n) && Ui(r) ? Number(r) < n.length : ar(n, r), u = Reflect.set(n, r, i, o);
    return n === J(o) && (s ? xs(i, a) && qt(n, "set", r, i, a) : qt(n, "add", r, i)), u;
  };
}
function kf(t, e) {
  const n = ar(t, e), r = t[e], i = Reflect.deleteProperty(t, e);
  return i && n && qt(t, "delete", e, void 0, r), i;
}
function Pf(t, e) {
  const n = Reflect.has(t, e);
  return (!Ri(e) || !As.has(e)) && Mt(t, "has", e), n;
}
function Df(t) {
  return Mt(t, "iterate", re(t) ? "length" : ie), Reflect.ownKeys(t);
}
var Nf = {
  get: Af,
  set: Of,
  deleteProperty: kf,
  has: Pf,
  ownKeys: Df
}, Lf = {
  get: Ef,
  set(t, e) {
    return console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  },
  deleteProperty(t, e) {
    return console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0;
  }
}, ji = (t) => sr(t) ? qi(t) : t, Wi = (t) => sr(t) ? Ps(t) : t, Bi = (t) => t, ur = (t) => Reflect.getPrototypeOf(t);
function xn(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const i = J(t), o = J(e);
  e !== o && !n && Mt(i, "get", e), !n && Mt(i, "get", o);
  const { has: a } = ur(i), s = r ? Bi : n ? Wi : ji;
  if (a.call(i, e))
    return s(t.get(e));
  if (a.call(i, o))
    return s(t.get(o));
  t !== i && t.get(e);
}
function Mn(t, e = !1) {
  const n = this.__v_raw, r = J(n), i = J(t);
  return t !== i && !e && Mt(r, "has", t), !e && Mt(r, "has", i), t === i ? n.has(t) : n.has(t) || n.has(i);
}
function Sn(t, e = !1) {
  return t = t.__v_raw, !e && Mt(J(t), "iterate", ie), Reflect.get(t, "size", t);
}
function Do(t) {
  t = J(t);
  const e = J(this);
  return ur(e).has.call(e, t) || (e.add(t), qt(e, "add", t, t)), this;
}
function No(t, e) {
  e = J(e);
  const n = J(this), { has: r, get: i } = ur(n);
  let o = r.call(n, t);
  o ? Os(n, r, t) : (t = J(t), o = r.call(n, t));
  const a = i.call(n, t);
  return n.set(t, e), o ? xs(e, a) && qt(n, "set", t, e, a) : qt(n, "add", t, e), this;
}
function Lo(t) {
  const e = J(this), { has: n, get: r } = ur(e);
  let i = n.call(e, t);
  i ? Os(e, n, t) : (t = J(t), i = n.call(e, t));
  const o = r ? r.call(e, t) : void 0, a = e.delete(t);
  return i && qt(e, "delete", t, void 0, o), a;
}
function $o() {
  const t = J(this), e = t.size !== 0, n = en(t) ? new Map(t) : new Set(t), r = t.clear();
  return e && qt(t, "clear", void 0, void 0, n), r;
}
function An(t, e) {
  return function(r, i) {
    const o = this, a = o.__v_raw, s = J(a), u = e ? Bi : t ? Wi : ji;
    return !t && Mt(s, "iterate", ie), a.forEach((f, d) => r.call(i, u(f), u(d), o));
  };
}
function En(t, e, n) {
  return function(...r) {
    const i = this.__v_raw, o = J(i), a = en(o), s = t === "entries" || t === Symbol.iterator && a, u = t === "keys" && a, f = i[t](...r), d = n ? Bi : e ? Wi : ji;
    return !e && Mt(o, "iterate", u ? ai : ie), {
      // iterator protocol
      next() {
        const { value: l, done: c } = f.next();
        return c ? { value: l, done: c } : {
          value: s ? [d(l[0]), d(l[1])] : d(l),
          done: c
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ht(t) {
  return function(...e) {
    {
      const n = e[0] ? `on key "${e[0]}" ` : "";
      console.warn(`${mf(t)} operation ${n}failed: target is readonly.`, J(this));
    }
    return t === "delete" ? !1 : this;
  };
}
function $f() {
  const t = {
    get(o) {
      return xn(this, o);
    },
    get size() {
      return Sn(this);
    },
    has: Mn,
    add: Do,
    set: No,
    delete: Lo,
    clear: $o,
    forEach: An(!1, !1)
  }, e = {
    get(o) {
      return xn(this, o, !1, !0);
    },
    get size() {
      return Sn(this);
    },
    has: Mn,
    add: Do,
    set: No,
    delete: Lo,
    clear: $o,
    forEach: An(!1, !0)
  }, n = {
    get(o) {
      return xn(this, o, !0);
    },
    get size() {
      return Sn(this, !0);
    },
    has(o) {
      return Mn.call(this, o, !0);
    },
    add: Ht(
      "add"
      /* ADD */
    ),
    set: Ht(
      "set"
      /* SET */
    ),
    delete: Ht(
      "delete"
      /* DELETE */
    ),
    clear: Ht(
      "clear"
      /* CLEAR */
    ),
    forEach: An(!0, !1)
  }, r = {
    get(o) {
      return xn(this, o, !0, !0);
    },
    get size() {
      return Sn(this, !0);
    },
    has(o) {
      return Mn.call(this, o, !0);
    },
    add: Ht(
      "add"
      /* ADD */
    ),
    set: Ht(
      "set"
      /* SET */
    ),
    delete: Ht(
      "delete"
      /* DELETE */
    ),
    clear: Ht(
      "clear"
      /* CLEAR */
    ),
    forEach: An(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    t[o] = En(o, !1, !1), n[o] = En(o, !0, !1), e[o] = En(o, !1, !0), r[o] = En(o, !0, !0);
  }), [
    t,
    n,
    e,
    r
  ];
}
var [If, Ff, fm, lm] = /* @__PURE__ */ $f();
function Ts(t, e) {
  const n = t ? Ff : If;
  return (r, i, o) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? r : Reflect.get(ar(n, i) && i in r ? n : r, i, o);
}
var Rf = {
  get: /* @__PURE__ */ Ts(!1)
}, Uf = {
  get: /* @__PURE__ */ Ts(!0)
};
function Os(t, e, n) {
  const r = J(n);
  if (r !== n && e.call(t, r)) {
    const i = ws(t);
    console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Cs = /* @__PURE__ */ new WeakMap(), Hf = /* @__PURE__ */ new WeakMap(), ks = /* @__PURE__ */ new WeakMap(), jf = /* @__PURE__ */ new WeakMap();
function Wf(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Bf(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Wf(ws(t));
}
function qi(t) {
  return t && t.__v_isReadonly ? t : Ds(t, !1, Nf, Rf, Cs);
}
function Ps(t) {
  return Ds(t, !0, Lf, Uf, ks);
}
function Ds(t, e, n, r, i) {
  if (!sr(t))
    return console.warn(`value cannot be made reactive: ${String(t)}`), t;
  if (t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const o = i.get(t);
  if (o)
    return o;
  const a = Bf(t);
  if (a === 0)
    return t;
  const s = new Proxy(t, a === 2 ? r : n);
  return i.set(t, s), s;
}
function J(t) {
  return t && J(t.__v_raw) || t;
}
function si(t) {
  return !!(t && t.__v_isRef === !0);
}
St("nextTick", () => Ii);
St("dispatch", (t) => tn.bind(tn, t));
St("watch", (t, { evaluateLater: e, cleanup: n }) => (r, i) => {
  let o = e(r), s = Ca(() => {
    let u;
    return o((f) => u = f), u;
  }, i);
  n(s);
});
St("store", rf);
St("data", (t) => Fa(t));
St("root", (t) => rr(t));
St("refs", (t) => (t._x_refs_proxy || (t._x_refs_proxy = dn(qf(t))), t._x_refs_proxy));
function qf(t) {
  let e = [];
  return pn(t, (n) => {
    n._x_refs && e.push(n._x_refs);
  }), e;
}
var Dr = {};
function Ns(t) {
  return Dr[t] || (Dr[t] = 0), ++Dr[t];
}
function zf(t, e) {
  return pn(t, (n) => {
    if (n._x_ids && n._x_ids[e])
      return !0;
  });
}
function Yf(t, e) {
  t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = Ns(e));
}
St("id", (t, { cleanup: e }) => (n, r = null) => {
  let i = `${n}${r ? `-${r}` : ""}`;
  return Vf(t, i, e, () => {
    let o = zf(t, n), a = o ? o._x_ids[n] : Ns(n);
    return r ? `${n}-${a}-${r}` : `${n}-${a}`;
  });
});
or((t, e) => {
  t._x_id && (e._x_id = t._x_id);
});
function Vf(t, e, n, r) {
  if (t._x_id || (t._x_id = {}), t._x_id[e])
    return t._x_id[e];
  let i = r();
  return t._x_id[e] = i, n(() => {
    delete t._x_id[e];
  }), i;
}
St("el", (t) => t);
Ls("Focus", "focus", "focus");
Ls("Persist", "persist", "persist");
function Ls(t, e, n) {
  St(e, (r) => xt(`You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
nt("modelable", (t, { expression: e }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let o = r(e), a = () => {
    let d;
    return o((l) => d = l), d;
  }, s = r(`${e} = __placeholder`), u = (d) => s(() => {
  }, { scope: { __placeholder: d } }), f = a();
  u(f), queueMicrotask(() => {
    if (!t._x_model)
      return;
    t._x_removeModelListeners.default();
    let d = t._x_model.get, l = t._x_model.set, c = ms(
      {
        get() {
          return d();
        },
        set(h) {
          l(h);
        }
      },
      {
        get() {
          return a();
        },
        set(h) {
          u(h);
        }
      }
    );
    i(c);
  });
});
nt("teleport", (t, { modifiers: e, expression: n }, { cleanup: r }) => {
  t.tagName.toLowerCase() !== "template" && xt("x-teleport can only be used on a <template> tag", t);
  let i = Io(n), o = t.content.cloneNode(!0).firstElementChild;
  t._x_teleport = o, o._x_teleportBack = t, t.setAttribute("data-teleport-template", !0), o.setAttribute("data-teleport-target", !0), t._x_forwardEvents && t._x_forwardEvents.forEach((s) => {
    o.addEventListener(s, (u) => {
      u.stopPropagation(), t.dispatchEvent(new u.constructor(u.type, u));
    });
  }), hn(o, {}, t);
  let a = (s, u, f) => {
    f.includes("prepend") ? u.parentNode.insertBefore(s, u) : f.includes("append") ? u.parentNode.insertBefore(s, u.nextSibling) : u.appendChild(s);
  };
  ot(() => {
    a(o, i, e), Gt(() => {
      Ft(o), o._x_ignore = !0;
    })();
  }), t._x_teleportPutBack = () => {
    let s = Io(n);
    ot(() => {
      a(t._x_teleport, s, e);
    });
  }, r(() => o.remove());
});
var Kf = document.createElement("div");
function Io(t) {
  let e = Gt(() => document.querySelector(t), () => Kf)();
  return e || xt(`Cannot find x-teleport element for selector: "${t}"`), e;
}
var $s = () => {
};
$s.inline = (t, { modifiers: e }, { cleanup: n }) => {
  e.includes("self") ? t._x_ignoreSelf = !0 : t._x_ignore = !0, n(() => {
    e.includes("self") ? delete t._x_ignoreSelf : delete t._x_ignore;
  });
};
nt("ignore", $s);
nt("effect", Gt((t, { expression: e }, { effect: n }) => {
  n(mt(t, e));
}));
function ui(t, e, n, r) {
  let i = t, o = (u) => r(u), a = {}, s = (u, f) => (d) => f(u, d);
  if (n.includes("dot") && (e = Gf(e)), n.includes("camel") && (e = Xf(e)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
    let u = n[n.indexOf("debounce") + 1] || "invalid-wait", f = Bn(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = ps(o, f);
  }
  if (n.includes("throttle")) {
    let u = n[n.indexOf("throttle") + 1] || "invalid-wait", f = Bn(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = gs(o, f);
  }
  return n.includes("prevent") && (o = s(o, (u, f) => {
    f.preventDefault(), u(f);
  })), n.includes("stop") && (o = s(o, (u, f) => {
    f.stopPropagation(), u(f);
  })), n.includes("once") && (o = s(o, (u, f) => {
    u(f), i.removeEventListener(e, o, a);
  })), (n.includes("away") || n.includes("outside")) && (i = document, o = s(o, (u, f) => {
    t.contains(f.target) || f.target.isConnected !== !1 && (t.offsetWidth < 1 && t.offsetHeight < 1 || t._x_isShown !== !1 && u(f));
  })), n.includes("self") && (o = s(o, (u, f) => {
    f.target === t && u(f);
  })), (Jf(e) || Is(e)) && (o = s(o, (u, f) => {
    Qf(f, n) || u(f);
  })), i.addEventListener(e, o, a), () => {
    i.removeEventListener(e, o, a);
  };
}
function Gf(t) {
  return t.replace(/-/g, ".");
}
function Xf(t) {
  return t.toLowerCase().replace(/-(\w)/g, (e, n) => n.toUpperCase());
}
function Bn(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Zf(t) {
  return [" ", "_"].includes(
    t
  ) ? t : t.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Jf(t) {
  return ["keydown", "keyup"].includes(t);
}
function Is(t) {
  return ["contextmenu", "click", "mouse"].some((e) => t.includes(e));
}
function Qf(t, e) {
  let n = e.filter((o) => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(o));
  if (n.includes("debounce")) {
    let o = n.indexOf("debounce");
    n.splice(o, Bn((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
    let o = n.indexOf("throttle");
    n.splice(o, Bn((n[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || n.length === 1 && Fo(t.key).includes(n[0]))
    return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => n.includes(o));
  return n = n.filter((o) => !i.includes(o)), !(i.length > 0 && i.filter((a) => ((a === "cmd" || a === "super") && (a = "meta"), t[`${a}Key`])).length === i.length && (Is(t.type) || Fo(t.key).includes(n[0])));
}
function Fo(t) {
  if (!t)
    return [];
  t = Zf(t);
  let e = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    comma: ",",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return e[t] = t, Object.keys(e).map((n) => {
    if (e[n] === t)
      return n;
  }).filter((n) => n);
}
nt("model", (t, { modifiers: e, expression: n }, { effect: r, cleanup: i }) => {
  let o = t;
  e.includes("parent") && (o = t.parentNode);
  let a = mt(o, n), s;
  typeof n == "string" ? s = mt(o, `${n} = __placeholder`) : typeof n == "function" && typeof n() == "string" ? s = mt(o, `${n()} = __placeholder`) : s = () => {
  };
  let u = () => {
    let c;
    return a((h) => c = h), Ro(c) ? c.get() : c;
  }, f = (c) => {
    let h;
    a((p) => h = p), Ro(h) ? h.set(c) : s(() => {
    }, {
      scope: { __placeholder: c }
    });
  };
  typeof n == "string" && t.type === "radio" && ot(() => {
    t.hasAttribute("name") || t.setAttribute("name", n);
  });
  var d = t.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(t.type) || e.includes("lazy") ? "change" : "input";
  let l = Bt ? () => {
  } : ui(t, d, e, (c) => {
    f(Nr(t, e, c, u()));
  });
  if (e.includes("fill") && ([void 0, null, ""].includes(u()) || t.type === "checkbox" && Array.isArray(u()) || t.tagName.toLowerCase() === "select" && t.multiple) && f(
    Nr(t, e, { target: t }, u())
  ), t._x_removeModelListeners || (t._x_removeModelListeners = {}), t._x_removeModelListeners.default = l, i(() => t._x_removeModelListeners.default()), t.form) {
    let c = ui(t.form, "reset", [], (h) => {
      Ii(() => t._x_model && t._x_model.set(Nr(t, e, { target: t }, u())));
    });
    i(() => c());
  }
  t._x_model = {
    get() {
      return u();
    },
    set(c) {
      f(c);
    }
  }, t._x_forceModelUpdate = (c) => {
    c === void 0 && typeof n == "string" && n.match(/\./) && (c = ""), window.fromModel = !0, ot(() => fs(t, "value", c)), delete window.fromModel;
  }, r(() => {
    let c = u();
    e.includes("unintrusive") && document.activeElement.isSameNode(t) || t._x_forceModelUpdate(c);
  });
});
function Nr(t, e, n, r) {
  return ot(() => {
    if (n instanceof CustomEvent && n.detail !== void 0)
      return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
    if (t.type === "checkbox")
      if (Array.isArray(r)) {
        let i = null;
        return e.includes("number") ? i = Lr(n.target.value) : e.includes("boolean") ? i = Ln(n.target.value) : i = n.target.value, n.target.checked ? r.includes(i) ? r : r.concat([i]) : r.filter((o) => !tl(o, i));
      } else
        return n.target.checked;
    else {
      if (t.tagName.toLowerCase() === "select" && t.multiple)
        return e.includes("number") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Lr(o);
        }) : e.includes("boolean") ? Array.from(n.target.selectedOptions).map((i) => {
          let o = i.value || i.text;
          return Ln(o);
        }) : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
      {
        let i;
        return t.type === "radio" ? n.target.checked ? i = n.target.value : i = r : i = n.target.value, e.includes("number") ? Lr(i) : e.includes("boolean") ? Ln(i) : e.includes("trim") ? i.trim() : i;
      }
    }
  });
}
function Lr(t) {
  let e = t ? parseFloat(t) : null;
  return el(e) ? e : t;
}
function tl(t, e) {
  return t == e;
}
function el(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Ro(t) {
  return t !== null && typeof t == "object" && typeof t.get == "function" && typeof t.set == "function";
}
nt("cloak", (t) => queueMicrotask(() => ot(() => t.removeAttribute(De("cloak")))));
rs(() => `[${De("init")}]`);
nt("init", Gt((t, { expression: e }, { evaluate: n }) => typeof e == "string" ? !!e.trim() && n(e, {}, !1) : n(e, {}, !1)));
nt("text", (t, { expression: e }, { effect: n, evaluateLater: r }) => {
  let i = r(e);
  n(() => {
    i((o) => {
      ot(() => {
        t.textContent = o;
      });
    });
  });
});
nt("html", (t, { expression: e }, { effect: n, evaluateLater: r }) => {
  let i = r(e);
  n(() => {
    i((o) => {
      ot(() => {
        t.innerHTML = o, t._x_ignoreSelf = !0, Ft(t), delete t._x_ignoreSelf;
      });
    });
  });
});
Ni(Va(":", Ka(De("bind:"))));
var Fs = (t, { value: e, modifiers: n, expression: r, original: i }, { effect: o, cleanup: a }) => {
  if (!e) {
    let u = {};
    af(u), mt(t, r)((d) => {
      ys(t, d, i);
    }, { scope: u });
    return;
  }
  if (e === "key")
    return nl(t, r);
  if (t._x_inlineBindings && t._x_inlineBindings[e] && t._x_inlineBindings[e].extract)
    return;
  let s = mt(t, r);
  o(() => s((u) => {
    u === void 0 && typeof r == "string" && r.match(/\./) && (u = ""), ot(() => fs(t, e, u, n));
  })), a(() => {
    t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedStyles && t._x_undoAddedStyles();
  });
};
Fs.inline = (t, { value: e, modifiers: n, expression: r }) => {
  e && (t._x_inlineBindings || (t._x_inlineBindings = {}), t._x_inlineBindings[e] = { expression: r, extract: !1 });
};
nt("bind", Fs);
function nl(t, e) {
  t._x_keyExpression = e;
}
ns(() => `[${De("data")}]`);
nt("data", (t, { expression: e }, { cleanup: n }) => {
  if (rl(t))
    return;
  e = e === "" ? "{}" : e;
  let r = {};
  Zr(r, t);
  let i = {};
  uf(i, r);
  let o = ne(t, e, { scope: i });
  (o === void 0 || o === !0) && (o = {}), Zr(o, t);
  let a = ke(o);
  Ra(a);
  let s = hn(t, a);
  a.init && ne(t, a.init), n(() => {
    a.destroy && ne(t, a.destroy), s();
  });
});
or((t, e) => {
  t._x_dataStack && (e._x_dataStack = t._x_dataStack, e.setAttribute("data-has-alpine-state", !0));
});
function rl(t) {
  return Bt ? ii ? !0 : t.hasAttribute("data-has-alpine-state") : !1;
}
nt("show", (t, { modifiers: e, expression: n }, { effect: r }) => {
  let i = mt(t, n);
  t._x_doHide || (t._x_doHide = () => {
    ot(() => {
      t.style.setProperty("display", "none", e.includes("important") ? "important" : void 0);
    });
  }), t._x_doShow || (t._x_doShow = () => {
    ot(() => {
      t.style.length === 1 && t.style.display === "none" ? t.removeAttribute("style") : t.style.removeProperty("display");
    });
  });
  let o = () => {
    t._x_doHide(), t._x_isShown = !1;
  }, a = () => {
    t._x_doShow(), t._x_isShown = !0;
  }, s = () => setTimeout(a), u = ni(
    (l) => l ? a() : o(),
    (l) => {
      typeof t._x_toggleAndCascadeWithTransitions == "function" ? t._x_toggleAndCascadeWithTransitions(t, l, a, o) : l ? s() : o();
    }
  ), f, d = !0;
  r(() => i((l) => {
    !d && l === f || (e.includes("immediate") && (l ? s() : o()), u(l), f = l, d = !1);
  }));
});
nt("for", (t, { expression: e }, { effect: n, cleanup: r }) => {
  let i = ol(e), o = mt(t, i.items), a = mt(
    t,
    // the x-bind:key expression is stored for our use instead of evaluated.
    t._x_keyExpression || "index"
  );
  t._x_prevKeys = [], t._x_lookup = {}, n(() => il(t, i, o, a)), r(() => {
    Object.values(t._x_lookup).forEach((s) => s.remove()), delete t._x_prevKeys, delete t._x_lookup;
  });
});
function il(t, e, n, r) {
  let i = (a) => typeof a == "object" && !Array.isArray(a), o = t;
  n((a) => {
    al(a) && a >= 0 && (a = Array.from(Array(a).keys(), (v) => v + 1)), a === void 0 && (a = []);
    let s = t._x_lookup, u = t._x_prevKeys, f = [], d = [];
    if (i(a))
      a = Object.entries(a).map(([v, x]) => {
        let S = Uo(e, x, v, a);
        r((A) => {
          d.includes(A) && xt("Duplicate key on x-for", t), d.push(A);
        }, { scope: { index: v, ...S } }), f.push(S);
      });
    else
      for (let v = 0; v < a.length; v++) {
        let x = Uo(e, a[v], v, a);
        r((S) => {
          d.includes(S) && xt("Duplicate key on x-for", t), d.push(S);
        }, { scope: { index: v, ...x } }), f.push(x);
      }
    let l = [], c = [], h = [], p = [];
    for (let v = 0; v < u.length; v++) {
      let x = u[v];
      d.indexOf(x) === -1 && h.push(x);
    }
    u = u.filter((v) => !h.includes(v));
    let g = "template";
    for (let v = 0; v < d.length; v++) {
      let x = d[v], S = u.indexOf(x);
      if (S === -1)
        u.splice(v, 0, x), l.push([g, v]);
      else if (S !== v) {
        let A = u.splice(v, 1)[0], I = u.splice(S - 1, 1)[0];
        u.splice(v, 0, I), u.splice(S, 0, A), c.push([A, I]);
      } else
        p.push(x);
      g = x;
    }
    for (let v = 0; v < h.length; v++) {
      let x = h[v];
      s[x]._x_effects && s[x]._x_effects.forEach(Ta), s[x].remove(), s[x] = null, delete s[x];
    }
    for (let v = 0; v < c.length; v++) {
      let [x, S] = c[v], A = s[x], I = s[S], R = document.createElement("div");
      ot(() => {
        I || xt('x-for ":key" is undefined or invalid', o, S, s), I.after(R), A.after(I), I._x_currentIfEl && I.after(I._x_currentIfEl), R.before(A), A._x_currentIfEl && A.after(A._x_currentIfEl), R.remove();
      }), I._x_refreshXForScope(f[d.indexOf(S)]);
    }
    for (let v = 0; v < l.length; v++) {
      let [x, S] = l[v], A = x === "template" ? o : s[x];
      A._x_currentIfEl && (A = A._x_currentIfEl);
      let I = f[S], R = d[S], F = document.importNode(o.content, !0).firstElementChild, L = ke(I);
      hn(F, L, o), F._x_refreshXForScope = (j) => {
        Object.entries(j).forEach(([W, q]) => {
          L[W] = q;
        });
      }, ot(() => {
        A.after(F), Gt(() => Ft(F))();
      }), typeof R == "object" && xt("x-for key cannot be an object, it must be a string or an integer", o), s[R] = F;
    }
    for (let v = 0; v < p.length; v++)
      s[p[v]]._x_refreshXForScope(f[d.indexOf(p[v])]);
    o._x_prevKeys = d;
  });
}
function ol(t) {
  let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, n = /^\s*\(|\)\s*$/g, r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, i = t.match(r);
  if (!i)
    return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(n, "").trim(), s = a.match(e);
  return s ? (o.item = a.replace(e, "").trim(), o.index = s[1].trim(), s[2] && (o.collection = s[2].trim())) : o.item = a, o;
}
function Uo(t, e, n, r) {
  let i = {};
  return /^\[.*\]$/.test(t.item) && Array.isArray(e) ? t.item.replace("[", "").replace("]", "").split(",").map((a) => a.trim()).forEach((a, s) => {
    i[a] = e[s];
  }) : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && typeof e == "object" ? t.item.replace("{", "").replace("}", "").split(",").map((a) => a.trim()).forEach((a) => {
    i[a] = e[a];
  }) : i[t.item] = e, t.index && (i[t.index] = n), t.collection && (i[t.collection] = r), i;
}
function al(t) {
  return !Array.isArray(t) && !isNaN(t);
}
function Rs() {
}
Rs.inline = (t, { expression: e }, { cleanup: n }) => {
  let r = rr(t);
  r._x_refs || (r._x_refs = {}), r._x_refs[e] = t, n(() => delete r._x_refs[e]);
};
nt("ref", Rs);
nt("if", (t, { expression: e }, { effect: n, cleanup: r }) => {
  t.tagName.toLowerCase() !== "template" && xt("x-if can only be used on a <template> tag", t);
  let i = mt(t, e), o = () => {
    if (t._x_currentIfEl)
      return t._x_currentIfEl;
    let s = t.content.cloneNode(!0).firstElementChild;
    return hn(s, {}, t), ot(() => {
      t.after(s), Gt(() => Ft(s))();
    }), t._x_currentIfEl = s, t._x_undoIf = () => {
      Wt(s, (u) => {
        u._x_effects && u._x_effects.forEach(Ta);
      }), s.remove(), delete t._x_currentIfEl;
    }, s;
  }, a = () => {
    t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf);
  };
  n(() => i((s) => {
    s ? o() : a();
  })), r(() => t._x_undoIf && t._x_undoIf());
});
nt("id", (t, { expression: e }, { evaluate: n }) => {
  n(e).forEach((i) => Yf(t, i));
});
or((t, e) => {
  t._x_ids && (e._x_ids = t._x_ids);
});
Ni(Va("@", Ka(De("on:"))));
nt("on", Gt((t, { value: e, modifiers: n, expression: r }, { cleanup: i }) => {
  let o = r ? mt(t, r) : () => {
  };
  t.tagName.toLowerCase() === "template" && (t._x_forwardEvents || (t._x_forwardEvents = []), t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
  let a = ui(t, e, n, (s) => {
    o(() => {
    }, { scope: { $event: s }, params: [s] });
  });
  i(() => a());
}));
cr("Collapse", "collapse", "collapse");
cr("Intersect", "intersect", "intersect");
cr("Focus", "trap", "focus");
cr("Mask", "mask", "mask");
function cr(t, e, n) {
  nt(e, (r) => xt(`You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
gn.setEvaluator(Ba);
gn.setReactivityEngine({ reactive: qi, effect: yf, release: _f, raw: J });
var sl = gn, Se = sl, jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ul(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ne(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var Us = { exports: {} }, $r = Array.prototype.slice;
function cl(t) {
  return t;
}
var $n = 1, In = 2, ci = 3, Ke = 4, Ho = 1e-6;
function fl(t) {
  return "translate(" + (t + 0.5) + ",0)";
}
function ll(t) {
  return "translate(0," + (t + 0.5) + ")";
}
function hl(t) {
  return function(e) {
    return +t(e);
  };
}
function dl(t) {
  var e = Math.max(0, t.bandwidth() - 1) / 2;
  return t.round() && (e = Math.round(e)), function(n) {
    return +t(n) + e;
  };
}
function pl() {
  return !this.__axis;
}
function fr(t, e) {
  var n = [], r = null, i = null, o = 6, a = 6, s = 3, u = t === $n || t === Ke ? -1 : 1, f = t === Ke || t === In ? "x" : "y", d = t === $n || t === ci ? fl : ll;
  function l(c) {
    var h = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), p = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : cl), g = Math.max(o, 0) + s, v = e.range(), x = +v[0] + 0.5, S = +v[v.length - 1] + 0.5, A = (e.bandwidth ? dl : hl)(e.copy()), I = c.selection ? c.selection() : c, R = I.selectAll(".domain").data([null]), F = I.selectAll(".tick").data(h, e).order(), L = F.exit(), j = F.enter().append("g").attr("class", "tick"), W = F.select("line"), q = F.select("text");
    R = R.merge(R.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), F = F.merge(j), W = W.merge(j.append("line").attr("stroke", "currentColor").attr(f + "2", u * o)), q = q.merge(j.append("text").attr("fill", "currentColor").attr(f, u * g).attr("dy", t === $n ? "0em" : t === ci ? "0.71em" : "0.32em")), c !== I && (R = R.transition(c), F = F.transition(c), W = W.transition(c), q = q.transition(c), L = L.transition(c).attr("opacity", Ho).attr("transform", function(E) {
      return isFinite(E = A(E)) ? d(E) : this.getAttribute("transform");
    }), j.attr("opacity", Ho).attr("transform", function(E) {
      var k = this.parentNode.__axis;
      return d(k && isFinite(k = k(E)) ? k : A(E));
    })), L.remove(), R.attr("d", t === Ke || t == In ? a ? "M" + u * a + "," + x + "H0.5V" + S + "H" + u * a : "M0.5," + x + "V" + S : a ? "M" + x + "," + u * a + "V0.5H" + S + "V" + u * a : "M" + x + ",0.5H" + S), F.attr("opacity", 1).attr("transform", function(E) {
      return d(A(E));
    }), W.attr(f + "2", u * o), q.attr(f, u * g).text(p), I.filter(pl).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === In ? "start" : t === Ke ? "end" : "middle"), I.each(function() {
      this.__axis = A;
    });
  }
  return l.scale = function(c) {
    return arguments.length ? (e = c, l) : e;
  }, l.ticks = function() {
    return n = $r.call(arguments), l;
  }, l.tickArguments = function(c) {
    return arguments.length ? (n = c == null ? [] : $r.call(c), l) : n.slice();
  }, l.tickValues = function(c) {
    return arguments.length ? (r = c == null ? null : $r.call(c), l) : r && r.slice();
  }, l.tickFormat = function(c) {
    return arguments.length ? (i = c, l) : i;
  }, l.tickSize = function(c) {
    return arguments.length ? (o = a = +c, l) : o;
  }, l.tickSizeInner = function(c) {
    return arguments.length ? (o = +c, l) : o;
  }, l.tickSizeOuter = function(c) {
    return arguments.length ? (a = +c, l) : a;
  }, l.tickPadding = function(c) {
    return arguments.length ? (s = +c, l) : s;
  }, l;
}
function gl(t) {
  return fr($n, t);
}
function ml(t) {
  return fr(In, t);
}
function vl(t) {
  return fr(ci, t);
}
function yl(t) {
  return fr(Ke, t);
}
const _l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  axisBottom: vl,
  axisLeft: yl,
  axisRight: ml,
  axisTop: gl
}, Symbol.toStringTag, { value: "Module" })), bl = /* @__PURE__ */ Ne(_l);
function de(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function zi(t) {
  return t.length === 1 && (t = wl(t)), {
    left: function(e, n, r, i) {
      for (r == null && (r = 0), i == null && (i = e.length); r < i; ) {
        var o = r + i >>> 1;
        t(e[o], n) < 0 ? r = o + 1 : i = o;
      }
      return r;
    },
    right: function(e, n, r, i) {
      for (r == null && (r = 0), i == null && (i = e.length); r < i; ) {
        var o = r + i >>> 1;
        t(e[o], n) > 0 ? i = o : r = o + 1;
      }
      return r;
    }
  };
}
function wl(t) {
  return function(e, n) {
    return de(t(e), n);
  };
}
var Hs = zi(de), ae = Hs.right, xl = Hs.left;
function Ml(t, e) {
  e == null && (e = js);
  for (var n = 0, r = t.length - 1, i = t[0], o = new Array(r < 0 ? 0 : r); n < r; ) o[n] = e(i, i = t[++n]);
  return o;
}
function js(t, e) {
  return [t, e];
}
function Sl(t, e, n) {
  var r = t.length, i = e.length, o = new Array(r * i), a, s, u, f;
  for (n == null && (n = js), a = u = 0; a < r; ++a)
    for (f = t[a], s = 0; s < i; ++s, ++u)
      o[u] = n(f, e[s]);
  return o;
}
function Al(t, e) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function zt(t) {
  return t === null ? NaN : +t;
}
function Ws(t, e) {
  var n = t.length, r = 0, i = -1, o = 0, a, s, u = 0;
  if (e == null)
    for (; ++i < n; )
      isNaN(a = zt(t[i])) || (s = a - o, o += s / ++r, u += s * (a - o));
  else
    for (; ++i < n; )
      isNaN(a = zt(e(t[i], i, t))) || (s = a - o, o += s / ++r, u += s * (a - o));
  if (r > 1) return u / (r - 1);
}
function Bs(t, e) {
  var n = Ws(t, e);
  return n && Math.sqrt(n);
}
function qs(t, e) {
  var n = t.length, r = -1, i, o, a;
  if (e == null) {
    for (; ++r < n; )
      if ((i = t[r]) != null && i >= i)
        for (o = a = i; ++r < n; )
          (i = t[r]) != null && (o > i && (o = i), a < i && (a = i));
  } else
    for (; ++r < n; )
      if ((i = e(t[r], r, t)) != null && i >= i)
        for (o = a = i; ++r < n; )
          (i = e(t[r], r, t)) != null && (o > i && (o = i), a < i && (a = i));
  return [o, a];
}
var zs = Array.prototype, El = zs.slice, Tl = zs.map;
function Tn(t) {
  return function() {
    return t;
  };
}
function Ol(t) {
  return t;
}
function Yi(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
var fi = Math.sqrt(50), li = Math.sqrt(10), hi = Math.sqrt(2);
function Vi(t, e, n) {
  var r, i = -1, o, a, s;
  if (e = +e, t = +t, n = +n, t === e && n > 0) return [t];
  if ((r = e < t) && (o = t, t = e, e = o), (s = nn(t, e, n)) === 0 || !isFinite(s)) return [];
  if (s > 0)
    for (t = Math.ceil(t / s), e = Math.floor(e / s), a = new Array(o = Math.ceil(e - t + 1)); ++i < o; ) a[i] = (t + i) * s;
  else
    for (t = Math.floor(t * s), e = Math.ceil(e * s), a = new Array(o = Math.ceil(t - e + 1)); ++i < o; ) a[i] = (t - i) / s;
  return r && a.reverse(), a;
}
function nn(t, e, n) {
  var r = (e - t) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), o = r / Math.pow(10, i);
  return i >= 0 ? (o >= fi ? 10 : o >= li ? 5 : o >= hi ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= fi ? 10 : o >= li ? 5 : o >= hi ? 2 : 1);
}
function on(t, e, n) {
  var r = Math.abs(e - t) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), o = r / i;
  return o >= fi ? i *= 10 : o >= li ? i *= 5 : o >= hi && (i *= 2), e < t ? -i : i;
}
function Ys(t) {
  return Math.ceil(Math.log(t.length) / Math.LN2) + 1;
}
function Cl() {
  var t = Ol, e = qs, n = Ys;
  function r(i) {
    var o, a = i.length, s, u = new Array(a);
    for (o = 0; o < a; ++o)
      u[o] = t(i[o], o, i);
    var f = e(u), d = f[0], l = f[1], c = n(u, d, l);
    Array.isArray(c) || (c = on(d, l, c), c = Yi(Math.ceil(d / c) * c, l, c));
    for (var h = c.length; c[0] <= d; ) c.shift(), --h;
    for (; c[h - 1] > l; ) c.pop(), --h;
    var p = new Array(h + 1), g;
    for (o = 0; o <= h; ++o)
      g = p[o] = [], g.x0 = o > 0 ? c[o - 1] : d, g.x1 = o < h ? c[o] : l;
    for (o = 0; o < a; ++o)
      s = u[o], d <= s && s <= l && p[ae(c, s, 0, h)].push(i[o]);
    return p;
  }
  return r.value = function(i) {
    return arguments.length ? (t = typeof i == "function" ? i : Tn(i), r) : t;
  }, r.domain = function(i) {
    return arguments.length ? (e = typeof i == "function" ? i : Tn([i[0], i[1]]), r) : e;
  }, r.thresholds = function(i) {
    return arguments.length ? (n = typeof i == "function" ? i : Array.isArray(i) ? Tn(El.call(i)) : Tn(i), r) : n;
  }, r;
}
function an(t, e, n) {
  if (n == null && (n = zt), !!(r = t.length)) {
    if ((e = +e) <= 0 || r < 2) return +n(t[0], 0, t);
    if (e >= 1) return +n(t[r - 1], r - 1, t);
    var r, i = (r - 1) * e, o = Math.floor(i), a = +n(t[o], o, t), s = +n(t[o + 1], o + 1, t);
    return a + (s - a) * (i - o);
  }
}
function kl(t, e, n) {
  return t = Tl.call(t, zt).sort(de), Math.ceil((n - e) / (2 * (an(t, 0.75) - an(t, 0.25)) * Math.pow(t.length, -1 / 3)));
}
function Pl(t, e, n) {
  return Math.ceil((n - e) / (3.5 * Bs(t) * Math.pow(t.length, -1 / 3)));
}
function Dl(t, e) {
  var n = t.length, r = -1, i, o;
  if (e == null) {
    for (; ++r < n; )
      if ((i = t[r]) != null && i >= i)
        for (o = i; ++r < n; )
          (i = t[r]) != null && i > o && (o = i);
  } else
    for (; ++r < n; )
      if ((i = e(t[r], r, t)) != null && i >= i)
        for (o = i; ++r < n; )
          (i = e(t[r], r, t)) != null && i > o && (o = i);
  return o;
}
function Nl(t, e) {
  var n = t.length, r = n, i = -1, o, a = 0;
  if (e == null)
    for (; ++i < n; )
      isNaN(o = zt(t[i])) ? --r : a += o;
  else
    for (; ++i < n; )
      isNaN(o = zt(e(t[i], i, t))) ? --r : a += o;
  if (r) return a / r;
}
function Ll(t, e) {
  var n = t.length, r = -1, i, o = [];
  if (e == null)
    for (; ++r < n; )
      isNaN(i = zt(t[r])) || o.push(i);
  else
    for (; ++r < n; )
      isNaN(i = zt(e(t[r], r, t))) || o.push(i);
  return an(o.sort(de), 0.5);
}
function $l(t) {
  for (var e = t.length, n, r = -1, i = 0, o, a; ++r < e; ) i += t[r].length;
  for (o = new Array(i); --e >= 0; )
    for (a = t[e], n = a.length; --n >= 0; )
      o[--i] = a[n];
  return o;
}
function Vs(t, e) {
  var n = t.length, r = -1, i, o;
  if (e == null) {
    for (; ++r < n; )
      if ((i = t[r]) != null && i >= i)
        for (o = i; ++r < n; )
          (i = t[r]) != null && o > i && (o = i);
  } else
    for (; ++r < n; )
      if ((i = e(t[r], r, t)) != null && i >= i)
        for (o = i; ++r < n; )
          (i = e(t[r], r, t)) != null && o > i && (o = i);
  return o;
}
function Il(t, e) {
  for (var n = e.length, r = new Array(n); n--; ) r[n] = t[e[n]];
  return r;
}
function Fl(t, e) {
  if (n = t.length) {
    var n, r = 0, i = 0, o, a = t[i];
    for (e == null && (e = de); ++r < n; )
      (e(o = t[r], a) < 0 || e(a, a) !== 0) && (a = o, i = r);
    if (e(a, a) === 0) return i;
  }
}
function Rl(t, e, n) {
  for (var r = (n ?? t.length) - (e = e == null ? 0 : +e), i, o; r; )
    o = Math.random() * r-- | 0, i = t[r + e], t[r + e] = t[o + e], t[o + e] = i;
  return t;
}
function Ul(t, e) {
  var n = t.length, r = -1, i, o = 0;
  if (e == null)
    for (; ++r < n; )
      (i = +t[r]) && (o += i);
  else
    for (; ++r < n; )
      (i = +e(t[r], r, t)) && (o += i);
  return o;
}
function Ks(t) {
  if (!(o = t.length)) return [];
  for (var e = -1, n = Vs(t, Hl), r = new Array(n); ++e < n; )
    for (var i = -1, o, a = r[e] = new Array(o); ++i < o; )
      a[i] = t[i][e];
  return r;
}
function Hl(t) {
  return t.length;
}
function jl() {
  return Ks(arguments);
}
const Wl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ascending: de,
  bisect: ae,
  bisectLeft: xl,
  bisectRight: ae,
  bisector: zi,
  cross: Sl,
  descending: Al,
  deviation: Bs,
  extent: qs,
  histogram: Cl,
  max: Dl,
  mean: Nl,
  median: Ll,
  merge: $l,
  min: Vs,
  pairs: Ml,
  permute: Il,
  quantile: an,
  range: Yi,
  scan: Fl,
  shuffle: Rl,
  sum: Ul,
  thresholdFreedmanDiaconis: kl,
  thresholdScott: Pl,
  thresholdSturges: Ys,
  tickIncrement: nn,
  tickStep: on,
  ticks: Vi,
  transpose: Ks,
  variance: Ws,
  zip: jl
}, Symbol.toStringTag, { value: "Module" }));
var bt = "$";
function qn() {
}
qn.prototype = zn.prototype = {
  constructor: qn,
  has: function(t) {
    return bt + t in this;
  },
  get: function(t) {
    return this[bt + t];
  },
  set: function(t, e) {
    return this[bt + t] = e, this;
  },
  remove: function(t) {
    var e = bt + t;
    return e in this && delete this[e];
  },
  clear: function() {
    for (var t in this) t[0] === bt && delete this[t];
  },
  keys: function() {
    var t = [];
    for (var e in this) e[0] === bt && t.push(e.slice(1));
    return t;
  },
  values: function() {
    var t = [];
    for (var e in this) e[0] === bt && t.push(this[e]);
    return t;
  },
  entries: function() {
    var t = [];
    for (var e in this) e[0] === bt && t.push({ key: e.slice(1), value: this[e] });
    return t;
  },
  size: function() {
    var t = 0;
    for (var e in this) e[0] === bt && ++t;
    return t;
  },
  empty: function() {
    for (var t in this) if (t[0] === bt) return !1;
    return !0;
  },
  each: function(t) {
    for (var e in this) e[0] === bt && t(this[e], e.slice(1), this);
  }
};
function zn(t, e) {
  var n = new qn();
  if (t instanceof qn) t.each(function(s, u) {
    n.set(u, s);
  });
  else if (Array.isArray(t)) {
    var r = -1, i = t.length, o;
    if (e == null) for (; ++r < i; ) n.set(r, t[r]);
    else for (; ++r < i; ) n.set(e(o = t[r], r, t), o);
  } else if (t) for (var a in t) n.set(a, t[a]);
  return n;
}
function jo() {
}
var Jt = zn.prototype;
jo.prototype = {
  constructor: jo,
  has: Jt.has,
  add: function(t) {
    return t += "", this[bt + t] = t, this;
  },
  remove: Jt.remove,
  clear: Jt.clear,
  values: Jt.keys,
  size: Jt.size,
  empty: Jt.empty,
  each: Jt.each
};
var Gs = Array.prototype, Ki = Gs.map, Yt = Gs.slice, di = { name: "implicit" };
function Gi(t) {
  var e = zn(), n = [], r = di;
  t = t == null ? [] : Yt.call(t);
  function i(o) {
    var a = o + "", s = e.get(a);
    if (!s) {
      if (r !== di) return r;
      e.set(a, s = n.push(o));
    }
    return t[(s - 1) % t.length];
  }
  return i.domain = function(o) {
    if (!arguments.length) return n.slice();
    n = [], e = zn();
    for (var a = -1, s = o.length, u, f; ++a < s; ) e.has(f = (u = o[a]) + "") || e.set(f, n.push(u));
    return i;
  }, i.range = function(o) {
    return arguments.length ? (t = Yt.call(o), i) : t.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return Gi().domain(n).range(t).unknown(r);
  }, i;
}
function Xi() {
  var t = Gi().unknown(void 0), e = t.domain, n = t.range, r = [0, 1], i, o, a = !1, s = 0, u = 0, f = 0.5;
  delete t.unknown;
  function d() {
    var l = e().length, c = r[1] < r[0], h = r[c - 0], p = r[1 - c];
    i = (p - h) / Math.max(1, l - s + u * 2), a && (i = Math.floor(i)), h += (p - h - i * (l - s)) * f, o = i * (1 - s), a && (h = Math.round(h), o = Math.round(o));
    var g = Yi(l).map(function(v) {
      return h + i * v;
    });
    return n(c ? g.reverse() : g);
  }
  return t.domain = function(l) {
    return arguments.length ? (e(l), d()) : e();
  }, t.range = function(l) {
    return arguments.length ? (r = [+l[0], +l[1]], d()) : r.slice();
  }, t.rangeRound = function(l) {
    return r = [+l[0], +l[1]], a = !0, d();
  }, t.bandwidth = function() {
    return o;
  }, t.step = function() {
    return i;
  }, t.round = function(l) {
    return arguments.length ? (a = !!l, d()) : a;
  }, t.padding = function(l) {
    return arguments.length ? (s = u = Math.max(0, Math.min(1, l)), d()) : s;
  }, t.paddingInner = function(l) {
    return arguments.length ? (s = Math.max(0, Math.min(1, l)), d()) : s;
  }, t.paddingOuter = function(l) {
    return arguments.length ? (u = Math.max(0, Math.min(1, l)), d()) : u;
  }, t.align = function(l) {
    return arguments.length ? (f = Math.max(0, Math.min(1, l)), d()) : f;
  }, t.copy = function() {
    return Xi().domain(e()).range(r).round(a).paddingInner(s).paddingOuter(u).align(f);
  }, d();
}
function Xs(t) {
  var e = t.copy;
  return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
    return Xs(e());
  }, t;
}
function Bl() {
  return Xs(Xi().paddingInner(1));
}
function lr(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Zi(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Le() {
}
var se = 0.7, Ae = 1 / se, be = "\\s*([+-]?\\d+)\\s*", sn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", kt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ql = /^#([0-9a-f]{3,8})$/, zl = new RegExp("^rgb\\(" + [be, be, be] + "\\)$"), Yl = new RegExp("^rgb\\(" + [kt, kt, kt] + "\\)$"), Vl = new RegExp("^rgba\\(" + [be, be, be, sn] + "\\)$"), Kl = new RegExp("^rgba\\(" + [kt, kt, kt, sn] + "\\)$"), Gl = new RegExp("^hsl\\(" + [sn, kt, kt] + "\\)$"), Xl = new RegExp("^hsla\\(" + [sn, kt, kt, sn] + "\\)$"), Wo = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
lr(Le, ue, {
  copy: function(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: Bo,
  // Deprecated! Use color.formatHex.
  formatHex: Bo,
  formatHsl: Zl,
  formatRgb: qo,
  toString: qo
});
function Bo() {
  return this.rgb().formatHex();
}
function Zl() {
  return Js(this).formatHsl();
}
function qo() {
  return this.rgb().formatRgb();
}
function ue(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ql.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? zo(e) : n === 3 ? new gt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? On(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? On(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = zl.exec(t)) ? new gt(e[1], e[2], e[3], 1) : (e = Yl.exec(t)) ? new gt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Vl.exec(t)) ? On(e[1], e[2], e[3], e[4]) : (e = Kl.exec(t)) ? On(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Gl.exec(t)) ? Ko(e[1], e[2] / 100, e[3] / 100, 1) : (e = Xl.exec(t)) ? Ko(e[1], e[2] / 100, e[3] / 100, e[4]) : Wo.hasOwnProperty(t) ? zo(Wo[t]) : t === "transparent" ? new gt(NaN, NaN, NaN, 0) : null;
}
function zo(t) {
  return new gt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function On(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new gt(t, e, n, r);
}
function Zs(t) {
  return t instanceof Le || (t = ue(t)), t ? (t = t.rgb(), new gt(t.r, t.g, t.b, t.opacity)) : new gt();
}
function pi(t, e, n, r) {
  return arguments.length === 1 ? Zs(t) : new gt(t, e, n, r ?? 1);
}
function gt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
lr(gt, pi, Zi(Le, {
  brighter: function(t) {
    return t = t == null ? Ae : Math.pow(Ae, t), new gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker: function(t) {
    return t = t == null ? se : Math.pow(se, t), new gt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Yo,
  // Deprecated! Use color.formatHex.
  formatHex: Yo,
  formatRgb: Vo,
  toString: Vo
}));
function Yo() {
  return "#" + Ir(this.r) + Ir(this.g) + Ir(this.b);
}
function Vo() {
  var t = this.opacity;
  return t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)), (t === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (t === 1 ? ")" : ", " + t + ")");
}
function Ir(t) {
  return t = Math.max(0, Math.min(255, Math.round(t) || 0)), (t < 16 ? "0" : "") + t.toString(16);
}
function Ko(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new Ct(t, e, n, r);
}
function Js(t) {
  if (t instanceof Ct) return new Ct(t.h, t.s, t.l, t.opacity);
  if (t instanceof Le || (t = ue(t)), !t) return new Ct();
  if (t instanceof Ct) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, s = o - i, u = (o + i) / 2;
  return s ? (e === o ? a = (n - r) / s + (n < r) * 6 : n === o ? a = (r - e) / s + 2 : a = (e - n) / s + 4, s /= u < 0.5 ? o + i : 2 - o - i, a *= 60) : s = u > 0 && u < 1 ? 0 : a, new Ct(a, s, u, t.opacity);
}
function Jl(t, e, n, r) {
  return arguments.length === 1 ? Js(t) : new Ct(t, e, n, r ?? 1);
}
function Ct(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
lr(Ct, Jl, Zi(Le, {
  brighter: function(t) {
    return t = t == null ? Ae : Math.pow(Ae, t), new Ct(this.h, this.s, this.l * t, this.opacity);
  },
  darker: function(t) {
    return t = t == null ? se : Math.pow(se, t), new Ct(this.h, this.s, this.l * t, this.opacity);
  },
  rgb: function() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new gt(
      Fr(t >= 240 ? t - 240 : t + 120, i, r),
      Fr(t, i, r),
      Fr(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl: function() {
    var t = this.opacity;
    return t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)), (t === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (t === 1 ? ")" : ", " + t + ")");
  }
}));
function Fr(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
var Ql = Math.PI / 180, th = 180 / Math.PI, Qs = -0.14861, Ji = 1.78277, Qi = -0.29227, hr = -0.90649, un = 1.97294, Go = un * hr, Xo = un * Ji, Zo = Ji * Qi - hr * Qs;
function eh(t) {
  if (t instanceof oe) return new oe(t.h, t.s, t.l, t.opacity);
  t instanceof gt || (t = Zs(t));
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = (Zo * r + Go * e - Xo * n) / (Zo + Go - Xo), o = r - i, a = (un * (n - i) - Qi * o) / hr, s = Math.sqrt(a * a + o * o) / (un * i * (1 - i)), u = s ? Math.atan2(a, o) * th - 120 : NaN;
  return new oe(u < 0 ? u + 360 : u, s, i, t.opacity);
}
function Pt(t, e, n, r) {
  return arguments.length === 1 ? eh(t) : new oe(t, e, n, r ?? 1);
}
function oe(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
lr(oe, Pt, Zi(Le, {
  brighter: function(t) {
    return t = t == null ? Ae : Math.pow(Ae, t), new oe(this.h, this.s, this.l * t, this.opacity);
  },
  darker: function(t) {
    return t = t == null ? se : Math.pow(se, t), new oe(this.h, this.s, this.l * t, this.opacity);
  },
  rgb: function() {
    var t = isNaN(this.h) ? 0 : (this.h + 120) * Ql, e = +this.l, n = isNaN(this.s) ? 0 : this.s * e * (1 - e), r = Math.cos(t), i = Math.sin(t);
    return new gt(
      255 * (e + n * (Qs * r + Ji * i)),
      255 * (e + n * (Qi * r + hr * i)),
      255 * (e + n * (un * r)),
      this.opacity
    );
  }
}));
function dr(t) {
  return function() {
    return t;
  };
}
function tu(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function nh(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function rh(t, e) {
  var n = e - t;
  return n ? tu(t, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : dr(isNaN(t) ? e : t);
}
function ih(t) {
  return (t = +t) == 1 ? we : function(e, n) {
    return n - e ? nh(e, n, t) : dr(isNaN(e) ? n : e);
  };
}
function we(t, e) {
  var n = e - t;
  return n ? tu(t, n) : dr(isNaN(t) ? e : t);
}
const Yn = function t(e) {
  var n = ih(e);
  function r(i, o) {
    var a = n((i = pi(i)).r, (o = pi(o)).r), s = n(i.g, o.g), u = n(i.b, o.b), f = we(i.opacity, o.opacity);
    return function(d) {
      return i.r = a(d), i.g = s(d), i.b = u(d), i.opacity = f(d), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function oh(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function ah(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function sh(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), a;
  for (a = 0; a < r; ++a) i[a] = to(t[a], e[a]);
  for (; a < n; ++a) o[a] = e[a];
  return function(s) {
    for (a = 0; a < r; ++a) o[a] = i[a](s);
    return o;
  };
}
function uh(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function wt(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function ch(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = to(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var gi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rr = new RegExp(gi.source, "g");
function fh(t) {
  return function() {
    return t;
  };
}
function lh(t) {
  return function(e) {
    return t(e) + "";
  };
}
function eu(t, e) {
  var n = gi.lastIndex = Rr.lastIndex = 0, r, i, o, a = -1, s = [], u = [];
  for (t = t + "", e = e + ""; (r = gi.exec(t)) && (i = Rr.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), s[a] ? s[a] += o : s[++a] = o), (r = r[0]) === (i = i[0]) ? s[a] ? s[a] += i : s[++a] = i : (s[++a] = null, u.push({ i: a, x: wt(r, i) })), n = Rr.lastIndex;
  return n < e.length && (o = e.slice(n), s[a] ? s[a] += o : s[++a] = o), s.length < 2 ? u[0] ? lh(u[0].x) : fh(e) : (e = u.length, function(f) {
    for (var d = 0, l; d < e; ++d) s[(l = u[d]).i] = l.x(f);
    return s.join("");
  });
}
function to(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? dr(e) : (n === "number" ? wt : n === "string" ? (r = ue(e)) ? (e = r, Yn) : eu : e instanceof ue ? Yn : e instanceof Date ? uh : ah(e) ? oh : Array.isArray(e) ? sh : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ch : wt)(t, e);
}
function hh(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Jo = 180 / Math.PI, mi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function nu(t, e, n, r, i, o) {
  var a, s, u;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (u = t * n + e * r) && (n -= t * u, r -= e * u), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, u /= s), t * r < e * n && (t = -t, e = -e, u = -u, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Jo,
    skewX: Math.atan(u) * Jo,
    scaleX: a,
    scaleY: s
  };
}
var We, Ur, Qo, Cn;
function dh(t) {
  return t === "none" ? mi : (We || (We = document.createElement("DIV"), Ur = document.documentElement, Qo = document.defaultView), We.style.transform = t, t = Qo.getComputedStyle(Ur.appendChild(We), null).getPropertyValue("transform"), Ur.removeChild(We), t = t.slice(7, -1).split(","), nu(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
}
function ph(t) {
  return t == null || (Cn || (Cn = document.createElementNS("http://www.w3.org/2000/svg", "g")), Cn.setAttribute("transform", t), !(t = Cn.transform.baseVal.consolidate())) ? mi : (t = t.matrix, nu(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ru(t, e, n, r) {
  function i(f) {
    return f.length ? f.pop() + " " : "";
  }
  function o(f, d, l, c, h, p) {
    if (f !== l || d !== c) {
      var g = h.push("translate(", null, e, null, n);
      p.push({ i: g - 4, x: wt(f, l) }, { i: g - 2, x: wt(d, c) });
    } else (l || c) && h.push("translate(" + l + e + c + n);
  }
  function a(f, d, l, c) {
    f !== d ? (f - d > 180 ? d += 360 : d - f > 180 && (f += 360), c.push({ i: l.push(i(l) + "rotate(", null, r) - 2, x: wt(f, d) })) : d && l.push(i(l) + "rotate(" + d + r);
  }
  function s(f, d, l, c) {
    f !== d ? c.push({ i: l.push(i(l) + "skewX(", null, r) - 2, x: wt(f, d) }) : d && l.push(i(l) + "skewX(" + d + r);
  }
  function u(f, d, l, c, h, p) {
    if (f !== l || d !== c) {
      var g = h.push(i(h) + "scale(", null, ",", null, ")");
      p.push({ i: g - 4, x: wt(f, l) }, { i: g - 2, x: wt(d, c) });
    } else (l !== 1 || c !== 1) && h.push(i(h) + "scale(" + l + "," + c + ")");
  }
  return function(f, d) {
    var l = [], c = [];
    return f = t(f), d = t(d), o(f.translateX, f.translateY, d.translateX, d.translateY, l, c), a(f.rotate, d.rotate, l, c), s(f.skewX, d.skewX, l, c), u(f.scaleX, f.scaleY, d.scaleX, d.scaleY, l, c), f = d = null, function(h) {
      for (var p = -1, g = c.length, v; ++p < g; ) l[(v = c[p]).i] = v.x(h);
      return l.join("");
    };
  };
}
var gh = ru(dh, "px, ", "px)", "deg)"), mh = ru(ph, ", ", ")", ")");
function iu(t) {
  return function e(n) {
    n = +n;
    function r(i, o) {
      var a = t((i = Pt(i)).h, (o = Pt(o)).h), s = we(i.s, o.s), u = we(i.l, o.l), f = we(i.opacity, o.opacity);
      return function(d) {
        return i.h = a(d), i.s = s(d), i.l = u(Math.pow(d, n)), i.opacity = f(d), i + "";
      };
    }
    return r.gamma = e, r;
  }(1);
}
iu(rh);
var eo = iu(we);
function no(t) {
  return function() {
    return t;
  };
}
function ou(t) {
  return +t;
}
var ta = [0, 1];
function ro(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : no(e);
}
function vh(t) {
  return function(e, n) {
    var r = t(e = +e, n = +n);
    return function(i) {
      return i <= e ? 0 : i >= n ? 1 : r(i);
    };
  };
}
function yh(t) {
  return function(e, n) {
    var r = t(e = +e, n = +n);
    return function(i) {
      return i <= 0 ? e : i >= 1 ? n : r(i);
    };
  };
}
function _h(t, e, n, r) {
  var i = t[0], o = t[1], a = e[0], s = e[1];
  return o < i ? (i = n(o, i), a = r(s, a)) : (i = n(i, o), a = r(a, s)), function(u) {
    return a(i(u));
  };
}
function bh(t, e, n, r) {
  var i = Math.min(t.length, e.length) - 1, o = new Array(i), a = new Array(i), s = -1;
  for (t[i] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < i; )
    o[s] = n(t[s], t[s + 1]), a[s] = r(e[s], e[s + 1]);
  return function(u) {
    var f = ae(t, u, 1, i) - 1;
    return a[f](o[f](u));
  };
}
function pr(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp());
}
function gr(t, e) {
  var n = ta, r = ta, i = to, o = !1, a, s, u;
  function f() {
    return a = Math.min(n.length, r.length) > 2 ? bh : _h, s = u = null, d;
  }
  function d(l) {
    return (s || (s = a(n, r, o ? vh(t) : t, i)))(+l);
  }
  return d.invert = function(l) {
    return (u || (u = a(r, n, ro, o ? yh(e) : e)))(+l);
  }, d.domain = function(l) {
    return arguments.length ? (n = Ki.call(l, ou), f()) : n.slice();
  }, d.range = function(l) {
    return arguments.length ? (r = Yt.call(l), f()) : r.slice();
  }, d.rangeRound = function(l) {
    return r = Yt.call(l), i = hh, f();
  }, d.clamp = function(l) {
    return arguments.length ? (o = !!l, f()) : o;
  }, d.interpolate = function(l) {
    return arguments.length ? (i = l, f()) : i;
  }, f();
}
function wh(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function Vn(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Ee(t) {
  return t = Vn(Math.abs(t)), t ? t[1] : NaN;
}
function xh(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], a = 0, s = t[0], u = 0; i > 0 && s > 0 && (u + s + 1 > r && (s = Math.max(1, r - u)), o.push(n.substring(i -= s, i + s)), !((u += s + 1) > r)); )
      s = t[a = (a + 1) % t.length];
    return o.reverse().join(e);
  };
}
function Mh(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Sh = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Kn(t) {
  if (!(e = Sh.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new io({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Kn.prototype = io.prototype;
function io(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
io.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Ah(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var au;
function Eh(t, e) {
  var n = Vn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (au = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Vn(t, Math.max(0, e + o - 1))[0];
}
function ea(t, e) {
  var n = Vn(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const na = {
  "%": function(t, e) {
    return (t * 100).toFixed(e);
  },
  b: function(t) {
    return Math.round(t).toString(2);
  },
  c: function(t) {
    return t + "";
  },
  d: wh,
  e: function(t, e) {
    return t.toExponential(e);
  },
  f: function(t, e) {
    return t.toFixed(e);
  },
  g: function(t, e) {
    return t.toPrecision(e);
  },
  o: function(t) {
    return Math.round(t).toString(8);
  },
  p: function(t, e) {
    return ea(t * 100, e);
  },
  r: ea,
  s: Eh,
  X: function(t) {
    return Math.round(t).toString(16).toUpperCase();
  },
  x: function(t) {
    return Math.round(t).toString(16);
  }
};
function ra(t) {
  return t;
}
var ia = Array.prototype.map, oa = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Th(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? ra : xh(ia.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? ra : Mh(ia.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", s = t.minus === void 0 ? "-" : t.minus + "", u = t.nan === void 0 ? "NaN" : t.nan + "";
  function f(l) {
    l = Kn(l);
    var c = l.fill, h = l.align, p = l.sign, g = l.symbol, v = l.zero, x = l.width, S = l.comma, A = l.precision, I = l.trim, R = l.type;
    R === "n" ? (S = !0, R = "g") : na[R] || (A === void 0 && (A = 12), I = !0, R = "g"), (v || c === "0" && h === "=") && (v = !0, c = "0", h = "=");
    var F = g === "$" ? n : g === "#" && /[boxX]/.test(R) ? "0" + R.toLowerCase() : "", L = g === "$" ? r : /[%p]/.test(R) ? a : "", j = na[R], W = /[defgprs%]/.test(R);
    A = A === void 0 ? 6 : /[gprs]/.test(R) ? Math.max(1, Math.min(21, A)) : Math.max(0, Math.min(20, A));
    function q(E) {
      var k = F, P = L, N, C, U;
      if (R === "c")
        P = j(E) + P, E = "";
      else {
        E = +E;
        var Z = E < 0 || 1 / E < 0;
        if (E = isNaN(E) ? u : j(Math.abs(E), A), I && (E = Ah(E)), Z && +E == 0 && p !== "+" && (Z = !1), k = (Z ? p === "(" ? p : s : p === "-" || p === "(" ? "" : p) + k, P = (R === "s" ? oa[8 + au / 3] : "") + P + (Z && p === "(" ? ")" : ""), W) {
          for (N = -1, C = E.length; ++N < C; )
            if (U = E.charCodeAt(N), 48 > U || U > 57) {
              P = (U === 46 ? i + E.slice(N + 1) : E.slice(N)) + P, E = E.slice(0, N);
              break;
            }
        }
      }
      S && !v && (E = e(E, 1 / 0));
      var at = k.length + E.length + P.length, tt = at < x ? new Array(x - at + 1).join(c) : "";
      switch (S && v && (E = e(tt + E, tt.length ? x - P.length : 1 / 0), tt = ""), h) {
        case "<":
          E = k + E + P + tt;
          break;
        case "=":
          E = k + tt + E + P;
          break;
        case "^":
          E = tt.slice(0, at = tt.length >> 1) + k + E + P + tt.slice(at);
          break;
        default:
          E = tt + k + E + P;
          break;
      }
      return o(E);
    }
    return q.toString = function() {
      return l + "";
    }, q;
  }
  function d(l, c) {
    var h = f((l = Kn(l), l.type = "f", l)), p = Math.max(-8, Math.min(8, Math.floor(Ee(c) / 3))) * 3, g = Math.pow(10, -p), v = oa[8 + p / 3];
    return function(x) {
      return h(g * x) + v;
    };
  }
  return {
    format: f,
    formatPrefix: d
  };
}
var kn, oo, su;
Oh({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function Oh(t) {
  return kn = Th(t), oo = kn.format, su = kn.formatPrefix, kn;
}
function Ch(t) {
  return Math.max(0, -Ee(Math.abs(t)));
}
function kh(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ee(e) / 3))) * 3 - Ee(Math.abs(t)));
}
function Ph(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ee(e) - Ee(t)) + 1;
}
function Dh(t, e, n) {
  var r = t[0], i = t[t.length - 1], o = on(r, i, e ?? 10), a;
  switch (n = Kn(n ?? ",f"), n.type) {
    case "s": {
      var s = Math.max(Math.abs(r), Math.abs(i));
      return n.precision == null && !isNaN(a = kh(o, s)) && (n.precision = a), su(n, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = Ph(o, Math.max(Math.abs(r), Math.abs(i)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = Ch(o)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return oo(n);
}
function mn(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Vi(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    return Dh(e(), n, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, a = r[i], s = r[o], u;
    return s < a && (u = a, a = s, s = u, u = i, i = o, o = u), u = nn(a, s, n), u > 0 ? (a = Math.floor(a / u) * u, s = Math.ceil(s / u) * u, u = nn(a, s, n)) : u < 0 && (a = Math.ceil(a * u) / u, s = Math.floor(s * u) / u, u = nn(a, s, n)), u > 0 ? (r[i] = Math.floor(a / u) * u, r[o] = Math.ceil(s / u) * u, e(r)) : u < 0 && (r[i] = Math.ceil(a * u) / u, r[o] = Math.floor(s * u) / u, e(r)), t;
  }, t;
}
function uu() {
  var t = gr(ro, wt);
  return t.copy = function() {
    return pr(t, uu());
  }, mn(t);
}
function cu() {
  var t = [0, 1];
  function e(n) {
    return +n;
  }
  return e.invert = e, e.domain = e.range = function(n) {
    return arguments.length ? (t = Ki.call(n, ou), e) : t.slice();
  }, e.copy = function() {
    return cu().domain(t);
  }, mn(e);
}
function fu(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], o = t[r], a;
  return o < i && (a = n, n = r, r = a, a = i, i = o, o = a), t[n] = e.floor(i), t[r] = e.ceil(o), t;
}
function Nh(t, e) {
  return (e = Math.log(e / t)) ? function(n) {
    return Math.log(n / t) / e;
  } : no(e);
}
function Lh(t, e) {
  return t < 0 ? function(n) {
    return -Math.pow(-e, n) * Math.pow(-t, 1 - n);
  } : function(n) {
    return Math.pow(e, n) * Math.pow(t, 1 - n);
  };
}
function $h(t) {
  return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t;
}
function aa(t) {
  return t === 10 ? $h : t === Math.E ? Math.exp : function(e) {
    return Math.pow(t, e);
  };
}
function sa(t) {
  return t === Math.E ? Math.log : t === 10 && Math.log10 || t === 2 && Math.log2 || (t = Math.log(t), function(e) {
    return Math.log(e) / t;
  });
}
function ua(t) {
  return function(e) {
    return -t(-e);
  };
}
function lu() {
  var t = gr(Nh, Lh).domain([1, 10]), e = t.domain, n = 10, r = sa(10), i = aa(10);
  function o() {
    return r = sa(n), i = aa(n), e()[0] < 0 && (r = ua(r), i = ua(i)), t;
  }
  return t.base = function(a) {
    return arguments.length ? (n = +a, o()) : n;
  }, t.domain = function(a) {
    return arguments.length ? (e(a), o()) : e();
  }, t.ticks = function(a) {
    var s = e(), u = s[0], f = s[s.length - 1], d;
    (d = f < u) && (l = u, u = f, f = l);
    var l = r(u), c = r(f), h, p, g, v = a == null ? 10 : +a, x = [];
    if (!(n % 1) && c - l < v) {
      if (l = Math.round(l) - 1, c = Math.round(c) + 1, u > 0) {
        for (; l < c; ++l)
          for (p = 1, h = i(l); p < n; ++p)
            if (g = h * p, !(g < u)) {
              if (g > f) break;
              x.push(g);
            }
      } else for (; l < c; ++l)
        for (p = n - 1, h = i(l); p >= 1; --p)
          if (g = h * p, !(g < u)) {
            if (g > f) break;
            x.push(g);
          }
    } else
      x = Vi(l, c, Math.min(c - l, v)).map(i);
    return d ? x.reverse() : x;
  }, t.tickFormat = function(a, s) {
    if (s == null && (s = n === 10 ? ".0e" : ","), typeof s != "function" && (s = oo(s)), a === 1 / 0) return s;
    a == null && (a = 10);
    var u = Math.max(1, n * a / t.ticks().length);
    return function(f) {
      var d = f / i(Math.round(r(f)));
      return d * n < n - 0.5 && (d *= n), d <= u ? s(f) : "";
    };
  }, t.nice = function() {
    return e(fu(e(), {
      floor: function(a) {
        return i(Math.floor(r(a)));
      },
      ceil: function(a) {
        return i(Math.ceil(r(a)));
      }
    }));
  }, t.copy = function() {
    return pr(t, lu().base(n));
  }, t;
}
function ve(t, e) {
  return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
}
function ao() {
  var t = 1, e = gr(r, i), n = e.domain;
  function r(o, a) {
    return (a = ve(a, t) - (o = ve(o, t))) ? function(s) {
      return (ve(s, t) - o) / a;
    } : no(a);
  }
  function i(o, a) {
    return a = ve(a, t) - (o = ve(o, t)), function(s) {
      return ve(o + a * s, 1 / t);
    };
  }
  return e.exponent = function(o) {
    return arguments.length ? (t = +o, n(n())) : t;
  }, e.copy = function() {
    return pr(e, ao().exponent(t));
  }, mn(e);
}
function Ih() {
  return ao().exponent(0.5);
}
function hu() {
  var t = [], e = [], n = [];
  function r() {
    var o = 0, a = Math.max(1, e.length);
    for (n = new Array(a - 1); ++o < a; ) n[o - 1] = an(t, o / a);
    return i;
  }
  function i(o) {
    if (!isNaN(o = +o)) return e[ae(n, o)];
  }
  return i.invertExtent = function(o) {
    var a = e.indexOf(o);
    return a < 0 ? [NaN, NaN] : [
      a > 0 ? n[a - 1] : t[0],
      a < n.length ? n[a] : t[t.length - 1]
    ];
  }, i.domain = function(o) {
    if (!arguments.length) return t.slice();
    t = [];
    for (var a = 0, s = o.length, u; a < s; ++a) u = o[a], u != null && !isNaN(u = +u) && t.push(u);
    return t.sort(de), r();
  }, i.range = function(o) {
    return arguments.length ? (e = Yt.call(o), r()) : e.slice();
  }, i.quantiles = function() {
    return n.slice();
  }, i.copy = function() {
    return hu().domain(t).range(e);
  }, i;
}
function du() {
  var t = 0, e = 1, n = 1, r = [0.5], i = [0, 1];
  function o(s) {
    if (s <= s) return i[ae(r, s, 0, n)];
  }
  function a() {
    var s = -1;
    for (r = new Array(n); ++s < n; ) r[s] = ((s + 1) * e - (s - n) * t) / (n + 1);
    return o;
  }
  return o.domain = function(s) {
    return arguments.length ? (t = +s[0], e = +s[1], a()) : [t, e];
  }, o.range = function(s) {
    return arguments.length ? (n = (i = Yt.call(s)).length - 1, a()) : i.slice();
  }, o.invertExtent = function(s) {
    var u = i.indexOf(s);
    return u < 0 ? [NaN, NaN] : u < 1 ? [t, r[0]] : u >= n ? [r[n - 1], e] : [r[u - 1], r[u]];
  }, o.copy = function() {
    return du().domain([t, e]).range(i);
  }, mn(o);
}
function pu() {
  var t = [0.5], e = [0, 1], n = 1;
  function r(i) {
    if (i <= i) return e[ae(t, i, 0, n)];
  }
  return r.domain = function(i) {
    return arguments.length ? (t = Yt.call(i), n = Math.min(t.length, e.length - 1), r) : t.slice();
  }, r.range = function(i) {
    return arguments.length ? (e = Yt.call(i), n = Math.min(t.length, e.length - 1), r) : e.slice();
  }, r.invertExtent = function(i) {
    var o = e.indexOf(i);
    return [t[o - 1], t[o]];
  }, r.copy = function() {
    return pu().domain(t).range(e);
  }, r;
}
var Hr = /* @__PURE__ */ new Date(), jr = /* @__PURE__ */ new Date();
function st(t, e, n, r) {
  function i(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return i.floor = function(o) {
    return t(o = /* @__PURE__ */ new Date(+o)), o;
  }, i.ceil = function(o) {
    return t(o = new Date(o - 1)), e(o, 1), t(o), o;
  }, i.round = function(o) {
    var a = i(o), s = i.ceil(o);
    return o - a < s - o ? a : s;
  }, i.offset = function(o, a) {
    return e(o = /* @__PURE__ */ new Date(+o), a == null ? 1 : Math.floor(a)), o;
  }, i.range = function(o, a, s) {
    var u = [], f;
    if (o = i.ceil(o), s = s == null ? 1 : Math.floor(s), !(o < a) || !(s > 0)) return u;
    do
      u.push(f = /* @__PURE__ */ new Date(+o)), e(o, s), t(o);
    while (f < o && o < a);
    return u;
  }, i.filter = function(o) {
    return st(function(a) {
      if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
    }, function(a, s) {
      if (a >= a)
        if (s < 0) for (; ++s <= 0; )
          for (; e(a, -1), !o(a); )
            ;
        else for (; --s >= 0; )
          for (; e(a, 1), !o(a); )
            ;
    });
  }, n && (i.count = function(o, a) {
    return Hr.setTime(+o), jr.setTime(+a), t(Hr), t(jr), Math.floor(n(Hr, jr));
  }, i.every = function(o) {
    return o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? function(a) {
      return r(a) % o === 0;
    } : function(a) {
      return i.count(0, a) % o === 0;
    }) : i;
  }), i;
}
var cn = st(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
cn.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? st(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, n) {
    e.setTime(+e + n * t);
  }, function(e, n) {
    return (n - e) / t;
  }) : cn;
};
cn.range;
var Gn = 1e3, ce = 6e4, Xn = 36e5, gu = 864e5, mu = 6048e5, so = st(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * Gn);
}, function(t, e) {
  return (e - t) / Gn;
}, function(t) {
  return t.getUTCSeconds();
});
so.range;
var vu = st(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * Gn);
}, function(t, e) {
  t.setTime(+t + e * ce);
}, function(t, e) {
  return (e - t) / ce;
}, function(t) {
  return t.getMinutes();
});
vu.range;
var yu = st(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * Gn - t.getMinutes() * ce);
}, function(t, e) {
  t.setTime(+t + e * Xn);
}, function(t, e) {
  return (e - t) / Xn;
}, function(t) {
  return t.getHours();
});
yu.range;
var mr = st(function(t) {
  t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setDate(t.getDate() + e);
}, function(t, e) {
  return (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * ce) / gu;
}, function(t) {
  return t.getDate() - 1;
});
mr.range;
function pe(t) {
  return st(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setDate(e.getDate() + n * 7);
  }, function(e, n) {
    return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * ce) / mu;
  });
}
var uo = pe(0), Zn = pe(1), Fh = pe(2), Rh = pe(3), Te = pe(4), Uh = pe(5), Hh = pe(6);
uo.range;
Zn.range;
Fh.range;
Rh.range;
Te.range;
Uh.range;
Hh.range;
var _u = st(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
_u.range;
var Vt = st(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
Vt.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : st(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setFullYear(e.getFullYear() + n * t);
  });
};
Vt.range;
var bu = st(function(t) {
  t.setUTCSeconds(0, 0);
}, function(t, e) {
  t.setTime(+t + e * ce);
}, function(t, e) {
  return (e - t) / ce;
}, function(t) {
  return t.getUTCMinutes();
});
bu.range;
var wu = st(function(t) {
  t.setUTCMinutes(0, 0, 0);
}, function(t, e) {
  t.setTime(+t + e * Xn);
}, function(t, e) {
  return (e - t) / Xn;
}, function(t) {
  return t.getUTCHours();
});
wu.range;
var vr = st(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / gu;
}, function(t) {
  return t.getUTCDate() - 1;
});
vr.range;
function ge(t) {
  return st(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, function(e, n) {
    return (n - e) / mu;
  });
}
var co = ge(0), Jn = ge(1), jh = ge(2), Wh = ge(3), Oe = ge(4), Bh = ge(5), qh = ge(6);
co.range;
Jn.range;
jh.range;
Wh.range;
Oe.range;
Bh.range;
qh.range;
var xu = st(function(t) {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCMonth(t.getUTCMonth() + e);
}, function(t, e) {
  return e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12;
}, function(t) {
  return t.getUTCMonth();
});
xu.range;
var Kt = st(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
Kt.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : st(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCFullYear(e.getUTCFullYear() + n * t);
  });
};
Kt.range;
function Wr(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Br(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Be(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function zh(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, s = t.months, u = t.shortMonths, f = qe(i), d = ze(i), l = qe(o), c = ze(o), h = qe(a), p = ze(a), g = qe(s), v = ze(s), x = qe(u), S = ze(u), A = {
    a: Z,
    A: at,
    b: tt,
    B: ct,
    c: null,
    d: pa,
    e: pa,
    f: pd,
    g: Sd,
    G: Ed,
    H: ld,
    I: hd,
    j: dd,
    L: Mu,
    m: gd,
    M: md,
    p: Et,
    q: Nt,
    Q: va,
    s: ya,
    S: vd,
    u: yd,
    U: _d,
    V: bd,
    w: wd,
    W: xd,
    x: null,
    X: null,
    y: Md,
    Y: Ad,
    Z: Td,
    "%": ma
  }, I = {
    a: Lt,
    A: _t,
    b: Y,
    B: Ar,
    c: null,
    d: ga,
    e: ga,
    f: Pd,
    g: jd,
    G: Bd,
    H: Od,
    I: Cd,
    j: kd,
    L: Au,
    m: Dd,
    M: Nd,
    p: Er,
    q: yn,
    Q: va,
    s: ya,
    S: Ld,
    u: $d,
    U: Id,
    V: Fd,
    w: Rd,
    W: Ud,
    x: null,
    X: null,
    y: Hd,
    Y: Wd,
    Z: qd,
    "%": ma
  }, R = {
    a: q,
    A: E,
    b: k,
    B: P,
    c: N,
    d: ha,
    e: ha,
    f: sd,
    g: la,
    G: fa,
    H: da,
    I: da,
    j: rd,
    L: ad,
    m: nd,
    M: id,
    p: W,
    q: ed,
    Q: cd,
    s: fd,
    S: od,
    u: Xh,
    U: Zh,
    V: Jh,
    w: Gh,
    W: Qh,
    x: C,
    X: U,
    y: la,
    Y: fa,
    Z: td,
    "%": ud
  };
  A.x = F(n, A), A.X = F(r, A), A.c = F(e, A), I.x = F(n, I), I.X = F(r, I), I.c = F(e, I);
  function F($, B) {
    return function(V) {
      var T = [], lt = -1, G = 0, ht = $.length, dt, $t, $e;
      for (V instanceof Date || (V = /* @__PURE__ */ new Date(+V)); ++lt < ht; )
        $.charCodeAt(lt) === 37 && (T.push($.slice(G, lt)), ($t = ca[dt = $.charAt(++lt)]) != null ? dt = $.charAt(++lt) : $t = dt === "e" ? " " : "0", ($e = B[dt]) && (dt = $e(V, $t)), T.push(dt), G = lt + 1);
      return T.push($.slice(G, lt)), T.join("");
    };
  }
  function L($, B) {
    return function(V) {
      var T = Be(1900, void 0, 1), lt = j(T, $, V += "", 0), G, ht;
      if (lt != V.length) return null;
      if ("Q" in T) return new Date(T.Q);
      if ("s" in T) return new Date(T.s * 1e3 + ("L" in T ? T.L : 0));
      if (B && !("Z" in T) && (T.Z = 0), "p" in T && (T.H = T.H % 12 + T.p * 12), T.m === void 0 && (T.m = "q" in T ? T.q : 0), "V" in T) {
        if (T.V < 1 || T.V > 53) return null;
        "w" in T || (T.w = 1), "Z" in T ? (G = Br(Be(T.y, 0, 1)), ht = G.getUTCDay(), G = ht > 4 || ht === 0 ? Jn.ceil(G) : Jn(G), G = vr.offset(G, (T.V - 1) * 7), T.y = G.getUTCFullYear(), T.m = G.getUTCMonth(), T.d = G.getUTCDate() + (T.w + 6) % 7) : (G = Wr(Be(T.y, 0, 1)), ht = G.getDay(), G = ht > 4 || ht === 0 ? Zn.ceil(G) : Zn(G), G = mr.offset(G, (T.V - 1) * 7), T.y = G.getFullYear(), T.m = G.getMonth(), T.d = G.getDate() + (T.w + 6) % 7);
      } else ("W" in T || "U" in T) && ("w" in T || (T.w = "u" in T ? T.u % 7 : "W" in T ? 1 : 0), ht = "Z" in T ? Br(Be(T.y, 0, 1)).getUTCDay() : Wr(Be(T.y, 0, 1)).getDay(), T.m = 0, T.d = "W" in T ? (T.w + 6) % 7 + T.W * 7 - (ht + 5) % 7 : T.w + T.U * 7 - (ht + 6) % 7);
      return "Z" in T ? (T.H += T.Z / 100 | 0, T.M += T.Z % 100, Br(T)) : Wr(T);
    };
  }
  function j($, B, V, T) {
    for (var lt = 0, G = B.length, ht = V.length, dt, $t; lt < G; ) {
      if (T >= ht) return -1;
      if (dt = B.charCodeAt(lt++), dt === 37) {
        if (dt = B.charAt(lt++), $t = R[dt in ca ? B.charAt(lt++) : dt], !$t || (T = $t($, V, T)) < 0) return -1;
      } else if (dt != V.charCodeAt(T++))
        return -1;
    }
    return T;
  }
  function W($, B, V) {
    var T = f.exec(B.slice(V));
    return T ? ($.p = d[T[0].toLowerCase()], V + T[0].length) : -1;
  }
  function q($, B, V) {
    var T = h.exec(B.slice(V));
    return T ? ($.w = p[T[0].toLowerCase()], V + T[0].length) : -1;
  }
  function E($, B, V) {
    var T = l.exec(B.slice(V));
    return T ? ($.w = c[T[0].toLowerCase()], V + T[0].length) : -1;
  }
  function k($, B, V) {
    var T = x.exec(B.slice(V));
    return T ? ($.m = S[T[0].toLowerCase()], V + T[0].length) : -1;
  }
  function P($, B, V) {
    var T = g.exec(B.slice(V));
    return T ? ($.m = v[T[0].toLowerCase()], V + T[0].length) : -1;
  }
  function N($, B, V) {
    return j($, e, B, V);
  }
  function C($, B, V) {
    return j($, n, B, V);
  }
  function U($, B, V) {
    return j($, r, B, V);
  }
  function Z($) {
    return a[$.getDay()];
  }
  function at($) {
    return o[$.getDay()];
  }
  function tt($) {
    return u[$.getMonth()];
  }
  function ct($) {
    return s[$.getMonth()];
  }
  function Et($) {
    return i[+($.getHours() >= 12)];
  }
  function Nt($) {
    return 1 + ~~($.getMonth() / 3);
  }
  function Lt($) {
    return a[$.getUTCDay()];
  }
  function _t($) {
    return o[$.getUTCDay()];
  }
  function Y($) {
    return u[$.getUTCMonth()];
  }
  function Ar($) {
    return s[$.getUTCMonth()];
  }
  function Er($) {
    return i[+($.getUTCHours() >= 12)];
  }
  function yn($) {
    return 1 + ~~($.getUTCMonth() / 3);
  }
  return {
    format: function($) {
      var B = F($ += "", A);
      return B.toString = function() {
        return $;
      }, B;
    },
    parse: function($) {
      var B = L($ += "", !1);
      return B.toString = function() {
        return $;
      }, B;
    },
    utcFormat: function($) {
      var B = F($ += "", I);
      return B.toString = function() {
        return $;
      }, B;
    },
    utcParse: function($) {
      var B = L($ += "", !0);
      return B.toString = function() {
        return $;
      }, B;
    }
  };
}
var ca = { "-": "", _: " ", 0: "0" }, ut = /^\s*\d+/, Yh = /^%/, Vh = /[\\^$*+?|[\]().{}]/g;
function K(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Kh(t) {
  return t.replace(Vh, "\\$&");
}
function qe(t) {
  return new RegExp("^(?:" + t.map(Kh).join("|") + ")", "i");
}
function ze(t) {
  for (var e = {}, n = -1, r = t.length; ++n < r; ) e[t[n].toLowerCase()] = n;
  return e;
}
function Gh(t, e, n) {
  var r = ut.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Xh(t, e, n) {
  var r = ut.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Zh(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Jh(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Qh(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function fa(t, e, n) {
  var r = ut.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function la(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function td(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function ed(t, e, n) {
  var r = ut.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function nd(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function ha(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function rd(t, e, n) {
  var r = ut.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function da(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function id(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function od(t, e, n) {
  var r = ut.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function ad(t, e, n) {
  var r = ut.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function sd(t, e, n) {
  var r = ut.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function ud(t, e, n) {
  var r = Yh.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function cd(t, e, n) {
  var r = ut.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function fd(t, e, n) {
  var r = ut.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function pa(t, e) {
  return K(t.getDate(), e, 2);
}
function ld(t, e) {
  return K(t.getHours(), e, 2);
}
function hd(t, e) {
  return K(t.getHours() % 12 || 12, e, 2);
}
function dd(t, e) {
  return K(1 + mr.count(Vt(t), t), e, 3);
}
function Mu(t, e) {
  return K(t.getMilliseconds(), e, 3);
}
function pd(t, e) {
  return Mu(t, e) + "000";
}
function gd(t, e) {
  return K(t.getMonth() + 1, e, 2);
}
function md(t, e) {
  return K(t.getMinutes(), e, 2);
}
function vd(t, e) {
  return K(t.getSeconds(), e, 2);
}
function yd(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function _d(t, e) {
  return K(uo.count(Vt(t) - 1, t), e, 2);
}
function Su(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Te(t) : Te.ceil(t);
}
function bd(t, e) {
  return t = Su(t), K(Te.count(Vt(t), t) + (Vt(t).getDay() === 4), e, 2);
}
function wd(t) {
  return t.getDay();
}
function xd(t, e) {
  return K(Zn.count(Vt(t) - 1, t), e, 2);
}
function Md(t, e) {
  return K(t.getFullYear() % 100, e, 2);
}
function Sd(t, e) {
  return t = Su(t), K(t.getFullYear() % 100, e, 2);
}
function Ad(t, e) {
  return K(t.getFullYear() % 1e4, e, 4);
}
function Ed(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? Te(t) : Te.ceil(t), K(t.getFullYear() % 1e4, e, 4);
}
function Td(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + K(e / 60 | 0, "0", 2) + K(e % 60, "0", 2);
}
function ga(t, e) {
  return K(t.getUTCDate(), e, 2);
}
function Od(t, e) {
  return K(t.getUTCHours(), e, 2);
}
function Cd(t, e) {
  return K(t.getUTCHours() % 12 || 12, e, 2);
}
function kd(t, e) {
  return K(1 + vr.count(Kt(t), t), e, 3);
}
function Au(t, e) {
  return K(t.getUTCMilliseconds(), e, 3);
}
function Pd(t, e) {
  return Au(t, e) + "000";
}
function Dd(t, e) {
  return K(t.getUTCMonth() + 1, e, 2);
}
function Nd(t, e) {
  return K(t.getUTCMinutes(), e, 2);
}
function Ld(t, e) {
  return K(t.getUTCSeconds(), e, 2);
}
function $d(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Id(t, e) {
  return K(co.count(Kt(t) - 1, t), e, 2);
}
function Eu(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Oe(t) : Oe.ceil(t);
}
function Fd(t, e) {
  return t = Eu(t), K(Oe.count(Kt(t), t) + (Kt(t).getUTCDay() === 4), e, 2);
}
function Rd(t) {
  return t.getUTCDay();
}
function Ud(t, e) {
  return K(Jn.count(Kt(t) - 1, t), e, 2);
}
function Hd(t, e) {
  return K(t.getUTCFullYear() % 100, e, 2);
}
function jd(t, e) {
  return t = Eu(t), K(t.getUTCFullYear() % 100, e, 2);
}
function Wd(t, e) {
  return K(t.getUTCFullYear() % 1e4, e, 4);
}
function Bd(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Oe(t) : Oe.ceil(t), K(t.getUTCFullYear() % 1e4, e, 4);
}
function qd() {
  return "+0000";
}
function ma() {
  return "%";
}
function va(t) {
  return +t;
}
function ya(t) {
  return Math.floor(+t / 1e3);
}
var ye, Tu, Ou;
zd({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function zd(t) {
  return ye = zh(t), Tu = ye.format, ye.parse, Ou = ye.utcFormat, ye.utcParse, ye;
}
var Ge = 1e3, Xe = Ge * 60, Ze = Xe * 60, fn = Ze * 24, Yd = fn * 7, _a = fn * 30, qr = fn * 365;
function Vd(t) {
  return new Date(t);
}
function Kd(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function fo(t, e, n, r, i, o, a, s, u) {
  var f = gr(ro, wt), d = f.invert, l = f.domain, c = u(".%L"), h = u(":%S"), p = u("%I:%M"), g = u("%I %p"), v = u("%a %d"), x = u("%b %d"), S = u("%B"), A = u("%Y"), I = [
    [a, 1, Ge],
    [a, 5, 5 * Ge],
    [a, 15, 15 * Ge],
    [a, 30, 30 * Ge],
    [o, 1, Xe],
    [o, 5, 5 * Xe],
    [o, 15, 15 * Xe],
    [o, 30, 30 * Xe],
    [i, 1, Ze],
    [i, 3, 3 * Ze],
    [i, 6, 6 * Ze],
    [i, 12, 12 * Ze],
    [r, 1, fn],
    [r, 2, 2 * fn],
    [n, 1, Yd],
    [e, 1, _a],
    [e, 3, 3 * _a],
    [t, 1, qr]
  ];
  function R(L) {
    return (a(L) < L ? c : o(L) < L ? h : i(L) < L ? p : r(L) < L ? g : e(L) < L ? n(L) < L ? v : x : t(L) < L ? S : A)(L);
  }
  function F(L, j, W, q) {
    if (L == null && (L = 10), typeof L == "number") {
      var E = Math.abs(W - j) / L, k = zi(function(P) {
        return P[2];
      }).right(I, E);
      k === I.length ? (q = on(j / qr, W / qr, L), L = t) : k ? (k = I[E / I[k - 1][2] < I[k][2] / E ? k - 1 : k], q = k[1], L = k[0]) : (q = Math.max(on(j, W, L), 1), L = s);
    }
    return q == null ? L : L.every(q);
  }
  return f.invert = function(L) {
    return new Date(d(L));
  }, f.domain = function(L) {
    return arguments.length ? l(Ki.call(L, Kd)) : l().map(Vd);
  }, f.ticks = function(L, j) {
    var W = l(), q = W[0], E = W[W.length - 1], k = E < q, P;
    return k && (P = q, q = E, E = P), P = F(L, q, E, j), P = P ? P.range(q, E + 1) : [], k ? P.reverse() : P;
  }, f.tickFormat = function(L, j) {
    return j == null ? R : u(j);
  }, f.nice = function(L, j) {
    var W = l();
    return (L = F(L, W[0], W[W.length - 1], j)) ? l(fu(W, L)) : f;
  }, f.copy = function() {
    return pr(f, fo(t, e, n, r, i, o, a, s, u));
  }, f;
}
function Gd() {
  return fo(Vt, _u, uo, mr, yu, vu, so, cn, Tu).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]);
}
function Xd() {
  return fo(Kt, xu, co, vr, wu, bu, so, cn, Ou).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]);
}
function Xt(t) {
  return t.match(/.{6}/g).map(function(e) {
    return "#" + e;
  });
}
const Zd = Xt("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), Jd = Xt("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"), Qd = Xt("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"), tp = Xt("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"), ep = eo(Pt(300, 0.5, 0), Pt(-240, 0.5, 1));
var np = eo(Pt(-100, 0.75, 0.35), Pt(80, 1.5, 0.8)), rp = eo(Pt(260, 0.75, 0.35), Pt(80, 1.5, 0.8)), Pn = Pt();
function ip(t) {
  (t < 0 || t > 1) && (t -= Math.floor(t));
  var e = Math.abs(t - 0.5);
  return Pn.h = 360 * t - 100, Pn.s = 1.5 - 1.5 * e, Pn.l = 0.8 - 0.9 * e, Pn + "";
}
function yr(t) {
  var e = t.length;
  return function(n) {
    return t[Math.max(0, Math.min(e - 1, Math.floor(n * e)))];
  };
}
const op = yr(Xt("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var ap = yr(Xt("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), sp = yr(Xt("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), up = yr(Xt("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
function Cu(t) {
  var e = 0, n = 1, r = !1;
  function i(o) {
    var a = (o - e) / (n - e);
    return t(r ? Math.max(0, Math.min(1, a)) : a);
  }
  return i.domain = function(o) {
    return arguments.length ? (e = +o[0], n = +o[1], i) : [e, n];
  }, i.clamp = function(o) {
    return arguments.length ? (r = !!o, i) : r;
  }, i.interpolator = function(o) {
    return arguments.length ? (t = o, i) : t;
  }, i.copy = function() {
    return Cu(t).domain([e, n]).clamp(r);
  }, mn(i);
}
const cp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  interpolateCool: rp,
  interpolateCubehelixDefault: ep,
  interpolateInferno: sp,
  interpolateMagma: ap,
  interpolatePlasma: up,
  interpolateRainbow: ip,
  interpolateViridis: op,
  interpolateWarm: np,
  scaleBand: Xi,
  scaleIdentity: cu,
  scaleImplicit: di,
  scaleLinear: uu,
  scaleLog: lu,
  scaleOrdinal: Gi,
  scalePoint: Bl,
  scalePow: ao,
  scaleQuantile: hu,
  scaleQuantize: du,
  scaleSequential: Cu,
  scaleSqrt: Ih,
  scaleThreshold: pu,
  scaleTime: Gd,
  scaleUtc: Xd,
  schemeCategory10: Zd,
  schemeCategory20: tp,
  schemeCategory20b: Jd,
  schemeCategory20c: Qd
}, Symbol.toStringTag, { value: "Module" })), fp = /* @__PURE__ */ Ne(cp);
var vi = "http://www.w3.org/1999/xhtml";
const yi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: vi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function vn(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), yi.hasOwnProperty(e) ? { space: yi[e], local: t } : t;
}
function lp(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === vi && e.documentElement.namespaceURI === vi ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function hp(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function _r(t) {
  var e = vn(t);
  return (e.local ? hp : lp)(e);
}
function dp() {
}
function br(t) {
  return t == null ? dp : function() {
    return this.querySelector(t);
  };
}
function pp(t) {
  typeof t != "function" && (t = br(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = new Array(a), u, f, d = 0; d < a; ++d)
      (u = o[d]) && (f = t.call(u, u.__data__, d, o)) && ("__data__" in u && (f.__data__ = u.__data__), s[d] = f);
  return new vt(r, this._parents);
}
function gp() {
  return [];
}
function lo(t) {
  return t == null ? gp : function() {
    return this.querySelectorAll(t);
  };
}
function mp(t) {
  typeof t != "function" && (t = lo(t));
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], s = a.length, u, f = 0; f < s; ++f)
      (u = a[f]) && (r.push(t.call(u, u.__data__, f, a)), i.push(u));
  return new vt(r, i);
}
function ho(t) {
  return function() {
    return this.matches(t);
  };
}
function vp(t) {
  typeof t != "function" && (t = ho(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], u, f = 0; f < a; ++f)
      (u = o[f]) && t.call(u, u.__data__, f, o) && s.push(u);
  return new vt(r, this._parents);
}
function ku(t) {
  return new Array(t.length);
}
function yp() {
  return new vt(this._enter || this._groups.map(ku), this._parents);
}
function Qn(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Qn.prototype = {
  constructor: Qn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function _p(t) {
  return function() {
    return t;
  };
}
var ba = "$";
function bp(t, e, n, r, i, o) {
  for (var a = 0, s, u = e.length, f = o.length; a < f; ++a)
    (s = e[a]) ? (s.__data__ = o[a], r[a] = s) : n[a] = new Qn(t, o[a]);
  for (; a < u; ++a)
    (s = e[a]) && (i[a] = s);
}
function wp(t, e, n, r, i, o, a) {
  var s, u, f = {}, d = e.length, l = o.length, c = new Array(d), h;
  for (s = 0; s < d; ++s)
    (u = e[s]) && (c[s] = h = ba + a.call(u, u.__data__, s, e), h in f ? i[s] = u : f[h] = u);
  for (s = 0; s < l; ++s)
    h = ba + a.call(t, o[s], s, o), (u = f[h]) ? (r[s] = u, u.__data__ = o[s], f[h] = null) : n[s] = new Qn(t, o[s]);
  for (s = 0; s < d; ++s)
    (u = e[s]) && f[c[s]] === u && (i[s] = u);
}
function xp(t, e) {
  if (!t)
    return h = new Array(this.size()), f = -1, this.each(function(F) {
      h[++f] = F;
    }), h;
  var n = e ? wp : bp, r = this._parents, i = this._groups;
  typeof t != "function" && (t = _p(t));
  for (var o = i.length, a = new Array(o), s = new Array(o), u = new Array(o), f = 0; f < o; ++f) {
    var d = r[f], l = i[f], c = l.length, h = t.call(d, d && d.__data__, f, r), p = h.length, g = s[f] = new Array(p), v = a[f] = new Array(p), x = u[f] = new Array(c);
    n(d, l, g, v, x, h, e);
    for (var S = 0, A = 0, I, R; S < p; ++S)
      if (I = g[S]) {
        for (S >= A && (A = S + 1); !(R = v[A]) && ++A < p; ) ;
        I._next = R || null;
      }
  }
  return a = new vt(a, r), a._enter = s, a._exit = u, a;
}
function Mp() {
  return new vt(this._exit || this._groups.map(ku), this._parents);
}
function Sp(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return r = typeof t == "function" ? t(r) : r.append(t + ""), e != null && (i = e(i)), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Ap(t) {
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var u = e[s], f = n[s], d = u.length, l = a[s] = new Array(d), c, h = 0; h < d; ++h)
      (c = u[h] || f[h]) && (l[h] = c);
  for (; s < r; ++s)
    a[s] = e[s];
  return new vt(a, this._parents);
}
function Ep() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Tp(t) {
  t || (t = Op);
  function e(l, c) {
    return l && c ? t(l.__data__, c.__data__) : !l - !c;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], s = a.length, u = i[o] = new Array(s), f, d = 0; d < s; ++d)
      (f = a[d]) && (u[d] = f);
    u.sort(e);
  }
  return new vt(i, this._parents).order();
}
function Op(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Cp() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function kp() {
  var t = new Array(this.size()), e = -1;
  return this.each(function() {
    t[++e] = this;
  }), t;
}
function Pp() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function Dp() {
  var t = 0;
  return this.each(function() {
    ++t;
  }), t;
}
function Np() {
  return !this.node();
}
function Lp(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, s; o < a; ++o)
      (s = i[o]) && t.call(s, s.__data__, o, i);
  return this;
}
function $p(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ip(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fp(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Rp(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Up(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Hp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function jp(t, e) {
  var n = vn(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ip : $p : typeof e == "function" ? n.local ? Hp : Up : n.local ? Rp : Fp)(n, e));
}
function po(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Wp(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Bp(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function qp(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function zp(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Wp : typeof e == "function" ? qp : Bp)(t, e, n ?? "")) : fe(this.node(), t);
}
function fe(t, e) {
  return t.style.getPropertyValue(e) || po(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Yp(t) {
  return function() {
    delete this[t];
  };
}
function Vp(t, e) {
  return function() {
    this[t] = e;
  };
}
function Kp(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Gp(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Yp : typeof e == "function" ? Kp : Vp)(t, e)) : this.node()[t];
}
function Pu(t) {
  return t.trim().split(/^|\s+/);
}
function go(t) {
  return t.classList || new Du(t);
}
function Du(t) {
  this._node = t, this._names = Pu(t.getAttribute("class") || "");
}
Du.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Nu(t, e) {
  for (var n = go(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Lu(t, e) {
  for (var n = go(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Xp(t) {
  return function() {
    Nu(this, t);
  };
}
function Zp(t) {
  return function() {
    Lu(this, t);
  };
}
function Jp(t, e) {
  return function() {
    (e.apply(this, arguments) ? Nu : Lu)(this, t);
  };
}
function Qp(t, e) {
  var n = Pu(t + "");
  if (arguments.length < 2) {
    for (var r = go(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Jp : e ? Xp : Zp)(n, e));
}
function t0() {
  this.textContent = "";
}
function e0(t) {
  return function() {
    this.textContent = t;
  };
}
function n0(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function r0(t) {
  return arguments.length ? this.each(t == null ? t0 : (typeof t == "function" ? n0 : e0)(t)) : this.node().textContent;
}
function i0() {
  this.innerHTML = "";
}
function o0(t) {
  return function() {
    this.innerHTML = t;
  };
}
function a0(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function s0(t) {
  return arguments.length ? this.each(t == null ? i0 : (typeof t == "function" ? a0 : o0)(t)) : this.node().innerHTML;
}
function u0() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function c0() {
  return this.each(u0);
}
function f0() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function l0() {
  return this.each(f0);
}
function h0(t) {
  var e = typeof t == "function" ? t : _r(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function d0() {
  return null;
}
function p0(t, e) {
  var n = typeof t == "function" ? t : _r(t), r = e == null ? d0 : typeof e == "function" ? e : br(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function g0() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function m0() {
  return this.each(g0);
}
function v0() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function y0() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function _0(t) {
  return this.select(t ? y0 : v0);
}
function b0(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
var $u = {}, It = null;
if (typeof document < "u") {
  var w0 = document.documentElement;
  "onmouseenter" in w0 || ($u = { mouseenter: "mouseover", mouseleave: "mouseout" });
}
function x0(t, e, n) {
  return t = Iu(t, e, n), function(r) {
    var i = r.relatedTarget;
    (!i || i !== this && !(i.compareDocumentPosition(this) & 8)) && t.call(this, r);
  };
}
function Iu(t, e, n) {
  return function(r) {
    var i = It;
    It = r;
    try {
      t.call(this, this.__data__, e, n);
    } finally {
      It = i;
    }
  };
}
function M0(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function S0(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.capture) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function A0(t, e, n) {
  var r = $u.hasOwnProperty(t.type) ? x0 : Iu;
  return function(i, o, a) {
    var s = this.__on, u, f = r(e, o, a);
    if (s) {
      for (var d = 0, l = s.length; d < l; ++d)
        if ((u = s[d]).type === t.type && u.name === t.name) {
          this.removeEventListener(u.type, u.listener, u.capture), this.addEventListener(u.type, u.listener = f, u.capture = n), u.value = e;
          return;
        }
    }
    this.addEventListener(t.type, f, n), u = { type: t.type, name: t.name, value: e, listener: f, capture: n }, s ? s.push(u) : this.__on = [u];
  };
}
function E0(t, e, n) {
  var r = M0(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var s = this.node().__on;
    if (s) {
      for (var u = 0, f = s.length, d; u < f; ++u)
        for (i = 0, d = s[u]; i < o; ++i)
          if ((a = r[i]).type === d.type && a.name === d.name)
            return d.value;
    }
    return;
  }
  for (s = e ? A0 : S0, n == null && (n = !1), i = 0; i < o; ++i) this.each(s(r[i], e, n));
  return this;
}
function T0(t, e, n, r) {
  var i = It;
  t.sourceEvent = It, It = t;
  try {
    return e.apply(n, r);
  } finally {
    It = i;
  }
}
function Fu(t, e, n) {
  var r = po(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function O0(t, e) {
  return function() {
    return Fu(this, t, e);
  };
}
function C0(t, e) {
  return function() {
    return Fu(this, t, e.apply(this, arguments));
  };
}
function k0(t, e) {
  return this.each((typeof e == "function" ? C0 : O0)(t, e));
}
var mo = [null];
function vt(t, e) {
  this._groups = t, this._parents = e;
}
function me() {
  return new vt([[document.documentElement]], mo);
}
vt.prototype = me.prototype = {
  constructor: vt,
  select: pp,
  selectAll: mp,
  filter: vp,
  data: xp,
  enter: yp,
  exit: Mp,
  join: Sp,
  merge: Ap,
  order: Ep,
  sort: Tp,
  call: Cp,
  nodes: kp,
  node: Pp,
  size: Dp,
  empty: Np,
  each: Lp,
  attr: jp,
  style: zp,
  property: Gp,
  classed: Qp,
  text: r0,
  html: s0,
  raise: c0,
  lower: l0,
  append: h0,
  insert: p0,
  remove: m0,
  clone: _0,
  datum: b0,
  on: E0,
  dispatch: k0
};
function Ru(t) {
  return typeof t == "string" ? new vt([[document.querySelector(t)]], [document.documentElement]) : new vt([[t]], mo);
}
function P0(t) {
  return Ru(_r(t).call(document.documentElement));
}
var D0 = 0;
function Uu() {
  return new _i();
}
function _i() {
  this._ = "@" + (++D0).toString(36);
}
_i.prototype = Uu.prototype = {
  constructor: _i,
  get: function(t) {
    for (var e = this._; !(e in t); ) if (!(t = t.parentNode)) return;
    return t[e];
  },
  set: function(t, e) {
    return t[this._] = e;
  },
  remove: function(t) {
    return this._ in t && delete t[this._];
  },
  toString: function() {
    return this._;
  }
};
function vo() {
  for (var t = It, e; e = t.sourceEvent; ) t = e;
  return t;
}
function wr(t, e) {
  var n = t.ownerSVGElement || t;
  if (n.createSVGPoint) {
    var r = n.createSVGPoint();
    return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
  }
  var i = t.getBoundingClientRect();
  return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
}
function N0(t) {
  var e = vo();
  return e.changedTouches && (e = e.changedTouches[0]), wr(t, e);
}
function L0(t) {
  return typeof t == "string" ? new vt([document.querySelectorAll(t)], [document.documentElement]) : new vt([t ?? []], mo);
}
function $0(t, e, n) {
  arguments.length < 3 && (n = e, e = vo().changedTouches);
  for (var r = 0, i = e ? e.length : 0, o; r < i; ++r)
    if ((o = e[r]).identifier === n)
      return wr(t, o);
  return null;
}
function I0(t, e) {
  e == null && (e = vo().touches);
  for (var n = 0, r = e ? e.length : 0, i = new Array(r); n < r; ++n)
    i[n] = wr(t, e[n]);
  return i;
}
const F0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientPoint: wr,
  create: P0,
  creator: _r,
  customEvent: T0,
  get event() {
    return It;
  },
  local: Uu,
  matcher: ho,
  mouse: N0,
  namespace: vn,
  namespaces: yi,
  select: Ru,
  selectAll: L0,
  selection: me,
  selector: br,
  selectorAll: lo,
  style: fe,
  touch: $0,
  touches: I0,
  window: po
}, Symbol.toStringTag, { value: "Module" }));
var R0 = { value: function() {
} };
function yo() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Fn(n);
}
function Fn(t) {
  this._ = t;
}
function U0(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Fn.prototype = yo.prototype = {
  constructor: Fn,
  on: function(t, e) {
    var n = this._, r = U0(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = H0(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type) n[i] = wa(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = wa(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Fn(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function H0(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function wa(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = R0, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
const j0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dispatch: yo
}, Symbol.toStringTag, { value: "Module" }));
var Ce = 0, Je = 0, Ye = 0, Hu = 1e3, tr, Qe, er = 0, le = 0, xr = 0, ln = typeof performance == "object" && performance.now ? performance : Date, ju = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Mr() {
  return le || (ju(W0), le = ln.now() + xr);
}
function W0() {
  le = 0;
}
function nr() {
  this._call = this._time = this._next = null;
}
nr.prototype = Wu.prototype = {
  constructor: nr,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Mr() : +n) + (e == null ? 0 : +e), !this._next && Qe !== this && (Qe ? Qe._next = this : tr = this, Qe = this), this._call = t, this._time = n, bi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bi());
  }
};
function Wu(t, e, n) {
  var r = new nr();
  return r.restart(t, e, n), r;
}
function B0() {
  Mr(), ++Ce;
  for (var t = tr, e; t; )
    (e = le - t._time) >= 0 && t._call.call(null, e), t = t._next;
  --Ce;
}
function xa() {
  le = (er = ln.now()) + xr, Ce = Je = 0;
  try {
    B0();
  } finally {
    Ce = 0, z0(), le = 0;
  }
}
function q0() {
  var t = ln.now(), e = t - er;
  e > Hu && (xr -= e, er = t);
}
function z0() {
  for (var t, e = tr, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : tr = n);
  Qe = t, bi(r);
}
function bi(t) {
  if (!Ce) {
    Je && (Je = clearTimeout(Je));
    var e = t - le;
    e > 24 ? (t < 1 / 0 && (Je = setTimeout(xa, t - ln.now() - xr)), Ye && (Ye = clearInterval(Ye))) : (Ye || (er = ln.now(), Ye = setInterval(q0, Hu)), Ce = 1, ju(xa));
  }
}
function Ma(t, e, n) {
  var r = new nr();
  return e = e == null ? 0 : +e, r.restart(function(i) {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Y0 = yo("start", "end", "cancel", "interrupt"), V0 = [], Bu = 0, wi = 1, xi = 2, Rn = 3, Sa = 4, Mi = 5, Un = 6;
function Sr(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  K0(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Y0,
    tween: V0,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Bu
  });
}
function _o(t, e) {
  var n = At(t, e);
  if (n.state > Bu) throw new Error("too late; already scheduled");
  return n;
}
function Rt(t, e) {
  var n = At(t, e);
  if (n.state > Rn) throw new Error("too late; already running");
  return n;
}
function At(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function K0(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Wu(o, 0, n.time);
  function o(f) {
    n.state = wi, n.timer.restart(a, n.delay, n.time), n.delay <= f && a(f - n.delay);
  }
  function a(f) {
    var d, l, c, h;
    if (n.state !== wi) return u();
    for (d in r)
      if (h = r[d], h.name === n.name) {
        if (h.state === Rn) return Ma(a);
        h.state === Sa ? (h.state = Un, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete r[d]) : +d < e && (h.state = Un, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete r[d]);
      }
    if (Ma(function() {
      n.state === Rn && (n.state = Sa, n.timer.restart(s, n.delay, n.time), s(f));
    }), n.state = xi, n.on.call("start", t, t.__data__, n.index, n.group), n.state === xi) {
      for (n.state = Rn, i = new Array(c = n.tween.length), d = 0, l = -1; d < c; ++d)
        (h = n.tween[d].value.call(t, t.__data__, n.index, n.group)) && (i[++l] = h);
      i.length = l + 1;
    }
  }
  function s(f) {
    for (var d = f < n.duration ? n.ease.call(null, f / n.duration) : (n.timer.restart(u), n.state = Mi, 1), l = -1, c = i.length; ++l < c; )
      i[l].call(t, d);
    n.state === Mi && (n.on.call("end", t, t.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Un, n.timer.stop(), delete r[e];
    for (var f in r) return;
    delete t.__transition;
  }
}
function qu(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > xi && r.state < Mi, r.state = Un, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function G0(t) {
  return this.each(function() {
    qu(this, t);
  });
}
function X0(t, e) {
  var n, r;
  return function() {
    var i = Rt(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, s = r.length; a < s; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Z0(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = Rt(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var s = { name: e, value: n }, u = 0, f = i.length; u < f; ++u)
        if (i[u].name === e) {
          i[u] = s;
          break;
        }
      u === f && i.push(s);
    }
    o.tween = i;
  };
}
function J0(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = At(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? X0 : Z0)(n, t, e));
}
function bo(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Rt(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return At(i, r).value[e];
  };
}
function zu(t, e) {
  var n;
  return (typeof e == "number" ? wt : e instanceof ue ? Yn : (n = ue(e)) ? (e = n, Yn) : eu)(t, e);
}
function Q0(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function tg(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function eg(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function ng(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function rg(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), u;
    return s == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), u = s + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s)));
  };
}
function ig(t, e, n) {
  var r, i, o;
  return function() {
    var a, s = n(this), u;
    return s == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), u = s + "", a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s)));
  };
}
function og(t, e) {
  var n = vn(t), r = n === "transform" ? mh : zu;
  return this.attrTween(t, typeof e == "function" ? (n.local ? ig : rg)(n, r, bo(this, "attr." + t, e)) : e == null ? (n.local ? tg : Q0)(n) : (n.local ? ng : eg)(n, r, e));
}
function ag(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function sg(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function ug(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && sg(t, o)), n;
  }
  return i._value = e, i;
}
function cg(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && ag(t, o)), n;
  }
  return i._value = e, i;
}
function fg(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = vn(t);
  return this.tween(n, (r.local ? ug : cg)(r, e));
}
function lg(t, e) {
  return function() {
    _o(this, t).delay = +e.apply(this, arguments);
  };
}
function hg(t, e) {
  return e = +e, function() {
    _o(this, t).delay = e;
  };
}
function dg(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? lg : hg)(e, t)) : At(this.node(), e).delay;
}
function pg(t, e) {
  return function() {
    Rt(this, t).duration = +e.apply(this, arguments);
  };
}
function gg(t, e) {
  return e = +e, function() {
    Rt(this, t).duration = e;
  };
}
function mg(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? pg : gg)(e, t)) : At(this.node(), e).duration;
}
function vg(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    Rt(this, t).ease = e;
  };
}
function yg(t) {
  var e = this._id;
  return arguments.length ? this.each(vg(e, t)) : At(this.node(), e).ease;
}
function _g(t) {
  typeof t != "function" && (t = ho(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, s = r[i] = [], u, f = 0; f < a; ++f)
      (u = o[f]) && t.call(u, u.__data__, f, o) && s.push(u);
  return new Dt(r, this._parents, this._name, this._id);
}
function bg(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
    for (var u = e[s], f = n[s], d = u.length, l = a[s] = new Array(d), c, h = 0; h < d; ++h)
      (c = u[h] || f[h]) && (l[h] = c);
  for (; s < r; ++s)
    a[s] = e[s];
  return new Dt(a, this._parents, this._name, this._id);
}
function wg(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function xg(t, e, n) {
  var r, i, o = wg(e) ? _o : Rt;
  return function() {
    var a = o(this, t), s = a.on;
    s !== r && (i = (r = s).copy()).on(e, n), a.on = i;
  };
}
function Mg(t, e) {
  var n = this._id;
  return arguments.length < 2 ? At(this.node(), n).on.on(t) : this.each(xg(n, t, e));
}
function Sg(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Ag() {
  return this.on("end.remove", Sg(this._id));
}
function Eg(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = br(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var s = r[a], u = s.length, f = o[a] = new Array(u), d, l, c = 0; c < u; ++c)
      (d = s[c]) && (l = t.call(d, d.__data__, c, s)) && ("__data__" in d && (l.__data__ = d.__data__), f[c] = l, Sr(f[c], e, n, c, f, At(d, n)));
  return new Dt(o, this._parents, e, n);
}
function Tg(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = lo(t));
  for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
    for (var u = r[s], f = u.length, d, l = 0; l < f; ++l)
      if (d = u[l]) {
        for (var c = t.call(d, d.__data__, l, u), h, p = At(d, n), g = 0, v = c.length; g < v; ++g)
          (h = c[g]) && Sr(h, e, n, g, c, p);
        o.push(c), a.push(d);
      }
  return new Dt(o, a, e, n);
}
var Og = me.prototype.constructor;
function Cg() {
  return new Og(this._groups, this._parents);
}
function kg(t, e) {
  var n, r, i;
  return function() {
    var o = fe(this, t), a = (this.style.removeProperty(t), fe(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function Yu(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Pg(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = fe(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Dg(t, e, n) {
  var r, i, o;
  return function() {
    var a = fe(this, t), s = n(this), u = s + "";
    return s == null && (u = s = (this.style.removeProperty(t), fe(this, t))), a === u ? null : a === r && u === i ? o : (i = u, o = e(r = a, s));
  };
}
function Ng(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, s;
  return function() {
    var u = Rt(this, t), f = u.on, d = u.value[o] == null ? s || (s = Yu(e)) : void 0;
    (f !== n || i !== d) && (r = (n = f).copy()).on(a, i = d), u.on = r;
  };
}
function Lg(t, e, n) {
  var r = (t += "") == "transform" ? gh : zu;
  return e == null ? this.styleTween(t, kg(t, r)).on("end.style." + t, Yu(t)) : typeof e == "function" ? this.styleTween(t, Dg(t, r, bo(this, "style." + t, e))).each(Ng(this._id, t)) : this.styleTween(t, Pg(t, r, e), n).on("end.style." + t, null);
}
function $g(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Ig(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && $g(t, a, n)), r;
  }
  return o._value = e, o;
}
function Fg(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Ig(t, e, n ?? ""));
}
function Rg(t) {
  return function() {
    this.textContent = t;
  };
}
function Ug(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Hg(t) {
  return this.tween("text", typeof t == "function" ? Ug(bo(this, "text", t)) : Rg(t == null ? "" : t + ""));
}
function jg(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Wg(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && jg(i)), e;
  }
  return r._value = t, r;
}
function Bg(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Wg(t));
}
function qg() {
  for (var t = this._name, e = this._id, n = Ku(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, u, f = 0; f < s; ++f)
      if (u = a[f]) {
        var d = At(u, e);
        Sr(u, t, n, f, a, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Dt(r, this._parents, t, n);
}
function zg() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var s = { value: a }, u = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var f = Rt(this, r), d = f.on;
      d !== t && (e = (t = d).copy(), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(u)), f.on = e;
    });
  });
}
var Yg = 0;
function Dt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Vu(t) {
  return me().transition(t);
}
function Ku() {
  return ++Yg;
}
var _e = me.prototype;
Dt.prototype = Vu.prototype = {
  constructor: Dt,
  select: Eg,
  selectAll: Tg,
  filter: _g,
  merge: bg,
  selection: Cg,
  transition: qg,
  call: _e.call,
  nodes: _e.nodes,
  node: _e.node,
  size: _e.size,
  empty: _e.empty,
  each: _e.each,
  on: Mg,
  attr: og,
  attrTween: fg,
  style: Lg,
  styleTween: Fg,
  text: Hg,
  textTween: Bg,
  remove: Ag,
  tween: J0,
  delay: dg,
  duration: mg,
  ease: yg,
  end: zg
};
function Vg(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Si = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Vg
};
function Kg(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      return Si.time = Mr(), Si;
  return n;
}
function Gg(t) {
  var e, n;
  t instanceof Dt ? (e = t._id, t = t._name) : (e = Ku(), (n = Si).time = Mr(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], s = a.length, u, f = 0; f < s; ++f)
      (u = a[f]) && Sr(u, t, e, f, a, n || Kg(u, e));
  return new Dt(r, this._parents, t, e);
}
me.prototype.interrupt = G0;
me.prototype.transition = Gg;
var Xg = [null];
function Zg(t, e) {
  var n = t.__transition, r, i;
  if (n) {
    e = e == null ? null : e + "";
    for (i in n)
      if ((r = n[i]).state > wi && r.name === e)
        return new Dt([[t]], Xg, e, +i);
  }
  return null;
}
const Jg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  active: Zg,
  interrupt: qu,
  transition: Vu
}, Symbol.toStringTag, { value: "Module" })), Qg = /* @__PURE__ */ Ne(Jg), tm = /* @__PURE__ */ Ne(Wl);
var Dn = { exports: {} };
const em = /* @__PURE__ */ Ne(F0), nm = /* @__PURE__ */ Ne(j0);
var Aa;
function rm() {
  return Aa || (Aa = 1, function(t, e) {
    (function(n, r) {
      r(e, em, nm);
    })(jt, function(n, r, i) {
      function o(_) {
        var m = typeof _ > "u" ? "undefined" : q(_);
        return _ != null && (m == "object" || m == "function");
      }
      function a(_) {
        var m = o(_) ? ct.call(_) : "";
        return m == U || m == Z || m == at;
      }
      function s(_) {
        return _ != null && (typeof _ > "u" ? "undefined" : q(_)) == "object";
      }
      function u(_) {
        return (typeof _ > "u" ? "undefined" : q(_)) == "symbol" || s(_) && Er.call(_) == Y;
      }
      function f(_) {
        if (typeof _ == "number") return _;
        if (u(_)) return yn;
        if (o(_)) {
          var m = typeof _.valueOf == "function" ? _.valueOf() : _;
          _ = o(m) ? m + "" : m;
        }
        if (typeof _ != "string") return _ === 0 ? _ : +_;
        _ = _.replace($, "");
        var y = V.test(_);
        return y || T.test(_) ? lt(_.slice(2), y ? 2 : 8) : B.test(_) ? yn : +_;
      }
      function d(_, m, y) {
        function b(it) {
          var Ut = Q, Re = et;
          return Q = et = void 0, Ie = it, yt = _.apply(Re, Ut);
        }
        function w(it) {
          return Ie = it, pt = setTimeout(O, m), So ? b(it) : yt;
        }
        function M(it) {
          var Ut = it - Tt, Re = it - Ie, Ao = m - Ut;
          return Fe ? dt(Ao, ft - Re) : Ao;
        }
        function D(it) {
          var Ut = it - Tt, Re = it - Ie;
          return Tt === void 0 || Ut >= m || 0 > Ut || Fe && Re >= ft;
        }
        function O() {
          var it = _t();
          return D(it) ? H(it) : void (pt = setTimeout(O, M(it)));
        }
        function H(it) {
          return pt = void 0, Cr && Q ? b(it) : (Q = et = void 0, yt);
        }
        function z() {
          pt !== void 0 && clearTimeout(pt), Ie = 0, Q = Tt = et = pt = void 0;
        }
        function X() {
          return pt === void 0 ? yt : H(_t());
        }
        function rt() {
          var it = _t(), Ut = D(it);
          if (Q = arguments, et = this, Tt = it, Ut) {
            if (pt === void 0) return w(Tt);
            if (Fe) return pt = setTimeout(O, m), b(Tt);
          }
          return pt === void 0 && (pt = setTimeout(O, m)), yt;
        }
        var Q, et, ft, yt, pt, Tt, Ie = 0, So = !1, Fe = !1, Cr = !0;
        if (typeof _ != "function") throw new TypeError(G);
        return m = f(m) || 0, o(y) && (So = !!y.leading, Fe = "maxWait" in y, ft = Fe ? ht(f(y.maxWait) || 0, m) : ft, Cr = "trailing" in y ? !!y.trailing : Cr), rt.cancel = z, rt.flush = X, rt;
      }
      function l(_, m, y) {
        var b = !0, w = !0;
        if (typeof _ != "function") throw new TypeError($t);
        return o(y) && (b = "leading" in y ? !!y.leading : b, w = "trailing" in y ? !!y.trailing : w), d(_, m, { leading: b, maxWait: m, trailing: w });
      }
      function c(_) {
        return "\\s";
      }
      function h(_, m) {
        if (_ == null) return "";
        if ($e) return $e.call(_);
        var y = c(), b = new RegExp("^" + y + "+|" + y + "+$", "g");
        return String(_).replace(b, "");
      }
      function p(_) {
        return h(_).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase();
      }
      function g(_) {
        _ = _ || {};
        for (var m = 1; m < arguments.length; m++) {
          var y = arguments[m];
          if (y) {
            for (var b in y) if (y.hasOwnProperty(b)) {
              var w = y[b];
              _[b] = !o(w) || Array.isArray(w) || a(w) ? w : g(_[b], w);
            }
          }
        }
        return _;
      }
      function v(_) {
        _ = _ || {};
        for (var m = 1; m < arguments.length; m++) if (arguments[m]) for (var y in arguments[m]) arguments[m].hasOwnProperty(y) && (_[y] = arguments[m][y]);
        return _;
      }
      function x(_, m, y) {
        return function() {
          var b = y.apply(m, arguments);
          return b === m ? _ : b;
        };
      }
      function S(_, m) {
        for (var y = 1, b = arguments.length, w = void 0; ++y < b; ) _[w = arguments[y]] = x(_, m, m[w]);
        return _;
      }
      function A(_) {
        return a(_) ? _ : function() {
          return _;
        };
      }
      function I(_) {
        throw new Error("Missing parameter " + _);
      }
      function R(_) {
        return _ != null;
      }
      function F(_) {
        return _ == null;
      }
      function L(_) {
        return !(!_ || _.nodeType !== 1);
      }
      function j(_) {
        if (F(_)) return function(b, w) {
          return Math.min(b, w);
        };
        var m = ("" + _).trim().toLowerCase();
        if (m.indexOf("%") > -1) {
          var y = function() {
            var b = +m.replace("%", "") / 100;
            return { v: function(w, M) {
              return M * b;
            } };
          }();
          if ((typeof y > "u" ? "undefined" : q(y)) === "object") return y.v;
        }
        return function() {
          return +m.replace("px", "");
        };
      }
      function W(_) {
        function m(z, X) {
          var rt = arguments.length <= 2 || arguments[2] === void 0 ? "" : arguments[2], Q = X.split("."), et = void 0, ft = void 0;
          Q.length > 1 ? (ft = Q[0].length > 0 ? Q[0] : O, et = Q[1]) : (ft = O, et = Q[0]);
          var yt = "" + rt + et;
          if (H.hasOwnProperty(yt)) throw new Error("invalid or duplicate layer id: " + yt);
          var pt = p(et) + "-layer", Tt = z.append(ft).classed(pt, !0);
          return H[yt] = Tt, Tt;
        }
        function y(z, X) {
          var rt = arguments.length <= 2 || arguments[2] === void 0 ? "" : arguments[2];
          if (Array.isArray(X)) return X.map(function(pt) {
            return y(z, pt, rt);
          });
          if (o(X)) {
            var Q = Object.keys(X), et = C(Q, 1), ft = et[0], yt = m(z, ft, rt);
            return y(yt, X[ft], "" + rt + ft + "/"), yt;
          }
          return m(z, X, rt);
        }
        function b(z) {
          return y(_, z);
        }
        function w(z) {
          return Array.isArray(z) ? z.map(b) : b(z);
        }
        function M(z) {
          return H[z];
        }
        function D(z) {
          return !!H[z];
        }
        var O = arguments.length <= 1 || arguments[1] === void 0 ? "g" : arguments[1], H = {};
        return { create: w, get: M, has: D };
      }
      var q = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(_) {
        return typeof _;
      } : function(_) {
        return _ && typeof Symbol == "function" && _.constructor === Symbol ? "symbol" : typeof _;
      }, E = function(_, m) {
        if (!(_ instanceof m)) throw new TypeError("Cannot call a class as a function");
      }, k = /* @__PURE__ */ function() {
        function _(m, y) {
          for (var b = 0; b < y.length; b++) {
            var w = y[b];
            w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(m, w.key, w);
          }
        }
        return function(m, y, b) {
          return y && _(m.prototype, y), b && _(m, b), m;
        };
      }(), P = function(_, m) {
        if (typeof m != "function" && m !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof m);
        _.prototype = Object.create(m && m.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(_, m) : _.__proto__ = m);
      }, N = function(_, m) {
        if (!_) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !m || typeof m != "object" && typeof m != "function" ? _ : m;
      }, C = /* @__PURE__ */ function() {
        function _(m, y) {
          var b = [], w = !0, M = !1, D = void 0;
          try {
            for (var O, H = m[Symbol.iterator](); !(w = (O = H.next()).done) && (b.push(O.value), !y || b.length !== y); w = !0) ;
          } catch (z) {
            M = !0, D = z;
          } finally {
            try {
              !w && H.return && H.return();
            } finally {
              if (M) throw D;
            }
          }
          return b;
        }
        return function(m, y) {
          if (Array.isArray(m)) return m;
          if (Symbol.iterator in Object(m)) return _(m, y);
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
      }(), U = "[object Function]", Z = "[object GeneratorFunction]", at = "[object Proxy]", tt = Object.prototype, ct = tt.toString, Et = (typeof jt > "u" ? "undefined" : q(jt)) == "object" && jt && jt.Object === Object && jt, Nt = (typeof self > "u" ? "undefined" : q(self)) == "object" && self && self.Object === Object && self, Lt = Et || Nt || Function("return this")(), _t = function() {
        return Lt.Date.now();
      }, Y = "[object Symbol]", Ar = Object.prototype, Er = Ar.toString, yn = NaN, $ = /^\s+|\s+$/g, B = /^[-+]0x[0-9a-f]+$/i, V = /^0b[01]+$/i, T = /^0o[0-7]+$/i, lt = parseInt, G = "Expected a function", ht = Math.max, dt = Math.min, $t = "Expected a function", $e = String.prototype.trim, Zu = Object.freeze({ isObject: o, isFunction: a, kebabCase: p, deepExtend: g, extend: v, rebind: S, functor: A, debounce: d, throttle: l }), Zt = function() {
        function _() {
          E(this, _);
          for (var m = arguments.length, y = Array(m), b = 0; m > b; b++) y[b] = arguments[b];
          if (y.length === 1) {
            var w = y[0], M = a(w) ? w() : w;
            if (M instanceof _) this.width = M.width, this.height = M.height;
            else if (L(M)) this.width = M.clientWidth, this.height = M.clientHeight;
            else if (Array.isArray(M)) this.width = M[0], this.height = M[1];
            else {
              if (!(R(M) && R(M.width) && R(M.height))) {
                var D = new Error(`Unsupported input. Must be either
  DOMNode, Array or Object with field width and height,
  or a function that returns any of the above.`);
                throw D.value = w, D;
              }
              this.width = M.width, this.height = M.height;
            }
          } else {
            var O = y[0], H = y[1];
            this.width = O, this.height = H;
          }
        }
        return k(_, [{ key: "isEqual", value: function(m) {
          if (m instanceof _) return this.width === m.width && this.height === m.height;
          var y = new _(m);
          return this.width === y.width && this.height === y.height;
        } }, { key: "toArray", value: function() {
          return [this.width, this.height];
        } }, { key: "toObject", value: function() {
          return { width: this.width, height: this.height };
        } }]), _;
      }(), _n = function() {
        function _() {
          var m = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
          E(this, _);
          var y = m || {}, b = y.mode, w = b === void 0 ? _.MODE_BASIC : b, M = y.width, D = M === void 0 ? "100%" : M, O = y.height, H = O === void 0 ? null : O, z = y.ratio, X = z === void 0 ? 1 : z, rt = y.maxWidth, Q = rt === void 0 ? null : rt, et = y.maxHeight, ft = et === void 0 ? null : et;
          w === _.MODE_ASPECT_RATIO ? (this.wFn = j(Q), this.hFn = j(ft), this.options = { mode: w, ratio: X, maxWidth: Q, maxHeight: ft }) : (this.wFn = j(D), this.hFn = j(H), this.options = { mode: w, width: D, height: H });
        }
        return k(_, [{ key: "fit", value: function() {
          var m = arguments.length <= 0 || arguments[0] === void 0 ? I("box") : arguments[0], y = arguments.length <= 1 || arguments[1] === void 0 ? I("container") : arguments[1], b = new Zt(m), w = b.width, M = b.height, D = new Zt(y), O = D.width, H = D.height, z = void 0;
          if (this.options.mode === _.MODE_ASPECT_RATIO) {
            var X = this.options.ratio, rt = this.wFn(O, O), Q = this.hFn(H, H), et = Math.floor(X * Q);
            z = rt >= et ? new Zt(et, Q) : new Zt(rt, Math.floor(rt / X));
          } else z = new Zt(this.wFn(w, O), this.hFn(M, H));
          return { dimension: z, changed: !z.isEqual(b) };
        } }]), _;
      }();
      _n.MODE_BASIC = "basic", _n.MODE_ASPECT_RATIO = "aspectRatio";
      var Tr = function() {
        function _() {
          var m = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
          E(this, _);
          var y = m || {}, b = y.mode, w = b === void 0 ? _.MODE_WINDOW : b, M = y.target, D = M === void 0 ? null : M, O = y.interval, H = O === void 0 ? 200 : O;
          w !== _.MODE_POLLING || D || I("options.target"), this.mode = w, this.target = D, this.interval = H, this.check = this.check.bind(this), this.throttledCheck = l(this.check, this.interval), this.isWatching = !1, this.listeners = { change: [] };
        }
        return k(_, [{ key: "hasTargetChanged", value: function() {
          if (!this.target) return !0;
          var m = new Zt(this.target);
          return this.currentDim && m.isEqual(this.currentDim) ? !1 : (this.currentDim = m, !0);
        } }, { key: "check", value: function() {
          return this.hasTargetChanged() && this.dispatch("change", this.currentDim), this;
        } }, { key: "dispatch", value: function(m) {
          for (var y = this, b = arguments.length, w = Array(b > 1 ? b - 1 : 0), M = 1; b > M; M++) w[M - 1] = arguments[M];
          return this.listeners[m].forEach(function(D) {
            return D.apply(y, w);
          }), this;
        } }, { key: "on", value: function(m, y) {
          return this.listeners[m].indexOf(y) === -1 && this.listeners[m].push(y), this;
        } }, { key: "off", value: function(m, y) {
          return this.listeners[m] = this.listeners[m].filter(function(b) {
            return b !== y;
          }), this;
        } }, { key: "start", value: function() {
          return this.isWatching || (this.target && (this.currentDim = new Zt(this.target)), this.mode === _.MODE_WINDOW ? window.addEventListener("resize", this.throttledCheck) : this.mode === _.MODE_POLLING && (this.intervalId = window.setInterval(this.check, this.interval)), this.isWatching = !0), this;
        } }, { key: "stop", value: function() {
          return this.isWatching && (this.mode === _.MODE_WINDOW ? window.removeEventListener("resize", this.throttledCheck) : this.mode === _.MODE_POLLING && this.intervalId && (window.clearInterval(this.intervalId), this.intervalId = null), this.isWatching = !1), this;
        } }, { key: "destroy", value: function() {
          return this.stop(), this.listeners.change = [], this;
        } }]), _;
      }();
      Tr.MODE_WINDOW = "window", Tr.MODE_POLLING = "polling";
      var Ju = function(_) {
        function m() {
          var y = arguments.length <= 0 || arguments[0] === void 0 ? I("box") : arguments[0], b = arguments.length <= 1 || arguments[1] === void 0 ? I("container") : arguments[1], w = arguments[2], M = arguments[3];
          E(this, m);
          var D = N(this, Object.getPrototypeOf(m).call(this, M)), O = new _n(w);
          return D.fit = function() {
            return O.fit(y, b);
          }, D;
        }
        return P(m, _), k(m, [{ key: "check", value: function() {
          if (this.hasTargetChanged()) {
            var y = this.fit(), b = y.changed, w = y.dimension;
            b && this.dispatch("change", w);
          }
          return this;
        } }]), m;
      }(Tr), wo = function() {
        function _() {
          E(this, _);
          for (var m = arguments.length, y = Array(m), b = 0; m > b; b++) y[b] = arguments[b];
          var w = g.apply(void 0, [this.constructor.getDefaultOptions()].concat(y));
          this._state = { width: w.initialWidth, height: w.initialHeight, options: w }, this._updateDimension = d(this._updateDimension.bind(this), 1);
        }
        return k(_, null, [{ key: "getDefaultOptions", value: function() {
          for (var m = arguments.length, y = Array(m), b = 0; m > b; b++) y[b] = arguments[b];
          return g.apply(void 0, [{ initialWidth: 720, initialHeight: 500, margin: { top: 30, right: 30, bottom: 30, left: 30 }, offset: [0.5, 0.5], pixelRatio: window.devicePixelRatio || 1 }].concat(y));
        } }]), k(_, [{ key: "copyDimension", value: function(m) {
          if (m) {
            var y = m._state, b = y.width, w = y.height, M = m._state.options, D = M.offset, O = M.margin, H = M.pixelRatio;
            g(this._state, { width: b, height: w, options: { offset: D.concat(), margin: O, pixelRatio: H } }), this._updateDimension();
          }
          return this;
        } }, { key: "width", value: function() {
          if (arguments.length === 0) return this._state.width;
          var m = Math.floor(+(arguments.length <= 0 ? void 0 : arguments[0]));
          return m !== this._state.width && (this._state.width = m, this._updateDimension()), this;
        } }, { key: "height", value: function() {
          if (arguments.length === 0) return this._state.height;
          var m = Math.floor(+(arguments.length <= 0 ? void 0 : arguments[0]));
          return m !== this._state.height && (this._state.height = m, this._updateDimension()), this;
        } }, { key: "dimension", value: function() {
          if (arguments.length === 0) return [this._state.width, this._state.height];
          var m = arguments.length <= 0 ? void 0 : arguments[0], y = C(m, 2), b = y[0], w = y[1];
          return this.width(b).height(w), this;
        } }, { key: "margin", value: function() {
          if (arguments.length === 0) return this._state.options.margin;
          var m = this._state.options.margin, y = v({}, this._state.options.margin, arguments.length <= 0 ? void 0 : arguments[0]), b = Object.keys(y).some(function(w) {
            return m[w] !== y[w];
          });
          return b && (this._state.options.margin = y, this._updateDimension()), this;
        } }, { key: "offset", value: function() {
          if (arguments.length === 0) return this._state.options.offset;
          var m = arguments.length <= 0 ? void 0 : arguments[0], y = C(this._state.options.offset, 2), b = y[0], w = y[1], M = C(m, 2), D = M[0], O = M[1];
          return (b !== D || w !== O) && (this._state.options.offset = m, this._updateDimension()), this;
        } }, { key: "pixelRatio", value: function() {
          if (arguments.length === 0) return this._state.options.pixelRatio;
          var m = +(arguments.length <= 0 ? void 0 : arguments[0]);
          return m !== this._state.options.pixelRatio && (this._state.options.pixelRatio = m, this._updateDimension()), this;
        } }, { key: "_updateDimension", value: function() {
          return this;
        } }, { key: "updateDimensionNow", value: function() {
          return this._updateDimension(), this._updateDimension.flush(), this;
        } }]), _;
      }(), bn = function(_) {
        function m(y) {
          var b;
          E(this, m);
          for (var w = arguments.length, M = Array(w > 1 ? w - 1 : 0), D = 1; w > D; D++) M[D - 1] = arguments[D];
          var O = N(this, (b = Object.getPrototypeOf(m)).call.apply(b, [this].concat(M)));
          v(O._state, { innerWidth: 0, innerHeight: 0, fitOptions: null, data: null, plates: [] }), O.container = r.select(y), O.container.style("line-height", 0), O.chartRoot = O.container.append("div").classed("d3kit-chart-root", !0).style("display", "inline-block").style("position", "relative").style("line-height", 0), O.plates = {};
          var H = O.constructor.getCustomEventNames();
          return O.setupDispatcher(H), O._dispatchData = d(O._dispatchData.bind(O), 1), O._dispatchOptions = d(O._dispatchOptions.bind(O), 1), O;
        }
        return P(m, _), k(m, null, [{ key: "getCustomEventNames", value: function() {
          return [];
        } }]), k(m, [{ key: "addPlate", value: function(y, b, w) {
          if (this.plates[y]) throw new Error("Plate with this name already exists", y);
          return this._state.plates.push(b), this.plates[y] = b, w ? b : (b.getSelection().classed("d3kit-plate", !0).style("position", "absolute").style("top", 0).style("left", 0), this.chartRoot.append(function() {
            return b.getNode();
          }), this);
        } }, { key: "removePlate", value: function(y) {
          var b = this.plates[y];
          if (b) {
            var w = this._state.plates.indexOf(b);
            w > -1 && this._state.plates.splice(w, 1), b.getNode().parentNode === this.chartRoot.node() && this.chartRoot.node().removeChild(b.getNode()), delete this.plates[y];
          }
          return this;
        } }, { key: "setupDispatcher", value: function() {
          var y = arguments.length <= 0 || arguments[0] === void 0 ? [] : arguments[0];
          return this._customEventNames = y, this._eventNames = m.DEFAULT_EVENTS.concat(y), this.dispatcher = i.dispatch.apply(this, this._eventNames), this;
        } }, { key: "getCustomEventNames", value: function() {
          return this._customEventNames;
        } }, { key: "getInnerWidth", value: function() {
          return this._state.innerWidth;
        } }, { key: "getInnerHeight", value: function() {
          return this._state.innerHeight;
        } }, { key: "data", value: function() {
          for (var y = arguments.length, b = Array(y), w = 0; y > w; w++) b[w] = arguments[w];
          if (b.length === 0) return this._state.data;
          var M = b[0];
          return this._state.data = M, this._dispatchData(), this;
        } }, { key: "options", value: function() {
          for (var y = arguments.length, b = Array(y), w = 0; y > w; w++) b[w] = arguments[w];
          if (b.length === 0) return this._state.options;
          var M = b[0], D = v({}, M);
          return M.margin && (this.margin(M.margin), delete D.margin), M.offset && (this.offset(M.offset), delete D.offset), M.pixelRatio && (this.pixelRatio(M.pixelRatio), delete D.pixelRatio), this._state.options = g(this._state.options, D), this._dispatchOptions(), this;
        } }, { key: "_updateDimension", value: function() {
          var y = this, b = this._state, w = b.width, M = b.height, D = b.plates, O = this._state.options.margin, H = O.top, z = O.right, X = O.bottom, rt = O.left;
          this._state.innerWidth = w - rt - z, this._state.innerHeight = M - H - X, this.chartRoot.style("width", w + "px").style("height", M + "px"), D.forEach(function(yt) {
            yt.copyDimension(y).updateDimensionNow();
          });
          var Q = this._state, et = Q.innerWidth, ft = Q.innerHeight;
          return this.dispatcher.apply("resize", this, [w, M, et, ft]), this;
        } }, { key: "hasData", value: function() {
          var y = this._state.data;
          return y != null;
        } }, { key: "hasNonZeroArea", value: function() {
          var y = this._state, b = y.innerWidth, w = y.innerHeight;
          return b > 0 && w > 0;
        } }, { key: "fit", value: function(y) {
          var b = this, w = arguments.length <= 1 || arguments[1] === void 0 ? !1 : arguments[1];
          y && (this._state.fitOptions = y);
          var M = new _n(this._state.fitOptions), D = M.fit(this.dimension(), this.container.node()), O = D.changed, H = D.dimension;
          O && this.dimension([H.width, H.height]);
          var z = !!w;
          return z && (this.fitWatcher && this.fitWatcher.destroy(), this.fitWatcher = new Ju(function() {
            return b.dimension();
          }, this.container.node(), this._state.fitOptions, o(w) ? w : null).on("change", function(X) {
            return b.dimension([X.width, X.height]);
          }).start()), this;
        } }, { key: "stopFitWatcher", value: function() {
          return this.fitWatcher && (this.fitWatcher.destroy(), this.fitWatcher = null), this;
        } }, { key: "_dispatchData", value: function() {
          return this.dispatcher.call("data", this, this._state.data), this;
        } }, { key: "_dispatchOptions", value: function() {
          return this.dispatcher.call("options", this, this._state.options), this;
        } }, { key: "on", value: function(y, b) {
          return this.dispatcher.on(y, b), this;
        } }, { key: "off", value: function(y) {
          return this.dispatcher.on(y, null), this;
        } }, { key: "dispatchAs", value: function(y) {
          var b = this;
          return function() {
            for (var w = arguments.length, M = Array(w), D = 0; w > D; D++) M[D] = arguments[D];
            b.dispatcher.apply(y, b, M);
          };
        } }, { key: "destroy", value: function() {
          var y = this;
          return this._eventNames.forEach(function(b) {
            y.off(b);
          }), this.stopFitWatcher(), this;
        } }]), m;
      }(wo);
      bn.DEFAULT_EVENTS = ["data", "options", "resize"];
      var wn = function(_) {
        function m(y) {
          var b;
          E(this, m);
          for (var w = arguments.length, M = Array(w > 1 ? w - 1 : 0), D = 1; w > D; D++) M[D - 1] = arguments[D];
          var O = N(this, (b = Object.getPrototypeOf(m)).call.apply(b, [this].concat(M)));
          return O.node = y, O.selection = r.select(O.node), O;
        }
        return P(m, _), k(m, [{ key: "getNode", value: function() {
          return this.node;
        } }, { key: "getSelection", value: function() {
          return this.selection;
        } }]), m;
      }(wo), xo = function(_) {
        function m() {
          var y;
          E(this, m);
          for (var b = arguments.length, w = Array(b), M = 0; b > M; M++) w[M] = arguments[M];
          return N(this, (y = Object.getPrototypeOf(m)).call.apply(y, [this, document.createElement("canvas")].concat(w)));
        }
        return P(m, _), k(m, [{ key: "getContext2d", value: function() {
          var y = (this.width(), this.height(), this.pixelRatio()), b = this.margin(), w = b.top, M = b.left, D = this.offset(), O = C(D, 2), H = O[0], z = O[1], X = this.node.getContext("2d");
          return X.setTransform(1, 0, 0, 1, 0, 0), X.scale(y, y), X.translate(M + H, w + z), X;
        } }, { key: "clear", value: function() {
          var y = this.width(), b = this.height(), w = this.pixelRatio(), M = this.node.getContext("2d");
          return M.setTransform(1, 0, 0, 1, 0, 0), M.scale(w, w), M.clearRect(0, 0, y, b), this;
        } }, { key: "_updateDimension", value: function() {
          var y = this.width(), b = this.height(), w = this.pixelRatio();
          return this.node.setAttribute("width", y * w), this.node.setAttribute("height", b * w), this.node.style.width = y + "px", this.node.style.height = b + "px", this;
        } }]), m;
      }(wn), Mo = function(_) {
        function m(y) {
          var b;
          E(this, m);
          for (var w = arguments.length, M = Array(w > 1 ? w - 1 : 0), D = 1; w > D; D++) M[D - 1] = arguments[D];
          var O = N(this, (b = Object.getPrototypeOf(m)).call.apply(b, [this, y].concat(M)));
          return O.addPlate("canvas", new xo()), O.canvas = O.plates.canvas.getSelection(), O.updateDimensionNow(), O;
        }
        return P(m, _), k(m, [{ key: "getContext2d", value: function() {
          return this.plates.canvas.getContext2d();
        } }, { key: "clear", value: function() {
          return this.plates.canvas.clear(), this;
        } }]), m;
      }(bn), Or = function(_) {
        function m() {
          var y;
          E(this, m);
          for (var b = arguments.length, w = Array(b), M = 0; b > M; M++) w[M] = arguments[M];
          var D = N(this, (y = Object.getPrototypeOf(m)).call.apply(y, [this, document.createElementNS("http://www.w3.org/2000/svg", "svg")].concat(w)));
          return D.rootG = D.selection.append("g"), D.layers = new W(D.rootG), D;
        }
        return P(m, _), k(m, [{ key: "_updateDimension", value: function() {
          var y = this.width(), b = this.height(), w = this.margin(), M = w.top, D = w.left, O = this.offset(), H = C(O, 2), z = H[0], X = H[1];
          return this.selection.attr("width", y).attr("height", b), this.rootG.attr("transform", "translate(" + (D + z) + "," + (M + X) + ")"), this;
        } }]), m;
      }(wn), Qu = function(_) {
        function m(y) {
          var b;
          E(this, m);
          for (var w = arguments.length, M = Array(w > 1 ? w - 1 : 0), D = 1; w > D; D++) M[D - 1] = arguments[D];
          var O = N(this, (b = Object.getPrototypeOf(m)).call.apply(b, [this, y].concat(M)));
          O.addPlate("svg", new Or());
          var H = O.plates.svg;
          return O.svg = H.getSelection(), O.rootG = H.rootG, O.layers = H.layers, O.updateDimensionNow(), O;
        }
        return P(m, _), m;
      }(Mo), tc = function(_) {
        function m(y) {
          var b;
          E(this, m);
          for (var w = arguments.length, M = Array(w > 1 ? w - 1 : 0), D = 1; w > D; D++) M[D - 1] = arguments[D];
          var O = N(this, (b = Object.getPrototypeOf(m)).call.apply(b, [this, y].concat(M)));
          O.addPlate("svg", new Or());
          var H = O.plates.svg;
          return O.svg = H.getSelection(), O.rootG = H.rootG, O.layers = H.layers, O.updateDimensionNow(), O;
        }
        return P(m, _), m;
      }(bn), ec = function(_) {
        function m() {
          var y;
          E(this, m);
          for (var b = arguments.length, w = Array(b), M = 0; b > M; M++) w[M] = arguments[M];
          return N(this, (y = Object.getPrototypeOf(m)).call.apply(y, [this, document.createElement("div")].concat(w)));
        }
        return P(m, _), k(m, [{ key: "_updateDimension", value: function() {
          var y = this.width(), b = this.height(), w = this.margin();
          return this.node.style.width = y - w.left - w.right + "px", this.node.style.height = b - w.top - w.bottom + "px", this.node.style.marginLeft = w.left + "px", this.node.style.marginRight = w.right + "px", this.node.style.marginTop = w.top + "px", this.node.style.marginBottom = w.bottom + "px", this;
        } }]), m;
      }(wn);
      n.helper = Zu, n.AbstractChart = bn, n.CanvasChart = Mo, n.HybridChart = Qu, n.SvgChart = tc, n.AbstractPlate = wn, n.CanvasPlate = xo, n.DivPlate = ec, n.SvgPlate = Or, n.LayerOrganizer = W, Object.defineProperty(n, "__esModule", { value: !0 });
    });
  }(Dn, Dn.exports)), Dn.exports;
}
var zr = { exports: {} }, Ea;
function im() {
  return Ea || (Ea = 1, function(t, e) {
    (function(n, r) {
      t.exports = r();
    })(jt, function() {
      return function(n) {
        function r(o) {
          if (i[o]) return i[o].exports;
          var a = i[o] = { exports: {}, id: o, loaded: !1 };
          return n[o].call(a.exports, a, a.exports, r), a.loaded = !0, a.exports;
        }
        var i = {};
        return r.m = n, r.c = i, r.p = "", r(0);
      }([function(n, r, i) {
        n.exports = { Node: i(1), Force: i(2), Distributor: i(3), Renderer: i(10) };
      }, function(n, r) {
        function i(s, u) {
          if (!(s instanceof u)) throw new TypeError("Cannot call a class as a function");
        }
        var o = /* @__PURE__ */ function() {
          function s(u, f) {
            for (var d = 0; d < f.length; d++) {
              var l = f[d];
              l.enumerable = l.enumerable || !1, l.configurable = !0, "value" in l && (l.writable = !0), Object.defineProperty(u, l.key, l);
            }
          }
          return function(u, f, d) {
            return f && s(u.prototype, f), d && s(u, d), u;
          };
        }(), a = function() {
          function s(u, f, d) {
            i(this, s), this.idealPos = u, this.currentPos = u, this.width = f, this.data = d, this.layerIndex = 0;
          }
          return o(s, [{ key: "distanceFrom", value: function(u) {
            var f = this.width / 2, d = u.width / 2;
            return Math.max(this.currentPos - f, u.currentPos - d) - Math.min(this.currentPos + f, u.currentPos + d);
          } }, { key: "moveToIdealPosition", value: function() {
            return this.currentPos = this.idealPos, this;
          } }, { key: "displacement", value: function() {
            return this.idealPos - this.currentPos;
          } }, { key: "overlapWithNode", value: function(u) {
            var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return this.distanceFrom(u) - f < 0;
          } }, { key: "overlapWithPoint", value: function(u) {
            var f = this.width / 2;
            return u >= this.currentPos - f && u <= this.currentPos + f;
          } }, { key: "positionBefore", value: function(u) {
            var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return u.currentLeft() - this.width / 2 - f;
          } }, { key: "positionAfter", value: function(u) {
            var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return u.currentRight() + this.width / 2 + f;
          } }, { key: "currentRight", value: function() {
            return this.currentPos + this.width / 2;
          } }, { key: "currentLeft", value: function() {
            return this.currentPos - this.width / 2;
          } }, { key: "idealRight", value: function() {
            return this.idealPos + this.width / 2;
          } }, { key: "idealLeft", value: function() {
            return this.idealPos - this.width / 2;
          } }, { key: "createStub", value: function(u) {
            var f = new s(this.idealPos, u, this.data);
            return f.currentPos = this.currentPos, f.child = this, this.parent = f, f;
          } }, { key: "removeStub", value: function() {
            return this.parent && (this.parent.child = null, this.parent = null), this;
          } }, { key: "isStub", value: function() {
            return !!this.child;
          } }, { key: "getPathToRoot", value: function() {
            for (var u = [], f = this; f; ) u.push(f), f = f.parent;
            return u;
          } }, { key: "getPathFromRoot", value: function() {
            return this.getPathToRoot().reverse();
          } }, { key: "getPathToRootLength", value: function() {
            for (var u = 0, f = this; f; ) {
              var d = f.parent ? f.parent.currentPos : f.idealPos;
              u += Math.abs(f.currentPos - d), f = f.parent;
            }
            return u;
          } }, { key: "getRoot", value: function() {
            for (var u = this, f = this; f; ) u = f, f = f.parent;
            return u;
          } }, { key: "getLayerIndex", value: function() {
            return this.layerIndex;
          } }, { key: "clone", value: function() {
            var u = new s(this.idealPos, this.width, this.data);
            return u.currentPos = this.currentPos, u.layerIndex = this.layerIndex, u;
          } }]), s;
        }();
        n.exports = a;
      }, function(n, r, i) {
        var o = i(3), a = i(4), s = i(8), u = { nodeSpacing: 3, minPos: 0, maxPos: null, algorithm: "overlap", removeOverlap: !0, density: 0.85, stubWidth: 1 }, f = function(d) {
          var l = {}, c = a.extend({}, u), h = new o(), p = [], g = null;
          return l.nodes = function(v) {
            return arguments.length ? (p = v, g = [v.concat()], l) : p;
          }, l.getLayers = function() {
            return g;
          }, l.options = function(v) {
            if (!arguments.length) return c;
            c = a.extend(c, v);
            var x = a.pick(c, Object.keys(o.DEFAULT_OPTIONS));
            return a.isDefined(c.minPos) && a.isDefined(c.maxPos) ? x.layerWidth = c.maxPos - c.minPos : x.layerWidth = null, h.options(x), l;
          }, l.options(d), l.compute = function() {
            var v = a.pick(c, Object.keys(s.DEFAULT_OPTIONS));
            return p.forEach(function(x) {
              x.removeStub();
            }), g = h.distribute(p), g.map(function(x, S) {
              x.forEach(function(A) {
                A.layerIndex = S;
              }), c.removeOverlap && s(x, v);
            }), l;
          }, l.start = function() {
            console.log("[warning] force.start() is deprecated. Please use force.compute() instead.");
          }, l;
        };
        f.DEFAULT_OPTIONS = u, n.exports = f;
      }, function(n, r, i) {
        var o = i(4), a = i(6), s = { algorithm: "overlap", layerWidth: 1e3, density: 0.75, nodeSpacing: 3, stubWidth: 1 }, u = function(f) {
          var d = {};
          f = o.extend({}, s, f), d.options = function(c) {
            return arguments.length ? (f = o.extend(f, c), d) : f;
          }, d.computeRequiredWidth = function(c) {
            return o.sum(c, function(h) {
              return h.width + f.nodeSpacing;
            }) - f.nodeSpacing;
          }, d.maxWidthPerLayer = function() {
            return f.density * f.layerWidth;
          }, d.needToSplit = function(c) {
            return d.estimateRequiredLayers(c) > 1;
          }, d.estimateRequiredLayers = function(c) {
            return f.layerWidth ? Math.ceil(d.computeRequiredWidth(c) / d.maxWidthPerLayer()) : 1;
          };
          var l = { simple: function(c) {
            for (var h = d.estimateRequiredLayers(c), p = [], g = 0; g < h; g++) p.push([]);
            return c.forEach(function(v, x) {
              var S = x % h;
              p[S].push(v);
              for (var A = v, I = S - 1; I >= 0; I--) A = A.createStub(f.stubWidth), p[I].push(A);
            }), p;
          }, roundRobin: function(c) {
            var h = [];
            return h;
          }, overlap: function(c) {
            for (var h = [], p = d.maxWidthPerLayer(), g = c.concat(), v = d.computeRequiredWidth(g); v > p; ) {
              d.countIdealOverlaps(g);
              var x = g.concat(), S = v;
              for (g = []; x.length > 2 && S > p; ) {
                x.sort(function(q, E) {
                  return E.overlapCount - q.overlapCount;
                });
                var A = x.shift();
                S -= A.width, S += f.stubWidth, A.overlaps.forEach(function(q) {
                  q.overlapCount--;
                }), g.push(A);
              }
              h.push(x), v = d.computeRequiredWidth(g);
            }
            g.length > 0 && h.push(g);
            for (var I = h.length - 1; I >= 1; I--) for (var R = h[I], F = 0; F < R.length; F++) {
              var L = R[F];
              if (!L.isStub()) for (var j = L, W = I - 1; W >= 0; W--) j = j.createStub(f.stubWidth), h[W].push(j);
            }
            return h;
          } };
          return d.countIdealOverlaps = function(c) {
            var h = new a(f.layerWidth / 2);
            return c.forEach(function(p) {
              h.add([p.idealLeft(), p.idealRight(), p]);
            }), c.forEach(function(p) {
              var g = h.search(p.idealLeft(), p.idealRight());
              p.overlaps = g.map(function(v) {
                return v.data[2];
              }), p.overlapCount = g.length;
            }), c;
          }, d.distribute = function(c) {
            if (!c || c.length === 0) return [];
            if (f.algorithm == "none" || !o.isDefined(f.algorithm)) return [c];
            if (!d.needToSplit(c)) return [c];
            var h = c.concat().sort(function(p, g) {
              return p.idealPos - g.idealPos;
            });
            if (typeof f.algorithm == "function") return f.algorithm(h, f);
            if (l.hasOwnProperty(f.algorithm)) return l[f.algorithm](h);
            throw "Unknown algorithm: " + f.algorithm;
          }, d;
        };
        u.DEFAULT_OPTIONS = s, n.exports = u;
      }, function(n, r, i) {
        var o = { isDefined: function(a) {
          return a != null;
        }, last: function(a) {
          return a.length > 0 ? a[a.length - 1] : null;
        }, pick: function(a, s) {
          return s.reduce(function(u, f) {
            return u[f] = a[f], u;
          }, {});
        }, sum: function(a, s) {
          return a.map(s).reduce(function(u, f) {
            return u + f;
          }, 0);
        } };
        o.extend = i(5), n.exports = o;
      }, function(n, r) {
        var i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(f) {
          return typeof f;
        } : function(f) {
          return f && typeof Symbol == "function" && f.constructor === Symbol && f !== Symbol.prototype ? "symbol" : typeof f;
        }, o = Object.prototype.hasOwnProperty, a = Object.prototype.toString, s = function(f) {
          return typeof Array.isArray == "function" ? Array.isArray(f) : a.call(f) === "[object Array]";
        }, u = function(f) {
          if (!f || a.call(f) !== "[object Object]") return !1;
          var d = o.call(f, "constructor"), l = f.constructor && f.constructor.prototype && o.call(f.constructor.prototype, "isPrototypeOf");
          if (f.constructor && !d && !l) return !1;
          var c;
          for (c in f) ;
          return c === void 0 || o.call(f, c);
        };
        n.exports = function f() {
          var d, l, c, h, p, g, v = arguments[0], x = 1, S = arguments.length, A = !1;
          for (typeof v == "boolean" ? (A = v, v = arguments[1] || {}, x = 2) : ((typeof v > "u" ? "undefined" : i(v)) !== "object" && typeof v != "function" || v == null) && (v = {}); x < S; ++x) if (d = arguments[x], d != null) for (l in d) c = v[l], h = d[l], v !== h && (A && h && (u(h) || (p = s(h))) ? (p ? (p = !1, g = c && s(c) ? c : []) : g = c && u(c) ? c : {}, v[l] = f(A, g, h)) : h !== void 0 && (v[l] = h));
          return v;
        };
      }, function(n, r, i) {
        function o(c, h) {
          if (h || (h = {}), this.startKey = h.startKey || 0, this.endKey = h.endKey || 1, this.intervalHash = {}, this.pointTree = new l({ compare: function(p, g) {
            if (p == null) return -1;
            if (g == null) return 1;
            var v = p[0] - g[0];
            return v > 0 ? 1 : v == 0 ? 0 : -1;
          } }), this._autoIncrement = 0, !c || typeof c != "number") throw new Error("you must specify center index as the 2nd argument.");
          this.root = new f(c);
        }
        function a(c, h) {
          return h.end < c.idx ? (c.left || (c.left = new f(h.start + h.end >> 1)), a.call(this, c.left, h)) : c.idx < h.start ? (c.right || (c.right = new f(h.start + h.end >> 1)), a.call(this, c.right, h)) : c.insert(h);
        }
        function s(c, h, p) {
          if (c) return h < c.idx ? (c.starts.every(function(g) {
            var v = g.start <= h;
            return v && p.push(g.result()), v;
          }), s.call(this, c.left, h, p)) : h > c.idx ? (c.ends.every(function(g) {
            var v = g.end >= h;
            return v && p.push(g.result()), v;
          }), s.call(this, c.right, h, p)) : void c.starts.map(function(g) {
            p.push(g.result());
          });
        }
        function u(c, h, p) {
          if (h - c <= 0) throw new Error("end must be greater than start. start: " + c + ", end: " + h);
          var g = {}, v = [];
          s.call(this, this.root, c + h >> 1, v, !0), v.forEach(function(R) {
            g[R.id] = !0;
          });
          for (var x = this.pointTree.bsearch([c, null]), S = this.pointTree; x >= 0 && S[x][0] == c; ) x--;
          var A = this.pointTree.bsearch([h, null]);
          if (A >= 0) {
            for (var I = S.length - 1; A <= I && S[A][0] <= h; ) A++;
            S.slice(x + 1, A).forEach(function(R) {
              var F = R[1];
              g[F] = !0;
            }, this), Object.keys(g).forEach(function(R) {
              var F = this.intervalHash[R];
              p.push(F.result(c, h));
            }, this);
          }
        }
        function f(c) {
          this.idx = c, this.starts = new l({ compare: function(h, p) {
            if (h == null) return -1;
            if (p == null) return 1;
            var g = h.start - p.start;
            return g > 0 ? 1 : g == 0 ? 0 : -1;
          } }), this.ends = new l({ compare: function(h, p) {
            if (h == null) return -1;
            if (p == null) return 1;
            var g = h.end - p.end;
            return g < 0 ? 1 : g == 0 ? 0 : -1;
          } });
        }
        function d(c, h, p, g) {
          if (this.id = h, this.start = c[p], this.end = c[g], this.data = c, typeof this.start != "number" || typeof this.end != "number") throw new Error("start, end must be number. start: " + this.start + ", end: " + this.end);
          if (this.start >= this.end) throw new Error("start must be smaller than end. start: " + this.start + ", end: " + this.end);
        }
        var l = i(7);
        o.prototype.add = function(c, h) {
          if (this.intervalHash[h]) throw new Error("id " + h + " is already registered.");
          if (h == null) {
            for (; this.intervalHash[this._autoIncrement]; ) this._autoIncrement++;
            h = this._autoIncrement;
          }
          var p = new d(c, h, this.startKey, this.endKey);
          this.pointTree.insert([p.start, h]), this.pointTree.insert([p.end, h]), this.intervalHash[h] = p, this._autoIncrement++, a.call(this, this.root, p);
        }, o.prototype.search = function(c, h) {
          var p = [];
          if (typeof c != "number") throw new Error(c + ": invalid input");
          if (h == null) s.call(this, this.root, c, p);
          else {
            if (typeof h != "number") throw new Error(c + "," + h + ": invalid input");
            u.call(this, c, h, p);
          }
          return p;
        }, o.prototype.remove = function(c) {
        }, f.prototype.insert = function(c) {
          this.starts.insert(c), this.ends.insert(c);
        }, d.prototype.result = function(c, h) {
          var p = { id: this.id, data: this.data };
          if (typeof c == "number" && typeof h == "number") {
            var g = Math.max(this.start, c), v = Math.min(this.end, h), x = v - g;
            p.rate1 = x / (h - c), p.rate2 = x / (this.end - this.start);
          }
          return p;
        }, n.exports = o;
      }, function(n, r) {
        var i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
          return typeof a;
        } : function(a) {
          return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
        }, o = function a() {
          var s = null, u = {}, f = arguments;
          ["0", "1"].forEach(function(d) {
            var l = f[d];
            Array.isArray(l) ? s = l : l && (typeof l > "u" ? "undefined" : i(l)) == "object" && (u = l);
          }), typeof u.filter == "function" && (this._filter = u.filter), typeof u.compare == "function" ? this._compare = u.compare : typeof u.compare == "string" && a.compares[u.compare] && (this._compare = a.compares[u.compare]), this._unique = !!u.unique, u.resume && s ? s.forEach(function(d, l) {
            this.push(d);
          }, this) : s && this.insert.apply(this, s);
        };
        o.create = function(a, s) {
          return new o(a, s);
        }, o.prototype = new Array(), o.prototype.constructor = Array.prototype.constructor, o.prototype.insertOne = function(a) {
          var s = this.bsearch(a);
          return (!this._unique || this.key(a, s) == null) && !!this._filter(a, s) && (this.splice(s + 1, 0, a), s + 1);
        }, o.prototype.insert = function() {
          return Array.prototype.map.call(arguments, function(a) {
            return this.insertOne(a);
          }, this);
        }, o.prototype.remove = function(a) {
          return this.splice(a, 1), this;
        }, o.prototype.bsearch = function(a) {
          if (!this.length) return -1;
          for (var s, u = 0, f = this.length; f - u > 1; ) {
            s = Math.floor((u + f) / 2);
            var d = this[s], l = this._compare(a, d);
            if (l == 0) return s;
            l > 0 ? u = s : f = s;
          }
          return u == 0 && this._compare(this[0], a) > 0 ? -1 : u;
        }, o.prototype.key = function(a, s) {
          s == null && (s = this.bsearch(a));
          var u = s;
          if (u == -1 || this._compare(this[u], a) < 0) return u + 1 < this.length && this._compare(this[u + 1], a) == 0 ? u + 1 : null;
          for (; u >= 1 && this._compare(this[u - 1], a) == 0; ) u--;
          return u;
        }, o.prototype.keys = function(a, s) {
          var u = [];
          s == null && (s = this.bsearch(a));
          for (var f = s; f >= 0 && this._compare(this[f], a) == 0; ) u.push(f), f--;
          var d = this.length;
          for (f = s + 1; f < d && this._compare(this[f], a) == 0; ) u.push(f), f++;
          return u.length ? u : null;
        }, o.prototype.unique = function(a) {
          if (a) return this.filter(function(u, f) {
            return f == 0 || this._compare(this[f - 1], u) != 0;
          }, this);
          var s = 0;
          return this.map(function(u, f) {
            return f == 0 || this._compare(this[f - 1], u) != 0 ? null : f - s++;
          }, this).forEach(function(u) {
            u != null && this.remove(u);
          }, this), this;
        }, o.prototype.toArray = function() {
          return this.slice();
        }, o.prototype._filter = function(a, s) {
          return !0;
        }, o.compares = { number: function(a, s) {
          var u = a - s;
          return u > 0 ? 1 : u == 0 ? 0 : -1;
        }, string: function(a, s) {
          return a > s ? 1 : a == s ? 0 : -1;
        } }, o.prototype._compare = o.compares.string, n.exports = o;
      }, function(n, r, i) {
        function o(d) {
          var l = new u.Variable(d.targetPos);
          return l.node = d, l;
        }
        function a(d, l) {
          if (d.length > 0) {
            l = s.extend(f, l), d.forEach(function(F, L) {
              F.targetPos = F.parent ? F.parent.currentPos : F.idealPos, F.index = L;
            });
            for (var c = d.concat().sort(function(F, L) {
              var j = F.targetPos - L.targetPos;
              if (j !== 0) return j;
              var W = F.isStub() - L.isStub();
              return W !== 0 ? W : F.index - L.index;
            }).map(o), h = [], p = 1; p < c.length; p++) {
              var g = c[p - 1], v = c[p], x = void 0;
              x = g.node.isStub() && v.node.isStub() ? (g.node.width + v.node.width) / 2 + l.lineSpacing : (g.node.width + v.node.width) / 2 + l.nodeSpacing, h.push(new u.Constraint(g, v, x));
            }
            if (s.isDefined(l.minPos)) {
              var S = new u.Variable(l.minPos, 1e10), A = c[0];
              h.push(new u.Constraint(S, A, A.node.width / 2)), c.unshift(S);
            }
            if (s.isDefined(l.maxPos)) {
              var I = new u.Variable(l.maxPos, 1e10), R = s.last(c);
              h.push(new u.Constraint(R, I, R.node.width / 2)), c.push(I);
            }
            new u.Solver(c, h).solve(), c.filter(function(F) {
              return F.node;
            }).map(function(F) {
              return F.node.currentPos = Math.round(F.position()), F;
            });
          }
          return d;
        }
        var s = i(4), u = i(9), f = { lineSpacing: 2, nodeSpacing: 3, minPos: 0, maxPos: null };
        a.DEFAULT_OPTIONS = f, n.exports = a;
      }, function(n, r) {
        var i = {}, o = function() {
          function l(c) {
            this.scale = c, this.AB = 0, this.AD = 0, this.A2 = 0;
          }
          return l.prototype.addVariable = function(c) {
            var h = this.scale / c.scale, p = c.offset / c.scale, g = c.weight;
            this.AB += g * h * p, this.AD += g * h * c.desiredPosition, this.A2 += g * h * h;
          }, l.prototype.getPosn = function() {
            return (this.AD - this.AB) / this.A2;
          }, l;
        }();
        i.PositionStats = o;
        var a = function() {
          function l(c, h, p, g) {
            g === void 0 && (g = !1), this.left = c, this.right = h, this.gap = p, this.equality = g, this.active = !1, this.unsatisfiable = !1, this.left = c, this.right = h, this.gap = p, this.equality = g;
          }
          return l.prototype.slack = function() {
            return this.unsatisfiable ? Number.MAX_VALUE : this.right.scale * this.right.position() - this.gap - this.left.scale * this.left.position();
          }, l;
        }();
        i.Constraint = a;
        var s = function() {
          function l(c, h, p) {
            h === void 0 && (h = 1), p === void 0 && (p = 1), this.desiredPosition = c, this.weight = h, this.scale = p, this.offset = 0;
          }
          return l.prototype.dfdv = function() {
            return 2 * this.weight * (this.position() - this.desiredPosition);
          }, l.prototype.position = function() {
            return (this.block.ps.scale * this.block.posn + this.offset) / this.scale;
          }, l.prototype.visitNeighbours = function(c, h) {
            var p = function(g, v) {
              return g.active && c !== v && h(g, v);
            };
            this.cOut.forEach(function(g) {
              return p(g, g.right);
            }), this.cIn.forEach(function(g) {
              return p(g, g.left);
            });
          }, l;
        }();
        i.Variable = s;
        var u = function() {
          function l(c) {
            this.vars = [], c.offset = 0, this.ps = new o(c.scale), this.addVariable(c);
          }
          return l.prototype.addVariable = function(c) {
            c.block = this, this.vars.push(c), this.ps.addVariable(c), this.posn = this.ps.getPosn();
          }, l.prototype.updateWeightedPosition = function() {
            this.ps.AB = this.ps.AD = this.ps.A2 = 0;
            for (var c = 0, h = this.vars.length; c < h; ++c) this.ps.addVariable(this.vars[c]);
            this.posn = this.ps.getPosn();
          }, l.prototype.compute_lm = function(c, h, p) {
            var g = this, v = c.dfdv();
            return c.visitNeighbours(h, function(x, S) {
              var A = g.compute_lm(S, c, p);
              S === x.right ? (v += A * x.left.scale, x.lm = A) : (v += A * x.right.scale, x.lm = -A), p(x);
            }), v / c.scale;
          }, l.prototype.populateSplitBlock = function(c, h) {
            var p = this;
            c.visitNeighbours(h, function(g, v) {
              v.offset = c.offset + (v === g.right ? g.gap : -g.gap), p.addVariable(v), p.populateSplitBlock(v, c);
            });
          }, l.prototype.traverse = function(c, h, p, g) {
            var v = this;
            p === void 0 && (p = this.vars[0]), g === void 0 && (g = null), p.visitNeighbours(g, function(x, S) {
              h.push(c(x)), v.traverse(c, h, S, p);
            });
          }, l.prototype.findMinLM = function() {
            var c = null;
            return this.compute_lm(this.vars[0], null, function(h) {
              !h.equality && (c === null || h.lm < c.lm) && (c = h);
            }), c;
          }, l.prototype.findMinLMBetween = function(c, h) {
            this.compute_lm(c, null, function() {
            });
            var p = null;
            return this.findPath(c, null, h, function(g, v) {
              !g.equality && g.right === v && (p === null || g.lm < p.lm) && (p = g);
            }), p;
          }, l.prototype.findPath = function(c, h, p, g) {
            var v = this, x = !1;
            return c.visitNeighbours(h, function(S, A) {
              x || A !== p && !v.findPath(A, c, p, g) || (x = !0, g(S, A));
            }), x;
          }, l.prototype.isActiveDirectedPathBetween = function(c, h) {
            if (c === h) return !0;
            for (var p = c.cOut.length; p--; ) {
              var g = c.cOut[p];
              if (g.active && this.isActiveDirectedPathBetween(g.right, h)) return !0;
            }
            return !1;
          }, l.split = function(c) {
            return c.active = !1, [l.createSplitBlock(c.left), l.createSplitBlock(c.right)];
          }, l.createSplitBlock = function(c) {
            var h = new l(c);
            return h.populateSplitBlock(c, null), h;
          }, l.prototype.splitBetween = function(c, h) {
            var p = this.findMinLMBetween(c, h);
            if (p !== null) {
              var g = l.split(p);
              return { constraint: p, lb: g[0], rb: g[1] };
            }
            return null;
          }, l.prototype.mergeAcross = function(c, h, p) {
            h.active = !0;
            for (var g = 0, v = c.vars.length; g < v; ++g) {
              var x = c.vars[g];
              x.offset += p, this.addVariable(x);
            }
            this.posn = this.ps.getPosn();
          }, l.prototype.cost = function() {
            for (var c = 0, h = this.vars.length; h--; ) {
              var p = this.vars[h], g = p.position() - p.desiredPosition;
              c += g * g * p.weight;
            }
            return c;
          }, l;
        }();
        i.Block = u;
        var f = function() {
          function l(c) {
            this.vs = c;
            var h = c.length;
            for (this.list = new Array(h); h--; ) {
              var p = new u(c[h]);
              this.list[h] = p, p.blockInd = h;
            }
          }
          return l.prototype.cost = function() {
            for (var c = 0, h = this.list.length; h--; ) c += this.list[h].cost();
            return c;
          }, l.prototype.insert = function(c) {
            c.blockInd = this.list.length, this.list.push(c);
          }, l.prototype.remove = function(c) {
            var h = this.list.length - 1, p = this.list[h];
            this.list.length = h, c !== p && (this.list[c.blockInd] = p, p.blockInd = c.blockInd);
          }, l.prototype.merge = function(c) {
            var h = c.left.block, p = c.right.block, g = c.right.offset - c.left.offset - c.gap;
            h.vars.length < p.vars.length ? (p.mergeAcross(h, c, g), this.remove(h)) : (h.mergeAcross(p, c, -g), this.remove(p));
          }, l.prototype.forEach = function(c) {
            this.list.forEach(c);
          }, l.prototype.updateBlockPositions = function() {
            this.list.forEach(function(c) {
              return c.updateWeightedPosition();
            });
          }, l.prototype.split = function(c) {
            var h = this;
            this.updateBlockPositions(), this.list.forEach(function(p) {
              var g = p.findMinLM();
              g !== null && g.lm < d.LAGRANGIAN_TOLERANCE && (p = g.left.block, u.split(g).forEach(function(v) {
                return h.insert(v);
              }), h.remove(p), c.push(g));
            });
          }, l;
        }();
        i.Blocks = f;
        var d = function() {
          function l(c, h) {
            this.vs = c, this.cs = h, this.vs = c, c.forEach(function(p) {
              p.cIn = [], p.cOut = [];
            }), this.cs = h, h.forEach(function(p) {
              p.left.cOut.push(p), p.right.cIn.push(p);
            }), this.inactive = h.map(function(p) {
              return p.active = !1, p;
            }), this.bs = null;
          }
          return l.prototype.cost = function() {
            return this.bs.cost();
          }, l.prototype.setStartingPositions = function(c) {
            this.inactive = this.cs.map(function(h) {
              return h.active = !1, h;
            }), this.bs = new f(this.vs), this.bs.forEach(function(h, p) {
              return h.posn = c[p];
            });
          }, l.prototype.setDesiredPositions = function(c) {
            this.vs.forEach(function(h, p) {
              return h.desiredPosition = c[p];
            });
          }, l.prototype.mostViolated = function() {
            for (var c = Number.MAX_VALUE, h = null, p = this.inactive, g = p.length, v = g, x = 0; x < g; ++x) {
              var S = p[x];
              if (!S.unsatisfiable) {
                var A = S.slack();
                if ((S.equality || A < c) && (c = A, h = S, v = x, S.equality)) break;
              }
            }
            return v !== g && (c < l.ZERO_UPPERBOUND && !h.active || h.equality) && (p[v] = p[g - 1], p.length = g - 1), h;
          }, l.prototype.satisfy = function() {
            this.bs == null && (this.bs = new f(this.vs)), this.bs.split(this.inactive);
            for (var c = null; (c = this.mostViolated()) && (c.equality || c.slack() < l.ZERO_UPPERBOUND && !c.active); ) {
              var h = c.left.block, p = c.right.block;
              if (h !== p) this.bs.merge(c);
              else {
                if (h.isActiveDirectedPathBetween(c.right, c.left)) {
                  c.unsatisfiable = !0;
                  continue;
                }
                var g = h.splitBetween(c.left, c.right);
                if (g === null) {
                  c.unsatisfiable = !0;
                  continue;
                }
                this.bs.insert(g.lb), this.bs.insert(g.rb), this.bs.remove(h), this.inactive.push(g.constraint), c.slack() >= 0 ? this.inactive.push(c) : this.bs.merge(c);
              }
            }
          }, l.prototype.solve = function() {
            this.satisfy();
            for (var c = Number.MAX_VALUE, h = this.bs.cost(); Math.abs(c - h) > 1e-4; ) this.satisfy(), c = h, h = this.bs.cost();
            return h;
          }, l.LAGRANGIAN_TOLERANCE = -1e-4, l.ZERO_UPPERBOUND = -1e-10, l;
        }();
        i.Solver = d, n.exports = i;
      }, function(n, r, i) {
        function o(c) {
          this.options = l.extend({ layerGap: 60, nodeHeight: 10, direction: "down" }, c);
        }
        function a(c) {
          return "L " + c.join(" ");
        }
        function s(c) {
          return "M " + c.join(" ");
        }
        function u(c, h, p) {
          return "C " + c.join(" ") + " " + h.join(" ") + " " + p.join(" ");
        }
        function f(c, h) {
          var p = (c[1] + h[1]) / 2;
          return u([c[0], p], [h[0], p], h);
        }
        function d(c, h) {
          var p = (c[0] + h[0]) / 2;
          return u([p, c[1]], [p, h[1]], h);
        }
        var l = i(4);
        o.lineTo = a, o.moveTo = s, o.curveTo = u, o.vCurveBetween = f, o.hCurveBetween = d, o.prototype.getWaypoints = function(c) {
          var h = this.options, p = h.direction, g = c.getPathFromRoot(), v = h.nodeHeight + h.layerGap;
          return p === "left" ? [[[0, g[0].idealPos]]].concat(g.map(function(x, S) {
            var A = v * (S + 1) * -1;
            return [[A + h.nodeHeight, x.currentPos], [A, x.currentPos]];
          })) : p === "right" ? [[[0, g[0].idealPos]]].concat(g.map(function(x, S) {
            var A = v * (S + 1);
            return [[A - h.nodeHeight, x.currentPos], [A, x.currentPos]];
          })) : p === "up" ? [[[g[0].idealPos, 0]]].concat(g.map(function(x, S) {
            var A = v * (S + 1) * -1;
            return [[x.currentPos, A + h.nodeHeight], [x.currentPos, A]];
          })) : [[[g[0].idealPos, 0]]].concat(g.map(function(x, S) {
            var A = v * (S + 1);
            return [[x.currentPos, A - h.nodeHeight], [x.currentPos, A]];
          }));
        }, o.prototype.layout = function(c) {
          var h = this.options, p = h.layerGap + h.nodeHeight;
          switch (h.direction) {
            case "left":
              c.forEach(function(g) {
                var v = g.getLayerIndex() * p + h.layerGap;
                g.x = -v - h.nodeHeight, g.y = g.currentPos, g.dx = h.nodeHeight, g.dy = g.width;
              });
              break;
            case "right":
              c.forEach(function(g) {
                var v = g.getLayerIndex() * p + h.layerGap;
                g.x = v, g.y = g.currentPos, g.dx = h.nodeHeight, g.dy = g.width;
              });
              break;
            case "up":
              c.forEach(function(g) {
                var v = g.getLayerIndex() * p + h.layerGap;
                g.x = g.currentPos, g.y = -v - h.nodeHeight, g.dx = g.width, g.dy = h.nodeHeight;
              });
              break;
            default:
            case "down":
              c.forEach(function(g) {
                var v = g.getLayerIndex() * p + h.layerGap;
                g.x = g.currentPos, g.y = v, g.dx = g.width, g.dy = h.nodeHeight;
              });
          }
          return c;
        }, o.prototype.generatePath = function(c) {
          var h = this.options, p = h.direction, g = this.getWaypoints(c, p), v = [s(g[0][0])];
          return p === "left" || p === "right" ? g.reduce(function(x, S, A) {
            return v.push(d(x[x.length - 1], S[0])), A < g.length - 1 && v.push(a(S[1])), S;
          }) : g.reduce(function(x, S, A) {
            return v.push(f(x[x.length - 1], S[0])), A < g.length - 1 && v.push(a(S[1])), S;
          }), v.join(" ");
        }, n.exports = o;
      }]);
    });
  }(zr)), zr.exports;
}
(function(t, e) {
  (function(n, r) {
    t.exports = r(bl, fp, Qg, tm, rm(), im());
  })(typeof self < "u" ? self : jt, function(n, r, i, o, a, s) {
    return function(u) {
      function f(l) {
        if (d[l]) return d[l].exports;
        var c = d[l] = { i: l, l: !1, exports: {} };
        return u[l].call(c.exports, c, c.exports, f), c.l = !0, c.exports;
      }
      var d = {};
      return f.m = u, f.c = d, f.d = function(l, c, h) {
        f.o(l, c) || Object.defineProperty(l, c, { configurable: !1, enumerable: !0, get: h });
      }, f.n = function(l) {
        var c = l && l.__esModule ? function() {
          return l.default;
        } : function() {
          return l;
        };
        return f.d(c, "a", c), c;
      }, f.o = function(l, c) {
        return Object.prototype.hasOwnProperty.call(l, c);
      }, f.p = "", f(f.s = 0);
    }([function(u, f, d) {
      u.exports = d(1);
    }, function(u, f, d) {
      function l(E, k) {
        if (!(E instanceof k)) throw new TypeError("Cannot call a class as a function");
      }
      function c(E, k) {
        if (!E) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !k || typeof k != "object" && typeof k != "function" ? E : k;
      }
      function h(E, k) {
        if (typeof k != "function" && k !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof k);
        E.prototype = Object.create(k && k.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), k && (Object.setPrototypeOf ? Object.setPrototypeOf(E, k) : E.__proto__ = k);
      }
      Object.defineProperty(f, "__esModule", { value: !0 });
      var p = d(2), g = (d.n(p), d(3)), v = (d.n(g), d(4)), x = (d.n(v), d(5)), S = (d.n(x), d(6)), A = (d.n(S), d(7)), I = d.n(A), R = /* @__PURE__ */ function() {
        function E(k, P) {
          for (var N = 0; N < P.length; N++) {
            var C = P[N];
            C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(k, C.key, C);
          }
        }
        return function(k, P, N) {
          return P && E(k.prototype, P), N && E(k, N), k;
        };
      }(), F = function E(k, P, N) {
        k === null && (k = Function.prototype);
        var C = Object.getOwnPropertyDescriptor(k, P);
        if (C === void 0) {
          var U = Object.getPrototypeOf(k);
          return U === null ? void 0 : E(U, P, N);
        }
        if ("value" in C) return C.value;
        var Z = C.get;
        if (Z !== void 0) return Z.call(N);
      }, L = function(E) {
        return E.w;
      }, j = function(E) {
        return E.h;
      }, W = function(E) {
        return E;
      }, q = function(E) {
        function k(P, N) {
          l(this, k);
          var C = c(this, (k.__proto__ || Object.getPrototypeOf(k)).call(this, P, N));
          return C.layers.create(["dummy", { main: ["axis", "link", "label", "dot"] }]), C.layers.get("main/axis").classed("axis", !0), C.force = new I.a.Force(N.labella), C.updateLabelText = C.updateLabelText.bind(C), C.visualize = C.visualize.bind(C), C.on("data", C.visualize), C.on("options", C.visualize), C.on("resize", C.visualize), C;
        }
        return h(k, E), R(k, null, [{ key: "getDefaultOptions", value: function() {
          return S.helper.deepExtend(F(k.__proto__ || Object.getPrototypeOf(k), "getDefaultOptions", this).call(this), { margin: { left: 40, right: 20, top: 20, bottom: 20 }, initialWidth: 400, initialHeight: 400, scale: Object(g.scaleTime)(), domain: void 0, direction: "right", dotRadius: 3, formatAxis: W, layerGap: 60, labella: {}, keyFn: void 0, timeFn: function(P) {
            return P.time;
          }, textFn: function(P) {
            return P.text;
          }, dotColor: "#222", labelBgColor: "#222", labelTextColor: "#fff", linkColor: "#222", labelPadding: { left: 4, right: 4, top: 3, bottom: 2 }, textYOffset: "0.85em" });
        } }, { key: "getCustomEventNames", value: function() {
          return ["dotClick", "dotMouseover", "dotMousemove", "dotMouseout", "dotMouseenter", "dotMouseleave", "labelClick", "labelMouseover", "labelMousemove", "labelMouseenter", "labelMouseleave", "labelMouseout"];
        } }]), R(k, [{ key: "resizeToFit", value: function() {
          var P = this.options(), N = void 0, C = this.force.nodes();
          switch (P.direction) {
            case "up":
              N = Object(x.max)(C, function(U) {
                return Math.abs(U.y);
              }) || 0, this.height(N + P.margin.top + P.margin.bottom);
              break;
            case "down":
              N = Object(x.max)(C, function(U) {
                return Math.abs(U.y + U.dy);
              }) || 0, this.height(N + P.margin.top + P.margin.bottom);
              break;
            case "left":
              N = Object(x.max)(C, function(U) {
                return Math.abs(U.x);
              }) || 0, this.width(N + P.margin.left + P.margin.right);
              break;
            case "right":
              N = Object(x.max)(C, function(U) {
                return Math.abs(U.x + U.dx);
              }) || 0, this.width(N + P.margin.left + P.margin.right);
          }
          return this;
        } }, { key: "updateLabelText", value: function(P, N, C) {
          var U = this.options();
          return C = C ? S.helper.functor(C) : W, P.text(function(Z) {
            return U.textFn(C(Z));
          }).attr("dy", U.textYOffset).attr("x", U.labelPadding.left).attr("y", U.labelPadding.top), Object.keys(N).forEach(function(Z) {
            var at = N[Z];
            P.style(Z, function(tt, ct) {
              return at(C(tt), ct);
            });
          }), P;
        } }, { key: "drawAxes", value: function() {
          var P = this.options(), N = void 0;
          switch (P.direction) {
            case "right":
              this.axis = Object(p.axisLeft)(), N = "translate(0,0)";
              break;
            case "left":
              this.axis = Object(p.axisRight)(), N = "translate(" + this.getInnerWidth() + ",0)";
              break;
            case "up":
              this.axis = Object(p.axisBottom)(), N = "translate(0," + this.getInnerHeight() + ")";
              break;
            case "down":
              this.axis = Object(p.axisTop)(), N = "translate(0,0)";
          }
          return this.layers.get("main").attr("transform", N), (P.formatAxis || W)(this.axis.scale(P.scale)), this.layers.get("main/axis").call(this.axis), this;
        } }, { key: "drawDots", value: function(P) {
          var N = this.options(), C = function(at) {
            return N.scale(N.timeFn(at));
          }, U = this.layers.get("main/dot").selectAll("circle.dot").data(P, N.keyFn), Z = N.direction === "left" || N.direction === "right" ? "cy" : "cx";
          return U.enter().append("circle").classed("dot", !0).on("click", this.dispatchAs("dotClick")).on("mouseover", this.dispatchAs("dotMouseover")).on("mousemove", this.dispatchAs("dotMousemove")).on("mouseout", this.dispatchAs("dotMouseout")).on("mouseenter", this.dispatchAs("dotMouseenter")).on("mouseleave", this.dispatchAs("dotMouseleave")).style("fill", N.dotColor).attr("r", N.dotRadius).attr(Z, C), U.transition().style("fill", N.dotColor).attr("r", N.dotRadius).attr(Z, C), U.exit().remove(), this;
        } }, { key: "drawLabels", value: function(P, N) {
          function C(Y) {
            switch (U.direction) {
              case "right":
                return "translate(" + Y.x + "," + (Y.y - Y.dy / 2) + ")";
              case "left":
                return "translate(" + (Y.x + Z - Y.w) + "," + (Y.y - Y.dy / 2) + ")";
              case "up":
              case "down":
                return "translate(" + (Y.x - Y.dx / 2) + "," + Y.y + ")";
            }
          }
          var U = this.options(), Z = void 0;
          Z = U.direction === "left" || U.direction === "right" ? Object(x.max)(P, L) : Object(x.max)(P, j);
          var at = new I.a.Renderer({ nodeHeight: Z, layerGap: U.layerGap, direction: U.direction });
          at.layout(P);
          var tt = S.helper.functor(U.labelBgColor), ct = S.helper.functor(U.linkColor), Et = this.layers.get("main/label").selectAll("g.label-g").data(P, U.keyFn ? function(Y) {
            return U.keyFn(Y.data);
          } : void 0), Nt = Et.enter().append("g").classed("label-g", !0).on("click", this.dispatchAs("labelClick")).on("mouseover", this.dispatchAs("labelMouseover")).on("mousemove", this.dispatchAs("labelMousemove")).on("mouseenter", this.dispatchAs("labelMouseenter")).on("mouseleave", this.dispatchAs("labelMouseleave")).on("mouseout", this.dispatchAs("labelMouseout")).attr("transform", C);
          Nt.append("rect").classed("label-bg", !0).attr("rx", 2).attr("ry", 2).attr("width", L).attr("height", j).style("fill", function(Y) {
            return tt(Y.data);
          }), Nt.append("text").classed("label-text", !0).call(this.updateLabelText, N, function(Y) {
            return Y.data;
          });
          var Lt = Et.transition().attr("transform", C);
          Lt.select("rect").attr("width", L).attr("height", j).style("fill", function(Y) {
            return tt(Y.data);
          }), Lt.select("text.label-text").call(this.updateLabelText, N, function(Y) {
            return Y.data;
          }), Et.exit().remove();
          var _t = this.layers.get("main/link").selectAll("path.link").data(P, U.keyFn ? function(Y) {
            return U.keyFn(Y.data);
          } : void 0);
          return _t.enter().append("path").classed("link", !0).attr("d", function(Y) {
            return at.generatePath(Y);
          }).style("stroke", function(Y) {
            return ct(Y.data);
          }).style("fill", "none"), _t.transition().attr("d", function(Y) {
            return at.generatePath(Y);
          }).style("stroke", function(Y) {
            return ct(Y.data);
          }), _t.exit().remove(), this;
        } }, { key: "visualize", value: function() {
          var P = this;
          if (this.hasData() && this.hasNonZeroArea()) {
            var N = this.data() || [], C = this.options();
            this.force = new I.a.Force(C.labella), C.domain ? C.scale.domain(C.domain) : C.scale.domain(Object(x.extent)(N, C.timeFn)).nice(), C.scale.range([0, C.direction === "left" || C.direction === "right" ? this.getInnerHeight() : this.getInnerWidth()]);
            var U = S.helper.extend({}, C.textStyle);
            Object.keys(U).forEach(function(ct) {
              U[ct] = S.helper.functor(U[ct]);
            }), U.fill = U.fill || S.helper.functor(C.labelTextColor);
            var Z = this.layers.get("dummy").append("text").classed("label-text", !0), at = function(ct) {
              return C.scale(C.timeFn(ct));
            }, tt = N.map(function(ct) {
              var Et = Z.call(P.updateLabelText, U, ct).node().getBBox(), Nt = Et.width + C.labelPadding.left + C.labelPadding.right, Lt = Et.height + C.labelPadding.top + C.labelPadding.bottom, _t = new I.a.Node(at(ct), C.direction === "left" || C.direction === "right" ? Lt : Nt, ct);
              return _t.w = Nt, _t.h = Lt, _t;
            });
            return Z.remove(), this.force.options(C.labella).nodes(tt).compute(), this.drawAxes(), this.drawDots(N), this.drawLabels(this.force.nodes(), U), this;
          }
        } }]), k;
      }(S.SvgChart);
      f.default = q;
    }, function(u, f) {
      u.exports = n;
    }, function(u, f) {
      u.exports = r;
    }, function(u, f) {
      u.exports = i;
    }, function(u, f) {
      u.exports = o;
    }, function(u, f) {
      u.exports = a;
    }, function(u, f) {
      u.exports = s;
    }]).default;
  });
})(Us);
var om = Us.exports;
const am = /* @__PURE__ */ ul(om), sm = () => ({
  sheetMaster: null,
  sheetPlace: null,
  sheetEntriesList: null,
  sheetOverview: null,
  sheetsContainerEl: null,
  map: null,
  sheets: [],
  loading: !1,
  init() {
    this.sheetsContainerEl = this.$el.querySelector(".map-sidebar-sheets"), mapboxgl.accessToken = mappingToolObject.accessToken, this.map = new mapboxgl.Map({
      container: this.$el.querySelector("#mapping-tool-map"),
      // container ID
      style: "mapbox://styles/mapbox/dark-v10",
      // style URL
      center: [10, 50],
      // starting position [lng, lat]
      zoom: 3.6
      // starting zoom
      //fitBoundsOptions: { padding: this.calcMapBoundsPadding() }
    }), this.map.jumpTo({
      padding: this.calcMapBoundsPadding()
    }), this.map.on("load", async () => {
      this.map.setFog({});
      const t = await fetch("/wp-json/mapping-tool/v1/getPoints").then((e) => e.json());
      this.map.addSource("points", {
        type: "geojson",
        data: t,
        cluster: !0,
        clusterMaxZoom: 14,
        // Max zoom to cluster points on
        clusterRadius: 50
        // Radius of each cluster when clustering points (defaults to 50)
      }), this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "points",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#0FADEA",
            2,
            "#0FADEA",
            4,
            "#0FADEA"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40
          ]
        }
      }), this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "points",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12
        }
      }), this.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "points",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#0FADEA",
          "circle-radius": 7,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff"
        }
      }), this.map.on("click", "clusters", (e) => {
        const n = this.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"]
        }), r = n[0].properties.cluster_id;
        this.map.getSource("points").getClusterExpansionZoom(
          r,
          (i, o) => {
            i || this.map.easeTo({
              center: n[0].geometry.coordinates,
              zoom: o,
              padding: this.calcMapBoundsPadding()
            });
          }
        );
      }), this.map.on("mouseenter", "clusters", () => {
        this.map.getCanvas().style.cursor = "pointer";
      }), this.map.on("mouseleave", "clusters", () => {
        this.map.getCanvas().style.cursor = "";
      }), this.map.on("mouseenter", "unclustered-point", () => {
        this.map.getCanvas().style.cursor = "pointer";
      }), this.map.on("mouseleave", "unclustered-point", () => {
        this.map.getCanvas().style.cursor = "";
      }), this.map.on("click", "unclustered-point", (e) => {
        this.openPlace(e.features[0].properties.id);
      }), this.fitBounds(t);
    });
  },
  openMaster() {
    this.sheetMaster.show();
  },
  async openList() {
    var e;
    await this.loadEntriesList();
    const t = this.getPrimaryVisibleSheets();
    this.sheetEntriesList.$el.style.minHeight = ((e = t[t.length - 1]) == null ? void 0 : e.$el.clientHeight) + "px", this.sheetEntriesList.show();
  },
  async openOverview(t) {
    var n;
    await Xu(t, this);
    const e = this.getPrimaryVisibleSheets();
    this.sheetOverview.$el.style.minHeight = ((n = e[e.length - 1]) == null ? void 0 : n.$el.clientHeight) + "px", this.sheetOverview.show(async () => {
      await this.updatePoints();
    });
  },
  async openPlace(t) {
    var n;
    this.sheetOverview.close(), this.sheetPlace.visible && (this.sheetPlace.close(), await new Promise((r) => {
      setTimeout(async () => {
        r();
      }, 300);
    })), await this.loadPlace(t);
    const e = this.getPrimaryVisibleSheets();
    this.sheetPlace.$el.style.minHeight = ((n = e[e.length - 1]) == null ? void 0 : n.$el.clientHeight) + "px", this.sheetPlace.show();
  },
  closeCurrent() {
    var e, n;
    const t = this.getPrimaryVisibleSheets();
    (e = t[t.length - 1]) == null || e.close(), (n = t[t.length - 2]) == null || n.increase();
  },
  updateSheets(t = null, e = !1) {
    var r;
    const n = this.getPrimaryVisibleSheets();
    n.length > 0 ? this.sheetsContainerEl.classList.add("has-sheets") : this.sheetsContainerEl.classList.remove("has-sheets"), this.sheets.forEach((i) => {
      n.length > 1 && i !== this.sheets[this.sheets.length - 1] && i.visible === !0 && i.reduce();
    }), (r = n[n.length - 1]) == null || r.increase();
  },
  getPrimaryVisibleSheets() {
    return this.sheets.filter((t) => t.visible === !0 && t.position === 1);
  },
  async changeFilters(t) {
    Gu(t, this), await this.updatePoints();
  },
  async updatePoints() {
    this.loading = !0;
    const e = await (await fetch(
      "/wp-json/mapping-tool/v1/getPoints?" + new URLSearchParams(this.filterData)
    )).json();
    this.map.getSource("points").setData(e), this.loading = !1, this.fitBounds(e);
  },
  async loadEntriesList() {
    this.sheetEntriesList.$refs.entriesList.innerHTML = "";
    const t = Se.raw(this.filterData) ?? {}, e = new URLSearchParams(t);
    this.loading = !0;
    const n = await fetch(
      "/wp-json/mapping-tool/v1/getEntries?" + e
    ).then((r) => r.json());
    this.loading = !1, n.entries.forEach((r) => {
      const i = document.createElement("div");
      i.classList.add("map-list-item"), i.setAttribute("x-on:click", `openOverview(${r.id})`), r.post_type_accent_color && i.style.setProperty("--color-accent", r.post_type_accent_color), i.innerHTML = `
                <div class="map-list-item__type" style="">${r.post_type_name}</div>
                <div class="map-list-item__title">${r.post_title}</div>
            `, this.sheetEntriesList.$refs.entriesList.appendChild(i);
    });
  },
  async loadPlace(t) {
    this.sheetPlace.$refs.entriesList.innerHTML = "";
    const e = Se.raw(this.filterData) ?? {}, n = new URLSearchParams(Object.assign(e, { place_id: t }));
    this.loading = !0;
    const r = await fetch(
      "/wp-json/mapping-tool/v1/getEntries?" + n
    ).then((i) => i.json());
    this.loading = !1, this.sheetPlace.$refs.overviewHeadline.innerHTML = r.place.post_title, r.entries.forEach((i) => {
      const o = document.createElement("div");
      o.classList.add("map-list-item"), o.setAttribute("x-on:click", `openOverview(${i.id})`), i.post_type_accent_color && o.style.setProperty("--color-accent", i.post_type_accent_color), o.innerHTML = `
                <div class="map-list-item__type">${i.post_type_name}</div>
                <div class="map-list-item__title">${i.post_title}</div>
            `, this.sheetPlace.$refs.entriesList.appendChild(o);
    });
  },
  fitBounds(t) {
    const e = new mapboxgl.LngLatBounds();
    t.features.forEach(function(n) {
      e.extend(n.geometry.coordinates);
    }), this.map.fitBounds(e, {
      maxZoom: 7
    });
  },
  calcMapBoundsPadding() {
    return {
      top: 40,
      bottom: 40,
      left: 450 + 40 * 2,
      right: 40
    };
  }
}), um = (t = !1, e = 1) => ({
  visible: !1,
  reduced: !1,
  position: e,
  rootEl: null,
  root: null,
  closeCallback: null,
  timeout: null,
  init() {
    this.root = this, this.rootEl = this.$el, this.sheets.push(this), this.$el.style.setProperty("--sheet-position", e), t && this.show();
  },
  close() {
    var n;
    this.visible = !1, this.rootEl.classList.remove("map-sidebar-sheet--shown"), this.timeout = setTimeout(() => {
      this.rootEl.classList.remove("map-sidebar-sheet--visible");
    }, 300), this.updateSheets(this.root, !0), (n = this.closeCallback) == null || n.call(this), this.closeCallback = null;
  },
  show(n) {
    clearTimeout(this.timeout), this.$el.classList.add("map-sidebar-sheet--visible"), this.$el.offsetWidth, this.$el.classList.add("map-sidebar-sheet--shown"), this.visible = !0, this.updateSheets(), this.closeCallback = n;
  },
  reduce() {
    this.$el.classList.add("map-sidebar-sheet--reduced"), this.reduced = !0;
  },
  increase() {
    this.$el.classList.remove("map-sidebar-sheet--reduced"), this.reduced = !1;
  }
}), cm = () => ({
  sheetMaster: null,
  sheetOverview: null,
  sheetsContainerEl: null,
  map: null,
  sheets: [],
  loading: !1,
  async init() {
    this.sheetsContainerEl = this.$el.querySelector(".map-sidebar-sheets");
    const t = await this.getData(), e = Math.max(Math.min(this.$el.clientHeight, t.length * 44), 200);
    this.chart = new am(this.$refs.timelineScale, {
      direction: "right",
      initialHeight: e,
      labella: {
        maxPos: e - 40,
        algorithm: "overlap"
      },
      labelBgColor: ({ accent_color: n }) => n,
      dotColor: ({ accent_color: n }) => n,
      linkColor: ({ accent_color: n }) => n,
      margin: { left: 70 },
      textFn: function(n) {
        return n.name;
      }
    }).data(t).visualize().resizeToFit().on("labelClick", (n, r) => {
      this.openOverview(n.data.id);
    }), window.addEventListener("DOMContentLoaded", () => {
    });
  },
  updateSheets(t = null, e = !1) {
    var r;
    const n = this.getPrimaryVisibleSheets();
    n.length > 0 ? this.sheetsContainerEl.classList.add("has-sheets") : this.sheetsContainerEl.classList.remove("has-sheets"), this.sheets.forEach((i) => {
      n.length > 1 && i !== this.sheets[this.sheets.length - 1] && i.visible === !0 && i.reduce();
    }), (r = n[n.length - 1]) == null || r.increase();
  },
  getPrimaryVisibleSheets() {
    return this.sheets.filter((t) => t.visible === !0 && t.position === 1);
  },
  async openOverview(t) {
    var n;
    await Xu(t, this);
    const e = this.getPrimaryVisibleSheets();
    this.sheetOverview.$el.style.minHeight = ((n = e[e.length - 1]) == null ? void 0 : n.$el.clientHeight) + "px", this.sheetOverview.show();
  },
  async changeFilters(t) {
    Gu(t, this), this.loading = !0, this.chart.data(await this.getData()), this.loading = !1;
  },
  async getData() {
    const t = await fetch(
      "/wp-json/mapping-tool/v1/getEntries?" + new URLSearchParams(this.filterData)
    ).then((n) => n.json()), e = [];
    for (const n of t.entries)
      n.timeline_date && (e.push({
        time: new Date(n.timeline_date),
        name: n.post_title,
        id: n.id,
        accent_color: n.post_type_accent_color
      }), e.push({
        time: new Date(n.timeline_date),
        name: n.post_title,
        id: n.id,
        accent_color: n.post_type_accent_color
      }), e.push({
        time: new Date(n.timeline_date),
        name: n.post_title,
        id: n.id,
        accent_color: n.post_type_accent_color
      }), e.push({
        time: new Date(n.timeline_date),
        name: n.post_title,
        id: n.id,
        accent_color: n.post_type_accent_color
      }), e.push({
        time: new Date(n.timeline_date),
        name: n.post_title,
        id: n.id,
        accent_color: n.post_type_accent_color
      }));
    return e;
  }
}), Gu = (t, e) => {
  const n = t.currentTarget, r = new FormData(n);
  if (e.filterData = {}, r.get("source")) {
    const o = n.querySelectorAll(`.mapping-tool-filter-term[data-source="${r.get("source")}"]`);
    e.filterData.source = r.get("source"), o.forEach((a) => {
      a.classList.add("visible");
      const s = a.querySelector("input");
      e.filterData[s.getAttribute("name")] = r.getAll(s.getAttribute("name"));
    });
  }
  n.querySelectorAll(`.mapping-tool-filter-term:not([data-source="${r.get("source")}"])`).forEach((o) => {
    o.classList.remove("visible");
  });
}, Xu = async (t, e) => {
  e.sheetOverview.$refs.overviewBody.innerHTML = "", e.loading = !0;
  const n = await fetch(
    "/wp-json/mapping-tool/v1/getPost?post_id=" + t
  ).then((r) => r.json());
  e.loading = !1, n.post.post_type_accent_color ? e.sheetOverview.$el.style.setProperty("--color-accent", n.post.post_type_accent_color) : e.sheetOverview.$el.style.removeProperty("--color-accent"), e.sheetOverview.$refs.overviewSubHeadline.innerHTML = n.post.post_type_name, e.sheetOverview.$refs.overviewHeadline.innerHTML = n.post.post_title, n.post.thumbnail_url && (e.sheetOverview.$refs.overviewBody.innerHTML += `
                <div class="map-sidebar-sheet-section sheet-overview-body__section">
                    <img class="sheet-overview-body__cover" src="${n.post.thumbnail_url}" />
                </div>
            `), e.sheetOverview.$refs.overviewBody.innerHTML += `
            <div class="map-sidebar-sheet-section sheet-overview-body__section">
                ${n.post.content}
            </div>
        `;
  for (const r of n.taxonomies ?? []) {
    const i = [];
    if (r.values.length > 0) {
      for (const o of r.values ?? [])
        i.push(o.name);
      e.sheetOverview.$refs.overviewBody.innerHTML += `
                    <div class="map-sidebar-sheet-section">
                        <div class="map-sidebar-sheet-section__header">
                            <div class="sidebar-sheet-section__headline">
                                ${r.taxonomy.label}
                            </div>
                        </div>
                        <div>
                            ${i.join(", ")}
                        </div>
                    </div>
                `;
    }
  }
  if (e.map) {
    if (n.places) {
      const r = [];
      for (const { properties: i } of n.places.features)
        r.push(i.title);
      e.sheetOverview.$refs.overviewBody.innerHTML += `
                <div class="map-sidebar-sheet-section">
                    <div class="map-sidebar-sheet-section__header">
                        <div class="sidebar-sheet-section__headline">
                            Places
                        </div>
                    </div>
                    <div>
                        ${r.join(", ")}
                    </div>
                </div>
            `;
    }
    e.map.getSource("points").setData(n.places), e.fitBounds(n.places);
  }
};
Se.data("mappingTool", sm);
Se.data("mappingToolSheet", um);
Se.data("mappingToolTimeline", cm);
Se.start();
