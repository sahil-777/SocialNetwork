const connection = require('../config');

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
    }
}

module.exports = signupModel;