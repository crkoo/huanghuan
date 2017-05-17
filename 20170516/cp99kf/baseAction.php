<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 20:56
 */
define('DTW', true);
require_once dirname(__FILE__).'/include/init.php';

$data = $_POST;
if (empty($data['ctrl_action']) || $data['ctrl_action'] != 'applyAction'){
    outputJson(1, '请求错误');
}else{
    $method = $data['ctrl_method'];
    if ($method == 'queryCurUserInfo'){
        $account = isset($data['account']) ? $data['account'] : null;
        if (empty($account)){
            outputJson(2, '请填写会员账号');
        }
        $activeId = isset($data['activeId']) ? intval($data['activeId']) : null;
        if (empty($activeId)){
            outputJson(3, '请选择查询项目');
        }
        $pageSize = isset($data['row']) ? intval($data['row']) : 6;
        $pageSize = $pageSize > 0 ? $pageSize : 6;
        $sql = "select c.id,c.account,c.activeName,c.tips,c.`status`,FROM_UNIXTIME(c.addTime,'%Y-%m-%d %H:%i:%s') as addTime from cp99_content as c where c.is_del=0 and c.activeId=$activeId and c.account='$account'";
        $total = $db->count($sql);
        if ($total == 0){
            outputJson(0, 'ok', array('rows' => array(), 'total' => 0));
        }
        $sql .= " ORDER BY c.id DESC";
        if ($total > $pageSize){
            require_once(LIB.'page.class.php');
            $page = new Page($total, $pageSize);
            $sql .= " limit $page->firstcount,$page->displaypg";
        }
        $list = $db->getLineAll($sql);
        outputJson(0, 'ok', array('rows' => $list, 'total' => $total));
    }else if ($method == 'queryUnEditTeams'){
        $list = $db->getLineAll("select * from cp99_content where status=1 and is_del=0 ORDER BY id DESC limit 30 ");
        outputJson(0, 'ok', $list);
    }else if ($method == 'applySaveMold'){
        $account = isset($data['account']) ? $data['account'] : null;
        if (empty($account)){
            outputJson(2, '会员账号不能为空');
        }
        $activeId = isset($data['activeId']) ? intval($data['activeId']) : null;
        if (empty($activeId)){
            outputJson(3, '修改项目不能为空');
        }
        $content = isset($data['content']) ? $data['content'] : null;
        if (empty($content)){
            outputJson(4, '修改内容不能为空');
        }
        $insertData = array(
            'account' => $account,
            'activeId' => $activeId,
            'activeName' => getActiveName($activeId),
            'content' => $content,
            'status' => 0,
            'addTime' => time(),
            'ipaddr' => GetIP(),
        );
        $lastId = $db->insert('cp99_content', $insertData);
        if ($lastId === false){
            outputJson(5, '网络错误');
        }
        outputJson(0, 'ok');
    }
}
exit;
