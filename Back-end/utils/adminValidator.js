const Ajv = require("ajv").default;

//Validation Schema
const adminSchema = {
    "type":"object",
    "properties":{
     
     "email":{
        "type":"string", 
        "pattern":"[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+[.]+[a-zA-Z]"
     },
     "password":{
        "type":"string",  
        "minLength":8
        
    },
    },
 
 }
 
 const ajv = new Ajv();
module.exports = ajv.compile(adminSchema)