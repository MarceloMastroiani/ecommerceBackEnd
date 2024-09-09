import userModel from "../dao/models/users.js";
import { createHash } from "../utils.js";
import UsercurrentDTO from "../dao/DTOs/current.dto.js";
import { genereteToken, verifyToken } from "../utils.js";
import MailingService from "../middlewares/mailing.js";

export const sessionRegister = async (req, res) => {
  res.status(201).send({ status: "success", message: "Usuario registrado" });
};

export const sessionFailRegister = async (req, res) => {
  res.send({ error: "Falló" });
};

export const sessionLogin = async (req, res) => {
  const user = req.user;

  req.session.user = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    cart: user.cart,
    role: user.role,
    last_connection: user.last_connection,
  };
  res.status(200).send({ status: "success", payload: req.session.user });
};

export const sessionFailLogin = async (req, res) => {
  res.send({ error: "Fallo" });
};

export const sessionLogout = async (req, res) => {
  const email = req.session.user.email;
  const user = await userModel.findOne({ email: email });

  if (user) {
    user.last_connection = new Date();
    await user.save();
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Hubo un error al destruir la sesion");
    }
  });

  res.redirect("/login");
};

export const sessionGithubcallback = async (req, res) => {
  req.session.user = req.user;
  res.redirect("/products");
};

export const sessionCurrent = async (req, res) => {
  const user = req.session.user;
  const usercurrentDTO = new UsercurrentDTO(user);
  res.send({ payload: usercurrentDTO });
};

export const recuperarContrasena = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(404).send({ status: "error", error: "User not found" });
  const token = await genereteToken(user._id);

  const mailingService = new MailingService();
  const correoOptions = {
    from: "Coder Tests",
    to: user.email,
    subject: "Recuperarcion de contraseña",
    html: `
        <p>Por favor, haz click en el siguiente enlace para recuperar su contraseña:</p>
        <a href="http://localhost:8080/api/sessions/reset-password/${token}">Recuperar contraseña</a>
        `,
  };
  await mailingService.sendSimpleMail(correoOptions);
  res.status(200).send({ status: "success", message: "Email sent" });
};

export const recuperarContrasenaToken = async (req, res) => {
  const { token } = req.params.token;

  const decodedToken = await verifyToken(token);
  if (!decodedToken) return res.redirect("/restorePass");

  res.redirect("/restorePass");
};

export const sessionRestore = async (req, res) => {
  const { email, password } = req.body;
  const userId = await userModel.findOne({ email });
  const newPass = createHash(password);

  const result = await userModel.updateOne(
    { _id: userId },
    { $set: { password: newPass } }
  );

  res.status(200).send({ status: "success", message: "Password updated" });
};
