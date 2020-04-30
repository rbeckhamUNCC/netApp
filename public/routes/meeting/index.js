const MainMeetingRouter = require("express").Router();

// "/meeting/newMeeting"
MainMeetingRouter.route("/newMeeting")
    .post(require("./newMeeting"))

// "/meeting/deleteMeeting"
MainMeetingRouter.route("/deleteMeeting")
    .post(require("./deleteMeeting"))    

module.exports = MainMeetingRouter;