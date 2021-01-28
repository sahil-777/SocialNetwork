-- Drop and create a new database --
CREATE DATABASE IF NOT EXISTS `socialnetwork` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; 
USE `socialnetwork`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Demo Insert --
INSERT INTO users (username, password, email, created_at) VALUES ('Company Inc', 'Highway 37','s@gmail.com',STR_TO_DATE('12/04/2016 15:30:35','%d/%m/%Y %H:%i:%s'));

SELECT * FROM users WHERE username='SahilVelhal' AND password='dsg';

