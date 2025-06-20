const express = require("express");
const router = express.Router();
const authController = require("../controllers/user_controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profiles", authController.getUsers);
// router.put("/profile", authController.updateProfile);

module.exports = router;
