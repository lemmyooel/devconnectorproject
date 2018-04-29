//https://www.npmjs.com/package/validator
const Validator = require('validator');
//loads the is empty function
const isEmpty = require('../validation/is-empty');
//ES6
//import isEmpty from './is-empty';

//export to have access outside of the file
//the data is the input from the field data is an object
module.exports = function validateLoginInput(data){
    //set errors objec to empty
    let errors = {};

    //to check if the data is empty we must set the objects as an empty string ? ternary operator used instead of if else
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  
   
    // Check if the inputs are empty or not
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field Must not be empty';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password Field Must not be empty';
    }
    //check if the email is a valid email
    if(!Validator.isEmail(data.email)){
        errors.email = 'Must use a valid email';
    }

  






    //returns an object if there are any mistakes on the input
    return{

        errors: errors,
        //note the isEmpty could be replaced with lodash's _isEmpty method https://lodash.com/docs/4.17.10#isEmpty
        isValid: isEmpty(errors)
        
    }
}