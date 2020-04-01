//require the express library
const express = require('express');
//initialize a new application
const app = express();
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./routes/mongo');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groupmeet',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String
});

const User = mongoose.model('addname', UserSchema);


// tests to see if adding to db is possible
testMongo.testAddToDB();

//!! Will need to move these to the Routes folder eventually!!
//specifying the static route
app.use('/assets', express.static('assets'));

//default route for the landing page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/landing.html');
});

//// robs practice
//app.get('/hello', function(request,response){
//    var responseObject = {message:"hello"};
//    response.send(responseObject);
//});

//default route for the landing page
app.get('/dash', (request, response) => {
//    response.sendFile("dashboard.html");
});

// robs practice
app.get('/dbtest', function(request,response){
//    var responseObject = {message:"hello"};
//    response.send(responseObject);
   response.sendFile(__dirname + '/views/dbtestpage.html');
});

//default route for the landing page
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

    //    var myData = new User(req.body);
//  myData.save()
//    .then(item => {
//      reponse.send("item saved to database");
//    })
//    .catch(err => {
//      reponse.status(400).send("unable to save to database");
//    });
});

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});
