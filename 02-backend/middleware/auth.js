const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 取出 Bearer token

  if (!token) return res.status(401).json({ error: "未提供 token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token 無效或過期" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;