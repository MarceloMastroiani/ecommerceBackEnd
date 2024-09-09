export default class UserRepository {
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

  getByEmail = async (email) => {
    return await this.dao.getByEmail(email);
  };

  create = async (user) => {
    return await this.dao.create(user);
  };

  update = async (id, userList) => {
    return await this.dao.update(id, userList);
  };

  delete = async (id) => {
    return await this.dao.delete(id);
  };

  deleteAll = async (id) => {
    return await this.dao.deleteAll(id);
  };
}
