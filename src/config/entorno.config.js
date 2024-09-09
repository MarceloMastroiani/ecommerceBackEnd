import dotenv from "dotenv";

dotenv.config();

export const entorno = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,

  //JWT CONFIG
  jwt_cookie: process.env.JWT_COOKIE,
  jwt_secret: process.env.JWT_SECRET,

  //NODEMAILER CONFIG
  mail_port: process.env.MAIL_PORT,
  mail_username: process.env.MAILING_USER,
  mail_password: process.env.MAILING_PASSWORD,
  mail_service: process.env.MAILING_SERVICE,
  mail_host: process.env.MAILING_HOST,
};
