const express = require('express')
const app = express()
const stdModel = require('../models/student')
const trackModel = require("../models/track")
const  courseModel = require("../models/course")
const enrollModel = require("../models/enrollCourse");
const  enrollTrackModel = require("../models/enrollTrack");

// const bcrypt = require("bcrypt")

app.use(express.json())

// get ALL Students
let getAllStudents = async(req,res) => {
    
    try{
        const students = await stdModel.find().select({__v:0})
          for(let i=0;i<students.length;i++){
            let coursesEnroll = await enrollModel.find({stdId:students[i]._id}).populate('course','name');
            let trackEnroll = await enrollTrackModel.find({stdId:students[i]._id}).populate("tracks",'name');
            let stdCourses=[]
            let stdTracks=[]
            coursesEnroll.map((course) =>{
              //  console.log(course.course.name)
               stdCourses.push(course.course.name)
             })
             students[i].courses_Enrolled = stdCourses
           await trackEnroll.map((tracks) =>{
                //console.log(students[i]._id)
                tracks.tracks.map((track)=>
                    //console.log(track.name)
                    stdTracks.push(track.name) 
                    )
            })
           // console.log(stdTracks)
            students[i].tracks_Enrolled=stdTracks
        }
        //const students = await stdModel.find().select({__v:0,password:0}).populate('courses_Enrolled tracks_Enrolled')

         // console.log(coursesArr)
       res.status(200).json(students)
    }
    catch(err){
        for(let e in err.errors){
           console.log(err.errors[0].message);
           res.status(400).json({message:"Bad Request .. Some Fields"})
        }
    }
}

// get Student By email
let getStudentById = async(req,res) => {
    // let stdId = req.params.id;
    // console.log(stdId)
   try{  

    const student = await stdModel.findById(req.params.id).select({__v:0})
    if(!student) return res.status(400).json({message:"Student not found"})
    let coursesEnroll = await enrollModel.find({stdId:req.params.id}).populate('course','name');
    let trackEnroll = await enrollTrackModel.find({stdId:req.params.id}).populate("tracks",'name');
    let stdCourses=[]
    let stdTracks=[]
    coursesEnroll.map((course) => stdCourses.push(course.course.name) )
     student.courses_Enrolled = stdCourses
    await trackEnroll.map((tracks) =>{
          tracks.tracks.map((track)=>
              stdTracks.push(track.name) 
              )
      })
   // console.log(stdTracks)
    student.tracks_Enrolled=stdTracks
  
    
   return res.status(200).json(student)
   }
   catch(err){
    for(let e in err.errors){
       console.log(err.errors[0].message);
       res.status(400).json({message:"Bad Request .. Some Fields"})
    }
   }
}

// Add Student
let createStudent = async(req,res) =>{

        var foundEmail = await stdModel.findOne({email:req.body.email}) 
        if(foundEmail){res.json({message:"this email Already Exist"})}
        else{
          //  console.log(req.file)
            let profile_img ;
            if(req.file==undefined){profile_img = "http://localhost:7000/image_1683239051966person-icon.png"}
            else{profile_img=`http://localhost:7000/${req.file.filename}`}
              
            let std = new stdModel({
           ...req.body ,
            profile_Img:profile_img
            
            })
        await std.save();   
        res.status(200).json({message:"Added successfully"})
        }

}

//Update Student
let updateStudentById =  async(req,res) => {
   let updataStudent = req.body;

   try{
        let newStd = await stdModel.findById(req.params.id)
        let emailChecked =  await stdModel.findOne({email:req.body.email})  //from body
        // console.log(emailChecked)
         if(emailChecked && (emailChecked._id != req.params.id ))
         {
         return res.status(404).json({message:"this email already exist"})
         }

         if(newStd ==null){res.status(404).json({message:"Student not found"})}
         else{
            if(req.file!=undefined){
              let profile_img ;
              profile_img=`http://localhost:7000/${req.file.filename}`
              updataStudent ={
              ...req.body ,
                  profile_Img:profile_img
                  }
          }
         
          let updateStd = await stdModel.findByIdAndUpdate(req.params.id,updataStudent)
          res.status(200).json({message:"updated"})
         }
   }
   catch(err){
       for(let e in err.errors){
          console.log(err.errors[0].message);
          res.status(400).json({message:"Bad Request .. Some Fields"})
       }
   }
}

//Delete Student
let deleteStudent =  async(req,res) => {
    try{
        let foundStd = await stdModel.findById(req.params.id)
        //console.log(foundStd)
        if(foundStd){
            let deleteCourse = await enrollModel.deleteMany({stdId:req.params.id})
          //  console.log(deleteCourse)     
            let deleteTrack =  await enrollTrackModel.deleteMany({stdId:req.params.id})
         // console.log(deleteTrack)     
           let deleteStd=  await stdModel.findByIdAndDelete(req.params.id)
                 //deleted student from courses   
        
          
          res.status(200).json({message:"Deletd"})
        }
        
        else{res.status(404).json({message:"Student not found"})}
    } 
    catch(err){
        for(let e in err.errors){
           console.log(err.errors[0].message);
           res.status(400).json({message:"Bad Request .. Some Fields"})
        }
    }
}

let updateStudentPrize = async (req, res) => {
   let course_id = req.idCourse;
   //console.log(course_id)
   let course_name = req.body.name;
  try {
    let foundStd = await stdModel.findById(req.params.id)
   // console.log(foundStd);
    if(foundStd == null){
      return res.status(400).json({message:"Not Found this student"});
    }
   
    if(foundStd.prizes.includes(course_name)){
      return res.status(400).json({message:"Already took agift in this course"});
    }
    else{
      foundStd.prizes.push(course_name)
      let updatestd = await stdModel.findByIdAndUpdate(req.params.id,foundStd)
      return res.status(200).json({message:"Added prize successfully",data:updatestd});
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentById,
    deleteStudent,
    updateStudentPrize
}

