const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null,  path.join(__dirname, "../upload_Imgs"))
    },
    filename: (req, file, cb) => {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, `_${Date.now()}${file.originalname}`)
       cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`)

    }
  })
  
 //fileFilter
  const fileFilter =  (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype=="image/png")
    {
    cb(null, true)
    }
    else{
        cb(null, false)
    }  
      }
  const upload = multer({ storage: storage ,
  // fileFilter:fileFilter,
  //   limits: {
  //     fileSize: 10
  // }
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