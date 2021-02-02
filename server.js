const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); 
var app = express();

var upload = multer({ dest: __dirname+ '/public/static/images/profilePics' });
//console.log(upload);

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


app.post('/profile/edit',upload.single('profilePic'),(req,res)=>{
    console.log(req.file);
    console.log(req.body);

    connection.query('SELECT * FROM userinfo WHERE id=4',req.session.num,(error,userInfoResult)=>{
       if(error) throw error;
        var userInfo = {
            "username":(req.body.userName=='')?userInfoResult[0].username:req.body.userName,
            "profilepic":(!req.file)?userInfoResult[0].profilepic:req.file.filename,
            "fullname":(req.body.fullName=='')?userInfoResult[0].fullname:req.body.fullName,
            "birthdate":(req.body.DOB=='')?userInfoResult[0].birthdate:req.body.DOB,
            "bio":(req.body.Bio=='')?userInfoResult[0].bio:req.body.Bio,
        };
    
        var sqlQuery="UPDATE userinfo SET ? WHERE id="+req.session.num;
        connection.query(sqlQuery,userInfo,(error,result)=>{
            if(error) throw error;
            //console.log(result.affectedRows+" record(s) updated");
            res.render('editProfileView',{msg:"Saved successfully!"});
        });
    
    });
    
    
    
});

app.get('/show',(req,res)=>{
    /*var sql="SELECT profilepic FROM userinfo WHERE id = "+req.session.num;
    connection.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(result[0]);
        //var imgg=new Buffer().toString('base64');
        res.render('tempView',{profilePic:result[0]}); 

    });*/
    var pic=fs.readFileSync('./public/static/images/default_profilepic.png');
    res.render('tempView',{profilePic:pic});
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});