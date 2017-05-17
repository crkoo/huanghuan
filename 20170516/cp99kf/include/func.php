<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 14-8-4
 * Time: 上午11:53
 */

function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);

    $res = curl_exec($curl);
    curl_close($curl);

    return $res;
}

/*
 * Created on 2013-3-25
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
function createToken($len = 32, $md5 = true) {
    # Seed random number generator
    # Only needed for PHP versions prior to 4.2
    mt_srand((double) microtime() * 1000000);
    # Array of characters, adjust as desired
    $chars = array ('Q','@','8','y','%','^','5','Z','(','G','_','O','`','S','-','N','<','D','{','}','[',']','h',';','W','.','/','|',':','1','E','L','4','&','6','7','#','9','a','A','b','B','~','C','d','>','e','2','f','P','g',')','?','H','i','X','U','J','k','r','l','3','t','M','n','=','o','+','p','F','q','!','K','R','s','c','m','T','v','j','u','V','w',',','x','I','$','Y','z','*');
    # Array indice friendly number of chars;
    $numChars = count($chars) - 1;
    $token = '';
    # Create random token at the specified length
    for ($i = 0; $i < $len; $i++)
        $token .= $chars[mt_rand(0, $numChars)];
    # Should token be run through md5?
    if ($md5) {
        # Number of 32 char chunks
        $chunks = ceil(strlen($token) / 32);
        $md5token = '';
        # Run each chunk through md5
        for ($i = 1; $i <= $chunks; $i++)
            $md5token .= md5(substr($token, $i * 32 - 32, 32));
        # Trim the token
        $token = substr($md5token, 0, $len);
    }
    return $token;
}
/**
 *
 */
function replace_em($str){
    $tip = array('微笑','色','流泪','害羞','呲牙','惊讶','偷笑','可爱','惊恐','抠鼻','鼓掌','流汗','坏笑','鄙视','阴险','亲亲','可怜','大兵','衰','骷髅','菜刀','玫瑰','凋谢','示爱','炸弹','刀','便便','月亮','强','胜利','勾引','OK');
    $str = str_replace("/\</g",'&lt;', $str);
    $str = str_replace("/\>/g",'&gt;', $str);
    $str = str_replace("/\n/g",'<br/>', $str);
    global $setting;
	foreach ($tip as $k=>$v){
        $temp = $tip[$k];
//        var_dump($temp);
		$str = str_replace("[$temp]",'<img src="'.$setting['site_url'].'/face/'.($k+1).'.png" border="0" />', $str);
	}
//    var_dump($str);
	return $str;
}
/**
 * @param $file
 * @param null $content
 * @return bool
 */
function is_cache($file, $content = null){
    if (file_exists(CACHE.md5($file).'.php')){
        return true;
    }else{
        return false;
//        if (!empty($content)) cache($file, $content);
    }
}

/**
 * @param $file
 * @param $content
 */
function set_cache($file, $content){
    $fp = fopen(CACHE.md5($file).'.php', 'w+');
    if (!$fp) return ;
    fwrite($fp, serialize($content));
    fclose($fp);
}

/**
 * @param $file
 * @return mixed
 */
function get_cache($file){
    $file = CACHE.md5($file).'.php';
    $fp = fopen($file, 'r');
    if (!$fp) return ;
    $content = fread($fp,filesize($file));
    fclose($fp);
    return unserialize($content);
}
/**
 * 加载模板文件
 */
if (!function_exists("tpl")){
    function tpl($file, $m = 'index', $a = 'index') {
        if (!file_exists(TPL . $file)){
            return '模板文件 '.$file.' 未找到!';
            die();
        }
        include_once(TPL . $file);
    }
}
/**
 * 日志记录
 **/
if (!function_exists("logs")){
    function logs($str, $file = ''){
        if ($file){
            $file = $_SERVER["DOCUMENT_ROOT"]."/".$file;
        }else{
            $file = str_replace("\\", '/', dirname(dirname(__FILE__)))."/logs/log-".date('Y-m-d-H-i-s').".txt";
            if (!is_dir(dirname((dirname(__FILE__)))).'/logs/'){
                mkdir(dirname((dirname(__FILE__))).'/logs/',0777);
            }
        }
        $fp = fopen($file, 'w+');
        if (!$fp) return ;
        fwrite($fp, serialize($str));
        fclose($fp);
    }
}
/**
 * 素材类型
 */
function getMaterial($msgtype){
    if (!$msgtype) return ;
    switch ($msgtype){
        case 'txt': return '文本';
        case 'sign': return '单图文';
        case 'image': return '多图文';
        default:
    }
}

/**
 * @param $str
 * @param null $keywords
 * @return string
 */
