
var express = require('./node_modules/express');
var path = require('path');
var app = express();

require("./public/routes")(app);

var logger = require('./node_modules/morgan');
var cookieParser = require('./node_modules/cookie-parser');
//allows extraction of form data
var bodyParser = require('./node_modules/body-parser');
//configure app to use session
var expressValidator = require('./node_modules/express-validator');
//configure app to use session
var expressSession = require('./node_modules/express-session');


const register = require('./public/routes/register.js');

global.fullName = "Not Signed In";


//__MAYBE I NEED THESE FEW LINES????_______________________________________
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const mongo = require('./public/routes/mongo');

// tests to see if adding to db is possible
mongo.connectToDB();
//____________________________________________
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(request, response) {

    response.sendFile(__dirname + '/public/views/landing.html');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//register session to app
app.use(expressSession(
        {
            secret:"67i66igfi6&*6i%$&%^&U",
            resave: false,
            saveUninitialized: false
        }
));

//Route Specification
//specifying the static route
app.use('/assets', express.static('assets'));
//link to the registration route
// app.use('/register', register);
//link to the login route
//app.use('/login', register);
app.get('/login',(request,response,next) => {
  response.sendFile(__dirname + '/public/views/login.html');
});
app.get('/register',(request,response,next) => {
    response.sendFile(__dirname + '/public/views/register.html');
  });

//default route for the landing page
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/views/landing.html');
});

app.get('/addTaskModal',(request,response,next) => {
  response.sendFile(__dirname + '/public/views/addTaskModal.html');
});

//default route for the landing page
// app.get('/dashboard', function(request, response) {
//     response.render('dashboard');
// });

app.get('/dashboard', function(request, response) {
    response.render(__dirname + '/public/views/dashboard');
});

app.get('/groupdashboard', function(request, response) {
    response.render(__dirname + '/public/views/groupdashboard');
});


app.get('/MyAvailability', function(request, response) {
    response.render(__dirname + '/public/views/MyAvailability');
});

app.get('/MyAccount', function(request, response) {
    response.render(__dirname + '/public/views/MyAccount');
});

app.get('/groupSettings', function(request, response) {
  response.render(__dirname + '/public/views/groupSettings');
})

app.get('/meetingTimes', function(request, response) {
  response.render(__dirname + '/public/views/groupMeetingTimes');
})

app.get('/taskManager', function(request, response) {
  response.render(__dirname + '/public/views/taskManager');
})



//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`https://groupmeet-capstone.herokuapp.com/`);
    console.log('connecting to mongoDB...')
});
