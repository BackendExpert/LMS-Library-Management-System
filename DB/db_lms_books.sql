-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_lms
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BookTitle` varchar(225) NOT NULL,
  `ClassNo` varchar(45) NOT NULL,
  `AuthorEditor` varchar(255) NOT NULL,
  `AuthorEditor2` varchar(225) NOT NULL,
  `Discription` varchar(255) NOT NULL,
  `ISBNNumber` varchar(50) NOT NULL,
  `Keywords` varchar(225) NOT NULL,
  `Keywords2` varchar(255) NOT NULL,
  `Publisher` varchar(225) NOT NULL,
  `PubYear` varchar(10) NOT NULL,
  `PubPlace` varchar(150) NOT NULL,
  `Create_at` varchar(45) NOT NULL,
  `Status` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Programming','456.03','Nimali','Kamal','Programming C++','456789IT','Programming','C++','Perera','2014','Sri Lanka','2024-05-09 09:19:53.693','Available'),(2,'Programming PHP','456.04','Kamal','Perera','Programming in PHP','456879IT','Programming ','PHP','Perera','2019','India','2024-05-09 09:20:52.889','Available'),(3,'Web Developement React','456.09','Kamal','Amara','Web Development Frant end React','789456IT','Web Development','React','John','2024','USA','2024-05-09 09:22:05.072','Available'),(4,'Geography Sri Lanka','123.01','Somarathene','Perera','Geography in Sri Lanka','789456GEO','Geography','Sri Lanka','Nimali','2015','Sri Lanka','2024-05-09 09:23:10.038','Available'),(5,'Programming C++','456.01','Nimali','Kamal','C++','546789IT','C++','programming','Perera','2012','USA','2024-05-10 16:05:13.905','Available'),(6,'History','789.02','Amara','Nimali','History','12346HIS','History ','Sri Lanka','Perera','2009','Sri Lanka','2024-05-10 16:05:58.798','Available'),(7,'New Book','456.01','Kamal','NImali','New Book','78945NEW','New ','Book','Nimali','2015','USA','2024-05-13 07:49:21.429','Available');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13  8:09:38
