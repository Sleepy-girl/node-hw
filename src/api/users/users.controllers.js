const UserDB = require("./users.model");
const catchAsync = require("../../utils/catchAsync");
const fs = require("fs").promises;
const { handleAvatar } = require("../../utils/avatarGenerator");
const http = require("https");

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
    avatarURL: currentUser.avatarURL,
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

const uploadAvatarController = catchAsync(async (req, res, next) => {
  const file = req.file;
  const id = req.user.id;
  const avatarURL = `http://localhost:${process.env.PORT}/images/${file.filename}`;
  await fs.rename(`tmp/${file.filename}`, `src/public/images/${file.filename}`);
  await UserDB.updateUser(id, { avatarURL });
  res.json({ avatarURL });
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
  uploadAvatarController,
  deleteUsersController,
};
