import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/Instagram");
  console.log("Database Connected!");
};
