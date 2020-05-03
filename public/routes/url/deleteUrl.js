const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Url = require("../../models/url");
var Group = require("../../models/group");


const getGroupFunction = require('../group/getGroupFunction');

router.use(bodyParser.urlencoded({extended: true}));

// "/url/deleteUrl/"
router.get('/deleteUrl/:urlId',function(request,response){
    console.log(`Deleting Url with urlId: ${request.params.urlId}`)
    Url.deleteOne({_id: request.params.urlId}, function(error,success){
        if(error){
            console.log(error);
            return response.status(500).send();
        }
            
       console.log(`url: ${request.params.urlId} removed!`);
              

              getGroupFunction.getGroupFunc();    
              return response.status(200).redirect("/groupDashboard");
         
     });
});

module.exports = router