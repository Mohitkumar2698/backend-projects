import { writeFileSync } from "fs";
import { getUsers } from "./getUser.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, "../database", "usersData.json");

export const addUser = (user) => {
  const users = getUsers();
  let foundUser = users.find(
    (dbUser) => dbUser.name.toLowerCase() === user.name.toLowerCase()
  );
  if (foundUser) {
    return { message: `user ${user.name} already exist!` };
  } else {
    users.push(user);
    writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    const finalUsers = getUsers();
    return { message: `user ${user.name} added!`, finalUsers };
  }
};
