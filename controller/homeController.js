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
                for(let i=0;i<feedResult.length;i++)
                 console.log(feedResult[i]);
            
                 return res.render('homeView',{feedResult:feedResult});
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

