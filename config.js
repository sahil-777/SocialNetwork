var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pass@1234",
  debug: false,
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE IF NOT EXISTS socialnetwork DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; USE socialnetwork", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = connection;