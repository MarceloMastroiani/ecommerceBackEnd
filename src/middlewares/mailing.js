import mailer from "nodemailer";
import { entorno } from "../config/entorno.config.js";

export default class MailingService {
  constructor() {
    this.client = mailer.createTransport({
      service: entorno.mail_service,
      host: entorno.mail_host,
      port: entorno.mail_port,
      auth: {
        user: entorno.mail_username,
        pass: entorno.mail_password,
      },
    });
  }

  sendSimpleMail = async ({ from, to, subject, html, attachments = [] }) => {
    let result = await this.client.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
    return result;
  };

  sendDeletedAccountMail = async (name, destinationMail) => {
    await this.client.sendMail({
      from: `Node service <${entorno.mail_username}>`,
      to: destinationMail,
      subject: `Cuenta borrada`,
      html: `
            <div>
                <h1>Buen dia ${name}</h1>
                <h1>Lamentamos informarle que su cuenta ha sido borrada debido a inactividad.</h1>
            </div>
        `,
    });
  };

  sendDeleteUserandProductsMail = async (name, destinationMail) => {
    await this.client.sendMail({
      from: `Node service <${entorno.mail_username}>`,
      to: destinationMail,
      subject: `Eliminacion de usuario y productos`,
      html: `
            <div>
                <h1>Hola ${name}</h1>
                <h1>Lamentamos informarle que su cuenta ha sido borrada y sus productos han sido eliminados.</h1>
            </div>
        `,
    });
  };

  sendTicketMail = async (name, destinationMail, ticket) => {
    await this.client.sendMail({
      from: `Node service <${entorno.mail_username}>`,
      to: destinationMail,
      subject: `Ticket generado`,
      html: `
            <div>
                <h1>Hola ${name}</h1>
                <h1>Aqui tienes el ticket generado por su compra.</h1>
                <h1>Código: 
                ${ticket.code}
                <br>
                ${ticket.purchase_datetime}
                <br>
                ${ticket.amount}
                <br>
                ${ticket.purchaser}
                </h1>
            </div>
        `,
    });
  };
}
