const connection = require('../config');
const Model = require('../model/homeModel');
const homeModel = new Model();

class homeController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            let feedQuery="SELECT username,feedname FROM userfeed WHERE userid!="+req.session.num;
            //console.log(feedQuery);
            connection.query(feedQuery,(error,feedResult)=>{
                for(let i=0;i<feedResult.length;i++)
                console.log(feedResult[i]);
                return res.render('homeView',{feedResult:feedResult});
            })
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

