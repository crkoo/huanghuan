<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-1
 * Time: 上午11:46
 */
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<link href="images/skin.css" rel="stylesheet" type="text/css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>基本设置</title>
<style type="text/css">
body {margin: 0;background-color: #EEF2FB;}
</style>
<script src="http://libs.baidu.com/jquery/1.7.2/jquery.min.js"></script>
<link rel="stylesheet" href="js/uploadify/uploadify.css" media="screen"/>
<script type="text/javascript" src="js/uploadify/jquery.uploadify.min.js?_v=<?php echo microtime(true); ?>"></script>
<script>
$(function(){
    $('#file_upload_1').each(function(){
        var $this = $(this);
        var $parentDIV = $(this).parent().parent().parent();
        $this.uploadify({
            swf      : 'js/uploadify/uploadify.swf?_'+Math.random(),
            uploader : 'js/uploadify/uploads.php',
            formData : {
                ASPSESSID:$("#sessionId").val()
            },
            // buttonText: '选择会员卡背景',
            fileSizeLimit: '200KB',//文件大小
            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',
            buttonText: '上 传',
            onUploadSuccess : function(file,data,response)  {
                var jsonData = eval("("+data+")");
                $parentDIV.find("#imgArea").show().find("#img").attr("src",jsonData.fileUrl);
                $parentDIV.find("input[name^=litpic1]").val(jsonData.fileUrl);
            }
        });
    });
    $('#file_upload_2').each(function(){
        var $this = $(this);
        var $parentDIV = $(this).parent().parent().parent();
        $this.uploadify({
            swf      : 'js/uploadify/uploadify.swf?_'+Math.random(),
            uploader : 'js/uploadify/uploads.php',
            formData : {
                ASPSESSID:$("#sessionId").val()
            },
            // buttonText: '选择会员卡背景',
            fileSizeLimit: '200KB',//文件大小
            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',
            buttonText: '上 传',
            onUploadSuccess : function(file,data,response)  {
                var jsonData = eval("("+data+")");
                $parentDIV.find("#imgArea").show().find("#img").attr("src",jsonData.fileUrl);
                $parentDIV.find("input[name^=litpic2]").val(jsonData.fileUrl);
            }
        });
    });
    $('#file_upload_3').each(function(){
        var $this = $(this);
        var $parentDIV = $(this).parent().parent().parent();
        $this.uploadify({
            swf      : 'js/uploadify/uploadify.swf?_'+Math.random(),
            uploader : 'js/uploadify/uploads.php',
            formData : {
                ASPSESSID:$("#sessionId").val()
            },
            // buttonText: '选择会员卡背景',
            fileSizeLimit: '200KB',//文件大小
            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',
            buttonText: '上 传',
            onUploadSuccess : function(file,data,response)  {
                var jsonData = eval("("+data+")");
                $parentDIV.find("#imgArea").show().find("#img").attr("src",jsonData.fileUrl);
                $parentDIV.find("input[name^=litpic3]").val(jsonData.fileUrl);
            }
        });
    });
    $('#file_upload_4').each(function(){
        var $this = $(this);
        var $parentDIV = $(this).parent().parent().parent();
        $this.uploadify({
            swf      : 'js/uploadify/uploadify.swf?_'+Math.random(),
            uploader : 'js/uploadify/uploads.php',
            formData : {
                ASPSESSID:$("#sessionId").val()
            },
            // buttonText: '选择会员卡背景',
            fileSizeLimit: '200KB',//文件大小
            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',
            buttonText: '上 传',
            onUploadSuccess : function(file,data,response)  {
                var jsonData = eval("("+data+")");
                $parentDIV.find("#imgArea").show().find("#img").attr("src",jsonData.fileUrl);
                $parentDIV.find("input[name^=litpic4]").val(jsonData.fileUrl);
            }
        });
    });
    $(".cover-del").click(function(){
        var $parentDIV = $(this).parent().parent().parent();
        $parentDIV.find("#imgArea").hide();
        $parentDIV.find("input[name^=litpic]").val('');
    });
    $("#logout").click(function(){
        if (confirm("您确定要退出控制面板吗？"))
            top.location = "index.php?m=index&a=out";
        return false;
    });
});
</script>
</head>
<body>
<input type="hidden" id="sessionId" value="<?php echo session_id(); ?>">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif">
        <img src="images/left-top-right.gif" width="17" height="29" />
    </td>
    <td valign="top" background="images/content-bg.gif">
        <table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
            <tr>
                <td height="31"><div class="titlebt">基本设置</div></td>
                <td align="right"><a href="javascript:;" target="_self" id="logout" style="display: inline-block; margin-top: 5px;"><img src="images/out.gif" alt="安全退出" width="46" height="20" border="0"></a></td>
            </tr>
        </table>
    </td>
    <td width="16" valign="top" background="images/mail_rightbg.gif">
        <img src="images/nav-right-bg.gif" width="16" height="29" />
    </td>
</tr>
<tr>
<td valign="middle" background="images/mail_leftbg.gif">&nbsp;</td>
<td valign="top" bgcolor="#F7F8F9">
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <div class="table_box">
                <form action="index.php?m=setting&a=base" method="post" enctype="multipart/form-data">
                <table width="100%" class="tablestyle">
                    <tr>
                        <th width="120" class="tr">站点标题：</th>
                        <td><input type="text" name="title" class="text w300" value="<?=$setting['title']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">QQ：</th>
                        <td><input type="text" name="qq" class="text w300" value="<?=$setting['qq']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">QQ链接：</th>
                        <td><input type="text" name="qq_link" class="text w300" value="<?=$setting['qq_link']?>" required="true"/></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">验证码：</th>
                        <td><input type="text" name="verify" class="text w300" value="<?=$setting['verify']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图一：</th>
                        <td>
                            <input type="text" name="litpic1" id="litpic1" class="text w300" value="<?=$setting['litpic1']?>" required="true" />
                            <div class="cover-area">
                                <div class="cover-hd">
                                    <input id="file_upload_1" name="file_upload" type="file"/>
                                </div>
                                <p id="imgArea" class="cover-bd" style="<?=empty($setting['litpic1'])? 'display: none;':''?>">
                                    <img src="<?=$setting['litpic1']?>" id="img" style="max-width: 120px;"><br />
                                    <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图一标题：</th>
                        <td><input type="text" name="title1" class="text w300" value="<?=$setting['title1']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图一链接：</th>
                        <td><input type="text" name="url1" class="text w300" value="<?=$setting['url1']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图二：</th>
                        <td>
                            <input type="text" name="litpic2" id="litpic2" class="text w300" value="<?=$setting['litpic2']?>" required="true" />
                            <div class="cover-area">
                                <div class="cover-hd">
                                    <input id="file_upload_2" name="file_upload" type="file"/>
                                </div>
                                <p id="imgArea" class="cover-bd" style="<?=empty($setting['litpic2'])? 'display: none;':''?>">
                                    <img src="<?=$setting['litpic2']?>" id="img" style="max-width: 120px;"><br />
                                    <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图二标题：</th>
                        <td><input type="text" name="title2" class="text w300" value="<?=$setting['title2']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图二链接：</th>
                        <td><input type="text" name="url2" class="text w300" value="<?=$setting['url2']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图三：</th>
                        <td>
                            <input type="text" name="litpic3" id="litpic3" class="text w300" value="<?=$setting['litpic3']?>" required="true" />
                            <div class="cover-area">
                                <div class="cover-hd">
                                    <input id="file_upload_3" name="file_upload" type="file"/>
                                </div>
                                <p id="imgArea" class="cover-bd" style="<?=empty($setting['litpic3'])? 'display: none;':''?>">
                                    <img src="<?=$setting['litpic3']?>" id="img" style="max-width: 120px;"><br />
                                    <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图三标题：</th>
                        <td><input type="text" name="title3" class="text w300" value="<?=$setting['title3']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图三链接：</th>
                        <td><input type="text" name="url3" class="text w300" value="<?=$setting['url3']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图四：</th>
                        <td>
                            <input type="text" name="litpic4" id="litpic4" class="text w300" value="<?=$setting['litpic4']?>" required="true" />
                            <div class="cover-area">
                                <div class="cover-hd">
                                    <input id="file_upload_4" name="file_upload" type="file"/>
                                </div>
                                <p id="imgArea" class="cover-bd" style="<?=empty($setting['litpic4'])? 'display: none;':''?>">
                                    <img src="<?=$setting['litpic4']?>" id="img" style="max-width: 120px;"><br />
                                    <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>
                                </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图四标题：</th>
                        <td><input type="text" name="title4" class="text w300" value="<?=$setting['title4']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th width="120" class="tr">图四链接：</th>
                        <td><input type="text" name="url4" class="text w300" value="<?=$setting['url4']?>" required="true" /></td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td><input type="submit" class="btn" id="submit" name="submit" value="保 存" ></td>
                    </tr>
                </table>
                </form>
            </div>
        </td>
    </tr>
</table>
</td>
<td background="images/mail_rightbg.gif">&nbsp;</td>
</tr>
<tr>
    <td valign="bottom" background="images/mail_leftbg.gif">
        <img src="images/buttom_left2.gif" width="17" height="17" />
    </td>
    <td background="images/buttom_bgs.gif">
        <img src="images/buttom_bgs.gif" width="17" height="17">
    </td>
    <td valign="bottom" background="images/mail_rightbg.gif">
        <img src="images/buttom_right2.gif" width="16" height="17" />
    </td>
</tr>
</table>
</body>
</html>