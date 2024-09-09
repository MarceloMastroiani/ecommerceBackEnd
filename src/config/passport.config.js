import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/users.js";
import { createHash, isValidPassword } from "../utils.js";
import { cartService } from "../repositories/index.js";
import logger from "../utils/logger.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  //REGISTRAR USUARIO LOCALMENTE
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          const cart = await cartService.createCart();
          const user = await userModel.findOne({ email: username });
          //validar que el usuario no exista
          if (user) {
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart,
            role: "usuario",
          };
          if (newUser.age < 18) {
            logger.error("Error en el registro");
            return done(null, false);
          }
          // Guardar el usuario
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //ESTRATEGIA LOCAL PARA INICIAR SESION
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const data = new Date();
          const user = await userModel.findOne({ email: username });

          if (user.role === "admin") {
            user.last_connection = null;
            await user.save();
          } else if (user.role === "premium" || user.role === "usuario") {
            user.last_connection = data;
            await user.save();
          } else return done(null, false);

          const valid = isValidPassword(user, password);
          if (!valid) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //ESTRATEGIA PARA INICIAR SESION EN GITHUD
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.e9b9d80aa5d2b0e1",
        clientSecret: "cfeb688b52d31f811c18be8917c2c5accb7c53b7",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userModel.findOne({
            email: profile._json.email,
          });

          if (!user) {
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 20,
              email: profile._json.email,
              password: "",
            };

            let createdUser = await userModel.create(newUser);
            done(null, createdUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //SERIALIZAR Y DESERIALIZAR
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
