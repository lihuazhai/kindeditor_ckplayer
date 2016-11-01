<?php
header("Content-Type: text/html; charset=utf-8");

include "config.php";
$conn = new MySQLi($mydbhost, $mydbuser, $mydbpw, $mydbname);
if (!$conn) {
	die("连接失败！" . $conn->connect_error);
}

$conn->set_charset("utf8");

if (isset($_POST['title']) && isset($_POST['content'])) {
	$sql = "INSERT INTO article (id,title,content) VALUES ('', '" . $_POST['title'] . "', '" . $_POST['content'] . "')";
	$result = $conn->query($sql);
	$lastID = $conn->insert_id;
	echo $lastID;
	echo "插入成功~！";

	$url = "show.php?id=" . $lastID;
	echo "<script language='javascript' type='text/javascript'>";
	echo "window.location.href='$url'";
	echo "</script>";

	//header("Location: show.php?id=" . $getId);
}
$conn->close();
?>