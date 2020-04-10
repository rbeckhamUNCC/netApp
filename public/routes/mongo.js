
module.exports = {
    connectToDB: function() {
    var express = require('express');
    var router = express.Router();

    // './node_modules/express' above and './node_modules/mongodb' below

    var mongo = require('mongodb');
    const mongoose = require('mongoose');
    var assert = require ('assert');

    const options = {
        keepAlive: 1,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      };
   
    mongoose.connect( 'mongodb://localhost/groupmeet' || process.env.MONGODB_URI, options);
    mongoose.connection.once('open', function(){
        console.log('connected to groupmeet')
    }).on('error', function(err){
        console.log("Connection error: ", err)
    })

    }

}