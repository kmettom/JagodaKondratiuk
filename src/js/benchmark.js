(function() {
    'use strict';
    var f = Math.abs,
        g = Math.pow,
        h = Math.cos,
        j = Math.PI;

    function a(a) {
        window.addEventListener ? addEventListener("load", a, !1) : window.attachEvent ? attachEvent("onload", a) : onload = a
    }

    function b(a, b, c) {
        return (1 - c) * a + c * b
    }

    function c(a, b, c) {
        function d(a) {
            g = a, h = g + b.duration, e(a)
        }

        function e(d) {
            if (!f) {
                d - g >= b.duration && (f = !0);
                var h = (d - g) / b.duration,
                    i = k[c](h),
                    j = b.start + (b.end - b.start) * i;
                a.style[b.css_key] = "transform" === b.css_key ? b.css_value + "(" + j + b.unit + ")" : j, requestAnimationFrame(e)
            }
        }
        var f = !1,
            g = null,
            h = null;
        b.delay ? setTimeout(function() {
            requestAnimationFrame(d)
        }, b.delay) : requestAnimationFrame(d)
    }

    function d(a, b, c, d, e) {
        function f(a) {
            i = a, j = i + b.duration, g(a)
        }

        function g(f) {
            if (!h) {
                f - i >= b.duration && (h = !0);
                var j = (f - i) / b.duration,
                    l = k[e](j),
                    m = c[0] + (d[0] - c[0]) * l,
                    n = c[1] + (d[1] - c[1]) * l,
                    o = c[2] + (d[2] - c[2]) * l,
                    p = c[3] + (d[3] - c[3]) * l,
                    q = c[4] + (d[4] - c[4]) * l,
                    r = c[5] + (d[5] - c[5]) * l,
                    s = c[6] + (d[6] - c[6]) * l,
                    t = c[7] + (d[7] - c[7]) * l;
                a.style.clipPath = "polygon(" + m + "% " + n + "%, " + o + "% " + p + "%, " + q + "% " + r + "%, " + s + "% " + t + "%)", requestAnimationFrame(g)
            }
        }
        var h = !1,
            i = null,
            j = null;
        b.delay ? setTimeout(function() {
            requestAnimationFrame(f)
        }, b.delay) : requestAnimationFrame(f)
    }
    var k = {
            linear: function(a) {
                return a
            },
            i1: function(a) {
                return -h(a * (j / 2)) + 1
            },
            o1: function(a) {
                return Math.sin(a * (j / 2))
            },
            io1: function(a) {
                return -.5 * (h(j * a) - 1)
            },
            i2: function(a) {
                return a * a
            },
            o2: function(a) {
                return a * (2 - a)
            },
            io2: function(a) {
                return .5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
            },
            i3: function(a) {
                return a * a * a
            },
            o3: function(a) {
                return --a * a * a + 1
            },
            io3: function(a) {
                return .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
            },
            i4: function(a) {
                return a * a * a * a
            },
            o4: function(a) {
                return 1 - --a * a * a * a
            },
            io4: function(a) {
                return .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a
            },
            i5: function(a) {
                return a * a * a * a * a
            },
            o5: function(a) {
                return 1 + --a * a * a * a * a
            },
            io5: function(a) {
                return .5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a
            },
            i6: function(a) {
                return 0 === a ? 0 : g(2, 10 * (a - 1))
            },
            o6: function(a) {
                return 1 === a ? 1 : -g(2, -10 * a) + 1
            },
            io6: function(a) {
                return 0 === a ? 0 : 1 === a ? 1 : 1 > (a /= .5) ? .5 * g(2, 10 * (a - 1)) : .5 * (-g(2, -10 * --a) + 2)
            }
        },
        l = {
            uA: navigator.userAgent.toLowerCase(),
            get isMobileIE() {
                return /iemobile/i.test(this.uA)
            },
            get isMobileOpera() {
                return /opera mini/i.test(this.uA)
            },
            get isIOS() {
                return /iphone|ipad|ipod/i.test(this.uA)
            },
            get isBlackberry() {
                return /blackberry/i.test(this.uA)
            },
            get isMobileAndroid() {
                return /android.*mobile/.test(this.uA)
            },
            get isAndroid() {
                return this.isMobileAndroid || !this.isMobileAndroid && /android/i.test(this.uA)
            },
            get isFirefox() {
                return -1 < this.uA.indexOf("firefox")
            },
            get safari() {
                return this.uA.match(/version\/[\d\.]+.*safari/)
            },
            get isSafari() {
                return !!this.safari && !this.isAndroid
            },
            get isSafariOlderThan8() {
                var a = 8;
                if (this.isSafari) {
                    var b = this.safari[0].match(/version\/\d{1,2}/);
                    a = +b[0].split("/")[1]
                }
                return a < 8
            },
            get isIEolderThan11() {
                return -1 < this.uA.indexOf("msie")
            },
            get isIE11() {
                return 0 < navigator.appVersion.indexOf("Trident/")
            },
            get isIE() {
                return this.isIEolderThan11 || this.isIE11
            },
            get isEdge() {
                return /Edge\/\d./i.test(this.uA)
            },
            get isMac() {
                return -1 < navigator.platform.toLowerCase().indexOf("mac")
            },
            get isMobile() {
                return this.isMobileAndroid || this.isBlackberry || this.isIOS || this.isMobileOpera || this.isMobileIE
            },
            get isTouch() {
                return "ontouchstart" in window
            }
        },
        m = function() {
            this.static_elements = [], this.scrl_element = void 0, this.Y_pos = 0, this.Y_dest = 0, this.slow = l.isFirefox ? 1 : 1.65, this.moz_balancing = l.isFirefox ? 20 : 1, this.key_scroll_size = 80, this.touchScrollSize = 20
        };
    m.prototype.init = function() {
        if (l.isMobile) {
            var a = document.getElementsByTagName("main")[0];
            return a.style.height = "auto", a.style.position = "relative", a.style.top = "auto", a.style.left = "auto", void(a.style.overflow = "auto")
        }
        this.refresh(), this.init_events_handlers(), this.render()
    }, m.prototype.scroll_top = function() {
        this.Y_dest = 0
    }, m.prototype.scroll_window_height = function() {
        this.Y_dest = window.innerHeight
    }, m.prototype.scroll_top_slow = function() {
        return (this.scroll_top_speed = 50, 0 > this.Y_dest - this.scroll_top_speed) ? void(this.Y_dest = 0) : void(this.Y_dest -= this.scroll_top_speed, requestAnimationFrame(this.scroll_top_slow.bind(this)))
    }, m.prototype.disable_scroll = function() {
        this.is_disable = !0
    }, m.prototype.enable_scroll = function() {
        this.is_disable = !1
    }, m.prototype.refresh = function() {
        this.init_elements(), this.get_doc_height(), this.top_btn = document.getElementById("_top"), this.top_btn && (this.top_btn.onclick = this.scroll_top.bind(this)), this.helper_btn = document.getElementsByClassName("_scrl-helper")[0], this.helper_btn && (this.helper_btn.onclick = this.scroll_window_height.bind(this))
    }, m.prototype.init_elements = function() {
        this.scrl_elements = [], this.Y_dest = 0, this.Y_pos = 0;
        for (var a = 0; a < this.static_elements.length; a++) this.scrl_elements.push(this.static_elements[a]);
        this.dynamics_elements = document.getElementsByClassName("page")[0].children;
        for (var a = 0; a < this.dynamics_elements.length; a++) this.scrl_elements.push(this.dynamics_elements[a])
    }, m.prototype.get_doc_height = function() {
        this.max_scroll = 0;
        for (var a = 0; a < this.scrl_elements.length; a++) this.max_scroll += this.scrl_elements[a].offsetHeight;
        this.max_scroll -= window.innerHeight, this.Y_dest > this.max_scroll && (this.Y_dest = this.max_scroll, this.Y_pos = this.max_scroll, this.reachEnd = !0)
    }, m.prototype.wheel_handler = function(a) {
        if (!this.is_disable) {
            l.isSafari && a.preventDefault();
            var b = a.deltaY * this.moz_balancing;
            0 <= this.Y_dest + b && this.Y_dest + b <= this.max_scroll ? this.Y_dest += b / this.slow : 0 > this.Y_dest + b ? this.Y_dest = 0 : this.Y_dest + b > this.max_scroll && (this.Y_dest = this.max_scroll, this.reachEnd = !0)
        }
    }, m.prototype.keyboard_handler = function(a) {
        this.disable || ("ArrowDown" == a.key && this.Y_dest + this.key_scroll_size <= this.max_scroll ? this.Y_dest += this.key_scroll_size : "ArrowDown" == a.key && this.Y_dest + this.key_scroll_size > this.max_scroll ? (this.Y_dest = this.max_scroll, this.reachEnd = !0) : "ArrowUp" == a.key && 0 <= this.Y_dest - this.key_scroll_size ? this.Y_dest -= this.key_scroll_size : "ArrowUp" == a.key && 0 > this.Y_dest - this.key_scroll_size ? this.Y_dest = 0 : "Space" == a.code && this.Y_dest + 300 <= this.max_scroll ? this.Y_dest += 300 : "Space" == a.code && this.Y_dest + 300 > this.max_scroll && (this.Y_dest = this.max_scroll, this.reachEnd = !0))
    }, m.prototype.touch_start_handler = function(a) {
        this.disable || (this.touchStartPos = a.touches[0].clientY, this.scrollPosition = this.Y_dest)
    }, m.prototype.touch_move_handler = function(a) {
        this.touchMovePos = a.changedTouches[0].clientY, 0 < this.touchStartPos - this.touchMovePos ? this.scrollPosition <= this.max_scroll ? (this.scrollPosition += 2.2 * (this.touchStartPos - this.touchMovePos), this.touchStartPos = this.touchMovePos + 0, this.Y_dest = this.scrollPosition) : this.Y_dest + this.touchScrollSize > this.max_scroll && (this.Y_dest = this.max_scroll, this.reachEnd = !0) : 0 > this.touchStartPos - this.touchMovePos && (0 <= this.Y_dest - this.touchScrollSize ? (this.scrollPosition += 2.2 * (this.touchStartPos - this.touchMovePos), this.touchStartPos = this.touchMovePos - 0, this.Y_dest = this.scrollPosition) : 0 > this.Y_dest - this.touchScrollSize && (this.Y_dest = 0))
    }, m.prototype.resize_handler = function() {
        this.get_doc_height()
    }, m.prototype.init_events_handlers = function() {
        window.addEventListener("scroll", function(a) {
            a.preventDefault()
        }), window.addEventListener("wheel", this.wheel_handler.bind(this), !1), window.addEventListener("resize", this.resize_handler.bind(this)), window.addEventListener("keydown", this.keyboard_handler.bind(this)), window.addEventListener("touchstart", this.touch_start_handler.bind(this)), window.addEventListener("touchmove", this.touch_move_handler.bind(this))
    }, m.prototype.transform_elements = function() {
        var a = Math.floor;
        if (!this.is_disable) {
            this.Y_pos = b(this.Y_pos, this.Y_dest, .08), this.Y_pos = a(100 * this.Y_pos) / 100;
            for (var c = 0; c < this.scrl_elements.length; c++) this.scrl_elements[c].style.transform = "translate3d(0, -" + this.Y_pos + "px, 0)"
        }
    }, m.prototype.render = function() {
        this.transform_elements(), window.requestAnimationFrame(this.render.bind(this))
    };
    var n = new m,
        i = {
            grid: document.getElementById("grid"),
            visible: !1,
            display: function(a) {
                "g" == a.key && (i.visible ? (i.visible = !1, i.grid.style.visibility = "hidden") : (i.visible = !0, i.grid.style.visibility = "visible"))
            },
            init: function() {
                window.addEventListener("keydown", i.display)
            }
        },
        e = l.isMobile ? 0 : 0,
        o = function(a) {
            this.wrapper = a, this.animation_type = a.getAttribute("data-a") ? a.getAttribute("data-a") : "opacity", this.animation_duration = a.getAttribute("data-du") ? a.getAttribute("data-du") : 1e3, this.animation_delay = a.getAttribute("data-de") ? a.getAttribute("data-de") : 100, this.marge_before_appear = a.getAttribute("data-marge") ? a.getAttribute("data-marge") : e, l.isMobile && (this.animation_delay = 0), this.appeared = !1, this.is_visible = !1, this.init()
        };
    o.prototype.init = function() {
        this.resize(), this["init_" + this.animation_type] && (this["init_" + this.animation_type](), l.isMobile ? this.mobile_watch() : this.watch())
    }, o.prototype.resize = function() {
        this.y = l.isMobile ? this.wrapper.getBoundingClientRect().top + window.scrollY : this.wrapper.getBoundingClientRect().top + n.Y_pos
    }, o.prototype.init_a = function() {
        this.a = this.wrapper.children[0]
    }, o.prototype.init_b = function() {
        this.a = this.wrapper.children[0]
    }, o.prototype.init_c = function() {
        this.a = this.wrapper.children[0].innerHTML.split(""), this.wrapper.children[0].innerHTML = "";
        for (var a = 0; a < this.a.length; a++) this.wrapper.children[0].innerHTML += "<span>" + this.a[a] + "</span>";
        this.a = this.wrapper.children[0].children
    }, o.prototype.init_d = function() {
        this.a = this.wrapper.children[0]
    }, o.prototype.init_e = function() {
        this.a = this.wrapper.children[0]
    }, o.prototype.animation_a = function() {
        c(this.a, {
            delay: this.animation_delay,
            start: 101,
            end: 0,
            unit: "%",
            duration: 1400,
            css_key: "transform",
            css_value: "translateY"
        }, "o6")
    }, o.prototype.animation_b = function() {
        c(this.a, {
            delay: this.animation_delay,
            start: -101,
            end: 0,
            unit: "%",
            duration: 1400,
            css_key: "transform",
            css_value: "translateX"
        }, "o6")
    }, o.prototype.animation_c = function() {
        for (var a = 0; a < this.a.length; a++) c(this.a[a], {
            delay: 20 + 60 * a,
            start: 101,
            end: 0,
            unit: "%",
            duration: 1200 + 100 * a,
            css_key: "transform",
            css_value: "translateY"
        }, "o6")
    }, o.prototype.animation_d = function() {
        l.isMobile || d(this.wrapper, {
            duration: 2e3,
            delay: this.animation_delay
        }, [20, 50, 80, 50, 80, 50, 20, 50], [0, 0, 100, 0, 100, 100, 0, 100], "o6"), c(this.a, {
            start: 1.4,
            end: 1,
            unit: "",
            duration: 1800,
            css_key: "transform",
            css_value: "scale"
        }, "o6")
    }, o.prototype.animation_e = function() {
        c(this.a, {
            start: 0,
            end: 1,
            unit: "",
            duration: 1800,
            css_key: "transform",
            css_value: "scale"
        }, "o6")
    }, o.prototype.animate = function() {
        this["animation_" + this.animation_type] && setTimeout(this["animation_" + this.animation_type].bind(this), this.animation_delay)
    }, o.prototype.stop_watching = function() {
        cancelAnimationFrame(this.rAF)
    }, o.prototype.mobile_watch = function() {
        return this.position = this.y - window.scrollY, this.position < window.innerHeight - this.marge_before_appear ? (this.appeared = !0, this.is_visible = !0, void this.animate()) : void(this.rAF = requestAnimationFrame(this.mobile_watch.bind(this)))
    }, o.prototype.watch = function() {
        return this.position = this.y - n.Y_pos, this.position < window.innerHeight - this.marge_before_appear ? (this.appeared = !0, this.is_visible = !0, void this.animate()) : void(this.rAF = requestAnimationFrame(this.watch.bind(this)))
    };
    var p = function() {};
    p.prototype.init = function() {
        this.refresh(), this.event_handler()
    }, p.prototype.resize = function() {
        for (var a = 0; a < this.items.length; a++) this.items[a].resize()
    }, p.prototype.event_handler = function() {
        window.addEventListener("resize", this.resize.bind(this))
    }, p.prototype.refresh = function() {
        if (this.get_items = document.getElementsByClassName("_a"), this.items)
            for (var a = 0; a < this.items.length; a++) this.items[a].stop_watching();
        this.items = [];
        for (var a = 0; a < this.get_items.length; a++) this.items[a] = new o(this.get_items[a])
    };
    var q = new p,
        r = function() {
            this.wrapper = document.getElementsByClassName("_sh")[0], this.r_a = 0, this.r_b = 0, this.speed = .05, this.s_a = 1, this.s_b = 1, this.s_b_min = 0, this.mod_rot_a = 0, this.mod_rot_b = 0
        };
    r.prototype.init = function() {
        l.isMobile && this.wrapper && this.render()
    }, r.prototype.render = function() {
        this.mod_rot_a = b(this.mod_rot_a, this.mod_rot_b, .07), this.r_a = window.scrollY * this.speed + this.mod_rot_a, this.s_b -= this.s_b_min, this.s_a = b(this.s_a, this.s_b, .07), this.wrapper.style.transform = "rotate(" + this.r_a + "deg) scale(" + this.s_a + ")", requestAnimationFrame(this.render.bind(this))
    };
    var s = new r,
        t = function() {
            this.x = 0, this.y = 0, this.speed = {
                g: 0,
                x: 0,
                y: 0
            }
        };
    t.prototype.init = function() {
        window.addEventListener("mousemove", this.get_position.bind(this))
    }, t.prototype.get_position = function(a) {
        this.speed.x = f(a.clientX - this.x), this.speed.y = f(a.clientY - this.y), this.speed.g = f(this.speed.x + this.speed.y), this.x = a.clientX, this.y = a.clientY
    };
    var u = new t,
        v = function() {
            this.canvas = document.getElementById("canvas"), this.ctx = this.canvas.getContext("2d"), this.shape_dom_element = document.getElementsByClassName("_sh")[0], this.lines_count = 24, this.lines_deg = 360 / this.lines_count, this.global_angle = 0, this.l_mod_angle = 0, this.n_l_mod_angle = 0, this.svg_01 = "<svg viewBox=\"0 0 549 549\"><path d=\"M260.173-259.239c3.36,128.851-16.8,257.7-16.8,257.7a16.8,16.8,0,0,0,16.8,16.8,16.8,16.8,0,0,0,16.8-16.8S268.572-138.786,260.173-259.239Z\" transform=\"translate(14.327 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-259.239C295.833-135.648,309.714-5.97,309.714-5.97A16.8,16.8,0,0,0,330.286,5.907a16.8,16.8,0,0,0,11.876-20.571S298.527-145.064,259.239-259.239Z\" transform=\"translate(15.26 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-259.239C326.574-149.33,373.546-27.663,373.546-27.663a16.8,16.8,0,0,0,22.944,6.148,16.8,16.8,0,0,0,6.148-22.944S326.74-159.123,259.239-259.239Z\" transform=\"translate(15.26 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-259.239c93.488,88.736,170.347,194.1,170.347,194.1a16.8,16.8,0,0,0,23.754,0,16.8,16.8,0,0,0,0-23.754S350.351-180,259.239-259.239Z\" transform=\"translate(15.26 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-259.239c113.269,61.516,214.78,143.4,214.78,143.4a16.8,16.8,0,0,0,22.944-6.148,16.8,16.8,0,0,0-6.148-22.944S367.755-206.286,259.239-259.239Z\" transform=\"translate(15.26 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-259.239c125.332,30.1,244.576,82.922,244.576,82.922a16.805,16.805,0,0,0,20.572-11.876,16.8,16.8,0,0,0-11.877-20.572S377.762-236.176,259.239-259.239Z\" transform=\"translate(15.26 533.74)\" fill-rule=\"evenodd\"/><path d=\"M259.239-258.305c128.852-3.36,257.7,16.8,257.7,16.8a16.8,16.8,0,0,0,16.8-16.8,16.8,16.8,0,0,0-16.8-16.8S379.694-266.7,259.239-258.305Z\" transform=\"translate(15.26 532.806)\" fill-rule=\"evenodd\"/><path d=\"M259.239-254.6c123.592-36.594,253.27-50.475,253.27-50.475a16.8,16.8,0,0,0,11.877-20.572,16.805,16.805,0,0,0-20.572-11.876S373.415-293.885,259.239-254.6Z\" transform=\"translate(15.26 529.098)\" fill-rule=\"evenodd\"/><path d=\"M259.239-251.142c109.91-67.335,231.576-114.307,231.576-114.307a16.8,16.8,0,0,0,6.148-22.944,16.8,16.8,0,0,0-22.944-6.148S359.356-318.642,259.239-251.142Z\" transform=\"translate(15.26 525.643)\" fill-rule=\"evenodd\"/><path d=\"M259.239-248.175c88.737-93.488,194.1-170.347,194.1-170.347a16.8,16.8,0,0,0,0-23.754,16.8,16.8,0,0,0-23.754,0S338.475-339.287,259.239-248.175Z\" transform=\"translate(15.26 522.675)\" fill-rule=\"evenodd\"/><path d=\"M259.239-245.9c61.517-113.269,143.4-214.78,143.4-214.78a16.8,16.8,0,0,0-6.148-22.944,16.8,16.8,0,0,0-22.944,6.148S312.193-354.414,259.239-245.9Z\" transform=\"translate(15.26 520.398)\" fill-rule=\"evenodd\"/><path d=\"M259.239-244.466c30.1-125.332,82.923-244.576,82.923-244.576a16.805,16.805,0,0,0-11.876-20.572,16.8,16.8,0,0,0-20.572,11.877S282.3-362.99,259.239-244.466Z\" transform=\"translate(15.26 518.967)\" fill-rule=\"evenodd\"/><path d=\"M260.173-243.978c-3.359-128.852,16.8-257.7,16.8-257.7a16.8,16.8,0,0,0-16.8-16.8,16.8,16.8,0,0,0-16.8,16.8S251.775-364.433,260.173-243.978Z\" transform=\"translate(14.327 518.479)\" fill-rule=\"evenodd\"/><path d=\"M263.881-244.466c-36.593-123.592-50.474-253.27-50.474-253.27a16.8,16.8,0,0,0-20.572-11.877,16.805,16.805,0,0,0-11.876,20.572S224.594-358.643,263.881-244.466Z\" transform=\"translate(10.619 518.967)\" fill-rule=\"evenodd\"/><path d=\"M267.336-245.9C200-355.808,153.03-477.474,153.03-477.474a16.8,16.8,0,0,0-22.944-6.148,16.8,16.8,0,0,0-6.148,22.944S199.837-346.015,267.336-245.9Z\" transform=\"translate(7.163 520.398)\" fill-rule=\"evenodd\"/><path d=\"M270.3-248.175c-93.487-88.737-170.347-194.1-170.347-194.1a16.8,16.8,0,0,0-23.754,0,16.8,16.8,0,0,0,0,23.754S179.192-327.411,270.3-248.175Z\" transform=\"translate(4.196 522.675)\" fill-rule=\"evenodd\"/><path d=\"M272.58-251.142C159.312-312.659,57.8-394.54,57.8-394.54a16.8,16.8,0,0,0-22.944,6.148A16.8,16.8,0,0,0,41-365.449S164.065-304.1,272.58-251.142Z\" transform=\"translate(1.919 525.643)\" fill-rule=\"evenodd\"/><path d=\"M274.011-254.6C148.681-284.7,29.437-337.52,29.437-337.52A16.8,16.8,0,0,0,8.865-325.644a16.8,16.8,0,0,0,11.877,20.572S155.489-277.661,274.011-254.6Z\" transform=\"translate(0.488 529.098)\" fill-rule=\"evenodd\"/><path d=\"M274.5-258.305c-128.851,3.359-257.7-16.8-257.7-16.8A16.8,16.8,0,0,0,0-258.305a16.8,16.8,0,0,0,16.8,16.8S154.046-249.907,274.5-258.305Z\" transform=\"translate(0 532.806)\" fill=\"#edebe7\" fill-rule=\"evenodd\"/><path d=\"M274.011-259.239C150.421-222.646,20.742-208.765,20.742-208.765A16.8,16.8,0,0,0,8.865-188.193a16.8,16.8,0,0,0,20.571,11.876S159.836-219.952,274.011-259.239Z\" transform=\"translate(0.488 533.74)\" fill-rule=\"evenodd\"/><path d=\"M272.58-259.239C162.671-191.9,41-144.933,41-144.933a16.8,16.8,0,0,0-6.148,22.944A16.8,16.8,0,0,0,57.8-115.842S172.464-191.739,272.58-259.239Z\" transform=\"translate(1.919 533.74)\" fill-rule=\"evenodd\"/><path d=\"M270.3-259.239C181.567-165.752,76.2-88.892,76.2-88.892a16.8,16.8,0,0,0,0,23.754,16.8,16.8,0,0,0,23.754,0S191.068-168.128,270.3-259.239Z\" transform=\"translate(4.196 533.74)\" fill-rule=\"evenodd\"/><path d=\"M267.336-259.239C205.82-145.971,123.939-44.46,123.939-44.46a16.8,16.8,0,0,0,6.148,22.944,16.8,16.8,0,0,0,22.944-6.148S214.383-150.724,267.336-259.239Z\" transform=\"translate(7.163 533.74)\" fill-rule=\"evenodd\"/><path d=\"M263.881-259.239c-30.1,125.331-82.922,244.575-82.922,244.575A16.8,16.8,0,0,0,192.835,5.907,16.8,16.8,0,0,0,213.407-5.97S240.818-140.717,263.881-259.239Z\" transform=\"translate(10.619 533.74)\" fill-rule=\"evenodd\"/></svg>", this.svg_02 = "<svg viewBox=\"0 0 1080.002 1080.002\"><path d=\"M603.63-72.285c.468,1.746-26.81,11.559-18.741,41.674C589.957-11.7,603-3.8,603.962-.212S552.644-39.14,538.741-91.027c-29.169-108.858,91.572-204.292,56.826-333.966-12.448-46.455-38.017-60.77-41.2-72.662-1.642-6.127-2.872-9.887-1.191-10.337.941-.252,1.792.808,2.206,2.352,5.3,19.768,51.91,26.127,64.319,72.439,22.286,83.172-97.73,238.836-76.741,317.171C557.827-60.538,602.437-76.736,603.63-72.285Zm-123.222.532c0,1.808-28.888,4.226-28.888,35.4,0,19.582,10.555,30.583,10.555,34.3s-39.494-50.883-39.494-104.6c0-112.7,141.326-173.63,141.326-307.879,0-48.094-20.992-68.539-20.992-80.851,0-6.342-.215-10.292,1.525-10.292.974,0,1.522,1.244,1.522,2.842,0,20.466,43.379,38.673,43.379,86.618,0,86.106-156.216,205.4-156.216,286.5C433.125-72.261,480.408-76.362,480.408-71.753Zm242.107-32.938c.9,1.566-22.905,18.1-7.316,45.1,9.791,16.958,24.433,21.208,26.291,24.427s-59.645-24.319-86.5-70.84c-56.349-97.6,35.578-221.032-31.547-337.3-24.046-41.65-52.449-48.86-58.605-59.522-3.171-5.493-5.332-8.806-3.826-9.676.844-.487,1.941.316,2.74,1.7,10.233,17.724,56.9,11.8,80.876,53.325,43.053,74.569-32.585,255.992,7.964,326.225C681.313-81.489,720.211-108.681,722.515-104.691Zm-361.268,1.559c-.467,1.746-29-3.395-37.066,26.72-5.069,18.914,2.28,32.273,1.318,35.863S300.52-99.92,314.423-151.808c29.168-108.858,181.45-131.135,216.2-260.81,12.447-46.455-2.538-71.637.648-83.529,1.642-6.126,2.457-10,4.137-9.547.941.252,1.149,1.6.735,3.14-5.3,19.768,31.891,48.582,19.482,94.894-22.286,83.171-204.055,157.973-225.045,236.308C315.707-115.86,362.44-107.583,361.247-103.132Zm467.715-63.63c1.279,1.279-17.438,23.415,4.608,45.461,13.846,13.847,29.089,14.162,31.717,16.79S801.38-112.564,763.4-150.548c-79.69-79.69-22.842-222.708-117.77-317.636-34.008-34.008-63.309-33.621-72.014-42.327-4.485-4.484-7.43-7.125-6.2-8.356.689-.689,1.956-.2,3.087.934,14.471,14.471,58.018-3.328,91.921,30.575,60.886,60.886,34.781,255.7,92.126,313.048C795.169-133.687,825.7-170.02,828.962-166.762Zm-574.693,2.479c-.9,1.566-27.131-10.784-42.72,16.217-9.791,16.958-6.15,31.763-8.009,34.982s-8.761-63.814,18.1-110.335c56.349-97.6,209.207-79.7,276.332-195.967,24.046-41.65,16.089-69.853,22.245-80.515,3.171-5.493,4.96-9.021,6.467-8.151.843.487.7,1.838-.1,3.223-10.233,17.723,18.23,55.18-5.742,96.7-43.053,74.57-237.989,99.777-278.538,170.01C213.574-188.364,256.573-168.273,254.269-164.283Zm661.448-89.986c1.566.9-10.784,27.131,16.217,42.72,16.958,9.791,31.763,6.15,34.982,8.009s-63.814,8.761-110.335-18.1c-97.6-56.349-79.7-209.207-195.967-276.332-41.65-24.046-69.853-16.089-80.515-22.245-5.493-3.171-9.021-4.96-8.151-6.467.487-.843,1.838-.7,3.223.1,17.723,10.233,55.18-18.23,96.7,5.742,74.57,43.053,99.777,237.989,170.01,278.538C891.636-213.574,911.727-256.573,915.717-254.269Zm-748.955,3.231c-1.279,1.279-23.415-17.438-45.461,4.608-13.847,13.846-14.162,29.089-16.79,31.717s8.053-63.907,46.037-101.891c79.69-79.69,222.708-22.842,317.636-117.77,34.008-34.008,33.621-63.309,42.327-72.014,4.484-4.485,7.125-7.43,8.356-6.2.689.689.2,1.956-.934,3.087-14.471,14.471,3.328,58.018-30.575,91.921-60.886,60.886-255.7,34.781-313.048,92.126C133.687-284.831,170.02-254.3,166.762-251.038ZM976.868-361.247c1.746.467-3.395,29,26.722,37.066,18.91,5.069,32.27-2.28,35.86-1.318s-59.37,24.979-111.258,11.076c-108.858-29.168-131.135-181.45-260.81-216.2-46.455-12.447-71.637,2.538-83.529-.648-6.126-1.642-10-2.457-9.547-4.137.252-.941,1.6-1.149,3.14-.735,19.768,5.3,48.582-31.891,94.894-19.482,83.171,22.286,157.973,204.055,236.308,225.045C964.14-315.707,972.417-362.44,976.868-361.247Zm-872.177,3.762c-1.566.9-18.1-22.905-45.1-7.316-16.958,9.791-21.208,24.433-24.427,26.291s24.319-59.645,70.84-86.5c97.6-56.349,221.032,35.578,337.3-31.547,41.65-24.046,48.86-52.449,59.522-58.605,5.493-3.171,8.806-5.332,9.676-3.826.487.844-.316,1.941-1.7,2.74-17.724,10.233-11.8,56.9-53.325,80.876-74.569,43.053-255.992-32.585-326.225,7.964C81.489-398.687,108.681-359.789,104.691-357.485ZM1008.25-480.408c1.8,0,4.22,28.888,35.4,28.888,19.58,0,30.58-10.555,34.3-10.555s-50.88,39.494-104.6,39.494c-112.7,0-173.63-141.326-307.879-141.326-48.094,0-68.539,20.992-80.851,20.992-6.342,0-10.292.215-10.292-1.525,0-.974,1.244-1.522,2.842-1.522,20.466,0,38.673-43.379,86.618-43.379,86.106,0,205.4,156.216,286.5,156.216C1007.74-433.125,1003.64-480.408,1008.25-480.408ZM72.285-476.37c-1.746.468-11.559-26.81-41.674-18.741C11.7-490.043,3.8-477,.212-476.038s38.928-51.318,90.815-65.221c108.858-29.169,204.292,91.572,333.966,56.826,46.455-12.448,60.77-38.017,72.662-41.2,6.127-1.642,9.887-2.872,10.337-1.191.252.941-.808,1.792-2.352,2.206-19.768,5.3-26.127,51.91-72.439,64.319-83.172,22.286-238.836-97.73-317.171-76.741C60.538-522.173,76.736-477.563,72.285-476.37Zm-.532-123.222c-1.808,0-4.226-28.888-35.4-28.888-19.582,0-30.583,10.555-34.3,10.555s50.883-39.494,104.6-39.494c112.7,0,173.63,141.326,307.879,141.326,48.094,0,68.539-20.992,80.851-20.992,6.342,0,10.292-.215,10.292,1.525,0,.974-1.244,1.522-2.842,1.522-20.466,0-38.673,43.379-86.618,43.379-86.106,0-205.4-156.216-286.5-156.216C72.261-646.875,76.362-599.592,71.753-599.592Zm31.379-119.161c-1.746-.467,3.395-29-26.72-37.066-18.914-5.069-32.273,2.28-35.863,1.318S99.92-779.48,151.808-765.577c108.858,29.168,131.135,181.45,260.81,216.2,46.455,12.447,71.637-2.538,83.529.648,6.126,1.642,10,2.457,9.547,4.137-.252.941-1.6,1.149-3.14.735-19.768-5.3-48.582,31.891-94.894,19.482-83.171-22.286-157.973-204.055-236.308-225.045C115.86-764.293,107.583-717.56,103.132-718.753ZM1007.72-603.63c1.74-.468,11.55,26.81,41.67,18.741,18.91-5.068,26.81-18.111,30.4-19.073s-38.93,51.318-90.817,65.221c-108.858,29.169-204.292-91.572-333.966-56.826-46.455,12.448-60.77,38.017-72.662,41.2-6.127,1.642-9.887,2.872-10.337,1.191-.252-.941.808-1.792,2.352-2.206,19.768-5.3,26.127-51.91,72.439-64.319,83.172-22.286,238.836,97.73,317.171,76.741C1019.46-557.827,1003.26-602.437,1007.72-603.63Zm-843.437-222.1c-1.566-.9,10.784-27.131-16.217-42.72-16.958-9.791-31.763-6.15-34.982-8.009s63.814-8.761,110.335,18.1c97.6,56.349,79.7,209.207,195.967,276.332,41.65,24.046,69.853,16.089,80.515,22.245,5.493,3.171,9.021,4.96,8.151,6.467-.487.843-1.838.7-3.223-.1-17.723-10.233-55.18,18.23-96.7-5.742-74.57-43.053-99.777-237.989-170.01-278.538C188.364-866.426,168.273-823.427,164.283-825.731ZM975.309-722.515c1.566-.9,18.1,22.905,45.1,7.316,16.96-9.791,21.21-24.433,24.43-26.291s-24.32,59.645-70.839,86.5c-97.6,56.349-221.032-35.578-337.295,31.547-41.65,24.046-48.86,52.449-59.522,58.605-5.493,3.171-8.806,5.332-9.676,3.826-.487-.844.316-1.941,1.7-2.74,17.724-10.233,11.8-56.9,53.325-80.876,74.569-43.053,255.992,32.585,326.225-7.964C998.511-681.313,971.319-720.211,975.309-722.515ZM251.038-913.238c-1.279-1.279,17.438-23.415-4.608-45.461-13.846-13.847-29.089-14.162-31.717-16.79s63.907,8.053,101.891,46.037c79.69,79.69,22.842,222.708,117.77,317.636,34.008,34.008,63.309,33.621,72.014,42.327,4.485,4.484,7.43,7.125,6.2,8.356-.689.689-1.956.2-3.087-.934-14.471-14.471-58.018,3.328-91.921-30.575-60.886-60.886-34.781-255.7-92.126-313.048C284.831-946.313,254.3-909.98,251.038-913.238Zm662.2,84.276c1.279-1.279,23.415,17.438,45.461-4.608,13.847-13.846,14.162-29.089,16.79-31.717S967.436-801.38,929.452-763.4c-79.69,79.69-222.708,22.842-317.636,117.77-34.008,34.008-33.621,63.309-42.327,72.014-4.484,4.485-7.125,7.43-8.356,6.2-.689-.689-.2-1.956.934-3.087,14.471-14.471-3.328-58.018,30.575-91.921,60.886-60.886,255.7-34.781,313.048-92.126C946.313-795.169,909.98-825.7,913.238-828.962ZM357.485-975.309c-.9-1.566,22.905-18.1,7.316-45.1-9.791-16.96-24.433-21.21-26.291-24.43s59.645,24.32,86.5,70.839c56.349,97.6-35.578,221.032,31.547,337.295,24.046,41.65,52.449,48.86,58.605,59.522,3.171,5.493,5.332,8.806,3.826,9.676-.844.487-1.941-.316-2.74-1.7-10.233-17.724-56.9-11.8-80.876-53.325-43.053-74.569,32.585-255.992-7.964-326.225C398.687-998.511,359.789-971.319,357.485-975.309Zm468.246,59.592c.9-1.566,27.131,10.784,42.72-16.217,9.791-16.958,6.15-31.763,8.009-34.982s8.761,63.814-18.1,110.335c-56.349,97.6-209.207,79.7-276.332,195.967-24.046,41.65-16.089,69.853-22.245,80.515-3.171,5.493-4.96,9.021-6.467,8.151-.843-.487-.7-1.838.1-3.223,10.233-17.723-18.23-55.18,5.742-96.7,43.053-74.57,237.989-99.777,278.538-170.01C866.426-891.636,823.427-911.727,825.731-915.717Zm-349.361-92c-.468-1.74,26.81-11.55,18.741-41.67-5.068-18.91-18.111-26.81-19.073-30.4s51.318,38.93,65.221,90.817c29.169,108.858-91.572,204.292-56.826,333.966,12.448,46.455,38.017,60.77,41.2,72.662,1.642,6.127,2.872,9.887,1.191,10.337-.941.252-1.792-.808-2.206-2.352-5.3-19.768-51.91-26.127-64.319-72.439-22.286-83.172,97.73-238.836,76.741-317.171C522.173-1019.46,477.563-1003.26,476.37-1007.72Zm242.383,30.852c.467-1.746,29,3.395,37.066-26.722,5.069-18.91-2.28-32.27-1.318-35.86s24.979,59.37,11.076,111.258c-29.168,108.858-181.45,131.135-216.2,260.81-12.447,46.455,2.538,71.637-.648,83.529-1.642,6.126-2.457,10-4.137,9.547-.941-.252-1.149-1.6-.735-3.14,5.3-19.768-31.891-48.582-19.482-94.894,22.286-83.171,204.055-157.973,225.045-236.308C764.293-964.14,717.56-972.417,718.753-976.868ZM599.592-1008.25c0-1.8,28.888-4.22,28.888-35.4,0-19.58-10.555-30.58-10.555-34.3s39.494,50.88,39.494,104.6c0,112.7-141.326,173.63-141.326,307.879,0,48.094,20.992,68.539,20.992,80.851,0,6.342.215,10.292-1.525,10.292-.974,0-1.522-1.244-1.522-2.842,0-20.466-43.379-38.673-43.379-86.618,0-86.106,156.216-205.4,156.216-286.5C646.875-1007.74,599.592-1003.64,599.592-1008.25Z\" transform=\"translate(0 1080.002)\"/></svg>", this.r_min = 0, this.scrollY = n.Y_pos, this.is_light = !1, this.br_center = {
                x: 0,
                y: 0
            }
        };
    v.prototype.init = function() {
        this.shape_dom_element && (this.resize(), l.isMobile ? this.render_m() : this.render(), window.addEventListener("resize", this.resize.bind(this)), document.onselectstart = function(a) {
            a.preventDefault()
        }, l.isMobile ? (this.shape_dom_element.addEventListener("touchstart", this.m_down.bind(this)), this.shape_dom_element.addEventListener("touchend", this.m_up.bind(this)), window.addEventListener("scroll", function() {
            this.scrollY = window.scrollY * this.dpr
        }.bind(this))) : (window.addEventListener("mousedown", this.m_down.bind(this)), window.addEventListener("mouseup", this.m_up.bind(this))))
    }, v.prototype.resize = function() {
        this.dpr = window.devicePixelRatio || 1, this.canvas.width = innerWidth, this.canvas.height = innerHeight, this.rect = this.canvas.getBoundingClientRect(), this.canvas.width = this.rect.width * this.dpr, this.canvas.height = this.rect.height * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.center = {}, 768 > innerWidth ? (this.diameter = .426 * innerWidth, this.br_width = .025 * innerWidth, this.round = .022 * innerWidth, this.radius = this.diameter / 2, this.center.x = .06 * innerWidth + this.radius) : (this.diameter = .283333333333 * innerWidth, this.br_width = .016 * innerWidth, this.round = .013 * innerWidth, this.radius = this.diameter / 2, this.center.x = .21 * innerWidth + this.radius), this.diameter *= this.dpr, this.br_width *= this.dpr, this.round *= this.dpr, this.radius *= this.dpr, this.center.x *= this.dpr, this.n_radius = this.radius, this.br_half_width = this.br_width / 2, this.d_c_lmod_0 = .15, this.d_c_lmod_1 = .15, this.center.y = l.isMobile ? this.shape_dom_element.getBoundingClientRect().top + this.radius + window.scrollY : this.shape_dom_element.getBoundingClientRect().top * this.dpr + this.radius + n.Y_pos * this.dpr
    }, v.prototype.switch_mode = function() {
        this.n_radius = this.diameter / 2, this.r_min = 0, s.s_b_min = 0, s.s_b = 1, this.is_light ? (document.body.classList.remove("l-mod"), this.is_light = !1, this.n_l_mod_angle = 0, l.isMobile && (this.svg = this.svg_01, this.shape_dom_element.innerHTML = this.svg, s.mod_rot_b = 0)) : (document.body.classList.add("l-mod"), this.is_light = !0, this.n_l_mod_angle = 90, l.isMobile && (this.svg = this.svg_02, this.shape_dom_element.innerHTML = this.svg, s.mod_rot_b = 90))
    }, v.prototype.m_down = function(a) {
        f(this.center.x - u.x) < this.radius && f(this.center.y - this.scrollY - u.y) < this.radius ? (this.t_out = setTimeout(this.switch_mode.bind(this), 800), this.r_min = 2.5) : l.isMobile && (a.preventDefault(), this.t_out = setTimeout(this.switch_mode.bind(this), 800), s.s_b_min = .012)
    }, v.prototype.m_up = function() {
        clearTimeout(this.t_out), this.n_radius = this.diameter / 2, this.r_min = 0, s.s_b_min = 0, s.s_b = 1
    }, v.prototype.draw_line = function(a) {
        this.ctx.translate(this.center.x, this.center.y - this.scrollY), this.ctx.rotate(a * j / 180), this.ctx.beginPath(), this.ctx.moveTo(this.br_center.x, this.br_center.y), this.ctx.quadraticCurveTo(0, 0 - this.radius / 2, -this.br_half_width, 0 - this.radius + this.round), this.ctx.quadraticCurveTo(-this.br_half_width, 0 - this.radius, 0, 0 - this.radius), this.ctx.quadraticCurveTo(this.br_half_width, 0 - this.radius, this.br_half_width, 0 - this.radius + this.round), this.ctx.quadraticCurveTo(0, 0 - this.radius / 2, this.br_center.x, this.br_center.y), this.ctx.fillStyle = "#EEEBE8", this.ctx.fill(), this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }, v.prototype.draw_black_line = function(a) {
        this.ctx.translate(this.center.x, this.center.y - this.scrollY), this.ctx.rotate(a * j / 180);
        var b = [
            [-.005 * innerWidth, -this.radius * this.d_c_lmod_0, -.017 * innerWidth, .15 * -this.radius, -.018 * innerWidth, -this.radius * this.d_c_lmod_1],
            [-.018 * innerWidth, .45 * -this.radius, .002 * innerWidth, .6 * -this.radius, .002 * innerWidth, .76 * -this.radius],
            [.001 * innerWidth, .89 * -this.radius, -.014 * innerWidth, .87 * -this.radius, -.014 * innerWidth, .87 * -this.radius],
            [-.014 * innerWidth, .89 * -this.radius, -.009 * innerWidth, .87 * -this.radius, -.009 * innerWidth, .94 * -this.radius],
            [-.009 * innerWidth, .96 * -this.radius, -.014 * innerWidth, 1 * -this.radius, -.014 * innerWidth, 1 * -this.radius],
            [-.012 * innerWidth, 1 * -this.radius, .004 * innerWidth, .9 * -this.radius, .004 * innerWidth, .77 * -this.radius],
            [.004 * innerWidth, .64 * -this.radius, -.012 * innerWidth, .54 * -this.radius, -.012 * innerWidth, .3 * -this.radius],
            [-.012 * innerWidth, .18 * -this.radius, 0, .15 * -this.radius, 0, .1 * -this.radius]
        ];
        this.ctx.beginPath(), this.ctx.moveTo(0, .1 * -this.radius);
        for (var c = 0; c < b.length; c++) this.ctx.bezierCurveTo(b[c][0], b[c][1], b[c][2], b[c][3], b[c][4], b[c][5]);
        this.ctx.fillStyle = "#0E0E0E", this.ctx.fill(), this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    }, v.prototype.draw = function() {
        for (var a = 0; a < this.lines_count; a++) this.is_light ? this.draw_black_line(a * this.lines_deg + this.global_angle) : this.draw_line(a * this.lines_deg + this.global_angle)
    }, v.prototype.deform_radius = function() {
        this.radius = b(this.radius, this.n_radius, .07)
    }, v.prototype.deform_center = function() {
        this.d_c_x = this.center.x - u.x, this.d_c_lmod_1_n = .26 + .002 * f(this.center.x - u.x), f(this.center.x - u.x) > this.radius || f(this.center.y - this.scrollY - u.y) > this.radius ? (this.d_c_x = 0, this.d_c_y = 0, this.d_c_lmod_0_n = .15, this.d_c_lmod_1_n = .26) : (this.d_c_y = -150, this.d_c_lmod_0_n = .15), this.br_center.x = b(this.br_center.x, .2 * this.d_c_x, .07), this.br_center.y = b(this.br_center.y, .25 * this.d_c_y, .07), this.d_c_lmod_0 = b(this.d_c_lmod_0, this.d_c_lmod_0_n, .07), this.d_c_lmod_1 = b(this.d_c_lmod_1, this.d_c_lmod_1_n, .07)
    }, v.prototype.rotate = function() {
        this.l_mod_angle = b(this.l_mod_angle, this.n_l_mod_angle, .07), this.global_angle = .05 * this.scrollY - this.l_mod_angle
    }, v.prototype.render_m = function() {
        this.svg = this.svg_01, this.shape_dom_element.innerHTML = this.svg
    }, v.prototype.render = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.scrollY = n.Y_pos * this.dpr, this.n_radius -= this.r_min, this.deform_center(), this.deform_radius(), this.rotate(), this.draw(), requestAnimationFrame(this.render.bind(this))
    };
    var w = new v,
        x = function() {
            this.container = document.getElementById("loader-container"), this.span = this.container.children[0], this.animation_duration = 800
        };
    x.prototype.close = function() {
        c(this.span, {
            start: 1,
            end: 0,
            unit: "%",
            duration: this.animation_duration / 4,
            css_key: "opacity",
            css_value: ""
        }, "io4"), c(this.container, {
            start: 1,
            end: 0,
            unit: "%",
            duration: this.animation_duration,
            css_key: "opacity",
            css_value: ""
        }, "io4"), setTimeout(function() {
            this.container.style.display = "none"
        }.bind(this), this.animation_duration)
    };
    var y = new x,
        z = function() {
            n.init(), i.init(), q.init(), u.init(), w.init(), s.init(), y.close()
        };
    (function() {
        a(z)
    })()
})();
