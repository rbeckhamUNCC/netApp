const MainMeetingRouter = require("express").Router();

// "/meeting/newMeeting"
MainMeetingRouter.route("/newMeeting")
    .post(require("./newMeeting"))

// "/meeting/getMeetings"
MainMeetingRouter.route("/getMeetings")
    .post(require("./getMeetings"))

// "/meeting/deleteMeeting"
MainMeetingRouter.route("/deleteMeeting/:meetingId")
    .get(require("./deleteMeeting"))    

module.exports = MainMeetingRouter;