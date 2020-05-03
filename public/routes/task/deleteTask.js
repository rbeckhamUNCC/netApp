const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const getGroupFunction = require('../group/getGroupFunction');

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
           //   response.send(`REDIRECT back to the place that was having the tasks!`);  
           getGroupFunction.getGroupFunc();
       return response.status(200).redirect('/taskManager');
         
     });
});

module.exports = router