var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Pass@1234',
  database : 'socialnetwork'
});
connection.connect(function(err){
  if(err){console.log('Database connection failed!'); throw err};
});
module.exports = connection;