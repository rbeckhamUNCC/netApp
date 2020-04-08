const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded());
router.use(bodyParser.urlencoded({extended: true}));

//Copied from newGroup, needs to incorporate methods done in rob branch
// router.post('/newUser',function(request,response){
//     console.log(request.body)
 
//      Group.collection.insertOne(newGroup,function(err,savedGroup){
//        if(err){
//            console.log(err);
//            return response.status(500).send();
//        }
//       response.send(`Group: ${newGroup.groupName} added!`);
//       console.log(savedGroup.ops[0].groupName);
//       console.log(`Group: ${newGroup.groupName} added!`);
//        return response.status(200).send();
//    });
// });

module.exports = router