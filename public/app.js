//require the express library
const express = require('express');
//initialize a new application
const app = express();
//set up a port
const port = process.env.PORT || 8080;
//import mongo
const testMongo = require('./routes/mongo');
// tests to see if adding to db is possible
testMongo.testAddToDB();

//!! Will need to move these to the Routes folder eventually!!
//specifying the static route
app.use('/assets', express.static('assets'));

//default route for the landing page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/landing.html');
});

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});