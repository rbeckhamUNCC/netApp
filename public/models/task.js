const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    taskName: String,
    creatorName: String,//{type: Schema.Types.ObjectId, ref: 'User'},
    //group: {type: Schema.Types.ObjectId, ref: 'Group'},
    description: String,
    status: String

})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task