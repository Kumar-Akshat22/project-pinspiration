const jwt  = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.verifyJWT = async function(req , res , next){

    let token = req.cookies.token;
    console.log("Token: ",token)
    if(!token || token === ""){

        req.flash("error", "Not authorized");
        return res.redirect("/loginPage");

    }

    try {
        
        let decode = jwt.verify(token , process.env.JWT_SECRET);

        let user = await User.findById(decode.id).select("-password");

        req.user = user;

        next();

    } catch (error) {
        
        req.flash("error", "Invalid Token");
        return res.redirect("/loginPage");
    }
}