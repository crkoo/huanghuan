$(function() {
    $(".top_bb").click(function() {
        var h = $(".xj_nav a").length;
        var i = h * 78;
        if ($(this).hasClass("a_cz")) {
            $(this).removeClass("a_cz");
            $(".top_ba").stop(true, false).show(function() {
                $(this).animate({
                        "width": 97
                    },
                    200)
            });
            $(".xj_nav").stop(true, false).animate({
                    width: 0
                },
                200);
            $(".aaa_cz").stop(true, false).animate({
                    width: 0
                },
                200)
        } else {
            $(this).addClass("a_cz");
            $(".top_ba").stop(true, false).animate({
                    width: 0
                },
                200,
                function() {
                    $(this).hide()
                });
            $(".xj_nav").stop(true, false).animate({
                    width: i
                },
                200);
            $(".aaa_cz").stop(true, false).animate({
                    width: i
                },
                200)
        }
    });
    $(".qqkefu .top").click(function() {
        $("html,body").animate({
                "scrollTop": 0
            },
            300)
    });
    $(window).scroll(function() {
        var h = document.body.scrollTop;
        var i = $('.top').offset().top;
        if (h > 78 || i > 78) {
            $(".top").css({
                "opacity": "0.9",
                "filter": "alpha(opacity=90)"
            })
        } else {
            $(".top").css({
                "opacity": "1",
                "filter": "alpha(opacity=100)"
            })
        }
    });
    $(".qq_cza").hover(function() {
            if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
                $(this).stop(true, false).animate({
                        "width": "110px",
                        "left": "-65px"
                    },
                    300)
            } else {
                $(this).stop(true, false).animate({
                        "width": "110px"
                    },
                    300)
            }
        },
        function() {
            if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
                $(this).stop(true, false).animate({
                        "width": "45px",
                        "left": "0"
                    },
                    300)
            } else {
                $(this).stop(true, false).animate({
                        "width": "45px"
                    },
                    300)
            }
        });
    $(".qq_czb").hover(function() {
            $(".erweima").show(50)
        },
        function() {
            $(".erweima").hide(50)
        });
    $(".coll_al").toggle(function() {
            $(".coll_al img").stop(true, false).animate({
                    "left": -56
                },
                300);
            $(".coll_a_bottom").show(300)
        },
        function() {
            $(".coll_al img").stop(true, false).animate({
                    "left": 0
                },
                300);
            $(".coll_a_bottom").hide(300)
        });
    var a = 0;
    var b = $(".coll_ba li").length;
    var c = $(".coll_ba li").width();
    var d = (c) * b;
    $(".coll_ba ul").width(d);
    $(".coll_ba_fir").click(function() {
        if (a > 0) {
            a -= 1;
            e(a)
        }
    });
    $(".coll_ba_be").click(function() {
        if (a < b - 1) {
            a += 1;
            e(a)
        }
    });
    function e(h) {
        var i = (c) * h;
        $(".coll_ba ul").stop(true, false).animate({
                "left": -i
            },
            500)
    };
    $(".coll_ba").hover(function() {
            $(".coll_ba_fir").stop(true, false).animate({
                    "left": 0
                },
                300);
            $(".coll_ba_be").stop(true, false).animate({
                    "right": 0
                },
                300)
        },
        function() {
            $(".coll_ba_fir").stop(true, false).animate({
                    "left": -24
                },
                300);
            $(".coll_ba_be").stop(true, false).animate({
                    "right": -24
                },
                300)
        });
    $(".coll_ar input,input:text,#remark").each(function() {
        var h = this.value;
        $(this).focus(function() {
            if (this.value == h) {
                this.value = ""
            }
        });
        $(this).blur(function() {
            if (this.value == "") {
                this.value = h
            }
        })
    });
    $(".top_bb").click(function() {
        $(".index_nav").slideDown(500)
    });
    $(".index_nav_b").click(function() {
        $(".index_nav").slideUp(500)
    });
    $(".main_b_c li").hover(function() {
            $(this).find(".cc").stop().animate({
                    "bottom": "0px"
                },
                200)
        },
        function() {
            $(this).find(".cc").stop().animate({
                    "bottom": "-166px"
                },
                200)
        });
    $(".case_a_cont a").live({
        mouseenter: function() {
            $(this).find("p,b").stop().animate({
                    "bottom": "0px"
                },
                200)
        },
        mouseleave: function() {
            $(this).find("p,b").stop().animate({
                    "bottom": "-65px"
                },
                200)
        }
    });
    var f = $(".about_nava").find("a");
    var g = $(".about_nava").find(".cur").length ? $(".about_nava").find(".cur").index() : 0;
    $(".about_navb").css("left", g * 90);
    $(".about_nava a").hover(function() {
            var h = $(this).index();
            var i = (h) * 90;
            $(".about_navb").stop(true, false).animate({
                    "left": i
                },
                200)
        },
        function() {
            $(".about_navb").stop(true, false).animate({
                    "left": g * 90
                },
                200)
        })
})