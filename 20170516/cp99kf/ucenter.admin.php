<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 下午3:18
 */
if ($a == 'index'){

}elseif ($a == 'passwd'){
    if ($_POST){
        $mid = $_SESSION['uid'];
        $pwd = md5(addslashes($_POST['oldpwd']));
        $newpwd = md5(addslashes($_POST['newpwd']));
        $repwd = md5(addslashes($_POST['repwd']));
        if ($newpwd != $repwd){
            ShowMsg('输入的新密码不致，请重新输入！',-1);
            exit();
        }
        $find = $db->getLine("SELECT admin_password FROM `cp99_admin` WHERE id={$mid} ");
        if (!$find){
            unset($_SESSION['uid']);
            unset($_SESSION['nick']);
            ShowMsg('登录超时，请重新登录！',-1);
            exit();
        }
        if($find['admin_password']!=$pwd){
            ShowMsg('旧密码错误!',-1);
            exit();
        }
        $result = $db->query("UPDATE `cp99_admin` SET `admin_password`='{$newpwd}' WHERE id={$mid}");
        if ($result){
            ShowMsg('修改密码成功!',-1);
            exit();
        }else{
            ShowMsg('修改密码失败!',-1);
            exit();
        }
    }
}else{
    header('HTTP/1.1 404 Not Found', true, 404);
}
include('templets/admin.ucenter.'.$a.'.php');
$db->close();