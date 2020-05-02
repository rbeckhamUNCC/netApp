const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/user/updatePersonal"
var User = require("../../models/user");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

router.post('/updatePersonal',function(request,response){
  // the current users info needs to pupulate the forms data in this case
    User.updateOne({_id: global.userId}, { $set: { firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email  } } , function(error,success){
        if(error){
            console.log(error);
            return response.status(500).send();
        }
       //response.send(`User personal updated!`);     
       console.log(`User personal updated!`);
       global.fullName = request.body.firstName + ' ' + request.body.lastName;
       global.email = request.body.email;
       //might want to redirect to the same page so as to refresh
       return response.status(200).redirect(("/dashboard"));
    
   });

});

module.exports = router