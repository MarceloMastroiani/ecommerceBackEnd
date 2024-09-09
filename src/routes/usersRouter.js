import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  premiumUser,
  getDocuments,
  getProfilePicture,
  getUsersDto,
  deleteUserDays,
} from "../controllers/users.controller.js";
import { upload } from "../middlewares/filesMiddlewares.js";
import { checkAdmin } from "../middlewares/checkRole.auth.js";

const usersRouter = express.Router();

//MUESTRA LOS USUARIOS
usersRouter.get("/", checkAdmin, getUsers);

//MOSTRAR LOS USUARIOS CON LOS DATOS COMO EL NOMBRE, EMAIL, TIPO DE CUENTA (ROL)
usersRouter.get("/usersdto", checkAdmin, getUsersDto);

//BUSCAR POR ID
usersRouter.get("/:id", getUserById);

//EDITAR USUARIO
usersRouter.put("/edit/:id", updateUser);

//ELIMINAR USUARIO
usersRouter.delete("/delete/:id", checkAdmin, deleteUser);

//ELIMINAR USUARIO LUEGO DE 2 DIAS
usersRouter.delete("/deletes", checkAdmin, deleteUserDays);

//PASAR ROL USUARIO A PREMIUM
usersRouter.get("/premium/:id", premiumUser);

//SUBIR DOCUMENTOS
usersRouter.post("/:id/documents", upload.array("documents", 4), getDocuments);

//SUBIR PROFILE PICTURE
usersRouter.post(
  "/:id/profile-picture",
  upload.single("profiles"),
  getProfilePicture
);

export default usersRouter;
