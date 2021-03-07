const connection = require('../config');
class likeApi{
    isLiked(req,res){
        let feedname=req.body.feedname;
        let userId=req.session.num;
        //console.log(req.body)
        //feedname+="1";
        let isLikedQuery="USE socialnetwork;SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '"+feedname+"' AND likedby = '"+userId+"') LIMIT 1)"
        connection.query(isLikedQuery,(error,isLikedResult)=>{
            if(error) throw error;
            let R=JSON.stringify(isLikedResult[1]);
            console.log(R);
            let flag=false;
            if(R[R.length-3]=='1'){
                console.log("Yes");
                flag=true;
            }
            else{
            console.log("No");
            }
            return res.send(flag);
        });
     }
     
}
module.exports = likeApi;

