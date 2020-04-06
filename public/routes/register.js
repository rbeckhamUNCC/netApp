////require the express library
var express = require('express');
var router = express();
var User = require('../lib/User'); //correct file path.
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./mongo');
var path = require('path');
//configure app to use session
var session = require('express-session');
//allows extraction of form data
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.urlencoded({extended: false}));
//register session to app
router.use(session(
        {
            secret:"67i66igfi6&*6i%$&%^&U",
            resave: true,
            saveUninitialized: true
        }
));

router.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

// how to associate specific database
mongoose.connect('mongodb://localhost/groupmeet',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get login page
router.get('/',(request,response,next) => {
  response.sendFile(path.resolve('./views/login.html'));
});

//register new user and save to database
router.post('/signup',function(request,response){
    //route flag
    console.log("BEGINNING OF register action reached");
//remo
    var username = request.body.username;
    var password = request.body.password;
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;

    console.log(`username ${username}`);
    console.log(`password: ${password}`);
    console.log(`firstname: ${firstname}`);
    console.log(`lastname: ${lastname}`);

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    //save user
//    newUser.collection.insertOne(function(err,savedUser){
      User.collection.insertOne(newUser,function(err,savedUser){
        if(err){
            //log error if one exists
            console.log(err);
            return response.status(500).send();
        }
        //return successful status

       response.send(`User: ${newUser.username} added!`);
        console.log("loginpage.js register action reached end");
        return response.status(200).send();
        response.sendFile(path.resolve('./views/dashboard.html'));
    });
});

//login user
router.post('/login',function(request,response){
    var username = request.body.username;
    var password = request.body.password;
    //specify user to find by username and password
    User.findOne({username: username, password: password}, function(err,user){
       if(err) {
           //error found, log error
           console.log(err);
           return response.status(500).send();
       }
       //user doesnt exist
       if(!user) {
           return response.status(404).send();
       } //user exists
       //set logged in user session
       request.session.user = user;
       return response.status(200).send("logged in!");
    });
});

//view logged in user dashboard
router.get('/dashboard',function(request,response){
    if(!request.session.user){
        return response.status(401).send();
    }
    //display logged in user page
    return response.status(200).send("Welcome to the secret API");
});

//logout user
router.get('logout',function(request,response){
    request.session.destroy();
    return status(200).send();
});

module.exports = router;
