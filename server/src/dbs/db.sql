-- --------------------------------------------------------
-- 主机:                           localhost
-- 服务器版本:                        8.0.19 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 trip-record 的数据库结构
CREATE DATABASE IF NOT EXISTS `trip-record` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trip-record`;

-- 导出  表 trip-record.records 结构
CREATE TABLE IF NOT EXISTS `records` (
  `recordId` varchar(36) NOT NULL COMMENT '唯一标识',
  `personName` varchar(32) DEFAULT NULL COMMENT '出差人',
  `areaName` varchar(32) DEFAULT NULL COMMENT '目的地',
  `startTime` varchar(32) DEFAULT NULL COMMENT '出差开始时间',
  `endTime` varchar(32) DEFAULT NULL COMMENT '出差结束时间',
  `reason` varchar(100) DEFAULT NULL COMMENT '出差事由',
  `status` int DEFAULT NULL COMMENT '审批状态 1 未审批 2 已审批拒绝 3 已审批通过',
  `greatLifeKey` varchar(32) DEFAULT NULL,
  `createdTime` varchar(32) DEFAULT NULL COMMENT '申请时间',
  PRIMARY KEY (`recordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='差旅申请的记录表';

-- 正在导出表  trip-record.records 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `records` DISABLE KEYS */;
/*!40000 ALTER TABLE `records` ENABLE KEYS */;

-- 导出  表 trip-record.users 结构
CREATE TABLE IF NOT EXISTS `users` (
  `userId` varchar(32) NOT NULL COMMENT '用户ID',
  `userName` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) DEFAULT NULL COMMENT '用户密码',
  `greatLifeKey` varchar(32) DEFAULT NULL COMMENT '长城人寿的关键字',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 正在导出表  trip-record.users 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`userId`, `userName`, `password`, `greatLifeKey`) VALUES
	('99170219708121088', 'admin', 'Ul0jhI3RRDvWkINjSckhtw==', 'superAdmin'),
	('99170219708121089', '戎志秀', 'Ul0jhI3RRDvWkINjSckhtw==', 'rongzhixiu'),
	('99170219708121090', '韩笑', 'Ul0jhI3RRDvWkINjSckhtw==', 'hanxiao'),
	('99170219708121091', '张莉莉', 'Ul0jhI3RRDvWkINjSckhtw==', 'zhanglili'),
	('99170219708121092', '刘亚潼', 'Ul0jhI3RRDvWkINjSckhtw==', 'liuyatong'),
	('99170219708121093', '芮勤芳', 'Ul0jhI3RRDvWkINjSckhtw==', 'ruiqinfang'),
	('99170219708121094', '印昊', 'Ul0jhI3RRDvWkINjSckhtw==', 'yinhao'),
	('99170219708121095', '俞春花', 'Ul0jhI3RRDvWkINjSckhtw==', 'yuchunhua');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
