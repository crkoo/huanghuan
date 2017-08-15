<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
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
// Define a destination
$targetFolder = '/uploads'; // Relative to the root

$host = 'http://'.$_SERVER['HTTP_HOST'];
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = dirname(__FILE__) . '/../../../' . $targetFolder;
	$targetFile = rtrim($targetPath,'/') . '/';
	$width = isset($_POST['width']) ? $_POST['width'] : '';
	$height = isset($_POST['height']) ? $_POST['height'] : '';
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	$newFile = time().mt_rand(1000,9999).'.'.$fileParts['extension'];
	
	if (in_array(strtolower($fileParts['extension']),$fileTypes)) {
		move_uploaded_file($tempFile,$targetFile.$newFile);
		$array = array('fileUrl'=> 'uploads/'.$newFile,'fileName'=>$fileParts['basename']);
		echo json_encode($array);
		exit;
	} else {
		echo 'Invalid file type.';
	}
}else{
	echo 'error';	
}
?>