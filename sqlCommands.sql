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
/*
INSERT INTO users (username, password, email, created_at) VALUES ('Company Inc', 'Highway 37','s@gmail.com',STR_TO_DATE('12/04/2016 15:30:35','%d/%m/%Y %H:%i:%s'));

SELECT * FROM users WHERE username='SahilVelhal' AND password='dsg';
*/

CREATE TABLE IF NOT EXISTS `userinfo` (
    `id` INT NOT NULL ,
    `username` varchar(50) NOT NULL,
    `profilepic` varchar(255) NULL ,
    `fullname` VARCHAR(50) NULL,
    `birthdate` DATE NULL,
    `bio` VARCHAR(255) NULL,
	PRIMARY KEY (`id`),
    FOREIGN KEY(`id`) REFERENCES users(id)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;

CREATE TABLE IF NOT EXISTS `userfeed`( 
	`id` INT(11) NOT NULL AUTO_INCREMENT ,
    `userid` INT NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `feedname` VARCHAR(255) NULL,
    `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
    `likes` INT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userid`) REFERENCES users(`id`)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;

  
CREATE TABLE IF NOT EXISTS `likeinfo` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
    `feedname` VARCHAR(255) NULL,
    `likedby` INT NULL,
    PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;


CREATE TABLE IF NOT EXISTS `commentinfo` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
    `feedname` VARCHAR(255) NULL,
    `commenttext` VARCHAR(255) NULL,
    `commentby` VARCHAR(255) NULL,
    `commentto` VARCHAR(255) NULL,
    `likes` INT NULL DEFAULT 0,
	`created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;


CREATE TABLE IF NOT EXISTS `followinfo` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
    `follower` VARCHAR(255) NULL,
    `following` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;

CREATE TABLE IF NOT EXISTS `followcount` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `followers` INT NULL DEFAULT 0,
    `following` INT NULL DEFAULT 0,
    PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;