function cleanFilter($str){
    global $setting;
    if (empty($setting['filter']) || empty($str)) return $str;
    $setting['filter'] = str_replace('，',',', $setting['filter']);
    $keywords = explode(',', $setting['filter']);
    //用等号分割，前面的用作模式串，后面的用作替换串
    $words = array_combine($keywords, array_fill(0,count($keywords),'*'));
    return strtr($str, $words);
}
/**
+----------------------------------------------------------
 * Generate a random string that can be used to automatically generate code
 * The default length of 6 letters and numbers mixed
+----------------------------------------------------------
 * @param string $len
 * @param string $type
 * 0 Letter 1 Number
 * @param string $addChars Additional characters
+----------------------------------------------------------
 * @return string
+----------------------------------------------------------
 */
function randString($len=6,$type='',$addChars='') {
    $str ='';
    switch($type) {
        case 0:
            $chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.$addChars;
            break;
        case 1:
            $chars= str_repeat('0123456789',3);
            break;
        case 2:
            $chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.$addChars;
            break;
        case 3:
            $chars='abcdefghijklmnopqrstuvwxyz'.$addChars;
            break;
        default :
            // The default removed easily confused characters of oOLl and the number 01, please use the addChars parameter to add
            $chars='ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789'.$addChars;
            break;
    }
    if($len>10 ) {//Digit string too long repeated a certain number of times
        $chars= $type==1? str_repeat($chars,$len) : str_repeat($chars,5);
    }
    $chars   =   str_shuffle($chars);
    $str     =   substr($chars,0,$len);
    return $str;
}
/**
+----------------------------------------------------------
 * 字符串截取，支持中文和其他编码
+----------------------------------------------------------
 * @static
 * @access public
+----------------------------------------------------------
 * @param string $str 需要转换的字符串
 * @param string $start 开始位置
 * @param string $length 截取长度
 * @param string $charset 编码格式
 * @param string $suffix 截断显示字符
+----------------------------------------------------------
 * @return string
+----------------------------------------------------------
 */
function msubstr($str, $start=0, $length, $charset="utf-8", $suffix=true) {
    if(function_exists("mb_substr")){
        $str_length = mb_strlen($str);
        $slice = mb_substr($str, $start, $length, $charset);
    }
    elseif(function_exists('iconv_substr')) {
        $str_length = iconv_strlen($str);
        $slice = iconv_substr($str,$start,$length,$charset);
        if(false === $slice) {
            $slice = '';
        }
    }else{
        $str_length = strlen($str);
        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk']    = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5']   = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        $slice = join("",array_slice($match[0], $start, $length));
    }
    if ($str_length > $length  && $suffix){
        return $suffix ? $slice.'...' : $slice;
    }elseif($str_length > $length && !$suffix){
        return $slice;
    }else{
        return $slice;
    }

}
/**
 * 页面跳转
 * @param string $url 链接
 * @return
 */
if (!function_exists('redirect')){
    function redirect($url){
        if (empty($url)) return ;
        header("HTTP/1.1 301 Moved Permanently");
        header("Location: ".$url);
        exit;
    }
}
/**
 * 返回json格式
 * @param int $errcode 错误代码
 * @param string $errmsg 错误提示语句
 * @return string 返回json格式数据
 */
if (!function_exists('outputJson')){
    function outputJson($errcode = 0, $errmsg = ''){
        $msg = array('errcode'=>$errcode,'errmsg'=>$errmsg);
        echo json_encode($msg);
        exit();
    }
}
/**
 * 递归方式的对变量中的特殊字符进行转义
 *
 * @access  public
 * @param   mix     $value
 * @return  mix
 */
function addslashes_deep($value)
{
    if (empty($value))
    {
        return $value;
    }
    else
    {
        return is_array($value) ? array_map('addslashes_deep', $value) : addslashes($value);
    }
}
/**
 *  获取用户真实地址
 *
 * @return    string  返回用户ip
 */
if ( ! function_exists('GetIP'))
{
    function GetIP()
    {
        static $realip = NULL;
        if ($realip !== NULL)
        {
            return $realip;
        }
        if (isset($_SERVER))
        {
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            {
                $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                /* 取X-Forwarded-For中第x个非unknown的有效IP字符? */
                foreach ($arr as $ip)
                {
                    $ip = trim($ip);
                    if ($ip != 'unknown')
                    {
                        $realip = $ip;
                        break;
                    }
                }
            }
            elseif (isset($_SERVER['HTTP_CLIENT_IP']))
            {
                $realip = $_SERVER['HTTP_CLIENT_IP'];
            }
            else
            {
                if (isset($_SERVER['REMOTE_ADDR']))
                {
                    $realip = $_SERVER['REMOTE_ADDR'];
                }
                else
                {
                    $realip = '0.0.0.0';
                }
            }
        }
        else
        {
            if (getenv('HTTP_X_FORWARDED_FOR'))
            {
                $realip = getenv('HTTP_X_FORWARDED_FOR');
            }
            elseif (getenv('HTTP_CLIENT_IP'))
            {
                $realip = getenv('HTTP_CLIENT_IP');
            }
            else
            {
                $realip = getenv('REMOTE_ADDR');
            }
        }
        preg_match("/[\d\.]{7,15}/", $realip, $onlineip);
        $realip = ! empty($onlineip[0]) ? $onlineip[0] : '0.0.0.0';
        return $realip;
    }
}

