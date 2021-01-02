const express = require('express');
const bodyParser = require('body-parser');
var app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
const PORT =process.env.PORT || 3000 ;
  
app.listen(PORT,(err) =>{
    if(err) throw err;
    console.log('Server is running on localhost:'+PORT);
});
