const connection = require('../config');
const Model = require('../model/profileModel');
const profileModel = new Model();

class profileController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            return res.render('profileView');
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    /*
    //Yet to be done
    enterInfo (req,res){
        homeModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
    */
}
module.exports = profileController;

