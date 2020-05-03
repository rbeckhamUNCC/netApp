require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require('../verifyToken');


router.use(bodyParser.urlencoded({extended: true}));

router.get('/posts',verify,(req, res) =>{
  res.json({
    posts: {
      title: 'first post',
      description: 'random data to prevent access to'
    }
  });
})

//logout user, destroys accessToken
router.get('/logout', (req,res) => {
    const accessToken = req.body.token
    accessToken.filter(token => token !== req.body.token)
    return status(200).json({
      message: 'Successful logout'
    }).send();
}); //end logout

router.post('/login', (req,res, next) => {
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
        const validPass = bcrypt.compare(req.body.password, user[0].password, (err,result) => {
        if (err){
          //wrong password
          return res.status(401).json({
            message: 'Authorization failed 2'
          }); // end if 'user not found'
        } //end if(err)

        //Successful login
        if (res){
          console.log("successful login for " + req.body.email)
          const token = jwt.sign({
             _id: user._id,
             email: req.body.email,
             firstName: req.body.firstname,
             lastName: req.body.lastName,
             groups: req.body.groups,
             availableTimes: req.body.availableTimes,
             profilePic: req.body.profilePic
             // password: req.body.password,
           },
             process.env.ACCESS_TOKEN_SECRET,
             {expiresIn: '1h'}
           );// end jwt.sign

           global.fullName = user['firstName'] + ' ' + user['lastName']
           global.email = user['email'];
           global.profilePic = user['profilePic'];

           res.header('auth-token', token).send(token).status(200);

        } //end if(result) for successful login
      }); //end bcrypt password comparison
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); // end catch json return data
    }); //end catch
}); //end login


module.exports = router
