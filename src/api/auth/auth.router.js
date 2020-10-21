const { Router } = require("express");
const authRouter = Router();
const { registrationController } = require("./auth.controllers");

authRouter.post("/auth/register", registrationController);

module.exports = authRouter;
