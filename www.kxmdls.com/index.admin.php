<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:52
 */

if (!isset($_SESSION['userid']) || !$_SESSION['userid'] || !$_SESSION['nick']){
    echo '<script>alert("请登录！");top.location.href="index.php?m=login";</script>';
    exit();
}
$tpl = isset($_GET['tpl']) ? $_GET['tpl'] : "";
$a = isset($_GET['a']) ? $_GET['a'] : "";
if ($tpl){
    include('templets/admin.'.$tpl.'.php');
    exit;
}
if ($a == 'out'){
    unset($_SESSION['userid']);
    unset($_SESSION['uid']);
    unset($_SESSION['nick']);
    session_destroy();
    header("Location: index.php?m=login");
}
include('templets/admin.setting.base.php');