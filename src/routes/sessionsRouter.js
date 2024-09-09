import { Router } from "express";
import passport from "passport";
import {
  sessionRegister,
  sessionFailRegister,
  sessionLogin,
  sessionFailLogin,
  sessionLogout,
  sessionRestore,
  sessionGithubcallback,
  sessionCurrent,
  recuperarContrasena,
  recuperarContrasenaToken,
} from "../controllers/sessions.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  sessionRegister
);

router.get("/failregister", sessionFailRegister);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  sessionLogin
);

router.get("/faillogin", sessionFailLogin);

//LOGICA DEL LOGOUT
router.get("/logout", sessionLogout);

//INICIAR SESION CON GITHUB
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//RUTA QUE NOS LLEVA A GITHUD LOGIN
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  sessionGithubcallback
);

router.get("/current", sessionCurrent);

//RECUPERAR CONTRASENIA
router.post("/reset-password", recuperarContrasena);
router.get("/reset-password/:token", recuperarContrasenaToken);

//RESTAURAR CONTRASENIA
router.post("/restorePass", sessionRestore);

export default router;
