const MainGroupRouter = require("express").Router();

// "/group/newGroup"
MainGroupRouter.route("/newGroup")
    .post(require("./newGroup"))

// "/group/deleteGroup"
MainGroupRouter.route("/deleteGroup")
    .post(require("./deleteGroup"))    

module.exports = MainGroupRouter;