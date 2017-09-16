/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : 0613555

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-09-16 23:10:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `dbl_activity`
-- ----------------------------
DROP TABLE IF EXISTS `dbl_activity`;
CREATE TABLE `dbl_activity` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `litpic` varchar(500) DEFAULT NULL,
  `content` text,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `ord` smallint(4) NOT NULL DEFAULT '0',
  `addtime` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='活动列表';

-- ----------------------------
-- Records of dbl_activity
-- ----------------------------
INSERT INTO `dbl_activity` VALUES ('1', '新老会员首存   大赠送', 'uploads/01.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('2', '免费下载  澳门金沙娱乐场APP', 'uploads/02.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('3', '推荐好友  玩游戏', 'uploads/03.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('4', '笔笔跳槽金  拯救不开心', 'uploads/04.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('5', '电子主题优惠  玩赚老虎机', 'uploads/05.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('6', '彩票游戏  智勇大闯关', 'uploads/06.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('7', '彩票大派送  超级奖上奖', 'uploads/07.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('8', '真人视讯  闯关送惊喜', 'uploads/08.jpg', '&lt;p&gt;活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活动详情内容，活&lt;/p&gt;', '1', '0', null);

-- ----------------------------
-- Table structure for `dbl_admin`
-- ----------------------------
DROP TABLE IF EXISTS `dbl_admin`;
CREATE TABLE `dbl_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `admin_password` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL DEFAULT '',
  `admin_number` bigint(20) DEFAULT '0',
  `admin_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态，1正常，0禁用',
  `admin_remark` varchar(64) CHARACTER SET utf8 COLLATE utf8_esperanto_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员';

-- ----------------------------
-- Records of dbl_admin
-- ----------------------------
INSERT INTO `dbl_admin` VALUES ('1', 'root', 'a9a708eebbfd48267afb1f146caf5229', '7', '1', null);

-- ----------------------------
-- Table structure for `dbl_content`
-- ----------------------------
DROP TABLE IF EXISTS `dbl_content`;
CREATE TABLE `dbl_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL COMMENT '账号',
  `activeId` smallint(2) DEFAULT NULL COMMENT '申请项ID',
  `activeName` varchar(100) NOT NULL COMMENT '申请项名称',
  `orderId` varchar(100) DEFAULT NULL,
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='申请表';

-- ----------------------------
-- Records of dbl_content
-- ----------------------------
