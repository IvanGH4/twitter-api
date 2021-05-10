function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/bienvenido");
  }
}

module.exports = isLoggedIn;
