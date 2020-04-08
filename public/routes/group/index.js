const MainGroupRouter = require("express").Router();

MainGroupRouter.route("/newGroup")
    .post(require("./newGroup"))

module.exports = MainGroupRouter;