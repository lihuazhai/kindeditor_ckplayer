/*******************************************************************************
* 基于jquery
*
* @author yangxiaoxu <lihuazhai_com@163.com>
* @website http://www.lihuazhai.com/
* @version 1.0.0 (2016-10-27)
*******************************************************************************/
$(document).ready(function() {
	var _codeTransform = function(obj) {
		var id = $(obj).attr("id");
		var fileUrl = $(obj).find(".ckplayer-src").text();
		var autoStart = $(obj).find(".ckplayer-autostart").text();
		var width = $(obj).find(".ckplayer-width").text();
		var height = $(obj).find(".ckplayer-height").text();

		var callHtml = '<div id="' + id + '"></div>';
		callHtml += "<script type='text/javascript'>";
		callHtml += "var flashvars={f:'" + fileUrl + "',p:'" + autoStart + "',c:0,b:1};";
		callHtml += "var video=['" + fileUrl + "->video/mp4','http://www.ckplayer.com/webm/0.webm->video/webm','http://www.ckplayer.com/webm/0.ogv->video/ogg'];";
		callHtml += "CKobject.embed('http://www.lihuazhai.com/qihang/share/kindCkplayer/ckplayer/ckplayer.swf','" + id + "','ckplayer_" + id + "','" + width + "','" + height + "',false,flashvars,video);";
		callHtml += "</script>";

		$(obj).html(callHtml);
		$(obj).removeAttr("style");
	}
	var init = function() {
		var ckObjList = $(".ckplayerMsg");
		$.each(ckObjList, function(index, data) {
			_codeTransform($(this));
		})
	}
	init();
});