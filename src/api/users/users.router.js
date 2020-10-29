const { Router } = require("express");
const {
  getUsersController,
  getCurrentUserController,
  getUserByIdController,
  updateUsersController,
  deleteUsersController,
} = require("./users.controllers");
const usersRouter = Router();

const {
  checkAuthTokenMiddleWare,
} = require("../../middlewares/auth.middleware");

usersRouter.get("/", checkAuthTokenMiddleWare, getUsersController);

usersRouter.get("/current", checkAuthTokenMiddleWare, getCurrentUserController);

usersRouter.get("/:userId", checkAuthTokenMiddleWare, getUserByIdController);
usersRouter.patch("/", checkAuthTokenMiddleWare, updateUsersController);
usersRouter.delete("/:userId", checkAuthTokenMiddleWare, deleteUsersController);

module.exports = usersRouter;
