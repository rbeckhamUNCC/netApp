const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
router.use(bodyParser.urlencoded({extended: true}));

//   /user/newUser
router.post('/newUser',function(request,response){
    console.log("/newUser reached:" + request.body)
 
    var newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        groups: [],
        email: request.body.email,
        password: request.body.password,
        availableTimes: [],
        //image will be a file
        profilePic: "picture will be added as future feature"
    });
 
     User.collection.insertOne(newUser,function(err,savedUser){
       if(err){
           console.log(err);
           return response.status(500).send();
       }
       response.send(`User: ${newUser.email} added!`);
       console.log(`User: ${savedUser.ops[0].email} added!`);
       return response.status(200).render( (__dirname + "/../../views/dashboard"));;
   });
});

module.exports = router