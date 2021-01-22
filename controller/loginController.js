const connection = require('../config');
const Model = require('../model/loginModel');
const loginModel = new Model();
class loginController{
    displayPage (req,res){
        req.session.num=null;
        return res.render('loginView',{msg:null});
    }

    enterInfo (req,res){
        loginModel.enterInfo(req,res);
    } 

}
module.exports = loginController;

