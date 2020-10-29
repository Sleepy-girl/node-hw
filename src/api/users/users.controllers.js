const UserDB = require("./users.model");
const catchAsync = require("../../utils/catchAsync");

const getUsersController = catchAsync(async (req, res, next) => {
  const { query } = req;
  const users = await UserDB.getUsers(query);
  res.json(users);
});

const getCurrentUserController = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const currentUser = await UserDB.findUserById(userId);
  return res.json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
});

const getUserByIdController = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await UserDB.getUserById(userId);
  if (user) {
    return res.json(user);
  }
  res.status(404).json({ message: "Not found" });
});

const updateUsersController = catchAsync(async (req, res, next) => {
  const { id, ...data } = req.body;
  const user = await UserDB.getUserById(id);
  if (user && req.body) {
    const updatedUser = await UserDB.updateUser(id, data);
    return res.send(updatedUser);
  }
  res.status(404).json({ message: "Not found" });
});

const deleteUsersController = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await UserDB.getUserById(userId);
  if (user) {
    await UserDB.deleteUser(userId);
    return res.json({ message: "user deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

module.exports = {
  getUsersController,
  getUserByIdController,
  getCurrentUserController,
  updateUsersController,
  deleteUsersController,
};
