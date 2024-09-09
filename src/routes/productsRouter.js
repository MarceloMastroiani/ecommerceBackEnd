import express from "express";
import {
  getProduct,
  getAllProduct,
  getByIdd,
  getByBrands,
  addProd,
  updateProd,
  deleteProdu,
} from "../controllers/products.controller.js";

const productsRouter = express.Router();

//MUESTRA LOS PRODUCTOS AGREGANDO QUERY
productsRouter.get("/", getProduct);

//MUESTRA LOS PRODUCTOS //
productsRouter.get("/all", getAllProduct);

//BUSCAR POR ID
productsRouter.get("/:id", getByIdd);

//ENCUENTRA EL PRODUCTO POR EL BRAND
productsRouter.get("/:bran", getByBrands);

//AGREGA UN PRODUCTO
productsRouter.post("/add", addProd);

//EDITAR UN PRODUCTO
productsRouter.put("/edit/:id", updateProd);

//ELIMINAR UN PRODUCTO
productsRouter.get("/delete/:id", deleteProdu);

export default productsRouter;

// /api/products/delete/66184e0d8c1f084f0077c46f
