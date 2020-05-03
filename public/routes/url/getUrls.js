const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Url = require("../../models/url");
var Group = require("../../models/group");

router.use(bodyParser.urlencoded({extended: true}));

// /url/getUrls
router.post('/getUrls',function(request,response){
    Group.findOne({_id: request.body.groupId}).populate("urls").exec(function(error,group){
            if(error){
                console.log(error + request.body.groupId);
                return response.status(500).send();
            }
            else {
                var groupUrls = group["urls"]
                console.log("Urls: " + groupUrls)
        return response.status(200).send();}
            });
});

module.exports = router