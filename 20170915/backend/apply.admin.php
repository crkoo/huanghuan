<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 16:35
 */
if ($a == 'index'){
    require_once(LIB.'page.class.php');
    $status = isset($_GET['status']) && $_GET['status']!='' ? intval($_GET['status']) : null;
    $where = " WHERE is_del=0";
    $keywords = isset($_GET['keywords']) ? $_GET['keywords'] : "";
    $activeId = isset($_GET['activeId']) ? $_GET['activeId'] : "";
    if ($keywords){
        $where .= " AND (`account` like '%{$keywords}%' OR `content` like '%{$keywords}%' OR `tips` like '%{$keywords}%')";
    }
    if ($activeId){
        $where .= " AND `activeId`=".$activeId;
    }
    $time_start = isset($_GET['time_start']) && trim($_GET['time_start']) ? trim($_GET['time_start']) : '';
    $time_end = isset($_GET['time_end']) && trim($_GET['time_end']) ? trim($_GET['time_end']) : '';
    if ($time_start) {
        $where .= " AND addTime>='" . strtotime($time_start) . "'";
    }
    if ($time_end) {
        $where .= " AND addTime<='" . strtotime($time_end.' 23:59:59') . "'";
    }
    if ($status){
        $where .= " AND status={$status}";
    }
    $sql = "SELECT * FROM `dbl_content` {$where} ORDER BY id DESC ";
    $total = $db->count($sql);
    if ($total){
        $page = new Page($total, 15);
        $sql .= " limit $page->firstcount,$page->displaypg";
        $list = $db->getLineAll($sql);
        $pageShow = $page->show_link();//显示分页
    }
    $activityList = $db->getLineAll("select id, title from dbl_activity where status=1 ORDER BY ord DESC, id ASC ");
}elseif ($a == 'modify'){
    $data = $_POST;
    if (!empty($data)){
        unset($data['submit']);
        if (empty($data['account'])){
            ShowMsg("会员账号不能为空", -1);
            exit;
        }
        /*if (empty($data['orderId'])){
            ShowMsg("注单号不能为空", -1);
            exit;
        }*/

        if (!empty($data['tips'])){
            $data['is_reply'] = 1;
            $data['updateTime'] = time();
            $data['updateIp'] = GetIP();
            $data['userId'] = $_SESSION['uid'];
            $data['userName'] = $_SESSION['nick'];
        }
        $activity = $db->getLine("select id, title from dbl_activity where id=".intval($data['activeId']));
        $data['activeName'] = $activity['title'];
        $data['content'] = "会员账号：".$data['account']."，申请内容：".$data['orderId'];
        if (empty($data['id'])){
            unset($data['id']);
            $data['addTime'] = time();
            $data['ipaddr'] = GetIP();
            $db->insert('dbl_content', $data);
        }else{
            $db->update('dbl_content', $data['id'], $data);
        }
        ShowMsg('数据编辑成功', 'index.php?m=apply&a=index');
    }
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    $activityArray = $db->getLineAll("select id, title, form_title, form_title2 from dbl_activity where status=1 ORDER BY ord DESC, id ASC ");
    $list = array();
    if (!empty($activityArray)) {
        foreach ($activityArray as $item) {
            $list[$item['id']] = $item;
        }
    }
    if (!empty($id)){
        $data = $db->getLine("select * from dbl_content where id=".$id);
    }else{
        $data = array(
            'id' => null,
            'account' => null,
            'activeId' => null,
            'orderId' => null,
            'loss' => null,
            'loss2' => null,
            'content' => null,
            'status' => null,
            'tips' => null,
        );
    }
}elseif($a == 'del'){
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (empty($id)){
        outputJson(1, '参数传递错误');
        exit;
    }
    $find = $db->getLine("select id from dbl_content where is_del=0 and id=".$id);
    if (empty($find)){
        outputJson(1, '数据不存在');
    }
    $db->update("dbl_content", $id, "`is_del`=1");
    outputJson(0, 'ok');
}elseif ($a == 'delAll'){
    $ids = isset($_REQUEST['id']) ? $_REQUEST['id'] : null;
    if (empty($ids)){
        ShowMsg('请选择您要删除的数据', -1);
        exit;
    }
    foreach ($ids as $id){
        $db->update("dbl_content", $id, "`is_del`=1");
    }
    redirect('index.php?m=apply&a=index');
    exit;
}else{
    header('HTTP/1.1 404 Not Found', true, 404);
}
include('templets/admin.apply.'.$a.'.php');
$db->close();