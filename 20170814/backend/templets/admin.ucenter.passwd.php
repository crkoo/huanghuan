<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:46
 */
?>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>密码修改</title>
    <link href="<?=SKINS?>css/admin.css" rel="stylesheet" type="text/css" />
    <script src="<?=SKINS?>js/jquery-1.11.3.min.js"></script>
    <script>var SKINS = '<?=SKINS?>';</script>
</head>
<body>
<?=tpl('admin.header.php')?>
<div class="content clearfix">
    <?=tpl('admin.left.php', $m, $a)?>
    <div class="right fl">
        <div class="box">
            <div class="boxHead"><span>密码修改</span></div>
            <div class="boxBody">
                <div class="table_box">
                    <form action="index.php?m=ucenter&a=passwd" method="post" enctype="multipart/form-data">
                    <table width="100%;" class="tablestyle">
                        <tr>
                            <th width="120" class="tr">旧密码：</th>
                            <td><input type="password" name="oldpwd" class="text w300" required="true" data-msg="请输入原密码" /></td>
                        </tr>
                        <tr>
                            <th width="120" class="tr">新密码：</th>
                            <td><input type="password" name="newpwd" class="text w300" required="true" data-msg="请输入新密码" /></td>
                        </tr>
                        <tr>
                            <th width="120" class="tr">重新新密码：</th>
                            <td><input type="password" name="repwd" class="text w300" required="true" data-msg="请重复输入新密码" /></td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <td><input type="submit" class="btn" id="submit" name="submit" value="保 存" ></td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?=SKINS?>js/admin_common.js"></script>
</body>
</html>