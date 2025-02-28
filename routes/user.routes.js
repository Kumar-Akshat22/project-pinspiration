const express = require("express");
const { loginUser, signupUser, logoutUser } = require("../controllers/auth.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { getProfile, editProfile, updateProfile, updateCoverPhoto, savePin, getSavedPins, getCollectionsPage } = require("../controllers/user.controller");
const upload = require("../config/multer-config");

const router = express.Router();

router.post('/signup' , signupUser);
router.post('/login' , loginUser);

router.get("/profile/:userId" , verifyJWT , getProfile);
router.get("/profile/edit/:userId" , verifyJWT , editProfile);
router.post("/profile/update/:userId" , verifyJWT , upload.single("profilePic") , updateProfile);
router.post("/profile/update/coverPhoto/:userId" , verifyJWT , upload.single("coverPhoto") , updateCoverPhoto);

router.post("/save/pin/:pinid" , verifyJWT , savePin);
router.get('/collections' , verifyJWT , getCollectionsPage);
router.get('/collections/savedpins' , verifyJWT , getSavedPins);

router.get('/logout' , verifyJWT , logoutUser)


module.exports = router