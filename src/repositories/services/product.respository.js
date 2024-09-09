export default class ProductRepository {
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

  getByBrand = async (brand) => {
    return await this.dao.getByBrand(brand);
  };

  addProduct = async (product) => {
    return await this.dao.addProduct(product);
  };

  updateProduct = async (id, productData) => {
    return await this.dao.updateProduct(id, productData);
  };

  deleteProductAdmin = async (id) => {
    return await this.dao.deleteProductAdmin(id);
  };

  deleteProductPremium = async (id, owner) => {
    return await this.dao.deleteProductPremium(id, owner);
  };
}
