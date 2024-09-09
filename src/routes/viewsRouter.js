import express from "express";
import { checkAdmin, checkRole } from "../middlewares/checkRole.auth.js";
import { privateAccess } from "../middlewares/privateAuth.js";
import { publicAccess } from "../middlewares/publicAuth.js";
import {
  viewGetAll,
  viewGetAllRealTime,
  viewChat,
  viewProducts,
  viewCarts,
  viewRestoreEmail,
  viewRestorePass,
  viewRegister,
  viewLogin,
  viewMocking,
  viewLoggerTest,
  viewCreateProd,
  viewUserAdmin,
} from "../controllers/views.controller.js";

const viewsRouter = express.Router();

//MUESTRA LOS PRODUCTOS EN home.handlebars
viewsRouter.get("/", privateAccess, viewGetAll);

//CREA Y MUESTRA LOS PRODUCTOS EN realTimeProducts
viewsRouter.get("/realTimeProducts", privateAccess, viewGetAllRealTime);

//REMDERIZA EL CHAT
viewsRouter.get("/chat", privateAccess, viewChat); //checkRole("usuario"),

//RENDERIZA UNA VISTA PRODUCTS
viewsRouter.get("/products", privateAccess, viewProducts);

//CREA PRODUCTO
viewsRouter.get("/createProd", checkRole, viewCreateProd);

//RENDERIZA LA VISTA DEL CARRITO
viewsRouter.get("/carts/:cid", privateAccess, viewCarts); //FUNCIONA

//RESTAURAR PASSWORD
viewsRouter.get("/restoreEmail", viewRestoreEmail);

viewsRouter.get("/restorePass", viewRestorePass);

//VISTA DE REGISTRAR
viewsRouter.get("/register", publicAccess, viewRegister);

//VISTA DEL LOGIN
viewsRouter.get("/login", publicAccess, viewLogin);

//VISTA DE USUARIOS PARA ADMINISTRACION
viewsRouter.get("/userAdmin", checkAdmin, viewUserAdmin);

viewsRouter.get("/mockingproducts", viewMocking);

viewsRouter.get("/loggerTest", viewLoggerTest);

export default viewsRouter;
