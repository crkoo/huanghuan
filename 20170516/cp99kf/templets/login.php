<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:22
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="<?=SKINS?>css/login.css"/>
    <title>后台登录</title>
</head>

<body class="login">
<div class="wrapper">
    <div class="loginform">
        <h3>登录</h3>
        <div class="logins">
            <form action="index.php?m=login" method="post" enctype="application/x-www-form-urlencoded">
                <ul>
                    <li><span>姓名：</span><input type="text" name="username" class="login_box" /></li>
                    <li><span>密码：</span><input type="password" name="password" class="login_box" /></li>
                    <li>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; </span>
                        <input type="submit" class="btn" value="登 录" />
                    </li>
                </ul>
            </form>
        </div>
    </div>
</div>
</body>
</html>