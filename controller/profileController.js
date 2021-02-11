const connection = require('../config');
const Model = require('../model/profileModel');
const profileModel = new Model();

class profileController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            let sql="SELECT * FROM userinfo WHERE id = "+req.session.num;
            connection.query(sql,(error,result)=>{
                if(error) throw error;
                console.log(result[0]);
                var imageName=result[0].profilepic;
                console.log(imageName);
                if(typeof imageName=='object'){ imageName = "default_profilepic.png"; }

                let feedQuery="SELECT * FROM userfeed WHERE userid = "+req.session.num; 
                connection.query(feedQuery,(error,feedResult)=>{
                    console.log(feedResult);
                    return res.render('profileView',{data:result[0],dpName:imageName,feedResult:feedResult});
                })
            });
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    
    enterInfo (req,res){
        profileModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
}
module.exports = profileController;

