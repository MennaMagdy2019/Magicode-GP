const express = require("express");
const app = express();
const stdModel = require("../models/student");
const trackModel = require("../models/track");
const courseModel = require("../models/course");
const lessonModel = require("../models/lesson");
const enrollModel = require("../models/enrollCourse");
const { updataCourse } = require("./courses");
app.use(express.json());

//enrollCourses
let enrollCourses = async (req, res) => {
  let courseId = req.params.id;
  const std_Id = req.std;
  // console.log(stdId)
  //    console.log(courseId)

  const courseFound = await courseModel.findById({ _id: courseId });
  // if(courseFound){console.log("courses : "+courseId)}

  const copyLessons = courseFound.lessons;
  //console.log(copyLessons)
  const allLessons = await lessonModel.find({ _id: copyLessons });
  //console.log(allLessons)
  if (!courseFound) {
    return res.status(400).json({ message: "Not found Courses" });
  }

 // const course = await enrollModel.find({ course: courseId });
  let coursesEnroll = await enrollModel.find({stdId:std_Id}).select({course:1})
  let flag=false;
 coursesEnroll.map((course)=>{
    //console.log(course)
    if(course.course == courseId){ 
      flag=true}
  })
  if(flag){return  res.status(400).json({ message: "already enrolled this Course" });}
 
  //console.log(lessonOFcourse)
  let enrollStd = new enrollModel({
    stdId: std_Id,
    course: courseId,
    lessons: [...allLessons],
  });
  // console.log(enrollStd)
  await enrollStd.save();
  res.status(200).json({ message: "Enrolled Course Successfully" });
};
/////getAllEnrollCourses///////////////
let getAllEnrollCourses = async (req, res) => {
  //     let courseId = req.params.id;
  //    const std_Id = req.std

  try {
    let coursesEnroll = await enrollModel.find().populate("course stdId");
    // console.log(coursesEnroll)
    res.status(200).json(coursesEnroll);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
//enroll Course
let getEnrollCourse = async (req, res) => {
  //     let courseId = req.params.id;
  //    const std_Id = req.std
  try {
    let courseEnroll = await enrollModel
      .find({course:req.params.id}).select({course:1,rating:1})
      .populate("course");
    let allrating = courseEnroll.length;
    let ratingCourse=0;
      courseEnroll.map((course)=> ratingCourse +=course.rating)

    let finalrating=(ratingCourse/allrating) * 5
     await courseModel.findByIdAndUpdate(req.params.id,{rating:finalrating})
  //  console.log(courseEnroll)
    // console.log(courseEnroll.lessons)
    if (courseEnroll) {
      res.status(200).json({courseEnroll,ratingCourse:finalrating});
    } else {
      res.status(404).json({ message: "courseEnroll not found" });
    }
  } catch (err) {
    for (let e in err.errors) {
     // console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};

let updateEnrollCourses = async (req, res) => {
  try {
    let courseEnroll = await enrollModel.findOne({course:req.params.id,stdId:req.std});
    //course:req.params.id,
    //console.log(courseEnroll.courses.includes(req.idCourse))

    let updateCourseEnroll;
   if(req.body.id){
    await courseEnroll.lessons.map((course) => {
      // console.log(req.body.id)
      // console.log(course._id)
      if (course._id == req.body.id) {
      //  course.done = true;
     
        course.done = !course.done;
       //  console.log(course.done)
       return updateCourseEnroll = {
          lessons: courseEnroll.lessons,
        };
        
    // let UpdateCourse = await enrollModel.findByIdAndUpdate(
    //   courseEnroll._id,
    //   updateCourseEnroll
    // );
    // console.log(UpdateCourse)
    // return res.status(200).json({ message: "updated",data:UpdateCourse});
      }
   });

   }
   if(req.body.rating){
      courseEnroll.rating=req.body.rating;
   }
  
  //console.log(courseEnroll)
  let updatesCourse = courseEnroll
  //console.log(updatesCourse)
   let UpdateCourse = await enrollModel.findByIdAndUpdate(
    courseEnroll._id,
    updatesCourse
  );

    if (UpdateCourse) {
      res.status(200).json({data:updatesCourse});
    } else {
      res.status(404).json({ message: "Lesson not found" });
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
//////////////////////getEnrollStudent Course////////////////
let getEnrollStudent = async (req, res) => {
  
  try {
    let coursesEnroll = await enrollModel.find({stdId:req.params.id}).populate('course');
    // console.log(coursesEnroll);
    // coursesEnroll.map((course) =>{
    //   console.log(course.lessons)
    // })
    res.status(200).json(coursesEnroll);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};

let DeleteStudent= async (req, res) => {
  
  try {
    let coursesEnroll = await enrollModel.deleteMany({stdId:req.params.id})
    //console.log(coursesEnroll);
    if(coursesEnroll.deletedCount == 0){
      res.status(400).json({message:"Not Found"});
    }
    else{
      res.status(200).json({message:"deleted"});
    }
    
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};


module.exports = {
  enrollCourses,
  updateEnrollCourses,
  getEnrollCourse,
  getAllEnrollCourses,
  getEnrollStudent,
  DeleteStudent
};

