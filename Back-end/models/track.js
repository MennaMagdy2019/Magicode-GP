const mongoose = require('mongoose')

const trackSchema = mongoose.Schema({
  name:{type:String},
  description:{type:String},
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
  }],
  duration:{type:Number,default:0},
  //track_duration:{type:Number,default:0},
  track_Img:{type:Array},
  price: { type: String, default: "free" },
})

module.exports = mongoose.model('tracks',trackSchema)