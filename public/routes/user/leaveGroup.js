const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/group/leaveGroup"
var User = require("../../models/user");
var Group = require("../../models/group");

const getGroupFunction = require('../group/getGroupFunction');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/leaveGroup/:userId',function(request,response){
  

     Group.updateOne({_id: global.groupId}, { $pull: { members: request.params.userId  } } , function(error,success){
       if(error){
           console.log(error);
           return response.status(500).send();
       }
           
      console.log(`Member(User: ${request.params.userId}) added to group: ${global.groupId}!`);
      // return response.status(200).send();
      
        
    });
    User.updateOne({_id: request.params.userId}, { $pull: { groups: global.groupId  } } , function(error,success){
        if(error){
            console.log(error);
            return response.status(500).send();
        }
       //response.send(`User and Group updated!`);     
       console.log(`Group ${global.groupId} added to groups of user: ${request.params.userId}!`);
       getGroupFunction.getGroupFunc();
       return response.status(200).redirect("/dashboard");
    
   });

});

module.exports = router