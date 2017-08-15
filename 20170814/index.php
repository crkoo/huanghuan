<?php
define('DTW', true);
require_once dirname(__FILE__).'/backend/include/init.php';
$list = $db->getLineAll("select * from dbl_activity where status=1 ORDER by ord desc, id ASC ")
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit">
    <title>澳门新葡京-优惠活动办理大厅</title>
    <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
    <link type="text/css" rel="stylesheet" href="./css/reset.css"  />
    <link type="text/css" rel="stylesheet" href="./css/style.css"  />
    <script type="text/javascript" src="./js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="./js/jquery.SuperSlide.2.1.1.js"></script>
    <script type="text/javascript" src="./js/jeDate/jedate.min.js"></script>
    <script type="text/javascript" src="./js/joker.js"></script>
    <script type="text/javascript" src="./js/layer.js"></script>
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
    <div class="main-top clearfix">
        <div class="itemlist fl">
            <ul>
                <?php
                if (!empty($list)){
                    foreach ($list as $k => $v){
                        if ($k < 2) {
                ?>
                <li><a href='javascript:;' data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
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
                            <li><a href='javascript:;' data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
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
                        <li><a href='javascript:;' data-id="<?=$v['id']?>" target='_blank'><img src='<?=$v['litpic']?>' width='237' height='118'/><p><?=$v['title']?></p></a></li>
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
    <h2>申请进度查询</h2>
    <h3></h3>
    <div class="con1">
        <p><span>请输入会员帐号：</span><input type="text" id="query_user" name="query_option" value="" placeholder="填写你的会员账号"  ></p>
        <p><span>选择查询项目：</span>
        <select id="query_option" name="query_option">
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