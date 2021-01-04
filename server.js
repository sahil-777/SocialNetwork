const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const PORT =process.env.PORT || 3000 ;
const connection = require('./config.js');
const createDatabase = require('./model/createDb.js');

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
    console.log(data);
    connection.query('INSERT INTO users SET ?',data);
    res.redirect('/');
});

app.listen(PORT,(err) =>{
    if(err) throw err;
    ('model/createDb.js').createDatabase;
    console.log('Server is running on localhost:'+PORT);
});
