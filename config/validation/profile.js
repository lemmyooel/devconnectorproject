//https://www.npmjs.com/package/validator
const Validator = require('validator');
//loads the is empty function
const isEmpty = require('../validation/is-empty');
//ES6
//import isEmpty from './is-empty';

//export to have access outside of the file
//the data is the input from the field data is an object
module.exports = function validateProfileInput(data){
    //set errors objec to empty
    let errors = {};

    //to check if the data is empty we must set the objects as an empty string in order for the validator.js to be used to avoid typeerror? ternary operator used instead of if else
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
  
   
    // Check if the inputs are empty or not
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Email Field Must not be empty';
    }
    if(Validator.isEmpty(data.status)){
        errors.status = 'Status Field Must not be empty';
    }
    if(Validator.isEmpty(data.skills)){
        errors.skills = 'Skills Field Must not be empty';
    }
   
    //in the model under social its the keys are not required so we need
    //to check first if its empty or not for if its empty there's no need
    //to check or run the validator
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.social.youtube = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.social.twitter = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.social.facebook = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.social.instagram = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }




    if(!Validator.isLength(data.handle, {min:2 , max: 40})){
        errors.handle = 'Handles Must be alteast 3 to 40 characters long'
    }
  






    //returns an object if there are any mistakes on the input
    return{

        errors: errors,
        //note the isEmpty could be replaced with lodash's _isEmpty method https://lodash.com/docs/4.17.10#isEmpty
        isValid: isEmpty(errors)
        
    }
}