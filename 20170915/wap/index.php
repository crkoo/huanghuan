<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/10/24
 * Time: 21:14
 */
define('DTW', true);
require_once dirname(__FILE__).'/../backend/include/init.php';
$list = $db->getLineAll("select id,title,litpic from dbl_activity where status=1 ORDER by ord desc, id ASC ");
?>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>优惠活动办理大厅</title>
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
        <a href="search.php" class="searchBtn img"><img src="images/search.png" /></a>
    </div>
    <div class="notice">
        <div class="noticeInner bd">
            <ul class="infoList">
            </ul>
        </div>
    </div>
    <div class="notice2">
        <p class="tc">请选择对应的活动类别申请，提交申请后专员将在2个小时内审核办理，提交申请后可以点击审核进度查询！</p>
    </div>
    <div class="itemList clearfix">
        <ul class="clearfix">
            <?php
            if (!empty($list)) {
                $i = 1;
                $count = count($list);
                foreach ($list as $item){
            ?>
            <li>
                <a href="activity.php?id=<?=$item['id']?>"><img src="../<?=$item['litpic']?>"><p><?=$item['title']?></p></a>
            </li>
            <?php
                    if ($i%2==0 && $i < $count){
            ?>
            </ul><ul class="clearfix">
            <?php
                    }
                    $i++;
                }
            }
            ?>
        </ul>
    </div>
    <p>&nbsp;</p>
</div>
<script src="../js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../js/jquery.SuperSlide.2.1.1.js"></script>
<script src="js/common.js"></script>
</body>
</html>