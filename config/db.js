const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongodb connected ....");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;