# 配置说明
> 澳门威尼斯人

## Build Setup

1、创建数据
2、导入数据文件 0613555.sql
3、修改数据库配置,backend\include\init.php

``` bash
  //数据库配置信息
define('DB_HOST', 'localhost:3306');//数据库链接地址
define('DB_USER', 'root');//数据库用户名
define('DB_PASS', '123456');//数据库密码
define('DB_NAME', '0613555');//数据库名称
```
4、登录后台修改用户密码
http://xxxx.com/backend/index.php?m=login
root 321456

5、更新html页面，本次将前台页面生成静态页面了。
如有更新请修改首页模板backend\html.php
详情页面模板backend\activity.php
