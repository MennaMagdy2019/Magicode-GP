const { Router } = require('express');
const enrollCoursesCont = require('../controllers/enroll');
const enrollTracksCont = require('../controllers/enrollTracks');

 const loginStd = require("../middleWares/loginStudent")
 const auth = require("../middleWares/authPermissionMW")

const router = Router();



router.get('/enrollCoursess' ,enrollCoursesCont.getAllEnrollCourses);
router.get('/enrollCoursess/:id' ,enrollCoursesCont.getEnrollCourse);
router.post('/enrollCoursess/:id',loginStd ,enrollCoursesCont.enrollCourses);
router.post('/enrollTrackss/:id',loginStd ,enrollTracksCont.enrollTrack);

router.put('/enrollCoursess/:id',loginStd ,enrollCoursesCont.updateEnrollCourses);
router.get('/getStudentCourses/:id' ,loginStd,enrollCoursesCont.getEnrollStudent);

router.get('/getStudentTracks/:id' ,loginStd,enrollTracksCont.getEnrollStudentTracks);
router.delete('/deleteStudent/:id',enrollCoursesCont.DeleteStudent)

module.exports = router;
