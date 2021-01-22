const connection = require('../config');
const Model = require('../model/homeModel');
const homeModel = new Model();

class homeController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            return res.render('homeView');
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
module.exports = homeController;

