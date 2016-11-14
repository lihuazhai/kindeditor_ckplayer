/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2013 kindsoft.net
*
* @author yangxiaoxu <lihuazhai_com@163.com>
* @website http://www.lihuazhai.com/
* @version 1.0.0 (2016-10-27)
*******************************************************************************/
KindEditor.plugin('kindCkplayer', function(K) {
	var self = this,
		name = 'kindCkplayer',
		lang = self.lang(name + '.'),
		allowMediaUpload = K.undef(self.allowMediaUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');

	var insertVideo = function(options) {
		var html = [
			'<div style="padding:20px;">',
			//url
			'<div class="ke-dialog-row">',
			'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
			'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
			'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
			'</span>',
			'</div>',
			//width
			'<div class="ke-dialog-row">',
			'<label for="keWidth" style="width:60px;">' + lang.width + '</label>',
			'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" />',
			'</div>',
			//height
			'<div class="ke-dialog-row">',
			'<label for="keHeight" style="width:60px;">' + lang.height + '</label>',
			'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" />',
			'</div>',
			//autostart
			'<div class="ke-dialog-row">',
			'<label for="keAutostart">' + lang.autostart + '</label>',
			'<input type="checkbox" id="keAutostart" name="autostart" value="" /> ',
			'</div>',
			'</div>'
		].join('');
		//插入视频后显示样式
		var _editorShow = function(blankPath, attrs) {
			var html = [
				'<div class="ckplayerMsg" id="' + attrs.id + '" style="display:none;">',
				'<span class="ckplayer-src">' + attrs.src + '</span>',
				'<span class="ckplayer-autostart">' + attrs.autostart + '</span>',
				'<span class="ckplayer-width">' + attrs.width + '</span>',
				'<span class="ckplayer-height">' + attrs.height + '</span>',
				'</div>',
				'<img class="ke-logo-ckplayer" src="' + blankPath + '" style="width:' + attrs.width + 'px; height:' + attrs.height + 'px"/>',
			].join('');
			return html;
		};
		var dialog = self.createDialog({
			name: name,
			width: 450,
			height: 230,
			title: self.lang(name),
			body: html,
			yesBtn: {
				name: self.lang('yes'),
				click: function(e) {
					var url = K.trim(urlBox.val()),
						width = widthBox.val(),
						height = heightBox.val();
					if (url == 'http://' || K.invalidUrl(url)) {
						alert(self.lang('invalidUrl'));
						urlBox[0].focus();
						return;
					}
					if (!/^\d*$/.test(width)) {
						alert(self.lang('invalidWidth'));
						widthBox[0].focus();
						return;
					}
					if (!/^\d*$/.test(height)) {
						alert(self.lang('invalidHeight'));
						heightBox[0].focus();
						return;
					}
					var autoStart = autostartBox[0].checked ? '1' : '0';

					var timestamp = new Date().getTime(); //时间戳，解决一个页面多个播放器id重复问题 todo	

					var html = _editorShow(self.themesPath + 'common/blank.gif', {
						id: 'ck_' + timestamp,
						src: url,
						type: K.mediaType(url),
						width: width,
						height: height,
						autostart: autostartBox[0].checked ? 'true' : 'false',
						loop: 'true'
					});

					self.insertHtml(html).hideDialog().focus();
				}
			}
		});

		var div = dialog.div,
			urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div),
			autostartBox = K('[name="autostart"]', div);
		urlBox.val('http://');

		if (allowMediaUpload) {
			var uploadbutton = K.uploadbutton({
				button: K('.ke-upload-button', div)[0],
				fieldName: filePostName,
				extraParams: extraParams,
				url: K.addParam(uploadJson, 'dir=media'),
				afterUpload: function(data) {
					dialog.hideLoading();
					if (data.error === 0) {
						var url = data.url;
						if (formatUploadUrl) {
							url = K.formatUrl(url, 'absolute');
						}
						urlBox.val(url);
						if (self.afterUpload) {
							self.afterUpload.call(self, url, data, name);
						}
						alert(self.lang('uploadSuccess'));
					} else {
						alert(data.message);
					}
				},
				afterError: function(html) {
					dialog.hideLoading();
					self.errorDialog(html);
				}
			});
			uploadbutton.fileBox.change(function(e) {
				dialog.showLoading(self.lang('uploadLoading'));
				uploadbutton.submit();
			});
		} else {
			K('.ke-upload-button', div).hide();
		}

		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
						viewType: 'LIST',
						dirName: 'media',
						clickFn: function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								if (self.afterSelectFile) {
									self.afterSelectFile.call(self, url);
								}
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}

		var img = self.plugin.getSelectedMedia();
		if (img) {
			var attrs = K.mediaAttrs(img.attr('data-ke-tag'));
			urlBox.val(attrs.src);
			widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
			heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
			autostartBox[0].checked = (attrs.autostart === 'true');
		}
		urlBox[0].focus();
		urlBox[0].select();
	};

	// 点击图标时执行
	self.clickToolbar(name, function() {
		insertVideo();
	});
});