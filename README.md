#kindeditor_ckplayer
====
基于kindeditor的网页视频播放插件(kindCkplayer),实现在kindeditor富文本编辑器上插入ckplayer播放器.
问题咨询：www.lihuazhai.com

##代码修改

如果不想覆盖原来文件，可以动手手工改代码来实现：
default.css 443行 加

``` /*插入视频*/
.ke-icon-insertVideo {
	background: url(ckplayer.png) 0px 0px;
	width: 16px;
	height: 16px;
``` }

* upload_json.php

``` //文件保存目录路径
$save_path = $php_path . '../../upload/';
//文件保存目录URL
$save_url = $php_url . '../../upload/';
'media' => array('swf', 'flv', 'mp3','mp4','wav', 'wma', 'wmv', 'mid', 'avi', 'mpg', 'asf', 'rm', 'rmvb'),
//最大文件大小
$max_size = 100000000;
$index = strrpos($file_name,".");
	$name = substr($file_name,0,$index);//纯文件名称
	//新文件名
	$new_file_name = $name . '_' . date("YmdHis") . '_' . rand(10000, 99999) . '.' . $file_ext; ```

* file_manager_json.php 改路径

>//根目录路径，可以指定绝对路径，比如 /var/www/attached/
> $root_path = $php_path . '../../upload/';
> //根目录URL，可以指定绝对路径，比如 http://www.yoursite.com/attached/
> $root_url = $php_url . '../../upload/';

##使用说明：
1. 解压文件夹放置网站跟目录；
2. 显示页面需引入 ckPlayer 播放器的调用代码 如：
```<script src="//cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
<script charset="utf-8" src="http://www.lihuazhai.com/qihang/share/kindCkplayer/ckplayer/ckplayer.js"></script>
<script charset="utf-8" src="http://www.lihuazhai.com/qihang/share/kindCkplayer/callCkplayer.js"></script>
```
路径要写正确的实际路径。

 * 2.建立数据库;
注意 目录命名和视频文件名不能出现‘ckplayer’；

