connection = require('../config');

class editProfileModel {
    
    enterInfo(req,res){
        console.log(req.file);
        console.log(req.body);

        connection.query('SELECT * FROM userinfo WHERE id=?',req.session.num,(error,userInfoResult)=>{
        if(error) throw error;
            var userInfo = {
                "username":(req.body.userName=='')?userInfoResult[0].username:req.body.userName,
                "profilepic":(!req.file)?userInfoResult[0].profilepic:req.file.filename,
                "fullname":(req.body.fullName=='')?userInfoResult[0].fullname:req.body.fullName,
                "birthdate":(req.body.DOB=='')?userInfoResult[0].birthdate:req.body.DOB,
                "bio":(req.body.Bio=='')?userInfoResult[0].bio:req.body.Bio,
            };
        
            var sqlQuery1="UPDATE userinfo SET ? WHERE id="+req.session.num;
            var sqlQuery2="UPDATE users SET username=? WHERE id="+req.session.num;
            
            connection.query(sqlQuery2,userInfo.username,(error,reslt)=>{
                if(error) throw error;
                connection.query(sqlQuery1,userInfo,(error,result)=>{
                    if(error) throw error;
                    res.render('editProfileView',{msg:"Saved successfully!"});
                });
            });
        });
    }
}

module.exports = editProfileModel;