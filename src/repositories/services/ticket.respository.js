export default class TicketRepository {
  //DAO
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    return await this.dao.getAll();
  };

  getById = async (id) => {
    return await this.dao.getById(id);
  };

  getbyemailandDate = async (email, date) => {
    return await this.dao.getbyemailandDate(email, date);
  };

  createTicket = async (ticket) => {
    return await this.dao.createTicket(ticket);
  };

  update = async (id, item) => {
    return await this.dao.update(id, item);
  };

  delete = async (id) => {
    return await this.dao.delete(id);
  };

  generate = async (email, totalAmount) => {
    return await this.dao.generate(email, totalAmount);
  };
}
