<?php/** * Created by adophper.com * User: adophper * Date: 15-1-27 * Time: 下午10:35 */?><!doctype html><html lang="zh-CN"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>数据编辑</title><link href="<?=SKINS?>css/admin.css" rel="stylesheet" type="text/css" /><script type="text/javascript" src="<?=SKINS?>js/jquery-1.11.3.min.js?_v=<?=microtime()?>"></script><script>var SKINS = '<?=SKINS?>';</script></head><body><?=tpl('admin.header.php')?><div class="content clearfix">    <?=tpl('admin.left.php', $m, $a)?>    <div class="right fl">        <div class="box">            <div class="boxHead"><span>数据编辑</span></div>            <div class="boxBody">                <form action="index.php?m=apply&a=modify" method="post" enctype="multipart/form-data">                    <input type="hidden" name="id" value="<?=$data['id']?>">                    <table width="100%;" class="tablestyle">                        <tr>                            <th width="120" class="tr">会员账号：</th>                            <td><input type="text" name="account" class="text w400" value="<?=stripslashes($data['account'])?>" required="true" data-msg="请输入会员账号" />  </td>                        </tr>                        <tr>                            <th width="120" class="tr">修改项目：</th>                            <td>                                <select name="activeId">                                    <option value="4" <?=$data['activeId']==4?'selected="selected"':''?>>修改会员登入密码</option>                                    <option value="8" <?=$data['activeId']==8?'selected="selected"':''?>>会员账号解冻</option>                                    <option value="6" <?=$data['activeId']==6?'selected="selected"':''?>>忘记会员账号</option>                                    <option value="9" <?=$data['activeId']==9?'selected="selected"':''?>>修改真实姓名</option>                                    <option value="12" <?=$data['activeId']==12?'selected="selected"':''?>>修改银行账号</option>                                    <option value="7" <?=$data['activeId']==7?'selected="selected"':''?>>修改银行地址</option>                                    <option value="5" <?=$data['activeId']==5?'selected="selected"':''?>>修改银行名称</option>                                    <option value="13" <?=$data['activeId']==13?'selected="selected"':''?>>修改会员取款密码</option>                                </select>                            </td>                        </tr>                        <tr>                            <th width="120" class="tr">修改内容：</th>                            <td>                                <textarea name="content" placeholder="修改内容" class="w400" rows="8"><?=$data['content']?></textarea>                            </td>                        </tr>                        <tr>                            <th width="120" class="tr">审核状态：</th>                            <td>                                <select name="status">                                    <option value="0" <?=$data['status']==0?'selected="selected"':''?>>等待审核</option>                                    <option value="1" <?=$data['status']==1?'selected="selected"':''?>>已成功</option>                                    <option value="2" <?=$data['status']==2?'selected="selected"':''?>>已拒绝</option>                                </select>                            </td>                        </tr>                        <tr>                            <th width="120" class="tr">回复内容：</th>                            <td>                                <textarea name="tips" placeholder="回复内容" class="w400" rows="8"><?=$data['tips']?></textarea>                            </td>                        </tr>                        <tr>                            <th>&nbsp;</th>                            <td><input type="submit" class="btn" id="submit" name="submit" value="提 交" ></td>                        </tr>                    </table>                </form>            </div>        </div>    </div></div><script src="<?=SKINS?>js/admin_common.js"></script></body></html>