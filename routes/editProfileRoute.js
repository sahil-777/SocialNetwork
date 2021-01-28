const express = require('express');
const router = express.Router();
const Controller = require('../controller/editProfileController');
const editProfileController = new Controller();
router.get('/edit',(req,res)=>{
    //res.send("Edit Profile");
    editProfileController.displayPage(req,res);
});
/*
//Yet to be done
router.post('/login',(req,res)=>{
    loginController.enterInfo(req,res);
}); 
*/
module.exports = router;
