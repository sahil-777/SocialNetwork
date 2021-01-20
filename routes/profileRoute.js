const express = require('express');
const router = express.Router();
const Controller = require('../controller/profileController');
const profileController = new Controller();
router.get('/profile',(req,res)=>{
    profileController.displayPage(req,res);
});
/*
//Yet to be done
router.post('/login',(req,res)=>{
    loginController.enterInfo(req,res);
}); 
*/
module.exports = router;
