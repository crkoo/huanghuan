<?php
/**
 * Created by PhpStorm.
 * User: adophper <hello@adophper.com>
 * Date: 2017/5/17
 * Time: 20:56
 */
define('DTW', true);
require_once dirname(__FILE__).'/backend/include/init.php';

$data = $_POST;
$method = isset($_GET['action']) ? $_GET['action'] : null;
if (empty($method)){
    outputJson(1, '请求错误');
}else if ($method == 'list'){
    $list = $db->getLineAll("select account as user_name,activeName as active_name from dbl_content where status=1 and is_del=0 ORDER BY id DESC limit 30 ");
    echo json_encode($list);
    exit;
}else{
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
        $sql = "select c.id,c.account,c.activeName,c.tips,c.`status`,FROM_UNIXTIME(c.addTime,'%Y-%m-%d %H:%i:%s') as addTime from dbl_content as c where c.is_del=0 and c.activeId=$activeId and c.account='$account'";
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
    }else if ($method == 'applyz'){
        $account = isset($data['objaccount']) ? $data['objaccount'] : null;
        if (empty($account)){
            outputJson(2, '用户账号不能为空');
        }
        $activeId = isset($data['activeId']) ? intval($data['activeId']) : null;
        if (empty($activeId)){
            outputJson(3, '修改项目不能为空');
        }
        $amount = isset($_POST['amount']) ? $_POST['amount'] : NULL;
        $buteNameList = isset($_POST['buteNameList']) ? $_POST['buteNameList'] : NULL;
        $amount = str_replace(' ', '', $amount);
        $attr = explode(',', $amount);
        $attr = array_filter($attr);
        $oldAttr = explode(',', $buteNameList);

        /*$pict = isset($data['account']) ? $data['account'] : null;
        if (empty($pict)){
            outputJson(93, '请先上传图片 再点击提交');
        }*/

        if ($activeId == 4){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(41, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(41, '您输入银行卡卡号不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(42, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(42, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 5){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(51, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(51, '您输入银行卡卡号不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(51, '您输入旧银行地址不为空');
            }
            if (empty($attr[3]) || $attr[3] == $oldAttr[3]){
                outputJson(51, '您输入新银行地址不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(52, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(52, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 6){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(61, '您输入银行卡卡号不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(62, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(62, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 7){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(71, '您输入银行卡卡号不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(71, '您输入旧银行地址不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(71, '您输入新银行地址不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(72, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(72, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 8){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(81, '您输入真实姓名不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(82, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(82, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 9){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(91, '您输入旧的姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(91, '您输入新的姓名不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(91, '您输入银行卡卡号不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(92, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(92, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 12){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(121, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(121, '您输入旧银行卡卡号不为空');
            }
            if (empty($attr[2]) || $attr[1] == $oldAttr[2]){
                outputJson(121, '您输入新银行卡卡号不为空');
            }
            if (empty($attr[3]) || $attr[1] == $oldAttr[3]){
                outputJson(121, '您输入新银行卡所属银行不为空');
            }
            if (empty($attr[4]) || $attr[1] == $oldAttr[4]){
                outputJson(121, '您输入新卡号开户地址不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(122, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(122, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else if ($activeId == 13){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(131, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(131, '您输入银行卡卡号不为空');
            }
            $cfCode = isset($_POST['cfCode']) ? $_POST['cfCode'] : null;
            if (empty($cfCode)){
                outputJson(132, '验证码不正确');
            }
            $verify = isset($_SESSION['cfCode_session']) ? $_SESSION['cfCode_session'] : null;
            if (md5($cfCode) != $verify){
                outputJson(132, '验证码不正确');
            }
            outputJson(0, 'ok');
        }else{
            outputJson(100, '非法提交');
        }
    }else if ($method == 'applySaveMold'){
        $account = isset($data['objaccount']) ? $data['objaccount'] : null;
        if (empty($account)){
            outputJson(2, '用户账号不能为空');
        }
        $activeId = isset($data['activeId']) ? intval($data['activeId']) : null;
        if (empty($activeId)){
            outputJson(3, '修改项目不能为空');
        }
        $pict = isset($data['account']) ? $data['account'] : null;
        $amount = isset($_POST['amount']) ? $_POST['amount'] : NULL;
        $buteNameList = isset($_POST['buteNameList']) ? $_POST['buteNameList'] : NULL;

        $amount = str_replace(' ', '', $amount);
        $attr = explode(',', $amount);
        $attr = array_filter($attr);
        $oldAttr = explode(',', $buteNameList);

        if ($activeId == 4){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(41, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(41, '您输入银行卡卡号不为空');
            }
            if (empty($pict)){
                outputJson(43, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 5){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(51, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(51, '您输入银行卡卡号不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(51, '您输入旧银行地址不为空');
            }
            if (empty($attr[3]) || $attr[3] == $oldAttr[3]){
                outputJson(51, '您输入新银行地址不为空');
            }
            if (empty($pict)){
                outputJson(53, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 6){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(61, '您输入银行卡卡号不为空');
            }
            if (empty($pict)){
                outputJson(133, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 7){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(71, '您输入银行卡卡号不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(71, '您输入旧银行地址不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(71, '您输入新银行地址不为空');
            }
            if (empty($pict)){
                outputJson(73, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 8){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(81, '您输入真实姓名不为空');
            }
        }else if ($activeId == 9){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(91, '您输入旧的姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(91, '您输入新的姓名不为空');
            }
            if (empty($attr[2]) || $attr[2] == $oldAttr[2]){
                outputJson(91, '您输入银行卡卡号不为空');
            }
            if (empty($pict)){
                outputJson(93, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 12){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(121, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(121, '您输入旧银行卡卡号不为空');
            }
            if (empty($attr[2]) || $attr[1] == $oldAttr[2]){
                outputJson(121, '您输入新银行卡卡号不为空');
            }
            if (empty($attr[3]) || $attr[1] == $oldAttr[3]){
                outputJson(121, '您输入新银行卡所属银行不为空');
            }
            if (empty($attr[4]) || $attr[1] == $oldAttr[4]){
                outputJson(121, '您输入新卡号开户地址不为空');
            }
            if (empty($pict)){
                outputJson(123, '请先上传图片 再点击提交');
            }
        }else if ($activeId == 13){
            if (empty($attr[0]) || $attr[0] == $oldAttr[0]){
                outputJson(131, '您输入真实姓名不为空');
            }
            if (empty($attr[1]) || $attr[1] == $oldAttr[1]){
                outputJson(131, '您输入银行卡卡号不为空');
            }
            if (empty($pict)){
                outputJson(133, '请先上传图片 再点击提交');
            }
        }else{
            outputJson(100, '非法提交');
        }

        $newAttr = '';
        foreach ($attr as $key => $val){
            $newAttr .= $oldAttr[$key].':'.$val.' ';
        }

        $insertData = array(
            'account' => $account,
            'activeId' => $activeId,
            'activeName' => getActiveName($activeId),
            'buteNameList' => $buteNameList,
            'attr' => $newAttr,
            'pict' => $pict,
            'status' => 0,
            'addTime' => time(),
            'ipaddr' => GetIP(),
        );

        $lastId = $db->insert('dbl_content', $insertData);
        if ($lastId === false){
            outputJson(5, '网络错误');
        }
        if (isset($_SESSION['cfCode_session'])) {
            unset($_SESSION['cfCode_session']);
        }
        outputJson(0, 'ok');
    }
}
exit;
