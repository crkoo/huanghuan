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
    <title>用户管理</title>
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
            <div class="boxHead"><span>用户管理</span></div>
            <div class="boxBody">
                <div class="search_form">
                    <input type="button" onClick="location.href='index.php?m=ucenter&a=edit';" value="添加管理员">
                </div>
                <div class="list_box">
                <table width="100%;" class="tablestyle">
                    <tr class="tc back">
                        <th>账号</th>
                        <th>登录次数</th>
						<th>状态</th>
                        <th>操作</th>
                    </tr>
                    <?php
                    if (!empty($list)){
                     foreach ($list as $k=>$v){
                    ?>
                    <tr data-id="<?=$v['id']?>">
                        <td><?=$v['admin_name']?></td>
						<td><?=$v['admin_number']?></td>
						<td><img id="status_<?=$v['id']?>" src="<?=SKINS?>images/status_<?=$v['admin_status']?>.gif" /></td>
                        <td>
                            <a href="index.php?m=ucenter&a=edit&id=<?=$v['id']?>">修改</a>
                            &nbsp;&nbsp;
                            <?php
                            if ($v['admin_status'] == 1) {
                            ?>
                            <a href="javascript:;" onclick="status(0, <?=$v['id']?>)">禁用</a>
                            <?php
                            }else{
                            ?>
                            <a href="javascript:;" onclick="status(1, <?=$v['id']?>)">启用</a>
                            <?php
                            }
                            ?>
                        </td>
                    </tr>
                    <?php
                     }
                    }else{
                    ?>
                    <tr>
                        <td class="tc f12" colspan="4" style="padding: 10px 0;">系统暂无注册会员！</td>
                    </tr>
                    <?php
                    }
                    ?>
                </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?=SKINS?>js/admin_common.js"></script>
</body>
</html>