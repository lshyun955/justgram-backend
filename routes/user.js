const express = require("express");
const userController = require("../controllers/user.js");
const router = express.Router();

router.get("/", userController.getAll);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.get("/verification", userController.verification);
module.exports = router;
