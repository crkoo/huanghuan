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
<title>活动列表</title>
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
            <div class="boxHead"><span>活动列表</span></div>
            <div class="boxBody">
                <div class="table_box">
                    <div class="search_form">
                        <form action="index.php" method="get" enctype="multipart/form-data" name="form1" id="form1">
							<input type="hidden" name="m" value="activity">
							<input type="hidden" name="a" value="index">
                            关键词：<input type="text" name="keywords" class="text" value="<?=$keywords?>">
                            <input type="submit" value="搜 索">
                            <input type="button" value="添 加" onclick="location.href='index.php?m=activity&a=modify';">
                        </form>
                    </div>
                    <div class="list_box">
                        <form action="index.php?m=activity&a=order" method="post" name="form" id="form">
                            <table width="100%;" class="tablestyle">
                                <tr class="tc back">
                                    <th class="tc" width="50">ID</th>
                                    <th class="tc" width="200">标题</th>
                                    <th class="tc" width="100">图片</th>
                                    <th class="tc" width="80">排序</th>
                                    <th class="tc" width="40">状态</th>
                                    <th class="tc" width="80">操作</th>
                                </tr>
                                <?php
                                if (!empty($list)){
                                    foreach ($list as $k=>$v){
                                        ?>
                                        <tr class="tc">
                                            <td><?=$v['id']?></td>
                                            <td><?=$v['title']?></td>
                                            <td>
                                                <?php
                                                if ($v['litpic']){
                                                ?>
                                                <img src="<?='../'.$v['litpic']?>" style="max-width: 40px; max-height: 40px;" />
                                                <?php } ?>
                                            </td>
                                            <td><input type="text" size="2" class="tc" name="orders[<?=$v['id']?>]" value="<?=$v['ord']?>" onkeyup="this.value=this.value.replace(/\D+/g,'');" maxlength="5" /> </td>
                                            <td>
                                                <img src="<?=SKINS?>images/status_<?=$v['status']?>.gif" id="status_<?=$v['id']?>" onclick="status(<?=$v['status']?>,<?=$v['id']?>, 'activity');" style="cursor: pointer;" />
                                            </td>
                                            <td>
                                                <a href="index.php?m=activity&a=modify&id=<?=$v['id']?>">编辑</a>
												<a href="index.php?m=activity&a=del&id=<?=$v['id']?>">删除</a>
                                            </td>
                                       </tr>
                                    <?php
                                    }
                                }else{
                                    ?>
                                    <tr>
                                        <td class="tc f12" colspan="6" style="padding: 10px 0;">系统暂无日志记录！</td>
                                    </tr>
                                <?php
                                }
                                ?>
                            </table>
                            <?php
                            if ($total){
                            ?>
                            <div class="page clearfix">
                                <input type="submit" name="order" value="批量更新">
                                <?=$pageShow?>
                            </div>
                            <?php
                            }
                            ?>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?=SKINS?>js/admin_common.js"></script>
</body>
</html>