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
        <title>更新</title>
        <script src="//cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
        <link rel="stylesheet" href="../../kindeditor/themes/default/default.css" />
        <script charset="utf-8" src="../../kindeditor/kindeditor.js"></script>
        <script charset="utf-8" src="../../kindeditor/lang/zh_CN.js"></script>
<script>
        KindEditor.lang({
            'kindCkplayer' : '插入视频',
                'kindCkplayer.url' : 'URL',
                'kindCkplayer.width' : '宽度',
                'kindCkplayer.height' : '高度',
                'kindCkplayer.autostart' : '自动播放',
                'kindCkplayer.upload' : '上传',
                'kindCkplayer.viewServer' : '文件空间',
        });

    KindEditor.ready(function(K) {
        window.editor = K.create('#editor_id',{
                items : ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
                'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                'anchor', 'link', 'unlink', '|', 'about','kindCkplayer'],
                'cssData':'.ke-logo-ckplayer{width: 121px;height: 75px;background-image: url(../../kindeditor/themes/default/ckplayer.jpg);background-repeat: no-repeat;background-position: center center;border: 1px solid #AAA;} .ckplayerMsg{display: none;}'
        });
    });
</script>
<style>
.ke-icon-kindCkplayer {
    background-image: url(../../kindeditor/themes/default/ckplayer.png);
    background-position: 0px 0px;
    width: 16px;
    height: 16px;
}
</style>
	</head>
	<body>
	<p>编辑状态如下：</p>
        <input type="" name="title" style="height: 30px; width: 300px;margin-bottom:10px; " value="<?php echo $row['title'] ?>" />
	<div class="content">
         <textarea id="editor_id" name="content" style="width:700px;height:480px;">
          <?php echo $row['content'] ?>
        </textarea>
	</div>
	</body>
</html>
