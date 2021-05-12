const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // let token = req.get("token");
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  let token = authHeader.split(" ")[1];
  // console.log(token);
  jwt.verify(token, process.env.SECRET_TEXT, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido.",
        },
      });
    }

    req.payload = decoded;

    next();
  });
};
