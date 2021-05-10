const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");

router.get("/bienvenido", loginController.index);
router.get("/login", loginController.index);
router.post("/login", loginController.login);
router.get("/registro", registerController.index);
router.post("/registro", registerController.store);
router.get("/logout", loginController.logout);

module.exports = router;
