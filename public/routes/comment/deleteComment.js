const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Comment = require("../../models/comment");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

// "/comment/deleteComment/:id"
router.post('/deleteComment/:id',function(request,response){
    console.log(`Deleting Comment with id: ${request.body.id}`)
    Group.updateOne({_id: request.body.groupId}, { $pull: { comments: [request.body.commentId]  } } , function(error,success){
        if(error){
            console.log(error+ request.body.groupId);
            return response.status(500).send();
        }
            
       console.log(`Comment: ${request.body.commentId} removed from group: ${request.body.groupId}!`);
       // return response.status(200).send();
       response.send(`REDIRECT back to the place that was having the comments to bein with!`);  
         
     });
});

module.exports = router