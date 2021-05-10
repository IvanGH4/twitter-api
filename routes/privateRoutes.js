const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const homeController = require("../controllers/homeController");
const socialController = require("../controllers/socialController");
const profileController = require("../controllers/profileController");
const checkAuthor = require("../middlewares/checkAuthor");

router.get("/", isLoggedIn, homeController.index);
router.post("/crear", isLoggedIn, socialController.store);
router.get(
  "/eliminar/:id",
  [isLoggedIn, checkAuthor],
  socialController.destroy
);

router.post("/usuario/editar", isLoggedIn, profileController.update);

router.get("/like/:id", isLoggedIn, socialController.like);

router.get("/usuario/seguir/:id", isLoggedIn, socialController.follow);

router.post("/usuario/buscar", isLoggedIn, socialController.searchUser);

router.get("/usuario/:username", isLoggedIn, profileController.show);

module.exports = router;
