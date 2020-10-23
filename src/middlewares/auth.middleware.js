const { verifyToken } = require("../services/token.service");
const User = require("../api/users/users.model");

const checkAuthTokenMiddleWare = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    const userInfo = await User.findUserById(data.id);
    req.userInfo = {
      email: userInfo.email,
      id: userInfo._id,
    };
    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized" });
  }
};

module.exports = {
  checkAuthTokenMiddleWare,
};
