<?php/** * Created by adophper.com * User: adophper * Date: 15-1-27 * Time: 下午10:35 */?><!doctype html><html lang="zh-CN"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>活动分类</title><link href="<?=SKINS?>css/admin.css" rel="stylesheet" type="text/css" /><style type="text/css">body {margin: 0;background-color: #EEF2FB;}</style><script type="text/javascript" src="<?=SKINS?>js/jquery-1.11.3.min.js?_v=<?=microtime()?>"></script><script type="text/javascript">    window.UEDITOR_HOME_URL = '<?=SKINS?>ueditor/';    window.fixedImagePath = '<?=SKINS?>ueditor/themes/default/images/';</script><script type="text/javascript" src="<?=SKINS?>ueditor/ueditor.config.js?_v=<?=microtime()?>"></script><script type="text/javascript" src="<?=SKINS?>ueditor/ueditor.all.min.js?_v=<?=microtime()?>"></script><link rel="stylesheet" href="<?=SKINS?>ueditor/themes/default/css/ueditor.css"/><link rel="stylesheet" href="<?=SKINS?>uploadify/uploadify.css?_v=<?=time()?>" media="screen"/><script type="text/javascript" src="<?=SKINS?>uploadify/jquery.uploadify.min.js?_v=<?php echo microtime(true); ?>"></script><script>$(function(){    $('#file_upload').each(function(){        var $this = $(this);        var $parentDIV = $(this).parent().parent().parent();        $this.uploadify({            swf      : '<?=SKINS?>uploadify/uploadify.swf?_v='+Math.random(),            uploader : '<?=SKINS?>uploadify/uploads.php',            formData : {                ASPSESSID:$("#sessionId").val()            },            fileSizeLimit: '200KB',            fileTypeDesc: '支持格式:jpg/gif/jpeg/png',            fileTypeExts: '*.jpg;*.jpeg;*.png;*.gif',            buttonText: '上 传',            onUploadSuccess : function(file,data,response)  {                var jsonData = eval("("+data+")");                $parentDIV.find("#imgArea").show().find("#img").attr("src",jsonData.fileUrl);                $parentDIV.find("input[name='litpic']").val(jsonData.fileUrl);            }        });    });    $(".cover-del").click(function(){        var $parentDIV = $(this).parent().parent().parent();        $parentDIV.find("#imgArea").hide();        $parentDIV.find("input[name='litpic']").val('');    });});</script></head><body><input type="hidden" id="sessionId" value="<?php echo session_id(); ?>"><?=tpl('admin.header.php')?><div class="content clearfix">    <?=tpl('admin.left.php', $m, $a)?>    <div class="right fl">        <div class="box">            <div class="boxHead"><span>添加分类</span></div>            <div class="boxBody">                <form action="home.php?m=category&a=edit" method="post" enctype="multipart/form-data">                    <input type="hidden" name="id" value="<?=$data['id']?>">                    <table width="100%;" class="tablestyle">                        <tr>                            <th width="120" class="tr">分类名称：</th>                            <td><input type="text" name="catename" class="text w400" value="<?=stripslashes($data['catename'])?>" required="true" data-msg="请输入分类名称" />  </td>                        </tr>                        <tr>                            <th width="120" class="tr">图标：</th>                            <td>                                <input type="text" name="litpic" id="litpic" class="text w300" value="<?=$data['litpic']?>" />                                <div class="cover-area">                                    <div class="cover-hd">                                        <input id="file_upload" name="file_upload" type="file"/>                                    </div>                                    <p id="imgArea" class="cover-bd" style="<?=empty($data['litpic'])? 'display: none;':''?>">                                        <img src="<?=$data['litpic']?>" id="img" style="max-width: 120px;"><br />                                        <a href="javascript:;" class="vb cover-del" id="delImg" style="color: #0066cc;">删除</a>                                    </p>                                </div>                            </td>                        </tr>                        <tr>                            <th width="120" class="tr">排序：</th>                            <td><input type="text" name="sort" class="text w400" value="<?=stripslashes($data['sort'])?>" data-msg="请输入排序" placeholder="请输入排序" />  </td>                        </tr>                        <tr>                            <th>&nbsp;</th>                            <td><input type="submit" class="btn" id="submit" name="submit" value="提 交" ></td>                        </tr>                    </table>                </form>            </div>        </div>    </div></div><script>    window.msg_editor = new UE.ui.Editor();    window.msg_editor.render('content');</script><script src="<?=SKINS?>js/admin_common.js"></script></body></html>