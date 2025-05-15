const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../database", "usersData.json");

// getUsers
const getUsers = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

module.exports = getUsers;
