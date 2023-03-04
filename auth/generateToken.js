import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (user) => {
  // need 3 things to create a token: payload, secret, & options
  const payload = {
    id: user.id,
    username: user.username,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
};
export default generateToken;
