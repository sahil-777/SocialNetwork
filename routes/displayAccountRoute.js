const express = require('express');
const router = express.Router();
const Controller = require('../controller/displayAccountController');
const displayAccountController= new Controller();
router.get('/account/:username',(req,res)=>{
    displayAccountController.displayAccount(req,res); 
});

module.exports = router;
