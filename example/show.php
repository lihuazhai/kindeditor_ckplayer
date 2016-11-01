<?php
include "php/config.php";

$con = mysql_connect($mydbhost, $mydbuser,$mydbpw);
mysql_query("SET NAMES ".$mydbcharset);
if (!$con){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db($mydbname, $con);

$getId = $_GET['id'];
$sql = mysql_query("SELECT * FROM `article` WHERE id = ".$getId);
$row = mysql_fetch_array($sql);
?>
<!DOCTYPE HTML>
<html>
	<head>
        <meta charset="utf-8" />
        <title>展示播放效果</title>
        <script charset="utf-8" src="http://www.lihuazhai.com/qihang/Lib/jquery/jquery.js"></script>
        <script charset="utf-8" src="../kindeditor/plugins/insertVideo/ckplayer/ckplayer.js"></script>
        <script charset="utf-8" src="../kindeditor/plugins/insertVideo/callCkplayer.js"></script>
        <style>
        .title { margin-bottom:10px;}
        .content {}
        </style>
        <script type="text/javascript">
        var path = "/kindeditor_ckplayer";
        </script>
	</head>
	<body>
		<p>发布后播放效果如下：</p>
		<div class="title"><?php echo $row['title']?></div>	
		<div class="content">
        	<?php echo $row['content']?>
		</div>
	</body>
</html>
