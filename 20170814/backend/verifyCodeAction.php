<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/19
 * Time: 11:52
 */
define('DTW', true);
require_once dirname(__FILE__).'/include/init.php';
include_once dirname(__FILE__).'/include/validateCode.class.php';
$_vc = new ValidateCode();  //实例化一个对象
$_vc->doimg();
$_SESSION['cfCode_session'] = md5($_vc->getCode());//验证码保存到SESSION中