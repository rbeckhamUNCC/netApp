const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Meeting = require("../../models/meeting");
var Group = require("../../models/group");

router.use(bodyParser.urlencoded({extended: true}));

// /meeting/getMeetings
router.post('/getMeetings',function(request,response){
    Group.findOne({_id: request.body.groupId}).populate("meetings").exec(function(error,group){
            if(error){
                console.log(error + request.body.groupId);
                return response.status(500).send();
            }
            else {
                var groupMeetings = group["meetings"]
                console.log("Meetings: " + groupmeetings)
        return response.status(200).send();}
            });
});

module.exports = router