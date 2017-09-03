<?php
/**
 * Created by phpStorm.
 * User: Administrator
 * Date: 2015/3/27
 * Time: 0:36
 */
?>
<!DOCTYpE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta content="IE=11.0000" http-equiv="X-UA-Compatible">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <TITLE><?php echo $setting['title']; ?></TITLE>
    <LINK href="images/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="main1">
    <div class="cont">
        <p><span class="red">QQ群：</span><?php echo $setting['qq']; ?> <a target="_blank" href="<?php echo $setting['qq_link']; ?>" class="yellow">点击加入</A>&nbsp;<span style="font-size: 18px;">&nbsp;（注验证码<span class="yellow"><?php echo $setting['verify']; ?></span>否则不加）</span> </p>
    </div>
</div>
<div class="boxm">
    <div class="m1">
        <p><span class="red">QQ群：</span> <?php echo $setting['qq']; ?> <a target="_blank" href="<?php echo $setting['qq_link']; ?>" class="yellow">点击加入</A><span style="font-size: 18px;">&nbsp;&nbsp;（注验证码<span class="yellow"><?php echo $setting['verify']; ?></span>否则不加）</span></p>
    </div>
    <div class="list clearfix">
        <ul class="clearfix">
            <li>
                <p><img src="<?php echo $setting['litpic1']; ?>" width="412" height="93" align="<?php echo $setting['title1']; ?>" /></p>
                <p>
                    <b><?php echo $setting['title1']; ?></b>
                    <a href="<?php echo $setting['url1']; ?>" target="_blank"><?php echo $setting['url1']; ?></a>
                </p>
            </li>
            <li class="last">
                <p><img src="<?php echo $setting['litpic2']; ?>" width="412" height="93" align="<?php echo $setting['title2']; ?>" /></p>
                <p>
                    <b><?php echo $setting['title2']; ?></b>
                    <a href="<?php echo $setting['url2']; ?>" target="_blank"><?php echo $setting['url2']; ?></a>
                </p>
            </li>
            <li>
                <p><img src="<?php echo $setting['litpic3']; ?>" width="412" height="93" align="<?php echo $setting['title3']; ?>" /></p>
                <p>
                    <b><?php echo $setting['title3']; ?></b>
                    <a href="<?php echo $setting['url3']; ?>" target="_blank"><?php echo $setting['url3']; ?></a>
                </p>
            </li>
            <li class="last">
                <p><img src="<?php echo $setting['litpic4']; ?>" width="412" height="93" align="<?php echo $setting['title4']; ?>" /></p>
                <p>
                    <b><?php echo $setting['title4']; ?></b>
                    <a href="<?php echo $setting['url4']; ?>" target="_blank"><?php echo $setting['url4']; ?></a>
                </p>
            </li>
        </ul>
    </div>
</div>
<div class="bot">
    <p><span class="red">QQ群</span> <?php echo $setting['qq']; ?> <a target="_blank" href="<?php echo $setting['qq_link']; ?>" class="yellow">点击加入</A><br /><span style="color: #222; font-size: 16px;"> （注验证码<span class="red"><?php echo $setting['verify']; ?></span>否则不加）</span></p>
</div>
</body>
</html>
