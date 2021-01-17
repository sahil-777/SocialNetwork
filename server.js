const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const PORT =process.env.PORT || 3000 ;
const connection = require('./config.js');
//const temp = require('./model/createTables.js');

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


app.get('/login',(req,res)=>{
    res.render('loginView',{msg:null});
});

app.post('/login',(req,res)=>{
    var data ={
        "username":req.body.userName,
        "password":req.body.passWord,
    };
    console.log(data);

    connection.query('SELECT * FROM users WHERE username = ?',data.username,function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          if(results.length >0){
            const comparision = data.password==results[0].password? true:false;
            if(comparision){
                /*res.send({
                  "code":200,
                  "success":"login sucessfull"
                })*/
                console.log('Login Successful');
                res.redirect('/');
            }
            else{
              /*res.send({
                   "code":204,
                   "success":"Email and password does not match"
              })*/
              console.log('Username and password does not match');
              msg="Username and password does not match";
              res.render('loginView',{msg:msg});
            }
          }
          else{
            /*res.send({
              "code":206,
              "success":"Email does not exits"
                });*/
                console.log('Username does not exists');
                msg="Username does not exists";
                res.render('loginView',{msg:msg});
            }
        }
        });

    
}); 



app.listen(PORT,(err) =>{
    if(err) throw err;
    require('./model/createDb.js').createDatabase();
    require('./model/createTables.js').createTables();
    console.log('Server is running on localhost:'+PORT);
});
