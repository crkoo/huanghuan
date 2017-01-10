;

$.fn.navFixed = function(setting) {

    var _o = this,

        conf = {

            fixedClass: 'fixed',

            fixedTop: 0

        };

    $.extend(conf, setting);

    return this.each(function() {

        var $target = $(_o),

            targetTop = $target[0].offsetTop,

            fixedTop = parseInt(conf.fixedTop, 10) || 0,

            criticalTop = targetTop - fixedTop;

        $(window).scroll(function() {

            var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,

                scrollLeft = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;

            if (scrollTop > criticalTop) {

                if (!$target.hasClass(conf.fixedClass)) {

                    $target.addClass(conf.fixedClass);

                }

                $target.children().css({
                    left: -scrollLeft
                });

            } else if ($target.hasClass(conf.fixedClass)) {

                $target.removeClass(conf.fixedClass);

            }

        });

    });

};
var j = 1;
var t = setInterval(function(){
    if (j%2==1){
        $("li.LS-memberexclusiveii").removeClass('change');
    }else{
        $("li.LS-memberexclusiveii").addClass('change');
    }
    j ++;
}, 600);
$(function() {
    $(".mainnav li>.ele-lsub-group").each(function() {
        $(this).prev("a").lSubTab();
    })
});
$.fn.lSubTab = function() {
    var a = $(".mainnav"),
        d = $(this).next(".ele-lsub-group"),
        v = a.data("lsub-style") ? a.data("lsub-style") : "",
        w = a.data("lsub-align") ? a.data("lsub-align") : "",
        x = "undefined" != typeof a.data("lsub-in") ? a.data("lsub-in") : 200,
        y = "undefined" != typeof a.data("lsub-out") ? a.data("lsub-out") : 300,
        C = "undefined" != typeof a.data("lsub-delay") ? a.data("lsub-delay") : 500,
        g = a.data("lsub-y") ? a.data("lsub-y") : 0,
        q = a.data("lsub-x") ? a.data("lsub-x") : 0,
        c = $(this),
        a = $("<div>").append(d).html(),
        r = top.mem_index ? $("body", top.mem_index.document) : $("body"),
        m = top.mem_index ? $(top.mem_index.document) : $(document),
        b;
    r.prepend(a);
    b = top.mem_index ? $("#" + d.attr("id"), top.mem_index.document) : $("#" + d.attr("id"));
    d = b.find(".lsub-inner-wrap");
    d.prepend("<span class='lsub-front-bg'></span>");
    d.append("<span class='lsub-back-bg'></span>");
    var h = b.width(),
        a = b.height();
    b.css({
        width: h + 1,
        height: a
    });
    d.css({
        position: "absolute",
        bottom: 0
    });
    var k = 0,
        s, z = c.offset().top + c.outerHeight(),
        l,
        f,
        n,
        t = !1,
        A = function(a) {
            if (1 == k) clearTimeout(s);
            else {
                k = 1;
                c.hasClass("current") && (t = !0);
                l = c.offset();
                var d = c.outerWidth(),
                    e = r.width() - $("body").width();
                0 != r.width() % 2 && (e -= 1);
                e = 0 < e ? e / 2 : 0;
                n = "left" == w ? l.left + e + q: "right" == w ? l.left + e + q - h + d: l.left + e + q + d / 2 - h / 2;
                f = l.top + c.outerHeight() + g;
                m.width() < n + h && (n = m.width() - h);
                b.css({
                    top: f - 20,
                    position: "absolute",
                    left: n,
                    "z-index": 1E3
                });
                "fade" == v ? b.fadeIn(x) : b.slideDown(x);
                a.parent().attr("id") && !t && (a.addClass("current"), a.parent().addClass("current"))
            }
        };
    m.resize(function() {
        b.hide();
        k = 0
    });
    var u = 0;
    m.scroll(function() {
        f = c.offset().top + c.outerHeight();
        $("#navfixed").hasClass("fixed") ? b.css({
            top: f + g
        }) : b.css({
            top: z + g
        });
        setTimeout(function() {
                1 == u ? $("#navfixed").hasClass("fixed") || (f = c.offset().top + c.outerHeight() + g, u = 0, b.css({
                    top: z + g
                })) : $("#navfixed").hasClass("fixed") && (f = c.offset().top + c.outerHeight(), u = 1, b.css({
                    top: f + g
                }))
            },
            1)
    });
    var B = function(a) {
            1 === k && (b.css({
                "z-index": 999
            }), s = setTimeout(function() {
                    k = 0;
                    "fade" == v ? b.fadeOut(y) : b.slideUp(y);
                    $("#LS-" + a + " a") && !t && $("#LS-" + a + " a, #LS-" + a).removeClass("current")
                },
                C))
        },
        p = "";
    c.on("mouseenter",
        function() {
            A($(this))
        }).on("click",
        function() {
            A($(this));
            b.stop(!0, !0).show()
        }).on("mouseleave",
        function() {
            "" !== $(this).parent().prop("id") && (p = $(this).parent().attr("id"));
            B(p.substr(3))
        });
    b.on("mouseenter",
        function() {
            clearTimeout(s)
        }).on("mouseleave",
        function() {
            p = $(this).attr("id");
            B(p.substr(4))
        })
};