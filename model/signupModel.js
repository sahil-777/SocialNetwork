const connection = require('../config');
const fs = require('fs');
class signupModel {
    enterInfo(req,res){
        var data ={
            "username":req.body.userName,
            "password":req.body.passWord,
            "email":req.body.email,
            //"created_at":new Date().toLocaleString().slice(0, 19).replace('T', ' ')
            //created_at: MySQL will take default value automatically
        };
        console.log(data);
        connection.query('INSERT INTO users SET ?',data);
        //var result=null;
        connection.query('SELECT * FROM users WHERE username = ?',data.username,(error,result,feild)=>{
            if(error){
                res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
            }
            else{
            //console.log(result);
            var userData = {
                "id":result[0].id,
                "username":data.username,
                "profilepic":null,
                "fullname":null,
                "birthdate":null,
                "bio":null
            };
            //console.log(userData);
            //res.send(userData.profilepic);
            connection.query('INSERT INTO userinfo SET ?',userData);
            connection.query('INSERT INTO followcount SET ?',{"username":userData.username});
            }
        });
        //console.log(result);
    }
}

module.exports = signupModel;