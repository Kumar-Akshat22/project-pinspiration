const mongoose = require("mongoose");

const DBConnect = async function () {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}/pinterest`)
      .then(() => console.log("DB CONNECTED"));
  } catch (err) {
    console.log(err.message);
  }
};


module.exports = DBConnect