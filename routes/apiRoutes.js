const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const socialController = require("../controllers/socialController");
const checkToken = require("../middlewares/checkToken");
const checkAuthor = require("../middlewares/checkAuthor");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

router.get("/index-tweets", [checkToken], homeController.indexTweets);
router.get("/index-users", [checkToken], homeController.indexUsers);
router.get("/index", [checkToken], homeController.index);
router.get("/index-user", [checkToken], profileController.show);

router.post("/register", registerController.store);
router.post("/login", loginController.login);
router.post("/create-tweet", checkToken, socialController.store);

router.delete(
  "/delete-tweet",
  [checkToken, checkAuthor],
  socialController.destroy
);

router.patch("/follow", [checkToken], socialController.follow);
router.patch("/like", [checkToken], socialController.like);
router.patch("/update-profile", [checkToken], profileController.update);

module.exports = router;
