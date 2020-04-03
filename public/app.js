var User = require('./lib/User'); //correct file path.


//require the express library
const express = require('express');
//initialize a new application
const app = express();
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./routes/mongo');
//import the index route, CHANGED TO LOGINPAGE.JS
//const index = require('./routes/index.js');
//import the login route
const login = require('./routes/loginpage.js');
// tests to see if adding to db is possible
testMongo.testAddToDB();
//var users = require('./routes/users');
var path = require('path');
//configure app to use session
var session = require('express-session');
//allows extraction of form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//register session to app
app.use(session(
        {
            secret:"67i66igfi6&*6i%$&%^&U",
            resave: false,
            saveUninitialized: true
        }
));

app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');

// how to associate specific database
mongoose.connect('mongodb://localhost/groupmeet',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

//for testing test database
const UserSchema = new Schema({
    firstname: String,
    lastname: String
});

//for testing groupmeet database
const userSchema2 = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname: String
});

//for testing test database
//var UserModel = mongoose.model('test', UserSchema);
//
//for testing test database, string param is what database to use, in mongo shell, 'test' becomes 'tests', so use cmd db.tests.findOne()
var UserModel = mongoose.model('usermodel', userSchema2);

//setup preloaded users version
var UserModel2 = mongoose.model('preloadedUser', userSchema2);


//!! Will need to move these to the Routes folder eventually!!
//specifying the static route
app.use('/assets', express.static('assets'));

//link to the login route
app.use('/login', login);
//localhost:8080/login
// localhost:8080/login/index/register
//link to the login route
//app.use('/register', login);

////link to the index route, CHANGED TO LOGINPAGE.JS
//app.use('/index', index);

//default route for the landing page
app.get('/', (request, response) => {
    
    var users = [
        {_id: 1, username: "matt1", password: "1234", firstname: "m1", lastname: "m1"},
        {_id: 2,username: "rob2", password: "1234", firstname: "r2", lastname: "b2"}
    ];
    
    User.collection.insertMany(users, function (err, docs) {
          if (err){ 
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to Collection");
          }
        });
        //send to landing page
    response.sendFile(__dirname + '/views/landing.html');
});

app.get('/login', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/login.html'));
});

//default route for the landing page
app.get('/dashboard', (request, response) => {
    response.sendFile(__dirname + "/views/dashboard.html");
});

// robs practice
app.get('/dbtest', function(request,response){
//    var responseObject = {message:"hello"};
//    response.send(responseObject);
   response.sendFile(__dirname + '/views/dbtestpage.html');
});

//TESTACTION add user individual user to test db
app.post('/addname/:firstname/:lastname', function(request, response){
    
    var first = request.params.firstname;
    var last = request.params.lastname;
    var user = new User();
    user.firstname = first;
    user.lastname = last;
    user.save(function(err,savedObject){
            if(err){
                console.log(err);
                response.status(500);
            } else{
                response.send(savedObject);
            }
    });
});




//TESTACTION read all saved data in databse with empty object check, currently working and set to test db
app.get('/likes', function(request,response){
    UserModel.find({}, function(err,foundData){
        if(err){
            console.log(err);
            response.status(500).send();
        }else{
            if(foundData.length === 0){
                var responseObject = undefined;
                responseObject = {count:0};
                response.status(404).send(responseObject);
            } else{
                var responseObject = foundData;
                console.log("reached here");
                response.send(responseObject);
            }
        }
    });
});

//TESTACTION read all saved data in databse error check, currently working and set to test db
app.get('/readall', function(request,response){  // YOU HAVE THIS CHECKING GROUPMEET DB FOR COLLECTION groupmeet that has stored USER MODELS
    User.find({}, function(err,foundData){
        if(err){
            var responseObject = undefined;
            console.log(err);
            response.status(404).send(responseObject);
        }else{
        var responseObject = foundData;
        response.send(responseObject);
        }
    });
});

//TESTACTION remove all data from test db
app.get('/deleteall', function(request,response){
    UserModel.find({}, function(err,foundData){
        UserModel.deleteMany(function(err){
            if(err){
            console.log(err);
            }
        });
    });
});

//app.post('/index/register',function(request,response){
//    var userName = request.body.userName;
//    var password = request.body.password;
//    var firstName = request.body.firstName;
//    var lastName = request.body.lastName;
// 
//    var newUser = new User({
//     username : userName,
//     password : password,
//     firstname : firstName,
//     lastname : lastName
//    });
//    console.log(newUser.username);
//    console.log(request.body);
// 
//    User.collection.insertOne(newUser, function (err, docs) {
//     if (err){ 
//         return console.error(err);
//     } else {
//       console.log("New user added");
//       response.send(`User: ${newUser.username} added!`);
//     }
//   });
// });

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});