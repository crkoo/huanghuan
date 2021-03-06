<?php
define('DTW', true);
require_once dirname(__FILE__).'/../backend/include/init.php';
$activeId = isset($_GET['activeId']) ? intval($_GET['activeId']) : null;
$list = $db->getLineAll("select id,title from dbl_activity where status=1 ORDER by ord desc, id ASC ");
if (!empty($activeId)) {
    $detail = $db->getLine("select id,title,content from dbl_activity where status=1 and id=" . $activeId);
}
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit">
    <title>澳门威尼斯人-优惠活动办理大厅</title>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
    <link type="text/css" rel="stylesheet" href="../css/reset.css"  />
    <link type="text/css" rel="stylesheet" href="../css/style.css"  />
    <script type="text/javascript" src="../js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="../js/jeDate/jedate.min.js"></script>
    <script type="text/javascript" src="../js/joker.js"></script>
    <script type="text/javascript" src="../js/layer.js"></script>
</head>
<body>
<div class="header">
    <div class="headercon w1000">
        <a class="logo" href="#"></a>
        <a href="javascript:;" class="query"></a>
    </div>
</div>
<div class="w1000">
    <div class="headtitle"></div>
</div>
<div class="main w1000">
    <div class="box1">
        <div class="boxtitle clearfix">
            <a class="fl" href="../index.html"><img src="../images/backhome.png" /></a>
            <div class="fr"><?=!empty($detail) ? $detail['title'] : null?></div>
        </div>
        <div class="boxcon">
            <?=!empty($detail) ? htmlspecialchars_decode($detail['content']) : null?>
        </div>
    </div>
</div>

<div class="footer">
    <div class="w1000">
        <div class="link clearfix">
            <ul>
                <li><a href="#" target="_blank" class="l1"></a></li>
                <li><a href="#" target="_blank" class="l2"></a></li>
                <li><a href="#" target="_blank" class="l3"></a></li>
                <li><a href="#" target="_blank" class="l4"></a></li>
                <li><a href="#" target="_blank" class="l5"></a></li>
                <li class="last"><a href="#" target="_blank" class="l6"></a></li>
            </ul>
        </div>
    </div>
    <div class="footerimg w1000"></div>
    <div class="copyright w1000">Copyright © 澳门威尼斯人 Reserved</div>
</div>

<div class="modal tccon" id="querycon">
    <a class="layui-layer-close closebtn"></a>
    <a class="tclogo"></a>
    <div class="fg"></div>
    <div class="layertitle tc"><img src="../images/checktitle.png" /></div>
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
        <div class="tc"><a href="javascript:;" class="backbtn"><img src="../images/backbtn.png" /></a></div>
    </div>
</div>
<script language="javascript">
    $(document).ready(function () {
        $(window).scroll(function () {
            var offsetTop = $(window).scrollTop() + "px";
            $(".linkfloat").animate({ top: offsetTop }, { duration: 600, queue: false });
        });
    });
</script>
</body>
</html>