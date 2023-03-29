const generatedToken =
  "f91bcbe4ea7dfc0bb2cd8aba4f8e8cb500939dba67ec7ba1f19fc3ffc8d1f510438a849e955e0fb50d6ad1430757a8bffbcdba5594cba54de12b48a7f3de901a"; // require("crypto").randomBytes(64).toString("hex");
const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
  return jwt.sign(username, generatedToken);
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["cookie"];
  const token = authHeader.split("=")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, generatedToken, (err, user) => {
    console.log(err);

    if (err) return res.redirect("/");

    req.user = user;

    next();
  });
};
module.exports = {
  authenticateToken: authenticateToken,
  generateAccessToken: generateAccessToken,
};
