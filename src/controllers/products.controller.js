import productsModel from "../dao/models/products.js";
import { productService } from "../repositories/index.js";
import { CustomError } from "../utils/errorHandling/customError.js";
import { errorTypes } from "../utils/errorHandling/errorTypes.js";
import { getProductErrorInfo } from "../utils/errorHandling/info.js";
import logger from "../utils/logger.js";

export const getProduct = async (req, res) => {
  let limit = req.query.limit || 10;
  let page = req.query.page || 1;
  let sort = parseInt(req.query.sort);
  let filt = {};
  let status = "success";

  try {
    if (req.query.query) {
      filt = {
        $or: [{ description: req.query.query }, { category: req.query.query }],
      };
    }

    let sortPrice = {};
    if (sort) {
      sortPrice = { price: sort };
    }

    let result = await productsModel.paginate(filt, {
      limit: limit,
      page: page,
      sort: sortPrice,
      lean: true,
    });

    const paginateData = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${result.limit}&sort=${result.sort}`
        : null,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${result.limit}&sort=${result.sort}`
        : null,
    };

    res.send(paginateData);
  } catch (error) {
    status = "error";
    res.status(500).send({ status, error: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  let limit = req.query;

  let data = await productService.getAll(limit);
  logger.info(`Obteniendo todos los productos con limit: ${limit}`);
  res.json({ data });
};

export const getByIdd = async (req, res) => {
  let id = req.params.id;

  let result = await productService.getById(id);
  logger.info(`Obteniendo el producto con id: ${id}`);
  res.json({ result });
};

export const getByBrands = async (req, res) => {
  let brand = req.params.brand;

  let result = await productService.getByBrand(brand);
  logger.info(`Obteniendo los productos con el brand: ${brand}`);
  res.json({ result });
};

export const addProd = async (req, res) => {
  const { title, description, code, category, brand, price, stock, owner } =
    req.body;

  if (
    !title ||
    !description ||
    !code ||
    !category ||
    !brand ||
    !price ||
    !stock
  ) {
    logger.error("Error al agregar producto");
    throw CustomError.CustomError(
      "Error",
      "El producto no puede estar vacio",
      errorTypes.ERROR_INVALID_ARGUMENTS,
      res.send(getProductErrorInfo(newProduct))
    );
  }

  const newProduct = {
    title,
    description,
    code,
    category,
    brand,
    price,
    stock,
    owner,
  };

  //COMENTAR LA LINEA DE ABAJO PARA Q FUNCIONAR EL TEST
  if (req.user.role == "premium") {
    newProduct.owner = req.user.email;
  }

  let result = await productService.addProduct(newProduct);
  res.json({ result });
};

export const updateProd = async (req, res) => {
  let id = req.params.id;
  let productData = req.body;

  let result = await productService.updateProduct(id, productData);
  logger.info(`Actualizado el producto con id: ${id}`);
  res.json({ result });
};

export const deleteProdu = async (req, res) => {
  let id = req.params.id;

  //VERIFICA SI EL USUARIO ES ROL USUARIO

  if (req.user.role == "usuario") {
    throw CustomError.CustomError(
      "Error",
      "No tienes permiso para eliminar este producto",
      errorTypes.ERROR_UNAUTHORIZED,
      res.send(getProductErrorInfo(newProduct))
    );
    //VERIFICA SI EL USUARIO ES ROL PREMIUM
  } else if (req.user.role == "premium") {
    let owner = req.user.email;
    let result = await productService.deleteProductPremium(id, owner);
    res.json({ result });
    //VERIFICA SI EL USUARIO ES ROL ADMIN
  } else if (req.user.role == "admin") {
    let result = await productService.deleteProductAdmin(id);
    logger.info(`Eliminado el producto con id: ${id}`);
    res.json({ result });
  } else {
    res.status(403).send("No tienes permiso para eliminar este producto");
  }
};
