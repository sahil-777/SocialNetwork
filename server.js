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

const displayAccountRoute=require('./routes/displayAccountRoute');
app.use('/',displayAccountRoute);

app.post('/follow',(req,res)=>{
    console.log("Hii");
    
    if(req.session.num!=null && typeof req.session.num!="undefined"){
        console.log('Flag=> '+req.body.flag);
        let flag=req.body.flag;
        //console.log(req.session.username);
        //console.log(req.body.following);
        //let follower=req.session.username,following=req.body.following;
        let followData={
            follower:req.session.username,
            following:req.body.following
        }
        let sqlQuery="INSERT INTO followinfo SET ?";
        if(flag==0)
        sqlQuery="DELETE FROM followinfo WHERE (follower= '"+followData.follower+ "' AND following= '"+followData.following+"')";

        connection.query(sqlQuery,followData,(error,result)=>{
            if(error) throw error;
        });
        

        let val="+1";
        if(flag==0)
        val="-1";
        sqlQuery="UPDATE followcount SET following = following "+val+" WHERE username='"+followData.follower+"'";
        connection.query(sqlQuery,(error,result)=>{
            if(error) throw error;
        });
 
        sqlQuery="UPDATE followcount SET followers = followers "+val+" WHERE username='"+followData.following+"'";
        connection.query(sqlQuery,(error,result)=>{
            if(error) throw error;
        });

    }
    else{
        console.log("Going to login");
        return res.redirect('/login');
    }
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});