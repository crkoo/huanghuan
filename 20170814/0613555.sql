/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : 0613555

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2017-08-15 22:35:34
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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='活动列表';

-- ----------------------------
-- Records of dbl_activity
-- ----------------------------
INSERT INTO `dbl_activity` VALUES ('1', '新会员存款三重礼', 'uploads/01.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('2', '以小博大  博出精彩 天天三次机会', 'uploads/02.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('3', '首存10元送18元', 'uploads/03.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('4', '天天现金回馈  签到彩金', 'uploads/04.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('5', '真情回馈，贴心优惠，存款送话费', 'uploads/05.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('6', '转运金周周大回馈88888元', 'uploads/06.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('7', '大满贯MW超级斗地主 1888欢乐豆', 'uploads/07.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('8', '3888元得意彩票天天领', 'uploads/08.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('9', '超级奖上奖 中奖再领13888元', 'uploads/09.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('10', '连赢期数3+   即可领大礼', 'uploads/10.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('11', '真人视讯连赢奖上再嘉奖', 'uploads/11.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('12', '玩转AG  得意金天天领', 'uploads/12.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('13', '真人视讯大闯关  关关赢好礼', 'uploads/13.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('14', '电子风暴  超级奖上奖', 'uploads/14.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('15', '电子风暴  超级奖上奖', 'uploads/15.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('16', '天天领取得意彩金  最高8888', 'uploads/16.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('17', '畅玩电子游艺赔率彩金  每日8888', 'uploads/17.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('18', '玩转老虎机  300倍幸运注单奖', 'uploads/18.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('19', '捕鱼王2代  不计输赢返8888元', 'uploads/19.jpg', '', '1', '0', null);
INSERT INTO `dbl_activity` VALUES ('20', '电子游艺组队娱乐  共赢彩金', 'uploads/20.jpg', '', '1', '0', null);

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
INSERT INTO `dbl_admin` VALUES ('1', 'root', 'a9a708eebbfd48267afb1f146caf5229', '5', '1', null);

-- ----------------------------
-- Table structure for `dbl_content`
-- ----------------------------
DROP TABLE IF EXISTS `dbl_content`;
CREATE TABLE `dbl_content` (
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='申请表';

-- ----------------------------
-- Records of dbl_content
-- ----------------------------
INSERT INTO `dbl_content` VALUES ('1', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '1', '', null, null, '0', '0', '1495016236', '127.0.0.1', null, null);
INSERT INTO `dbl_content` VALUES ('2', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '1', '', null, null, '0', '0', '1495016236', '127.0.0.1', null, null);
INSERT INTO `dbl_content` VALUES ('3', 'gfds', '4', '修改会员登入密码', 'gfdsgfds', '1', '', null, null, '0', '0', '1495016251', '127.0.0.1', null, null);
INSERT INTO `dbl_content` VALUES ('4', 'tes', '6', '忘记会员账号', 'dsafda', '1', '3q', null, null, '1', '0', '1495029337', '127.0.0.1', '1495029465', '127.0.0.1');
INSERT INTO `dbl_content` VALUES ('5', 'forgt', '6', '忘记会员账号', '我的账号忘记了，邮箱是hello', '1', 'ok', null, null, '1', '0', '1495029380', '127.0.0.1', '1495029457', '127.0.0.1');
INSERT INTO `dbl_content` VALUES ('6', 'fda', '1', '会员账号解冻', 'fdsa', '1', 'ok', null, null, '1', '0', '1495029498', '127.0.0.1', '1495029519', '127.0.0.1');
INSERT INTO `dbl_content` VALUES ('7', 'lq20001008', '5', '修改银行名称', '真实姓名:李琴 银行卡卡号:6215582316003623281 旧银行名称:中国银行 新银行名称:工商银行', '1', '您好，已经为您修改成功了哦！', '2', 'root', '1', '0', '1495029587', '127.0.0.1', '1495029698', '127.0.0.1');
INSERT INTO `dbl_content` VALUES ('8', 'xb1230', '4', '修改会员登入密码', '真实姓名:许斌 银行卡卡号:6216608100001151943', '1', '您好，您的密码已经为您修改成了ss123456，请您登陆之后点击会员中心及时修改您的密码，尽量控制在10位数内/由数字及字母组成的密码，顺便同步下您的MG密码哦，非常感谢您对我司的支持与信赖，祝您生活愉快，玩的开心，赢得精彩！', '2', 'root', '1', '0', '1495029735', '127.0.0.1', '1495029754', '127.0.0.1');
INSERT INTO `dbl_content` VALUES ('9', 'buzhidao8', '12', '修改银行账号', '真实姓名:张洪朝 旧银行卡卡号:6221884930016425741 新银行卡卡号:6222022402014939488 新银行卡所属银行:中国工商银行 新卡号开户地址:河南洛阳分支行', '1', '已经为您修改 好了哦', '2', 'root', '1', '0', '1495029779', '127.0.0.1', '1495029794', '127.0.0.1');
