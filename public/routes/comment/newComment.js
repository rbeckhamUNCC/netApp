const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/comment/newComment"
var Comment = require("../../models/comment");
var Group = require("../../models/group");

const getGroupFunction = require('../group/getGroupFunction');


router.use(bodyParser.urlencoded({extended: true}));

router.post('/newComment',function(request,response){
   // console.log(request.body.groupId)   
   
   var newComment = new Comment({
       creatorName: global.fullName,
       //group:, //might not need as it would just be in the group's array...
       created: Date.now(),
       text: request.body.text,
   });

   // logic to find the current group and insert it into the comments array
   // the answer with 35 upvotes https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
     Group.updateOne({_id: request.body.groupId}, { $push: { comments: newComment  } } , function(error,success){
       if(error){
           console.log(error+ request.body.groupId);
           return response.status(500).send();
       }
      
       
   });

    Comment.collection.insertOne(newComment,function(err,savedGroup){
        if(err){
            console.log(err);
            return response.status(500).send();
        }
       
        getGroupFunction.getGroupFunc();    
      console.log(`Comment: "${newComment.text}" added!`);
      return response.status(200).redirect("/groupDashboard");
        
    });
});

module.exports = router