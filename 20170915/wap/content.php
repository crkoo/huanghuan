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
$data = $db->getLine("select id,title,content from dbl_activity where status=1 and id=".$id);
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
    <div class="content">
        <div class="activity-content">
            <div class="activity-title clearfix">
                <span><?=$data['title']?></span>
                <a href="index.php">返回首页</a>
            </div>
            <div class="activity-info">
                <?=htmlspecialchars_decode($data['content'])?>
            </div>
        </div>
    </div>
    <p>&nbsp;</p>
</div>
<script src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../js/jquery.SuperSlide.2.1.1.js"></script>
<script src="js/common.js"></script>
</body>
</html>