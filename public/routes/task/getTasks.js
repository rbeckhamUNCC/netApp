const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Task = require("../../models/task");
var Group = require("../../models/group");

router.use(bodyParser.urlencoded({extended: true}));

// /task/getTasks
router.post('/getTasks',function(request,response){
    Group.findOne({_id: request.body.groupId}).populate("tasks").exec(function(error,group){
            if(error){
                console.log(error + request.body.groupId);
                return response.status(500).send();
            }
            else {
                var groupTasks = group["tasks"]
                console.log("Tasks: " + grouptasks)
        return response.status(200).send();}
            });
});

module.exports = router