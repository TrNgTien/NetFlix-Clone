const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/Users/userHandler");
const passport = require("passport");

router.get("/auth/fb", passport.authenticate("facebook",{scope: ['profile']}));
router.get("/auth/fb/callback", passport.authenticate("facebook", {successRedirect: '/', failureRedirect: '/login'}));
router.get("/auth/google", passport.authenticate("google",{scope: ['profile']}));
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: '/login'}), 
    (res, req) => {res.redirect('/');});
router.post("/login", userHandler.login);
router.post("/register", userHandler.register);

module.exports = router;
