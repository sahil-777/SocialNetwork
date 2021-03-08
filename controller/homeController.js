const connection = require('../config');
const Model = require('../model/homeModel');
const homeModel = new Model();

class homeController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            let feedQuery="SELECT followinfo.following AS username,userfeed.feedname AS feedname FROM userfeed INNER JOIN followinfo "+ 
             " ON userfeed.username = followinfo.following WHERE followinfo.follower= '"+req.session.username+"' ORDER BY created_at DESC"; 
            //WHERE userid!="+req.session.num;
            //console.log(feedQuery);
             connection.query(feedQuery,(error,feedResult)=>{
                if(error) throw error;
                if(feedResult.length==0)
                return res.render('homeView',{feedResult:feedResult});
                for(let i=0;i<feedResult.length;i++){
                    let fdname=feedResult[i].feedname;
                    let userId=req.session.num;
                    //console.log(req.body)
                    //feedname+="1";
                    let isLikedQuery="SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '"+fdname+"' AND likedby = '"+userId+"') LIMIT 1)"
                    connection.query(isLikedQuery,(error,isLikedResult)=>{
                        if(error) throw error;
                        let R=JSON.stringify(isLikedResult[0]);
                        //console.log(R);
                        if(R[R.length-2]=='1'){
                            feedResult[i].isliked="dislike";
                        }
                        else
                        feedResult[i].isliked="like";
                        console.log(feedResult[i]);
                        
                        if(i==feedResult.length-1){
                            return res.render('homeView',{feedResult:feedResult});
                        }
                    });
                }
                // for(let i=0;i<feedResult.length;i++){
                //     console.log(feedResult[i]);
                // }

             });
        }
        else{  
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    /*
    //Yet to be done
    enterInfo (req,res){
        homeModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
    */
}
module.exports = homeController;

