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

router.get('/posts', authenticateToken, (req, res) =>{
  res.json(posts.filter(post => post.username === req.user.email))
})

//logout user
router.get('/logout', (req,res) => {
    // request.session.destroy();
    const accessToken = req.body.token
    accessToken.filter(token => token !== req.body.token)
    return status(200).json({
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
        // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        const accessToken = generateAccessToken(user)
          return res.status(200).json({
            message: 'Successful login',
            // ***********
            accessToken: accessToken
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

function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '3hrs'}
  )}

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
