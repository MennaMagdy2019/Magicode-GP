const { Router } = require("express");
const User = require("../models/student");
const auth = require("../middleWares/authPermissionMW");

const router = Router();
const loginStd = require("../middleWares/loginStudent")
const studentsController = require('../controllers/students')
const mailController = require('../controllers/mail');


router.post("/sendEmail", mailController.sendMail );
//take Student prize
router.post('/updateStudentPrize/:id',loginStd,studentsController.updateStudentPrize)

module.exports = router;
