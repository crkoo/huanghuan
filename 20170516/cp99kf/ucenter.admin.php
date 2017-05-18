<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 下午3:18
 */
if ($a == 'index'){
    $list = $db->getLineAll("select * from cp99_admin");
}elseif ($a == 'edit'){
    if (!empty($_POST)){
        $id = isset($_POST['id']) ? intval($_POST['id']) : null;
        $username = isset($_POST['username']) ? $_POST['username'] : null;
        $pwd = isset($_POST['pwd']) ? $_POST['pwd'] : null;
        $sure_pwd = isset($_POST['sure_pwd']) ? $_POST['sure_pwd'] : null;
        if (empty($id)){
            if (empty($username)){
                ShowMsg('用户名不能为空', -1);
                exit;
            }
            if (empty($pwd) || empty($sure_pwd)){
                ShowMsg("请确认密码是否输入", -1);
                exit;
            }
            if (md5($pwd) != md5($sure_pwd)){
                ShowMsg('两次输入的密码不一致', -1);
                exit;
            }
            $db->insert('cp99_admin', array('admin_name' => $username, 'admin_password' => md5($pwd), 'admin_number' => 0, 'admin_status' => 1));
            ShowMsg("添加成功", 'index.php?m=ucenter&a=index');
        }else{
            $find = $db->getLine("select * from cp99_admin where id=".$id);
            if (empty($find)){
                ShowMsg('用户数据不存在', -1);
                exit;
            }
            if (!empty($pwd) && md5($pwd) != md5($sure_pwd)){
                ShowMsg('两次输入的密码不一致', -1);
                exit;
            }
            $db->update('cp99_admin', $find['id'], "`admin_password`='".md5($pwd)."'");
            ShowMsg("修改成功", 'index.php?m=ucenter&a=index');
            exit;
        }
    }
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!empty($id)){
        $data = $db->getLine("select * from cp99_admin where id=".$id);
    }else{
        $data = array(
            'id' => null
        );
    }
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
}elseif ($a == 'status'){
    $id = isset($_POST['id']) ? intval($_POST['id']) : null;
    $status = isset($_POST['status']) ? intval($_POST['status']) : null;
    if (is_null($id) || is_null($status)){
        outputJson(1, '参数传递错误.');
    }
    $user = $db->getLine("select id from cp99_admin where id=$id");
    if(empty($user)){
        outputJson(1, '数据不存在');
    }
    $db->update('cp99_admin', $id, "`admin_status`=".$status);
    outputJson(0, 'ok');
}else{
    header('HTTP/1.1 404 Not Found', true, 404);
}
include('templets/admin.ucenter.'.$a.'.php');
$db->close();