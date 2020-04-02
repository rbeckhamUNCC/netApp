const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    taskName: String,
    maker: User,
    group: Group,
    description: String

})

const Task = mongoose.model('task', TaskSchema);

module.exports = Task