<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/19
 * Time: 13:46
 */
define('DTW', true);
require_once dirname(__FILE__).'/include/init.php';

$uploaddir = 'uploads/'.date('Ym').'/';
function checkDir($dir){
    if (!is_dir(dirname(__FILE__).'/'.$dir)){
        mkdir((dirname(__FILE__)).'/'.$dir,0777);
    }
}
checkDir($uploaddir);
if (!empty($_FILES['file'])) {
    $fileParts = pathinfo($_FILES['file']['name']);
    $extension = strtolower($fileParts['extension']);
    $uploadfile = $uploaddir . date('YmdHis') . '_' . mt_rand(100, 999) . '.'.$extension;
    if (move_uploaded_file($_FILES['file']['tmp_name'], dirname(__FILE__).'/'.$uploadfile)) {
        echo $uploadfile;
        exit;
    }
}
exit;