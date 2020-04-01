//require the express library
const express = require('express');
//initialize a new application
const router = express.Router();
//
var User = require('../lib/User'); //possible error here due to filepath

// Get login page
router.get('/',function(request,response, next){
    response.render('index',{ title: 'Express' });
});

router.post('/register',function(request,response){
    var username = request.body.username;
    var password = request.body.password;
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    
    //save user
    newUser.save(function(err,savedUser){
        if(err){
            //log error if one exists
            console.log(err);
            return response.status(500).send();
        }
        //return successful status 
        return response.status(200).send();
    });
});

router.post('/login',function(request,response){
    var username = request.body.username;
    var password = request.body.password;
    User.findOne({username: username, password: password}, function(err,user){
       if(err) {
           console.log(err);
           return response.status(500).send();
       }
       //user doesnt exist
       if(!user) {
           return response.status(404).send();
       } //user exists
       request.session.user = user;
       return response.status(200).send();
    });
});

//view logged in user dashboard
router.get('/dashboard',function(request,response){
    if(!request.session.user){
        return ressponse.status(401).send();
    }
    return response.status(200).send("Welcome to the secret API");
});

//logout user
router.get('logout',function(request,response){
    request.session.destroy();
    return status(200).send();
})


module.exports = router;