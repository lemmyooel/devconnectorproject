const  isEmpty =value => 
        value === undefined ||
        value === null ||
        //checks if value is an object type and checks the keys its 0 then the object is empty
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        //checks if the value type is string and when trimmed length is still to 0 
        (typeof value === 'string' && value.trim().length === 0);
module.exports = isEmpty;