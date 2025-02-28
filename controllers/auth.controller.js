const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.signupUser = async function (req, res) {
  try {
    let { name, username, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      req.flash("error" , "User already exists! Please Login");
      return res.redirect("/signupPage")
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdUser = await User.create(
            {   
                name,
                username, 
                email, 
                password:hash 
            }
        );
        req.flash("success" , "Account created successfully! Please login.")
        res.redirect('/loginPage');
      });
    });
  } catch (error) {
    console.error("Error in signup:", error);
    req.flash("error", "Something went wrong. Try again!");
    res.redirect("/signupPage");
  }
};

module.exports.loginUser = async function (req, res) {
  let { email , password } = req.body;
  if(!email){

    req.flash("error" , "Please provide email address");
    return res.redirect('/loginPage');
  }

  if(!password){

    req.flash("error" , "Please provide your password");
    return res.redirect('/loginPage');
  }

  try {
    
    let user = await User.findOne({email})
    if(!user){

      req.flash("error" , "User not found! Please sign up.");
      return res.redirect('/loginPage');
    }

    // Authenticate the user -> Comparing the passwords
    // Then generate a JWT
    bcrypt.compare(password, user.password , function(err , result){

      if(!result){

        req.flash("error" , "Password is incorrect. Try again!");
        return res.redirect('/loginPage');
      }

      // User authenticated -> Generate the JWT for future use
      let token = generateToken(user)
      res.cookie("token" , token , {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
      });

      req.flash("success" , "Login successful! Welcome back.");
      res.redirect('/explore');

    })

  } catch (error) {
    console.error("Login error:", error.message);
    req.flash("error", "Something went wrong. Try again!");
    res.redirect("/loginPage");
  }
};  

module.exports.logoutUser = function(req , res){

  res.cookie("token" , "");
  req.flash("success" , "Logged Out successfully");
  res.redirect("/explore");
}