// 数组保存到文件
function arr2file($filename, $arr=''){
    if(is_array($arr)){
        $con = var_export($arr,true);
    } else{
        $con = $arr;
    }
    $con = "<?php\nreturn $con;\n?>"; //生成配置文件内容

    $dir = dirname($filename);
    if(!is_dir($dir)){
        mkdir($dir);
    }
    return @file_put_contents($filename,$con); //写入./config.php中
}

//反转义
function strclean($data){
    $str=$data;
    if (ini_get('magic_quotes_gpc')) {
        return clean($data);
    }else {
        return $data;
    }
}
function clean($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[clean($key)] = clean($value);
        }
    } else {
        $data =stripslashes($data);
    }
    return $data;
}

/**
 *  短消息函数,可以在某个动作处理后友好的提示信息
 *
 * @param     string  $msg      消息提示信息
 * @param     string  $gourl    跳转地址
 * @param     int     $onlymsg  仅显示信息
 * @param     int     $limittime  限制时间
 * @return    void
 */
function ShowMsg($msg, $gourl, $onlymsg=0, $limittime=0)
{
    $htmlhead  = "<html>\r\n<head>\r\n<title>提示信息</title>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n";
    $htmlhead .= "<base target='_self'/>\r\n<style>div{line-height:160%;}</style></head>\r\n<body leftmargin='0' topmargin='0' bgcolor='#FFFFFF'>\r\n<center>\r\n<script>\r\n";
    $htmlfoot  = "</script>\r\n</center>\r\n</body>\r\n</html>\r\n";

    $litime = ($limittime==0 ? 1000 : $limittime);
    $func = '';

    if($gourl=='-1')
    {
        if($limittime==0) $litime = 5000;
        $gourl = "javascript:history.go(-1);";
    }

    if($gourl=='' || $onlymsg==1)
    {
        $msg = "<script>alert(\"".str_replace("\"","“",$msg)."\");</script>";
    }
    else
    {
        //当网址为:close::objname 时, 关闭父框架的id=objname元素
        if(preg_match('/close::/',$gourl))
        {
            $tgobj = trim(preg_replace('/close::/', '', $gourl));
            $gourl = 'javascript:;';
            $func .= "window.parent.document.getElementById('{$tgobj}').style.display='none';\r\n";
        }

        $func .= "      var pgo=0;
      function JumpUrl(){
        if(pgo==0){ location='$gourl'; pgo=1; }
      }\r\n";
        $rmsg = $func;
        $rmsg .= "document.write(\"<br /><div style='width:450px;padding:0px;border:1px solid #DADADA;'>";
        $rmsg .= "<div style='padding:6px;font-size:12px;border-bottom:1px solid #DADADA;background:#DBEEBD;'><b>提示信息！</b></div>\");\r\n";
        $rmsg .= "document.write(\"<div style='height:130px;font-size:10pt;background:#ffffff'><br />\");\r\n";
        $rmsg .= "document.write(\"".str_replace("\"","“",$msg)."\");\r\n";
        $rmsg .= "document.write(\"";

        if($onlymsg==0)
        {
            if( $gourl != 'javascript:;' && $gourl != '')
            {
                $rmsg .= "<br /><a href='{$gourl}'>如果你的浏览器没反应，请点击这里...</a>";
                $rmsg .= "<br/></div>\");\r\n";
                $rmsg .= "setTimeout('JumpUrl()',$litime);";
            }
            else
            {
                $rmsg .= "<br/></div>\");\r\n";
            }
        }
        else
        {
            $rmsg .= "<br/><br/></div>\");\r\n";
        }
        $msg  = $htmlhead.$rmsg.$htmlfoot;
    }
    echo $msg;
    exit;
}

/**
 *  短消息函数,可以在某个动作处理后友好的提示信息
 *
 * @param     string  $msg      消息提示信息
 * @param     string  $gourl    跳转地址
 * @param     int     $onlymsg  仅显示信息
 * @param     int     $limittime  限制时间
 * @return    void
 */
