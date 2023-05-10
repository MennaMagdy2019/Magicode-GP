const { Router } = require('express');
const coursesController = require('../controllers/courses');
// const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")

const router = Router();


router.get('/', coursesController.getCourses);
router.get('/:id',coursesController.getCourseById);
//router.get('/:name',coursesController.getCourseById);

router.post('/',upload.array("images"),coursesController.createCourse);
router.put('/:id',upload.array("images"),coursesController.updataCourse);
router.delete('/:id',coursesController.deleteCourse);


module.exports = router;