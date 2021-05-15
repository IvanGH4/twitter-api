const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const socialController = require("../controllers/socialController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const checkToken = require("express-jwt");
const checkAuthor = require("../middlewares/checkAuthor");

router.post("/users", registerController.store);
router.post("/tokens", loginController.login);

router.use(
  checkToken({ secret: process.env.SECRET_TEXT, algorithms: ["HS256"] })
);

router.get("/tweets", homeController.indexTweets);
router.get("/users", homeController.indexUsers);
router.get("/index", homeController.index);
router.get("/users/profile", profileController.show); // a los get no se les puede pasar body, con axios se le setea la info por params y se recibe en query.
router.get("/users/profile/tweets", homeController.indexUser);

router.post("/tweets", socialController.store);
router.post("/tweets/comments", socialController.comment);

router.delete("/tweets", checkAuthor, socialController.destroy);

router.patch("/users", socialController.follow);
router.patch("/tweets", socialController.like);
router.patch("/users/profile", profileController.update);

module.exports = router;
