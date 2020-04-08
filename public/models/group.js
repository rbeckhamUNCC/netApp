const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = require("../models/user");

const GroupSchema = new Schema({
    groupName: String,
    //founder:{ type: User or Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    meetings: [{type: Schema.Types.ObjectId, ref: 'Meeting'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    //image will be a file
    //groupImage: String,
    // No more files files: Array
        
}, { collection: 'groups' })

const Group = mongoose.model('groups', GroupSchema);

module.exports = Group