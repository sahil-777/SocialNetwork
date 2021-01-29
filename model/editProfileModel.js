//Yet to be doneconst 
connection = require('../config');

class editProfileModel {
    
    enterInfo(req,res){
        var userData = {
                "id":req.session.num,
                "username":req.body.userName,
                "profilepic":req.body.profilePic, 
                "fullname":req.body.fullName,
                "birthdate":req.body.DOB,
                "bio":req.body.Bio
            };
            console.log(userData);
            //res.send(userData);
            //res.send(userData.profilepic);
            //connection.query('INSERT INTO userinfo SET ?',userData);
    }
}

module.exports = editProfileModel;