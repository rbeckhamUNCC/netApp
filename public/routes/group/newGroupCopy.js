const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

// "/group/newGroup"
router.post('/newGroup',function(request,response){
    console.log(request.body.groupName)
    //the founders id should be given and they should also be added to  members
    //var members = []
   
   
   
   var newGroup = new Group({
       groupName: request.body.groupName,
       //founder id is sent in hidden form input that takes from cookie, or whatever unique identifer
     //  founder: request.body.userId,
       members: [global.userId],
       meetings: [],
       comments: [],
       tasks: [],
       //image will be a file
       //groupImage: String,
   });
   Group.find({groupName: request.body.groupName})
   .exec()
   .then(group => {
     //If group exists just add the user to the group
     if(group.length >= 1){
      Group.updateOne({_id: request.body.groupId}, { $push: { members: request.body.userId  } } , function(error,success){
        if(error){
            console.log(error+ request.body.groupId);
            return response.status(500).send();
        }
            
       console.log(`Member(User: ${request.body.userId}) added to group: ${request.body.groupId}!`);
       // return response.status(200).send();
       
         
     });
     User.updateOne({_id: request.body.userId}, { $push: { groups: request.body.groupId  } } , function(error,success){
         if(error){
             console.log(error+ request.body.userId);
             return response.status(500).send();
         }
        response.send(`User and Group updated!`);     
        console.log(`Group ${request.body.groupId} added to groups of user: ${request.body.userId}!`);
        return response.status(200).send();
     
    });
     }
    });
     Group.collection.insertOne(newGroup,function(err,savedGroup){
       if(err){
           console.log(err);
           return response.status(500).send();
       }
      response.send(`Group: ${newGroup.groupName} added!`);
      console.log(savedGroup.ops[0].groupName);
      console.log(`Group: ${newGroup.groupName} added!`);
       return response.status(200).send();
   });
});

module.exports = router