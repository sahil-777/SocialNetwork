const express = require('express');
const router = express.Router();
const Controller = require('../controller/profileController');
const profileController = new Controller();
router.get('/profile',(req,res)=>{
    profileController.displayPage(req,res);
});

/*
NO POST METHOD FOR THIS ROUTE
router.post('/profile',(req,res)=>{
//    profileController.enterInfo(req,res);
}); 
*/
module.exports = router;
