const express = require('express');
const router = express.Router();
const Controller = require('../controller/editProfileController');
const editProfileController = new Controller();

const multer=require('../middleware/multerSetup');

router.get('/edit',(req,res)=>{
    //res.send("Edit Profile");
    editProfileController.displayPage(req,res);
});

//Yet to be done
router.post('/edit',multer.single('profilePic'),(req,res)=>{
    editProfileController.enterInfo(req,res);
}); 

module.exports = router;
