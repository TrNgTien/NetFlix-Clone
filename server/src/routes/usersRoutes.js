const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/Users/userHandler");
const passport = require("passport");

router.post("/auth/fb", passport.authenticate("facebook",{scope: ['profile']}));
router.post("/auth/fb/callback", passport.authenticate("facebook", {successRedirect: '/', failureRedirect: '/login'}));
router.post("/auth/google", passport.authenticate("google",{scope: ['profile']}));
router.post("/auth/google/callback", passport.authenticate("google", {failureRedirect: '/login'}), 
    (res, req) => {res.redirect('/');});
router.post("/login", userHandler.login);
router.post("/register", userHandler.register);

module.exports = router;
