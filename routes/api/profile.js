const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // for database
const passport = require('passport'); // for restricted routes



/***************  LOAD FILES  *******************/
//Loads Profile Input Validation
const validateProfileInput = require('../../config/validation/profile');
//Loads input Validation
const validateRegisterInput = require('../../config/validation/register');
//Loads LogIn Input Validation
const validateLoginInput = require('../../config/validation/login');
//Loads User model 
const User = require('../../models/User');
//Loads Profile Models
const Profle = require('../../models/Profile');

/*************** End of LOAD FILES *******************


/*************** Test ROUTE *******************/
// GET request for api/profile/test
// Tests Profile Route
// Public Access 
router.get('/test', (req,res) => {
    res.json({
        msg: "Profile Page"
    })
});
/*************** End of Test ROUTE *******************/

/*************** Profile ROUTE *******************/
// GET request for api/profile/
// this route gets the current users profile for first time log in
// Private Access 
router.get('/', passport.authenticate('jwt', {session:false}), (req,res) => {
    //initialize an error object to contain the error messages
    const errors = {};
    //User log in user is located in the req.user
    Profle.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'] )
        .then( (profile) => {
            console.log(profile); // ttesting in the console
            //check if profile has been located
            if(!profile){
                errors.profile = 'THeres is no profile found for the user'
                return res.status(404).json(errors);
            } else{
                res.status(200).json(profile).json(err);
            }
        })
        .catch(err => res.status(400));
})
/*************** End of Profle ROUTE *******************/

/*************** CREATE or EDIT Profile ROUTE *******************/
// POST request for api/profile/
// this route creates thte profile for the users
// Private Access 
router.post('/', passport.authenticate('jwt', {session:false}), (req,res) => {
    //need to validate the req.body object
    // destructured the returned object from register.js and function validateregisterinput takes in 
    //req.body bject and passed in as data in register js
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if(!isValid){
        //if the object is not valid then we return 400 status wiht the errors object 
        return res.status(400).json(errors);
    }


  // get all the fields from the profile page forms 
  // create a new object to cotain the data from the forms under req.body
  const profileFields = {};
  //TOKEN header has uder date like user email name avatar can be accessed under req.user
  profileFields.user = req.user.id;

  //checks if there is data from req.body and assigns to a specific profileFields key same under profile model
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // Skills needs to be split into an array it will come as CSV from the forms to mathch the profle model
  if(typeof req.body.skills !== 'undefined'){
      profileFields.skills = req.body.skills.split(',');
  }

  //Social 
  //needs to instantiate to empty object first for in the model its an object
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  //locate user first in the profile collections using the user id
  Profle.findOne({user:req.user.id})
        .then((profile) =>{
            //need to check if user has a profle
            if(profile){
                //if profile exists then we only need to update it query will be short for we have all the objects instantiated above
                Profle.findOneAndUpdate({user: req.user.id}, { $set: profileFields }, {new: true})
                    .then((profile) =>{
                        //result will be sent as a json object
                        res.json(profile);
                    })
                    .catch(err => res.json(err));
            } else{
                //if the user doesnt have a profile we still need to check if handle exists
                Profile.findOne({handle :req.user.handle})
                    .then((profile) =>{
                        //need to check if handle exist meaning user already has a profile
                        if(profile){
                            errors.handle = 'Sorry that handle already exists';
                            res.status(400).json(errors);
                        }else{
                            //if no handles or no profile has been created then we will create a new one
                            new Profile(profileFields).save().then((profile) => {
                                res.json(profile);
                            });
                        }
                    });
            }
        });
});
/*************** End of Profle ROUTE *******************/



/*************** Fetch ALL PROFILE ROUTE *******************/
// GET request for api/profile/all
// fetches all of the profile in the database via 
// Public Access 
router.get('/all',(req,res) => {
    Profle.find()
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            res.json(profile);
        })
        .catch(err => res.json(err));
});
/*************** End of Test ROUTE *******************/


module.exports = router;