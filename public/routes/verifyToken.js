const jwt = require('jsonwebtoken');

/*
This is a middleware function, can be added to any route that we want to be private
and will need token from valid user.
Token is assigned when user logs in, token is set and sent in response header and has variable name auth-token
Every private route that we access will need this function in it

**requirements**
const jwt = require("jsonwebtoken");
const verify = require('../verifyToken');
call function as middleware.... method(route, tokenCheckingMiddlewareFunction, callback)
*/



//creating middleware function to add to route to be protected, cant access without token, token is assigned when user logs in, token is sent in response header, add this function before every private route, enables req.user access in all code
module.exports = function(req,res,next){
  //checking name in header, name of token is stored in auth-token from login
  const token = req.header('auth-token')
  //token doesnt exist so access is denied
  if(!token) return res.status(401).send('Access Denied');
//token exists, now verify
  try{
    /* verify token from header, and our server secret from .env variable
     verification gives a user id back, id is set as email currently instead of the actual _id, cant get that to work right now */
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token data extraction test: " + verified.email);
    //store verified token in req.user so that we have access in all of our code, this is the last step of making the route private
    req.user = verified;
    next();
  } catch (err) {
      res.status(400).send('Invalid Token');
  }
}
