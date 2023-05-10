const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, path.join(__dirname, "../upload_vedio"))
    },
    filename: (req, file, cb) => {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null, `${Date.now()}_${file.originalname}`)
      //  cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`)

    }
  })
  
 //fileFilter
  const upload = multer({ 
    storage: storage 
  })

  function errHandler (err,req,res,nxt){
    if(err instanceof multer.MulterError){
      res.json({
        success:0,
        message:err.message
      })
    }
  }


  module.exports = upload