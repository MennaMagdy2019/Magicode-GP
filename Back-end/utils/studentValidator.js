const Ajv = require("ajv").default;

//Validation Schema
const studentSchema = {
    "type":"object",
    "properties":{
     "first_name":{
         "type":"string",
        "pattern":"^[A-Za-z]*$"
     },
     "last_name":{
         "type":"string",
        "pattern":"^[A-Za-z]*$"
     },
     "email":{
        "type":"string", 
        "pattern":"^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+[.]+[a-zA-Z]+$"
     },
     "password":{
        "type":"string",  
        "minLength":8
        ///^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        //Minimum eight characters, at least one letter and one number
    },
    "level":{
        "type":"string",
    },
    "courses_Enrolled":{
        "type":"array",
        "items":{
           "type":"string"
        }
    },
    //  "age":{
    //      "type":"number",   
    //  },
    
    },
   // "required":["first_name", "last_name"]
 }
 
 const ajv = new Ajv();
module.exports = ajv.compile(studentSchema)