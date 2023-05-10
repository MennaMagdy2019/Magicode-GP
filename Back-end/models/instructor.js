const mongoose = require('mongoose')

const instructorSchema = mongoose.Schema({
  name:{type:String},
  description:{type:String},
  courses_Enrolled:{type:Number},
  profile_Img:{type:String},
})

module.exports = mongoose.model('instructors',instructorSchema)