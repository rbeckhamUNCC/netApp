const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/user/updatePassword"
var User = require("../../models/user");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

router.post('/updatePassword',function(request,response){
  // the current users info needs to pupulate the forms data in this case

  //this needs the bcrypt think to function to hash correctly so it compares the right thing
        // var days = request.body.oldPass;
        // var param = ""
        // switch(days){
            
        // }
    User.updateOne({_id: global.userId}, { $set: { availableTimes: request.body.newPass } } , function(error,success){
        if(error){
            console.log(error+ global.userId);
            return response.status(500).send();
        }
      //  response.send(`User password updated!`);     
       console.log(`User password updated!`);


       //might want to redirect to the same page so as to refresh
       return response.status(200).redirect(("/dashboard"));
    
   });

});

module.exports = router