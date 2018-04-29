//https://www.npmjs.com/package/validator
const Validator = require('validator');
//loads the is empty function
const isEmpty = require('../validation/is-empty');
//ES6
//import isEmpty from './is-empty';

//export to have access outside of the file
//the data is the input from the field data is an object
module.exports = function validateRegisterInput(data){
    //set errors objec to empty
    let errors = {};

    //to check if the data is empty we must set the objects as an empty string ? ternary operator used instead of if else
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //validates if the name input is between 2 and 30 char long
    if(!Validator.isLength(data.name, {min:2 , max: 30}) ) {
        errors.name = 'Name Must be between 2 and 30 characters long';
    }

    // Check if the inputs are empty or not
    if(Validator.isEmpty(data.name)){
        errors.name = 'Name Field Must not be empty';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email Field Must not be empty';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password Field Must not be empty';
    }if(Validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password Field Must not be empty';
    }

    //check if the email is a valid email
    if(!Validator.isEmail(data.email)){
        errors.email = 'Must use a valid email';
    }

    //password and confirm password field validations
    if(!Validator.isLength(data.password, {min:6 , max: 30})){
        errors.password = 'password must be atleast 6 characters long';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Password do not match Please try Again';
    }






    //returns an object if there are any mistakes on the input
    return{

        errors: errors,
        //note the isEmpty could be replaced with lodash's _isEmpty method https://lodash.com/docs/4.17.10#isEmpty
        isValid: isEmpty(errors)
        
    }
}