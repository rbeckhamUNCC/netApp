const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

// "/group/deleteGroup/:id"
router.post('/deleteGroup',function(request,response){
    console.log(`Deleting group with id: ${request.body.id}`)
    Group.findByIdAndRemove(request.body.id)
        .exec()
        .then(doc => {
            if(!doc){
                console.log(doc);
                return response.status(500).send();
            }
            response.send(`Group Removed!`);
            console.log(`Group Removed!`);
            return response.status(200).send();
        });
});

module.exports = router