import productsModel from "../models/products.js";
import logger from "../../utils/logger.js";

export default class ProductDao {
  constructor() {}

  getAll = async () => {
    let result = await productsModel.find().lean();
    return result;
  };

  getById = async (id) => {
    let result = await productsModel.findById(id);
    return result;
  };

  getByBrand = async (brand) => {
    let result = await productsModel.find({ brand: brand });
    return result;
  };

  addProduct = async (product) => {
    logger.info(`Agregando los datos del producto: ${JSON.stringify(product)}`);
    let result = await productsModel.create(product);
    return result;
  };

  updateProduct = async (id, productData) => {
    let result = await productsModel.updateOne(
      { _id: id },
      { $set: productData }
    );
    return result;
  };

  deleteProductAdmin = async (id) => {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  };

  deleteProductPremium = async (id, owner) => {
    let result = await productsModel.deleteMany({ _id: id, owner: owner });
    return result;
  };
}
