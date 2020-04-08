const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");
router.use(bodyParser.urlencoded());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/newGroup',function(request,response){
    console.log(request.body.groupName)
    //the founders id should be given and they should also be added to  members
    //var members = []
   
   
   
   var newGroup = new Group({
       groupName: request.body.groupName,
       //founder id is sent in hidden form input that takes from cookie, or whatever unique identifer
     //  founder: request.body.userId,
       members: [],
       meetings: [],
       comments: [],
       tasks: [],
       //image will be a file
       //groupImage: String,
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