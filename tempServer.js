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

app.post('/profile/postFeed/:id/:flag',(req,res)=>{
    //console.log(req.url);
    let val='';
    if(req.params['flag']==1)
    val="+1";
    else val="-1"; 
    let sqlQuery="UPDATE userfeed SET likes=likes"+val+" WHERE feedname='"+req.params['id']+"'";
    //console.log('likkkkee');
    connection.query(sqlQuery,(error,result)=>{
        //console.log(result[0]);
        if(error) throw error;
    });
    let likeData={
        feedname:req.params['id'],//id=>feedname
        likedby:req.session.num
    }
    if(req.params['flag']==1)
    sqlQuery="INSERT INTO likeinfo SET ? ";
    else
    sqlQuery="DELETE FROM likeinfo WHERE (feedname= '"+likeData.feedname+ "' AND likedby= '"+likeData.likedby+"')";
    
    //console.log(sqlQuery);
    connection.query(sqlQuery,likeData,(error,result)=>{
        if(error) throw error;
        //console.log(sqlQuery);
    });
    //console.log(sqlQuery);
    if(req.params['flag']==1)
    console.log("liked Post: "+req.params['id']);
    else
    console.log("disliked Post: "+req.params['id']);
    
   //console.log(sqlQuery);

});
  
 
app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});