const validator = require("email-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async function (req, res) {
    let { user, password } = req.body;

    let userDB;
    if (!validator.validate(user)) {
      userDB = await User.findOne({ userName: user });
      console.log("usaste username");
    } else {
      userDB = await User.findOne({ email: user });
      console.log("usaste email");
    }

    if (!userDB) {
      res.status(404).json({
        error: "Usuario o contraseña incorrectos.",
      });
    }

    if (!(await bcrypt.compare(password, userDB.password))) {
      res.status(404).json({
        error: "Usuario o contraseña incorrectos.",
      });
    }

    let token = jwt.sign(
      { userId: userDB._id, userName: userDB.userName, email: userDB.email },
      process.env.SECRET_TEXT
    );

    res.json({
      userId: userDB._id,
      userName: userDB.userName,
      token,
    });
  },
};
