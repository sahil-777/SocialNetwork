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
};

//createTables();

exports.createTables=createTables;
//module.exports = connection; 