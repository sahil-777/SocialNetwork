const express = require('express');
const router = express.Router();
const Controller = require('../controller/loginController');
const loginController = new Controller();
router.get('/login',(req,res)=>{
    loginController.displayPage(req,res);
});

router.post('/login',(req,res)=>{
    loginController.enterInfo(req,res);
}); 

module.exports = router;
