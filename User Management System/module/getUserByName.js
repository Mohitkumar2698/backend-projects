import { getUsers } from "./getUser.js";

export const getUserByUsername = (user) => {
  const users = getUsers();
  let foundUser = users.find(
    (dbUser) => dbUser.name.toLowerCase() === user.name.toLowerCase()
  );
  if (foundUser) {
    return { message: `fetching ${user.name} data...`, user };
  } else {
    return { message: `user ${user.name} not found` };
  }
};
