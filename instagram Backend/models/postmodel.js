import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  caption: String,
  likes: Number,
  comments: Number,
  share: Number,
});

export const Posts = mongoose.model("post", postsSchema);
