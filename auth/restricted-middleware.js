import jwt from "jsonwebtoken";

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token received" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token received!" });
  }
};
export default restricted;
