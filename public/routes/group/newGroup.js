const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");
var User = require("../../models/user");
router.use(bodyParser.urlencoded({extended: true}));

// "/group/newGroup"
router.post('/newGroup',function(request,response){
    console.log(request.body.groupName)
    //the founders id should be given and they should also be added to  members
    //var members = []
   if(global.userId === "Not Signed In" || global.userId === undefined){
     response.send(`User is not signed in!`);
     console.log("Not signed in")
     return response.status(500).send();
   }
   
   
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
         
    // If group exists just add the user to the group
     if(group.length != 0){
       console.log("adding user to group since group exists!")
          Group.updateOne({_id: group[0]["_id"]}, { $push: { members: global.userId  } } , function(error,success){
            if(error){
                console.log(error);
                return response.status(500).send();
            }
            User.updateOne({_id: global.userId}, { $push: { groups: group[0]["_id"]  } } , function(error,success){
              if(error){
                  console.log(error);
                  return response.status(500).send();
              }
              //response.send(`User and Group updated!`);     
              console.log(`Group ${group[0]["_id"]} added to groups of user: ${global.userId}!`);
              return response.status(200).redirect(("/dashboard"));
           })
        });
      } else {
        // Group does not exist so create one
        console.log("creating group!")

          Group.collection.insertOne(newGroup,function(err,savedGroup){
            if(err){
                console.log(err);
                return response.status(500).send();
            }
         // response.send(`Group: ${newGroup.groupName} added!`);
          console.log(savedGroup.ops[0].groupName);
          console.log(`Group: ${newGroup.groupName} added!`);

          User.updateOne({_id: global.userId}, { $push: { groups: savedGroup.ops[0]._id  } } , function(error,success){
              if(error){
                  console.log(error);
                  return response.status(500).send();
              }
              //response.send(`User and Group updated!`);     
              console.log(`Group ${savedGroup.ops[0]._id} added to groups of user: ${global.userId}!`);
              return response.status(200).redirect(("/dashboard"));
          
          });
        })
          
              
     

        
        
      }
    });
     
});

module.exports = router