<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 15-1-27
 * Time: 下午10:35
 */
?>
<!doctype html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>活动编辑</title>
<link href="<?=SKINS?>css/admin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?=SKINS?>js/jquery-1.11.3.min.js?_v=<?=microtime()?>"></script>
<link rel="stylesheet" href="<?=SKINS?>uploadify/uploadify.css?_v=<?=time()?>" media="screen"/>
<script type="text/javascript" src="<?=SKINS?>uploadify/jquery.uploadify.min.js?_v=<?php echo microtime(true); ?>"></script>
<script>
$(function(){
    $('#file_upload').each(function(){
        var $this = $(this);
        var $parentDIV = $(this).parent().parent().parent();
        $this.uploadify({
            swf      : '<?=SKINS?>uploadify/uploadify.swf?_v='+Math.random(),
            uploader : '<?=SKINS?>uploadify/uploads.php',
            formData : {
                ASPSESSID:$("#sessionId").val()
            },
            // buttonText: '选择会员卡背景',
            fileSizeLimit: '500KB',//文件大小
            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',
            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',
            buttonText: '上 传',
            onUploadSuccess : function(file,data,response)  {
                var jsonData = eval("("+data+")");
                $parentDIV.find("#imgArea").show().find("#img").attr("src",'../'+jsonData.fileUrl);
                $parentDIV.find("input[name='litpic']").val(jsonData.fileUrl);
            }
        });
    });
    $(".cover-del").click(function(){
        var $parentDIV = $(this).parent().parent().parent();
        $parentDIV.find("#imgArea").hide();
        $parentDIV.find("input[name='litpic']").val('');
    });
});
</script>
</head>
<body>
<input type="hidden" id="sessionId" value="<?php echo session_id(); ?>">
<?=tpl('admin.header.php')?>
<div class="content clearfix">
    <?=tpl('admin.left.php', $m, $a)?>
    <div class="right fl">
        <div class="box">
            <div class="boxHead"><span>编辑活动</span></div>
            <div class="boxBody">
                <form action="index.php?m=activity&a=modify" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="id" value="<?=$data['id']?>">
                    <table width="100%;" class="tablestyle">
                        <tr>
                            <th width="120" class="tr">标题：</th>
                            <td><input type="text" name="title" class="text w400" value="<?=stripslashes($data['title'])?>" required="true" data-msg="请输入标题" />  </td>
                        </tr>
                        <tr>
                            <th width="120" class="tr">封面图：</th>
                            <td>
                                <input type="text" name="litpic" id="litpic" class="text w400" value="<?=$data['litpic']?>" />
                                <div class="cover-area">
                                    <div class="cover-hd">
                                        <input id="file_upload" name="file_upload" type="file"/>
                                    </div>
                                    <p id="imgArea" class="cover-bd" style="<?=empty($data['litpic'])? 'display: none;':''?>">
                                        <img src="<?='../'.$data['litpic']?>" id="img" style="max-width: 120px;"><br />
                                        <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <!--<tr>
                            <th width="120" class="tr">内容：</th>
                            <td>
                                <textarea style="width:70%;height:300px;" id="content" class="input-text" name="content"><?/*=stripslashes($data['content'])*/?></textarea>
                            </td>
                        </tr>-->
                        <tr>
                            <th width="120" class="tr">排序：</th>
                            <td>
                                <input type="text" name="ord" value="<?=$data['ord']?intval($data['ord']):0?>" class="text w100" />
                            </td>
                        </tr>
                        <tr>
                            <th>&nbsp;</th>
                            <td><input type="submit" class="btn" id="submit" name="submit" value="提 交" ></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="<?=SKINS?>js/admin_common.js"></script>
</body>
</html>