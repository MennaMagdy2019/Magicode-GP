const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lessons",
    },
  ],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructors",
  },
  rating: { type: Number},
  duration: { type: Number ,default:0},
  course_Img: { type: Array },
  // spiderman_Img:{type:String},
  price: { type: String, default: "free" },
  level: { type: String },
  Syllabus: { type: Array },
});

module.exports = mongoose.model("courses", courseSchema);
