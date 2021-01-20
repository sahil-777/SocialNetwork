const connection = require('../config');
const Model = require('../model/loginModel');
const loginModel = new Model();
class loginController{
    displayPage (req,res){
        return res.render('loginView',{msg:null});
    }

    enterInfo (req,res){
        loginModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 

}
module.exports = loginController;

