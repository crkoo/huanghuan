<?php

/**
 * 1.第三方回复加密消息给平台；
 * 2.第三方收到平台发送的消息后对消息进行解密。
 */
class MessageCrypt
{
    const ENCRYPT_MODE_NONE = "0";
    const ENCRYPT_MODE_AES = "1";
    const ENCRYPT_MODE_DES = "2";

	private $encodingKey;

	/**
	 * 构造函数
	 * @param $encodingKey string 平台上设置的加密密钥
	 */
	public function __construct($encodingKey)
	{
		$this->encodingKey = $encodingKey;
	}

	/**
	 * 将平台发送给用户的消息进行加密处理。
	 * <ol>
	 *    <li>对要发送的消息进行加密处理</li>
	 * </ol>
	 *
     * @param $encryptMode string 加密模式，0：无，1：AES，2：DES
	 * @param $message string 平台待回复用户的消息
	 * @param &$encryptMsg string 加密后的可以直接回复用户的密文
	 *                      当return返回0时有效
	 *
	 * @return int 成功0，失败返回对应的错误码
	 */
	public function encryptMsg($encryptMode, $message, &$encryptMsg)
	{
        if ($encryptMode == self::ENCRYPT_MODE_NONE) {
            $encryptMsg = $message;
            return CryptErrorCode::OK;
        }
        else {
            if ($encryptMode == self::ENCRYPT_MODE_AES)
                $pc = new AES();
            else if ($encryptMode == self::ENCRYPT_MODE_DES)
                $pc = new DES();

            $pc->setSecretKey($this->encodingKey);

            //加密
            $array = $pc->encrypt($message);
            $ret = $array[0];
            if ($ret != CryptErrorCode::OK) {
                return $ret;
            }

            $encryptMsg = $array[1];
            return CryptErrorCode::OK;
        }
	}


	/**
	 * 将平台接收到的消息进行解密处理。
	 * <ol>
	 *    <li>对消息进行解密</li>
	 * </ol>
	 *
     * @param $encryptMode string 加密模式，0：无，1：AES，2：DES
	 * @param $encryptMsg string 密文，对应POST请求的数据
	 * @param &$message string 解密后的原文，当return返回0时有效
	 *
	 * @return int 成功0，失败返回对应的错误码
	 */
	public function decryptMsg($encryptMode,$encryptMsg, &$message)
	{
        if ($encryptMode == self::ENCRYPT_MODE_NONE) {
            $message = $encryptMsg;
            return CryptErrorCode::OK;
        }
        else {
            if ($encryptMode == self::ENCRYPT_MODE_AES)
                $pc = new AES();
            else if ($encryptMode == self::ENCRYPT_MODE_DES)
                $pc = new DES();

            $pc->setSecretKey($this->encodingKey);

            $result = $pc->decrypt($encryptMsg);
            if ($result[0] != CryptErrorCode::OK) {
                return $result[0];
            }

            $message = $result[1];

            return CryptErrorCode::OK;
        }
	}
}

class AES
{
    //CRYPTO_CIPHER_BLOCK_SIZE 32

    private $_secret_key = 'default_secret_key';

    public function setSecretKey($encodingKey) {
        $this->_secret_key = $encodingKey;
    }

    public function encrypt($data) {
        try {
            $md5Result = md5($this->_secret_key);
            $key = mb_substr($md5Result, 0, 16);
            $iv = mb_substr($md5Result, 16, 16);
            $result = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv));
            return array(CryptErrorCode::OK, $result);
        } catch (Exception $e) {
            //print $e;
            return array(CryptErrorCode::ENCRYPT_ERROR, null);
        }
    }

    public function decrypt($data)
    {
        try {
            $data = base64_decode($data);
            $md5Result = md5($this->_secret_key);
            $key = mb_substr($md5Result, 0, 16);
            $iv = mb_substr($md5Result, 16, 16);
            $result = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_CBC, $iv);
            $result = str_replace("\0","",$result);
            return array(CryptErrorCode::OK, $result);
        } catch (Exception $e) {
            //print $e;
            return array(CryptErrorCode::DECRYPT_ERROR, null);
        }
    }
}


