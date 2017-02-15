//工程名不可更改如果要变更请联系开发人员！
var config = {
		publicUrl: "http://api.1680210.com/", //线上正式环境
		backUrl: "http://webapp.1680210.com/kai-bms/", //线上正式环境
		ifdebug: false //当为true的时候是调试模式
	}
//设为首页
function SetHome(url) {
	if(document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(url);
	} else {
		alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
	}
}
//收藏本站
function addFavorite2() {
	var url = window.location;
	var title = document.title;
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf("360se") > -1) {
		alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
	} else if(ua.indexOf("msie 8") > -1) {
		window.external.AddToFavoritesBar(url, title); //IE8
	} else if(document.all) {
		try {
			window.external.addFavorite(url, title);
		} catch(e) {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		}
	} else if(window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	} else {
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
	}
}
function showtime()
{
	var today,hour,second,minute,year,month,date;
	today=new Date();
	year = today.getFullYear();
	month = today.getMonth()+1;
	date = today.getDate();
	hour = today.getHours();
	minute =today.getMinutes();
	second = today.getSeconds();
	var a = new Array("日", "一", "二", "三", "四", "五", "六");
	var week = today.getDay();
	var str = "星期"+ a[week];
	document.getElementById('current_time').innerHTML = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second + " "+str; //显示时间
	setTimeout("showtime();", 1000);
}
showtime();

$(function() {
	publicmethod.fixBox();
	/*if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
		alert("IE 8.0"+navigator.appVersion.split(";")[1].replace(/[ ]/g, ""));
	}*/
	$("#localyears").text(new Date().getFullYear());
	//用户反馈
	$(".fankuicon").live("click", function() {
		if(localStorage.current_time != "" || localheaddata.current_time != undefined) {
			//再次点击用户反馈信息
			var start_time = localStorage.current_time; //读取存放的时间	
			var date = getDate();
			var first_time = start_time.replace("-", "/");
			var end_time = date.replace("-", "/");
			first_time = new Date(first_time.replace("-", "/")).getTime();
			end_time = new Date(end_time.replace("-", "/")).getTime();
			var sys_second = (end_time - first_time) / 1000;
			var min = sys_second / 60;
			//计算时间差 
			if(min <= 10) {
				$("#info1").hide();
				$("#info2").hide();
				$("#info3").show();
			} else {
				$("#btn_submit").show();
				$("#info3").hide();
				$("#info2").hide();
				$("#info1").show();
			}
		} else {
			$("#btn_submit").show();
			$("#info3").hide();
			$("#info2").hide();
			$("#info1").show();
		}
	});
	//用户反馈 初始化数据
	$("#btn_submit").live("click", function() {
		//初始化数据
		var nickName = $("#nickName").val(); //得到称呼
		var link = $("#linkType").val(); //得到联系方式类型
		var linkType = parseInt(link);
		var linkNumber = $("#linkNumber").val(); //得到具体联系方式
		var fedBack = $("#advice").val(); //得到意见内容
		yonghufankui.listData(nickName, linkType, linkNumber, fedBack);
	});
	//当为主页时，不加载用户反馈html
	if($("#ifindex").val() == "index") {
		return;
	} else {
		$("#user_adv").load("../public/user_adv.html", function() {});
	}
	//声音设置
	$("#soundSet").on("click",".soundbtn",function(event){
		$(this).find(".soundpanel").show("200");
		event.stopPropagation();//阻止事件冒泡
	});
	$(".bodybox").on("click",function(event){
		$(this).parent().parent().find(".soundpanel").hide("200");
	})
	$(".close").on("click",function(event){
		$(this).parent().parent().find(".soundpanel").hide("200");
		event.stopPropagation();
	});
	$("#soundSet").on("click","input",function(){
		if($(this).val()=="none"){
			$("#soundSet").find(".soundicon").addClass("stopsound");
		}else{
			$("#soundSet").find(".soundicon").removeClass("stopsound");
			$("#soundSet").find("audio").attr("src","../../media/"+$(this).val()+".wav")
		}
	});
	//只有当页面为操盘界面时执行固定开奖区域为fixed
	if($("#operator").val()=="operator") {
		$(window).on("scroll", function() {
			if($(this).scrollTop() > 195) {
				$(".haomabox").addClass("fixedHead");
			} else {
				$(".haomabox").removeClass("fixedHead");
			}
		})
	}
})

