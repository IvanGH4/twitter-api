const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const socialController = require("../controllers/socialController");
//const checkToken = require("../middlewares/checkToken");
const checkToken = require("express-jwt");
const checkAuthor = require("../middlewares/checkAuthor");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

router.post("/register", registerController.store);
router.post("/login", loginController.login);
router.use(
  checkToken({ secret: process.env.SECRET_TEXT, algorithms: ["HS256"] })
);

router.get("/index-tweets", homeController.indexTweets);
router.get("/index-users", homeController.indexUsers);
router.get("/index", homeController.index);
router.get("/index-user", profileController.show); // a los get no se les puede pasar body, con axios se le setea la info por params y se recibe en query.
router.post("/create-tweet", socialController.store);
router.delete("/delete-tweet", [checkAuthor], socialController.destroy);
router.patch("/follow", socialController.follow);
router.post("/like", socialController.like);
router.patch("/update-profile", profileController.update);

module.exports = router;
