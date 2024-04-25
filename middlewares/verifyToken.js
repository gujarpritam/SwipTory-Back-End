const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const headerToken = req.headers["authorization"];

    if (!headerToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decode = jwt.verify(headerToken, process.env.SECRET_CODE);
    req.username = decode.username;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyToken };
