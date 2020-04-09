
var express = require('express');
var path = require('path');
var app = express();

require("./routes")(app);

var logger = require('morgan');
var cookieParser = require('cookie-parser');
//allows extraction of form data
var bodyParser = require('body-parser');
//configure app to use session
var expressValidator = require('express-validator');
//configure app to use session
var expressSession = require('express-session');


const register = require('./routes/register.js');



//__MAYBE I NEED THESE FEW LINES????_______________________________________
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./routes/mongo');

// tests to see if adding to db is possible
testMongo.testAddToDB();
//____________________________________________



app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(request, response) {

    response.sendFile(__dirname + '/views/landing.html');
});


//// view engine setup ******************FOR AFTER DECISION OF TEMPLATE, NEXT 2 LINES
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views'}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/register', register);
//link to the login route
app.use('/login', register);

//default route for the landing page
app.get('/', function(request, response) {     
    response.sendFile(__dirname + '/views/landing.html');
});

//default route for the landing page
app.get('/dashboard', (request, response) => {
    response.sendFile(__dirname + "/views/dashboard.html");
});

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});
