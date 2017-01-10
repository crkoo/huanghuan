function Url_Go(url){
	if(url=='kf'){
		window.open("http://chat.5251.net/client.jsp?companyId=60184&style=129533&locate=cn","newFrame");
	}else{
		window.location.href='/'+url+'.php';
	}
}
function OnlineService(){
	window.open("http://chat.5251.net/client.jsp?companyId=60184&style=129533&locate=cn","newFrame");
}
function Mobile(){
	window.open("/Wap.php","newFrame");
}
function Menu_Go(url){
	if(url=='Ssc'){
		window.location.href='/lottery/'+url+'.php';
	}else{
		window.location.href='/'+url+'.php';
	}
}
function Rules(url){
	window.open('/Rule/'+url+'.php',"newFrame");
}
function Rule(url){
	window.open('/Rule/'+url+'.html',"newFrame");
}
function Lottery_Go(url){
	if(url=='Jxssc' || url=='Xjssc' || url=='Kl8'){
		alert("即将推出，尽情期待！");
	}else{
		window.location.href='/lottery/'+url+'.php';
	}
}
function AboutUs(id){
	var about_list = $.layer({
		type : 2,
		title: false,
    	iframe: {src: 'about.html?type='+id},
		offset: ['50px', ''], 
    	area : ['800px' ,($(window).height()-100)+'px'],

	});
}
function ongtUs(wid){
	var about_list = $.layer({
		type : 2,
		title: false,
    	iframe: {src: 'agrg.html?wid='+wid},
		offset: ['140px', ''], 
    	area : ['800px' ,($(window).height()-280)+'px'],

	});
}
function yh(id){
	var about_list = $.layer({
		type : 2,
		title: false,
    	iframe: {src: 'yh.html?type='+id},
		offset: ['50px', ''], 
    	area : ['800px' ,($(window).height()-100)+'px'],
	});
}
function LottNo() {
	alert("请登录后在进行下注！");
}
function getKey(){
	$("#loginCode").attr("src","/Code/?t=" + Math.random());
}
function Login(){
	var un	=	$("#username").val();
	if(un == "" || un == "会员账户"){
		$("#username").focus();
		//alert("帐号");
		return false;
	}
	var pw	=	$("#password").val();
	if(pw == "" || pw == "登录密码"){
		$("#password").focus();
		return false;
	}
	FORM.submit();
/*	$.post("/logincheck.php",{r:Math.random(),action:"login",username:un,password:pw},function(login_jg){
		if(login_jg.indexOf("1")>=0){ //验证码错误
			alert("验证码错误，请重新输入");
			$("#rmNum").select();
		}else if(login_jg.indexOf("2")>=0){ //用户名称或密码
			alert("用户名或密码错误，请重新输入");
			$("#password").val(''); 
			$("#username").select();
		}else if(login_jg.indexOf("3")>=0){ //停用，或被删除，或其它信息
			alert("账户异常无法登陆，如有疑问请联系在线客服");
		}else if(login_jg.indexOf("4")>=0){ //登陆成功
			window.location.href='/Home.php';
		}											 
	});*/
}
function GoTo(type,url,mulu){
	// class = 0 弹出新窗口
	// class = 1 根目录跳转
	// class = 2 直接跳转目录
	// class = 3 根据指定目录跳转
	if(type=='0'){
		window.open('/'+url+'.php',"newFrame");
	}
	if(type=='1'){
		window.location.href='/'+url+'.php';
	}
	if(type=='2'){
		window.location.href='/'+url+'/';
	}
	if(type=='3'){
		window.location.href='/'+mulu+'/'+url+'.php';
	}
}
function LoadUserInfo(){
	$.get("/Load/UserMoney.php", {t:Math.random()}, function(data)
		{
				if(data.yz!=1){
					alert("您的账户长时间未操作自动退出或从其他地区登陆！");
					window.location.href='/LogOut.php';
					return false;
				}else{
					$("#user_money").html(data.money);
					$("#user_sms").html(data.sms);
				}
				
		}, "json");
	setTimeout("LoadUserInfo()",5000);
}
function GoToMember(Args1,Args2){
	window.open('/Member/?Args1='+Args1+'&Args2='+Args2,"newFrame");
}
function Go_forget_pwd() {
	var pwd_list = $.layer({
		type : 2,
		title: false,
    	iframe: {src: '/GetPass.php'},
    	area : ['480px' , '222px'],
	});
}
function HotNewsHistory() {
	var noticle_list = $.layer({
		type : 2,
		title: false,
    	iframe: {src: '/Noticle.php'},
    	area : ['800px' , '560px'],
	});
}

function Reg(aid) {
	var reg_list = $.layer({
		type : 2,
		//title: false,
		title: '注册会员',
    	iframe: {src: 'reg.html?aid='+aid},
		offset: ['50px', ''], 
    	area : ['700px' ,($(window).height()-100)+'px'],
	});
}