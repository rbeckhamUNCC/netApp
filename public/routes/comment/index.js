const MainCommentRouter = require("express").Router();

// "/comment/newComment"
MainCommentRouter.route("/newComment")
    .post(require("./newComment"))

// "/comment/getComments"
MainCommentRouter.route("/getComments")
    .post(require("./getComments")) 

// "/comment/deleteComment"
MainCommentRouter.route("/deleteComment")
    .post(require("./deleteComment"))    

module.exports = MainCommentRouter;