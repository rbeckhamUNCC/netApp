const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Comment = require("../../models/comment");
var Group = require("../../models/group");

router.use(bodyParser.urlencoded({extended: true}));

// /comment/getComments
router.post('/getComments',function(request,response){
    Group.findOne({_id: request.body.groupId}).populate("comments").exec(function(error,group){
            if(error){
                console.log(error + request.body.groupId);
                return response.status(500).send();
            }
            else {
                var groupComments = group["comments"]
                console.log("Comments: " + groupComments)
        return response.status(200).send();}
            });
});

module.exports = router