const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    email: String,
    password: String,
    availableTimes: Array,
    //image will be a file
    profilePic: String

}, { collection: 'users' })

const User = mongoose.model('user', UserSchema);

module.exports = User