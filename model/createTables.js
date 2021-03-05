const mysql = require('mysql');
const connection  = require('../config.js');

const createTables = () =>{
  var sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `users` (" +
      "`id` int(11) NOT NULL AUTO_INCREMENT," +
      "`username` varchar(50) NOT NULL," +
      "`password` varchar(255) NOT NULL," +
      "`email` varchar(100) NOT NULL," +
      "`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP," +
      "PRIMARY KEY (`id`)" +
    ") ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;";

  
  connection.query(sqlQuery,function (err,result) {
      if (err) throw err;
      let tableName ="users";
      console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `userinfo` (" +
    "id INT NOT NULL ,"+
    "username varchar(50) NOT NULL,"+
    "profilepic varchar(255) NULL ,"+
    "fullname VARCHAR(50) NULL,"+
    "birthdate DATE NULL,"+
    "bio VARCHAR(255) NULL,"+
	  "PRIMARY KEY (`id`),"+
    "FOREIGN KEY(`id`) REFERENCES users(id)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="userinfo";
    console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `userfeed` (" +
    "id INT(11) NOT NULL AUTO_INCREMENT ,"+
    "userid INT NOT NULL ,"+
    "feedname VARCHAR(255) NULL ,"+
    "created_at datetime NULL DEFAULT CURRENT_TIMESTAMP,"+
    "likes INT NULL DEFAULT 0,"+
	  "PRIMARY KEY (`id`),"+
    "FOREIGN KEY(`userid`) REFERENCES users(id)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="userfeed";
    console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `likeinfo` (" +
    "id INT(11) NOT NULL AUTO_INCREMENT ,"+
    "feedname VARCHAR(255) NULL ,"+
    "likedby INT NULL ,"+
	  "PRIMARY KEY (`id`)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="likeinfo";
    console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `commentinfo` (" +
    "id INT(11) NOT NULL AUTO_INCREMENT ,"+
    "feedname VARCHAR(255) NULL ,"+
    "commenttext VARCHAR(255) NULL ,"+
    "commentby VARCHAR(255) NULL ,"+
    "commentto VARCHAR(255) NULL ,"+
    "likes INT NULL DEFAULT 0,"+
    "created_at datetime NULL DEFAULT CURRENT_TIMESTAMP,"+
    "PRIMARY KEY (`id`)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="commentinfo";
    console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `followinfo` (" +
    "id INT(11) NOT NULL AUTO_INCREMENT ,"+
    "follower VARCHAR(255) NULL ,"+
    "following VARCHAR(255) NULL ,"+
    "PRIMARY KEY (`id`)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="followinfo";
    console.log( tableName+ " Table created");
  });

  sqlQuery ="USE socialnetwork; CREATE TABLE IF NOT EXISTS `followcount` (" +
    "id INT(11) NOT NULL AUTO_INCREMENT ,"+
    "username VARCHAR(255) NULL ,"+
    "followers INT NULL DEFAULT 0,"+
    "following INT NULL DEFAULT 0,"+
    "PRIMARY KEY (`id`)"+
  ")ENGINE = InnoDB AUTO_INCREMENT =2 DEFAULT CHARSET =utf8;";
  
  connection.query(sqlQuery,function (err,result) {
    if (err) throw err;
    let tableName ="followcount";
    console.log( tableName+ " Table created");
  });



  



};

//createTables();

exports.createTables=createTables;
//module.exports = connection; 