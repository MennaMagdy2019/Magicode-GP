const express = require('express')
const router = express.Router()
const studentsController = require('../controllers/students')
const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")
const loginStd = require("../middleWares/loginStudent")
const auth = require("../middleWares/authPermissionMW")
// get ALL Students
//role this for admin only
// router.get('/',auth,studentsController.getAllStudents)
router.get('/',studentsController.getAllStudents)

//get Student Courses
// router.get('/courses' ,studentsController.getStudent_courses)

// get Student By id
router.get('/:id',studentsController.getStudentById)

// Add Student
//router.post('/' ,upload.single("image"),stdValidator,studentsController.createStudent)

router.post('/' ,upload.single("image"),studentsController.createStudent)

//Update Student
router.put('/:id',upload.single("image"),studentsController.updateStudentById)


//Delete Student
// role this for admin only 
// router.delete('/:id' , auth,studentsController.deleteStudent)

router.delete('/:id' ,studentsController.deleteStudent)


module.exports = router