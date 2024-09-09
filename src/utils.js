import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { entorno } from "./config/entorno.config.js";

export const genereteToken = async (userId) => {
  console.log("Hola desde genereteToken");
  return jwt.sign({ userId }, entorno.jwt_secret, { expiresIn: "1h" });
};
export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, entorno.jwt_secret);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const createHash = (password) => {
  const salts = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salts);
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
