const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: String,
    founder: User,
    members: Array,
    meetings: Array,
    comments: Array,
    tasks: Array,
    //image will be a file
    groupImage: String,
    files: Array
        
})

const Group = mongoose.model('group', GroupSchema);

module.exports = Group