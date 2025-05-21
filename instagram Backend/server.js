import express from "express";
import { dbConnection } from "./database/connection.js";
import { User } from "./models/userModel.js";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Delete User
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const updateUser = await User.findByIdAndDelete(id, { new: true });
  if (!updateUser)
    res.status(400).json({ success: false, message: "User not found!" });
  res.status(200).json({ success: true, message: "User deleted!", updateUser });
});

// Update User
app.put("/:id", async (req, res) => {
  const { userName, password, bio, follower, following, numberPost } = req.body;
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      userName,
      password,
      bio,
      follower,
      following,
      numberPost,
    },
    { new: true }
  );
  if (!updateUser)
    res.status(400).json({ success: false, message: "User not found!" });
  res.status(200).json({ success: true, message: "User updated!", updateUser });
});

// Post User
app.post("/", async (req, res) => {
  const { userName, password, bio, follower, following, numberPost } = req.body;
  const user = User.insertOne(
    {
      userName,
      password,
      bio,
      follower,
      following,
      numberPost,
    },
    { new: true }
  );
  if (!user)
    res.status(400).json({ success: false, message: "User not Added!" });
  res.status(200).json({ success: true, message: "User Added!", user });
});

// Get Users
app.get("/", async (req, res) => {
  const users = await User.find();
  await res.send(users);
});

app.listen(PORT, () => {
  dbConnection();
  console.log("Server is running on PORT 4000");
});
