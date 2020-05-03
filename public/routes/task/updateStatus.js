const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/task/updateStatus"
var Task = require("../../models/task");

const getGroupFunction = require('../group/getGroupFunction');

router.use(bodyParser.urlencoded({extended: true}));

router.post('/updateStatus',function(request,response){
  
   //task statuses: not started, started, finished, help.   and to delete it would be called in the delete task route

    Task.updateOne({_id: request.body.taskId}, { $set: { status: request.body.status } } , function(error,success){
        if(error){
            console.log(error+ request.body.taskId);
            return response.status(500).send();
        }
      // response.send(`Task status updated to "${request.body.status}"!`);     
       console.log(`Task status updated to "${request.body.status}"!`);


        getGroupFunction.getGroupFunc();
        return response.status(200).redirect("/taskManager");
    
   });

});

module.exports = router