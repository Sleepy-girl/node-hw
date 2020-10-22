const UserDB = require("./users.model");
const catchAsync = require("../../utils/catchAsync");

const getUsersController = catchAsync(async (req, res, next) => {
  const { query } = req;
  const users = await UserDB.getUsers(query);
  res.json(users);
});

module.exports = { getUsersController };
