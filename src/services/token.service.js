const jwt = require("jsonwebtoken");

const createVarificationToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace("Bearer ", "");
  return await jwt.verify(parsedToken, process.env.ACCESS_KEY);
};

const createEmailToken = (email) => {
  return jwt.sign({ email }, process.env.EMAIL_TOKEN_KEY);
};

const checkEmailToken = (token) => {
  return jwt.verify(token, process.env.EMAIL_TOKEN_KEY);
};

module.exports = {
  createVarificationToken,
  verifyToken,
  createEmailToken,
  checkEmailToken,
};
