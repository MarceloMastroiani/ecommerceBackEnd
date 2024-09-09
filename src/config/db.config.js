import mongoose from "mongoose";
import { entorno } from "./entorno.config.js";
import logger from "../utils/logger.js";

//settings
const MONGO_URL = entorno.mongoUrl;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    logger.info(`Database is connected!`);
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
  }
};

export default dbConnection;
