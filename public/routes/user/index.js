const MainUserRouter = require("express").Router();

MainUserRouter.route("/newUser")
    .post(require("./newUser"))

    MainUserRouter.route("/login")
    .post(require("./login"))

    MainUserRouter.route("/joinGroup")
    .post(require("./joinGroup"))

    MainUserRouter.route("/leaveGroup")
    .post(require("./leaveGroup"))

    MainUserRouter.route("/updatePersonal")
    .post(require("./updatePersonal"))

    MainUserRouter.route("/updatePassword")
    .post(require("./updatePassword"))

module.exports = MainUserRouter;