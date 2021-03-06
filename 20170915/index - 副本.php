<?php
define('DTW', true);
require_once dirname(__FILE__).'/backend/include/init.php';
$list = $db->getLineAll("select id,title,litpic,form_title,form_title2,is_apply from dbl_activity where status=1 ORDER by ord desc, id ASC ");
$listArray = array();
foreach ($list as $item) {
    $listArray[$item['id']] = $item;
}
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit">
    <title>澳门金沙娱乐场-优惠活动办理大厅</title>
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <link type="text/css" rel="stylesheet" href="./css/reset.css"  />
    <link type="text/css" rel="stylesheet" href="./css/style.css"  />
    <script type="text/javascript" src="./js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="./js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="./js/jeDate/jedate.min.js"></script>
    <script>var dir = "./";</script>
    <script type="text/javascript">
        //判断浏览器跳转手机站
        try {
            var urlhash = window.location.hash;
            if (!urlhash.match("fromapp")) {
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
                    window.location = "wap/index.html";
                }
            }
        } catch (err) {
        }
    </script>
</head>
<body>
<div class="header">
    <div class="headercon w1000">
        <a class="ad" href="javascript:;"></a>
        <a class="logo" href="#"></a>
        <a href="javascript:;" class="query"></a>
    </div>
</div>
<div class="w1000">
    <div class="headtitle"></div>
</div>
<div class="main w1000">
    <div class="main-top clearfix">
        <div class="itemlist fl">
            <ul>
                <?php
                if (!empty($list)){
                    foreach ($list as $k => $v){
                        if ($k < 2) {
                            ?>
                            <li><a href='javascript:;' class="applybtn" data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
                            <?php
                        }
                    }
                }
                ?>
            </ul>
        </div>
        <div class="list fl">
            <div class="tips clearfix">
                <div class="marquee fl"></div>
                <div class="tips-content fl">温馨提示：请点击对应活动类别申请，提交申请后专员将于2小时内审核办理，提交申请后可以点击审核进度查询！</div>
                <div class="marquee fr"></div>
            </div>
            <div class="bd">
                <ul class="infoList">
                </ul>
            </div>
        </div>
        <div class="itemlist fl">
            <ul>
                <?php
                if (!empty($list)){
                    foreach ($list as $k => $v){
                        if ($k > 1 && $k < 4) {
                            ?>
                            <li><a href='javascript:;' class="applybtn" data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
                            <?php
                        }
                    }
                }
                ?>
            </ul>
        </div>
    </div>
    <div class="itemlist clearfix">
        <ul>
            <?php
            if (!empty($list)){
                foreach ($list as $k => $v){
                    if ($k > 3) {
                        ?>
                        <li><a href='javascript:;' class="applybtn" data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
                        <?php
                    }
                }
            }
            ?>
        </ul>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>
</div>

<div class="footer">
    <div class="w1000">
        <div class="link clearfix">
            <ul>
                <li><a href="http://www.1115675.com/cl/index.php?module=JoinMember###" target="_blank" class="l1"></a></li>
                <li><a href="http://www.1115675.com/cl/?module=System&method=LiveTop&args=39" target="_blank" class="l2"></a></li>
                <li><a href="http://www.1115675.com/cl/?module=BBinInfo" target="_blank" class="l3"></a></li>
                <li><a href="http://www.1115675.com/cl/?module=System&method=MAdvertis&other=AT3" target="_blank" class="l4"></a></li>
                <li><a href="http://www.1115675.com/infe/rmobile" target="_blank" class="l5"></a></li>
                <li class="last"><a href="https://static.meiqia.com/dist/standalone.html?_=t&eid=68285" target="_blank" class="l6"></a></li>
            </ul>
        </div>
    </div>
    <div class="footerimg w1000"></div>
    <div class="copyright w1000">Copyright © 澳门金沙娱乐场 Reserved.</div>
</div>

