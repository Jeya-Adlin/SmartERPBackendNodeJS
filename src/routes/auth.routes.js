const router = require("express").Router();
const authController = require("../controllers/authController");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;