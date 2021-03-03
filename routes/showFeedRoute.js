const express = require('express');
const router = express.Router();
const Controller = require('../controller/showFeedController');
const showFeedController = new Controller();

router.get('/showfeed/:id',(req,res)=>{
    showFeedController.displayFeed(req,res);
    //res.send(html); 
});

router.post('/profile/postFeed/:id/likeImage/:likeflag',(req,res)=>{
    showFeedController.likeFeed(req,res); 
});

router.post('/profile/postFeed/:id/comment',(req,res)=>{
    showFeedController.commentFeed(req,res);
}); 


module.exports = router;
