const mongoose = require('mongoose')

const enrollTracksSchema = mongoose.Schema({
    stdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students"
      },
   lessons:{type:Array},
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
  }],
  tracks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"tracks"
  }],
  rating:{type:Number,default:0}
},
{
    timestamps:true
}
)

module.exports = mongoose.model('enrollTracks',enrollTracksSchema)