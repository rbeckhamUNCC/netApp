const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
router.use(bodyParser.urlencoded({extended: true}));

//   /user/login
router.post('/login',function(request,response){
    console.log("/login reached:" + request.body.email)
    var email = request.body.email;
    var password = request.body.password;
    //specify user to find by email and password
    User.findOne({email: email, password: password}, function(err,user){
         //user doesnt exist
       if(!user) {
           return response.status(404).send(`incorrect credentials!`);
       } //user exists

       if(err) {
           //error found, log error
           console.log(err);
           return response.status(500).send(`incorrect credentials!`);
       }
      
       //set logged in user session
       // below needs to be uncommented so that sessions can be set, maybe this needs to be put somewhere else
       //request.session.user = user;
       // after logged in
       return response.status(200).send(`${email} logged in!`);
    });
});

module.exports = router