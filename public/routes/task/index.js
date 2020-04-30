const MainTaskRouter = require("express").Router();

// "/task/newTask"
MainTaskRouter.route("/newTask")
    .post(require("./newTask"))

// "/task/deleteTask"
MainTaskRouter.route("/deleteTask")
    .post(require("./deleteTask"))    

module.exports = MainTaskRouter;