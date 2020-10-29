const { Router } = require("express");
const authRouter = Router();
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controllers");

const { validationMiddleware } = require("./auth.validator");

const {
  checkAuthTokenMiddleWare,
} = require("../../middlewares/auth.middleware");

authRouter.post("/register", validationMiddleware, registrationController);
authRouter.post("/login", validationMiddleware, loginController);
authRouter.post("/logout", checkAuthTokenMiddleWare, logoutController);

module.exports = authRouter;
