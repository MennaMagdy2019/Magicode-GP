const { Router } = require('express');
const lessonsController = require('../controllers/lesson');
// const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/vedioMW")

const router = Router();


router.get('/', lessonsController.getAllLessons);
router.post('/',upload.single("vedio"),lessonsController.createLesson);
router.get('/:id',lessonsController.getLessonById);
router.put('/:id',upload.single("vedio"),lessonsController.updateLesson);
router.delete('/:id',lessonsController.deleteLesson);

module.exports = router;