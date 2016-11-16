/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : ckplayer

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-11-01 12:48:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('6', '富文本编辑器', '<div class=\"ckplayerMsg\" id=\"ck_1477975606482\">\r\n	<span class=\"ckplayer-src\">/technicalArticles/kindeditor_ckplayer/upload/media/20161101/youxi_20161101054643_17388.flv</span><span class=\"ckplayer-autostart\">false</span><span class=\"ckplayer-width\">550</span><span class=\"ckplayer-height\">400</span>\r\n</div>\r\n<img class=\"ke-logo-ckplayer\" src=\"http://localhost/technicalArticles/kindeditor_ckplayer/kindeditor/themes/common/blank.gif\" style=\"width:550px;height:400px;\" />');
