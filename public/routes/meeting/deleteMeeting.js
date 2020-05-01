const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");
var Meeting = require("../../models/meeting");
router.use(bodyParser.urlencoded({extended: true}));

// "/meeting/deleteMeeting/:id"
router.post('/deleteMeeting/:id',function(request,response){
    console.log(`Deleting Meeting with id: ${request.body.id}`)
    Group.updateOne({_id: request.body.groupId}, { $pull: { meetings: [request.body.meetingId]  } } , function(error,success){
        if(error){
            console.log(error+ request.body.groupId);
            return response.status(500).send();
        }
            
       console.log(`meeting: ${request.body.meetingId} removed from group: ${request.body.groupId}!`);
       // return response.status(200).send();
       response.send(`REDIRECT back to the place that was having the meetings!`);  
         
     });
});

module.exports = router