<?php
/**
 * Created by PhpStorm.
 * User: adophper
 * Date: 2016/3/31
 * Time: 20:39
 */
if (!defined('DTW'))
{
    die('Hacking attempt');
}
if (__FILE__ == '')
{
    die('Fatal error code: 0');
}
header("Content-type: text/html; charset=utf-8");
session_start();
date_default_timezone_set('Asia/Chongqing');
define('ROOT', str_replace('include/init.php', '', str_replace('\\', '/', __FILE__)));
define('DEVELOPMENT_ENVIRONMENT', false);//调试开关
define('DS', DIRECTORY_SEPARATOR);
define('TPL', ROOT.DS.'templets'.DS);
define('LIB', ROOT.DS.'include'.DS);
/* 初始化设置 */
@ini_set('memory_limit',          '64M');
@ini_set('session.cache_expire',  180);
@ini_set('session.use_trans_sid', 0);
@ini_set('session.use_cookies',   1);
@ini_set('session.auto_start',    0);
if (DEVELOPMENT_ENVIRONMENT == true) {
    error_reporting(E_ALL);
    @ini_set('display_errors','On');
} else {
    error_reporting(0);
    @ini_set('display_errors','Off');
    @ini_set('log_errors','On');
    @ini_set('error_log',ROOT . 'tmp'.DS. 'error.log');
}
if (DS == '\\')
{
    @ini_set('include_path', '.;' . ROOT);
}
else
{
    @ini_set('include_path', '.:' . ROOT);
}
if(isset($_SERVER['PHP_SELF']))
{
    $_SERVER['PHP_SELF'] = htmlspecialchars($_SERVER['PHP_SELF']);
}
//数据库配置信息
define('DB_HOST', 'localhost:3306');//数据库链接地址
define('DB_USER', 'root');//数据库用户名
define('DB_PASS', '123456');//数据库密码
define('DB_NAME', 'cp99');//数据库名称

require(LIB.'func.php');
require(LIB.'db.inc.php');
require(LIB.'MessageCrypt.class.php');
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$site_url = "$protocol$_SERVER[HTTP_HOST]";
define('SITE_URL',$site_url);
$baseUrl = str_replace('\\','/',dirname($_SERVER['SCRIPT_NAME']));
//保证为空时能返回可以使用的正常值
$baseUrl = empty($baseUrl) ? '/' : '/'.trim($baseUrl,'/').'/';
define('SKINS', $baseUrl.'skins/');
//require(LIB.'wxsdk.class.php');
/* 对用户传入的变量进行转义操作。*/
if (!get_magic_quotes_gpc())
{
    if (!empty($_GET))
    {
        $_GET  = addslashes_deep($_GET);
    }
    if (!empty($_POST))
    {
        $_POST = addslashes_deep($_POST);
    }
    $_COOKIE   = addslashes_deep($_COOKIE);
    $_REQUEST  = addslashes_deep($_REQUEST);
}
$m = isset($_GET['m']) ? $_GET['m'] : "";
$a = isset($_GET['a']) ? $_GET['a'] : "";
/* 初始化数据库类 */
$db = new DbMysql(DB_HOST, DB_USER, DB_PASS, DB_NAME);
//密钥
$encodingKey = 'b966812f40caa3d88fb2888f319da84a'; //256 bit
$encryptMode = MessageCrypt::ENCRYPT_MODE_AES;
$pc = new MessageCrypt($encodingKey);

$setting = array(
    'site_name' => 'cp99.com',
    'site_url' => $site_url
);