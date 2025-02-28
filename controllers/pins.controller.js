const Pin = require("../models/pin.model");
const User = require("../models/user.model");

module.exports.createPin = async function (req, res) {
  let { title, description } = req.body;
  if (!title) {
    req.flash("error", "Please provide the title");
    return res.redirect("/users/collections");
  }
  if (!description) {
    req.flash("error", "Please provide the title");
    return res.redirect("/users/collections");
  }
  try {
    const newPin = await Pin.create({
      pintitle: title,
      pindescription: description,
      image: req.file.filename,
      owner: req.user._id,
    });

    // Owner model ko bhi update karna hoga
    let user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );
    user.pins.push(newPin._id);
    await user.save();

    req.flash("success", "Pin created successfully");
    res.redirect("/users/collections");
  } catch (error) {
    req.flash("error", "Error occured. Try again!");
    res.redirect("/users/create-pin-page");
  }
};

module.exports.updatePin = async function (req, res) {
  let pin = await Pin.findById(req.params.pinid);
  const { title, description } = req.body;

  // Check whether the new image is uploaded or not
  // console.log(req.file);
  if (req.file !== undefined) {
    pin.image = req.file.filename;
  }

  pin.pintitle = title;
  pin.pindescription = description;
  await pin.save();
  req.flash("success", "Pin updated successfully");
  res.redirect("/users/collections");
};

module.exports.deletePin = async function (req, res) {
  try {
    const pinId = req.params.pinid;

    // Let's check whether the pin we are trying to delete exists or not
    let pin = await Pin.findById(pinId);

    if (!pin) {
      req.flash("error", "Pin not found");
      return res.redirect("/users/collections");
    }

    // Main part, We have to update many fields in the user model for e.g. the created pin might also be present in the savedPins array of more than 1 users.
    await User.updateMany(
      { $or: [{ pins: pinId }, { savedPins: pinId }] }, // Find users who have this pin
      { $pull: { pins: pinId, savedPins: pinId } } // Remove it from their arrays
    );

    // Now, delete the actual pin from the Pin model
    await Pin.findByIdAndDelete(pinId);
    req.flash("success", "Pin successfully deleted");
    res.redirect("/users/collections");
  } catch (error) {
    console.error("Error deleting pin:", error);
    req.flash("error", "Something went wrong while deleting the pin");
    res.redirect("/users/collections");
  }
};

module.exports.likePin = async function (req, res) {
  const pinId = req.params.pinid;
  const userId = req.user._id;

  const pin = await Pin.findById(pinId);

  const alreadyLiked = pin.likes.includes(userId.toString());

  if (alreadyLiked) {
    await Pin.findByIdAndUpdate(pinId, { $pull: { likes: userId } });
    return res.status(200).json({
      success: true,
      liked: false,
      likes: pin.likes.length - 1,
    });
  }

  await Pin.findByIdAndUpdate(pinId, { $addToSet: { likes: userId } });

  res.status(200).json({
    success: true,
    liked: true,
    likes: pin.likes.length + 1,
  });
};

module.exports.getPin = async function (req, res) {
  try {
    const pin = await Pin.findById(req.params.pinid);

    console.log("User ID: ", res.locals.user._id);
    const userId = res.locals.user._id;

    const isLikedByCurrentUser = pin.likes.includes(userId);

    res.status(200).json({ success: true, pin, isLikedByCurrentUser });
  } catch (error) {
    res.status(300).json({success:false , message: "Error occured"})
  }
};
