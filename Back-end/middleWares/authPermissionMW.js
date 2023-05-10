const jwt = require("jsonwebtoken")
// const config = require("config");

module.exports = (req,res,nxt) => {
    // get x-auth-token header
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied")

    try{
        const decodedPayload = jwt.verify(token , "token_key_secret");
        //check user role(Admin or not)
        if(!decodedPayload.adminRole) res.status(401).send("Access Denied..")
        nxt()
    }
    catch(err){
        res.status(400).send("Invalid Token")
    }
}