const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// "/user/updateStatus"
var Task = require("../../models/task");
var Group = require("../../models/group");
router.use(bodyParser.urlencoded({extended: true}));

router.get('/updateStatus/:status',function(request,response){
  
   //task statuses: not started, started, finished, help.   and to delete it would be called in the delete task route

    Task.updateOne({_id: request.body.taskId}, { $set: { status: request.params.status } } , function(error,success){
        if(error){
            console.log(error+ request.body.taskId);
            return response.status(500).send();
        }
       response.send(`Task status updated to "${request.params.status}"!`);     
       console.log(`Task status updated to "${request.params.status}"!`);


       //might want to redirect to the same page so as to refresh
       return response.status(200).send();
    
   });

});

module.exports = router