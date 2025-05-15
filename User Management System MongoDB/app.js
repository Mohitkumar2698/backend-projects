const express = require("express");
const path = require("path");
const { connectDB, User } = require("./models/userModel.js");
const haveUserMiddleware = require("./middlewares/haveUserMiddleware.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
// Home route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// POST new user
app.post("/adduser", async (req, res) => {
  const name = req.body.name.toLowerCase();
  const user = await User.find({ nameLower: name });
  if (user.length > 0)
    res.json({
      status: 404,
      message: `this name${name} is already used! use another name`,
    });
  await User.create(req.body);
  const users = await User.find();
  res.json({
    success: true,
    message: `user ${req.params.name} added!`,
    users,
  });
});

// GET user by name
app.get("/users/:name", haveUserMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

// GET all User DB
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

// UPDATE User DB
app.put("/users/:name", haveUserMiddleware, async (req, res) => {
  await User.updateOne(
    { nameLower: req.params.name },
    {
      name: req.body.name,
      nameLower: req.body.name.toLowerCase(),
      pass: req.body.pass,
      bio: req.body.bio,
      follower: req.body.follower,
      following: req.body.following,
    }
  );
  res.json({
    success: true,
    message: "information updated :-",
    users: req.body,
  });
});

// Delete User DB
app.delete("/users/:name", haveUserMiddleware, async (req, res) => {
  await User.findOneAndDelete({
    nameLower: req.params.name,
  });
  const users = await User.find();
  res.json({
    success: true,
    message: `user ${req.params.name} deleted!`,
    users,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`);
});
connectDB();
