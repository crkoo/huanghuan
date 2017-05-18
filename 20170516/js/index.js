var buteNameBean = "";
var inputMsg="";
var inputNameList="";
var msg="";
var pageSize = 6;//每页行数 
var currentPage=1;
var flag=true;
var rightactivehtml="";
var applyHtml="";
var applyshowHtml="";
$(function() {
	
	var html = "";
	var activehtml = "";
	var annouVal = "";
	var annouValHtml = "";
	$.ajax({
			type : "POST",
			async : false,
			url : "/cp99kf/baseAction.php",
			data : {
				ctrl_action : "applyAction",
				ctrl_method : "queryUnEditTeams"
			},
			success : function(res) {
				var data = res.data;
				var len = data.length;
				var status = "";
				var userjk = "";
				for ( var i = 0; i < len; i++) {
					if (data[i].status == 0) {
						status = "<font color=blue>等待审核</font>";
					} else if (data[i].status == 1) {
						status = "成功办理";
					} else if (data[i].status == 2) {
						status = "<font color=red>已拒绝</font>";
					}
					if (data[i].account.length >= 4) {
						userjk = data[i].account.substr(0, 4) + "***";
					} else {
						userjk = data[i].account;
					}
					var k = data[i].activeName;
					var topHtml = "<li>会员: <span class='fc-yellow'>"+userjk+"</span>"+status+"<span class='fc-red'>"+data[i].activeName + "</span>成功</li>";
					html += topHtml;
				}
				$("#view_apply").html(html);
				jQuery(".cont").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",vis:8,interTime:50,trigger:"click"});
			},
			dataType : "json"
		});

	$(".activeId").on('change', function (e) {
		$("#dialogTitle").html($(this).find("option:selected").text());
	});
});
//弹出1
function showDetail() {
	  var bgObj=document.getElementById("bgDiv");
	    bgObj.style.width = document.body.offsetWidth + "px";
	    bgObj.style.height = document.body.offsetHeight + "px";
	    
	    var msgObj=document.getElementById("msgDiv");
	    msgObj.style.marginTop = -300 +  document.documentElement.scrollTop + "px";

	    document.getElementById("msgShut").onclick = function(){
	    bgObj.style.display = msgObj.style.display = "none";
	    }
	    msgObj.style.display = bgObj.style.display = "block";
	    // msgDetail.innerHTML=""
}
function getModerName(showval) {
	showDetail();
	$(".activeId").val(showval);
	$("#dialogTitle").html($(".activeId").find("option:selected").text());
	showval = 1;
	$("#save_button"+showval).click(function() {
		inputNameList="";
		msg="";
		var str = $("#apply_account"+showval).val();
		if (str == "") {
			alert("会员账号不能为空！");
			return false;
		}
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		if (re.test(str) == true) {
			alert("会员账号不能为空！");
			return false;
		}
		var content = $("#content"+showval).val();
		if (content == "") {
			alert("修改内容不能为空！");
			return false;
		}
		if (re.test(content) == true) {
			alert("修改内容不能为空！");
			return false;
		}
		inputMsg=$("#apply_account"+showval).val();
		//getElements("accountform"+showval);
		if (flag){
			flag=false;
		$.ajax({
			type : "POST",
			url : "/cp99kf/baseAction.php",
			data : {
				ctrl_action : "applyAction",
				ctrl_method : "applySaveMold",
				activeId : $("#activeId"+showval).val(),
				account : $("#apply_account"+showval).val(),
				content : $("#content"+showval).val(),
				//cfCode : $("#cfCode"+showval).val(),
				amount : inputNameList
			},
			success : function(data) {
				if (data.errcode > 0) {
					flag=true;
					alert(data.errmsg);
					return false;
				}else {
					alert("操作成功");
					window.location.reload(true);
				}

			},
			ajaxError : function(data) {
				flag=true;
				alert("服务出错");
			},
			dataType : "json"
		});
		}
	});
}
function getActive(){
   var objS = document.getElementById("search_activeName");
   var grade = objS.options[objS.selectedIndex].text;
   $("#activeName").html(grade); 
  }    

function Trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function fun(){
	var name=document.getElementsByTagName("input");
	for(var i=0;i<name.length;i++)
	{
	  alert(name[i].id);
	}
}

function getElements(formId) {
   var form = document.getElementById(formId);
    msg = inputMsg.split(",");
   var tagElements = form.getElementsByTagName('input');  
   var ywhdname="";
   for (var j = 3; j < tagElements.length-1; j++){ 
   	if (tagElements[j].value==""){
   		ywhdname=" ";
   		var str = tagElements[j].value;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		if (re.test(str) == true) {
			ywhdname=" ";
		}
   	}else{
   		ywhdname=tagElements[j].value;
   	}
   	inputNameList+=ywhdname+",";
   }
}