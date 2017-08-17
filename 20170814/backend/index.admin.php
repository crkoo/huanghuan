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
    header("Location: index.php?m=login");
}else if ($a == 'create') {
    $SCRIPT_NAME = $_SERVER['SCRIPT_NAME'];
    $PATH = str_replace('/index.php', '', $SCRIPT_NAME);
    //首页更新
    $in = $site_url.$PATH.'/html.php';
    $out = dirname(__FILE__).'/../index.html';
    generateHtml($in, $out);
    //详情页更新
    $list = $db->getLineAll("select id from dbl_activity where status=1");
    if (!empty($list)){
        foreach ($list as $k => $v){
            $in = $site_url.$PATH.'/active.php?activeId='.$v['id'];
            $out = dirname(__FILE__).'/../active/active'.$v['id'].'.html';
            generateHtml($in, $out);
        }
    }
    ShowMsg("生成成功", -1);
    exit;
}
include('templets/admin.index.php');