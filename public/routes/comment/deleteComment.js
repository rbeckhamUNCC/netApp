const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var Comment = require("../../models/comment");
router.use(bodyParser.urlencoded({extended: true}));

// "/comment/deleteComment/:id"
router.post('/deleteComment',function(request,response){
    console.log(`Deleting Comment with id: ${request.body.id}`)
    Comment.findByIdAndRemove(request.body.id)
        .exec()
        .then(doc => {
            if(!doc){
                console.log(doc);
                return response.status(500).send();
            }
            response.send(`Comment Removed!`);
            console.log(`Comment Removed!`);
            return response.status(200).send();
        });
});

module.exports = router