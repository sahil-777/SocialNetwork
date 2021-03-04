const express = require('express');
const router = express.Router();
const Controller = require('../controller/profileController');
const profileController = new Controller();

const multer=require('../middleware/multerSetup');

router.get('/profile',(req,res)=>{
    profileController.displayPage(req,res);
});

/*
NO POST METHOD FOR THIS ROUTE
router.post('/profile',(req,res)=>{
//    profileController.enterInfo(req,res);
}); 
*/
router.post('/profile/postFeed',multer.single('userFeed'),(req,res)=>{
    profileController.uploadFeed(req,res);
});
module.exports = router;

router.get('/profile/search',function(req,res){
    profileController.searchProfile(req,res);
});