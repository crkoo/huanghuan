<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 16:35
 */
if ($a == 'index'){
    $keywords = isset($_GET['keywords']) ? $_GET['keywords'] : "";
    $where = "1=1";
    if ($keywords){
        $where .= " and title LIKE '%{$keywords}%'";
    }
    require_once(dirname(__FILE__).'/include/page.class.php');
    $sql = "SELECT * FROM `dbl_activity` where {$where} order by ord desc, id desc";
    $total = $db->count($sql);
    if ($total){
        $page = new Page($total, 50);
        $sql .= " limit $page->firstcount,$page->displaypg";
        $list = $db->getLineAll($sql);
        $pageShow = $page->show_link();//显示分页
    }
}else if ($a == 'modify'){
    if (isset($_POST) && !empty($_POST)){
        $id = isset($_POST['id']) ? intval($_POST['id']) : "";
        $ord = isset($_POST['ord']) ? intval($_POST['ord']) : "";
        $title = isset($_POST['title']) ? $_POST['title'] : "";
        $litpic = isset($_POST['litpic']) ? $_POST['litpic'] : null;
        $content = isset($_POST['content']) ? $_POST['content'] : null;
        $form_title = isset($_POST['form_title']) ? $_POST['form_title'] : null;
        $form_title2 = isset($_POST['form_title2']) ? $_POST['form_title2'] : null;
        $is_apply = isset($_POST['is_apply']) ? $_POST['is_apply'] : 1;
        $apply_number = isset($_POST['apply_number']) ? $_POST['apply_number'] : 1;
        if (empty($title)){
            ShowMsg("请输入标题！", -1);
            exit();
        }
        $where = '';
        if ($id){
            $where = " AND `id`<>{$id}";
        }
        $find = $db->count("SELECT `id` FROM `dbl_activity` WHERE `title`='{$title}' {$where}");
        if ($find){
            ShowMsg("系统已经存在此标题的活动", -1);
            exit();
        }
        $time = date('Y-m-d H:i:s');
        $data = array(
            'title' => $title,
            'litpic' => $litpic,
            'ord' => $ord,
            'content' => $content,
            'form_title' => $form_title,
            'form_title2' => $form_title2,
            'is_apply' => $is_apply,
            'apply_number' => $apply_number,
        );

        if ($id){
            $result = $db->update('dbl_activity', $id, $data);
        }else{
            $data['addtime'] = time();
            $result = $id = $db->insert('dbl_activity', $data);
        }
        if ($result!==false){
            $SCRIPT_NAME = $_SERVER['SCRIPT_NAME'];
            $PATH = str_replace('/index.php', '', $SCRIPT_NAME);
            $in = $site_url.$PATH.'/active.php?activeId='.$id;
            $out = dirname(__FILE__).'/../active/active'.$id.'.html';
            generateHtml($in, $out);
            ShowMsg("编辑成功", 'index.php?m=activity&a=index');
            exit();
        }else{
            ShowMsg("编辑失败", -1);
            exit();
        }
    }
    $id = isset($_GET['id']) ? intval($_GET['id']) : "";
    if (!empty($id)){
        $data = $db->getLine("select * from `dbl_activity` where id={$id}");
    }
}else if ($a == 'status'){
    $id = isset($_POST['id']) ? intval($_POST['id']) : "";
    $status = isset($_POST['status']) ? intval($_POST['status']) : "";
    if (empty($id)){
        outputJson(1, '参数传递错误');
    }
    $db->update('dbl_activity', $id, "`status`=($status+1)%2");
    $errmsg = ($status+1)%2;
    outputJson(0, $errmsg);
}else if($a == 'order'){
    //排序
    if ($_POST['order']){
        foreach ($_REQUEST['orders'] as $id => $ord) {
            $ord = intval($ord);
            $db->query("UPDATE `dbl_activity` SET `ord`={$ord} WHERE `id`={$id}");
        }
        ShowMsg("修改成功", 'index.php?m=activity&a=index');
        exit();
    }
}else if ($a == 'del'){
    $id = isset($_GET['id']) ? intval($_GET['id']) : "";
    if (empty($id)){
        outputJson(1, '参数传递错误');
    }
    $db->query("delete from dbl_activity where id=".$id);
    header('Location: index.php?m=activity&a=index');
}else{
    header('HTTP/1.1 404 Not Found', true, 404);
}
include('templets/admin.activity.'.$a.'.php');
$db->close();