function frontendMsg($url=null, $msg = "页面加载中...", $timeout = 0)
{
    echo '<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    </head>
    <body>
        <script type="text/javascript">
            document.head.innerHTML = \'<title>'.$msg.'</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/open/libs/weui/0.4.1/weui.css">\';
            document.body.innerHTML = \'<div class="weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">'.$msg.'</h4></div></div>\';
            '.($url ? ($timeout ? 'setTimeout(function(){location.href = "'.$url.'";}, '.($timeout*1000).');' : 'location.href = "'.$url.'";') : '').'
        </script>
    </body>
</html>';
    exit;
}

/*判断是否微信内部浏览*/
function is_weixin(){
    if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
        return true;
    }
    return false;
}

function isMobile()
{
    // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
    if (isset ($_SERVER['HTTP_X_WAP_PROFILE']))
    {
        return true;
    }
    // 如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
    if (isset ($_SERVER['HTTP_VIA']))
    {
        // 找不到为flase,否则为true
        return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
    }
    // 脑残法，判断手机发送的客户端标志,兼容性有待提高
    if (isset ($_SERVER['HTTP_USER_AGENT']))
    {
        $clientkeywords = array ('nokia',
            'sony',
            'ericsson',
            'mot',
            'samsung',
            'htc',
            'sgh',
            'lg',
            'sharp',
            'sie-',
            'philips',
            'panasonic',
            'alcatel',
            'lenovo',
            'iphone',
            'ipod',
            'blackberry',
            'meizu',
            'android',
            'netfront',
            'symbian',
            'ucweb',
            'windowsce',
            'palm',
            'operamini',
            'operamobi',
            'openwave',
            'nexusone',
            'cldc',
            'midp',
            'wap',
            'mobile'
        );
        // 从HTTP_USER_AGENT中查找手机浏览器的关键字
        if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT'])))
        {
            return true;
        }
    }
    // 协议法，因为有可能不准确，放到最后判断
    if (isset ($_SERVER['HTTP_ACCEPT']))
    {
        // 如果只支持wml并且不支持html那一定是移动设备
        // 如果支持wml和html但是wml在html之前则是移动设备
        if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html'))))
        {
            return true;
        }
    }
    return false;
}

/**
 * 获取Mac地址
 * @return null|string
 */
function getMacAddress()
{
    $osType = strtolower(PHP_OS);
    $returnArray = null;// 返回带有MAC地址的字串数组
    $macAddress = null;
    if (strlen($osType) >= 3) {
        $osShort = substr($osType, 0, 3);
    } else {
        $osShort = $osType;
    }
    if ($osShort == "win") {
        $returnArray = getMacAddressForWindows();
    } else {
        $returnArray = getMacAddressForLinux();
    }
    if (!empty($returnArray) && count($returnArray) > 0) {
        $tempArray = array();

        foreach ($returnArray as $value) {
            if (preg_match("/[0-9a-f][0-9a-f][:-]" . "[0-9a-f][0-9a-f][:-]" . "[0-9a-f][0-9a-f][:-]" . "[0-9a-f][0-9a-f][:-]" . "[0-9a-f][0-9a-f][:-]" . "[0-9a-f][0-9a-f]/i", $value, $tempArray)) {
                $macAddress = $tempArray[0];
                break;
            }
        }

        unset($tempArray);
    }

    if (!empty($macAddress)) {
        $macAddress = strtoupper(str_replace(":", "-", $macAddress));
    } else {
//            //先显示操作系统名,以便查找问题
//            $macAddress = $osType;
    }

    return $macAddress;
}

function getMacAddressForWindows()
{
    $returnArray = null;
    try {
        @exec("ipconfig /all", $returnArray);

        if (!$returnArray) {
            $ipconfig = $_SERVER["WINDIR"] . "\system32\ipconfig.exe";
            if (is_file($ipconfig))
                @exec($ipconfig . " /all", $returnArray);
            else
                @exec($_SERVER["WINDIR"] . "\system\ipconfig.exe /all", $returnArray);
        }
    } catch (Exception $ex) {
        $ex->getMessage();
    }

    return $returnArray;
}


function getMacAddressForLinux()
{
    $returnArray = null;
    try {
        @exec("ifconfig -a", $returnArray);
    } catch (Exception $ex) {
        $ex->getMessage();
    }
    return $returnArray;
}

function getClientMacAddress()
{
    @exec("arp -a", $array); //执行arp -a命令，结果放到数组$array中

    $mac = null;
    foreach ($array as $value) {
        if ( //匹配结果放到数组$mac_array
            strpos($value, $_SERVER["REMOTE_ADDR"]) &&
            preg_match("/(:?[0-9a-f]{2}[:-]){5}[0-9a-f]{2}/i", $value, $mac_array)
        ) {
            $mac = $mac_array[0];
            break;
        }
    }
    return $mac; //输出客户端MAC
}
