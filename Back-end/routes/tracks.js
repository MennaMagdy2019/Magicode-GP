const { Router } = require('express');
const tracksController = require('../controllers/track');
// const stdValidator = require("../middleWares/studentValidMW")
const upload = require("../middleWares/profileImgMW")

const router = Router();


router.get('/', tracksController.getAllTracks);
router.post('/',upload.array("images"),tracksController.createTrack);
router.get('/:id',tracksController.getTrackById);
router.put('/:id',upload.array("images"),tracksController.updataTrack);
router.delete('/:id',tracksController.deleteTrack);

module.exports = router;