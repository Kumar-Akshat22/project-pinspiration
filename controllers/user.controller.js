const User = require("../models/user.model");

module.exports.getProfile = async function (req, res) {
  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      req.flash("error", "No user found");
      return res.redirect("/users/signup");
    }

    res.render("user/profile", { user });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.editProfile = async function (req, res) {
  let user = await User.findOne({ _id: req.params.userId }).select("-password");
  res.render("user/editProfile", { user });
};

module.exports.updateProfile = async function (req, res) {
  let { name, username, bio } = req.body;

  let user = await User.findOne({ _id: req.params.userId }).select("-password");

  if (req.file !== undefined) {
    user.profilePicture = req.file.filename;
  }

  user.name = name;
  user.username = username;
  user.bio = bio;

  await user.save();
  req.flash("success", "Details successfully updated");
  res.redirect(`/users/profile/${user._id}`);
};

module.exports.updateCoverPhoto = async function (req, res) {
  let user = await User.findById(req.params.userId).select("-password");

  if (req.file) {
    user.coverPhoto = req.file.filename;
    await user.save();
  }
  req.flash("success", "Cover Photo updated successfully!");
  res.status(200).json({ success: true });
};

module.exports.savePin = async function (req, res) {
  let pinId = req.params.pinid;
  
  let user = await User.findById(req.user._id).select("-password");

  if (user.savedPins.includes(pinId)) {
    req.flash("error" , "Pin already saved!")
    return res.status(400).json({ success: false });
  }

  user.savedPins.push(pinId);
  await user.save();

  req.flash("success", "Pin successfully saved");
  res.status(200).json({ success: true });
};

module.exports.getCollectionsPage = async function (req , res) {
  let user = await User.findById(req.user._id).populate("pins").select("-password");
  res.render('user/collections' , {createdPins: user.pins});
}

module.exports.getSavedPins = async function (req , res) {

  let user = await User.findById(req.user._id).populate("savedPins").select("-password");
  console.log(user.savedPins)
  return res.status(200).json({success: true , savedPins: user.savedPins , userId: user._id});
}
