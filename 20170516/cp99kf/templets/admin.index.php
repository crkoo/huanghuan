<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:23
 */
$server_info = array(
    'CMS版本'=> 'ado-phper v2.0',
    '操作系统'=>PHP_OS,
    '运行环境'=>$_SERVER["SERVER_SOFTWARE"],
    'PHP运行方式'=>php_sapi_name(),
    '最大上传限制'=>ini_get('upload_max_filesize'),
    '最大执行时间'=>ini_get('max_execution_time').'秒',
    '服务器时间'=>date("Y年n月j日 H:i:s"),
    //'北京时间'=>gmdate("Y年n月j日 H:i:s",time()+8*3600),
    '服务器域名/IP'=>$_SERVER['SERVER_NAME'].' ['.gethostbyname($_SERVER['SERVER_NAME']).']',
    '剩余空间'=>round((@disk_free_space(".")/(1024*1024)),2).'M',
);
?>
<html>
<head>
<title>管理中心</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<link href="<?=SKINS?>css/admin.css" rel="stylesheet">
<script src="<?=SKINS?>js/jquery-1.11.3.min.js"></script>
</head>

<body>
<?=tpl('admin.header.php')?>
<div class="content clearfix">
    <?=tpl('admin.left.php', $m, $a)?>
    <div class="right fl">
        <div class="box">
            <div class="boxHead"><span>系统环境信息</span></div>
            <div class="boxBody">
                <ul class="right_index">
                    <?php
                    foreach ($server_info as $k=>$v){
                    ?>
                    <li><span><?=$k?>:</span><?=$v?></li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
    </div>
</div>
<script src="<?=SKINS?>js/admin_common.js"></script>
</body>
</html>
