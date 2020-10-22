const { Router } = require("express");
const authRouter = Router();
const {
  registrationController,
  loginController,
} = require("./auth.controllers");

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;
