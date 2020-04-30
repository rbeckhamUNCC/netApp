const MainCommentRouter = require("express").Router();

// "/comment/newComment"
MainCommentRouter.route("/newComment")
    .post(require("./newComment"))

// "/comment/deleteComment"
MainCommentRouter.route("/deleteComment")
    .post(require("./deleteComment"))    

module.exports = MainCommentRouter;