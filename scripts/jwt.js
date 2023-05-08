const generatedToken = require("crypto").randomBytes(64).toString("hex");
import jwt from "jsonwebtoken";
import { getUser } from "./database";

export const generateAccessToken = (username) => {
  return jwt.sign(username, generatedToken);
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["cookie"];
  if (authHeader == undefined) {
    return res.sendStatus(401);
  }
  const token = authHeader.split("=")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, generatedToken, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect("/");
    }
    req.user = user;
    next();
  });
};

const verifyUser = (username, password) => {
  getUser(username).then((user) => {
    if (user == null) {
      return false;
    }
    if (user.password == password) {
      return true;
    }
    return false;
  }
}