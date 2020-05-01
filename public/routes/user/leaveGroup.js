const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/group/leaveGroup"
var User = require("../../models/user");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

router.post('/leaveGroup',function(request,response){
  

     Group.updateOne({_id: request.body.groupId}, { $pull: { members: request.body.userId  } } , function(error,success){
       if(error){
           console.log(error+ request.body.groupId);
           return response.status(500).send();
       }
           
      console.log(`Member(User: ${request.body.userId}) added to group: ${request.body.groupId}!`);
      // return response.status(200).send();
      
        
    });
    User.updateOne({_id: request.body.userId}, { $pull: { groups: request.body.groupId  } } , function(error,success){
        if(error){
            console.log(error+ request.body.userId);
            return response.status(500).send();
        }
       response.send(`User and Group updated!`);     
       console.log(`Group ${request.body.groupId} added to groups of user: ${request.body.userId}!`);
       return response.status(200).send();
    
   });

});

module.exports = router