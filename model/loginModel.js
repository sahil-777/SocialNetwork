const connection = require('../config');
class loginModel {
   
  enterInfo(req,res){

            var data ={
                "username":req.body.userName,
                "password":req.body.passWord,
            };
            //console.log(data);
        
            connection.query('SELECT * FROM users WHERE username = ?',data.username,function (error, results, fields) {
                if (error) {
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                }else{
                  if(results.length >0){
                    const comparision = data.password==results[0].password? true:false;
                    if(comparision){
                        var msg=null;
                        
                        //SESSION
                        req.session.num=results[0].id;
                        req.session.username=data.username;
                        return res.redirect('/');
                        
                    }
                    else{
                      req.session.num=null;
                      req.session.username=null;
                       var msg="Username and password do not match";
                       return res.render('loginView',{msg:msg});
                    }
                  }
                  else{
                    req.session.num=null;
                    req.session.username=null;
                    var msg="Username does not exists";
                        return res.render('loginView',{msg:msg});
                    }
                }
            });
          }
  }
module.exports = loginModel;