const mysql = require('mysql');
const connection  = require('../config.js');

const createDatabase = () => {
    connection.query("CREATE DATABASE IF NOT EXISTS socialnetwork DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;", function (err, result) {
        if (err) throw err;
        connection.query("USE socialnetwork;",function(err){
            if(err) throw err;
            console.log("Database created");
        })
    });
};
//createDatabase();
exports.createDatabase = createDatabase;
//exports.module=connection; 