/*
SQLyog Ultimate v11.5 (64 bit)
MySQL - 5.5.32 : Database - cafe
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cafe` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cafe`;

/*Table structure for table `keys` */

DROP TABLE IF EXISTS `keys`;

CREATE TABLE `keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(40) NOT NULL,
  `level` int(2) NOT NULL,
  `ignore_limits` tinyint(1) NOT NULL DEFAULT '0',
  `date_created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `keys` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `username` varchar(25) NOT NULL,
  `password` text,
  `fbaccount` text,
  `nama` varchar(25) DEFAULT NULL,
  `jenis_kelamin` enum('Laki-Laki','Perempuan') DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `point` int(9) DEFAULT NULL,
  `total_point` int(9) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`username`,`password`,`fbaccount`,`nama`,`jenis_kelamin`,`tanggal_lahir`,`point`,`total_point`) values ('pino','pino','pino@facebook.com','Rahadian AF','Laki-Laki','1988-08-08',0,0),('skylab','sky','msskylab@facebook.com','Dheny Skylab','Laki-Laki','1979-07-21',0,0);

/* Procedure structure for procedure `sp_login` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_login` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_login`(ausername VARCHAR(45), apassword TEXT)
proc:BEGIN 
DECLARE jumacc INT;
declare isLogin int;
SELECT COUNT(*) INTO jumacc FROM USER WHERE username = ausername;
IF jumacc = 0 THEN 
	SELECT 403 'status', 'belum register' msg;
	LEAVE proc;
END IF ;
select count(*) into isLogin from user where username = ausername and password = apassword;
if isLogin = 0 then 
 select 401 'status', 'wrong user or password' msg;
else 
 select 200 'status', 'login berhasil' msg;
end if;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_register` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_register` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register`(ausername varchar(45), apassword text, afbaccount text, anama varchar(25),
			     ajeniskelamin enum('Laki-laki','Perempuan'), atanggal_lahir date)
proc:begin 
declare jum int;
select count(*) into jum from user where username = ausername;
if jum <> 0 then 
select 101 status, 'sudah ada' msg;
leave proc;
end if ;
insert into user values (ausername, apassword, afbaccount, anama, ajeniskelamin, atanggal_lahir, 0,0);
select 102 status, 'berhasil' msg;
end */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
