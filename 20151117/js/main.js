var REQUEST_URL = {
    PACKAGE_INFO: "http://www.jz888.com"
},
utils = {
    throttle: function(t, o) {
        clearTimeout(t.tId),
        t.tId = setTimeout(function() {
            t.call(o)
        },
        50)
    },
    keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }
},
defaultCssProps = {
    logoOriginal: {
        width: 213,
        height: 239,
        top: 16.574
    },
    logoMini: {
        width: 57,
        height: 64,
        marginLeft: -195,
        top: 18
    },
    logoText: {
        width: 600,
        height: 83,
        top: 43.24
    },
    logoTextMini: {
        width: 86,
        height: 42,
        marginLeft: -124,
        top: 29
    },
    desc: {
        width: 600,
        top: 42.9,
        fontSize: 88
    },
    descTitle: {
        height: 84
    },
    buttonDownload: {
        width: 600,
        height: 122,
        top: 63.88
    },
    buttonDownloadMini: {
        width: 190,
        height: 50,
        marginLeft: 5,
        top: 25
    },
    packageInfo: {
        marginTop: 20
    },
    logoG2: {
        width: 205,
        height: 231,
        top: 16.48
    },
    logoG4: {
        width: 228,
        height: 532,
        top: 16.48
    },
    logoG5: {
        width: 263,
        height: 334,
        top: 13.33
    },
    logoG6: {
        width: 310,
        height: 310,
        top: 13.05
    },
    logoBalloon: {
        height: 240
    },
    logoRadish: {
        height: 296,
        top: 10.648
    },
    logoAcorn: {
        width: 209,
        height: 268,
        top: 13.05
    },
    logoChili: {
        height: 282,
        top: 11.75
    },
    logoLadybird: {
        height: 261,
        top: 13.7
    },
    logoFootball: {
        width: 244,
        height: 268,
        top: 15.74
    },
    logoConch: {
        width: 205,
        height: 239,
        top: 15.74
    },
    logoConchStatic: {
        width: 185,
        height: 403,
        top: .83
    },
    logoCompass: {
        width: 205,
        height: 231,
        top: 16.48
    },
    logoCompassPointer: {
        width: 128,
        height: 128,
        top: 20.014
    },
    subItemIcon: {
        paddingTop: 40,
        paddingBottom: 70
    }
},
panes = {
    containerPane: {
        _clipWallpaper: function(t, o) {
            var s = panes.elements.$boxes.find(".wallpaper");
            t / o > 1920 / 1080 ? s.css({
                width: "100%",
                height: "auto",
                top: -(1080 * (t / 1920) - o),
                left: 0
            }) : s.css({
                width: "auto",
                height: "100%",
                top: 0,
                left: -(1920 * (o / 1080) - t) / 2
            })
        },
        _clipAircraftBackground: function(t, o) {
            var s, e, i, n, a, l = o / 1080;
            Modernizr.backgroundsize && Modernizr.cssanimations && (s = Modernizr.prefixed("backgroundSize"), i = $(".aircraft-sky"), e = $(".aircraft-mountain").height(260 * l), n = $(".aircraft-stars-front").height(2160 * l), a = $(".aircraft-stars-behind").height(2160 * l), t / o > 1920 / 1080 ? (i.css(s, "100% auto"), e.css(s, "100% auto"), n.css(s, "100% auto"), a.css(s, "100% auto")) : (i.css(s, "auto 100%"), e.css(s, "auto 100%"), n.css(s, "auto 100%"), a.css(s, "auto 100%")))
        },
        _calcElementTop: function(t, o) {
            var s = t > 1080,
            e = (t - 1080) / 2;
            return s ? e + 1080 * (o / 100) : o + "%"
        },
        _calcLogosSize: function(t, o) {
            this._$logoGroup7.find(".logo-compass").css({
                width: defaultCssProps.logoCompass.width * t,
                height: defaultCssProps.logoCompass.height * t,
                "margin-left": -(defaultCssProps.logoCompass.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoCompass.top)
            }),
            this._$logoGroup7.find(".logo-compass-pointer").css({
                width: defaultCssProps.logoCompassPointer.width * t,
                height: defaultCssProps.logoCompassPointer.height * t,
                "margin-left": -(defaultCssProps.logoCompassPointer.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoCompassPointer.top)
            }),
            this._$logoGroup2.find(".logo").css({
                width: defaultCssProps.logoG2.width * t,
                height: defaultCssProps.logoG2.height * t,
                "margin-left": -(defaultCssProps.logoG2.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoG2.top)
            }),
            this._$logoGroup2.find(".logo-balloon").css({
                height: defaultCssProps.logoBalloon.height * t
            }),
            this._$logoGroup2.find(".logo-radish").css({
                height: defaultCssProps.logoRadish.height * t,
                top: this._calcElementTop(o, defaultCssProps.logoRadish.top)
            }),
            this._$logoGroup2.find(".logo-acorn").css({
                width: defaultCssProps.logoAcorn.width * t,
                height: defaultCssProps.logoAcorn.height * t,
                "margin-left": -(defaultCssProps.logoAcorn.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoAcorn.top)
            }),
            this._$logoGroup2.find(".logo-chili").css({
                height: defaultCssProps.logoChili.height * t,
                top: this._calcElementTop(o, defaultCssProps.logoChili.top)
            }),
            this._$logoGroup2.find(".logo-ladybird").css({
                height: defaultCssProps.logoLadybird.height * t,
                top: this._calcElementTop(o, defaultCssProps.logoLadybird.top)
            }),
            this._$logoGroup2.find(".logo-football").css({
                width: defaultCssProps.logoFootball.width * t,
                height: defaultCssProps.logoFootball.height * t,
                "margin-left": -(defaultCssProps.logoFootball.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoFootball.top)
            }),
            Modernizr.cssanimations ? this._$logoGroup3.find(".logo-conch").css({
                width: defaultCssProps.logoConch.width * t,
                height: defaultCssProps.logoConch.height * t,
                "margin-left": -(defaultCssProps.logoConch.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoConch.top)
            }) : this._$logoGroup3.find(".logo-conch-static").css({
                width: defaultCssProps.logoConchStatic.width * t,
                height: defaultCssProps.logoConchStatic.height * t,
                "margin-left": -(defaultCssProps.logoConchStatic.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoConchStatic.top)
            }),
            this._$logoGroup4.css({
                width: defaultCssProps.logoG4.width * t,
                height: defaultCssProps.logoG4.height * t,
                "margin-left": -(defaultCssProps.logoG4.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoG4.top)
            }),
            this._$logoGroup5.css({
                width: defaultCssProps.logoG5.width * t,
                height: defaultCssProps.logoG5.height * t,
                "margin-left": -(defaultCssProps.logoG5.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoG5.top)
            }),
            this._$logoGroup6.find(".logo").css({
                width: defaultCssProps.logoG6.width * t,
                height: defaultCssProps.logoG6.height * t,
                "margin-left": -(defaultCssProps.logoG6.width * t * .5),
                top: this._calcElementTop(o, defaultCssProps.logoG6.top)
            })
        },
        _calcSize: function() {
            var t, o, s, e, i, n, a, l, h = panes.subShowing;
            t = Math.max(640, panes.elements.$win.width()),
            o = Math.max(450, panes.elements.$win.height()),
            s = Math.min(o / 1080, 1),
            e = 600 * s,
            i = o > 1080,
            n = (o - 1080) / 2,
            this.logoCssProps = {
                width: defaultCssProps.logoOriginal.width * s,
                height: defaultCssProps.logoOriginal.height * s,
                marginLeft: -(defaultCssProps.logoOriginal.width * s * .5),
                top: this._calcElementTop(o, defaultCssProps.logoOriginal.top)
            },
            this.logoTextCssProps = {
                width: defaultCssProps.logoText.width * s,
                height: defaultCssProps.logoText.height * s,
                marginLeft: -(defaultCssProps.logoText.width * s * .5),
                top: this._calcElementTop(o, defaultCssProps.logoText.top)
            },
            this.downloadCssProps = {
                width: defaultCssProps.buttonDownload.width,
                height: defaultCssProps.buttonDownload.height,
                marginLeft:-153,
                top: this._calcElementTop(o, defaultCssProps.buttonDownload.top)
            },
            panes.elements.$container.css({
                width: t,
                height: o
            }),
            panes.elements.$main.css("margin-top", h ? -(o - 160) : 0),
            panes.elements.$sub.height(o - 100),
            h || (panes.elements.$logo.css({
                width: this.logoCssProps.width,
                height: this.logoCssProps.height,
                "margin-left": this.logoCssProps.marginLeft,
                top: this.logoCssProps.top
            }), panes.elements.$logoText.css({
                width: this.logoTextCssProps.width,
                height: this.logoTextCssProps.height,
                "margin-left": this.logoTextCssProps.marginLeft,
                top: this.logoTextCssProps.top
            }), panes.elements.$download.css("top", this.downloadCssProps.top)),
            this._$textPoint.css({
                width: this.logoTextCssProps.width,
                height: this.logoTextCssProps.height,
                "margin-left": this.logoTextCssProps.marginLeft,
                top: this.logoTextCssProps.top
            }),
            this._$logoGroup1.css({
                width: this.logoCssProps.width,
                height: this.logoCssProps.height,
                "margin-left": this.logoCssProps.marginLeft,
                top: this.logoCssProps.top
            }),
            panes.elements.$desc.css({
                width: defaultCssProps.desc.width * s,
                "margin-left": -(defaultCssProps.desc.width * s * .5),
                top: this._calcElementTop(o, defaultCssProps.desc.top),
                "font-size": defaultCssProps.desc.fontSize * s
            }).find("h2").css({
                width: defaultCssProps.logoText.width * s,
                height: defaultCssProps.descTitle.height * s
            }),
            panes.browser.IE6 && panes.elements.$desc.find("h2 img").height(defaultCssProps.descTitle.height * s),
            Modernizr.csstransforms && (a = Modernizr.prefixed("transform"), this._$scales.css(a, "scale(" + s + ")")),
            l = (i ? n: 0) + (i ? 1080 : o) * (defaultCssProps.buttonDownload.top / 100) + defaultCssProps.packageInfo.marginTop * s + defaultCssProps.buttonDownload.height,
            panes.elements.$package.css("top", l),
            this._$subIcons.css({
                "padding-top": defaultCssProps.subItemIcon.paddingTop * s,
                "padding-bottom": defaultCssProps.subItemIcon.paddingBottom * s
            }),
            panes.elements.$boxes.css("font-size", 32 * s),
            this._calcLogosSize(s, o),
            this._clipAircraftBackground(t, o),
            this._clipWallpaper(t, o),
            this.respond(t, o)
        },
        _setPackageInfo: function() {
            $.ajax(REQUEST_URL.PACKAGE_INFO, {
                cache: !0,
                data: location.search.substring(1),
                dataType: "jsonp",
                jsonp: "cb",
                jsonpCallback: "getpackageinfo",
                success: function(t) {
                    var o = t.data;
                    panes.elements.$package.find(".package-version").text(o.version).end().find(".package-size").text(o.file_size).end().find(".package-release").text(o.update_time),
                    panes.elements.$download.attr("href", o.dl_url).on("click",
                    function() {
                        window._hmt && _hmt.push(["_trackEvent", "qianxun", "download", o.version, o.file_size])
                    }),
                    $("#top-right-bar").attr("href", o.wallpage_url)
                }
            })
        },
        respond: function(t, o) {
            panes.browser.ltIE9 && (panes.elements.$win.width() <= 640 && $("body").css("overflow-x", "auto"), panes.elements.$win.height() <= 450 && $("body").css("overflow-y", "auto"), panes.elements.$nav.toggle(t > 640), panes.elements.$desc.find("p").toggle(o > 450 && !panes.subShowing), panes.elements.$package.toggle(o > 450 && !panes.subShowing), panes.elements.$download.toggleClass("button-download-mini", 450 >= o && !panes.subShowing))
        },
        init: function() {
            var t = this;
            this._$textPoint = $("#logo-text-point"),
            this._$scales = $(".scale"),
            this._$subIcons = $(".sub-item-header"),
            this._$logoGroup1 = $(".logo-g1"),
            this._$logoGroup2 = $(".logo-g2"),
            this._$logoGroup3 = $(".logo-g3"),
            this._$logoGroup4 = $(".logo-g4"),
            this._$logoGroup5 = $(".logo-g5"),
            this._$logoGroup6 = $(".logo-g6"),
            this._$logoGroup7 = $(".logo-g7"),
            this.logoCssProps = null,
            this.logoTextCssProps = null,
            this.downloadCssProps = null,
            this._setPackageInfo(),
            this._calcSize(),
            panes.elements.$win.on("resize",
            function() {
                utils.throttle(t._calcSize, t)
            }),
            this._$logoGroup7.find(".logo-compass-pointer img").hide().eq(0).show(),
            Modernizr.cssanimations || (panes.elements.$boxes.find(".wallpaper[data-src]").each(function() {
                var t = $(this);
                t.attr("src", t.data("src"))
            }), this._$logoGroup3.find(".logo").toggle(), this._$logoGroup7.find(".logo-compass-pointer img").hide().eq(1).show()),
            $("body").on("dragstart",
            function(t) {
                t.preventDefault()
            }),
            $("#main").on("selectstart",
            function(t) {
                t.preventDefault()
            }),
            panes.elements.$win.on("orientationchange",
            function() {
                t._calcSize()
            })
        }
    },
    subPane: {
        _getActive: function(t) {
            var o = null,
            s = t.split("-");
            return $(".sub-item").each(function(t, e) {
                return $(e).attr("id") === s[0] ? (o = {
                    subItemId: s[0],
                    subItemContentId: s[1]
                },
                !1) : void 0
            }),
            o
        },
        _toggleSubParts: function(t) {
            var o = $.Deferred(),
            s = t ? defaultCssProps.logoMini: panes.containerPane.logoCssProps,
            e = t ? defaultCssProps.logoTextMini: panes.containerPane.logoTextCssProps,
            i = t ? defaultCssProps.buttonDownloadMini: panes.containerPane.downloadCssProps;
            return panes.subShowing = t,
            panes.elements.$logo.animate(s, this._duration,
            function() {
                o.resolve()
            }),
            panes.elements.$logoText.animate(e, this._duration),
            panes.elements.$download.animate(i, {
                duration: this._duration,
                start: function() {
                    t && panes.elements.$container.removeClass("main-expanding"),
                    t && panes.browser.ltIE9 && panes.elements.$win.height() <= 450 && panes.elements.$download.removeClass("button-download-mini")
                },
                done: function() {
                    t || panes.elements.$container.addClass("main-expanding"),
                    !t && panes.browser.ltIE9 && panes.elements.$win.height() <= 450 && panes.elements.$download.addClass("button-download-mini"),
                    panes.containerPane.respond(panes.elements.$win.width(), panes.elements.$win.height())
                }
            }),
            o.promise()
        },
        _toggleSub: function(t) {
            var o = $.Deferred();
            return panes.elements.$main.toggleClass("main-collapsing", t),
            panes.elements.$main.animate({
                "margin-top": t ? -(panes.elements.$main.height() - 160) : 0
            },
            this._duration,
            function() {
                o.resolve()
            }),
            panes.elements.$sub.animate({
                "margin-top": t ? -60 : 0
            },
            this._duration),
            o.promise()
        },
        _toggleParts: function(t) {
            panes.browser.ltIE9 ? (this._$hideToLeftElements.toggle(!t), this._$hideToRightElements.toggle(!t)) : (this._$hideToLeftElements[t ? "hide": "show"]("drop", {
                direction: "left"
            },
            this._duration), this._$hideToRightElements[t ? "hide": "show"]("drop", {
                direction: "right"
            },
            this._duration))
        },
        _posContent: function(t) {
            var o = null;
            if (t && (o = this._$activeSubitem.find("#" + t)), null !== o && o.length) {
                var s, e, i = o.closest(".sub-item-container"),
                n = o.closest(".sub-item-wrapper"),
                a = n.height(),
                l = i.outerHeight();
                l > a && (s = l - a, e = o.position().top - 75, n.scrollTop(e > s ? s: e), this._$activeSubitem.find(".button-down-shadow").show())
            }
        },
        _switchLogo: function(t) {
            var o = $.Deferred();
            return panes.elements.$boxes.find("li").eq(panes.slidePane.index).find(".logo-group").toggle(!t),
            panes.elements.$logo[t ? "fadeIn": "fadeOut"](6 === panes.slidePane.index || panes.browser.ltIE9 ? 0 : 400,
            function() {
                o.resolve()
            }),
            o.promise()
        },
        show: function(t) {
            var o = this;
            $.when(this._switchLogo(!0)).then(function() {
                o._$activeSubitem = panes.elements.$sub.find("#" + t.subItemId).show(),
                o._$activeSubitem.find(".sub-item-wrapper").scrollTop(0).end().find(".button-down-shadow").hide(),
                o._toggleSub(!0).done(function() {
                    o._posContent(t.subItemContentId)
                }),
                o._toggleSubParts(!0),
                o._toggleParts(!0)
            })
        },
        hide: function() {
            var t = this;
            this._toggleSub(!1).done(function() {
                t._$activeSubitem.hide()
            }),
            this._toggleSubParts(!1).done(function() {
                t._switchLogo(!1)
            }),
            this._toggleParts(!1)
        },
        init: function() {
            var t, o = location.hash.substring(1),
            s = this;
            this._$hideToLeftElements = $("#top-left-bar"),
            this._$hideToRightElements = $("#top-right-bar, #slide-bar"),
            this._$activeSubitem = null,
            this._duration = 600,
            t = this._getActive(o),
            null !== t && this.show(t),
            panes.elements.$nav.on("click", "li",
            function(t) {
                var o, e = $(this).find("a").attr("href").substring(1);
                o = s._getActive(e),
                null !== o && (s.show(o), t.preventDefault())
            }),
            panes.elements.$sub.on("click", ".button-down",
            function(t) {
                s.hide(),
                t.preventDefault()
            })
        }
    },
    slidePane: {
        _balloonFlyAway: {
            _flyAway: function() {
                var t = this;
                this._$element.is(":hidden") || this._$element.hasClass("anim-logo-balloons-fly-away") || (this._startTimer = setTimeout(function() {
                    t.start = !0
                },
                1400), this.start && (this._$element.toggleClass("anim-logo-balloons anim-logo-balloons-fly-away"), this._timer = setTimeout(function() {
                    t._redisplay(1e3, 400)
                },
                6e3)))
            },
            _redisplay: function(t, o) {
                var s = this;
                t ? this._$element.fadeOut(o,
                function() {
                    s.start = !1,
                    $(this).delay(t).toggleClass("anim-logo-balloons anim-logo-balloons-fly-away").fadeIn(2 * o)
                }) : (this.start = !1, this._$element.toggleClass("anim-logo-balloons anim-logo-balloons-fly-away"))
            },
            restore: function() {
                this._$element.hasClass("anim-logo-balloons-fly-away") && this._redisplay(),
                clearTimeout(this._timer),
                clearTimeout(this._startTimer)
            },
            init: function() {
                var t = this;
                this._$element = $(".logo-balloons"),
                panes.elements.$doc.on("mousemove click",
                function() {
                    t._flyAway()
                })
            }
        },
        _maskSlide: {
            _getRealIndex: function() {
                var t;
                return t = 0 === this._index ? this._etLogosIndex: 1 === this._index ? this._balloonLogosIndex + this._etLogosLength: this._index + this._etLogosLength + this._balloonLogosLength - 2
            },
            _getNextIndex: function() {
                return this._index++,
                this._index > this._length - 1 && (this._index = 0, this._etLogosIndex++, this._balloonLogosIndex++, this._etLogosIndex > this._etLogosLength - 1 && (this._etLogosIndex = 0), this._balloonLogosIndex > this._balloonLogosLength - 1 && (this._balloonLogosIndex = 0)),
                this._getRealIndex()
            },
            _run: function() {
                var t = this._getRealIndex(),
                o = this;
                this._$logos.eq(t).hide("puff", {
                    percent: 400
                },
                350),
                t = this._getNextIndex(),
                this._$logos.eq(t).show("scale", {
                    easing: "easeOutQuint"
                },
                this._speed / 2),
                this._timer = setTimeout(function() {
                    o._run()
                },
                this._duration)
            },
            start: function() {
                var t = this;
                this._index = 0,
                this._$logos.hide().first().show(),
                this._startTimer = setTimeout(function() {
                    t._run()
                },
                this._duration)
            },
            stop: function() {
                clearTimeout(this._startTimer),
                clearTimeout(this._timer)
            },
            init: function() {
                this._$logos = $(".logo-g2").find(".logo"),
                this._duration = 1e3,
                this._speed = 600,
                this._index = 0,
                this._etLogosIndex = 0,
                this._balloonLogosIndex = 0,
                this._etLogosLength = this._$logos.filter(".logo-et").length,
                this._balloonLogosLength = this._$logos.filter(".logo-balloon").length,
                this._length = this._$logos.length - (this._etLogosLength + this._balloonLogosLength) + 2
            }
        },
        _playAnimation: function(t) {
            Modernizr.cssanimations && (this._balloonFlyAway.restore(), this._$anims.removeClass(function() {
                return $(this).data("anim")
            }), this._$boxes.eq(t).find("[data-anim]").addClass(function() {
                return $(this).data("anim")
            }))
        },
        _run: function(t) {
            var o = this;
            "number" == typeof t && t === this.index || this.running || (this.running = !0, panes.browser.ltIE9 ? (setTimeout(function() {
                o._$desc.hide().eq(t).show()
            },
            300), panes.browser.IE6 ? this._$boxes.stop(!0, !0).hide("fade", this._duration).eq(t).show().hide().delay(200).show("fade", this._duration) : this._$boxes.stop(!0, !0).hide("fade", this._duration).eq(t).show("fade", this._duration)) : (this._maskSlide[this._$boxes.eq(t).hasClass("boxs-item-mask") ? "start": "stop"](), this._$desc.stop(!0, !0).hide("drop", {
                direction: "up"
            },
            this._duration / 2).promise().done(function() {
                o._$desc.eq(t).show("drop", {
                    direction: "down"
                },
                o._duration / 2)
            }), this._$boxes.stop(!0, !0).hide("fade", this._duration).eq(t).show("fade", this._duration,
            function() {
                o._playAnimation(t)
            })), this._$nav.find("li").removeClass("slide-bar-active").eq(t).addClass("slide-bar-active"), this.index = t)
        },
        auto: function() {
            var t = this,
            o = this.index; ++o > this.length - 1 && (o = 0),
            this.running = !1,
            this._run(o),
            this._autoTimer = setTimeout(function() {
                t.auto()
            },
            this._delay)
        },
        run: function(t) {
            var o = this;
            clearTimeout(this._timer),
            this._timer = setTimeout(function() {
                o.running = !1
            },
            400),
            this._run(t)
        },
        next: function() {
            this.index + 1 <= this.length - 1 && this.run(this.index + 1)
        },
        prev: function() {
            this.index - 1 >= 0 && this.run(this.index - 1)
        },
        init: function() {
            var t = this;
            this._$nav = $("#slide-bar"),
            this._$boxes = panes.elements.$boxes.find("li").hide().first().show().end(),
            this._$desc = panes.elements.$desc.find("li").hide().first().show().end(),
            this._$anims = this._$boxes.find("[data-anim]"),
            this.index = 0,
            this.length = this._$boxes.length,
            this._duration = 1e3,
            this._delay = 5e3,
            this._maskSlide.init(),
            Modernizr.cssanimations && this._balloonFlyAway.init(),
            this._$nav.on("click", "li",
            function(o) {
                t.run($(this).index()),
                o.preventDefault()
            }),
            panes.elements.$main.on("mousewheel",
            function(o) {
                return panes.subShowing ? void 0 : (t[o.deltaY > 0 ? "prev": "next"](), o.deltaY > 0 && t.index - 1 < 0 || o.deltaY < 0 && t.index + 1 > t.length - 1)
            }),
            panes.elements.$doc.on("keydown",
            function(o) {
                var s = utils.keyCode;
                switch (o.keyCode) {
                case s.DOWN:
                case s.RIGHT:
                    t.next();
                    break;
                case s.UP:
                case s.LEFT:
                    t.prev()
                }
            }),
            (client.system.iphone || client.system.ipad || client.system.ipod || client.system.ios || client.system.android) && (this._autoTimer = setTimeout(function() {
                t.auto()
            },
            this._delay))
        }
    },
    subItemPane: {
        notifyLight: function(t, o) {
            var s = this;
            t = t || 500,
            o = o || 2e3,
            this._$light.delay(t).fadeOut(o,
            function() {
                $(this).delay(t).fadeIn(o,
                function() {
                    s.notifyLight(t, o)
                })
            })
        },
        getScrollDistance: function(t, o) {
            var s = 20,
            e = t * (t / o);
            return (o - t) * (s / (t - e))
        },
        init: function() {
            var t = this;
            this._$light = $(".log-begin-icon-light"),
            panes.browser.ltIE9 || this.notifyLight(),
            $(".sub-item-wrapper").on("mousewheel",
            function(o) {
                var s, e = $(this),
                i = e.find(".sub-item-container"),
                n = e.height(),
                a = i.outerHeight(),
                l = i.position().top,
                h = t.getScrollDistance(n, a),
                r = a - n;
                if (! (n >= a)) return s = o.deltaY > 0 && Math.abs(l) - h <= 0 ? 0 : o.deltaY < 0 && Math.abs(l) + h > r ? -r: l + o.deltaY * h,
                e.scrollTop(e.scrollTop() - o.deltaY * h),
                e.siblings(".button-down").find(".button-down-shadow").toggle(e.scrollTop() > 0),
                o.deltaY > 0 && 0 === s || o.deltaY < 0 && Math.abs(s) === r
            })
        }
    },
    init: function() {
        this.elements = {},
        this.elements.$win = $(window),
        this.elements.$doc = $(document),
        this.elements.$container = $("#container"),
        this.elements.$main = $("#main"),
        this.elements.$sub = $("#sub"),
        this.elements.$logo = $("#logo"),
        this.elements.$logoText = $("#logo-text"),
        this.elements.$desc = $("#desc"),
        this.elements.$boxes = $("#boxes"),
        this.elements.$download = $("#button-download"),
        this.elements.$nav = $("#nav"),
        this.elements.$package = $("#package-info"),
        this.browser = {},
        this.browser.IE6 = $("html").hasClass("lt-ie7"),
        this.browser.ltIE9 = $("html").hasClass("lt-ie9"),
        this.subShowing = !1,
        $.each(this,
        function(t, o) {
            "object" === $.type(o) && "function" === $.type(o.init) && o.init()
        })
    }
};
$(function() {
    panes.init()
});