<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 16:35
 */
?>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>申请列表</title>
    <link href="<?=SKINS?>css/admin.css" rel="stylesheet" type="text/css" />
    <link href="<?=SKINS?>js/calendar/calendar-blue.css" rel="stylesheet" type="text/css" />
    <script src="<?=SKINS?>js/jquery-1.11.3.min.js"></script>
    <script>var SKINS = '<?=SKINS?>';</script>
    <script src="<?=SKINS?>js/calendar/calendar.js"></script>
</head>
<body>
<?=tpl('admin.header.php')?>
<div class="content clearfix">
    <?=tpl('admin.left.php', $m, $a)?>
    <div class="right fl">
        <div class="box">
            <div class="boxHead"><span>申请列表</span></div>
            <div class="boxBody">
                <div class="search_form">
                    <form action="index.php" method="get" enctype="multipart/form-data">
                        <input type="hidden" name="m" value="apply">
                        <input type="hidden" name="a" id="a" value="index">
                        关键词：<input type="text" name="keywords" class="text" value="<?=$keywords?>">
                        项目：
                        <select name="activeId">
                            <option value="">请选择</option>
                            <option value="4">修改会员登入密码</option>
                            <option value="8">会员账号解冻</option>
                            <option value="6">忘记会员账号</option>
                            <option value="9">修改真实姓名</option>
                            <option value="12">修改银行账号</option>
                            <option value="7">修改银行地址</option>
                            <option value="5">修改银行名称</option>
                            <option value="13">修改会员取款密码</option>
                        </select>
                        状态：
                        <select name="status">
                            <option value="">全部</option>
                            <option value="0">等待审核</option>
                            <option value="1">已通过</option>
                            <option value="2">已拒绝</option>
                        </select>
                        时间：
                        <input type="text" name="time_start" id="time_start" class="date text" size="12" value="<?=$time_start?>">
                        <script language="javascript" type="text/javascript">
                            Calendar.setup({
                                inputField     :    "time_start",
                                ifFormat       :    "%Y-%m-%d",
                                showsTime      :    'true',
                                timeFormat     :    "24"
                            });
                        </script>
                        -
                        <input type="text" name="time_end" id="time_end" class="date text" size="12" value="<?=$time_end?>">
                        <script language="javascript" type="text/javascript">
                            Calendar.setup({
                                inputField     :    "time_end",
                                ifFormat       :    "%Y-%m-%d",
                                showsTime      :    'true',
                                timeFormat     :    "24"
                            });
                        </script>
                        <input type="submit" value="搜 索">
                        <input type="button" onClick="location.href='index.php?m=apply&a=modify';" value=" 添 加 ">
                    </form>
                </div>
                <div class="list_box">
                    <form action="index.php?m=apply&a=delAll" method="post" name="form" id="form">
                        <table width="100%" class="tablestyle">
                            <tr class="tl back">
                                <th>编号</th>
                                <th>会员账号</th>
                                <th>修改项目</th>
                                <th>审核状态</th>
                                <th>申请时间</th>
                                <th>回复状态</th>
                                <th>回复时间</th>
                                <th>操作</th>
                            </tr>
                            <?php
                            if (!empty($list)){
                                foreach ($list as $k=>$vo){
                                    ?>
                                    <tr data-id="<?=$vo['id']?>">
                                        <td>
                                            <label>
                                                <input type="checkbox" name="id[]" value="<?=$vo['id']?>" />
                                                <?=$vo['id']?>
                                            </label>
                                        </td>
                                        <td><?=$vo['account']?></td>
                                        <td><?=$vo['activeName']?></td>
                                        <td>
                                            <?php
                                            if ($vo['status'] == 0){
                                                echo '等待审核';
                                            }else if ($vo['status'] == 1){
                                                echo '已成功';
                                            }else if ($vo['status'] == 2){
                                                echo '已拒绝';
                                            }
                                            ?>
                                        </td>
                                        <td><?=date('Y-m-d H:i:s', $vo['addTime'])?></td>
                                        <td><?=$vo['is_reply']==1?'已回复':'未回复'?></td>
                                        <td><?=!empty($vo['updateTime'])?date('Y-m-d H:i:s', $vo['updateTime']):''?></td>
                                        <td>
                                            [<a href="index.php?m=apply&a=modify&id=<?=$vo['id']?>" class="edit">回复</a>]
                                            [<a href="index.php?m=apply&a=del&id=<?=$vo['id']?>" class="disabled">删除</a>]
                                        </td>
                                    </tr>
                                    <?php
                                }
                            }else{
                                ?>
                                <tr>
                                    <td colspan="7" class="tc">无数据</td>
                                </tr>
                                <?php
                            }
                            ?>
                        </table>
                        <?php
                        if ($total){
                        ?>
                            <div class="page clearfix">
                                <label><input type="checkbox" id="checkall" />全选</label>
                                <input type="submit" onclick="return check();" id="delAll" value="删除">
                                &nbsp;&nbsp;&nbsp;&nbsp;
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
<script src="<?=SKINS?>js/admin_common.js"></script>
<script>
    $(function(){
        //删除
        $(".disabled").click(function(e){
            if (!confirm('确认删除?')){return false;}
            e.preventDefault();
            $.get($(this).attr('href'),function(data){
                //
                if (data.errcode) {
                    alert(data.errmsg);
                    return;
                }
                location.reload();
            },'json');
        });
    });
</script>
</body>
</html>