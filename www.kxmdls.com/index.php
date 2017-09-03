<?php
header("P3P: CP=CAO PSA OUR");
header("Content-Type: text/html; charset=utf-8");
session_start();
date_default_timezone_set('Asia/Chongqing');
define('adophper', 'wx1.0');
//error_reporting(0);
$setting = include_once 'setting.php';
include_once './func.php';
$setting = strclean($setting);
$m = isset($_GET['m']) ? $_GET['m'] : "";
$a = isset($_GET['a']) ? $_GET['a'] : "";
if(!$m)
{
    $m = 'home';
}
else
{
    $m = str_replace('/', '', $m);
    $m = str_replace("\\", '', $m);
}
if(file_exists('./' . $m . '.admin.php'))
{
	include './' . $m . '.admin.php';
}elseif(file_exists('./templets/' . $m . '.php')){
    include './templets/' . $m . '.php';
}
else
{
	header('HTTP/1.1 404 Not Found', true, 404);
}