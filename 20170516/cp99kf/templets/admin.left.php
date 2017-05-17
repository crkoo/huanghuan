<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:46
 */
?>
<div class="left fl">
    <h1 class="type"><a href="javascript:void(0)">摄影管理</a></h1>
    <div class="menu" style="display: block;">
        <ul data-m="<?=$m?>" data-action="<?=$a?>">
            <li><a href="index.php?m=apply&a=index" class="<?=($m=='apply'&&$a=='index') ? 'on' : ''?>">申请列表</a></li>
            <li><a href="index.php?m=ucenter&a=index" class="<?=($m=='ucenter'&&$a=='index') ? 'on' : ''?>">管理员列表</a></li>
            <li><a href="index.php?m=ucenter&a=passwd" class="<?=($m=='ucenter'&&$a=='passwd') ? 'on' : ''?>">密码修改</a></li>
        </ul>
    </div>
</div><!-- //left -->
<script>
$(function(){
    $("h1.type").click(function(e){
       if ($(this).next(".menu").is(":visible")) {
           return false;
       }
        $(".menu").hide();
        $(this).next(".menu").slideDown();
    });
});
</script>