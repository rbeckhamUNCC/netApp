const MainTaskRouter = require("express").Router();

// "/task/newTask"
MainTaskRouter.route("/newTask")
    .post(require("./newTask"))

// "/task/getTasks"
MainTaskRouter.route("/getTasks")
    .post(require("./getTasks"))

// "/task/deleteTask/:taskId"
MainTaskRouter.route("/deleteTask/:taskId")
    .get(require("./deleteTask"))   
    
// "/task/updateStatus/:status"
MainTaskRouter.route("/updateStatus/:status")
    .get(require("./updateStatus"))

module.exports = MainTaskRouter;