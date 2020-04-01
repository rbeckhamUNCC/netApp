var express = require('express');
var router = express.Router();
var User = require('user'); //possible error here

// Get login page
router.get('/',function(request,response){
    res.render('index',{title: 'Express'});
});

router.post('/register',function(request,response){
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    
    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    
    //save user
    newuser.save(function(err,savedUser){
        if(err){
            //log error if one exists
            console.log(err);
            return res.status(500).send();
        }
        //return successful status 
        return res.status(200).send();
    });
});