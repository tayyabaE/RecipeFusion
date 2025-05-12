const jwt = require("jsonwebtoken");

const verifyuser = (req, res, next) => {
  const token = req.header("auth-token"); 

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = verifyuser;
