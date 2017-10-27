<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/10/24
 * Time: 21:14
 */
define('DTW', true);
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if (empty($id)) {
    header("Location: index.php");
    exit;
}
require_once dirname(__FILE__).'/../backend/include/init.php';
$data = $db->getLine("select id,title,form_title,form_title2 from dbl_activity where status=1 and id=".$id);
if (empty($data) ){
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title><?=$data['title']?> - 优惠活动办理大厅</title>
    <meta name="description" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
<div class="body-wrap">
    <header class="header">
        <h1 class="logo img"><img src="images/logo.png" /></h1>
    </header>
    <div class="banner">
        <div class="img"><img src="images/banner.jpg" /></div>
        <a href="search.php?id=<?=$id?>" class="searchBtn img"><img src="images/search.png" /></a>
    </div>
    <div class="notice">
        <div class="noticeInner bd">
            <ul class="infoList">
            </ul>
        </div>
    </div>
    <div class="content tccon">
        <div class="applytitle img"><img src="images/applytitle.png" /></div>
        <div class="con3">
            <div class="active_name clearfix">
                <div class="apply_show">
                    <span class="activeName"><?=$data['title']?></span>
                    <a href="content.php?id=<?=$id?>" id="activeContent" class="active_content">活动详情</a>
                </div>
            </div>
            <form action="../api.php?action=apply" name="doform" id="doform" method="POST">
                <input type="hidden" name="activeId" id="activeId" value="<?=$id?>" />
                <p><input type="text" placeholder="会员帐号" id="4_str1" name="str1"></p>
                <?php
                if (!empty($data['form_title'])) {
                ?>
                <p><input type="text" placeholder="<?=$data['form_title']?>" id="4_str2" name="str2"></p>
                <?php
                }
                if (!empty($data['form_title2'])) {
                ?>
                <p><input type="text" placeholder="<?=$data['form_title2']?>" id="4_str3" name="str3"></p>
                <?php
                }
                ?>
                <p class="apply_content" style="display: none;"><textarea type="text" placeholder="填写申请内容" id="4_int_1" name="int_1"></textarea></p>
                <div class="appylybtn img">
                    <img src="images/applybtn.png" onclick="subForm();" />
                </div>
            </form>
        </div>
    </div>
    <p>&nbsp;</p>
</div>
<script src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../js/jquery.SuperSlide.2.1.1.js"></script>
<script src="js/common.js"></script>
</body>
</html>