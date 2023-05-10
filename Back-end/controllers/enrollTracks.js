const express = require("express");
const app = express();
const trackModel = require("../models/track");
const courseModel = require("../models/course");
const lessonModel = require("../models/lesson");
const enrollModel = require("../models/enrollCourse");
const  enrollTrackModel = require("../models/enrollTrack");
app.use(express.json());


///////////////////////////////////////////Enroll Track///////////////
let enrollTrack = async (req, res) => {
  let trackId = req.params.id;
  const std_Id = req.std;

  const courseFound = await trackModel.findById({ _id: trackId });
  if(courseFound == null){return res.status(400).json({message:"Not found this track"})}
  const copyCourses = courseFound.courses;
   //console.log(copyCourses)
  var copyLessons=[];
  let coursesEnroll = await enrollModel.find({stdId:std_Id}).select({course:1,lessons:1})
 // console.log(coursesEnroll)
 
  let tracksEnroll = await enrollTrackModel.find({stdId:std_Id}).populate('tracks')
  let flag=false;
  //console.log(tracksEnroll)
  tracksEnroll.map((track)=>{
    let tracks = track.tracks   
      tracks.map((track)=>{
        if(track._id == trackId){    
           flag=true
         }
      })
  })
  if(flag){return  res.status(400).json({ message: "already enrolled this Track" });}

   //check if course found in courses Student or not
  let allLessonsEachCourse = [];
  copyCourses.map(async (eachCourse)=>{
  let flagCourse = true
  // console.log(eachCourse)
  coursesEnroll.map((cours)=>{
    if(eachCourse.equals(cours.course)){
      flagCourse = false
    //  console.log("found Course")
      copyLessons = cours.lessons
    // console.log(copyLessons)
      allLessonsEachCourse.push(copyLessons);
    }
   })
   if(flagCourse){
    let courseLessons;
      courseLessons = await courseModel.find({ _id: eachCourse }).populate('lessons');
      copyLessons = courseLessons[0].lessons
      allLessonsEachCourse.push(copyLessons);

  //  console.log("not found"+eachCourse )
  //  allLessonsEachCourse.push(copyLessons);
   }
  // console.log(allLessonsEachCourse.length)
   let enrollStd = new enrollTrackModel({
    stdId: std_Id,
    courses: copyCourses,
    lessons: allLessonsEachCourse,
    tracks: trackId,
  });
  // console.log(enrollStd)
  await enrollStd.save();
 })
 
  res.status(200).json({ message: "Enrolled track successfully" });
};
/////getEnrollStudentTracks///////////////// 
let getEnrollStudentTracks= async (req, res) => {
   try {
     let trackEnroll = await enrollTrackModel.find({stdId:req.params.id}).populate("tracks");
    // console.log(trackEnroll);
     res.status(200).json(trackEnroll);
   } catch (err) {
     for (let e in err.errors) {
       console.log(err.errors[0].message);
       res.status(400).json({ message: "Bad Request .. Some Fields" });
     }
   }
 };
module.exports = {
  enrollTrack,
  getEnrollStudentTracks
};
