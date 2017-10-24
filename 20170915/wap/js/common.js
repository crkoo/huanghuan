/**
 * Created by adophper on 2017/10/24.
 */
$(function () {
    $(".checksub").click(function(){
        var uname = $("#query_user").val();
        if(uname == ""){
            layer.alert("会员帐号不能为空!");
            return false;
        }
        $(".con1").hide();
        $(".con2").fadeIn();
        queryPage(1);
    });
    $(".con2").on("click", ".look", function (e) {
        e.preventDefault();
        if($(this).attr("title")!=""){
            $("#reply").find(".modal-title").html("回复内容");
            $("#reply").find(".modal-body").html($(this).attr("title"));
        }else{
            $("#reply").find(".modal-title").html("提示");
            $("#reply").find(".modal-body").html("审核中，请耐心等待");
        }
        $("#reply").modal("show");
    })
    noticeList();
})
function noticeList() {
    $.ajax({
        url: '../api.php?action=list',
        dataType: 'json',
        cache: false,
        type: 'GET',
        success: function(obj) {
            var sAwardEle = "";
            $.each(obj, function(i, award) {
                sAwardEle += '<li><span class="color1">恭喜：<font>'+award.user_name+'</font></span><span class="color2">成功办理</span><span class="color3">'+award.active_name+'</span></li>'
            });
            $(".infoList").html(sAwardEle);
            jQuery(".notice").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",vis: 1,interTime:50,trigger:"click"});
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1
        }
    })
}

var pagesize = 5;

function queryPage(page) {
    if ($("#query_option").val() == "") {
        alert("请选择要查询的项目名称");
        return false;
    }
    $.ajax({
        url: '../api.php?action=querylist&page=' + page + '&size=' + pagesize,
        dataType: 'json',
        cache: false,
        data: {
            user_name: $("#query_user").val(),
            act_id: $("#query_option").val()
        },
        type: 'GET',
        success: function(obj) {
            if (obj.count != 0) {
                var sHtml1 = "";
                $.each(obj.data, function(i, award) {
                    var temp = '<td>等待审核</td>';
                    if (award.state == "1") {
                        temp = '<td><font color=green>已通过</font></td>'
                    }
                    if (award.state == "2") {
                        temp = '<td><font color=red>已拒绝</font></td>'
                    }
                    sHtml1 += "<tr><td>" + award.user_name + "</td><td>" + award.apply_time + "</td>" + temp + "<td><a class='look' href='javascript:;' title='" + award.check_desc + "' >点击查看</a></td></tr>";
                })
                var sPage = Paging(page, pagesize, obj.count, 2, "queryPage", '', '', '上一页', '下一页');
                $(".pages").html(sPage);
                $("#query_content").html(sHtml1)
            } else {
                $("#query_content").html("<tr><td colspan='4'>未查询到信息</td></tr>")
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var x = 1
        }
    })
}
function subForm(){
    var re =  /^[1-9]+[0-9]*]*$/;//判断是否为整数
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/; //判断手机号码
    var regc = /^([\u4E00-\u9FA5]+,?)+$/; //判断中文
    var username = /^[a-zA-Z0-9_]{1,}$/;
    var xss=/^[^<>]*$/;
    if($("#4_str1").val()==""){
        alert("会员账号不能为空");
        return false;
    }
    if(!xss.test($("#4_str1").val())){
        alert("会员账号不要含有特殊字符");
        return false;
    }
    var activeId = $("#activeId").val();
    var str2 = $("#4_str2");
    if (typeof str2 != 'undefined') {
        if (str2.val() == '') {
            alert(str2.attr("placeholder")+'不能为空');
            return false;
        }
        if (!xss.test(str2.val())) {
            alert(str2.attr("placeholder")+"不要含有特殊字符");
            return false;
        }
    }
    var str3 = $("#4_str3");
    if (typeof str3 != 'undefined') {
        if (str3.val() == '') {
            alert(str3.attr("placeholder")+'不能为空');
            return false;
        }
        if (!xss.test(str3.val())) {
            alert(str3.attr("placeholder")+"不要含有特殊字符");
            return false;
        }
    }
    /*var zdh = $("#4_int_1").val();
     if(zdh !='' && !re.test(zdh)){
     alert("申请内容必须是整数类型");
     return false;
     }*/
    $.ajax({
        url: '../api.php?action=apply',
        data: $("#doform").serialize(),
        dataType: 'JSON',
        type: 'POST',
        async: false,
        success: function (res) {
            if (res.errcode == 0 && res.errmsg == 'ok'){
                alert('提交成功');
                location.reload();
            }else{
                alert(res.errmsg);
            }
        },
        error: function (error) {
            alert(error);
        }
    });
    return false;
}

function Paging(pageNum, pageSize, totalCount, skipCount, fuctionName, currentStyleName, currentUseLink, preText, nextText, firstText, lastText) {
    var returnValue = "";
    var begin = 1;
    var end = 1;
    var totalpage = Math.floor(totalCount / pageSize);
    if (totalCount % pageSize > 0) {
        totalpage++
    }
    if (preText == null) {
        firstText = "prev"
    }
    if (nextText == null) {
        nextText = "next"
    }
    begin = pageNum - skipCount;
    end = pageNum + skipCount;
    if (begin <= 0) {
        end = end - begin + 1;
        begin = 1
    }
    if (end > totalpage) {
        end = totalpage
    }
    for (count = begin; count <= end; count++) {
        if (currentUseLink) {
            if (count == pageNum) {
                returnValue += "<a class=\"" + currentStyleName + "\" href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
            } else {
                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
            }
        } else {
            if (count == pageNum) {
                returnValue += "<a class=\"" + currentStyleName + "\">" + count.toString() + "</a> "
            } else {
                returnValue += "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + count.toString() + ");\">" + count.toString() + "</a> "
            }
        }
    }
    if (pageNum - skipCount > 1) {
        returnValue = " ... " + returnValue
    }
    if (pageNum + skipCount < totalpage) {
        returnValue = returnValue + " ... "
    }
    if (pageNum > 1) {
        returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum - 1).toString() + ");\"> " + preText + "</a> " + returnValue
    }
    if (pageNum < totalpage) {
        returnValue = returnValue + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + (pageNum + 1).toString() + ");\">" + nextText + "</a>"
    }
    if (firstText != null) {
        if (pageNum > 1) {
            returnValue = "<a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(1);\">" + firstText + "</a> " + returnValue
        }
    }
    if (lastText != null) {
        if (pageNum < totalpage) {
            returnValue = returnValue + " " + " <a href=\"javascript:void(0);\" onclick=\"" + fuctionName + "(" + totalpage.toString() + ");\">" + lastText + "</a>"
        }
    }
    return returnValue
}