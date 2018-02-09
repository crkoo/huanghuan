ALTER TABLE `dbl_content`
ADD COLUMN `loss`  varchar(20) NULL COMMENT '亏损金额' AFTER `orderId`;

ALTER TABLE `dbl_activity`
ADD COLUMN `form_title`  varchar(100) NULL COMMENT '表单名称' AFTER `content`;
ALTER TABLE `dbl_activity`
ADD COLUMN `form_title2`  varchar(100) NULL COMMENT '表单二' AFTER `form_title`;

ALTER TABLE `dbl_content`
MODIFY COLUMN `loss`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '亏损金额' AFTER `orderId`,
ADD COLUMN `loss2`  varchar(100) NULL AFTER `loss`;


ALTER TABLE `dbl_activity`
ADD COLUMN `is_apply`  tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否需要申请优惠活动，0不需要，1需要' AFTER `form_title2`,
ADD COLUMN `apply_number`  int(10) NOT NULL DEFAULT 0 COMMENT '可以申请次数，0表示不限制' AFTER `is_apply`;

