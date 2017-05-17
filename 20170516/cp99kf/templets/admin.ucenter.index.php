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
<link href="<?=SITE_URL?>images/skin.css" rel="stylesheet" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
body {margin: 0;background-color: #EEF2FB;}
</style>
<script type="text/javascript" src="<?=SITE_URL?>js/jquery-1.5.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="<?=SITE_URL?>js/calendar/calendar-blue.css"/>
<script type="text/javascript" src="<?=SITE_URL?>js/calendar/calendar.js"></script>
</head>
<body>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
    <td width="17" valign="top" background="<?=SITE_URL?>images/mail_leftbg.gif">
        <img src="<?=SITE_URL?>images/left-top-right.gif" width="17" height="29" />
    </td>
    <td valign="top" background="<?=SITE_URL?>images/content-bg.gif">
        <table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
            <tr>
                <td height="31"><div class="titlebt">会员管理</div></td>
            </tr>
        </table>
    </td>
    <td width="16" valign="top" background="<?=SITE_URL?>images/mail_rightbg.gif">
        <img src="<?=SITE_URL?>images/nav-right-bg.gif" width="16" height="29" />
    </td>
</tr>
<tr>
<td valign="middle" background="<?=SITE_URL?>images/mail_leftbg.gif">&nbsp;</td>
<td valign="top" bgcolor="#F7F8F9">
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <div class="table_box">
                <div class="search_form">
                <form action="index.php" method="get" enctype="multipart/form-data" name="searchFrm" id="searchFrm">
                    <input type="hidden" name="m" value="ucenter">
                    <input type="hidden" name="a" id="a" value="index">
                    关键词：<input type="text" name="keywords" class="text" value="<?=$keywords?>" size="12" placeholder="昵称">
                    会员状态：<label><input type="radio" name="is_del" value="0" <?=$is_del==0?'checked=checked':''?>>正常</label>
                    <label><input type="radio" name="is_del" value="1" <?=$is_del==1?'checked=checked':''?>>禁用</label>
                    关注时间：
                    <input type="text" name="time_start" id="time_start" class="date text" size="8" value="<?=$time_start?>">
                    <script language="javascript" type="text/javascript">
                        Calendar.setup({
                            inputField     :    "time_start",
                            ifFormat       :    "%Y-%m-%d",
                            showsTime      :    'true',
                            timeFormat     :    "24"
                        });
                    </script>
                    -
                    <input type="text" name="time_end" id="time_end" class="date text" size="8" value="<?=$time_end?>">
                    <script language="javascript" type="text/javascript">
                        Calendar.setup({
                            inputField     :    "time_end",
                            ifFormat       :    "%Y-%m-%d",
                            showsTime      :    'true',
                            timeFormat     :    "24"
                        });
                    </script>
                    <input type="submit" onclick="document.getElementById('a').value='index';" value="搜 索">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" id="sync" value="同步微信会员" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" id="export" value="导出Excel" onclick="document.getElementById('a').value='export';">
                </form>
                </div>
                <div class="list_box">
                <table width="100%;" class="tablestyle">
                    <tr class="tc back">
                        <th>昵称</th>
                        <th>头像</th>
                        <!--<th>姓名</th>
                        <th>手机</th>
                        <th>生日</th>-->
                        <th>性别</th>
                        <!--<th>地址</th>-->
                        <th>省份/城市</th>
                        <th>关注时间</th>
                        <!--<th>当前积分</th>
                        <th>绑定</th>-->
						<th>购买金额</th>
						<th>成交单数</th>
                        <th>操作</th>
                    </tr>
                    <?php
                    if (!empty($list)){
                     foreach ($list as $k=>$v){
                    ?>
                    <tr class="tc" data-openid="<?=$v['openid']?>">
                        <td><?=urldecode($v['nickname'])?></td>
                        <td><img src="<?=$v['headimgurl']?$v['headimgurl']:SITE_URL.'skins/images/default.png'?>" style="max-width: 60px; max-height: 60px;" /></td>
                        <!--<td><?=$v['username']?></td>
                        <td><?=$v['mobile']?></td>
                        <td><?=$v['birthday']?></td>-->
                        <td><?=getSex($v['sex'])?></td>
                        <!--<td><?=$v['address']?></td>-->
                        <td><?=$v['province']?>/<?=$v['city']?></td>
                        <td><?=date('Y-m-d H:i:s', $v['subscribe_time'])?></td>
                        <!--<td><?=$v['integral']?></td>
                        <td><?=$v['is_bind'] ? '&radic;' : '&times;'?></td>-->
						<td><?=$v['order_success_total']?></td>
						<td><?=$v['order_success_number']?></td>
                        <td>
                            <a href="index.php?m=goods&a=orderlist&openid=<?=$v['openid']?>">订单</a>
                            <?php
                            if ($v['is_del'] == 0) {
                            ?>
                            <a href="index.php?m=ucenter&a=status_member&id=<?=$v['id']?>" class="status_btn">禁用</a>
                            <?php
                            }else{
                            ?>
                            <a href="index.php?m=ucenter&a=status_member&id=<?=$v['id']?>" class="status_btn">启用</a>
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
                        <td class="tc f12" colspan="8" style="padding: 10px 0;">系统暂无注册会员！</td>
                    </tr>
                    <?php
                    }
                    ?>
                </table>
                    <div class="page"><?=$pageShow?></div>
                </div>
            </div>
        </td>
    </tr>
</table>
</td>
<td background="<?=SITE_URL?>images/mail_rightbg.gif">&nbsp;</td>
</tr>
<tr>
    <td valign="bottom" background="<?=SITE_URL?>images/mail_leftbg.gif">
        <img src="<?=SITE_URL?>images/buttom_left2.gif" width="17" height="17" />
    </td>
    <td background="<?=SITE_URL?>images/buttom_bgs.gif">
        <img src="<?=SITE_URL?>images/buttom_bgs.gif" width="17" height="17">
    </td>
    <td valign="bottom" background="<?=SITE_URL?>images/mail_rightbg.gif">
        <img src="<?=SITE_URL?>images/buttom_right2.gif" width="16" height="17" />
    </td>
</tr>
</table>
<script src="<?=SITE_URL?>js/common.js"></script>
<script>
    $(function(){
       $(".integral_oper").click(function(){
           if ($(this).hasClass('edit_icon')){
               $(this).removeClass('edit_icon');
               $(this).addClass('ok_icon');
               $(this).prev('span').html('<input type="text" size="6" class="tc" value="'+$(this).parent().attr('data-integral')+'"/> ');
               var obj = $(this).prev().find('input')[0];
               setFocus(obj);
           }else if ($(this).hasClass('ok_icon')){
               var integral = $(this).prev().find('input').val();
               if (integral == '' || integral == $(this).parent().attr('data-integral')){
                   $(this).prev().html($(this).parent().attr('data-integral'));
                   return false;
               }else{
                   $.post('index.php?m=ucenter&a=edit_integral', {id: $(this).parent().attr('data-id'), integral: $(this).prev().find('input').val()},function(json){
                      if (json.errcode > 0){
                          alert(json.errmsg);
                          return false;
                      } else{
                          location.reload();
                      }
                   });
               }
           }
       }) ;
        $("#export").click(function(e){
            $("input[name='a']").attr('export');
        });
        $("#sync").click(function(){
            $.get("index.php?m=ucenter&a=sync",function(response){
                if (response.errmsg == 'ok'){
                    location.reload();
                }else{
                    alert(response.errmsg);
                }
                return false;
            },'json');
        });
    });
</script>
</body>
</html>