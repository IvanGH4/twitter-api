const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const validator = require("email-validator");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        try {
          let user;
          if (!validator.validate(username)) {
            user = await User.findOne({ userName: username });
            console.log("usaste username");
          } else {
            user = await User.findOne({ email: username });
            console.log("usaste email");
          }

          if (!user) {
            return done(null, false, {
              message: "Usuario y/o contraseña incorrectos",
            });
          }
          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, {
              message: "Usuario y/o contraseña incorrectos",
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, user);
      });
  });
};
