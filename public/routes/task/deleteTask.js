const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Task = require("../../models/task");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

// "/task/deleteTask/"
router.get('/deleteTask/:taskId',function(request,response){
    console.log(`Deleting task with taskId: ${request.params.taskId}`)
    Task.deleteOne({_id: request.params.taskId}, function(error,success){
        if(error){
            console.log(error);
            return response.status(500).send();
        }
            
       console.log(`task: ${request.params.taskId} removed!`);
              response.send(`REDIRECT back to the place that was having the tasks!`);  

       return response.status(200).send();
         
     });
});

module.exports = router