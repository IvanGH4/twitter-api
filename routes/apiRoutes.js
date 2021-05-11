const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const socialController = require("../controllers/socialController");
const checkToken = require("../middlewares/checkToken");

router.post("/register", registerController.store);
router.post("/login", loginController.login);

router.post("/create-tweet", checkToken, socialController.store);

module.exports = router;
