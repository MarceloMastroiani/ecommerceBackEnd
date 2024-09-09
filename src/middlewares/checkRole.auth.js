export const checkRole = (req, res, next) => {
  const user = req.session.user;
  const role = user.role;

  if (user) {
    if (role === "admin" || role === "premium") {
      return next();
    }
    return res.status(401).send("No tienes permisos para acceder a esta vista");
  }
};

export const checkAdmin = (req, res, next) => {
  const user = req.session.user;
  const role = user.role;

  if (user) {
    if (role === "admin") {
      return next();
    }
    return res.status(401).send("No tienes permisos para acceder a esta vista");
  }
};
