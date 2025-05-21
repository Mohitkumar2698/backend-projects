import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema({
  userName: String,
  password: String,
  bio: String,
  follower: Number,
  following: Number,
  numberPost: Number,
});

export const User = mongoose.model("user", UserInfoSchema);
