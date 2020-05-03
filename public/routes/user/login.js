require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require('../verifyToken');


router.use(bodyParser.urlencoded({extended: true}));

//   /user/login
router.post('/login',function(request,response){
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

         // below needs to be uncommented so that sessions can be set, maybe this needs to be put somewhere else
         global.fullName = user['firstName'] + ' ' + user['lastName'];
         global.firstName = user['firstName'];
         global.lastName = user['lastName'];
         global.email = user['email']
         // console.log(request.session.fullName);
         // after logged in
         global.userId = user["_id"].toString();
         global.userPic = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Green_equilateral_triangle_point_up.svg/1200px-Green_equilateral_triangle_point_up.svg.png"//"https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/sphere_n69vel.png"

         // return response.status(200).redirect(("/dashboard"));
         res.redirect("/dashboard").header('auth-token', token).send(token).status(200);

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

// FROM PRODUCTION
//        // below needs to be uncommented so that sessions can be set, maybe this needs to be put somewhere else
//        global.fullName = user['firstName'] + ' ' + user['lastName'];
//        global.firstName = user['firstName'];
//        global.lastName = user['lastName'];
//        global.email = user['email']
//        // console.log(request.session.fullName);
//        // after logged in
//        global.userId = user["_id"].toString();
//        global.userPic = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Green_equilateral_triangle_point_up.svg/1200px-Green_equilateral_triangle_point_up.svg.png"//"https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_960,f_auto/sphere_n69vel.png"
//        return response.status(200).redirect(("/dashboard"));
//     });
// });

//logout user, destroys accessToken
router.get('/logout', (req,res) => {
    const accessToken = req.body.token
    accessToken.filter(token => token !== req.body.token)
    return status(200).json({
      message: 'Successful logout'
    }).send();
}); //end logout

// router.post('/login', (req,res, next) => {
//     //specify user to find by username and password
//     User.find({email: req.body.email})
//     .exec()
//     .then(user => {
//       if (user.length < 1){
//         // user exists
//         return res.status(401).json({
//           message: 'Authorization failed 1'
//         }); // end if 'user not found'
//       } //end if(user.length <1)
//         const validPass = bcrypt.compare(req.body.password, user[0].password, (err,result) => {
//         if (err){
//           //wrong password
//           return res.status(401).json({
//             message: 'Authorization failed 2'
//           }); // end if 'user not found'
//         } //end if(err)
//
//         //Successful login
//         if (res){
//           console.log("successful login for " + req.body.email)
//           const token = jwt.sign({
//              _id: user._id,
//              email: req.body.email,
//              firstName: req.body.firstname,
//              lastName: req.body.lastName,
//              groups: req.body.groups,
//              availableTimes: req.body.availableTimes,
//              profilePic: req.body.profilePic
//              // password: req.body.password,
//            },
//              process.env.ACCESS_TOKEN_SECRET,
//              {expiresIn: '1h'}
//            );// end jwt.sign
//
//            global.fullName = user['firstName'] + ' ' + user['lastName']
//            global.email = user['email'];
//            global.profilePic = user['profilePic'];
//
//            res.header('auth-token', token).send(token).status(200);
//
//         } //end if(result) for successful login
//       }); //end bcrypt password comparison
//     })
//
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       }); // end catch json return data
//     }); //end catch
// }); //end login



module.exports = router
