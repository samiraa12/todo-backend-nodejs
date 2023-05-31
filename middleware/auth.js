const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get token from the header
  const token = req.header("authHeader");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token, auth denied 401" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    console.log(decoded);
    next();
  } catch (err) {
    res.status(403).json({ msg: "token is not valid forbiden 403" });
  }
};