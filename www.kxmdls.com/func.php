<?php
/**
 * Created by adophper.com
 * User: adophper
 * Date: 15-03-26
 * Time: 下午11:53
 */
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
}

/**
 * @param $url
 * @param string $file
 * @param int $timeout
 * @return bool|mixed|string
 */
function downFile($url, $file="", $timeout=60) {
    $file = empty($file) ? pathinfo($url,PATHINFO_BASENAME) : $file;
    $dir = pathinfo($file,PATHINFO_DIRNAME);
    !is_dir($dir) && @mkdir($dir,0755,true);
    $url = str_replace(" ","%20",$url);
    if(function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $temp = curl_exec($ch);
        if(@file_put_contents($file, $temp) && !curl_error($ch)) {
            return $file;
        } else {
            return false;
        }
    } else {
        $opts = array( "http"=>array( "method"=>"GET", "header"=>"", "timeout"=>$timeout) );
        $context = stream_context_create($opts);
        if(@copy($url, $file, $context)) {
            //$http_response_header
            return $file;
        } else {
            return false;
        }
    }
}
function execute( $url, $output_width=60,$output_height=60,$saveDir=false,$suffix='_thumb'){
    if(!file_exists($url)) {
        $img_arr = explode('/', $url);
        $url = downFile($url, $_SERVER['DOCUMENT_ROOT'].$saveDir.end($img_arr));
    }//判断远程文件@fopen( $url, 'r' )
    $img_info = getimagesize($url);   //得到图像的大小
    list($width, $height)=$img_info;

    if( ($width / $height) >= ($output_width / $output_height) )
    {
        $ori_img=array(
            'x' => ceil(($width-$height*$output_width/$output_height)/2) ,
            'y' => 0,
            'w' => ceil($height*$output_width/$output_height) ,
            'h' => $height);
        $op_img=array(
            'x' => 0,
            'y' => 0,
            'w' => $output_width,
            'h' => $output_height);
    }
    else
    {
        $ori_img=array(
            'x' => 0,
            'y' => ceil(($height-$width*$output_height/$output_width)/2),
            'w' => $width,
            'h' => ceil($width*$output_height/$output_width) );
        $op_img=array(
            'x' => 0,
            'y' => 0,
            'w' => $output_width,
            'h' => $output_height);
    }

    switch($img_info[2]){ //取得图片的格式
        case 1:$src=imagecreatefromgif($url);break;
        case 2:$src=imagecreatefromjpeg($url);break;
        case 3:$src=imagecreatefrompng($url);break;
        default:return false;//未知的文件格式
    }
    $dst = imagecreatetruecolor($output_width, $output_height); //新建一个真彩色图像
    imagecopyresampled($dst, $src, $op_img['x'], $op_img['y'], $ori_img['x'], $ori_img['y'], $op_img['w'], $op_img['h'], $ori_img['w'], $ori_img['h']);        //重采样拷贝部分图像并调整大小
    if($saveDir!=false){
        $filename = explode('/' , $url);
        $filename = end($filename);
        $saveDir = $_SERVER['DOCUMENT_ROOT']."/".$saveDir."/".$filename.$suffix.".jpg";
    }else{
        header('Content-Type: image/jpeg');
        $saveDir = null;
    }
    imagejpeg($dst,$saveDir,100);
    imagedestroy($src);
    imagedestroy($dst);
    return $saveDir;
}

//获取图片地址
function _stripimages($document)
{
    preg_match_all('/<\s*img\s.*?src\s*=\s*			# find <img src=
						([\"\'])?					# find single or double quote
						(?(1) (.*?)\\1 | ([^\s\>]+))		# if quote found, match up to next matching
													# quote, otherwise match up to next space
						/isx',$document,$links);


    // catenate the non-empty matches from the conditional subpattern

    while(list($key,$val) = each($links[2]))
    {
        if(!empty($val))
            $match[] = $val;
    }

    while(list($key,$val) = each($links[3]))
    {
        if(!empty($val))
            $match[] = $val;
    }

    // return the links
    return $match;
}

/**/
function curl_post($url, $postFields = null){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FAILONERROR, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    //https 请求
    if(strlen($url) > 5 && strtolower(substr($url,0,5)) == "https" ) {
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    }
//    if(empty($postFields)){
//        $header = array(
//            "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36",
//            "Accept: */*",
//            "Accept-Encoding:gzip,deflate,sdch",
//            "Accept-Language:zh-CN,zh;q=0.8,en;q=0.6",
//            "Connection:keep-alive",
//            "Host:www.baidu.com",
//            "Referer:http://www.baidu.com/"
//        );
//    }

    if (is_array($postFields) && 0 < count($postFields))
    {
        $postBodyString = "";
        $postMultipart = false;
        foreach ($postFields as $k => $v)
        {
            if("@" != substr($v, 0, 1))//判断是不是文件上传
            {
                $postBodyString .= "$k=" . urlencode($v) . "&";
            }
            else//文件上传用multipart/form-data，否则用www-form-urlencoded
            {
                $postMultipart = true;
            }
        }
        unset($k, $v);
        curl_setopt($ch, CURLOPT_POST, true);
        if ($postMultipart)
        {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        }
        else
        {
            curl_setopt($ch, CURLOPT_POSTFIELDS, substr($postBodyString,0,-1));
        }
    }
//    if ($header){
//        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
//    }
    $reponse = curl_exec($ch);
//
    if (curl_errno($ch))
    {
        throw new Exception(curl_error($ch),0);
    }
    else
    {
        $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (200 !== $httpStatusCode)
        {
            throw new Exception($reponse,$httpStatusCode);
        }
    }
    curl_close($ch);
    return $reponse;
}
/*判断是否微信内部浏览*/
function is_weixin(){
    if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
        return true;
    }
    return false;
}

/*非微信浏览提示*/
function weixin_tips($method=null){
    if (!is_weixin()){
        if ($method == 'view_json'){
            outputJson(1001,'请在微信客户端打开链接');
        }else {
            echo '<h3 style="margin: 10px auto; padding: 10px 0; color:#ff0000; text-align: center;">请在微信客户端打开链接</h3>';
        }
        exit;
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
        header("Location: ".$url);
        exit;
    }
}