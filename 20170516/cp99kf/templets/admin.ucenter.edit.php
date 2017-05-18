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
    <title>用户编辑</title>
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
            <div class="boxHead"><span>用户编辑</span></div>
            <div class="boxBody">
                <div class="table_box">
                    <form action="index.php?m=ucenter&a=edit" method="post" enctype="application/x-www-form-urlencoded">
                        <input type="hidden" name="id" value="<?=$data['id']?>">
                    <table width="100%;" class="tablestyle">
                        <tr>
                            <th width="120" class="tr">用户名：</th>
                            <td><input type="text" name="username" class="text w300" required="true" data-msg="请输入原密码" value="<?=$data['admin_name']?>" <?=empty($data['id'])?'':'disabled style="background-color: #EBEBE4;"'?> /></td>
                        </tr>
                        <tr>
                            <th width="120" class="tr">密码：</th>
                            <td><input type="password" name="pwd" class="text w300" <?=!empty($data['id'])?'':'required="true" data-msg="请输入新密码"'?> /></td>
                        </tr>
                        <tr>
                            <th width="120" class="tr">确认密码：</th>
                            <td><input type="password" name="sure_pwd" class="text w300" <?=!empty($data['id'])?'':' required="true" data-msg="请重复输入新密码"'?> /></td>
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