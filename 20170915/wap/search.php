<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/10/24
 * Time: 21:14
 */
define('DTW', true);
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
require_once dirname(__FILE__).'/../backend/include/init.php';
$list = $db->getLineAll("select id,title from dbl_activity where status=1 ORDER by ord desc, id ASC ");
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
    <link rel="stylesheet" href="css/bootstrap.modal.css">
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
    <div class="content query">
        <div class="applytitle img"><img src="images/checktitle.png" /></div>
        <div class="activity-content search">
            <div class="con1">
                <p><input type="text" id="query_user" name="query_option" value="" placeholder="填写会员账号"  ></p>
                <p><select id="query_option" name="query_option">
                        <option value="">项目名称</option>
                        <?php
                        if (!empty($list)){
                            foreach ($list as $item) {
                        ?>
                        <option value="<?=$item['id']?>" <?=!empty($id)&&$id==$item['id']?'selected':''?>><?=$item['title']?></option>
                        <?php
                            }
                        }
                        ?>
                    </select></p>
                <div class="appylybtn img">
                    <img src="images/subbtn.png"  class="subbtn checksub"/>
                </div>
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
                <div class="appylybtn img">
                    <a href="index.php" class="backbtn"><img src="images/backbtn.png"/></a>
                </div>
            </div>
        </div>
    </div>
    <p>&nbsp;</p>
</div>
<div class="modal fade" tabindex="-1" role="dialog" id="reply">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">回复内容</h4>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</div>
<script src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../js/jquery.SuperSlide.2.1.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/common.js"></script>
</body>
</html>