/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : cp99

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-05-17 18:23:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cp99_admin`
-- ----------------------------
DROP TABLE IF EXISTS `cp99_admin`;
CREATE TABLE `cp99_admin` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `admin_password` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL DEFAULT 'e10adc3949ba59abbe56e057f20f883e',
  `user_classify` bigint(20) unsigned DEFAULT '1',
  `admin_number` bigint(20) NOT NULL,
  `admin_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态，1正常，0禁用',
  `admin_remark` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='管理员';

-- ----------------------------
-- Records of cp99_admin
-- ----------------------------
INSERT INTO `cp99_admin` VALUES ('2', 'root', 'e10adc3949ba59abbe56e057f20f883e', '0', '3', '1', '');
INSERT INTO `cp99_admin` VALUES ('4', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '0', '1', '0', '');

-- ----------------------------
-- Table structure for `cp99_content`
-- ----------------------------
DROP TABLE IF EXISTS `cp99_content`;
CREATE TABLE `cp99_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL COMMENT '账号',
  `activeId` smallint(2) DEFAULT NULL COMMENT '申请项ID',
  `activeName` varchar(100) NOT NULL COMMENT '申请项名称',
  `content` varchar(255) DEFAULT NULL COMMENT '申请审核内容',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '状态，0等待审核，1成功办理，2已拒绝',
  `tips` varchar(200) DEFAULT NULL COMMENT '回复内容',
  `userId` int(11) DEFAULT NULL COMMENT '回复UID',
  `userName` varchar(50) DEFAULT NULL COMMENT '回复人账号',
  `is_reply` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否回复',
  `is_del` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `addTime` int(10) NOT NULL COMMENT '申请时间',
  `ipaddr` char(30) DEFAULT NULL COMMENT '申请人所在IP',
  `updateTime` int(10) DEFAULT NULL COMMENT '审核时间',
  `updateIp` char(30) DEFAULT NULL COMMENT '审核IP',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='申请表';

-- ----------------------------
-- Records of cp99_content
-- ----------------------------
INSERT INTO `cp99_content` VALUES ('1', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '0', '', null, null, '0', '1', '1495016236', '127.0.0.1', null, null);
INSERT INTO `cp99_content` VALUES ('2', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '0', '', null, null, '0', '1', '1495016236', '127.0.0.1', null, null);
INSERT INTO `cp99_content` VALUES ('3', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '0', '', null, null, '0', '1', '1495016251', '127.0.0.1', null, null);
