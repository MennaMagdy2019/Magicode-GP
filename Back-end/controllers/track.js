const trackModel = require("../models/track")
const courseModel = require("../models/course")

//create Track
let createTrack = async (req,res) =>{
    try{
   //console.log(req.body);
  // console.log(req.files);
  // check track found befor or not
   var foundtrack = await trackModel.findOne({name:req.body.name}) 
    if(foundtrack){ return res.json({message:"this track Already Exist"})}
   else{
        let track_img=[] ;   
        if(req.files){
            req.files.forEach((file) => {
                track_img.push(`http://localhost:7000/${file.filename}`)
            });
        }      
        let courses = await courseModel.find({_id:req.body.courses}) 
      //  console.log(courses)
        let trackDuration=0;
        courses.map((course)=>{
         // console.log(course)
         if(course == null){return res.status(400).json({message:"enter correct Courses"})}
          trackDuration += course.duration
        })
        let newtrack = new trackModel(
            {
                ...req.body ,
                duration:trackDuration,
                track_Img:track_img
            }
        )
       // console.log(newtrack)
        await newtrack.save() 
        res.status(200).json({message:"Added track Successfully",id:newtrack._id})
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
let getAllTracks = async(req,res) =>{
   try{
    const tracks = await trackModel.find().select({__v:0}).populate('courses')
   // console.log(tracks)
    res.status(200).json(tracks)
   }
  catch(err){
    for(let e in err.errors){
       console.log(err.errors[0].message);
       res.status(400).json({message:"Bad Request .. Some Fields"})
    }
}
}


//get Track By Id
let getTrackById = async(req,res) =>{
    try{
     const Track = await trackModel.findById(req.params.id).select({__v:0}).populate('courses')
    // const Track = await trackModel.findOne({name:req.params.name},{__v:0})
    // console.log(Tracks)
     res.status(200).json(Track)
    }
   catch(err){
     for(let e in err.errors){
        console.log(err.errors[0].message);
        res.status(400).json({message:"Bad Request .. Some Fields"})
     }
 }
 }

//update Track
let updataTrack= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
   
    try{
    var foundtrack = await trackModel.findById(id) 
    if(foundtrack == null){ return res.status(400).json({message:"this track Not Found"})}
    
    let updatedTrack = req.body
        if(req.files !=undefined){     
            let track_img=[] ;   
                req.files.forEach((file) => {
                    track_img.push(`http://localhost:7000/${file.filename}`)
                });   
                 updatedTrack ={
                    ...req.body ,
                    track_Img:track_img
                    }
            }
            
        let newTrack = await trackModel.findByIdAndUpdate(req.params.id,updatedTrack)
        if(newTrack){res.status(200).json({message:"updated"})}
       else{res.status(404).json({message:"Track not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}

//Delete Track
let deleteTrack= async(req,res) =>{
    const id = req.params.id
    //console.log(req.params)
    try{
        let deleteTrack = await trackModel.findByIdAndDelete(req.params.id)
        if(deleteTrack){res.status(200).json({message:"Deleted"})}
       else{res.status(404).json({message:"Track not found"})}
    }
    catch(err){
      for(let e in err.errors){
         console.log(err.errors[0].message);
         res.status(400).json({message:"Bad Request .. Some Fields"})
      }
}
}
module.exports = {
    createTrack,
    getAllTracks,
    getTrackById,
    updataTrack,
    deleteTrack
}
