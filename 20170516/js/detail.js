var buteNameBean="";
var pageSize = 6;//每页行数 
var currentPage=1;
var inputMsg="";
var inputNameList="";
var msg="";
var flag=true;
var objaccount="";
var allinputlist="";

$(function() {
	$("#verifycode").click(function(){
		var rand = parseInt(Math.random() * (100 - 0 + 1));
		var src=$("#verifycode").attr("src");
		$("#verifycode").attr("src",src+"?"+rand);
	});
});
function getActive(){
	var objS = document.getElementById("search_activeName");
	var grade = objS.options[objS.selectedIndex].text;
	$("#queryActiveName").html(grade);
}

	 
function getModeElements(formId) {
	var form = document.getElementById(formId);
	  inputNameList="";
	  var selectlist="";
	 msg =$("#inputMsg").val().split(",");

	 var objaccountName = document.getElementsByName("objaccount");
	objaccount="";
	for(i=0;i<objaccountName.length;i++){
		if (objaccountName[i].value==""){
			alert("用户账号不为空!");
			return false;

		}
		objaccount= objaccountName[i].value ;
	}
	var tagselect = form.getElementsByTagName('select');
	for (var i = 0; i < tagselect.length; i++){
		selectlist+=tagselect[i].value+",";
	}

	var blboname="";
	var tagElements = document.getElementsByName("attrib");
	allinputlist="";
	for(i=0;i<tagElements.length;i++){
		inputNameList += tagElements[i].value + ",";
	}
	allinputlist=inputNameList+selectlist;
}
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