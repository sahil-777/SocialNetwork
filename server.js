const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var app = express();
app.use(express.static(__dirname + "/public")); // all statics files in /public
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

//IMP: Updated photo is not in a form as needed.

app.post('/profile/edit',(req,res)=>{
    //res.send("Hii");

    connection.query('SELECT * FROM userinfo WHERE id=?',req.session.num,(error,userInfoResult)=>{
        //console.log(userInfoResult[0]);
        var userInfo = {
            "username":(req.body.userName=='')?userInfoResult[0].username:req.body.userName,
            "profilepic":(req.body.profilePic=='')?userInfoResult[0].profilepic:req.body.profilePic,
            "fullname":(req.body.fullName=='')?userInfoResult[0].fullname:req.body.fullName,
            "birthdate":(req.body.DOB=='')?userInfoResult[0].birthdate:req.body.DOB,
            "bio":(req.body.Bio=='')?userInfoResult[0].bio:req.body.Bio,
            //"id":req.session.num,
        };
        console.log(userInfo);
        //You have to update (not insert)
        var sqlQuery="UPDATE userinfo SET ? WHERE id="+req.session.num;
        connection.query(sqlQuery,userInfo,(error,result)=>{
            if(error) throw error;
            //console.log(result);
            console.log(result.affectedRows+" record(s) updated");
            res.render('editProfileView',{msg:"Saved successfully!"});
        });
        //res.send(userInfo);
        
        //res.send(userInfoResult);
    
    });
    
    
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});