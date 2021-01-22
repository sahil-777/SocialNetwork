const connection = require('../config');
const Model = require('../model/homeModel');
const homeModel = new Model();
const session = require('../model/loginModel');
class homeController{
    displayPage (req,res){
        if(session.ID)
        return res.render('homeView');
        else return res.render('loginView',{msg:null});
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

