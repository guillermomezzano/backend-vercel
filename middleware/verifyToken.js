import jwt from "jsonwebtoken";

const SECRET_KEY = "secretKey123";

const verifyToken = (req, res, next) => {
  const token = req.headers("authorization") || "";
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
