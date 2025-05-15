const fs = require("fs");
const path = require("path");
const getUsers = require("./getUserRoute");

const DB_PATH = path.join(__dirname, "../database", "usersData.json");

// addUser
const addUser = (req) => {
  const usersData = getUsers();
  usersData.push(req.body);
  fs.writeFileSync(DB_PATH, JSON.stringify(usersData, null, 2));
  const response = {
    message: `user ${req.body.name} added...`,
    result: usersData,
  };
  return response;
};
module.exports = addUser;
