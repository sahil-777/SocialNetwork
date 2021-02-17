const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
var app = express();

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
const profileRoute=require('./routes/profileRoute');
app.use('/',profileRoute);

const homeRoute=require('./routes/homeRoute');
app.use('/',homeRoute);

const profileEditRoute=require('./routes/editProfileRoute');
app.use('/profile',profileEditRoute);

app.post('/profile/postFeed',(req,res)=>{
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file);

        let feedData={
            "userid":req.session.num,
            "feedname":req.file.filename,   
        }//Everything else is bydefault i.e. created_at,likes,id

        let sql="INSERT INTO userfeed SET ?";
        connection.query(sql,feedData); 

        res.end("File is uploaded");
    });
}); 

app.post('/profile/postFeed/:id/likes',(req,res)=>{
    //console.log(req.url);
    if(req.params['id']=='close')
    return;
    let sqlQuery="UPDATE userfeed SET likes=likes+1 WHERE feedname='"+req.params['id']+"'";
    //console.log('likkkkee');
    connection.query(sqlQuery,(error,result)=>{
        if(error) throw error;
    });
    //console.log(sqlQuery);
    console.log("liked Post: "+req.params['id']);
});
  
 
app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});