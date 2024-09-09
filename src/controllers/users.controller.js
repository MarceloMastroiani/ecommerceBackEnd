import { userService, productService } from "../repositories/index.js";
import logger from "../utils/logger.js";
import UserDTO from "../dao/DTOs/user.dto.js";
import DeleteAfter from "../middlewares/deleteAfter.js";
import MailingService from "../middlewares/mailing.js";

const mailingService = new MailingService();
const deleteAfter = new DeleteAfter();

export const getUsers = async (req, res) => {
  let limit = req.query.limit || 10;

  let result = await userService.getAll(limit);

  res.json({ result });
};

//MOSTRAR LOS USUARIOS CON LOS DATOS COMO EL NOMBRE, EMAIL, TIPO DE CUENTA (ROL)
export const getUsersDto = async (req, res) => {
  let result = await userService.getAll();
  const objet = result.map((user) => {
    return new UserDTO(user);
  });

  res.send({ payload: objet });
};

export const getUserById = async (req, res) => {
  let id = req.params.id;

  let result = await userService.getById(id);
  logger.info(`Obteniendo el usuario con id: ${id}`);
  res.json({ result });
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  let userData = req.body;

  let result = await userService.update(id, userData);
  logger.info(`Actualizado el usuario con id: ${id}`);
  res.json({ result });
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  const userDelete = await userService.getById(id);
  const product = await productService.getAll();

  if (userDelete) {
    product.forEach((product) => {
      if (product.owner === userDelete.email) {
        productService.deleteProductPremium(product._id, userDelete.email);
      }
    });
    userService.delete(id);
    mailingService.sendDeleteUserandProductsMail(
      userDelete.first_name,
      userDelete.email
    );
    logger.info(`Eliminado el usuario con id: ${id} y sus productos`);
  }
};

//ELIMINAR USUARIO LUEGO DE 2 DIAS
export const deleteUserDays = async (req, res) => {
  try {
    const deletedCount = await deleteAfter.deleteInactiveUsers();

    res.json({ status: "success", payload: deletedCount });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const premiumUser = async (req, res) => {
  let id = req.params.id;

  let user = await userService.getById(id);
  if (user.role === "usuario") {
    user.role = "premium";

    let result = await userService.update(id, { $set: { role: user.role } });
    logger.info(`Actualizado el usuario a premium con id: ${id}`);
    res.json({ result });
  }
};

export const getDocuments = async (req, res) => {
  try {
    let id = req.params.id;
    let files = req.files;

    const user = await userService.getById(id);
    let documents = user.documents || [];

    documents = [
      ...documents,
      ...files.map((file) => {
        return {
          name: file.originalname,
          reference: file.path.split("public")[1].replace(/\\/g, "/"),
        };
      }),
    ];

    let result = await userService.update(id, { documents: documents });

    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const getProfilePicture = async (req, res) => {
  try {
    let id = req.params.id;
    let file = req.file;

    let reuslt = await userService.update(id, {
      profile_picture: file.path.split("public")[1].replace(/\\/g, "/"),
    });

    res.send({ status: "success", payload: reuslt });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};
