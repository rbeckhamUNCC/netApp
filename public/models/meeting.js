const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    meetingName: String,
    //group: { type: Schema.Types.ObjectId, ref: 'Group'},
    creatorId: String,
    attendees: [{type: Schema.Types.ObjectId, ref: 'User'}],
    meetingTime: Date

})

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting