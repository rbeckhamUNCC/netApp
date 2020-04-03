const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    creator: User,
    group: Group,
    created: Date,
    password: String,
    isReplyTo: String

}, { collection: 'comments' })

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment