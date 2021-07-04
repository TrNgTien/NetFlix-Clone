const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/Users/userHandler");

router.post("/login", userHandler.login);
router.post("/register", userHandler.register);

module.exports = router;
