const { Router } = require("express");
const authRouter = Router();
const {
  registrationController,
  loginController,
  verifyController,
  logoutController,
} = require("./auth.controllers");

const { validationMiddleware } = require("./auth.validator");

const {
  checkAuthTokenMiddleWare,
} = require("../../middlewares/auth.middleware");

authRouter.post("/register", validationMiddleware, registrationController);
authRouter.post("/login", validationMiddleware, loginController);
authRouter.post("/logout", checkAuthTokenMiddleWare, logoutController);

authRouter.get("/verify/:token", verifyController);

// authRouter.get("/mail", async (req, res) => {
//   console.log(await sendEmail());
//   res.end();
// });

module.exports = authRouter;
