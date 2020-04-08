const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require("../models/user");

const GroupSchema = new Schema({
    groupName: String,
    //founder: User,
    members: Array,
    meetings: Array,
    comments: Array,
    tasks: Array,
    //image will be a file
    //groupImage: String,
    // No more files files: Array
        
}, { collection: 'groups' })

const Group = mongoose.model('groups', GroupSchema);

module.exports = Group