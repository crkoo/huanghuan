$(document).ready(function(){
	$('.close').click(function() {$('.rkefu').hide();})
	var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random();
	$.getJSON(url, function(data){
		$("#ipdz").html(data.Ip);
	});
	$("a,input,button").focus(function(){this.blur()});
});

function butt(){
	document.write("<form class='formclass' name='autof'>")
	for(var i=1;i<autourl.length;i++)
	document.write("<div class='tline'><input type='text' class='msinput' name=txt"+i+" value='测试中……'><img src='images/ico_jg.png' border='0' /><input class='urlinput' type='text' name=url"+i+"><input type='button'  onclick='window.open(this.form.url"+i+".value)' class='buttonopen'></div>")
	document.write("<div class='cen'><input type='button' onclick='location.reload();return false;' value='点击这里重新检测刷新访问速度' class='buttonsubmit'></div></form>")
}
function auto(url){
	document.forms[0]["url"+b].value=url
	if(tim>200){
		document.forms[0]["txt"+b].value="链接超时"
	}
	else{
		document.forms[0]["txt"+b].value=tim*10+"ms"
	}
	b++
}
function run(){for(var i=1;i<autourl.length;i++)document.write("<img src="+autourl[i]+"/"+Math.random()+" width=1 height=1 onerror=auto('"+autourl[i]+"') style='display:none'>")}


function AddFavorite(sURL, sTitle){try{window.external.addFavorite(sURL, sTitle);}catch (e){try{window.sidebar.addPanel(sTitle, sURL, "");}catch (e){alert("加入收藏失败，请使用Ctrl+D进行添加");}}}
function SetHome(obj,vrl){
 try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);}catch(e){if(window.netscape) {try {netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}catch (e) {alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");}
 var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl);}}}