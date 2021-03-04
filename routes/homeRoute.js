const express = require('express');
const router = express.Router();
const Controller = require('../controller/homeController');
const homeController= new Controller();
router.get('/',(req,res)=>{
    homeController.displayPage(req,res); 
});

module.exports = router;
