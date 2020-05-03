const MainUrlRouter = require("express").Router();

// "/url/newUrl"
MainUrlRouter.route("/newUrl")
    .post(require("./newUrl"))

// "/url/getUrls"
MainUrlRouter.route("/getUrls")
    .post(require("./getUrls")) 

// "/Url/deleteUrl"
MainUrlRouter.route("/deleteUrl/:urlId")
    .get(require("./deleteUrl"))    

module.exports = MainUrlRouter;