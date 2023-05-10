const instructorModel = require("../models/instructor")
const courseModel = require("../models/course")

//create Instructor
let createInstructor = async (req,res) =>{
    try{
   //console.log(req.body);
  // check instructor found befor or not
   var foundInstructor = await instructorModel.findOne({name:req.body.name}) 
    if(foundInstructor){ return res.json({message:"this instructor Already Exist"})}
   else{
      //console.log(req.file)
       let profile_img ;
       if(req.file==undefined){profile_img = "http://localhost:7000/image_1682331798360download.jpg"}
       else{profile_img=`http://localhost:7000/${req.file.filename}`}
         
        let newInstructor = new instructorModel(
            {
            ...req.body ,
            profile_Img:profile_img
            }
        )
        await newInstructor.save() 
        res.status(200).json({message:"Added Instructor Successfully",id:newInstructor._id})
   }
   
    }
    catch(err){
    for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
    }
    }
}
//get All Tracks
let getAllInstructors = async(req,res) =>{
   try{
    const instructors = await instructorModel.find().select({__v:0})
    
   // console.log(instructors)
   const courses_enrolled = await courseModel.find().select({name:1}).populate('instructor','_id');
   //
   for(i=0;i<instructors.length;i++){
    let cnt=0
   
    courses_enrolled.map((course) => {
        if(course.instructor){
            if(instructors[i]._id.equals(course.instructor._id)){
                console.log(course.instructor._id)
                 cnt++;
             }
        }  
    })
    
     instructors[i].courses_Enrolled = cnt
   }
   res.status(200).json(instructors)
  //  res.status(200).json(instructors)
   }
  catch(err){
    for(let e in err.errors){
       console.log(err.errors[0].message);
       res.status(400).json({message:"Bad Request .. Some Fields"})
    }
}
}


//get Instructor By Id
let getInstructorById = async(req,res) =>{
    try{
     const Instructor = await instructorModel.findById(req.params.id).select({__v:0})
    
     const courses_enrolled = await courseModel.find().select({name:1}).populate('instructor','_id');
     const courses_enrolled_count = courses_enrolled.filter((course) => course.instructor.id == req.params.id )
       
    Instructor.courses_Enrolled =  courses_enrolled_count.length
     console.log(courses_enrolled_count.length)
     res.status(200).json(Instructor)
    }
   catch(err){
     for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
     }
 }
 }

//update Instructor
let updateInstructor= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
   // const updatedInstructor = req.body
  let updatedInstructor = req.body;
    try{
        let profile_img;
       if(req.file !=undefined){
        profile_img=`http://localhost:7000/${req.file.filename}`
        updatedInstructor ={
            ...req.body ,
            profile_Img:profile_img
            }
        }
       
        
        let newInstructor = await instructorModel.findByIdAndUpdate(req.params.id,updatedInstructor)
        if(newInstructor){res.status(200).json({message:"updated"})}
       else{res.status(404).json({message:"Instructor not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}

//Delete Instructor
let deleteInstructor= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
    try{
        let deleteInstructor = await instructorModel.findByIdAndDelete(req.params.id)
        if(deleteInstructor){res.status(200).json({message:"Deleted"})}
       else{res.status(404).json({message:"Instructor not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}
module.exports = {
    createInstructor,
    getAllInstructors,
    getInstructorById,
    updateInstructor,
    deleteInstructor
}
