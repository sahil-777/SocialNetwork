const connection = require('../config');
const moments = require('moment');  
class showFeedController{
    displayFeed (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
                    //console.log(req.params['id']);
            let sqlQuery="SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '"+req.params['id']+"' AND likedby = '"+req.session.num+"') LIMIT 1)"
            //console.log(sqlQuery);
            connection.query(sqlQuery,(error,result,field)=>{
                if(error) throw error; 
                result=JSON.stringify(result);
                //console.log(result);
                
                var initialLikedDisliked="like";
                if(result[result.length-3]=='1')
                    initialLikedDisliked="dislike";
                
                //console.log(initialLikedDisliked);
                let sqlQuery1="SELECT * FROM commentinfo WHERE feedname='"+req.params['id']+"' ORDER BY created_at DESC";
                connection.query(sqlQuery1,(error,comments)=>{
                    if(error) throw error;
                    /*console.log('Comments Data =>')
                     for(let i=0;i<comments.length;i++){
                        let dateTime=JSON.stringify(comments[i].created_at);
                        dateTime=dateTime.split('.');
                        dateTime=dateTime[0].split('"');
                        comments[i].created_at=dateTime[1];
                        console.log(dateTime[0]);
                    }*/
                    //console.log(comments);
                    let likeCountQuery="SELECT likes,username,created_at FROM userfeed WHERE feedname='"+req.params['id']+"'";
                    connection.query(likeCountQuery,(error,likeUserCreatedATCount)=>{
                        if(error) throw error;
                        console.log(likeUserCreatedATCount[0]);
                        return res.render('showFeedView',{ moment:moments,likeUserCreatedATCount:likeUserCreatedATCount[0],postId:req.params['id'],initialLikedDisliked:initialLikedDisliked,comments:comments});  
                    })
                });
            });
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    };
    
     

    uploadFeed(req,res) {
        /*if(err) {
            return res.end("Error uploading file.");
        }*/
        //console.log(req.file);

        let feedData={
            "userid":req.session.num,
            "feedname":req.file.filename,   
        }//Everything else is bydefault i.e. created_at,likes,id
        //console.log(feedData);
        let sql="INSERT INTO userfeed SET ?";
        connection.query(sql,feedData); 
        
        res.end("File is uploaded");
    };

    likeFeed(req,res){
            //console.log(req.url);
        //if(req.params['likeflag']=='comment')
        //return res.redirect('/profile/postFeed/'+req.params['id']+'/comment');
        let val='';
        if(req.params['likeflag']==1)
        val="+1";
        else val="-1"; 
        let sqlQuery="UPDATE userfeed SET likes=likes"+val+" WHERE feedname='"+req.params['id']+"'";
        //console.log('likkkkee');
        connection.query(sqlQuery,(error,result)=>{
            //console.log(result[0]);
            if(error) throw error;
        });
        let likeData={
            feedname:req.params['id'],//id=>feedname
            likedby:req.session.num
        }
        if(req.params['likeflag']==1)
        sqlQuery="INSERT INTO likeinfo SET ? ";
        else
        sqlQuery="DELETE FROM likeinfo WHERE (feedname= '"+likeData.feedname+ "' AND likedby= '"+likeData.likedby+"')";
        
        //console.log(sqlQuery);
        connection.query(sqlQuery,likeData,(error,result)=>{
            if(error) throw error;
            //console.log(sqlQuery);
        });  
        //console.log(sqlQuery);    
        if(req.params['likeflag']==1)
        console.log("liked Post: "+req.params['id']);
        else
        console.log("disliked Post: "+req.params['id']);
        
    //console.log(sqlQuery);

    };

    commentFeed(req,res){
        let commentData={
            "feedname":req.params['id'],
            "commenttext":req.body.commentText,
            "commentby":req.session.username,
            "commentto":0
        }
        //console.log(JSON.stringify(commentData));
        let sqlQuery="INSERT INTO commentinfo SET ? ";
        connection.query(sqlQuery,commentData,(error,result)=>{
            if(error) throw error;
            console.log(commentData);
            return res.redirect('/showfeed/'+commentData.feedname);
        });
        //return res.redirect('/showfeed/'+commentData.feedname);

    };
}
module.exports = showFeedController;

