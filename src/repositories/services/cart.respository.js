export default class CartRepository {
  //DAO
  constructor(dao) {
    this.dao = dao;
  }
  getCartById = async (id) => {
    return await this.dao.getCartById(id);
  };

  getCartLean = async (id) => {
    return await this.dao.getCartLean(id);
  };

  createCart = async () => {
    return await this.dao.createCart();
  };

  addProduct = async (id, productId) => {
    return await this.dao.addProduct(id, productId);
  };

  deleteProduct = async (cid, pid) => {
    return await this.dao.deleteProduct(cid, pid);
  };

  deleteAll = async (cid) => {
    return await this.dao.deleteAll(cid);
  };

  updateQuantity = async (cid, pid, newProductQuantity) => {
    return await this.dao.updateQuantity(cid, pid, newProductQuantity);
  };

  updateCart = async (cid, productList) => {
    return await this.dao.updateCart(cid, productList);
  };

  purchase = async (cid, email) => {
    return await this.dao.purchase(cid, email);
  };
}
