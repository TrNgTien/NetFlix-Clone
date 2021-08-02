const express = require("express");
const router = express.Router();
const moviesHandler = require("../handlers/Movies/moviesHandler");
const authtoken = require("../middlewares/authentication/authentication");
const upload = require("../middlewares/multer/multer");


router.post("/postMovies", upload.single('video'), authtoken.Authentication, authtoken.adminVerify, moviesHandler.postMovies);
router.post("/postTvSeries", upload.single('video'), authtoken.Authentication, authtoken.adminVerify, moviesHandler.postTvSeries);
router.post("/postEpisodes", upload.single('video'), authtoken.Authentication, authtoken.adminVerify, moviesHandler.postEpisodes);

router.get("/getMovies", authtoken.Authentication, moviesHandler.getMovies);
router.get("/getTvSeries", authtoken.Authentication, moviesHandler.getTvSeries);
router.get("/getEpisodes", authtoken.Authentication, moviesHandler.getEpisodes);
module.exports = router;