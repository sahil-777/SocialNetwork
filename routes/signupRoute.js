const express = require('express');
const router = express.Router();
const Controller = require('../controller/signupController');
const signupController = new Controller();

router.get('/signup',(req,res)=>{
    signupController.displayPage(req,res);
});

router.post('/signup',(req,res)=>{
    signupController.enterInfo(req,res);
});

module.exports = router;
