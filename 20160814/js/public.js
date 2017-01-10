var livelist = ['GPI', 'CT', 'Lebo', ''];
var userid = "";
var reg = /<[^>]+>/g;
var balance = $("#Balance").html();
$(function () {
    userid = $("#userid").val();

    if (userid != null && userid != "") {

        SetHits();
        setInterval("SetHits()", 60000);
        
    }
    //每隔10秒刷新
});

function SetHits() {
    $.ajax({
        type: "post",
        url: "/RestCredit?uid=" + userid,
        data: null,
        success: function (data) {
            if (data == -1) {
                //location.href = '/LoginOut?uid=' + userid;
                $("#Balance").html(balance);
            } else if(data == 0) {
		balance=data;
                $("#Balance").html(balance);
            } else {
                if (!reg.test(data)) {
                    $("#Balance").html(data);
			balance=data;
                } else {
                    $("#Balance").html(balance);
                }
            }

        }
    });
}

function winopen(url, type, gameid) {
    var sw = '';
    csw = '';
    sh = '';
    csh = '';
    ctop = '';
    cleft = '';

    sw = $(window).width();
    sh = $(window).height();
    //csw = $(window).width() * 0.9;
    //csh = $(window).height() * 0.9;
    //ctop = ($(window).height() * 0.1) / 2;
    //cleft = ($(window).width() * 0.1) / 2;
    csw = $(window).width();
    csh = $(window).height();
    ctop = 0;
    cleft = 0;
    var adr = '';
    var chuang = '';
    if (type == 'game') {
        adr = 'PlayGame/';
        chuang = 'height=' + csh + ', width=' + csw + ', top=' + ctop + ', left=' + cleft + ',toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=no';
    } else if (type == 'user') {
        adr = '/User/';
        chuang = 'height=700, width=1200, top=90, left=200,toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=yes, status=no';
    }
    if (userid == null || userid == "") {
        alert("您尚未登录，请先登录后再进行游戏");
        return false;
    } else {
        if (url == "LOTTERY") {
            window.open(adr + url + '?uid=' + userid + '&gameid=' + gameid + '', '_blank', chuang);
        } else {
            window.open(adr + url + '?uid=' + userid + '', '_blank', chuang);
        }
    }
}

function openct() {

    if (userid == null || userid == "") {
        alert("您尚未登录，请先登录后再进行游戏");
        return false;
    }
    else {
        location.href = 'livedetail?uid=' + userid + '&gameid=CT';
    }

}
function winfor() {
    window.open('Forgetpwd', 'a', 'height=300, width=300, top=90, left=200,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=yes, status=no');

}

function change_zc_yzm(id) {

    document.getElementById(id).src = "/ValidateCode?id=" + Math.random();

}
function MM_openBrWindow(C, B, A) {
    window.open(C, B, A)
}

// 設為首頁
function setFirst(sURL) {
    try {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(sURL);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("抱歉，此操作被浏览器拒绝！\n\r请在浏览器地址栏输入“about:config”并回车\n\r然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
        } else {
            alert("抱歉，您的浏览器不支持，请按照下面步骤操作：\n\r1.打开浏览器设置。\n\r2.点击设置网页。\n\r3.输入：" + sURL + "点击确定。");
        }
    }
}

// 加入最愛
function bookMarksite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\r加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function denglu() {

    var us = $("#username").val();
    var pwd = $("#userpassword").val();
    var code = $("#code").val();
    if (us == "" || us == null) {
        alert("请输入用户名");
        return false;
    }
    if (pwd == "" || pwd == null) {
        alert("请输入密码");
        return false;
    }
    if (code == "" || code == null) {
        alert("请输入验证码");
        return false;
    }
    $("#Login").submit();
    return true;

}