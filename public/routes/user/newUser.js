const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var User = require("../../models/user");
//configure app to use session
var expressSession = require('express-session');
router.use(bodyParser.urlencoded({extended: true}));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
//register session to app
router.use(expressSession(
        {
            secret:"67i66igfi6&*6i%$&%^&U",
            resave: false,
            saveUninitialized: false
        }
));

//   /user/newUser
router.post('/newUser',function(request,response){
    console.log("/newUser reached:" + request.body)

    User.find({email: request.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1){
      return res.status(409).json({
        message: 'Username exists'
      });
    } else {
      bcrypt.hash(request.body.password, 10, (err,hash) => {
        if(err) {
          return res.status(500).json({
            error: err
          });
        } else {
            var newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                groups: [],
                email: request.body.email,
                password: hash,
                availableTimes: [],
                //image will be a file
                profilePic: "picture will be added as future feature"
            });
            //sub reps who the token belongs to
            var signOptions = {sub: newUser._id, expiresIn: "12h"};

          User.collection.insertOne(newUser,function(err,savedUser){
            if(err){
                console.log(err);
                return response.status(500).send();
            }
            // response.send(`User: ${newUser.email} added!`);
            console.log(`User: ${savedUser.ops[0].email} added!`);
     // current workaround for token issues**************
            global.fullName = newUser.firstName + ' ' + newUser.lastName;
            global.userId = newUser._id;

            global.firstName = newUser.firstName;
            global.lastName = newUser.lastName;
            global.email = newUser.email;
            // console.log(request.session.fullName);
            // after logged in
            global.userPic = "https://soulcore.com/wp-content/uploads/2018/01/profile-placeholder.png"//"https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/sphere_n69vel.png"


            global.profilePic = newUser.profilePic;

            //request.expressSession.userId = newUser._id;
            return response.status(200).redirect(("/dashboard"))
            // return response.redirect(("/dashboard"),{token:token});
         });
        }
      })
    }
  });



 });

module.exports = router