//公共URL
var backUrl = config.backUrl;
//用户反馈信息
var yonghufankui = {};
//publicmethod
var publicmethod = {};
//公用工具方法
var tools = {};
yonghufankui.listData = function(nickName, linkType, linkNumber, fedBack) {
	var data = {
		"nickName": nickName,
		"linkType": linkType,
		"linkNumber": linkNumber,
		"fedBack": fedBack
	};
	$.ajax({
		url: backUrl + "fedBack/saveFedBack.do",
		type: "post",
		data: data,
		success: function(data) {
			//网络延迟状态下显示正在提交中...
			$("#btn_submit").hide();
			$("#btn_submiting").show();
			//执行数据请求
			yonghufankui.createList(data);
		},
		error: function(data) {
			console.log("data error");
		}
	});
}
yonghufankui.createList = function(data) {
	//请求成功
	$("#btn_submiting").hide();
	var data = JSON.parse(data);
	if(data.errorCode == "0") {
		var current_time = getDate(); //string
		localStorage.current_time = current_time; //存入时间
		$("#info1").hide();
		$("#info2").show();
	} else {

	}
}

//得到系统时间
function getDate() {
	var current_time = "";
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	current_time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	return current_time;
}
//当开奖号码为空就执行这一方法
function ifNumIsNull(preDrawCode, id) {
	if(preDrawCode == "") {
		$(id).find(".rowbox2").append("<span class='errorbox' style='font-size:11px;color:orangered;'>开奖号码未开出，请尝试刷新页面或稍后再试！</span>");
		$(id).find(".kajianhao").hide();
	} else {
		$(id).find(".errorbox").hide();
		$(id).find(".kajianhao").show();
	}
}
publicmethod.fixBox = function() {
		var obj = $(".fixedgoBack").find(".fix1200");
		$(obj).empty();
		var fixedBox = '<ul>' +
			'<li>' +
			'<a class="kefuicon" target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?lang=&uin=800057725&cref=http://www.168kai.cc&ref=&pt=168%E5%BC%80%E5%A5%96%E7%BD%91&f=1&ty=1&ap=&as="></a>' +
			'</li>' +
			'<li>' +
			'<!--用户反馈模态框-->' +
			'<span class="fankuicon fankuicon_a" data-toggle="modal" data-target="#myModal">' +
			'<span class="fankuicons"></span>' +
			'</span>' +
			'</li>' +
			'<li>' +
			'<a class="topicon" id="gotop" href="javascript:"></a>' +
			'</li>' +
			'</ul>';
		var fixedPointer = '<ul class="ul_pre">' +
			'<li class="prev_li">' +
			'</li>' +
			'<li class="next_li">' +
			'</li>' +
			'</ul>';
		fixedBox = fixedBox+"" + fixedPointer;
		$(obj).append(fixedBox)
	}
	//判断是否有过被加载透明
