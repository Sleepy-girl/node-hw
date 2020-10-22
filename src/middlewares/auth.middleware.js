const { verifyToken } = require("../services/token.service");

const checkAuthTokenMiddleWare = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

module.exports = { checkAuthTokenMiddleWare };
