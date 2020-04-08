const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    group: Group,
    created: {type: Date, default: Date.now},
    isReplyTo: {type: Schema.Types.ObjectId, ref: 'Comment'}

})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment