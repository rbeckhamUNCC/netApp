//require the express library
const express = require('express');
//initialize a new application
const app = express();
//set up a port
const port = process.env.PORT || 8080;

//specifying the static route
app.use('/assets', express.static('assets'));

//default route for the landing page
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/landing.html');
});

app.use('/dashboard', function(request, response){
    response.sendFile(__dirname + '/views/dashboard.html');
});

//initialize and listen on a port
app.listen(port, () => {
    console.log(`App has started and is listening on port ${port}`);
});

