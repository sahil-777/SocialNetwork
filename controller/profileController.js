const connection = require('../config');
const Model = require('../model/profileModel');
const profileModel = new Model();
class profileController{
    displayPage (req,res){
     return res.render('profileView');
    }
/*
//Yet to be done
    enterInfo (req,res){
        loginModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
*/
}
module.exports = profileController;

