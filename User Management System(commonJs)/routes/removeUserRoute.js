const fs = require("fs");
const path = require("path");
const getUsers = require("./getUserRoute");

const DB_PATH = path.join(__dirname, "../database", "usersData.json");

// removeUser
const removeUser = (requestObj) => {
  let users = getUsers();
  const filteredUsers = users.filter(
    (dbUser) =>
      dbUser.name.toLowerCase() !== requestObj.params.name.toLowerCase()
  );
  users = filteredUsers;
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  const usersData = getUsers();
  const response = {
    message: `user ${requestObj.params.name} deleted!`,
    result: usersData,
  };
  return response;
};

module.exports = removeUser;
