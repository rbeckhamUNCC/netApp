const MainTaskRouter = require("express").Router();

// "/task/newTask"
MainTaskRouter.route("/newTask")
    .post(require("./newTask"))

// "/task/getTasks"
MainTaskRouter.route("/getTasks")
    .post(require("./getTasks"))

// "/task/deleteTask"
MainTaskRouter.route("/deleteTask/:taskId")
    .get(require("./deleteTask"))    

module.exports = MainTaskRouter;