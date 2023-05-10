const { Router } = require("express");
const User = require("../models/student");
const auth = require("../middleWares/authPermissionMW");
const router = Router();

router.put("/:id", auth, async (req, res) => {
  // console.log(req.params.id)
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, { adminRole: true });
    res.status(200).send("user Role is set to Admin");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[0].message);
      res.status(400).send("Bad Request .. Some Fields");
    }
  }
});

module.exports = router;
