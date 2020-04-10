
var express = require('./node_modules/express');
var path = require('path');
var app = express();

//require("./public/routes")(app);

var logger = require('./node_modules/morgan');
var cookieParser = require('./node_modules/cookie-parser');
//allows extraction of form data
var bodyParser = require('./node_modules/body-parser');
//configure app to use session
var expressValidator = require('./node_modules/express-validator');
//configure app to use session
var expressSession = require('./node_modules/express-session');


const register = require('./public/routes/register.js');



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
  response.sendFile(path.resolve('./public/views/login.html'));
});
app.get('/register',(request,response,next) => {
    response.sendFile(path.resolve('./public/views/register.html'));
  });

//default route for the landing page
app.get('/', function(request, response) {     
    response.sendFile(__dirname + '/public/views/landing.html');
});

//default route for the landing page
// app.get('/dashboard', function(request, response) {
//     response.render('dashboard');
// });

app.get('/dashboard', function(request, response) {
    response.render(path.join(__dirname + '/public/views/dashboard'));
});

app.get('/groupdashboard', function(request, response) {
    response.render(path.join(__dirname + '/public/views/groupdashboard'));
});


app.get('/MyAvailability', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/views/MyAvailability.html'));
});

app.get('/MyAccount', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/views/MyAccount.html'));
});

app.post('/login',function(request,response){
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

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
    console.log(`http://localhost:${port}`);
    console.log('connecting to mongoDB...')
});

