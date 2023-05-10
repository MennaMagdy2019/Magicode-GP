const express = require('express');
const {homeview, generatePdf}  = require('../controllers/certificate');

const certificateController = require('../controllers/certificate');
const router = express.Router();
const upload = require("../middleWares/profileImgMW")

router.post('/download', generatePdf);
router.post('/uploadImgs',upload.array("images"),certificateController.uploadThemes);
module.exports = {
    routes: router
}
