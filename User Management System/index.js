import express from "express";
import { addUser } from "./module/postUser.js";
import { removeUser } from "./module/removeUser.js";
import { getUsers } from "./module/getUser.js";
import { getUserByUsername } from "./module/getUserByName.js";

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.delete("/users", (req, res) => {
  res.json(removeUser(req.body));
});

app.post("/users", (req, res) => {
  res.json(addUser(req.body));
});

app.get("/users/:name", (req, res) => {
  const user = req.params;
  res.json(getUserByUsername(user));
});

app.get("/users", (req, res) => {
  res.json(getUsers());
});

app.listen(PORT, () => {
  console.log("Server is Running on PORT : 8000");
});
