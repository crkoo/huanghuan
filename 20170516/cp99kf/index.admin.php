<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:52
 */

$tpl = isset($_GET['tpl']) ? $_GET['tpl'] : "";
$a = isset($_GET['a']) ? $_GET['a'] : "";
if ($tpl){
    include('templets/admin.'.$tpl.'.php');
    exit;
}
if ($a == 'out'){
    unset($_SESSION['nick']);
    session_destroy();
    header("Location: home.php?m=login");
}
include('templets/admin.index.php');