const { Router } = require('express');
const authController = require('../controllers/auth');
const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")

const router = Router();


router.post('/signup',upload.single("image"),stdValidator, authController.signup);
router.post('/login', stdValidator,authController.login);
router.put("/checkActivate",authController.confirmEmail)
router.post("/changePassword",authController.forgetPassword)
router.post("/updatePassword",authController.updatePassword)

module.exports = router;