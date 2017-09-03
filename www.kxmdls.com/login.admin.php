<?php
if(isset($_POST['username']) && $_POST['username'])
{
    $username = addslashes(trim($_POST['username']));
    $password = md5('DTW'.addslashes($_POST['password']));/*读图网默认密码123456*/
    if($username == 'admin' && $password == 'c8718458e4bc611899a8fa09b8b67c4a')
    {
        $_SESSION['userid'] = rand(10000,99999);
        $_SESSION['uid'] = rand(10000,99999);
        $_SESSION['nick'] = $username;
        redirect('index.php?m=index');
    }else{
        echo '<script>alert(\'用户或密码错误！\');</script>';
    }
}
include('templets/login.php');
