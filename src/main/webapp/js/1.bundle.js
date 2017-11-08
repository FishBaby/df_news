webpackJsonp([ 1, 0 ], [ function(t, e, n) {
	"use strict";Object.defineProperty(e, "__esModule", {
		value : !0
	});
	var i = n(1),
		r = n.n(i),
		o = n(4),
		a = function t() {
			var e = this;
			r()(this, t), this.to = function(t) {
				e.nextScene = t, e.currentScene ? e.currentScene.transitionOut() : e.onTransitionOutComplete()
			}, this.update = function(t) {
				e.currentScene && e.currentScene.update(t)
			}, this.onTransitionOutComplete = function() {
				e.currentScene = e.nextScene, e.debug && console.log("travel to :", e.currentScene.name), e.currentScene.transitionIn()
			}, this.resize = function() {
				e.currentScene && e.currentScene.resize && e.currentScene.resize(), e.nextScene && e.nextScene.resize && e.nextScene.resize()
			}, this.debug = !0, this.currentScene = null, this.nextScene = null, o.onUpdate.add(this.update), o.onResize.add(this.resize)
		},
		s = new a;
	t.exports = s, t.exports.SceneTraveler = a
},,,,,, function(t, e, n) {
	"use strict";(function(e) {
		function i(t, e) {
			if ("function" == typeof t) return i("*", t);
			if ("function" == typeof e)
				for (var n = new s(t), r = 1; r < arguments.length; ++r) i.callbacks.push(n.middleware(arguments[r]));
			else
				"string" == typeof t ? i["string" == typeof e ? "redirect" : "show"](t, e) : i.start(t)
		}
		function r(t) {
			if (!t.handled) {
				var e;
				e = x ? y + m.hash.replace("#!", "") : m.pathname + m.search, e === t.canonicalPath || (i.stop(), t.handled = !1, m.href = t.canonicalPath)
			}
		}
		function o(t) {
			return "string" == typeof t && g ? decodeURIComponent(t.replace(/\+/g, " ")) : t
		}
		function a(t, e) {
			"/" === t[0] && 0 !== t.indexOf(y) && (t = y + (x ? "#!" : "") + t);var n = t.indexOf("?");
			if (this.canonicalPath = t, this.path = t.replace(y, "") || "/", x && (this.path = this.path.replace("#!", "") || "/"), this.title = document.title, this.state = e || {}, this.state.path = t, this.querystring = ~n ? o(t.slice(n + 1)) : "", this.pathname = o(~n ? t.slice(0, n) : t), this.params = {}, this.hash = "", !x) {
				if (!~this.path.indexOf("#")) return;
				var i = this.path.split("#");
				this.path = i[0], this.hash = o(i[1]) || "", this.querystring = this.querystring.split("#")[0]
			}
		}
		function s(t, e) {
			e = e || {}, this.path = "*" === t ? "(.*)" : t, this.method = "GET", this.regexp = l(this.path, this.keys = [], e)
		}
		function c(t) {
			if (1 === u(t) && !(t.metaKey || t.ctrlKey || t.shiftKey) && !t.defaultPrevented) {
				for (var n = t.path ? t.path[0] : t.target; n && "A" !== n.nodeName;) n = n.parentNode;
				if (n && "A" === n.nodeName && !n.hasAttribute("download") && "external" !== n.getAttribute("rel")) {
					var r = n.getAttribute("href");
					if ((x || n.pathname !== m.pathname || !n.hash && "#" !== r) && !(r && -1 < r.indexOf("mailto:")) && !n.target && h(n.href)) {
						var o = n.pathname + n.search + (n.hash || "");
						"undefined" != typeof e && o.match(/^\/[a-zA-Z]:\//) && (o = o.replace(/^\/[a-zA-Z]:\//, "/"));
						var a = o;
						0 === o.indexOf(y) && (o = o.substr(y.length)), x && (o = o.replace("#!", "")), y && a === o || (t.preventDefault(), i.show(a))
					}
				}
			}
		}
		function u(t) {
			return t = t || window.event, null === t.which ? t.button : t.which
		}
		function h(t) {
			var e = m.protocol + "//" + m.hostname;
			return m.port && (e += ":" + m.port), t && 0 === t.indexOf(e)
		}
		var l = n(128);
		t.exports = i;
		var d,
			p,
			f = "undefined" != typeof document && document.ontouchstart ? "touchstart" : "click",
			m = "undefined" != typeof window && (window.history.location || window.location),
			v = !0,
			g = !0,
			y = "",
			x = !1;
		i.callbacks = [], i.exits = [], i.current = "", i.len = 0, i.base = function(t) {
			return 0 === arguments.length ? y : void (y = t)
		}, i.start = function(t) {
			if (t = t || {}, !d && (d = !0, !1 === t.dispatch && (v = !1), !1 === t.decodeURLComponents && (g = !1), !1 !== t.popstate && window.addEventListener("popstate", b, !1), !1 !== t.click && document.addEventListener(f, c, !1), !0 === t.hashbang && (x = !0), v)) {
				var e = x && ~m.hash.indexOf("#!") ? m.hash.substr(2) + m.search : m.pathname + m.search + m.hash;
				i.replace(e, null, !0, v)
			}
		}, i.stop = function() {
			d && (i.current = "", i.len = 0, d = !1, document.removeEventListener(f, c, !1), window.removeEventListener("popstate", b, !1))
		}, i.show = function(t, e, n, r) {
			var o = new a(t, e);
			return i.current = o.path, !1 !== n && i.dispatch(o), !1 !== o.handled && !1 !== r && o.pushState(), o
		}, i.back = function(t, e) {
			0 < i.len ? (history.back(), i.len--) : t ? setTimeout((function() {
				i.show(t, e)
			})) : setTimeout((function() {
				i.show(y, e)
			}))
		}, i.redirect = function(t, e) {
			"string" == typeof t && "string" == typeof e && i(t, (function() {
				setTimeout((function() {
					i.replace(e)
				}), 0)
			})), "string" == typeof t && "undefined" == typeof e && setTimeout((function() {
				i.replace(t)
			}), 0)
		}, i.replace = function(t, e, n, r) {
			var o = new a(t, e);
			return i.current = o.path, o.init = n, o.save(), !1 !== r && i.dispatch(o), o
		}, i.dispatch = function(t) {
			function e() {
				var t = i.exits[s++];
				return t ? void t(o, e) : n()
			}
			function n() {
				var e = i.callbacks[a++];
				return t.path === i.current ? e ? void e(t, n) : r(t) : void (t.handled = !1)
			}
			var o = p,
				a = 0,
				s = 0;
			p = t, o ? e() : n()
		}, i.exit = function(t) {
			if ("function" == typeof t) return i.exit("*", t);
			for (var e = new s(t), n = 1; n < arguments.length; ++n) i.exits.push(e.middleware(arguments[n]))
		}, i.Context = a, a.prototype.pushState = function() {
			i.len++, history.pushState(this.state, this.title, x && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
		}, a.prototype.save = function() {
			history.replaceState(this.state, this.title, x && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
		}, i.Route = s, s.prototype.middleware = function(t) {
			var e = this;
			return function(n, i) {
				return e.match(n.path, n.params) ? t(n, i) : void i()
			}
		}, s.prototype.match = function(t, e) {
			var n = this.keys,
				i = t.indexOf("?"),
				r = ~i ? t.slice(0, i) : t,
				a = this.regexp.exec(decodeURIComponent(r));
			if (!a) return !1;
			for (var s = 1, c = a.length; s < c; ++s) {
				var u = n[s - 1],
					h = o(a[s]);
				void 0 === h && hasOwnProperty.call(e, u.name) || (e[u.name] = h)
			}
			return !0
		};
		var b = (function() {
			var t = !1;
			if ("undefined" != typeof window) return "complete" === document.readyState ? t = !0 : window.addEventListener("load", (function() {
						setTimeout((function() {
							t = !0
						}), 0)
					})), function(e) {
						if (t)
							if (e.state) {
								var n = e.state.path;
								i.replace(n, e.state)
							} else i.show(m.pathname + m.hash, void 0, void 0, !1)
			}
		})();
		i.sameOrigin = h
	}).call(e, n(129))
},,,, function(t, e, n) {
	"use strict";(function(i) {
		Object.defineProperty(e, "__esModule", {
			value : !0
		});
		var r = n(38),
			o = n.n(r),
			a = n(60),
			s = n.n(a),
			c = n(1),
			u = n.n(c),
			h = n(25),
			l = n.n(h),
			d = n(24),
			p = n.n(d),
			f = n(6),
			m = n(127);
		n(59);
		var v = n(4),
			g = n(5),
			y = n(109),
			x = n(77);
		n(7);
		var b = n(121),
			_ = n(169),
			w = !0,
			M = null,
			E = !1,
			S = !1,
			T = 394,
			A = !1,
			P = 0,
			L = (function(t) {
				function e(n) {
					u()(this, e);var i = l()(this, t.call(this, "home"));
					return R.call(i), i.goto = n, i.titleEl = document.querySelector("#home .title"), i.titleElStyle = i.titleEl.style, i.menuEl = document.querySelector(".menu"), i.onReady = new g, i
				}
				return p()(e, t), e.prototype.transitionIn = function() {
						if (this.target = {
								x : 0,
								y : 0
							}, this.toLoad = 0, document.querySelector("#home").style.display = "block", this.menuEl.style.display = "", b.init(), w) {
							w = !1;
							for (var t = document.querySelectorAll("#home .preview"), e = s()(t), n = 0; n < e.length; n++) {
								var r = e[n],
									o = r.querySelector(".circle-container"),
									a = o.querySelector(".img-container"),
									c = o.offsetWidth;
								o.style.height = c + "px";var u = c + 6,
									h = r.querySelector("svg");
								if (h) {
									h.setAttribute("width", u), h.setAttribute("height", u);
									var l = h.querySelector("circle");
									l.setAttribute("cx", u / 2), l.setAttribute("cy", u / 2), l.setAttribute("r", u / 2 - 4), l.setAttribute("stroke-dasharray", 2 * (u / 2 * Math.PI)), l.style.strokeDasharray = 2 * (u / 2 * Math.PI), l.style.strokeDashoffset = 2 * (u / 2 * Math.PI)
								}
								"true" == r.dataset.open ? (this.loadImg(a, "/xps" + r.dataset.url + "preview.jpg"), !i.any && (r.parentNode.addEventListener("mouseenter", this.onXPOver), r.parentNode.addEventListener("mouseleave", this.onXPOut))) : this.loadImg(a, "/img/bg_close.png", !1, !1)
							}
							for (var d = document.querySelectorAll("#home .artist"), p = s()(d), f = 0; f < p.length; f++) {
								var r = p[f],
									m = r.offsetWidth,
									o = r.querySelector(".img-container");
								o.style.height = m + "px"
							}
						}
						0 == this.toLoad && this.initMenu(), v.onResize.add(this.onResize), v.onUpdate.add(this.onUpdate)
					}, e.prototype.transitionOut = function() {
						t.prototype.transitionOut.call(this), v.onResize.remove(this.onResize);
						for (var e = this.items, n = Array.isArray(e), i = 0, e = n ? e : o()(e);;) {
							var r;
							if (n) {
								if (i >= e.length) break;
								r = e[i++]
							} else {
								if (i = e.next(), i.done) break;
								r = i.value
							}
							var a = r;
							y.off(a.elMenu, "click", a.onClick), a.el = null, a.elMenu = null, a.boundingBox = null, a.onClick = null
						}
						this.items = null
					}, e
			})(x),
			R = function() {
				var t = this;
				this.dispose = function() {
					b.dispose(), v.onUpdate.remove(t.onUpdate), document.querySelector("#home").style.display = "none"
				}, this.onUpdate = function() {
					var e = document.body.scrollTop || window.scrollY;
					if (P = T - e, t.titleElStyle.opacity = 0 <= P ? P / T : 0, t.target.y += .2 * (10 * -y.mouse.unitY - t.target.y), t.target.x += .05 * (10 * y.mouse.unitX - t.target.x), b && b.star && (b.star.material.uniforms.offsetY.value = .03 * e, b.background.material.uniforms.offsetY.value = 2e-4 * e), t.items) {
						for (var n = null, i = t.items, r = Array.isArray(i), a = 0, i = r ? i : o()(i);;) {
							var s;
							if (r) {
								if (a >= i.length) break;
								s = i[a++]
							} else {
								if (a = i.next(), a.done) break;
								s = a.value
							}
							var c = s;
							c.top <= e + v.height / 2 && (n = c.id)
						}
						t.selectItem(n), 0 >= P && !A ? (A = !0, t.menuEl.classList.add("logoMode")) : 0 < P && A && (A = !1, t.menuEl.classList.remove("logoMode"))
					}
				}, this.onResize = function() {
					0 == t.toLoad && t.initMenu();
					for (var e = document.querySelectorAll("#home .preview"), n = s()(e), i = 0; i < n.length; i++) {
						var r = n[i],
							o = r.querySelector(".circle-container"),
							a = o.offsetWidth;
						o.style.height = a + "px";var c = a + 4,
							u = r.querySelector("svg");
						if (u) {
							u.setAttribute("width", c), u.setAttribute("height", c);
							var h = u.querySelector("circle");
							h.setAttribute("cx", c / 2), h.setAttribute("cy", c / 2), h.setAttribute("r", c / 2 - 4), h.setAttribute("stroke-dasharray", 2 * (c / 2 * Math.PI)), h.style.strokeDasharray = 2 * (c / 2 * Math.PI), h.style.strokeDashoffset = 2 * (c / 2 * Math.PI)
						}
					}
					for (var l = document.querySelectorAll("#home .artist"), d = s()(l), p = 0; p < d.length; p++) {
						var r = d[p],
							f = r.offsetWidth,
							o = r.querySelector(".img-container");
						o.style.height = f + "px"
					}
				}, this.initVideo = function() {
					if (!i.any && !E) {
						E = !0;
						for (var t = document.querySelectorAll("#home .preview"), e = t, n = Array.isArray(e), r = 0, e = n ? e : o()(e);;) {
							var a;
							if (n) {
								if (r >= e.length) break;
								a = e[r++]
							} else {
								if (r = e.next(), r.done) break;
								a = r.value
							}
							var s = a;
							if ("true" == s.dataset.open) {
								var c = document.createElement("video"),
									u = document.createElement("source");
								u.type = "video/mp4", u.src = "/xps" + s.dataset.url + "preview.mp4", c.appendChild(u), c.autoPlay = !0, c.loop = "true", c.preload = "auto", s.querySelector(".circle-container").appendChild(c)
							}
						}
					}
				}, this.loadLineUp = function() {
					if (!S) {
						S = !0;
						for (var e = document.querySelectorAll("#home .artist"), n = s()(e), i = 0; i < n.length; i++) {
							var r = n[i],
								o = r.querySelector(".img-container");
							t.loadImg(o, r.dataset.img)
						}
					}
				}, this.initMenu = function() {
					t.placeBalls(), t.selectedItem = null, t.items = [ {
						id : "title"
					}, {
						id : "experiments"
					}, {
						id : "lineup"
					}, {
						id : "about"
					}, {
						id : "participate"
					} ];
					for (var e = document.body.getBoundingClientRect(), n = function() {
								if (r) {
									if (a >= i.length) return "break";
									s = i[a++]
								} else {
									if (a = i.next(), a.done) return "break";
									s = a.value
								}
								var t = s;
								t.el || (t.el = document.querySelector("#home ." + t.id), t.elMenu = document.querySelector(".menu-" + t.id)), t.boundingBox = t.el.getBoundingClientRect(), t.top = t.boundingBox.top - e.top, t.onClick && y.off(t.elMenu, "click", t.onClick), t.onClick = function() {
									TweenLite.to(window, .8, {
										scrollTo : {
											y : t.top - 100,
											x : 0
										},
										ease : Quad.easeInOut
									})
								}, y.on(t.elMenu, "click", t.onClick)
							}, i = t.items, r = Array.isArray(i), a = 0, i = r ? i : o()(i);;) {
						var s,
							c = n();
						if ("break" === c) break
					}
					t.initVideo(), t.loadLineUp(), t.onReady.dispatch()
				}, this.placeBalls = function() {
					var t = document.querySelectorAll("#home .xp"),
						e = Math.min(1100, document.querySelector("#home .experiments").getBoundingClientRect().width),
						n = Math.floor(.25 * e);
					t[0].style.width = n + "px";
					for (var i = t[0].getBoundingClientRect().height, r = 0, a = 0, s = [ 0, 1, .4, .9, 0, .5, 1, .2, .7 ], c = t, u = Array.isArray(c), h = 0, c = u ? c : o()(c);;) {
						var l;
						if (u) {
							if (h >= c.length) break;
							l = c[h++]
						} else {
							if (h = c.next(), h.done) break;
							l = h.value
						}
						var d = l;
						d.style.width = n + "px", d.style.transform = "translate3d(" + Math.floor((e - n) * s[a % s.length]) + "px," + r + "px,0)", r += .48 * i + 10, a++
					}
					r += 200, document.querySelector("#home .experiments").style.height = r + "px"
				}, this.selectItem = function(e) {
					if (!t.selectedItem || e != t.selectedItem.id) {
						t.selectedItem = null;
						for (var n = t.items, i = Array.isArray(n), r = 0, n = i ? n : o()(n);;) {
							var a;
							if (i) {
								if (r >= n.length) break;
								a = n[r++]
							} else {
								if (r = n.next(), r.done) break;
								a = r.value
							}
							var s = a;
							s.id == e ? (t.selectedItem = s, m(s.elMenu).add("selected")) : m(s.elMenu).remove("selected")
						}
						t.selectedItem && (v.pageActivated = !1, f("/" + t.selectedItem.id), v.pageActivated = !0)
					}
				}, this.loadImg = function(e, n) {
					var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
						r = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3];
					r && t.toLoad++;
					var o = new Image;
					r && (o.onload = function() {
						t.toLoad--, 0 == t.toLoad && t.initMenu()
					}), o.src = n, o.style.opacity = 1, i ? e.insertBefore(o, e.firstChild) : e.appendChild(o)
				}, this.addSnowflake = function(t) {
					var e = new _(256);
					t.insertBefore(e.canvas, t.firstChild)
				}, this.onXPOver = function(t) {
					M = t.target.querySelector("video"), M.currentTime = 0, M.play()
				}, this.onXPOut = function() {
					M.currentTime = 0, M.pause()
				}
			};
		t.exports = L
	}).call(e, n(116))
},,, function(t) {
	var e = t.exports = {
		version : "2.4.0"
	};
	"number" == typeof __e && (__e = e)
}, function(t, e, n) {
	var i = n(43)("wks"),
		r = n(32),
		o = n(15).Symbol,
		a = "function" == typeof o,
		s = t.exports = function(t) {
			return i[t] || (i[t] = a && o[t] || (a ? o : r)("Symbol." + t))
		};
	s.store = i
}, function(t) {
	var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
	"number" == typeof __g && (__g = e)
}, function(t, e, n) {
	var i = n(18),
		r = n(62),
		o = n(46),
		a = Object.defineProperty;
	e.f = n(19) ? Object.defineProperty : function(t, e, n) {
		if (i(t), e = o(e, !0), i(n), r) try {
				return a(t, e, n)
			} catch (t) {}
		if ("get" in n || "set" in n)
			throw TypeError("Accessors not supported!");
		return "value" in n && (t[e] = n.value), t
	}
}, function(t, e, n) {
	"use strict";(function(t) {
		function i() {
		}
		function r(t, e) {
			this.x = t || 0, this.y = e || 0
		}
		function o(t, e, n, i, a, s, c, u, h, l) {
			Object.defineProperty(this, "id", {
				value : Za++
			}), this.uuid = Ya.generateUUID(), this.name = "", this.image = void 0 === t ? o.DEFAULT_IMAGE : t, this.mipmaps = [], this.mapping = void 0 === e ? o.DEFAULT_MAPPING : e, this.wrapS = void 0 === n ? jo : n, this.wrapT = void 0 === i ? jo : i, this.magFilter = void 0 === a ? Zo : a, this.minFilter = void 0 === s ? Ko : s, this.anisotropy = void 0 === h ? 1 : h, this.format = void 0 === c ? pa : c, this.type = void 0 === u ? $o : u, this.offset = new r(0, 0), this.repeat = new r(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.encoding = void 0 === l ? za : l, this.version = 0, this.onUpdate = null
		}
		function a(t, e, n, i) {
			this.x = t || 0, this.y = e || 0, this.z = n || 0, this.w = void 0 === i ? 1 : i
		}
		function s(t, e, n) {
			this.uuid = Ya.generateUUID(), this.width = t, this.height = e, this.scissor = new a(0, 0, t, e), this.scissorTest = !1, this.viewport = new a(0, 0, t, e), n = n || {}, void 0 === n.minFilter && (n.minFilter = Zo), this.texture = new o(void 0, void 0, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding), this.depthBuffer = !(void 0 !== n.depthBuffer) || n.depthBuffer, this.stencilBuffer = !(void 0 !== n.stencilBuffer) || n.stencilBuffer, this.depthTexture = void 0 === n.depthTexture ? null : n.depthTexture
		}
		function c(t, e, n) {
			s.call(this, t, e, n), this.activeCubeFace = 0, this.activeMipMapLevel = 0
		}
		function u(t, e, n, i) {
			this._x = t || 0, this._y = e || 0, this._z = n || 0, this._w = void 0 === i ? 1 : i
		}
		function h(t, e, n) {
			this.x = t || 0, this.y = e || 0, this.z = n || 0
		}
		function l() {
			this.elements = new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]), 0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
		}
		function d(t, e, n, i, r, a, s, c, u, h) {
			t = void 0 === t ? [] : t, e = void 0 === e ? Uo : e, o.call(this, t, e, n, i, r, a, s, c, u, h), this.flipY = !1
		}
		function p() {
			this.seq = [], this.map = {}
		}
		function f(t, e, n) {
			var i = t[0];
			if (0 >= i || 0 < i) return t;
			var r = e * n,
				o = Qa[r];
			if (void 0 === o && (o = new Float32Array(r), Qa[r] = o), 0 !== e) {
				i.toArray(o, 0);
				for (var a = 1, s = 0; a !== e; ++a) s += n, t[a].toArray(o, s)
			}
			return o
		}
		function m(t, e) {
			var n = $a[e];
			void 0 === n && (n = new Int32Array(e), $a[e] = n);
			for (var i = 0; i !== e; ++i) n[i] = t.allocTextureUnit();
			return n
		}
		function v(t, e) {
			t.uniform1f(this.addr, e)
		}
		function g(t, e) {
			t.uniform1i(this.addr, e)
		}
		function y(t, e) {
			void 0 === e.x ? t.uniform2fv(this.addr, e) : t.uniform2f(this.addr, e.x, e.y)
		}
		function x(t, e) {
			void 0 === e.x ? void 0 === e.r ? t.uniform3fv(this.addr, e) : t.uniform3f(this.addr, e.r, e.g, e.b) : t.uniform3f(this.addr, e.x, e.y, e.z)
		}
		function b(t, e) {
			void 0 === e.x ? t.uniform4fv(this.addr, e) : t.uniform4f(this.addr, e.x, e.y, e.z, e.w)
		}
		function _(t, e) {
			t.uniformMatrix2fv(this.addr, !1, e.elements || e)
		}
		function w(t, e) {
			t.uniformMatrix3fv(this.addr, !1, e.elements || e)
		}
		function M(t, e) {
			t.uniformMatrix4fv(this.addr, !1, e.elements || e)
		}
		function E(t, e, n) {
			var i = n.allocTextureUnit();
			t.uniform1i(this.addr, i), n.setTexture2D(e || Ja, i)
		}
		function S(t, e, n) {
			var i = n.allocTextureUnit();
			t.uniform1i(this.addr, i), n.setTextureCube(e || Ka, i)
		}
		function T(t, e) {
			t.uniform2iv(this.addr, e)
		}
		function A(t, e) {
			t.uniform3iv(this.addr, e)
		}
		function P(t, e) {
			t.uniform4iv(this.addr, e)
		}
		function L(t) {
			return 5126 === t ? v : 35664 === t ? y : 35665 === t ? x : 35666 === t ? b : 35674 === t ? _ : 35675 === t ? w : 35676 === t ? M : 35678 === t ? E : 35680 === t ? S : 5124 === t || 35670 === t ? g : 35667 === t || 35671 === t ? T : 35668 === t || 35672 === t ? A : 35669 === t || 35673 === t ? P : void 0
		}
		function R(t, e) {
			t.uniform1fv(this.addr, e)
		}
		function C(t, e) {
			t.uniform1iv(this.addr, e)
		}
		function I(t, e) {
			t.uniform2fv(this.addr, f(e, this.size, 2))
		}
		function O(t, e) {
			t.uniform3fv(this.addr, f(e, this.size, 3))
		}
		function U(t, e) {
			t.uniform4fv(this.addr, f(e, this.size, 4))
		}
		function D(t, e) {
			t.uniformMatrix2fv(this.addr, !1, f(e, this.size, 4))
		}
		function B(t, e) {
			t.uniformMatrix3fv(this.addr, !1, f(e, this.size, 9))
		}
		function N(t, e) {
			t.uniformMatrix4fv(this.addr, !1, f(e, this.size, 16))
		}
		function F(t, e, n) {
			var i = e.length,
				r = m(n, i);
			t.uniform1iv(this.addr, r);
			for (var o = 0; o !== i; ++o) n.setTexture2D(e[o] || Ja, r[o])
		}
		function z(t, e, n) {
			var i = e.length,
				r = m(n, i);
			t.uniform1iv(this.addr, r);
			for (var o = 0; o !== i; ++o) n.setTextureCube(e[o] || Ka, r[o])
		}
		function G(t) {
			return 5126 === t ? R : 35664 === t ? I : 35665 === t ? O : 35666 === t ? U : 35674 === t ? D : 35675 === t ? B : 35676 === t ? N : 35678 === t ? F : 35680 === t ? z : 5124 === t || 35670 === t ? C : 35667 === t || 35671 === t ? T : 35668 === t || 35672 === t ? A : 35669 === t || 35673 === t ? P : void 0
		}
		function k(t, e, n) {
			this.id = t, this.addr = n, this.setValue = L(e.type)
		}
		function H(t, e, n) {
			this.id = t, this.addr = n, this.size = e.size, this.setValue = G(e.type)
		}
		function j(t) {
			this.id = t, p.call(this)
		}
		function V(t, e) {
			t.seq.push(e), t.map[e.id] = e
		}
		function W(t, e, n) {
			var i = t.name,
				r = i.length;
			for (ts.lastIndex = 0;;) {
				var o = ts.exec(i),
					a = ts.lastIndex,
					s = o[1],
					c = "]" === o[2],
					u = o[3];
				if (c && (s |= 0), void 0 === u || "[" === u && a + 2 === r) {
					V(n, void 0 === u ? new k(s, t, e) : new H(s, t, e));break
				}
				var h = n.map,
					l = h[s];
				void 0 === l && (l = new j(s), V(n, l)), n = l
			}
		}
		function X(t, e, n) {
			p.call(this), this.renderer = n;
			for (var i = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), r = 0; r !== i; ++r) {
				var o = t.getActiveUniform(e, r),
					a = o.name,
					s = t.getUniformLocation(e, a);
				W(o, s, this)
			}
		}
		function q(t, e, n) {
			return void 0 === e && void 0 === n ? this.set(t) : this.setRGB(t, e, n)
		}
		function Y(t, e, n, i, r, a, s, c, u, h, l, d) {
			o.call(this, null, a, s, c, u, h, i, r, l, d), this.image = {
				data : t,
				width : e,
				height : n
			}, this.magFilter = void 0 === u ? Xo : u, this.minFilter = void 0 === h ? Xo : h, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
		}
		function Z(t, e) {
			this.min = void 0 === t ? new r(+(1 / 0), +(1 / 0)) : t, this.max = void 0 === e ? new r(-(1 / 0), -(1 / 0)) : e
		}
		function J(t, e) {
			function n() {
				var t = new Float32Array([ -1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1 ]),
					e = new Uint16Array([ 0, 1, 2, 0, 2, 3 ]);
				o = f.createBuffer(), a = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, o), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, a), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), d = f.createTexture(), p = f.createTexture(), m.bindTexture(f.TEXTURE_2D, d), f.texImage2D(f.TEXTURE_2D, 0, f.RGB, 16, 16, 0, f.RGB, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), m.bindTexture(f.TEXTURE_2D, p), f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, 16, 16, 0, f.RGBA, f.UNSIGNED_BYTE, null), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST), f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST), s = {
					vertexShader : [ "uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if ( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}" ].join("\n"),
					fragmentShader : [ "uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if ( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if ( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}" ].join("\n")
				}, c = i(s), u = {
					vertex : f.getAttribLocation(c, "position"),
					uv : f.getAttribLocation(c, "uv")
				}, l = {
					renderType : f.getUniformLocation(c, "renderType"),
					map : f.getUniformLocation(c, "map"),
					occlusionMap : f.getUniformLocation(c, "occlusionMap"),
					opacity : f.getUniformLocation(c, "opacity"),
					color : f.getUniformLocation(c, "color"),
					scale : f.getUniformLocation(c, "scale"),
					rotation : f.getUniformLocation(c, "rotation"),
					screenPosition : f.getUniformLocation(c, "screenPosition")
				}
			}
			function i(e) {
				var n = f.createProgram(),
					i = f.createShader(f.FRAGMENT_SHADER),
					r = f.createShader(f.VERTEX_SHADER),
					o = "precision " + t.getPrecision() + " float;\n";
				return f.shaderSource(i, o + e.fragmentShader), f.shaderSource(r, o + e.vertexShader), f.compileShader(i), f.compileShader(r), f.attachShader(n, i), f.attachShader(n, r), f.linkProgram(n), n
			}
			var o,
				a,
				s,
				c,
				u,
				l,
				d,
				p,
				f = t.context,
				m = t.state;
			this.render = function(i, s, v) {
				if (0 !== e.length) {
					var g = new h,
						y = v.w / v.z,
						x = .5 * v.z,
						b = .5 * v.w,
						_ = 16 / v.w,
						w = new r(_ * y, _),
						M = new h(1, 1, 0),
						E = new r(1, 1),
						S = new Z;
					S.min.set(v.x, v.y), S.max.set(v.x + (v.z - 16), v.y + (v.w - 16)), void 0 === c && n(), f.useProgram(c), m.initAttributes(), m.enableAttribute(u.vertex), m.enableAttribute(u.uv), m.disableUnusedAttributes(), f.uniform1i(l.occlusionMap, 0), f.uniform1i(l.map, 1), f.bindBuffer(f.ARRAY_BUFFER, o), f.vertexAttribPointer(u.vertex, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(u.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, a), m.disable(f.CULL_FACE), m.setDepthWrite(!1);
					for (var T = 0, A = e.length; T < A; T++) {
						_ = 16 / v.w, w.set(_ * y, _);var P = e[T];
						if (g.set(P.matrixWorld.elements[12], P.matrixWorld.elements[13], P.matrixWorld.elements[14]), g.applyMatrix4(s.matrixWorldInverse), g.applyProjection(s.projectionMatrix), M.copy(g), E.x = v.x + M.x * x + x - 8, E.y = v.y + M.y * b + b - 8, !0 === S.containsPoint(E)) {
							m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, null), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, d), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGB, E.x, E.y, 16, 16, 0), f.uniform1i(l.renderType, 0), f.uniform2f(l.scale, w.x, w.y), f.uniform3f(l.screenPosition, M.x, M.y, M.z), m.disable(f.BLEND), m.enable(f.DEPTH_TEST), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), m.activeTexture(f.TEXTURE0), m.bindTexture(f.TEXTURE_2D, p), f.copyTexImage2D(f.TEXTURE_2D, 0, f.RGBA, E.x, E.y, 16, 16, 0), f.uniform1i(l.renderType, 1), m.disable(f.DEPTH_TEST), m.activeTexture(f.TEXTURE1), m.bindTexture(f.TEXTURE_2D, d), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0), P.positionScreen.copy(M), P.customUpdateCallback ? P.customUpdateCallback(P) : P.updateLensFlares(), f.uniform1i(l.renderType, 2), m.enable(f.BLEND);
							for (var L = 0, R = P.lensFlares.length; L < R; L++) {
								var C = P.lensFlares[L];
								.001 < C.opacity && .001 < C.scale && (M.x = C.x, M.y = C.y, M.z = C.z, _ = C.size * C.scale / v.w, w.x = _ * y, w.y = _, f.uniform3f(l.screenPosition, M.x, M.y, M.z), f.uniform2f(l.scale, w.x, w.y), f.uniform1f(l.rotation, C.rotation), f.uniform1f(l.opacity, C.opacity), f.uniform3f(l.color, C.color.r, C.color.g, C.color.b), m.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst), t.setTexture2D(C.texture, 1), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0))
							}
						}
					}
					m.enable(f.CULL_FACE), m.enable(f.DEPTH_TEST), m.setDepthWrite(!0), t.resetGLState()
				}
			}
		}
		function K(t, e) {
			function n() {
				var t = new Float32Array([ -.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1 ]),
					e = new Uint16Array([ 0, 1, 2, 0, 2, 3 ]);
				a = f.createBuffer(), s = f.createBuffer(), f.bindBuffer(f.ARRAY_BUFFER, a), f.bufferData(f.ARRAY_BUFFER, t, f.STATIC_DRAW), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, s), f.bufferData(f.ELEMENT_ARRAY_BUFFER, e, f.STATIC_DRAW), c = i(), l = {
					position : f.getAttribLocation(c, "position"),
					uv : f.getAttribLocation(c, "uv")
				}, d = {
					uvOffset : f.getUniformLocation(c, "uvOffset"),
					uvScale : f.getUniformLocation(c, "uvScale"),
					rotation : f.getUniformLocation(c, "rotation"),
					scale : f.getUniformLocation(c, "scale"),
					color : f.getUniformLocation(c, "color"),
					map : f.getUniformLocation(c, "map"),
					opacity : f.getUniformLocation(c, "opacity"),
					modelViewMatrix : f.getUniformLocation(c, "modelViewMatrix"),
					projectionMatrix : f.getUniformLocation(c, "projectionMatrix"),
					fogType : f.getUniformLocation(c, "fogType"),
					fogDensity : f.getUniformLocation(c, "fogDensity"),
					fogNear : f.getUniformLocation(c, "fogNear"),
					fogFar : f.getUniformLocation(c, "fogFar"),
					fogColor : f.getUniformLocation(c, "fogColor"),
					alphaTest : f.getUniformLocation(c, "alphaTest")
				};var n = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
				n.width = 8, n.height = 8;var r = n.getContext("2d");
				r.fillStyle = "white", r.fillRect(0, 0, 8, 8), p = new o(n), p.needsUpdate = !0
			}
			function i() {
				var e = f.createProgram(),
					n = f.createShader(f.VERTEX_SHADER),
					i = f.createShader(f.FRAGMENT_SHADER);
				return f.shaderSource(n, [ "precision " + t.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}" ].join("\n")), f.shaderSource(i, [ "precision " + t.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}" ].join("\n")), f.compileShader(n), f.compileShader(i), f.attachShader(e, n), f.attachShader(e, i), f.linkProgram(e), e
			}
			function r(t, e) {
				return t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z === e.z ? e.id - t.id : e.z - t.z
			}
			var a,
				s,
				c,
				l,
				d,
				p,
				f = t.context,
				m = t.state,
				v = new h,
				g = new u,
				y = new h;
			this.render = function(i, o) {
				if (0 !== e.length) {
					void 0 === c && n(), f.useProgram(c), m.initAttributes(), m.enableAttribute(l.position), m.enableAttribute(l.uv), m.disableUnusedAttributes(), m.disable(f.CULL_FACE), m.enable(f.BLEND), f.bindBuffer(f.ARRAY_BUFFER, a), f.vertexAttribPointer(l.position, 2, f.FLOAT, !1, 16, 0), f.vertexAttribPointer(l.uv, 2, f.FLOAT, !1, 16, 8), f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, s), f.uniformMatrix4fv(d.projectionMatrix, !1, o.projectionMatrix.elements), m.activeTexture(f.TEXTURE0), f.uniform1i(d.map, 0);
					var u = 0,
						h = 0,
						x = i.fog;
					x ? (f.uniform3f(d.fogColor, x.color.r, x.color.g, x.color.b), x.isFog ? (f.uniform1f(d.fogNear, x.near), f.uniform1f(d.fogFar, x.far), f.uniform1i(d.fogType, 1), u = 1, h = 1) : x.isFogExp2 && (f.uniform1f(d.fogDensity, x.density), f.uniform1i(d.fogType, 2), u = 2, h = 2)) : (f.uniform1i(d.fogType, 0), u = 0, h = 0);
					for (var b = 0, _ = e.length; b < _; b++) {
						var w = e[b];
						w.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse, w.matrixWorld), w.z = -w.modelViewMatrix.elements[14]
					}
					e.sort(r);
					for (var M = [], b = 0, _ = e.length; b < _; b++) {
						var w = e[b],
							E = w.material;
						if (!1 !== E.visible) {
							f.uniform1f(d.alphaTest, E.alphaTest), f.uniformMatrix4fv(d.modelViewMatrix, !1, w.modelViewMatrix.elements), w.matrixWorld.decompose(v, g, y), M[0] = y.x, M[1] = y.y;
							var S = 0;
							i.fog && E.fog && (S = h), u != S && (f.uniform1i(d.fogType, S), u = S), null === E.map ? (f.uniform2f(d.uvOffset, 0, 0), f.uniform2f(d.uvScale, 1, 1)) : (f.uniform2f(d.uvOffset, E.map.offset.x, E.map.offset.y), f.uniform2f(d.uvScale, E.map.repeat.x, E.map.repeat.y)), f.uniform1f(d.opacity, E.opacity), f.uniform3f(d.color, E.color.r, E.color.g, E.color.b), f.uniform1f(d.rotation, E.rotation), f.uniform2fv(d.scale, M), m.setBlending(E.blending, E.blendEquation, E.blendSrc, E.blendDst), m.setDepthTest(E.depthTest), m.setDepthWrite(E.depthWrite), E.map ? t.setTexture2D(E.map, 0) : t.setTexture2D(p, 0), f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0)
						}
					}
					m.enable(f.CULL_FACE), t.resetGLState()
				}
			}
		}
		function Q() {
			Object.defineProperty(this, "id", {
				value : as++
			}), this.uuid = Ya.generateUUID(), this.name = "", this.type = "Material", this.fog = !0, this.lights = !0, this.blending = Yr, this.side = zr, this.shading = jr, this.vertexColors = Vr, this.opacity = 1, this.transparent = !1, this.blendSrc = uo, this.blendDst = ho, this.blendEquation = to, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.depthFunc = bo, this.depthTest = !0, this.depthWrite = !0, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.alphaTest = 0, this.premultipliedAlpha = !1, this.overdraw = 0, this.visible = !0, this._needsUpdate = !0
		}
		function $(t) {
			Q.call(this), this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.extensions = {
				derivatives : !1,
				fragDepth : !1,
				drawBuffers : !1,
				shaderTextureLOD : !1
			}, this.defaultAttributeValues = {
				color : [ 1, 1, 1 ],
				uv : [ 0, 0 ],
				uv2 : [ 0, 0 ]
			}, this.index0AttributeName = void 0, void 0 !== t && (void 0 !== t.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(t))
		}
		function tt(t) {
			Q.call(this), this.type = "MeshDepthMaterial", this.depthPacking = Xa, this.skinning = !1, this.morphTargets = !1, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.setValues(t)
		}
		function et(t, e) {
			this.min = void 0 === t ? new h(+(1 / 0), +(1 / 0), +(1 / 0)) : t, this.max = void 0 === e ? new h(-(1 / 0), -(1 / 0), -(1 / 0)) : e
		}
		function nt(t, e) {
			this.center = void 0 === t ? new h : t, this.radius = void 0 === e ? 0 : e
		}
		function it() {
			this.elements = new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]), 0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
		}
		function rt(t, e) {
			this.normal = void 0 === t ? new h(1, 0, 0) : t, this.constant = void 0 === e ? 0 : e
		}
		function ot(t, e, n, i, r, o) {
			this.planes = [ void 0 === t ? new rt : t, void 0 === e ? new rt : e, void 0 === n ? new rt : n, void 0 === i ? new rt : i, void 0 === r ? new rt : r, void 0 === o ? new rt : o ]
		}
		function at(t, e, n, i) {
			function o(e, n, i, r) {
				var o = e.geometry,
					a = null,
					s = E,
					c = e.customDepthMaterial;
				if (i && (s = S, c = e.customDistanceMaterial), c)
					a = c;else {
					var u = !1;
					n.morphTargets && (o && o.isBufferGeometry ? u = o.morphAttributes && o.morphAttributes.position && 0 < o.morphAttributes.position.length : o && o.isGeometry && (u = o.morphTargets && 0 < o.morphTargets.length));
					var h = e.isSkinnedMesh && n.skinning,
						l = 0;
					u && (l |= _), h && (l |= w), a = s[l]
				}
				if (t.localClippingEnabled && !0 === n.clipShadows && 0 !== n.clippingPlanes.length) {
					var d = a.uuid,
						p = n.uuid,
						f = T[d];
					void 0 === f && (f = {}, T[d] = f);
					var m = f[p];
					void 0 === m && (m = a.clone(), f[p] = m), a = m
				}
				a.visible = n.visible, a.wireframe = n.wireframe;var v = n.side;
				return F.renderSingleSided && v == kr && (v = zr), F.renderReverseSided && (v === zr ? v = Gr : v === Gr && (v = zr)), a.side = v, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, i && void 0 !== a.uniforms.lightPos && a.uniforms.lightPos.value.copy(r), a
			}
			function c(t, e, n) {
				if (!1 !== t.visible) {
					var i = 0 != (t.layers.mask & e.layers.mask);
					if (i && (t.isMesh || t.isLine || t.isPoints) && t.castShadow && (!1 === t.frustumCulled || !0 === p.intersectsObject(t))) {
						var r = t.material;
						!0 === r.visible && (t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), b.push(t))
					}
					for (var o = t.children, a = 0, s = o.length; a < s; a++) c(o[a], e, n)
				}
			}
			var u = t.context,
				d = t.state,
				p = new ot,
				f = new l,
				m = e.shadows,
				v = new r,
				g = new r(i.maxTextureSize, i.maxTextureSize),
				y = new h,
				x = new h,
				b = [],
				_ = 1,
				w = 2,
				M = (_ | w) + 1,
				E = [ ,,,, ],
				S = [ ,,,, ],
				T = {},
				A = [ new h(1, 0, 0), new h(-1, 0, 0), new h(0, 0, 1), new h(0, 0, -1), new h(0, 1, 0), new h(0, -1, 0) ],
				P = [ new h(0, 1, 0), new h(0, 1, 0), new h(0, 1, 0), new h(0, 1, 0), new h(0, 0, 1), new h(0, 0, -1) ],
				L = [ new a, new a, new a, new a, new a, new a ],
				R = new tt;
			R.depthPacking = qa, R.clipping = !0;
			for (var C = os.distanceRGBA, I = es.clone(C.uniforms), O = 0; O !== M; ++O) {
				var U = 0 != (O & _),
					D = 0 != (O & w),
					B = R.clone();
				B.morphTargets = U, B.skinning = D, E[O] = B;var N = new $({
					defines : {
						USE_SHADOWMAP : ""
					},
					uniforms : I,
					vertexShader : C.vertexShader,
					fragmentShader : C.fragmentShader,
					morphTargets : U,
					skinning : D,
					clipping : !0
				});
				S[O] = N
			}
			var F = this;
			this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Nr, this.renderReverseSided = !0, this.renderSingleSided = !0, this.render = function(e, i) {
				if (!1 !== F.enabled && (!1 !== F.autoUpdate || !1 !== F.needsUpdate) && 0 !== m.length) {
					d.buffers.color.setClear(1, 1, 1, 1), d.disable(u.BLEND), d.setDepthTest(!0), d.setScissorTest(!1);
					for (var r, a, h = 0, l = m.length; h < l; h++) {
						var _ = m[h],
							w = _.shadow;
						if (void 0 !== w) {
							var M = w.camera;
							if (v.copy(w.mapSize), v.min(g), _ && _.isPointLight) {
								r = 6, a = !0;
								var E = v.x,
									S = v.y;
								L[0].set(2 * E, S, E, S), L[1].set(0, S, E, S), L[2].set(3 * E, S, E, S), L[3].set(E, S, E, S), L[4].set(3 * E, 0, E, S), L[5].set(E, 0, E, S), v.x *= 4, v.y *= 2
							} else r = 1, a = !1;
							null === w.map && (w.map = new s(v.x, v.y, {
								minFilter : Xo,
								magFilter : Xo,
								format : pa
							}), M.updateProjectionMatrix()), w.isSpotLightShadow && w.update(_), w && w.isRectAreaLightShadow && w.update(_);
							var T = w.map,
								R = w.matrix;
							x.setFromMatrixPosition(_.matrixWorld), M.position.copy(x), t.setRenderTarget(T), t.clear();
							for (var C = 0; C < r; C++) {
								if (a) {
									y.copy(M.position), y.add(A[C]), M.up.copy(P[C]), M.lookAt(y);
									var I = L[C];
									d.viewport(I)
								} else y.setFromMatrixPosition(_.target.matrixWorld), M.lookAt(y);
								M.updateMatrixWorld(), M.matrixWorldInverse.getInverse(M.matrixWorld), R.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), R.multiply(M.projectionMatrix), R.multiply(M.matrixWorldInverse), f.multiplyMatrices(M.projectionMatrix, M.matrixWorldInverse), p.setFromMatrix(f), b.length = 0, c(e, i, M);
								for (var O = 0, U = b.length; O < U; O++) {
									var D = b[O],
										B = n.update(D),
										N = D.material;
									if (N && N.isMultiMaterial)
										for (var z = B.groups, G = N.materials, k = 0, H = z.length; k < H; k++) {
											var j = z[k],
												V = G[j.materialIndex];
											if (!0 === V.visible) {
												var W = o(D, V, a, x);
												t.renderBufferDirect(M, null, B, W, D, j)
											}
									}else {
										var W = o(D, N, a, x);
										t.renderBufferDirect(M, null, B, W, D, null)
									}
								}
							}
						} else console.warn("THREE.WebGLShadowMap:", _, "has no shadow.")
					}
					var X = t.getClearColor(),
						q = t.getClearAlpha();
					t.setClearColor(X, q), F.needsUpdate = !1
				}
			}
		}
		function st(t, e) {
			this.origin = void 0 === t ? new h : t, this.direction = void 0 === e ? new h : e
		}
		function ct(t, e, n, i) {
			this._x = t || 0, this._y = e || 0, this._z = n || 0, this._order = i || ct.DefaultOrder
		}
		function ut() {
			this.mask = 1
		}
		function ht() {
			Object.defineProperty(this, "id", {
				value : ss++
			}), this.uuid = Ya.generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ht.DefaultUp.clone();var t = new h,
				e = new ct,
				n = new u,
				i = new h(1, 1, 1);
			e.onChange((function() {
				n.setFromEuler(e, !1)
			})), n.onChange((function() {
				e.setFromQuaternion(n, void 0, !1)
			})), Object.defineProperties(this, {
				position : {
					enumerable : !0,
					value : t
				},
				rotation : {
					enumerable : !0,
					value : e
				},
				quaternion : {
					enumerable : !0,
					value : n
				},
				scale : {
					enumerable : !0,
					value : i
				},
				modelViewMatrix : {
					value : new l
				},
				normalMatrix : {
					value : new it
				}
			}), this.matrix = new l, this.matrixWorld = new l, this.matrixAutoUpdate = ht.DefaultMatrixAutoUpdate, this.matrixWorldNeedsUpdate = !1, this.layers = new ut, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.userData = {}, this.onBeforeRender = function() {}, this.onAfterRender = function() {}
		}
		function lt(t, e) {
			this.start = void 0 === t ? new h : t, this.end = void 0 === e ? new h : e
		}
		function dt(t, e, n) {
			this.a = void 0 === t ? new h : t, this.b = void 0 === e ? new h : e, this.c = void 0 === n ? new h : n
		}
		function pt(t, e, n, i, r, o) {
			this.a = t, this.b = e, this.c = n, this.normal = i && i.isVector3 ? i : new h, this.vertexNormals = Array.isArray(i) ? i : [], this.color = r && r.isColor ? r : new q, this.vertexColors = Array.isArray(r) ? r : [], this.materialIndex = void 0 === o ? 0 : o
		}
		function ft(t) {
			Q.call(this), this.type = "MeshBasicMaterial", this.color = new q(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = So, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.lights = !1, this.setValues(t)
		}
		function mt(t, e, n) {
			if (Array.isArray(t))
				throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
			this.uuid = Ya.generateUUID(), this.array = t, this.itemSize = e, this.count = void 0 === t ? 0 : t.length / e, this.normalized = !0 === n, this.dynamic = !1, this.updateRange = {
				offset : 0,
				count : -1
			}, this.onUploadCallback = function() {}, this.version = 0
		}
		function vt(t, e) {
			mt.call(this, new Int8Array(t), e)
		}
		function gt(t, e) {
			mt.call(this, new Uint8Array(t), e)
		}
		function yt(t, e) {
			mt.call(this, new Uint8ClampedArray(t), e)
		}
		function xt(t, e) {
			mt.call(this, new Int16Array(t), e)
		}
		function bt(t, e) {
			mt.call(this, new Uint16Array(t), e)
		}
		function _t(t, e) {
			mt.call(this, new Int32Array(t), e)
		}
		function wt(t, e) {
			mt.call(this, new Uint32Array(t), e)
		}
		function Mt(t, e) {
			mt.call(this, new Float32Array(t), e)
		}
		function Et(t, e) {
			mt.call(this, new Float64Array(t), e)
		}
		function St() {
			this.indices = [], this.vertices = [], this.normals = [], this.colors = [], this.uvs = [], this.uvs2 = [], this.groups = [], this.morphTargets = {}, this.skinWeights = [], this.skinIndices = [], this.boundingBox = null, this.boundingSphere = null, this.verticesNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.uvsNeedUpdate = !1, this.groupsNeedUpdate = !1
		}
		function Tt() {
			Object.defineProperty(this, "id", {
				value : At()
			}), this.uuid = Ya.generateUUID(), this.name = "", this.type = "Geometry", this.vertices = [], this.colors = [], this.faces = [], this.faceVertexUvs = [ [] ], this.morphTargets = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, this.elementsNeedUpdate = !1, this.verticesNeedUpdate = !1, this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.groupsNeedUpdate = !1
		}
		function At() {
			return cs++
		}
		function Pt() {
			Object.defineProperty(this, "id", {
				value : At()
			}), this.uuid = Ya.generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
				start : 0,
				count : 1 / 0
			}
		}
		function Lt(t, e) {
			ht.call(this), this.type = "Mesh", this.geometry = void 0 === t ? new Pt : t, this.material = void 0 === e ? new ft({
				color : 16777215 * Math.random()
			}) : e, this.drawMode = Ba, this.updateMorphTargets()
		}
		function Rt(t, e, n, i, r, o) {
			function a(t, e, n, i, r, o, a, c, u, b, _) {
				for (var w = u + 1, M = 0, E = 0, S = new h, T = 0; T < b + 1; T++)
					for (var A = T * (a / b) - a / 2, P = 0; P < w; P++) {
						var L = P * (o / u) - o / 2;
						S[t] = L * i, S[e] = A * r, S[n] = c / 2, d[m] = S.x, d[m + 1] = S.y, d[m + 2] = S.z, S[t] = 0, S[e] = 0, S[n] = 0 < c ? 1 : -1, p[m] = S.x, p[m + 1] = S.y, p[m + 2] = S.z, f[v] = P / u, f[v + 1] = 1 - T / b, m += 3, v += 2, M += 1
				}
				for (T = 0; T < b; T++)
					for (P = 0; P < u; P++) {
						var R = y + P + w * T,
							C = y + P + w * (T + 1),
							I = y + (P + 1) + w * (T + 1),
							O = y + (P + 1) + w * T;
						l[g] = R, l[g + 1] = C, l[g + 2] = O, l[g + 3] = C, l[g + 4] = I, l[g + 5] = O, g += 6, E += 6
				}
				s.addGroup(x, E, _), x += E, y += M
			}
			Pt.call(this), this.type = "BoxBufferGeometry", this.parameters = {
				width : t,
				height : e,
				depth : n,
				widthSegments : i,
				heightSegments : r,
				depthSegments : o
			};var s = this;
			i = Math.floor(i) || 1, r = Math.floor(r) || 1, o = Math.floor(o) || 1;var c = (function(t, e, n) {
					var i = 0;
					return i += 2 * ((t + 1) * (e + 1)), i += 2 * ((t + 1) * (n + 1)), i += 2 * ((n + 1) * (e + 1))
				})(i, r, o),
				u = (function(t, e, n) {
					var i = 0;
					return i += 2 * (t * e), i += 2 * (t * n), i += 2 * (n * e), 6 * i
				})(i, r, o),
				l = new (65535 < u ? Uint32Array : Uint16Array)(u),
				d = new Float32Array(3 * c),
				p = new Float32Array(3 * c),
				f = new Float32Array(2 * c),
				m = 0,
				v = 0,
				g = 0,
				y = 0,
				x = 0;
			a("z", "y", "x", -1, -1, n, e, t, o, r, 0), a("z", "y", "x", 1, -1, n, e, -t, o, r, 1), a("x", "z", "y", 1, 1, t, n, e, i, o, 2), a("x", "z", "y", 1, -1, t, n, -e, i, o, 3), a("x", "y", "z", 1, -1, t, e, n, i, r, 4), a("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(new mt(l, 1)), this.addAttribute("position", new mt(d, 3)), this.addAttribute("normal", new mt(p, 3)), this.addAttribute("uv", new mt(f, 2))
		}
		function Ct(t, e, n, i) {
			Pt.call(this), this.type = "PlaneBufferGeometry", this.parameters = {
				width : t,
				height : e,
				widthSegments : n,
				heightSegments : i
			};
			for (var r = Math.floor(n) || 1, o = Math.floor(i) || 1, a = r + 1, s = o + 1, c = new Float32Array(3 * (a * s)), u = new Float32Array(3 * (a * s)), h = new Float32Array(2 * (a * s)), l = 0, d = 0, p = 0; p < s; p++)
				for (var f = p * (e / o) - e / 2, m = 0; m < a; m++) {
					var v = m * (t / r) - t / 2;
					c[l] = v, c[l + 1] = -f, u[l + 2] = 1, h[d] = m / r, h[d + 1] = 1 - p / o, l += 3, d += 2
			}
			l = 0;
			for (var g = new (65535 < c.length / 3 ? Uint32Array : Uint16Array)(6 * (r * o)), p = 0; p < o; p++)
				for (var m = 0; m < r; m++) {
					var y = m + a * p,
						x = m + a * (p + 1),
						b = m + 1 + a * (p + 1),
						_ = m + 1 + a * p;
					g[l] = y, g[l + 1] = x, g[l + 2] = _, g[l + 3] = x, g[l + 4] = b, g[l + 5] = _, l += 6
			}
			this.setIndex(new mt(g, 1)), this.addAttribute("position", new mt(c, 3)), this.addAttribute("normal", new mt(u, 3)), this.addAttribute("uv", new mt(h, 2))
		}
		function It() {
			ht.call(this), this.type = "Camera", this.matrixWorldInverse = new l, this.projectionMatrix = new l
		}
		function Ot(t, e, n, i) {
			It.call(this), this.type = "PerspectiveCamera", this.fov = void 0 === t ? 50 : t, this.zoom = 1, this.near = void 0 === n ? .1 : n, this.far = void 0 === i ? 2e3 : i, this.focus = 10, this.aspect = void 0 === e ? 1 : e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
		}
		function Ut(t, e, n, i, r, o) {
			It.call(this), this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = i, this.near = void 0 === r ? .1 : r, this.far = void 0 === o ? 2e3 : o, this.updateProjectionMatrix()
		}
		function Dt(t, e, n) {
			var i,
				r,
				o;
			return {
				setMode : function(t) {
					i = t
				},
				setIndex : function(n) {
					n.array instanceof Uint32Array && e.get("OES_element_index_uint") ? (r = t.UNSIGNED_INT, o = 4) : n.array instanceof Uint16Array ? (r = t.UNSIGNED_SHORT, o = 2) : (r = t.UNSIGNED_BYTE, o = 1)
				},
				render : function(e, a) {
					t.drawElements(i, a, r, e * o), n.calls++, n.vertices += a, i === t.TRIANGLES && (n.faces += a / 3)
				},
				renderInstances : function(a, s, c) {
					var u = e.get("ANGLE_instanced_arrays");
					return null === u ? void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") : (u.drawElementsInstancedANGLE(i, c, r, s * o, a.maxInstancedCount), n.calls++, n.vertices += c * a.maxInstancedCount, void (i === t.TRIANGLES && (n.faces += a.maxInstancedCount * c / 3)))
				}
			}
		}
		function Bt(t, e, n) {
			var i;
			return {
				setMode : function(t) {
					i = t
				},
				render : function(e, r) {
					t.drawArrays(i, e, r), n.calls++, n.vertices += r, i === t.TRIANGLES && (n.faces += r / 3)
				},
				renderInstances : function(r) {
					var o = e.get("ANGLE_instanced_arrays");
					if (null === o) return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
					var a = r.attributes.position,
						s = 0;
					a.isInterleavedBufferAttribute ? (s = a.data.count, o.drawArraysInstancedANGLE(i, 0, s, r.maxInstancedCount)) : (s = a.count, o.drawArraysInstancedANGLE(i, 0, s, r.maxInstancedCount)), n.calls++, n.vertices += s * r.maxInstancedCount, i === t.TRIANGLES && (n.faces += r.maxInstancedCount * s / 3)
				}
			}
		}
		function Nt() {
			var t = {};
			return {
				get : function(e) {
					if (void 0 !== t[e.id]) return t[e.id];
					var n;
					switch (e.type) {
					case "DirectionalLight":
						n = {
							direction : new h,
							color : new q,
							shadow : !1,
							shadowBias : 0,
							shadowRadius : 1,
							shadowMapSize : new r
						};
						break;case "SpotLight":
						n = {
							position : new h,
							direction : new h,
							color : new q,
							distance : 0,
							coneCos : 0,
							penumbraCos : 0,
							decay : 0,
							shadow : !1,
							shadowBias : 0,
							shadowRadius : 1,
							shadowMapSize : new r
						};
						break;case "PointLight":
						n = {
							position : new h,
							color : new q,
							distance : 0,
							decay : 0,
							shadow : !1,
							shadowBias : 0,
							shadowRadius : 1,
							shadowMapSize : new r
						};
						break;case "HemisphereLight":
						n = {
							direction : new h,
							skyColor : new q,
							groundColor : new q
						};
						break;case "RectAreaLight":
						n = {
							color : new q,
							position : new h,
							halfWidth : new h,
							halfHeight : new h
						}
					}
					return t[e.id] = n, n
				}
			}
		}
		function Ft(t) {
			for (var e = t.split("\n"), n = 0; n < e.length; n++) e[n] = n + 1 + ": " + e[n];
			return e.join("\n")
		}
		function zt(t, e, n) {
			var i = t.createShader(e);
			return t.shaderSource(i, n), t.compileShader(i), !1 === t.getShaderParameter(i, t.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile."), "" !== t.getShaderInfoLog(i) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", e === t.VERTEX_SHADER ? "vertex" : "fragment", t.getShaderInfoLog(i), Ft(n)), i
		}
		function Gt(t) {
			switch (t) {
			case za:
				return [ "Linear", "( value )" ];case Ga:
				return [ "sRGB", "( value )" ];case Ha:
				return [ "RGBE", "( value )" ];case ja:
				return [ "RGBM", "( value, 7.0 )" ];case Va:
				return [ "RGBM", "( value, 16.0 )" ];case Wa:
				return [ "RGBD", "( value, 256.0 )" ];case ka:
				return [ "Gamma", "( value, float( GAMMA_FACTOR ) )" ];default:
				throw new Error("unsupported encoding: " + t)
			}
		}
		function kt(t, e) {
			var n = Gt(e);
			return "vec4 " + t + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }"
		}
		function Ht(t, e) {
			var n = Gt(e);
			return "vec4 " + t + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }"
		}
		function jt(t, e) {
			var n;
			switch (e) {
			case Lo:
				n = "Linear";
				break;case Ro:
				n = "Reinhard";
				break;case Co:
				n = "Uncharted2";
				break;case Io:
				n = "OptimizedCineon";
				break;default:
				throw new Error("unsupported toneMapping: " + e)
			}
			return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
		}
		function Vt(t, e, n) {
			t = t || {};var i = [ t.derivatives || e.envMapCubeUV || e.bumpMap || e.normalMap || e.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (t.fragDepth || e.logarithmicDepthBuffer) && n.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", t.drawBuffers && n.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (t.shaderTextureLOD || e.envMap) && n.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : "" ];
			return i.filter(qt).join("\n")
		}
		function Wt(t) {
			var e = [];
			for (var n in t) {
				var i = t[n];
				!1 === i || e.push("#define " + n + " " + i)
			}
			return e.join("\n")
		}
		function Xt(t, e) {
			for (var n = {}, i = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), r = 0; r < i; r++) {
				var o = t.getActiveAttrib(e, r),
					a = o.name;
				n[a] = t.getAttribLocation(e, a)
			}
			return n
		}
		function qt(t) {
			return "" !== t
		}
		function Yt(t, e) {
			return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights)
		}
		function Zt(t) {
			var e = /#include +<([\w\d.]+)>/g;
			return t.replace(e, (function(t, e) {
				var n = ns[e];
				if (void 0 === n)
					throw new Error("Can not resolve #include <" + e + ">");
				return Zt(n)
			}))
		}
		function Jt(t) {
			var e = /for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;
			return t.replace(e, (function(t, e, n, i) {
				for (var r = "", o = parseInt(e); o < parseInt(n); o++) r += i.replace(/\[ i \]/g, "[ " + o + " ]");
				return r
			}))
		}
		function Kt(t, e, n, i) {
			var r = t.context,
				o = n.extensions,
				a = n.defines,
				s = n.__webglShader.vertexShader,
				c = n.__webglShader.fragmentShader,
				u = "SHADOWMAP_TYPE_BASIC";
			i.shadowMapType === Nr ? u = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Fr && (u = "SHADOWMAP_TYPE_PCF_SOFT");var h = "ENVMAP_TYPE_CUBE",
				l = "ENVMAP_MODE_REFLECTION",
				d = "ENVMAP_BLENDING_MULTIPLY";
			if (i.envMap) {
				switch (n.envMap.mapping) {
				case Uo:
				case Do:
					h = "ENVMAP_TYPE_CUBE";
					break;case zo:
				case Go:
					h = "ENVMAP_TYPE_CUBE_UV";
					break;case Bo:
				case No:
					h = "ENVMAP_TYPE_EQUIREC";
					break;case Fo:
					h = "ENVMAP_TYPE_SPHERE"
				}
				switch (n.envMap.mapping) {
				case Do:
				case No:
					l = "ENVMAP_MODE_REFRACTION"
				}
				switch (n.combine) {
				case So:
					d = "ENVMAP_BLENDING_MULTIPLY";
					break;case To:
					d = "ENVMAP_BLENDING_MIX";
					break;case Ao:
					d = "ENVMAP_BLENDING_ADD"
				}
			}
			var p,
				f,
				m = 0 < t.gammaFactor ? t.gammaFactor : 1,
				v = Vt(o, i, t.extensions),
				g = Wt(a),
				y = r.createProgram();
			n.isRawShaderMaterial ? (p = [ g, "\n" ].filter(qt).join("\n"), f = [ v, g, "\n" ].filter(qt).join("\n")) : (p = [ "precision " + i.precision + " float;", "precision " + i.precision + " int;", "#define SHADER_NAME " + n.__webglShader.name, g, i.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + m, "#define MAX_BONES " + i.maxBones, i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + l : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.displacementMap && i.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.useVertexTexture ? "#define BONE_TEXTURE" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && !1 === i.flatShading ? "#define USE_MORPHNORMALS" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + i.numClippingPlanes, i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + u : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n" ].filter(qt).join("\n"), f = [ v, "precision " + i.precision + " float;", "precision " + i.precision + " int;", "#define SHADER_NAME " + n.__webglShader.name, g, i.alphaTest ? "#define ALPHATEST " + i.alphaTest : "", "#define GAMMA_FACTOR " + m, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + h : "", i.envMap ? "#define " + l : "", i.envMap ? "#define " + d : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.vertexColors ? "#define USE_COLOR" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + i.numClippingPlanes, "#define UNION_CLIPPING_PLANES " + (i.numClippingPlanes - i.numClipIntersection), i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + u : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && t.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", i.envMap && t.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", i.toneMapping === Po ? "" : "#define TONE_MAPPING", i.toneMapping === Po ? "" : ns.tonemapping_pars_fragment, i.toneMapping === Po ? "" : jt("toneMapping", i.toneMapping), i.outputEncoding || i.mapEncoding || i.envMapEncoding || i.emissiveMapEncoding ? ns.encodings_pars_fragment : "", i.mapEncoding ? kt("mapTexelToLinear", i.mapEncoding) : "", i.envMapEncoding ? kt("envMapTexelToLinear", i.envMapEncoding) : "", i.emissiveMapEncoding ? kt("emissiveMapTexelToLinear", i.emissiveMapEncoding) : "", i.outputEncoding ? Ht("linearToOutputTexel", i.outputEncoding) : "", i.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n" ].filter(qt).join("\n")), s = Zt(s, i), s = Yt(s, i), c = Zt(c, i), c = Yt(c, i), n.isShaderMaterial || (s = Jt(s), c = Jt(c));var x = p + s,
				b = f + c,
				_ = zt(r, r.VERTEX_SHADER, x),
				w = zt(r, r.FRAGMENT_SHADER, b);
			r.attachShader(y, _), r.attachShader(y, w), void 0 === n.index0AttributeName ? !0 === i.morphTargets && r.bindAttribLocation(y, 0, "position") : r.bindAttribLocation(y, 0, n.index0AttributeName), r.linkProgram(y);var M = r.getProgramInfoLog(y),
				E = r.getShaderInfoLog(_),
				S = r.getShaderInfoLog(w),
				T = !0,
				A = !0;
			!1 === r.getProgramParameter(y, r.LINK_STATUS) ? (T = !1, console.error("THREE.WebGLProgram: shader error: ", r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(y, r.VALIDATE_STATUS), "gl.getProgramInfoLog", M, E, S)) : "" === M ? ("" === E || "" === S) && (A = !1) : console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", M), A && (this.diagnostics = {
				runnable : T,
				material : n,
				programLog : M,
				vertexShader : {
					log : E,
					prefix : p
				},
				fragmentShader : {
					log : S,
					prefix : f
				}
			}), r.deleteShader(_), r.deleteShader(w);var P;
			this.getUniforms = function() {
				return void 0 == P && (P = new X(r, y, t)), P
			};var L;
			return this.getAttributes = function() {
					return void 0 == L && (L = Xt(r, y)), L
				}, this.destroy = function() {
					r.deleteProgram(y), this.program = void 0
				}, Object.defineProperties(this, {
					uniforms : {
						get : function() {
							return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."), this.getUniforms()
						}
					},
					attributes : {
						get : function() {
							return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."), this.getAttributes()
						}
					}
				}), this.id = us++, this.code = e, this.usedTimes = 1, this.program = y, this.vertexShader = _, this.fragmentShader = w, this
		}
		function Qt(t, e) {
			function n(t) {
				if (e.floatVertexTextures && t && t.skeleton && t.skeleton.useVertexTexture) return 1024;
				var n = e.maxVertexUniforms,
					i = Math.floor((n - 20) / 4),
					r = i;
				return void 0 !== t && t && t.isSkinnedMesh && (r = Math.min(t.skeleton.bones.length, r), r < t.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + t.skeleton.bones.length + ", this GPU supports just " + r + " (try OpenGL instead of ANGLE)")), r
			}
			function i(t, e) {
				var n;
				return t ? t.isTexture ? n = t.encoding : t.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), n = t.texture.encoding) : n = za, n === za && e && (n = ka), n
			}
			var r = [],
				o = {
					MeshDepthMaterial : "depth",
					MeshNormalMaterial : "normal",
					MeshBasicMaterial : "basic",
					MeshLambertMaterial : "lambert",
					MeshPhongMaterial : "phong",
					MeshToonMaterial : "phong",
					MeshStandardMaterial : "physical",
					MeshPhysicalMaterial : "physical",
					LineBasicMaterial : "basic",
					LineDashedMaterial : "dashed",
					PointsMaterial : "points"
				},
				a = [ "precision", "supportsVertexTextures", "map", "mapEncoding", "envMap", "envMapMode", "envMapEncoding", "lightMap", "aoMap", "emissiveMap", "emissiveMapEncoding", "bumpMap", "normalMap", "displacementMap", "specularMap", "roughnessMap", "metalnessMap", "gradientMap", "alphaMap", "combine", "vertexColors", "fog", "useFog", "fogExp", "flatShading", "sizeAttenuation", "logarithmicDepthBuffer", "skinning", "maxBones", "useVertexTexture", "morphTargets", "morphNormals", "maxMorphTargets", "maxMorphNormals", "premultipliedAlpha", "numDirLights", "numPointLights", "numSpotLights", "numHemiLights", "numRectAreaLights", "shadowMapEnabled", "shadowMapType", "toneMapping", "physicallyCorrectLights", "alphaTest", "doubleSided", "flipSided", "numClippingPlanes", "numClipIntersection", "depthPacking" ];
			this.getParameters = function(r, a, s, c, u, h) {
				var l = o[r.type],
					d = n(h),
					p = t.getPrecision();
				null !== r.precision && (p = e.getMaxPrecision(r.precision), p !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", p, "instead."));
				var f = t.getCurrentRenderTarget(),
					m = {
						shaderID : l,
						precision : p,
						supportsVertexTextures : e.vertexTextures,
						outputEncoding : i(f ? f.texture : null, t.gammaOutput),
						map : !!r.map,
						mapEncoding : i(r.map, t.gammaInput),
						envMap : !!r.envMap,
						envMapMode : r.envMap && r.envMap.mapping,
						envMapEncoding : i(r.envMap, t.gammaInput),
						envMapCubeUV : !!r.envMap && (r.envMap.mapping === zo || r.envMap.mapping === Go),
						lightMap : !!r.lightMap,
						aoMap : !!r.aoMap,
						emissiveMap : !!r.emissiveMap,
						emissiveMapEncoding : i(r.emissiveMap, t.gammaInput),
						bumpMap : !!r.bumpMap,
						normalMap : !!r.normalMap,
						displacementMap : !!r.displacementMap,
						roughnessMap : !!r.roughnessMap,
						metalnessMap : !!r.metalnessMap,
						specularMap : !!r.specularMap,
						alphaMap : !!r.alphaMap,
						gradientMap : !!r.gradientMap,
						combine : r.combine,
						vertexColors : r.vertexColors,
						fog : !!s,
						useFog : r.fog,
						fogExp : s && s.isFogExp2,
						flatShading : r.shading === Hr,
						sizeAttenuation : r.sizeAttenuation,
						logarithmicDepthBuffer : e.logarithmicDepthBuffer,
						skinning : r.skinning,
						maxBones : d,
						useVertexTexture : e.floatVertexTextures && h && h.skeleton && h.skeleton.useVertexTexture,
						morphTargets : r.morphTargets,
						morphNormals : r.morphNormals,
						maxMorphTargets : t.maxMorphTargets,
						maxMorphNormals : t.maxMorphNormals,
						numDirLights : a.directional.length,
						numPointLights : a.point.length,
						numSpotLights : a.spot.length,
						numRectAreaLights : a.rectArea.length,
						numHemiLights : a.hemi.length,
						numClippingPlanes : c,
						numClipIntersection : u,
						shadowMapEnabled : t.shadowMap.enabled && h.receiveShadow && 0 < a.shadows.length,
						shadowMapType : t.shadowMap.type,
						toneMapping : t.toneMapping,
						physicallyCorrectLights : t.physicallyCorrectLights,
						premultipliedAlpha : r.premultipliedAlpha,
						alphaTest : r.alphaTest,
						doubleSided : r.side === kr,
						flipSided : r.side === Gr,
						depthPacking : void 0 !== r.depthPacking && r.depthPacking
					};
				return m
			}, this.getProgramCode = function(t, e) {
				var n = [];
				if (e.shaderID ? n.push(e.shaderID) : (n.push(t.fragmentShader), n.push(t.vertexShader)), void 0 !== t.defines)
					for (var i in t.defines) n.push(i), n.push(t.defines[i]);
				for (var r = 0; r < a.length; r++) n.push(e[a[r]]);
				return n.join()
			}, this.acquireProgram = function(e, n, i) {
				for (var o, a = 0, s = r.length; a < s; a++) {
					var c = r[a];
					if (c.code === i) {
						o = c, ++o.usedTimes;break
					}
				}
				return void 0 === o && (o = new Kt(t, i, e, n), r.push(o)), o
			}, this.releaseProgram = function(t) {
				if (0 == --t.usedTimes) {
					var e = r.indexOf(t);
					r[e] = r[r.length - 1], r.pop(), t.destroy()
				}
			}, this.programs = r
		}
		function $t(t, e, n) {
			function i(t) {
				var r = t.target,
					s = c[r.id];
				null !== s.index && o(s.index), a(s.attributes), r.removeEventListener("dispose", i),
				delete c[r.id];
				var u = e.get(r);
				u.wireframe && o(u.wireframe), e.delete(r);var h = e.get(s);
				h.wireframe && o(h.wireframe), e.delete(s), n.memory.geometries--
			}
			function r(t) {
				return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer
			}
			function o(e) {
				var n = r(e);
				void 0 !== n && (t.deleteBuffer(n), s(e))
			}
			function a(t) {
				for (var e in t) o(t[e])
			}
			function s(t) {
				t.isInterleavedBufferAttribute ? e.delete(t.data) : e.delete(t)
			}
			var c = {};
			return {
				get : function(t) {
					var e = t.geometry;
					if (void 0 !== c[e.id]) return c[e.id];
					e.addEventListener("dispose", i);
					var r;
					return e.isBufferGeometry ? r = e : e.isGeometry && (void 0 === e._bufferGeometry && (e._bufferGeometry = (new Pt).setFromObject(t)), r = e._bufferGeometry), c[e.id] = r, n.memory.geometries++, r
				}
			}
		}
		function te(t, e, n) {
			function i(t, n) {
				var i = t.isInterleavedBufferAttribute ? t.data : t,
					a = e.get(i);
				void 0 === a.__webglBuffer ? r(a, i, n) : a.version !== i.version && o(a, i, n)
			}
			function r(e, n, i) {
				e.__webglBuffer = t.createBuffer(), t.bindBuffer(i, e.__webglBuffer);var r = n.dynamic ? t.DYNAMIC_DRAW : t.STATIC_DRAW;
				t.bufferData(i, n.array, r);var o = t.FLOAT,
					a = n.array;
				a instanceof Float32Array ? o = t.FLOAT : a instanceof Float64Array ? console.warn("Unsupported data buffer format: Float64Array") : a instanceof Uint16Array ? o = t.UNSIGNED_SHORT : a instanceof Int16Array ? o = t.SHORT : a instanceof Uint32Array ? o = t.UNSIGNED_INT : a instanceof Int32Array ? o = t.INT : a instanceof Int8Array ? o = t.BYTE : a instanceof Uint8Array && (o = t.UNSIGNED_BYTE), e.bytesPerElement = a.BYTES_PER_ELEMENT, e.type = o, e.version = n.version, n.onUploadCallback()
			}
			function o(e, n, i) {
				t.bindBuffer(i, e.__webglBuffer), !1 === n.dynamic ? t.bufferData(i, n.array, t.STATIC_DRAW) : -1 === n.updateRange.count ? t.bufferSubData(i, 0, n.array) : 0 === n.updateRange.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (t.bufferSubData(i, n.updateRange.offset * n.array.BYTES_PER_ELEMENT, n.array.subarray(n.updateRange.offset, n.updateRange.offset + n.updateRange.count)), n.updateRange.count = 0), e.version = n.version
			}
			var a = new $t(t, e, n);
			return {
				getAttributeBuffer : function(t) {
					return t.isInterleavedBufferAttribute ? e.get(t.data).__webglBuffer : e.get(t).__webglBuffer
				},
				getAttributeProperties : function(t) {
					return t.isInterleavedBufferAttribute ? e.get(t.data) : e.get(t)
				},
				getWireframeAttribute : function(n) {
					var r = e.get(n);
					if (void 0 !== r.wireframe) return r.wireframe;
					var o = [],
						a = n.index,
						s = n.attributes,
						c = s.position;
					if (null !== a)
						for (var u = a.array, h = 0, l = u.length; h < l; h += 3) {
							var d = u[h + 0],
								p = u[h + 1],
								f = u[h + 2];
							o.push(d, p, p, f, f, d)
					}
					else
						for (var u = s.position.array, h = 0, l = u.length / 3 - 1; h < l; h += 3) {
							var d = h + 0,
								p = h + 1,
								f = h + 2;
							o.push(d, p, p, f, f, d)
					}
					var m = 65535 < c.count ? Uint32Array : Uint16Array,
						v = new mt(new m(o), 1);
					return i(v, t.ELEMENT_ARRAY_BUFFER), r.wireframe = v, v
				},
				update : function(e) {
					var n = a.get(e);
					e.geometry.isGeometry && n.updateFromObject(e);
					var r = n.index,
						o = n.attributes;
					for (var s in null !== r && i(r, t.ELEMENT_ARRAY_BUFFER), o) i(o[s], t.ARRAY_BUFFER);
					var c = n.morphAttributes;
					for (var s in c)
						for (var u = c[s], h = 0, l = u.length; h < l; h++) i(u[h], t.ARRAY_BUFFER);
					return n
				}
			}
		}
		function ee(t, e, n, i, r, o, a) {
			function s(t, e) {
				if (t.width > e || t.height > e) {
					var n = e / Math.max(t.width, t.height),
						i = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
					i.width = Math.floor(t.width * n), i.height = Math.floor(t.height * n);
					var r = i.getContext("2d");
					return r.drawImage(t, 0, 0, t.width, t.height, 0, 0, i.width, i.height), console.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + i.width + "x" + i.height, t), i
				}
				return t
			}
			function c(t) {
				return Ya.isPowerOfTwo(t.width) && Ya.isPowerOfTwo(t.height)
			}
			function u(t) {
				if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
					var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
					e.width = Ya.nearestPowerOfTwo(t.width), e.height = Ya.nearestPowerOfTwo(t.height);
					var n = e.getContext("2d");
					return n.drawImage(t, 0, 0, e.width, e.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + t.width + "x" + t.height + "). Resized to " + e.width + "x" + e.height, t), e
				}
				return t
			}
			function h(t) {
				return t.wrapS !== jo || t.wrapT !== jo || t.minFilter !== Xo && t.minFilter !== Zo
			}
			function l(e) {
				return e === Xo || e === qo || e === Yo ? t.NEAREST : t.LINEAR
			}
			function d(t) {
				var e = t.target;
				e.removeEventListener("dispose", d), f(e), M.textures--
			}
			function p(t) {
				var e = t.target;
				e.removeEventListener("dispose", p), m(e), M.textures--
			}
			function f(e) {
				var n = i.get(e);
				if (e.image && n.__image__webglTextureCube) t.deleteTexture(n.__image__webglTextureCube);else {
					if (void 0 === n.__webglInit) return;
					t.deleteTexture(n.__webglTexture)
				}
				i.delete(e)
			}
			function m(e) {
				var n = i.get(e),
					r = i.get(e.texture);
				if (e) {
					if (void 0 !== r.__webglTexture && t.deleteTexture(r.__webglTexture), e.depthTexture && e.depthTexture.dispose(), e.isWebGLRenderTargetCube)
						for (var o = 0; 6 > o; o++) t.deleteFramebuffer(n.__webglFramebuffer[o]), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer[o]);
					else t.deleteFramebuffer(n.__webglFramebuffer), n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer);
					i.delete(e.texture), i.delete(e)
				}
			}
			function v(e, r) {
				var o = i.get(e);
				if (0 < e.version && o.__version !== e.version) {
					var a = e.image;
					if (void 0 === a) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", e);else {
						if (!1 !== a.complete) return void y(o, e, r);
						console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", e)
					}
				}
				n.activeTexture(t.TEXTURE0 + r), n.bindTexture(t.TEXTURE_2D, o.__webglTexture)
			}
			function g(n, a, s) {
				var c;
				if (s ? (t.texParameteri(n, t.TEXTURE_WRAP_S, o(a.wrapS)),
					t.texParameteri(n, t.TEXTURE_WRAP_T, o(a.wrapT)), t.texParameteri(n, t.TEXTURE_MAG_FILTER, o(a.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, o(a.minFilter))) : (t.texParameteri(n, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(n, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), (a.wrapS !== jo || a.wrapT !== jo) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", a), t.texParameteri(n, t.TEXTURE_MAG_FILTER, l(a.magFilter)), t.texParameteri(n, t.TEXTURE_MIN_FILTER, l(a.minFilter)), a.minFilter !== Xo && a.minFilter !== Zo && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", a)), c = e.get("EXT_texture_filter_anisotropic")) {
					if (a.type === oa && null === e.get("OES_texture_float_linear")) return;
					if (a.type === aa && null === e.get("OES_texture_half_float_linear")) return;
					(1 < a.anisotropy || i.get(a).__currentAnisotropy) && (t.texParameterf(n, c.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy)
				}
			}
			function y(e, i, a) {
				void 0 === e.__webglInit && (e.__webglInit = !0, i.addEventListener("dispose", d), e.__webglTexture = t.createTexture(), M.textures++), n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_2D, e.__webglTexture), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, i.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, i.unpackAlignment);var l = s(i.image, r.maxTextureSize);
				h(i) && !1 === c(l) && (l = u(l));var p = c(l),
					f = o(i.format),
					m = o(i.type);
				g(t.TEXTURE_2D, i, p);var v,
					y = i.mipmaps;
				if (i.isDepthTexture) {
					var x = t.DEPTH_COMPONENT;
					if (i.type === oa) {
						if (!E)
							throw new Error("Float Depth Texture only supported in WebGL2.0");
						x = t.DEPTH_COMPONENT32F
					} else E && (x = t.DEPTH_COMPONENT16);
					i.format === va && x === t.DEPTH_COMPONENT && i.type !== na && i.type !== ra && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), i.type = na, m = o(i.type)), i.format === ga && (x = t.DEPTH_STENCIL, i.type !== ha && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), i.type = ha, m = o(i.type))), n.texImage2D(t.TEXTURE_2D, 0, x, l.width, l.height, 0, f, m, null)
				} else if (i.isDataTexture)
					if (0 < y.length && p) {
						for (var b = 0, _ = y.length; b < _; b++) v = y[b], n.texImage2D(t.TEXTURE_2D, b, f, v.width, v.height, 0, f, m, v.data);
						i.generateMipmaps = !1
					} else n.texImage2D(t.TEXTURE_2D, 0, f, l.width, l.height, 0, f, m, l.data);
				else if (i.isCompressedTexture)
					for (var b = 0, _ = y.length; b < _; b++) v = y[b], i.format !== pa && i.format !== da ? -1 < n.getCompressedTextureFormats().indexOf(f) ? n.compressedTexImage2D(t.TEXTURE_2D, b, f, v.width, v.height, 0, v.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : n.texImage2D(t.TEXTURE_2D, b, f, v.width, v.height, 0, f, m, v.data);
				else if (0 < y.length && p) {
					for (var b = 0, _ = y.length; b < _; b++) v = y[b], n.texImage2D(t.TEXTURE_2D, b, f, f, m, v);
					i.generateMipmaps = !1
				} else n.texImage2D(t.TEXTURE_2D, 0, f, f, m, l);
				i.generateMipmaps && p && t.generateMipmap(t.TEXTURE_2D), e.__version = i.version, i.onUpdate && i.onUpdate(i)
			}
			function x(e, r, a, s) {
				var c = o(r.texture.format),
					u = o(r.texture.type);
				n.texImage2D(s, 0, c, r.width, r.height, 0, c, u, null), t.bindFramebuffer(t.FRAMEBUFFER, e), t.framebufferTexture2D(t.FRAMEBUFFER, a, s, i.get(r.texture).__webglTexture, 0), t.bindFramebuffer(t.FRAMEBUFFER, null)
			}
			function b(e, n) {
				t.bindRenderbuffer(t.RENDERBUFFER, e), n.depthBuffer && !n.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, n.width, n.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, e)) : n.depthBuffer && n.stencilBuffer ? (t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, n.width, n.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, e)) : t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, n.width, n.height), t.bindRenderbuffer(t.RENDERBUFFER, null)
			}
			function _(e, n) {
				var r = n && n.isWebGLRenderTargetCube;
				if (r)
					throw new Error("Depth Texture with cube render targets is not supported!");
				if (t.bindFramebuffer(t.FRAMEBUFFER, e), !(n.depthTexture && n.depthTexture.isDepthTexture))
					throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
				i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height || (n.depthTexture.image.width = n.width, n.depthTexture.image.height = n.height, n.depthTexture.needsUpdate = !0), v(n.depthTexture, 0);var o = i.get(n.depthTexture).__webglTexture;
				if (n.depthTexture.format === va) t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, o, 0);else {
					if (n.depthTexture.format !== ga)
						throw new Error("Unknown depthTexture format");
					t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, o, 0)
				}
			}
			function w(e) {
				var n = i.get(e),
					r = !0 === e.isWebGLRenderTargetCube;
				if (e.depthTexture) {
					if (r)
						throw new Error("target.depthTexture not supported in Cube render targets");
					_(n.__webglFramebuffer, e)
				} else if (r) {
					n.__webglDepthbuffer = [];
					for (var o = 0; 6 > o; o++) t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer[o]), n.__webglDepthbuffer[o] = t.createRenderbuffer(), b(n.__webglDepthbuffer[o], e)
				} else t.bindFramebuffer(t.FRAMEBUFFER, n.__webglFramebuffer), n.__webglDepthbuffer = t.createRenderbuffer(), b(n.__webglDepthbuffer, e);
				t.bindFramebuffer(t.FRAMEBUFFER, null)
			}
			var M = a.memory,
				E = "undefined" != typeof WebGL2RenderingContext && t instanceof WebGL2RenderingContext;
			this.setTexture2D = v, this.setTextureCube = function(e, a) {
				var u = i.get(e);
				if (6 === e.image.length)
					if (0 < e.version && u.__version !== e.version) {
						u.__image__webglTextureCube || (e.addEventListener("dispose", d), u.__image__webglTextureCube = t.createTexture(), M.textures++), n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_CUBE_MAP, u.__image__webglTextureCube), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, e.flipY);
						for (var h = e && e.isCompressedTexture, l = e.image[0] && e.image[0].isDataTexture, p = [], f = 0; 6 > f; f++) p[f] = h || l ? l ? e.image[f].image : e.image[f] : s(e.image[f], r.maxCubemapSize);
						var m = p[0],
							v = c(m),
							y = o(e.format),
							x = o(e.type);
						g(t.TEXTURE_CUBE_MAP, e, v);
						for (var f = 0; 6 > f; f++)
							if (h)
								for (var b, _ = p[f].mipmaps, w = 0, E = _.length; w < E; w++) b = _[w], e.format !== pa && e.format !== da ? -1 < n.getCompressedTextureFormats().indexOf(y) ? n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, y, b.width, b.height, 0, b.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, w, y, b.width, b.height, 0, y, x, b.data);
							else
								l ? n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, y, p[f].width, p[f].height, 0, y, x, p[f].data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, y, y, x, p[f]);
						e.generateMipmaps && v && t.generateMipmap(t.TEXTURE_CUBE_MAP), u.__version = e.version, e.onUpdate && e.onUpdate(e)
					} else n.activeTexture(t.TEXTURE0 + a), n.bindTexture(t.TEXTURE_CUBE_MAP, u.__image__webglTextureCube)
			}, this.setTextureCubeDynamic = function(e, r) {
				n.activeTexture(t.TEXTURE0 + r), n.bindTexture(t.TEXTURE_CUBE_MAP, i.get(e).__webglTexture)
			}, this.setupRenderTarget = function(e) {
				var r = i.get(e),
					o = i.get(e.texture);
				e.addEventListener("dispose", p), o.__webglTexture = t.createTexture(), M.textures++;
				var a = !0 === e.isWebGLRenderTargetCube,
					s = c(e);
				if (a) {
					r.__webglFramebuffer = [];
					for (var u = 0; 6 > u; u++) r.__webglFramebuffer[u] = t.createFramebuffer()
				} else
					r.__webglFramebuffer = t.createFramebuffer();
				if (a) {
					n.bindTexture(t.TEXTURE_CUBE_MAP, o.__webglTexture), g(t.TEXTURE_CUBE_MAP, e.texture, s);
					for (var u = 0; 6 > u; u++) x(r.__webglFramebuffer[u], e, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + u);
					e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_CUBE_MAP), n.bindTexture(t.TEXTURE_CUBE_MAP, null)
				} else n.bindTexture(t.TEXTURE_2D, o.__webglTexture), g(t.TEXTURE_2D, e.texture, s), x(r.__webglFramebuffer, e, t.COLOR_ATTACHMENT0, t.TEXTURE_2D), e.texture.generateMipmaps && s && t.generateMipmap(t.TEXTURE_2D), n.bindTexture(t.TEXTURE_2D, null);
				e.depthBuffer && w(e)
			}, this.updateRenderTargetMipmap = function(e) {
				var r = e.texture;
				if (r.generateMipmaps && c(e) && r.minFilter !== Xo && r.minFilter !== Zo) {
					var o = e && e.isWebGLRenderTargetCube ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D,
						a = i.get(r).__webglTexture;
					n.bindTexture(o, a), t.generateMipmap(o), n.bindTexture(o, null)
				}
			}
		}
		function ne() {
			var t = {};
			return {
				get : function(e) {
					var n = e.uuid,
						i = t[n];
					return void 0 === i && (i = {}, t[n] = i), i
				},
				delete : function(e) {
					delete t[e.uuid]
				},
				clear : function() {
					t = {}
				}
			}
		}
		function ie(t, e, n) {
			function i(e, n, i) {
				var r = new Uint8Array(4),
					o = t.createTexture();
				t.bindTexture(e, o), t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
				for (var a = 0; a < i; a++) t.texImage2D(n + a, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, r);
				return o
			}
			function r(e) {
				!0 !== x[e] && (t.enable(e), x[e] = !0)
			}
			function o(e) {
				!1 !== x[e] && (t.disable(e), x[e] = !1)
			}
			function s(e, i, a, s, c, u, h, l) {
				e === qr ? o(t.BLEND) : r(t.BLEND), (e !== _ || l !== P) && (e === Zr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE, t.ONE, t.ONE)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.SRC_ALPHA, t.ONE)) : e === Jr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR)) : e === Kr ? l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA)) : (t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ZERO, t.SRC_COLOR)) : l ? (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)) : (t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD), t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)), _ = e, P = l), e === Qr ? (c = c || i, u = u || a, h = h || s, (i !== w || c !== S) && (t.blendEquationSeparate(n(i), n(c)), w = i, S = c), (a !== M || s !== E || u !== T || h !== A) && (t.blendFuncSeparate(n(a), n(s), n(u), n(h)), M = a, E = s, T = u, A = h)) : (w = null, M = null, E = null, S = null, T = null, A = null)
			}
			function c(t) {
				p.setFunc(t)
			}
			function u(e) {
				L !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), L = e)
			}
			function h(e) {
				e === Or ? o(t.CULL_FACE) : (r(t.CULL_FACE), e !== R && (e === Ur ? t.cullFace(t.BACK) : e === Dr ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))), R = e
			}
			function l(e) {
				void 0 === e && (e = t.TEXTURE0 + D - 1), F !== e && (t.activeTexture(e), F = e)
			}
			var d = new function() {
					var e = !1,
						n = new a,
						i = null,
						r = new a;
					return {
						setMask : function(n) {
							i === n || e || (t.colorMask(n, n, n, n), i = n)
						},
						setLocked : function(t) {
							e = t
						},
						setClear : function(e, i, o, a, s) {
							!0 === s && (e *= a, i *= a, o *= a), n.set(e, i, o, a), !1 === r.equals(n) && (t.clearColor(e, i, o, a), r.copy(n))
						},
						reset : function() {
							e = !1, i = null, r.set(0, 0, 0, 1)
						}
					}
				},
				p = new function() {
					var e = !1,
						n = null,
						i = null,
						a = null;
					return {
						setTest : function(e) {
							e ? r(t.DEPTH_TEST) : o(t.DEPTH_TEST)
						},
						setMask : function(i) {
							n === i || e || (t.depthMask(i), n = i)
						},
						setFunc : function(e) {
							i !== e && (e ? e === go ? t.depthFunc(t.NEVER) : e === yo ? t.depthFunc(t.ALWAYS) : e === xo ? t.depthFunc(t.LESS) : e === bo ? t.depthFunc(t.LEQUAL) : e === _o ? t.depthFunc(t.EQUAL) : e === wo ? t.depthFunc(t.GEQUAL) : e === Mo ? t.depthFunc(t.GREATER) : e === Eo ? t.depthFunc(t.NOTEQUAL) : t.depthFunc(t.LEQUAL) : t.depthFunc(t.LEQUAL), i = e)
						},
						setLocked : function(t) {
							e = t
						},
						setClear : function(e) {
							a !== e && (t.clearDepth(e), a = e)
						},
						reset : function() {
							e = !1, n = null, i = null, a = null
						}
					}
				},
				f = new function() {
					var e = !1,
						n = null,
						i = null,
						a = null,
						s = null,
						c = null,
						u = null,
						h = null,
						l = null;
					return {
						setTest : function(e) {
							e ? r(t.STENCIL_TEST) : o(t.STENCIL_TEST)
						},
						setMask : function(i) {
							n === i || e || (t.stencilMask(i), n = i)
						},
						setFunc : function(e, n, r) {
							(i !== e || a !== n || s !== r) && (t.stencilFunc(e, n, r), i = e, a = n, s = r)
						},
						setOp : function(e, n, i) {
							(c !== e || u !== n || h !== i) && (t.stencilOp(e, n, i), c = e, u = n, h = i)
						},
						setLocked : function(t) {
							e = t
						},
						setClear : function(e) {
							l !== e && (t.clearStencil(e), l = e)
						},
						reset : function() {
							e = !1, n = null, i = null, a = null, s = null, c = null, u = null, h = null, l = null
						}
					}
				},
				m = t.getParameter(t.MAX_VERTEX_ATTRIBS),
				v = new Uint8Array(m),
				g = new Uint8Array(m),
				y = new Uint8Array(m),
				x = {},
				b = null,
				_ = null,
				w = null,
				M = null,
				E = null,
				S = null,
				T = null,
				A = null,
				P = !1,
				L = null,
				R = null,
				C = null,
				I = null,
				O = null,
				U = null,
				D = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
				B = parseFloat(/^WebGL\ ([0-9])/.exec(t.getParameter(t.VERSION))[1]),
				N = 1 <= parseFloat(B),
				F = null,
				z = {},
				G = new a,
				k = new a,
				H = {};
			return H[t.TEXTURE_2D] = i(t.TEXTURE_2D, t.TEXTURE_2D, 1), H[t.TEXTURE_CUBE_MAP] = i(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), {
					buffers : {
						color : d,
						depth : p,
						stencil : f
					},
					init : function() {
						d.setClear(0, 0, 0, 1), p.setClear(1), f.setClear(0), r(t.DEPTH_TEST), c(bo), u(!1), h(Ur), r(t.CULL_FACE), r(t.BLEND), s(Yr)
					},
					initAttributes : function() {
						for (var t = 0, e = v.length; t < e; t++) v[t] = 0
					},
					enableAttribute : function(n) {
						if (v[n] = 1, 0 === g[n] && (t.enableVertexAttribArray(n), g[n] = 1), 0 !== y[n]) {
							var i = e.get("ANGLE_instanced_arrays");
							i.vertexAttribDivisorANGLE(n, 0), y[n] = 0
						}
					},
					enableAttributeAndDivisor : function(e, n, i) {
						v[e] = 1, 0 === g[e] && (t.enableVertexAttribArray(e), g[e] = 1), y[e] !== n && (i.vertexAttribDivisorANGLE(e, n), y[e] = n)
					},
					disableUnusedAttributes : function() {
						for (var e = 0, n = g.length; e !== n; ++e) g[e] !== v[e] && (t.disableVertexAttribArray(e), g[e] = 0)
					},
					enable : r,
					disable : o,
					getCompressedTextureFormats : function() {
						if (null == b && (b = [], e.get("WEBGL_compressed_texture_pvrtc") || e.get("WEBGL_compressed_texture_s3tc") || e.get("WEBGL_compressed_texture_etc1")))
							for (var n = t.getParameter(t.COMPRESSED_TEXTURE_FORMATS), i = 0; i < n.length; i++) b.push(n[i]);
						return b
					},
					setBlending : s,
					setColorWrite : function(t) {
						d.setMask(t)
					},
					setDepthTest : function(t) {
						p.setTest(t)
					},
					setDepthWrite : function(t) {
						p.setMask(t)
					},
					setDepthFunc : c,
					setStencilTest : function(t) {
						f.setTest(t)
					},
					setStencilWrite : function(t) {
						f.setMask(t)
					},
					setStencilFunc : function(t, e, n) {
						f.setFunc(t, e, n)
					},
					setStencilOp : function(t, e, n) {
						f.setOp(t, e, n)
					},
					setFlipSided : u,
					setCullFace : h,
					setLineWidth : function(e) {
						e !== C && (N && t.lineWidth(e), C = e)
					},
					setPolygonOffset : function(e, n, i) {
						e ? (r(t.POLYGON_OFFSET_FILL), (I !== n || O !== i) && (t.polygonOffset(n, i), I = n, O = i)) : o(t.POLYGON_OFFSET_FILL)
					},
					getScissorTest : function() {
						return U
					},
					setScissorTest : function(e) {
						U = e, e ? r(t.SCISSOR_TEST) : o(t.SCISSOR_TEST)
					},
					activeTexture : l,
					bindTexture : function(e, n) {
						null === F && l();
						var i = z[F];
						void 0 === i && (i = {
							type : void 0,
							texture : void 0
						}, z[F] = i), (i.type !== e || i.texture !== n) && (t.bindTexture(e, n || H[e]), i.type = e, i.texture = n)
					},
					compressedTexImage2D : function() {
						try {
							t.compressedTexImage2D.apply(t, arguments)
						} catch (t) {
							console.error(t)
						}
					},
					texImage2D : function() {
						try {
							t.texImage2D.apply(t, arguments)
						} catch (t) {
							console.error(t)
						}
					},
					scissor : function(e) {
						!1 === G.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), G.copy(e))
					},
					viewport : function(e) {
						!1 === k.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), k.copy(e))
					},
					reset : function() {
						for (var e = 0; e < g.length; e++) 1 === g[e] && (t.disableVertexAttribArray(e), g[e] = 0);
						x = {}, b = null, F = null, z = {}, _ = null, L = null, R = null, d.reset(), p.reset(), f.reset()
					}
			}
		}
		function re(t, e, n) {
			function i(e) {
				if ("highp" === e) {
					if (0 < t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision && 0 < t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision) return "highp";
					e = "mediump"
				}
				return "mediump" === e && 0 < t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision && 0 < t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
			}
			var r,
				o = void 0 === n.precision ? "highp" : n.precision,
				a = i(o);
			a !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", a, "instead."), o = a);var s = !0 === n.logarithmicDepthBuffer && !!e.get("EXT_frag_depth"),
				c = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
				u = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
				h = t.getParameter(t.MAX_TEXTURE_SIZE),
				l = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),
				d = t.getParameter(t.MAX_VERTEX_ATTRIBS),
				p = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),
				f = t.getParameter(t.MAX_VARYING_VECTORS),
				m = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),
				v = 0 < u,
				g = !!e.get("OES_texture_float");
			return {
				getMaxAnisotropy : function() {
					if (void 0 != r) return r;
					var n = e.get("EXT_texture_filter_anisotropic");
					return r = null === n ? 0 : t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
				},
				getMaxPrecision : i,
				precision : o,
				logarithmicDepthBuffer : s,
				maxTextures : c,
				maxVertexTextures : u,
				maxTextureSize : h,
				maxCubemapSize : l,
				maxAttributes : d,
				maxVertexUniforms : p,
				maxVaryings : f,
				maxFragmentUniforms : m,
				vertexTextures : v,
				floatFragmentTextures : g,
				floatVertexTextures : v && g
			}
		}
		function oe(t) {
			var e = {};
			return {
				get : function(n) {
					if (void 0 !== e[n]) return e[n];
					var i;
					return i = "WEBGL_depth_texture" === n ? t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture") : "EXT_texture_filter_anisotropic" === n ? t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") : "WEBGL_compressed_texture_s3tc" === n ? t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc") : "WEBGL_compressed_texture_pvrtc" === n ? t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc") : "WEBGL_compressed_texture_etc1" === n ? t.getExtension("WEBGL_compressed_texture_etc1") : t.getExtension(n), null === i && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), e[n] = i, i
				}
			}
		}
		function ae() {
			function t() {
				u.value !== i && (u.value = i, u.needsUpdate = 0 < r), n.numPlanes = r, n.numIntersection = 0
			}
			function e(t, e, i, r) {
				var o = null === t ? 0 : t.length,
					a = null;
				if (0 !== o) {
					if (a = u.value, !0 !== r || null == a) {
						var h = i + 4 * o,
							l = e.matrixWorldInverse;
						c.getNormalMatrix(l), (null == a || a.length < h) && (a = new Float32Array(h));
						for (var d = 0, p = i; d !== o; ++d, p += 4) s.copy(t[d]).applyMatrix4(l, c), s.normal.toArray(a, p), a[p + 3] = s.constant
					}
					u.value = a, u.needsUpdate = !0
				}
				return n.numPlanes = o, a
			}
			var n = this,
				i = null,
				r = 0,
				o = !1,
				a = !1,
				s = new rt,
				c = new it,
				u = {
					value : null,
					needsUpdate : !1
				};
			this.uniform = u, this.numPlanes = 0, this.numIntersection = 0, this.init = function(t, n, a) {
				var s = 0 !== t.length || n || 0 != r || o;
				return o = n, i = e(t, a, 0), r = t.length, s
			}, this.beginShadows = function() {
				a = !0, e(null)
			}, this.endShadows = function() {
				a = !1, t()
			}, this.setState = function(n, s, c, h, l, d) {
				if (!o || null === n || 0 === n.length || a && !c)
					a ? e(null) : t();else {
					var p = a ? 0 : r,
						f = 4 * p,
						m = l.clippingState || null;
					u.value = m, m = e(n, h, f, d);
					for (var v = 0; v !== f; ++v) m[v] = i[v];
					l.clippingState = m, this.numIntersection = s ? this.numPlanes : 0, this.numPlanes += p
				}
			}
		}
		function se(e) {
			function n() {
				return null === dt ? Tt : 1
			}
			function i() {
				ce.init(), ce.scissor(yt.copy(At).multiplyScalar(Tt)), ce.viewport(bt.copy(Ft).multiplyScalar(Tt)), ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Y)
			}
			function r() {
				lt = null, gt = null, vt = "", mt = -1, ce.reset()
			}
			function o(t) {
				t.preventDefault(), r(), i(), ue.clear()
			}
			function s(t) {
				var e = t.target;
				e.removeEventListener("dispose", s), c(e)
			}
			function c(t) {
				u(t), ue.delete(t)
			}
			function u(t) {
				var e = ue.get(t).program;
				t.program = void 0, void 0 !== e && de.releaseProgram(e)
			}
			function d(t, e, n, i) {
				var r;
				if (n && n.isInstancedBufferGeometry && (r = $t.get("ANGLE_instanced_arrays"), null === r)) return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
				void 0 === i && (i = 0), ce.initAttributes();var o = n.attributes,
					a = e.getAttributes(),
					s = t.defaultAttributeValues;
				for (var c in a) {
					var u = a[c];
					if (0 <= u) {
						var h = o[c];
						if (void 0 !== h) {
							var l = h.normalized,
								d = h.itemSize,
								p = le.getAttributeProperties(h),
								f = p.__webglBuffer,
								m = p.type,
								v = p.bytesPerElement;
							if (h.isInterleavedBufferAttribute) {
								var g = h.data,
									y = g.stride,
									x = h.offset;
								g && g.isInstancedInterleavedBuffer ? (ce.enableAttributeAndDivisor(u, g.meshPerAttribute, r), void 0 === n.maxInstancedCount && (n.maxInstancedCount = g.meshPerAttribute * g.count)) : ce.enableAttribute(u), Jt.bindBuffer(Jt.ARRAY_BUFFER, f), Jt.vertexAttribPointer(u, d, m, l, y * v, (i * y + x) * v)
							} else h.isInstancedBufferAttribute ? (ce.enableAttributeAndDivisor(u, h.meshPerAttribute, r), void 0 === n.maxInstancedCount && (n.maxInstancedCount = h.meshPerAttribute * h.count)) : ce.enableAttribute(u), Jt.bindBuffer(Jt.ARRAY_BUFFER, f), Jt.vertexAttribPointer(u, d, m, l, 0, i * d * v)
						} else if (void 0 !== s) {
							var b = s[c];
							if (void 0 !== b) switch (b.length) {
								case 2:
									Jt.vertexAttrib2fv(u, b);
									break;case 3:
									Jt.vertexAttrib3fv(u, b);
									break;case 4:
									Jt.vertexAttrib4fv(u, b);
									break;default:
									Jt.vertexAttrib1fv(u, b)
							}
						}
					}
				}
				ce.disableUnusedAttributes()
			}
			function p(t, e) {
				return Math.abs(e[0]) - Math.abs(t[0])
			}
			function f(t, e) {
				return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.material.program && e.material.program && t.material.program !== e.material.program ? t.material.program.id - e.material.program.id : t.material.id === e.material.id ? t.z === e.z ? t.id - e.id : t.z - e.z : t.material.id - e.material.id
			}
			function m(t, e) {
				return t.object.renderOrder === e.object.renderOrder ? t.z === e.z ? t.id - e.id : e.z - t.z : t.object.renderOrder - e.object.renderOrder
			}
			function v(t, e, n, i, r) {
				var o,
					a;
				n.transparent ? (o = it, a = ++rt) : (o = tt, a = ++et);var s = o[a];
				void 0 === s ? (s = {
					id : t.id,
					object : t,
					geometry : e,
					material : n,
					z : Wt.z,
					group : r
				}, o.push(s)) : (s.id = t.id, s.object = t, s.geometry = e, s.material = n, s.z = Wt.z, s.group = r)
			}
			function g(t) {
				var e = t.geometry;
				return null === e.boundingSphere && e.computeBoundingSphere(), jt.copy(e.boundingSphere).applyMatrix4(t.matrixWorld), x(jt)
			}
			function y(t) {
				return jt.center.set(0, 0, 0), jt.radius = .7071067811865476, jt.applyMatrix4(t.matrixWorld), x(jt)
			}
			function x(t) {
				if (!zt.intersectsSphere(t)) return !1;
				var e = Gt.numPlanes;
				if (0 === e) return !0;
				var n = ht.clippingPlanes,
					i = t.center,
					r = -t.radius,
					o = 0;
				do
					if (n[o].distanceToPoint(i) < r) return !1;
				while (++o !== e);
				return !0
			}
			function b(t, e) {
				if (!1 !== t.visible) {
					var n = 0 != (t.layers.mask & e.layers.mask);
					if (n)
						if (t.isLight) Q.push(t);
						else if (t.isSprite) (!1 === t.frustumCulled || !0 === y(t)) && ct.push(t);
						else if (t.isLensFlare) ut.push(t);
						else if (t.isImmediateRenderObject) !0 === ht.sortObjects && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyProjection(Vt)), v(t, null, t.material, Wt.z, null);
						else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.update(), !1 === t.frustumCulled || !0 === g(t))) {
							var i = t.material;
							if (!0 === i.visible) {
								!0 === ht.sortObjects && (Wt.setFromMatrixPosition(t.matrixWorld), Wt.applyProjection(Vt));
								var r = le.update(t);
								if (i.isMultiMaterial)
									for (var o = r.groups, a = i.materials, s = 0, c = o.length; s < c; s++) {
										var u = o[s],
											h = a[u.materialIndex];
										!0 === h.visible && v(t, r, h, Wt.z, u)
								}
								else v(t, r, i, Wt.z, null)
							}
					}
					for (var l = t.children, s = 0, c = l.length; s < c; s++) b(l[s], e)
				}
			}
			function _(t, e, n, i) {
				for (var r = 0, o = t.length; r < o; r++) {
					var a = t[r],
						s = a.object,
						c = a.geometry,
						u = void 0 === i ? a.material : i,
						h = a.group;
					if (s.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, s.matrixWorld), s.normalMatrix.getNormalMatrix(s.modelViewMatrix), s.onBeforeRender(ht, e, n, c, u, h), s.isImmediateRenderObject) {
						M(u);
						var l = E(n, e.fog, u, s);
						vt = "", s.render((function(t) {
							ht.renderBufferImmediate(t, l, u)
						}))
					} else ht.renderBufferDirect(n, e.fog, c, u, s, h);
					s.onAfterRender(ht, e, n, c, u, h)
				}
			}
			function w(t, e, n) {
				var i = ue.get(t),
					r = de.getParameters(t, Yt, e, Gt.numPlanes, Gt.numIntersection, n),
					o = de.getProgramCode(t, r),
					a = i.program,
					c = !0;
				if (void 0 === a) t.addEventListener("dispose", s);
				else if (a.code !== o) u(t);else {
					if (void 0 !== r.shaderID) return;
					c = !1
				}
				if (c) {
					if (r.shaderID) {
						var h = os[r.shaderID];
						i.__webglShader = {
							name : t.type,
							uniforms : es.clone(h.uniforms),
							vertexShader : h.vertexShader,
							fragmentShader : h.fragmentShader
						}
					} else
						i.__webglShader = {
							name : t.type,
							uniforms : t.uniforms,
							vertexShader : t.vertexShader,
							fragmentShader : t.fragmentShader
						};
					t.__webglShader = i.__webglShader, a = de.acquireProgram(t, r, o), i.program = a, t.program = a
				}
				var l = a.getAttributes();
				if (t.morphTargets) {
					t.numSupportedMorphTargets = 0;
					for (var d = 0; d < ht.maxMorphTargets; d++) 0 <= l["morphTarget" + d] && t.numSupportedMorphTargets++
				}
				if (t.morphNormals) {
					t.numSupportedMorphNormals = 0;
					for (var d = 0; d < ht.maxMorphNormals; d++) 0 <= l["morphNormal" + d] && t.numSupportedMorphNormals++
				}
				var p = i.__webglShader.uniforms;
				(t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (i.numClippingPlanes = Gt.numPlanes, i.numIntersection = Gt.numIntersection, p.clippingPlanes = Gt.uniform), i.fog = e, i.lightsHash = Yt.hash, t.lights && (p.ambientLightColor.value = Yt.ambient, p.directionalLights.value = Yt.directional, p.spotLights.value = Yt.spot, p.rectAreaLights.value = Yt.rectArea, p.pointLights.value = Yt.point, p.hemisphereLights.value = Yt.hemi, p.directionalShadowMap.value = Yt.directionalShadowMap, p.directionalShadowMatrix.value = Yt.directionalShadowMatrix, p.spotShadowMap.value = Yt.spotShadowMap, p.spotShadowMatrix.value = Yt.spotShadowMatrix, p.pointShadowMap.value = Yt.pointShadowMap, p.pointShadowMatrix.value = Yt.pointShadowMatrix);var f = i.program.getUniforms(),
					m = X.seqWithValue(f.seq, p);
				i.uniformsList = m
			}
			function M(t) {
				t.side === kr ? ce.disable(Jt.CULL_FACE) : ce.enable(Jt.CULL_FACE), ce.setFlipSided(t.side === Gr), !0 === t.transparent ? ce.setBlending(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.premultipliedAlpha) : ce.setBlending(qr), ce.setDepthFunc(t.depthFunc), ce.setDepthTest(t.depthTest), ce.setDepthWrite(t.depthWrite), ce.setColorWrite(t.colorWrite), ce.setPolygonOffset(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
			}
			function E(e, n, i, r) {
				_t = 0;var o = ue.get(i);
				if (kt && (Ht || e !== gt)) {
					var a = e === gt && i.id === mt;
					Gt.setState(i.clippingPlanes, i.clipIntersection, i.clipShadows, e, o, a)
				}
				!1 === i.needsUpdate && (void 0 === o.program ? i.needsUpdate = !0 : i.fog && o.fog !== n ? i.needsUpdate = !0 : i.lights && o.lightsHash !== Yt.hash ? i.needsUpdate = !0 : void 0 !== o.numClippingPlanes && (o.numClippingPlanes !== Gt.numPlanes || o.numIntersection !== Gt.numIntersection) && (i.needsUpdate = !0)), i.needsUpdate && (w(i, n, r), i.needsUpdate = !1);var s = !1,
					c = !1,
					u = !1,
					h = o.program,
					l = h.getUniforms(),
					d = o.__webglShader.uniforms;
				if (h.id !== lt && (Jt.useProgram(h.program), lt = h.id, s = !0, c = !0, u = !0), i.id !== mt && (mt = i.id, c = !0), s || e !== gt) {
					if (l.set(Jt, e, "projectionMatrix"), se.logarithmicDepthBuffer && l.setValue(Jt, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), e !== gt && (gt = e, c = !0, u = !0), i.isShaderMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.envMap) {
						var p = l.map.cameraPosition;
						void 0 !== p && p.setValue(Jt, Wt.setFromMatrixPosition(e.matrixWorld))
					}
					(i.isMeshPhongMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial || i.skinning) && l.setValue(Jt, "viewMatrix", e.matrixWorldInverse), l.set(Jt, ht, "toneMappingExposure"), l.set(Jt, ht, "toneMappingWhitePoint")
				}
				if (i.skinning) {
					l.setOptional(Jt, r, "bindMatrix"), l.setOptional(Jt, r, "bindMatrixInverse");
					var f = r.skeleton;
					f && (se.floatVertexTextures && f.useVertexTexture ? (l.set(Jt, f, "boneTexture"), l.set(Jt, f, "boneTextureWidth"), l.set(Jt, f, "boneTextureHeight")) : l.setOptional(Jt, f, "boneMatrices"))
				}
				return c && (i.lights && B(d, u), n && i.fog && L(d, n), (i.isMeshBasicMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshNormalMaterial || i.isMeshDepthMaterial) && S(d, i), i.isLineBasicMaterial ? T(d, i) : i.isLineDashedMaterial ? (T(d, i), A(d, i)) : i.isPointsMaterial ? P(d, i) : i.isMeshLambertMaterial ? R(d, i) : i.isMeshToonMaterial ? I(d, i) : i.isMeshPhongMaterial ? C(d, i) : i.isMeshPhysicalMaterial ? U(d, i) : i.isMeshStandardMaterial ? O(d, i) : i.isMeshDepthMaterial ? i.displacementMap && (d.displacementMap.value = i.displacementMap, d.displacementScale.value = i.displacementScale, d.displacementBias.value = i.displacementBias) : i.isMeshNormalMaterial && D(d, i), void 0 !== d.ltcMat && (d.ltcMat.value = t.UniformsLib.LTC_MAT_TEXTURE), void 0 !== d.ltcMag && (d.ltcMag.value = t.UniformsLib.LTC_MAG_TEXTURE), X.upload(Jt, o.uniformsList, d, ht)), l.set(Jt, r, "modelViewMatrix"), l.set(Jt, r, "normalMatrix"), l.setValue(Jt, "modelMatrix", r.matrixWorld), h
			}
			function S(t, e) {
				t.opacity.value = e.opacity, t.diffuse.value = e.color, e.emissive && t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity), t.map.value = e.map, t.specularMap.value = e.specularMap, t.alphaMap.value = e.alphaMap, e.lightMap && (t.lightMap.value = e.lightMap, t.lightMapIntensity.value = e.lightMapIntensity), e.aoMap && (t.aoMap.value = e.aoMap, t.aoMapIntensity.value = e.aoMapIntensity);var n;
				if (e.map ? n = e.map : e.specularMap ? n = e.specularMap : e.displacementMap ? n = e.displacementMap : e.normalMap ? n = e.normalMap : e.bumpMap ? n = e.bumpMap : e.roughnessMap ? n = e.roughnessMap : e.metalnessMap ? n = e.metalnessMap : e.alphaMap ? n = e.alphaMap : e.emissiveMap && (n = e.emissiveMap), void 0 != n) {
					n.isWebGLRenderTarget && (n = n.texture);
					var i = n.offset,
						r = n.repeat;
					t.offsetRepeat.value.set(i.x, i.y, r.x, r.y)
				}
				t.envMap.value = e.envMap, t.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1, t.reflectivity.value = e.reflectivity, t.refractionRatio.value = e.refractionRatio
			}
			function T(t, e) {
				t.diffuse.value = e.color, t.opacity.value = e.opacity
			}
			function A(t, e) {
				t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
			}
			function P(t, e) {
				if (t.diffuse.value = e.color, t.opacity.value = e.opacity, t.size.value = e.size * Tt, t.scale.value = .5 * St, t.map.value = e.map, null !== e.map) {
					var n = e.map.offset,
						i = e.map.repeat;
					t.offsetRepeat.value.set(n.x, n.y, i.x, i.y)
				}
			}
			function L(t, e) {
				t.fogColor.value = e.color, e.isFog ? (t.fogNear.value = e.near, t.fogFar.value = e.far) : e.isFogExp2 && (t.fogDensity.value = e.density)
			}
			function R(t, e) {
				e.emissiveMap && (t.emissiveMap.value = e.emissiveMap)
			}
			function C(t, e) {
				t.specular.value = e.specular, t.shininess.value = Math.max(e.shininess, 1e-4), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
			}
			function I(t, e) {
				C(t, e), e.gradientMap && (t.gradientMap.value = e.gradientMap)
			}
			function O(t, e) {
				t.roughness.value = e.roughness, t.metalness.value = e.metalness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap), e.metalnessMap && (t.metalnessMap.value = e.metalnessMap), e.emissiveMap && (t.emissiveMap.value = e.emissiveMap), e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias), e.envMap && (t.envMapIntensity.value = e.envMapIntensity)
			}
			function U(t, e) {
				t.clearCoat.value = e.clearCoat, t.clearCoatRoughness.value = e.clearCoatRoughness, O(t, e)
			}
			function D(t, e) {
				e.bumpMap && (t.bumpMap.value = e.bumpMap, t.bumpScale.value = e.bumpScale), e.normalMap && (t.normalMap.value = e.normalMap, t.normalScale.value.copy(e.normalScale)), e.displacementMap && (t.displacementMap.value = e.displacementMap, t.displacementScale.value = e.displacementScale, t.displacementBias.value = e.displacementBias)
			}
			function B(t, e) {
				t.ambientLightColor.needsUpdate = e, t.directionalLights.needsUpdate = e, t.pointLights.needsUpdate = e, t.spotLights.needsUpdate = e, t.rectAreaLights.needsUpdate = e, t.hemisphereLights.needsUpdate = e
			}
			function N(t) {
				for (var e = 0, n = 0, i = t.length; n < i; n++) {
					var r = t[n];
					r.castShadow && (Yt.shadows[e++] = r)
				}
				Yt.shadows.length = e
			}
			function F(t, e) {
				var n,
					i,
					r,
					o,
					a,
					s,
					c,
					u = 0,
					h = 0,
					d = 0,
					p = e.matrixWorldInverse,
					f = 0,
					m = 0,
					v = 0,
					g = 0,
					y = 0;
				for (n = 0, i = t.length; n < i; n++)
					if (r = t[n], o = r.color, a = r.intensity, s = r.distance, c = r.shadow && r.shadow.map ? r.shadow.map.texture : null, r.isAmbientLight) u += o.r * a, h += o.g * a, d += o.b * a;
					else if (r.isDirectionalLight) {
						var x = pe.get(r);
						x.color.copy(r.color).multiplyScalar(r.intensity), x.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), x.direction.sub(Wt), x.direction.transformDirection(p), x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.directionalShadowMap[f] = c, Yt.directionalShadowMatrix[f] = r.shadow.matrix, Yt.directional[f++] = x
					} else if (r.isSpotLight) {
						var x = pe.get(r);
						x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(p), x.color.copy(o).multiplyScalar(a), x.distance = s, x.direction.setFromMatrixPosition(r.matrixWorld), Wt.setFromMatrixPosition(r.target.matrixWorld), x.direction.sub(Wt), x.direction.transformDirection(p), x.coneCos = Math.cos(r.angle), x.penumbraCos = Math.cos(r.angle * (1 - r.penumbra)), x.decay = 0 === r.distance ? 0 : r.decay, x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.spotShadowMap[v] = c, Yt.spotShadowMatrix[v] = r.shadow.matrix, Yt.spot[v++] = x
					} else if (r.isRectAreaLight) {
						var x = pe.get(r);
						x.color.copy(o).multiplyScalar(a / (r.width * r.height)), x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(p), qt.identity(), Xt.copy(r.matrixWorld), Xt.premultiply(p), qt.extractRotation(Xt), x.halfWidth.set(.5 * r.width, 0, 0), x.halfHeight.set(0, .5 * r.height, 0), x.halfWidth.applyMatrix4(qt), x.halfHeight.applyMatrix4(qt), Yt.rectArea[g++] = x
					} else if (r.isPointLight) {
						var x = pe.get(r);
						x.position.setFromMatrixPosition(r.matrixWorld), x.position.applyMatrix4(p),
						x.color.copy(r.color).multiplyScalar(r.intensity), x.distance = r.distance, x.decay = 0 === r.distance ? 0 : r.decay, x.shadow = r.castShadow, r.castShadow && (x.shadowBias = r.shadow.bias, x.shadowRadius = r.shadow.radius, x.shadowMapSize = r.shadow.mapSize), Yt.pointShadowMap[m] = c, void 0 === Yt.pointShadowMatrix[m] && (Yt.pointShadowMatrix[m] = new l), Wt.setFromMatrixPosition(r.matrixWorld).negate(), Yt.pointShadowMatrix[m].identity().setPosition(Wt), Yt.point[m++] = x
					} else if (r.isHemisphereLight) {
						var x = pe.get(r);
						x.direction.setFromMatrixPosition(r.matrixWorld), x.direction.transformDirection(p), x.direction.normalize(), x.skyColor.copy(r.color).multiplyScalar(a), x.groundColor.copy(r.groundColor).multiplyScalar(a), Yt.hemi[y++] = x
				}
				Yt.ambient[0] = u, Yt.ambient[1] = h, Yt.ambient[2] = d, Yt.directional.length = f, Yt.spot.length = v, Yt.rectArea.length = g, Yt.point.length = m, Yt.hemi.length = y, Yt.hash = f + "," + m + "," + v + "," + g + "," + y + "," + Yt.shadows.length
			}
			function z(t) {
				var e;
				if (t === Ho) return Jt.REPEAT;
				if (t === jo) return Jt.CLAMP_TO_EDGE;
				if (t === Vo) return Jt.MIRRORED_REPEAT;
				if (t === Xo) return Jt.NEAREST;
				if (t === qo) return Jt.NEAREST_MIPMAP_NEAREST;
				if (t === Yo) return Jt.NEAREST_MIPMAP_LINEAR;
				if (t === Zo) return Jt.LINEAR;
				if (t === Jo) return Jt.LINEAR_MIPMAP_NEAREST;
				if (t === Ko) return Jt.LINEAR_MIPMAP_LINEAR;
				if (t === $o) return Jt.UNSIGNED_BYTE;
				if (t === sa) return Jt.UNSIGNED_SHORT_4_4_4_4;
				if (t === ca) return Jt.UNSIGNED_SHORT_5_5_5_1;
				if (t === ua) return Jt.UNSIGNED_SHORT_5_6_5;
				if (t === ta) return Jt.BYTE;
				if (t === ea) return Jt.SHORT;
				if (t === na) return Jt.UNSIGNED_SHORT;
				if (t === ia) return Jt.INT;
				if (t === ra) return Jt.UNSIGNED_INT;
				if (t === oa) return Jt.FLOAT;
				if (t === aa && (e = $t.get("OES_texture_half_float"), null !== e)) return e.HALF_FLOAT_OES;
				if (t === la) return Jt.ALPHA;
				if (t === da) return Jt.RGB;
				if (t === pa) return Jt.RGBA;
				if (t === fa) return Jt.LUMINANCE;
				if (t === ma) return Jt.LUMINANCE_ALPHA;
				if (t === va) return Jt.DEPTH_COMPONENT;
				if (t === ga) return Jt.DEPTH_STENCIL;
				if (t === to) return Jt.FUNC_ADD;
				if (t === eo) return Jt.FUNC_SUBTRACT;
				if (t === no) return Jt.FUNC_REVERSE_SUBTRACT;
				if (t === oo) return Jt.ZERO;
				if (t === ao) return Jt.ONE;
				if (t === so) return Jt.SRC_COLOR;
				if (t === co) return Jt.ONE_MINUS_SRC_COLOR;
				if (t === uo) return Jt.SRC_ALPHA;
				if (t === ho) return Jt.ONE_MINUS_SRC_ALPHA;
				if (t === lo) return Jt.DST_ALPHA;
				if (t === po) return Jt.ONE_MINUS_DST_ALPHA;
				if (t === fo) return Jt.DST_COLOR;
				if (t === mo) return Jt.ONE_MINUS_DST_COLOR;
				if (t === vo) return Jt.SRC_ALPHA_SATURATE;
				if ((t === ya || t === xa || t === ba || t === _a) && (e = $t.get("WEBGL_compressed_texture_s3tc"), null !== e)) {
					if (t === ya) return e.COMPRESSED_RGB_S3TC_DXT1_EXT;
					if (t === xa) return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;
					if (t === ba) return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;
					if (t === _a) return e.COMPRESSED_RGBA_S3TC_DXT5_EXT
				}
				if ((t === wa || t === Ma || t === Ea || t === Sa) && (e = $t.get("WEBGL_compressed_texture_pvrtc"), null !== e)) {
					if (t === wa) return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
					if (t === Ma) return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
					if (t === Ea) return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
					if (t === Sa) return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
				}
				if (t === Ta && (e = $t.get("WEBGL_compressed_texture_etc1"), null !== e)) return e.COMPRESSED_RGB_ETC1_WEBGL;
				if ((t === io || t === ro) && (e = $t.get("EXT_blend_minmax"), null !== e)) {
					if (t === io) return e.MIN_EXT;
					if (t === ro) return e.MAX_EXT
				}
				return t === ha && (e = $t.get("WEBGL_depth_texture"), null !== e) ? e.UNSIGNED_INT_24_8_WEBGL : 0
			}
			console.log("THREE.WebGLRenderer", Cr), e = e || {};var G = void 0 === e.canvas ? document.createElementNS("http://www.w3.org/1999/xhtml", "canvas") : e.canvas,
				k = void 0 === e.context ? null : e.context,
				H = void 0 !== e.alpha && e.alpha,
				j = !(void 0 !== e.depth) || e.depth,
				V = !(void 0 !== e.stencil) || e.stencil,
				W = void 0 !== e.antialias && e.antialias,
				Y = !(void 0 !== e.premultipliedAlpha) || e.premultipliedAlpha,
				Z = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
				Q = [],
				tt = [],
				et = -1,
				it = [],
				rt = -1,
				st = new Float32Array(8),
				ct = [],
				ut = [];
			this.domElement = G, this.context = null, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.gammaFactor = 2, this.gammaInput = !1, this.gammaOutput = !1, this.physicallyCorrectLights = !1, this.toneMapping = Lo, this.toneMappingExposure = 1, this.toneMappingWhitePoint = 1, this.maxMorphTargets = 8, this.maxMorphNormals = 4;var ht = this,
				lt = null,
				dt = null,
				pt = null,
				mt = -1,
				vt = "",
				gt = null,
				yt = new a,
				xt = null,
				bt = new a,
				_t = 0,
				wt = new q(0),
				Mt = 0,
				Et = G.width,
				St = G.height,
				Tt = 1,
				At = new a(0, 0, Et, St),
				It = !1,
				Ft = new a(0, 0, Et, St),
				zt = new ot,
				Gt = new ae,
				kt = !1,
				Ht = !1,
				jt = new nt,
				Vt = new l,
				Wt = new h,
				Xt = new l,
				qt = new l,
				Yt = {
					hash : "",
					ambient : [ 0, 0, 0 ],
					directional : [],
					directionalShadowMap : [],
					directionalShadowMatrix : [],
					spot : [],
					spotShadowMap : [],
					spotShadowMatrix : [],
					rectArea : [],
					point : [],
					pointShadowMap : [],
					pointShadowMatrix : [],
					hemi : [],
					shadows : []
				},
				Zt = {
					calls : 0,
					vertices : 0,
					faces : 0,
					points : 0
				};
			this.info = {
				render : Zt,
				memory : {
					geometries : 0,
					textures : 0
				},
				programs : null
			};var Jt;
			try {
				var Kt = {
					alpha : H,
					depth : j,
					stencil : V,
					antialias : W,
					premultipliedAlpha : Y,
					preserveDrawingBuffer : Z
				};
				if (Jt = k || G.getContext("webgl", Kt) || G.getContext("experimental-webgl", Kt), null === Jt)
					throw null !== G.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
				void 0 === Jt.getShaderPrecisionFormat && (Jt.getShaderPrecisionFormat = function() {
					return {
						rangeMin : 1,
						rangeMax : 1,
						precision : 1
					}
				}), G.addEventListener("webglcontextlost", o, !1)
			} catch (t) {
				console.error("THREE.WebGLRenderer: " + t)
			} var $t = new oe(Jt);
			$t.get("WEBGL_depth_texture"), $t.get("OES_texture_float"), $t.get("OES_texture_float_linear"), $t.get("OES_texture_half_float"), $t.get("OES_texture_half_float_linear"), $t.get("OES_standard_derivatives"), $t.get("ANGLE_instanced_arrays"), $t.get("OES_element_index_uint") && (Pt.MaxIndex = 4294967296);var se = new re(Jt, $t, e),
				ce = new ie(Jt, $t, z),
				ue = new ne,
				he = new ee(Jt, $t, ce, ue, se, z, this.info),
				le = new te(Jt, ue, this.info),
				de = new Qt(this, se),
				pe = new Nt;
			this.info.programs = de.programs;var fe = new Bt(Jt, $t, Zt),
				me = new Dt(Jt, $t, Zt),
				ve = new Ut(-1, 1, 1, -1, 0, 1),
				ge = new Ot,
				ye = new Lt(new Ct(2, 2), new ft({
					depthTest : !1,
					depthWrite : !1,
					fog : !1
				})),
				xe = os.cube,
				be = new Lt(new Rt(5, 5, 5), new $({
					uniforms : xe.uniforms,
					vertexShader : xe.vertexShader,
					fragmentShader : xe.fragmentShader,
					side : Gr,
					depthTest : !1,
					depthWrite : !1,
					fog : !1
				}));
			i(), this.context = Jt, this.capabilities = se, this.extensions = $t, this.properties = ue, this.state = ce;var _e = new at(this, Yt, le, se);
			this.shadowMap = _e;var we = new K(this, ct),
				Me = new J(this, ut);
			this.getContext = function() {
				return Jt
			}, this.getContextAttributes = function() {
				return Jt.getContextAttributes()
			}, this.forceContextLoss = function() {
				$t.get("WEBGL_lose_context").loseContext()
			}, this.getMaxAnisotropy = function() {
				return se.getMaxAnisotropy()
			}, this.getPrecision = function() {
				return se.precision
			}, this.getPixelRatio = function() {
				return Tt
			}, this.setPixelRatio = function(t) {
				void 0 === t || (Tt = t, this.setSize(Ft.z, Ft.w, !1))
			}, this.getSize = function() {
				return {
					width : Et,
					height : St
				}
			}, this.setSize = function(t, e, n) {
				Et = t, St = e, G.width = t * Tt, G.height = e * Tt, !1 !== n && (G.style.width = t + "px", G.style.height = e + "px"), this.setViewport(0, 0, t, e)
			}, this.setViewport = function(t, e, n, i) {
				ce.viewport(Ft.set(t, e, n, i))
			}, this.setScissor = function(t, e, n, i) {
				ce.scissor(At.set(t, e, n, i))
			}, this.setScissorTest = function(t) {
				ce.setScissorTest(It = t)
			}, this.getClearColor = function() {
				return wt
			}, this.setClearColor = function(t, e) {
				wt.set(t), Mt = void 0 === e ? 1 : e, ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Y)
			}, this.getClearAlpha = function() {
				return Mt
			}, this.setClearAlpha = function(t) {
				Mt = t, ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Y)
			}, this.clear = function(t, e, n) {
				var i = 0;
				(void 0 === t || t) && (i |= Jt.COLOR_BUFFER_BIT), (void 0 === e || e) && (i |= Jt.DEPTH_BUFFER_BIT), (void 0 === n || n) && (i |= Jt.STENCIL_BUFFER_BIT), Jt.clear(i)
			}, this.clearColor = function() {
				this.clear(!0, !1, !1)
			}, this.clearDepth = function() {
				this.clear(!1, !0, !1)
			}, this.clearStencil = function() {
				this.clear(!1, !1, !0)
			}, this.clearTarget = function(t, e, n, i) {
				this.setRenderTarget(t), this.clear(e, n, i)
			}, this.resetGLState = r, this.dispose = function() {
				it = [], rt = -1, tt = [], et = -1, G.removeEventListener("webglcontextlost", o, !1)
			}, this.renderBufferImmediate = function(t, e, n) {
				ce.initAttributes();
				var i = ue.get(t);
				t.hasPositions && !i.position && (i.position = Jt.createBuffer()), t.hasNormals && !i.normal && (i.normal = Jt.createBuffer()), t.hasUvs && !i.uv && (i.uv = Jt.createBuffer()), t.hasColors && !i.color && (i.color = Jt.createBuffer());
				var r = e.getAttributes();
				if (t.hasPositions && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.position), Jt.bufferData(Jt.ARRAY_BUFFER, t.positionArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.position), Jt.vertexAttribPointer(r.position, 3, Jt.FLOAT, !1, 0, 0)), t.hasNormals) {
					if (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.normal), !n.isMeshPhongMaterial && !n.isMeshStandardMaterial && !n.isMeshNormalMaterial && n.shading === Hr)
						for (var o = 0, a = 3 * t.count; o < a; o += 9) {
							var s = t.normalArray,
								c = (s[o + 0] + s[o + 3] + s[o + 6]) / 3,
								u = (s[o + 1] + s[o + 4] + s[o + 7]) / 3,
								h = (s[o + 2] + s[o + 5] + s[o + 8]) / 3;
							s[o + 0] = c, s[o + 1] = u, s[o + 2] = h, s[o + 3] = c, s[o + 4] = u, s[o + 5] = h, s[o + 6] = c, s[o + 7] = u, s[o + 8] = h
					}
					Jt.bufferData(Jt.ARRAY_BUFFER, t.normalArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.normal), Jt.vertexAttribPointer(r.normal, 3, Jt.FLOAT, !1, 0, 0)
				}
				t.hasUvs && n.map && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.uv), Jt.bufferData(Jt.ARRAY_BUFFER, t.uvArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.uv), Jt.vertexAttribPointer(r.uv, 2, Jt.FLOAT, !1, 0, 0)), t.hasColors && n.vertexColors !== Vr && (Jt.bindBuffer(Jt.ARRAY_BUFFER, i.color), Jt.bufferData(Jt.ARRAY_BUFFER, t.colorArray, Jt.DYNAMIC_DRAW), ce.enableAttribute(r.color), Jt.vertexAttribPointer(r.color, 3, Jt.FLOAT, !1, 0, 0)), ce.disableUnusedAttributes(), Jt.drawArrays(Jt.TRIANGLES, 0, t.count), t.count = 0
			}, this.renderBufferDirect = function(t, e, i, r, o, a) {
				M(r);
				var s = E(t, e, r, o),
					c = !1,
					u = i.id + "_" + s.id + "_" + r.wireframe;
				u != vt && (vt = u, c = !0);
				var h = o.morphTargetInfluences;
				if (void 0 !== h) {
					for (var l = [], f = 0, m = h.length; f < m; f++) {
						var v = h[f];
						l.push([ v, f ])
					}
					l.sort(p), 8 < l.length && (l.length = 8);
					for (var g = i.morphAttributes, f = 0, m = l.length; f < m; f++) {
						var v = l[f];
						if (st[f] = v[0], 0 !== v[0]) {
							var y = v[1];
							!0 === r.morphTargets && g.position && i.addAttribute("morphTarget" + f, g.position[y]), !0 === r.morphNormals && g.normal && i.addAttribute("morphNormal" + f, g.normal[y])
						} else !0 === r.morphTargets && i.removeAttribute("morphTarget" + f), !0 === r.morphNormals && i.removeAttribute("morphNormal" + f)
					}
					for (var f = l.length, x = st.length; f < x; f++) st[f] = 0;
					s.getUniforms().setValue(Jt, "morphTargetInfluences", st), c = !0
				}
				var y = i.index,
					b = i.attributes.position,
					_ = 1;
				!0 === r.wireframe && (y = le.getWireframeAttribute(i), _ = 2);
				var w;
				null === y ? w = fe : (w = me, w.setIndex(y)), c && (d(r, s, i), null !== y && Jt.bindBuffer(Jt.ELEMENT_ARRAY_BUFFER, le.getAttributeBuffer(y)));
				var S = 0;
				null === y ? void 0 !== b && (S = b.count) : S = y.count;
				var T = i.drawRange.start * _,
					A = i.drawRange.count * _,
					P = null === a ? 0 : a.start * _,
					L = null === a ? 1 / 0 : a.count * _,
					R = Math.max(T, P),
					C = Math.min(S, T + A, P + L) - 1,
					I = Math.max(0, C - R + 1);
				if (0 !== I) {
					if (o.isMesh)
						if (!0 === r.wireframe) ce.setLineWidth(r.wireframeLinewidth * n()), w.setMode(Jt.LINES);else switch (o.drawMode) {
							case Ba:
								w.setMode(Jt.TRIANGLES);
								break;case Na:
								w.setMode(Jt.TRIANGLE_STRIP);
								break;case Fa:
								w.setMode(Jt.TRIANGLE_FAN)
					}
					else if (o.isLine) {
						var O = r.linewidth;
						void 0 === O && (O = 1), ce.setLineWidth(O * n()), o.isLineSegments ? w.setMode(Jt.LINES) : w.setMode(Jt.LINE_STRIP)
					} else o.isPoints && w.setMode(Jt.POINTS);
					i && i.isInstancedBufferGeometry ? 0 < i.maxInstancedCount && w.renderInstances(i, R, I) : w.render(R, I)
				}
			}, this.render = function(t, e, n, i) {
				if (void 0 !== e && !0 !== e.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				vt = "", mt = -1, gt = null, !0 === t.autoUpdate && t.updateMatrixWorld(), null === e.parent && e.updateMatrixWorld(), e.matrixWorldInverse.getInverse(e.matrixWorld), Vt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), zt.setFromMatrix(Vt), Q.length = 0, et = -1, rt = -1, ct.length = 0, ut.length = 0, Ht = this.localClippingEnabled, kt = Gt.init(this.clippingPlanes, Ht, e), b(t, e), tt.length = et + 1, it.length = rt + 1, !0 === ht.sortObjects && (tt.sort(f), it.sort(m)), kt && Gt.beginShadows(), N(Q), _e.render(t, e), F(Q, e), kt && Gt.endShadows(), Zt.calls = 0, Zt.vertices = 0, Zt.faces = 0, Zt.points = 0, void 0 === n && (n = null), this.setRenderTarget(n);
				var r = t.background;
				if (null === r ? ce.buffers.color.setClear(wt.r, wt.g, wt.b, Mt, Y) : r && r.isColor && (ce.buffers.color.setClear(r.r, r.g, r.b, 1, Y), i = !0), (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), r && r.isCubeTexture ? (ge.projectionMatrix.copy(e.projectionMatrix), ge.matrixWorld.extractRotation(e.matrixWorld), ge.matrixWorldInverse.getInverse(ge.matrixWorld), be.material.uniforms.tCube.value = r, be.modelViewMatrix.multiplyMatrices(ge.matrixWorldInverse, be.matrixWorld), le.update(be), ht.renderBufferDirect(ge, null, be.geometry, be.material, be, null)) : r && r.isTexture && (ye.material.map = r, le.update(ye), ht.renderBufferDirect(ve, null, ye.geometry, ye.material, ye, null)), t.overrideMaterial) {
					var o = t.overrideMaterial;
					_(tt, t, e, o), _(it, t, e, o)
				} else ce.setBlending(qr), _(tt, t, e), _(it, t, e);
				we.render(t, e), Me.render(t, e, bt), n && he.updateRenderTargetMipmap(n), ce.setDepthTest(!0), ce.setDepthWrite(!0), ce.setColorWrite(!0)
			}, this.setFaceCulling = function(t, e) {
				ce.setCullFace(t), ce.setFlipSided(e === Br)
			}, this.allocTextureUnit = function() {
				var t = _t;
				return t >= se.maxTextures && console.warn("WebGLRenderer: trying to use " + t + " texture units while this GPU supports only " + se.maxTextures), _t += 1, t
			}, this.setTexture2D = (function() {
				var t = !1;
				return function(e, n) {
					e && e.isWebGLRenderTarget && (!t && (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), he.setTexture2D(e, n)
				}
			})(), this.setTexture = (function() {
				var t = !1;
				return function(e, n) {
					t || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), t = !0), he.setTexture2D(e, n)
				}
			})(), this.setTextureCube = (function() {
				var t = !1;
				return function(e, n) {
					e && e.isWebGLRenderTargetCube && (!t && (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), t = !0), e = e.texture), e && e.isCubeTexture || Array.isArray(e.image) && 6 === e.image.length ? he.setTextureCube(e, n) : he.setTextureCubeDynamic(e, n)
				}
			})(), this.getCurrentRenderTarget = function() {
				return dt
			}, this.setRenderTarget = function(t) {
				dt = t, t && void 0 === ue.get(t).__webglFramebuffer && he.setupRenderTarget(t);
				var e,
					n = t && t.isWebGLRenderTargetCube;
				if (t) {
					var i = ue.get(t);
					e = n ? i.__webglFramebuffer[t.activeCubeFace] : i.__webglFramebuffer, yt.copy(t.scissor), xt = t.scissorTest, bt.copy(t.viewport)
				} else e = null, yt.copy(At).multiplyScalar(Tt), xt = It, bt.copy(Ft).multiplyScalar(Tt);
				if (pt !== e && (Jt.bindFramebuffer(Jt.FRAMEBUFFER, e), pt = e), ce.scissor(yt), ce.setScissorTest(xt), ce.viewport(bt), n) {
					var r = ue.get(t.texture);
					Jt.framebufferTexture2D(Jt.FRAMEBUFFER, Jt.COLOR_ATTACHMENT0, Jt.TEXTURE_CUBE_MAP_POSITIVE_X + t.activeCubeFace, r.__webglTexture, t.activeMipMapLevel)
				}
			}, this.readRenderTargetPixels = function(t, e, n, i, r, o) {
				if (!1 === (t && t.isWebGLRenderTarget)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				var a = ue.get(t).__webglFramebuffer;
				if (a) {
					var s = !1;
					a !== pt && (Jt.bindFramebuffer(Jt.FRAMEBUFFER, a), s = !0);try {
						var c = t.texture,
							u = c.format,
							h = c.type;
						if (u !== pa && z(u) !== Jt.getParameter(Jt.IMPLEMENTATION_COLOR_READ_FORMAT)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						if (!(h === $o || z(h) === Jt.getParameter(Jt.IMPLEMENTATION_COLOR_READ_TYPE) || h === oa && ($t.get("OES_texture_float") || $t.get("WEBGL_color_buffer_float")) || h === aa && $t.get("EXT_color_buffer_half_float"))) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						Jt.checkFramebufferStatus(Jt.FRAMEBUFFER) === Jt.FRAMEBUFFER_COMPLETE ? 0 <= e && e <= t.width - i && 0 <= n && n <= t.height - r && Jt.readPixels(e, n, i, r, z(u), z(h), o) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")
					} finally {
						s && Jt.bindFramebuffer(Jt.FRAMEBUFFER, pt)
					}
				}
			}
		}
		function ce(t, e) {
			this.name = "", this.color = new q(t), this.density = void 0 === e ? 25e-5 : e
		}
		function ue(t, e, n) {
			this.name = "", this.color = new q(t), this.near = void 0 === e ? 1 : e, this.far = void 0 === n ? 1e3 : n
		}
		function he() {
			ht.call(this), this.type = "Scene", this.background = null, this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0
		}
		function le(t, e, n, i, r) {
			ht.call(this), this.lensFlares = [], this.positionScreen = new h, this.customUpdateCallback = void 0, void 0 !== t && this.add(t, e, n, i, r)
		}
		function de(t) {
			Q.call(this), this.type = "SpriteMaterial", this.color = new q(16777215), this.map = null, this.rotation = 0, this.fog = !1, this.lights = !1, this.setValues(t)
		}
		function pe(t) {
			ht.call(this), this.type = "Sprite", this.material = void 0 === t ? new de : t
		}
		function fe() {
			ht.call(this), this.type = "LOD", Object.defineProperties(this, {
				levels : {
					enumerable : !0,
					value : []
				}
			})
		}
		function me(t, e, n) {
			if (this.useVertexTexture = void 0 === n || n, this.identityMatrix = new l, t = t || [], this.bones = t.slice(0), this.useVertexTexture) {
				var i = Math.sqrt(4 * this.bones.length);
				i = Ya.nextPowerOfTwo(Math.ceil(i)), i = Math.max(i, 4), this.boneTextureWidth = i, this.boneTextureHeight = i, this.boneMatrices = new Float32Array(4 * (this.boneTextureWidth * this.boneTextureHeight)), this.boneTexture = new Y(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, pa, oa)
			} else
				this.boneMatrices = new Float32Array(16 * this.bones.length);
			if (void 0 === e) this.calculateInverses();
			else if (this.bones.length === e.length)
				this.boneInverses = e.slice(0);else {
				console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [];
				for (var r = 0, o = this.bones.length; r < o; r++) this.boneInverses.push(new l)
			}
		}
		function ve() {
			ht.call(this), this.type = "Bone"
		}
		function ge(t, e, n) {
			Lt.call(this, t, e), this.type = "SkinnedMesh", this.bindMode = "attached", this.bindMatrix = new l, this.bindMatrixInverse = new l;var i = [];
			if (this.geometry && void 0 !== this.geometry.bones) {
				for (var r, o, a = 0, s = this.geometry.bones.length; a < s; ++a) o = this.geometry.bones[a], r = new ve, i.push(r), r.name = o.name, r.position.fromArray(o.pos), r.quaternion.fromArray(o.rotq), void 0 !== o.scl && r.scale.fromArray(o.scl);
				for (var a = 0, s = this.geometry.bones.length; a < s; ++a) o = this.geometry.bones[a], -1 !== o.parent && null !== o.parent && void 0 !== i[o.parent] ? i[o.parent].add(i[a]) : this.add(i[a])
			}
			this.normalizeSkinWeights(), this.updateMatrixWorld(!0), this.bind(new me(i, void 0, n), this.matrixWorld)
		}
		function ye(t) {
			Q.call(this), this.type = "LineBasicMaterial", this.color = new q(16777215), this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.lights = !1, this.setValues(t)
		}
		function xe(t, e, n) {
			return 1 === n ? (console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new be(t, e)) : (ht.call(this), this.type = "Line", this.geometry = void 0 === t ? new Pt : t, void (this.material = void 0 === e ? new ye({
				color : 16777215 * Math.random()
			}) : e))
		}
		function be(t, e) {
			xe.call(this, t, e), this.type = "LineSegments"
		}
		function _e(t) {
			Q.call(this), this.type = "PointsMaterial", this.color = new q(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.lights = !1, this.setValues(t)
		}
		function we(t, e) {
			ht.call(this), this.type = "Points", this.geometry = void 0 === t ? new Pt : t, this.material = void 0 === e ? new _e({
				color : 16777215 * Math.random()
			}) : e
		}
		function Me() {
			ht.call(this), this.type = "Group"
		}
		function Ee(t, e, n, i, r, a, s, c, u) {
			function h() {
				requestAnimationFrame(h), t.readyState >= t.HAVE_CURRENT_DATA && (l.needsUpdate = !0)
			}
			o.call(this, t, e, n, i, r, a, s, c, u), this.generateMipmaps = !1;var l = this;
			h()
		}
		function Se(t, e, n, i, r, a, s, c, u, h, l, d) {
			o.call(this, null, a, s, c, u, h, i, r, l, d), this.image = {
				width : e,
				height : n
			}, this.mipmaps = t, this.flipY = !1, this.generateMipmaps = !1
		}
		function Te(t, e, n, i, r, a, s, c, u) {
			o.call(this, t, e, n, i, r, a, s, c, u), this.needsUpdate = !0
		}
		function Ae(t, e, n, i, r, a, s, c, u, h) {
			if (h = void 0 === h ? va : h, h !== va && h !== ga)
				throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
			void 0 === n && h === va && (n = na), void 0 === n && h === ga && (n = ha), o.call(this, null, i, r, a, s, c, h, n, u), this.image = {
				width : t,
				height : e
			}, this.magFilter = void 0 === s ? Xo : s, this.minFilter = void 0 === c ? Xo : c, this.flipY = !1, this.generateMipmaps = !1
		}
		function Pe(t) {
			function e(t, e) {
				return t - e
			}
			Pt.call(this);var n = [ 0, 0 ],
				i = {},
				r = [ "a", "b", "c" ];
			if (t && t.isGeometry) {
				for (var o = t.vertices, a = t.faces, s = 0, c = new Uint32Array(6 * a.length), u = 0, h = a.length; u < h; u++)
					for (var l = a[u], d = 0; 3 > d; d++) {
						n[0] = l[r[d]], n[1] = l[r[(d + 1) % 3]], n.sort(e);var p = n.toString();
						void 0 === i[p] && (c[2 * s] = n[0], c[2 * s + 1] = n[1], i[p] = !0, s++)
				}
				for (var f = new Float32Array(3 * (2 * s)), u = 0, h = s; u < h; u++)
					for (var d = 0; 2 > d; d++) {
						var m = o[c[2 * u + d]],
							v = 6 * u + 3 * d;
						f[v + 0] = m.x, f[v + 1] = m.y, f[v + 2] = m.z
				}
				this.addAttribute("position", new mt(f, 3))
			} else if (t && t.isBufferGeometry)
				if (null !== t.index) {
					var g = t.index.array,
						o = t.attributes.position,
						y = t.groups,
						s = 0;
					0 === y.length && t.addGroup(0, g.length);
					for (var c = new Uint32Array(2 * g.length), x = 0, b = y.length; x < b; ++x)
						for (var _ = y[x], w = _.start, M = _.count, u = w; u < w + M; u += 3)
							for (var d = 0; 3 > d; d++) {
								n[0] = g[u + d], n[1] = g[u + (d + 1) % 3], n.sort(e);var p = n.toString();
								void 0 === i[p] && (c[2 * s] = n[0], c[2 * s + 1] = n[1], i[p] = !0, s++)
					}
					for (var f = new Float32Array(3 * (2 * s)), u = 0, h = s; u < h; u++)
						for (var d = 0; 2 > d; d++) {
							var v = 6 * u + 3 * d,
								E = c[2 * u + d];
							f[v + 0] = o.getX(E), f[v + 1] = o.getY(E), f[v + 2] = o.getZ(E)
					}
					this.addAttribute("position", new mt(f, 3))
				} else {
					for (var o = t.attributes.position.array, s = o.length / 3, S = s / 3, f = new Float32Array(3 * (2 * s)), u = 0, h = S; u < h; u++)
						for (var d = 0; 3 > d; d++) {
							var v = 18 * u + 6 * d,
								T = 9 * u + 3 * d;
							f[v + 0] = o[T], f[v + 1] = o[T + 1], f[v + 2] = o[T + 2];var E = 9 * u + 3 * ((d + 1) % 3);
							f[v + 3] = o[E], f[v + 4] = o[E + 1], f[v + 5] = o[E + 2]
					}
					this.addAttribute("position", new mt(f, 3))
			}
		}
		function Le(t, e, n) {
			Pt.call(this), this.type = "ParametricBufferGeometry", this.parameters = {
				func : t,
				slices : e,
				stacks : n
			};var i,
				r,
				o,
				a,
				s,
				c = [],
				u = [],
				h = e + 1;
			for (i = 0; i <= n; i++)
				for (s = i / n, r = 0; r <= e; r++) a = r / e, o = t(a, s), c.push(o.x, o.y, o.z), u.push(a, s);
			var l,
				d,
				p,
				f,
				m = [];
			for (i = 0; i < n; i++)
				for (r = 0; r < e; r++) l = i * h + r, d = i * h + r + 1, p = (i + 1) * h + r + 1, f = (i + 1) * h + r, m.push(l, d, f), m.push(d, p, f);
			this.setIndex(new (65535 < m.length ? wt : bt)(m, 1)), this.addAttribute("position", new Mt(c, 3)), this.addAttribute("uv", new Mt(u, 2)), this.computeVertexNormals()
		}
		function Re(t, e, n) {
			Tt.call(this), this.type = "ParametricGeometry", this.parameters = {
				func : t,
				slices : e,
				stacks : n
			}, this.fromBufferGeometry(new Le(t, e, n)), this.mergeVertices()
		}
		function Ce(t, e, n, i) {
			function o(t, e, n, i) {
				var r,
					o,
					a = Math.pow(2, i),
					c = [];
				for (r = 0; r <= a; r++) {
					c[r] = [];var u = t.clone().lerp(n, r / a),
						h = e.clone().lerp(n, r / a),
						l = a - r;
					for (o = 0; o <= l; o++) c[r][o] = 0 === o && r === a ? u : u.clone().lerp(h, o / l)
				}
				for (r = 0; r < a; r++)
					for (o = 0; o < 2 * (a - r) - 1; o++) {
						var d = Math.floor(o / 2);
						0 == o % 2 ? (s(c[r][d + 1]), s(c[r + 1][d]), s(c[r][d])) : (s(c[r][d + 1]), s(c[r + 1][d + 1]), s(c[r + 1][d]))
				}
			}
			function a() {
				for (var t = 0; t < m.length; t += 6) {
					var e = m[t + 0],
						n = m[t + 2],
						i = m[t + 4],
						r = Math.max(e, n, i),
						o = Math.min(e, n, i);
					.9 < r && .1 > o && (.2 > e && (m[t + 0] += 1), .2 > n && (m[t + 2] += 1), .2 > i && (m[t + 4] += 1))
				}
			}
			function s(t) {
				f.push(t.x, t.y, t.z)
			}
			function c(e, n) {
				var i = 3 * e;
				n.x = t[i + 0], n.y = t[i + 1], n.z = t[i + 2]
			}
			function u() {
				for (var t = new h, e = new h, n = new h, i = new h, o = new r, a = new r, s = new r, c = 0, u = 0; c < f.length; c += 9, u += 6) {
					t.set(f[c + 0], f[c + 1], f[c + 2]), e.set(f[c + 3], f[c + 4], f[c + 5]), n.set(f[c + 6], f[c + 7], f[c + 8]), o.set(m[u + 0], m[u + 1]), a.set(m[u + 2], m[u + 3]), s.set(m[u + 4], m[u + 5]), i.copy(t).add(e).add(n).divideScalar(3);var p = d(i);
					l(o, u + 0, t, p), l(a, u + 2, e, p), l(s, u + 4, n, p)
				}
			}
			function l(t, e, n, i) {
				0 > i && 1 === t.x && (m[e] = t.x - 1), 0 === n.x && 0 === n.z && (m[e] = i / 2 / Math.PI + .5)
			}
			function d(t) {
				return Math.atan2(t.z, -t.x)
			}
			function p(t) {
				return Math.atan2(-t.y, Math.sqrt(t.x * t.x + t.z * t.z))
			}
			Pt.call(this), this.type = "PolyhedronBufferGeometry", this.parameters = {
				vertices : t,
				indices : e,
				radius : n,
				detail : i
			}, n = n || 1, i = i || 0;var f = [],
				m = [];
			!(function(t) {
				for (var n = new h, i = new h, r = new h, a = 0; a < e.length; a += 3) c(e[a + 0], n), c(e[a + 1], i), c(e[a + 2], r), o(n, i, r, t)
			})(i), (function(t) {
				for (var e = new h, n = 0; n < f.length; n += 3) e.x = f[n + 0], e.y = f[n + 1], e.z = f[n + 2], e.normalize().multiplyScalar(t), f[n + 0] = e.x, f[n + 1] = e.y, f[n + 2] = e.z
			})(n), (function() {
				for (var t = new h, e = 0; e < f.length; e += 3) {
					t.x = f[e + 0], t.y = f[e + 1], t.z = f[e + 2];var n = d(t) / 2 / Math.PI + .5,
						i = p(t) / Math.PI + .5;
					m.push(n, 1 - i)
				}
				u(), a()
			})(), this.addAttribute("position", new Mt(f, 3)), this.addAttribute("normal", new Mt(f.slice(), 3)), this.addAttribute("uv", new Mt(m, 2)), this.normalizeNormals(), this.boundingSphere = new nt(new h, n)
		}
		function Ie(t, e) {
			Ce.call(this, [ 1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1 ], [ 2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1 ], t, e), this.type = "TetrahedronBufferGeometry", this.parameters = {
				radius : t,
				detail : e
			}
		}
		function Oe(t, e) {
			Tt.call(this), this.type = "TetrahedronGeometry", this.parameters = {
				radius : t,
				detail : e
			}, this.fromBufferGeometry(new Ie(t, e)), this.mergeVertices()
		}
		function Ue(t, e) {
			Ce.call(this, [ 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1 ], [ 0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2 ], t, e), this.type = "OctahedronBufferGeometry", this.parameters = {
				radius : t,
				detail : e
			}
		}
		function De(t, e) {
			Tt.call(this), this.type = "OctahedronGeometry", this.parameters = {
				radius : t,
				detail : e
			}, this.fromBufferGeometry(new Ue(t, e)), this.mergeVertices()
		}
		function Be(t, e) {
			var n = (1 + Math.sqrt(5)) / 2;
			Ce.call(this, [ -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1 ], [ 0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1 ], t, e), this.type = "IcosahedronBufferGeometry", this.parameters = {
				radius : t,
				detail : e
			}
		}
		function Ne(t, e) {
			Tt.call(this), this.type = "IcosahedronGeometry", this.parameters = {
				radius : t,
				detail : e
			}, this.fromBufferGeometry(new Be(t, e)), this.mergeVertices()
		}
		function Fe(t, e) {
			var n = (1 + Math.sqrt(5)) / 2,
				i = 1 / n;
			Ce.call(this, [ -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, -i, -n, 0, -i, n, 0, i, -n, 0, i, n, 0, -n, 0, -i, n, 0, -i, -n, 0, i, n, 0, i ], [ 3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9 ], t, e), this.type = "DodecahedronBufferGeometry", this.parameters = {
				radius : t,
				detail : e
			}
		}
		function ze(t, e) {
			Tt.call(this), this.type = "DodecahedronGeometry", this.parameters = {
				radius : t,
				detail : e
			}, this.fromBufferGeometry(new Fe(t, e)), this.mergeVertices()
		}
		function Ge(t, e, n, i) {
			Tt.call(this), this.type = "PolyhedronGeometry", this.parameters = {
				vertices : t,
				indices : e,
				radius : n,
				detail : i
			}, this.fromBufferGeometry(new Ce(t, e, n, i)), this.mergeVertices()
		}
		function ke(t, e, n, i, o) {
			function a(r) {
				var o = t.getPointAt(r / e),
					a = u.normals[r],
					s = u.binormals[r];
				for (d = 0; d <= i; d++) {
					var c = 2 * (d / i * Math.PI),
						h = Math.sin(c),
						l = -Math.cos(c);
					f.x = l * a.x + h * s.x, f.y = l * a.y + h * s.y, f.z = l * a.z + h * s.z, f.normalize(), g.push(f.x, f.y, f.z), p.x = o.x + n * f.x, p.y = o.y + n * f.y, p.z = o.z + n * f.z, v.push(p.x, p.y, p.z)
				}
			}
			function s() {
				for (d = 1; d <= e; d++)
					for (l = 1; l <= i; l++) {
						var t = (i + 1) * (d - 1) + (l - 1),
							n = (i + 1) * d + (l - 1),
							r = (i + 1) * d + l,
							o = (i + 1) * (d - 1) + l;
						x.push(t, n, o), x.push(n, r, o)
				}
			}
			function c() {
				for (l = 0; l <= e; l++)
					for (d = 0; d <= i; d++) m.x = l / e, m.y = d / i, y.push(m.x, m.y)
			}
			Pt.call(this), this.type = "TubeBufferGeometry", this.parameters = {
				path : t,
				tubularSegments : e,
				radius : n,
				radialSegments : i,
				closed : o
			}, e = e || 64, n = n || 1, i = i || 8, o = o || !1;var u = t.computeFrenetFrames(e, o);
			this.tangents = u.tangents, this.normals = u.normals, this.binormals = u.binormals;var l,
				d,
				p = new h,
				f = new h,
				m = new r,
				v = [],
				g = [],
				y = [],
				x = [];
			!(function() {
				for (l = 0; l < e; l++) a(l);
				a(!1 === o ? e : 0), c(), s()
			})(), this.setIndex(new (65535 < x.length ? wt : bt)(x, 1)), this.addAttribute("position", new Mt(v, 3)), this.addAttribute("normal", new Mt(g, 3)), this.addAttribute("uv", new Mt(y, 2))
		}
		function He(t, e, n, i, r, o) {
			Tt.call(this), this.type = "TubeGeometry", this.parameters = {
				path : t,
				tubularSegments : e,
				radius : n,
				radialSegments : i,
				closed : r
			}, void 0 !== o && console.warn("THREE.TubeGeometry: taper has been removed.");var a = new ke(t, e, n, i, r);
			this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals, this.fromBufferGeometry(a), this.mergeVertices()
		}
		function je(t, e, n, i, o, a) {
			function s(t, e, n, i, r) {
				var o = Math.cos(t),
					a = Math.sin(t),
					s = n / e * t,
					c = Math.cos(s);
				r.x = .5 * (i * (2 + c)) * o, r.y = .5 * (i * (2 + c) * a), r.z = .5 * (i * Math.sin(s))
			}
			Pt.call(this), this.type = "TorusKnotBufferGeometry", this.parameters = {
				radius : t,
				tube : e,
				tubularSegments : n,
				radialSegments : i,
				p : o,
				q : a
			}, t = t || 100, e = e || 40, n = Math.floor(n) || 64, i = Math.floor(i) || 8, o = o || 2, a = a || 3;var c,
				u,
				l = (i + 1) * (n + 1),
				d = 3 * (2 * (i * n)),
				p = new mt(new (65535 < d ? Uint32Array : Uint16Array)(d), 1),
				f = new mt(new Float32Array(3 * l), 3),
				m = new mt(new Float32Array(3 * l), 3),
				v = new mt(new Float32Array(2 * l), 2),
				g = 0,
				y = 0,
				x = new h,
				b = new h,
				_ = new r,
				w = new h,
				M = new h,
				E = new h,
				S = new h,
				T = new h;
			for (c = 0; c <= n; ++c) {
				var A = 2 * (c / n * o * Math.PI);
				for (s(A, o, a, t, w), s(A + .01, o, a, t, M), S.subVectors(M, w), T.addVectors(M, w), E.crossVectors(S, T), T.crossVectors(E, S), E.normalize(), T.normalize(), u = 0; u <= i; ++u) {
					var P = 2 * (u / i * Math.PI),
						L = -e * Math.cos(P),
						R = e * Math.sin(P);
					x.x = w.x + (L * T.x + R * E.x), x.y = w.y + (L * T.y + R * E.y), x.z = w.z + (L * T.z + R * E.z), f.setXYZ(g, x.x, x.y, x.z), b.subVectors(x, w).normalize(), m.setXYZ(g, b.x, b.y, b.z), _.x = c / n, _.y = u / i, v.setXY(g, _.x, _.y), g++
				}
			}
			for (u = 1; u <= n; u++)
				for (c = 1; c <= i; c++) {
					var C = (i + 1) * (u - 1) + (c - 1),
						I = (i + 1) * u + (c - 1),
						O = (i + 1) * u + c,
						U = (i + 1) * (u - 1) + c;
					p.setX(y, C), y++, p.setX(y, I), y++, p.setX(y, U), y++, p.setX(y, I), y++, p.setX(y, O), y++, p.setX(y, U), y++
			}
			this.setIndex(p), this.addAttribute("position", f), this.addAttribute("normal", m), this.addAttribute("uv", v)
		}
		function Ve(t, e, n, i, r, o, a) {
			Tt.call(this), this.type = "TorusKnotGeometry", this.parameters = {
				radius : t,
				tube : e,
				tubularSegments : n,
				radialSegments : i,
				p : r,
				q : o
			}, void 0 !== a && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."), this.fromBufferGeometry(new je(t, e, n, i, r, o)), this.mergeVertices()
		}
		function We(t, e, n, i, r) {
			Pt.call(this), this.type = "TorusBufferGeometry", this.parameters = {
				radius : t,
				tube : e,
				radialSegments : n,
				tubularSegments : i,
				arc : r
			}, t = t || 100, e = e || 40, n = Math.floor(n) || 8, i = Math.floor(i) || 6, r = r || 2 * Math.PI;var o,
				a,
				s = (n + 1) * (i + 1),
				c = 3 * (2 * (n * i)),
				u = new (65535 < c ? Uint32Array : Uint16Array)(c),
				l = new Float32Array(3 * s),
				d = new Float32Array(3 * s),
				p = new Float32Array(2 * s),
				f = 0,
				m = 0,
				v = 0,
				g = new h,
				y = new h,
				x = new h;
			for (o = 0; o <= n; o++)
				for (a = 0; a <= i; a++) {
					var b = a / i * r,
						_ = 2 * (o / n * Math.PI);
					y.x = (t + e * Math.cos(_)) * Math.cos(b), y.y = (t + e * Math.cos(_)) * Math.sin(b), y.z = e * Math.sin(_), l[f] = y.x, l[f + 1] = y.y, l[f + 2] = y.z, g.x = t * Math.cos(b), g.y = t * Math.sin(b), x.subVectors(y, g).normalize(), d[f] = x.x, d[f + 1] = x.y, d[f + 2] = x.z, p[m] = a / i, p[m + 1] = o / n, f += 3, m += 2
			}
			for (o = 1; o <= n; o++)
				for (a = 1; a <= i; a++) {
					var w = (i + 1) * o + a - 1,
						M = (i + 1) * (o - 1) + a - 1,
						E = (i + 1) * (o - 1) + a,
						S = (i + 1) * o + a;
					u[v] = w, u[v + 1] = M, u[v + 2] = S, u[v + 3] = M, u[v + 4] = E, u[v + 5] = S, v += 6
			}
			this.setIndex(new mt(u, 1)), this.addAttribute("position", new mt(l, 3)), this.addAttribute("normal", new mt(d, 3)), this.addAttribute("uv", new mt(p, 2))
		}
		function Xe(t, e, n, i, r) {
			Tt.call(this), this.type = "TorusGeometry", this.parameters = {
				radius : t,
				tube : e,
				radialSegments : n,
				tubularSegments : i,
				arc : r
			}, this.fromBufferGeometry(new We(t, e, n, i, r))
		}
		function qe(t, e) {
			return "undefined" == typeof t ? void (t = []) : (Tt.call(this), this.type = "ExtrudeGeometry", t = Array.isArray(t) ? t : [ t ], this.addShapeList(t, e), void this.computeFaceNormals())
		}
		function Ye(t, e) {
			e = e || {};var n = e.font;
			if (!1 === (n && n.isFont)) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new Tt;
			var i = n.generateShapes(t, e.size, e.curveSegments);
			e.amount = void 0 === e.height ? 50 : e.height, void 0 === e.bevelThickness && (e.bevelThickness = 10), void 0 === e.bevelSize && (e.bevelSize = 8), void 0 === e.bevelEnabled && (e.bevelEnabled = !1), qe.call(this, i, e), this.type = "TextGeometry"
		}
		function Ze(t, e, n, i, r, o, a) {
			Pt.call(this), this.type = "SphereBufferGeometry", this.parameters = {
				radius : t,
				widthSegments : e,
				heightSegments : n,
				phiStart : i,
				phiLength : r,
				thetaStart : o,
				thetaLength : a
			}, t = t || 50, e = Math.max(3, Math.floor(e) || 8), n = Math.max(2, Math.floor(n) || 6), i = void 0 === i ? 0 : i, r = void 0 === r ? 2 * Math.PI : r, o = void 0 === o ? 0 : o, a = void 0 === a ? Math.PI : a;
			for (var s = o + a, c = (e + 1) * (n + 1), u = new mt(new Float32Array(3 * c), 3), l = new mt(new Float32Array(3 * c), 3), d = new mt(new Float32Array(2 * c), 2), p = 0, f = [], m = new h, v = 0; v <= n; v++) {
				for (var g = [], y = v / n, x = 0; x <= e; x++) {
					var b = x / e,
						_ = -t * Math.cos(i + b * r) * Math.sin(o + y * a),
						w = t * Math.cos(o + y * a),
						M = t * Math.sin(i + b * r) * Math.sin(o + y * a);
					m.set(_, w, M).normalize(), u.setXYZ(p, _, w, M), l.setXYZ(p, m.x, m.y, m.z), d.setXY(p, b, 1 - y), g.push(p), p++
				}
				f.push(g)
			}
			for (var E = [], v = 0; v < n; v++)
				for (var x = 0; x < e; x++) {
					var S = f[v][x + 1],
						T = f[v][x],
						A = f[v + 1][x],
						P = f[v + 1][x + 1];
					(0 !== v || 0 < o) && E.push(S, T, P), (v !== n - 1 || s < Math.PI) && E.push(T, A, P)
			}
			this.setIndex(new (65535 < u.count ? wt : bt)(E, 1)), this.addAttribute("position", u), this.addAttribute("normal", l), this.addAttribute("uv", d), this.boundingSphere = new nt(new h, t)
		}
		function Je(t, e, n, i, r, o, a) {
			Tt.call(this), this.type = "SphereGeometry", this.parameters = {
				radius : t,
				widthSegments : e,
				heightSegments : n,
				phiStart : i,
				phiLength : r,
				thetaStart : o,
				thetaLength : a
			}, this.fromBufferGeometry(new Ze(t, e, n, i, r, o, a))
		}
		function Ke(t, e, n, i, o, a) {
			Pt.call(this),
			this.type = "RingBufferGeometry", this.parameters = {
				innerRadius : t,
				outerRadius : e,
				thetaSegments : n,
				phiSegments : i,
				thetaStart : o,
				thetaLength : a
			}, t = t || 20, e = e || 50, o = void 0 === o ? 0 : o, a = void 0 === a ? 2 * Math.PI : a, n = void 0 === n ? 8 : Math.max(3, n), i = void 0 === i ? 1 : Math.max(1, i);var s,
				c,
				u,
				l = (n + 1) * (i + 1),
				d = 3 * (2 * (n * i)),
				p = new mt(new (65535 < d ? Uint32Array : Uint16Array)(d), 1),
				f = new mt(new Float32Array(3 * l), 3),
				m = new mt(new Float32Array(3 * l), 3),
				v = new mt(new Float32Array(2 * l), 2),
				g = 0,
				y = 0,
				x = t,
				b = (e - t) / i,
				_ = new h,
				w = new r;
			for (c = 0; c <= i; c++) {
				for (u = 0; u <= n; u++) s = o + u / n * a, _.x = x * Math.cos(s), _.y = x * Math.sin(s), f.setXYZ(g, _.x, _.y, _.z), m.setXYZ(g, 0, 0, 1), w.x = (_.x / e + 1) / 2, w.y = (_.y / e + 1) / 2, v.setXY(g, w.x, w.y), g++;
				x += b
			}
			for (c = 0; c < i; c++) {
				var M = c * (n + 1);
				for (u = 0; u < n; u++) {
					s = u + M;var E = s,
						S = s + n + 1,
						T = s + n + 2,
						A = s + 1;
					p.setX(y, E), y++, p.setX(y, S), y++, p.setX(y, T), y++, p.setX(y, E), y++, p.setX(y, T), y++, p.setX(y, A), y++
				}
			}
			this.setIndex(p), this.addAttribute("position", f), this.addAttribute("normal", m), this.addAttribute("uv", v)
		}
		function Qe(t, e, n, i, r, o) {
			Tt.call(this), this.type = "RingGeometry", this.parameters = {
				innerRadius : t,
				outerRadius : e,
				thetaSegments : n,
				phiSegments : i,
				thetaStart : r,
				thetaLength : o
			}, this.fromBufferGeometry(new Ke(t, e, n, i, r, o))
		}
		function $e(t, e, n, i) {
			Tt.call(this), this.type = "PlaneGeometry", this.parameters = {
				width : t,
				height : e,
				widthSegments : n,
				heightSegments : i
			}, this.fromBufferGeometry(new Ct(t, e, n, i))
		}
		function tn(t, e, n, i) {
			Pt.call(this), this.type = "LatheBufferGeometry", this.parameters = {
				points : t,
				segments : e,
				phiStart : n,
				phiLength : i
			}, e = Math.floor(e) || 12, n = n || 0, i = i || 2 * Math.PI, i = Ya.clamp(i, 0, 2 * Math.PI);var o,
				a,
				s,
				c = (e + 1) * t.length,
				u = 3 * (2 * (e * t.length)),
				l = new mt(new (65535 < u ? Uint32Array : Uint16Array)(u), 1),
				d = new mt(new Float32Array(3 * c), 3),
				p = new mt(new Float32Array(2 * c), 2),
				f = 0,
				m = 0,
				v = 1 / e,
				g = new h,
				y = new r;
			for (a = 0; a <= e; a++) {
				var x = n + a * v * i,
					b = Math.sin(x),
					_ = Math.cos(x);
				for (s = 0; s <= t.length - 1; s++) g.x = t[s].x * b, g.y = t[s].y, g.z = t[s].x * _, d.setXYZ(f, g.x, g.y, g.z), y.x = a / e, y.y = s / (t.length - 1), p.setXY(f, y.x, y.y), f++
			}
			for (a = 0; a < e; a++)
				for (s = 0; s < t.length - 1; s++) {
					o = s + a * t.length;var w = o,
						M = o + t.length,
						E = o + t.length + 1,
						S = o + 1;
					l.setX(m, w), m++, l.setX(m, M), m++, l.setX(m, S), m++, l.setX(m, M), m++, l.setX(m, E), m++, l.setX(m, S), m++
			}
			if (this.setIndex(l), this.addAttribute("position", d), this.addAttribute("uv", p), this.computeVertexNormals(), i === 2 * Math.PI) {
				var T = this.attributes.normal.array,
					A = new h,
					P = new h,
					L = new h;
				for (o = 3 * (e * t.length), a = 0, s = 0; a < t.length; a++, s += 3) A.x = T[s + 0], A.y = T[s + 1], A.z = T[s + 2], P.x = T[o + s + 0], P.y = T[o + s + 1], P.z = T[o + s + 2], L.addVectors(A, P).normalize(), T[s + 0] = T[o + s + 0] = L.x, T[s + 1] = T[o + s + 1] = L.y, T[s + 2] = T[o + s + 2] = L.z
			}
		}
		function en(t, e, n, i) {
			Tt.call(this), this.type = "LatheGeometry", this.parameters = {
				points : t,
				segments : e,
				phiStart : n,
				phiLength : i
			}, this.fromBufferGeometry(new tn(t, e, n, i)), this.mergeVertices()
		}
		function nn(t, e) {
			function n(t) {
				var n,
					s,
					u,
					h = i.length / 3,
					l = t.extractPoints(e),
					d = l.shape,
					p = l.holes;
				if (!1 === hs.isClockWise(d))
					for (d = d.reverse(), n = 0, s = p.length; n < s; n++) u = p[n], !0 === hs.isClockWise(u) && (p[n] = u.reverse());
				var f = hs.triangulateShape(d, p);
				for (n = 0, s = p.length; n < s; n++) u = p[n], d = d.concat(u);
				for (n = 0, s = d.length; n < s; n++) {
					var m = d[n];
					i.push(m.x, m.y, 0), r.push(0, 0, 1), o.push(m.x, m.y)
				}
				for (n = 0, s = f.length; n < s; n++) {
					var v = f[n],
						g = v[0] + h,
						y = v[1] + h,
						x = v[2] + h;
					a.push(g, y, x), c += 3
				}
			}
			Pt.call(this), this.type = "ShapeBufferGeometry", this.parameters = {
				shapes : t,
				curveSegments : e
			}, e = e || 12;var i = [],
				r = [],
				o = [],
				a = [],
				s = 0,
				c = 0;
			if (!1 === Array.isArray(t)) n(t);else
				for (var u = 0; u < t.length; u++) n(t[u]), this.addGroup(s, c, u), s += c, c = 0;
			this.setIndex(new (65535 < a.length ? wt : bt)(a, 1)), this.addAttribute("position", new Mt(i, 3)), this.addAttribute("normal", new Mt(r, 3)), this.addAttribute("uv", new Mt(o, 2))
		}
		function rn(t, e) {
			Tt.call(this), this.type = "ShapeGeometry", "object" == typeof e && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), e = e.curveSegments), this.parameters = {
				shapes : t,
				curveSegments : e
			}, this.fromBufferGeometry(new nn(t, e)), this.mergeVertices()
		}
		function on(t, e) {
			function n(t, e) {
				return t - e
			}
			Pt.call(this), e = void 0 === e ? 1 : e;var i,
				r = Math.cos(Ya.DEG2RAD * e),
				o = [ 0, 0 ],
				a = {},
				s = [ "a", "b", "c" ];
			t.isBufferGeometry ? (i = new Tt, i.fromBufferGeometry(t)) : i = t.clone(), i.mergeVertices(), i.computeFaceNormals();
			for (var c = i.vertices, u = i.faces, h = 0, l = u.length; h < l; h++)
				for (var d = u[h], p = 0; 3 > p; p++) {
					o[0] = d[s[p]], o[1] = d[s[(p + 1) % 3]], o.sort(n);var f = o.toString();
					void 0 === a[f] ? a[f] = {
						vert1 : o[0],
						vert2 : o[1],
						face1 : h,
						face2 : void 0
					} : a[f].face2 = h
			}
			var m = [];
			for (var f in a) {
				var v = a[f];
				if (void 0 === v.face2 || u[v.face1].normal.dot(u[v.face2].normal) <= r) {
					var g = c[v.vert1];
					m.push(g.x), m.push(g.y), m.push(g.z), g = c[v.vert2], m.push(g.x), m.push(g.y), m.push(g.z)
				}
			}
			this.addAttribute("position", new Mt(m, 3))
		}
		function an(t, e, n, i, o, a, s, c) {
			function u(n) {
				var o,
					a,
					u,
					d = new r,
					p = new h,
					f = 0,
					_ = !0 === n ? t : e,
					E = !0 === n ? 1 : -1;
				for (a = x, o = 1; o <= i; o++) v.setXYZ(x, 0, w * E, 0), g.setXYZ(x, 0, E, 0), d.x = .5, d.y = .5, y.setXY(x, d.x, d.y), x++;
				for (u = x, o = 0; o <= i; o++) {
					var S = o / i,
						T = S * c + s,
						A = Math.cos(T),
						P = Math.sin(T);
					p.x = _ * P, p.y = w * E, p.z = _ * A, v.setXYZ(x, p.x, p.y, p.z), g.setXYZ(x, 0, E, 0), d.x = .5 * A + .5, d.y = .5 * P * E + .5, y.setXY(x, d.x, d.y), x++
				}
				for (o = 0; o < i; o++) {
					var L = a + o,
						R = u + o;
					!0 === n ? (m.setX(b, R), b++, m.setX(b, R + 1), b++, m.setX(b, L), b++) : (m.setX(b, R + 1), b++, m.setX(b, R), b++, m.setX(b, L), b++), f += 3
				}
				l.addGroup(M, f, !0 === n ? 1 : 2), M += f
			}
			Pt.call(this), this.type = "CylinderBufferGeometry", this.parameters = {
				radiusTop : t,
				radiusBottom : e,
				height : n,
				radialSegments : i,
				heightSegments : o,
				openEnded : a,
				thetaStart : s,
				thetaLength : c
			};var l = this;
			t = void 0 === t ? 20 : t, e = void 0 === e ? 20 : e, n = void 0 === n ? 100 : n, i = Math.floor(i) || 8, o = Math.floor(o) || 1, a = void 0 !== a && a, s = void 0 === s ? 0 : s, c = void 0 === c ? 2 * Math.PI : c;var d = 0;
			!1 === a && (0 < t && d++, 0 < e && d++);var p = (function() {
					var t = (i + 1) * (o + 1);
					return !1 === a && (t += (i + 1) * d + i * d), t
				})(),
				f = (function() {
					var t = 3 * (2 * (i * o));
					return !1 === a && (t += 3 * (i * d)), t
				})(),
				m = new mt(new (65535 < f ? Uint32Array : Uint16Array)(f), 1),
				v = new mt(new Float32Array(3 * p), 3),
				g = new mt(new Float32Array(3 * p), 3),
				y = new mt(new Float32Array(2 * p), 2),
				x = 0,
				b = 0,
				_ = [],
				w = n / 2,
				M = 0;
			!(function() {
				var r,
					a,
					u = new h,
					d = new h,
					p = 0,
					f = (e - t) / n;
				for (a = 0; a <= o; a++) {
					var E = [],
						S = a / o,
						T = S * (e - t) + t;
					for (r = 0; r <= i; r++) {
						var A = r / i,
							P = A * c + s,
							L = Math.sin(P),
							R = Math.cos(P);
						d.x = T * L, d.y = -S * n + w, d.z = T * R, v.setXYZ(x, d.x, d.y, d.z), u.set(L, f, R).normalize(), g.setXYZ(x, u.x, u.y, u.z), y.setXY(x, A, 1 - S), E.push(x), x++
					}
					_.push(E)
				}
				for (r = 0; r < i; r++)
					for (a = 0; a < o; a++) {
						var C = _[a][r],
							I = _[a + 1][r],
							O = _[a + 1][r + 1],
							U = _[a][r + 1];
						m.setX(b, C), b++, m.setX(b, I), b++, m.setX(b, U), b++, m.setX(b, I), b++, m.setX(b, O), b++, m.setX(b, U), b++, p += 6
				}
				l.addGroup(M, p, 0), M += p
			})(), !1 === a && (0 < t && u(!0), 0 < e && u(!1)), this.setIndex(m), this.addAttribute("position", v), this.addAttribute("normal", g), this.addAttribute("uv", y)
		}
		function sn(t, e, n, i, r, o, a, s) {
			Tt.call(this), this.type = "CylinderGeometry", this.parameters = {
				radiusTop : t,
				radiusBottom : e,
				height : n,
				radialSegments : i,
				heightSegments : r,
				openEnded : o,
				thetaStart : a,
				thetaLength : s
			}, this.fromBufferGeometry(new an(t, e, n, i, r, o, a, s)), this.mergeVertices()
		}
		function cn(t, e, n, i, r, o, a) {
			sn.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeGeometry", this.parameters = {
				radius : t,
				height : e,
				radialSegments : n,
				heightSegments : i,
				openEnded : r,
				thetaStart : o,
				thetaLength : a
			}
		}
		function un(t, e, n, i, r, o, a) {
			an.call(this, 0, t, e, n, i, r, o, a), this.type = "ConeBufferGeometry", this.parameters = {
				radius : t,
				height : e,
				radialSegments : n,
				heightSegments : i,
				openEnded : r,
				thetaStart : o,
				thetaLength : a
			}
		}
		function hn(t, e, n, i) {
			Pt.call(this), this.type = "CircleBufferGeometry", this.parameters = {
				radius : t,
				segments : e,
				thetaStart : n,
				thetaLength : i
			}, t = t || 50, e = void 0 === e ? 8 : Math.max(3, e), n = void 0 === n ? 0 : n, i = void 0 === i ? 2 * Math.PI : i;var r = e + 2,
				o = new Float32Array(3 * r),
				a = new Float32Array(3 * r),
				s = new Float32Array(2 * r);
			a[2] = 1, s[0] = .5, s[1] = .5;
			for (var c = 0, u = 3, l = 2; c <= e; c++, u += 3, l += 2) {
				var d = n + c / e * i;
				o[u] = t * Math.cos(d), o[u + 1] = t * Math.sin(d), a[u + 2] = 1, s[l] = (o[u] / t + 1) / 2, s[l + 1] = (o[u + 1] / t + 1) / 2
			}
			for (var p = [], u = 1; u <= e; u++) p.push(u, u + 1, 0);
			this.setIndex(new mt(new Uint16Array(p), 1)), this.addAttribute("position", new mt(o, 3)), this.addAttribute("normal", new mt(a, 3)), this.addAttribute("uv", new mt(s, 2)), this.boundingSphere = new nt(new h, t)
		}
		function ln(t, e, n, i) {
			Tt.call(this), this.type = "CircleGeometry", this.parameters = {
				radius : t,
				segments : e,
				thetaStart : n,
				thetaLength : i
			}, this.fromBufferGeometry(new hn(t, e, n, i))
		}
		function dn(t, e, n, i, r, o) {
			Tt.call(this), this.type = "BoxGeometry", this.parameters = {
				width : t,
				height : e,
				depth : n,
				widthSegments : i,
				heightSegments : r,
				depthSegments : o
			}, this.fromBufferGeometry(new Rt(t, e, n, i, r, o)), this.mergeVertices()
		}
		function pn() {
			$.call(this, {
				uniforms : es.merge([ rs.lights, {
					opacity : {
						value : 1
					}
				} ]),
				vertexShader : ns.shadow_vert,
				fragmentShader : ns.shadow_frag
			}), this.lights = !0, this.transparent = !0, Object.defineProperties(this, {
				opacity : {
					enumerable : !0,
					get : function() {
						return this.uniforms.opacity.value
					},
					set : function(t) {
						this.uniforms.opacity.value = t
					}
				}
			})
		}
		function fn(t) {
			$.call(this, t), this.type = "RawShaderMaterial"
		}
		function mn(t) {
			this.uuid = Ya.generateUUID(), this.type = "MultiMaterial", this.materials = Array.isArray(t) ? t : [], this.visible = !0
		}
		function vn(t) {
			Q.call(this), this.defines = {
				STANDARD : ""
			}, this.type = "MeshStandardMaterial", this.color = new q(16777215), this.roughness = .5, this.metalness = .5, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new q(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new r(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
		}
		function gn(t) {
			vn.call(this), this.defines = {
				PHYSICAL : ""
			}, this.type = "MeshPhysicalMaterial", this.reflectivity = .5, this.clearCoat = 0, this.clearCoatRoughness = 0, this.setValues(t)
		}
		function yn(t) {
			Q.call(this), this.type = "MeshPhongMaterial", this.color = new q(16777215), this.specular = new q(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new q(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new r(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = So, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
		}
		function xn(t) {
			yn.call(this), this.defines = {
				TOON : ""
			}, this.type = "MeshToonMaterial", this.gradientMap = null, this.setValues(t)
		}
		function bn(t) {
			Q.call(this, t), this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new r(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
		}
		function _n(t) {
			Q.call(this), this.type = "MeshLambertMaterial", this.color = new q(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new q(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = So, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(t)
		}
		function wn(t) {
			Q.call(this), this.type = "LineDashedMaterial", this.color = new q(16777215), this.linewidth = 1, this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.lights = !1, this.setValues(t)
		}
		function Mn(t, e, n) {
			var i = this,
				r = !1,
				o = 0,
				a = 0;
			this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(t) {
				a++, 0 == r && void 0 !== i.onStart && i.onStart(t, o, a), r = !0
			}, this.itemEnd = function(t) {
				o++, void 0 !== i.onProgress && i.onProgress(t, o, a), o == a && (r = !1, void 0 !== i.onLoad && i.onLoad())
			}, this.itemError = function(t) {
				void 0 !== i.onError && i.onError(t)
			}
		}
		function En(t) {
			this.manager = void 0 === t ? fs : t
		}
		function Sn(t) {
			this.manager = void 0 === t ? fs : t, this._parser = null
		}
		function Tn(t) {
			this.manager = void 0 === t ? fs : t, this._parser = null
		}
		function An(t) {
			this.manager = void 0 === t ? fs : t
		}
		function Pn(t) {
			this.manager = void 0 === t ? fs : t
		}
		function Ln(t) {
			this.manager = void 0 === t ? fs : t
		}
		function Rn(t, e) {
			ht.call(this), this.type = "Light", this.color = new q(t), this.intensity = void 0 === e ? 1 : e, this.receiveShadow = void 0
		}
		function Cn(t, e, n) {
			Rn.call(this, t, n), this.type = "HemisphereLight", this.castShadow = void 0, this.position.copy(ht.DefaultUp), this.updateMatrix(), this.groundColor = new q(e)
		}
		function In(t) {
			this.camera = t, this.bias = 0, this.radius = 1, this.mapSize = new r(512, 512), this.map = null, this.matrix = new l
		}
		function On() {
			In.call(this, new Ot(50, 1, .5, 500))
		}
		function Un(t, e, n, i, r, o) {
			Rn.call(this, t, e), this.type = "SpotLight", this.position.copy(ht.DefaultUp), this.updateMatrix(), this.target = new ht, Object.defineProperty(this, "power", {
				get : function() {
					return this.intensity * Math.PI
				},
				set : function(t) {
					this.intensity = t / Math.PI
				}
			}), this.distance = void 0 === n ? 0 : n, this.angle = void 0 === i ? Math.PI / 3 : i, this.penumbra = void 0 === r ? 0 : r, this.decay = void 0 === o ? 1 : o, this.shadow = new On
		}
		function Dn(t, e, n, i) {
			Rn.call(this, t, e), this.type = "PointLight", Object.defineProperty(this, "power", {
				get : function() {
					return 4 * this.intensity * Math.PI
				},
				set : function(t) {
					this.intensity = t / (4 * Math.PI)
				}
			}), this.distance = void 0 === n ? 0 : n, this.decay = void 0 === i ? 1 : i, this.shadow = new In(new Ot(90, 1, .5, 500))
		}
		function Bn() {
			In.call(this, new Ut(-5, 5, 5, -5, .5, 500))
		}
		function Nn(t, e) {
			Rn.call(this, t, e), this.type = "DirectionalLight", this.position.copy(ht.DefaultUp), this.updateMatrix(), this.target = new ht, this.shadow = new Bn
		}
		function Fn(t, e) {
			Rn.call(this, t, e), this.type = "AmbientLight", this.castShadow = void 0
		}
		function zn(t, e, n, i) {
			this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 === i ? new e.constructor(n) : i, this.sampleValues = e, this.valueSize = n
		}
		function Gn(t, e, n, i) {
			zn.call(this, t, e, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0
		}
		function kn(t, e, n, i) {
			zn.call(this, t, e, n, i)
		}
		function Hn(t, e, n, i) {
			zn.call(this, t, e, n, i)
		}
		function jn(t, e, n, i) {
			if (void 0 === t)
				throw new Error("track name is undefined");
			if (void 0 === e || 0 === e.length)
				throw new Error("no keyframes in track named " + t);
			this.name = t, this.times = ms.convertArray(e, this.TimeBufferType), this.values = ms.convertArray(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation), this.validate(), this.optimize()
		}
		function Vn(t, e, n, i) {
			jn.call(this, t, e, n, i)
		}
		function Wn(t, e, n, i) {
			zn.call(this, t, e, n, i)
		}
		function Xn(t, e, n, i) {
			jn.call(this, t, e, n, i)
		}
		function qn(t, e, n, i) {
			jn.call(this, t, e, n, i)
		}
		function Yn(t, e, n, i) {
			jn.call(this, t, e, n, i)
		}
		function Zn(t, e, n) {
			jn.call(this, t, e, n)
		}
		function Jn(t, e, n, i) {
			jn.call(this, t, e, n, i)
		}
		function Kn() {
			jn.apply(this, arguments)
		}
		function Qn(t, e, n) {
			this.name = t, this.tracks = n, this.duration = void 0 === e ? -1 : e, this.uuid = Ya.generateUUID(), 0 > this.duration && this.resetDuration(), this.optimize()
		}
		function $n(t) {
			this.manager = void 0 === t ? fs : t, this.textures = {}
		}
		function ti(t) {
			this.manager = void 0 === t ? fs : t
		}
		function ei() {
			this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}
		}
		function ni(t) {
			"boolean" == typeof t && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), t = void 0), this.manager = void 0 === t ? fs : t, this.withCredentials = !1
		}
		function ii(t) {
			this.manager = void 0 === t ? fs : t, this.texturePath = ""
		}
		function ri() {
		}
		function oi(t, e) {
			this.v1 = t, this.v2 = e
		}
		function ai() {
			this.curves = [], this.autoClose = !1
		}
		function si(t, e, n, i, r, o, a, s) {
			this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = i, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = s || 0
		}
		function ci(t) {
			this.points = void 0 === t ? [] : t
		}
		function ui(t, e, n, i) {
			this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
		}
		function hi(t, e, n) {
			this.v0 = t, this.v1 = e, this.v2 = n
		}
		function li() {
			di.apply(this, arguments), this.holes = []
		}
		function di(t) {
			ai.call(this), this.currentPoint = new r, t && this.fromPoints(t)
		}
		function pi() {
			this.subPaths = [], this.currentPath = null
		}
		function fi(t) {
			this.data = t
		}
		function mi(t) {
			this.manager = void 0 === t ? fs : t
		}
		function vi(t) {
			this.manager = void 0 === t ? fs : t
		}
		function gi(t, e, n, i) {
			Rn.call(this, t, e), this.type = "RectAreaLight", this.position.set(0, 1, 0), this.updateMatrix(), this.width = void 0 === n ? 10 : n, this.height = void 0 === i ? 10 : i
		}
		function yi() {
			this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new Ot, this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new Ot, this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1
		}
		function xi(t, e, n) {
			ht.call(this), this.type = "CubeCamera";var i = 90,
				r = 1,
				o = new Ot(i, r, t, e);
			o.up.set(0, -1, 0), o.lookAt(new h(1, 0, 0)), this.add(o);var a = new Ot(i, r, t, e);
			a.up.set(0, -1, 0), a.lookAt(new h(-1, 0, 0)), this.add(a);var s = new Ot(i, r, t, e);
			s.up.set(0, 0, 1), s.lookAt(new h(0, 1, 0)), this.add(s);var u = new Ot(i, r, t, e);
			u.up.set(0, 0, -1), u.lookAt(new h(0, -1, 0)), this.add(u);var l = new Ot(i, r, t, e);
			l.up.set(0, -1, 0), l.lookAt(new h(0, 0, 1)), this.add(l);var d = new Ot(i, r, t, e);
			d.up.set(0, -1, 0), d.lookAt(new h(0, 0, -1)), this.add(d), this.renderTarget = new c(n, n, {
				format : da,
				magFilter : Zo,
				minFilter : Zo
			}), this.updateCubeMap = function(t, e) {
				null === this.parent && this.updateMatrixWorld();
				var n = this.renderTarget,
					i = n.texture.generateMipmaps;
				n.texture.generateMipmaps = !1, n.activeCubeFace = 0, t.render(e, o, n), n.activeCubeFace = 1, t.render(e, a, n), n.activeCubeFace = 2, t.render(e, s, n), n.activeCubeFace = 3, t.render(e, u, n), n.activeCubeFace = 4, t.render(e, l, n), n.texture.generateMipmaps = i, n.activeCubeFace = 5, t.render(e, d, n), t.setRenderTarget(null)
			}
		}
		function bi() {
			ht.call(this), this.type = "AudioListener", this.context = bs.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null
		}
		function _i(t) {
			ht.call(this), this.type = "Audio", this.context = t.context, this.gain = this.context.createGain(), this.gain.connect(t.getInput()), this.autoplay = !1, this.buffer = null, this.loop = !1, this.startTime = 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.sourceType = "empty", this.filters = []
		}
		function wi(t) {
			_i.call(this, t), this.panner = this.context.createPanner(), this.panner.connect(this.gain)
		}
		function Mi(t, e) {
			this.analyser = t.context.createAnalyser(), this.analyser.fftSize = void 0 === e ? 2048 : e, this.data = new Uint8Array(this.analyser.frequencyBinCount), t.getOutput().connect(this.analyser)
		}
		function Ei(t, e, n) {
			this.binding = t, this.valueSize = n;var i,
				r = Float64Array;
			"quaternion" === e ? i = this._slerp : "string" === e || "bool" === e ? (r = Array, i = this._select) : i = this._lerp, this.buffer = new r(4 * n), this._mixBufferRegion = i, this.cumulativeWeight = 0, this.useCount = 0, this.referenceCount = 0
		}
		function Si(t, e, n) {
			this.path = e, this.parsedPath = n || Si.parseTrackName(e), this.node = Si.findNode(t, this.parsedPath.nodeName) || t, this.rootNode = t
		}
		function Ti() {
			this.uuid = Ya.generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;var t = {};
			this._indicesByUUID = t;
			for (var e = 0, n = arguments.length; e !== n; ++e) t[arguments[e].uuid] = e;
			this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};var i = this;
			this.stats = {
				objects : {
					get total() {
						return i._objects.length
					},
					get inUse() {
						return this.total - i.nCachedObjects_
					}
				},
				get bindingsPerObject() {
					return i._bindings.length
				}
			}
		}
		function Ai(t, e, n) {
			this._mixer = t, this._clip = e, this._localRoot = n || null;
			for (var i = e.tracks, r = i.length, o = Array(r), a = {
						endingStart : Oa,
						endingEnd : Oa
					}, s = 0; s !== r; ++s) {
				var c = i[s].createInterpolant(null);
				o[s] = c, c.settings = a
			}
			this._interpolantSettings = a, this._interpolants = o, this._propertyBindings = Array(r), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._weightInterpolant = null, this.loop = Pa, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0
		}
		function Pi(t) {
			this._root = t, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1
		}
		function Li(t) {
			"string" == typeof t && (console.warn("THREE.Uniform: Type parameter is no longer needed."), t = arguments[1]), this.value = t
		}
		function Ri() {
			Pt.call(this), this.type = "InstancedBufferGeometry", this.maxInstancedCount = void 0
		}
		function Ci(t, e, n, i) {
			this.uuid = Ya.generateUUID(), this.data = t, this.itemSize = e, this.offset = n, this.normalized = !0 === i
		}
		function Ii(t, e) {
			this.uuid = Ya.generateUUID(), this.array = t, this.stride = e, this.count = void 0 === t ? 0 : t.length / e, this.dynamic = !1, this.updateRange = {
				offset : 0,
				count : -1
			}, this.onUploadCallback = function() {}, this.version = 0
		}
		function Oi(t, e, n) {
			Ii.call(this, t, e), this.meshPerAttribute = n || 1
		}
		function Ui(t, e, n) {
			mt.call(this, t, e), this.meshPerAttribute = n || 1
		}
		function Di(t, e, n, i) {
			this.ray = new st(t, e), this.near = n || 0, this.far = i || 1 / 0, this.params = {
				Mesh : {},
				Line : {},
				LOD : {},
				Points : {
					threshold : 1
				},
				Sprite : {}
			}, Object.defineProperties(this.params, {
				PointCloud : {
					get : function() {
						return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."), this.Points
					}
				}
			})
		}
		function Bi(t, e) {
			return t.distance - e.distance
		}
		function Ni(t, e, n, i) {
			if (!1 !== t.visible && (t.raycast(e, n), !0 === i))
				for (var r = t.children, o = 0, a = r.length; o < a; o++) Ni(r[o], e, n, !0)
		}
		function Fi(t) {
			this.autoStart = !(void 0 !== t) || t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1
		}
		function zi(t) {
			function e(t, e, n, i, r, o, a) {
				var s = .5 * (n - t),
					c = .5 * (i - e);
				return (2 * (e - n) + s + c) * a + (-3 * (e - n) - 2 * s - c) * o + s * r + e
			}
			this.points = t;var n,
				i,
				r,
				o,
				a,
				s,
				c,
				u,
				l,
				d = [],
				p = {
					x : 0,
					y : 0,
					z : 0
				};
			this.initFromArray = function(t) {
				this.points = [];
				for (var e = 0; e < t.length; e++) this.points[e] = {
						x : t[e][0],
						y : t[e][1],
						z : t[e][2]
				}
			}, this.getPoint = function(t) {
				return n = (this.points.length - 1) * t, i = Math.floor(n), r = n - i, d[0] = 0 === i ? i : i - 1, d[1] = i, d[2] = i > this.points.length - 2 ? this.points.length - 1 : i + 1, d[3] = i > this.points.length - 3 ? this.points.length - 1 : i + 2, s = this.points[d[0]], c = this.points[d[1]], u = this.points[d[2]], l = this.points[d[3]], o = r * r, a = r * o, p.x = e(s.x, c.x, u.x, l.x, r, o, a), p.y = e(s.y, c.y, u.y, l.y, r, o, a), p.z = e(s.z, c.z, u.z, l.z, r, o, a), p
			}, this.getControlPointsArray = function() {
				var t,
					e,
					n = this.points.length,
					i = [];
				for (t = 0; t < n; t++) e = this.points[t], i[t] = [ e.x, e.y, e.z ];
				return i
			}, this.getLength = function(t) {
				var e,
					n,
					i,
					r,
					o = 0,
					a = 0,
					s = 0,
					c = new h,
					u = new h,
					l = [],
					d = 0;
				for (l[0] = 0, t || (t = 100), i = this.points.length * t, c.copy(this.points[0]), e = 1; e < i; e++) n = e / i, r = this.getPoint(n), u.copy(r), d += u.distanceTo(c), c.copy(r), o = (this.points.length - 1) * n, a = Math.floor(o), a != s && (l[a] = d, s = a);
				return l[l.length] = d, {
						chunks : l,
						total : d
				}
			}, this.reparametrizeByArcLength = function(t) {
				var e,
					n,
					i,
					r,
					o,
					a,
					s,
					c,
					u = [],
					l = new h,
					d = this.getLength();
				for (u.push(l.copy(this.points[0]).clone()), e = 1; e < this.points.length; e++) {
					for (a = d.chunks[e] - d.chunks[e - 1], s = Math.ceil(t * a / d.total), r = (e - 1) / (this.points.length - 1), o = e / (this.points.length - 1), n = 1; n < s - 1; n++) i = r + n * (1 / s) * (o - r), c = this.getPoint(i), u.push(l.copy(c).clone());
					u.push(l.copy(this.points[e]).clone())
				}
				this.points = u
			}
		}
		function Gi(t, e, n) {
			return this.radius = void 0 === t ? 1 : t, this.phi = void 0 === e ? 0 : e, this.theta = void 0 === n ? 0 : n, this
		}
		function ki(t, e, n) {
			return this.radius = void 0 === t ? 1 : t, this.theta = void 0 === e ? 0 : e, this.y = void 0 === n ? 0 : n, this
		}
		function Hi(t, e) {
			Lt.call(this, t, e), this.animationsMap = {}, this.animationsList = [];var n = this.geometry.morphTargets.length,
				i = "__default";
			this.createAnimation(i, 0, n - 1, n / 1), this.setAnimationWeight(i, 1)
		}
		function ji(t) {
			ht.call(this), this.material = t, this.render = function() {}
		}
		function Vi(t, e, n, i) {
			this.object = t, this.size = void 0 === e ? 1 : e;var r = void 0 === n ? 16711680 : n,
				o = void 0 === i ? 1 : i,
				a = 0,
				s = this.object.geometry;
			s && s.isGeometry ? a = 3 * s.faces.length : s && s.isBufferGeometry && (a = s.attributes.normal.count);var c = new Pt,
				u = new Mt(3 * (2 * a), 3);
			c.addAttribute("position", u), be.call(this, c, new ye({
				color : r,
				linewidth : o
			})), this.matrixAutoUpdate = !1, this.update()
		}
		function Wi(t) {
			ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;
			for (var e = new Pt, n = [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1 ], i = 0, r = 1, o = 32; i < o; i++, r++) {
				var a = 2 * (i / o * Math.PI),
					s = 2 * (r / o * Math.PI);
				n.push(Math.cos(a), Math.sin(a), 1, Math.cos(s), Math.sin(s), 1)
			}
			e.addAttribute("position", new Mt(n, 3));var c = new ye({
				fog : !1
			});
			this.cone = new be(e, c), this.add(this.cone), this.update()
		}
		function Xi(t) {
			this.bones = this.getBoneList(t);
			for (var e = new Pt, n = [], i = [], r = new q(0, 0, 1), o = new q(0, 1, 0), a = 0; a < this.bones.length; a++) {
				var s = this.bones[a];
				s.parent && s.parent.isBone && (n.push(0, 0, 0), n.push(0, 0, 0), i.push(r.r, r.g, r.b), i.push(o.r, o.g, o.b))
			}
			e.addAttribute("position", new Mt(n, 3)), e.addAttribute("color", new Mt(i, 3));var c = new ye({
				vertexColors : Xr,
				depthTest : !1,
				depthWrite : !1,
				transparent : !0
			});
			be.call(this, e, c), this.root = t, this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.update()
		}
		function qi(t, e) {
			this.light = t, this.light.updateMatrixWorld();var n = new Ze(e, 4, 2),
				i = new ft({
					wireframe : !0,
					fog : !1
				});
			i.color.copy(this.light.color).multiplyScalar(this.light.intensity), Lt.call(this, n, i), this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1
		}
		function Yi(t) {
			ht.call(this), this.light = t, this.light.updateMatrixWorld();var e = new ft({
					color : t.color,
					fog : !1
				}),
				n = new ft({
					color : t.color,
					fog : !1,
					wireframe : !0
				}),
				i = new Pt;
			i.addAttribute("position", new mt(new Float32Array(18), 3)), this.add(new Lt(i, e)), this.add(new Lt(i, n)), this.update()
		}
		function Zi(t, e) {
			ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1;var n = new Ue(e);
			n.rotateY(.5 * Math.PI);var i = new ft({
					vertexColors : Xr,
					wireframe : !0
				}),
				r = n.getAttribute("position"),
				o = new Float32Array(3 * r.count);
			n.addAttribute("color", new mt(o, 3)), this.add(new Lt(n, i)), this.update()
		}
		function Ji(t, e, n, i) {
			t = t || 10, e = e || 10, n = new q(void 0 === n ? 4473924 : n), i = new q(void 0 === i ? 8947848 : i);
			for (var r = e / 2, o = 2 * t / e, a = [], s = [], c = 0, u = 0, h = -t; c <= e; c++, h += o) {
				a.push(-t, 0, h, t, 0, h), a.push(h, 0, -t, h, 0, t);var l = c === r ? n : i;
				l.toArray(s, u), u += 3, l.toArray(s, u), u += 3, l.toArray(s, u), u += 3, l.toArray(s, u), u += 3
			}
			var d = new Pt;
			d.addAttribute("position", new Mt(a, 3)), d.addAttribute("color", new Mt(s, 3));var p = new ye({
				vertexColors : Xr
			});
			be.call(this, d, p)
		}
		function Ki(t, e, n, i, r, o) {
			t = t || 10, e = e || 16, n = n || 8, i = i || 64, r = new q(void 0 === r ? 4473924 : r), o = new q(void 0 === o ? 8947848 : o);var a,
				s,
				c,
				u,
				h,
				l,
				d,
				p = [],
				f = [];
			for (u = 0; u <= e; u++) c = u / e * (2 * Math.PI), a = Math.sin(c) * t, s = Math.cos(c) * t, p.push(0, 0, 0), p.push(a, 0, s), d = 1 & u ? r : o, f.push(d.r, d.g, d.b), f.push(d.r, d.g, d.b);
			for (u = 0; u <= n; u++)
				for (d = 1 & u ? r : o, l = t - t / n * u, h = 0; h < i; h++) c = h / i * (2 * Math.PI), a = Math.sin(c) * l, s = Math.cos(c) * l, p.push(a, 0, s), f.push(d.r, d.g, d.b), c = (h + 1) / i * (2 * Math.PI), a = Math.sin(c) * l, s = Math.cos(c) * l, p.push(a, 0, s), f.push(d.r, d.g, d.b);
			var m = new Pt;
			m.addAttribute("position", new Mt(p, 3)), m.addAttribute("color", new Mt(f, 3));var v = new ye({
				vertexColors : Xr
			});
			be.call(this, m, v)
		}
		function Qi(t, e, n, i) {
			this.object = t, this.size = void 0 === e ? 1 : e;var r = void 0 === n ? 16776960 : n,
				o = void 0 === i ? 1 : i,
				a = 0,
				s = this.object.geometry;
			s && s.isGeometry ? a = s.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");var c = new Pt,
				u = new Mt(3 * (2 * a), 3);
			c.addAttribute("position", u), be.call(this, c, new ye({
				color : r,
				linewidth : o
			})), this.matrixAutoUpdate = !1, this.update()
		}
		function $i(t, e) {
			ht.call(this), this.light = t, this.light.updateMatrixWorld(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, void 0 === e && (e = 1);var n = new Pt;
			n.addAttribute("position", new Mt([ -e, e, 0, e, e, 0, e, -e, 0, -e, -e, 0, -e, e, 0 ], 3));var i = new ye({
				fog : !1
			});
			this.add(new xe(n, i)), n = new Pt, n.addAttribute("position", new Mt([ 0, 0, 0, 0, 0, 1 ], 3)), this.add(new xe(n, i)), this.update()
		}
		function tr(t) {
			function e(t, e, i) {
				n(t, i), n(e, i)
			}
			function n(t, e) {
				o.push(0, 0, 0), a.push(e.r, e.g, e.b), void 0 === s[t] && (s[t] = []), s[t].push(o.length / 3 - 1)
			}
			var i = new Pt,
				r = new ye({
					color : 16777215,
					vertexColors : Wr
				}),
				o = [],
				a = [],
				s = {},
				c = new q(16755200),
				u = new q(16711680),
				h = new q(43775),
				l = new q(16777215),
				d = new q(3355443);
			e("n1", "n2", c), e("n2", "n4", c), e("n4", "n3", c), e("n3", "n1", c), e("f1", "f2", c), e("f2", "f4", c), e("f4", "f3", c), e("f3", "f1", c), e("n1", "f1", c), e("n2", "f2", c), e("n3", "f3", c), e("n4", "f4", c), e("p", "n1", u), e("p", "n2", u), e("p", "n3", u), e("p", "n4", u), e("u1", "u2", h), e("u2", "u3", h), e("u3", "u1", h), e("c", "t", l), e("p", "c", d), e("cn1", "cn2", d), e("cn3", "cn4", d), e("cf1", "cf2", d), e("cf3", "cf4", d), i.addAttribute("position", new Mt(o, 3)), i.addAttribute("color", new Mt(a, 3)), be.call(this, i, r), this.camera = t, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = t.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = s, this.update()
		}
		function er(t, e) {
			void 0 === e && (e = 16776960);var n = new Uint16Array([ 0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7 ]),
				i = new Float32Array(24),
				r = new Pt;
			r.setIndex(new mt(n, 1)), r.addAttribute("position", new mt(i, 3)), be.call(this, r, new ye({
				color : e
			})), void 0 !== t && this.update(t)
		}
		function nr(t, e, n, i, r, o) {
			ht.call(this), void 0 === i && (i = 16776960), void 0 === n && (n = 1), void 0 === r && (r = .2 * n), void 0 === o && (o = .2 * r), this.position.copy(e), this.line = new xe(_s, new ye({
				color : i
			})), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Lt(ws, new ft({
				color : i
			})), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(t), this.setLength(n, r, o)
		}
		function ir(t) {
			t = t || 1;var e = [ 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t ],
				n = new Pt;
			n.addAttribute("position", new Mt(e, 3)), n.addAttribute("color", new Mt([ 1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1 ], 3));var i = new ye({
				vertexColors : Xr
			});
			be.call(this, n, i)
		}
		function rr(t, e, n, i, r, o) {
			si.call(this, t, e, n, n, i, r, o)
		}
		function or(t, e, n, i, r, o, a) {
			return console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."), new pt(t, e, n, r, o, a)
		}
		function ar(t) {
			return console.warn("THREE.MeshFaceMaterial has been renamed to THREE.MultiMaterial."), new mn(t)
		}
		function sr(t, e) {
			return console.warn("THREE.PointCloud has been renamed to THREE.Points."), new we(t, e)
		}
		function cr(t) {
			return console.warn("THREE.Particle has been renamed to THREE.Sprite."), new pe(t)
		}
		function ur(t, e) {
			return console.warn("THREE.ParticleSystem has been renamed to THREE.Points."), new we(t, e)
		}
		function hr(t) {
			return console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial."), new _e(t)
		}
		function lr(t) {
			return console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial."), new _e(t)
		}
		function dr(t) {
			return console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial."), new _e(t)
		}
		function pr(t, e, n) {
			return console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead."), new h(t, e, n)
		}
		function fr(t, e) {
			return console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead."), new mt(t, e).setDynamic(!0)
		}
		function mr(t, e) {
			return console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead."), new vt(t, e)
		}
		function vr(t, e) {
			return console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead."), new gt(t, e)
		}
		function gr(t, e) {
			return console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead."), new yt(t, e)
		}
		function yr(t, e) {
			return console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead."), new xt(t, e)
		}
		function xr(t, e) {
			return console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead."), new bt(t, e)
		}
		function br(t, e) {
			return console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead."), new _t(t, e)
		}
		function _r(t, e) {
			return console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead."), new wt(t, e)
		}
		function wr(t, e) {
			return console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead."), new Mt(t, e)
		}
		function Mr(t, e) {
			return console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead."), new Et(t, e)
		}
		function Er(t) {
			console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."), Ms.call(this, t), this.type = "catmullrom", this.closed = !0
		}
		function Sr(t, e) {
			return console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead."), new er(t, e)
		}
		function Tr(t, e) {
			return console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead."),
				new be(new on(t.geometry), new ye({
					color : void 0 === e ? 16777215 : e
				}))
		}
		function Ar(t, e) {
			return console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead."), new be(new Pe(t.geometry), new ye({
					color : void 0 === e ? 16777215 : e
				}))
		}
		function Pr(t) {
			return console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader."), new En(t)
		}
		function Lr() {
			console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."), this.projectVector = function(t, e) {
				console.warn("THREE.Projector: .projectVector() is now vector.project()."), t.project(e)
			}, this.unprojectVector = function(t, e) {
				console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), t.unproject(e)
			}, this.pickingRay = function() {
				console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
			}
		}
		function Rr() {
			console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"), this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), this.clear = function() {}, this.render = function() {}, this.setClearColor = function() {}, this.setSize = function() {}
		}
		Object.defineProperty(e, "__esModule", {
			value : !0
		}), n.d(e, "CylinderBufferGeometry", (function() {
			return an
		})), n.d(e, "WebGLRenderTargetCube", (function() {
			return c
		})), n.d(e, "WebGLRenderTarget", (function() {
			return s
		})), n.d(e, "WebGLRenderer", (function() {
			return se
		})), n.d(e, "ShaderLib", (function() {
			return os
		})), n.d(e, "UniformsLib", (function() {
			return rs
		})), n.d(e, "UniformsUtils", (function() {
			return es
		})), n.d(e, "ShaderChunk", (function() {
			return ns
		})), n.d(e, "FogExp2", (function() {
			return ce
		})), n.d(e, "Fog", (function() {
			return ue
		})), n.d(e, "Scene", (function() {
			return he
		})), n.d(e, "LensFlare", (function() {
			return le
		})), n.d(e, "Sprite", (function() {
			return pe
		})), n.d(e, "LOD", (function() {
			return fe
		})), n.d(e, "SkinnedMesh", (function() {
			return ge
		})), n.d(e, "Skeleton", (function() {
			return me
		})), n.d(e, "Bone", (function() {
			return ve
		})), n.d(e, "Mesh", (function() {
			return Lt
		})), n.d(e, "LineSegments", (function() {
			return be
		})), n.d(e, "Line", (function() {
			return xe
		})), n.d(e, "Points", (function() {
			return we
		})), n.d(e, "Group", (function() {
			return Me
		})), n.d(e, "VideoTexture", (function() {
			return Ee
		})), n.d(e, "DataTexture", (function() {
			return Y
		})), n.d(e, "CompressedTexture", (function() {
			return Se
		})), n.d(e, "CubeTexture", (function() {
			return d
		})), n.d(e, "CanvasTexture", (function() {
			return Te
		})), n.d(e, "DepthTexture", (function() {
			return Ae
		})), n.d(e, "Texture", (function() {
			return o
		})), n.d(e, "CompressedTextureLoader", (function() {
			return Sn
		})), n.d(e, "BinaryTextureLoader", (function() {
			return Tn
		})), n.d(e, "DataTextureLoader", (function() {
			return Tn
		})), n.d(e, "CubeTextureLoader", (function() {
			return Pn
		})), n.d(e, "TextureLoader", (function() {
			return Ln
		})), n.d(e, "ObjectLoader", (function() {
			return ii
		})), n.d(e, "MaterialLoader", (function() {
			return $n
		})), n.d(e, "BufferGeometryLoader", (function() {
			return ti
		})), n.d(e, "DefaultLoadingManager", (function() {
			return fs
		})), n.d(e, "LoadingManager", (function() {
			return Mn
		})), n.d(e, "JSONLoader", (function() {
			return ni
		})), n.d(e, "ImageLoader", (function() {
			return An
		})), n.d(e, "FontLoader", (function() {
			return mi
		})), n.d(e, "FileLoader", (function() {
			return En
		})), n.d(e, "Loader", (function() {
			return ei
		})), n.d(e, "Cache", (function() {
			return ps
		})), n.d(e, "AudioLoader", (function() {
			return vi
		})), n.d(e, "SpotLightShadow", (function() {
			return On
		})), n.d(e, "SpotLight", (function() {
			return Un
		})), n.d(e, "PointLight", (function() {
			return Dn
		})), n.d(e, "RectAreaLight", (function() {
			return gi
		})), n.d(e, "HemisphereLight", (function() {
			return Cn
		})), n.d(e, "DirectionalLightShadow", (function() {
			return Bn
		})), n.d(e, "DirectionalLight", (function() {
			return Nn
		})), n.d(e, "AmbientLight", (function() {
			return Fn
		})), n.d(e, "LightShadow", (function() {
			return In
		})), n.d(e, "Light", (function() {
			return Rn
		})), n.d(e, "StereoCamera", (function() {
			return yi
		})), n.d(e, "PerspectiveCamera", (function() {
			return Ot
		})), n.d(e, "OrthographicCamera", (function() {
			return Ut
		})), n.d(e, "CubeCamera", (function() {
			return xi
		})), n.d(e, "Camera", (function() {
			return It
		})), n.d(e, "AudioListener", (function() {
			return bi
		})), n.d(e, "PositionalAudio", (function() {
			return wi
		})), n.d(e, "AudioContext", (function() {
			return bs
		})), n.d(e, "AudioAnalyser", (function() {
			return Mi
		})), n.d(e, "Audio", (function() {
			return _i
		})), n.d(e, "VectorKeyframeTrack", (function() {
			return Vn
		})), n.d(e, "StringKeyframeTrack", (function() {
			return Yn
		})), n.d(e, "QuaternionKeyframeTrack", (function() {
			return Xn
		})), n.d(e, "NumberKeyframeTrack", (function() {
			return qn
		})), n.d(e, "ColorKeyframeTrack", (function() {
			return Jn
		})), n.d(e, "BooleanKeyframeTrack", (function() {
			return Zn
		})), n.d(e, "PropertyMixer", (function() {
			return Ei
		})), n.d(e, "PropertyBinding", (function() {
			return Si
		})), n.d(e, "KeyframeTrack", (function() {
			return Kn
		})), n.d(e, "AnimationUtils", (function() {
			return ms
		})), n.d(e, "AnimationObjectGroup", (function() {
			return Ti
		})), n.d(e, "AnimationMixer", (function() {
			return Pi
		})), n.d(e, "AnimationClip", (function() {
			return Qn
		})), n.d(e, "Uniform", (function() {
			return Li
		})), n.d(e, "InstancedBufferGeometry", (function() {
			return Ri
		})), n.d(e, "BufferGeometry", (function() {
			return Pt
		})), n.d(e, "GeometryIdCount", (function() {
			return At
		})), n.d(e, "Geometry", (function() {
			return Tt
		})), n.d(e, "InterleavedBufferAttribute", (function() {
			return Ci
		})), n.d(e, "InstancedInterleavedBuffer", (function() {
			return Oi
		})), n.d(e, "InterleavedBuffer", (function() {
			return Ii
		})), n.d(e, "InstancedBufferAttribute", (function() {
			return Ui
		})), n.d(e, "Face3", (function() {
			return pt
		})), n.d(e, "Object3D", (function() {
			return ht
		})), n.d(e, "Raycaster", (function() {
			return Di
		})), n.d(e, "Layers", (function() {
			return ut
		})), n.d(e, "EventDispatcher", (function() {
			return i
		})), n.d(e, "Clock", (function() {
			return Fi
		})), n.d(e, "QuaternionLinearInterpolant", (function() {
			return Wn
		})), n.d(e, "LinearInterpolant", (function() {
			return kn
		})), n.d(e, "DiscreteInterpolant", (function() {
			return Hn
		})), n.d(e, "CubicInterpolant", (function() {
			return Gn
		})), n.d(e, "Interpolant", (function() {
			return zn
		})), n.d(e, "Triangle", (function() {
			return dt
		})), n.d(e, "Spline", (function() {
			return zi
		})), n.d(e, "Math", (function() {
			return Ya
		})), n.d(e, "Spherical", (function() {
			return Gi
		})), n.d(e, "Cylindrical", (function() {
			return ki
		})), n.d(e, "Plane", (function() {
			return rt
		})), n.d(e, "Frustum", (function() {
			return ot
		})), n.d(e, "Sphere", (function() {
			return nt
		})), n.d(e, "Ray", (function() {
			return st
		})), n.d(e, "Matrix4", (function() {
			return l
		})), n.d(e, "Matrix3", (function() {
			return it
		})), n.d(e, "Box3", (function() {
			return et
		})), n.d(e, "Box2", (function() {
			return Z
		})), n.d(e, "Line3", (function() {
			return lt
		})), n.d(e, "Euler", (function() {
			return ct
		})), n.d(e, "Vector4", (function() {
			return a
		})), n.d(e, "Vector3", (function() {
			return h
		})), n.d(e, "Vector2", (function() {
			return r
		})), n.d(e, "Quaternion", (function() {
			return u
		})), n.d(e, "Color", (function() {
			return q
		})), n.d(e, "MorphBlendMesh", (function() {
			return Hi
		})), n.d(e, "ImmediateRenderObject", (function() {
			return ji
		})), n.d(e, "VertexNormalsHelper", (function() {
			return Vi
		})), n.d(e, "SpotLightHelper", (function() {
			return Wi
		})), n.d(e, "SkeletonHelper", (function() {
			return Xi
		})), n.d(e, "PointLightHelper", (function() {
			return qi
		})), n.d(e, "RectAreaLightHelper", (function() {
			return Yi
		})), n.d(e, "HemisphereLightHelper", (function() {
			return Zi
		})), n.d(e, "GridHelper", (function() {
			return Ji
		})), n.d(e, "PolarGridHelper", (function() {
			return Ki
		})), n.d(e, "FaceNormalsHelper", (function() {
			return Qi
		})), n.d(e, "DirectionalLightHelper", (function() {
			return $i
		})), n.d(e, "CameraHelper", (function() {
			return tr
		})), n.d(e, "BoxHelper", (function() {
			return er
		})), n.d(e, "ArrowHelper", (function() {
			return nr
		})), n.d(e, "AxisHelper", (function() {
			return ir
		})), n.d(e, "CatmullRomCurve3", (function() {
			return Ms
		})), n.d(e, "SplineCurve3", (function() {
			return Es
		})), n.d(e, "CubicBezierCurve3", (function() {
			return Ss
		})), n.d(e, "QuadraticBezierCurve3", (function() {
			return Ts
		})), n.d(e, "LineCurve3", (function() {
			return As
		})), n.d(e, "ArcCurve", (function() {
			return rr
		})), n.d(e, "EllipseCurve", (function() {
			return si
		})), n.d(e, "SplineCurve", (function() {
			return ci
		})), n.d(e, "CubicBezierCurve", (function() {
			return ui
		})), n.d(e, "QuadraticBezierCurve", (function() {
			return hi
		})), n.d(e, "LineCurve", (function() {
			return oi
		})), n.d(e, "Shape", (function() {
			return li
		})), n.d(e, "ShapePath", (function() {
			return pi
		})), n.d(e, "Path", (function() {
			return di
		})), n.d(e, "Font", (function() {
			return fi
		})), n.d(e, "CurvePath", (function() {
			return ai
		})), n.d(e, "Curve", (function() {
			return ri
		})), n.d(e, "ShapeUtils", (function() {
			return hs
		})), n.d(e, "SceneUtils", (function() {
			return Ps
		})), n.d(e, "CurveUtils", (function() {
			return gs
		})), n.d(e, "WireframeGeometry", (function() {
			return Pe
		})), n.d(e, "ParametricGeometry", (function() {
			return Re
		})), n.d(e, "ParametricBufferGeometry", (function() {
			return Le
		})), n.d(e, "TetrahedronGeometry", (function() {
			return Oe
		})), n.d(e, "TetrahedronBufferGeometry", (function() {
			return Ie
		})), n.d(e, "OctahedronGeometry", (function() {
			return De
		})), n.d(e, "OctahedronBufferGeometry", (function() {
			return Ue
		})), n.d(e, "IcosahedronGeometry", (function() {
			return Ne
		})), n.d(e, "IcosahedronBufferGeometry", (function() {
			return Be
		})), n.d(e, "DodecahedronGeometry", (function() {
			return ze
		})), n.d(e, "DodecahedronBufferGeometry", (function() {
			return Fe
		})), n.d(e, "PolyhedronGeometry", (function() {
			return Ge
		})), n.d(e, "PolyhedronBufferGeometry", (function() {
			return Ce
		})), n.d(e, "TubeGeometry", (function() {
			return He
		})), n.d(e, "TubeBufferGeometry", (function() {
			return ke
		})), n.d(e, "TorusKnotGeometry", (function() {
			return Ve
		})), n.d(e, "TorusKnotBufferGeometry", (function() {
			return je
		})), n.d(e, "TorusGeometry", (function() {
			return Xe
		})), n.d(e, "TorusBufferGeometry", (function() {
			return We
		})), n.d(e, "TextGeometry", (function() {
			return Ye
		})), n.d(e, "SphereBufferGeometry", (function() {
			return Ze
		})), n.d(e, "SphereGeometry", (function() {
			return Je
		})), n.d(e, "RingGeometry", (function() {
			return Qe
		})), n.d(e, "RingBufferGeometry", (function() {
			return Ke
		})), n.d(e, "PlaneBufferGeometry", (function() {
			return Ct
		})), n.d(e, "PlaneGeometry", (function() {
			return $e
		})), n.d(e, "LatheGeometry", (function() {
			return en
		})), n.d(e, "LatheBufferGeometry", (function() {
			return tn
		})), n.d(e, "ShapeGeometry", (function() {
			return rn
		})), n.d(e, "ShapeBufferGeometry", (function() {
			return nn
		})), n.d(e, "ExtrudeGeometry", (function() {
			return qe
		})), n.d(e, "EdgesGeometry", (function() {
			return on
		})), n.d(e, "ConeGeometry", (function() {
			return cn
		})), n.d(e, "ConeBufferGeometry", (function() {
			return un
		})), n.d(e, "CylinderGeometry", (function() {
			return sn
		})), n.d(e, "CircleBufferGeometry", (function() {
			return hn
		})), n.d(e, "CircleGeometry", (function() {
			return ln
		})), n.d(e, "BoxBufferGeometry", (function() {
			return Rt
		})), n.d(e, "BoxGeometry", (function() {
			return dn
		})), n.d(e, "ShadowMaterial", (function() {
			return pn
		})), n.d(e, "SpriteMaterial", (function() {
			return de
		})), n.d(e, "RawShaderMaterial", (function() {
			return fn
		})), n.d(e, "ShaderMaterial", (function() {
			return $
		})), n.d(e, "PointsMaterial", (function() {
			return _e
		})), n.d(e, "MultiMaterial", (function() {
			return mn
		})), n.d(e, "MeshPhysicalMaterial", (function() {
			return gn
		})), n.d(e, "MeshStandardMaterial", (function() {
			return vn
		})), n.d(e, "MeshPhongMaterial", (function() {
			return yn
		})), n.d(e, "MeshToonMaterial", (function() {
			return xn
		})), n.d(e, "MeshNormalMaterial", (function() {
			return bn
		})), n.d(e, "MeshLambertMaterial", (function() {
			return _n
		})), n.d(e, "MeshDepthMaterial", (function() {
			return tt
		})), n.d(e, "MeshBasicMaterial", (function() {
			return ft
		})), n.d(e, "LineDashedMaterial", (function() {
			return wn
		})), n.d(e, "LineBasicMaterial", (function() {
			return ye
		})), n.d(e, "Material", (function() {
			return Q
		})), n.d(e, "Float64BufferAttribute", (function() {
			return Et
		})), n.d(e, "Float32BufferAttribute", (function() {
			return Mt
		})), n.d(e, "Uint32BufferAttribute", (function() {
			return wt
		})), n.d(e, "Int32BufferAttribute", (function() {
			return _t
		})), n.d(e, "Uint16BufferAttribute", (function() {
			return bt
		})), n.d(e, "Int16BufferAttribute", (function() {
			return xt
		})), n.d(e, "Uint8ClampedBufferAttribute", (function() {
			return yt
		})), n.d(e, "Uint8BufferAttribute", (function() {
			return gt
		})), n.d(e, "Int8BufferAttribute", (function() {
			return vt
		})), n.d(e, "BufferAttribute", (function() {
			return mt
		})), n.d(e, "REVISION", (function() {
			return Cr
		})), n.d(e, "MOUSE", (function() {
			return Ir
		})), n.d(e, "CullFaceNone", (function() {
			return Or
		})), n.d(e, "CullFaceBack", (function() {
			return Ur
		})), n.d(e, "CullFaceFront", (function() {
			return Dr
		})), n.d(e, "CullFaceFrontBack", (function() {
			return 3
		})), n.d(e, "FrontFaceDirectionCW", (function() {
			return Br
		})), n.d(e, "FrontFaceDirectionCCW", (function() {
			return 1
		})), n.d(e, "BasicShadowMap", (function() {
			return 0
		})), n.d(e, "PCFShadowMap", (function() {
			return Nr
		})), n.d(e, "PCFSoftShadowMap", (function() {
			return Fr
		})), n.d(e, "FrontSide", (function() {
			return zr
		})), n.d(e, "BackSide", (function() {
			return Gr
		})), n.d(e, "DoubleSide", (function() {
			return kr
		})), n.d(e, "FlatShading", (function() {
			return Hr
		})), n.d(e, "SmoothShading", (function() {
			return jr
		})), n.d(e, "NoColors", (function() {
			return Vr
		})), n.d(e, "FaceColors", (function() {
			return Wr
		})), n.d(e, "VertexColors", (function() {
			return Xr
		})), n.d(e, "NoBlending", (function() {
			return qr
		})), n.d(e, "NormalBlending", (function() {
			return Yr
		})), n.d(e, "AdditiveBlending", (function() {
			return Zr
		})), n.d(e, "SubtractiveBlending", (function() {
			return Jr
		})), n.d(e, "MultiplyBlending", (function() {
			return Kr
		})), n.d(e, "CustomBlending", (function() {
			return Qr
		})), n.d(e, "BlendingMode", (function() {
			return $r
		})), n.d(e, "AddEquation", (function() {
			return to
		})), n.d(e, "SubtractEquation", (function() {
			return eo
		})), n.d(e, "ReverseSubtractEquation", (function() {
			return no
		})), n.d(e, "MinEquation", (function() {
			return io
		})), n.d(e, "MaxEquation", (function() {
			return ro
		})), n.d(e, "ZeroFactor", (function() {
			return oo
		})), n.d(e, "OneFactor", (function() {
			return ao
		})), n.d(e, "SrcColorFactor", (function() {
			return so
		})), n.d(e, "OneMinusSrcColorFactor", (function() {
			return co
		})), n.d(e, "SrcAlphaFactor", (function() {
			return uo
		})), n.d(e, "OneMinusSrcAlphaFactor", (function() {
			return ho
		})), n.d(e, "DstAlphaFactor", (function() {
			return lo
		})), n.d(e, "OneMinusDstAlphaFactor", (function() {
			return po
		})), n.d(e, "DstColorFactor", (function() {
			return fo
		})), n.d(e, "OneMinusDstColorFactor", (function() {
			return mo
		})), n.d(e, "SrcAlphaSaturateFactor", (function() {
			return vo
		})), n.d(e, "NeverDepth", (function() {
			return go
		})), n.d(e, "AlwaysDepth", (function() {
			return yo
		})), n.d(e, "LessDepth", (function() {
			return xo
		})), n.d(e, "LessEqualDepth", (function() {
			return bo
		})), n.d(e, "EqualDepth", (function() {
			return _o
		})), n.d(e, "GreaterEqualDepth", (function() {
			return wo
		})), n.d(e, "GreaterDepth", (function() {
			return Mo
		})), n.d(e, "NotEqualDepth", (function() {
			return Eo
		})), n.d(e, "MultiplyOperation", (function() {
			return So
		})), n.d(e, "MixOperation", (function() {
			return To
		})), n.d(e, "AddOperation", (function() {
			return Ao
		})), n.d(e, "NoToneMapping", (function() {
			return Po
		})), n.d(e, "LinearToneMapping", (function() {
			return Lo
		})), n.d(e, "ReinhardToneMapping", (function() {
			return Ro
		})), n.d(e, "Uncharted2ToneMapping", (function() {
			return Co
		})), n.d(e, "CineonToneMapping", (function() {
			return Io
		})), n.d(e, "UVMapping", (function() {
			return Oo
		})), n.d(e, "CubeReflectionMapping", (function() {
			return Uo
		})), n.d(e, "CubeRefractionMapping", (function() {
			return Do
		})), n.d(e, "EquirectangularReflectionMapping", (function() {
			return Bo
		})), n.d(e, "EquirectangularRefractionMapping", (function() {
			return No
		})), n.d(e, "SphericalReflectionMapping", (function() {
			return Fo
		})), n.d(e, "CubeUVReflectionMapping", (function() {
			return zo
		})), n.d(e, "CubeUVRefractionMapping", (function() {
			return Go
		})), n.d(e, "TextureMapping", (function() {
			return ko
		})), n.d(e, "RepeatWrapping", (function() {
			return Ho
		})), n.d(e, "ClampToEdgeWrapping", (function() {
			return jo
		})), n.d(e, "MirroredRepeatWrapping", (function() {
			return Vo
		})), n.d(e, "TextureWrapping", (function() {
			return Wo
		})), n.d(e, "NearestFilter", (function() {
			return Xo
		})), n.d(e, "NearestMipMapNearestFilter", (function() {
			return qo
		})), n.d(e, "NearestMipMapLinearFilter", (function() {
			return Yo
		})), n.d(e, "LinearFilter", (function() {
			return Zo
		})), n.d(e, "LinearMipMapNearestFilter", (function() {
			return Jo
		})), n.d(e, "LinearMipMapLinearFilter", (function() {
			return Ko
		})), n.d(e, "TextureFilter", (function() {
			return Qo
		})), n.d(e, "UnsignedByteType", (function() {
			return $o
		})), n.d(e, "ByteType", (function() {
			return ta
		})), n.d(e, "ShortType", (function() {
			return ea
		})), n.d(e, "UnsignedShortType", (function() {
			return na
		})), n.d(e, "IntType", (function() {
			return ia
		})), n.d(e, "UnsignedIntType", (function() {
			return ra
		})), n.d(e, "FloatType", (function() {
			return oa
		})), n.d(e, "HalfFloatType", (function() {
			return aa
		})), n.d(e, "UnsignedShort4444Type", (function() {
			return sa
		})), n.d(e, "UnsignedShort5551Type", (function() {
			return ca
		})), n.d(e, "UnsignedShort565Type", (function() {
			return ua
		})), n.d(e, "UnsignedInt248Type", (function() {
			return ha
		})), n.d(e, "AlphaFormat", (function() {
			return la
		})), n.d(e, "RGBFormat", (function() {
			return da
		})), n.d(e, "RGBAFormat", (function() {
			return pa
		})), n.d(e, "LuminanceFormat", (function() {
			return fa
		})), n.d(e, "LuminanceAlphaFormat", (function() {
			return ma
		})), n.d(e, "RGBEFormat", (function() {
			return pa
		})), n.d(e, "DepthFormat", (function() {
			return va
		})), n.d(e, "DepthStencilFormat", (function() {
			return ga
		})), n.d(e, "RGB_S3TC_DXT1_Format", (function() {
			return ya
		})), n.d(e, "RGBA_S3TC_DXT1_Format", (function() {
			return xa
		})), n.d(e, "RGBA_S3TC_DXT3_Format", (function() {
			return ba
		})), n.d(e, "RGBA_S3TC_DXT5_Format", (function() {
			return _a
		})), n.d(e, "RGB_PVRTC_4BPPV1_Format", (function() {
			return wa
		})), n.d(e, "RGB_PVRTC_2BPPV1_Format", (function() {
			return Ma
		})), n.d(e, "RGBA_PVRTC_4BPPV1_Format", (function() {
			return Ea
		})), n.d(e, "RGBA_PVRTC_2BPPV1_Format", (function() {
			return Sa
		})), n.d(e, "RGB_ETC1_Format", (function() {
			return Ta
		})), n.d(e, "LoopOnce", (function() {
			return Aa
		})), n.d(e, "LoopRepeat", (function() {
			return Pa
		})), n.d(e, "LoopPingPong", (function() {
			return La
		})), n.d(e, "InterpolateDiscrete", (function() {
			return Ra
		})), n.d(e, "InterpolateLinear", (function() {
			return Ca
		})), n.d(e, "InterpolateSmooth", (function() {
			return Ia
		})), n.d(e, "ZeroCurvatureEnding", (function() {
			return Oa
		})), n.d(e, "ZeroSlopeEnding", (function() {
			return Ua
		})), n.d(e, "WrapAroundEnding", (function() {
			return Da
		})), n.d(e, "TrianglesDrawMode", (function() {
			return Ba
		})), n.d(e, "TriangleStripDrawMode", (function() {
			return Na
		})), n.d(e, "TriangleFanDrawMode", (function() {
			return Fa
		})), n.d(e, "LinearEncoding", (function() {
			return za
		})), n.d(e, "sRGBEncoding", (function() {
			return Ga
		})), n.d(e, "GammaEncoding", (function() {
			return ka
		})), n.d(e, "RGBEEncoding", (function() {
			return Ha
		})), n.d(e, "LogLuvEncoding", (function() {
			return 3003
		})), n.d(e, "RGBM7Encoding", (function() {
			return ja
		})), n.d(e, "RGBM16Encoding", (function() {
			return Va
		})), n.d(e, "RGBDEncoding", (function() {
			return Wa
		})), n.d(e, "BasicDepthPacking", (function() {
			return Xa
		})), n.d(e, "RGBADepthPacking", (function() {
			return qa
		})), n.d(e, "CubeGeometry", (function() {
			return dn
		})), n.d(e, "Face4", (function() {
			return or
		})), n.d(e, "LineStrip", (function() {
			return 0
		})), n.d(e, "LinePieces", (function() {
			return 1
		})), n.d(e, "MeshFaceMaterial", (function() {
			return ar
		})), n.d(e, "PointCloud", (function() {
			return sr
		})), n.d(e, "Particle", (function() {
			return cr
		})), n.d(e, "ParticleSystem", (function() {
			return ur
		})), n.d(e, "PointCloudMaterial", (function() {
			return hr
		})), n.d(e, "ParticleBasicMaterial", (function() {
			return lr
		})), n.d(e, "ParticleSystemMaterial", (function() {
			return dr
		})), n.d(e, "Vertex", (function() {
			return pr
		})), n.d(e, "DynamicBufferAttribute", (function() {
			return fr
		})), n.d(e, "Int8Attribute", (function() {
			return mr
		})), n.d(e, "Uint8Attribute", (function() {
			return vr
		})), n.d(e, "Uint8ClampedAttribute", (function() {
			return gr
		})), n.d(e, "Int16Attribute", (function() {
			return yr
		})), n.d(e, "Uint16Attribute", (function() {
			return xr
		})), n.d(e, "Int32Attribute", (function() {
			return br
		})), n.d(e, "Uint32Attribute", (function() {
			return _r
		})), n.d(e, "Float32Attribute", (function() {
			return wr
		})), n.d(e, "Float64Attribute", (function() {
			return Mr
		})), n.d(e, "ClosedSplineCurve3", (function() {
			return Er
		})), n.d(e, "BoundingBoxHelper", (function() {
			return Sr
		})), n.d(e, "EdgesHelper", (function() {
			return Tr
		})), n.d(e, "WireframeHelper", (function() {
			return Ar
		})), n.d(e, "XHRLoader", (function() {
			return Pr
		})), n.d(e, "GeometryUtils", (function() {
			return Ls
		})), n.d(e, "ImageUtils", (function() {
			return Rs
		})), n.d(e, "Projector", (function() {
			return Lr
		})), n.d(e, "CanvasRenderer", (function() {
			return Rr
		})), void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52)), void 0 === Math.sign && (Math.sign = function(t) {
			return 0 > t ? -1 : 0 < t ? 1 : +t
		}), void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
			get : function() {
				return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
			}
		}), void 0 === Object.assign && (function() {
			Object.assign = function(t) {
				if (void 0 === t || null === t)
					throw new TypeError("Cannot convert undefined or null to object");
				for (var e = Object(t), n = 1; n < arguments.length; n++) {
					var i = arguments[n];
					if (void 0 !== i && null !== i)
						for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r])
				}
				return e
			}
		})(), Object.assign(i.prototype, {
			addEventListener : function(t, e) {
				void 0 === this._listeners && (this._listeners = {});
				var n = this._listeners;
				void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e)
			},
			hasEventListener : function(t, e) {
				if (void 0 === this._listeners) return !1;
				var n = this._listeners;
				return void 0 !== n[t] && -1 !== n[t].indexOf(e)
			},
			removeEventListener : function(t, e) {
				if (void 0 !== this._listeners) {
					var n = this._listeners,
						i = n[t];
					if (void 0 !== i) {
						var r = i.indexOf(e);
						-1 !== r && i.splice(r, 1)
					}
				}
			},
			dispatchEvent : function(t) {
				if (void 0 !== this._listeners) {
					var e = this._listeners,
						n = e[t.type];
					if (void 0 !== n) {
						t.target = this;
						var i = [],
							r = 0,
							o = n.length;
						for (r = 0; r < o; r++) i[r] = n[r];
						for (r = 0; r < o; r++) i[r].call(this, t)
					}
				}
			}
		});
		var Cr = "83",
			Ir = {
				LEFT : 0,
				MIDDLE : 1,
				RIGHT : 2
			},
			Or = 0,
			Ur = 1,
			Dr = 2,
			Br = 0,
			Nr = 1,
			Fr = 2,
			zr = 0,
			Gr = 1,
			kr = 2,
			Hr = 1,
			jr = 2,
			Vr = 0,
			Wr = 1,
			Xr = 2,
			qr = 0,
			Yr = 1,
			Zr = 2,
			Jr = 3,
			Kr = 4,
			Qr = 5,
			$r = {
				NoBlending : qr,
				NormalBlending : Yr,
				AdditiveBlending : Zr,
				SubtractiveBlending : Jr,
				MultiplyBlending : Kr,
				CustomBlending : Qr
			},
			to = 100,
			eo = 101,
			no = 102,
			io = 103,
			ro = 104,
			oo = 200,
			ao = 201,
			so = 202,
			co = 203,
			uo = 204,
			ho = 205,
			lo = 206,
			po = 207,
			fo = 208,
			mo = 209,
			vo = 210,
			go = 0,
			yo = 1,
			xo = 2,
			bo = 3,
			_o = 4,
			wo = 5,
			Mo = 6,
			Eo = 7,
			So = 0,
			To = 1,
			Ao = 2,
			Po = 0,
			Lo = 1,
			Ro = 2,
			Co = 3,
			Io = 4,
			Oo = 300,
			Uo = 301,
			Do = 302,
			Bo = 303,
			No = 304,
			Fo = 305,
			zo = 306,
			Go = 307,
			ko = {
				UVMapping : Oo,
				CubeReflectionMapping : Uo,
				CubeRefractionMapping : Do,
				EquirectangularReflectionMapping : Bo,
				EquirectangularRefractionMapping : No,
				SphericalReflectionMapping : Fo,
				CubeUVReflectionMapping : zo,
				CubeUVRefractionMapping : Go
			},
			Ho = 1e3,
			jo = 1001,
			Vo = 1002,
			Wo = {
				RepeatWrapping : Ho,
				ClampToEdgeWrapping : jo,
				MirroredRepeatWrapping : Vo
			},
			Xo = 1003,
			qo = 1004,
			Yo = 1005,
			Zo = 1006,
			Jo = 1007,
			Ko = 1008,
			Qo = {
				NearestFilter : Xo,
				NearestMipMapNearestFilter : qo,
				NearestMipMapLinearFilter : Yo,
				LinearFilter : Zo,
				LinearMipMapNearestFilter : Jo,
				LinearMipMapLinearFilter : Ko
			},
			$o = 1009,
			ta = 1010,
			ea = 1011,
			na = 1012,
			ia = 1013,
			ra = 1014,
			oa = 1015,
			aa = 1016,
			sa = 1017,
			ca = 1018,
			ua = 1019,
			ha = 1020,
			la = 1021,
			da = 1022,
			pa = 1023,
			fa = 1024,
			ma = 1025,
			va = 1026,
			ga = 1027,
			ya = 2001,
			xa = 2002,
			ba = 2003,
			_a = 2004,
			wa = 2100,
			Ma = 2101,
			Ea = 2102,
			Sa = 2103,
			Ta = 2151,
			Aa = 2200,
			Pa = 2201,
			La = 2202,
			Ra = 2300,
			Ca = 2301,
			Ia = 2302,
			Oa = 2400,
			Ua = 2401,
			Da = 2402,
			Ba = 0,
			Na = 1,
			Fa = 2,
			za = 3e3,
			Ga = 3001,
			ka = 3007,
			Ha = 3002,
			ja = 3004,
			Va = 3005,
			Wa = 3006,
			Xa = 3200,
			qa = 3201,
			Ya = {
				DEG2RAD : Math.PI / 180,
				RAD2DEG : 180 / Math.PI,
				generateUUID : (function() {
					var t,
						e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
						n = Array(36),
						i = 0;
					return function() {
						for (var r = 0; 36 > r; r++) 8 === r || 13 === r || 18 === r || 23 === r ? n[r] = "-" : 14 === r ? n[r] = "4" : (2 >= i && (i = 0 | 33554432 + 16777216 * Math.random()), t = 15 & i, i >>= 4, n[r] = e[19 === r ? 8 | 3 & t : t]);
						return n.join("")
					}
				})(),
				clamp : function(t, e, n) {
					return Math.max(e, Math.min(n, t))
				},
				euclideanModulo : function(t, e) {
					return (t % e + e) % e
				},
				mapLinear : function(t, e, n, i, r) {
					return i + (t - e) * (r - i) / (n - e)
				},
				lerp : function(t, e, n) {
					return (1 - n) * t + n * e
				},
				smoothstep : function(t, e, n) {
					return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e), t * t * (3 - 2 * t))
				},
				smootherstep : function(t, e, n) {
					return t <= e ? 0 : t >= n ? 1 : (t = (t - e) / (n - e), t * t * t * (t * (6 * t - 15) + 10))
				},
				randInt : function(t, e) {
					return t + Math.floor(Math.random() * (e - t + 1))
				},
				randFloat : function(t, e) {
					return t + Math.random() * (e - t)
				},
				randFloatSpread : function(t) {
					return t * (.5 - Math.random())
				},
				degToRad : function(t) {
					return t * Ya.DEG2RAD
				},
				radToDeg : function(t) {
					return t * Ya.RAD2DEG
				},
				isPowerOfTwo : function(t) {
					return 0 == (t & t - 1) && 0 !== t
				},
				nearestPowerOfTwo : function(t) {
					return Math.pow(2, Math.round(Math.log(t) / Math.LN2))
				},
				nextPowerOfTwo : function(t) {
					return t--, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, t |= t >> 16, t++, t
				}
			};
		r.prototype = {
			constructor : r,
			isVector2 : !0,
			get width() {
				return this.x
			},
			set width(t) {
				this.x = t
			},
			get height() {
				return this.y
			},
			set height(t) {
				this.y = t
			},
			set : function(t, e) {
				return this.x = t, this.y = e, this
			},
			setScalar : function(t) {
				return this.x = t, this.y = t, this
			},
			setX : function(t) {
				return this.x = t, this
			},
			setY : function(t) {
				return this.y = t, this
			},
			setComponent : function(t, e) {
				switch (t) {
				case 0:
					this.x = e;
					break;case 1:
					this.y = e;
					break;default:
					throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent : function(t) {
				switch (t) {
				case 0:
					return this.x;case 1:
					return this.y;default:
					throw new Error("index is out of range: " + t)
				}
			},
			clone : function() {
				return new this.constructor(this.x, this.y)
			},
			copy : function(t) {
				return this.x = t.x, this.y = t.y, this
			},
			add : function(t, e) {
				return void 0 === e ? (this.x += t.x, this.y += t.y, this) : (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e))
			},
			addScalar : function(t) {
				return this.x += t, this.y += t, this
			},
			addVectors : function(t, e) {
				return this.x = t.x + e.x, this.y = t.y + e.y, this
			},
			addScaledVector : function(t, e) {
				return this.x += t.x * e, this.y += t.y * e, this
			},
			sub : function(t, e) {
				return void 0 === e ? (this.x -= t.x, this.y -= t.y, this) : (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e))
			},
			subScalar : function(t) {
				return this.x -= t, this.y -= t, this
			},
			subVectors : function(t, e) {
				return this.x = t.x - e.x, this.y = t.y - e.y, this
			},
			multiply : function(t) {
				return this.x *= t.x, this.y *= t.y, this
			},
			multiplyScalar : function(t) {
				return isFinite(t) ? (this.x *= t, this.y *= t) : (this.x = 0, this.y = 0), this
			},
			divide : function(t) {
				return this.x /= t.x, this.y /= t.y, this
			},
			divideScalar : function(t) {
				return this.multiplyScalar(1 / t)
			},
			min : function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
			},
			max : function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
			},
			clamp : function(t, e) {
				return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this
			},
			clampScalar : (function() {
				var t,
					e;
				return function(n, i) {
					return void 0 == t && (t = new r, e = new r), t.set(n, n), e.set(i, i), this.clamp(t, e)
				}
			})(),
			clampLength : function(t, e) {
				var n = this.length();
				return this.multiplyScalar(Math.max(t, Math.min(e, n)) / n)
			},
			floor : function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
			},
			ceil : function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
			},
			round : function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this
			},
			roundToZero : function() {
				return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this
			},
			negate : function() {
				return this.x = -this.x, this.y = -this.y, this
			},
			dot : function(t) {
				return this.x * t.x + this.y * t.y
			},
			lengthSq : function() {
				return this.x * this.x + this.y * this.y
			},
			length : function() {
				return Math.sqrt(this.x * this.x + this.y * this.y)
			},
			lengthManhattan : function() {
				return Math.abs(this.x) + Math.abs(this.y)
			},
			normalize : function() {
				return this.divideScalar(this.length())
			},
			angle : function() {
				var t = Math.atan2(this.y, this.x);
				return 0 > t && (t += 2 * Math.PI), t
			},
			distanceTo : function(t) {
				return Math.sqrt(this.distanceToSquared(t))
			},
			distanceToSquared : function(t) {
				var e = this.x - t.x,
					n = this.y - t.y;
				return e * e + n * n
			},
			distanceToManhattan : function(t) {
				return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
			},
			setLength : function(t) {
				return this.multiplyScalar(t / this.length())
			},
			lerp : function(t, e) {
				return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
			},
			lerpVectors : function(t, e, n) {
				return this.subVectors(e, t).multiplyScalar(n).add(t)
			},
			equals : function(t) {
				return t.x === this.x && t.y === this.y
			},
			fromArray : function(t, e) {
				return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t
			},
			fromAttribute : function(t, e, n) {
				return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this
			},
			rotateAround : function(t, e) {
				var n = Math.cos(e),
					i = Math.sin(e),
					r = this.x - t.x,
					o = this.y - t.y;
				return this.x = r * n - o * i + t.x, this.y = r * i + o * n + t.y, this
			}
		};
		var Za = 0;
		o.DEFAULT_IMAGE = void 0, o.DEFAULT_MAPPING = Oo, o.prototype = {
			constructor : o,
			isTexture : !0,
			set needsUpdate(t) {
				!0 === t && this.version++
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.image = t.image, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.encoding = t.encoding, this
			},
			toJSON : function(t) {
				function e(t) {
					var e;
					return void 0 === t.toDataURL ? (e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), e.width = t.width, e.height = t.height, e.getContext("2d").drawImage(t, 0, 0, t.width, t.height)) : e = t, 2048 < e.width || 2048 < e.height ? e.toDataURL("image/jpeg", .6) : e.toDataURL("image/png")
				}
				if (void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
				var n = {
					metadata : {
						version : 4.4,
						type : "Texture",
						generator : "Texture.toJSON"
					},
					uuid : this.uuid,
					name : this.name,
					mapping : this.mapping,
					repeat : [ this.repeat.x, this.repeat.y ],
					offset : [ this.offset.x, this.offset.y ],
					wrap : [ this.wrapS, this.wrapT ],
					minFilter : this.minFilter,
					magFilter : this.magFilter,
					anisotropy : this.anisotropy,
					flipY : this.flipY
				};
				if (void 0 !== this.image) {
					var i = this.image;
					void 0 === i.uuid && (i.uuid = Ya.generateUUID()), void 0 === t.images[i.uuid] && (t.images[i.uuid] = {
						uuid : i.uuid,
						url : e(i)
					}), n.image = i.uuid
				}
				return t.textures[this.uuid] = n, n
			},
			dispose : function() {
				this.dispatchEvent({
					type : "dispose"
				})
			},
			transformUv : function(t) {
				if (this.mapping === Oo) {
					if (t.multiply(this.repeat), t.add(this.offset), 0 > t.x || 1 < t.x) switch (this.wrapS) {
						case Ho:
							t.x = t.x - Math.floor(t.x);
							break;case jo:
							t.x = 0 > t.x ? 0 : 1;
							break;case Vo:
							t.x = 1 === Math.abs(Math.floor(t.x) % 2) ? Math.ceil(t.x) - t.x : t.x - Math.floor(t.x)
					}
					if (0 > t.y || 1 < t.y) switch (this.wrapT) {
						case Ho:
							t.y = t.y - Math.floor(t.y);
							break;case jo:
							t.y = 0 > t.y ? 0 : 1;
							break;case Vo:
							t.y = 1 === Math.abs(Math.floor(t.y) % 2) ? Math.ceil(t.y) - t.y : t.y - Math.floor(t.y)
					}
					this.flipY && (t.y = 1 - t.y)
				}
			}
		}, Object.assign(o.prototype, i.prototype), a.prototype = {
			constructor : a,
			isVector4 : !0,
			set : function(t, e, n, i) {
				return this.x = t, this.y = e, this.z = n, this.w = i, this
			},
			setScalar : function(t) {
				return this.x = t, this.y = t, this.z = t, this.w = t, this
			},
			setX : function(t) {
				return this.x = t, this
			},
			setY : function(t) {
				return this.y = t, this
			},
			setZ : function(t) {
				return this.z = t, this
			},
			setW : function(t) {
				return this.w = t, this
			},
			setComponent : function(t, e) {
				switch (t) {
				case 0:
					this.x = e;
					break;case 1:
					this.y = e;
					break;case 2:
					this.z = e;
					break;case 3:
					this.w = e;
					break;default:
					throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent : function(t) {
				switch (t) {
				case 0:
					return this.x;case 1:
					return this.y;case 2:
					return this.z;case 3:
					return this.w;default:
					throw new Error("index is out of range: " + t)
				}
			},
			clone : function() {
				return new this.constructor(this.x, this.y, this.z, this.w)
			},
			copy : function(t) {
				return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 === t.w ? 1 : t.w, this
			},
			add : function(t, e) {
				return void 0 === e ? (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this) : (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e))
			},
			addScalar : function(t) {
				return this.x += t, this.y += t, this.z += t, this.w += t, this
			},
			addVectors : function(t, e) {
				return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
			},
			addScaledVector : function(t, e) {
				return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this
			},
			sub : function(t, e) {
				return void 0 === e ? (this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this) : (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e))
			},
			subScalar : function(t) {
				return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
			},
			subVectors : function(t, e) {
				return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
			},
			multiplyScalar : function(t) {
				return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t, this.w *= t) : (this.x = 0, this.y = 0, this.z = 0, this.w = 0), this
			},
			applyMatrix4 : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = this.w,
					o = t.elements;
				return this.x = o[0] * e + o[4] * n + o[8] * i + o[12] * r, this.y = o[1] * e + o[5] * n + o[9] * i + o[13] * r, this.z = o[2] * e + o[6] * n + o[10] * i + o[14] * r, this.w = o[3] * e + o[7] * n + o[11] * i + o[15] * r, this
			},
			divideScalar : function(t) {
				return this.multiplyScalar(1 / t)
			},
			setAxisAngleFromQuaternion : function(t) {
				this.w = 2 * Math.acos(t.w);
				var e = Math.sqrt(1 - t.w * t.w);
				return 1e-4 > e ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
			},
			setAxisAngleFromRotationMatrix : function(t) {
				var e,
					n,
					i,
					r,
					o = .01,
					a = .1,
					s = t.elements,
					c = s[0],
					u = s[4],
					h = s[8],
					l = s[1],
					d = s[5],
					p = s[9],
					f = s[2],
					m = s[6],
					v = s[10];
				if (Math.abs(u - l) < o && Math.abs(h - f) < o && Math.abs(p - m) < o) {
					if (Math.abs(u + l) < a && Math.abs(h + f) < a && Math.abs(p + m) < a && Math.abs(c + d + v - 3) < a) return this.set(1, 0, 0, 0), this;
					e = Math.PI;
					var g = (c + 1) / 2,
						y = (d + 1) / 2,
						x = (v + 1) / 2,
						b = (u + l) / 4,
						_ = (h + f) / 4,
						w = (p + m) / 4;
					return g > y && g > x ? g < o ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(g), i = b / n, r = _ / n) : y > x ? y < o ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(y), n = b / i, r = w / i) : x < o ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(x), n = _ / r, i = w / r), this.set(n, i, r, e), this
				}
				var M = Math.sqrt((m - p) * (m - p) + (h - f) * (h - f) + (l - u) * (l - u));
				return .001 > Math.abs(M) && (M = 1), this.x = (m - p) / M, this.y = (h - f) / M, this.z = (l - u) / M,
					this.w = Math.acos((c + d + v - 1) / 2), this
			},
			min : function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
			},
			max : function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
			},
			clamp : function(t, e) {
				return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this
			},
			clampScalar : (function() {
				var t,
					e;
				return function(n, i) {
					return void 0 == t && (t = new a, e = new a), t.set(n, n, n, n), e.set(i, i, i, i), this.clamp(t, e)
				}
			})(),
			floor : function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
			},
			ceil : function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
			},
			round : function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
			},
			roundToZero : function() {
				return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w), this
			},
			negate : function() {
				return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
			},
			dot : function(t) {
				return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
			},
			lengthSq : function() {
				return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
			},
			length : function() {
				return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
			},
			lengthManhattan : function() {
				return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
			},
			normalize : function() {
				return this.divideScalar(this.length())
			},
			setLength : function(t) {
				return this.multiplyScalar(t / this.length())
			},
			lerp : function(t, e) {
				return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
			},
			lerpVectors : function(t, e, n) {
				return this.subVectors(e, t).multiplyScalar(n).add(t)
			},
			equals : function(t) {
				return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
			},
			fromArray : function(t, e) {
				return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
			},
			fromAttribute : function(t, e, n) {
				return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this
			}
		}, Object.assign(s.prototype, i.prototype, {
			isWebGLRenderTarget : !0,
			setSize : function(t, e) {
				(this.width !== t || this.height !== e) && (this.width = t, this.height = e, this.dispose()), this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e)
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.width = t.width, this.height = t.height, this.viewport.copy(t.viewport), this.texture = t.texture.clone(), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.depthTexture = t.depthTexture, this
			},
			dispose : function() {
				this.dispatchEvent({
					type : "dispose"
				})
			}
		}), c.prototype = Object.create(s.prototype), c.prototype.constructor = c, c.prototype.isWebGLRenderTargetCube = !0, u.prototype = {
			constructor : u,
			get x() {
				return this._x
			},
			set x(t) {
				this._x = t, this.onChangeCallback()
			},
			get y() {
				return this._y
			},
			set y(t) {
				this._y = t, this.onChangeCallback()
			},
			get z() {
				return this._z
			},
			set z(t) {
				this._z = t, this.onChangeCallback()
			},
			get w() {
				return this._w
			},
			set w(t) {
				this._w = t, this.onChangeCallback()
			},
			set : function(t, e, n, i) {
				return this._x = t, this._y = e, this._z = n, this._w = i, this.onChangeCallback(), this
			},
			clone : function() {
				return new this.constructor(this._x, this._y, this._z, this._w)
			},
			copy : function(t) {
				return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this.onChangeCallback(), this
			},
			setFromEuler : function(t, e) {
				if (!1 === (t && t.isEuler))
					throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
				var n = Math.cos(t._x / 2),
					i = Math.cos(t._y / 2),
					r = Math.cos(t._z / 2),
					o = Math.sin(t._x / 2),
					a = Math.sin(t._y / 2),
					s = Math.sin(t._z / 2),
					c = t.order;
				return "XYZ" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r - o * a * s) : "YXZ" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r + o * a * s) : "ZXY" === c ? (this._x = o * i * r - n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r - o * a * s) : "ZYX" === c ? (this._x = o * i * r - n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r + o * a * s) : "YZX" === c ? (this._x = o * i * r + n * a * s, this._y = n * a * r + o * i * s, this._z = n * i * s - o * a * r, this._w = n * i * r - o * a * s) : "XZY" === c && (this._x = o * i * r - n * a * s, this._y = n * a * r - o * i * s, this._z = n * i * s + o * a * r, this._w = n * i * r + o * a * s), !1 !== e && this.onChangeCallback(), this
			},
			setFromAxisAngle : function(t, e) {
				var n = e / 2,
					i = Math.sin(n);
				return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this.onChangeCallback(), this
			},
			setFromRotationMatrix : function(t) {
				var e,
					n = t.elements,
					i = n[0],
					r = n[4],
					o = n[8],
					a = n[1],
					s = n[5],
					c = n[9],
					u = n[2],
					h = n[6],
					l = n[10],
					d = i + s + l;
				return 0 < d ? (e = .5 / Math.sqrt(d + 1), this._w = .25 / e, this._x = (h - c) * e, this._y = (o - u) * e, this._z = (a - r) * e) : i > s && i > l ? (e = 2 * Math.sqrt(1 + i - s - l), this._w = (h - c) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (o + u) / e) : s > l ? (e = 2 * Math.sqrt(1 + s - i - l), this._w = (o - u) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (c + h) / e) : (e = 2 * Math.sqrt(1 + l - i - s), this._w = (a - r) / e, this._x = (o + u) / e, this._y = (c + h) / e, this._z = .25 * e), this.onChangeCallback(), this
			},
			setFromUnitVectors : (function() {
				var t,
					e;
				return function(n, i) {
					return void 0 == t && (t = new h), e = n.dot(i) + 1, 1e-6 > e ? (e = 0, Math.abs(n.x) > Math.abs(n.z) ? t.set(-n.y, n.x, 0) : t.set(0, -n.z, n.y)) : t.crossVectors(n, i), this._x = t.x, this._y = t.y, this._z = t.z, this._w = e, this.normalize()
				}
			})(),
			inverse : function() {
				return this.conjugate().normalize()
			},
			conjugate : function() {
				return this._x *= -1, this._y *= -1, this._z *= -1, this.onChangeCallback(), this
			},
			dot : function(t) {
				return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
			},
			lengthSq : function() {
				return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
			},
			length : function() {
				return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
			},
			normalize : function() {
				var t = this.length();
				return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this.onChangeCallback(), this
			},
			multiply : function(t, e) {
				return void 0 === e ? this.multiplyQuaternions(this, t) : (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(t, e))
			},
			premultiply : function(t) {
				return this.multiplyQuaternions(t, this)
			},
			multiplyQuaternions : function(t, e) {
				var n = t._x,
					i = t._y,
					r = t._z,
					o = t._w,
					a = e._x,
					s = e._y,
					c = e._z,
					u = e._w;
				return this._x = n * u + o * a + i * c - r * s, this._y = i * u + o * s + r * a - n * c, this._z = r * u + o * c + n * s - i * a, this._w = o * u - n * a - i * s - r * c, this.onChangeCallback(), this
			},
			slerp : function(t, e) {
				if (0 === e) return this;
				if (1 === e) return this.copy(t);
				var n = this._x,
					i = this._y,
					r = this._z,
					o = this._w,
					a = o * t._w + n * t._x + i * t._y + r * t._z;
				if (0 > a ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), 1 <= a) return this._w = o, this._x = n, this._y = i, this._z = r, this;
				var s = Math.sqrt(1 - a * a);
				if (.001 > Math.abs(s)) return this._w = .5 * (o + this._w), this._x = .5 * (n + this._x), this._y = .5 * (i + this._y), this._z = .5 * (r + this._z), this;
				var c = Math.atan2(s, a),
					u = Math.sin((1 - e) * c) / s,
					h = Math.sin(e * c) / s;
				return this._w = o * u + this._w * h, this._x = n * u + this._x * h, this._y = i * u + this._y * h, this._z = r * u + this._z * h, this.onChangeCallback(), this
			},
			equals : function(t) {
				return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
			},
			fromArray : function(t, e) {
				return void 0 === e && (e = 0), this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this.onChangeCallback(), this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
			},
			onChange : function(t) {
				return this.onChangeCallback = t, this
			},
			onChangeCallback : function() {}
		}, Object.assign(u, {
			slerp : function(t, e, n, i) {
				return n.copy(t).slerp(e, i)
			},
			slerpFlat : function(t, e, n, i, r, o, a) {
				var s = n[i + 0],
					c = n[i + 1],
					u = n[i + 2],
					h = n[i + 3],
					l = r[o + 0],
					d = r[o + 1],
					p = r[o + 2],
					f = r[o + 3];
				if (h !== f || s !== l || c !== d || u !== p) {
					var m = 1 - a,
						v = s * l + c * d + u * p + h * f,
						g = 0 <= v ? 1 : -1,
						y = 1 - v * v;
					if (y > Number.EPSILON) {
						var x = Math.sqrt(y),
							b = Math.atan2(x, v * g);
						m = Math.sin(m * b) / x, a = Math.sin(a * b) / x
					}
					var _ = a * g;
					if (s = s * m + l * _, c = c * m + d * _, u = u * m + p * _, h = h * m + f * _, m == 1 - a) {
						var w = 1 / Math.sqrt(s * s + c * c + u * u + h * h);
						s *= w, c *= w, u *= w, h *= w
					}
				}
				t[e] = s, t[e + 1] = c, t[e + 2] = u, t[e + 3] = h
			}
		}), h.prototype = {
			constructor : h,
			isVector3 : !0,
			set : function(t, e, n) {
				return this.x = t, this.y = e, this.z = n, this
			},
			setScalar : function(t) {
				return this.x = t, this.y = t, this.z = t, this
			},
			setX : function(t) {
				return this.x = t, this
			},
			setY : function(t) {
				return this.y = t, this
			},
			setZ : function(t) {
				return this.z = t, this
			},
			setComponent : function(t, e) {
				switch (t) {
				case 0:
					this.x = e;
					break;case 1:
					this.y = e;
					break;case 2:
					this.z = e;
					break;default:
					throw new Error("index is out of range: " + t)
				}
				return this
			},
			getComponent : function(t) {
				switch (t) {
				case 0:
					return this.x;case 1:
					return this.y;case 2:
					return this.z;default:
					throw new Error("index is out of range: " + t)
				}
			},
			clone : function() {
				return new this.constructor(this.x, this.y, this.z)
			},
			copy : function(t) {
				return this.x = t.x, this.y = t.y, this.z = t.z, this
			},
			add : function(t, e) {
				return void 0 === e ? (this.x += t.x, this.y += t.y, this.z += t.z, this) : (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(t, e))
			},
			addScalar : function(t) {
				return this.x += t, this.y += t, this.z += t, this
			},
			addVectors : function(t, e) {
				return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
			},
			addScaledVector : function(t, e) {
				return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this
			},
			sub : function(t, e) {
				return void 0 === e ? (this.x -= t.x, this.y -= t.y, this.z -= t.z, this) : (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(t, e))
			},
			subScalar : function(t) {
				return this.x -= t, this.y -= t, this.z -= t, this
			},
			subVectors : function(t, e) {
				return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
			},
			multiply : function(t, e) {
				return void 0 === e ? (this.x *= t.x, this.y *= t.y, this.z *= t.z, this) : (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(t, e))
			},
			multiplyScalar : function(t) {
				return isFinite(t) ? (this.x *= t, this.y *= t, this.z *= t) : (this.x = 0, this.y = 0, this.z = 0), this
			},
			multiplyVectors : function(t, e) {
				return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
			},
			applyEuler : (function() {
				var t;
				return function(e) {
					return !1 === (e && e.isEuler) && console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), void 0 == t && (t = new u), this.applyQuaternion(t.setFromEuler(e))
				}
			})(),
			applyAxisAngle : (function() {
				var t;
				return function(e, n) {
					return void 0 == t && (t = new u), this.applyQuaternion(t.setFromAxisAngle(e, n))
				}
			})(),
			applyMatrix3 : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = t.elements;
				return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this
			},
			applyMatrix4 : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = t.elements;
				return this.x = r[0] * e + r[4] * n + r[8] * i + r[12], this.y = r[1] * e + r[5] * n + r[9] * i + r[13], this.z = r[2] * e + r[6] * n + r[10] * i + r[14], this
			},
			applyProjection : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = t.elements,
					o = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
				return this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * o, this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * o, this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * o, this
			},
			applyQuaternion : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = t.x,
					o = t.y,
					a = t.z,
					s = t.w,
					c = s * e + o * i - a * n,
					u = s * n + a * e - r * i,
					h = s * i + r * n - o * e,
					l = -r * e - o * n - a * i;
				return this.x = c * s + l * -r + u * -a - h * -o, this.y = u * s + l * -o + h * -r - c * -a, this.z = h * s + l * -a + c * -o - u * -r, this
			},
			project : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)), this.applyProjection(t)
				}
			})(),
			unproject : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)), this.applyProjection(t)
				}
			})(),
			transformDirection : function(t) {
				var e = this.x,
					n = this.y,
					i = this.z,
					r = t.elements;
				return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize()
			},
			divide : function(t) {
				return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
			},
			divideScalar : function(t) {
				return this.multiplyScalar(1 / t)
			},
			min : function(t) {
				return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
			},
			max : function(t) {
				return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
			},
			clamp : function(t, e) {
				return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this
			},
			clampScalar : (function() {
				var t,
					e;
				return function(n, i) {
					return void 0 == t && (t = new h, e = new h), t.set(n, n, n), e.set(i, i, i), this.clamp(t, e)
				}
			})(),
			clampLength : function(t, e) {
				var n = this.length();
				return this.multiplyScalar(Math.max(t, Math.min(e, n)) / n)
			},
			floor : function() {
				return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
			},
			ceil : function() {
				return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
			},
			round : function() {
				return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
			},
			roundToZero : function() {
				return this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x), this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y), this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z), this
			},
			negate : function() {
				return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
			},
			dot : function(t) {
				return this.x * t.x + this.y * t.y + this.z * t.z
			},
			lengthSq : function() {
				return this.x * this.x + this.y * this.y + this.z * this.z
			},
			length : function() {
				return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
			},
			lengthManhattan : function() {
				return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
			},
			normalize : function() {
				return this.divideScalar(this.length())
			},
			setLength : function(t) {
				return this.multiplyScalar(t / this.length())
			},
			lerp : function(t, e) {
				return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
			},
			lerpVectors : function(t, e, n) {
				return this.subVectors(e, t).multiplyScalar(n).add(t)
			},
			cross : function(t, e) {
				if (void 0 !== e) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(t, e);
				var n = this.x,
					i = this.y,
					r = this.z;
				return this.x = i * t.z - r * t.y, this.y = r * t.x - n * t.z, this.z = n * t.y - i * t.x, this
			},
			crossVectors : function(t, e) {
				var n = t.x,
					i = t.y,
					r = t.z,
					o = e.x,
					a = e.y,
					s = e.z;
				return this.x = i * s - r * a, this.y = r * o - n * s, this.z = n * a - i * o, this
			},
			projectOnVector : function(t) {
				var e = t.dot(this) / t.lengthSq();
				return this.copy(t).multiplyScalar(e)
			},
			projectOnPlane : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new h), t.copy(this).projectOnVector(e), this.sub(t)
				}
			})(),
			reflect : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new h), this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)))
				}
			})(),
			angleTo : function(t) {
				var e = this.dot(t) / Math.sqrt(this.lengthSq() * t.lengthSq());
				return Math.acos(Ya.clamp(e, -1, 1))
			},
			distanceTo : function(t) {
				return Math.sqrt(this.distanceToSquared(t))
			},
			distanceToSquared : function(t) {
				var e = this.x - t.x,
					n = this.y - t.y,
					i = this.z - t.z;
				return e * e + n * n + i * i
			},
			distanceToManhattan : function(t) {
				return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
			},
			setFromSpherical : function(t) {
				var e = Math.sin(t.phi) * t.radius;
				return this.x = e * Math.sin(t.theta), this.y = Math.cos(t.phi) * t.radius, this.z = e * Math.cos(t.theta), this
			},
			setFromCylindrical : function(t) {
				return this.x = t.radius * Math.sin(t.theta), this.y = t.y, this.z = t.radius * Math.cos(t.theta), this
			},
			setFromMatrixPosition : function(t) {
				return this.setFromMatrixColumn(t, 3)
			},
			setFromMatrixScale : function(t) {
				var e = this.setFromMatrixColumn(t, 0).length(),
					n = this.setFromMatrixColumn(t, 1).length(),
					i = this.setFromMatrixColumn(t, 2).length();
				return this.x = e, this.y = n, this.z = i, this
			},
			setFromMatrixColumn : function(t, e) {
				if ("number" == typeof t) {
					console.warn("THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).");
					var n = t;
					t = e, e = n
				}
				return this.fromArray(t.elements, 4 * e)
			},
			equals : function(t) {
				return t.x === this.x && t.y === this.y && t.z === this.z
			},
			fromArray : function(t, e) {
				return void 0 === e && (e = 0), this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
			},
			fromAttribute : function(t, e, n) {
				return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromAttribute()."), this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this
			}
		}, l.prototype = {
			constructor : l,
			isMatrix4 : !0,
			set : function(t, e, n, i, r, o, a, s, c, u, h, l, d, p, f, m) {
				var v = this.elements;
				return v[0] = t, v[4] = e, v[8] = n, v[12] = i, v[1] = r, v[5] = o, v[9] = a, v[13] = s, v[2] = c, v[6] = u, v[10] = h, v[14] = l, v[3] = d, v[7] = p, v[11] = f, v[15] = m, this
			},
			identity : function() {
				return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			},
			clone : function() {
				return (new l).fromArray(this.elements)
			},
			copy : function(t) {
				return this.elements.set(t.elements), this
			},
			copyPosition : function(t) {
				var e = this.elements,
					n = t.elements;
				return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
			},
			extractBasis : function(t, e, n) {
				return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
			},
			makeBasis : function(t, e, n) {
				return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
			},
			extractRotation : (function() {
				var t;
				return function(e) {
					void 0 == t && (t = new h);
					var n = this.elements,
						i = e.elements,
						r = 1 / t.setFromMatrixColumn(e, 0).length(),
						o = 1 / t.setFromMatrixColumn(e, 1).length(),
						a = 1 / t.setFromMatrixColumn(e, 2).length();
					return n[0] = i[0] * r, n[1] = i[1] * r, n[2] = i[2] * r, n[4] = i[4] * o, n[5] = i[5] * o, n[6] = i[6] * o, n[8] = i[8] * a, n[9] = i[9] * a, n[10] = i[10] * a, this
				}
			})(),
			makeRotationFromEuler : function(t) {
				!1 === (t && t.isEuler) && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
				var e = this.elements,
					n = t.x,
					i = t.y,
					r = t.z,
					o = Math.cos(n),
					a = Math.sin(n),
					s = Math.cos(i),
					c = Math.sin(i),
					u = Math.cos(r),
					h = Math.sin(r);
				if ("XYZ" === t.order) {
					var l = o * u,
						d = o * h,
						p = a * u,
						f = a * h;
					e[0] = s * u, e[4] = -s * h, e[8] = c, e[1] = d + p * c, e[5] = l - f * c, e[9] = -a * s, e[2] = f - l * c, e[6] = p + d * c, e[10] = o * s
				} else if ("YXZ" === t.order) {
					var m = s * u,
						v = s * h,
						g = c * u,
						y = c * h;
					e[0] = m + y * a, e[4] = g * a - v, e[8] = o * c, e[1] = o * h, e[5] = o * u, e[9] = -a, e[2] = v * a - g, e[6] = y + m * a, e[10] = o * s
				} else if ("ZXY" === t.order) {
					var m = s * u,
						v = s * h,
						g = c * u,
						y = c * h;
					e[0] = m - y * a, e[4] = -o * h, e[8] = g + v * a, e[1] = v + g * a, e[5] = o * u, e[9] = y - m * a, e[2] = -o * c, e[6] = a, e[10] = o * s
				} else if ("ZYX" === t.order) {
					var l = o * u,
						d = o * h,
						p = a * u,
						f = a * h;
					e[0] = s * u, e[4] = p * c - d, e[8] = l * c + f, e[1] = s * h, e[5] = f * c + l, e[9] = d * c - p, e[2] = -c, e[6] = a * s, e[10] = o * s
				} else if ("YZX" === t.order) {
					var x = o * s,
						b = o * c,
						_ = a * s,
						w = a * c;
					e[0] = s * u, e[4] = w - x * h, e[8] = _ * h + b, e[1] = h, e[5] = o * u, e[9] = -a * u, e[2] = -c * u, e[6] = b * h + _, e[10] = x - w * h
				} else if ("XZY" === t.order) {
					var x = o * s,
						b = o * c,
						_ = a * s,
						w = a * c;
					e[0] = s * u, e[4] = -h, e[8] = c * u, e[1] = x * h + w, e[5] = o * u, e[9] = b * h - _, e[2] = _ * h - b, e[6] = a * u, e[10] = w * h + x
				}
				return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
			},
			makeRotationFromQuaternion : function(t) {
				var e = this.elements,
					n = t.x,
					i = t.y,
					r = t.z,
					o = t.w,
					a = n + n,
					s = i + i,
					c = r + r,
					u = n * a,
					h = n * s,
					l = n * c,
					d = i * s,
					p = i * c,
					f = r * c,
					m = o * a,
					v = o * s,
					g = o * c;
				return e[0] = 1 - (d + f), e[4] = h - g, e[8] = l + v, e[1] = h + g, e[5] = 1 - (u + f), e[9] = p - m, e[2] = l - v, e[6] = p + m, e[10] = 1 - (u + d), e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
			},
			lookAt : (function() {
				var t,
					e,
					n;
				return function(i, r, o) {
					void 0 == t && (t = new h, e = new h, n = new h);
					var a = this.elements;
					return n.subVectors(i, r).normalize(), 0 === n.lengthSq() && (n.z = 1), t.crossVectors(o, n).normalize(), 0 === t.lengthSq() && (n.z += 1e-4, t.crossVectors(o, n).normalize()), e.crossVectors(n, t), a[0] = t.x, a[4] = e.x, a[8] = n.x, a[1] = t.y, a[5] = e.y, a[9] = n.y, a[2] = t.z, a[6] = e.z, a[10] = n.z, this
				}
			})(),
			multiply : function(t, e) {
				return void 0 === e ? this.multiplyMatrices(this, t) : (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(t, e))
			},
			premultiply : function(t) {
				return this.multiplyMatrices(t, this)
			},
			multiplyMatrices : function(t, e) {
				var n = t.elements,
					i = e.elements,
					r = this.elements,
					o = n[0],
					a = n[4],
					s = n[8],
					c = n[12],
					u = n[1],
					h = n[5],
					l = n[9],
					d = n[13],
					p = n[2],
					f = n[6],
					m = n[10],
					v = n[14],
					g = n[3],
					y = n[7],
					x = n[11],
					b = n[15],
					_ = i[0],
					w = i[4],
					M = i[8],
					E = i[12],
					S = i[1],
					T = i[5],
					A = i[9],
					P = i[13],
					L = i[2],
					R = i[6],
					C = i[10],
					I = i[14],
					O = i[3],
					U = i[7],
					D = i[11],
					B = i[15];
				return r[0] = o * _ + a * S + s * L + c * O, r[4] = o * w + a * T + s * R + c * U, r[8] = o * M + a * A + s * C + c * D, r[12] = o * E + a * P + s * I + c * B, r[1] = u * _ + h * S + l * L + d * O, r[5] = u * w + h * T + l * R + d * U, r[9] = u * M + h * A + l * C + d * D, r[13] = u * E + h * P + l * I + d * B, r[2] = p * _ + f * S + m * L + v * O, r[6] = p * w + f * T + m * R + v * U, r[10] = p * M + f * A + m * C + v * D, r[14] = p * E + f * P + m * I + v * B, r[3] = g * _ + y * S + x * L + b * O, r[7] = g * w + y * T + x * R + b * U, r[11] = g * M + y * A + x * C + b * D, r[15] = g * E + y * P + x * I + b * B, this
			},
			multiplyToArray : function(t, e, n) {
				var i = this.elements;
				return this.multiplyMatrices(t, e), n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], n[9] = i[9], n[10] = i[10], n[11] = i[11], n[12] = i[12], n[13] = i[13], n[14] = i[14], n[15] = i[15], this
			},
			multiplyScalar : function(t) {
				var e = this.elements;
				return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
			},
			applyToVector3Array : (function() {
				var t;
				return function(e, n, i) {
					void 0 == t && (t = new h), void 0 === n && (n = 0), void 0 === i && (i = e.length);
					for (var r = 0, o = n; r < i; r += 3, o += 3) t.fromArray(e, o), t.applyMatrix4(this), t.toArray(e, o);
					return e
				}
			})(),
			applyToBufferAttribute : (function() {
				var t;
				return function(e) {
					void 0 == t && (t = new h);
					for (var n = 0, i = e.count; n < i; n++) t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix4(this), e.setXYZ(n, t.x, t.y, t.z);
					return e
				}
			})(),
			determinant : function() {
				var t = this.elements,
					e = t[0],
					n = t[4],
					i = t[8],
					r = t[12],
					o = t[1],
					a = t[5],
					s = t[9],
					c = t[13],
					u = t[2],
					h = t[6],
					l = t[10],
					d = t[14],
					p = t[3],
					f = t[7],
					m = t[11],
					v = t[15];
				return p * (+r * s * h - i * c * h - r * a * l + n * c * l + i * a * d - n * s * d) + f * (+e * s * d - e * c * l + r * o * l - i * o * d + i * c * u - r * s * u) + m * (+e * c * h - e * a * d - r * o * h + n * o * d + r * a * u - n * c * u) + v * (-i * a * u - e * s * h + e * a * l + i * o * h - n * o * l + n * s * u)
			},
			transpose : function() {
				var t = this.elements,
					e = t[1];
				return t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
			},
			setPosition : function(t) {
				var e = this.elements;
				return e[12] = t.x, e[13] = t.y, e[14] = t.z, this
			},
			getInverse : function(t, e) {
				var n = this.elements,
					i = t.elements,
					r = i[0],
					o = i[1],
					a = i[2],
					s = i[3],
					c = i[4],
					u = i[5],
					h = i[6],
					l = i[7],
					d = i[8],
					p = i[9],
					f = i[10],
					m = i[11],
					v = i[12],
					g = i[13],
					y = i[14],
					x = i[15],
					b = p * y * l - g * f * l + g * h * m - u * y * m - p * h * x + u * f * x,
					_ = v * f * l - d * y * l - v * h * m + c * y * m + d * h * x - c * f * x,
					w = d * g * l - v * p * l + v * u * m - c * g * m - d * u * x + c * p * x,
					M = v * p * h - d * g * h - v * u * f + c * g * f + d * u * y - c * p * y,
					E = r * b + o * _ + a * w + s * M;
				if (0 == E) {
					var S = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
					if (!0 === e)
						throw new Error(S);
					return console.warn(S), this.identity()
				}
				var T = 1 / E;
				return n[0] = b * T, n[1] = (g * f * s - p * y * s - g * a * m + o * y * m + p * a * x - o * f * x) * T, n[2] = (u * y * s - g * h * s + g * a * l - o * y * l - u * a * x + o * h * x) * T, n[3] = (p * h * s - u * f * s - p * a * l + o * f * l + u * a * m - o * h * m) * T, n[4] = _ * T, n[5] = (d * y * s - v * f * s + v * a * m - r * y * m - d * a * x + r * f * x) * T, n[6] = (v * h * s - c * y * s - v * a * l + r * y * l + c * a * x - r * h * x) * T, n[7] = (c * f * s - d * h * s + d * a * l - r * f * l - c * a * m + r * h * m) * T, n[8] = w * T, n[9] = (v * p * s - d * g * s - v * o * m + r * g * m + d * o * x - r * p * x) * T, n[10] = (c * g * s - v * u * s + v * o * l - r * g * l - c * o * x + r * u * x) * T, n[11] = (d * u * s - c * p * s - d * o * l + r * p * l + c * o * m - r * u * m) * T, n[12] = M * T, n[13] = (d * g * a - v * p * a + v * o * f - r * g * f - d * o * y + r * p * y) * T, n[14] = (v * u * a - c * g * a - v * o * h + r * g * h + c * o * y - r * u * y) * T, n[15] = (c * p * a - d * u * a + d * o * h - r * p * h - c * o * f + r * u * f) * T, this
			},
			scale : function(t) {
				var e = this.elements,
					n = t.x,
					i = t.y,
					r = t.z;
				return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this
			},
			getMaxScaleOnAxis : function() {
				var t = this.elements,
					e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
					n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
					i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
				return Math.sqrt(Math.max(e, n, i))
			},
			makeTranslation : function(t, e, n) {
				return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
			},
			makeRotationX : function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
			},
			makeRotationY : function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
			},
			makeRotationZ : function(t) {
				var e = Math.cos(t),
					n = Math.sin(t);
				return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
			},
			makeRotationAxis : function(t, e) {
				var n = Math.cos(e),
					i = Math.sin(e),
					r = 1 - n,
					o = t.x,
					a = t.y,
					s = t.z,
					c = r * o,
					u = r * a;
				return this.set(c * o + n, c * a - i * s, c * s + i * a, 0, c * a + i * s, u * a + n, u * s - i * o, 0, c * s - i * a, u * s + i * o, r * s * s + n, 0, 0, 0, 0, 1), this
			},
			makeScale : function(t, e, n) {
				return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
			},
			makeShear : function(t, e, n) {
				return this.set(1, e, n, 0, t, 1, n, 0, t, e, 1, 0, 0, 0, 0, 1), this
			},
			compose : function(t, e, n) {
				return this.makeRotationFromQuaternion(e), this.scale(n), this.setPosition(t), this
			},
			decompose : (function() {
				var t,
					e;
				return function(n, i, r) {
					void 0 == t && (t = new h, e = new l);
					var o = this.elements,
						a = t.set(o[0], o[1], o[2]).length(),
						s = t.set(o[4], o[5], o[6]).length(),
						c = t.set(o[8], o[9], o[10]).length(),
						u = this.determinant();
					0 > u && (a = -a), n.x = o[12], n.y = o[13], n.z = o[14], e.elements.set(this.elements);
					var d = 1 / a,
						p = 1 / s,
						f = 1 / c;
					return e.elements[0] *= d, e.elements[1] *= d, e.elements[2] *= d, e.elements[4] *= p, e.elements[5] *= p, e.elements[6] *= p, e.elements[8] *= f, e.elements[9] *= f, e.elements[10] *= f, i.setFromRotationMatrix(e), r.x = a, r.y = s, r.z = c, this
				}
			})(),
			makeFrustum : function(t, e, n, i, r, o) {
				var a = this.elements;
				return a[0] = 2 * r / (e - t), a[4] = 0, a[8] = (e + t) / (e - t), a[12] = 0, a[1] = 0, a[5] = 2 * r / (i - n), a[9] = (i + n) / (i - n), a[13] = 0, a[2] = 0, a[6] = 0, a[10] = -(o + r) / (o - r), a[14] = -2 * o * r / (o - r), a[3] = 0, a[7] = 0, a[11] = -1, a[15] = 0, this
			},
			makePerspective : function(t, e, n, i) {
				var r = n * Math.tan(.5 * (Ya.DEG2RAD * t)),
					o = -r;
				return this.makeFrustum(o * e, r * e, o, r, n, i)
			},
			makeOrthographic : function(t, e, n, i, r, o) {
				var a = this.elements,
					s = 1 / (e - t),
					c = 1 / (n - i),
					u = 1 / (o - r);
				return a[0] = 2 * s, a[4] = 0, a[8] = 0, a[12] = -((e + t) * s), a[1] = 0, a[5] = 2 * c, a[9] = 0, a[13] = -((n + i) * c), a[2] = 0, a[6] = 0, a[10] = -2 * u, a[14] = -((o + r) * u), a[3] = 0, a[7] = 0, a[11] = 0, a[15] = 1, this
			},
			equals : function(t) {
				for (var e = this.elements, n = t.elements, i = 0; 16 > i; i++)
					if (e[i] !== n[i]) return !1;
				return !0
			},
			fromArray : function(t, e) {
				void 0 === e && (e = 0);
				for (var n = 0; 16 > n; n++) this.elements[n] = t[n + e];
				return this
			},
			toArray : function(t, e) {
				void 0 === t && (t = []), void 0 === e && (e = 0);
				var n = this.elements;
				return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
			}
		}, d.prototype = Object.create(o.prototype), d.prototype.constructor = d, d.prototype.isCubeTexture = !0, Object.defineProperty(d.prototype, "images", {
			get : function() {
				return this.image
			},
			set : function(t) {
				this.image = t
			}
		});
		var Ja = new o,
			Ka = new d,
			Qa = [],
			$a = [];
		j.prototype.setValue = function(t, e) {
			for (var n = this.seq, i = 0, r = n.length; i !== r; ++i) {
				var o = n[i];
				o.setValue(t, e[o.id])
			}
		};
		var ts = /([\w\d_]+)(\])?(\[|\.)?/g;
		X.prototype.setValue = function(t, e, n) {
			var i = this.map[e];
			void 0 !== i && i.setValue(t, n, this.renderer)
		}, X.prototype.set = function(t, e, n) {
			var i = this.map[n];
			void 0 !== i && i.setValue(t, e[n], this.renderer)
		}, X.prototype.setOptional = function(t, e, n) {
			var i = e[n];
			void 0 !== i && this.setValue(t, n, i)
		}, X.upload = function(t, e, n, i) {
			for (var r = 0, o = e.length; r !== o; ++r) {
				var a = e[r],
					s = n[a.id];
				!1 !== s.needsUpdate && a.setValue(t, s.value, i)
			}
		}, X.seqWithValue = function(t, e) {
			for (var n = [], i = 0, r = t.length; i !== r; ++i) {
				var o = t[i];
				o.id in e && n.push(o)
			}
			return n
		};
		var es = {
				merge : function(t) {
					for (var e = {}, n = 0; n < t.length; n++) {
						var i = this.clone(t[n]);
						for (var r in i) e[r] = i[r]
					}
					return e
				},
				clone : function(t) {
					var e = {};
					for (var n in t)
						for (var i in e[n] = {}, t[n]) {
							var r = t[n][i];
							e[n][i] = r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? r.clone() : Array.isArray(r) ? r.slice() : r
					}
					return e
				}
			},
			ns = {
				alphamap_fragment : "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
				alphamap_pars_fragment : "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
				alphatest_fragment : "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
				aomap_fragment : "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
				aomap_pars_fragment : "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
				begin_vertex : "\nvec3 transformed = vec3( position );\n",
				beginnormal_vertex : "\nvec3 objectNormal = vec3( normal );\n",
				bsdfs : "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t\t}\n\t\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 ltcTextureCoords( const in GeometricContext geometry, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = (LUT_SIZE - 1.0)/LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5/LUT_SIZE;\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nvoid clipQuadToHorizon( inout vec3 L[5], out int n ) {\n\tint config = 0;\n\tif ( L[0].z > 0.0 ) config += 1;\n\tif ( L[1].z > 0.0 ) config += 2;\n\tif ( L[2].z > 0.0 ) config += 4;\n\tif ( L[3].z > 0.0 ) config += 8;\n\tn = 0;\n\tif ( config == 0 ) {\n\t} else if ( config == 1 ) {\n\t\tn = 3;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 2 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 3 ) {\n\t\tn = 4;\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t\tL[3] = -L[3].z * L[0] + L[0].z * L[3];\n\t} else if ( config == 4 ) {\n\t\tn = 3;\n\t\tL[0] = -L[3].z * L[2] + L[2].z * L[3];\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t} else if ( config == 5 ) {\n\t\tn = 0;\n\t} else if ( config == 6 ) {\n\t\tn = 4;\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 7 ) {\n\t\tn = 5;\n\t\tL[4] = -L[3].z * L[0] + L[0].z * L[3];\n\t\tL[3] = -L[3].z * L[2] + L[2].z * L[3];\n\t} else if ( config == 8 ) {\n\t\tn = 3;\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[1] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] =  L[3];\n\t} else if ( config == 9 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t\tL[2] = -L[2].z * L[3] + L[3].z * L[2];\n\t} else if ( config == 10 ) {\n\t\tn = 0;\n\t} else if ( config == 11 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = -L[2].z * L[3] + L[3].z * L[2];\n\t\tL[2] = -L[2].z * L[1] + L[1].z * L[2];\n\t} else if ( config == 12 ) {\n\t\tn = 4;\n\t\tL[1] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[0] = -L[0].z * L[3] + L[3].z * L[0];\n\t} else if ( config == 13 ) {\n\t\tn = 5;\n\t\tL[4] = L[3];\n\t\tL[3] = L[2];\n\t\tL[2] = -L[1].z * L[2] + L[2].z * L[1];\n\t\tL[1] = -L[1].z * L[0] + L[0].z * L[1];\n\t} else if ( config == 14 ) {\n\t\tn = 5;\n\t\tL[4] = -L[0].z * L[3] + L[3].z * L[0];\n\t\tL[0] = -L[0].z * L[1] + L[1].z * L[0];\n\t} else if ( config == 15 ) {\n\t\tn = 4;\n\t}\n\tif ( n == 3 )\n\t\tL[3] = L[0];\n\tif ( n == 4 )\n\t\tL[4] = L[0];\n}\nfloat integrateLtcBrdfOverRectEdge( vec3 v1, vec3 v2 ) {\n\tfloat cosTheta = dot( v1, v2 );\n\tfloat theta = acos( cosTheta );\n\tfloat res = cross( v1, v2 ).z * ( ( theta > 0.001 ) ? theta / sin( theta ) : 1.0 );\n\treturn res;\n}\nvoid initRectPoints( const in vec3 pos, const in vec3 halfWidth, const in vec3 halfHeight, out vec3 rectPoints[4] ) {\n\trectPoints[0] = pos - halfWidth - halfHeight;\n\trectPoints[1] = pos + halfWidth - halfHeight;\n\trectPoints[2] = pos + halfWidth + halfHeight;\n\trectPoints[3] = pos - halfWidth + halfHeight;\n}\nvec3 integrateLtcBrdfOverRect( const in GeometricContext geometry, const in mat3 brdfMat, const in vec3 rectPoints[4] ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 P = geometry.position;\n\tvec3 T1, T2;\n\tT1 = normalize(V - N * dot( V, N ));\n\tT2 = - cross( N, T1 );\n\tmat3 brdfWrtSurface = brdfMat * transpose( mat3( T1, T2, N ) );\n\tvec3 clippedRect[5];\n\tclippedRect[0] = brdfWrtSurface * ( rectPoints[0] - P );\n\tclippedRect[1] = brdfWrtSurface * ( rectPoints[1] - P );\n\tclippedRect[2] = brdfWrtSurface * ( rectPoints[2] - P );\n\tclippedRect[3] = brdfWrtSurface * ( rectPoints[3] - P );\n\tint n;\n\tclipQuadToHorizon(clippedRect, n);\n\tif ( n == 0 )\n\t\treturn vec3( 0, 0, 0 );\n\tclippedRect[0] = normalize( clippedRect[0] );\n\tclippedRect[1] = normalize( clippedRect[1] );\n\tclippedRect[2] = normalize( clippedRect[2] );\n\tclippedRect[3] = normalize( clippedRect[3] );\n\tclippedRect[4] = normalize( clippedRect[4] );\n\tfloat sum = 0.0;\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[0], clippedRect[1] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[1], clippedRect[2] );\n\tsum += integrateLtcBrdfOverRectEdge( clippedRect[2], clippedRect[3] );\n\tif (n >= 4)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[3], clippedRect[4] );\n\tif (n == 5)\n\t\tsum += integrateLtcBrdfOverRectEdge( clippedRect[4], clippedRect[0] );\n\tsum = max( 0.0, sum );\n\tvec3 Lo_i = vec3( sum, sum, sum );\n\treturn Lo_i;\n}\nvec3 Rect_Area_Light_Specular_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight,\n\t\tconst in float roughness,\n\t\tconst in sampler2D ltcMat, const in sampler2D ltcMag ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tvec2 uv = ltcTextureCoords( geometry, roughness );\n\tvec4 brdfLtcApproxParams, t;\n\tbrdfLtcApproxParams = texture2D( ltcMat, uv );\n\tt = texture2D( ltcMat, uv );\n\tfloat brdfLtcScalar = texture2D( ltcMag, uv ).a;\n\tmat3 brdfLtcApproxMat = mat3(\n\t\tvec3(   1,   0, t.y ),\n\t\tvec3(   0, t.z,   0 ),\n\t\tvec3( t.w,   0, t.x )\n\t);\n\tvec3 specularReflectance = integrateLtcBrdfOverRect( geometry, brdfLtcApproxMat, rectPoints );\n\tspecularReflectance *= brdfLtcScalar;\n\treturn specularReflectance;\n}\nvec3 Rect_Area_Light_Diffuse_Reflectance(\n\t\tconst in GeometricContext geometry,\n\t\tconst in vec3 lightPos, const in vec3 lightHalfWidth, const in vec3 lightHalfHeight ) {\n\tvec3 rectPoints[4];\n\tinitRectPoints( lightPos, lightHalfWidth, lightHalfHeight, rectPoints );\n\tmat3 diffuseBrdfMat = mat3(1);\n\tvec3 diffuseReflectance = integrateLtcBrdfOverRect( geometry, diffuseBrdfMat, rectPoints );\n\treturn diffuseReflectance;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
				bumpmap_pars_fragment : "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
				clipping_planes_fragment : "#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",
				clipping_planes_pars_fragment : "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
				clipping_planes_pars_vertex : "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
				clipping_planes_vertex : "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
				color_fragment : "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
				color_pars_fragment : "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
				color_pars_vertex : "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
				color_vertex : "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
				common : "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transpose( const in mat3 v ) {\n\tmat3 tmp;\n\ttmp[0] = vec3(v[0].x, v[1].x, v[2].x);\n\ttmp[1] = vec3(v[0].y, v[1].y, v[2].y);\n\ttmp[2] = vec3(v[0].z, v[1].z, v[2].z);\n\treturn tmp;\n}\n",
				cube_uv_reflection_fragment : "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
				defaultnormal_vertex : "#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
				displacementmap_pars_vertex : "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
				displacementmap_vertex : "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
				emissivemap_fragment : "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
				emissivemap_pars_fragment : "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
				encodings_fragment : "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
				encodings_pars_fragment : "\nvec4 LinearToLinear( in vec4 value ) {\n  return value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n  return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n  return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n  float maxComponent = max( max( value.r, value.g ), value.b );\n  float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n  return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n  return vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n  float maxRGB = max( value.x, max( value.g, value.b ) );\n  float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n  M            = ceil( M * 255.0 ) / 255.0;\n  return vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n    float maxRGB = max( value.x, max( value.g, value.b ) );\n    float D      = max( maxRange / maxRGB, 1.0 );\n    D            = min( floor( D ) / 255.0, 1.0 );\n    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n  vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n  Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n  vec4 vResult;\n  vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n  float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n  vResult.w = fract(Le);\n  vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n  return vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n  float Le = value.z * 255.0 + value.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n  Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n  vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n  return vec4( max(vRGB, 0.0), 1.0 );\n}\n",
				envmap_fragment : "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
				envmap_pars_fragment : "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
				envmap_pars_vertex : "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
				envmap_vertex : "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
				fog_fragment : "#ifdef USE_FOG\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
				fog_pars_fragment : "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
				gradientmap_pars_fragment : "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
				lightmap_fragment : "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
				lightmap_pars_fragment : "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
				lights_lambert_vertex : "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
				lights_pars : "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
				lights_phong_fragment : "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
				lights_phong_pars_fragment : "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\n#if NUM_RECT_AREA_LIGHTS > 0\n    void RE_Direct_RectArea_BlinnPhong( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n        vec3 matDiffColor = material.diffuseColor;\n        vec3 matSpecColor = material.specularColor;\n        vec3 lightColor   = rectAreaLight.color;\n        float roughness = BlinnExponentToGGXRoughness( material.specularShininess );\n        vec3 spec = Rect_Area_Light_Specular_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n                roughness,\n                ltcMat, ltcMag );\n        vec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n        reflectedLight.directSpecular += lightColor * matSpecColor * spec / PI2;\n        reflectedLight.directDiffuse  += lightColor * matDiffColor * diff / PI2;\n    }\n#endif\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
				lights_physical_fragment : "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
				lights_physical_pars_fragment : "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n    void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n        vec3 matDiffColor = material.diffuseColor;\n        vec3 matSpecColor = material.specularColor;\n        vec3 lightColor   = rectAreaLight.color;\n        float roughness = material.specularRoughness;\n        vec3 spec = Rect_Area_Light_Specular_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight,\n                roughness,\n                ltcMat, ltcMag );\n        vec3 diff = Rect_Area_Light_Diffuse_Reflectance(\n                geometry,\n                rectAreaLight.position, rectAreaLight.halfWidth, rectAreaLight.halfHeight );\n        reflectedLight.directSpecular += lightColor * matSpecColor * spec;\n        reflectedLight.directDiffuse  += lightColor * matDiffColor * diff;\n    }\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
				lights_template : "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t \tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\t\t\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
				logdepthbuf_fragment : "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",
				logdepthbuf_pars_fragment : "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
				logdepthbuf_pars_vertex : "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
				logdepthbuf_vertex : "#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",
				map_fragment : "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
				map_pars_fragment : "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
				map_particle_fragment : "#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
				map_particle_pars_fragment : "#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",
				metalnessmap_fragment : "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.r;\n#endif\n",
				metalnessmap_pars_fragment : "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
				morphnormal_vertex : "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
				morphtarget_pars_vertex : "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
				morphtarget_vertex : "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
				normal_flip : "#ifdef DOUBLE_SIDED\n\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#else\n\tfloat flipNormal = 1.0;\n#endif\n",
				normal_fragment : "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal ) * flipNormal;\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
				normalmap_pars_fragment : "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
				packing : "vec3 packNormalToRGB( const in vec3 normal ) {\n  return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n  return 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n  return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n  return linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n  return (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n  return ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
				premultiplied_alpha_fragment : "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
				project_vertex : "#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",
				roughnessmap_fragment : "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.r;\n#endif\n",
				roughnessmap_pars_fragment : "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
				shadowmap_pars_fragment : "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn 1.0;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tfloat dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
				shadowmap_pars_vertex : "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n#endif\n",
				shadowmap_vertex : "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n    #if NUM_RECT_AREA_LIGHTS > 0\n    #endif\n#endif\n",
				shadowmask_pars_fragment : "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
				skinbase_vertex : "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
				skinning_pars_vertex : "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
				skinning_vertex : "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n",
				skinnormal_vertex : "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
				specularmap_fragment : "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
				specularmap_pars_fragment : "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
				tonemapping_fragment : "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
				tonemapping_pars_fragment : "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n  return toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  color = max( vec3( 0.0 ), color - 0.004 );\n  return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
				uv_pars_fragment : "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
				uv_pars_vertex : "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",
				uv_vertex : "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
				uv2_pars_fragment : "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
				uv2_pars_vertex : "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
				uv2_vertex : "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
				worldpos_vertex : "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n",
				cube_frag : "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
				cube_vert : "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
				depth_frag : "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
				depth_vert : "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
				distanceRGBA_frag : "uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",
				distanceRGBA_vert : "varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition;\n}\n",
				equirect_frag : "uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
				equirect_vert : "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
				linedashed_frag : "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				linedashed_vert : "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
				meshbasic_frag : "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				meshbasic_vert : "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n}\n",
				meshlambert_frag : "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				meshlambert_vert : "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n}\n",
				meshphong_frag : "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				meshphong_vert : "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n}\n",
				meshphysical_frag : "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				meshphysical_vert : "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
				normal_frag : "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n\t#include <premultiplied_alpha_fragment>\n\t#include <encodings_fragment>\n}\n",
				normal_vert : "#define NORMAL\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED  ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
				points_frag : "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
				points_vert : "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
				shadow_frag : "uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0  - getShadowMask() ) );\n}\n",
				shadow_vert : "#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n"
			};
		q.prototype = {
			constructor : q,
			isColor : !0,
			r : 1,
			g : 1,
			b : 1,
			set : function(t) {
				return t && t.isColor ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t), this
			},
			setScalar : function(t) {
				return this.r = t, this.g = t, this.b = t, this
			},
			setHex : function(t) {
				return t = Math.floor(t), this.r = (255 & t >> 16) / 255, this.g = (255 & t >> 8) / 255, this.b = (255 & t) / 255, this
			},
			setRGB : function(t, e, n) {
				return this.r = t, this.g = e, this.b = n, this
			},
			setHSL : (function() {
				function t(t, e, n) {
					return 0 > n && (n += 1), 1 < n && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
				}
				return function(e, n, i) {
					if (e = Ya.euclideanModulo(e, 1), n = Ya.clamp(n, 0, 1), i = Ya.clamp(i, 0, 1), 0 === n)
						this.r = this.g = this.b = i;else {
						var r = .5 >= i ? i * (1 + n) : i + n - i * n,
							o = 2 * i - r;
						this.r = t(o, r, e + 1 / 3), this.g = t(o, r, e), this.b = t(o, r, e - 1 / 3)
					}
					return this
				}
			})(),
			setStyle : function(t) {
				function e(e) {
					void 0 !== e && 1 > parseFloat(e) && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
				}
				var n;
				if (n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)) {
					var i,
						r = n[1],
						o = n[2];
					switch (r) {
					case "rgb":
					case "rgba":
						if (i = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o)) return this.r = Math.min(255, parseInt(i[1], 10)) / 255, this.g = Math.min(255, parseInt(i[2], 10)) / 255, this.b = Math.min(255, parseInt(i[3], 10)) / 255, e(i[5]), this;
						if (i = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o)) return this.r = Math.min(100, parseInt(i[1], 10)) / 100, this.g = Math.min(100, parseInt(i[2], 10)) / 100, this.b = Math.min(100, parseInt(i[3], 10)) / 100, e(i[5]), this;
						break;case "hsl":
					case "hsla":
						if (i = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(o)) {
							var a = parseFloat(i[1]) / 360,
								s = parseInt(i[2], 10) / 100,
								c = parseInt(i[3], 10) / 100;
							return e(i[5]), this.setHSL(a, s, c)
						}
					}
				} else if (n = /^\#([A-Fa-f0-9]+)$/.exec(t)) {
					var u = n[1],
						h = u.length;
					if (3 === h) return this.r = parseInt(u.charAt(0) + u.charAt(0), 16) / 255, this.g = parseInt(u.charAt(1) + u.charAt(1), 16) / 255, this.b = parseInt(u.charAt(2) + u.charAt(2), 16) / 255, this;
					if (6 === h) return this.r = parseInt(u.charAt(0) + u.charAt(1), 16) / 255, this.g = parseInt(u.charAt(2) + u.charAt(3), 16) / 255, this.b = parseInt(u.charAt(4) + u.charAt(5), 16) / 255, this
				}
				if (t && 0 < t.length) {
					var u = is[t];
					void 0 === u ? console.warn("THREE.Color: Unknown color " + t) : this.setHex(u)
				}
				return this
			},
			clone : function() {
				return new this.constructor(this.r, this.g, this.b)
			},
			copy : function(t) {
				return this.r = t.r, this.g = t.g, this.b = t.b, this
			},
			copyGammaToLinear : function(t, e) {
				return void 0 === e && (e = 2), this.r = Math.pow(t.r, e), this.g = Math.pow(t.g, e), this.b = Math.pow(t.b, e), this
			},
			copyLinearToGamma : function(t, e) {
				void 0 === e && (e = 2);
				var n = 0 < e ? 1 / e : 1;
				return this.r = Math.pow(t.r, n), this.g = Math.pow(t.g, n), this.b = Math.pow(t.b, n), this
			},
			convertGammaToLinear : function() {
				var t = this.r,
					e = this.g,
					n = this.b;
				return this.r = t * t, this.g = e * e, this.b = n * n, this
			},
			convertLinearToGamma : function() {
				return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
			},
			getHex : function() {
				return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
			},
			getHexString : function() {
				return ("000000" + this.getHex().toString(16)).slice(-6)
			},
			getHSL : function(t) {
				var e,
					n,
					i = t || {
						h : 0,
						s : 0,
						l : 0
					},
					r = this.r,
					o = this.g,
					a = this.b,
					s = Math.max(r, o, a),
					c = Math.min(r, o, a),
					u = (c + s) / 2;
				if (c === s) e = 0, n = 0;else {
					var h = s - c;
					n = .5 >= u ? h / (s + c) : h / (2 - s - c), s === r ? e = (o - a) / h + (o < a ? 6 : 0) : s === o ? e = (a - r) / h + 2 : s === a ? e = (r - o) / h + 4 : void 0, e /= 6
				}
				return i.h = e, i.s = n, i.l = u, i
			},
			getStyle : function() {
				return "rgb(" + (0 | 255 * this.r) + "," + (0 | 255 * this.g) + "," + (0 | 255 * this.b) + ")"
			},
			offsetHSL : function(t, e, n) {
				var i = this.getHSL();
				return i.h += t, i.s += e, i.l += n, this.setHSL(i.h, i.s, i.l), this
			},
			add : function(t) {
				return this.r += t.r, this.g += t.g, this.b += t.b, this
			},
			addColors : function(t, e) {
				return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
			},
			addScalar : function(t) {
				return this.r += t, this.g += t, this.b += t, this
			},
			sub : function(t) {
				return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
			},
			multiply : function(t) {
				return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
			},
			multiplyScalar : function(t) {
				return this.r *= t, this.g *= t, this.b *= t, this
			},
			lerp : function(t, e) {
				return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
			},
			equals : function(t) {
				return t.r === this.r && t.g === this.g && t.b === this.b
			},
			fromArray : function(t, e) {
				return void 0 === e && (e = 0), this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
			},
			toJSON : function() {
				return this.getHex()
			}
		};
		var is = {
			aliceblue : 15792383,
			antiquewhite : 16444375,
			aqua : 65535,
			aquamarine : 8388564,
			azure : 15794175,
			beige : 16119260,
			bisque : 16770244,
			black : 0,
			blanchedalmond : 16772045,
			blue : 255,
			blueviolet : 9055202,
			brown : 10824234,
			burlywood : 14596231,
			cadetblue : 6266528,
			chartreuse : 8388352,
			chocolate : 13789470,
			coral : 16744272,
			cornflowerblue : 6591981,
			cornsilk : 16775388,
			crimson : 14423100,
			cyan : 65535,
			darkblue : 139,
			darkcyan : 35723,
			darkgoldenrod : 12092939,
			darkgray : 11119017,
			darkgreen : 25600,
			darkgrey : 11119017,
			darkkhaki : 12433259,
			darkmagenta : 9109643,
			darkolivegreen : 5597999,
			darkorange : 16747520,
			darkorchid : 10040012,
			darkred : 9109504,
			darksalmon : 15308410,
			darkseagreen : 9419919,
			darkslateblue : 4734347,
			darkslategray : 3100495,
			darkslategrey : 3100495,
			darkturquoise : 52945,
			darkviolet : 9699539,
			deeppink : 16716947,
			deepskyblue : 49151,
			dimgray : 6908265,
			dimgrey : 6908265,
			dodgerblue : 2003199,
			firebrick : 11674146,
			floralwhite : 16775920,
			forestgreen : 2263842,
			fuchsia : 16711935,
			gainsboro : 14474460,
			ghostwhite : 16316671,
			gold : 16766720,
			goldenrod : 14329120,
			gray : 8421504,
			green : 32768,
			greenyellow : 11403055,
			grey : 8421504,
			honeydew : 15794160,
			hotpink : 16738740,
			indianred : 13458524,
			indigo : 4915330,
			ivory : 16777200,
			khaki : 15787660,
			lavender : 15132410,
			lavenderblush : 16773365,
			lawngreen : 8190976,
			lemonchiffon : 16775885,
			lightblue : 11393254,
			lightcoral : 15761536,
			lightcyan : 14745599,
			lightgoldenrodyellow : 16448210,
			lightgray : 13882323,
			lightgreen : 9498256,
			lightgrey : 13882323,
			lightpink : 16758465,
			lightsalmon : 16752762,
			lightseagreen : 2142890,
			lightskyblue : 8900346,
			lightslategray : 7833753,
			lightslategrey : 7833753,
			lightsteelblue : 11584734,
			lightyellow : 16777184,
			lime : 65280,
			limegreen : 3329330,
			linen : 16445670,
			magenta : 16711935,
			maroon : 8388608,
			mediumaquamarine : 6737322,
			mediumblue : 205,
			mediumorchid : 12211667,
			mediumpurple : 9662683,
			mediumseagreen : 3978097,
			mediumslateblue : 8087790,
			mediumspringgreen : 64154,
			mediumturquoise : 4772300,
			mediumvioletred : 13047173,
			midnightblue : 1644912,
			mintcream : 16121850,
			mistyrose : 16770273,
			moccasin : 16770229,
			navajowhite : 16768685,
			navy : 128,
			oldlace : 16643558,
			olive : 8421376,
			olivedrab : 7048739,
			orange : 16753920,
			orangered : 16729344,
			orchid : 14315734,
			palegoldenrod : 15657130,
			palegreen : 10025880,
			paleturquoise : 11529966,
			palevioletred : 14381203,
			papayawhip : 16773077,
			peachpuff : 16767673,
			peru : 13468991,
			pink : 16761035,
			plum : 14524637,
			powderblue : 11591910,
			purple : 8388736,
			red : 16711680,
			rosybrown : 12357519,
			royalblue : 4286945,
			saddlebrown : 9127187,
			salmon : 16416882,
			sandybrown : 16032864,
			seagreen : 3050327,
			seashell : 16774638,
			sienna : 10506797,
			silver : 12632256,
			skyblue : 8900331,
			slateblue : 6970061,
			slategray : 7372944,
			slategrey : 7372944,
			snow : 16775930,
			springgreen : 65407,
			steelblue : 4620980,
			tan : 13808780,
			teal : 32896,
			thistle : 14204888,
			tomato : 16737095,
			turquoise : 4251856,
			violet : 15631086,
			wheat : 16113331,
			white : 16777215,
			whitesmoke : 16119285,
			yellow : 16776960,
			yellowgreen : 10145074
		};
		Y.prototype = Object.create(o.prototype), Y.prototype.constructor = Y, Y.prototype.isDataTexture = !0;
		var rs = {
				common : {
					diffuse : {
						value : new q(15658734)
					},
					opacity : {
						value : 1
					},
					map : {
						value : null
					},
					offsetRepeat : {
						value : new a(0, 0, 1, 1)
					},
					specularMap : {
						value : null
					},
					alphaMap : {
						value : null
					},
					envMap : {
						value : null
					},
					flipEnvMap : {
						value : -1
					},
					reflectivity : {
						value : 1
					},
					refractionRatio : {
						value : .98
					}
				},
				aomap : {
					aoMap : {
						value : null
					},
					aoMapIntensity : {
						value : 1
					}
				},
				lightmap : {
					lightMap : {
						value : null
					},
					lightMapIntensity : {
						value : 1
					}
				},
				emissivemap : {
					emissiveMap : {
						value : null
					}
				},
				bumpmap : {
					bumpMap : {
						value : null
					},
					bumpScale : {
						value : 1
					}
				},
				normalmap : {
					normalMap : {
						value : null
					},
					normalScale : {
						value : new r(1, 1)
					}
				},
				displacementmap : {
					displacementMap : {
						value : null
					},
					displacementScale : {
						value : 1
					},
					displacementBias : {
						value : 0
					}
				},
				roughnessmap : {
					roughnessMap : {
						value : null
					}
				},
				metalnessmap : {
					metalnessMap : {
						value : null
					}
				},
				gradientmap : {
					gradientMap : {
						value : null
					}
				},
				fog : {
					fogDensity : {
						value : 25e-5
					},
					fogNear : {
						value : 1
					},
					fogFar : {
						value : 2e3
					},
					fogColor : {
						value : new q(16777215)
					}
				},
				lights : {
					ambientLightColor : {
						value : []
					},
					directionalLights : {
						value : [],
						properties : {
							direction : {},
							color : {},
							shadow : {},
							shadowBias : {},
							shadowRadius : {},
							shadowMapSize : {}
						}
					},
					directionalShadowMap : {
						value : []
					},
					directionalShadowMatrix : {
						value : []
					},
					spotLights : {
						value : [],
						properties : {
							color : {},
							position : {},
							direction : {},
							distance : {},
							coneCos : {},
							penumbraCos : {},
							decay : {},
							shadow : {},
							shadowBias : {},
							shadowRadius : {},
							shadowMapSize : {}
						}
					},
					spotShadowMap : {
						value : []
					},
					spotShadowMatrix : {
						value : []
					},
					pointLights : {
						value : [],
						properties : {
							color : {},
							position : {},
							decay : {},
							distance : {},
							shadow : {},
							shadowBias : {},
							shadowRadius : {},
							shadowMapSize : {}
						}
					},
					pointShadowMap : {
						value : []
					},
					pointShadowMatrix : {
						value : []
					},
					hemisphereLights : {
						value : [],
						properties : {
							direction : {},
							skyColor : {},
							groundColor : {}
						}
					},
					rectAreaLights : {
						value : [],
						properties : {
							color : {},
							position : {},
							width : {},
							height : {}
						}
					}
				},
				points : {
					diffuse : {
						value : new q(15658734)
					},
					opacity : {
						value : 1
					},
					size : {
						value : 1
					},
					scale : {
						value : 1
					},
					map : {
						value : null
					},
					offsetRepeat : {
						value : new a(0, 0, 1, 1)
					}
				}
			},
			os = {
				basic : {
					uniforms : es.merge([ rs.common, rs.aomap, rs.lightmap, rs.fog ]),
					vertexShader : ns.meshbasic_vert,
					fragmentShader : ns.meshbasic_frag
				},
				lambert : {
					uniforms : es.merge([ rs.common, rs.aomap, rs.lightmap, rs.emissivemap, rs.fog, rs.lights, {
						emissive : {
							value : new q(0)
						}
					} ]),
					vertexShader : ns.meshlambert_vert,
					fragmentShader : ns.meshlambert_frag
				},
				phong : {
					uniforms : es.merge([ rs.common, rs.aomap, rs.lightmap, rs.emissivemap, rs.bumpmap, rs.normalmap, rs.displacementmap, rs.gradientmap, rs.fog, rs.lights, {
						emissive : {
							value : new q(0)
						},
						specular : {
							value : new q(1118481)
						},
						shininess : {
							value : 30
						}
					} ]),
					vertexShader : ns.meshphong_vert,
					fragmentShader : ns.meshphong_frag
				},
				standard : {
					uniforms : es.merge([ rs.common, rs.aomap, rs.lightmap, rs.emissivemap, rs.bumpmap, rs.normalmap, rs.displacementmap, rs.roughnessmap, rs.metalnessmap, rs.fog, rs.lights, {
						emissive : {
							value : new q(0)
						},
						roughness : {
							value : .5
						},
						metalness : {
							value : 0
						},
						envMapIntensity : {
							value : 1
						}
					} ]),
					vertexShader : ns.meshphysical_vert,
					fragmentShader : ns.meshphysical_frag
				},
				points : {
					uniforms : es.merge([ rs.points, rs.fog ]),
					vertexShader : ns.points_vert,
					fragmentShader : ns.points_frag
				},
				dashed : {
					uniforms : es.merge([ rs.common, rs.fog, {
						scale : {
							value : 1
						},
						dashSize : {
							value : 1
						},
						totalSize : {
							value : 2
						}
					} ]),
					vertexShader : ns.linedashed_vert,
					fragmentShader : ns.linedashed_frag
				},
				depth : {
					uniforms : es.merge([ rs.common, rs.displacementmap ]),
					vertexShader : ns.depth_vert,
					fragmentShader : ns.depth_frag
				},
				normal : {
					uniforms : es.merge([ rs.common, rs.bumpmap, rs.normalmap, rs.displacementmap, {
						opacity : {
							value : 1
						}
					} ]),
					vertexShader : ns.normal_vert,
					fragmentShader : ns.normal_frag
				},
				cube : {
					uniforms : {
						tCube : {
							value : null
						},
						tFlip : {
							value : -1
						},
						opacity : {
							value : 1
						}
					},
					vertexShader : ns.cube_vert,
					fragmentShader : ns.cube_frag
				},
				equirect : {
					uniforms : {
						tEquirect : {
							value : null
						},
						tFlip : {
							value : -1
						}
					},
					vertexShader : ns.equirect_vert,
					fragmentShader : ns.equirect_frag
				},
				distanceRGBA : {
					uniforms : {
						lightPos : {
							value : new h
						}
					},
					vertexShader : ns.distanceRGBA_vert,
					fragmentShader : ns.distanceRGBA_frag
				}
			};
		os.physical = {
			uniforms : es.merge([ os.standard.uniforms, {
				clearCoat : {
					value : 0
				},
				clearCoatRoughness : {
					value : 0
				}
			} ]),
			vertexShader : ns.meshphysical_vert,
			fragmentShader : ns.meshphysical_frag
		}, Z.prototype = {
			constructor : Z,
			set : function(t, e) {
				return this.min.copy(t), this.max.copy(e), this
			},
			setFromPoints : function(t) {
				this.makeEmpty();
				for (var e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
				return this
			},
			setFromCenterAndSize : (function() {
				var t = new r;
				return function(e, n) {
					var i = t.copy(n).multiplyScalar(.5);
					return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
				}
			})(),
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.min.copy(t.min), this.max.copy(t.max), this
			},
			makeEmpty : function() {
				return this.min.x = this.min.y = +(1 / 0), this.max.x = this.max.y = -(1 / 0), this
			},
			isEmpty : function() {
				return this.max.x < this.min.x || this.max.y < this.min.y
			},
			getCenter : function(t) {
				var e = t || new r;
				return this.isEmpty() ? e.set(0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
			},
			getSize : function(t) {
				var e = t || new r;
				return this.isEmpty() ? e.set(0, 0) : e.subVectors(this.max, this.min)
			},
			expandByPoint : function(t) {
				return this.min.min(t), this.max.max(t), this
			},
			expandByVector : function(t) {
				return this.min.sub(t), this.max.add(t), this
			},
			expandByScalar : function(t) {
				return this.min.addScalar(-t), this.max.addScalar(t), this
			},
			containsPoint : function(t) {
				return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
			},
			containsBox : function(t) {
				return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y
			},
			getParameter : function(t, e) {
				var n = e || new r;
				return n.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
			},
			intersectsBox : function(t) {
				return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y)
			},
			clampPoint : function(t, e) {
				var n = e || new r;
				return n.copy(t).clamp(this.min, this.max)
			},
			distanceToPoint : (function() {
				var t = new r;
				return function(e) {
					var n = t.copy(e).clamp(this.min, this.max);
					return n.sub(e).length()
				}
			})(),
			intersect : function(t) {
				return this.min.max(t.min), this.max.min(t.max), this
			},
			union : function(t) {
				return this.min.min(t.min), this.max.max(t.max), this
			},
			translate : function(t) {
				return this.min.add(t), this.max.add(t), this
			},
			equals : function(t) {
				return t.min.equals(this.min) && t.max.equals(this.max)
			}
		};
		var as = 0;
		Q.prototype = {
			constructor : Q,
			isMaterial : !0,
			get needsUpdate() {
				return this._needsUpdate
			},
			set needsUpdate(t) {
				!0 === t && this.update(), this._needsUpdate = t
			},
			setValues : function(t) {
				if (void 0 !== t)
					for (var e in t) {
						var n = t[e];
						if (void 0 !== n) {
							var i = this[e];
							void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : "overdraw" == e ? this[e] = +n : this[e] = n : console.warn("THREE." + this.type + ": '" + e + "' is not a property of this material.")
						} else console.warn("THREE.Material: '" + e + "' parameter is undefined.")
				}
			},
			toJSON : function(t) {
				function e(t) {
					var e = [];
					for (var n in t) {
						var i = t[n];
						delete i.metadata
						, e.push(i)
					}
					return e
				}
				var n = void 0 === t;
				n && (t = {
					textures : {},
					images : {}
				});
				var i = {
					metadata : {
						version : 4.4,
						type : "Material",
						generator : "Material.toJSON"
					}
				};
				if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), void 0 !== this.metalness && (i.metalness = this.metalness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearCoat && (i.clearCoat = this.clearCoat), void 0 !== this.clearCoatRoughness && (i.clearCoatRoughness = this.clearCoatRoughness), this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(t).uuid), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(t).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(t).uuid, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(t).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(t).uuid, i.reflectivity = this.reflectivity), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.size && (i.size = this.size), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== Yr && (i.blending = this.blending), this.shading !== jr && (i.shading = this.shading), this.side !== zr && (i.side = this.side), this.vertexColors !== Vr && (i.vertexColors = this.vertexColors), 1 > this.opacity && (i.opacity = this.opacity), !0 === this.transparent && (i.transparent = this.transparent), i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, 0 < this.alphaTest && (i.alphaTest = this.alphaTest), !0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha), !0 === this.wireframe && (i.wireframe = this.wireframe), 1 < this.wireframeLinewidth && (i.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), i.skinning = this.skinning, i.morphTargets = this.morphTargets, n) {
					var r = e(t.textures),
						o = e(t.images);
					0 < r.length && (i.textures = r), 0 < o.length && (i.images = o)
				}
				return i
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				this.name = t.name, this.fog = t.fog, this.lights = t.lights, this.blending = t.blending, this.side = t.side, this.shading = t.shading, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.alphaTest = t.alphaTest, this.premultipliedAlpha = t.premultipliedAlpha, this.overdraw = t.overdraw, this.visible = t.visible, this.clipShadows = t.clipShadows, this.clipIntersection = t.clipIntersection;
				var e = t.clippingPlanes,
					n = null;
				if (null !== e) {
					var i = e.length;
					n = Array(i);
					for (var r = 0; r !== i; ++r) n[r] = e[r].clone()
				}
				return this.clippingPlanes = n, this
			},
			update : function() {
				this.dispatchEvent({
					type : "update"
				})
			},
			dispose : function() {
				this.dispatchEvent({
					type : "dispose"
				})
			}
		}, Object.assign(Q.prototype, i.prototype), $.prototype = Object.create(Q.prototype), $.prototype.constructor = $, $.prototype.isShaderMaterial = !0, $.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = es.clone(t.uniforms), this.defines = t.defines, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.lights = t.lights, this.clipping = t.clipping, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this.extensions = t.extensions, this
		}, $.prototype.toJSON = function(t) {
			var e = Q.prototype.toJSON.call(this, t);
			return e.uniforms = this.uniforms, e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e
		}, tt.prototype = Object.create(Q.prototype), tt.prototype.constructor = tt, tt.prototype.isMeshDepthMaterial = !0, tt.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.depthPacking = t.depthPacking, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this
		}, et.prototype = {
			constructor : et,
			isBox3 : !0,
			set : function(t, e) {
				return this.min.copy(t), this.max.copy(e), this
			},
			setFromArray : function(t) {
				for (var e = +(1 / 0), n = +(1 / 0), i = +(1 / 0), r = -(1 / 0), o = -(1 / 0), a = -(1 / 0), s = 0, c = t.length; s < c; s += 3) {
					var u = t[s],
						h = t[s + 1],
						l = t[s + 2];
					u < e && (e = u), h < n && (n = h), l < i && (i = l), u > r && (r = u), h > o && (o = h), l > a && (a = l)
				}
				this.min.set(e, n, i), this.max.set(r, o, a)
			},
			setFromBufferAttribute : function(t) {
				for (var e = +(1 / 0), n = +(1 / 0), i = +(1 / 0), r = -(1 / 0), o = -(1 / 0), a = -(1 / 0), s = 0, c = t.count; s < c; s++) {
					var u = t.getX(s),
						h = t.getY(s),
						l = t.getZ(s);
					u < e && (e = u), h < n && (n = h), l < i && (i = l), u > r && (r = u), h > o && (o = h), l > a && (a = l)
				}
				this.min.set(e, n, i), this.max.set(r, o, a)
			},
			setFromPoints : function(t) {
				this.makeEmpty();
				for (var e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
				return this
			},
			setFromCenterAndSize : (function() {
				var t = new h;
				return function(e, n) {
					var i = t.copy(n).multiplyScalar(.5);
					return this.min.copy(e).sub(i), this.max.copy(e).add(i), this
				}
			})(),
			setFromObject : (function() {
				var t = new h;
				return function(e) {
					var n = this;
					return e.updateMatrixWorld(!0), this.makeEmpty(), e.traverse((function(e) {
							var i,
								r,
								o = e.geometry;
							if (void 0 !== o)
								if (o.isGeometry) {
									var a = o.vertices;
									for (i = 0, r = a.length; i < r; i++) t.copy(a[i]), t.applyMatrix4(e.matrixWorld), n.expandByPoint(t)
								} else if (o.isBufferGeometry) {
									var s = o.attributes.position;
									if (void 0 !== s)
										for (i = 0, r = s.count; i < r; i++) t.fromAttribute(s, i).applyMatrix4(e.matrixWorld), n.expandByPoint(t)
							}
						})), this
				}
			})(),
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.min.copy(t.min), this.max.copy(t.max), this
			},
			makeEmpty : function() {
				return this.min.x = this.min.y = this.min.z = +(1 / 0), this.max.x = this.max.y = this.max.z = -(1 / 0), this
			},
			isEmpty : function() {
				return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
			},
			getCenter : function(t) {
				var e = t || new h;
				return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
			},
			getSize : function(t) {
				var e = t || new h;
				return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
			},
			expandByPoint : function(t) {
				return this.min.min(t), this.max.max(t), this
			},
			expandByVector : function(t) {
				return this.min.sub(t), this.max.add(t), this
			},
			expandByScalar : function(t) {
				return this.min.addScalar(-t), this.max.addScalar(t), this
			},
			containsPoint : function(t) {
				return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
			},
			containsBox : function(t) {
				return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
			},
			getParameter : function(t, e) {
				var n = e || new h;
				return n.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
			},
			intersectsBox : function(t) {
				return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
			},
			intersectsSphere : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new h), this.clampPoint(e.center, t), t.distanceToSquared(e.center) <= e.radius * e.radius
				}
			})(),
			intersectsPlane : function(t) {
				var e,
					n;
				return 0 < t.normal.x ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), 0 < t.normal.y ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), 0 < t.normal.z ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= t.constant && n >= t.constant
			},
			clampPoint : function(t, e) {
				var n = e || new h;
				return n.copy(t).clamp(this.min, this.max)
			},
			distanceToPoint : (function() {
				var t = new h;
				return function(e) {
					var n = t.copy(e).clamp(this.min, this.max);
					return n.sub(e).length()
				}
			})(),
			getBoundingSphere : (function() {
				var t = new h;
				return function(e) {
					var n = e || new nt;
					return this.getCenter(n.center), n.radius = .5 * this.getSize(t).length(), n
				}
			})(),
			intersect : function(t) {
				return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
			},
			union : function(t) {
				return this.min.min(t.min), this.max.max(t.max), this
			},
			applyMatrix4 : (function() {
				var t = [ new h, new h, new h, new h, new h, new h, new h, new h ];
				return function(e) {
					return this.isEmpty() ? this : (t[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), t[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), t[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), t[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), t[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), t[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), t[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), t[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(t), this)
				}
			})(),
			translate : function(t) {
				return this.min.add(t), this.max.add(t), this
			},
			equals : function(t) {
				return t.min.equals(this.min) && t.max.equals(this.max)
			}
		}, nt.prototype = {
			constructor : nt,
			set : function(t, e) {
				return this.center.copy(t), this.radius = e, this
			},
			setFromPoints : (function() {
				var t = new et;
				return function(e, n) {
					var i = this.center;
					void 0 === n ? t.setFromPoints(e).getCenter(i) : i.copy(n);
					for (var r = 0, o = 0, a = e.length; o < a; o++) r = Math.max(r, i.distanceToSquared(e[o]));
					return this.radius = Math.sqrt(r), this
				}
			})(),
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.center.copy(t.center), this.radius = t.radius, this
			},
			empty : function() {
				return 0 >= this.radius
			},
			containsPoint : function(t) {
				return t.distanceToSquared(this.center) <= this.radius * this.radius
			},
			distanceToPoint : function(t) {
				return t.distanceTo(this.center) - this.radius
			},
			intersectsSphere : function(t) {
				var e = this.radius + t.radius;
				return t.center.distanceToSquared(this.center) <= e * e
			},
			intersectsBox : function(t) {
				return t.intersectsSphere(this)
			},
			intersectsPlane : function(t) {
				return Math.abs(this.center.dot(t.normal) - t.constant) <= this.radius
			},
			clampPoint : function(t, e) {
				var n = this.center.distanceToSquared(t),
					i = e || new h;
				return i.copy(t), n > this.radius * this.radius && (i.sub(this.center).normalize(), i.multiplyScalar(this.radius).add(this.center)), i
			},
			getBoundingBox : function(t) {
				var e = t || new et;
				return e.set(this.center, this.center), e.expandByScalar(this.radius), e
			},
			applyMatrix4 : function(t) {
				return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
			},
			translate : function(t) {
				return this.center.add(t), this
			},
			equals : function(t) {
				return t.center.equals(this.center) && t.radius === this.radius
			}
		}, it.prototype = {
			constructor : it,
			isMatrix3 : !0,
			set : function(t, e, n, i, r, o, a, s, c) {
				var u = this.elements;
				return u[0] = t, u[1] = i, u[2] = a, u[3] = e, u[4] = r, u[5] = s, u[6] = n, u[7] = o, u[8] = c, this
			},
			identity : function() {
				return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
			},
			clone : function() {
				return (new this.constructor).fromArray(this.elements)
			},
			copy : function(t) {
				var e = t.elements;
				return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]), this
			},
			setFromMatrix4 : function(t) {
				var e = t.elements;
				return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
			},
			applyToVector3Array : (function() {
				var t;
				return function(e, n, i) {
					void 0 == t && (t = new h), void 0 === n && (n = 0), void 0 === i && (i = e.length);
					for (var r = 0, o = n; r < i; r += 3, o += 3) t.fromArray(e, o), t.applyMatrix3(this), t.toArray(e, o);
					return e
				}
			})(),
			applyToBufferAttribute : (function() {
				var t;
				return function(e) {
					void 0 == t && (t = new h);
					for (var n = 0, i = e.count; n < i; n++) t.x = e.getX(n), t.y = e.getY(n), t.z = e.getZ(n), t.applyMatrix3(this), e.setXYZ(n, t.x, t.y, t.z);
					return e
				}
			})(),
			multiplyScalar : function(t) {
				var e = this.elements;
				return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
			},
			determinant : function() {
				var t = this.elements,
					e = t[0],
					n = t[1],
					i = t[2],
					r = t[3],
					o = t[4],
					a = t[5],
					s = t[6],
					c = t[7],
					u = t[8];
				return e * o * u - e * a * c - n * r * u + n * a * s + i * r * c - i * o * s
			},
			getInverse : function(t, e) {
				t && t.isMatrix4 && console.error("THREE.Matrix3.getInverse no longer takes a Matrix4 argument.");
				var n = t.elements,
					i = this.elements,
					r = n[0],
					o = n[1],
					a = n[2],
					s = n[3],
					c = n[4],
					u = n[5],
					h = n[6],
					l = n[7],
					d = n[8],
					p = d * c - u * l,
					f = u * h - d * s,
					m = l * s - c * h,
					v = r * p + o * f + a * m;
				if (0 == v) {
					var g = "THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0";
					if (!0 === e)
						throw new Error(g);
					return console.warn(g), this.identity()
				}
				var y = 1 / v;
				return i[0] = p * y, i[1] = (a * l - d * o) * y, i[2] = (u * o - a * c) * y, i[3] = f * y, i[4] = (d * r - a * h) * y, i[5] = (a * s - u * r) * y, i[6] = m * y, i[7] = (o * h - l * r) * y, i[8] = (c * r - o * s) * y, this
			},
			transpose : function() {
				var t,
					e = this.elements;
				return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
			},
			getNormalMatrix : function(t) {
				return this.setFromMatrix4(t).getInverse(this).transpose()
			},
			transposeIntoArray : function(t) {
				var e = this.elements;
				return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
			},
			fromArray : function(t, e) {
				void 0 === e && (e = 0);
				for (var n = 0; 9 > n; n++) this.elements[n] = t[n + e];
				return this
			},
			toArray : function(t, e) {
				void 0 === t && (t = []), void 0 === e && (e = 0);
				var n = this.elements;
				return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t
			}
		}, rt.prototype = {
			constructor : rt,
			set : function(t, e) {
				return this.normal.copy(t), this.constant = e, this
			},
			setComponents : function(t, e, n, i) {
				return this.normal.set(t, e, n), this.constant = i, this
			},
			setFromNormalAndCoplanarPoint : function(t, e) {
				return this.normal.copy(t), this.constant = -e.dot(this.normal), this
			},
			setFromCoplanarPoints : (function() {
				var t = new h,
					e = new h;
				return function(n, i, r) {
					var o = t.subVectors(r, i).cross(e.subVectors(n, i)).normalize();
					return this.setFromNormalAndCoplanarPoint(o, n), this
				}
			})(),
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.normal.copy(t.normal), this.constant = t.constant, this
			},
			normalize : function() {
				var t = 1 / this.normal.length();
				return this.normal.multiplyScalar(t), this.constant *= t, this
			},
			negate : function() {
				return this.constant *= -1, this.normal.negate(), this
			},
			distanceToPoint : function(t) {
				return this.normal.dot(t) + this.constant
			},
			distanceToSphere : function(t) {
				return this.distanceToPoint(t.center) - t.radius
			},
			projectPoint : function(t, e) {
				return this.orthoPoint(t, e).sub(t).negate()
			},
			orthoPoint : function(t, e) {
				var n = this.distanceToPoint(t),
					i = e || new h;
				return i.copy(this.normal).multiplyScalar(n)
			},
			intersectLine : (function() {
				var t = new h;
				return function(e, n) {
					var i = n || new h,
						r = e.delta(t),
						o = this.normal.dot(r);
					if (0 === o) return 0 === this.distanceToPoint(e.start) ? i.copy(e.start) : void 0;
					var a = -(e.start.dot(this.normal) + this.constant) / o;
					return 0 > a || 1 < a ? void 0 : i.copy(r).multiplyScalar(a).add(e.start)
				}
			})(),
			intersectsLine : function(t) {
				var e = this.distanceToPoint(t.start),
					n = this.distanceToPoint(t.end);
				return 0 > e && 0 < n || 0 > n && 0 < e
			},
			intersectsBox : function(t) {
				return t.intersectsPlane(this)
			},
			intersectsSphere : function(t) {
				return t.intersectsPlane(this)
			},
			coplanarPoint : function(t) {
				var e = t || new h;
				return e.copy(this.normal).multiplyScalar(-this.constant)
			},
			applyMatrix4 : (function() {
				var t = new h,
					e = new it;
				return function(n, i) {
					var r = this.coplanarPoint(t).applyMatrix4(n),
						o = i || e.getNormalMatrix(n),
						a = this.normal.applyMatrix3(o).normalize();
					return this.constant = -r.dot(a), this
				}
			})(),
			translate : function(t) {
				return this.constant = this.constant - t.dot(this.normal), this
			},
			equals : function(t) {
				return t.normal.equals(this.normal) && t.constant === this.constant
			}
		}, ot.prototype = {
			constructor : ot,
			set : function(t, e, n, i, r, o) {
				var a = this.planes;
				return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(o), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				for (var e = this.planes, n = 0; 6 > n; n++) e[n].copy(t.planes[n]);
				return this
			},
			setFromMatrix : function(t) {
				var e = this.planes,
					n = t.elements,
					i = n[0],
					r = n[1],
					o = n[2],
					a = n[3],
					s = n[4],
					c = n[5],
					u = n[6],
					h = n[7],
					l = n[8],
					d = n[9],
					p = n[10],
					f = n[11],
					m = n[12],
					v = n[13],
					g = n[14],
					y = n[15];
				return e[0].setComponents(a - i, h - s, f - l, y - m).normalize(), e[1].setComponents(a + i, h + s, f + l, y + m).normalize(), e[2].setComponents(a + r, h + c, f + d, y + v).normalize(), e[3].setComponents(a - r, h - c, f - d, y - v).normalize(), e[4].setComponents(a - o, h - u, f - p, y - g).normalize(), e[5].setComponents(a + o, h + u, f + p, y + g).normalize(), this
			},
			intersectsObject : (function() {
				var t = new nt;
				return function(e) {
					var n = e.geometry;
					return null === n.boundingSphere && n.computeBoundingSphere(), t.copy(n.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
				}
			})(),
			intersectsSprite : (function() {
				var t = new nt;
				return function(e) {
					return t.center.set(0, 0, 0), t.radius = .7071067811865476, t.applyMatrix4(e.matrixWorld), this.intersectsSphere(t)
				}
			})(),
			intersectsSphere : function(t) {
				for (var e = this.planes, n = t.center, i = -t.radius, r = 0; 6 > r; r++) {
					var o = e[r].distanceToPoint(n);
					if (o < i) return !1
				}
				return !0
			},
			intersectsBox : (function() {
				var t = new h,
					e = new h;
				return function(n) {
					for (var i = this.planes, r = 0; 6 > r; r++) {
						var o = i[r];
						t.x = 0 < o.normal.x ? n.min.x : n.max.x, e.x = 0 < o.normal.x ? n.max.x : n.min.x, t.y = 0 < o.normal.y ? n.min.y : n.max.y, e.y = 0 < o.normal.y ? n.max.y : n.min.y, t.z = 0 < o.normal.z ? n.min.z : n.max.z, e.z = 0 < o.normal.z ? n.max.z : n.min.z;var a = o.distanceToPoint(t),
							s = o.distanceToPoint(e);
						if (0 > a && 0 > s) return !1
					}
					return !0
				}
			})(),
			containsPoint : function(t) {
				for (var e = this.planes, n = 0; 6 > n; n++)
					if (0 > e[n].distanceToPoint(t)) return !1;
				return !0
			}
		}, st.prototype = {
			constructor : st,
			set : function(t, e) {
				return this.origin.copy(t), this.direction.copy(e), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.origin.copy(t.origin), this.direction.copy(t.direction), this
			},
			at : function(t, e) {
				var n = e || new h;
				return n.copy(this.direction).multiplyScalar(t).add(this.origin)
			},
			lookAt : function(t) {
				return this.direction.copy(t).sub(this.origin).normalize(), this
			},
			recast : (function() {
				var t = new h;
				return function(e) {
					return this.origin.copy(this.at(e, t)), this
				}
			})(),
			closestPointToPoint : function(t, e) {
				var n = e || new h;
				n.subVectors(t, this.origin);
				var i = n.dot(this.direction);
				return 0 > i ? n.copy(this.origin) : n.copy(this.direction).multiplyScalar(i).add(this.origin)
			},
			distanceToPoint : function(t) {
				return Math.sqrt(this.distanceSqToPoint(t))
			},
			distanceSqToPoint : (function() {
				var t = new h;
				return function(e) {
					var n = t.subVectors(e, this.origin).dot(this.direction);
					return 0 > n ? this.origin.distanceToSquared(e) : (t.copy(this.direction).multiplyScalar(n).add(this.origin), t.distanceToSquared(e))
				}
			})(),
			distanceSqToSegment : (function() {
				var t = new h,
					e = new h,
					n = new h;
				return function(i, r, o, a) {
					t.copy(i).add(r).multiplyScalar(.5), e.copy(r).sub(i).normalize(), n.copy(this.origin).sub(t);
					var s,
						c,
						u,
						h,
						l = .5 * i.distanceTo(r),
						d = -this.direction.dot(e),
						p = n.dot(this.direction),
						f = -n.dot(e),
						m = n.lengthSq(),
						v = Math.abs(1 - d * d);
					if (0 < v)
						if (s = d * f - p, c = d * p - f, h = l * v, 0 <= s)
							if (c >= -h)
								if (c <= h) {
									var g = 1 / v;
									s *= g, c *= g, u = s * (s + d * c + 2 * p) + c * (d * s + c + 2 * f) + m
								} else c = l, s = Math.max(0, -(d * c + p)), u = -s * s + c * (c + 2 * f) + m;
							else c = -l, s = Math.max(0, -(d * c + p)), u = -s * s + c * (c + 2 * f) + m;
						else
							c <= -h ? (s = Math.max(0, -(-d * l + p)), c = 0 < s ? -l : Math.min(Math.max(-l, -f), l), u = -s * s + c * (c + 2 * f) + m) : c <= h ? (s = 0, c = Math.min(Math.max(-l, -f), l), u = c * (c + 2 * f) + m) : (s = Math.max(0, -(d * l + p)), c = 0 < s ? l : Math.min(Math.max(-l, -f), l), u = -s * s + c * (c + 2 * f) + m);
					else c = 0 < d ? -l : l, s = Math.max(0, -(d * c + p)), u = -s * s + c * (c + 2 * f) + m;
					return o && o.copy(this.direction).multiplyScalar(s).add(this.origin), a && a.copy(e).multiplyScalar(c).add(t), u
				}
			})(),
			intersectSphere : (function() {
				var t = new h;
				return function(e, n) {
					t.subVectors(e.center, this.origin);
					var i = t.dot(this.direction),
						r = t.dot(t) - i * i,
						o = e.radius * e.radius;
					if (r > o) return null;
					var a = Math.sqrt(o - r),
						s = i - a,
						c = i + a;
					return 0 > s && 0 > c ? null : 0 > s ? this.at(c, n) : this.at(s, n)
				}
			})(),
			intersectsSphere : function(t) {
				return this.distanceToPoint(t.center) <= t.radius
			},
			distanceToPlane : function(t) {
				var e = t.normal.dot(this.direction);
				if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
				var n = -(this.origin.dot(t.normal) + t.constant) / e;
				return 0 <= n ? n : null
			},
			intersectPlane : function(t, e) {
				var n = this.distanceToPlane(t);
				return null === n ? null : this.at(n, e)
			},
			intersectsPlane : function(t) {
				var e = t.distanceToPoint(this.origin);
				if (0 === e) return !0;
				var n = t.normal.dot(this.direction);
				return !!(0 > n * e)
			},
			intersectBox : function(t, e) {
				var n,
					i,
					r,
					o,
					a,
					s,
					c = 1 / this.direction.x,
					u = 1 / this.direction.y,
					h = 1 / this.direction.z,
					l = this.origin;
				return 0 <= c ? (n = (t.min.x - l.x) * c, i = (t.max.x - l.x) * c) : (n = (t.max.x - l.x) * c, i = (t.min.x - l.x) * c), 0 <= u ? (r = (t.min.y - l.y) * u, o = (t.max.y - l.y) * u) : (r = (t.max.y - l.y) * u, o = (t.min.y - l.y) * u), n > o || r > i ? null : ((r > n || n != n) && (n = r), (o < i || i != i) && (i = o), 0 <= h ? (a = (t.min.z - l.z) * h, s = (t.max.z - l.z) * h) : (a = (t.max.z - l.z) * h, s = (t.min.z - l.z) * h), n > s || a > i ? null : ((a > n || n != n) && (n = a), (s < i || i != i) && (i = s), 0 > i ? null : this.at(0 <= n ? n : i, e)))
			},
			intersectsBox : (function() {
				var t = new h;
				return function(e) {
					return null !== this.intersectBox(e, t)
				}
			})(),
			intersectTriangle : (function() {
				var t = new h,
					e = new h,
					n = new h,
					i = new h;
				return function(r, o, a, s, c) {
					e.subVectors(o, r), n.subVectors(a, r), i.crossVectors(e, n);
					var u,
						h = this.direction.dot(i);
					if (0 < h) {
						if (s) return null;
						u = 1
					} else {
						if (!(0 > h)) return null;
						u = -1, h = -h
					}
					t.subVectors(this.origin, r);
					var l = u * this.direction.dot(n.crossVectors(t, n));
					if (0 > l) return null;
					var d = u * this.direction.dot(e.cross(t));
					if (0 > d) return null;
					if (l + d > h) return null;
					var p = -u * t.dot(i);
					return 0 > p ? null : this.at(p / h, c)
				}
			})(),
			applyMatrix4 : function(t) {
				return this.direction.add(this.origin).applyMatrix4(t), this.origin.applyMatrix4(t), this.direction.sub(this.origin), this.direction.normalize(), this
			},
			equals : function(t) {
				return t.origin.equals(this.origin) && t.direction.equals(this.direction)
			}
		}, ct.RotationOrders = [ "XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX" ], ct.DefaultOrder = "XYZ", ct.prototype = {
			constructor : ct,
			isEuler : !0,
			get x() {
				return this._x
			},
			set x(t) {
				this._x = t, this.onChangeCallback()
			},
			get y() {
				return this._y
			},
			set y(t) {
				this._y = t, this.onChangeCallback()
			},
			get z() {
				return this._z
			},
			set z(t) {
				this._z = t, this.onChangeCallback()
			},
			get order() {
				return this._order
			},
			set order(t) {
				this._order = t, this.onChangeCallback()
			},
			set : function(t, e, n, i) {
				return this._x = t, this._y = e, this._z = n, this._order = i || this._order, this.onChangeCallback(), this
			},
			clone : function() {
				return new this.constructor(this._x, this._y, this._z, this._order)
			},
			copy : function(t) {
				return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this.onChangeCallback(), this
			},
			setFromRotationMatrix : function(t, e, n) {
				var i = Ya.clamp,
					r = t.elements,
					o = r[0],
					a = r[4],
					s = r[8],
					c = r[1],
					u = r[5],
					h = r[9],
					l = r[2],
					d = r[6],
					p = r[10];
				return e = e || this._order, "XYZ" === e ? (this._y = Math.asin(i(s, -1, 1)), .99999 > Math.abs(s) ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(d, u), this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-i(h, -1, 1)), .99999 > Math.abs(h) ? (this._y = Math.atan2(s, p), this._z = Math.atan2(c, u)) : (this._y = Math.atan2(-l, o), this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(i(d, -1, 1)), .99999 > Math.abs(d) ? (this._y = Math.atan2(-l, p), this._z = Math.atan2(-a, u)) : (this._y = 0, this._z = Math.atan2(c, o))) : "ZYX" === e ? (this._y = Math.asin(-i(l, -1, 1)), .99999 > Math.abs(l) ? (this._x = Math.atan2(d, p), this._z = Math.atan2(c, o)) : (this._x = 0, this._z = Math.atan2(-a, u))) : "YZX" === e ? (this._z = Math.asin(i(c, -1, 1)), .99999 > Math.abs(c) ? (this._x = Math.atan2(-h, u), this._y = Math.atan2(-l, o)) : (this._x = 0, this._y = Math.atan2(s, p))) : "XZY" === e ? (this._z = Math.asin(-i(a, -1, 1)), .99999 > Math.abs(a) ? (this._x = Math.atan2(d, u), this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-h, p), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e), this._order = e, !1 !== n && this.onChangeCallback(), this
			},
			setFromQuaternion : (function() {
				var t;
				return function(e, n, i) {
					return void 0 == t && (t = new l), t.makeRotationFromQuaternion(e), this.setFromRotationMatrix(t, n, i)
				}
			})(),
			setFromVector3 : function(t, e) {
				return this.set(t.x, t.y, t.z, e || this._order)
			},
			reorder : (function() {
				var t = new u;
				return function(e) {
					return t.setFromEuler(this), this.setFromQuaternion(t, e)
				}
			})(),
			equals : function(t) {
				return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
			},
			fromArray : function(t) {
				return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this.onChangeCallback(), this
			},
			toArray : function(t, e) {
				return void 0 === t && (t = []), void 0 === e && (e = 0), t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
			},
			toVector3 : function(t) {
				return t ? t.set(this._x, this._y, this._z) : new h(this._x, this._y, this._z)
			},
			onChange : function(t) {
				return this.onChangeCallback = t, this
			},
			onChangeCallback : function() {}
		}, ut.prototype = {
			constructor : ut,
			set : function(t) {
				this.mask = 1 << t
			},
			enable : function(t) {
				this.mask |= 1 << t
			},
			toggle : function(t) {
				this.mask ^= 1 << t
			},
			disable : function(t) {
				this.mask &= ~(1 << t)
			},
			test : function(t) {
				return 0 != (this.mask & t.mask)
			}
		};
		var ss = 0;
		ht.DefaultUp = new h(0, 1, 0), ht.DefaultMatrixAutoUpdate = !0, Object.assign(ht.prototype, i.prototype, {
			isObject3D : !0,
			applyMatrix : function(t) {
				this.matrix.multiplyMatrices(t, this.matrix), this.matrix.decompose(this.position, this.quaternion, this.scale)
			},
			setRotationFromAxisAngle : function(t, e) {
				this.quaternion.setFromAxisAngle(t, e)
			},
			setRotationFromEuler : function(t) {
				this.quaternion.setFromEuler(t, !0)
			},
			setRotationFromMatrix : function(t) {
				this.quaternion.setFromRotationMatrix(t)
			},
			setRotationFromQuaternion : function(t) {
				this.quaternion.copy(t)
			},
			rotateOnAxis : (function() {
				var t = new u;
				return function(e, n) {
					return t.setFromAxisAngle(e, n), this.quaternion.multiply(t), this
				}
			})(),
			rotateX : (function() {
				var t = new h(1, 0, 0);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			})(),
			rotateY : (function() {
				var t = new h(0, 1, 0);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			})(),
			rotateZ : (function() {
				var t = new h(0, 0, 1);
				return function(e) {
					return this.rotateOnAxis(t, e)
				}
			})(),
			translateOnAxis : (function() {
				var t = new h;
				return function(e, n) {
					return t.copy(e).applyQuaternion(this.quaternion), this.position.add(t.multiplyScalar(n)), this
				}
			})(),
			translateX : (function() {
				var t = new h(1, 0, 0);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			})(),
			translateY : (function() {
				var t = new h(0, 1, 0);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			})(),
			translateZ : (function() {
				var t = new h(0, 0, 1);
				return function(e) {
					return this.translateOnAxis(t, e)
				}
			})(),
			localToWorld : function(t) {
				return t.applyMatrix4(this.matrixWorld)
			},
			worldToLocal : (function() {
				var t = new l;
				return function(e) {
					return e.applyMatrix4(t.getInverse(this.matrixWorld))
				}
			})(),
			lookAt : (function() {
				var t = new l;
				return function(e) {
					t.lookAt(e, this.position, this.up), this.quaternion.setFromRotationMatrix(t)
				}
			})(),
			add : function(t) {
				if (1 < arguments.length) {
					for (var e = 0; e < arguments.length; e++) this.add(arguments[e]);
					return this
				}
				return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t), t.parent = this, t.dispatchEvent({
					type : "added"
				}), this.children.push(t)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
			},
			remove : function(t) {
				if (1 < arguments.length)
					for (var e = 0; e < arguments.length; e++) this.remove(arguments[e]);
				var n = this.children.indexOf(t);
				-1 !== n && (t.parent = null, t.dispatchEvent({
					type : "removed"
				}), this.children.splice(n, 1))
			},
			getObjectById : function(t) {
				return this.getObjectByProperty("id", t)
			},
			getObjectByName : function(t) {
				return this.getObjectByProperty("name", t)
			},
			getObjectByProperty : function(t, e) {
				if (this[t] === e) return this;
				for (var n = 0, i = this.children.length; n < i; n++) {
					var r = this.children[n],
						o = r.getObjectByProperty(t, e);
					if (void 0 !== o) return o
				}
			},
			getWorldPosition : function(t) {
				var e = t || new h;
				return this.updateMatrixWorld(!0), e.setFromMatrixPosition(this.matrixWorld)
			},
			getWorldQuaternion : (function() {
				var t = new h,
					e = new h;
				return function(n) {
					var i = n || new u;
					return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, i, e), i
				}
			})(),
			getWorldRotation : (function() {
				var t = new u;
				return function(e) {
					var n = e || new ct;
					return this.getWorldQuaternion(t), n.setFromQuaternion(t, this.rotation.order, !1)
				}
			})(),
			getWorldScale : (function() {
				var t = new h,
					e = new u;
				return function(n) {
					var i = n || new h;
					return this.updateMatrixWorld(!0), this.matrixWorld.decompose(t, e, i), i
				}
			})(),
			getWorldDirection : (function() {
				var t = new u;
				return function(e) {
					var n = e || new h;
					return this.getWorldQuaternion(t), n.set(0, 0, 1).applyQuaternion(t)
				}
			})(),
			raycast : function() {},
			traverse : function(t) {
				t(this);
				for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].traverse(t)
			},
			traverseVisible : function(t) {
				if (!1 !== this.visible) {
					t(this);
					for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t)
				}
			},
			traverseAncestors : function(t) {
				var e = this.parent;
				null !== e && (t(e), e.traverseAncestors(t))
			},
			updateMatrix : function() {
				this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
			},
			updateMatrixWorld : function(t) {
				!0 === this.matrixAutoUpdate && this.updateMatrix(), (!0 === this.matrixWorldNeedsUpdate || !0 === t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, t = !0);
				for (var e = this.children, n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t)
			},
			toJSON : function(t) {
				function e(t) {
					var e = [];
					for (var n in t) {
						var i = t[n];
						delete i.metadata
						, e.push(i)
					}
					return e
				}
				var n = void 0 === t || "" === t,
					i = {};
				n && (t = {
					geometries : {},
					materials : {},
					textures : {},
					images : {}
				}, i.metadata = {
					version : 4.4,
					type : "Object",
					generator : "Object3D.toJSON"
				});
				var r = {};
				if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData), !0 === this.castShadow && (r.castShadow = !0), !0 === this.receiveShadow && (r.receiveShadow = !0), !1 === this.visible && (r.visible = !1), r.matrix = this.matrix.toArray(), void 0 !== this.geometry && (void 0 === t.geometries[this.geometry.uuid] && (t.geometries[this.geometry.uuid] = this.geometry.toJSON(t)), r.geometry = this.geometry.uuid), void 0 !== this.material && (void 0 === t.materials[this.material.uuid] && (t.materials[this.material.uuid] = this.material.toJSON(t)), r.material = this.material.uuid), 0 < this.children.length) {
					r.children = [];
					for (var o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(t).object)
				}
				if (n) {
					var a = e(t.geometries),
						s = e(t.materials),
						c = e(t.textures),
						u = e(t.images);
					0 < a.length && (i.geometries = a), 0 < s.length && (i.materials = s), 0 < c.length && (i.textures = c), 0 < u.length && (i.images = u)
				}
				return i.object = r, i
			},
			clone : function(t) {
				return (new this.constructor).copy(this, t)
			},
			copy : function(t, e) {
				if (void 0 === e && (e = !0), this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e)
					for (var n = 0; n < t.children.length; n++) {
						var i = t.children[n];
						this.add(i.clone())
				}
				return this
			}
		}), lt.prototype = {
			constructor : lt,
			set : function(t, e) {
				return this.start.copy(t), this.end.copy(e), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.start.copy(t.start), this.end.copy(t.end), this
			},
			getCenter : function(t) {
				var e = t || new h;
				return e.addVectors(this.start, this.end).multiplyScalar(.5)
			},
			delta : function(t) {
				var e = t || new h;
				return e.subVectors(this.end, this.start)
			},
			distanceSq : function() {
				return this.start.distanceToSquared(this.end)
			},
			distance : function() {
				return this.start.distanceTo(this.end)
			},
			at : function(t, e) {
				var n = e || new h;
				return this.delta(n).multiplyScalar(t).add(this.start)
			},
			closestPointToPointParameter : (function() {
				var t = new h,
					e = new h;
				return function(n, i) {
					t.subVectors(n, this.start), e.subVectors(this.end, this.start);
					var r = e.dot(e),
						o = e.dot(t),
						a = o / r;
					return i && (a = Ya.clamp(a, 0, 1)), a
				}
			})(),
			closestPointToPoint : function(t, e, n) {
				var i = this.closestPointToPointParameter(t, e),
					r = n || new h;
				return this.delta(r).multiplyScalar(i).add(this.start)
			},
			applyMatrix4 : function(t) {
				return this.start.applyMatrix4(t), this.end.applyMatrix4(t), this
			},
			equals : function(t) {
				return t.start.equals(this.start) && t.end.equals(this.end)
			}
		}, dt.normal = (function() {
			var t = new h;
			return function(e, n, i, r) {
				var o = r || new h;
				o.subVectors(i, n), t.subVectors(e, n), o.cross(t);
				var a = o.lengthSq();
				return 0 < a ? o.multiplyScalar(1 / Math.sqrt(a)) : o.set(0, 0, 0)
			}
		})(), dt.barycoordFromPoint = (function() {
			var t = new h,
				e = new h,
				n = new h;
			return function(i, r, o, a, s) {
				t.subVectors(a, r), e.subVectors(o, r), n.subVectors(i, r);
				var c = t.dot(t),
					u = t.dot(e),
					l = t.dot(n),
					d = e.dot(e),
					p = e.dot(n),
					f = c * d - u * u,
					m = s || new h;
				if (0 == f) return m.set(-2, -1, -1);
				var v = 1 / f,
					g = (d * l - u * p) * v,
					y = (c * p - u * l) * v;
				return m.set(1 - g - y, y, g)
			}
		})(), dt.containsPoint = (function() {
			var t = new h;
			return function(e, n, i, r) {
				var o = dt.barycoordFromPoint(e, n, i, r, t);
				return 0 <= o.x && 0 <= o.y && 1 >= o.x + o.y
			}
		})(), dt.prototype = {
			constructor : dt,
			set : function(t, e, n) {
				return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
			},
			setFromPointsAndIndices : function(t, e, n, i) {
				return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
			},
			area : (function() {
				var t = new h,
					e = new h;
				return function() {
					return t.subVectors(this.c, this.b), e.subVectors(this.a, this.b), .5 * t.cross(e).length()
				}
			})(),
			midpoint : function(t) {
				var e = t || new h;
				return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
			},
			normal : function(t) {
				return dt.normal(this.a, this.b, this.c, t)
			},
			plane : function(t) {
				var e = t || new rt;
				return e.setFromCoplanarPoints(this.a, this.b, this.c)
			},
			barycoordFromPoint : function(t, e) {
				return dt.barycoordFromPoint(t, this.a, this.b, this.c, e)
			},
			containsPoint : function(t) {
				return dt.containsPoint(t, this.a, this.b, this.c)
			},
			closestPointToPoint : (function() {
				var t,
					e,
					n,
					i;
				return function(r, o) {
					void 0 == t && (t = new rt, e = [ new lt, new lt, new lt ], n = new h, i = new h);
					var a = o || new h,
						s = 1 / 0;
					if (t.setFromCoplanarPoints(this.a, this.b, this.c), t.projectPoint(r, n), !0 === this.containsPoint(n)) a.copy(n);else {
						e[0].set(this.a, this.b), e[1].set(this.b, this.c), e[2].set(this.c, this.a);
						for (var c = 0; c < e.length; c++) {
							e[c].closestPointToPoint(n, !0, i);var u = n.distanceToSquared(i);
							u < s && (s = u, a.copy(i))
						}
					}
					return a
				}
			})(),
			equals : function(t) {
				return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
			}
		}, pt.prototype = {
			constructor : pt,
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				this.a = t.a, this.b = t.b, this.c = t.c, this.normal.copy(t.normal), this.color.copy(t.color), this.materialIndex = t.materialIndex;
				for (var e = 0, n = t.vertexNormals.length; e < n; e++) this.vertexNormals[e] = t.vertexNormals[e].clone();
				for (var e = 0, n = t.vertexColors.length; e < n; e++) this.vertexColors[e] = t.vertexColors[e].clone();
				return this
			}
		}, ft.prototype = Object.create(Q.prototype), ft.prototype.constructor = ft, ft.prototype.isMeshBasicMaterial = !0, ft.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this
		}, mt.prototype = {
			constructor : mt,
			isBufferAttribute : !0,
			set needsUpdate(t) {
				!0 === t && this.version++
			},
			setArray : function(t) {
				if (Array.isArray(t))
					throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
				this.count = void 0 === t ? 0 : t.length / this.itemSize, this.array = t
			},
			setDynamic : function(t) {
				return this.dynamic = t, this
			},
			copy : function(t) {
				return this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.dynamic = t.dynamic, this
			},
			copyAt : function(t, e, n) {
				t *= this.itemSize, n *= e.itemSize;
				for (var i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i];
				return this
			},
			copyArray : function(t) {
				return this.array.set(t), this
			},
			copyColorsArray : function(t) {
				for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
					var o = t[i];
					void 0 === o && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), o = new q), e[n++] = o.r, e[n++] = o.g, e[n++] = o.b
				}
				return this
			},
			copyIndicesArray : function(t) {
				for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
					var o = t[i];
					e[n++] = o.a, e[n++] = o.b, e[n++] = o.c
				}
				return this
			},
			copyVector2sArray : function(t) {
				for (var e = this.array, n = 0, i = 0, o = t.length; i < o; i++) {
					var a = t[i];
					void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), a = new r), e[n++] = a.x, e[n++] = a.y
				}
				return this
			},
			copyVector3sArray : function(t) {
				for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
					var o = t[i];
					void 0 === o && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), o = new h), e[n++] = o.x, e[n++] = o.y, e[n++] = o.z
				}
				return this
			},
			copyVector4sArray : function(t) {
				for (var e = this.array, n = 0, i = 0, r = t.length; i < r; i++) {
					var o = t[i];
					void 0 === o && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), o = new a), e[n++] = o.x, e[n++] = o.y, e[n++] = o.z, e[n++] = o.w
				}
				return this
			},
			set : function(t, e) {
				return void 0 === e && (e = 0), this.array.set(t, e), this
			},
			getX : function(t) {
				return this.array[t * this.itemSize]
			},
			setX : function(t, e) {
				return this.array[t * this.itemSize] = e, this
			},
			getY : function(t) {
				return this.array[t * this.itemSize + 1]
			},
			setY : function(t, e) {
				return this.array[t * this.itemSize + 1] = e, this
			},
			getZ : function(t) {
				return this.array[t * this.itemSize + 2]
			},
			setZ : function(t, e) {
				return this.array[t * this.itemSize + 2] = e, this
			},
			getW : function(t) {
				return this.array[t * this.itemSize + 3]
			},
			setW : function(t, e) {
				return this.array[t * this.itemSize + 3] = e, this
			},
			setXY : function(t, e, n) {
				return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this
			},
			setXYZ : function(t, e, n, i) {
				return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this
			},
			setXYZW : function(t, e, n, i, r) {
				return t *= this.itemSize, this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this
			},
			onUpload : function(t) {
				return this.onUploadCallback = t, this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			}
		}, vt.prototype = Object.create(mt.prototype), vt.prototype.constructor = vt, gt.prototype = Object.create(mt.prototype), gt.prototype.constructor = gt, yt.prototype = Object.create(mt.prototype), yt.prototype.constructor = yt, xt.prototype = Object.create(mt.prototype), xt.prototype.constructor = xt, bt.prototype = Object.create(mt.prototype), bt.prototype.constructor = bt, _t.prototype = Object.create(mt.prototype), _t.prototype.constructor = _t, wt.prototype = Object.create(mt.prototype), wt.prototype.constructor = wt, Mt.prototype = Object.create(mt.prototype), Mt.prototype.constructor = Mt, Et.prototype = Object.create(mt.prototype), Et.prototype.constructor = Et, Object.assign(St.prototype, {
			computeGroups : function(t) {
				for (var e, n = [], i = void 0, r = t.faces, o = 0; o < r.length; o++) {
					var a = r[o];
					a.materialIndex !== i && (i = a.materialIndex, void 0 != e && (e.count = 3 * o - e.start, n.push(e)), e = {
						start : 3 * o,
						materialIndex : i
					})
				}
				void 0 !== e && (e.count = 3 * o - e.start, n.push(e)), this.groups = n
			},
			fromGeometry : function(t) {
				var e,
					n = t.faces,
					i = t.vertices,
					o = t.faceVertexUvs,
					a = o[0] && 0 < o[0].length,
					s = o[1] && 0 < o[1].length,
					c = t.morphTargets,
					u = c.length;
				if (0 < u) {
					e = [];
					for (var h = 0; h < u; h++) e[h] = [];
					this.morphTargets.position = e
				}
				var l,
					d = t.morphNormals,
					p = d.length;
				if (0 < p) {
					l = [];
					for (var h = 0; h < p; h++) l[h] = [];
					this.morphTargets.normal = l
				}
				for (var f = t.skinIndices, m = t.skinWeights, v = f.length === i.length, g = m.length === i.length, h = 0; h < n.length; h++) {
					var y = n[h];
					this.vertices.push(i[y.a], i[y.b], i[y.c]);var x = y.vertexNormals;
					if (3 === x.length) this.normals.push(x[0], x[1], x[2]);else {
						var b = y.normal;
						this.normals.push(b, b, b)
					}
					var _ = y.vertexColors;
					if (3 === _.length) this.colors.push(_[0], _[1], _[2]);else {
						var w = y.color;
						this.colors.push(w, w, w)
					}
					if (!0 === a) {
						var M = o[0][h];
						void 0 === M ? (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", h), this.uvs.push(new r, new r, new r)) : this.uvs.push(M[0], M[1], M[2])
					}
					if (!0 === s) {
						var M = o[1][h];
						void 0 === M ? (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", h), this.uvs2.push(new r, new r, new r)) : this.uvs2.push(M[0], M[1], M[2])
					}
					for (var E = 0; E < u; E++) {
						var S = c[E].vertices;
						e[E].push(S[y.a], S[y.b], S[y.c])
					}
					for (var E = 0; E < p; E++) {
						var T = d[E].vertexNormals[h];
						l[E].push(T.a, T.b, T.c)
					}
					v && this.skinIndices.push(f[y.a], f[y.b], f[y.c]), g && this.skinWeights.push(m[y.a], m[y.b], m[y.c])
				}
				return this.computeGroups(t), this.verticesNeedUpdate = t.verticesNeedUpdate, this.normalsNeedUpdate = t.normalsNeedUpdate, this.colorsNeedUpdate = t.colorsNeedUpdate, this.uvsNeedUpdate = t.uvsNeedUpdate, this.groupsNeedUpdate = t.groupsNeedUpdate, this
			}
		}), Object.assign(Tt.prototype, i.prototype, {
			isGeometry : !0,
			applyMatrix : function(t) {
				for (var e = (new it).getNormalMatrix(t), n = 0, i = this.vertices.length; n < i; n++) {
					var r = this.vertices[n];
					r.applyMatrix4(t)
				}
				for (var n = 0, i = this.faces.length; n < i; n++) {
					var o = this.faces[n];
					o.normal.applyMatrix3(e).normalize();
					for (var a = 0, s = o.vertexNormals.length; a < s; a++) o.vertexNormals[a].applyMatrix3(e).normalize()
				}
				return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this.verticesNeedUpdate = !0, this.normalsNeedUpdate = !0, this
			},
			rotateX : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationX(e), this.applyMatrix(t), this
				}
			})(),
			rotateY : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationY(e), this.applyMatrix(t), this
				}
			})(),
			rotateZ : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationZ(e), this.applyMatrix(t), this
				}
			})(),
			translate : (function() {
				var t;
				return function(e, n, i) {
					return void 0 == t && (t = new l), t.makeTranslation(e, n, i), this.applyMatrix(t), this
				}
			})(),
			scale : (function() {
				var t;
				return function(e, n, i) {
					return void 0 == t && (t = new l), t.makeScale(e, n, i), this.applyMatrix(t), this
				}
			})(),
			lookAt : (function() {
				var t;
				return function(e) {
					void 0 == t && (t = new ht), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
				}
			})(),
			fromBufferGeometry : function(t) {
				function e(t, e, i, r) {
					var o = void 0 === s ? [] : [ d[t].clone(), d[e].clone(), d[i].clone() ],
						a = void 0 === c ? [] : [ n.colors[t].clone(), n.colors[e].clone(), n.colors[i].clone() ],
						h = new pt(t, e, i, o, a, r);
					n.faces.push(h), void 0 !== u && n.faceVertexUvs[0].push([ p[t].clone(), p[e].clone(), p[i].clone() ]), void 0 !== l && n.faceVertexUvs[1].push([ f[t].clone(), f[e].clone(), f[i].clone() ])
				}
				var n = this,
					i = null === t.index ? void 0 : t.index.array,
					o = t.attributes,
					a = o.position.array,
					s = void 0 === o.normal ? void 0 : o.normal.array,
					c = void 0 === o.color ? void 0 : o.color.array,
					u = void 0 === o.uv ? void 0 : o.uv.array,
					l = void 0 === o.uv2 ? void 0 : o.uv2.array;
				void 0 !== l && (this.faceVertexUvs[1] = []);
				for (var d = [], p = [], f = [], m = 0, v = 0; m < a.length; m += 3, v += 2) n.vertices.push(new h(a[m], a[m + 1], a[m + 2])), void 0 !== s && d.push(new h(s[m], s[m + 1], s[m + 2])), void 0 !== c && n.colors.push(new q(c[m], c[m + 1], c[m + 2])), void 0 !== u && p.push(new r(u[v], u[v + 1])), void 0 !== l && f.push(new r(l[v], l[v + 1]));
				if (void 0 !== i) {
					var g = t.groups;
					if (0 < g.length)
						for (var m = 0; m < g.length; m++)
							for (var y = g[m], x = y.start, b = y.count, v = x; v < x + b; v += 3) e(i[v], i[v + 1], i[v + 2], y.materialIndex);
					else
						for (var m = 0; m < i.length; m += 3) e(i[m], i[m + 1], i[m + 2])
				} else
					for (var m = 0; m < a.length / 3; m += 3) e(m, m + 1, m + 2);
				return this.computeFaceNormals(), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), this
			},
			center : function() {
				this.computeBoundingBox();
				var t = this.boundingBox.getCenter().negate();
				return this.translate(t.x, t.y, t.z), t
			},
			normalize : function() {
				this.computeBoundingSphere();
				var t = this.boundingSphere.center,
					e = this.boundingSphere.radius,
					n = 0 === e ? 1 : 1 / e,
					i = new l;
				return i.set(n, 0, 0, -n * t.x, 0, n, 0, -n * t.y, 0, 0, n, -n * t.z, 0, 0, 0, 1), this.applyMatrix(i), this
			},
			computeFaceNormals : function() {
				for (var t = new h, e = new h, n = 0, i = this.faces.length; n < i; n++) {
					var r = this.faces[n],
						o = this.vertices[r.a],
						a = this.vertices[r.b],
						s = this.vertices[r.c];
					t.subVectors(s, a), e.subVectors(o, a), t.cross(e), t.normalize(), r.normal.copy(t)
				}
			},
			computeVertexNormals : function(t) {
				void 0 === t && (t = !0);
				var e,
					n,
					i,
					r,
					o,
					a;
				for (a = Array(this.vertices.length), e = 0, n = this.vertices.length; e < n; e++) a[e] = new h;
				if (t) {
					var s,
						c,
						u,
						l = new h,
						d = new h;
					for (i = 0, r = this.faces.length; i < r; i++) o = this.faces[i], s = this.vertices[o.a], c = this.vertices[o.b], u = this.vertices[o.c], l.subVectors(u, c), d.subVectors(s, c), l.cross(d), a[o.a].add(l), a[o.b].add(l), a[o.c].add(l)
				} else
					for (this.computeFaceNormals(), i = 0, r = this.faces.length; i < r; i++) o = this.faces[i], a[o.a].add(o.normal), a[o.b].add(o.normal), a[o.c].add(o.normal);
				for (e = 0, n = this.vertices.length; e < n; e++) a[e].normalize();
				for (i = 0, r = this.faces.length; i < r; i++) {
					o = this.faces[i];var p = o.vertexNormals;
					3 === p.length ? (p[0].copy(a[o.a]), p[1].copy(a[o.b]), p[2].copy(a[o.c])) : (p[0] = a[o.a].clone(), p[1] = a[o.b].clone(), p[2] = a[o.c].clone())
				}
				0 < this.faces.length && (this.normalsNeedUpdate = !0)
			},
			computeFlatVertexNormals : function() {
				var t,
					e,
					n;
				for (this.computeFaceNormals(), t = 0, e = this.faces.length; t < e; t++) {
					n = this.faces[t];var i = n.vertexNormals;
					3 === i.length ? (i[0].copy(n.normal), i[1].copy(n.normal), i[2].copy(n.normal)) : (i[0] = n.normal.clone(), i[1] = n.normal.clone(), i[2] = n.normal.clone())
				}
				0 < this.faces.length && (this.normalsNeedUpdate = !0)
			},
			computeMorphNormals : function() {
				var t,
					e,
					n,
					i,
					r;
				for (n = 0, i = this.faces.length; n < i; n++)
					for (r = this.faces[n], r.__originalFaceNormal ? r.__originalFaceNormal.copy(r.normal) : r.__originalFaceNormal = r.normal.clone(), r.__originalVertexNormals || (r.__originalVertexNormals = []), t = 0, e = r.vertexNormals.length; t < e; t++) r.__originalVertexNormals[t] ? r.__originalVertexNormals[t].copy(r.vertexNormals[t]) : r.__originalVertexNormals[t] = r.vertexNormals[t].clone();
				var o = new Tt;
				for (o.faces = this.faces, t = 0, e = this.morphTargets.length; t < e; t++) {
					if (!this.morphNormals[t]) {
						this.morphNormals[t] = {}, this.morphNormals[t].faceNormals = [], this.morphNormals[t].vertexNormals = [];
						var a,
							s,
							c = this.morphNormals[t].faceNormals,
							u = this.morphNormals[t].vertexNormals;
						for (n = 0, i = this.faces.length; n < i; n++) a = new h, s = {
								a : new h,
								b : new h,
								c : new h
							}, c.push(a), u.push(s)
					}
					var l = this.morphNormals[t];
					o.vertices = this.morphTargets[t].vertices, o.computeFaceNormals(), o.computeVertexNormals();var a,
						s;
					for (n = 0, i = this.faces.length; n < i; n++) r = this.faces[n], a = l.faceNormals[n], s = l.vertexNormals[n], a.copy(r.normal), s.a.copy(r.vertexNormals[0]), s.b.copy(r.vertexNormals[1]), s.c.copy(r.vertexNormals[2])
				}
				for (n = 0, i = this.faces.length; n < i; n++) r = this.faces[n], r.normal = r.__originalFaceNormal, r.vertexNormals = r.__originalVertexNormals
			},
			computeLineDistances : function() {
				for (var t = 0, e = this.vertices, n = 0, i = e.length; n < i; n++) 0 < n && (t += e[n].distanceTo(e[n - 1])), this.lineDistances[n] = t
			},
			computeBoundingBox : function() {
				null === this.boundingBox && (this.boundingBox = new et), this.boundingBox.setFromPoints(this.vertices)
			},
			computeBoundingSphere : function() {
				null === this.boundingSphere && (this.boundingSphere = new nt), this.boundingSphere.setFromPoints(this.vertices)
			},
			merge : function(t, e, n) {
				if (!1 === (t && t.isGeometry)) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t);
				var i,
					r = this.vertices.length,
					o = this.vertices,
					a = t.vertices,
					s = this.faces,
					c = t.faces,
					u = this.faceVertexUvs[0],
					h = t.faceVertexUvs[0],
					l = this.colors,
					d = t.colors;
				void 0 === n && (n = 0), void 0 !== e && (i = (new it).getNormalMatrix(e));
				for (var p = 0, f = a.length; p < f; p++) {
					var m = a[p],
						v = m.clone();
					void 0 !== e && v.applyMatrix4(e), o.push(v)
				}
				for (var p = 0, f = d.length; p < f; p++) l.push(d[p].clone());
				for (p = 0, f = c.length; p < f; p++) {
					var g,
						y,
						x,
						b = c[p],
						_ = b.vertexNormals,
						w = b.vertexColors;
					g = new pt(b.a + r, b.b + r, b.c + r), g.normal.copy(b.normal), void 0 != i && g.normal.applyMatrix3(i).normalize();
					for (var M = 0, E = _.length; M < E; M++) y = _[M].clone(), void 0 != i && y.applyMatrix3(i).normalize(), g.vertexNormals.push(y);
					g.color.copy(b.color);
					for (var M = 0, E = w.length; M < E; M++) x = w[M], g.vertexColors.push(x.clone());
					g.materialIndex = b.materialIndex + n, s.push(g)
				}
				for (p = 0, f = h.length; p < f; p++) {
					var S = h[p],
						T = [];
					if (void 0 !== S) {
						for (var M = 0, E = S.length; M < E; M++) T.push(S[M].clone());
						u.push(T)
					}
				}
			},
			mergeMesh : function(t) {
				return !1 === (t && t.isMesh) ? void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t) : (t.matrixAutoUpdate && t.updateMatrix(), void this.merge(t.geometry, t.matrix))
			},
			mergeVertices : function() {
				var t,
					e,
					n,
					i,
					r,
					o,
					a,
					s,
					c = {},
					u = [],
					h = [],
					l = Math.pow(10, 4);
				for (n = 0, i = this.vertices.length; n < i; n++) t = this.vertices[n], e = Math.round(t.x * l) + "_" + Math.round(t.y * l) + "_" + Math.round(t.z * l), void 0 === c[e] ? (c[e] = n, u.push(this.vertices[n]), h[n] = u.length - 1) : h[n] = h[c[e]];
				var d = [];
				for (n = 0, i = this.faces.length; n < i; n++) {
					r = this.faces[n], r.a = h[r.a], r.b = h[r.b], r.c = h[r.c], o = [ r.a, r.b, r.c ];
					for (var p = 0; 3 > p; p++)
						if (o[p] === o[(p + 1) % 3]) {
							d.push(n);break
					}
				}
				for (n = d.length - 1; 0 <= n; n--) {
					var f = d[n];
					for (this.faces.splice(f, 1), a = 0, s = this.faceVertexUvs.length; a < s; a++) this.faceVertexUvs[a].splice(f, 1)
				}
				var m = this.vertices.length - u.length;
				return this.vertices = u, m
			},
			sortFacesByMaterialIndex : function() {
				for (var t = this.faces, e = t.length, n = 0; n < e; n++) t[n]._id = n;
				t.sort((function(t, e) {
					return t.materialIndex - e.materialIndex
				}));
				var i,
					r,
					o = this.faceVertexUvs[0],
					a = this.faceVertexUvs[1];
				o && o.length === e && (i = []), a && a.length === e && (r = []);
				for (var n = 0; n < e; n++) {
					var s = t[n]._id;
					i && i.push(o[s]), r && r.push(a[s])
				}
				i && (this.faceVertexUvs[0] = i), r && (this.faceVertexUvs[1] = r)
			},
			toJSON : function() {
				function t(t, e, n) {
					return n ? t | 1 << e : t & ~(1 << e)
				}
				function e(t) {
					var e = t.x.toString() + t.y.toString() + t.z.toString();
					return void 0 === d[e] ? (d[e] = l.length / 3, l.push(t.x, t.y, t.z), d[e]) : d[e]
				}
				function n(t) {
					var e = t.r.toString() + t.g.toString() + t.b.toString();
					return void 0 === f[e] ? (f[e] = p.length, p.push(t.getHex()), f[e]) : f[e]
				}
				function i(t) {
					var e = t.x.toString() + t.y.toString();
					return void 0 === v[e] ? (v[e] = m.length / 2, m.push(t.x, t.y), v[e]) : v[e]
				}
				var r = {
					metadata : {
						version : 4.4,
						type : "Geometry",
						generator : "Geometry.toJSON"
					}
				};
				if (r.uuid = this.uuid, r.type = this.type, "" !== this.name && (r.name = this.name), void 0 !== this.parameters) {
					var o = this.parameters;
					for (var a in o) void 0 !== o[a] && (r[a] = o[a]);
					return r
				}
				for (var s = [], c = 0; c < this.vertices.length; c++) {
					var u = this.vertices[c];
					s.push(u.x, u.y, u.z)
				}
				for (var h = [], l = [], d = {}, p = [], f = {}, m = [], v = {}, c = 0; c < this.faces.length; c++) {
					var g = this.faces[c],
						y = void 0 !== this.faceVertexUvs[0][c],
						x = 0 < g.normal.length(),
						b = 0 < g.vertexNormals.length,
						_ = 1 !== g.color.r || 1 !== g.color.g || 1 !== g.color.b,
						w = 0 < g.vertexColors.length,
						M = 0;
					if (M = t(M, 0, 0), M = t(M, 1, !0), M = t(M, 2, !1), M = t(M, 3, y), M = t(M, 4, x), M = t(M, 5, b), M = t(M, 6, _), M = t(M, 7, w), h.push(M), h.push(g.a, g.b, g.c), h.push(g.materialIndex), y) {
						var E = this.faceVertexUvs[0][c];
						h.push(i(E[0]), i(E[1]), i(E[2]))
					}
					if (x && h.push(e(g.normal)), b) {
						var S = g.vertexNormals;
						h.push(e(S[0]), e(S[1]), e(S[2]))
					}
					if (_ && h.push(n(g.color)), w) {
						var T = g.vertexColors;
						h.push(n(T[0]), n(T[1]), n(T[2]))
					}
				}
				return r.data = {}, r.data.vertices = s, r.data.normals = l, 0 < p.length && (r.data.colors = p), 0 < m.length && (r.data.uvs = [ m ]), r.data.faces = h, r
			},
			clone : function() {
				return (new Tt).copy(this)
			},
			copy : function(t) {
				this.vertices = [], this.faces = [], this.faceVertexUvs = [ [] ], this.colors = [];
				for (var e = t.vertices, n = 0, i = e.length; n < i; n++) this.vertices.push(e[n].clone());
				for (var r = t.colors, n = 0, i = r.length; n < i; n++) this.colors.push(r[n].clone());
				for (var o = t.faces, n = 0, i = o.length; n < i; n++) this.faces.push(o[n].clone());
				for (var n = 0, i = t.faceVertexUvs.length; n < i; n++) {
					var a = t.faceVertexUvs[n];
					void 0 === this.faceVertexUvs[n] && (this.faceVertexUvs[n] = []);
					for (var s = 0, c = a.length; s < c; s++) {
						for (var u = a[s], h = [], l = 0, d = u.length; l < d; l++) {
							var p = u[l];
							h.push(p.clone())
						}
						this.faceVertexUvs[n].push(h)
					}
				}
				return this
			},
			dispose : function() {
				this.dispatchEvent({
					type : "dispose"
				})
			}
		});
		var cs = 0;
		Object.assign(Pt.prototype, i.prototype, {
			isBufferGeometry : !0,
			getIndex : function() {
				return this.index
			},
			setIndex : function(t) {
				this.index = t
			},
			addAttribute : function(t, e) {
				return !1 === (e && e.isBufferAttribute) && !1 === (e && e.isInterleavedBufferAttribute) ? (console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), void this.addAttribute(t, new mt(arguments[1], arguments[2]))) : "index" === t ? (console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), void this.setIndex(e)) : (this.attributes[t] = e, this)
			},
			getAttribute : function(t) {
				return this.attributes[t]
			},
			removeAttribute : function(t) {
				return delete this.attributes[t]
					, this
			},
			addGroup : function(t, e, n) {
				this.groups.push({
					start : t,
					count : e,
					materialIndex : void 0 === n ? 0 : n
				})
			},
			clearGroups : function() {
				this.groups = []
			},
			setDrawRange : function(t, e) {
				this.drawRange.start = t, this.drawRange.count = e
			},
			applyMatrix : function(t) {
				var e = this.attributes.position;
				void 0 !== e && (t.applyToVector3Array(e.array), e.needsUpdate = !0);
				var n = this.attributes.normal;
				if (void 0 !== n) {
					var i = (new it).getNormalMatrix(t);
					i.applyToVector3Array(n.array), n.needsUpdate = !0
				}
				return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
			},
			rotateX : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationX(e), this.applyMatrix(t), this
				}
			})(),
			rotateY : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationY(e), this.applyMatrix(t), this
				}
			})(),
			rotateZ : (function() {
				var t;
				return function(e) {
					return void 0 == t && (t = new l), t.makeRotationZ(e), this.applyMatrix(t), this
				}
			})(),
			translate : (function() {
				var t;
				return function(e, n, i) {
					return void 0 == t && (t = new l), t.makeTranslation(e, n, i), this.applyMatrix(t), this
				}
			})(),
			scale : (function() {
				var t;
				return function(e, n, i) {
					return void 0 == t && (t = new l), t.makeScale(e, n, i), this.applyMatrix(t), this
				}
			})(),
			lookAt : (function() {
				var t;
				return function(e) {
					void 0 == t && (t = new ht), t.lookAt(e), t.updateMatrix(), this.applyMatrix(t.matrix)
				}
			})(),
			center : function() {
				this.computeBoundingBox();
				var t = this.boundingBox.getCenter().negate();
				return this.translate(t.x, t.y, t.z), t
			},
			setFromObject : function(t) {
				var e = t.geometry;
				if (t.isPoints || t.isLine) {
					var n = new Mt(3 * e.vertices.length, 3),
						i = new Mt(3 * e.colors.length, 3);
					if (this.addAttribute("position", n.copyVector3sArray(e.vertices)), this.addAttribute("color", i.copyColorsArray(e.colors)), e.lineDistances && e.lineDistances.length === e.vertices.length) {
						var r = new Mt(e.lineDistances.length, 1);
						this.addAttribute("lineDistance", r.copyArray(e.lineDistances))
					}
					null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone())
				} else t.isMesh && e && e.isGeometry && this.fromGeometry(e);
				return this
			},
			updateFromObject : function(t) {
				var e = t.geometry;
				if (t.isMesh) {
					var n = e.__directGeometry;
					if (!0 === e.elementsNeedUpdate && (n = void 0, e.elementsNeedUpdate = !1), void 0 === n) return this.fromGeometry(e);
					n.verticesNeedUpdate = e.verticesNeedUpdate, n.normalsNeedUpdate = e.normalsNeedUpdate, n.colorsNeedUpdate = e.colorsNeedUpdate, n.uvsNeedUpdate = e.uvsNeedUpdate, n.groupsNeedUpdate = e.groupsNeedUpdate, e.verticesNeedUpdate = !1, e.normalsNeedUpdate = !1, e.colorsNeedUpdate = !1, e.uvsNeedUpdate = !1, e.groupsNeedUpdate = !1, e = n
				}
				var i;
				return !0 === e.verticesNeedUpdate && (i = this.attributes.position, void 0 != i && (i.copyVector3sArray(e.vertices), i.needsUpdate = !0), e.verticesNeedUpdate = !1), !0 === e.normalsNeedUpdate && (i = this.attributes.normal, void 0 != i && (i.copyVector3sArray(e.normals), i.needsUpdate = !0), e.normalsNeedUpdate = !1), !0 === e.colorsNeedUpdate && (i = this.attributes.color, void 0 != i && (i.copyColorsArray(e.colors), i.needsUpdate = !0), e.colorsNeedUpdate = !1), e.uvsNeedUpdate && (i = this.attributes.uv, void 0 != i && (i.copyVector2sArray(e.uvs), i.needsUpdate = !0), e.uvsNeedUpdate = !1), e.lineDistancesNeedUpdate && (i = this.attributes.lineDistance, void 0 != i && (i.copyArray(e.lineDistances), i.needsUpdate = !0), e.lineDistancesNeedUpdate = !1), e.groupsNeedUpdate && (e.computeGroups(t.geometry), this.groups = e.groups, e.groupsNeedUpdate = !1), this
			},
			fromGeometry : function(t) {
				return t.__directGeometry = (new St).fromGeometry(t), this.fromDirectGeometry(t.__directGeometry)
			},
			fromDirectGeometry : function(t) {
				var e = new Float32Array(3 * t.vertices.length);
				if (this.addAttribute("position", new mt(e, 3).copyVector3sArray(t.vertices)), 0 < t.normals.length) {
					var n = new Float32Array(3 * t.normals.length);
					this.addAttribute("normal", new mt(n, 3).copyVector3sArray(t.normals))
				}
				if (0 < t.colors.length) {
					var i = new Float32Array(3 * t.colors.length);
					this.addAttribute("color", new mt(i, 3).copyColorsArray(t.colors))
				}
				if (0 < t.uvs.length) {
					var r = new Float32Array(2 * t.uvs.length);
					this.addAttribute("uv", new mt(r, 2).copyVector2sArray(t.uvs))
				}
				if (0 < t.uvs2.length) {
					var o = new Float32Array(2 * t.uvs2.length);
					this.addAttribute("uv2", new mt(o, 2).copyVector2sArray(t.uvs2))
				}
				if (0 < t.indices.length) {
					var a = 65535 < t.vertices.length ? Uint32Array : Uint16Array,
						s = new a(3 * t.indices.length);
					this.setIndex(new mt(s, 1).copyIndicesArray(t.indices))
				}
				for (var c in this.groups = t.groups, t.morphTargets) {
					for (var u = [], h = t.morphTargets[c], l = 0, d = h.length; l < d; l++) {
						var p = h[l],
							f = new Mt(3 * p.length, 3);
						u.push(f.copyVector3sArray(p))
					}
					this.morphAttributes[c] = u
				}
				if (0 < t.skinIndices.length) {
					var m = new Mt(4 * t.skinIndices.length, 4);
					this.addAttribute("skinIndex", m.copyVector4sArray(t.skinIndices))
				}
				if (0 < t.skinWeights.length) {
					var v = new Mt(4 * t.skinWeights.length, 4);
					this.addAttribute("skinWeight", v.copyVector4sArray(t.skinWeights))
				}
				return null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()), this
			},
			computeBoundingBox : function() {
				null === this.boundingBox && (this.boundingBox = new et);
				var t = this.attributes.position;
				void 0 === t ? this.boundingBox.makeEmpty() : this.boundingBox.setFromBufferAttribute(t), (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
			},
			computeBoundingSphere : (function() {
				var t = new et,
					e = new h;
				return function() {
					null === this.boundingSphere && (this.boundingSphere = new nt);
					var n = this.attributes.position;
					if (n) {
						var i = this.boundingSphere.center;
						t.setFromBufferAttribute(n), t.getCenter(i);
						for (var r = 0, o = 0, a = n.count; o < a; o++) e.x = n.getX(o), e.y = n.getY(o), e.z = n.getZ(o), r = Math.max(r, i.distanceToSquared(e));
						this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
					}
				}
			})(),
			computeFaceNormals : function() {},
			computeVertexNormals : function() {
				var t = this.index,
					e = this.attributes,
					n = this.groups;
				if (e.position) {
					var i = e.position.array;
					if (void 0 === e.normal) this.addAttribute("normal", new mt(new Float32Array(i.length), 3));else
						for (var r = e.normal.array, o = 0, a = r.length; o < a; o++) r[o] = 0;
					var s,
						c,
						u,
						l = e.normal.array,
						d = new h,
						p = new h,
						f = new h,
						m = new h,
						v = new h;
					if (t) {
						var g = t.array;
						0 === n.length && this.addGroup(0, g.length);
						for (var y = 0, x = n.length; y < x; ++y)
							for (var b = n[y], _ = b.start, w = b.count, o = _, a = _ + w; o < a; o += 3) s = 3 * g[o + 0], c = 3 * g[o + 1], u = 3 * g[o + 2], d.fromArray(i, s), p.fromArray(i, c), f.fromArray(i, u), m.subVectors(f, p), v.subVectors(d, p), m.cross(v), l[s] += m.x, l[s + 1] += m.y, l[s + 2] += m.z, l[c] += m.x, l[c + 1] += m.y, l[c + 2] += m.z, l[u] += m.x, l[u + 1] += m.y, l[u + 2] += m.z
					} else
						for (var o = 0, a = i.length; o < a; o += 9) d.fromArray(i, o), p.fromArray(i, o + 3), f.fromArray(i, o + 6), m.subVectors(f, p), v.subVectors(d, p), m.cross(v), l[o] = m.x, l[o + 1] = m.y, l[o + 2] = m.z, l[o + 3] = m.x, l[o + 4] = m.y, l[o + 5] = m.z, l[o + 6] = m.x, l[o + 7] = m.y, l[o + 8] = m.z;
					this.normalizeNormals(), e.normal.needsUpdate = !0
				}
			},
			merge : function(t, e) {
				if (!1 === (t && t.isBufferGeometry)) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t);
				void 0 === e && (e = 0);
				var n = this.attributes;
				for (var i in n)
					if (void 0 !== t.attributes[i])
						for (var r = n[i], o = r.array, a = t.attributes[i], s = a.array, c = a.itemSize, u = 0, h = c * e; u < s.length; u++, h++) o[h] = s[u];
				return this
			},
			normalizeNormals : function() {
				for (var t, e, n, i, r = this.attributes.normal.array, o = 0, a = r.length; o < a; o += 3) t = r[o], e = r[o + 1], n = r[o + 2], i = 1 / Math.sqrt(t * t + e * e + n * n), r[o] *= i, r[o + 1] *= i, r[o + 2] *= i
			},
			toNonIndexed : function() {
				if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
				var t = new Pt,
					e = this.index.array,
					n = this.attributes;
				for (var i in n) {
					for (var r = n[i], o = r.array, a = r.itemSize, s = new o.constructor(e.length * a), c = 0, u = 0, h = 0, l = e.length; h < l; h++) {
						c = e[h] * a;
						for (var d = 0; d < a; d++) s[u++] = o[c++]
					}
					t.addAttribute(i, new mt(s, a))
				}
				return t
			},
			toJSON : function() {
				var t = {
					metadata : {
						version : 4.4,
						type : "BufferGeometry",
						generator : "BufferGeometry.toJSON"
					}
				};
				if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), void 0 !== this.parameters) {
					var e = this.parameters;
					for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
					return t
				}
				t.data = {
					attributes : {}
				};
				var i = this.index;
				if (null !== i) {
					var r = Array.prototype.slice.call(i.array);
					t.data.index = {
						type : i.array.constructor.name,
						array : r
					}
				}
				var o = this.attributes;
				for (var n in o) {
					var a = o[n],
						r = Array.prototype.slice.call(a.array);
					t.data.attributes[n] = {
						itemSize : a.itemSize,
						type : a.array.constructor.name,
						array : r,
						normalized : a.normalized
					}
				}
				var s = this.groups;
				0 < s.length && (t.data.groups = JSON.parse(JSON.stringify(s)));
				var c = this.boundingSphere;
				return null !== c && (t.data.boundingSphere = {
						center : c.center.toArray(),
						radius : c.radius
					}), t
			},
			clone : function() {
				return (new Pt).copy(this)
			},
			copy : function(t) {
				var e = t.index;
				null !== e && this.setIndex(e.clone());
				var n = t.attributes;
				for (var i in n) {
					var r = n[i];
					this.addAttribute(i, r.clone())
				}
				for (var o = t.groups, a = 0, s = o.length; a < s; a++) {
					var c = o[a];
					this.addGroup(c.start, c.count, c.materialIndex)
				}
				return this
			},
			dispose : function() {
				this.dispatchEvent({
					type : "dispose"
				})
			}
		}), Pt.MaxIndex = 65535, Lt.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : Lt,
			isMesh : !0,
			setDrawMode : function(t) {
				this.drawMode = t
			},
			copy : function(t) {
				return ht.prototype.copy.call(this, t), this.drawMode = t.drawMode, this
			},
			updateMorphTargets : function() {
				var t = this.geometry.morphTargets;
				if (void 0 !== t && 0 < t.length) {
					this.morphTargetInfluences = [], this.morphTargetDictionary = {};
					for (var e = 0, n = t.length; e < n; e++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[t[e].name] = e
				}
			},
			raycast : (function() {
				function t(t, e, n, i, r, o, a) {
					return dt.barycoordFromPoint(t, e, n, i, y), r.multiplyScalar(y.x), o.multiplyScalar(y.y), a.multiplyScalar(y.z), r.add(o).add(a), r.clone()
				}
				function e(t, e, n, i, r, o, a) {
					var s,
						c = t.material;
					if (s = c.side === Gr ? n.intersectTriangle(o, r, i, !0, a) : n.intersectTriangle(i, r, o, c.side !== kr, a), null === s) return null;
					b.copy(a), b.applyMatrix4(t.matrixWorld);var u = e.ray.origin.distanceTo(b);
					return u < e.near || u > e.far ? null : {
						distance : u,
						point : b.clone(),
						object : t
					}
				}
				function n(n, i, r, o, a, h, l, d) {
					s.fromArray(o, 3 * h), c.fromArray(o, 3 * l), u.fromArray(o, 3 * d);var p = e(n, i, r, s, c, u, x);
					return p && (a && (m.fromArray(a, 2 * h), v.fromArray(a, 2 * l), g.fromArray(a, 2 * d), p.uv = t(x, s, c, u, m, v, g)), p.face = new pt(h, l, d, dt.normal(s, c, u)), p.faceIndex = h), p
				}
				var i = new l,
					o = new st,
					a = new nt,
					s = new h,
					c = new h,
					u = new h,
					d = new h,
					p = new h,
					f = new h,
					m = new r,
					v = new r,
					g = new r,
					y = new h,
					x = new h,
					b = new h;
				return function(r, h) {
					var l = this.geometry,
						y = this.material,
						b = this.matrixWorld;
					if (void 0 !== y && (null === l.boundingSphere && l.computeBoundingSphere(), a.copy(l.boundingSphere), a.applyMatrix4(b), !1 !== r.ray.intersectsSphere(a))) {
						if (i.getInverse(b), o.copy(r.ray).applyMatrix4(i), null !== l.boundingBox && !1 === o.intersectsBox(l.boundingBox)) return;
						var _,
							w;
						if (l.isBufferGeometry) {
							var M,
								E,
								S,
								T = l.index,
								A = l.attributes,
								P = A.position.array;
							if (void 0 !== A.uv && (_ = A.uv.array), null !== T)
								for (var L = T.array, R = 0, C = L.length; R < C; R += 3) M = L[R], E = L[R + 1], S = L[R + 2], w = n(this, r, o, P, _, M, E, S), w && (w.faceIndex = Math.floor(R / 3), h.push(w));
							else
								for (var R = 0, C = P.length; R < C; R += 9) M = R / 3, E = M + 1, S = M + 2, w = n(this, r, o, P, _, M, E, S), w && (w.index = M, h.push(w))
						} else if (l.isGeometry) {
							var I,
								O,
								U,
								D = y && y.isMultiMaterial,
								B = !0 === D ? y.materials : null,
								N = l.vertices,
								F = l.faces,
								z = l.faceVertexUvs[0];
							0 < z.length && (_ = z);
							for (var G = 0, k = F.length; G < k; G++) {
								var H = F[G],
									j = !0 === D ? B[H.materialIndex] : y;
								if (void 0 !== j) {
									if (I = N[H.a], O = N[H.b], U = N[H.c], !0 === j.morphTargets) {
										var V = l.morphTargets,
											W = this.morphTargetInfluences;
										s.set(0, 0, 0), c.set(0, 0, 0), u.set(0, 0, 0);
										for (var X = 0, q = V.length; X < q; X++) {
											var Y = W[X];
											if (0 !== Y) {
												var Z = V[X].vertices;
												s.addScaledVector(d.subVectors(Z[H.a], I), Y), c.addScaledVector(p.subVectors(Z[H.b], O), Y), u.addScaledVector(f.subVectors(Z[H.c], U), Y)
											}
										}
										s.add(I), c.add(O), u.add(U), I = s, O = c, U = u
									}
									if (w = e(this, r, o, I, O, U, x)) {
										if (_) {
											var J = _[G];
											m.copy(J[0]), v.copy(J[1]), g.copy(J[2]), w.uv = t(x, I, O, U, m, v, g)
										}
										w.face = H, w.faceIndex = G, h.push(w)
									}
								}
							}
						}
					}
				}
			})(),
			clone : function() {
				return new this.constructor(this.geometry, this.material).copy(this)
			}
		}), Rt.prototype = Object.create(Pt.prototype), Rt.prototype.constructor = Rt, Ct.prototype = Object.create(Pt.prototype), Ct.prototype.constructor = Ct, It.prototype = Object.create(ht.prototype), It.prototype.constructor = It, It.prototype.isCamera = !0, It.prototype.getWorldDirection = (function() {
			var t = new u;
			return function(e) {
				var n = e || new h;
				return this.getWorldQuaternion(t), n.set(0, 0, -1).applyQuaternion(t)
			}
		})(), It.prototype.lookAt = (function() {
			var t = new l;
			return function(e) {
				t.lookAt(this.position, e, this.up), this.quaternion.setFromRotationMatrix(t)
			}
		})(), It.prototype.clone = function() {
			return (new this.constructor).copy(this)
		}, It.prototype.copy = function(t) {
			return ht.prototype.copy.call(this, t), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this
		}, Ot.prototype = Object.assign(Object.create(It.prototype), {
			constructor : Ot,
			isPerspectiveCamera : !0,
			copy : function(t) {
				return It.prototype.copy.call(this, t), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this
			},
			setFocalLength : function(t) {
				var e = .5 * this.getFilmHeight() / t;
				this.fov = 2 * Ya.RAD2DEG * Math.atan(e), this.updateProjectionMatrix()
			},
			getFocalLength : function() {
				var t = Math.tan(.5 * Ya.DEG2RAD * this.fov);
				return .5 * this.getFilmHeight() / t
			},
			getEffectiveFOV : function() {
				return 2 * Ya.RAD2DEG * Math.atan(Math.tan(.5 * Ya.DEG2RAD * this.fov) / this.zoom)
			},
			getFilmWidth : function() {
				return this.filmGauge * Math.min(this.aspect, 1)
			},
			getFilmHeight : function() {
				return this.filmGauge / Math.max(this.aspect, 1)
			},
			setViewOffset : function(t, e, n, i, r, o) {
				this.aspect = t / e, this.view = {
					fullWidth : t,
					fullHeight : e,
					offsetX : n,
					offsetY : i,
					width : r,
					height : o
				}, this.updateProjectionMatrix()
			},
			clearViewOffset : function() {
				this.view = null, this.updateProjectionMatrix()
			},
			updateProjectionMatrix : function() {
				var t = this.near,
					e = t * Math.tan(.5 * Ya.DEG2RAD * this.fov) / this.zoom,
					n = 2 * e,
					i = this.aspect * n,
					r = -.5 * i,
					o = this.view;
				if (null !== o) {
					var a = o.fullWidth,
						s = o.fullHeight;
					r += o.offsetX * i / a, e -= o.offsetY * n / s, i *= o.width / a, n *= o.height / s
				}
				var c = this.filmOffset;
				0 !== c && (r += t * c / this.getFilmWidth()), this.projectionMatrix.makeFrustum(r, r + i, e - n, e, t, this.far)
			},
			toJSON : function(t) {
				var e = ht.prototype.toJSON.call(this, t);
				return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
			}
		}), Ut.prototype = Object.assign(Object.create(It.prototype), {
			constructor : Ut,
			isOrthographicCamera : !0,
			copy : function(t) {
				return It.prototype.copy.call(this, t), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this
			},
			setViewOffset : function(t, e, n, i, r, o) {
				this.view = {
					fullWidth : t,
					fullHeight : e,
					offsetX : n,
					offsetY : i,
					width : r,
					height : o
				}, this.updateProjectionMatrix()
			},
			clearViewOffset : function() {
				this.view = null, this.updateProjectionMatrix()
			},
			updateProjectionMatrix : function() {
				var t = (this.right - this.left) / (2 * this.zoom),
					e = (this.top - this.bottom) / (2 * this.zoom),
					n = (this.right + this.left) / 2,
					i = (this.top + this.bottom) / 2,
					r = n - t,
					o = n + t,
					a = i + e,
					s = i - e;
				if (null !== this.view) {
					var c = this.zoom / (this.view.width / this.view.fullWidth),
						u = this.zoom / (this.view.height / this.view.fullHeight),
						h = (this.right - this.left) / this.view.width,
						l = (this.top - this.bottom) / this.view.height;
					r += h * (this.view.offsetX / c), o = r + h * (this.view.width / c), a -= l * (this.view.offsetY / u), s = a - l * (this.view.height / u)
				}
				this.projectionMatrix.makeOrthographic(r, o, a, s, this.near, this.far)
			},
			toJSON : function(t) {
				var e = ht.prototype.toJSON.call(this, t);
				return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e
			}
		});
		var us = 0;
		ce.prototype.isFogExp2 = !0, ce.prototype.clone = function() {
			return new ce(this.color.getHex(), this.density)
		}, ce.prototype.toJSON = function() {
			return {
				type : "FogExp2",
				color : this.color.getHex(),
				density : this.density
			}
		}, ue.prototype.isFog = !0, ue.prototype.clone = function() {
			return new ue(this.color.getHex(), this.near, this.far)
		}, ue.prototype.toJSON = function() {
			return {
				type : "Fog",
				color : this.color.getHex(),
				near : this.near,
				far : this.far
			}
		}, he.prototype = Object.create(ht.prototype), he.prototype.constructor = he, he.prototype.copy = function(t, e) {
			return ht.prototype.copy.call(this, t, e), null !== t.background && (this.background = t.background.clone()), null !== t.fog && (this.fog = t.fog.clone()), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.autoUpdate = t.autoUpdate, this.matrixAutoUpdate = t.matrixAutoUpdate, this
		}, he.prototype.toJSON = function(t) {
			var e = ht.prototype.toJSON.call(this, t);
			return null !== this.background && (e.object.background = this.background.toJSON(t)), null !== this.fog && (e.object.fog = this.fog.toJSON()), e
		}, le.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : le,
			isLensFlare : !0,
			copy : function(t) {
				ht.prototype.copy.call(this, t), this.positionScreen.copy(t.positionScreen), this.customUpdateCallback = t.customUpdateCallback;
				for (var e = 0, n = t.lensFlares.length; e < n; e++) this.lensFlares.push(t.lensFlares[e]);
				return this
			},
			add : function(t, e, n, i, r, o) {
				void 0 === e && (e = -1), void 0 === n && (n = 0), void 0 === o && (o = 1), void 0 === r && (r = new q(16777215)), void 0 === i && (i = Yr), n = Math.min(n, Math.max(0, n)), this.lensFlares.push({
					texture : t,
					size : e,
					distance : n,
					x : 0,
					y : 0,
					z : 0,
					scale : 1,
					rotation : 0,
					opacity : o,
					color : r,
					blending : i
				})
			},
			updateLensFlares : function() {
				var t,
					e,
					n = this.lensFlares.length,
					i = 2 * -this.positionScreen.x,
					r = 2 * -this.positionScreen.y;
				for (t = 0; t < n; t++) e = this.lensFlares[t], e.x = this.positionScreen.x + i * e.distance, e.y = this.positionScreen.y + r * e.distance, e.wantedRotation = .25 * (e.x * Math.PI), e.rotation += .25 * (e.wantedRotation - e.rotation)
			}
		}), de.prototype = Object.create(Q.prototype), de.prototype.constructor = de, de.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.rotation = t.rotation, this
		}, pe.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : pe,
			isSprite : !0,
			raycast : (function() {
				var t = new h;
				return function(e, n) {
					t.setFromMatrixPosition(this.matrixWorld);
					var i = e.ray.distanceSqToPoint(t),
						r = this.scale.x * this.scale.y / 4;
					i > r || n.push({
						distance : Math.sqrt(i),
						point : this.position,
						face : null,
						object : this
					})
				}
			})(),
			clone : function() {
				return new this.constructor(this.material).copy(this)
			}
		}), fe.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : fe,
			copy : function(t) {
				ht.prototype.copy.call(this, t, !1);
				for (var e = t.levels, n = 0, i = e.length; n < i; n++) {
					var r = e[n];
					this.addLevel(r.object.clone(), r.distance)
				}
				return this
			},
			addLevel : function(t, e) {
				void 0 === e && (e = 0), e = Math.abs(e);
				for (var n = this.levels, i = 0; i < n.length && !(e < n[i].distance); i++)
					;
				n.splice(i, 0, {
					distance : e,
					object : t
				}), this.add(t)
			},
			getObjectForDistance : function(t) {
				for (var e = this.levels, n = 1, i = e.length; n < i && !(t < e[n].distance); n++)
					;
				return e[n - 1].object
			},
			raycast : (function() {
				var t = new h;
				return function(e, n) {
					t.setFromMatrixPosition(this.matrixWorld);
					var i = e.ray.origin.distanceTo(t);
					this.getObjectForDistance(i).raycast(e, n)
				}
			})(),
			update : (function() {
				var t = new h,
					e = new h;
				return function(n) {
					var i = this.levels;
					if (1 < i.length) {
						t.setFromMatrixPosition(n.matrixWorld), e.setFromMatrixPosition(this.matrixWorld);
						var r = t.distanceTo(e);
						i[0].object.visible = !0;
						for (var o = 1, a = i.length; o < a && r >= i[o].distance; o++) i[o - 1].object.visible = !1, i[o].object.visible = !0;
						for (; o < a; o++) i[o].object.visible = !1
					}
				}
			})(),
			toJSON : function(t) {
				var e = ht.prototype.toJSON.call(this, t);
				e.object.levels = [];
				for (var n = this.levels, i = 0, r = n.length; i < r; i++) {
					var o = n[i];
					e.object.levels.push({
						object : o.object.uuid,
						distance : o.distance
					})
				}
				return e
			}
		}), Object.assign(me.prototype, {
			calculateInverses : function() {
				this.boneInverses = [];
				for (var t = 0, e = this.bones.length; t < e; t++) {
					var n = new l;
					this.bones[t] && n.getInverse(this.bones[t].matrixWorld), this.boneInverses.push(n)
				}
			},
			pose : function() {
				for (var t, e = 0, n = this.bones.length; e < n; e++) t = this.bones[e], t && t.matrixWorld.getInverse(this.boneInverses[e]);
				for (var e = 0, n = this.bones.length; e < n; e++) t = this.bones[e], t && (t.parent && t.parent.isBone ? (t.matrix.getInverse(t.parent.matrixWorld), t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld), t.matrix.decompose(t.position, t.quaternion, t.scale))
			},
			update : (function() {
				var t = new l;
				return function() {
					for (var e = 0, n = this.bones.length; e < n; e++) {
						var i = this.bones[e] ? this.bones[e].matrixWorld : this.identityMatrix;
						t.multiplyMatrices(i, this.boneInverses[e]), t.toArray(this.boneMatrices, 16 * e)
					}
					this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
				}
			})(),
			clone : function() {
				return new me(this.bones, this.boneInverses, this.useVertexTexture)
			}
		}), ve.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : ve,
			isBone : !0
		}), ge.prototype = Object.assign(Object.create(Lt.prototype), {
			constructor : ge,
			isSkinnedMesh : !0,
			bind : function(t, e) {
				this.skeleton = t, void 0 === e && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.getInverse(e)
			},
			pose : function() {
				this.skeleton.pose()
			},
			normalizeSkinWeights : function() {
				if (this.geometry && this.geometry.isGeometry)
					for (var t = 0; t < this.geometry.skinWeights.length; t++) {
						var e = this.geometry.skinWeights[t],
							n = 1 / e.lengthManhattan();
						n == 1 / 0 ? e.set(1, 0, 0, 0) : e.multiplyScalar(n)
				}
				else if (this.geometry && this.geometry.isBufferGeometry)
					for (var i = new a, r = this.geometry.attributes.skinWeight, t = 0; t < r.count; t++) {
						i.x = r.getX(t), i.y = r.getY(t), i.z = r.getZ(t), i.w = r.getW(t);var n = 1 / i.lengthManhattan();
						n == 1 / 0 ? i.set(1, 0, 0, 0) : i.multiplyScalar(n), r.setXYZW(t, i.x, i.y, i.z, i.w)
				}
			},
			updateMatrixWorld : function() {
				Lt.prototype.updateMatrixWorld.call(this, !0), "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unrecognized bindMode: " + this.bindMode)
			},
			clone : function() {
				return new this.constructor(this.geometry, this.material, this.skeleton.useVertexTexture).copy(this)
			}
		}), ye.prototype = Object.create(Q.prototype), ye.prototype.constructor = ye, ye.prototype.isLineBasicMaterial = !0, ye.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this
		}, xe.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : xe,
			isLine : !0,
			raycast : (function() {
				var t = new l,
					e = new st,
					n = new nt;
				return function(i, r) {
					var o = i.linePrecision,
						a = o * o,
						s = this.geometry,
						c = this.matrixWorld;
					if (null === s.boundingSphere && s.computeBoundingSphere(), n.copy(s.boundingSphere), n.applyMatrix4(c), !1 !== i.ray.intersectsSphere(n)) {
						t.getInverse(c), e.copy(i.ray).applyMatrix4(t);
						var u = new h,
							l = new h,
							d = new h,
							p = new h,
							f = this && this.isLineSegments ? 2 : 1;
						if (s.isBufferGeometry) {
							var m = s.index,
								v = s.attributes,
								g = v.position.array;
							if (null !== m)
								for (var y = m.array, x = 0, b = y.length - 1; x < b; x += f) {
									var _ = y[x],
										w = y[x + 1];
									u.fromArray(g, 3 * _), l.fromArray(g, 3 * w);var M = e.distanceSqToSegment(u, l, p, d);
									if (!(M > a)) {
										p.applyMatrix4(this.matrixWorld);
										var E = i.ray.origin.distanceTo(p);
										E < i.near || E > i.far || r.push({
											distance : E,
											point : d.clone().applyMatrix4(this.matrixWorld),
											index : x,
											face : null,
											faceIndex : null,
											object : this
										})
									}
							}
							else
								for (var x = 0, b = g.length / 3 - 1; x < b; x += f) {
									u.fromArray(g, 3 * x), l.fromArray(g, 3 * x + 3);var M = e.distanceSqToSegment(u, l, p, d);
									if (!(M > a)) {
										p.applyMatrix4(this.matrixWorld);
										var E = i.ray.origin.distanceTo(p);
										E < i.near || E > i.far || r.push({
											distance : E,
											point : d.clone().applyMatrix4(this.matrixWorld),
											index : x,
											face : null,
											faceIndex : null,
											object : this
										})
									}
							}
						} else if (s.isGeometry)
							for (var S = s.vertices, T = S.length, x = 0; x < T - 1; x += f) {
								var M = e.distanceSqToSegment(S[x], S[x + 1], p, d);
								if (!(M > a)) {
									p.applyMatrix4(this.matrixWorld);
									var E = i.ray.origin.distanceTo(p);
									E < i.near || E > i.far || r.push({
										distance : E,
										point : d.clone().applyMatrix4(this.matrixWorld),
										index : x,
										face : null,
										faceIndex : null,
										object : this
									})
								}
						}
					}
				}
			})(),
			clone : function() {
				return new this.constructor(this.geometry, this.material).copy(this)
			}
		}), be.prototype = Object.assign(Object.create(xe.prototype), {
			constructor : be,
			isLineSegments : !0
		}), _e.prototype = Object.create(Q.prototype), _e.prototype.constructor = _e, _e.prototype.isPointsMaterial = !0, _e.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this
		}, we.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : we,
			isPoints : !0,
			raycast : (function() {
				var t = new l,
					e = new st,
					n = new nt;
				return function(i, r) {
					function o(t, n) {
						var o = e.distanceSqToPoint(t);
						if (o < l * l) {
							var s = e.closestPointToPoint(t);
							s.applyMatrix4(c);
							var u = i.ray.origin.distanceTo(s);
							if (u < i.near || u > i.far) return;
							r.push({
								distance : u,
								distanceToRay : Math.sqrt(o),
								point : s.clone(),
								index : n,
								face : null,
								object : a
							})
						}
					}
					var a = this,
						s = this.geometry,
						c = this.matrixWorld,
						u = i.params.Points.threshold;
					if (null === s.boundingSphere && s.computeBoundingSphere(), n.copy(s.boundingSphere), n.applyMatrix4(c), !1 !== i.ray.intersectsSphere(n)) {
						t.getInverse(c), e.copy(i.ray).applyMatrix4(t);
						var l = u / ((this.scale.x + this.scale.y + this.scale.z) / 3),
							d = new h;
						if (s.isBufferGeometry) {
							var p = s.index,
								f = s.attributes,
								m = f.position.array;
							if (null !== p)
								for (var v = p.array, g = 0, y = v.length; g < y; g++) {
									var x = v[g];
									d.fromArray(m, 3 * x), o(d, x)
							}
							else
								for (var g = 0, b = m.length / 3; g < b; g++) d.fromArray(m, 3 * g), o(d, g)
						} else
							for (var _ = s.vertices, g = 0, b = _.length; g < b; g++) o(_[g], g)
					}
				}
			})(),
			clone : function() {
				return new this.constructor(this.geometry, this.material).copy(this)
			}
		}), Me.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : Me
		}), Ee.prototype = Object.create(o.prototype), Ee.prototype.constructor = Ee, Se.prototype = Object.create(o.prototype), Se.prototype.constructor = Se, Se.prototype.isCompressedTexture = !0, Te.prototype = Object.create(o.prototype), Te.prototype.constructor = Te, Ae.prototype = Object.create(o.prototype), Ae.prototype.constructor = Ae, Ae.prototype.isDepthTexture = !0, Pe.prototype = Object.create(Pt.prototype), Pe.prototype.constructor = Pe, Le.prototype = Object.create(Pt.prototype), Le.prototype.constructor = Le, Re.prototype = Object.create(Tt.prototype), Re.prototype.constructor = Re, Ce.prototype = Object.create(Pt.prototype), Ce.prototype.constructor = Ce, Ie.prototype = Object.create(Ce.prototype), Ie.prototype.constructor = Ie, Oe.prototype = Object.create(Tt.prototype), Oe.prototype.constructor = Oe, Ue.prototype = Object.create(Ce.prototype), Ue.prototype.constructor = Ue, De.prototype = Object.create(Tt.prototype), De.prototype.constructor = De, Be.prototype = Object.create(Ce.prototype), Be.prototype.constructor = Be, Ne.prototype = Object.create(Tt.prototype), Ne.prototype.constructor = Ne, Fe.prototype = Object.create(Ce.prototype), Fe.prototype.constructor = Fe, ze.prototype = Object.create(Tt.prototype), ze.prototype.constructor = ze, Ge.prototype = Object.create(Tt.prototype), Ge.prototype.constructor = Ge, ke.prototype = Object.create(Pt.prototype), ke.prototype.constructor = ke, He.prototype = Object.create(Tt.prototype), He.prototype.constructor = He, je.prototype = Object.create(Pt.prototype), je.prototype.constructor = je, Ve.prototype = Object.create(Tt.prototype), Ve.prototype.constructor = Ve, We.prototype = Object.create(Pt.prototype), We.prototype.constructor = We, Xe.prototype = Object.create(Tt.prototype), Xe.prototype.constructor = Xe;
		var hs = {
			area : function(t) {
				for (var e = t.length, n = 0, i = e - 1, r = 0; r < e; i = r++) n += t[i].x * t[r].y - t[r].x * t[i].y;
				return .5 * n
			},
			triangulate : (function() {
				function t(t, e, n, i, r, o) {
					var a,
						s,
						c,
						u,
						h,
						l,
						d,
						p,
						f;
					if (s = t[o[e]].x, c = t[o[e]].y, u = t[o[n]].x, h = t[o[n]].y, l = t[o[i]].x, d = t[o[i]].y, 0 >= (u - s) * (d - c) - (h - c) * (l - s)) return !1;
					var m,
						v,
						g,
						y,
						x,
						b,
						_,
						w,
						M,
						E,
						S,
						T,
						A,
						P,
						L;
					for (m = l - u, v = d - h, g = s - l, y = c - d, x = u - s, b = h - c, a = 0; a < r; a++)
						if (p = t[o[a]].x, f = t[o[a]].y, (p != s || f != c) && (p != u || f != h) && (p != l || f != d) && (_ = p - s, w = f - c, M = p - u, E = f - h, S = p - l, T = f - d, L = m * E - v * M, A = x * w - b * _, P = g * T - y * S, L >= -Number.EPSILON && P >= -Number.EPSILON && A >= -Number.EPSILON)) return !1;
					return !0
				}
				return function(e, n) {
					var i = e.length;
					if (3 > i) return null;
					var r,
						o,
						a,
						s = [],
						c = [],
						u = [];
					if (0 < hs.area(e))
						for (o = 0; o < i; o++) c[o] = o;
					else
						for (o = 0; o < i; o++) c[o] = i - 1 - o;
					var h = i,
						l = 2 * h;
					for (o = h - 1; 2 < h;) {
						if (0 >= l--) return console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"), n ? u : s;
						if (r = o, h <= r && (r = 0), o = r + 1, h <= o && (o = 0), a = o + 1, h <= a && (a = 0), t(e, r, o, a, h, c)) {
							var d,
								p,
								f,
								m,
								v;
							for (d = c[r], p = c[o], f = c[a], s.push([ e[d], e[p], e[f] ]), u.push([ c[r], c[o], c[a] ]), m = o, v = o + 1; v < h; m++, v++) c[m] = c[v];
							h--, l = 2 * h
						}
					}
					return n ? u : s
				}
			})(),
			triangulateShape : function(t, e) {
				function n(t) {
					var e = t.length;
					2 < e && t[e - 1].equals(t[0]) && t.pop()
				}
				function i(t, e, n) {
					return t.x !== e.x ? t.x < e.x ? t.x <= n.x && n.x <= e.x : e.x <= n.x && n.x <= t.x : t.y < e.y ? t.y <= n.y && n.y <= e.y : e.y <= n.y && n.y <= t.y
				}
				function r(t, e, n, r, o) {
					var a = e.x - t.x,
						s = e.y - t.y,
						c = r.x - n.x,
						u = r.y - n.y,
						h = t.x - n.x,
						l = t.y - n.y,
						d = s * c - a * u,
						p = s * h - a * l;
					if (Math.abs(d) > Number.EPSILON) {
						var f;
						if (0 < d) {
							if (0 > p || p > d) return [];
							if (f = u * h - c * l, 0 > f || f > d) return []
						} else {
							if (0 < p || p < d) return [];
							if (f = u * h - c * l, 0 < f || f < d) return []
						}
						if (0 === f) return !o || 0 != p && p != d ? [ t ] : [];
						if (f === d) return !o || 0 != p && p != d ? [ e ] : [];
						if (0 == p) return [ n ];
						if (p == d) return [ r ];
						var m = f / d;
						return [ {
							x : t.x + m * a,
							y : t.y + m * s
						} ]
					}
					if (0 != p || u * h != c * l) return [];
					var v = 0 == a && 0 == s,
						g = 0 == c && 0 == u;
					if (v && g) return t.x !== n.x || t.y !== n.y ? [] : [ t ];
					if (v) return i(n, r, t) ? [ t ] : [];
					if (g) return i(t, e, n) ? [ n ] : [];
					var y,
						x,
						b,
						_,
						w,
						M,
						E,
						S;
					return 0 == a ? (t.y < e.y ? (y = t, b = t.y, x = e, _ = e.y) : (y = e, b = e.y, x = t, _ = t.y), n.y < r.y ? (w = n, E = n.y, M = r, S = r.y) : (w = r, E = r.y, M = n, S = n.y)) : (t.x < e.x ? (y = t, b = t.x, x = e, _ = e.x) : (y = e, b = e.x, x = t, _ = t.x), n.x < r.x ? (w = n, E = n.x, M = r, S = r.x) : (w = r, E = r.x, M = n, S = n.x)), b <= E ? _ < E ? [] : _ == E ? o ? [] : [ w ] : _ <= S ? [ w, x ] : [ w, M ] : b > S ? [] : b == S ? o ? [] : [ y ] : _ <= S ? [ y, x ] : [ y, M ]
				}
				function o(t, e, n, i) {
					var r = e.x - t.x,
						o = e.y - t.y,
						a = n.x - t.x,
						s = n.y - t.y,
						c = i.x - t.x,
						u = i.y - t.y,
						h = r * s - o * a,
						l = r * u - o * c;
					if (Math.abs(h) > Number.EPSILON) {
						var d = c * s - u * a;
						return 0 < h ? 0 <= l && 0 <= d : 0 <= l || 0 <= d
					}
					return 0 < l
				}
				n(t), e.forEach(n);
				for (var a, s, c, u, h, l, d = {}, p = t.concat(), f = 0, m = e.length; f < m; f++) Array.prototype.push.apply(p, e[f]);
				for (a = 0, s = p.length; a < s; a++) h = p[a].x + ":" + p[a].y, void 0 !== d[h] && console.warn("THREE.ShapeUtils: Duplicate point", h, a), d[h] = a;
				var v = (function(t, e) {
						function n(t, e) {
							var n = y.length - 1,
								i = t - 1;
							0 > i && (i = n);var r = t + 1;
							r > n && (r = 0);var a = o(y[t], y[i], y[r], s[e]);
							if (!a) return !1;
							var c = s.length - 1,
								u = e - 1;
							0 > u && (u = c);var h = e + 1;
							return h > c && (h = 0), a = o(s[e], s[u], s[h], y[t]), !!a
						}
						function i(t, e) {
							var n,
								i,
								o;
							for (n = 0; n < y.length; n++)
								if (i = n + 1, i %= y.length, o = r(t, e, y[n], y[i], !0), 0 < o.length) return !0;
							return !1
						}
						function a(t, n) {
							var i,
								o,
								a,
								s,
								c;
							for (i = 0; i < x.length; i++)
								for (o = e[x[i]], a = 0; a < o.length; a++)
									if (s = a + 1, s %= o.length, c = r(t, n, o[a], o[s], !0), 0 < c.length) return !0;
							return !1
						}
						for (var s, c, u, h, l, d, p, f, m, v, g, y = t.concat(), x = [], b = [], _ = 0, w = e.length; _ < w; _++) x.push(_);
						for (var M = 0, E = 2 * x.length; 0 < x.length;) {
							if (E--, 0 > E) {
								console.log("Infinite Loop! Holes left:" + x.length + ", Probably Hole outside Shape!");break
							}
							for (u = M; u < y.length; u++) {
								h = y[u], c = -1;
								for (var _ = 0; _ < x.length; _++)
									if (d = x[_], p = h.x + ":" + h.y + ":" + d, void 0 === b[p]) {
										s = e[d];
										for (var S = 0; S < s.length; S++)
											if (l = s[S], n(u, S) && !i(h, l) && !a(h, l)) {
												c = S, x.splice(_, 1), f = y.slice(0, u + 1), m = y.slice(u), v = s.slice(c), g = s.slice(0, c + 1), y = f.concat(v).concat(g).concat(m), M = u;break
										}
										if (0 <= c) break;
										b[p] = !0
								}
								if (0 <= c) break
							}
						}
						return y
					})(t, e),
					g = hs.triangulate(v, !1);
				for (a = 0, s = g.length; a < s; a++)
					for (u = g[a], c = 0; 3 > c; c++) h = u[c].x + ":" + u[c].y, l = d[h], void 0 != l && (u[c] = l);
				return g.concat()
			},
			isClockWise : function(t) {
				return 0 > hs.area(t)
			},
			b2 : (function() {
				function t(t, e) {
					var n = 1 - t;
					return n * n * e
				}
				function e(t, e) {
					return 2 * (1 - t) * t * e
				}
				function n(t, e) {
					return t * t * e
				}
				return function(i, r, o, a) {
					return t(i, r) + e(i, o) + n(i, a)
				}
			})(),
			b3 : (function() {
				function t(t, e) {
					var n = 1 - t;
					return n * n * n * e
				}
				function e(t, e) {
					var n = 1 - t;
					return 3 * n * n * t * e
				}
				function n(t, e) {
					return 3 * (1 - t) * t * t * e
				}
				function i(t, e) {
					return t * t * t * e
				}
				return function(r, o, a, s, c) {
					return t(r, o) + e(r, a) + n(r, s) + i(r, c)
				}
			})()
		};
		qe.prototype = Object.create(Tt.prototype), qe.prototype.constructor = qe, qe.prototype.addShapeList = function(t, e) {
			for (var n = t.length, i = 0; i < n; i++) {
				var r = t[i];
				this.addShape(r, e)
			}
		}, qe.prototype.addShape = function(t, e) {
			function n(t, e, n) {
				return e || console.error("THREE.ExtrudeGeometry: vec does not exist"), e.clone().multiplyScalar(n).add(t)
			}
			function i(t, e, n) {
				var i,
					o,
					a = 1,
					s = t.x - e.x,
					c = t.y - e.y,
					u = n.x - t.x,
					h = n.y - t.y,
					l = s * s + c * c;
				if (Math.abs(s * h - c * u) > Number.EPSILON) {
					var d = Math.sqrt(l),
						p = Math.sqrt(u * u + h * h),
						f = e.x - c / d,
						m = e.y + s / d,
						v = n.x - h / p,
						g = n.y + u / p,
						y = ((v - f) * h - (g - m) * u) / (s * h - c * u);
					i = f + s * y - t.x, o = m + c * y - t.y;
					var x = i * i + o * o;
					if (2 >= x) return new r(i, o);
					a = Math.sqrt(x / 2)
				} else {
					var b = !1;
					s > Number.EPSILON ? u > Number.EPSILON && (b = !0) : s < -Number.EPSILON ? u < -Number.EPSILON && (b = !0) : Math.sign(c) === Math.sign(h) && (b = !0), b ? (i = -c, o = s, a = Math.sqrt(l)) : (i = s, o = c, a = Math.sqrt(l / 2))
				}
				return new r(i / a, o / a)
			}
			function o(t, e) {
				var n,
					i;
				for (W = t.length; 0 <= --W;) {
					n = W, i = W - 1, 0 > i && (i = t.length - 1);var r = 0,
						o = _ + 2 * y;
					for (r = 0; r < o; r++) {
						var a = H * r,
							s = H * (r + 1),
							u = e + n + a,
							h = e + i + a,
							l = e + i + s,
							d = e + n + s;
						c(u, h, l, d, t, r, o, n, i)
					}
				}
			}
			function a(t, e, n) {
				P.vertices.push(new h(t, e, n))
			}
			function s(t, e, n) {
				t += L, e += L, n += L, P.faces.push(new pt(t, e, n, null, null, 0));var i = E.generateTopUV(P, t, e, n);
				P.faceVertexUvs[0].push(i)
			}
			function c(t, e, n, i) {
				t += L, e += L, n += L, i += L, P.faces.push(new pt(t, e, i, null, null, 1)), P.faces.push(new pt(e, n, i, null, null, 1));var r = E.generateSideWallUV(P, t, e, n, i);
				P.faceVertexUvs[0].push([ r[0], r[1], r[3] ]), P.faceVertexUvs[0].push([ r[1], r[2], r[3] ])
			}
			var u,
				l,
				d,
				p,
				f,
				m = void 0 === e.amount ? 100 : e.amount,
				v = void 0 === e.bevelThickness ? 6 : e.bevelThickness,
				g = void 0 === e.bevelSize ? v - 2 : e.bevelSize,
				y = void 0 === e.bevelSegments ? 3 : e.bevelSegments,
				x = !(void 0 !== e.bevelEnabled) || e.bevelEnabled,
				b = void 0 === e.curveSegments ? 12 : e.curveSegments,
				_ = void 0 === e.steps ? 1 : e.steps,
				w = e.extrudePath,
				M = !1,
				E = void 0 === e.UVGenerator ? qe.WorldUVGenerator : e.UVGenerator;
			w && (u = w.getSpacedPoints(_), M = !0, x = !1, l = void 0 === e.frames ? w.computeFrenetFrames(_, !1) : e.frames, d = new h, p = new h, f = new h), x || (y = 0, v = 0, g = 0);
			var S,
				T,
				A,
				P = this,
				L = this.vertices.length,
				R = t.extractPoints(b),
				C = R.shape,
				I = R.holes,
				O = !hs.isClockWise(C);
			if (O) {
				for (C = C.reverse(), T = 0, A = I.length; T < A; T++) S = I[T], hs.isClockWise(S) && (I[T] = S.reverse());
				O = !1
			}
			var U = hs.triangulateShape(C, I),
				D = C;
			for (T = 0, A = I.length; T < A; T++) S = I[T], C = C.concat(S);
			for (var B, N, F, z, G, k, H = C.length, j = U.length, V = [], W = 0, X = D.length, q = X - 1, Y = W + 1; W < X; W++, q++, Y++) q === X && (q = 0), Y === X && (Y = 0), V[W] = i(D[W], D[q], D[Y]);
			var Z,
				J = [],
				K = V.concat();
			for (T = 0, A = I.length; T < A; T++) {
				for (S = I[T], Z = [], W = 0, X = S.length, q = X - 1, Y = W + 1; W < X; W++, q++, Y++) q === X && (q = 0), Y === X && (Y = 0), Z[W] = i(S[W], S[q], S[Y]);
				J.push(Z), K = K.concat(Z)
			}
			for (B = 0; B < y; B++) {
				for (F = B / y, z = v * Math.cos(F * Math.PI / 2), N = g * Math.sin(F * Math.PI / 2), W = 0, X = D.length; W < X; W++) G = n(D[W], V[W], N), a(G.x, G.y, -z);
				for (T = 0, A = I.length; T < A; T++)
					for (S = I[T], Z = J[T], W = 0, X = S.length; W < X; W++) G = n(S[W], Z[W], N), a(G.x, G.y, -z)
			}
			for (N = g, W = 0; W < H; W++) G = x ? n(C[W], K[W], N) : C[W], M ? (p.copy(l.normals[0]).multiplyScalar(G.x), d.copy(l.binormals[0]).multiplyScalar(G.y), f.copy(u[0]).add(p).add(d), a(f.x, f.y, f.z)) : a(G.x, G.y, 0);
			var Q;
			for (Q = 1; Q <= _; Q++)
				for (W = 0; W < H; W++) G = x ? n(C[W], K[W], N) : C[W], M ? (p.copy(l.normals[Q]).multiplyScalar(G.x), d.copy(l.binormals[Q]).multiplyScalar(G.y), f.copy(u[Q]).add(p).add(d), a(f.x, f.y, f.z)) : a(G.x, G.y, m / _ * Q);
			for (B = y - 1; 0 <= B; B--) {
				for (F = B / y, z = v * Math.cos(F * Math.PI / 2), N = g * Math.sin(F * Math.PI / 2), W = 0, X = D.length; W < X; W++) G = n(D[W], V[W], N), a(G.x, G.y, m + z);
				for (T = 0, A = I.length; T < A; T++)
					for (S = I[T], Z = J[T], W = 0, X = S.length; W < X; W++) G = n(S[W], Z[W], N), M ? a(G.x, G.y + u[_ - 1].y, u[_ - 1].x + z) : a(G.x, G.y, m + z)
			}
			!(function() {
				if (x) {
					var t = 0,
						e = H * t;
					for (W = 0; W < j; W++) k = U[W], s(k[2] + e, k[1] + e, k[0] + e);
					for (t = _ + 2 * y, e = H * t, W = 0; W < j; W++) k = U[W], s(k[0] + e, k[1] + e, k[2] + e)
				} else {
					for (W = 0; W < j; W++) k = U[W], s(k[2], k[1], k[0]);
					for (W = 0; W < j; W++) k = U[W], s(k[0] + H * _, k[1] + H * _, k[2] + H * _)
				}
			})(), (function() {
				var t = 0;
				for (o(D, t), t += D.length, T = 0, A = I.length; T < A; T++) S = I[T], o(S, t), t += S.length
			})()
		}, qe.WorldUVGenerator = {
			generateTopUV : function(t, e, n, i) {
				var o = t.vertices,
					a = o[e],
					s = o[n],
					c = o[i];
				return [ new r(a.x, a.y), new r(s.x, s.y), new r(c.x, c.y) ]
			},
			generateSideWallUV : function(t, e, n, i, o) {
				var a = t.vertices,
					s = a[e],
					c = a[n],
					u = a[i],
					h = a[o];
				return .01 > Math.abs(s.y - c.y) ? [ new r(s.x, 1 - s.z), new r(c.x, 1 - c.z), new r(u.x, 1 - u.z), new r(h.x, 1 - h.z) ] : [ new r(s.y, 1 - s.z), new r(c.y, 1 - c.z), new r(u.y, 1 - u.z), new r(h.y, 1 - h.z) ]
			}
		}, Ye.prototype = Object.create(qe.prototype), Ye.prototype.constructor = Ye, Ze.prototype = Object.create(Pt.prototype), Ze.prototype.constructor = Ze, Je.prototype = Object.create(Tt.prototype), Je.prototype.constructor = Je, Ke.prototype = Object.create(Pt.prototype), Ke.prototype.constructor = Ke, Qe.prototype = Object.create(Tt.prototype), Qe.prototype.constructor = Qe, $e.prototype = Object.create(Tt.prototype), $e.prototype.constructor = $e, tn.prototype = Object.create(Pt.prototype), tn.prototype.constructor = tn, en.prototype = Object.create(Tt.prototype), en.prototype.constructor = en, nn.prototype = Object.create(Pt.prototype), nn.prototype.constructor = nn, rn.prototype = Object.create(Tt.prototype), rn.prototype.constructor = rn, on.prototype = Object.create(Pt.prototype), on.prototype.constructor = on, an.prototype = Object.create(Pt.prototype), an.prototype.constructor = an, sn.prototype = Object.create(Tt.prototype), sn.prototype.constructor = sn, cn.prototype = Object.create(sn.prototype), cn.prototype.constructor = cn, un.prototype = Object.create(an.prototype), un.prototype.constructor = un, hn.prototype = Object.create(Pt.prototype), hn.prototype.constructor = hn, ln.prototype = Object.create(Tt.prototype), ln.prototype.constructor = ln, dn.prototype = Object.create(Tt.prototype), dn.prototype.constructor = dn;
		var ls = Object.freeze({
			WireframeGeometry : Pe,
			ParametricGeometry : Re,
			ParametricBufferGeometry : Le,
			TetrahedronGeometry : Oe,
			TetrahedronBufferGeometry : Ie,
			OctahedronGeometry : De,
			OctahedronBufferGeometry : Ue,
			IcosahedronGeometry : Ne,
			IcosahedronBufferGeometry : Be,
			DodecahedronGeometry : ze,
			DodecahedronBufferGeometry : Fe,
			PolyhedronGeometry : Ge,
			PolyhedronBufferGeometry : Ce,
			TubeGeometry : He,
			TubeBufferGeometry : ke,
			TorusKnotGeometry : Ve,
			TorusKnotBufferGeometry : je,
			TorusGeometry : Xe,
			TorusBufferGeometry : We,
			TextGeometry : Ye,
			SphereBufferGeometry : Ze,
			SphereGeometry : Je,
			RingGeometry : Qe,
			RingBufferGeometry : Ke,
			PlaneBufferGeometry : Ct,
			PlaneGeometry : $e,
			LatheGeometry : en,
			LatheBufferGeometry : tn,
			ShapeGeometry : rn,
			ShapeBufferGeometry : nn,
			ExtrudeGeometry : qe,
			EdgesGeometry : on,
			ConeGeometry : cn,
			ConeBufferGeometry : un,
			CylinderGeometry : sn,
			CylinderBufferGeometry : an,
			CircleBufferGeometry : hn,
			CircleGeometry : ln,
			BoxBufferGeometry : Rt,
			BoxGeometry : dn
		});
		pn.prototype = Object.create($.prototype), pn.prototype.constructor = pn, pn.prototype.isShadowMaterial = !0, fn.prototype = Object.create($.prototype), fn.prototype.constructor = fn, fn.prototype.isRawShaderMaterial = !0, mn.prototype = {
			constructor : mn,
			isMultiMaterial : !0,
			toJSON : function(t) {
				for (var e = {
							metadata : {
								version : 4.2,
								type : "material",
								generator : "MaterialExporter"
							},
							uuid : this.uuid,
							type : this.type,
							materials : []
						}, n = this.materials, i = 0, r = n.length; i < r; i++) {
					var o = n[i].toJSON(t);
					delete o.metadata
					, e.materials.push(o)
				}
				return e.visible = this.visible, e
			},
			clone : function() {
				for (var t = new this.constructor, e = 0; e < this.materials.length; e++) t.materials.push(this.materials[e].clone());
				return t.visible = this.visible, t
			}
		}, vn.prototype = Object.create(Q.prototype), vn.prototype.constructor = vn, vn.prototype.isMeshStandardMaterial = !0, vn.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.defines = {
					STANDARD : ""
				}, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
		}, gn.prototype = Object.create(vn.prototype), gn.prototype.constructor = gn, gn.prototype.isMeshPhysicalMaterial = !0, gn.prototype.copy = function(t) {
			return vn.prototype.copy.call(this, t), this.defines = {
					PHYSICAL : ""
				}, this.reflectivity = t.reflectivity, this.clearCoat = t.clearCoat, this.clearCoatRoughness = t.clearCoatRoughness, this
		}, yn.prototype = Object.create(Q.prototype), yn.prototype.constructor = yn, yn.prototype.isMeshPhongMaterial = !0, yn.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
		}, xn.prototype = Object.create(yn.prototype), xn.prototype.constructor = xn, xn.prototype.isMeshToonMaterial = !0, xn.prototype.copy = function(t) {
			return yn.prototype.copy.call(this, t), this.gradientMap = t.gradientMap, this
		}, bn.prototype = Object.create(Q.prototype), bn.prototype.constructor = bn, bn.prototype.isMeshNormalMaterial = !0, bn.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
		}, _n.prototype = Object.create(Q.prototype), _n.prototype.constructor = _n, _n.prototype.isMeshLambertMaterial = !0, _n.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.skinning = t.skinning, this.morphTargets = t.morphTargets, this.morphNormals = t.morphNormals, this
		}, wn.prototype = Object.create(Q.prototype), wn.prototype.constructor = wn, wn.prototype.isLineDashedMaterial = !0, wn.prototype.copy = function(t) {
			return Q.prototype.copy.call(this, t), this.color.copy(t.color), this.linewidth = t.linewidth, this.scale = t.scale, this.dashSize = t.dashSize, this.gapSize = t.gapSize, this
		};
		var ds = Object.freeze({
				ShadowMaterial : pn,
				SpriteMaterial : de,
				RawShaderMaterial : fn,
				ShaderMaterial : $,
				PointsMaterial : _e,
				MultiMaterial : mn,
				MeshPhysicalMaterial : gn,
				MeshStandardMaterial : vn,
				MeshPhongMaterial : yn,
				MeshToonMaterial : xn,
				MeshNormalMaterial : bn,
				MeshLambertMaterial : _n,
				MeshDepthMaterial : tt,
				MeshBasicMaterial : ft,
				LineDashedMaterial : wn,
				LineBasicMaterial : ye,
				Material : Q
			}),
			ps = {
				enabled : !1,
				files : {},
				add : function(t, e) {
					!1 === this.enabled || (this.files[t] = e)
				},
				get : function(t) {
					if (!1 !== this.enabled) return this.files[t]
				},
				remove : function(t) {
					delete this.files[t]
				},
				clear : function() {
					this.files = {}
				}
			},
			fs = new Mn;
		Object.assign(En.prototype, {
			load : function(t, e, n, i) {
				void 0 === t && (t = ""), void 0 !== this.path && (t = this.path + t);
				var r = this,
					o = ps.get(t);
				if (void 0 !== o) return r.manager.itemStart(t), setTimeout((function() {
							e && e(o), r.manager.itemEnd(t)
						}), 0), o;
				var a = /^data:(.*?)(;base64)?,(.*)$/,
					s = t.match(a);
				if (s) {
					var c = s[1],
						u = !!s[2],
						h = s[3];
					h = window.decodeURIComponent(h), u && (h = window.atob(h));try {
						var l,
							d = (this.responseType || "").toLowerCase();
						switch (d) {
						case "arraybuffer":
						case "blob":
							l = new ArrayBuffer(h.length);
							for (var p = new Uint8Array(l), f = 0; f < h.length; f++) p[f] = h.charCodeAt(f);
							"blob" === d && (l = new Blob([ l ], {
								type : c
							}));
							break;case "document":
							var m = new DOMParser;
							l = m.parseFromString(h, c);
							break;case "json":
							l = JSON.parse(h);
							break;default:
							l = h
						}
						window.setTimeout((function() {
							e && e(l), r.manager.itemEnd(t)
						}), 0)
					} catch (e) {
						window.setTimeout((function() {
							i && i(e), r.manager.itemError(t)
						}), 0)
					}
				} else {
					var v = new XMLHttpRequest;
					v.open("GET", t, !0), v.addEventListener("load", (function(n) {
						var o = n.target.response;
						ps.add(t, o), 200 === this.status ? (e && e(o), r.manager.itemEnd(t)) : 0 === this.status ? (console.warn("THREE.FileLoader: HTTP Status 0 received."), e && e(o), r.manager.itemEnd(t)) : (i && i(n), r.manager.itemError(t))
					}), !1), void 0 !== n && v.addEventListener("progress", (function(t) {
						n(t)
					}), !1), v.addEventListener("error", (function(e) {
						i && i(e), r.manager.itemError(t)
					}), !1), void 0 !== this.responseType && (v.responseType = this.responseType), void 0 !== this.withCredentials && (v.withCredentials = this.withCredentials), v.overrideMimeType && v.overrideMimeType(void 0 === this.mimeType ? "text/plain" : this.mimeType), v.send(null)
				}
				return r.manager.itemStart(t), v
			},
			setPath : function(t) {
				return this.path = t, this
			},
			setResponseType : function(t) {
				return this.responseType = t, this
			},
			setWithCredentials : function(t) {
				return this.withCredentials = t, this
			},
			setMimeType : function(t) {
				return this.mimeType = t, this
			}
		}), Object.assign(Sn.prototype, {
			load : function(t, e, n, i) {
				function r(r) {
					c.load(t[r], (function(t) {
						var n = o._parser(t, !0);
						a[r] = {
							width : n.width,
							height : n.height,
							format : n.format,
							mipmaps : n.mipmaps
						}, u += 1, 6 === u && (1 === n.mipmapCount && (s.minFilter = Zo), s.format = n.format, s.needsUpdate = !0, e && e(s))
					}), n, i)
				}
				var o = this,
					a = [],
					s = new Se;
				s.image = a;
				var c = new En(this.manager);
				if (c.setPath(this.path), c.setResponseType("arraybuffer"), Array.isArray(t))
					for (var u = 0, h = 0, l = t.length; h < l; ++h) r(h);
				else c.load(t, (function(t) {
						var n = o._parser(t, !0);
						if (n.isCubemap)
							for (var i = n.mipmaps.length / n.mipmapCount, r = 0; r < i; r++) {
								a[r] = {
									mipmaps : []
								};
								for (var c = 0; c < n.mipmapCount; c++) a[r].mipmaps.push(n.mipmaps[r * n.mipmapCount + c]), a[r].format = n.format, a[r].width = n.width, a[r].height = n.height
						}
						else s.image.width = n.width, s.image.height = n.height, s.mipmaps = n.mipmaps;
						1 === n.mipmapCount && (s.minFilter = Zo), s.format = n.format, s.needsUpdate = !0, e && e(s)
					}), n, i);
				return s
			},
			setPath : function(t) {
				return this.path = t, this
			}
		}), Object.assign(Tn.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = new Y,
					a = new En(this.manager);
				return a.setResponseType("arraybuffer"), a.load(t, (function(t) {
						var n = r._parser(t);
						n && (void 0 === n.image ? void 0 !== n.data && (o.image.width = n.width, o.image.height = n.height, o.image.data = n.data) : o.image = n.image, o.wrapS = void 0 === n.wrapS ? jo : n.wrapS, o.wrapT = void 0 === n.wrapT ? jo : n.wrapT, o.magFilter = void 0 === n.magFilter ? Zo : n.magFilter, o.minFilter = void 0 === n.minFilter ? Ko : n.minFilter, o.anisotropy = void 0 === n.anisotropy ? 1 : n.anisotropy, void 0 !== n.format && (o.format = n.format), void 0 !== n.type && (o.type = n.type), void 0 !== n.mipmaps && (o.mipmaps = n.mipmaps), 1 === n.mipmapCount && (o.minFilter = Zo), o.needsUpdate = !0, e && e(o, n))
					}), n, i), o
			}
		}), Object.assign(An.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
				if (o.onload = function() {
						o.onload = null, URL.revokeObjectURL(o.src), e && e(o), r.manager.itemEnd(t)
					}, o.onerror = i, 0 === t.indexOf("data:"))
					o.src = t;
				else if (void 0 !== this.crossOrigin) o.crossOrigin = this.crossOrigin, o.src = t;else {
					var a = new En;
					a.setPath(this.path), a.setResponseType("blob"), a.setWithCredentials(this.withCredentials), a.load(t, (function(t) {
						o.src = URL.createObjectURL(t)
					}), n, i)
				}
				return r.manager.itemStart(t), o
			},
			setCrossOrigin : function(t) {
				return this.crossOrigin = t, this
			},
			setWithCredentials : function(t) {
				return this.withCredentials = t, this
			},
			setPath : function(t) {
				return this.path = t, this
			}
		}), Object.assign(Pn.prototype, {
			load : function(t, e, n, i) {
				function r(n) {
					a.load(t[n], (function(t) {
						o.images[n] = t, s++, 6 === s && (o.needsUpdate = !0, e && e(o))
					}), void 0, i)
				}
				var o = new d,
					a = new An(this.manager);
				a.setCrossOrigin(this.crossOrigin), a.setPath(this.path);
				for (var s = 0, c = 0; c < t.length; ++c) r(c);
				return o
			},
			setCrossOrigin : function(t) {
				return this.crossOrigin = t, this
			},
			setPath : function(t) {
				return this.path = t, this
			}
		}), Object.assign(Ln.prototype, {
			load : function(t, e, n, i) {
				var r = new o,
					a = new An(this.manager);
				return a.setCrossOrigin(this.crossOrigin), a.setWithCredentials(this.withCredentials), a.setPath(this.path), a.load(t, (function(n) {
						var i = 0 < t.search(/\.(jpg|jpeg)$/) || 0 === t.search(/^data\:image\/jpeg/);
						r.format = i ? da : pa, r.image = n, r.needsUpdate = !0, void 0 !== e && e(r)
					}), n, i), r
			},
			setCrossOrigin : function(t) {
				return this.crossOrigin = t, this
			},
			setWithCredentials : function(t) {
				return this.withCredentials = t, this
			},
			setPath : function(t) {
				return this.path = t, this
			}
		}), Rn.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : Rn,
			isLight : !0,
			copy : function(t) {
				return ht.prototype.copy.call(this, t), this.color.copy(t.color), this.intensity = t.intensity, this
			},
			toJSON : function(t) {
				var e = ht.prototype.toJSON.call(this, t);
				return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, void 0 !== this.groundColor && (e.object.groundColor = this.groundColor.getHex()), void 0 !== this.distance && (e.object.distance = this.distance), void 0 !== this.angle && (e.object.angle = this.angle), void 0 !== this.decay && (e.object.decay = this.decay), void 0 !== this.penumbra && (e.object.penumbra = this.penumbra), void 0 !== this.shadow && (e.object.shadow = this.shadow.toJSON()), e
			}
		}), Cn.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : Cn,
			isHemisphereLight : !0,
			copy : function(t) {
				return Rn.prototype.copy.call(this, t), this.groundColor.copy(t.groundColor), this
			}
		}), Object.assign(In.prototype, {
			copy : function(t) {
				return this.camera = t.camera.clone(), this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			toJSON : function() {
				var t = {};
				return 0 !== this.bias && (t.bias = this.bias), 1 !== this.radius && (t.radius = this.radius), (512 !== this.mapSize.x || 512 !== this.mapSize.y) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object,
					delete t.camera.matrix
					, t
			}
		}), On.prototype = Object.assign(Object.create(In.prototype), {
			constructor : On,
			isSpotLightShadow : !0,
			update : function(t) {
				var e = 2 * Ya.RAD2DEG * t.angle,
					n = this.mapSize.width / this.mapSize.height,
					i = t.distance || 500,
					r = this.camera;
				(e !== r.fov || n !== r.aspect || i !== r.far) && (r.fov = e, r.aspect = n, r.far = i, r.updateProjectionMatrix())
			}
		}), Un.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : Un,
			isSpotLight : !0,
			copy : function(t) {
				return Rn.prototype.copy.call(this, t), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
			}
		}), Dn.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : Dn,
			isPointLight : !0,
			copy : function(t) {
				return Rn.prototype.copy.call(this, t), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this
			}
		}), Bn.prototype = Object.assign(Object.create(In.prototype), {
			constructor : Bn
		}), Nn.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : Nn,
			isDirectionalLight : !0,
			copy : function(t) {
				return Rn.prototype.copy.call(this, t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this
			}
		}), Fn.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : Fn,
			isAmbientLight : !0
		});
		var ms = {
			arraySlice : function(t, e, n) {
				return ms.isTypedArray(t) ? new t.constructor(t.subarray(e, n)) : t.slice(e, n);
			},
			convertArray : function(t, e, n) {
				return t && (n || t.constructor !== e) ? "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t) : t
			},
			isTypedArray : function(t) {
				return ArrayBuffer.isView(t) && !(t instanceof DataView)
			},
			getKeyframeOrder : function(t) {
				for (var e = t.length, n = Array(e), i = 0; i !== e; ++i) n[i] = i;
				return n.sort((function(e, n) {
						return t[e] - t[n]
					})), n
			},
			sortedArray : function(t, e, n) {
				for (var i = t.length, r = new t.constructor(i), o = 0, a = 0; a !== i; ++o)
					for (var s = n[o] * e, c = 0; c !== e; ++c) r[a++] = t[s + c];
				return r
			},
			flattenJSON : function(t, e, n, i) {
				for (var r = 1, o = t[0]; void 0 !== o && void 0 === o[i];) o = t[r++];
				if (void 0 !== o) {
					var a = o[i];
					if (void 0 !== a)
						if (Array.isArray(a)) {
							do a = o[i], void 0 !== a && (e.push(o.time), n.push.apply(n, a)), o = t[r++]; while (void 0 !== o)
						} else if (void 0 !== a.toArray) {
							do a = o[i], void 0 !== a && (e.push(o.time), a.toArray(n, n.length)), o = t[r++]; while (void 0 !== o)
						} else
							do a = o[i], void 0 !== a && (e.push(o.time), n.push(a)), o = t[r++]; while (void 0 !== o)
				}
			}
		};
		zn.prototype = {
			constructor : zn,
			evaluate : function(t) {
				var e = this.parameterPositions,
					n = this._cachedIndex,
					i = e[n],
					r = e[n - 1];
				t:{e:{var o;
				n:{i:
				if (!(t < i)) {
					for (var a = n + 2;;) {
						if (void 0 === i) {
							if (t < r) break i;
							return n = e.length, this._cachedIndex = n, this.afterEnd_(n - 1, t, r)
						}
						if (n === a) break;
						if (r = i, i = e[++n], t < i) break e
					}
					o = e.length;break n
				}
				if (t >= r) break t;
				var s = e[1];
				t < s && (n = 2, r = s);
				for (var a = n - 2;;) {
					if (void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, i);
					if (n === a) break;
					if (i = r, r = e[--n - 1], t >= r) break e
				}
				o = n, n = 0}
				for (; n < o;) {
					var c = n + o >>> 1;
					t < e[c] ? o = c : n = c + 1
				}
				if (i = e[n], r = e[n - 1], void 0 === r) return this._cachedIndex = 0, this.beforeStart_(0, t, i);
				if (void 0 === i) return n = e.length, this._cachedIndex = n, this.afterEnd_(n - 1, r, t)}this._cachedIndex = n, this.intervalChanged_(n, r, i)}return this.interpolate_(n, r, t, i)
			},
			settings : null,
			DefaultSettings_ : {},
			getSettings_ : function() {
				return this.settings || this.DefaultSettings_
			},
			copySampleValue_ : function(t) {
				for (var e = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = 0; r !== i; ++r) e[r] = n[t * i + r];
				return e
			},
			interpolate_ : function() {
				throw new Error("call to abstract method")
			},
			intervalChanged_ : function() {}
		}, Object.assign(zn.prototype, {
			beforeStart_ : zn.prototype.copySampleValue_,
			afterEnd_ : zn.prototype.copySampleValue_
		}), Gn.prototype = Object.assign(Object.create(zn.prototype), {
			constructor : Gn,
			DefaultSettings_ : {
				endingStart : Oa,
				endingEnd : Oa
			},
			intervalChanged_ : function(t, e, n) {
				var i = this.parameterPositions,
					r = t - 2,
					o = t + 1,
					a = i[r],
					s = i[o];
				if (void 0 === a) switch (this.getSettings_().endingStart) {
					case Ua:
						r = t, a = 2 * e - n;
						break;case Da:
						r = i.length - 2, a = e + i[r] - i[r + 1];
						break;default:
						r = t, a = n
				}
				if (void 0 === s) switch (this.getSettings_().endingEnd) {
					case Ua:
						o = t, s = 2 * n - e;
						break;case Da:
						o = 1, s = n + i[1] - i[0];
						break;default:
						o = t - 1, s = e
				}
				var c = .5 * (n - e),
					u = this.valueSize;
				this._weightPrev = c / (e - a), this._weightNext = c / (s - n), this._offsetPrev = r * u, this._offsetNext = o * u
			},
			interpolate_ : function(t, e, n, i) {
				for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, c = this._offsetPrev, u = this._offsetNext, h = this._weightPrev, l = this._weightNext, d = (n - e) / (i - e), p = d * d, f = p * d, m = 0; m !== a; ++m) r[m] = (-h * f + 2 * h * p - h * d) * o[c + m] + ((1 + h) * f + (-1.5 - 2 * h) * p + (-.5 + h) * d + 1) * o[s - a + m] + ((-1 - l) * f + (1.5 + l) * p + .5 * d) * o[s + m] + (l * f - l * p) * o[u + m];
				return r
			}
		}), kn.prototype = Object.assign(Object.create(zn.prototype), {
			constructor : kn,
			interpolate_ : function(t, e, n, i) {
				for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, c = (n - e) / (i - e), u = 0; u !== a; ++u) r[u] = o[s - a + u] * (1 - c) + o[s + u] * c;
				return r
			}
		}), Hn.prototype = Object.assign(Object.create(zn.prototype), {
			constructor : Hn,
			interpolate_ : function(t) {
				return this.copySampleValue_(t - 1)
			}
		});
		var vs = {
			TimeBufferType : Float32Array,
			ValueBufferType : Float32Array,
			DefaultInterpolation : Ca,
			InterpolantFactoryMethodDiscrete : function(t) {
				return new Hn(this.times, this.values, this.getValueSize(), t)
			},
			InterpolantFactoryMethodLinear : function(t) {
				return new kn(this.times, this.values, this.getValueSize(), t)
			},
			InterpolantFactoryMethodSmooth : function(t) {
				return new Gn(this.times, this.values, this.getValueSize(), t)
			},
			setInterpolation : function(t) {
				var e;
				if (t === Ra ? e = this.InterpolantFactoryMethodDiscrete : t === Ca ? e = this.InterpolantFactoryMethodLinear : t === Ia ? e = this.InterpolantFactoryMethodSmooth : void 0, void 0 === e) {
					var n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
					if (void 0 === this.createInterpolant) {
						if (t === this.DefaultInterpolation)
							throw new Error(n);
						this.setInterpolation(this.DefaultInterpolation)
					}
					return void console.warn(n)
				}
				this.createInterpolant = e
			},
			getInterpolation : function() {
				switch (this.createInterpolant) {
				case this.InterpolantFactoryMethodDiscrete:
					return Ra;case this.InterpolantFactoryMethodLinear:
					return Ca;case this.InterpolantFactoryMethodSmooth:
					return Ia
				}
			},
			getValueSize : function() {
				return this.values.length / this.times.length
			},
			shift : function(t) {
				if (0 !== t)
					for (var e = this.times, n = 0, i = e.length; n !== i; ++n) e[n] += t;
				return this
			},
			scale : function(t) {
				if (1 !== t)
					for (var e = this.times, n = 0, i = e.length; n !== i; ++n) e[n] *= t;
				return this
			},
			trim : function(t, e) {
				for (var n = this.times, i = n.length, r = 0, o = i - 1; r !== i && n[r] < t;) ++r;
				for (; -1 != o && n[o] > e;) --o;
				if (++o, 0 !== r || o !== i) {
					r >= o && (o = Math.max(o, 1), r = o - 1);
					var a = this.getValueSize();
					this.times = ms.arraySlice(n, r, o), this.values = ms.arraySlice(this.values, r * a, o * a)
				}
				return this
			},
			validate : function() {
				var t = !0,
					e = this.getValueSize();
				0 != e - Math.floor(e) && (console.error("invalid value size in track", this), t = !1);
				var n = this.times,
					i = this.values,
					r = n.length;
				0 === r && (console.error("track is empty", this), t = !1);
				for (var o = null, a = 0; a !== r; a++) {
					var s = n[a];
					if ("number" == typeof s && isNaN(s)) {
						console.error("time is not a valid number", this, a, s), t = !1;break
					}
					if (null != o && o > s) {
						console.error("out of order keys", this, a, s, o), t = !1;break
					}
					o = s
				}
				if (void 0 !== i && ms.isTypedArray(i))
					for (var a = 0, c = i.length; a !== c; ++a) {
						var u = i[a];
						if (isNaN(u)) {
							console.error("value is not a valid number", this, a, u), t = !1;break
						}
				}
				return t
			},
			optimize : function() {
				for (var t = this.times, e = this.values, n = this.getValueSize(), i = this.getInterpolation() === Ia, r = 1, o = t.length - 1, a = 1; a < o; ++a) {
					var s = !1,
						c = t[a],
						u = t[a + 1];
					if (c !== u && (1 !== a || c !== c[0]))
						if (i)
							s = !0;else
							for (var h = a * n, l = 0; l !== n; ++l) {
								var d = e[h + l];
								if (d !== e[h - n + l] || d !== e[h + n + l]) {
									s = !0;break
								}
					}
					if (s) {
						if (a !== r) {
							t[r] = t[a];
							for (var p = a * n, f = r * n, l = 0; l !== n; ++l) e[f + l] = e[p + l]
						}
						++r
					}
				}
				if (0 < o) {
					t[r] = t[o];
					for (var p = o * n, f = r * n, l = 0; l !== n; ++l) e[f + l] = e[p + l];
					++r
				}
				return r !== t.length && (this.times = ms.arraySlice(t, 0, r), this.values = ms.arraySlice(e, 0, r * n)), this
			}
		};
		Vn.prototype = Object.assign(Object.create(vs), {
			constructor : Vn,
			ValueTypeName : "vector"
		}), Wn.prototype = Object.assign(Object.create(zn.prototype), {
			constructor : Wn,
			interpolate_ : function(t, e, n, i) {
				for (var r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, s = t * a, c = s + a; s !== c; s += 4) u.slerpFlat(r, 0, o, s - a, o, s, (n - e) / (i - e));
				return r
			}
		}), Xn.prototype = Object.assign(Object.create(vs), {
			constructor : Xn,
			ValueTypeName : "quaternion",
			DefaultInterpolation : Ca,
			InterpolantFactoryMethodLinear : function(t) {
				return new Wn(this.times, this.values, this.getValueSize(), t)
			},
			InterpolantFactoryMethodSmooth : void 0
		}), qn.prototype = Object.assign(Object.create(vs), {
			constructor : qn,
			ValueTypeName : "number"
		}), Yn.prototype = Object.assign(Object.create(vs), {
			constructor : Yn,
			ValueTypeName : "string",
			ValueBufferType : Array,
			DefaultInterpolation : Ra,
			InterpolantFactoryMethodLinear : void 0,
			InterpolantFactoryMethodSmooth : void 0
		}), Zn.prototype = Object.assign(Object.create(vs), {
			constructor : Zn,
			ValueTypeName : "bool",
			ValueBufferType : Array,
			DefaultInterpolation : Ra,
			InterpolantFactoryMethodLinear : void 0,
			InterpolantFactoryMethodSmooth : void 0
		}), Jn.prototype = Object.assign(Object.create(vs), {
			constructor : Jn,
			ValueTypeName : "color"
		}), Kn.prototype = vs, vs.constructor = Kn, Object.assign(Kn, {
			parse : function(t) {
				if (void 0 === t.type)
					throw new Error("track type undefined, can not parse");
				var e = Kn._getTrackTypeForValueTypeName(t.type);
				if (void 0 === t.times) {
					var n = [],
						i = [];
					ms.flattenJSON(t.keys, n, i, "value"), t.times = n, t.values = i
				}
				return void 0 === e.parse ? new e(t.name, t.times, t.values, t.interpolation) : e.parse(t)
			},
			toJSON : function(t) {
				var e,
					n = t.constructor;
				if (void 0 !== n.toJSON)
					e = n.toJSON(t);else {
					e = {
						name : t.name,
						times : ms.convertArray(t.times, Array),
						values : ms.convertArray(t.values, Array)
					};
					var i = t.getInterpolation();
					i !== t.DefaultInterpolation && (e.interpolation = i)
				}
				return e.type = t.ValueTypeName, e
			},
			_getTrackTypeForValueTypeName : function(t) {
				switch (t.toLowerCase()) {
				case "scalar":
				case "double":
				case "float":
				case "number":
				case "integer":
					return qn;case "vector":
				case "vector2":
				case "vector3":
				case "vector4":
					return Vn;case "color":
					return Jn;case "quaternion":
					return Xn;case "bool":
				case "boolean":
					return Zn;case "string":
					return Yn
				}
				throw new Error("Unsupported typeName: " + t)
			}
		}), Qn.prototype = {
			constructor : Qn,
			resetDuration : function() {
				for (var t = this.tracks, e = 0, n = 0, i = t.length; n !== i; ++n) {
					var r = this.tracks[n];
					e = Math.max(e, r.times[r.times.length - 1])
				}
				this.duration = e
			},
			trim : function() {
				for (var t = 0; t < this.tracks.length; t++) this.tracks[t].trim(0, this.duration);
				return this
			},
			optimize : function() {
				for (var t = 0; t < this.tracks.length; t++) this.tracks[t].optimize();
				return this
			}
		}, Object.assign(Qn, {
			parse : function(t) {
				for (var e = [], n = t.tracks, i = 1 / (t.fps || 1), r = 0, o = n.length; r !== o; ++r) e.push(Kn.parse(n[r]).scale(i));
				return new Qn(t.name, t.duration, e)
			},
			toJSON : function(t) {
				for (var e = [], n = t.tracks, i = {
							name : t.name,
							duration : t.duration,
							tracks : e
						}, r = 0, o = n.length; r !== o; ++r) e.push(Kn.toJSON(n[r]));
				return i
			},
			CreateFromMorphTargetSequence : function(t, e, n, i) {
				for (var r = e.length, o = [], a = 0; a < r; a++) {
					var s = [],
						c = [];
					s.push((a + r - 1) % r, a, (a + 1) % r), c.push(0, 1, 0);var u = ms.getKeyframeOrder(s);
					s = ms.sortedArray(s, 1, u), c = ms.sortedArray(c, 1, u), i || 0 !== s[0] || (s.push(r), c.push(c[0])), o.push(new qn(".morphTargetInfluences[" + e[a].name + "]", s, c).scale(1 / n))
				}
				return new Qn(t, -1, o)
			},
			findByName : function(t, e) {
				var n = t;
				if (!Array.isArray(t)) {
					var i = t;
					n = i.geometry && i.geometry.animations || i.animations
				}
				for (var r = 0; r < n.length; r++)
					if (n[r].name === e) return n[r];
				return null
			},
			CreateClipsFromMorphTargetSequences : function(t, e, n) {
				for (var i = {}, r = /^([\w-]*?)([\d]+)$/, o = 0, a = t.length; o < a; o++) {
					var s = t[o],
						c = s.name.match(r);
					if (c && 1 < c.length) {
						var u = c[1],
							h = i[u];
						h || (i[u] = h = []), h.push(s)
					}
				}
				var l = [];
				for (var u in i) l.push(Qn.CreateFromMorphTargetSequence(u, i[u], e, n));
				return l
			},
			parseAnimation : function(t, e) {
				if (!t) return console.error("  no animation in JSONLoader data"), null;
				for (var n = function(t, e, n, i, r) {
							if (0 !== n.length) {
								var o = [],
									a = [];
								ms.flattenJSON(n, o, a, i), 0 !== o.length && r.push(new t(e, o, a))
							}
						}, i = [], r = t.name || "default", o = t.length || -1, a = t.fps || 30, s = t.hierarchy || [], c = 0;c < s.length; c++) {
					var u = s[c].keys;
					if (u && 0 !== u.length)
						if (u[0].morphTargets) {
							for (var h = {}, l = 0; l < u.length; l++)
								if (u[l].morphTargets)
									for (var d = 0; d < u[l].morphTargets.length; d++) h[u[l].morphTargets[d]] = -1;
							for (var p in h) {
								for (var f = [], m = [], d = 0; d !== u[l].morphTargets.length; ++d) {
									var v = u[l];
									f.push(v.time), m.push(v.morphTarget === p ? 1 : 0)
								}
								i.push(new qn(".morphTargetInfluence[" + p + "]", f, m))
							}
							o = h.length * (a || 1)
						} else {
							var g = ".bones[" + e[c].name + "]";
							n(Vn, g + ".position", u, "pos", i), n(Xn, g + ".quaternion", u, "rot", i), n(Vn, g + ".scale", u, "scl", i)
					}
				}
				if (0 === i.length) return null;
				var y = new Qn(r, o, i);
				return y
			}
		}), Object.assign($n.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = new En(r.manager);
				o.load(t, (function(t) {
					e(r.parse(JSON.parse(t)))
				}), n, i)
			},
			setTextures : function(t) {
				this.textures = t
			},
			parse : function(t) {
				function e(t) {
					return void 0 === n[t] && console.warn("THREE.MaterialLoader: Undefined texture", t), n[t]
				}
				var n = this.textures,
					i = new ds[t.type];
				if (void 0 !== t.uuid && (i.uuid = t.uuid), void 0 !== t.name && (i.name = t.name), void 0 !== t.color && i.color.setHex(t.color), void 0 !== t.roughness && (i.roughness = t.roughness), void 0 !== t.metalness && (i.metalness = t.metalness), void 0 !== t.emissive && i.emissive.setHex(t.emissive), void 0 !== t.specular && i.specular.setHex(t.specular), void 0 !== t.shininess && (i.shininess = t.shininess), void 0 !== t.clearCoat && (i.clearCoat = t.clearCoat), void 0 !== t.clearCoatRoughness && (i.clearCoatRoughness = t.clearCoatRoughness), void 0 !== t.uniforms && (i.uniforms = t.uniforms), void 0 !== t.vertexShader && (i.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (i.fragmentShader = t.fragmentShader), void 0 !== t.vertexColors && (i.vertexColors = t.vertexColors), void 0 !== t.fog && (i.fog = t.fog), void 0 !== t.shading && (i.shading = t.shading), void 0 !== t.blending && (i.blending = t.blending), void 0 !== t.side && (i.side = t.side), void 0 !== t.opacity && (i.opacity = t.opacity), void 0 !== t.transparent && (i.transparent = t.transparent), void 0 !== t.alphaTest && (i.alphaTest = t.alphaTest), void 0 !== t.depthTest && (i.depthTest = t.depthTest), void 0 !== t.depthWrite && (i.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (i.colorWrite = t.colorWrite), void 0 !== t.wireframe && (i.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (i.wireframeLinewidth = t.wireframeLinewidth), void 0 !== t.wireframeLinecap && (i.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (i.wireframeLinejoin = t.wireframeLinejoin), void 0 !== t.skinning && (i.skinning = t.skinning), void 0 !== t.morphTargets && (i.morphTargets = t.morphTargets), void 0 !== t.size && (i.size = t.size), void 0 !== t.sizeAttenuation && (i.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (i.map = e(t.map)), void 0 !== t.alphaMap && (i.alphaMap = e(t.alphaMap), i.transparent = !0), void 0 !== t.bumpMap && (i.bumpMap = e(t.bumpMap)), void 0 !== t.bumpScale && (i.bumpScale = t.bumpScale), void 0 !== t.normalMap && (i.normalMap = e(t.normalMap)), void 0 !== t.normalScale) {
					var o = t.normalScale;
					!1 === Array.isArray(o) && (o = [ o, o ]), i.normalScale = (new r).fromArray(o)
				}
				if (void 0 !== t.displacementMap && (i.displacementMap = e(t.displacementMap)), void 0 !== t.displacementScale && (i.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (i.displacementBias = t.displacementBias), void 0 !== t.roughnessMap && (i.roughnessMap = e(t.roughnessMap)), void 0 !== t.metalnessMap && (i.metalnessMap = e(t.metalnessMap)), void 0 !== t.emissiveMap && (i.emissiveMap = e(t.emissiveMap)), void 0 !== t.emissiveIntensity && (i.emissiveIntensity = t.emissiveIntensity), void 0 !== t.specularMap && (i.specularMap = e(t.specularMap)), void 0 !== t.envMap && (i.envMap = e(t.envMap)), void 0 !== t.reflectivity && (i.reflectivity = t.reflectivity), void 0 !== t.lightMap && (i.lightMap = e(t.lightMap)), void 0 !== t.lightMapIntensity && (i.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (i.aoMap = e(t.aoMap)), void 0 !== t.aoMapIntensity && (i.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (i.gradientMap = e(t.gradientMap)), void 0 !== t.materials)
					for (var a = 0, s = t.materials.length; a < s; a++) i.materials.push(this.parse(t.materials[a]));
				return i
			}
		}), Object.assign(ti.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = new En(r.manager);
				o.load(t, (function(t) {
					e(r.parse(JSON.parse(t)))
				}), n, i)
			},
			parse : function(t) {
				var e = new Pt,
					n = t.data.index,
					i = {
						Int8Array : Int8Array,
						Uint8Array : Uint8Array,
						Uint8ClampedArray : Uint8ClampedArray,
						Int16Array : Int16Array,
						Uint16Array : Uint16Array,
						Int32Array : Int32Array,
						Uint32Array : Uint32Array,
						Float32Array : Float32Array,
						Float64Array : Float64Array
					};
				if (void 0 !== n) {
					var r = new i[n.type](n.array);
					e.setIndex(new mt(r, 1))
				}
				var o = t.data.attributes;
				for (var a in o) {
					var s = o[a],
						r = new i[s.type](s.array);
					e.addAttribute(a, new mt(r, s.itemSize, s.normalized))
				}
				var c = t.data.groups || t.data.drawcalls || t.data.offsets;
				if (void 0 !== c)
					for (var u = 0, l = c.length; u !== l; ++u) {
						var d = c[u];
						e.addGroup(d.start, d.count, d.materialIndex)
				}
				var p = t.data.boundingSphere;
				if (void 0 !== p) {
					var f = new h;
					void 0 !== p.center && f.fromArray(p.center), e.boundingSphere = new nt(f, p.radius)
				}
				return e
			}
		}), ei.prototype = {
			constructor : ei,
			crossOrigin : void 0,
			extractUrlBase : function(t) {
				var e = t.split("/");
				return 1 === e.length ? "./" : (e.pop(), e.join("/") + "/")
			},
			initMaterials : function(t, e, n) {
				for (var i = [], r = 0; r < t.length; ++r) i[r] = this.createMaterial(t[r], e, n);
				return i
			},
			createMaterial : (function() {
				var t,
					e,
					n;
				return function(i, r, o) {
					function a(t, n, i, a, c) {
						var u,
							h = r + t,
							l = ei.Handlers.get(h);
						null === l ? (e.setCrossOrigin(o), u = e.load(h)) : u = l.load(h), void 0 !== n && (u.repeat.fromArray(n), 1 !== n[0] && (u.wrapS = Ho), 1 !== n[1] && (u.wrapT = Ho)), void 0 !== i && u.offset.fromArray(i), void 0 !== a && ("repeat" === a[0] && (u.wrapS = Ho), "mirror" === a[0] && (u.wrapS = Vo), "repeat" === a[1] && (u.wrapT = Ho), "mirror" === a[1] && (u.wrapT = Vo)), void 0 !== c && (u.anisotropy = c);var d = Ya.generateUUID();
						return s[d] = u, d
					}
					void 0 == t && (t = new q), void 0 == e && (e = new Ln), void 0 == n && (n = new $n);
					var s = {},
						c = {
							uuid : Ya.generateUUID(),
							type : "MeshLambertMaterial"
						};
					for (var u in i) {
						var h = i[u];
						switch (u) {
						case "DbgColor":
						case "DbgIndex":
						case "opticalDensity":
						case "illumination":
							break;case "DbgName":
							c.name = h;
							break;case "blending":
							c.blending = $r[h];
							break;case "colorAmbient":
						case "mapAmbient":
							console.warn("THREE.Loader.createMaterial:", u, "is no longer supported.");
							break;case "colorDiffuse":
							c.color = t.fromArray(h).getHex();
							break;case "colorSpecular":
							c.specular = t.fromArray(h).getHex();
							break;case "colorEmissive":
							c.emissive = t.fromArray(h).getHex();
							break;case "specularCoef":
							c.shininess = h;
							break;case "shading":
							"basic" === h.toLowerCase() && (c.type = "MeshBasicMaterial"), "phong" === h.toLowerCase() && (c.type = "MeshPhongMaterial"), "standard" === h.toLowerCase() && (c.type = "MeshStandardMaterial");
							break;case "mapDiffuse":
							c.map = a(h, i.mapDiffuseRepeat, i.mapDiffuseOffset, i.mapDiffuseWrap, i.mapDiffuseAnisotropy);
							break;case "mapDiffuseRepeat":
						case "mapDiffuseOffset":
						case "mapDiffuseWrap":
						case "mapDiffuseAnisotropy":
							break;case "mapEmissive":
							c.emissiveMap = a(h, i.mapEmissiveRepeat, i.mapEmissiveOffset, i.mapEmissiveWrap, i.mapEmissiveAnisotropy);
							break;case "mapEmissiveRepeat":
						case "mapEmissiveOffset":
						case "mapEmissiveWrap":
						case "mapEmissiveAnisotropy":
							break;case "mapLight":
							c.lightMap = a(h, i.mapLightRepeat, i.mapLightOffset, i.mapLightWrap, i.mapLightAnisotropy);
							break;case "mapLightRepeat":
						case "mapLightOffset":
						case "mapLightWrap":
						case "mapLightAnisotropy":
							break;case "mapAO":
							c.aoMap = a(h, i.mapAORepeat, i.mapAOOffset, i.mapAOWrap, i.mapAOAnisotropy);
							break;case "mapAORepeat":
						case "mapAOOffset":
						case "mapAOWrap":
						case "mapAOAnisotropy":
							break;case "mapBump":
							c.bumpMap = a(h, i.mapBumpRepeat, i.mapBumpOffset, i.mapBumpWrap, i.mapBumpAnisotropy);
							break;case "mapBumpScale":
							c.bumpScale = h;
							break;case "mapBumpRepeat":
						case "mapBumpOffset":
						case "mapBumpWrap":
						case "mapBumpAnisotropy":
							break;case "mapNormal":
							c.normalMap = a(h, i.mapNormalRepeat, i.mapNormalOffset, i.mapNormalWrap, i.mapNormalAnisotropy);
							break;case "mapNormalFactor":
							c.normalScale = [ h, h ];
							break;case "mapNormalRepeat":
						case "mapNormalOffset":
						case "mapNormalWrap":
						case "mapNormalAnisotropy":
							break;case "mapSpecular":
							c.specularMap = a(h, i.mapSpecularRepeat, i.mapSpecularOffset, i.mapSpecularWrap, i.mapSpecularAnisotropy);
							break;case "mapSpecularRepeat":
						case "mapSpecularOffset":
						case "mapSpecularWrap":
						case "mapSpecularAnisotropy":
							break;case "mapMetalness":
							c.metalnessMap = a(h, i.mapMetalnessRepeat, i.mapMetalnessOffset, i.mapMetalnessWrap, i.mapMetalnessAnisotropy);
							break;case "mapMetalnessRepeat":
						case "mapMetalnessOffset":
						case "mapMetalnessWrap":
						case "mapMetalnessAnisotropy":
							break;case "mapRoughness":
							c.roughnessMap = a(h, i.mapRoughnessRepeat, i.mapRoughnessOffset, i.mapRoughnessWrap, i.mapRoughnessAnisotropy);
							break;case "mapRoughnessRepeat":
						case "mapRoughnessOffset":
						case "mapRoughnessWrap":
						case "mapRoughnessAnisotropy":
							break;case "mapAlpha":
							c.alphaMap = a(h, i.mapAlphaRepeat, i.mapAlphaOffset, i.mapAlphaWrap, i.mapAlphaAnisotropy);
							break;case "mapAlphaRepeat":
						case "mapAlphaOffset":
						case "mapAlphaWrap":
						case "mapAlphaAnisotropy":
							break;case "flipSided":
							c.side = Gr;
							break;case "doubleSided":
							c.side = kr;
							break;case "transparency":
							console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"), c.opacity = h;
							break;case "depthTest":
						case "depthWrite":
						case "colorWrite":
						case "opacity":
						case "reflectivity":
						case "transparent":
						case "visible":
						case "wireframe":
							c[u] = h;
							break;case "vertexColors":
							!0 === h && (c.vertexColors = Xr), "face" === h && (c.vertexColors = Wr);
							break;default:
							console.error("THREE.Loader.createMaterial: Unsupported", u, h)
						}
					}
					return "MeshBasicMaterial" === c.type &&
						delete c.emissive
						, "MeshPhongMaterial" !== c.type &&
						delete c.specular
						, 1 > c.opacity && (c.transparent = !0), n.setTextures(s), n.parse(c)
				}
			})()
		}, ei.Handlers = {
			handlers : [],
			add : function(t, e) {
				this.handlers.push(t, e)
			},
			get : function(t) {
				for (var e = this.handlers, n = 0, i = e.length; n < i; n += 2) {
					var r = e[n],
						o = e[n + 1];
					if (r.test(t)) return o
				}
				return null
			}
		}, Object.assign(ni.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = this.texturePath && "string" == typeof this.texturePath ? this.texturePath : ei.prototype.extractUrlBase(t),
					a = new En(this.manager);
				a.setWithCredentials(this.withCredentials), a.load(t, (function(n) {
					var i = JSON.parse(n),
						a = i.metadata;
					if (void 0 !== a) {
						var s = a.type;
						if (void 0 !== s) {
							if ("object" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.ObjectLoader instead.");
							if ("scene" === s.toLowerCase()) return void console.error("THREE.JSONLoader: " + t + " should be loaded with THREE.SceneLoader instead.")
						}
					}
					var c = r.parse(i, o);
					e(c.geometry, c.materials)
				}), n, i)
			},
			setTexturePath : function(t) {
				this.texturePath = t
			},
			parse : function(t, e) {
				var n = new Tt,
					i = void 0 === t.scale ? 1 : 1 / t.scale;
				if (function(e) {
						function i(t, e) {
							return t & 1 << e
						}
						var o,
							a,
							s,
							c,
							u,
							l,
							d,
							p,
							f,
							m,
							v,
							g,
							y,
							x,
							b,
							_,
							w,
							M,
							E,
							S,
							T,
							A,
							P,
							L,
							R,
							C,
							I,
							O = t.faces,
							U = t.vertices,
							D = t.normals,
							B = t.colors,
							N = 0;
						if (void 0 !== t.uvs) {
							for (o = 0; o < t.uvs.length; o++) t.uvs[o].length && N++;
							for (o = 0; o < N; o++) n.faceVertexUvs[o] = []
						}
						for (c = 0, u = U.length; c < u;) M = new h, M.x = U[c++] * e, M.y = U[c++] * e, M.z = U[c++] * e, n.vertices.push(M);
						for (c = 0, u = O.length; c < u;)
							if (m = O[c++], v = i(m, 0), g = i(m, 1), y = i(m, 3), x = i(m, 4), b = i(m, 5), _ = i(m, 6), w = i(m, 7), v) {
								if (S = new pt, S.a = O[c], S.b = O[c + 1], S.c = O[c + 3], T = new pt, T.a = O[c + 1], T.b = O[c + 2], T.c = O[c + 3], c += 4, g && (f = O[c++], S.materialIndex = f, T.materialIndex = f), s = n.faces.length, y)
									for (o = 0; o < N; o++)
										for (L = t.uvs[o], n.faceVertexUvs[o][s] = [], n.faceVertexUvs[o][s + 1] = [], a = 0; 4 > a; a++) p = O[c++], C = L[2 * p], I = L[2 * p + 1], R = new r(C, I), 2 !== a && n.faceVertexUvs[o][s].push(R), 0 !== a && n.faceVertexUvs[o][s + 1].push(R);
								if (x && (d = 3 * O[c++], S.normal.set(D[d++], D[d++], D[d]), T.normal.copy(S.normal)), b)
									for (o = 0; 4 > o; o++) d = 3 * O[c++], P = new h(D[d++], D[d++], D[d]), 2 !== o && S.vertexNormals.push(P), 0 !== o && T.vertexNormals.push(P);
								if (_ && (l = O[c++], A = B[l], S.color.setHex(A), T.color.setHex(A)), w)
									for (o = 0; 4 > o; o++) l = O[c++], A = B[l], 2 !== o && S.vertexColors.push(new q(A)), 0 !== o && T.vertexColors.push(new q(A));
								n.faces.push(S), n.faces.push(T)
							} else {
								if (E = new pt, E.a = O[c++], E.b = O[c++], E.c = O[c++], g && (f = O[c++], E.materialIndex = f), s = n.faces.length, y)
									for (o = 0; o < N; o++)
										for (L = t.uvs[o], n.faceVertexUvs[o][s] = [], a = 0; 3 > a; a++) p = O[c++], C = L[2 * p], I = L[2 * p + 1], R = new r(C, I), n.faceVertexUvs[o][s].push(R);
								if (x && (d = 3 * O[c++], E.normal.set(D[d++], D[d++], D[d])), b)
									for (o = 0; 3 > o; o++) d = 3 * O[c++], P = new h(D[d++], D[d++], D[d]), E.vertexNormals.push(P);
								if (_ && (l = O[c++], E.color.setHex(B[l])), w)
									for (o = 0; 3 > o; o++) l = O[c++], E.vertexColors.push(new q(B[l]));
								n.faces.push(E)
						}
					}(i), (function() {
						var e = void 0 === t.influencesPerVertex ? 2 : t.influencesPerVertex;
						if (t.skinWeights)
							for (var i = 0, r = t.skinWeights.length; i < r; i += e) {
								var o = t.skinWeights[i],
									s = 1 < e ? t.skinWeights[i + 1] : 0,
									c = 2 < e ? t.skinWeights[i + 2] : 0,
									u = 3 < e ? t.skinWeights[i + 3] : 0;
								n.skinWeights.push(new a(o, s, c, u))
						}
						if (t.skinIndices)
							for (var i = 0, r = t.skinIndices.length; i < r; i += e) {
								var h = t.skinIndices[i],
									l = 1 < e ? t.skinIndices[i + 1] : 0,
									d = 2 < e ? t.skinIndices[i + 2] : 0,
									p = 3 < e ? t.skinIndices[i + 3] : 0;
								n.skinIndices.push(new a(h, l, d, p))
						}
						n.bones = t.bones, n.bones && 0 < n.bones.length && (n.skinWeights.length !== n.skinIndices.length || n.skinIndices.length !== n.vertices.length) && console.warn("When skinning, number of vertices (" + n.vertices.length + "), skinIndices (" + n.skinIndices.length + "), and skinWeights (" + n.skinWeights.length + ") should match.")
					})(), (function(e) {
						if (void 0 !== t.morphTargets)
							for (var i = 0, r = t.morphTargets.length; i < r; i++) {
								n.morphTargets[i] = {}, n.morphTargets[i].name = t.morphTargets[i].name, n.morphTargets[i].vertices = [];
								for (var o = n.morphTargets[i].vertices, a = t.morphTargets[i].vertices, s = 0, c = a.length; s < c; s += 3) {
									var u = new h;
									u.x = a[s] * e, u.y = a[s + 1] * e, u.z = a[s + 2] * e, o.push(u)
								}
						}
						if (void 0 !== t.morphColors && 0 < t.morphColors.length) {
							console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');
							for (var l = n.faces, d = t.morphColors[0].colors, i = 0, r = l.length; i < r; i++) l[i].color.fromArray(d, 3 * i)
						}
					})(i), (function() {
						var e = [],
							i = [];
						void 0 !== t.animation && i.push(t.animation), void 0 !== t.animations && (t.animations.length ? i = i.concat(t.animations) : i.push(t.animations));
						for (var r = 0; r < i.length; r++) {
							var o = Qn.parseAnimation(i[r], n.bones);
							o && e.push(o)
						}
						if (n.morphTargets) {
							var a = Qn.CreateClipsFromMorphTargetSequences(n.morphTargets, 10);
							e = e.concat(a)
						}
						0 < e.length && (n.animations = e)
					})(), n.computeFaceNormals(), n.computeBoundingSphere(), void 0 === t.materials || 0 === t.materials.length) return {
						geometry : n
					};
				var o = ei.prototype.initMaterials(t.materials, e, this.crossOrigin);
				return {
					geometry : n,
					materials : o
				}
			}
		}), Object.assign(ii.prototype, {
			load : function(t, e, n, i) {
				"" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
				var r = this,
					o = new En(r.manager);
				o.load(t, (function(n) {
					var i = null;
					try {
						i = JSON.parse(n)
					} catch (e) {
						return void console.error("THREE:ObjectLoader: Can't parse " + t + ".", e.message)
					}
					var o = i.metadata;
					return void 0 === o || void 0 === o.type || "geometry" === o.type.toLowerCase() ? void console.error("THREE.ObjectLoader: Can't load " + t + ". Use THREE.JSONLoader instead.") : void r.parse(i, e)
				}), n, i)
			},
			setTexturePath : function(t) {
				this.texturePath = t
			},
			setCrossOrigin : function(t) {
				this.crossOrigin = t
			},
			parse : function(t, e) {
				var n = this.parseGeometries(t.geometries),
					i = this.parseImages(t.images, (function() {
						void 0 !== e && e(a)
					})),
					r = this.parseTextures(t.textures, i),
					o = this.parseMaterials(t.materials, r),
					a = this.parseObject(t.object, n, o);
				return t.animations && (a.animations = this.parseAnimations(t.animations)), (void 0 === t.images || 0 === t.images.length) && void 0 !== e && e(a), a
			},
			parseGeometries : function(t) {
				var e = {};
				if (void 0 !== t)
					for (var n = new ni, i = new ti, r = 0, o = t.length; r < o; r++) {
						var a,
							s = t[r];
						switch (s.type) {
						case "PlaneGeometry":
						case "PlaneBufferGeometry":
							a = new ls[s.type](s.width, s.height, s.widthSegments, s.heightSegments);
							break;case "BoxGeometry":
						case "BoxBufferGeometry":
						case "CubeGeometry":
							a = new ls[s.type](s.width, s.height, s.depth, s.widthSegments, s.heightSegments, s.depthSegments);
							break;case "CircleGeometry":
						case "CircleBufferGeometry":
							a = new ls[s.type](s.radius, s.segments, s.thetaStart, s.thetaLength);
							break;case "CylinderGeometry":
						case "CylinderBufferGeometry":
							a = new ls[s.type](s.radiusTop, s.radiusBottom, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
							break;case "ConeGeometry":
						case "ConeBufferGeometry":
							a = new ls[s.type](s.radius, s.height, s.radialSegments, s.heightSegments, s.openEnded, s.thetaStart, s.thetaLength);
							break;case "SphereGeometry":
						case "SphereBufferGeometry":
							a = new ls[s.type](s.radius, s.widthSegments, s.heightSegments, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength);
							break;case "DodecahedronGeometry":
						case "IcosahedronGeometry":
						case "OctahedronGeometry":
						case "TetrahedronGeometry":
							a = new ls[s.type](s.radius, s.detail);
							break;case "RingGeometry":
						case "RingBufferGeometry":
							a = new ls[s.type](s.innerRadius, s.outerRadius, s.thetaSegments, s.phiSegments, s.thetaStart, s.thetaLength);
							break;case "TorusGeometry":
						case "TorusBufferGeometry":
							a = new ls[s.type](s.radius, s.tube, s.radialSegments, s.tubularSegments, s.arc);
							break;case "TorusKnotGeometry":
						case "TorusKnotBufferGeometry":
							a = new ls[s.type](s.radius, s.tube, s.tubularSegments, s.radialSegments, s.p, s.q);
							break;case "LatheGeometry":
						case "LatheBufferGeometry":
							a = new ls[s.type](s.points, s.segments, s.phiStart, s.phiLength);
							break;case "BufferGeometry":
							a = i.parse(s);
							break;case "Geometry":
							a = n.parse(s.data, this.texturePath).geometry;
							break;default:
							console.warn('THREE.ObjectLoader: Unsupported geometry type "' + s.type + '"');continue
						}
						a.uuid = s.uuid, void 0 !== s.name && (a.name = s.name), e[s.uuid] = a
				}
				return e
			},
			parseMaterials : function(t, e) {
				var n = {};
				if (void 0 !== t) {
					var i = new $n;
					i.setTextures(e);
					for (var r = 0, o = t.length; r < o; r++) {
						var a = i.parse(t[r]);
						n[a.uuid] = a
					}
				}
				return n
			},
			parseAnimations : function(t) {
				for (var e = [], n = 0; n < t.length; n++) {
					var i = Qn.parse(t[n]);
					e.push(i)
				}
				return e
			},
			parseImages : function(t, e) {
				function n(t) {
					return i.manager.itemStart(t), a.load(t, (function() {
							i.manager.itemEnd(t)
						}), void 0, (function() {
							i.manager.itemError(t)
						}))
				}
				var i = this,
					r = {};
				if (void 0 !== t && 0 < t.length) {
					var o = new Mn(e),
						a = new An(o);
					a.setCrossOrigin(this.crossOrigin);
					for (var s = 0, c = t.length; s < c; s++) {
						var u = t[s],
							h = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(u.url) ? u.url : i.texturePath + u.url;
						r[u.uuid] = n(h)
					}
				}
				return r
			},
			parseTextures : function(t, e) {
				function n(t, e) {
					return "number" == typeof t ? t : (console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", t), e[t])
				}
				var i = {};
				if (void 0 !== t)
					for (var r = 0, a = t.length; r < a; r++) {
						var s = t[r];
						void 0 === s.image && console.warn('THREE.ObjectLoader: No "image" specified for', s.uuid), void 0 === e[s.image] && console.warn("THREE.ObjectLoader: Undefined image", s.image);var c = new o(e[s.image]);
						c.needsUpdate = !0, c.uuid = s.uuid, void 0 !== s.name && (c.name = s.name), void 0 !== s.mapping && (c.mapping = n(s.mapping, ko)), void 0 !== s.offset && c.offset.fromArray(s.offset), void 0 !== s.repeat && c.repeat.fromArray(s.repeat), void 0 !== s.wrap && (c.wrapS = n(s.wrap[0], Wo), c.wrapT = n(s.wrap[1], Wo)), void 0 !== s.minFilter && (c.minFilter = n(s.minFilter, Qo)), void 0 !== s.magFilter && (c.magFilter = n(s.magFilter, Qo)), void 0 !== s.anisotropy && (c.anisotropy = s.anisotropy), void 0 !== s.flipY && (c.flipY = s.flipY), i[s.uuid] = c
				}
				return i
			},
			parseObject : (function() {
				var t = new l;
				return function(e, n, i) {
					function r(t) {
						return void 0 === n[t] && console.warn("THREE.ObjectLoader: Undefined geometry", t), n[t]
					}
					function o(t) {
						return void 0 === t ? void 0 : (void 0 === i[t] && console.warn("THREE.ObjectLoader: Undefined material", t), i[t])
					}
					var a;
					switch (e.type) {
					case "Scene":
						a = new he, void 0 !== e.background && Number.isInteger(e.background) && (a.background = new q(e.background)), void 0 !== e.fog && ("Fog" === e.fog.type ? a.fog = new ue(e.fog.color, e.fog.near, e.fog.far) : "FogExp2" === e.fog.type && (a.fog = new ce(e.fog.color, e.fog.density)));
						break;case "PerspectiveCamera":
						a = new Ot(e.fov, e.aspect, e.near, e.far), void 0 !== e.focus && (a.focus = e.focus), void 0 !== e.zoom && (a.zoom = e.zoom), void 0 !== e.filmGauge && (a.filmGauge = e.filmGauge), void 0 !== e.filmOffset && (a.filmOffset = e.filmOffset), void 0 !== e.view && (a.view = Object.assign({}, e.view));
						break;case "OrthographicCamera":
						a = new Ut(e.left, e.right, e.top, e.bottom, e.near, e.far);
						break;case "AmbientLight":
						a = new Fn(e.color, e.intensity);
						break;case "DirectionalLight":
						a = new Nn(e.color, e.intensity);
						break;case "PointLight":
						a = new Dn(e.color, e.intensity, e.distance, e.decay);
						break;case "SpotLight":
						a = new Un(e.color, e.intensity, e.distance, e.angle, e.penumbra, e.decay);
						break;case "HemisphereLight":
						a = new Cn(e.color, e.groundColor, e.intensity);
						break;case "Mesh":
						var s = r(e.geometry),
							c = o(e.material);
						a = s.bones && 0 < s.bones.length ? new ge(s, c) : new Lt(s, c);
						break;case "LOD":
						a = new fe;
						break;case "Line":
						a = new xe(r(e.geometry), o(e.material), e.mode);
						break;case "LineSegments":
						a = new be(r(e.geometry), o(e.material));
						break;case "PointCloud":
					case "Points":
						a = new we(r(e.geometry), o(e.material));
						break;case "Sprite":
						a = new pe(o(e.material));
						break;case "Group":
						a = new Me;
						break;case "SkinnedMesh":
						console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh type. Instantiates Object3D instead.");default:
						a = new ht
					}
					if (a.uuid = e.uuid, void 0 !== e.name && (a.name = e.name), void 0 === e.matrix ? (void 0 !== e.position && a.position.fromArray(e.position), void 0 !== e.rotation && a.rotation.fromArray(e.rotation), void 0 !== e.quaternion && a.quaternion.fromArray(e.quaternion), void 0 !== e.scale && a.scale.fromArray(e.scale)) : (t.fromArray(e.matrix), t.decompose(a.position, a.quaternion, a.scale)), void 0 !== e.castShadow && (a.castShadow = e.castShadow), void 0 !== e.receiveShadow && (a.receiveShadow = e.receiveShadow), e.shadow && (void 0 !== e.shadow.bias && (a.shadow.bias = e.shadow.bias), void 0 !== e.shadow.radius && (a.shadow.radius = e.shadow.radius), void 0 !== e.shadow.mapSize && a.shadow.mapSize.fromArray(e.shadow.mapSize), void 0 !== e.shadow.camera && (a.shadow.camera = this.parseObject(e.shadow.camera))), void 0 !== e.visible && (a.visible = e.visible), void 0 !== e.userData && (a.userData = e.userData), void 0 !== e.children)
						for (var u in e.children) a.add(this.parseObject(e.children[u], n, i));
					if ("LOD" === e.type)
						for (var h = e.levels, l = 0; l < h.length; l++) {
							var d = h[l],
								u = a.getObjectByProperty("uuid", d.object);
							void 0 !== u && a.addLevel(u, d.distance)
					}
					return a
				}
			})()
		}), ri.prototype = {
			constructor : ri,
			getPoint : function() {
				return console.warn("THREE.Curve: Warning, getPoint() not implemented!"), null
			},
			getPointAt : function(t) {
				var e = this.getUtoTmapping(t);
				return this.getPoint(e)
			},
			getPoints : function(t) {
				t || (t = 5);
				for (var e = [], n = 0; n <= t; n++) e.push(this.getPoint(n / t));
				return e
			},
			getSpacedPoints : function(t) {
				t || (t = 5);
				for (var e = [], n = 0; n <= t; n++) e.push(this.getPointAt(n / t));
				return e
			},
			getLength : function() {
				var t = this.getLengths();
				return t[t.length - 1]
			},
			getLengths : function(t) {
				if (t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
					this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
				this.needsUpdate = !1;
				var e,
					n,
					i = [],
					r = this.getPoint(0),
					o = 0;
				for (i.push(0), n = 1; n <= t; n++) e = this.getPoint(n / t), o += e.distanceTo(r), i.push(o), r = e;
				return this.cacheArcLengths = i, i
			},
			updateArcLengths : function() {
				this.needsUpdate = !0, this.getLengths()
			},
			getUtoTmapping : function(t, e) {
				var n,
					i = this.getLengths(),
					r = 0,
					o = i.length;
				n = e ? e : t * i[o - 1];
				for (var a, s = 0, c = o - 1; s <= c;)
					if (r = Math.floor(s + (c - s) / 2), a = i[r] - n, 0 > a)
						s = r + 1;else {
						if (!(0 < a)) {
							c = r;break
						}
						c = r - 1
				}
				if (r = c, i[r] === n) {
					var u = r / (o - 1);
					return u
				}
				var h = i[r],
					l = i[r + 1],
					d = (n - h) / (l - h),
					u = (r + d) / (o - 1);
				return u
			},
			getTangent : function(t) {
				var e = 1e-4,
					n = t - e,
					i = t + e;
				0 > n && (n = 0), 1 < i && (i = 1);
				var r = this.getPoint(n),
					o = this.getPoint(i),
					a = o.clone().sub(r);
				return a.normalize()
			},
			getTangentAt : function(t) {
				var e = this.getUtoTmapping(t);
				return this.getTangent(e)
			},
			computeFrenetFrames : function(t, e) {
				var n,
					i,
					r,
					o = new h,
					a = [],
					s = [],
					c = [],
					u = new h,
					d = new l;
				for (n = 0; n <= t; n++) i = n / t, a[n] = this.getTangentAt(i), a[n].normalize();
				s[0] = new h, c[0] = new h;
				var p = Number.MAX_VALUE,
					f = Math.abs(a[0].x),
					m = Math.abs(a[0].y),
					v = Math.abs(a[0].z);
				for (f <= p && (p = f, o.set(1, 0, 0)), m <= p && (p = m, o.set(0, 1, 0)), v <= p && o.set(0, 0, 1), u.crossVectors(a[0], o).normalize(), s[0].crossVectors(a[0], u), c[0].crossVectors(a[0], s[0]), n = 1; n <= t; n++) s[n] = s[n - 1].clone(), c[n] = c[n - 1].clone(), u.crossVectors(a[n - 1], a[n]), u.length() > Number.EPSILON && (u.normalize(), r = Math.acos(Ya.clamp(a[n - 1].dot(a[n]), -1, 1)), s[n].applyMatrix4(d.makeRotationAxis(u, r))), c[n].crossVectors(a[n], s[n]);
				if (!0 === e)
					for (r = Math.acos(Ya.clamp(s[0].dot(s[t]), -1, 1)), r /= t, 0 < a[0].dot(u.crossVectors(s[0], s[t])) && (r = -r), n = 1; n <= t; n++) s[n].applyMatrix4(d.makeRotationAxis(a[n], r * n)), c[n].crossVectors(a[n], s[n]);
				return {
					tangents : a,
					normals : s,
					binormals : c
				}
			}
		}, ri.create = function(t, e) {
			return t.prototype = Object.create(ri.prototype), t.prototype.constructor = t, t.prototype.getPoint = e, t
		}, oi.prototype = Object.create(ri.prototype), oi.prototype.constructor = oi, oi.prototype.isLineCurve = !0, oi.prototype.getPoint = function(t) {
			if (1 === t) return this.v2.clone();
			var e = this.v2.clone().sub(this.v1);
			return e.multiplyScalar(t).add(this.v1), e
		}, oi.prototype.getPointAt = function(t) {
			return this.getPoint(t)
		}, oi.prototype.getTangent = function() {
			var t = this.v2.clone().sub(this.v1);
			return t.normalize()
		}, ai.prototype = Object.assign(Object.create(ri.prototype), {
			constructor : ai,
			add : function(t) {
				this.curves.push(t)
			},
			closePath : function() {
				var t = this.curves[0].getPoint(0),
					e = this.curves[this.curves.length - 1].getPoint(1);
				t.equals(e) || this.curves.push(new oi(e, t))
			},
			getPoint : function(t) {
				for (var e = t * this.getLength(), n = this.getCurveLengths(), i = 0; i < n.length;) {
					if (n[i] >= e) {
						var r = n[i] - e,
							o = this.curves[i],
							a = o.getLength(),
							s = 0 === a ? 0 : 1 - r / a;
						return o.getPointAt(s)
					}
					i++
				}
				return null
			},
			getLength : function() {
				var t = this.getCurveLengths();
				return t[t.length - 1]
			},
			updateArcLengths : function() {
				this.needsUpdate = !0, this.cacheLengths = null, this.getLengths()
			},
			getCurveLengths : function() {
				if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
				for (var t = [], e = 0, n = 0, i = this.curves.length; n < i; n++) e += this.curves[n].getLength(), t.push(e);
				return this.cacheLengths = t, t
			},
			getSpacedPoints : function(t) {
				t || (t = 40);
				for (var e = [], n = 0; n <= t; n++) e.push(this.getPoint(n / t));
				return this.autoClose && e.push(e[0]), e
			},
			getPoints : function(t) {
				t = t || 12;
				for (var e, n = [], i = 0, r = this.curves; i < r.length; i++)
					for (var o = r[i], a = o && o.isEllipseCurve ? 2 * t : o && o.isLineCurve ? 1 : o && o.isSplineCurve ? t * o.points.length : t, s = o.getPoints(a), c = 0; c < s.length; c++) {
						var u = s[c];
						e && e.equals(u) || (n.push(u), e = u)
				}
				return this.autoClose && 1 < n.length && !n[n.length - 1].equals(n[0]) && n.push(n[0]), n
			},
			createPointsGeometry : function(t) {
				var e = this.getPoints(t);
				return this.createGeometry(e)
			},
			createSpacedPointsGeometry : function(t) {
				var e = this.getSpacedPoints(t);
				return this.createGeometry(e)
			},
			createGeometry : function(t) {
				for (var e = new Tt, n = 0, i = t.length; n < i; n++) {
					var r = t[n];
					e.vertices.push(new h(r.x, r.y, r.z || 0))
				}
				return e
			}
		}), si.prototype = Object.create(ri.prototype), si.prototype.constructor = si, si.prototype.isEllipseCurve = !0, si.prototype.getPoint = function(t) {
			for (var e = 2 * Math.PI, n = this.aEndAngle - this.aStartAngle, i = Math.abs(n) < Number.EPSILON; 0 > n;) n += e;
			for (; n > e;) n -= e;
			n < Number.EPSILON && (n = i ? 0 : e), !0 !== this.aClockwise || i || (n === e ? n = -e : n -= e);
			var o = this.aStartAngle + t * n,
				a = this.aX + this.xRadius * Math.cos(o),
				s = this.aY + this.yRadius * Math.sin(o);
			if (0 !== this.aRotation) {
				var c = Math.cos(this.aRotation),
					u = Math.sin(this.aRotation),
					h = a - this.aX,
					l = s - this.aY;
				a = h * c - l * u + this.aX, s = h * u + l * c + this.aY
			}
			return new r(a, s)
		};
		var gs = {
			tangentQuadraticBezier : function(t, e, n, i) {
				return 2 * (1 - t) * (n - e) + 2 * t * (i - n)
			},
			tangentCubicBezier : function(t, e, n, i, r) {
				return -3 * e * (1 - t) * (1 - t) + 3 * n * (1 - t) * (1 - t) - 6 * t * n * (1 - t) + 6 * t * i * (1 - t) - 3 * t * t * i + 3 * t * t * r
			},
			tangentSpline : function(t) {
				return 6 * t * t - 6 * t + (3 * t * t - 4 * t + 1) + (-6 * t * t + 6 * t) + (3 * t * t - 2 * t)
			},
			interpolate : function(t, e, n, i, r) {
				var o = .5 * (n - t),
					a = .5 * (i - e),
					s = r * r;
				return (2 * e - 2 * n + o + a) * (r * s) + (-3 * e + 3 * n - 2 * o - a) * s + o * r + e
			}
		};
		ci.prototype = Object.create(ri.prototype), ci.prototype.constructor = ci, ci.prototype.isSplineCurve = !0, ci.prototype.getPoint = function(t) {
			var e = this.points,
				n = (e.length - 1) * t,
				i = Math.floor(n),
				o = n - i,
				a = e[0 === i ? i : i - 1],
				s = e[i],
				c = e[i > e.length - 2 ? e.length - 1 : i + 1],
				u = e[i > e.length - 3 ? e.length - 1 : i + 2],
				h = gs.interpolate;
			return new r(h(a.x, s.x, c.x, u.x, o), h(a.y, s.y, c.y, u.y, o))
		}, ui.prototype = Object.create(ri.prototype), ui.prototype.constructor = ui, ui.prototype.getPoint = function(t) {
			var e = hs.b3;
			return new r(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y))
		}, ui.prototype.getTangent = function(t) {
			var e = gs.tangentCubicBezier;
			return new r(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)).normalize()
		}, hi.prototype = Object.create(ri.prototype), hi.prototype.constructor = hi, hi.prototype.getPoint = function(t) {
			var e = hs.b2;
			return new r(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y))
		}, hi.prototype.getTangent = function(t) {
			var e = gs.tangentQuadraticBezier;
			return new r(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y)).normalize()
		};
		var ys = Object.assign(Object.create(ai.prototype), {
			fromPoints : function(t) {
				this.moveTo(t[0].x, t[0].y);
				for (var e = 1, n = t.length; e < n; e++) this.lineTo(t[e].x, t[e].y)
			},
			moveTo : function(t, e) {
				this.currentPoint.set(t, e)
			},
			lineTo : function(t, e) {
				var n = new oi(this.currentPoint.clone(), new r(t, e));
				this.curves.push(n), this.currentPoint.set(t, e)
			},
			quadraticCurveTo : function(t, e, n, i) {
				var o = new hi(this.currentPoint.clone(), new r(t, e), new r(n, i));
				this.curves.push(o), this.currentPoint.set(n, i)
			},
			bezierCurveTo : function(t, e, n, i, o, a) {
				var s = new ui(this.currentPoint.clone(), new r(t, e), new r(n, i), new r(o, a));
				this.curves.push(s), this.currentPoint.set(o, a)
			},
			splineThru : function(t) {
				var e = [ this.currentPoint.clone() ].concat(t),
					n = new ci(e);
				this.curves.push(n), this.currentPoint.copy(t[t.length - 1])
			},
			arc : function(t, e, n, i, r, o) {
				var a = this.currentPoint.x,
					s = this.currentPoint.y;
				this.absarc(t + a, e + s, n, i, r, o)
			},
			absarc : function(t, e, n, i, r, o) {
				this.absellipse(t, e, n, n, i, r, o)
			},
			ellipse : function(t, e, n, i, r, o, a, s) {
				var c = this.currentPoint.x,
					u = this.currentPoint.y;
				this.absellipse(t + c, e + u, n, i, r, o, a, s)
			},
			absellipse : function(t, e, n, i, r, o, a, s) {
				var c = new si(t, e, n, i, r, o, a, s);
				if (0 < this.curves.length) {
					var u = c.getPoint(0);
					u.equals(this.currentPoint) || this.lineTo(u.x, u.y)
				}
				this.curves.push(c);
				var h = c.getPoint(1);
				this.currentPoint.copy(h)
			}
		});
		li.prototype = Object.assign(Object.create(ys), {
			constructor : li,
			getPointsHoles : function(t) {
				for (var e = [], n = 0, i = this.holes.length; n < i; n++) e[n] = this.holes[n].getPoints(t);
				return e
			},
			extractAllPoints : function(t) {
				return {
					shape : this.getPoints(t),
					holes : this.getPointsHoles(t)
				}
			},
			extractPoints : function(t) {
				return this.extractAllPoints(t)
			}
		}), di.prototype = ys, ys.constructor = di, pi.prototype = {
			moveTo : function(t, e) {
				this.currentPath = new di, this.subPaths.push(this.currentPath), this.currentPath.moveTo(t, e)
			},
			lineTo : function(t, e) {
				this.currentPath.lineTo(t, e)
			},
			quadraticCurveTo : function(t, e, n, i) {
				this.currentPath.quadraticCurveTo(t, e, n, i)
			},
			bezierCurveTo : function(t, e, n, i, r, o) {
				this.currentPath.bezierCurveTo(t, e, n, i, r, o)
			},
			splineThru : function(t) {
				this.currentPath.splineThru(t)
			},
			toShapes : function(t, e) {
				function n(t) {
					for (var e = [], n = 0, i = t.length; n < i; n++) {
						var r = t[n],
							o = new li;
						o.curves = r.curves, e.push(o)
					}
					return e
				}
				function i(t, e) {
					for (var n = e.length, i = !1, r = n - 1, o = 0; o < n; r = o++) {
						var a = e[r],
							s = e[o],
							c = s.x - a.x,
							u = s.y - a.y;
						if (Math.abs(u) > Number.EPSILON) {
							if (0 > u && (a = e[o], c = -c, s = e[r], u = -u), t.y < a.y || t.y > s.y) continue;
							if (t.y !== a.y) {
								var h = u * (t.x - a.x) - c * (t.y - a.y);
								if (0 == h) return !0;
								if (0 > h) continue;
								i = !i
							} else if (t.x === a.x) return !0
						} else {
							if (t.y !== a.y) continue;
							if (s.x <= t.x && t.x <= a.x || a.x <= t.x && t.x <= s.x) return !0
						}
					}
					return i
				}
				var r = hs.isClockWise,
					o = this.subPaths;
				if (0 === o.length) return [];
				if (!0 === e) return n(o);
				var a,
					s,
					c,
					u = [];
				if (1 === o.length) return s = o[0], c = new li, c.curves = s.curves, u.push(c), u;
				var h = !r(o[0].getPoints());
				h = t ? !h : h;
				var l,
					d = [],
					p = [],
					f = [],
					m = 0;
				p[m] = void 0, f[m] = [];
				for (var v = 0, g = o.length; v < g; v++) s = o[v], l = s.getPoints(), a = r(l), a = t ? !a : a, a ? (!h && p[m] && m++, p[m] = {
						s : new li,
						p : l
					}, p[m].s.curves = s.curves, h && m++, f[m] = []) : f[m].push({
						h : s,
						p : l[0]
					});
				if (!p[0]) return n(o);
				if (1 < p.length) {
					for (var y = !1, x = [], b = 0, _ = p.length; b < _; b++) d[b] = [];
					for (var b = 0, _ = p.length; b < _; b++)
						for (var w = f[b], M = 0; M < w.length; M++) {
							for (var E = w[M], S = !0, T = 0; T < p.length; T++) i(E.p, p[T].p) && (b !== T && x.push({
									froms : b,
									tos : T,
									hole : M
								}), S ? (S = !1, d[T].push(E)) : y = !0);
							S && d[b].push(E)
					}
					0 < x.length && !y && (f = d)
				}
				for (var A, v = 0, P = p.length; v < P; v++) {
					c = p[v].s, u.push(c), A = f[v];
					for (var L = 0, R = A.length; L < R; L++) c.holes.push(A[L].h)
				}
				return u
			}
		}, Object.assign(fi.prototype, {
			isFont : !0,
			generateShapes : function(t, e, n) {
				function i(t, e, i) {
					var o = r.glyphs[t] || r.glyphs["?"];
					if (o) {
						var a,
							s,
							c,
							u,
							h,
							l,
							d,
							p,
							f,
							m,
							v,
							g = new pi,
							y = [],
							x = hs.b2,
							b = hs.b3;
						if (o.o)
							for (var _ = o._cachedOutline || (o._cachedOutline = o.o.split(" ")), w = 0, M = _.length; w < M;) {
								var E = _[w++];
								switch (E) {
								case "m":
									a = _[w++] * e + i, s = _[w++] * e, g.moveTo(a, s);
									break;case "l":
									a = _[w++] * e + i, s = _[w++] * e, g.lineTo(a, s);
									break;case "q":
									if (c = _[w++] * e + i, u = _[w++] * e, d = _[w++] * e + i, p = _[w++] * e, g.quadraticCurveTo(d, p, c, u), v = y[y.length - 1]) {
										h = v.x, l = v.y;
										for (var S = 1; S <= n; S++) {
											var T = S / n;
											x(T, h, d, c), x(T, l, p, u)
										}
									}
									break;case "b":
									if (c = _[w++] * e + i, u = _[w++] * e, d = _[w++] * e + i, p = _[w++] * e, f = _[w++] * e + i, m = _[w++] * e, g.bezierCurveTo(d, p, f, m, c, u), v = y[y.length - 1]) {
										h = v.x, l = v.y;
										for (var S = 1; S <= n; S++) {
											var T = S / n;
											b(T, h, d, f, c), b(T, l, p, m, u)
										}
									}
								}
						}
						return {
							offset : o.ha * e,
							path : g
						}
					}
				}
				void 0 === e && (e = 100), void 0 === n && (n = 4);
				for (var r = this.data, o = (function(t) {
							for (var n = (t + "").split(""), o = e / r.resolution, a = 0, s = [], c = 0; c < n.length; c++) {
								var u = i(n[c], o, a);
								a += u.offset, s.push(u.path)
							}
							return s
						})(t), a = [], s = 0, c = o.length;s < c; s++) Array.prototype.push.apply(a, o[s].toShapes());
				return a
			}
		}), Object.assign(mi.prototype, {
			load : function(t, e, n, i) {
				var r = this,
					o = new En(this.manager);
				o.load(t, (function(t) {
					var n;
					try {
						n = JSON.parse(t)
					} catch (e) {
						console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), n = JSON.parse(t.substring(65, t.length - 2))
					}
					var i = r.parse(n);
					e && e(i)
				}), n, i)
			},
			parse : function(t) {
				return new fi(t)
			}
		});
		var xs,
			bs = {
				getContext : function() {
					return void 0 == xs && (xs = new (window.AudioContext || window.webkitAudioContext)), xs
				},
				setContext : function(t) {
					xs = t
				}
			};
		Object.assign(vi.prototype, {
			load : function(t, e, n, i) {
				var r = new En(this.manager);
				r.setResponseType("arraybuffer"), r.load(t, (function(t) {
					var n = bs.getContext();
					n.decodeAudioData(t, (function(t) {
						e(t)
					}))
				}), n, i)
			}
		}), gi.prototype = Object.assign(Object.create(Rn.prototype), {
			constructor : gi,
			isRectAreaLight : !0,
			copy : function(t) {
				return Rn.prototype.copy.call(this, t), this.width = t.width, this.height = t.height, this
			}
		}), Object.assign(yi.prototype, {
			update : (function() {
				var t,
					e,
					n,
					i,
					r,
					o,
					a,
					s = new l,
					c = new l;
				return function(u) {
					var h = t !== this || e !== u.focus || n !== u.fov || i !== u.aspect * this.aspect || r !== u.near || o !== u.far || a !== u.zoom;
					if (h) {
						t = this, e = u.focus, n = u.fov, i = u.aspect * this.aspect, r = u.near, o = u.far, a = u.zoom;
						var l,
							d,
							p = u.projectionMatrix.clone(),
							f = this.eyeSep / 2,
							m = f * r / e,
							v = r * Math.tan(.5 * (Ya.DEG2RAD * n)) / a;
						c.elements[12] = -f, s.elements[12] = f, l = -v * i + m, d = v * i + m, p.elements[0] = 2 * r / (d - l), p.elements[8] = (d + l) / (d - l), this.cameraL.projectionMatrix.copy(p), l = -v * i - m, d = v * i - m, p.elements[0] = 2 * r / (d - l), p.elements[8] = (d + l) / (d - l), this.cameraR.projectionMatrix.copy(p)
					}
					this.cameraL.matrixWorld.copy(u.matrixWorld).multiply(c), this.cameraR.matrixWorld.copy(u.matrixWorld).multiply(s)
				}
			})()
		}), xi.prototype = Object.create(ht.prototype), xi.prototype.constructor = xi, bi.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : bi,
			getInput : function() {
				return this.gain
			},
			removeFilter : function() {
				null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null)
			},
			getFilter : function() {
				return this.filter
			},
			setFilter : function(t) {
				null === this.filter ? this.gain.disconnect(this.context.destination) : (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)), this.filter = t, this.gain.connect(this.filter), this.filter.connect(this.context.destination)
			},
			getMasterVolume : function() {
				return this.gain.gain.value
			},
			setMasterVolume : function(t) {
				this.gain.gain.value = t
			},
			updateMatrixWorld : (function() {
				var t = new h,
					e = new u,
					n = new h,
					i = new h;
				return function(r) {
					ht.prototype.updateMatrixWorld.call(this, r);
					var o = this.context.listener,
						a = this.up;
					this.matrixWorld.decompose(t, e, n), i.set(0, 0, -1).applyQuaternion(e), o.positionX ? (o.positionX.setValueAtTime(t.x, this.context.currentTime), o.positionY.setValueAtTime(t.y, this.context.currentTime), o.positionZ.setValueAtTime(t.z, this.context.currentTime), o.forwardX.setValueAtTime(i.x, this.context.currentTime), o.forwardY.setValueAtTime(i.y, this.context.currentTime), o.forwardZ.setValueAtTime(i.z, this.context.currentTime), o.upX.setValueAtTime(a.x, this.context.currentTime), o.upY.setValueAtTime(a.y, this.context.currentTime), o.upZ.setValueAtTime(a.z, this.context.currentTime)) : (o.setPosition(t.x, t.y, t.z), o.setOrientation(i.x, i.y, i.z, a.x, a.y, a.z))
				}
			})()
		}), _i.prototype = Object.assign(Object.create(ht.prototype), {
			constructor : _i,
			getOutput : function() {
				return this.gain
			},
			setNodeSource : function(t) {
				return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = t, this.connect(), this
			},
			setBuffer : function(t) {
				return this.buffer = t, this.sourceType = "buffer", this.autoplay && this.play(), this
			},
			play : function() {
				if (!0 === this.isPlaying) return void console.warn("THREE.Audio: Audio is already playing.");
				if (!1 === this.hasPlaybackControl) return void console.warn("THREE.Audio: this Audio has no playback control.");
				var t = this.context.createBufferSource();
				return t.buffer = this.buffer, t.loop = this.loop, t.onended = this.onEnded.bind(this), t.playbackRate.setValueAtTime(this.playbackRate, this.startTime), t.start(0, this.startTime), this.isPlaying = !0, this.source = t, this.connect()
			},
			pause : function() {
				return !1 === this.hasPlaybackControl ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = this.context.currentTime, this.isPlaying = !1, this)
			},
			stop : function() {
				return !1 === this.hasPlaybackControl ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.source.stop(), this.startTime = 0, this.isPlaying = !1, this)
			},
			connect : function() {
				if (0 < this.filters.length) {
					this.source.connect(this.filters[0]);
					for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].connect(this.filters[t]);
					this.filters[this.filters.length - 1].connect(this.getOutput())
				} else this.source.connect(this.getOutput());
				return this
			},
			disconnect : function() {
				if (0 < this.filters.length) {
					this.source.disconnect(this.filters[0]);
					for (var t = 1, e = this.filters.length; t < e; t++) this.filters[t - 1].disconnect(this.filters[t]);
					this.filters[this.filters.length - 1].disconnect(this.getOutput())
				} else this.source.disconnect(this.getOutput());
				return this
			},
			getFilters : function() {
				return this.filters
			},
			setFilters : function(t) {
				return t || (t = []), !0 === this.isPlaying ? (this.disconnect(), this.filters = t, this.connect()) : this.filters = t, this
			},
			getFilter : function() {
				return this.getFilters()[0]
			},
			setFilter : function(t) {
				return this.setFilters(t ? [ t ] : [])
			},
			setPlaybackRate : function(t) {
				return !1 === this.hasPlaybackControl ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.playbackRate = t, !0 === this.isPlaying && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this)
			},
			getPlaybackRate : function() {
				return this.playbackRate
			},
			onEnded : function() {
				this.isPlaying = !1
			},
			getLoop : function() {
				return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop
			},
			setLoop : function(t) {
				return !1 === this.hasPlaybackControl ? void console.warn("THREE.Audio: this Audio has no playback control.") : (this.loop = t, !0 === this.isPlaying && (this.source.loop = this.loop), this)
			},
			getVolume : function() {
				return this.gain.gain.value
			},
			setVolume : function(t) {
				return this.gain.gain.value = t, this
			}
		}), wi.prototype = Object.assign(Object.create(_i.prototype), {
			constructor : wi,
			getOutput : function() {
				return this.panner
			},
			getRefDistance : function() {
				return this.panner.refDistance
			},
			setRefDistance : function(t) {
				this.panner.refDistance = t
			},
			getRolloffFactor : function() {
				return this.panner.rolloffFactor
			},
			setRolloffFactor : function(t) {
				this.panner.rolloffFactor = t
			},
			getDistanceModel : function() {
				return this.panner.distanceModel
			},
			setDistanceModel : function(t) {
				this.panner.distanceModel = t
			},
			getMaxDistance : function() {
				return this.panner.maxDistance
			},
			setMaxDistance : function(t) {
				this.panner.maxDistance = t
			},
			updateMatrixWorld : (function() {
				var t = new h;
				return function(e) {
					ht.prototype.updateMatrixWorld.call(this, e), t.setFromMatrixPosition(this.matrixWorld), this.panner.setPosition(t.x, t.y, t.z)
				}
			})()
		}), Object.assign(Mi.prototype, {
			getFrequencyData : function() {
				return this.analyser.getByteFrequencyData(this.data), this.data
			},
			getAverageFrequency : function() {
				for (var t = 0, e = this.getFrequencyData(), n = 0; n < e.length; n++) t += e[n];
				return t / e.length
			}
		}), Ei.prototype = {
			constructor : Ei,
			accumulate : function(t, e) {
				var n = this.buffer,
					i = this.valueSize,
					r = t * i + i,
					o = this.cumulativeWeight;
				if (0 === o) {
					for (var a = 0; a !== i; ++a) n[r + a] = n[a];
					o = e
				} else {
					o += e;
					var s = e / o;
					this._mixBufferRegion(n, r, 0, s, i)
				}
				this.cumulativeWeight = o
			},
			apply : function(t) {
				var e = this.valueSize,
					n = this.buffer,
					i = t * e + e,
					r = this.cumulativeWeight,
					o = this.binding;
				this.cumulativeWeight = 0, 1 > r && this._mixBufferRegion(n, i, 3 * e, 1 - r, e);
				for (var a = e; a !== e + e; ++a)
					if (n[a] !== n[a + e]) {
						o.setValue(n, i);break
				}
			},
			saveOriginalState : function() {
				var t = this.binding,
					e = this.buffer,
					n = this.valueSize,
					i = 3 * n;
				t.getValue(e, i);
				for (var r = n; r !== i; ++r) e[r] = e[i + r % n];
				this.cumulativeWeight = 0
			},
			restoreOriginalState : function() {
				var t = 3 * this.valueSize;
				this.binding.setValue(this.buffer, t)
			},
			_select : function(t, e, n, i, r) {
				if (.5 <= i)
					for (var o = 0; o !== r; ++o) t[e + o] = t[n + o]
			},
			_slerp : function(t, e, n, i) {
				u.slerpFlat(t, e, t, e, t, n, i)
			},
			_lerp : function(t, e, n, i, r) {
				for (var o = 0; o !== r; ++o) {
					var a = e + o;
					t[a] = t[a] * (1 - i) + t[n + o] * i
				}
			}
		}, Si.prototype = {
			constructor : Si,
			getValue : function(t, e) {
				this.bind(), this.getValue(t, e)
			},
			setValue : function(t, e) {
				this.bind(), this.setValue(t, e)
			},
			bind : function() {
				var t = this.node,
					e = this.parsedPath,
					n = e.objectName,
					i = e.propertyName,
					r = e.propertyIndex;
				if (t || (t = Si.findNode(this.rootNode, e.nodeName) || this.rootNode, this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) return void console.error("  trying to update node for track: " + this.path + " but it wasn't found.");
				if (n) {
					var o = e.objectIndex;
					switch (n) {
					case "materials":
						if (!t.material) return void console.error("  can not bind to material as node does not have a material", this);
						if (!t.material.materials) return void console.error("  can not bind to material.materials as node.material does not have a materials array", this);
						t = t.material.materials;
						break;case "bones":
						if (!t.skeleton) return void console.error("  can not bind to bones as node does not have a skeleton", this);
						t = t.skeleton.bones;
						for (var a = 0; a < t.length; a++)
							if (t[a].name === o) {
								o = a;break
						}
						break;default:
						if (void 0 === t[n]) return void console.error("  can not bind to objectName of node, undefined", this);
						t = t[n]
					}
					if (void 0 !== o) {
						if (void 0 === t[o]) return void console.error("  trying to bind to objectIndex of objectName, but is undefined:", this, t);
						t = t[o]
					}
				}
				var s = t[i];
				if (void 0 === s) {
					var c = e.nodeName;
					return void console.error("  trying to update property for track: " + c + "." + i + " but it wasn't found.", t)
				}
				var u = this.Versioning.None;
				void 0 === t.needsUpdate ? void 0 !== t.matrixWorldNeedsUpdate && (u = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject = t) : (u = this.Versioning.NeedsUpdate, this.targetObject = t);
				var h = this.BindingType.Direct;
				if (void 0 !== r) {
					if ("morphTargetInfluences" === i) {
						if (!t.geometry) return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry", this);
						if (!t.geometry.morphTargets) return void console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry.morphTargets", this);
						for (var a = 0; a < this.node.geometry.morphTargets.length; a++)
							if (t.geometry.morphTargets[a].name === r) {
								r = a;break
						}
					}
					h = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r
				} else
					void 0 !== s.fromArray && void 0 !== s.toArray ? (h = this.BindingType.HasFromToArray, this.resolvedProperty = s) : void 0 === s.length ? this.propertyName = i : (h = this.BindingType.EntireArray, this.resolvedProperty = s);
				this.getValue = this.GetterByBindingType[h], this.setValue = this.SetterByBindingTypeAndVersioning[h][u]
			},
			unbind : function() {
				this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound
			}
		}, Object.assign(Si.prototype, {
			_getValue_unavailable : function() {},
			_setValue_unavailable : function() {},
			_getValue_unbound : Si.prototype.getValue,
			_setValue_unbound : Si.prototype.setValue,
			BindingType : {
				Direct : 0,
				EntireArray : 1,
				ArrayElement : 2,
				HasFromToArray : 3
			},
			Versioning : {
				None : 0,
				NeedsUpdate : 1,
				MatrixWorldNeedsUpdate : 2
			},
			GetterByBindingType : [ function(t, e) {
				t[e] = this.node[this.propertyName]
			}, function(t, e) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) t[e++] = n[i]
			}, function(t, e) {
				t[e] = this.resolvedProperty[this.propertyIndex]
			}, function(t, e) {
				this.resolvedProperty.toArray(t, e)
			} ],
			SetterByBindingTypeAndVersioning : [ [ function(t, e) {
				this.node[this.propertyName] = t[e]
			}, function(t, e) {
				this.node[this.propertyName] = t[e], this.targetObject.needsUpdate = !0
			}, function(t, e) {
				this.node[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
			} ], [ function(t, e) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++]
			}, function(t, e) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
				this.targetObject.needsUpdate = !0
			}, function(t, e) {
				for (var n = this.resolvedProperty, i = 0, r = n.length; i !== r; ++i) n[i] = t[e++];
				this.targetObject.matrixWorldNeedsUpdate = !0
			} ], [ function(t, e) {
				this.resolvedProperty[this.propertyIndex] = t[e]
			}, function(t, e) {
				this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0
			}, function(t, e) {
				this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0
			} ], [ function(t, e) {
				this.resolvedProperty.fromArray(t, e)
			}, function(t, e) {
				this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0
			}, function(t, e) {
				this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0
			} ] ]
		}), Si.Composite = function(t, e, n) {
			var i = n || Si.parseTrackName(e);
			this._targetGroup = t, this._bindings = t.subscribe_(e, i)
		}, Si.Composite.prototype = {
			constructor : Si.Composite,
			getValue : function(t, e) {
				this.bind();
				var n = this._targetGroup.nCachedObjects_,
					i = this._bindings[n];
				void 0 !== i && i.getValue(t, e)
			},
			setValue : function(t, e) {
				for (var n = this._bindings, i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(t, e)
			},
			bind : function() {
				for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].bind()
			},
			unbind : function() {
				for (var t = this._bindings, e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e) t[e].unbind()
			}
		}, Si.create = function(t, e, n) {
			return t && t.isAnimationObjectGroup ? new Si.Composite(t, e, n) : new Si(t, e, n)
		}, Si.parseTrackName = function(t) {
			var e = /^((?:[\w-]+[\/:])*)([\w-]+)?(?:\.([\w-]+)(?:\[(.+)\])?)?\.([\w-]+)(?:\[(.+)\])?$/,
				n = e.exec(t);
			if (!n)
				throw new Error("cannot parse trackName at all: " + t);
			var i = {
				nodeName : n[2],
				objectName : n[3],
				objectIndex : n[4],
				propertyName : n[5],
				propertyIndex : n[6]
			};
			if (null === i.propertyName || 0 === i.propertyName.length)
				throw new Error("can not parse propertyName from trackName: " + t);
			return i
		}, Si.findNode = function(t, e) {
			if (!e || "" === e || "root" === e || "." === e || -1 === e || e === t.name || e === t.uuid) return t;
			if (t.skeleton) {
				var n = function(t) {
						for (var n = 0; n < t.bones.length; n++) {
							var i = t.bones[n];
							if (i.name === e) return i
						}
						return null
					},
					i = n(t.skeleton);
				if (i) return i
			}
			if (t.children) {
				var r = function(t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							if (i.name === e || i.uuid === e) return i;
							var o = r(i.children);
							if (o) return o
						}
						return null
					},
					o = r(t.children);
				if (o) return o
			}
			return null
		}, Ti.prototype = {
			constructor : Ti,
			isAnimationObjectGroup : !0,
			add : function() {
				for (var t = this._objects, e = t.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._paths, o = this._parsedPaths, a = this._bindings, s = a.length, c = 0, u = arguments.length; c !== u; ++c) {
					var h = arguments[c],
						l = h.uuid,
						d = i[l],
						p = void 0;
					if (void 0 === d) {
						d = e++, i[l] = d, t.push(h);
						for (var f = 0, m = s; f !== m; ++f) a[f].push(new Si(h, r[f], o[f]))
					} else if (d < n) {
						p = t[d];
						var v = --n,
							g = t[v];
						i[g.uuid] = d, t[d] = g, i[l] = v, t[v] = h;
						for (var f = 0, m = s; f !== m; ++f) {
							var y = a[f],
								x = y[v],
								b = y[d];
							y[d] = x, void 0 === b && (b = new Si(h, r[f], o[f])), y[v] = b
						}
					} else t[d] !== p && console.error("Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes...")
				}
				this.nCachedObjects_ = n
			},
			remove : function() {
				for (var t = this._objects, e = this.nCachedObjects_, n = this._indicesByUUID, i = this._bindings, r = i.length, o = 0, a = arguments.length; o !== a; ++o) {
					var s = arguments[o],
						c = s.uuid,
						u = n[c];
					if (void 0 !== u && u >= e) {
						var h = e++,
							l = t[h];
						n[l.uuid] = u, t[u] = l, n[c] = h, t[h] = s;
						for (var d = 0; d !== r; ++d) {
							var p = i[d],
								f = p[h],
								m = p[u];
							p[u] = f, p[h] = m
						}
					}
				}
				this.nCachedObjects_ = e
			},
			uncache : function() {
				for (var t = this._objects, e = t.length, n = this.nCachedObjects_, i = this._indicesByUUID, r = this._bindings, o = r.length, a = 0, s = arguments.length; a !== s; ++a) {
					var c = arguments[a],
						u = c.uuid,
						h = i[u];
					if (void 0 !== h)
						if (
							delete i[u]
							, h < n) {
							var l = --n,
								d = t[l],
								p = --e,
								f = t[p];
							i[d.uuid] = h, t[h] = d, i[f.uuid] = l, t[l] = f, t.pop();
							for (var m = 0, v = o; m !== v; ++m) {
								var g = r[m],
									y = g[l],
									x = g[p];
								g[h] = y, g[l] = x, g.pop()
							}
						} else {
							var p = --e,
								f = t[p];
							i[f.uuid] = h, t[h] = f, t.pop();
							for (var m = 0, v = o; m !== v; ++m) {
								var g = r[m];
								g[h] = g[p], g.pop()
							}
					}
				}
				this.nCachedObjects_ = n
			},
			subscribe_ : function(t, e) {
				var n = this._bindingsIndicesByPath,
					i = n[t],
					r = this._bindings;
				if (void 0 !== i) return r[i];
				var o = this._paths,
					a = this._parsedPaths,
					s = this._objects,
					c = s.length,
					u = this.nCachedObjects_,
					h = Array(c);
				i = r.length, n[t] = i, o.push(t), a.push(e), r.push(h);
				for (var l = u, d = s.length; l !== d; ++l) {
					var p = s[l];
					h[l] = new Si(p, t, e)
				}
				return h
			},
			unsubscribe_ : function(t) {
				var e = this._bindingsIndicesByPath,
					n = e[t];
				if (void 0 !== n) {
					var i = this._paths,
						r = this._parsedPaths,
						o = this._bindings,
						a = o.length - 1,
						s = o[a],
						c = t[a];
					e[c] = n, o[n] = s, o.pop(), r[n] = r[a], r.pop(), i[n] = i[a], i.pop()
				}
			}
		}, Ai.prototype = {
			constructor : Ai,
			play : function() {
				return this._mixer._activateAction(this), this
			},
			stop : function() {
				return this._mixer._deactivateAction(this), this.reset()
			},
			reset : function() {
				return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping()
			},
			isRunning : function() {
				return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
			},
			isScheduled : function() {
				return this._mixer._isActiveAction(this)
			},
			startAt : function(t) {
				return this._startTime = t, this
			},
			setLoop : function(t, e) {
				return this.loop = t, this.repetitions = e, this
			},
			setEffectiveWeight : function(t) {
				return this.weight = t, this._effectiveWeight = this.enabled ? t : 0, this.stopFading()
			},
			getEffectiveWeight : function() {
				return this._effectiveWeight
			},
			fadeIn : function(t) {
				return this._scheduleFading(t, 0, 1)
			},
			fadeOut : function(t) {
				return this._scheduleFading(t, 1, 0)
			},
			crossFadeFrom : function(t, e, n) {
				if (t.fadeOut(e), this.fadeIn(e), n) {
					var i = this._clip.duration,
						r = t._clip.duration;
					t.warp(1, r / i, e), this.warp(i / r, 1, e)
				}
				return this
			},
			crossFadeTo : function(t, e, n) {
				return t.crossFadeFrom(this, e, n)
			},
			stopFading : function() {
				var t = this._weightInterpolant;
				return null !== t && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
			},
			setEffectiveTimeScale : function(t) {
				return this.timeScale = t, this._effectiveTimeScale = this.paused ? 0 : t, this.stopWarping()
			},
			getEffectiveTimeScale : function() {
				return this._effectiveTimeScale
			},
			setDuration : function(t) {
				return this.timeScale = this._clip.duration / t, this.stopWarping()
			},
			syncWith : function(t) {
				return this.time = t.time, this.timeScale = t.timeScale, this.stopWarping()
			},
			halt : function(t) {
				return this.warp(this._effectiveTimeScale, 0, t)
			},
			warp : function(t, e, n) {
				var i = this._mixer,
					r = i.time,
					o = this._timeScaleInterpolant,
					a = this.timeScale;
				null === o && (o = i._lendControlInterpolant(), this._timeScaleInterpolant = o);
				var s = o.parameterPositions,
					c = o.sampleValues;
				return s[0] = r, s[1] = r + n, c[0] = t / a, c[1] = e / a, this
			},
			stopWarping : function() {
				var t = this._timeScaleInterpolant;
				return null !== t && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(t)), this
			},
			getMixer : function() {
				return this._mixer
			},
			getClip : function() {
				return this._clip
			},
			getRoot : function() {
				return this._localRoot || this._mixer._root
			},
			_update : function(t, e, n, i) {
				var r = this._startTime;
				if (null !== r) {
					var o = (t - r) * n;
					if (0 > o || 0 === n) return;
					this._startTime = null, e = n * o
				}
				e *= this._updateTimeScale(t);
				var a = this._updateTime(e),
					s = this._updateWeight(t);
				if (0 < s)
					for (var c = this._interpolants, u = this._propertyBindings, h = 0, l = c.length; h !== l; ++h) c[h].evaluate(a), u[h].accumulate(i, s)
			},
			_updateWeight : function(t) {
				var e = 0;
				if (this.enabled) {
					e = this.weight;
					var n = this._weightInterpolant;
					if (null !== n) {
						var i = n.evaluate(t)[0];
						e *= i, t > n.parameterPositions[1] && (this.stopFading(), 0 === i && (this.enabled = !1))
					}
				}
				return this._effectiveWeight = e, e
			},
			_updateTimeScale : function(t) {
				var e = 0;
				if (!this.paused) {
					e = this.timeScale;
					var n = this._timeScaleInterpolant;
					if (null !== n) {
						var i = n.evaluate(t)[0];
						e *= i, t > n.parameterPositions[1] && (this.stopWarping(), 0 == e ? this.paused = !0 : this.timeScale = e)
					}
				}
				return this._effectiveTimeScale = e, e
			},
			_updateTime : function(t) {
				var e = this.time + t;
				if (0 === t) return e;
				var n = this._clip.duration,
					i = this.loop,
					r = this._loopCount;
				if (i === Aa) {
					-1 === r && (this._loopCount = 0, this._setEndings(!0, !0, !1));t:{
					if (e >= n)
						e = n;else {
						if (!(0 > e)) break t;
						e = 0
					}
					this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this._mixer.dispatchEvent({
						type : "finished",
						action : this,
						direction : 0 > t ? -1 : 1
					})}
				} else {
					var o = i === La;
					if (-1 === r && (0 <= t ? (r = 0, this._setEndings(!0, 0 === this.repetitions, o)) : this._setEndings(0 === this.repetitions, !0, o)), e >= n || 0 > e) {
						var a = Math.floor(e / n);
						e -= n * a, r += Math.abs(a);
						var s = this.repetitions - r;
						if (0 > s) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, e = 0 < t ? n : 0, this._mixer.dispatchEvent({
								type : "finished",
								action : this,
								direction : 0 < t ? 1 : -1
							});else {
							if (0 == s) {
								var c = 0 > t;
								this._setEndings(c, !c, o)
							} else this._setEndings(!1, !1, o);
							this._loopCount = r, this._mixer.dispatchEvent({
								type : "loop",
								action : this,
								loopDelta : a
							})
						}
					}
					if (o && 1 == (1 & r)) return this.time = e, n - e
				}
				return this.time = e, e
			},
			_setEndings : function(t, e, n) {
				var i = this._interpolantSettings;
				n ? (i.endingStart = Ua, i.endingEnd = Ua) : (i.endingStart = t ? this.zeroSlopeAtStart ? Ua : Oa : Da, i.endingEnd = e ? this.zeroSlopeAtEnd ? Ua : Oa : Da)
			},
			_scheduleFading : function(t, e, n) {
				var i = this._mixer,
					r = i.time,
					o = this._weightInterpolant;
				null === o && (o = i._lendControlInterpolant(), this._weightInterpolant = o);
				var a = o.parameterPositions,
					s = o.sampleValues;
				return a[0] = r, s[0] = e, a[1] = r + t, s[1] = n, this
			}
		}, Object.assign(Pi.prototype, i.prototype, {
			clipAction : function(t, e) {
				var n = e || this._root,
					i = n.uuid,
					r = "string" == typeof t ? Qn.findByName(n, t) : t,
					o = null === r ? t : r.uuid,
					a = this._actionsByClip[o],
					s = null;
				if (void 0 !== a) {
					var c = a.actionByRoot[i];
					if (void 0 !== c) return c;
					s = a.knownActions[0], null === r && (r = s._clip)
				}
				if (null === r) return null;
				var u = new Ai(this, r, e);
				return this._bindAction(u, s), this._addInactiveAction(u, o, i), u
			},
			existingAction : function(t, e) {
				var n = e || this._root,
					i = n.uuid,
					r = "string" == typeof t ? Qn.findByName(n, t) : t,
					o = r ? r.uuid : t,
					a = this._actionsByClip[o];
				return void 0 === a ? null : a.actionByRoot[i] || null
			},
			stopAllAction : function() {
				var t = this._actions,
					e = this._nActiveActions,
					n = this._bindings,
					i = this._nActiveBindings;
				this._nActiveActions = 0, this._nActiveBindings = 0;
				for (var r = 0; r !== e; ++r) t[r].reset();
				for (var r = 0; r !== i; ++r) n[r].useCount = 0;
				return this
			},
			update : function(t) {
				t *= this.timeScale;
				for (var e = this._actions, n = this._nActiveActions, i = this.time += t, r = Math.sign(t), o = this._accuIndex ^= 1, a = 0; a !== n; ++a) {
					var s = e[a];
					s.enabled && s._update(i, t, r, o);
				}
				for (var c = this._bindings, u = this._nActiveBindings, a = 0; a !== u; ++a) c[a].apply(o);
				return this
			},
			getRoot : function() {
				return this._root
			},
			uncacheClip : function(t) {
				var e = this._actions,
					n = t.uuid,
					i = this._actionsByClip,
					r = i[n];
				if (void 0 !== r) {
					for (var o = r.knownActions, a = 0, s = o.length; a !== s; ++a) {
						var c = o[a];
						this._deactivateAction(c);var u = c._cacheIndex,
							h = e[e.length - 1];
						c._cacheIndex = null, c._byClipCacheIndex = null, h._cacheIndex = u, e[u] = h, e.pop(), this._removeInactiveBindingsForAction(c)
					}
					delete i[n]
				}
			},
			uncacheRoot : function(t) {
				var e = t.uuid,
					n = this._actionsByClip;
				for (var i in n) {
					var r = n[i].actionByRoot,
						o = r[e];
					void 0 !== o && (this._deactivateAction(o), this._removeInactiveAction(o))
				}
				var a = this._bindingsByRootAndName,
					s = a[e];
				if (void 0 !== s)
					for (var c in s) {
						var u = s[c];
						u.restoreOriginalState(), this._removeInactiveBinding(u)
				}
			},
			uncacheAction : function(t, e) {
				var n = this.existingAction(t, e);
				null !== n && (this._deactivateAction(n), this._removeInactiveAction(n))
			}
		}), Object.assign(Pi.prototype, {
			_bindAction : function(t, e) {
				var n = t._localRoot || this._root,
					i = t._clip.tracks,
					r = i.length,
					o = t._propertyBindings,
					a = t._interpolants,
					s = n.uuid,
					c = this._bindingsByRootAndName,
					u = c[s];
				void 0 === u && (u = {}, c[s] = u);
				for (var h = 0; h !== r; ++h) {
					var l = i[h],
						d = l.name,
						p = u[d];
					if (void 0 !== p)
						o[h] = p;else {
						if (p = o[h], void 0 !== p) {
							null === p._cacheIndex && (++p.referenceCount, this._addInactiveBinding(p, s, d));continue
						}
						var f = e && e._propertyBindings[h].binding.parsedPath;
						p = new Ei(Si.create(n, d, f), l.ValueTypeName, l.getValueSize()), ++p.referenceCount, this._addInactiveBinding(p, s, d), o[h] = p
					}
					a[h].resultBuffer = p.buffer
				}
			},
			_activateAction : function(t) {
				if (!this._isActiveAction(t)) {
					if (null === t._cacheIndex) {
						var e = (t._localRoot || this._root).uuid,
							n = t._clip.uuid,
							i = this._actionsByClip[n];
						this._bindAction(t, i && i.knownActions[0]), this._addInactiveAction(t, n, e)
					}
					for (var r = t._propertyBindings, o = 0, a = r.length; o !== a; ++o) {
						var s = r[o];
						0 == s.useCount++ && (this._lendBinding(s), s.saveOriginalState())
					}
					this._lendAction(t)
				}
			},
			_deactivateAction : function(t) {
				if (this._isActiveAction(t)) {
					for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
						var r = e[n];
						0 == --r.useCount && (r.restoreOriginalState(), this._takeBackBinding(r))
					}
					this._takeBackAction(t)
				}
			},
			_initMemoryManager : function() {
				this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
				var t = this;
				this.stats = {
					actions : {
						get total() {
							return t._actions.length
						},
						get inUse() {
							return t._nActiveActions
						}
					},
					bindings : {
						get total() {
							return t._bindings.length
						},
						get inUse() {
							return t._nActiveBindings
						}
					},
					controlInterpolants : {
						get total() {
							return t._controlInterpolants.length
						},
						get inUse() {
							return t._nActiveControlInterpolants
						}
					}
				}
			},
			_isActiveAction : function(t) {
				var e = t._cacheIndex;
				return null !== e && e < this._nActiveActions
			},
			_addInactiveAction : function(t, e, n) {
				var i = this._actions,
					r = this._actionsByClip,
					o = r[e];
				if (void 0 === o) o = {
						knownActions : [ t ],
						actionByRoot : {}
					}, t._byClipCacheIndex = 0, r[e] = o;else {
					var a = o.knownActions;
					t._byClipCacheIndex = a.length, a.push(t)
				}
				t._cacheIndex = i.length, i.push(t), o.actionByRoot[n] = t
			},
			_removeInactiveAction : function(t) {
				var e = this._actions,
					n = e[e.length - 1],
					i = t._cacheIndex;
				n._cacheIndex = i, e[i] = n, e.pop(), t._cacheIndex = null;
				var r = t._clip.uuid,
					o = this._actionsByClip,
					a = o[r],
					s = a.knownActions,
					c = s[s.length - 1],
					u = t._byClipCacheIndex;
				c._byClipCacheIndex = u, s[u] = c, s.pop(), t._byClipCacheIndex = null;
				var h = a.actionByRoot,
					l = (e._localRoot || this._root).uuid;
				delete h[l]
				, 0 === s.length &&
				delete o[r]
				, this._removeInactiveBindingsForAction(t)
			},
			_removeInactiveBindingsForAction : function(t) {
				for (var e = t._propertyBindings, n = 0, i = e.length; n !== i; ++n) {
					var r = e[n];
					0 == --r.referenceCount && this._removeInactiveBinding(r)
				}
			},
			_lendAction : function(t) {
				var e = this._actions,
					n = t._cacheIndex,
					i = this._nActiveActions++,
					r = e[i];
				t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
			},
			_takeBackAction : function(t) {
				var e = this._actions,
					n = t._cacheIndex,
					i = --this._nActiveActions,
					r = e[i];
				t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
			},
			_addInactiveBinding : function(t, e, n) {
				var i = this._bindingsByRootAndName,
					r = i[e],
					o = this._bindings;
				void 0 === r && (r = {}, i[e] = r), r[n] = t, t._cacheIndex = o.length, o.push(t)
			},
			_removeInactiveBinding : function(t) {
				var e = this._bindings,
					n = t.binding,
					i = n.rootNode.uuid,
					r = n.path,
					o = this._bindingsByRootAndName,
					a = o[i],
					s = e[e.length - 1],
					c = t._cacheIndex;
				s._cacheIndex = c, e[c] = s, e.pop(),
				delete a[r];
				t:{
				for (var u in a) break t;
				delete o[i]
				}
			},
			_lendBinding : function(t) {
				var e = this._bindings,
					n = t._cacheIndex,
					i = this._nActiveBindings++,
					r = e[i];
				t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
			},
			_takeBackBinding : function(t) {
				var e = this._bindings,
					n = t._cacheIndex,
					i = --this._nActiveBindings,
					r = e[i];
				t._cacheIndex = i, e[i] = t, r._cacheIndex = n, e[n] = r
			},
			_lendControlInterpolant : function() {
				var t = this._controlInterpolants,
					e = this._nActiveControlInterpolants++,
					n = t[e];
				return void 0 === n && (n = new kn(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), n.__cacheIndex = e, t[e] = n), n
			},
			_takeBackControlInterpolant : function(t) {
				var e = this._controlInterpolants,
					n = t.__cacheIndex,
					i = --this._nActiveControlInterpolants,
					r = e[i];
				t.__cacheIndex = i, e[i] = t, r.__cacheIndex = n, e[n] = r
			},
			_controlInterpolantsResultBuffer : new Float32Array(1)
		}), Li.prototype.clone = function() {
			return new Li(void 0 === this.value.clone ? this.value : this.value.clone())
		}, Ri.prototype = Object.create(Pt.prototype), Ri.prototype.constructor = Ri, Ri.prototype.isInstancedBufferGeometry = !0, Ri.prototype.addGroup = function(t, e, n) {
			this.groups.push({
				start : t,
				count : e,
				materialIndex : n
			})
		}, Ri.prototype.copy = function(t) {
			var e = t.index;
			null !== e && this.setIndex(e.clone());
			var n = t.attributes;
			for (var i in n) {
				var r = n[i];
				this.addAttribute(i, r.clone())
			}
			for (var o = t.groups, a = 0, s = o.length; a < s; a++) {
				var c = o[a];
				this.addGroup(c.start, c.count, c.materialIndex)
			}
			return this
		}, Ci.prototype = {
			constructor : Ci,
			isInterleavedBufferAttribute : !0,
			get count() {
				return this.data.count
			},
			get array() {
				return this.data.array
			},
			setX : function(t, e) {
				return this.data.array[t * this.data.stride + this.offset] = e, this
			},
			setY : function(t, e) {
				return this.data.array[t * this.data.stride + this.offset + 1] = e, this
			},
			setZ : function(t, e) {
				return this.data.array[t * this.data.stride + this.offset + 2] = e, this
			},
			setW : function(t, e) {
				return this.data.array[t * this.data.stride + this.offset + 3] = e, this
			},
			getX : function(t) {
				return this.data.array[t * this.data.stride + this.offset]
			},
			getY : function(t) {
				return this.data.array[t * this.data.stride + this.offset + 1]
			},
			getZ : function(t) {
				return this.data.array[t * this.data.stride + this.offset + 2]
			},
			getW : function(t) {
				return this.data.array[t * this.data.stride + this.offset + 3]
			},
			setXY : function(t, e, n) {
				return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this
			},
			setXYZ : function(t, e, n, i) {
				return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this
			},
			setXYZW : function(t, e, n, i, r) {
				return t = t * this.data.stride + this.offset, this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = i, this.data.array[t + 3] = r, this
			}
		}, Ii.prototype = {
			constructor : Ii,
			isInterleavedBuffer : !0,
			set needsUpdate(t) {
				!0 === t && this.version++
			},
			setArray : function(t) {
				if (Array.isArray(t))
					throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
				this.count = void 0 === t ? 0 : t.length / this.stride, this.array = t
			},
			setDynamic : function(t) {
				return this.dynamic = t, this
			},
			copy : function(t) {
				return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.dynamic = t.dynamic, this
			},
			copyAt : function(t, e, n) {
				t *= this.stride, n *= e.stride;
				for (var i = 0, r = this.stride; i < r; i++) this.array[t + i] = e.array[n + i];
				return this
			},
			set : function(t, e) {
				return void 0 === e && (e = 0), this.array.set(t, e), this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			onUpload : function(t) {
				return this.onUploadCallback = t, this
			}
		}, Oi.prototype = Object.create(Ii.prototype), Oi.prototype.constructor = Oi, Oi.prototype.isInstancedInterleavedBuffer = !0, Oi.prototype.copy = function(t) {
			return Ii.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
		}, Ui.prototype = Object.create(mt.prototype), Ui.prototype.constructor = Ui, Ui.prototype.isInstancedBufferAttribute = !0, Ui.prototype.copy = function(t) {
			return mt.prototype.copy.call(this, t), this.meshPerAttribute = t.meshPerAttribute, this
		}, Di.prototype = {
			constructor : Di,
			linePrecision : 1,
			set : function(t, e) {
				this.ray.set(t, e)
			},
			setFromCamera : function(t, e) {
				e && e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, .5).unproject(e).sub(this.ray.origin).normalize()) : e && e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
			},
			intersectObject : function(t, e) {
				var n = [];
				return Ni(t, this, n, e), n.sort(Bi), n
			},
			intersectObjects : function(t, e) {
				var n = [];
				if (!1 === Array.isArray(t)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), n;
				for (var i = 0, r = t.length; i < r; i++) Ni(t[i], this, n, e);
				return n.sort(Bi), n
			}
		}, Fi.prototype = {
			constructor : Fi,
			start : function() {
				this.startTime = (performance || Date).now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0
			},
			stop : function() {
				this.getElapsedTime(), this.running = !1
			},
			getElapsedTime : function() {
				return this.getDelta(), this.elapsedTime
			},
			getDelta : function() {
				var t = 0;
				if (this.autoStart && !this.running && this.start(), this.running) {
					var e = (performance || Date).now();
					t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t
				}
				return t
			}
		}, Gi.prototype = {
			constructor : Gi,
			set : function(t, e, n) {
				return this.radius = t, this.phi = e, this.theta = n, this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this
			},
			makeSafe : function() {
				var t = 1e-6;
				return this.phi = Math.max(t, Math.min(Math.PI - t, this.phi)), this
			},
			setFromVector3 : function(t) {
				return this.radius = t.length(), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t.x, t.z), this.phi = Math.acos(Ya.clamp(t.y / this.radius, -1, 1))), this
			}
		}, ki.prototype = {
			constructor : ki,
			set : function(t, e, n) {
				return this.radius = t, this.theta = e, this.y = n, this
			},
			clone : function() {
				return (new this.constructor).copy(this)
			},
			copy : function(t) {
				return this.radius = t.radius, this.theta = t.theta, this.y = t.y, this
			},
			setFromVector3 : function(t) {
				return this.radius = Math.sqrt(t.x * t.x + t.z * t.z), this.theta = Math.atan2(t.x, t.z), this.y = t.y, this
			}
		}, Hi.prototype = Object.create(Lt.prototype), Hi.prototype.constructor = Hi, Hi.prototype.createAnimation = function(t, e, n, i) {
			var r = {
				start : e,
				end : n,
				length : n - e + 1,
				fps : i,
				duration : (n - e) / i,
				lastFrame : 0,
				currentFrame : 0,
				active : !1,
				time : 0,
				direction : 1,
				weight : 1,
				directionBackwards : !1,
				mirroredLoop : !1
			};
			this.animationsMap[t] = r, this.animationsList.push(r)
		}, Hi.prototype.autoCreateAnimations = function(t) {
			for (var e, n = /([a-z]+)_?(\d+)/i, i = {}, r = this.geometry, o = 0, a = r.morphTargets.length; o < a; o++) {
				var s = r.morphTargets[o],
					c = s.name.match(n);
				if (c && 1 < c.length) {
					var u = c[1];
					i[u] || (i[u] = {
						start : 1 / 0,
						end : -(1 / 0)
					});
					var h = i[u];
					o < h.start && (h.start = o), o > h.end && (h.end = o), e || (e = u)
				}
			}
			for (var u in i) {
				var h = i[u];
				this.createAnimation(u, h.start, h.end, t)
			}
			this.firstAnimation = e
		}, Hi.prototype.setAnimationDirectionForward = function(t) {
			var e = this.animationsMap[t];
			e && (e.direction = 1, e.directionBackwards = !1)
		}, Hi.prototype.setAnimationDirectionBackward = function(t) {
			var e = this.animationsMap[t];
			e && (e.direction = -1, e.directionBackwards = !0)
		}, Hi.prototype.setAnimationFPS = function(t, e) {
			var n = this.animationsMap[t];
			n && (n.fps = e, n.duration = (n.end - n.start) / n.fps)
		}, Hi.prototype.setAnimationDuration = function(t, e) {
			var n = this.animationsMap[t];
			n && (n.duration = e, n.fps = (n.end - n.start) / n.duration)
		}, Hi.prototype.setAnimationWeight = function(t, e) {
			var n = this.animationsMap[t];
			n && (n.weight = e)
		}, Hi.prototype.setAnimationTime = function(t, e) {
			var n = this.animationsMap[t];
			n && (n.time = e)
		}, Hi.prototype.getAnimationTime = function(t) {
			var e = 0,
				n = this.animationsMap[t];
			return n && (e = n.time), e
		}, Hi.prototype.getAnimationDuration = function(t) {
			var e = -1,
				n = this.animationsMap[t];
			return n && (e = n.duration), e
		}, Hi.prototype.playAnimation = function(t) {
			var e = this.animationsMap[t];
			e ? (e.time = 0, e.active = !0) : console.warn("THREE.MorphBlendMesh: animation[" + t + "] undefined in .playAnimation()")
		}, Hi.prototype.stopAnimation = function(t) {
			var e = this.animationsMap[t];
			e && (e.active = !1)
		}, Hi.prototype.update = function(t) {
			for (var e = 0, n = this.animationsList.length; e < n; e++) {
				var i = this.animationsList[e];
				if (i.active) {
					var r = i.duration / i.length;
					i.time += i.direction * t, i.mirroredLoop ? (i.time > i.duration || 0 > i.time) && (i.direction *= -1, i.time > i.duration && (i.time = i.duration, i.directionBackwards = !0), 0 > i.time && (i.time = 0, i.directionBackwards = !1)) : (i.time = i.time % i.duration, 0 > i.time && (i.time += i.duration));
					var o = i.start + Ya.clamp(Math.floor(i.time / r), 0, i.length - 1),
						a = i.weight;
					o !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0, this.morphTargetInfluences[i.currentFrame] = 1 * a, this.morphTargetInfluences[o] = 0, i.lastFrame = i.currentFrame, i.currentFrame = o);
					var s = i.time % r / r;
					i.directionBackwards && (s = 1 - s), i.currentFrame === i.lastFrame ? this.morphTargetInfluences[i.currentFrame] = a : (this.morphTargetInfluences[i.currentFrame] = s * a, this.morphTargetInfluences[i.lastFrame] = (1 - s) * a)
				}
			}
		}, ji.prototype = Object.create(ht.prototype), ji.prototype.constructor = ji, ji.prototype.isImmediateRenderObject = !0, Vi.prototype = Object.create(be.prototype), Vi.prototype.constructor = Vi, Vi.prototype.update = (function() {
			var t = new h,
				e = new h,
				n = new it;
			return function() {
				var i = [ "a", "b", "c" ];
				this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
				var r = this.object.matrixWorld,
					o = this.geometry.attributes.position,
					a = this.object.geometry;
				if (a && a.isGeometry)
					for (var s = a.vertices, c = a.faces, u = 0, h = 0, l = c.length; h < l; h++)
						for (var d = c[h], p = 0, f = d.vertexNormals.length; p < f; p++) {
							var m = s[d[i[p]]],
								v = d.vertexNormals[p];
							t.copy(m).applyMatrix4(r), e.copy(v).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(u, t.x, t.y, t.z), u += 1, o.setXYZ(u, e.x, e.y, e.z), u += 1
				}
				else if (a && a.isBufferGeometry)
					for (var g = a.attributes.position, y = a.attributes.normal, u = 0, p = 0, f = g.count; p < f; p++) t.set(g.getX(p), g.getY(p), g.getZ(p)).applyMatrix4(r), e.set(y.getX(p), y.getY(p), y.getZ(p)), e.applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), o.setXYZ(u, t.x, t.y, t.z), u += 1, o.setXYZ(u, e.x, e.y, e.z), u += 1;
				return o.needsUpdate = !0, this
			}
		})(), Wi.prototype = Object.create(ht.prototype), Wi.prototype.constructor = Wi, Wi.prototype.dispose = function() {
			this.cone.geometry.dispose(), this.cone.material.dispose()
		}, Wi.prototype.update = (function() {
			var t = new h,
				e = new h;
			return function() {
				var n = this.light.distance ? this.light.distance : 1e3,
					i = n * Math.tan(this.light.angle);
				this.cone.scale.set(i, i, n), t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(e.sub(t)), this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
			}
		})(), Xi.prototype = Object.create(be.prototype), Xi.prototype.constructor = Xi, Xi.prototype.getBoneList = function(t) {
			var e = [];
			t && t.isBone && e.push(t);
			for (var n = 0; n < t.children.length; n++) e.push.apply(e, this.getBoneList(t.children[n]));
			return e
		}, Xi.prototype.update = (function() {
			var t = new h,
				e = new l,
				n = new l;
			return function() {
				var i = this.geometry,
					r = i.getAttribute("position");
				n.getInverse(this.root.matrixWorld);
				for (var o = 0, a = 0; o < this.bones.length; o++) {
					var s = this.bones[o];
					s.parent && s.parent.isBone && (e.multiplyMatrices(n, s.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(a, t.x, t.y, t.z), e.multiplyMatrices(n, s.parent.matrixWorld), t.setFromMatrixPosition(e), r.setXYZ(a + 1, t.x, t.y, t.z), a += 2)
				}
				i.getAttribute("position").needsUpdate = !0
			}
		})(), qi.prototype = Object.create(Lt.prototype), qi.prototype.constructor = qi, qi.prototype.dispose = function() {
			this.geometry.dispose(), this.material.dispose()
		}, qi.prototype.update = function() {
			this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
		}, Yi.prototype = Object.create(ht.prototype), Yi.prototype.constructor = Yi, Yi.prototype.dispose = function() {
			this.children[0].geometry.dispose(), this.children[0].material.dispose(), this.children[1].geometry.dispose(), this.children[1].material.dispose()
		}, Yi.prototype.update = (function() {
			var t = new h,
				e = new h;
			return function() {
				var n = this.children[0],
					i = this.children[1];
				if (this.light.target) {
					t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld);
					var r = e.clone().sub(t);
					n.lookAt(r), i.lookAt(r)
				}
				n.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), i.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
				var o = .5 * this.light.width,
					a = .5 * this.light.height,
					s = n.geometry.getAttribute("position"),
					c = s.array;
				c[0] = o, c[1] = -a, c[2] = 0, c[3] = o, c[4] = a, c[5] = 0, c[6] = -o, c[7] = a, c[8] = 0, c[9] = -o, c[10] = a, c[11] = 0, c[12] = -o, c[13] = -a, c[14] = 0, c[15] = o, c[16] = -a, c[17] = 0, s.needsUpdate = !0
			}
		})(), Zi.prototype = Object.create(ht.prototype), Zi.prototype.constructor = Zi, Zi.prototype.dispose = function() {
			this.children[0].geometry.dispose(), this.children[0].material.dispose()
		}, Zi.prototype.update = (function() {
			var t = new h,
				e = new q,
				n = new q;
			return function() {
				var i = this.children[0],
					r = i.geometry.getAttribute("color");
				e.copy(this.light.color).multiplyScalar(this.light.intensity), n.copy(this.light.groundColor).multiplyScalar(this.light.intensity);
				for (var o = 0, a = r.count; o < a; o++) {
					var s = o < a / 2 ? e : n;
					r.setXYZ(o, s.r, s.g, s.b)
				}
				i.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate()), r.needsUpdate = !0
			}
		})(), Ji.prototype = Object.create(be.prototype), Ji.prototype.constructor = Ji, Ki.prototype = Object.create(be.prototype), Ki.prototype.constructor = Ki, Qi.prototype = Object.create(be.prototype), Qi.prototype.constructor = Qi, Qi.prototype.update = (function() {
			var t = new h,
				e = new h,
				n = new it;
			return function() {
				this.object.updateMatrixWorld(!0), n.getNormalMatrix(this.object.matrixWorld);
				for (var i = this.object.matrixWorld, r = this.geometry.attributes.position, o = this.object.geometry, a = o.vertices, s = o.faces, c = 0, u = 0, h = s.length; u < h; u++) {
					var l = s[u],
						d = l.normal;
					t.copy(a[l.a]).add(a[l.b]).add(a[l.c]).divideScalar(3).applyMatrix4(i), e.copy(d).applyMatrix3(n).normalize().multiplyScalar(this.size).add(t), r.setXYZ(c, t.x, t.y, t.z), c += 1, r.setXYZ(c, e.x, e.y, e.z), c += 1
				}
				return r.needsUpdate = !0, this
			}
		})(), $i.prototype = Object.create(ht.prototype), $i.prototype.constructor = $i, $i.prototype.dispose = function() {
			var t = this.children[0],
				e = this.children[1];
			t.geometry.dispose(), t.material.dispose(), e.geometry.dispose(), e.material.dispose()
		}, $i.prototype.update = (function() {
			var t = new h,
				e = new h,
				n = new h;
			return function() {
				t.setFromMatrixPosition(this.light.matrixWorld), e.setFromMatrixPosition(this.light.target.matrixWorld), n.subVectors(e, t);
				var i = this.children[0],
					r = this.children[1];
				i.lookAt(n), i.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), r.lookAt(n), r.scale.z = n.length()
			}
		})(), tr.prototype = Object.create(be.prototype), tr.prototype.constructor = tr, tr.prototype.update = (function() {
			function t(t, o, a, s) {
				i.set(o, a, s).unproject(r);var c = n[t];
				if (void 0 !== c)
					for (var u = e.getAttribute("position"), h = 0, l = c.length; h < l; h++) u.setXYZ(c[h], i.x, i.y, i.z)
			}
			var e,
				n,
				i = new h,
				r = new It;
			return function() {
				e = this.geometry, n = this.pointMap;
				var i = 1,
					o = 1;
				r.projectionMatrix.copy(this.camera.projectionMatrix), t("c", 0, 0, -1), t("t", 0, 0, 1), t("n1", -i, -o, -1), t("n2", i, -o, -1), t("n3", -i, o, -1), t("n4", i, o, -1), t("f1", -i, -o, 1), t("f2", i, -o, 1), t("f3", -i, o, 1), t("f4", i, o, 1), t("u1", .7 * i, 1.1 * o, -1), t("u2", .7 * -i, 1.1 * o, -1), t("u3", 0, 2 * o, -1), t("cf1", -i, 0, 1), t("cf2", i, 0, 1), t("cf3", 0, -o, 1), t("cf4", 0, o, 1), t("cn1", -i, 0, -1), t("cn2", i, 0, -1), t("cn3", 0, -o, -1), t("cn4", 0, o, -1), e.getAttribute("position").needsUpdate = !0
			}
		})(), er.prototype = Object.create(be.prototype), er.prototype.constructor = er, er.prototype.update = (function() {
			var t = new et;
			return function(e) {
				if (e && e.isBox3 ? t.copy(e) : t.setFromObject(e), !t.isEmpty()) {
					var n = t.min,
						i = t.max,
						r = this.geometry.attributes.position,
						o = r.array;
					o[0] = i.x, o[1] = i.y, o[2] = i.z, o[3] = n.x, o[4] = i.y, o[5] = i.z, o[6] = n.x, o[7] = n.y, o[8] = i.z, o[9] = i.x, o[10] = n.y, o[11] = i.z, o[12] = i.x, o[13] = i.y, o[14] = n.z, o[15] = n.x, o[16] = i.y, o[17] = n.z, o[18] = n.x, o[19] = n.y, o[20] = n.z, o[21] = i.x, o[22] = n.y, o[23] = n.z, r.needsUpdate = !0, this.geometry.computeBoundingSphere()
				}
			}
		})();
		var _s = new Pt;
		_s.addAttribute("position", new Mt([ 0, 0, 0, 0, 1, 0 ], 3));
		var ws = new an(0, .5, 1, 5, 1);
		ws.translate(0, -.5, 0), nr.prototype = Object.create(ht.prototype), nr.prototype.constructor = nr, nr.prototype.setDirection = (function() {
			var t,
				e = new h;
			return function(n) {
				.99999 < n.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > n.y ? this.quaternion.set(1, 0, 0, 0) : (e.set(n.z, 0, -n.x).normalize(), t = Math.acos(n.y), this.quaternion.setFromAxisAngle(e, t))
			}
		})(), nr.prototype.setLength = function(t, e, n) {
			void 0 === e && (e = .2 * t), void 0 === n && (n = .2 * e), this.line.scale.set(1, Math.max(0, t - e), 1), this.line.updateMatrix(), this.cone.scale.set(n, e, n), this.cone.position.y = t, this.cone.updateMatrix()
		}, nr.prototype.setColor = function(t) {
			this.line.material.color.copy(t), this.cone.material.color.copy(t)
		}, ir.prototype = Object.create(be.prototype), ir.prototype.constructor = ir;
		var Ms = (function() {
				function t() {
				}
				var e = new h,
					n = new t,
					i = new t,
					r = new t;
				return t.prototype.init = function(t, e, n, i) {
						this.c0 = t, this.c1 = n, this.c2 = -3 * t + 3 * e - 2 * n - i, this.c3 = 2 * t - 2 * e + n + i
					}, t.prototype.initNonuniformCatmullRom = function(t, e, n, i, r, o, a) {
						var s = (e - t) / r - (n - t) / (r + o) + (n - e) / o,
							c = (n - e) / o - (i - e) / (o + a) + (i - n) / a;
						s *= o, c *= o, this.init(e, n, s, c)
					}, t.prototype.initCatmullRom = function(t, e, n, i, r) {
						this.init(e, n, r * (n - t), r * (i - e))
					}, t.prototype.calc = function(t) {
						var e = t * t;
						return this.c0 + this.c1 * t + this.c2 * e + this.c3 * (e * t)
					}, ri.create((function(t) {
						this.points = t || [], this.closed = !1
					}), (function(t) {
						var o,
							a,
							s,
							c,
							u = this.points;
						c = u.length, 2 > c && console.log("duh, you need at least 2 points"), o = (c - (this.closed ? 0 : 1)) * t, a = Math.floor(o), s = o - a, this.closed ? a += 0 < a ? 0 : (Math.floor(Math.abs(a) / u.length) + 1) * u.length : 0 === s && a === c - 1 && (a = c - 2, s = 1);
						var l,
							d,
							p,
							f;
						if (this.closed || 0 < a ? l = u[(a - 1) % c] : (e.subVectors(u[0], u[1]).add(u[0]), l = e), d = u[a % c], p = u[(a + 1) % c], this.closed || a + 2 < c ? f = u[(a + 2) % c] : (e.subVectors(u[c - 1], u[c - 2]).add(u[c - 1]), f = e), void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
							var m = "chordal" === this.type ? .5 : .25,
								v = Math.pow(l.distanceToSquared(d), m),
								g = Math.pow(d.distanceToSquared(p), m),
								y = Math.pow(p.distanceToSquared(f), m);
							1e-4 > g && (g = 1), 1e-4 > v && (v = g), 1e-4 > y && (y = g), n.initNonuniformCatmullRom(l.x, d.x, p.x, f.x, v, g, y), i.initNonuniformCatmullRom(l.y, d.y, p.y, f.y, v, g, y), r.initNonuniformCatmullRom(l.z, d.z, p.z, f.z, v, g, y)
						} else if ("catmullrom" === this.type) {
							var x = void 0 === this.tension ? .5 : this.tension;
							n.initCatmullRom(l.x, d.x, p.x, f.x, x), i.initCatmullRom(l.y, d.y, p.y, f.y, x), r.initCatmullRom(l.z, d.z, p.z, f.z, x)
						}
						var b = new h(n.calc(s), i.calc(s), r.calc(s));
						return b
					}))
			})(),
			Es = ri.create((function(t) {
				console.warn("THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3"), this.points = void 0 === t ? [] : t
			}), (function(t) {
				var e = this.points,
					n = (e.length - 1) * t,
					i = Math.floor(n),
					r = n - i,
					o = e[0 == i ? i : i - 1],
					a = e[i],
					s = e[i > e.length - 2 ? e.length - 1 : i + 1],
					c = e[i > e.length - 3 ? e.length - 1 : i + 2],
					u = gs.interpolate;
				return new h(u(o.x, a.x, s.x, c.x, r), u(o.y, a.y, s.y, c.y, r), u(o.z, a.z, s.z, c.z, r))
			})),
			Ss = ri.create((function(t, e, n, i) {
				this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = i
			}), (function(t) {
				var e = hs.b3;
				return new h(e(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x), e(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y), e(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z))
			})),
			Ts = ri.create((function(t, e, n) {
				this.v0 = t, this.v1 = e, this.v2 = n
			}), (function(t) {
				var e = hs.b2;
				return new h(e(t, this.v0.x, this.v1.x, this.v2.x), e(t, this.v0.y, this.v1.y, this.v2.y), e(t, this.v0.z, this.v1.z, this.v2.z))
			})),
			As = ri.create((function(t, e) {
				this.v1 = t, this.v2 = e
			}), (function(t) {
				if (1 === t) return this.v2.clone();
				var e = new h;
				return e.subVectors(this.v2, this.v1), e.multiplyScalar(t), e.add(this.v1), e
			}));
		rr.prototype = Object.create(si.prototype), rr.prototype.constructor = rr;
		var Ps = {
			createMultiMaterialObject : function(t, e) {
				for (var n = new Me, i = 0, r = e.length; i < r; i++) n.add(new Lt(t, e[i]));
				return n
			},
			detach : function(t, e, n) {
				t.applyMatrix(e.matrixWorld), e.remove(t), n.add(t)
			},
			attach : function(t, e, n) {
				var i = new l;
				i.getInverse(n.matrixWorld), t.applyMatrix(i), e.remove(t), n.add(t)
			}
		};
		Er.prototype = Object.create(Ms.prototype), Ji.prototype.setColors = function() {
			console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
		}, Object.assign(Z.prototype, {
			center : function(t) {
				return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."), this.getCenter(t)
			},
			empty : function() {
				return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."), this.isEmpty()
			},
			isIntersectionBox : function(t) {
				return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
			},
			size : function(t) {
				return console.warn("THREE.Box2: .size() has been renamed to .getSize()."), this.getSize(t)
			}
		}), Object.assign(et.prototype, {
			center : function(t) {
				return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."), this.getCenter(t)
			},
			empty : function() {
				return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."), this.isEmpty()
			},
			isIntersectionBox : function(t) {
				return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
			},
			isIntersectionSphere : function(t) {
				return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
			},
			size : function(t) {
				return console.warn("THREE.Box3: .size() has been renamed to .getSize()."), this.getSize(t)
			}
		}), lt.prototype.center = function(t) {
			return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."), this.getCenter(t)
		}, Ya.random16 = function() {
			return console.warn("THREE.Math.random16() has been deprecated. Use Math.random() instead."), Math.random()
		}, Object.assign(it.prototype, {
			flattenToArrayOffset : function(t, e) {
				return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
			},
			multiplyVector3 : function(t) {
				return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), t.applyMatrix3(this)
			},
			multiplyVector3Array : function(t) {
				return console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
			},
			applyToBuffer : function(t) {
				return console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
			}
		}), Object.assign(l.prototype, {
			extractPosition : function(t) {
				return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(t)
			},
			flattenToArrayOffset : function(t, e) {
				return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."), this.toArray(t, e)
			},
			getPosition : (function() {
				var t;
				return function() {
					return void 0 == t && (t = new h), console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."), t.setFromMatrixColumn(this, 3)
				}
			})(),
			setRotationFromQuaternion : function(t) {
				return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."), this.makeRotationFromQuaternion(t)
			},
			multiplyVector3 : function(t) {
				return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), t.applyProjection(this)
			},
			multiplyVector4 : function(t) {
				return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
			},
			multiplyVector3Array : function(t) {
				return console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."), this.applyToVector3Array(t)
			},
			rotateAxis : function(t) {
				console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), t.transformDirection(this)
			},
			crossVector : function(t) {
				return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), t.applyMatrix4(this)
			},
			translate : function() {
				console.error("THREE.Matrix4: .translate() has been removed.")
			},
			rotateX : function() {
				console.error("THREE.Matrix4: .rotateX() has been removed.")
			},
			rotateY : function() {
				console.error("THREE.Matrix4: .rotateY() has been removed.")
			},
			rotateZ : function() {
				console.error("THREE.Matrix4: .rotateZ() has been removed.")
			},
			rotateByAxis : function() {
				console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
			},
			applyToBuffer : function(t) {
				return console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead."), this.applyToBufferAttribute(t)
			}
		}), rt.prototype.isIntersectionLine = function(t) {
			return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."), this.intersectsLine(t)
		}, u.prototype.multiplyVector3 = function(t) {
			return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), t.applyQuaternion(this)
		}, Object.assign(st.prototype, {
			isIntersectionBox : function(t) {
				return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."), this.intersectsBox(t)
			},
			isIntersectionPlane : function(t) {
				return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."), this.intersectsPlane(t)
			},
			isIntersectionSphere : function(t) {
				return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."), this.intersectsSphere(t)
			}
		}), Object.assign(li.prototype, {
			extrude : function(t) {
				return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."), new qe(this, t)
			},
			makeGeometry : function(t) {
				return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."), new rn(this, t)
			}
		}), Object.assign(h.prototype, {
			setEulerFromRotationMatrix : function() {
				console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
			},
			setEulerFromQuaternion : function() {
				console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
			},
			getPositionFromMatrix : function(t) {
				return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."), this.setFromMatrixPosition(t)
			},
			getScaleFromMatrix : function(t) {
				return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."), this.setFromMatrixScale(t)
			},
			getColumnFromMatrix : function(t, e) {
				return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."), this.setFromMatrixColumn(e, t)
			}
		}), Tt.prototype.computeTangents = function() {
			console.warn("THREE.Geometry: .computeTangents() has been removed.")
		}, Object.assign(ht.prototype, {
			getChildByName : function(t) {
				return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(t)
			},
			renderDepth : function() {
				console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
			},
			translate : function(t, e) {
				return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."), this.translateOnAxis(e, t)
			}
		}), Object.defineProperties(ht.prototype, {
			eulerOrder : {
				get : function() {
					return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order
				},
				set : function(t) {
					console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."), this.rotation.order = t
				}
			},
			useQuaternion : {
				get : function() {
					console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
				},
				set : function() {
					console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
				}
			}
		}), Object.defineProperties(fe.prototype, {
			objects : {
				get : function() {
					return console.warn("THREE.LOD: .objects has been renamed to .levels."), this.levels
				}
			}
		}), Ot.prototype.setLens = function(t, e) {
			console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."), void 0 !== e && (this.filmGauge = e), this.setFocalLength(t)
		}, Object.defineProperties(Rn.prototype, {
			onlyShadow : {
				set : function() {
					console.warn("THREE.Light: .onlyShadow has been removed.")
				}
			},
			shadowCameraFov : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),
					this.shadow.camera.fov = t
				}
			},
			shadowCameraLeft : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."), this.shadow.camera.left = t
				}
			},
			shadowCameraRight : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."), this.shadow.camera.right = t
				}
			},
			shadowCameraTop : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."), this.shadow.camera.top = t
				}
			},
			shadowCameraBottom : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."), this.shadow.camera.bottom = t
				}
			},
			shadowCameraNear : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."), this.shadow.camera.near = t
				}
			},
			shadowCameraFar : {
				set : function(t) {
					console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."), this.shadow.camera.far = t
				}
			},
			shadowCameraVisible : {
				set : function() {
					console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
				}
			},
			shadowBias : {
				set : function(t) {
					console.warn("THREE.Light: .shadowBias is now .shadow.bias."), this.shadow.bias = t
				}
			},
			shadowDarkness : {
				set : function() {
					console.warn("THREE.Light: .shadowDarkness has been removed.")
				}
			},
			shadowMapWidth : {
				set : function(t) {
					console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."), this.shadow.mapSize.width = t
				}
			},
			shadowMapHeight : {
				set : function(t) {
					console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."), this.shadow.mapSize.height = t
				}
			}
		}), Object.defineProperties(mt.prototype, {
			length : {
				get : function() {
					return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."), this.array.length
				}
			}
		}), Object.assign(Pt.prototype, {
			addIndex : function(t) {
				console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."), this.setIndex(t)
			},
			addDrawCall : function(t, e, n) {
				void 0 !== n && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."), console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."), this.addGroup(t, e)
			},
			clearDrawCalls : function() {
				console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."), this.clearGroups()
			},
			computeTangents : function() {
				console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
			},
			computeOffsets : function() {
				console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
			}
		}), Object.defineProperties(Pt.prototype, {
			drawcalls : {
				get : function() {
					return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."), this.groups
				}
			},
			offsets : {
				get : function() {
					return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."), this.groups
				}
			}
		}), Object.defineProperties(Li.prototype, {
			dynamic : {
				set : function() {
					console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.")
				}
			},
			onUpdate : {
				value : function() {
					return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."), this
				}
			}
		}), Object.defineProperties(Q.prototype, {
			wrapAround : {
				get : function() {
					console.warn("THREE." + this.type + ": .wrapAround has been removed.")
				},
				set : function() {
					console.warn("THREE." + this.type + ": .wrapAround has been removed.")
				}
			},
			wrapRGB : {
				get : function() {
					return console.warn("THREE." + this.type + ": .wrapRGB has been removed."), new q
				}
			}
		}), Object.defineProperties(yn.prototype, {
			metal : {
				get : function() {
					return console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead."), !1
				},
				set : function() {
					console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
				}
			}
		}), Object.defineProperties($.prototype, {
			derivatives : {
				get : function() {
					return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives
				},
				set : function(t) {
					console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."), this.extensions.derivatives = t
				}
			}
		}), i.prototype = Object.assign(Object.create({
			constructor : i,
			apply : function(t) {
				console.warn("THREE.EventDispatcher: .apply is deprecated, just inherit or Object.assign the prototype to mix-in."), Object.assign(t, this)
			}
		}), i.prototype), Object.assign(se.prototype, {
			supportsFloatTextures : function() {
				return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."), this.extensions.get("OES_texture_float")
			},
			supportsHalfFloatTextures : function() {
				return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."), this.extensions.get("OES_texture_half_float")
			},
			supportsStandardDerivatives : function() {
				return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."), this.extensions.get("OES_standard_derivatives")
			},
			supportsCompressedTextureS3TC : function() {
				return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."), this.extensions.get("WEBGL_compressed_texture_s3tc")
			},
			supportsCompressedTexturePVRTC : function() {
				return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."), this.extensions.get("WEBGL_compressed_texture_pvrtc")
			},
			supportsBlendMinMax : function() {
				return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."), this.extensions.get("EXT_blend_minmax")
			},
			supportsVertexTextures : function() {
				return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."), this.capabilities.vertexTextures
			},
			supportsInstancedArrays : function() {
				return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."), this.extensions.get("ANGLE_instanced_arrays")
			},
			enableScissorTest : function(t) {
				console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."), this.setScissorTest(t)
			},
			initMaterial : function() {
				console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
			},
			addPrePlugin : function() {
				console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
			},
			addPostPlugin : function() {
				console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
			},
			updateShadowMap : function() {
				console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
			}
		}), Object.defineProperties(se.prototype, {
			shadowMapEnabled : {
				get : function() {
					return this.shadowMap.enabled
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."), this.shadowMap.enabled = t
				}
			},
			shadowMapType : {
				get : function() {
					return this.shadowMap.type
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."), this.shadowMap.type = t
				}
			},
			shadowMapCullFace : {
				get : function() {
					return this.shadowMap.cullFace
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace."), this.shadowMap.cullFace = t
				}
			}
		}), Object.defineProperties(at.prototype, {
			cullFace : {
				get : function() {
					return this.renderReverseSided ? Dr : Ur
				},
				set : function(t) {
					var e = t !== Ur;
					console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to " + e + "."), this.renderReverseSided = e
				}
			}
		}), Object.defineProperties(s.prototype, {
			wrapS : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."), this.texture.wrapS = t
				}
			},
			wrapT : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."), this.texture.wrapT = t
				}
			},
			magFilter : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."), this.texture.magFilter = t
				}
			},
			minFilter : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."), this.texture.minFilter = t
				}
			},
			anisotropy : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."), this.texture.anisotropy = t
				}
			},
			offset : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."), this.texture.offset = t
				}
			},
			repeat : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."), this.texture.repeat = t
				}
			},
			format : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."), this.texture.format = t
				}
			},
			type : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."), this.texture.type = t
				}
			},
			generateMipmaps : {
				get : function() {
					return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps
				},
				set : function(t) {
					console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."), this.texture.generateMipmaps = t
				}
			}
		}), _i.prototype.load = function(t) {
			console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
			var e = this,
				n = new vi;
			return n.load(t, (function(t) {
					e.setBuffer(t)
				})), this
		}, Mi.prototype.getData = function() {
			return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."), this.getFrequencyData()
		};
		var Ls = {
				merge : function(t, e, n) {
					console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
					var i;
					e.isMesh && (e.matrixAutoUpdate && e.updateMatrix(), i = e.matrix, e = e.geometry), t.merge(e, i, n)
				},
				center : function(t) {
					return console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."), t.center()
				}
			},
			Rs = {
				crossOrigin : void 0,
				loadTexture : function(t, e, n, i) {
					console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
					var r = new Ln;
					r.setCrossOrigin(this.crossOrigin);
					var o = r.load(t, n, void 0, i);
					return e && (o.mapping = e), o
				},
				loadTextureCube : function(t, e, n, i) {
					console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
					var r = new Pn;
					r.setCrossOrigin(this.crossOrigin);
					var o = r.load(t, n, void 0, i);
					return e && (o.mapping = e), o
				},
				loadCompressedTexture : function() {
					console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
				},
				loadCompressedTextureCube : function() {
					console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
				}
		}
	}).call(e, n(17))
}, function(t, e, n) {
	var i = n(26);
	t.exports = function(t) {
		if (!i(t))
			throw TypeError(t + " is not an object!");
		return t
	}
}, function(t, e, n) {
	t.exports = !n(27)((function() {
			return 7 != Object.defineProperty({}, "a", {
					get : function() {
						return 7
					}
				}).a
		}))
}, function(t, e, n) {
	var i = n(15),
		r = n(13),
		o = n(31),
		a = n(23),
		s = "prototype",
		c = function(t, e, n) {
			var u,
				h,
				l,
				d = t & c.F,
				p = t & c.G,
				f = t & c.S,
				m = t & c.P,
				v = t & c.B,
				g = t & c.W,
				y = p ? r : r[e] || (r[e] = {}),
				x = y[s],
				b = p ? i : f ? i[e] : (i[e] || {})[s];
			for (u in p && (n = e), n) h = !d && b && void 0 !== b[u], h && u in y || (l = h ? b[u] : n[u], y[u] = p && "function" != typeof b[u] ? n[u] : v && h ? o(l, i) : g && b[u] == l ? (function(t) {
					var e = function(e, n, i) {
						if (this instanceof t) {
							switch (arguments.length) {
							case 0:
								return new t;case 1:
								return new t(e);case 2:
								return new t(e, n)
							}
							return new t(e, n, i)
						}
						return t.apply(this, arguments)
					};
					return e[s] = t[s], e
				})(l) : m && "function" == typeof l ? o(Function.call, l) : l, m && ((y.virtual || (y.virtual = {}))[u] = l, t & c.R && x && !x[u] && a(x, u, l)))
		};
	c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, t.exports = c
}, function(t) {
	var e = {}.hasOwnProperty;
	t.exports = function(t, n) {
		return e.call(t, n)
	}
}, function(t, e, n) {
	var i = n(68),
		r = n(35);
	t.exports = function(t) {
		return i(r(t))
	}
}, function(t, e, n) {
	var i = n(16),
		r = n(29);
	t.exports = n(19) ? function(t, e, n) {
		return i.f(t, e, r(1, n))
	} : function(t, e, n) {
		return t[e] = n, t
	}
}, function(t, e, n) {
	"use strict";
	function i(t) {
		return t && t.__esModule ? t : {
			default : t
		}
	}
	e.__esModule = !0;
	var r = n(53),
		o = i(r),
		a = n(52),
		s = i(a),
		c = n(54),
		u = i(c);
	e.default = function(t, e) {
		if ("function" != typeof e && null !== e)
			throw new TypeError("Super expression must either be null or a function, not " + ("undefined" == typeof e ? "undefined" : (0, u.default)(e)));
		t.prototype = (0, s.default)(e && e.prototype, {
			constructor : {
				value : t,
				enumerable : !1,
				writable : !0,
				configurable : !0
			}
		}), e && (o.default ? (0, o.default)(t, e) : t.__proto__ = e)
	}
}, function(t, e, n) {
	"use strict";
	e.__esModule = !0;
	var i = n(54),
		r = (function(t) {
			return t && t.__esModule ? t : {
				default : t
			}
		})(i);
	e.default = function(t, e) {
		if (!t)
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return !e || "object" !== ("undefined" == typeof e ? "undefined" : (0, r.default)(e)) && "function" != typeof e ? t : e
	}
}, function(t) {
	t.exports = function(t) {
		return "object" == typeof t ? null !== t : "function" == typeof t
	}
}, function(t) {
	t.exports = function(t) {
		try {
			return !!t()
		} catch (t) {
			return !0
		}
	}
}, function(t) {
	t.exports = {}
}, function(t) {
	t.exports = function(t, e) {
		return {
			enumerable : !(1 & t),
			configurable : !(2 & t),
			writable : !(4 & t),
			value : e
		}
	}
}, function(t, e, n) {
	var i = n(65),
		r = n(40);
	t.exports = Object.keys || function(t) {
		return i(t, r)
	}
}, function(t, e, n) {
	var i = n(67);
	t.exports = function(t, e, n) {
		return i(t), void 0 === e ? t : 1 === n ? function(n) {
				return t.call(e, n)
			} : 2 === n ? function(n, i) {
				return t.call(e, n, i)
			} : 3 === n ? function(n, i, r) {
				return t.call(e, n, i, r)
			} : function() {
				return t.apply(e, arguments)
		}
	}
}, function(t) {
	var e = 0,
		n = Math.random();
	t.exports = function(t) {
		return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + n).toString(36))
	}
}, function(t, e, n) {
	var i = n(18),
		r = n(94),
		o = n(40),
		a = n(42)("IE_PROTO"),
		s = function() {},
		c = "prototype",
		u = function() {
			var t,
				e = n(61)("iframe"),
				i = o.length,
				r = "<",
				a = ">";
			for (e.style.display = "none", n(90).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write(r + "script" + a + "document.F=Object" + r + "/script" + a), t.close(), u = t.F; i--;)
				delete u[c][o[i]];
			return u()
		};
	t.exports = Object.create || function(t, e) {
		var n;
		return null === t ? n = u() : (s[c] = i(t), n = new s, s[c] = null, n[a] = t), void 0 === e ? n : r(n, e)
	}
}, function(t, e, n) {
	"use strict";
	var i = n(97)(!0);
	n(55)(String, "String", (function(t) {
		this._t = t + "", this._i = 0
	}), (function() {
		var t,
			e = this._t,
			n = this._i;
		return n >= e.length ? {
			value : void 0,
			done : !0
		} : (t = i(e, n), this._i += t.length, {
			value : t,
			done : !1
		})
	}))
}, function(t) {
	t.exports = function(t) {
		if (void 0 == t)
			throw TypeError("Can't call method on  " + t);
		return t
	}
}, function(t, e) {
	e.f = {}.propertyIsEnumerable
}, function(t, e, n) {
	var i = n(16).f,
		r = n(21),
		o = n(14)("toStringTag");
	t.exports = function(t, e, n) {
		t && !r(t = n ? t : t.prototype, o) && i(t, o, {
			configurable : !0,
			value : e
		})
	}
}, function(t, e, n) {
	t.exports = {
		default : n(81),
		__esModule : !0
	}
}, function(t) {
	var e = {}.toString;
	t.exports = function(t) {
		return e.call(t).slice(8, -1)
	}
}, function(t) {
	t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(t) {
	t.exports = !0
}, function(t, e, n) {
	var i = n(43)("keys"),
		r = n(32);
	t.exports = function(t) {
		return i[t] || (i[t] = r(t))
	}
}, function(t, e, n) {
	var i = n(15),
		r = "__core-js_shared__",
		o = i[r] || (i[r] = {});
	t.exports = function(t) {
		return o[t] || (o[t] = {})
	}
}, function(t) {
	var e = Math.ceil,
		n = Math.floor;
	t.exports = function(t) {
		return isNaN(t = +t) ? 0 : (0 < t ? n : e)(t)
	}
}, function(t, e, n) {
	var i = n(35);
	t.exports = function(t) {
		return Object(i(t))
	}
}, function(t, e, n) {
	var i = n(26);
	t.exports = function(t, e) {
		if (!i(t)) return t;
		var n,
			r;
		if (e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
		if ("function" == typeof (n = t.valueOf) && !i(r = n.call(t))) return r;
		if (!e && "function" == typeof (n = t.toString) && !i(r = n.call(t))) return r;
		throw TypeError("Can't convert object to primitive value")
	}
}, function(t, e, n) {
	var i = n(15),
		r = n(13),
		o = n(41),
		a = n(48),
		s = n(16).f;
	t.exports = function(t) {
		var e = r.Symbol || (r.Symbol = o ? {} : i.Symbol || {});
		"_" == t.charAt(0) || t in e || s(e, t, {
			value : a.f(t)
		})
	}
}, function(t, e, n) {
	e.f = n(14)
}, function(t, e, n) {
	"use strict";
	e.__esModule = !0;
	var i = n(111),
		r = (function(t) {
			return t && t.__esModule ? t : {
				default : t
			}
		})(i);
	e.default = (function() {
		function t(t, e) {
			for (var n = 0; n < e.length; n++) {
				var i = e[n];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), (0, r.default)(t, i.key, i)
			}
		}
		return function(e, n, i) {
			return n && t(e.prototype, n), i && t(e, i), e
		}
	})()
}, function(t, e, n) {
	var i = n(44),
		r = Math.min;
	t.exports = function(t) {
		return 0 < t ? r(i(t), 9007199254740991) : 0
	}
}, function(t, e, n) {
	n(101);
	for (var i = n(15), r = n(23), o = n(28), a = n(14)("toStringTag"), s = [ "NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList" ], c = 0; 5 > c; c++) {
		var u = s[c],
			h = i[u],
			l = h && h.prototype;
		l && !l[a] && r(l, a, u), o[u] = o.Array
	}
}, function(t, e, n) {
	t.exports = {
		default : n(82),
		__esModule : !0
	}
}, function(t, e, n) {
	t.exports = {
		default : n(83),
		__esModule : !0
	}
}, function(t, e, n) {
	"use strict";
	function i(t) {
		return t && t.__esModule ? t : {
			default : t
		}
	}
	e.__esModule = !0;
	var r = n(79),
		o = i(r),
		a = n(78),
		s = i(a),
		c = "function" == typeof s.default && "symbol" == typeof o.default ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : typeof t
		};
	e.default = "function" == typeof s.default && "symbol" === c(o.default) ? function(t) {
		return "undefined" == typeof t ? "undefined" : c(t)
	} : function(t) {
		return t && "function" == typeof s.default && t.constructor === s.default && t !== s.default.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : c(t)
	}
}, function(t, e, n) {
	"use strict";
	var i = n(41),
		r = n(20),
		o = n(66),
		a = n(23),
		s = n(21),
		c = n(28),
		u = n(91),
		h = n(37),
		l = n(76),
		d = n(14)("iterator"),
		p = !([].keys && "next" in [].keys()),
		f = "keys",
		m = "values",
		v = function() {
			return this
		};
	t.exports = function(t, e, n, g, y, x, b) {
		u(n, e, g);
		var _,
			w,
			M,
			E = function(t) {
				return !p && t in P ? P[t] : t === f ? function() {
					return new n(this, t)
				} : t === m ? function() {
					return new n(this, t)
				} : function() {
					return new n(this, t)
				}
			},
			S = e + " Iterator",
			T = y == m,
			A = !1,
			P = t.prototype,
			L = P[d] || P["@@iterator"] || y && P[y],
			R = L || E(y),
			C = y ? T ? E("entries") : R : void 0,
			I = "Array" == e ? P.entries || L : L;
		if (I && (M = l(I.call(new t)), M !== Object.prototype && (h(M, S, !0), !i && !s(M, d) && a(M, d, v))), T && L && L.name !== m && (A = !0, R = function() {
				return L.call(this)
			}), (!i || b) && (p || A || !P[d]) && a(P, d, R), c[e] = R, c[S] = v, y)
			if (_ = {
					values : T ? R : E(m),
					keys : x ? R : E(f),
					entries : C
				}, b)
				for (w in _) w in P || o(P, w, _[w]);
			else r(r.P + r.F * (p || A), e, _);
		return _
	}
}, function(t, e) {
	e.f = Object.getOwnPropertySymbols
}, function(t, e, n) {
	var i = n(71),
		r = n(14)("iterator"),
		o = n(28);
	t.exports = n(13).getIteratorMethod = function(t) {
		if (void 0 != t) return t[r] || t["@@iterator"] || o[i(t)]
	}
},, function(t, e, n) {
	"use strict";(function(i, r) {
		Object.defineProperty(e, "__esModule", {
			value : !0
		});
		var o = n(1),
			a = n.n(o),
			s = n(5),
			c = n(4);
		t.exports = new function t() {
			var e = this;
			a()(this, t), this.activate = function() {
				c.onUpdate.add(e.render), c.onResize.add(e.resize), document.body.appendChild(e.renderer.domElement)
			}, this.deactivate = function() {
				c.onUpdate.remove(e.render), c.onResize.remove(e.resize), document.body.removeChild(e.renderer.domElement)
			}, this.initPostProcessing = function() {
				e.composer = new i.Composer(e.renderer, {
					useRGBA : !1
				}), e.composer.setSize(e.renderer.domElement.width, e.renderer.domElement.height), e.usePostProcessing = !0
			}, this.add = function(t) {
				e.scene.add(t)
			}, this.remove = function(t) {
				e.scene.remove(t)
			}, this.getObjectByName = function(t) {
				return e.scene.getObjectByName(t)
			}, this.addPass = function(t) {
				e.passes.push(t)
			}, this.render = function(t) {
				if (e.control && e.control.update(t), e.onBeforeRenderer.dispatch(), e.usePostProcessing) {
					e.composer.reset(), e.composer.render(e.scene, e.camera);
					for (var n = [], i = 0, r = e.passes.length; i < r; i++) {
						var o = e.passes[i];
						o.activate && (o.shader || o.isLoaded()) && n.push(o)
					}
					for (var a = 0, s = n.length - 1; a < s; a++) {
						var c = n[a];
						e.composer.pass(c)
					}
					0 < n.length && e.composer.toScreen(n[n.length - 1])
				} else e.renderer.render(e.scene, e.camera);
				e.onAfterRenderer.dispatch()
			}, this.resize = function() {
				e.camera.aspect = c.width / c.height, e.camera.updateProjectionMatrix(), e.renderer.setSize(c.width, c.height), e.renderer.setPixelRatio(1), e.resolution = new r.Vector2(1, c.height / c.width), e.render(0), e.composer && e.composer.setSize(e.renderer.domElement.width, e.renderer.domElement.height)
			}, this.models = {}, this.textures = {}, this.camera = null, this.scene = null, this.renderer = null, this.usePostProcessing = !1, this.passes = [], this.isActivated = !1, this.clearAlpha = 1, this.onBeforeRenderer = new s, this.onAfterRenderer = new s;
			var n = c.width,
				o = c.height;
			this.camera = new r.PerspectiveCamera(60, n / o, 1, 1e6), this.scene = new r.Scene, this.resolution = new r.Vector2(1, o / n), this.renderer = new r.WebGLRenderer({
				alpha : !1,
				antialias : !1,
				preserveDrawingBuffer : !0
			}), this.renderer.setPixelRatio(1), this.renderer.domElement.className = "three", this.renderer.setSize(n, o), this.renderer.setClearColor(0, 1), this.floatSupported = this.renderer.extensions.get("OES_texture_float"), this.halfFloatSupported = this.renderer.extensions.get("OES_texture_half_float")
		}
	}).call(e, n(115), n(17))
}, function(t, e, n) {
	t.exports = {
		default : n(80),
		__esModule : !0
	}
}, function(t, e, n) {
	var i = n(26),
		r = n(15).document,
		o = i(r) && i(r.createElement);
	t.exports = function(t) {
		return o ? r.createElement(t) : {}
	}
}, function(t, e, n) {
	t.exports = !n(19) && !n(27)((function() {
			return 7 != Object.defineProperty(n(61)("div"), "a", {
					get : function() {
						return 7
					}
				}).a
		}))
}, function(t, e, n) {
	var i = n(36),
		r = n(29),
		o = n(22),
		a = n(46),
		s = n(21),
		c = n(62),
		u = Object.getOwnPropertyDescriptor;
	e.f = n(19) ? u : function(t, e) {
		if (t = o(t), e = a(e, !0), c) try {
				return u(t, e)
			} catch (t) {} return s(t, e) ? r(!i.f.call(t, e), t[e]) : void 0
	}
}, function(t, e, n) {
	var i = n(65),
		r = n(40).concat("length", "prototype");
	e.f = Object.getOwnPropertyNames || function(t) {
		return i(t, r)
	}
}, function(t, e, n) {
	var i = n(21),
		r = n(22),
		o = n(87)(!1),
		a = n(42)("IE_PROTO");
	t.exports = function(t, e) {
		var n,
			s = r(t),
			c = 0,
			u = [];
		for (n in s) n != a && i(s, n) && u.push(n);
		for (; e.length > c;) i(s, n = e[c++]) && (~o(u, n) || u.push(n));
		return u
	}
}, function(t, e, n) {
	t.exports = n(23)
}, function(t) {
	t.exports = function(t) {
		if ("function" != typeof t)
			throw TypeError(t + " is not a function!");
		return t
	}
}, function(t, e, n) {
	var i = n(39);
	t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
		return "String" == i(t) ? t.split("") : Object(t)
	}
}, function(t, e, n) {
	var i = n(32)("meta"),
		r = n(26),
		o = n(21),
		a = n(16).f,
		s = 0,
		c = Object.isExtensible || function() {
			return !0
		},
		u = !n(27)((function() {
				return c(Object.preventExtensions({}))
			})),
		h = function(t) {
			a(t, i, {
				value : {
					i : "O" + ++s,
					w : {}
				}
			})
		},
		l = t.exports = {
			KEY : i,
			NEED : !1,
			fastKey : function(t, e) {
				if (!r(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
				if (!o(t, i)) {
					if (!c(t)) return "F";
					if (!e) return "E";
					h(t)
				}
				return t[i].i
			},
			getWeak : function(t, e) {
				if (!o(t, i)) {
					if (!c(t)) return !0;
					if (!e) return !1;
					h(t)
				}
				return t[i].w
			},
			onFreeze : function(t) {
				return u && l.NEED && c(t) && !o(t, i) && h(t), t
			}
	}
}, function() {}, function(t, e, n) {
	var i = n(39),
		r = n(14)("toStringTag"),
		o = "Arguments" == i(function() {
			return arguments
		}()),
		a = function(t, e) {
			try {
				return t[e]
			} catch (t) {}
		};
	t.exports = function(t) {
		var e,
			n,
			s;
		return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = a(e = Object(t), r)) ? n : o ? i(e) : "Object" == (s = i(e)) && "function" == typeof e.callee ? "Arguments" : s
	}
}, function(t, e, n) {
	var i = n(28),
		r = n(14)("iterator"),
		o = Array.prototype;
	t.exports = function(t) {
		return void 0 !== t && (i.Array === t || o[r] === t)
	}
}, function(t, e, n) {
	var i = n(39);
	t.exports = Array.isArray || function(t) {
		return "Array" == i(t)
	}
}, function(t, e, n) {
	var i = n(18);
	t.exports = function(t, e, n, r) {
		try {
			return r ? e(i(n)[0], n[1]) : e(n)
		} catch (e) {
			var o = t.return;
			throw void 0 !== o && i(o.call(t)), e
		}
	}
}, function(t) {
	t.exports = function(t, e) {
		return {
			value : e,
			done : !!t
		}
	}
}, function(t, e, n) {
	var i = n(21),
		r = n(45),
		o = n(42)("IE_PROTO"),
		a = Object.prototype;
	t.exports = Object.getPrototypeOf || function(t) {
		return t = r(t), i(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null
	}
}, function(t, e, n) {
	"use strict";Object.defineProperty(e, "__esModule", {
		value : !0
	});
	var i = n(1),
		r = n.n(i),
		o = n(0),
		a = (function() {
			function t() {
				var e = this,
					n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "default";
				r()(this, t), this.onTransitionInComplete = function() {}, this.onTransitionOutComplete = function() {
					e.dispose(), o.onTransitionOutComplete()
				}, this.name = n
			}
			return t.prototype.update = function() {}, t.prototype.resize = function() {}, t.prototype.transitionIn = function() {
					this.onTransitionInComplete()
				}, t.prototype.transitionOut = function() {
					this.onTransitionOutComplete()
				}, t.prototype.dispose = function() {}, t
		})();
	t.exports = a
}, function(t, e, n) {
	t.exports = {
		default : n(84),
		__esModule : !0
	}
}, function(t, e, n) {
	t.exports = {
		default : n(85),
		__esModule : !0
	}
}, function(t, e, n) {
	n(34), n(100), t.exports = n(13).Array.from
}, function(t, e, n) {
	n(51), n(34), t.exports = n(99)
}, function(t, e, n) {
	n(102);
	var i = n(13).Object;
	t.exports = function(t, e) {
		return i.create(t, e)
	}
}, function(t, e, n) {
	n(103), t.exports = n(13).Object.setPrototypeOf
}, function(t, e, n) {
	n(104), n(70), n(105), n(106), t.exports = n(13).Symbol
}, function(t, e, n) {
	n(34), n(51), t.exports = n(48).f("iterator")
}, function(t) {
	t.exports = function() {}
}, function(t, e, n) {
	var i = n(22),
		r = n(50),
		o = n(98);
	t.exports = function(t) {
		return function(e, n, a) {
			var s,
				c = i(e),
				u = r(c.length),
				h = o(a, u);
			if (t && n != n) {
				for (; u > h;)
					if (s = c[h++], s != s) return !0
			} else
				for (; u > h; h++)
					if ((t || h in c) && c[h] === n) return t || h || 0;
			return !t && -1
		}
	}
}, function(t, e, n) {
	"use strict";
	var i = n(16),
		r = n(29);
	t.exports = function(t, e, n) {
		e in t ? i.f(t, e, r(0, n)) : t[e] = n
	}
}, function(t, e, n) {
	var i = n(30),
		r = n(56),
		o = n(36);
	t.exports = function(t) {
		var e = i(t),
			n = r.f;
		if (n)
			for (var a, s = n(t), c = o.f, u = 0; s.length > u;) c.call(t, a = s[u++]) && e.push(a);
		return e
	}
}, function(t, e, n) {
	t.exports = n(15).document && document.documentElement
}, function(t, e, n) {
	"use strict";
	var i = n(33),
		r = n(29),
		o = n(37),
		a = {};
	n(23)(a, n(14)("iterator"), (function() {
		return this
	})), t.exports = function(t, e, n) {
		t.prototype = i(a, {
			next : r(1, n)
		}), o(t, e + " Iterator")
	}
}, function(t, e, n) {
	var i = n(14)("iterator"),
		r = !1;
	try {
		var o = [ 7 ][i]();
		o.return = function() {
			r = !0
		}, Array.from(o, (function() {
			throw 2
		}))
	} catch (t) {}
	t.exports = function(t, e) {
		if (!e && !r) return !1;
		var n = !1;
		try {
			var o = [ 7 ],
				a = o[i]();
			a.next = function() {
				return {
					done : n = !0
				}
			}, o[i] = function() {
				return a
			}, t(o)
		} catch (t) {} return n
	}
}, function(t, e, n) {
	var i = n(30),
		r = n(22);
	t.exports = function(t, e) {
		for (var n, o = r(t), a = i(o), s = a.length, c = 0; s > c;)
			if (o[n = a[c++]] === e) return n
	}
}, function(t, e, n) {
	var i = n(16),
		r = n(18),
		o = n(30);
	t.exports = n(19) ? Object.defineProperties : function(t, e) {
		r(t);
		for (var n, a = o(e), s = a.length, c = 0; s > c;) i.f(t, n = a[c++], e[n]);
		return t
	}
}, function(t, e, n) {
	var i = n(22),
		r = n(64).f,
		o = {}.toString,
		a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
		s = function(t) {
			try {
				return r(t)
			} catch (t) {
				return a.slice()
			}
		};
	t.exports.f = function(t) {
		return a && "[object Window]" == o.call(t) ? s(t) : r(i(t))
	}
}, function(t, e, n) {
	var i = n(26),
		r = n(18),
		o = function(t, e) {
			if (r(t), !i(e) && null !== e)
				throw TypeError(e + ": can't set as prototype!")
		};
	t.exports = {
		set : Object.setPrototypeOf || ("__proto__" in {} ? (function(t, e, i) {
				try {
					i = n(31)(Function.call, n(63).f(Object.prototype, "__proto__").set, 2), i(t, []), e = !(t instanceof Array)
				} catch (t) {
					e = !0
				} return function(t, n) {
					return o(t, n), e ? t.__proto__ = n : i(t, n), t
				}
			})({}, !1) : void 0),
		check : o
	}
}, function(t, e, n) {
	var i = n(44),
		r = n(35);
	t.exports = function(t) {
		return function(e, n) {
			var o,
				a,
				s = r(e) + "",
				c = i(n),
				u = s.length;
			return 0 > c || c >= u ? t ? "" : void 0 : (o = s.charCodeAt(c), 55296 > o || 56319 < o || c + 1 === u || 56320 > (a = s.charCodeAt(c + 1)) || 57343 < a ? t ? s.charAt(c) : o : t ? s.slice(c, c + 2) : (o - 55296 << 10) + (a - 56320) + 65536)
		}
	}
}, function(t, e, n) {
	var i = n(44),
		r = Math.max,
		o = Math.min;
	t.exports = function(t, e) {
		return t = i(t), 0 > t ? r(t + e, 0) : o(t, e)
	}
}, function(t, e, n) {
	var i = n(18),
		r = n(57);
	t.exports = n(13).getIterator = function(t) {
		var e = r(t);
		if ("function" != typeof e)
			throw TypeError(t + " is not iterable!");
		return i(e.call(t))
	}
}, function(t, e, n) {
	"use strict";
	var i = n(31),
		r = n(20),
		o = n(45),
		a = n(74),
		s = n(72),
		c = n(50),
		u = n(88),
		h = n(57);
	r(r.S + r.F * !n(92)((function(t) {
			Array.from(t)
		})), "Array", {
			from : function(t) {
				var e,
					n,
					r,
					l,
					d = o(t),
					p = "function" == typeof this ? this : Array,
					f = arguments.length,
					m = 1 < f ? arguments[1] : void 0,
					v = void 0 !== m,
					g = 0,
					y = h(d);
				if (v && (m = i(m, 2 < f ? arguments[2] : void 0, 2)), void 0 == y || p == Array && s(y))
					for (e = c(d.length), n = new p(e); e > g; g++) u(n, g, v ? m(d[g], g) : d[g]);
				else
					for (l = y.call(d), n = new p; !(r = l.next()).done; g++) u(n, g, v ? a(l, m, [ r.value, g ], !0) : r.value);
				return n.length = g, n
			}
		})
}, function(t, e, n) {
	"use strict";
	var i = n(86),
		r = n(75),
		o = n(28),
		a = n(22);
	t.exports = n(55)(Array, "Array", (function(t, e) {
		this._t = a(t), this._i = 0, this._k = e
	}), (function() {
		var t = this._t,
			e = this._k,
			n = this._i++;
		return !t || n >= t.length ? (this._t = void 0, r(1)) : "keys" == e ? r(0, n) : "values" == e ? r(0, t[n]) : r(0, [ n, t[n] ])
	}), "values"), o.Arguments = o.Array, i("keys"), i("values"), i("entries")
}, function(t, e, n) {
	var i = n(20);
	i(i.S, "Object", {
		create : n(33)
	})
}, function(t, e, n) {
	var i = n(20);
	i(i.S, "Object", {
		setPrototypeOf : n(96).set
	})
}, function(t, e, n) {
	"use strict";
	var i = n(15),
		r = n(21),
		o = n(19),
		a = n(20),
		s = n(66),
		c = n(69).KEY,
		u = n(27),
		h = n(43),
		l = n(37),
		d = n(32),
		p = n(14),
		f = n(48),
		m = n(47),
		v = n(93),
		g = n(89),
		y = n(73),
		x = n(18),
		b = n(22),
		_ = n(46),
		w = n(29),
		M = n(33),
		E = n(95),
		S = n(63),
		T = n(16),
		A = n(30),
		P = S.f,
		L = T.f,
		R = E.f,
		C = i.Symbol,
		I = i.JSON,
		O = I && I.stringify,
		U = "prototype",
		D = p("_hidden"),
		B = p("toPrimitive"),
		N = {}.propertyIsEnumerable,
		F = h("symbol-registry"),
		z = h("symbols"),
		G = h("op-symbols"),
		k = Object[U],
		H = "function" == typeof C,
		j = i.QObject,
		V = !j || !j[U] || !j[U].findChild,
		W = o && u((function() {
			return 7 != M(L({}, "a", {
					get : function() {
						return L(this, "a", {
							value : 7
						}).a
					}
				})).a
		})) ? function(t, e, n) {
			var i = P(k, e);
			i &&
			delete k[e]
			, L(t, e, n), i && t !== k && L(k, e, i)
		} : L,
		X = function(t) {
			var e = z[t] = M(C[U]);
			return e._k = t, e
		},
		q = H && "symbol" == typeof C.iterator ? function(t) {
			return "symbol" == typeof t
		} : function(t) {
			return t instanceof C
		},
		Y = function(t, e, n) {
			return t === k && Y(G, e, n), x(t), e = _(e, !0), x(n), r(z, e) ? (n.enumerable ? (r(t, D) && t[D][e] && (t[D][e] = !1), n = M(n, {
					enumerable : w(0, !1)
				})) : (!r(t, D) && L(t, D, w(1, {})), t[D][e] = !0), W(t, e, n)) : L(t, e, n)
		},
		Z = function(t, e) {
			x(t);
			for (var n, i = g(e = b(e)), r = 0, o = i.length; o > r;) Y(t, n = i[r++], e[n]);
			return t
		},
		J = function(t) {
			var e = N.call(this, t = _(t, !0));
			return !(this === k && r(z, t) && !r(G, t)) && (!(e || !r(this, t) || !r(z, t) || r(this, D) && this[D][t]) || e)
		},
		K = function(t, e) {
			if (t = b(t), e = _(e, !0), t !== k || !r(z, e) || r(G, e)) {
				var n = P(t, e);
				return n && r(z, e) && !(r(t, D) && t[D][e]) && (n.enumerable = !0), n
			}
		},
		Q = function(t) {
			for (var e, n = R(b(t)), i = [], o = 0; n.length > o;) r(z, e = n[o++]) || e == D || e == c || i.push(e);
			return i
		},
		$ = function(t) {
			for (var e, n = t === k, i = R(n ? G : b(t)), o = [], a = 0; i.length > a;) r(z, e = i[a++]) && (!n || r(k, e)) && o.push(z[e]);
			return o
		};
	H || (C = function() {
		if (this instanceof C)
			throw TypeError("Symbol is not a constructor!");
		var t = d(0 < arguments.length ? arguments[0] : void 0),
			e = function(n) {
				this === k && e.call(G, n), r(this, D) && r(this[D], t) && (this[D][t] = !1), W(this, t, w(1, n))
			};
		return o && V && W(k, t, {
				configurable : !0,
				set : e
			}), X(t)
	}, s(C[U], "toString", (function() {
		return this._k
	})), S.f = K, T.f = Y, n(64).f = E.f = Q, n(36).f = J, n(56).f = $, o && !n(41) && s(k, "propertyIsEnumerable", J, !0), f.f = function(t) {
		return X(p(t))
	}), a(a.G + a.W + a.F * !H, {
		Symbol : C
	});
	for (var tt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), et = 0; tt.length > et;) p(tt[et++]);
	for (var tt = A(p.store), et = 0; tt.length > et;) m(tt[et++]);
	a(a.S + a.F * !H, "Symbol", {
		for : function(t) {
			return r(F, t += "") ? F[t] : F[t] = C(t)
		},
		keyFor : function(t) {
			if (q(t)) return v(F, t);
			throw TypeError(t + " is not a symbol!")
		},
		useSetter : function() {
			V = !0
		},
		useSimple : function() {
			V = !1
		}
	}), a(a.S + a.F * !H, "Object", {
		create : function(t, e) {
			return void 0 === e ? M(t) : Z(M(t), e)
		},
		defineProperty : Y,
		defineProperties : Z,
		getOwnPropertyDescriptor : K,
		getOwnPropertyNames : Q,
		getOwnPropertySymbols : $
	}), I && a(a.S + a.F * (!H || u((function() {
			var t = C();
			return "[null]" != O([ t ]) || "{}" != O({
					a : t
				}) || "{}" != O(Object(t))
		}))), "JSON", {
			stringify : function(t) {
				if (void 0 !== t && !q(t)) {
					for (var e, n, i = [ t ], r = 1; arguments.length > r;) i.push(arguments[r++]);
					return e = i[1], "function" == typeof e && (n = e), (n || !y(e)) && (e = function(t, e) {
							if (n && (e = n.call(this, t, e)), !q(e)) return e
						}), i[1] = e, O.apply(I, i)
				}
			}
		}), C[U][B] || n(23)(C[U], B, C[U].valueOf), l(C, "Symbol"), l(Math, "Math", !0), l(i.JSON, "JSON", !0)
}, function(t, e, n) {
	n(47)("asyncIterator")
}, function(t, e, n) {
	n(47)("observable")
},, function(t) {
	t.exports = Array.isArray || function(t) {
		return "[object Array]" == Object.prototype.toString.call(t);
	}
}, function(t, e, n) {
	function i(t) {
		var e = "";
		return x ? window.navigator.msPointerEnabled ? "down" === t ? e = "MSPointerDown" : "move" === t ? e = "MSPointerMove" : "up" === t ? e = "MSPointerUp" : "click" === t ? e = "MSPointerUp" : void 0 : "down" === t ? e = "touchstart" : "move" === t ? e = "touchmove" : "up" === t ? e = "touchend" : "click" === t ? e = "touchstart" : void 0 : "down" === t ? e = "mousedown" : "move" === t ? e = "mousemove" : "up" === t ? e = "mouseup" : "click" === t ? e = "click" : "over" === t ? e = l.safari ? "mouseover" : "mouseenter" : "out" === t ? e = l.safari ? "mouseout" : "mouseleave" : void 0, e
	}
	function r(t) {
		return "down" === t ? d : "move" === t ? p : "up" === t ? f : "click" === t ? m : "over" === t ? v : "out" === t ? g : void 0
	}
	function o(t, e) {
		for (var n = null, i = 0, r = e.length; i < r; i++)
			if (n = e[i], n.cb == t) return {
					data : n,
					idx : i
				};
		return null
	}
	function a(t) {
		var e = M.x,
			n = M.y;
		return M.x = t.x, M.y = t.y, S.x = M.x - e, S.y = M.y - n, M.moveX = S.x, M.moveY = S.y, M.normalizedX = M.x / u.width, M.normalizedY = M.y / u.height, M.unitX = 2 * (M.normalizedX - .5), M.unitY = 2 * (M.normalizedY - .5), M
	}
	function s() {
		E.x = M.x, E.y = M.y
	}
	function c() {
		R.dispatch(), w.mouseIsDown = !1
	}
	var u = n(4),
		h = n(5),
		l = n(119),
		d = {},
		p = {},
		f = {},
		m = {},
		v = {},
		g = {},
		y = [ d, p, f, m ],
		x = l.mobile || l.tablet,
		b = t.exports.on = function(t, e, n) {
			function o(t) {
				if (t = {
						x : 0,
						y : 0,
						origin : t
					}, x)
					if (window.navigator.msPointerEnabled) t.x = t.origin.clientX, t.y = t.origin.clientY;else {
						var e = t.origin.touches[0];
						e && (t.x = e.clientX, t.y = e.clientY)
				}
				else t.x = t.origin.clientX, t.y = t.origin.clientY;
				n.call(this, t)
			}
			var a = i(e);
			if ("" != a) {
				var s = r(e);
				s[t] || (s[t] = []), s[t].push({
					cb : n,
					proxy : o
				}), t.addEventListener(a, o, !1)
			}
		};
	t.exports.off = function(t, e, n) {
		var a = i(e);
		if ("" != a) {
			var s = r(e);
			if (s[t]) {
				var c = s[t];
				if (n) {
					var u = o(n, c);
					if (!u) return;
					t.removeEventListener(a, u.data.proxy, !1), s[t].splice(u.idx, 1)
				} else {
					for (var h = null, l = 0, d = c.length; l < d; l++) h = c[l], t.removeEventListener(a, h.proxy, !1);
					s[t] = null,
					delete s[t]
				}
			}
		}
	}, t.exports.has = function(t, e, n) {
		var o = i(e);
		if ("" != o) {
			var a = r(e);
			if (a[t]) return a[t], !!n
		}
	}, t.exports.unbind = function(t) {
		for (var e = 0, n = y.length; e < n; e++) y[e][t] = null,
			delete y[e][t]
	};
	var _ = t.exports.config = {
			preventDefaultTouch : !1
		},
		w = t.exports.infos = {
			isMouseDown : !1
		},
		M = t.exports.mouse = {
			x : .5 * u.width,
			y : .5 * u.height,
			normalizedX : .5,
			normalizedY : .5,
			unitX : 0,
			unitY : 0,
			moveX : 0,
			moveY : 0,
			e : null
		},
		E = t.exports.prevMouse = {
			x : .5 * u.width,
			y : .5 * u.height
		},
		S = t.exports.move = {
			x : .5 * u.width,
			y : .5 * u.height
		},
		T = t.exports.onDown = new h,
		A = t.exports.onUp = new h,
		P = t.exports.onMove = new h,
		L = t.exports.onClick = new h,
		R = t.exports.onLeave = new h;
	b(window, "down", (function(t) {
		w.isMouseDown = !0, T.dispatch(a(t))
	})), b(window, "move", (function(t) {
		s(), _.preventDefaultTouch && t.origin.preventDefault(), P.dispatch(a(t))
	})), b(window, "up", (function(t) {
		w.isMouseDown = !1, A.dispatch(a(t))
	})), b(window, "click", (function(t) {
		L.dispatch(a(t))
	})), window.addEventListener("blur", (function() {
		c()
	})), window.addEventListener("mouseleave", (function() {
		c()
	}))
},, function(t, e, n) {
	t.exports = {
		default : n(124),
		__esModule : !0
	}
},,,, function(t, e, n) {
	(function(i) {
		var r;
		(function() {
			"use strict";
			var o = o || {};
			o.vertexShadersPath = "./glsl/wagner", o.fragmentShadersPath = "./glsl/wagner", o.assetsPath = "./assets", o.basicVs = "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }", o.Composer = function(t, e) {
				this.width = 1, this.height = 1, this.settings = e || {}, this.useRGBA = this.settings.useRGBA || !1, this.renderer = t, this.copyPass = new o.CopyPass(this.settings), this.scene = new i.Scene, this.quad = new i.Mesh(new i.PlaneBufferGeometry(1, 1), this.defaultMaterial), this.scene.add(this.quad), this.camera = new i.OrthographicCamera(1, 1, 1, 1, -1e4, 1e4), this.front = new i.WebGLRenderTarget(1, 1, {
					minFilter : void 0 === this.settings.minFilter ? i.LinearFilter : this.settings.minFilter,
					magFilter : void 0 === this.settings.magFilter ? i.LinearFilter : this.settings.magFilter,
					wrapS : void 0 === this.settings.wrapS ? i.ClampToEdgeWrapping : this.settings.wrapS,
					wrapT : void 0 === this.settings.wrapT ? i.ClampToEdgeWrapping : this.settings.wrapT,
					format : this.useRGBA ? i.RGBAFormat : i.RGBFormat,
					type : void 0 === this.settings.type ? i.UnsignedByteType : this.settings.type,
					stencilBuffer : void 0 !== this.settings.stencilBuffer && this.settings.stencilBuffer
				}), this.back = this.front.clone(), this.startTime = Date.now(), this.passes = {}
			}, o.Composer.prototype.linkPass = function(t, e) {
				function n() {
					this.message = 'Pass "' + t + '" already loaded.', this.name = "WagnerLoadPassException", this.toString = function() {
						return this.message
					}
				}
				if (this.passes[t])
					throw new n(t, e);
				this.passes[t] = e
			}, o.Composer.prototype.swapBuffers = function() {
				this.output = this.write, this.input = this.read;
				var t = this.write;
				this.write = this.read, this.read = t
			}, o.Composer.prototype.render = function(t, e, n, i) {
				this.copyPass.isLoaded() && (n && this.swapBuffers(), this.renderer.render(t, e, i ? i : this.write, !0), !i && this.swapBuffers())
			}, o.Composer.prototype.toScreen = function(t) {
				this.copyPass.isLoaded() && (this.quad.material = t ? t.shader : this.copyPass.shader, this.quad.material.uniforms.tInput.value = this.read.texture, this.quad.material.uniforms.resolution.value.set(this.width, this.height), this.renderer.render(this.scene, this.camera))
			}, o.Composer.prototype.toTexture = function(t) {
				this.copyPass.isLoaded() && (this.quad.material = pass ? pass.shader : this.copyPass.shader, this.quad.material.uniforms.tInput.value = this.read.texture, this.renderer.render(this.scene, this.camera, t, !1))
			}, o.Composer.prototype.pass = function(t) {
				return "string" == typeof t && (this.quad.material = this.passes[t]), t instanceof i.ShaderMaterial && (this.quad.material = t), t instanceof o.Pass ? t.isLoaded() ? void t.run(this) : void 0 : (!t.isSim && (this.quad.material.uniforms.tInput.value = this.read.texture), this.quad.material.uniforms.resolution.value.set(this.width, this.height), this.quad.material.uniforms.time.value = .001 * (Date.now() - this.startTime), this.renderer.render(this.scene, this.camera, this.write, !1), void this.swapBuffers())
			}, o.Composer.prototype.reset = function() {
				this.read = this.front, this.write = this.back, this.output = this.write, this.input = this.read
			}, o.Composer.prototype.setSource = function(t) {
				this.copyPass.isLoaded() && (this.quad.material = this.copyPass.shader, this.quad.material.uniforms.tInput.value = t.texture, this.renderer.render(this.scene, this.camera, this.write, !0), this.swapBuffers())
			}, o.Composer.prototype.setSize = function(t, e) {
				this.width = t, this.height = e, this.camera.projectionMatrix.makeOrthographic(t / -2, t / 2, e / 2, e / -2, this.camera.near, this.camera.far), this.quad.scale.set(t, e, 1), this.front.setSize(t, e), this.back.setSize(t, e)
			}, o.Composer.prototype.defaultMaterial = new i.MeshBasicMaterial, o.loadShader = function(t, e) {
				var n = new XMLHttpRequest;
				n.onload = function() {
					var t = n.responseText;
					e(t)
				}.bind(this), n.onerror = function() {
					throw new function(t) {
						this.message = 'Shader "' + t + "\" couldn't be loaded.", this.name = "WagnerLoadShaderException", this.toString = function() {
							return this.message
						}
					}(t)
				}, n.onabort = function() {
					throw new function(t) {
						this.message = 'Shader "' + t + '" load was aborted.', this.name = "WagnerLoadShaderException", this.toString = function() {
							return this.message
						}
					}(t)
				}, n.open("get", t, !0), n.send()
			}, o.processShader = function(t, e) {
				var n = /uniform\s+(lowp|mediump|highp)?\s*([^\s]+)\s+([^\s]+)\s*;/gi,
					r = /uniform\s+([^\s]+)\s+([^\s]+)\s*\[\s*(\w+)\s*\]*\s*;/gi,
					o = new i.Texture;
				o.wrapS = i.RepeatWrapping, o.wrapT = i.RepeatWrapping;
				var a,
					s = {
						sampler2D : {
							type : "t",
							value : function() {
								return o
							}
						},
						samplerCube : {
							type : "t",
							value : function() {}
						},
						bool : {
							type : "b",
							value : function() {
								return 0
							}
						},
						int : {
							type : "i",
							value : function() {
								return 0
							}
						},
						float : {
							type : "f",
							value : function() {
								return 0
							}
						},
						vec2 : {
							type : "v2",
							value : function() {
								return new i.Vector2
							}
						},
						vec3 : {
							type : "v3",
							value : function() {
								return new i.Vector3
							}
						},
						vec4 : {
							type : "v4",
							value : function() {
								return new i.Vector4
							}
						},
						bvec2 : {
							type : "v2",
							value : function() {
								return new i.Vector2
							}
						},
						bvec3 : {
							type : "v3",
							value : function() {
								return new i.Vector3
							}
						},
						bvec4 : {
							type : "v4",
							value : function() {
								return new i.Vector4
							}
						},
						ivec2 : {
							type : "v2",
							value : function() {
								return new i.Vector2
							}
						},
						ivec3 : {
							type : "v3",
							value : function() {
								return new i.Vector3
							}
						},
						ivec4 : {
							type : "v4",
							value : function() {
								return new i.Vector4
							}
						},
						mat2 : {
							type : "v2",
							value : function() {
								return new i.Matrix2
							}
						},
						mat3 : {
							type : "v3",
							value : function() {
								return new i.Matrix3
							}
						},
						mat4 : {
							type : "v4",
							value : function() {
								return new i.Matrix4
							}
						}
					},
					c = {
						float : {
							type : "fv",
							value : function() {
								return []
							}
						},
						vec3 : {
							type : "v3v",
							value : function() {
								return []
							}
						}
					},
					o = new i.Texture;
				o.wrapS = i.RepeatWrapping, o.wrapT = i.RepeatWrapping;
				for (var u, h, l = {
							resolution : {
								type : "v2",
								value : new i.Vector2(1, 1),
								default : !0
							},
							time : {
								type : "f",
								value : Date.now(),
								default : !0
							},
							tInput : {
								type : "t",
								value : o,
								default : !0
							}
					}; null !== (a = n.exec(e));) a.index === n.lastIndex && n.lastIndex++, u = a[2], h = a[3], l[h] = {
						type : s[u].type,
						value : s[u].value()
					};
				for (; null !== (a = r.exec(e));) a.index === n.lastIndex && n.lastIndex++, u = a[1], h = a[2], a[3], l[h] = {
						type : c[u].type,
						value : c[u].value()
					};
				var d = new i.ShaderMaterial({
					uniforms : l,
					vertexShader : t,
					fragmentShader : e,
					shading : i.FlatShading,
					depthWrite : !1,
					depthTest : !1,
					transparent : !0
				});
				return d
			}, o.Pass = function() {
				this.shader = null, this.loaded = null, this.activate = !0, this.params = {}, this.isSim = !1
			}, o.Pass.prototype.loadShader = function(t, e) {
				var n = this,
					i = o.basicVs;
				o.loadShader(o.fragmentShadersPath + "/" + t, (function(t) {
					n.shader = o.processShader(i, t), e && e.apply(n)
				}))
			}, o.Pass.prototype.mapUniforms = function(t) {
				var e = this.params;
				for (var n in t) t[n].default || (function(n) {
						Object.defineProperty(e, n, {
							get : function() {
								return t[n].value
							},
							set : function(e) {
								t[n].value = e
							},
							configurable : !1
						})
					})(n)
			}, o.Pass.prototype.run = function(t) {
				t.pass(this.shader)
			}, o.Pass.prototype.isLoaded = function() {
				return null === this.loaded ? void (this.shader instanceof i.ShaderMaterial && (this.loaded = !0)) : this.loaded
			}, o.Pass.prototype.getOfflineTexture = function(t, e, n) {
				n = !0;
				var r = new i.WebGLRenderTarget(t, e, {
					minFilter : i.LinearFilter,
					magFilter : i.LinearFilter,
					format : n ? i.RGBAFormat : i.RGBFormat,
					wrapS : i.RepeatWrapping,
					wrapT : i.RepeatWrapping
				});
				return r
			}, o.CopyPass = function() {
				o.Pass.call(this);
				var t = o.basicVs;
				this.shader = o.processShader(t, "varying vec2 vUv; uniform sampler2D tInput; void main() {gl_FragColor = texture2D( tInput, vUv );}")
			}, o.CopyPass.prototype = Object.create(o.Pass.prototype), o.GenericPass = function(t, e) {
				o.Pass.call(this);
				var n = this;
				o.loadShader(o.vertexShadersPath + "/orto-vs.glsl", (function(i) {
					o.loadShader(t, (function(t) {
						n.shader = o.processShader(i, t), e && e.apply(n)
					}))
				}))
			}, o.GenericPass.prototype = Object.create(o.Pass.prototype), o.BlendPass = function() {
				o.Pass.call(this), this.loadShader("blend-fs.glsl"), this.params.mode = 1, this.params.opacity = 1, this.params.tInput2 = null, this.params.resolution2 = new i.Vector2, this.params.sizeMode = 1, this.params.aspectRatio = 1, this.params.aspectRatio2 = 1
			}, o.BlendMode = {
				Normal : 1,
				Dissolve : 2,
				Darken : 3,
				Multiply : 4,
				ColorBurn : 5,
				LinearBurn : 6,
				DarkerColor : 7,
				Lighten : 8,
				Screen : 9,
				ColorDodge : 10,
				LinearDodge : 11,
				LighterColor : 12,
				Overlay : 13,
				SoftLight : 14,
				HardLight : 15,
				VividLight : 16,
				LinearLight : 17,
				PinLight : 18,
				HardMix : 19,
				Difference : 20,
				Exclusion : 21,
				Substract : 22,
				Divide : 23
			}, o.BlendPass.prototype = Object.create(o.Pass.prototype), o.BlendPass.prototype.run = function(t) {
				this.shader.uniforms.mode.value = this.params.mode, this.shader.uniforms.opacity.value = this.params.opacity, this.shader.uniforms.tInput2.value = this.params.tInput2.texture, this.shader.uniforms.sizeMode.value = this.params.sizeMode, this.shader.uniforms.aspectRatio.value = this.params.aspectRatio, this.shader.uniforms.aspectRatio2.value = this.params.aspectRatio2, t.pass(this.shader)
			}, o.InvertPass = function() {
				o.Pass.call(this), this.loadShader("invert-fs.glsl")
			}, o.InvertPass.prototype = Object.create(o.Pass.prototype), o.SepiaPass = function() {
				o.Pass.call(this), this.loadShader("sepia-fs.glsl"), this.params.amount = 1
			}, o.SepiaPass.prototype = Object.create(o.Pass.prototype), o.SepiaPass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, t.pass(this.shader)
			}, o.BrightnessContrastPass = function() {
				o.Pass.call(this), this.loadShader("brightness-contrast-fs.glsl"), this.params.brightness = 1, this.params.contrast = 1
			}, o.BrightnessContrastPass.prototype = Object.create(o.Pass.prototype), o.BrightnessContrastPass.prototype.run = function(t) {
				this.shader.uniforms.brightness.value = this.params.brightness, this.shader.uniforms.contrast.value = this.params.contrast, t.pass(this.shader)
			}, o.Pass.prototype.bindUniform = function(t, e, n, i) {
				Object.defineProperty(t, n, {
					get : function() {
						return e.uniforms[id].value
					},
					set : i,
					configurable : !1
				})
			}, o.NoisePass = function() {
				o.Pass.call(this), this.loadShader("noise-fs.glsl"), this.params.amount = .1, this.params.speed = 0
			}, o.NoisePass.prototype = Object.create(o.Pass.prototype), o.NoisePass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, this.shader.uniforms.speed.value = this.params.speed, t.pass(this.shader)
			}, o.VignettePass = function() {
				o.Pass.call(this), this.loadShader("vignette-fs.glsl"), this.params.amount = 1, this.params.falloff = .1
			}, o.VignettePass.prototype = Object.create(o.Pass.prototype), o.VignettePass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, this.shader.uniforms.falloff.value = this.params.falloff, t.pass(this.shader)
			}, o.Vignette2Pass = function() {
				o.Pass.call(this), this.loadShader("vignette2-fs.glsl"), this.params.boost = 2, this.params.reduction = 2
			}, o.Vignette2Pass.prototype = Object.create(o.Pass.prototype), o.Vignette2Pass.prototype.run = function(t) {
				this.shader.uniforms.boost.value = this.params.boost, this.shader.uniforms.reduction.value = this.params.reduction, t.pass(this.shader)
			}, o.DenoisePass = function() {
				o.Pass.call(this), this.loadShader("denoise-fs.glsl"), this.params.exponent = 5, this.params.strength = 10
			}, o.DenoisePass.prototype = Object.create(o.Pass.prototype), o.DenoisePass.prototype.run = function(t) {
				this.shader.uniforms.exponent.value = this.params.exponent, this.shader.uniforms.strength.value = this.params.strength, t.pass(this.shader)
			}, o.BoxBlurPass = function() {
				o.Pass.call(this), this.loadShader("box-blur2-fs.glsl"), this.params.delta = new i.Vector2(0, 0), this.params.taps = 1
			}, o.BoxBlurPass.prototype = Object.create(o.Pass.prototype), o.BoxBlurPass.prototype.run = function(t) {
				this.shader.uniforms.delta.value.copy(this.params.delta), t.pass(this.shader)
			}, o.FullBoxBlurPass = function() {
				o.Pass.call(this), this.boxPass = new o.BoxBlurPass, this.params.amount = 20, this.params.taps = 1
			}, o.FullBoxBlurPass.prototype = Object.create(o.Pass.prototype), o.FullBoxBlurPass.prototype.isLoaded = function() {
				return this.boxPass.isLoaded() && (this.loaded = !0), o.Pass.prototype.isLoaded.call(this)
			}, o.FullBoxBlurPass.prototype.run = function(t) {
				var e = this.params.amount;
				this.boxPass.params.delta.set(e, 0), this.boxPass.params.taps = this.params.taps, t.pass(this.boxPass), this.boxPass.params.delta.set(0, e), t.pass(this.boxPass)
			}, o.ZoomBlurPass = function() {
				o.Pass.call(this), this.loadShader("zoom-blur-fs.glsl"), this.params.center = new i.Vector2(.5, .5), this.params.strength = 2
			}, o.ZoomBlurPass.prototype = Object.create(o.Pass.prototype), o.ZoomBlurPass.prototype.run = function(t) {
				this.shader.uniforms.center.value.copy(this.params.center), this.shader.uniforms.strength.value = this.params.strength, t.pass(this.shader)
			}, o.MultiPassBloomPass = function(t, e) {
				o.Pass.call(this), this.composer = null, this.tmpTexture = this.getOfflineTexture(t, e, !0), this.blurPass = new o.FullBoxBlurPass, this.blendPass = new o.BlendPass, this.zoomBlur = new o.ZoomBlurPass, this.brightnessContrastPass = new o.BrightnessContrastPass, this.width = t || 512, this.height = e || 512, this.params.blurAmount = 20, this.params.applyZoomBlur = !1, this.params.zoomBlurStrength = 2, this.params.useTexture = !1, this.params.zoomBlurCenter = new i.Vector2(.5, .5), this.params.blendMode = o.BlendMode.Screen
			}, o.MultiPassBloomPass.prototype = Object.create(o.Pass.prototype), o.MultiPassBloomPass.prototype.isLoaded = function() {
				return this.blurPass.isLoaded() && this.blendPass.isLoaded() && this.zoomBlur.isLoaded() && (this.loaded = !0), o.Pass.prototype.isLoaded.call(this)
			}, o.MultiPassBloomPass.prototype.run = function(t) {
				this.composer || (this.composer = new o.Composer(t.renderer, {
					useRGBA : !0
				}), this.composer.setSize(this.width, this.height)), this.composer.reset(), !0 === this.params.useTexture ? this.composer.setSource(this.params.glowTexture) : this.composer.setSource(t.output), this.blurPass.params.amount = this.params.blurAmount, this.composer.pass(this.blurPass), this.params.applyZoomBlur && (this.zoomBlur.params.center.set(.5 * this.width, .5 * this.height), this.zoomBlur.params.strength = this.params.zoomBlurStrength, this.composer.pass(this.zoomBlur)), !0 === this.params.useTexture && (this.blendPass.params.mode = o.BlendMode.Screen, this.blendPass.params.tInput = this.params.glowTexture, t.pass(this.blendPass)), this.blendPass.params.mode = this.params.blendMode, this.blendPass.params.tInput2 = this.composer.output, t.pass(this.blendPass)
			}, o.CGAPass = function() {
				o.Pass.call(this), this.loadShader("cga-fs.glsl", (function() {
					this.shader.uniforms.pixelDensity.value = window.devicePixelRatio
				}))
			}, o.CGAPass.prototype = Object.create(o.Pass.prototype), o.SobelEdgeDetectionPass = function() {
				o.Pass.call(this), this.loadShader("sobel-fs.glsl")
			}, o.SobelEdgeDetectionPass.prototype = Object.create(o.Pass.prototype), o.FreiChenEdgeDetectionPass = function() {
				o.Pass.call(this), this.loadShader("frei-chen-fs.glsl")
			}, o.FreiChenEdgeDetectionPass.prototype = Object.create(o.Pass.prototype), o.DirtPass = function() {
				o.Pass.call(this), this.blendPass = new o.BlendPass, this.dirtTexture = i.ImageUtils.loadTexture(o.assetsPath + "/textures/dirt8.jpg"), this.params.blendMode = o.BlendMode.SoftLight
			}, o.DirtPass.prototype = Object.create(o.Pass.prototype), o.DirtPass.prototype.isLoaded = function() {
				return this.blendPass.isLoaded() && (this.loaded = !0), o.Pass.prototype.isLoaded.call(this)
			}, o.DirtPass.prototype.run = function(t) {
				this.blendPass.params.sizeMode = 1, this.blendPass.params.mode = this.params.blendMode, this.blendPass.params.tInput2 = this.dirtTexture, this.dirtTexture.image && (this.blendPass.params.resolution2.set(this.dirtTexture.image.width, this.dirtTexture.image.height), this.blendPass.params.aspectRatio2 = this.dirtTexture.image.width / this.dirtTexture.image.height), this.blendPass.params.aspectRatio = t.read.width / t.read.height, t.pass(this.blendPass)
			}, o.GuidedBoxBlurPass = function() {
				o.Pass.call(this), this.loadShader("guided-box-blur2-fs.glsl"), this.params.tBias = null, this.params.delta = new i.Vector2(1, 0), this.params.invertBiasMap = !1, this.params.isPacked = 0, this.params.from = 0, this.params.to = 1
			}, o.GuidedBoxBlurPass.prototype = Object.create(o.Pass.prototype), o.GuidedBoxBlurPass.prototype.run = function(t) {
				this.shader.uniforms.tBias.value = this.params.tBias, this.shader.uniforms.delta.value.copy(this.params.delta), this.shader.uniforms.delta.value.multiplyScalar(1e-4), this.shader.uniforms.invertBiasMap.value = this.params.invertBiasMap, this.shader.uniforms.isPacked.value = this.params.isPacked, this.shader.uniforms.from.value = this.params.from, this.shader.uniforms.to.value = this.params.to, t.pass(this.shader)
			}, o.GuidedFullBoxBlurPass = function() {
				o.Pass.call(this), this.guidedBoxPass = new o.GuidedBoxBlurPass, this.params.tBias = null, this.params.invertBiasMap = !1, this.params.isPacked = 0, this.params.amount = 10, this.params.from = 0, this.params.to = 1, this.params.taps = 1
			}, o.GuidedFullBoxBlurPass.prototype = Object.create(o.Pass.prototype), o.GuidedFullBoxBlurPass.prototype.isLoaded = function() {
				return this.guidedBoxPass.isLoaded() && (this.loaded = !0), o.Pass.prototype.isLoaded.call(this)
			}, o.GuidedFullBoxBlurPass.prototype.run = function(t) {
				this.guidedBoxPass.params.invertBiasMap = this.params.invertBiasMap, this.guidedBoxPass.params.isPacked = this.params.isPacked, this.guidedBoxPass.params.tBias = this.params.tBias, this.guidedBoxPass.params.from = this.params.from, this.guidedBoxPass.params.to = this.params.to;
				for (var e = this.params.amount, n = 0; n < this.params.taps; n++) this.guidedBoxPass.params.delta.set(e, 0), t.pass(this.guidedBoxPass), this.guidedBoxPass.params.delta.set(0, e), t.pass(this.guidedBoxPass)
			}, o.PixelatePass = function() {
				o.Pass.call(this), this.loadShader("pixelate-fs.glsl"), this.params.amount = 320
			}, o.PixelatePass.prototype = Object.create(o.Pass.prototype), o.PixelatePass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, t.pass(this.shader)
			}, o.RGBSplitPass = function() {
				o.Pass.call(this), this.loadShader("rgb-split-fs.glsl", (function() {})), this.params.delta = new i.Vector2
			}, o.RGBSplitPass.prototype = Object.create(o.Pass.prototype), o.RGBSplitPass.prototype.run = function(t) {
				this.shader.uniforms.delta.value.copy(this.params.delta), t.pass(this.shader)
			}, o.ChromaticAberrationPass = function() {
				o.Pass.call(this), this.loadShader("chromatic-aberration-fs.glsl")
			}, o.ChromaticAberrationPass.prototype = Object.create(o.Pass.prototype), o.BarrelBlurPass = function() {
				o.Pass.call(this), this.loadShader("barrel-blur-fs.glsl")
			}, o.BarrelBlurPass.prototype = Object.create(o.Pass.prototype), o.OldVideoPass = function() {
				o.Pass.call(this), this.loadShader("old-video-fs.glsl")
			}, o.OldVideoPass.prototype = Object.create(o.Pass.prototype), o.DotScreenPass = function() {
				o.Pass.call(this), this.loadShader("dot-screen-fs.glsl")
			}, o.DotScreenPass.prototype = Object.create(o.Pass.prototype), o.PoissonDiscBlurPass = function() {
				o.Pass.call(this), this.loadShader("poisson-disc-blur-fs.glsl")
			}, o.PoissonDiscBlurPass.prototype = Object.create(o.Pass.prototype), o.CircularBlurPass = function() {
				o.Pass.call(this), this.loadShader("circular-blur-fs.glsl")
			}, o.CircularBlurPass.prototype = Object.create(o.Pass.prototype), o.ToonPass = function() {
				o.Pass.call(this), this.loadShader("toon-fs.glsl")
			}, o.ToonPass.prototype = Object.create(o.Pass.prototype), o.FXAAPass = function() {
				o.Pass.call(this), this.loadShader("fxaa-fs.glsl")
			}, o.FXAAPass.prototype = Object.create(o.Pass.prototype), o.HighPassPass = function() {
				o.Pass.call(this), this.loadShader("high-pass-fs.glsl")
			}, o.HighPassPass.prototype = Object.create(o.Pass.prototype), o.GrayscalePass = function() {
				o.Pass.call(this), this.loadShader("grayscale-fs.glsl")
			}, o.GrayscalePass.prototype = Object.create(o.Pass.prototype), o.ASCIIPass = function() {
				o.Pass.call(this), this.loadShader("ascii-fs.glsl", (function() {
					this.shader.uniforms.tAscii.value = i.ImageUtils.loadTexture(o.assetsPath + "/ascii/8x16_ascii_font_sorted.gif")
				}))
			}, o.ASCIIPass.prototype = Object.create(o.Pass.prototype), o.LEDPass = function() {
				o.Pass.call(this), this.loadShader("led-fs.glsl", (function() {})), this.params.pixelSize = 10, this.params.tolerance = .25, this.params.pixelRadius = .25, this.params.luminanceSteps = 100, this.params.luminanceBoost = .2, this.params.colorBoost = .01, this.params.burntOutPercent = 50
			}, o.LEDPass.prototype = Object.create(o.Pass.prototype), o.LEDPass.prototype.run = function(t) {
				this.shader.uniforms.pixelSize.value = this.params.pixelSize, this.shader.uniforms.tolerance.value = this.params.tolerance, this.shader.uniforms.pixelRadius.value = this.params.pixelRadius, this.shader.uniforms.luminanceSteps.value = this.params.luminanceSteps, this.shader.uniforms.luminanceBoost.value = this.params.luminanceBoost, this.shader.uniforms.colorBoost.value = this.params.colorBoost, this.shader.uniforms.burntOutPercent.value = this.params.burntOutPercent, t.pass(this.shader)
			}, o.HalftonePass = function() {
				o.Pass.call(this), this.loadShader("halftone-fs.glsl", (function() {
					this.shader.uniforms.pixelSize.value = 6
				}))
			}, o.HalftonePass.prototype = Object.create(o.Pass.prototype), o.Halftone2Pass = function() {
				o.Pass.call(this), this.loadShader("halftone2-fs.glsl"), this.params.amount = 128, this.params.smoothness = .25
			}, o.Halftone2Pass.prototype = Object.create(o.Pass.prototype), o.Halftone2Pass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, this.shader.uniforms.smoothness.value = this.params.smoothness, t.pass(this.shader)
			}, o.HalftoneCMYKPass = function() {
				o.Pass.call(this), this.loadShader("halftone-cmyk-fs.glsl", (function() {}))
			}, o.HalftoneCMYKPass.prototype = Object.create(o.Pass.prototype), o.CrossFadePass = function() {
				o.Pass.call(this), this.loadShader("crossfade-fs.glsl"), this.params.tInput2 = null, this.params.tFadeMap = null, this.params.amount = 0
			}, o.CrossFadePass.prototype = Object.create(o.Pass.prototype), o.CrossFadePass.prototype.run = function(t) {
				this.shader.uniforms.tInput2.value = this.params.tInput2, this.shader.uniforms.tFadeMap.value = this.params.tFadeMap, this.shader.uniforms.amount.value = this.params.amount, t.pass(this.shader)
			}, o.SSAOPass = function() {
				o.Pass.call(this), this.loadShader("ssao-fs.glsl", (function() {})), this.params.texture = null, this.params.isPacked = !1, this.params.onlyOcclusion = !1, this.blurPass = new o.FullBoxBlurPass, this.blendPass = new o.BlendPass, this.composer = null
			}, o.SSAOPass.prototype = Object.create(o.Pass.prototype), o.SSAOPass.prototype.run = function(t) {
				if (!this.composer) {
					var e = 4;
					this.composer = new o.Composer(t.renderer, {
						useRGBA : !0
					}), this.composer.setSize(t.width / e, t.height / e)
				}
				this.composer.reset(), this.composer.setSource(t.output), this.shader.uniforms.tDepth.value = this.params.texture, this.shader.uniforms.onlyOcclusion.value = this.params.onlyOcclusion, this.composer.pass(this.shader), this.blurPass.params.amount = .1, this.composer.pass(this.blurPass), this.params.onlyOcclusion ? t.setSource(this.composer.output) : (this.blendPass.params.mode = o.BlendMode.Multiply, this.blendPass.params.tInput2 = this.composer.output, t.pass(this.blendPass))
			}, o.SimpleSSAOPass = function() {
				o.Pass.call(this), this.loadShader("ssao-simple-fs.glsl", (function() {})), this.params.texture = null, this.params.onlyOcclusion = 0, this.params.zNear = 1, this.params.zFar = 1e4, this.params.strength = 1
			}, o.SimpleSSAOPass.prototype = Object.create(o.Pass.prototype), o.SimpleSSAOPass.prototype.run = function(t) {
				this.shader.uniforms.tDepth.value = this.params.texture, this.shader.uniforms.zNear.value = this.params.zNear, this.shader.uniforms.zFar.value = this.params.zFar, this.shader.uniforms.strength.value = this.params.strength, t.pass(this.shader)
			}, o.DirectionalBlurPass = function() {
				o.Pass.call(this), this.loadShader("guided-directional-blur-fs.glsl", (function() {})), this.params.tBias = null, this.params.delta = .1
			}, o.DirectionalBlurPass.prototype = Object.create(o.Pass.prototype), o.DirectionalBlurPass.prototype.run = function(t) {
				this.shader.uniforms.tBias.value = this.params.tBias, this.shader.uniforms.delta.value = this.params.delta, t.pass(this.shader)
			}, o.BleachPass = function() {
				o.Pass.call(this), this.loadShader("bleach-fs.glsl", (function() {})), this.params.amount = 1
			}, o.BleachPass.prototype = Object.create(o.Pass.prototype), o.BleachPass.prototype.run = function(t) {
				this.shader.uniforms.amount.value = this.params.amount, t.pass(this.shader)
			}, o.DOFPass = function() {
				o.Pass.call(this), this.loadShader("dof-fs.glsl"), this.params.focalDistance = 0, this.params.aperture = .005, this.params.tBias = null, this.params.blurAmount = 1
			}, o.DOFPass.prototype = Object.create(o.Pass.prototype), o.DOFPass.prototype.run = function(t) {
				this.shader.uniforms.tBias.value = this.params.tBias, this.shader.uniforms.focalDistance.value = this.params.focalDistance, this.shader.uniforms.aperture.value = this.params.aperture, this.shader.uniforms.blurAmount.value = this.params.blurAmount, this.shader.uniforms.delta.value.set(1, 0), t.pass(this.shader), this.shader.uniforms.delta.value.set(0, 1), t.pass(this.shader)
			}, r = function() {
				return o
			}.call(e, n, e, t), !(void 0 !== r && (t.exports = r))
		}).call(this)
	}).call(e, n(17))
}, function(t, e) {
	var n,
		i,
		r;
	!(function(o) {
		var a = /iPhone/i,
			s = /iPod/i,
			c = /iPad/i,
			u = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
			h = /Android/i,
			l = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
			d = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
			p = /IEMobile/i,
			f = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
			m = /BlackBerry/i,
			v = /BB10/i,
			g = /Opera Mini/i,
			y = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
			x = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
			b = /(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)/i,
			_ = function(t, e) {
				return t.test(e)
			},
			w = function(t) {
				var e = t || navigator.userAgent,
					n = e.split("[FBAN");
				if ("undefined" != typeof n[1] && (e = n[0]), this.apple = {
						phone : _(a, e),
						ipod : _(s, e),
						tablet : !_(a, e) && _(c, e),
						device : _(a, e) || _(s, e) || _(c, e)
					}, this.amazon = {
						phone : _(l, e),
						tablet : !_(l, e) && _(d, e),
						device : _(l, e) || _(d, e)
					}, this.android = {
						phone : _(l, e) || _(u, e),
						tablet : !_(l, e) && !_(u, e) && (_(d, e) || _(h, e)),
						device : _(l, e) || _(d, e) || _(u, e) || _(h, e)
					}, this.windows = {
						phone : _(p, e),
						tablet : _(f, e),
						device : _(p, e) || _(f, e)
					}, this.other = {
						blackberry : _(m, e),
						blackberry10 : _(v, e),
						opera : _(g, e),
						firefox : _(x, e),
						chrome : _(y, e),
						device : _(m, e) || _(v, e) || _(g, e) || _(x, e) || _(y, e)
					}, this.seven_inch = _(b, e), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window) return this
			},
			M = function() {
				var t = new w;
				return t.Class = w, t
			};
		"undefined" != typeof t && t.exports && "undefined" == typeof window ? t.exports = w : "undefined" != typeof t && t.exports && "undefined" != typeof window ? t.exports = M() : (i = [], n = o.isMobile = M(), r = "function" == typeof n ? n.apply(e, i) : n, !(void 0 !== r && (t.exports = r)))
	})(this)
},, function(t, e, n) {
	"use strict";(function(i) {
		Object.defineProperty(e, "__esModule", {
			value : !0
		});
		var r = n(1),
			o = n.n(r),
			a = n(49),
			s = n.n(a),
			c = n(4),
			u = n(109),
			h = n(120),
			l = (function() {
				function t(e) {
					var n = this,
						r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
						a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 100;
					o()(this, t), this._onDown = function(t) {
						n._isDown = !0, n._posCurr.set(t.x, t.y), n._posLast.set(t.x, t.y), u.onUp.add(n._onUp)
					}, this._onUp = function() {
						n._isDown = !1, u.onUp.remove(n._onUp)
					}, this._onMove = function(t) {
						if (n._isDown) {
							n._posLast.copy(n._posCurr), n._posCurr.set(t.x, t.y);
							var e = (n._posCurr.x - n._posLast.x) * n.speedMouse,
								i = (n._posCurr.y - n._posLast.y) * n.speedMouse;
							n._vx -= e * n.frictionVx, n._vy += i * n.frictionVy
						}
						var r = c.width >> 1,
							o = c.height >> 1;
						r - t.x, o - t.y
					}, this.onWheel = function(t) {
						n.noZoom || (0 > t.delta ? n.zoomOut() : n.zoomIn())
					}, this.zoomIn = function() {
						n.radius *= .98, n.radius < n.minRadius && (n.radius = n.minRadius)
					}, this.zoomOut = function() {
						n.radius *= 1.05, n.radius > n.maxRadius && (n.radius = n.maxRadius)
					}, this.update = function() {
						if (n._vx = Math.max(-n.speedMax, Math.min(n._vx, n.speedMax)), n._vy = Math.max(-n.speedMax, Math.min(n._vy, n.speedMax)), n._radius += .25 * (n.radius - n._radius), n._vx *= n.friction, n._vy *= n.friction, n.followTargetY ? n._phi += .005 * (.5 * Math.PI - n._phi) : n._phi -= n._vy, n.followTargetX ? n._theta += .09 * (n.targetX - n._theta) : n._theta -= n._vx, n._phi %= 2 * Math.PI, 0 > n._phi && (n._phi += 2 * Math.PI), n._theta %= 2 * Math.PI, 0 > n._theta && (n._theta += 2 * Math.PI), n.isPhiRestricted) {
							var t = Math.max(n.minPhi, Math.min(n.maxPhi, n._phi));
							n._phi += .15 * (t - n._phi)
						}
						n.camera.position.x = n.offset.x + n.target.x + n._radius * Math.sin(n._phi) * Math.cos(n._theta), n.camera.position.y = n.offset.y + n.target.y + n._radius * Math.cos(n._phi), n.camera.position.z = n.offset.z + n.target.z + n._radius * Math.sin(n._phi) * Math.sin(n._theta), n.camera.lookAt(new i.Vector3(n.target.x + n.offset.x, n.target.y + n.offset.y, n.target.z + n.offset.z))
					}, this.camera = e, this.target = r || new i.Vector3, this.targetBase = r || new i.Vector3, this._radius = this.radius = a || this.camera.position.distanceTo(this.target) || 1, this._domEvents = document.getElementById("three"), this._isDown = !1, this._isActive = !0, this.offset = new i.Vector3, this._isFreeze = !1, this.cameraAddPosition = new i.Vector3(0, 0, 0), this.speedMouse = 1, this.speedMax = 1, this.targetX = 0, this.followTargetX = !1, this.followTargetY = !1, this.friction = .968, this.frictionVx = 8e-4, this.frictionVy = 6e-4, this.bouncing = !0, this._posCurr = new i.Vector2, this._posLast = new i.Vector2, this._vx = 0, this._vy = 0, this._phi = .5 * Math.PI, this._theta = .5 * Math.PI, this.isPhiRestricted = !0, this.minPhi = Math.PI / 8, this.maxPhi = 1.7, this.noZoom = !1, this.minRadius = 0, this.maxRadius = Number.MAX_VALUE, this.activate(), this.update(), this.camera.updateMatrixWorld()
				}
				return t.prototype.activate = function() {
						u.onDown.add(this._onDown), u.onMove.add(this._onMove), h.add(this.onWheel)
					}, t.prototype.deactivate = function() {
						u.onDown.remove(this._onDown), u.onMove.remove(this._onMove), h.remove(this.onWheel)
					}, s()(t, [ {
						key : "isActive",
						get : function() {
							return this._isActive
						},
						set : function(t) {
							this._isActive = t, t ? this.activate() : this.deactivate()
						}
					} ]), t
			})();
		t.exports = l
	}).call(e, n(17))
}, function(t, e, n) {
	var i,
		r;
	!(function(o, a) {
		"undefined" != typeof t && t.exports ? t.exports = a() : (i = a, r = "function" == typeof i ? i.call(e, n, e, t) : i, !(void 0 !== r && (t.exports = r)))
	})("bowser", (function() {
		function t(t) {
			function n(e) {
				var n = t.match(e);
				return n && 1 < n.length && n[1] || ""
			}
			function i(e) {
				var n = t.match(e);
				return n && 1 < n.length && n[2] || ""
			}
			var r,
				o = n(/(ipod|iphone|ipad)/i).toLowerCase(),
				a = /like android/i.test(t),
				s = !a && /android/i.test(t),
				c = /CrOS/.test(t),
				u = n(/edge\/(\d+(\.\d+)?)/i),
				h = n(/version\/(\d+(\.\d+)?)/i),
				l = /tablet/i.test(t),
				d = !l && /[^-]mobi/i.test(t);
			/opera|opr/i.test(t) ? r = {
				name : "Opera",
				opera : e,
				version : h || n(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
			} : /yabrowser/i.test(t) ? r = {
				name : "Yandex Browser",
				yandexbrowser : e,
				version : h || n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
			} : /windows phone/i.test(t) ? (r = {
				name : "Windows Phone",
				windowsphone : e
			}, u ? (r.msedge = e, r.version = u) : (r.msie = e, r.version = n(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? r = {
				name : "Internet Explorer",
				msie : e,
				version : n(/(?:msie |rv:)(\d+(\.\d+)?)/i)
			} : c ? r = {
				name : "Chrome",
				chromeBook : e,
				chrome : e,
				version : n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
			} : /chrome.+? edge/i.test(t) ? r = {
				name : "Microsoft Edge",
				msedge : e,
				version : u
			} : /chrome|crios|crmo/i.test(t) ? r = {
				name : "Chrome",
				chrome : e,
				version : n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
			} : o ? (r = {
				name : "iphone" == o ? "iPhone" : "ipad" == o ? "iPad" : "iPod"
			}, h && (r.version = h)) : /sailfish/i.test(t) ? r = {
				name : "Sailfish",
				sailfish : e,
				version : n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
			} : /seamonkey\//i.test(t) ? r = {
				name : "SeaMonkey",
				seamonkey : e,
				version : n(/seamonkey\/(\d+(\.\d+)?)/i)
			} : /firefox|iceweasel/i.test(t) ? (r = {
				name : "Firefox",
				firefox : e,
				version : n(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
			}, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (r.firefoxos = e)) : /silk/i.test(t) ? r = {
				name : "Amazon Silk",
				silk : e,
				version : n(/silk\/(\d+(\.\d+)?)/i)
			} : s ? r = {
				name : "Android",
				version : h
			} : /phantom/i.test(t) ? r = {
				name : "PhantomJS",
				phantom : e,
				version : n(/phantomjs\/(\d+(\.\d+)?)/i)
			} : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? r = {
				name : "BlackBerry",
				blackberry : e,
				version : h || n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
			} : /(web|hpw)os/i.test(t) ? (r = {
				name : "WebOS",
				webos : e,
				version : h || n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
			}, /touchpad\//i.test(t) && (r.touchpad = e)) : r = /bada/i.test(t) ? {
				name : "Bada",
				bada : e,
				version : n(/dolfin\/(\d+(\.\d+)?)/i)
			} : /tizen/i.test(t) ? {
				name : "Tizen",
				tizen : e,
				version : n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || h
			} : /safari/i.test(t) ? {
				name : "Safari",
				safari : e,
				version : h
			} : {
				name : n(/^(.*)\/(.*) /),
				version : i(/^(.*)\/(.*) /)
			}, !r.msedge && /(apple)?webkit/i.test(t) ? (r.name = r.name || "Webkit", r.webkit = e, !r.version && h && (r.version = h)) : !r.opera && /gecko\//i.test(t) && (r.name = r.name || "Gecko", r.gecko = e, r.version = r.version || n(/gecko\/(\d+(\.\d+)?)/i)), r.msedge || !s && !r.silk ? o && (r[o] = e, r.ios = e) : r.android = e;var p = "";
			r.windowsphone ? p = n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : o ? (p = n(/os (\d+([_\s]\d+)*) like mac os x/i), p = p.replace(/[_\s]/g, ".")) : s ? p = n(/android[ \/-](\d+(\.\d+)*)/i) : r.webos ? p = n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : r.blackberry ? p = n(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : r.bada ? p = n(/bada\/(\d+(\.\d+)*)/i) : r.tizen && (p = n(/tizen[\/\s](\d+(\.\d+)*)/i)), p && (r.osversion = p);var f = p.split(".")[0];
			return l || "ipad" == o || s && (3 == f || 4 == f && !d) || r.silk ? r.tablet = e : (d || "iphone" == o || "ipod" == o || s || r.blackberry || r.webos || r.bada) && (r.mobile = e), r.msedge || r.msie && 10 <= r.version || r.yandexbrowser && 15 <= r.version || r.chrome && 20 <= r.version || r.firefox && 20 <= r.version || r.safari && 6 <= r.version || r.opera && 10 <= r.version || r.ios && r.osversion && 6 <= r.osversion.split(".")[0] || r.blackberry && 10.1 <= r.version ? r.a = e : r.msie && 10 > r.version || r.chrome && 20 > r.version || r.firefox && 20 > r.version || r.safari && 6 > r.version || r.opera && 10 > r.version || r.ios && r.osversion && 6 > r.osversion.split(".")[0] ? r.c = e : r.x = e, r
		}
		var e = !0,
			n = t("undefined" == typeof navigator ? "" : navigator.userAgent);
		return n.test = function(t) {
				for (var e = 0; e < t.length; ++e) {
					var i = t[e];
					if ("string" == typeof i && i in n) return !0
				}
				return !1
			}, n._detect = t, n
	}))
}, function(t, e, n) {
	var i = n(5),
		r = new i,
		o = t.exports.options = {
			noDefaultWheel : !1,
			single : !1
		},
		a = 0,
		s = 0,
		c = function(t) {
			var e = {
				direction : t.deltaY && 0 > t.deltaY || 0 > t.detail || 0 < t.wheelDelta ? 1 : -1,
				delta : t.detail || t.wheelDelta || t.deltaY,
				original : t
			};
			return 0 == e.delta && 0 == t.deltaY && (e.direction = 0), e
		},
		u = "onwheel" in document.createElement("div") ? "wheel" : void 0 === document.onmousewheel ? "DOMMouseScroll" : "mousewheel";
	window.addEventListener(u, (function(t) {
		o.noDefaultWheel && t.preventDefault();
		var e = c(t);
		if (o.single && 100 > Date.now() - s) {
			if (s = Date.now(), 0 == e.delta && 0 != a) return void (a = 0);
			if (0 == a)
				a = e.direction;else {
				if (e.direction == a) return;
				a = e.direction
			}
		}
		s = Date.now(), r.dispatch(e)
	})), t.exports = r
}, function(t, e, n) {
	"use strict";Object.defineProperty(e, "__esModule", {
		value : !0
	});
	var i = n(1),
		r = n.n(i),
		o = n(59),
		a = n(118),
		s = n(122),
		c = n(123),
		u = (function() {
			function t() {
				r()(this, t), o.renderer.gammaInput = !1, o.renderer.gammaOutput = !1, o.control = new a(o.camera, null, 200), o.control.isActive = !1, o.control.noZoom = !0
			}
			return t.prototype.init = function() {
					var t = this;
					this.isInit || (this.isInit = !0, this.background = new s, this.star = new c, n.e(4).then(function() {
						if (t.isInit) {
							var e = document.querySelector("#christmasxp-fireworks"),
								i = n(110).default;
							e && (t.fireworks = new i(e), e.style.display = "")
						}
					}.bind(null, n)).catch(n.oe), o.add(this.background), o.add(this.star), o.activate(), o.resize(), o.render())
				}, t.prototype.dispose = function() {
					if (this.isInit = !1, o.remove(this.background), o.remove(this.star), this.background.dispose(), this.star.dispose(), this.background = null, this.star = null, o.deactivate(), this.fireworks) {
						this.fireworks.dispose(), this.fireworks = null;
						var t = document.querySelector("#christmasxp-fireworks");
						t.parentNode.removeChild(t), t.style.display = "none"
					}
				}, t
		})();
	t.exports = new u
}, function(t, e, n) {
	"use strict";(function(i) {
		Object.defineProperty(e, "__esModule", {
			value : !0
		});
		var r = n(1),
			o = n.n(r),
			a = n(25),
			s = n.n(a),
			c = n(24),
			u = n.n(c),
			h = n(4);
		n(59);
		var l = (function(t) {
			function e() {
				o()(this, e);var r = new i.PlaneBufferGeometry(1, 1, 1, 1),
					a = new i.ShaderMaterial({
						vertexShader : n(131),
						fragmentShader : n(130),
						uniforms : {
							time : {
								type : "f",
								value : 0
							},
							intensity : {
								type : "f",
								value : .9
							},
							offsetY : {
								type : "f",
								value : 0
							},
							colorbottom : {
								type : "v3",
								value : new i.Color(2560039)
							},
							colortop : {
								type : "v3",
								value : new i.Color(1316391)
							}
						},
						depthTest : !1,
						depthWrite : !1
					}),
					c = s()(this, t.call(this, r, a));
				return c.onUpdate = function(t) {
						c.material.uniforms.time.value += t / 1e4, c.material.uniforms.time.value %= 100
					}, c.dispose = function() {
						c.geometry.dispose(), c.material.dispose(), h.onUpdate.remove(c.onUpdate)
					}, c.frustumCulled = !1, c.geometry = r, h.onUpdate.add(c.onUpdate), c
			}
			return u()(e, t), e
		})(i.Mesh);
		t.exports = l
	}).call(e, n(17))
}, function(t, e, n) {
	"use strict";(function(i) {
		Object.defineProperty(e, "__esModule", {
			value : !0
		});
		var r = n(1),
			o = n.n(r),
			a = n(25),
			s = n.n(a),
			c = n(24),
			u = n.n(c),
			h = n(4);
		n(59);
		var l = (function(t) {
			function e() {
				o()(this, e);
				for (var r = new i.BufferGeometry, a = 1e3, c = new Float32Array(3 * a), u = new Float32Array(3 * a), l = new Float32Array(a), d = new Float32Array(a), p = (new i.TextureLoader).load("img/particle.png"), f = 0, m = [ {
							r : 2 * (180 / 255),
							g : 2 * (16 / 255),
							b : 2 * (218 / 255)
						}, {
							r : 1,
							g : 1,
							b : 1
						}, {
							r : 2 * (7 / 255),
							g : 2 * (7 / 255),
							b : 2 * (90 / 255)
						} ], v = 0; v < a; v++) {
					f = 3 * v, 300 * Math.random(), c[f + 0] = 600 * (Math.random() - .5), c[f + 1] = 400 * Math.random(), c[f + 2] = 0;var g = m[Math.floor(Math.random() * m.length)];
					u[f] = g.r, u[f + 1] = g.g, u[f + 2] = g.b, l[v] = 2 + 4 * Math.random(), d[v] = 1e3 * Math.random()
				}
				r.addAttribute("position", new i.BufferAttribute(c, 3)), r.addAttribute("color", new i.BufferAttribute(u, 3)), r.addAttribute("aSize", new i.BufferAttribute(l, 1)), r.addAttribute("aTime", new i.BufferAttribute(d, 1));var y = new i.ShaderMaterial({
						vertexShader : n(133),
						fragmentShader : n(132),
						uniforms : {
							map : {
								type : "t",
								value : p
							},
							time : {
								type : "f",
								value : 0
							},
							offsetY : {
								type : "f",
								value : 0
							}
						},
						transparent : !0,
						blending : i.AdditiveBlending,
						depthTest : !1
					}),
					x = s()(this, t.call(this, r, y));
				return x.onUpdate = function(t) {
						x.material.uniforms.time.value += t / 2e3
					}, x.dispose = function() {
						h.onUpdate.remove(x.onUpdate), x.geometry.dispose(), x.material.dispose()
					}, x.geometry = r, h.onUpdate.add(x.onUpdate), x
			}
			return u()(e, t), e
		})(i.Points);
		t.exports = l
	}).call(e, n(17))
}, function(t, e, n) {
	n(126);
	var i = n(13).Object;
	t.exports = function(t, e, n) {
		return i.defineProperty(t, e, n)
	}
},, function(t, e, n) {
	var i = n(20);
	i(i.S + i.F * !n(19), "Object", {
		defineProperty : n(16).f
	})
}, function(t) {
	function e(t, e) {
		if (t.indexOf) return t.indexOf(e);
		for (var n = 0, i = t.length; n < i; n++)
			if (t[n] === e) return n;
		return -1
	}
	function n(t) {
		return this instanceof n ? (!t && (t = {}), t.nodeType && (t = {
			el : t
		}), this.opts = t, this.el = t.el || document.body, void ("object" != typeof this.el && (this.el = document.querySelector(this.el)))) : new n(t)
	}
	t.exports = function(t) {
		return new n(t)
	}, n.prototype.add = function(t) {
		var n = this.el;
		if (n) {
			if ("" === n.className) return n.className = t;
			var i = n.className.split(" ");
			return -1 < e(i, t) ? i : (i.push(t), n.className = i.join(" "), i)
		}
	}, n.prototype.remove = function(t) {
		var n = this.el;
		if (n && "" !== n.className) {
			var i = n.className.split(" "),
				r = e(i, t);
			return -1 < r && i.splice(r, 1), n.className = i.join(" "), i
		}
	}, n.prototype.has = function(t) {
		var n = this.el;
		if (n) {
			var i = n.className.split(" ");
			return -1 < e(i, t)
		}
	}, n.prototype.toggle = function(t) {
		var e = this.el;
		e && (this.has(t) ? this.remove(t) : this.add(t))
	}
}, function(t, e, n) {
	function i(t) {
		for (var e, n = [], i = 0, r = 0, o = ""; null != (e = m.exec(t));) {
			var s = e[0],
				c = e[1],
				u = e.index;
			if (o += t.slice(r, u), r = u + s.length, c)
				o += c[1];else {
				o && (n.push(o), o = "");
				var h = e[2],
					l = e[3],
					d = e[4],
					p = e[5],
					f = e[6],
					v = e[7],
					g = h || "/",
					y = d || p || (v ? ".*" : "[^" + g + "]+?");
				n.push({
					name : l || i++,
					prefix : h || "",
					delimiter : g,
					optional : "?" === f || "*" === f,
					repeat : "+" === f || "*" === f,
					pattern : a(y)
				})
			}
		}
		return r < t.length && (o += t.substr(r)), o && n.push(o), n
	}
	function r(t) {
		for (var e = Array(t.length), n = 0; n < t.length; n++) "object" == typeof t[n] && (e[n] = new RegExp("^" + t[n].pattern + "$"));
		return function(n) {
			for (var i = "", r = n || {}, o = 0; o < t.length; o++) {
				var a = t[o];
				if ("string" != typeof a) {
					var s,
						c = r[a.name];
					if (null == c) {
						if (a.optional) continue;
						throw new TypeError('Expected "' + a.name + '" to be defined')
					}
					if (f(c)) {
						if (!a.repeat)
							throw new TypeError('Expected "' + a.name + '" to not repeat, but received "' + c + '"');
						if (0 === c.length) {
							if (a.optional) continue;
							throw new TypeError('Expected "' + a.name + '" to not be empty')
						}
						for (var u = 0; u < c.length; u++) {
							if (s = encodeURIComponent(c[u]), !e[o].test(s))
								throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '", but received "' + s + '"');
							i += (0 === u ? a.prefix : a.delimiter) + s
						}
					} else {
						if (s = encodeURIComponent(c), !e[o].test(s))
							throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but received "' + s + '"');
						i += a.prefix + s
					}
				} else
					i += a
			}
			return i
		}
	}
	function o(t) {
		return t.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1")
	}
	function a(t) {
		return t.replace(/([=!:$\/()])/g, "\\$1")
	}
	function s(t, e) {
		return t.keys = e, t
	}
	function c(t) {
		return t.sensitive ? "" : "i"
	}
	function u(t, e) {
		var n = t.source.match(/\((?!\?)/g);
		if (n)
			for (var i = 0; i < n.length; i++) e.push({
					name : i,
					prefix : null,
					delimiter : null,
					optional : !1,
					repeat : !1,
					pattern : null
				});
		return s(t, e)
	}
	function h(t, e, n) {
		for (var i = [], r = 0; r < t.length; r++) i.push(p(t[r], e, n).source);
		var o = new RegExp("(?:" + i.join("|") + ")", c(n));
		return s(o, e)
	}
	function l(t, e, n) {
		for (var r = i(t), o = d(r, n), a = 0; a < r.length; a++) "string" != typeof r[a] && e.push(r[a]);
		return s(o, e)
	}
	function d(t, e) {
		e = e || {};
		for (var n = e.strict, i = !1 !== e.end, r = "", a = t[t.length - 1], s = "string" == typeof a && /\/$/.test(a), u = 0; u < t.length; u++) {
			var h = t[u];
			if ("string" == typeof h)
				r += o(h);else {
				var l = o(h.prefix),
					d = h.pattern;
				h.repeat && (d += "(?:" + l + d + ")*"), d = h.optional ? l ? "(?:" + l + "(" + d + "))?" : "(" + d + ")?" : l + "(" + d + ")", r += d
			}
		}
		return n || (r = (s ? r.slice(0, -2) : r) + "(?:\\/(?=$))?"), r += i ? "$" : n && s ? "" : "(?=\\/|$)", new RegExp("^" + r, c(e))
	}
	function p(t, e, n) {
		return e = e || [], f(e) ? !n && (n = {}) : (n = e, e = []), t instanceof RegExp ? u(t, e, n) : f(t) ? h(t, e, n) : l(t, e, n)
	}
	var f = n(108);
	t.exports = p, t.exports.parse = i, t.exports.compile = function(t) {
		return r(i(t))
	}, t.exports.tokensToFunction = r, t.exports.tokensToRegExp = d;
	var m = new RegExp([ "(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))" ].join("|"), "g")
}, function(t) {
	function e() {
		throw new Error("setTimeout has not been defined")
	}
	function n() {
		throw new Error("clearTimeout has not been defined")
	}
	function i(t) {
		if (u === setTimeout) return setTimeout(t, 0);
		if ((u === e || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);
		try {
			return u(t, 0)
		} catch (e) {
			try {
				return u.call(null, t, 0)
			} catch (e) {
				return u.call(this, t, 0)
			}
		}
	}
	function r(t) {
		if (h === clearTimeout) return clearTimeout(t);
		if ((h === n || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
		try {
			return h(t)
		} catch (e) {
			try {
				return h.call(null, t)
			} catch (e) {
				return h.call(this, t)
			}
		}
	}
	function o() {
		f && d && (f = !1, d.length ? p = d.concat(p) : m = -1, p.length && a())
	}
	function a() {
		if (!f) {
			var t = i(o);
			f = !0;
			for (var e = p.length; e;) {
				for (d = p, p = []; ++m < e;) d && d[m].run();
				m = -1, e = p.length
			}
			d = null, f = !1, r(t)
		}
	}
	function s(t, e) {
		this.fun = t, this.array = e
	}
	function c() {
	}
	var u,
		h,
		l = t.exports = {};
	!(function() {
		try {
			u = "function" == typeof setTimeout ? setTimeout : e
		} catch (t) {
			u = e
		} try {
			h = "function" == typeof clearTimeout ? clearTimeout : n
		} catch (t) {
			h = n
		}
	})();
	var d,
		p = [],
		f = !1,
		m = -1;
	l.nextTick = function(t) {
		var e = Array(arguments.length - 1);
		if (1 < arguments.length)
			for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
		p.push(new s(t, e)), 1 !== p.length || f || i(a)
	}, s.prototype.run = function() {
		this.fun.apply(null, this.array)
	}, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = c, l.addListener = c, l.once = c, l.off = c, l.removeListener = c, l.removeAllListeners = c, l.emit = c, l.binding = function() {
		throw new Error("process.binding is not supported")
	}, l.cwd = function() {
		return "/"
	}, l.chdir = function() {
		throw new Error("process.chdir is not supported")
	}, l.umask = function() {
		return 0
	}
}, function(t) {
	t.exports = "#define PI 3.14159265359\n\nvarying vec2 vUv;\nuniform float time;\nuniform float intensity;\nuniform float offsetY;\nuniform vec3 colorbottom;\nuniform vec3 colortop;\n\n// Simplex Noise2D\n// https://www.shadertoy.com/view/4sdGD8\n// optimized by David Ronai @makio64 & FabriceNeyret2\n\n#define X .211324865405187\n#define Y .36602540378443\n#define Z -.577350269189626\n#define W .024390243902439\nvec3 permute(vec3 x) { return mod( x*x*34.+x, 289.); }\nfloat snoise(vec2 v) {\n\tvec2 i = floor(v + (v.x+v.y)*Y),\n\t  x0 = v -   i + (i.x+i.y)*X,\n\t   j = step(x0.yx, x0),\n\t  x1 = x0+X-j,\n\t  x3 = x0+Z;\n\t  i = mod(i,289.);\n\t  vec3 p = permute( permute( i.y + vec3(0, j.y, 1 ))\n\t\t\t\t\t\t\t\t  + i.x + vec3(0, j.x, 1 )   ),\n\t   m = max( .5 - vec3(dot(x0,x0), dot(x1,x1), dot(x3,x3)), 0.),\n\t   x = 2. * fract(p * W) - 1.,\n\t   h = abs(x) - .5,\n\t  a0 = x - floor(x + .5),\n\t   g = a0 * vec3(x0.x,x1.x,x3.x)\n\t\t  + h * vec3(x0.y,x1.y,x3.y);\n\tm = m*m*m*m* ( 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ) );\n\treturn .5 + 65. * dot(m, g);\n}\n\n\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n\nvoid main(void) {\n\tvec3 color = mix(colorbottom,colortop,vUv.y);\n\tcolor -= snoise( vUv*1.1 + time*1.1 - vec2(0.,offsetY) )*.1-.05;\n\tfloat dx = rand( vUv + time );\n\tvec3 result = 1.2 * color * clamp( 0.1 + dx, 0.0, 1.0 );\n\tresult = color + clamp( intensity, 0.0, 1.0 ) * ( result - color );\n\tgl_FragColor = vec4(result,1.);\n}\n"
}, function(t) {
	t.exports = "varying vec2 vUv;\n// varying vec3 vPos;\r\n\r\nvoid main() {\r\n\tvUv = uv;\n\tgl_Position = vec4( position.x*2., position.y*2., 0., 1.0 );\n}\r\n"
}, function(t) {
	t.exports = "uniform sampler2D map;\nvarying vec4 vColor;\n\nvoid main(void) {\n\tgl_FragColor = vColor * texture2D(map, gl_PointCoord);\n}\n"
}, function(t) {
	t.exports = "attribute float aSize;\nattribute float aTime;\nattribute vec3 color;\n\nvarying vec4 vColor;\n\nuniform float time;\nuniform float offsetY;\n\nvoid main() {\n\tfloat t = time + aTime;\n\tgl_PointSize = aSize * (.3 + abs(sin(t)*.7) );\n\tfloat percent = mod(t*5.,80.)/80.;\n\tvec3 pos = position;\n\tvColor = vec4(color,smoothstep(0., .1, percent)*smoothstep(0., .1, 1.-percent));\n\tpos.y += offsetY * aSize;\n\tpos.y = mod(pos.y,400.)-200.+sin(t*.7)*7.;\n\tpos.x += percent*60.;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\n}\n"
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function(t, e, n) {
	"use strict";Object.defineProperty(e, "__esModule", {
		value : !0
	});
	var i = n(38),
		r = n.n(i),
		o = n(1),
		a = n.n(o),
		s = (function() {
			function t(e) {
				a()(this, t), c.call(this), this.size = e / 2, this.canvas = document.createElement("canvas"), this.canvas.width = e, this.canvas.height = e, this.ctx = this.canvas.getContext("2d", !0), this.generateShape(), this.draw()
			}
			return t.prototype.generateShape = function() {
					this.angle = Math.floor(5 + 3 * Math.random()), this.shapes = [ {
						type : "space",
						end : .2 + .2 * Math.random()
					}, {
						type : "line",
						end : .6
					} ], .5 < Math.random() && this.shapes.push({
						type : "space",
						end : .65 + .1 * Math.random()
					}), this.shapes.push({
						type : "square",
						end : .8
					}), this.shapes.push({
						type : "line",
						end : .9
					}), this.shapes.push({
						type : "square",
						end : 1
					})
				}, t.prototype.copy = function(t) {
					this.shapes = t.shapes, this.angle = t.angle, this.draw()
				}, t
		})(),
		c = function() {
			var t = this;
			this.draw = function() {
				t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height), t.ctx.strokeStyle = "#FFFFFF", t.ctx.lineWidth = 1;
				for (var e = t.size, n = Math.random(), i = 0; i < t.angle; i++) {
					var o = 2 * (i / t.angle * Math.PI) + Math.PI;
					t.ctx.save(), t.ctx.translate(e, e), t.ctx.rotate(o), t.ctx.moveTo(0, 0);
					for (var a = 0, s = t.shapes, c = Array.isArray(s), u = 0, s = c ? s : r()(s);;) {
						var h;
						if (c) {
							if (u >= s.length) break;
							h = s[u++]
						} else {
							if (u = s.next(), u.done) break;
							h = u.value
						}
						var l = h;
						switch (l.type) {
						case "space":
							t.ctx.moveTo(0, l.end * e);
							break;case "line":
							t.ctx.lineTo(0, l.end * e);
							break;case "square":
							var d = l.end * e - a;
							t.ctx.lineTo(d / 2, a + d / 2), t.ctx.lineTo(0, a + d), t.ctx.moveTo(0, a), t.ctx.lineTo(-d / 2, a + d / 2), t.ctx.lineTo(0, a + d)
						}
						a = l.end * e
					}
					if (t.ctx.stroke(), t.ctx.restore(), t.ctx.save(), t.ctx.translate(e, e), .5 < n) {
						var p = t.shapes[0].end * e,
							f = 2 * ((i + 1) / t.angle * Math.PI);
						t.ctx.moveTo(Math.cos(o) * p, Math.sin(o) * p), t.ctx.lineTo(Math.cos(f) * p, Math.sin(f) * p)
					} else {
						var m = t.shapes[0].end * e;
						o = 2 * (i / t.angle * Math.PI) + 1.5 * Math.PI;
						var v = 2 * ((i + 1) / t.angle * Math.PI) + 1.5 * Math.PI;
						t.ctx.moveTo(Math.cos(o) * m, Math.sin(o) * m), t.ctx.lineTo(Math.cos(v) * m, Math.sin(v) * m)
					}
					t.ctx.stroke(), t.ctx.restore()
				}
			}, this.animIn = function() {}, this.animOut = function() {}, this.resize = function() {
				draw()
			}
		};
	t.exports = s
} ]);