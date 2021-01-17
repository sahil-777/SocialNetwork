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
        //"created_at":new Date().toLocaleString().slice(0, 19).replace('T', ' ')
        //created_at: MySQL will take default value automatically
    };
    console.log(data);
    connection.query('INSERT INTO users SET ?',data);
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
