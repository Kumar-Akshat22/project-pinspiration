const express = require("express");
const { verifyJWT } = require("../middlewares/verifyJWT");
const {
  createPin,
  updatePin,
  deletePin,
  likePin,
  getPin
} = require("../controllers/pins.controller");
const upload = require("../config/multer-config");
const router = express.Router();

router.get("/:pinid" , verifyJWT, getPin);


router.post("/create", verifyJWT, upload.single("image"), createPin);

router.post("/update/:pinid", verifyJWT, upload.single("image"), updatePin);

router.post('/delete/:pinid' , verifyJWT , deletePin);

router.post('/like/:pinid' , verifyJWT , likePin)

module.exports = router;
