/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

// google code prettify: http://google-code-prettify.googlecode.com/
// http://google-code-prettify.googlecode.com/

KindEditor.plugin('code', function(K) {
	var self = this, name = 'code';
	self.clickToolbar(name, function() {
		var lang = self.lang(name + '.'),
			html = ['<div style="padding:10px 20px;">',
				'<div class="ke-dialog-row ke-header">',
				'<select class="ke-code-type">',
				'<option value="js">JavaScript</option>',
				'<option value="html">HTML</option>',
				'<option value="css">CSS</option>',
				'<option value="php">PHP</option>',
				'<option value="pl">Perl</option>',
				'<option value="py">Python</option>',
				'<option value="rb">Ruby</option>',
				'<option value="java">Java</option>',
				'<option value="vb">ASP/VB</option>',
				'<option value="cpp">C/C++</option>',
				'<option value="cs">C#</option>',
				'<option value="xml">XML</option>',
				'<option value="bash">Shell</option>',
				'<option value="">Other</option>',
				'</select>',
				'<div class="ke-right">',
				'<label for="keReplaceFlag">' + lang.ifNeedRun + '</label>',
				'</div>',
				'<div class="ke-clearfix"></div>',
				'</div>',
				'<textarea class="ke-textarea" style="width:408px;height:260px;"></textarea>',
				'</div>'
			].join(''),
			dialog = self.createDialog({
				name: name,
				width: 450,
				title: self.lang(name),
				body: html,
				yesBtn: {
					name: self.lang('yes'),
					click: function(e) {
						var type = K('.ke-code-type', dialog.div).val(),
							code = textarea.val(),
							cls = type === '' ? '' : ' lang-' + type,
							html = '<div style="border:1px solid #ccc;width:95%;"><pre class="brush:' + type + ';" >' + K.escape(code) + '</pre></div>';
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			textarea = K('textarea', dialog.div);
			textarea[0].focus();
			//隐藏，显示代码可以运行提示
		var selectBox = K('select', dialog.div);
			K('label', dialog.div)[0].style.display = 'none';
		selectBox.change(function() {
			var type = K('.ke-code-type', dialog.div).val();
			if(type == 'html'){
				K('label', dialog.div)[0].style.display == 'none' ?  K('label', dialog.div)[0].style.display = 'block' : '';
			}else{
				K('label', dialog.div)[0].style.display == 'block' ?  K('label', dialog.div)[0].style.display = 'none' : '';
			}
		});
	});
});
