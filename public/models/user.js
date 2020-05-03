const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id: {type: mongoose.Schema.Types.ObjectId},
    // _id: mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    email: String,
    password: String,
    availableTimes: {type: Map, of: Array},
    //image will be a file
    profilePic: String

})

const User = mongoose.model('User', UserSchema);

module.exports = User
