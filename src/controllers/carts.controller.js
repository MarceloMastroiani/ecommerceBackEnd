import {
  cartService,
  productService,
  userService,
  ticketService,
} from "../repositories/index.js";
import logger from "../utils/logger.js";
import MailingService from "../middlewares/mailing.js";

const mailingService = new MailingService();

export const cartByIdd = async (req, res) => {
  let id = req.params.cid;

  let result = await cartService.getCartById(id);
  logger.info(`Obteniendo el carrito con id: ${id}`);
  res.json({ result });
};

export const creatCart = async (req, res) => {
  let result = await cartService.createCart();

  logger.info(`Creado el carrito con id: ${result._id}`);
  res.json({ result });
};

export const cartAddProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartService.getCartById(cartId);
    const product = await productService.getById(productId);

    if (product) {
      await cartService.addProduct(cartId, productId);
      logger.info(
        `Agregado el producto con id: ${productId} al carrito con id: ${cartId}`
      );
      res.send({ status: "success" });
    } else {
      logger.error(`El producto con id: ${productId} no existe`);
      res
        .status(404)
        .send({ error: `Producto con la ID ${productId} no encontrado` });
    }
  } catch (error) {
    res.status(500).send("Error Interno del Server");
  }
};

export const cartDeleteProduct = async (req, res) => {
  let { cid, pid } = req.params;

  let result = await cartService.deleteProduct(cid, pid);

  res.send({ cart: result });
};

export const cartDeleteAll = async (req, res) => {
  let cid = req.params.cid;

  let result = await cartService.deleteAll(cid);
  res.send({ result });
};

export const updatQuantity = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const newProductQuantity = req.body.quantity;

  if (newProductQuantity) {
    const updatedQuantity = await cartService.updateQuantity(
      cid,
      pid,
      newProductQuantity
    );
    res.send({ updatedQuantity });
  } else {
    res.send("Hubo un error al actualizar la cantidad del producto");
  }
};

export const updatCart = async (req, res) => {
  const cid = req.params.cid;
  const productList = req.body;

  if (productList) {
    const updatedProducts = await cartService.updateCart(cid, productList);
    res.send(updatedProducts);
  } else {
    res.send("Carrito no encontrado");
  }
};

export const purchase = async (req, res) => {
  const { cid } = req.params;
  const { email } = req.params;

  try {
    const remainingProducts = await cartService.purchase(cid, email);
    const user = await userService.getByEmail(email);
    const now = new Date().toLocaleString();

    if (user) {
      let ticket = await ticketService.getbyemailandDate(email, now);
      mailingService.sendTicketMail(user.first_name, user.email, ticket);
    }

    res.send({ status: "success", payload: remainingProducts });
  } catch (error) {
    return res
      .status(error.status || 500)
      .send({ status: "error", error: error.message });
  }
};
