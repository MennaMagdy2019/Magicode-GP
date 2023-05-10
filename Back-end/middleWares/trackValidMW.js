const validator = require("../utils/trackValidator")

module.exports = (req,res,nxt) =>{
    let valid = validator(req.body)
   // console.log(req.body)
    if(valid){
        req.valid = 1;
        nxt();
    }
    else{
        res.status(403).send("forbidden Command")
    }
}