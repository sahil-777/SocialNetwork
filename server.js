const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); 
var app = express();

//var upload = multer({ dest: __dirname+ '/public' });
//console.log(upload);
//app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads" ) );
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/profilepics/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


 // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000 ;

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

// /profile
//const profileRoute=require('./routes/profileRoute');
//app.use('/',profileRoute);

const homeRoute=require('./routes/homeRoute');
app.use('/',homeRoute);

const profileEditRoute=require('./routes/editProfileRoute');
app.use('/profile',profileEditRoute);


app.post('/profile/edit',upload.single('profilePic'),(req,res)=>{
    console.log(req.file);
    console.log(req.body);

    connection.query('SELECT * FROM userinfo WHERE id=?',req.session.num,(error,userInfoResult)=>{
       if(error) throw error;
        var userInfo = {
            "username":(req.body.userName=='')?userInfoResult[0].username:req.body.userName,
            "profilepic":(!req.file)?userInfoResult[0].profilepic:req.file.filename,
            "fullname":(req.body.fullName=='')?userInfoResult[0].fullname:req.body.fullName,
            "birthdate":(req.body.DOB=='')?userInfoResult[0].birthdate:req.body.DOB,
            "bio":(req.body.Bio=='')?userInfoResult[0].bio:req.body.Bio,
        };
    
        var sqlQuery1="UPDATE userinfo SET ? WHERE id="+req.session.num;
        var sqlQuery2="UPDATE users SET username=? WHERE id="+req.session.num;
        
        connection.query(sqlQuery2,userInfo.username,(error,reslt)=>{
            if(error) throw error;
            connection.query(sqlQuery1,userInfo,(error,result)=>{
                if(error) throw error;
                res.render('editProfileView',{msg:"Saved successfully!"});
            });
        });
        
    
    });
    
    
    
});

app.get('/profile',(req,res)=>{
    var sql="SELECT * FROM userinfo WHERE id = "+req.session.num;
    connection.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(result[0]);
        var imageName=result[0].profilepic;
        console.log(imageName);
        if(typeof imageName=='object'){ imageName = "default_profilepic.png"; }
        res.render('profileView',{data:result[0],imageName:imageName});
    });
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});