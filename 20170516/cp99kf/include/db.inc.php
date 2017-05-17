<?php

class DbMysql
{
	private $link;

    var $queryString;
	
	function __construct($host = DB_HOST, $user = DB_USER, $pass = DB_PASS, $name = DB_NAME)
	{
		$this->link = @mysql_connect($host, $user, $pass);
		
		$flag = FALSE;
		if($this->link)
		{
			$flag = mysql_select_db($name, $this->link);
		}
		mysql_query("SET NAMES UTF8"); 
		if(!$flag)
		{
			header('Content-Type', 'text/html; charset=utf-8');
			echo '<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    </head>
    <body>
        <script type="text/javascript">
            var ua = navigator.userAgent.toLowerCase();
            var isWeixin = ua.indexOf(\'micromessenger\') != -1;
            var isAndroid = ua.indexOf(\'android\') != -1;
            var isIos = (ua.indexOf(\'iphone\') != -1) || (ua.indexOf(\'ipad\') != -1);
            if (!isWeixin) {
                document.head.innerHTML = \'<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="https://res.wx.qq.com/connect/zh_CN/htmledition/style/wap_err1a9853.css">\';
                document.body.innerHTML = \'<div class="page_msg"><div class="inner"><div class="msg_content"><h4>当前系统访问人数过多，请等会再来.</h4></div></div></div>\';
            }
        </script>
    </body>
</html>';
			exit;
		}
	}
	
	function __destruct()
	{
		$this->close();
	}
	
	public function close()
	{
		if($this->link)
		{
			@mysql_close($this->link);
		}
	}
	
	public function query($sql)
	{
        $this->queryString = $sql;
		return mysql_unbuffered_query($sql, $this->link);
	}

    public function getLastSql(){
        return $this->queryString;
    }

	public function getLineAll($sql)
	{
        $this->queryString = $sql;
		$result = mysql_query($sql, $this->link);
        $rows = array();
        if (is_resource($result)) {
            while (($row = mysql_fetch_array($result, MYSQL_ASSOC)) !== false) {
                $rows[] = $row;
            }
        }
		@mysql_free_result($result);
		return $rows;
	}
	
	public function getLine($sql)
	{
        if (!stripos($sql, 'limit')){
            $sql .= ' limit 1';
        }
        $this->queryString = $sql;
		$result = mysql_query($sql, $this->link);
        $row = "";
        if (is_resource($result)) {
            $row = mysql_fetch_array($result, MYSQL_ASSOC);
        }
		@mysql_free_result($result);
		return $row;
	}

    /**
     * 插入记录
     * @access public
     * @param mixed $data 数据
     * @param array $options 参数表达式
     * @param boolean $replace 是否replace
     * @return false | integer
     */
    public function insert($table, $data) {
        $field = $values = array();
        foreach ($data as $key=>$val){
            $field[] = "`$key`";
            $values[] = is_null($val) ? "NULL" : "'$val'";
        }
        $field = join(',', $field);
        $values = join(',', $values);
        $sql = "INSERT INTO `{$table}` ($field) VALUES ($values)";
        $this->query($sql);
        return $this->insert_id();
    }

    /**
     * 更新记录
     * @param $sql
     * @return int
     */
    public function update($table, $condition, $data, $field= 'id'){
        if (!$table) return ;
        $where = " WHERE ";
        if (!is_array($condition)){
            if (is_numeric($condition)) $where .= "`$field`='$condition'";
            else $where .= $condition;
        }else{
            $wh = array();
            foreach ($condition as $k=>$v){
                $wh[] = "`$k` = '$v'";
            }
            $where .= join(" AND ", $wh);
        }
        if (!$data) return ;
        if (!is_array($data)){
            $set = " $data";
        }else{
            $set = array();
            foreach ($data as $i=>$t){
                $set[] = "`$i` = ".(is_null($t) ? "NULL" : "'$t'");
            }
            $set = join(",",$set);
        }
        $sql = "UPDATE `$table` SET $set $where";
        return $this->query($sql);
    }

    public function count($sql){
        //if (strpos($sql, '*') && !strpos($sql, 'count(*)')) $sql = str_replace('*', 'count(*)' ,$sql);
        $this->queryString = $sql;
        $result = mysql_query($sql, $this->link);
        if (is_resource($result)) {
            $result = mysql_num_rows($result);
        }
        @mysql_free_result($result);
        return intval($result);
    }

    public function sum($sql){
        $this->queryString = $sql;
        $result = mysql_query($sql, $this->link);
        if (is_resource($result)) {
            $row = mysql_fetch_row($result);
        }
        if (isset($row[0])){
            return $row[0];
        }
        return 0;
    }

    /* *
     * @param $array
     * @return array
     * */
    public function getColumn($data, $column='id'){
        if (!is_array($data)) return $data;
        $arr = array();
        foreach ($data as $i=>$t){
            if (is_array($t)){
                $this->getColumn($t);
            }elseif($i == $column){
                $arr[] = $t;
            }
        }
        if (empty($arr)) $arr = false;
        return $arr;
    }

    public function getObject($sql)
	{
        $this->queryString = $sql;
		$result = mysql_query($sql, $this->link);
        $row = "";
        if (is_resource($result)) {
            $row = mysql_fetch_object($result);
        }
		@mysql_free_result($result);
		return $row;
	}
	
	public function getObjectAll($sql)
	{
        $this->queryString = $sql;
		$result = mysql_query($sql, $this->link);
		$rows = array();
        if(is_resource($result)) {
            while (($row = mysql_fetch_object($result)) !== false) {
                $rows[] = $row;
            }
        }
		@mysql_free_result($result);
		return $rows;
	}
	
	public function affacted_rows()
	{
		return mysql_affected_rows($this->link);
	}
	
	public function insert_id()
	{
		return mysql_insert_id($this->link);
	}
	
	public function error()
	{
		return mysql_error($this->link);
	}
	
	public function escape($str)
	{
		return mysql_escape_string($str);
	}

}