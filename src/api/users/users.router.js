const { Router } = require("express");
const {
  getUsersController,
  // getUserByIdController,
  // createUsersController,
  // updateUsersController,
  // deleteUsersController,
} = require("./users.controllers");
const usersRouter = Router();

const {
  checkAuthTokenMiddleWare,
} = require("../../middlewares/auth.middleware");

// usersRouter.post("/", createUsersController);

usersRouter.get("/", checkAuthTokenMiddleWare, getUsersController);
// usersRouter.get("/:userId", getUserByIdController);
// usersRouter.patch("/", updateUsersController);
// usersRouter.delete("/:userId", deleteUsersController);

module.exports = usersRouter;
