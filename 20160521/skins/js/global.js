jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
$(document).ready(function(){
	//GetRTime();//美东时间
	//顶部登录
	$(".login-ipt :input").bind({
		focus: function(){var t=$(this).prev();$(this).val()==""?t.fadeTo("slow",0.4):t.fadeTo("slow",0);},
		blur: function(){var t=$(this).prev();$(this).val()==""?t.fadeTo("slow",1):t.fadeTo("slow",0);},
		keydown: function(){$(this).prev().hide();}
	});
	$(".login-ipt label").click(function(){$(this).next().focus();});
	
	
	//设置当前页菜单默认值
	var curLocation = location.href.split("/");
  var curPageName = curLocation.slice(curLocation.length-1, curLocation.length).toString(String).split(".").slice(0, 1).toString(String).toLowerCase();
	var webMenu = $("#webMenu").children();
	var lefNavMenu = $("#lefNavMenu").children();
	switch(curPageName){
		case "":	  		webMenu.eq(0).addClass("cur");break;
		case "index":	  webMenu.eq(0).addClass("cur");break;
		case "reg":	  	webMenu.eq(1).addClass("cur");break;
		case "deposit":	webMenu.eq(2).addClass("cur");lefNavMenu.eq(4).children().addClass("cur");break;
		case "faq":			webMenu.eq(3).addClass("cur");lefNavMenu.eq(1).children().addClass("cur");break;
		case "rule":		webMenu.eq(4).addClass("cur");lefNavMenu.eq(8).children().addClass("cur");break;
		case "agent":		webMenu.eq(5).addClass("cur");lefNavMenu.eq(7).children().addClass("cur");break;
		case "about":		webMenu.eq(6).addClass("cur");lefNavMenu.eq(0).children().addClass("cur");break;
		case "activity":webMenu.eq(7).addClass("cur");lefNavMenu.eq(5).children().addClass("cur");break;
		
		case "generalfaq":lefNavMenu.eq(2).children().addClass("cur");break;
		case "techfaq":		lefNavMenu.eq(3).children().addClass("cur");break;
		case "contactus":	lefNavMenu.eq(6).children().addClass("cur");break;
	}
	
	//文字闪烁
	new toggleColor('#MenuActivity', ['#FFFFFF','#fff100'] , 500 );
	function toggleColor( id , arr , s ){
		var self = this;
		self._i = 0;
		self._timer = null;
		
		self.run = function(){
			if(arr[self._i]){
				$(id).css('color', arr[self._i]);
			}
			self._i == 0 ? self._i++ : self._i = 0;
			self._timer = setTimeout(function(){
				self.run( id , arr , s);
			}, s);
		}
		self.run();
	}
	
	$("#addFavorite").click(function() {
		var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
		if(document.all){ window.external.addFavorite(window.location.href, document.title); }else if (window.sidebar){ window.sidebar.addPanel(document.title, window.location.href, ""); } else { alert('该版本浏览器无法完成此操作。\n您可以尝试通过快捷键' + ctrl + '+D加入到收藏夹~'); }
		return false;
	});
	
	$("#setHomePage").click(function(){
		try{
			this.style.behavior='url(#default#homepage)';
			this.setHomePage($(this).attr("href"));
		}catch(e){
			if(window.netscape){ try{ netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }catch(e){ alert("抱歉，此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'"); } }else{ alert("抱歉，您所使用的浏览器无法完成此操作。\n您需要手动将本站设置为首页。"); }
		} 
		return false;
	});
});

//美东时间
function GetRTime(){
	var NowTime = new Date();
	var ESTReciprocal = document.getElementById('ESTReciprocal');
	var nYear = NowTime.getFullYear();
	var nMonth = NowTime.getMonth() + 1;
	var nDay = NowTime.getDate();
	var nH = NowTime.getHours();
	if(nH>12){nH=nH-12;}
	if(nH<=12){nH=nH+12;nDay=nDay-1;}
	var nM = NowTime.getMinutes();
	var nS = NowTime.getSeconds();
	if (nMonth < 10) { nMonth = "0" + nMonth; }
	if (nDay < 10) { nDay = "0" + nDay; }
	if (nH < 10) { nH = "0" + nH; }
	if (nM < 10) { nM = "0" + nM; }
	if (nS < 10) { nS = "0" + nS; }
	ESTReciprocal.innerHTML = nYear + "-" + nMonth + "-" + nDay + "　" + nH + ":" + nM + ":" + nS;
	setTimeout("GetRTime()", 1000);
}

//在线客服
function onlineService(){
	window.open('###','ser','menubar=no,status=yes,scrollbars=yes,top='+($(window).height()-500)/2+',left='+($(window).width()-600)/2+',toolbar=no,width=600,height=500');
}

//QQ客服
function qqService(){
	window.open('###');
}
function qqService1(){
	window.open('###');
}

//试玩地址
function demoUrl(){
 window.open("guest.html");
}

//会员登入
function memberLoginUrl(){
 window.open("###");
}

//代理登入
function agentLoginUrl(){
	window.open("###");
}

//取回密码
function getPwd(){
	alert("帐户密码遗失请与在线客服联系！");
}

//顶部登陆验证
function loginCheck(o){
	if(o.username.value==""){alert("帐号不能为空！");o.username.focus();return false;}
	if(o.password.value=="" || o.password.value.length < 6){alert("密码不能少于6位！");o.password.focus();return false;}
	if(o.vcode.value==""){alert("验证码不能为空！");o.vcode.focus();return false;}
}

function checkimgnum(o){
		document.getElementById(o).src = "skins/images/yzm.jpg?"+Math.random();
		
		return false;
}

//设为首页
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
 
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}