//var User = require('./lib/User'); //correct file path.
//
//
////require the express library
//const express = require('express');
////initialize a new application
//const app = express();
////set up a port
//const port = process.env.PORT || 8080;
////import mongo
//const testMongo = require('./routes/mongo');
////import the index route, CHANGED TO LOGINPAGE.JS
////const index = require('./routes/index.js');
////import the login route
//const login = require('./routes/loginpage.js');
//// tests to see if adding to db is possible
//testMongo.testAddToDB();
////var users = require('./routes/users');
//var path = require('path');
////configure app to use session
//var session = require('express-session');
////allows extraction of form data
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
////register session to app
//app.use(session(
//        {
//            secret:"67i66igfi6&*6i%$&%^&U",
//            resave: false,
//            saveUninitialized: true
//        }
//));
//
//app.use(express.static(path.join(__dirname, 'public')));
//
//const mongoose = require('mongoose');
//
//// how to associate specific database
//mongoose.connect('mongodb://localhost/groupmeet',
//{
//    useCreateIndex: true,
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//});
//
//const Schema = mongoose.Schema;
//
////for testing test database
//const UserSchema = new Schema({
//    firstname: String,
//    lastname: String
//});
//
////for testing groupmeet database
//const userSchema2 = new Schema({
//    username: {type: String, unique: true},
//    password: {type: String},
//    firstname: String,
//    lastname: String
//});
//
//
////for testing test database, string param is what database to use, in mongo shell, 'test' becomes 'tests', so use cmd db.tests.findOne()
//var UserModel = mongoose.model('test', userSchema2);
//
////!! Will need to move these to the Routes folder eventually!!
////specifying the static route
//app.use('/assets', express.static('assets'));
//
////link to the login route
//app.use('/login', login);
//
//////link to the index route, CHANGED TO LOGINPAGE.JS
////app.use('/index', index);
//
////default route for the landing page
//app.get('/', (request, response) => {
//    response.sendFile(__dirname + '/views/landing.html');
//});
//
//app.get('/login', function(request, response) {
//    response.sendFile(path.join(__dirname + '/views/login.html'));
//});
//
////default route for the landing page
//app.get('/dashboard', (request, response) => {
//    response.sendFile(__dirname + "/views/dashboard.html");
//});
//
//// robs practice
//app.get('/dbtest', function(request,response){
////    var responseObject = {message:"hello"};
////    response.send(responseObject);
//   response.sendFile(__dirname + '/views/dbtestpage.html');
//});
//
////TESTACTION add user individual user to test db
//app.post('/addname/:firstname/:lastname', function(request, response){
//
//    var first = request.params.firstname;
//    var last = request.params.lastname;
//    var user = new UserModel();
//    user.firstname = first;
//    user.lastname = last;
//    user.save(function(err,savedObject){
//            if(err){
//                console.log(err);
//                response.status(500);
//            } else{
//                response.send(savedObject);
//            }
//    });
//});
//
//
////TESTACTION read all saved data in databse with empty object check, currently working and set to test db
//app.get('/likes', function(request,response){
//    UserModel.find({}, function(err,foundData){
//        if(err){
//            console.log(err);
//            response.status(500).send();
//        }else{
//            if(foundData.length === 0){
//                var responseObject = undefined;
//                responseObject = {count:0};
//                response.status(404).send(responseObject);
//            } else{
//                var responseObject = foundData;
//                console.log("reached here");
//                response.send(responseObject);
//            }
//        }
//    });
//});
//
////TESTACTION read all saved data in databse error check, currently working and set to test db
//app.get('/readall', function(request,response){
//    User.find({}, function(err,foundData){
//        if(err){
//            var responseObject = undefined;
//            console.log(err);
//            response.status(404).send(responseObject);
//        }else{
//        var responseObject = foundData;
//        response.send(responseObject);
//        }
//    });
//});
//
////TESTACTION remove all data from test db
//app.get('/deleteall', function(request,response){
//    UserModel.find({}, function(err,foundData){
//        UserModel.deleteMany(function(err){
//            if(err){
//            console.log(err);
//            }
//        });
//    });
//});
//
////app.post('/register',function(request,response){
////    var username = request.body.username;
////    var password = request.body.password;
////    var firstname = request.body.firstname;
////    var lastname = request.body.lastname;
////
////    var newUser = new UserModel2();
////    newUser.username = username;
////    newUser.password = password;
////    newUser.firstname = firstname;
////    newUser.lastname = lastname;
////
////    //save user
////    newUser.save(function(err,savedUser){
////        if(err){
////            //log error if one exists
////            console.log(err);
////            return response.status(500).send();
////        }
////        //return successful status
////        return response.status(200).send();
////    });
////});
//
////initialize and listen on a port
//app.listen(port, () => {
//    console.log(`App has started and is listening on port ${port}`);
//});
