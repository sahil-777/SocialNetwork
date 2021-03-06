const connection = require('../config');

class displayAccountController{
    displayAccount (req,res){
        //console.log(req.session.num);
        // if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
        //     console.log("LoggedIn "+req.session.num);
        //     return res.render('homeView');
        // }
        // else{ 
        //     console.log("Not loggedIn "+req.session.num);
        //     return res.redirect('/login');
        // }
          //alert(req.param.username);
  console.log("Searched for =>  "+req.params['username']);
  if(req.params['username']==req.session.username)
  return res.redirect('/profile');
  else{
    let sqlQuery1="SELECT id FROM users WHERE username='"+req.params['username']+"'";
    connection.query(sqlQuery1,(error,searchId)=>{
      if(error) throw error;
      //console.log(searchId[0].id);



      let sql="SELECT * FROM userinfo WHERE id = "+searchId[0].id;
      //console.log("searchId1=> "+searchId[0].id);
            connection.query(sql,(error,result)=>{
                if(error) throw error;
                //console.log("userinfo => "+result[0]);
                var imageName=result[0].profilepic;
                //console.log(imageName);
                if(typeof imageName=='object'){ imageName = "default_profilepic.png"; }
                //console.log("searchId2=> "+searchId[0].id);
                let feedQuery="SELECT * FROM userfeed WHERE userid = "+searchId[0].id ; 
                connection.query(feedQuery,(error,feedResult)=>{
                    //console.log("feedresult => "+feedResult);
                    
                    let likeQuery="SELECT DISTINCT feedname FROM likeinfo WHERE likedby="+searchId[0].id;
                    //console.log(likeQuery);
                    connection.query(likeQuery,(error,likeResult)=>{
                        if(error) throw error;
                        //console.log(likeResult);
                        //res.send("Hii");
                        let followQuery="SELECT EXISTS(SELECT 1 FROM followinfo WHERE (follower = '"+req.session.username+"' AND following = '"+result[0].username+"') LIMIT 1)";
                        //console.log(followQuery);
                        connection.query(followQuery,(error,followResult)=>{
                            if(error) throw error;
                            followResult=JSON.stringify(followResult);
                            //console.log(result);
                
                            let initialFollowedUnfollowed="Follow";
                            if(followResult[followResult.length-3]=='1')
                            initialFollowedUnfollowed="Unfollow";
                            
                            let followQuery="SELECT followers,following FROM followcount WHERE username='"+result[0].username+"'";
                            connection.query(followQuery,(error,followResult)=>{
                            if(error) throw error;
                            //console.log(followResult);
                            return res.render('showAccountView',{data:result[0],dpName:imageName,feedResult:feedResult,likeResult:likeResult,initialFollowedUnfollowed:initialFollowedUnfollowed,followResult:followResult[0]});
                            });
                        })
                    });
                })
            });



    });
    //return res.render('showAccountView');
  }
  //return false;
  //res.send(req.param['username']);
    }
    /*
    //Yet to be done
    enterInfo (req,res){
        homeModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
    */
    followUser(req,res){
        if(req.session.num!=null && typeof req.session.num!="undefined"){
            console.log('Flag=> '+req.body.flag);
            let flag=req.body.flag;
            //console.log(req.session.username);
            //console.log(req.body.following);
            //let follower=req.session.username,following=req.body.following;
            let followData={
                follower:req.session.username,
                following:req.body.following
            }
            let sqlQuery="INSERT INTO followinfo SET ?";
            if(flag==0)
            sqlQuery="DELETE FROM followinfo WHERE (follower= '"+followData.follower+ "' AND following= '"+followData.following+"')";

            connection.query(sqlQuery,followData,(error,result)=>{
                if(error) throw error;
            });
            

            let val="+1";
            if(flag==0)
            val="-1";
            sqlQuery="UPDATE followcount SET following = following "+val+" WHERE username='"+followData.follower+"'";
            connection.query(sqlQuery,(error,result)=>{
                if(error) throw error;
            });
    
            sqlQuery="UPDATE followcount SET followers = followers "+val+" WHERE username='"+followData.following+"'";
            connection.query(sqlQuery,(error,result)=>{
                if(error) throw error;
            });

        }
        else{
            //console.log("Going to login");
            return res.redirect('/login');
        }
    }
}
module.exports = displayAccountController;

