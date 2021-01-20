const connection = require('../config');
const Model = require('../model/signupModel');
const signupModel = new Model();
class signupController{
    displayPage (req,res){
        return res.render('signupView',{msg:null});
    }

    enterInfo (req,res){
        signupModel.enterInfo(req,res);
        res.redirect('/');
    } 
}

module.exports = signupController;

