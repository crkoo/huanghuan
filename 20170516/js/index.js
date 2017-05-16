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
	$
			.ajax({
				type : "POST",
				async : false,
				url : "/ylgkf/baseAction.do",
				data : {
					ctrl_action : "applyAction",
					ctrl_method : "queryUnEditTeams"
				},
				success : function(data) {
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
							userjk = data[i].account.substr(0, 4)
									+ "***";
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

function searchApplyList(currentPage) {
	 var strongList= "";
	  var countHtml;
	$
			.ajax({
				type : "POST",
				async : false,
				url : "/ylgkf/baseAction.do",
				data : {
					ctrl_action : "applyAction",
					ctrl_method : "queryCurUserInfo",
					account : $("#account").val(),
					page:currentPage,
					rows:pageSize
				},
				success : function(data) {
					var len = data.rows.length;
					var dataList=data.rows;
					var total=data.total;
					var row=Math.ceil(total/pageSize);
					for ( var i = 1; i <= row; i++){
						
						var strongRef="";
						
					    strongRef="<a href='#' onclick='searchApplyList("+i+")'>"+i+"</a>";
					
						strongList += strongRef;
					   
					}
					$("#pageHtml").html(strongList);
					$("#applyMsg").html("");
					$("#applyMsg")
							.append(
									"<tr><td>会员账号</td><td>申请时间</td><td>审核状态</td><td>回复信息</td>");
					if (len == 0) {
						$("#applyMsg").append(
								"<tr> <td colspan=4>未查询到信息</td></tr>");

					}
					var status = "";
					for ( var i = 0; i < len; i++) {
						if (dataList[i].status == 0) {
							status = "<font color=blue>等待审核</font>";
						} else if (dataList[i].status == 1) {
							status = "<font color=green>已通过</font>";
						} else if (dataList[i].status == 2) {
							status = "<font color=red>已拒绝</font>";
						}
						$("#applyMsg").append(
								"<tr><td>" + dataList[i].account + "</td><td>"
										+ dataList[i].addTime + "</td><td>"
										+ status + "</td><td><span class='tip' title='" + dataList[i].tips + "'>点击查看</span></td></tr>");
						$('.tip').miniTip({'className':'green'});
					}

				},
				dataType : "json"
			});
}


function getModerName(showval) {

	//getmoderInputName(showval);
	showDetail();
	$('#modal-1').hide();
	$('#modal-2').hide();
	$("#modalA-"+showval).show();
	$('#msgShut').click(function(){
	      $('#bgDiv,#msgDiv').hide();
	      $("#modalA-"+showval).hide();
	    });
	$("#verifycode"+showval).click(function() {
		var rand = parseInt(Math.random() * (100 - 0 + 1));
		var src = $("#verifycode"+showval).attr("src");
		$("#verifycode"+showval).attr("src", src + "?" + rand);
	});
	$("#view_button"+showval).click(function() {
		   showDetail();
		    $("#account").val("");
		    $('#modal-1').show();
		    $('#modal-2').hide();
		    $("#modalA-"+showval).hide();
		});
	$("#save_button"+showval).click(function() {
		inputNameList="";
		msg="";
		var str = $("#apply_account"+showval).val();
		if (str == "") {
			alert("会员账号不为空！");
			return false;
		}
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		if (re.test(str) == true) {
			alert("会员账号不为空！");
			return false;
		}
		inputMsg=$("#apply_account"+showval).val();
		getElements("accountform"+showval);
		if (flag){
			flag=false;
		$.ajax({
			type : "POST",
			url : "/ywhd/baseAction.do",
			data : {
				ctrl_action : "applyAction",
				ctrl_method : "applySaveMold",
				activeId : $("#activeId"+showval).val(),
				account : $("#apply_account"+showval).val(),
				cfCode : $("#cfCode"+showval).val(),
				amount : inputNameList,
				buteNameList :$("#inputMsg"+showval).val()

			},
			success : function(data) {
				if (data.code == "02") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "01") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "001") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "002") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "003") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "004") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "005") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code == "0003") {
					flag=true;
					alert(data.desc);
					return false;
				} else if (data.code == "0004") {
					flag=true;
					alert(data.desc);
					return false;
				} else if (data.code == "0005") {
					flag=true;
					alert(data.desc);
					return false;
				} else if (data.code == "0008") {
					flag=true;
					alert(data.desc);
					return false;
				} else if (data.code=="0006") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code=="0007") {
					flag=true;
					alert(data.desc);
					return false;
				}else if (data.code=="0009") {
					   flag=true;
						alert(data.desc);
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
      