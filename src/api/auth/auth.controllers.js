const User = require("../users/users.model");
const catchAsync = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");
const { createVarificationToken } = require("../../services/token.service");

const registrationController = catchAsync(async (req, res, next) => {
  const { body } = req;
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(process.env.SALT)
  );
  await User.createUser({ ...body, password: hashedPassword });
  res.status(201).json({ message: "Created!" });
});

const loginController = catchAsync(async (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const user = await User.findUser({ email });
  if (!user) {
    return res
      .status(404)
      .send({ message: `User with email ${email} not found` });
  }

  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    return res.status(404).send({ message: `Wrong password` });
  }

  const token = await createVarificationToken({ id: user._id });
  res.json({
    access_token: token,
  });
});

module.exports = {
  registrationController,
  loginController,
};
