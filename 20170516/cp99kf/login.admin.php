<?phpif(isset($_POST['username']) && $_POST['username']){    $username = addslashes(trim($_POST['username']));    $password = md5(trim($_POST['password']));    $find = $db->getLine("select id,admin_name from cp99_admin WHERE admin_name='{$username}' and admin_password='{$password}'");    if(!empty($find))    {        $_SESSION['uid'] = $find['id'];        $_SESSION['nick'] = $username;        redirect('index.php?m=index');    }else{        echo '<script>alert(\'用户或密码错误！\');</script>';    }}if (isset($_SESSION['nick'])){    redirect('index.php?m=index');    exit;}include('templets/login.php');$db->close();