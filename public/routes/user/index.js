const MainUserRouter = require("express").Router();

MainUserRouter.route("/newUser")
    .post(require("./newUser"))

    MainUserRouter.route("/login")
    .post(require("./login"))

    MainUserRouter.route("/joinGroup")
    .post(require("./joinGroup"))

module.exports = MainUserRouter;