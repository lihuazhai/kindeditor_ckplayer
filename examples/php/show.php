<?php
include "config.php";

$conn = new MySQLi($mydbhost, $mydbuser, $mydbpw, $mydbname);
if (!$conn) {
	die("连接失败！" . $conn->connect_error);
}
$conn->query("SET NAMES " . $mydbcharset);

$getId = $_GET['id'];
$sql = "SELECT * FROM `article` WHERE id = " . $getId;
$result = $conn->query($sql);

$row = $result->fetch_assoc();

$conn->close();
?>
<!DOCTYPE HTML>
<html>
	<head>
        <meta charset="utf-8" />
        <title>展示播放效果</title>
        <script src="//cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
<!--         <script charset="utf-8" src="../kindeditor/plugins/kindCkplayer/ckplayer/ckplayer.js"></script>
        <script charset="utf-8" src="../kindeditor/plugins/kindCkplayer/callCkplayer.js"></script> -->

        <script charset="utf-8" src="http://www.lihuazhai.com/qihang/share/kindCkplayer/ckplayer/ckplayer.js"></script>
        <script charset="utf-8" src="../../kindeditor/plugins/kindCkplayer/callCkplayer.js"></script>

        <style>
        .title { margin-bottom:10px;}
        .content {}
        </style>
	</head>
	<body>
		<p>发布后播放效果如下：</p>
		<div class="title"><?php echo $row['title'] ?></div>
		<div class="content">
        	<?php echo $row['content'] ?>
		</div>
                <br/>
                <a href="./edit.php?id=<?php echo $row['id'] ?>">点击查看编辑时的效果</a>
	</body>
</html>