<div class="modal tccon" id="querycon">
    <a class="layui-layer-close closebtn"></a>
    <a class="tclogo"></a>
    <div class="fg"></div>
    <div class="layertitle tc"><img src="images/checktitle.png" /></div>
    <h3></h3>
    <div class="con1">
        <p><span>请输入会员帐号：</span><input type="text" id="query_user" name="query_option" value="" placeholder="填写你的会员账号"  ></p>
        <p><span>选择查询项目：</span><select id="query_option" name="query_option">
                <?php
                if (!empty($list)) {
                    foreach ( $list as $k =>$v) {
                        ?>
                        <option value='<?=$v['id']?>' ><?=$v['title']?></option>
                        <?php
                    }
                }
                ?>
            </select></p>
        <div class='line'></div>
        <p><span>&nbsp;</span><input type="submit" value="点击查询" class="subbtn checksub"></p>
    </div>
    <div class="con2">
        <table  border="0" cellpadding="0" cellspacing="0">
            <tr>
                <th width="20%">会员账号</th>
                <th width="30%">申请时间</th>
                <th width="20%">申请状态</th>
                <th>查看回复</th>
            </tr>
            <tbody id="query_content">

            </tbody>
        </table>
        <div class="pages">
        </div>
        <div class="tc"><a href="javascript:;" class="backbtn"><img src="images/backbtn.png" /></a></div>
    </div>
</div>
<div class="modal tccon" id="applybox">
    <a class="layui-layer-close closebtn"></a>
    <a class="tclogo"></a>
    <div class="fg"></div>
    <div class="layertitle tc"><img src="images/applytitle.png" /></div>
    <h3></h3>
    <div class="con3">
        <div class="active_name clearfix">
            <div class="apply_subject fl">申请主题：</div>
            <div class="apply_show fl">
                <span class="activeName">活动名称</span>
                <a href="#" id="activeContent" class="active_content" target="_blank">了解详情</a>
            </div>
        </div>
        <form action="api.php?action=apply" name="doform" id="doform" method="POST" onsubmit="return subForm();" style="display: none;">
            <input type="hidden" name="activeId" id="activeId" />
            <p><span><font color="#ff0000">*</font> 会员帐号：</span><input type="text" placeholder="填写会员帐号" id="4_str1" name="str1"></p>
            <div id="formTitle">
                <p><span><font color="#ff0000">*</font> 亏损金额：</span><input type="text" placeholder="亏损金额" id="4_str2" name="str2"></p>
            </div>
            <p class="apply_content" style="display: none;"><span>申请内容：</span><textarea type="text" placeholder="填写申请内容" id="4_int_1" name="int_1"></textarea></p>
            <p><span>&nbsp;</span><input type="submit" class="applysubbtn" value="立即提交"></p>
        </form>
    </div>
</div>
<script>var listArray = <?=json_encode($listArray)?>;</script>
<script type="text/javascript" src="./js/joker.js"></script>
<script type="text/javascript" src="./js/layer.js"></script>
<script language="javascript">
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
        var str2 = $("#formTitle").find("#4_str2");
        if (typeof str2 != 'undefined') {
            if (str2.val() == '') {
                alert(listArray[activeId]['form_title'] + '不能为空');
                return false;
            }
            if (!xss.test(str2.val())) {
                alert(listArray[activeId]['form_title'] + "不要含有特殊字符");
                return false;
            }
        }
        var str3 = $("#formTitle").find("#4_str3");
        if (typeof str3 != 'undefined') {
            if (str3.val() == '') {
                alert(listArray[activeId]['form_title2'] + '不能为空');
                return false;
            }
            if (!xss.test(str3.val())) {
                alert(listArray[activeId]['form_title2'] + "不要含有特殊字符");
                return false;
            }
        }
        /*var zdh = $("#4_int_1").val();
         if(zdh !='' && !re.test(zdh)){
         alert("申请内容必须是整数类型");
         return false;
         }*/
        $.ajax({
            url: 'api.php?action=apply',
            data: $("#doform").serialize(),
            dataType: 'JSON',
            type: 'POST',
            async: false,
            success: function (res) {
                if (res.errcode == 0 && res.errmsg == 'ok'){
                    alert('提交成功');
                    location.reload();
                }else{
                    var msg = res.errmsg;
                    //边缘弹出
                    layer.open({
                        type: 1
                        ,offset: 'auto' //具体配置参考：offset参数项
                        ,content: '<div style="padding: 80px; font-size: 16px; line-height: 28px; color: #FF0000;">'+msg+'</div>'
                        ,btn: '关闭'
                        ,btnAlign: 'c' //按钮居中
                        ,shade: 0 //不显示遮罩
                        ,yes: function(index){
                            layer.close(index);
                        }
                    });
                    //alert(res.errmsg);
                }
            },
            error: function (error) {
                alert(error);
            }
        });
        return false;
    }
    $(document).ready(function () {
        $(window).scroll(function () {
            var offsetTop = $(window).scrollTop() + "px";
            $(".linkfloat").animate({ top: offsetTop }, { duration: 600, queue: false });
        });
    });
</script>
</body>
</html>