/*
Navicat MySQL Data Transfer

Source Server         : server1
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : nodesql

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-01-07 22:33:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for advertising
-- ----------------------------
DROP TABLE IF EXISTS `advertising`;
CREATE TABLE `advertising` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sort` int(12) DEFAULT NULL,
  `Src` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advertising
-- ----------------------------
INSERT INTO `advertising` VALUES ('1', '1', 'img/banner1_02.png');
INSERT INTO `advertising` VALUES ('2', '2', 'img/banner1_02.png');
INSERT INTO `advertising` VALUES ('3', '3', 'img/banner1_02.png');
INSERT INTO `advertising` VALUES ('4', '4', 'img/banner1_02.png');

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `src` varchar(100) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `c_name` varchar(32) DEFAULT NULL,
  `introduce` varchar(32) DEFAULT NULL,
  `classify_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('static/img/skin_03.png', '美妆护肤', '美妆护肤', 'W I N E', '1');
INSERT INTO `classify` VALUES ('static/img/skin_03.png', '美妆护肤', '美妆护肤', 'W I N E', '2');
INSERT INTO `classify` VALUES ('static/img/skin_03.png', '美妆护肤', '美妆护肤', 'W I N E', '3');
INSERT INTO `classify` VALUES ('static/img/skin_03.png', '美妆护肤', '美妆护肤', 'W I N E', '4');
INSERT INTO `classify` VALUES ('static/img/skin_03.png', '美妆护肤', '美妆护肤', 'W I N E', '5');

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('1', '4', '8', '2017-12-04 13:20:32');
INSERT INTO `collect` VALUES ('2', '2', '8', '2017-12-04 13:21:04');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(40) NOT NULL,
  `product_class` varchar(40) NOT NULL,
  `product_server` varchar(255) DEFAULT NULL,
  `wl_grade` varchar(255) DEFAULT NULL,
  `product_grade` varchar(255) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `created_time` date DEFAULT NULL,
  `goods_ID` int(10) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '还不错', '蓝色', '3.7', '5', '3', '8', '2018-01-05', '15');
INSERT INTO `comment` VALUES ('2', '还可以', '蓝色', '5', '5', '5', '21', '2018-01-05', '15');

-- ----------------------------
-- Table structure for gooddess
-- ----------------------------
DROP TABLE IF EXISTS `gooddess`;
CREATE TABLE `gooddess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(32) DEFAULT NULL,
  `sex` varchar(32) DEFAULT NULL,
  `age` varchar(32) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  `create_user` varchar(32) DEFAULT NULL,
  `update_user` varchar(32) DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `isdel` int(11) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gooddess
-- ----------------------------
INSERT INTO `gooddess` VALUES ('2', '测试3 ', '2', '44', '2017-11-28', null, null, null, null, null, null, null);
INSERT INTO `gooddess` VALUES ('3', '小红', '女', '33', '2017-12-11', 'xiaoxiao@imooc.com', '13847263876', 'ANMIN', 'ANMIN', '2017-12-11', '1', '2017-12-11');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` double(6,2) DEFAULT '0.00',
  `site` varchar(30) DEFAULT NULL,
  `imgScr` varchar(60) DEFAULT NULL,
  `salesVolume` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `grading` varchar(255) DEFAULT NULL,
  `category` varchar(32) DEFAULT NULL,
  `is_new_product` varchar(10) DEFAULT NULL,
  `is_huot` varchar(10) DEFAULT NULL,
  `sort` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1247 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('4', 'meadjson美赞臣婴儿儿A++ 配方奶粉', '324.00', '英国', 'static/img/product.png', '54', null, null, '青舒3段850g', '', 'yes', null, '5');
INSERT INTO `goods` VALUES ('15', '欧莱雅男士洁面乳', '99.00', '中国', 'static/img/goods_02.png', '23', null, null, '6段', null, 'yes', null, null);

-- ----------------------------
-- Table structure for images
-- ----------------------------
DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `images_path` varchar(100) NOT NULL,
  `image_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods` int(5) NOT NULL,
  `is_cover` varchar(32) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `created_time` date DEFAULT NULL,
  `images_name` varchar(32) NOT NULL,
  `images_size` varchar(32) DEFAULT NULL,
  `file_type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`image_id`,`images_name`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of images
-- ----------------------------
INSERT INTO `images` VALUES ('http://localhost:3006/images/1515322688483.png', '50', '15', 'undefined', null, '2018-01-07', 'goods_02.png', '165283', 'image/png');

-- ----------------------------
-- Table structure for myoder
-- ----------------------------
DROP TABLE IF EXISTS `myoder`;
CREATE TABLE `myoder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of myoder
-- ----------------------------

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `product_id` int(11) NOT NULL,
  `units` varchar(32) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `count` int(11) NOT NULL DEFAULT '0',
  `type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_details
-- ----------------------------
INSERT INTO `order_details` VALUES ('2', null, '1', '1', '2', null);
INSERT INTO `order_details` VALUES ('2', null, '1', '2', '1', null);
INSERT INTO `order_details` VALUES ('3', null, '1', '3', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '2', '4', '1', null);
INSERT INTO `order_details` VALUES ('2', null, '18', '5', '2', null);
INSERT INTO `order_details` VALUES ('4', null, '19', '6', '1', null);
INSERT INTO `order_details` VALUES ('6', null, '20', '7', '1', null);
INSERT INTO `order_details` VALUES ('2', null, '21', '8', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '21', '9', '1', null);
INSERT INTO `order_details` VALUES ('2', null, '22', '10', '2', null);
INSERT INTO `order_details` VALUES ('4', null, '22', '11', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '23', '12', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '24', '13', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '25', '14', '1', null);
INSERT INTO `order_details` VALUES ('2', null, '26', '15', '2', null);
INSERT INTO `order_details` VALUES ('4', null, '26', '16', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '27', '17', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '28', '18', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '29', '19', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '30', '20', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '31', '21', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '32', '22', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '33', '23', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '34', '24', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '35', '25', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '29', '26', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '30', '27', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '37', '28', '2', '2');
INSERT INTO `order_details` VALUES ('15', null, '38', '29', '3', '1');
INSERT INTO `order_details` VALUES ('15', null, '39', '30', '4', '2');
INSERT INTO `order_details` VALUES ('15', null, '40', '31', '2', '2');
INSERT INTO `order_details` VALUES ('15', null, '41', '32', '4', '2');
INSERT INTO `order_details` VALUES ('4', null, '42', '33', '3', null);
INSERT INTO `order_details` VALUES ('15', null, '42', '34', '3', null);
INSERT INTO `order_details` VALUES ('15', null, '42', '35', '3', null);
INSERT INTO `order_details` VALUES ('4', null, '43', '36', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '43', '37', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '43', '38', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '44', '39', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '44', '40', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '44', '41', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '45', '42', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '45', '43', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '45', '44', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '46', '45', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '46', '46', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '46', '47', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '47', '48', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '47', '49', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '48', '50', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '48', '51', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '49', '52', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '49', '53', '1', null);
INSERT INTO `order_details` VALUES ('4', null, '50', '54', '1', null);
INSERT INTO `order_details` VALUES ('15', null, '50', '55', '1', null);

-- ----------------------------
-- Table structure for order_site
-- ----------------------------
DROP TABLE IF EXISTS `order_site`;
CREATE TABLE `order_site` (
  `user_id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_default` varchar(10) DEFAULT '',
  `remark` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_site
-- ----------------------------
INSERT INTO `order_site` VALUES ('8', '广东省深圳市福田区财富大厦A冻802', '1371355258', '1', 'no', '家');
INSERT INTO `order_site` VALUES ('8', '广东省深圳市福田区财富大厦A冻802', '1371355258', '2', 'no', '家');
INSERT INTO `order_site` VALUES ('8', '广东省深圳市福田区财富大厦A冻802', '1371355258', '3', 'yes', '家');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(40) NOT NULL,
  `content` varchar(40) NOT NULL,
  `uid` varchar(40) NOT NULL,
  `moment` varchar(40) NOT NULL,
  `comments` varchar(40) NOT NULL DEFAULT '0',
  `pv` varchar(40) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------

-- ----------------------------
-- Table structure for product_cart
-- ----------------------------
DROP TABLE IF EXISTS `product_cart`;
CREATE TABLE `product_cart` (
  `product_cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `count` int(8) DEFAULT NULL,
  `goodid` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`product_cart_id`),
  KEY `用户id` (`uid`) USING BTREE,
  KEY `商品id` (`goodid`) USING BTREE,
  CONSTRAINT `商品id` FOREIGN KEY (`goodid`) REFERENCES `goods` (`id`),
  CONSTRAINT `用户id` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_cart
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'John', 'Hancock', '2017-11-10 09:39:29', '2017-11-10 09:39:29');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `pass` varchar(40) NOT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `header_portrait` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '',
  `updated_at` varchar(255) DEFAULT NULL,
  `is_admin` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('8', '123', '202cb962ac59075b964b07152d234b70', '15374035014', '小明', 'img/user-portrait.png', null, '', null, 'yes');
INSERT INTO `users` VALUES ('9', '234', '289dff07669d7a23de0ef88d2f7129e7', '234', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('10', '321', 'caf1a3dfb505ffed0d024130f58c5cfa', '15334425422', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('11', '12343', 'f4ad5ec04a4e5f92b036dd9c53c464ef', '15374035019', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('12', '1234', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('13', '3241543', 'ddb30680a691d157187ee1cf9e896d03', '435', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('14', '234234', 'f2fc990265c712c49d51a18a32b39f0c', '234', null, null, null, '', null, null);
INSERT INTO `users` VALUES ('15', '553204', '123', '12345678901', '小明', null, null, '2017-11-10 15:31:56', '2017-11-10 15:31:56', null);
INSERT INTO `users` VALUES ('16', 'hu553204', '202cb962ac59075b964b07152d234b70', '14312341231', '小红', null, null, '2017-11-10 16:37:23', '2017-11-10 16:37:23', null);
INSERT INTO `users` VALUES ('17', 'sdf', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '2017-11-10 16:39:52', '2017-11-10 16:39:52', null);
INSERT INTO `users` VALUES ('18', '12345', 'd81f9c1be2e08964bf9f24b15f0e4900', '3', null, null, null, '2017-11-10 16:40:33', '2017-11-10 16:40:33', null);
INSERT INTO `users` VALUES ('19', '234345456', '202cb962ac59075b964b07152d234b70', '234234324', null, null, null, '2017-11-10 16:41:42', '2017-11-10 16:41:42', null);
INSERT INTO `users` VALUES ('20', '1234555555', '202cb962ac59075b964b07152d234b70', '325465463', null, null, null, '2017-11-10 16:42:38', '2017-11-10 16:42:38', null);
INSERT INTO `users` VALUES ('21', 'hu123', '202cb962ac59075b964b07152d234b70', '15374032341', '小红', 'img/user-portrait.png', null, '2017-11-13 02:24:59', '2017-11-13 02:24:59', null);

-- ----------------------------
-- Table structure for users_copy
-- ----------------------------
DROP TABLE IF EXISTS `users_copy`;
CREATE TABLE `users_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `pass` varchar(40) NOT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `header_portrait` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '',
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_copy
-- ----------------------------
INSERT INTO `users_copy` VALUES ('8', '123', '202cb962ac59075b964b07152d234b70', '15374035014', null, 'img/user-portrait.png', null, '', null);
INSERT INTO `users_copy` VALUES ('9', '234', '289dff07669d7a23de0ef88d2f7129e7', '234', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('10', '321', 'caf1a3dfb505ffed0d024130f58c5cfa', '15334425422', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('11', '12343', 'f4ad5ec04a4e5f92b036dd9c53c464ef', '15374035019', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('12', '1234', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('13', '3241543', 'ddb30680a691d157187ee1cf9e896d03', '435', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('14', '234234', 'f2fc990265c712c49d51a18a32b39f0c', '234', null, null, null, '', null);
INSERT INTO `users_copy` VALUES ('15', '553204', '123', '12345678901', null, null, null, '2017-11-10 15:31:56', '2017-11-10 15:31:56');
INSERT INTO `users_copy` VALUES ('16', 'hu553204', '202cb962ac59075b964b07152d234b70', '14312341231', null, null, null, '2017-11-10 16:37:23', '2017-11-10 16:37:23');
INSERT INTO `users_copy` VALUES ('17', 'sdf', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '2017-11-10 16:39:52', '2017-11-10 16:39:52');
INSERT INTO `users_copy` VALUES ('18', '12345', 'd81f9c1be2e08964bf9f24b15f0e4900', '3', null, null, null, '2017-11-10 16:40:33', '2017-11-10 16:40:33');
INSERT INTO `users_copy` VALUES ('19', '234345456', '202cb962ac59075b964b07152d234b70', '234234324', null, null, null, '2017-11-10 16:41:42', '2017-11-10 16:41:42');
INSERT INTO `users_copy` VALUES ('20', '1234555555', '202cb962ac59075b964b07152d234b70', '325465463', null, null, null, '2017-11-10 16:42:38', '2017-11-10 16:42:38');
INSERT INTO `users_copy` VALUES ('21', 'hu123', '202cb962ac59075b964b07152d234b70', '15374032341', null, 'img/user-portrait.png', null, '2017-11-13 02:24:59', '2017-11-13 02:24:59');

-- ----------------------------
-- Table structure for users_copy1
-- ----------------------------
DROP TABLE IF EXISTS `users_copy1`;
CREATE TABLE `users_copy1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `pass` varchar(40) NOT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `header_portrait` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT '',
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users_copy1
-- ----------------------------
INSERT INTO `users_copy1` VALUES ('8', '123', '202cb962ac59075b964b07152d234b70', '15374035014', null, 'img/user-portrait.png', null, '', null);
INSERT INTO `users_copy1` VALUES ('9', '234', '289dff07669d7a23de0ef88d2f7129e7', '234', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('10', '321', 'caf1a3dfb505ffed0d024130f58c5cfa', '15334425422', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('11', '12343', 'f4ad5ec04a4e5f92b036dd9c53c464ef', '15374035019', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('12', '1234', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('13', '3241543', 'ddb30680a691d157187ee1cf9e896d03', '435', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('14', '234234', 'f2fc990265c712c49d51a18a32b39f0c', '234', null, null, null, '', null);
INSERT INTO `users_copy1` VALUES ('15', '553204', '123', '12345678901', null, null, null, '2017-11-10 15:31:56', '2017-11-10 15:31:56');
INSERT INTO `users_copy1` VALUES ('16', 'hu553204', '202cb962ac59075b964b07152d234b70', '14312341231', null, null, null, '2017-11-10 16:37:23', '2017-11-10 16:37:23');
INSERT INTO `users_copy1` VALUES ('17', 'sdf', '202cb962ac59075b964b07152d234b70', '123', null, null, null, '2017-11-10 16:39:52', '2017-11-10 16:39:52');
INSERT INTO `users_copy1` VALUES ('18', '12345', 'd81f9c1be2e08964bf9f24b15f0e4900', '3', null, null, null, '2017-11-10 16:40:33', '2017-11-10 16:40:33');
INSERT INTO `users_copy1` VALUES ('19', '234345456', '202cb962ac59075b964b07152d234b70', '234234324', null, null, null, '2017-11-10 16:41:42', '2017-11-10 16:41:42');
INSERT INTO `users_copy1` VALUES ('20', '1234555555', '202cb962ac59075b964b07152d234b70', '325465463', null, null, null, '2017-11-10 16:42:38', '2017-11-10 16:42:38');
INSERT INTO `users_copy1` VALUES ('21', 'hu123', '202cb962ac59075b964b07152d234b70', '15374032341', null, 'img/user-portrait.png', null, '2017-11-13 02:24:59', '2017-11-13 02:24:59');

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:06jL0YOREPlUCNrPK8FNuneRk0-3HXMV', '1510549614763', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:1HEJuahXkGhZB4jW-hXm8bsTTJT8hvV7', '1510547891432', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:6WD_FNnVv0yyyC0hLO6DmW8zGxkEpLFr', '1510549465129', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:AaSgGjyUuxnBNKLiFCFdH9hWCVnnOe6X', '1510549165837', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:DNG80lW8V8vpyF-a9We_HY3axqSNxgGE', '1510549555687', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:EpkQ_9ChaMGIxva2J0cSW6rKeXBYZk_4', '1510549508988', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:fLo9qBmmb0spmRln5hdRUHPxIHFTyVtp', '1510547944679', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:h-NEHC1EZJAD8wURfE2xnWx7fxM3Ghml', '1510549243758', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
INSERT INTO `_mysql_session_store` VALUES ('USER_SID:NHv51Q53mEHuX_rUTIqdbOlXyl0shxHj', '1510549390300', '{\"user\":{\"obj\":{\"name\":\"hu123\",\"phone\":15374032341,\"username\":null,\"header_portrait\":\"img/user-portrait.png\",\"created_at\":\"2017-11-13 02:24:59\"}}}');
