var pageSize = 6;//每页行数
var currentPage=1;
$(function() {
	var thisURL = document.URL;
	var getval="";
	var showval="";
	$('.j-detail-fm-btn').click(function() {
		if ($("#account").val() == "") {
			alert('请填写会员帐号');
			return false;
		}
		if ($("#search_activeName").val() == null) {
			alert('请选择查询项目!');
			return false;
		}
		searchApplyList(currentPage);
		$('.search-table').show();
		$('#detailSearch').hide();

	});
   });
function searchApplyList(currentPage) {
  var strongList= "";
  var countHtml;
  $.ajax({
		type : "POST",
		async : false,
		url : "/20170516/cp99kf/baseAction.php",
		data : {
			ctrl_action : "applyAction",
			ctrl_method : "queryCurUserInfo",
			activeId : $("#search_activeName").val(),
			account : $("#account").val(),
			page:currentPage,
			rows:pageSize
		},
	  	dataType : "json",
		success : function(res) {
			var data = res.data;
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
			$("#applyMsg").append("<tr><td>会员账号</td><td>申请时间</td><td>审核状态</td><td>回复信息</td>");
			if (len == 0) {
				$("#applyMsg").append("<tr> <td colspan=4>未查询到信息</td></tr>");
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
								+ status + "</td><td>" + dataList[i].tips + "</td></tr>");
				//$('.tip').miniTip({'className':'yellow'});
			}
		}
	});
}