tools.ifselectedOpacity = function(obj) {
	var selectedOpacity = $(obj).hasClass("selectedOpacity");
	if(selectedOpacity) {
		$(obj).removeClass();
		$(obj).addClass("selectedOpacity");
	} else {
		$(obj).removeClass();
	}
}
//选择大小单双
tools.bigOrSmall = function(id,num) {
	$("#jrsmhmtj .blueqiu li").each(function(index) {
		var number = $(this).text();
		//是否为单双
		var ifds = number % 2 == 0 ? true : false;
		//是否为大小
		var ifdx = number >= num ? true : false;
		$(this).find("i").hide();
		if(id == "xshm") {
			tools.ifselectedOpacity($(this));
			//样式名为numsm+01到10
			$(this).addClass("numblue");
			if((index + 1) % 10 == 0) {
				$(this).addClass("li_after");
			}
			if(number==19||number==20){
				$(this).addClass("numred");
			}
			$(this).find("i").show();
		} else if(id == "xsdx") {
			tools.ifselectedOpacity($(this));
			if(ifdx) {
				$(this).addClass("bluebig");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluebig li_after");
				}
			} else {
				$(this).addClass("bluesmall");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesmall li_after");
				}
			}
		} else if(id == "xsds") {
			tools.ifselectedOpacity($(this));
			if(ifds) {
				$(this).addClass("blueeven");
				if((index + 1) % 10 == 0) {
					$(this).addClass("blueeven li_after");
				}
			} else {
				$(this).addClass("bluesingular");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesingular li_after");
				}
			}
		}

	});
}
//广东11选5 and 11运夺金 选择大小单双和
tools.bigOrSmallTot = function(id,num) {
	$("#jrsmhmtj .blueqiu li").each(function(index) {
		var number = $(this).text();
		//是否为单双
		var ifds = number % 2 == 0 ? true : false;
		//是否为大小
		var ifdx = number >= num ? true : false;
		$(this).find("i").hide();
		if(id == "xshm") {
			tools.ifselectedOpacity($(this));
			//样式名为numsm+01到10
			$(this).addClass("numblue");
			if((index + 1) % 10 == 0) {
				$(this).addClass("li_after");
			}
			if(number==19||number==20){
				$(this).addClass("numred");
			}
			$(this).find("i").show();
		} else if(id == "xsdx") {
			tools.ifselectedOpacity($(this));
			if(ifdx) {
				//当号码为11为和
				if(number==11){
					$(this).addClass("bluetotle");
				}else{
					$(this).addClass("bluebig");
				}
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluebig li_after");
				}
			} else {
				$(this).addClass("bluesmall");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesmall li_after");
				}
			}
		} else if(id == "xsds") {
			tools.ifselectedOpacity($(this));
			if(ifds) {
				$(this).addClass("blueeven");
				if((index + 1) % 10 == 0) {
					$(this).addClass("blueeven li_after");
				}
			} else {
				//当号码为11为和
				if(number==11){
					$(this).addClass("bluetotle");
				}else{
					$(this).addClass("bluesingular");
				}
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesingular li_after");
				}
			}
		}

	});
}
//幸运农场选择大小单双
tools.bigOrSmallXync = function(id,num) {
	$("#jrsmhmtj .blueqiu li").each(function(index) {
		var number = $(this).text();
		//是否为单双
		var ifds = number % 2 == 0 ? true : false;
		//是否为大小
		var ifdx = number > num ? true : false;
		if(id == "xshm") {
			tools.ifselectedOpacity($(this));
			//样式名为numsm+01到10
			$(this).addClass("ncnum"+number);
			if((index + 1) % 10 == 0) {
				$(this).addClass("li_after");
			}
		} else if(id == "xsdx") {
			tools.ifselectedOpacity($(this));
			if(ifdx) {
				$(this).addClass("bluebig");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluebig li_after");
				}
			} else {
				$(this).addClass("bluesmall");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesmall li_after");
				}
			}
		} else if(id == "xsds") {
			tools.ifselectedOpacity($(this));
			if(ifds) {
				$(this).addClass("blueeven");
				if((index + 1) % 10 == 0) {
					$(this).addClass("blueeven li_after");
				}
			} else {
				$(this).addClass("bluesingular");
				if((index + 1) % 10 == 0) {
					$(this).addClass("bluesingular li_after");
				}
			}
		}

	});
}
//播放开奖前N秒提示音
tools.playSound = function(time){
	var medio = $("#soundSet").find("input:[checked='checked']").val();
	if(medio!="none"&&medio!=undefined){
		var audioPlay = $("#audioid");
		if($("#soundSet").find("select").val()==(time-1*1)){
			audioPlay[0].play();
		}
	}
}
