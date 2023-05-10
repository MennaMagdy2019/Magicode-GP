const jwt = require("jsonwebtoken")
const std = require("../models/student")

module.exports = async (req,res,nxt) => {
    // get x-auth-token header
    const token = req.header("x-auth-token");
    const idCourse = req.header("id-course")
    if(!token) return res.status(401).json({message :"you must login first"})
   // console.log(token)
    try{
        const decodedPayload = jwt.verify(token , "token_key_secret");
      //  console.log(decodedPayload)
        let {user_id} = decodedPayload;
        //console.log(user_id)
        // let std = await std.findOne({_id:"64445b2cc31722d5b061daa9"})
        //    // req.std = std
        //     console.log(std)
     
        //  nxt()
        //  if(decodedPayload.adminRole) {

        //      let {user_id} = decodedPayload;
        
         //  let std = await std.findOne(user_id)
               req.std = user_id
               req.idCourse = idCourse
            //    console.log(req.std)
            //    console.log(req.idCourse)
            nxt()
         
         //nxt()
      
    }
    catch(err){
        res.status(400).send("Invalid Token")
    }
}