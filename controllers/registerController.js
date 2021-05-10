const bcrypt = require("bcryptjs");
const { hashPassword } = require("../models/User");
const User = require("../models/User");

module.exports = {
  index: function (req, res) {
    res.render("register");
  },

  store: async function (req, res) {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (user) {
      res.redirect("/bienvenido");
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
        req.login(userSaved, (err) => {
          res.redirect("/");
        });
      } catch (err) {
        // console.log(err.message);
        let error = err.message;
        res.redirect(`/registro?${error}`);
      }
    }
  },
};
