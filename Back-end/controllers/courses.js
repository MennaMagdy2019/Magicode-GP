const courseModel = require("../models/course");
const lesson = require("../models/lesson");
const lessonModel = require("../models/lesson");

//create course
let createCourse = async (req,res) =>{  
    try{
        //console.log(req.body);
       // check track found befor or not
        var foundCourse = await courseModel.findOne({name:req.body.name}) 
      
         if(foundCourse){ return res.json({message:"this course Already Exist"})}
        else{
            let course_img=[] ;   
            if(req.files){
                req.files.forEach((file) => {
                    course_img.push(`http://localhost:7000/${file.filename}`)
                });
            }
            let lessonDuration=0
           // console.log(req.body)
            if(req.body.lessons){
                let {lessons} =req.body;
                for(let i=0;i<lessons.length;i++){
                    let lessonn = await lessonModel.findById(lessons[i]).select({duration:1,_id:0});
                    if(lessonn){
                    lessonDuration +=lessonn.duration
                    }
                    else{
                       return  res.status(400).json({message:"enter valid lessons"})
                    }
                  //  console.log(lessonDuration)
                }
            }
           
            let newCourse = new courseModel(
                 {
                 ...req.body ,
                 duration:lessonDuration,
                 course_Img:course_img
                 }
             )
             
             await newCourse.save() 
             
             res.status(200).json({message:"Added Course Successfully",id:newCourse._id})
        }
    }
    catch(err){
    for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
    }
    }
}
//get all Courses
let getCourses = async(req,res) =>{
   try{
    const courses = await courseModel.find().select({__v:0}).populate('lessons instructor');
   // console.log(courses)
    res.status(200).json(courses)
   }
  catch(err){
    for(let e in err.errors){
       console.log(err.errors[0].message);
       res.status(400).json({message:"Bad Request .. Some Fields"})
    }
}
}

//get Course By Id
let getCourseById = async(req,res) =>{
    try{
        
     const course = await courseModel.findById(req.params.id).select({__v:0}).populate('lessons instructor');
    // const course = await courseModel.findOne({name:req.params.name},{__v:0})
    // console.log(courses)
     res.status(200).json(course)
    }
   catch(err){
     for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
     }
 }
 }

//update Course
let updataCourse= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
    //console.log(req.body)  
    try{
        var foundCourse = await courseModel.findById(id) 
         if(foundCourse == null ){ return res.status(400).json({message:"Not Found This course"})}

         let updatedCourse;
        let lessonDuration=0
       // console.log(req.body)
        if(req.body.lessons){
            let {lessons} =req.body;
            for(let i=0;i<lessons.length;i++){
                let lessonn = await lessonModel.findById(lessons[i]).select({duration:1,_id:0});
                lessonDuration +=lessonn.duration
               // console.log(lessonDuration)
            }
        }
       if(req.files !=undefined){     
        let course_img=[] ;   
        if(req.files){
            req.files.forEach((file) => {
                course_img.push(`http://localhost:7000/${file.filename}`)
            });
        }
            updatedCourse ={
                ...req.body ,
                duration:lessonDuration,
                course_Img:course_img
                }
        }
        else{
            updatedCourse ={
            ...req.body ,
            duration:lessonDuration,
            }
        }
        let newcourse = await courseModel.findByIdAndUpdate(req.params.id,updatedCourse)
        if(newcourse){res.status(200).json({message:"updated"})}
       else{res.status(404).json({message:"Course not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}

//Delete Course
let deleteCourse= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
    try{
        let deletecourse = await courseModel.findByIdAndDelete(req.params.id)
        if(deletecourse){res.status(200).json({message:"Deleted"})}
       else{res.status(404).json({message:"Course not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}


module.exports = {
    createCourse,
    getCourses,
    getCourseById,
    updataCourse,
    deleteCourse
   // updateStudent_courses
}

