import ticketModel from "../models/ticket.js";

export default class TicketDao {
  constructor() {}

  getAll = async () => {
    return await ticketModel.find().lean();
  };

  getById = async (id) => {
    return await ticketModel.findOne({ _id: id }).lean();
  };

  getbyemailandDate = async (email, date) => {
    return await ticketModel
      .findOne({ purchaser: email, purchase_datetime: date })
      .lean();
  };

  createTicket = async (ticket) => {
    return await ticketModel.create(ticket);
  };

  update = async (id, item) => {
    return await ticketModel.updateOne({ _id: id }, item);
  };

  delete = async (id) => {
    return await ticketModel.deleteOne({ _id: id });
  };

  generate = async (email, totalAmount) => {
    if (typeof this.createTicket !== "function") {
      throw new TypeError("this.createTicket is not a function");
    }
    const ticket = await this.createTicket({
      code: `${Math.random()}`,
      purchase_datetime: new Date().toLocaleString(),
      amount: totalAmount,
      purchaser: email,
    });
    return ticket;
  };
}
