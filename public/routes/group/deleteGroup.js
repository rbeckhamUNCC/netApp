const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");



router.use(bodyParser.urlencoded({extended: true}));

// "/group/deleteGroup/:id"
router.get('/deleteGroup',function(request,response){
    console.log(`Deleting group with id: ${global.groupId}`)
    Group.findByIdAndRemove(global.groupId)
        .exec()
        .then(doc => {
            if(!doc){
                console.log(doc);
                return response.status(500).send();
            }
            //response.send(`Group Removed!`);
            console.log(`Group Removed!`);
       return response.status(200).redirect("/dashboard");
        });
});

module.exports = router