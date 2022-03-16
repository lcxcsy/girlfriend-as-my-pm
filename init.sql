-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.18 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 great_life 的数据库结构
CREATE DATABASE IF NOT EXISTS `great_life` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `great_life`;

-- 导出  表 great_life.attend_records 结构
CREATE TABLE IF NOT EXISTS `attend_records` (
  `record_id` char(50) NOT NULL DEFAULT '' COMMENT '唯一标识',
  `user_name` varchar(16) NOT NULL COMMENT '人员姓名',
  `user_id` varchar(16) NOT NULL COMMENT '人员姓名标识',
  `location` varchar(100) NOT NULL COMMENT '打卡地点',
  `center` varchar(256) NOT NULL COMMENT '打卡经纬度',
  `face_url` varchar(256) NOT NULL COMMENT '人脸照片',
  `message` varchar(50) NOT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '打卡时间',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员打卡签到表';

-- 数据导出被取消选择。

-- 导出  表 great_life.trip_records 结构
CREATE TABLE IF NOT EXISTS `trip_records` (
  `record_id` char(36) NOT NULL DEFAULT '' COMMENT '唯一标识',
  `user_name` varchar(32) DEFAULT NULL COMMENT '出差人',
  `user_id` varchar(32) DEFAULT NULL,
  `area_name` varchar(32) DEFAULT NULL COMMENT '目的地',
  `start_time` varchar(32) DEFAULT NULL COMMENT '出差开始时间',
  `end_time` varchar(32) DEFAULT NULL COMMENT '出差结束时间',
  `reason` varchar(50) DEFAULT NULL COMMENT '出差事由',
  `status` tinyint(4) DEFAULT NULL COMMENT '审批状态 1 未审批 2 已审批拒绝 3 已审批通过',
  `created_at` datetime DEFAULT NULL COMMENT '申请时间',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='差旅申请的记录表';

-- 数据导出被取消选择。

-- 导出  表 great_life.users 结构
CREATE TABLE IF NOT EXISTS `users` (
  `uuid` char(36) NOT NULL DEFAULT '' COMMENT '用户ID',
  `user_name` varchar(16) DEFAULT NULL COMMENT '用户名',
  `user_id` varchar(16) DEFAULT NULL COMMENT '用户名关键字',
  `user_type` tinyint(2) DEFAULT NULL COMMENT '角色类型，1为用户，2为管理员，3为开发者',
  `password` varchar(32) DEFAULT NULL COMMENT '用户密码',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 数据导出被取消选择。

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
