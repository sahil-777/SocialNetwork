const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var app = express();
const dotenv =require('dotenv');
dotenv.config();
//var upload = multer({ dest: __dirname+ '/public' });
//console.log(upload);
//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads" ) );
const upload=require('./middleware/multerSetup').single("uploadFile");

app.get('/search',function(req,res){
    res.render('tempView');
});
    
app.get('/search',function(req,res){
    connection.query('SELECT username from users where username like "%'+req.query.key+'%"',
    function(err, rows, fields) {
    if (err) throw err;
    var data=[];
    for(i=0;i<rows.length;i++)
    {
    data.push(rows[i].first_name);
    }
    res.end(JSON.stringify(data));
    });
});

 // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

//Database
const connection = require('./config');
 
//SESSION
const session = require('express-session');
app.use(session({secret:process.env.SESSION_KEY, resave: true, saveUninitialized: true})) 
module.exports.session = session; //Unnecessary

const loginRoute=require('./routes/loginRoute');
app.use('/',loginRoute);
const signupRoute=require('./routes/signupRoute');
app.use('/',signupRoute);

// /profile
const profileRoute=require('./routes/profileRoute');
app.use('/',profileRoute);

const homeRoute=require('./routes/homeRoute');
app.use('/',homeRoute);

const profileEditRoute=require('./routes/editProfileRoute');
const { stringify } = require('querystring');
app.use('/profile',profileEditRoute);

const showFeedRoute=require('./routes/showFeedRoute');
app.use('/',showFeedRoute);


app.get('/profile/search',function(req,res){
    //console.log(req.query.key);
    connection.query('SELECT username from users where username like "%'+req.query.key+'%"', function(err, rows, fields) {
          if (err) throw err;
        var data=[];
        for(i=0;i<rows.length;i++)
          {
            data.push(rows[i].username);
          }
          res.end(JSON.stringify(data));
        });
        
    //	return false;
});



 
app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});