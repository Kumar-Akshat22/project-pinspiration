const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.attachUser = async function (req, res, next) {
  let token = req.cookies.token;

  if (!token) {
    res.locals.user = null; // User not logged In
    return next();
  }

  try {

    let decoded = jwt.verify(token , process.env.JWT_SECRET);
    let user = await User.findById(decoded.id).select("-password");

    if(!user){

        res.locals.user = null;
        return next();
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.locals.user = null;
    next();
  }
};
