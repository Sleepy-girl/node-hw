const User = require("../users/users.model");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcryptjs");
const { createVarificationToken } = require("../../services/token.service");
const path = require("path");

const { generateAvatar, handleAvatar } = require("../../utils/avatarGenerator");

const registrationController = catchAsync(async (req, res, next) => {
  const { body } = req;
  if (await User.isExistUser(body.email)) {
    return res.status(409).json({
      message: `Email ${body.email} in use`,
    });
  }

  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(process.env.SALT)
  );

  const newUser = await User.createUser({
    ...body,
    password: hashedPassword,
  });

  const randomAvatar = await generateAvatar(newUser._id);
  await handleAvatar(randomAvatar);
  const avatarURL_ = `http://localhost:${process.env.PORT}/images/${randomAvatar}`;

  const updatedUser = await User.updateUser(newUser._id, {
    avatarURL: avatarURL_,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: updatedUser.avatarURL,
    },
  });
});

const loginController = catchAsync(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.findUser({ email });
  if (!user) {
    return res.status(401).send({ message: `Unauthorized` });
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    return res.status(401).send({ message: `Unauthorized` });
  }

  const token = await createVarificationToken({ id: user._id });

  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  return res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
});

const logoutController = catchAsync(async (req, res, next) => {
  res.cookie("token", null, { maxAge: 0, httpOnly: true });
  return res.sendStatus(204);
});

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
