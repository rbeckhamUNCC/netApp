module.exports = {
    testAddToDB: function() {
    var express = require('express');
    var router = express.Router();

    var mongo = require('mongodb');
    const mongoose = require('mongoose');
    var assert = require ('assert');

    mongoose.connect('mongodb://localhost/groupmeet');

    mongoose.connection.once('open', function(){
        console.log('connected to groupmeet')
    }).on('error', function(err){
        console.log("Connection error: ", err)
    })

    // var mongoTestItem = {
    //     string: "string",
    //     array: ["0","1","2"],
    //     double: 1.00
    // };

    // mongo.connect(url, function(err, db) {
    //     assert.equal(null, err);
    //     db.collection('insert-test').insertOne(mongoTestItem, function(err, result){
    //         assert.equal(null, err)
    //         console.log("Added to DB")
    //         db.close();
    //     })
    // })
    }

}