require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require("../../models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const verify = require('../verifyToken');

//configure app to use session
// var expressSession = require('express-session');
router.use(bodyParser.urlencoded({extended: true}));

<<<<<<< HEAD
router.get('/posts',verify,(req, res) =>{
  // res.json(posts.filter(post => post.username === req.user.email))
  res.json({
    posts: {
      title: 'first post',
      description: 'random data to prevent access to'
    }
  });
})

//logout user, destroys accessToken
router.get('/logout', (req,res) => {
    // request.session.destroy();
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
          console.log("successful login for ")
          const token = jwt.sign({email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
           res.header('auth-token', token).send(token);

           // return res.status(200).json({
           //     message: 'Successful login'
           //     // ***********
           //     // accessToken: accessToken
           //     // token: token
           //   }); // end success message


          //   res.header('auth-token', token).send(token);
        // const firstName = req.body.firstName
        // const user = {name: firstName}
        // // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        // const accessToken = generateAccessToken(user)
        //   return res.status(200).json({
        //     message: 'Successful login',
        //     // ***********
        //     accessToken: accessToken
        //     // token: token
        //   }); // end success message
        } //end if(result)

    //     res.status(401).json({
    //       message: "Auth failed 3"
    //     });
      }); //end bcrypt password comparison
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      }); // end catch json return data
    }); //end catch
}); //end login

// router.post('/login', async (req, res) => {
//
//   const { error } = loginValidation(req.body);
//   if(error) return res.status(400).send(error.details[0].message);
//   const user = await User.findOne({ email: req.body.email });
//   if(!user) return res.status(400).send('Email is not found');
//
//   const validPass = await bcrypt.compare(req.body.password,user.password);
//   if(!validPass) return res.status(400).send('Invalid password');
//
//   const token = jwt.sign({_id: user._id }, process.env.ACCESS_TOKEN_SECRET);
//   res.header('auth-token', token).send(token);
// });

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


=======
//register session to app
router.use(expressSession(
        {
            secret:"67i66igfi6&*6i%$&%^&U",
            resave: false,
            saveUninitialized: false
        }
));

//   /user/login
router.post('/login',function(request,response){
    console.log("/login reached:" + request.body.email)
    var email = request.body.email;
    var password = request.body.password;
    //specify user to find by email and password
    User.findOne({email: email, password: password}, function(err, user){
         //user doesnt exist
       if(!user) {
           return response.status(404).send(`incorrect credentials!`);
       } //user exists

       if(err) {
           //error found, log error
           console.log(err);
           return response.status(500).send(`incorrect credentials!`);
       }
       //set logged in user session
       // below needs to be uncommented so that sessions can be set, maybe this needs to be put somewhere else
       global.fullName = user['firstName'] + ' ' + user['lastName'];
       global.email = user['email']
       // console.log(request.session.fullName);
       // after logged in
       global.userId = user["_id"];
       return response.status(200).redirect(("/dashboard"));
    });
});
>>>>>>> production

module.exports = router
