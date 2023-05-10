const Ajv = require("ajv").default;

//Validation Schema
const courseSchema = {
    "type":"object",
    "properties":{
     
     "name":{
        "type":"string", 
        "pattern":"^[A-Za-z]*$"
     },
     "description":{
        "type":"string"
     },
    },
 
 }
 
 const ajv = new Ajv();
module.exports = ajv.compile(courseSchema)