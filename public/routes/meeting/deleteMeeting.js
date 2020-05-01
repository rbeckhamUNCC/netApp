const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Meeting = require("../../models/meeting");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

// "/meeting/deleteMeeting/"
router.get('/deleteMeeting/:meetingId',function(request,response){
    console.log(`Deleting Meeting with meetingId: ${request.params.meetingId}`)
    Meeting.deleteOne({_id: request.params.meetingIdId}, function(error,success){
        if(error){
            console.log(error);
            return response.status(500).send();
        }
            
       console.log(`Meeting: ${request.params.meetingId} removed!`);
              response.send(`REDIRECT back to the place that was having the meetings!`);  

       return response.status(200).send();
         
     });
});

module.exports = router