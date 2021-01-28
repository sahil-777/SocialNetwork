const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();
//app.use(express.static(__dirname + "/public")); // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const PORT =process.env.PORT || 3000 ;

//Database
const connection = require('./config');

//SESSION
const session = require('express-session');
app.use(session({secret: 'Secreyyyy', resave: true, saveUninitialized: true})) 
module.exports.session = session; //Unnecessary

const loginRoute=require('./routes/loginRoute');
app.use('/',loginRoute);
const signupRoute=require('./routes/signupRoute');
app.use('/',signupRoute);

const profileRoute=require('./routes/profileRoute');
app.use('/',profileRoute);

const homeRoute=require('./routes/homeRoute');
app.use('/',homeRoute);

const profileEditRoute=require('./routes/editProfileRoute');
app.use('/profile',profileEditRoute);

app.post('/profile/edit',(req,res)=>{
    //res.send("Hii");
    var data = {
        "username":req.body.userName,
        "profilepic":req.body.profilePic,
        "fullname":req.body.name,
        "birthdate":req.body.DOB,
        "bio":req.body.Bio
    };
    res.send(data);
    //You have to update (not insert)
    //connection.query('INSERT INTO userinfo SET ?',data);

});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});