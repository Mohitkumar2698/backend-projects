import { writeFileSync } from "fs";
import { getUsers } from "./getUser.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, "../database", "usersData.json");

export const removeUser = (user) => {
  let users = getUsers();
  const filterUser = users.filter((getUser) => getUser.name !== user.name);
  if (filterUser.length < users.length) {
    users = filterUser;
    writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    const finalUsers = getUsers();
    return { message: `user ${user.name} deleted!`, finalUsers };
  } else {
    return { message: `user ${user.name} not exist!` };
  }
};
