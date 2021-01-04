const mysql = require('mysql');
const connection  = require('../config.js');

connection.query("CREATE DATABASE IF NOT EXISTS socialnetwork DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; USE socialnetwork", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

module.exports = connection;