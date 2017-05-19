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
        $where .= " AND (`account` like '%{$keywords}%' OR `attr` like '%{$keywords}%' OR `tips` like '%{$keywords}%')";
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
    $sql = "SELECT * FROM `cp99_content` {$where} ORDER BY id DESC ";
    $total = $db->count($sql);
    if ($total){
        $page = new Page($total, 15);
        $sql .= " limit $page->firstcount,$page->displaypg";
        $list = $db->getLineAll($sql);
        $pageShow = $page->show_link();//显示分页
    }
}elseif ($a == 'modify'){
    $data = $_POST;
    if (!empty($data)){
        unset($data['submit']);
        if (empty($data['account'])){
            ShowMsg("会员账号不能为空", -1);
            exit;
        }
        if (empty($data['attr'])){
            ShowMsg("修改内容不能为空", -1);
            exit;
        }
        if (!empty($data['tips'])){
            $data['is_reply'] = 1;
            $data['updateTime'] = time();
            $data['updateIp'] = GetIP();
            $data['userId'] = $_SESSION['uid'];
            $data['userName'] = $_SESSION['nick'];
        }
        $data['activeName'] = getActiveName($data['activeId']);
        if (empty($data['id'])){
            unset($data['id']);
            $data['addTime'] = time();
            $data['ipaddr'] = GetIP();
            $db->insert('cp99_content', $data);
        }else{
            $db->update('cp99_content', $data['id'], $data);
        }
        ShowMsg('数据编辑成功', 'index.php?m=apply&a=index');
    }
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (!empty($id)){
        $data = $db->getLine("select * from cp99_content where id=".$id);
    }else{
        $data = array(
            'id' => null,
            'account' => null,
            'activeId' => null,
            'status' => null,
            'attr' => null,
            'tips' => null,
            'pict' => null,
        );
    }
}elseif($a == 'del'){
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;
    if (empty($id)){
        outputJson(1, '参数传递错误');
        exit;
    }
    $find = $db->getLine("select id from cp99_content where is_del=0 and id=".$id);
    if (empty($find)){
        outputJson(1, '数据不存在');
    }
    $db->update("cp99_content", $id, "`is_del`=1");
    outputJson(0, 'ok');
}else{
    header('HTTP/1.1 404 Not Found', true, 404);
}
include('templets/admin.apply.'.$a.'.php');
$db->close();