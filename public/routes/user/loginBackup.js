require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//configure app to use session
// var expressSession = require('express-session');
router.use(bodyParser.urlencoded({extended: true}));

//register session to app
// router.use(expressSession(
//         {
//             secret:"67i66igfi6&*6i%$&%^&U",
//             resave: false,
//             saveUninitialized: false
//         }
// ));

const posts = [
  {
  username: 'harry',
  title: 'Post 1'
},
{
email: 'hermione@h.com',
title: 'Post 2'
}
]

//store tokens, not a good practice but its fine for now, should be stored in database
let refreshTokens = []

//creating a new refresh token for security, checks
router.post('/token',(req,res) => {
  const refreshToken = req.params.token
  res.json({
    refreshToken: refreshToken
  });

  //null token
  if(refreshToken == null){

    return res.sendStatus(401)
  }
  //token doesn't exist
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  //check token
  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403)
    const accessToken = generateAccessToken({
      name: user.email })
      res.json({ accessToken: accessToken })
    })
  })

router.get('/posts', authenticateToken, (req, res) =>{
  res.json(posts.filter(post => post.username === req.user.email))
})

//logout user
router.delete('/logout', (req,res) => {
    // request.session.destroy();

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    return res.status(200).json({
      message: 'Successful logout'
    }).send();
}); //end logout

router.post('/login',  (req,res, next) => {
    //specify user to find by username and password
    User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1){
        // user exists
        return res.status(401).json({
          message: 'Authorization failed 1'
        }); // end if 'user not found'
      } //end if(user.length <1)
      bcrypt.compare(req.body.password, user[0].password, (err,result) => {
        if (err){
          //wrong password
          return res.status(401).json({
            message: 'Authorization failed 2'
          }); // end if 'user not found'
        } //end if(err)

        //Successful login
        if (res){
        const firstName = req.body.firstName
        const user = {name: firstName}
        //generate access token for user
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        //stores token for comparison
        refreshTokens.push(refreshToken)
          return res.status(200).json({
            message: 'Successful login',
            // ***********
            accessToken: accessToken,
            refreshToken: refreshToken
            // token: token
          }); // end success message
        } //end if(result)

        res.status(401).json({
          message: "Auth failed 3"
        });
      }); //end bcrypt password comparison
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); // end catch json return data
    }); //end catch
}); //end login

//generates an accessToken for user
function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15s'}
  )}

// method to check authentication of token
function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}



module.exports = router
