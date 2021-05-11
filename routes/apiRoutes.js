const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const socialController = require("../controllers/socialController");
const checkToken = require("../middlewares/checkToken");
const checkAuthor = require("../middlewares/checkAuthor");

router.post("/register", registerController.store);
router.post("/login", loginController.login);

router.post("/create-tweet", checkToken, socialController.store);
router.delete("/delete-tweet", [checkToken], socialController.destroy);

module.exports = router;
