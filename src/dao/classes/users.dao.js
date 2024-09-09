import UserModel from "../models/users.js";

export default class UserDao {
  constructor() {}
  getAll = async () => {
    return await UserModel.find().lean();
  };

  getById = async (id) => {
    return await UserModel.findOne({ _id: id }).lean();
  };

  getByEmail = async (email) => {
    return await UserModel.findOne({ email: email }).lean();
  };

  create = async (user) => {
    return await UserModel.create(user);
  };

  update = async (id, userList) => {
    return await UserModel.updateOne({ _id: id }, userList);
  };

  delete = async (id) => {
    return await UserModel.deleteOne({ _id: id });
  };

  deleteAll = async (id) => {
    let result = await UserModel.deleteMany({ _id: id });
  };
}
