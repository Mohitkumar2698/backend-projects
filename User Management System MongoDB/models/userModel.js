const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// connecting DB
function connectDB() {
  mongoose
    .connect(
      process.env.DB_URI,
      {
        dbName: "nodeMongoDB",
      }
    )
    .then((res) => {
      console.log(`Database Connected : ${res}`);
    });
}

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  nameLower: String,
  pass: Number,
  bio: String,
  follower: String,
  following: String,
});

// lowerCase Name Middleware
userSchema.pre("save", function (next) {
  this.nameLower = this.name.toLowerCase();
  next();
});

// User Model
const User = new mongoose.model("User", userSchema);

module.exports = { connectDB, User };
