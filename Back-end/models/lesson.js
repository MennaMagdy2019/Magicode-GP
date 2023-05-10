const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
  name:{type:String},
  description:{type:String},
  //duration:{type:String},
  video_Lesson:{type:String},
  done:{type:Boolean,default:false},
  duration:{type:Number,default:0}

})

module.exports = mongoose.model('lessons',lessonSchema)