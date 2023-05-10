const lessonModel = require("../models/lesson");

//create Lesson
let createLesson = async (req, res) => {
  try {
    //console.log(req.body);
    // check Lesson found befor or not
    var foundLesson = await lessonModel.findOne({ name: req.body.name });
    if (foundLesson) {
      return res.json({ message: "this lesson Already Exist" });
    } else {
     // console.log(req.file);
      let video_lesson;
      if (req.file != undefined) {
        video_lesson = `http://localhost:7000/${req.file.filename}`;
      }

      let newLesson = new lessonModel({
        ...req.body,
        video_Lesson: video_lesson,
      });
      await newLesson.save();
      res.status(200).json({ message: "Added lesson Successfully" , id:newLesson._id});
    }
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};
//get All Lessons
let getAllLessons = async (req, res) => {
  try {
    const lessons = await lessonModel
      .find()
      .select({ __v: 0 })

    res.status(200).json(lessons);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};

//get Lesson By Id
let getLessonById = async (req, res) => {
  try {
    const lesson = await lessonModel.findById(req.params.id).select({ __v: 0 });
    // console.log(Lessons)
    res.status(200).json(lesson);
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).json({ message: "Bad Request .. Some Fields" });
    }
  }
};

//update Lesson
let updateLesson = async (req, res) => {
  const id = req.params.id;
 
  try {
    var foundLesson = await lessonModel.findById(id);
    if (foundLesson == null) {
      return res.status(400).json({ message: "this lesson Not Found" });
    }

    let video_lesson;
    let updatedLesson = req.body

    if (req.file != undefined) {
      video_lesson = `http://localhost:7000/${req.file.filename}`;

       updatedLesson = { 
        ...req.body,
        video_Lesson: video_lesson
      }
    }
    

    let newLesson = await lessonModel.findByIdAndUpdate(id, updatedLesson);
    console.log(newLesson);
    if (newLesson) {
      res.status(200).json({ message: "updated" });
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

//Delete Lesson
let deleteLesson = async (req, res) => {
  const id = req.params.id;
  //console.log(req.params)
  try {
    let deleteLesson = await lessonModel.findByIdAndDelete(req.params.id);
    if (deleteLesson) {
      res.status(200).json({ message: "Deleted" });
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
module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
