$(function(){$("#reg_img").click(function(){$(this).attr("src","code?_="+(new Date).getTime())})});
function doRegister(){var b=$("#reg_username").val();if(""==b)alert("\u8bf7\u8f93\u5165\u8d26\u53f7\u540d\u79f0");else if(6>b.length||15<b.length)alert("\u8d26\u53f7\u540d\u79f0\u75316-15\u4e2a\u6570\u5b57\u5b57\u7b26\u7ec4\u6210\u3002");else{var c=$("#reg_password").val(),a=$("#reg_password1").val();if(""==c)alert("\u8bf7\u8f93\u5165\u5bc6\u7801");else if(6>c.length)alert("\u5bc6\u7801\u4e0d\u80fd\u5c0f\u4e8e6\u4f4d\u5b57\u7b26\u3002");else if(c!=a)alert("\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002");
else if(a=$("#reg_name").val(),""==a)alert("\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d");else{var d=$("#reg_email").val(),e=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;if(void 0==d||""!=d&&e.test(d))if(e=$("#reg_mobile").val(),""==e)alert("\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7\u7801");else{var g=$("#wechat").val();if(""==g)alert("\u8bf7\u8f93\u5165\u60a8\u7684\u5fae\u4fe1\u53f7");else{var f=$("#affKey").val();if(""==f)alert("\u8bf7\u8f93\u5165\u4ee3\u7406\u63d0\u4f9b\u7684\u9080\u8bf7\u7801");
else{var h=$("#reg_code").val();""==h?alert("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\u3002"):$.post("reg",{username:b,password:c,email:d,mobile:e,name:a,affKey:f,code:h,weChatId:g},function(a){!0===a.success?(alert("\u6ce8\u518c\u6210\u529f"),$.post("login",{account:b,password:c,affKey:f},function(a,b,c){location.href="http://www.cpw05.com/nomainjf/js/member/agreement"})):alert(a.message)})}}}else alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7535\u5b50\u90ae\u7bb1\u5e10\u53f7\uff01")}}};
