<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 20:56
 */
define('DTW', true);
require_once dirname(__FILE__).'/backend/include/init.php';

$method = isset($_GET['action']) ? $_GET['action'] : null;
if (empty($method)){
    outputJson(1, '请求错误');
}else if ($method == 'list'){
    $list = $db->getLineAll("select account as user_name,activeName as active_name from dbl_content where status=1 and is_del=0 ORDER BY id DESC limit 30 ");
    if (!empty($list)) {
        foreach ($list as $k => $v) {
            $list[$k]['user_name'] = substr($v['user_name'],0,3).'****';
        }
    }
    echo json_encode($list);
    exit;
}else if ($method == 'querylist'){
    $data = $_GET;
    $account = isset($data['user_name']) ? htmlspecialchars($data['user_name']) : null;
    if (empty($account)){
        outputJson(2, '请填写会员账号');
    }
    $activeId = isset($data['act_id']) ? intval($data['act_id']) : null;
    if (empty($activeId)){
        outputJson(3, '请选择查询项目');
    }
    $pageSize = isset($data['size']) ? intval($data['size']) : 5;
    $pageSize = $pageSize > 0 ? $pageSize : 5;
    $sql = "select c.id,c.account as user_name,c.activeName,c.tips as check_desc,c.`status` as state,FROM_UNIXTIME(c.addTime,'%Y-%m-%d %H:%i:%s') as apply_time from dbl_content as c where c.is_del=0 and c.activeId=$activeId and c.account='$account'";
    $total = $db->count($sql);
    if ($total == 0){
        $list = array();
    }else {
        $sql .= " ORDER BY c.id DESC";
        if ($total > $pageSize) {
            require_once(LIB . 'page.class.php');
            $page = new Page($total, $pageSize);
            $sql .= " limit $page->firstcount,$page->displaypg";
        }
        $list = $db->getLineAll($sql);
    }
    $json = array(
        'count' => intval($total),
        'data' => $list
    );
    echo json_encode($json);
    exit;
}else if ($method = 'apply'){
    $account = isset($_POST['str1']) ? htmlspecialchars($_POST['str1']) : null;
    if (empty($account)){
        outputJson(2, '用户账号不能为空');
    }
    $activeId = isset($_POST['activeId']) ? intval($_POST['activeId']) : null;
    if (empty($activeId)){
        outputJson(3, '申请活动不能为空');
    }
    $activity = $db->getLine("select id, title from dbl_activity where id=".$activeId);
    if (empty($activity)) {
        //活动不存在
        outputJson(4, '活动不存在');
    }
    /*亏损金额*/
    $loss = isset($_POST['str2']) ? htmlspecialchars($_POST['str2']) : null;
    $loss2 = isset($_POST['str3']) ? htmlspecialchars($_POST['str3']) : null;

    /*注单号->申请内容*/
    $orderId = isset($_POST['int_1']) && $_POST['int_1']!='' ? htmlspecialchars($_POST['int_1']) : "";
    /*if (empty($orderId)){
        outputJson(3, '注单号不能为空');
    }*/
    $content = "会员账号：".$account."，申请内容：".$orderId;

    $insertData = array(
        'account' => $account,
        'activeId' => $activeId,
        'activeName' => $activity['title'],
        'orderId' => $orderId,
        'loss' => $loss,
        'loss2' => $loss2,
        'content' => $content,
        'status' => 0,
        'addTime' => time(),
        'ipaddr' => GetIP(),
    );

    $lastId = $db->insert('dbl_content', $insertData);
    if ($lastId === false){
        outputJson(5, '网络错误');
    }
    outputJson(0, 'ok');
}else {
    header('HTTP/1.1 404 Not Found', true, 404);
}
exit;
