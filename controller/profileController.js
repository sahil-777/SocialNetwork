const connection = require('../config');
const Model = require('../model/profileModel');
const profileModel = new Model();

class profileController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            let sql="SELECT * FROM userinfo WHERE id = "+req.session.num;
            connection.query(sql,(error,result)=>{
                if(error) throw error;
                //console.log(result[0]);
                var imageName=result[0].profilepic;
                //console.log(imageName);
                if(typeof imageName=='object'){ imageName = "default_profilepic.png"; }

                let feedQuery="SELECT * FROM userfeed WHERE userid = "+req.session.num; 
                connection.query(feedQuery,(error,feedResult)=>{
                    //console.log(feedResult);
                    
                    let likeQuery="SELECT DISTINCT feedname FROM likeinfo WHERE likedby="+req.session.num;
                    //console.log(likeQuery);
                    connection.query(likeQuery,(error,likeResult)=>{
                        if(error) throw error;
                        //console.log(likeResult);
                        let followQuery="SELECT followers,following FROM followcount WHERE username='"+req.session.username+"'";
                        connection.query(followQuery,(error,followResult)=>{
                            if(error) throw error;
                            console.log(followResult);
                            return res.render('profileView',{data:result[0],dpName:imageName,feedResult:feedResult,likeResult:likeResult,followResult:followResult[0]});
                        });
                    });
                })
            });
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    
    enterInfo (req,res){
        profileModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 

    uploadFeed(req,res) {
        /*if(err) {
            return res.end("Error uploading file.");
        }*/
        //console.log(req.file);

        let feedData={
            "userid":req.session.num,
            "username":req.session.username,
            "feedname":req.file.filename,   
        }//Everything else is bydefault i.e. created_at,likes,id
        //console.log(feedData);
        let sql="INSERT INTO userfeed SET ?";
        connection.query(sql,feedData); 
        
        res.end("File is uploaded");
    };

    searchProfile(req,res){
        //console.log(req.query.key);
        connection.query('SELECT username from users where username like "%'+req.query.key+'%"', function(err, rows, fields) {
            if (err) throw err;
        var data=[];
        for(let i=0;i<rows.length;i++)
            {
            data.push(rows[i].username);
            }
            res.end(JSON.stringify(data));
        });
        
    //	return false; 
    }
}
module.exports = profileController;

