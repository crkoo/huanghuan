<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-9-10
 * Time: 下午8:07
 */
$username = isset($_SESSION['nick']) ? $_SESSION['nick'] : "admin";
?>
<script>
function logout(){
    if (confirm("您确定要退出控制面板吗？"))
        top.location = "index.php?m=index&a=out";
    return false;
}
</script>
<div class="header clearfix">
    <h1 class="logo">后台管理简易系统</h1>
    <div class="loginInfo">
        <span>用户：<b><?=$username?></b> 您好,感谢登陆使用！</span>
        <a href="index.php?m=index&a=create" class="create">生成首页Html</a>
        <a href="javascript:;" class="logout" target="_self" onclick="logout();">退出</a>
    </div>
</div>