import {
  productService,
  userService,
  cartService,
} from "../repositories/index.js";
import productsModel from "../dao/models/products.js";
import { generateProducts } from "../utils/generateProducts.js";
import logger from "../utils/logger.js";

export const viewGetAll = async (req, res) => {
  let product = await productService.getAll();
  res.render("home", { product });
};

export const viewGetAllRealTime = async (req, res) => {
  let product = await productService.getAll();
  res.render("realTimeProducts", { product });
};

export const viewChat = async (req, res) => {
  res.render("chat", {});
};

export const viewProducts = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  let sort = parseInt(req.query.sort);
  let filt = {};

  if (req.query.query) {
    filt = {
      $or: [{ description: req.query.query }, { category: req.query.query }],
    };
  }

  let sortPrice = {};
  if (sort) {
    sortPrice = { price: sort };
  }

  const result = await productsModel.paginate(filt, {
    limit,
    page,
    sort: sortPrice,
    lean: true,
  });

  result.isValid = page >= 1 && page <= result.totalPages;

  result.nextLink = result.hasNextPage
    ? `http://localhost:8080/products?limit=${result.limit}&page=${result.nextPage}&sort=${result.sort}`
    : "";
  result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/products?limit=${result.limit}&page=${result.prevPage}&sort=${result.sort}`
    : "";

  const cart = await cartService.getCartById(req.user.cart._id);
  let user = req.session.user;

  res.render("product", { ...result, user, cart });
};

export const viewCreateProd = async (req, res) => {
  res.render("createProd");
};

export const viewCarts = async (req, res) => {
  const { cid } = req.params;
  try {
    const user = req.session.user;
    const response = await cartService.getCartById(cid);
    res.render("cart", { response, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const viewRestoreEmail = async (req, res) => {
  res.render("restoreEmail");
};

export const viewRestorePass = async (req, res) => {
  res.render("restorePass");
};

export const viewRegister = async (req, res) => {
  res.render("register");
};

export const viewLogin = async (req, res) => {
  res.render("login");
};

export const viewUserAdmin = async (req, res) => {
  const users = await userService.getAll();
  res.render("userAdmin", { users });
};

export const viewMocking = async (req, res) => {
  const quantity = req.query.quantity || 100;
  const products = [];

  for (let i = 0; i < quantity; i++) {
    products.push(generateProducts());
  }

  res.send({ status: "success", payload: products });
};
export const viewLoggerTest = async (req, res) => {
  try {
    // Ejemplo de diferentes niveles de logs
    logger.fatal("Este es un mensaje fatal");
    logger.error("Este es un mensaje de error");
    logger.warning("Este es un mensaje de advertencia");
    logger.info("Este es un mensaje de información");
    logger.debug("Este es un mensaje de depuración");

    res.status(200).send("Logs probados correctamente");
  } catch (error) {
    logger.error("Error al probar los logs:", error);
    res.status(500).send("Error al probar los logs");
  }
};
