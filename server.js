const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const PORT =process.env.PORT || 3000 ;
const connection = require('./config.js');
const temp = require('./model/createTables.js');

app.get('/',(req,res)=>{
    res.send("Hello!");
});

app.get('/signup',(req,res)=>{
    res.render('signupView');
});


app.post('/signup',(req,res)=>{
    var data ={
        "username":req.body.userName,
        "password":req.body.passWord,
        "email":req.body.email,
        "created_at":new Date().toLocaleString().slice(0, 19).replace('T', ' ')
    };
//  new Date().toLocaleString().slice(0, 19).replace('T', ' ')
    console.log(data);
    
    //date=new Date().toLocaleString().slice(0, 19).replace('T', ' ');
    //console.log(date);
    //connection.query('INSERT INTO users SET ?',data);
    sql="INSERT INTO users (username, password, email, created_at) VALUES ('Company Inc', 'Highway 37','s@gmail.com',STR_TO_DATE('12/04/2016 15:30:35','%d/%m/%Y %H:%i:%s'))";
    connection.query(sql);
    res.redirect('/');
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    //require('./model/createTables.js').createTables();
    //temp.createTables();
    //console.log(temp);
    console.log('Server is running on localhost:'+PORT);
});
