import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, "../database", "usersData.json");


export const getUsers = () => {
  const data = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};
