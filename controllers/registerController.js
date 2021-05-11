const bcrypt = require("bcryptjs");
const { hashPassword } = require("../models/User");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  store: async function (req, res) {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (user) {
      res.json({
        error: "Upsss... you did it again",
      });
    } else {
      try {
        const userSaved = await User.create({
          firstName,
          lastName,
          userName,
          email,
          password: await hashPassword(password),
        });
        console.log("Se registró el usuario");
        let token = jwt.sign(
          {
            userName,
            email,
            userId: userSaved._id,
          },
          process.env.SECRET_TEXT
        );
        res.json({
          userId: userSaved._id,
          userName: userSaved.userName,
          token,
        });
      } catch (err) {
        let error = err.message;
        res.status(400).json({
          error,
        });
      }
    }
  },
};
