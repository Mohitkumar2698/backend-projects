const express = require("express");

// Routes
const getUsers = require("./routes/getUserRoute");
const getUsersByName = require("./routes/getUserByNameRoute");
const addUser = require("./routes/postUserRoute");
const removeUser = require("./routes/removeUserRoute");
// Middlewares
const {
  haveUserMiddleware,
  notHaveUserMiddleware,
} = require("./middlewares/haveUser.middleware");

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  const users = getUsers();
  res.json({ message: "Fetching all users...", users });
});

app.delete("/users/:name", haveUserMiddleware, (req, res) => {
  const response = removeUser(req);
  res.json(response);
});

app.post("/users", notHaveUserMiddleware, (req, res) => {
  const response = addUser(req);
  res.json(response);
});

app.get("/users/:name", haveUserMiddleware, (req, res) => {
  const response = getUsersByName(req);
  res.json(response);
});

app.listen(PORT, () => {
  console.log("Server is Running on PORT : 8000");
});
