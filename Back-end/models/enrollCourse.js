const mongoose = require('mongoose')

const enrollCoursesSchema = mongoose.Schema({
    stdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students"
      },
   lessons:{type:Array},
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"courses"
  },
  rating:{type:Number,default:0}
},
{
    timestamps:true
}
)

module.exports = mongoose.model('enrollCourses',enrollCoursesSchema)