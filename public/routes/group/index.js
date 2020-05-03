const MainGroupRouter = require("express").Router();

// "/group/newGroup"
MainGroupRouter.route("/newGroup")
    .post(require("./newGroup"))

// "/group/deleteGroup"
MainGroupRouter.route("/deleteGroup")
    .get(require("./deleteGroup"))    

// "/group/getGroup/:groupId"
MainGroupRouter.route("/getGroup/:groupId")
    .get(require("./getGroup"))  

module.exports = MainGroupRouter;