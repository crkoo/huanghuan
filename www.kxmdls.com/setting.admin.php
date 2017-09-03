<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 下午3:18
 */
if ($a == 'base') {
    if (isset($_POST) && $_POST){
        $check_file=array(
            'setting.php',
        );
        foreach ($check_file as $file){
            //检测文件是否可写
            if (!is_writeable($file)) {
                $this->error('配置文件'.$file.'不可写。如果您使用的是Unix/Linux主机，请修改该文件的权限为777。如果您使用的是Windows主机，请将此文件设为everyone可写！');
                exit();
            }
        }
        unset($_POST['submit']);
        $config_old = require './setting.php';
        $config = $_POST;
        if(is_array($config) && is_array($config_old)){
            $config_new = array_merge($config_old,$config);
        }
        if(is_array($config_new)){
            arr2file('./setting.php',$config_new);
        }
        $setting = require './setting.php';
        $setting = strclean($setting);
    }
}
include('templets/admin.setting.'.$a.'.php');