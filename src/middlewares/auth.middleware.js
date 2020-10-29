const { verifyToken } = require("../services/token.service");
const User = require("../api/users/users.model");

const checkAuthTokenMiddleWare = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await verifyToken(token);
    // req.userId = data.id;
    const user = await User.findUserById(data.id);
    req.user = {
      email: user.email,
      id: user._id,
    };
    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized" });
  }
};

module.exports = {
  checkAuthTokenMiddleWare,
};
