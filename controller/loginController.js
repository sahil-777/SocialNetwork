const connection = require('../config');

class loginController{
    displayPage (req,res){
        return res.render('loginView',{msg:null});
    }

    enterInfo (req,res){
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
                return res.redirect('/');
            }
            else{
              /*res.send({
                   "code":204,
                   "success":"Email and password does not match"
              })*/
              console.log('Username and password do not match');
              var msg="Username and password do not match";
              return res.render('loginView',{msg:msg});
            }
          }
          else{
            /*res.send({
              "code":206,
              "success":"Email does not exits"
                });*/
                console.log('Username does not exists');
                var msg="Username does not exists";
                return res.render('loginView',{msg:msg});
            }
        }
        });
    } 

}
module.exports = loginController;

