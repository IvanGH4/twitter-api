const passport = require("passport");
module.exports = {
  index: function (req, res) {
    res.render("index");
  },

  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/bienvenido",
    failureFlash: true,
  }),

  logout: function (req, res) {
    req.logout();
    res.redirect("/bienvenido");
  },
};
