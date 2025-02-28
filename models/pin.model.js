const mongoose = require("mongoose");

const pinSchema = mongoose.Schema({
  image: {
    type: String,
  },

  pintitle: {
    type: String,
  },

  pindescription: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Pin = mongoose.model("Pin" , pinSchema)
module.exports = Pin
