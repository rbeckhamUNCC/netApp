
var express = require('express');
var path = require('path');
var app = express();

require("./routes")(app);

//__MAYBE I NEED THESE FEW LINES????_______________________________________
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./routes/mongo');

// tests to see if adding to db is possible
testMongo.testAddToDB();
//____________________________________________



app.use(express.static(path.join(__dirname, 'public')));


// mongoose connoection*************IS THIS NEEDED HERE OR DO WE C0NNECT THROUGH REQUESTS???
const mongoose = require('mongoose');
// how to associate specific database
mongoose.connect('mongodb://localhost/groupmeet',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', function(request, response) {

    response.sendFile(__dirname + '/views/landing.html');
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

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});
