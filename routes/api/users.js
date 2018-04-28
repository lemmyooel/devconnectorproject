const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');


//Loads User model 
const User = require('../../models/User');

//Loads keys
const keys = require('../../config/keys');


/*************** Test ROUTE *******************/
// GET request for api/users/test
// Tests Post Route
// Public Access 
router.get('/test', (req,res) => {
    res.json({
        msg: "Users Page"
    })
});

/*************** End of Test ROUTE *******************/

/*************** Registration ROUTE *******************/
// GET request for api/users/register
// Registration  Route
// Public Access 
router.post('/register', (req,res) =>{
    User.findOne({ email: req.body.email })
        .then((user) => {
            //checks if User email exists
            if(user){
                //if User exists returns an object with 400 as status
                return res.status(400).json({ email: 'Email already used' });
            }else{
                //https://github.com/emerleite/node-gravatar
                // this is for the avatar profile picture
                const avatar = gravatar.url(req.body.email,{
                    s: '200', // Size of the avatar in pixels
                    r: 'pg', // Rating Parental Guidance
                    d: 'mm' // Default
                });

                //Creates a new User if user email doesn not exist
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                //Encrptys Passowrd
                // https://www.npmjs.com/package/bcryptjs
                bcrypt.genSalt(10, (err,salt) => {
                    //encrpts the password
                    bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if(err) throw err;
                        //password gets the hashed password
                        newUser.password = hash;
                        //Saves the User in the database
                        newUser.save()
                        .then((user)=>{
                            res.json(user);
                        })
                        .catch(err => console.log(err));
                    });
                });

            }
        })
        .catch(err => console.log(err));
})
/*************** End of Test ROUTE *******************/

/*************** LOGIN ROUTE *******************/
// GET request for api/users/test
// THis is the log in route 
// Public Access 
router.post('/login', (req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  //finds user in the DB whether user exists or not via email
  User.findOne({email})
    .then((user) =>{
        //CHeck if User exists
        if(!user){
            return  res.status(404).json({emai: 'User not found'});
        }else{
            //if user has been located need to compare the password with the stored hashed password in mongo DB
            bcrypt.compare(password, user.password)
                .then((isMatch)=>{
                    //the promise returns a boolean whether password has matched or not
                    //check if passwords match
                    if(isMatch){
                       //User Matched
                        //Creates the JST payload
                       const payload = {
                           id:user.id,
                           name: user.name,
                           avatar: user.avatar
                       }

                       //Assign token to the user
                       jwt.sign(
                           payload, 
                           keys.secret,
                           {expiresIn: 3600 },
                           (err, token) => {
                               res.json({
                                   success: true,
                                   token: 'Bearer ' + token
                               })
                           }
                        
                        );
                    }else {
                        //if it passwords doesnt match
                        return res.status(400).json({password: 'Password Incorrect'});
                    }
                })
        }

    })
});

/*************** LOGIN ROUTE *******************/



/*************** Current ROUTE *******************/
// GET request for api/users/current
// this returns the current user // also can be used for testing to check who is currently logged in 
// Private Access
router.get('/current', passport.authenticate('jwt',{session: false}), (req,res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})

/*************** End of Test ROUTE *******************/








module.exports = router;