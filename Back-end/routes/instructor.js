const { Router } = require('express');
const instructorController = require('../controllers/instructor');
// const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")

const router = Router();


router.get('/', instructorController.getAllInstructors);
router.post('/',upload.single("image"),instructorController.createInstructor);
router.get('/:id',instructorController.getInstructorById);
router.put('/:id',upload.single("image"),instructorController.updateInstructor);
router.delete('/:id',instructorController.deleteInstructor);

module.exports = router;