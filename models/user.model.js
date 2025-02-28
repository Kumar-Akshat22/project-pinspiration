const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  username: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    },
  ],

  savedPins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    },
  ],

  profilePicture: {
    type: String,
    default: "https://avatars.githubusercontent.com/u/124599?v=4",
  },

  coverPhoto: {
    type: String,
    default: "https://avatars.githubusercontent.com/u/124599?v=4",
  },

  bio: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
