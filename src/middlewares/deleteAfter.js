import { userService } from "../repositories/index.js";
import MailingService from "./mailing.js";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

const mailingService = new MailingService();
const TOLERABLE_TIME = 60 * 24 * 2; // 2 días
//const TOLERABLE_TIME_TEST = 30; // 30 minutos

export default class DeleteAfter {
  constructor() {
    console.log("Trabajando con deleteAfter");
  }
  deleteInactiveUsers = async () => {
    const users = await userService.getAll();
    const now = new Date();
    let deletedCount = 0;

    users.forEach(async (user) => {
      if (user.last_connection) {
        if (
          this.getMinutesDifference(now, user.last_connection) > TOLERABLE_TIME
        ) {
          await userService.deleteAll(user._id);
          await mailingService.sendDeletedAccountMail(
            user.first_name,
            user.email
          );
          deletedCount++;
        }
      }
    });
    return deletedCount;
  };

  getMinutesDifference = (now, last_connection) => {
    let milisecondsDif = now - last_connection;
    //ROUND: Devuelve una expresión numérica proporcionada redondeada al entero más cercano.
    let minutes = Math.round(milisecondsDif / 1000 / 60);

    return minutes;
  };
}
