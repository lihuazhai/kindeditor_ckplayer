<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>导入数据</title>
<style type="text/css">
.form label { display: inline-block; width: 70px; }
.form li { list-style: none; margin-bottom: 10px; }
</style>
</head>
<?php
if (isset($_POST['go'])) {
	$dbHost = trim($_POST['dbHost']);
	$dbHost = empty($dbPort) || $dbPort == 3306 ? $dbHost : $dbHost . ':' . $dbPort;
	$dbUser = trim($_POST['dbUser']);
	$dbPwd = trim($_POST['dbPwd']);
	$dbPrefix = empty($_POST['dbPrefix']) ? 'lhz_' : trim($_POST['dbPrefix']);
	$dbName = "insert_video"; //数据库
	$dbCharset = 'utf8';
	$sqlFile = 'data/ckplayer.sql'; //本机导出的Sql文件

	$conn = @mysql_connect($dbHost, $dbUser, $dbPwd);
	mysql_query("SET NAMES " . $dbCharset);

	if (!$conn) {
		die('Could not connect: ' . mysql_error());
	}

	if (mysql_select_db($dbName, $conn)) {
		mysql_query("DROP DATABASE " . $dbName);
		echo "删除已经存在的旧数据库:" . $dbName . " <br>";
	}

	if (!mysql_select_db($dbName, $conn)) {
		if (!mysql_query("CREATE DATABASE IF NOT EXISTS `" . $dbName . "`;", $conn)) {
			echo '数据库 ' . $dbName . ' 不存在，也没权限创建新的数据库！';
		} else {
			echo "成功创建数据库:" . $dbName . "<br>";
		}
	}

	if (!is_readable($sqlFile)) {
		exit('数据库文件不存在或者读失败在<br>');
	} else {
		echo "读取文件成功！<br>";
	}

	mysql_select_db($dbName, $conn);

	$filesql = file_get_contents($sqlFile); //读取文件内容
	$segment = explode(";", $filesql); //通过sql语法的语句分割符进行分割

	//循环遍历数组
	foreach ($segment as $current) {
		$sql = $current;
		echo $sql;
		//$revertsql = mysql_query($sql,$conn) or die ("<br>数据库表已存在！".mysql_error());
		$revertsql = mysql_query($sql, $conn);
		if ($revertsql) {
			echo "还原成功<br>";
		} else {
			echo "还原失败<br>";
		}
	}

	echo "<p style='color:red;'>导入成功!可关闭此页面。</p>";

	//fclose($sqlFile);//关闭文件
	mysql_close($conn);
}
?>
<body>
<form action="" method="post">
	<ul class="form">
		<li>
				<label>主机：</label>
				<input name="dbHost" type="text" value="localhost" maxlength="50" />
		</li>
		<li>
				<label>端口：</label>
				<input name="dbPort" type="text" value="3306" maxlength="50" />
		</li>
		<li>
				<label>用户名：</label>
				<input name="dbUser" type="text" value="root" maxlength="50" />
		</li>
		<li>
				<label>密码：</label>
				<input name="dbPwd" type="text" maxlength="50" />
		</li>
		<li style="display:none;">
				<label>表前缀：</label>
				<input name="dbPrefix" type="lhz_" maxlength="50" />
		</li>
		<li>
				<input name="go" value="导入数据" type="submit" />
		</li>
	</ul>
</form>
</body>
</html>