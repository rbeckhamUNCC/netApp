const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/meeting/newMeeting"
var Meeting = require("../../models/meeting");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newMeeting',function(request,response){
   // console.log(request.body.groupId)   
   
   var newMeeting = new Meeting({
       creatorId: request.body.creatorId,
       meetingName: request.body.meetingName,
       meetingTime: Date.now(), //will need to be a selected date or changed to string
       description: request.body.description,
       meetingName: String,
       attendees: []
   });

   // logic to find the current group and insert it into the Meetings array
   // the answer with 35 upvotes https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
     Group.updateOne({_id: request.body.groupId}, { $push: { meetings: newMeeting  } } , function(error,success){
       if(error){
           console.log(error+ request.body.groupId);
           return response.status(500).send();
       }
      response.send(`Meeting: "${newMeeting.text}" added!`);     
      console.log(`Meeting: "${newMeeting.text}" added!`);
       return response.status(200).send();
   });
});

module.exports = router