class DES
{
    var $key;
    var $iv; //偏移量

    public function setSecretKey($encodingKey , $iv=0) {
        $this->key = substr(md5($encodingKey), 0, 8);
        if( $iv == 0 ) {
            $this->iv = $this->key;
        } else {
            $this->iv = $iv; //mcrypt_create_iv ( mcrypt_get_block_size (MCRYPT_DES, MCRYPT_MODE_CBC), MCRYPT_DEV_RANDOM );
        }
    }



    public function encrypt($str) {
        try {
            //加密，返回大写十六进制字符串
            $size = mcrypt_get_block_size(MCRYPT_DES);
            $str = $this->pkcs5Pad($str, $size);
            $result = strtoupper(bin2hex(mcrypt_encrypt(MCRYPT_DES, $this->key, $str, MCRYPT_MODE_CBC, $this->iv ) ) );
            return array(CryptErrorCode::OK, $result);
        } catch (Exception $e) {
            //print $e;
            return array(CryptErrorCode::ENCRYPT_ERROR, null);
        }
    }

    function decrypt($str) {
        try {
            //解密
            $strBin = $this->hex2bin( strtolower( $str ) );
            $str = mcrypt_decrypt(MCRYPT_DES, $this->key, $strBin, MCRYPT_MODE_CBC, $this->iv );
            $result = $this->pkcs5Unpad( $str );
            return array(CryptErrorCode::OK, $result);
        } catch (Exception $e) {
            //print $e;
            return array(CryptErrorCode::DECRYPT_ERROR, null);
        }
    }

    private function hex2bin($hexData) {
        $binData = "";
        for($i = 0; $i < strlen ( $hexData ); $i += 2) {
            $binData .= chr ( hexdec ( substr ( $hexData, $i, 2 ) ) );
        }
        return $binData;
    }

    private function pkcs5Pad($text, $blocksize) {
        $pad = $blocksize - (strlen ( $text ) % $blocksize);
        return $text . str_repeat ( chr ( $pad ), $pad );
    }

    private function pkcs5Unpad($text) {
        $pad = ord ( $text {strlen ( $text ) - 1} );
        if ($pad > strlen ( $text ))
            return false;
        if (strspn ( $text, chr ( $pad ), strlen ( $text ) - $pad ) != $pad)
            return false;
        return substr ( $text, 0, - 1 * $pad );
    }
}

/**
 * Crypt Error Code 说明.
 * <ul>
 *    <li>-40001: 签名验证错误</li>
 *    <li>-40002: 签名失败</li>
 *    <li>-40003: 加密密钥无效</li>
 *    <li>-40004: 外部系统令牌校验错误</li>
 *    <li>-40005: 加密失败</li>
 *    <li>-40006: 解密失败</li>
 *    <li>-40007: 解密后得到的buffer非法</li>
 * </ul>
 */
class CryptErrorCode
{
    const OK = 0;
    const VALIDATE_SIGNATURE_ERROR = -40001;
    const COMPUTE_SIGNATURE_ERROR = -40002;
    const ILLEGAL_ENCODING_KEY = -40003;
    const VALIDATE_SYSTEM_KEY_ERROR = -40004;
    const ENCRYPT_ERROR = -40005;
    const DECRYPT_ERROR = -40006;
    const ILLEGAL_BUFFER = -40007;

    public static function getCryptErrorMessage($code)
    {

        switch ($code) {
            case self::VALIDATE_SIGNATURE_ERROR:
                $result = "签名验证错误";
                break;
            case self::COMPUTE_SIGNATURE_ERROR:
                $result = "签名失败";
                break;
            case self::ILLEGAL_ENCODING_KEY:
                $result = "加密密钥无效";
                break;
            case self::VALIDATE_SYSTEM_KEY_ERROR:
                $result = "外部系统令牌校验错误";
                break;
            case self::ENCRYPT_ERROR:
                $result = "加密失败";
                break;
            case self::DECRYPT_ERROR:
                $result = "解密失败";
                break;
            case self::ILLEGAL_BUFFER:
                $result = "解密后得到的buffer非法";
                break;
            default:
                $result = "OK";
                break;
        }

        return $result;
    }
}