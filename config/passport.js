const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

//Loads Mongoose User models and Keys
const mongoose  = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const passport = require('passport');


//is an object literal containing options to control how the token is extracted from the request or verified.
const opts = {};
//jwtFromRequest (REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a string or null.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature
opts.secretOrKey = keys.secret;


module.exports = passport => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
    User.findById(jwt_payload.id)
        .then((user)=>{
            //checks whether the id in the payload mathces the id of the user who tries to log in 
            if(user){
                //if user is found returns the done function from passport along with the user data
                return done(null, user);
            }else{
                //if not found still returns the done function but returns a false as a value
                return done(null,false);
            }
        })
        .catch(err => console.log(err));
    }));
}