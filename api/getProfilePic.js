const connection = require('../config');
class getProfilePicApi{
        getPic (req,res){
            let sqlQuery="SELECT profilepic FROM userinfo WHERE username='"+req.params.username+"'";
            console.log(sqlQuery);
            connection.query(sqlQuery,(error,profilePicResult)=>{
                if(error) throw error;
                console.log(profilePicResult);
                //return {profilePicResult:profilePicResult};
                //let htmlContent="<img src='/profilepics/"+profilePicResult[0].profilepic+"' alt='Users image'></img>";
                //console.log(htmlContent);
                //console.log(profilePicResult);
                //return res.send(htmlContent);
                return {profilePicResult:profilePicResult};
                //return false;
            })
        };
}
module.exports = getProfilePicApi;

