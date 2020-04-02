const mongoose = require('mongoose');

//create user model
const userSchema3 = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname: String
});

var User = mongoose.model('logintestcollection', userSchema3);

module.exports = User;