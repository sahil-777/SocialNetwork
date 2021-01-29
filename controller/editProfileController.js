const connection = require('../config');
const Model = require('../model/editProfileModel.js');
const editProfileModel = new Model();

class editProfileController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            return res.render('editProfileView',{msg:null});
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    
    enterInfo (req,res){
        editProfileModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
    
}
module.exports = editProfileController;

