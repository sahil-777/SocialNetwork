const express = require('express');
const router = express.Router();
const Api = require('../api/getProfilePic');
const getProfilePicApi = new Api();

router.get('/profilepic/:username',(req,res)=>{
    //console.log(getProfilePicApi.getPic);
    getProfilePicApi.getPic(req,res);
});

module.exports = router;
