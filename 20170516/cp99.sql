/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : cp99

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-05-19 17:25:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cp99_admin`
-- ----------------------------
DROP TABLE IF EXISTS `cp99_admin`;
CREATE TABLE `cp99_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `admin_password` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL DEFAULT '',
  `admin_number` bigint(20) DEFAULT '0',
  `admin_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态，1正常，0禁用',
  `admin_remark` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员';

-- ----------------------------
-- Records of cp99_admin
-- ----------------------------
INSERT INTO `cp99_admin` VALUES ('1', 'root', 'e10adc3949ba59abbe56e057f20f883e', '1', '1', null);

-- ----------------------------
-- Table structure for `cp99_content`
-- ----------------------------
DROP TABLE IF EXISTS `cp99_content`;
CREATE TABLE `cp99_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL COMMENT '账号',
  `activeId` smallint(2) DEFAULT NULL COMMENT '申请项ID',
  `activeName` varchar(100) NOT NULL COMMENT '申请项名称',
  `buteNameList` varchar(255) DEFAULT NULL,
  `attr` varchar(255) DEFAULT NULL COMMENT '申请审核内容',
  `pict` varchar(255) DEFAULT NULL,
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='申请表';

-- ----------------------------
-- Records of cp99_content
-- ----------------------------
INSERT INTO `cp99_content` VALUES ('1', 'tianker009', '5', '修改银行名称', '真实姓名,银行卡卡号,旧银行名称,新银行名称,', '真实姓名:夏天 银行卡卡号:6212261001049027086 旧银行名称:招商 新银行名称:工商 ', 'uploads/201705/20170519170320_463.jpg;', '1', '您好，已经为您修改 好了', '1', 'root', '1', '0', '1495184600', '127.0.0.1', '1495185549', '127.0.0.1');
