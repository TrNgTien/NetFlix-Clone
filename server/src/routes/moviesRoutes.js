const express = require("express");
const router = express.Router();
const moviesHandler = require("../handlers/Movies/moviesHandler");
const authtoken = require("../middlewares/authentication/authentication");

router.post("/postMovies", authtoken.Authentication,moviesHandler.postMovies);
router.post("/postTvSeries", authtoken.Authentication,moviesHandler.postTvSeries);
router.post("/postEpisodes", authtoken.Authentication,moviesHandler.postEpisodes);

router.get("/getMovies", moviesHandler.getMovies);
router.get("/getTvSeries", moviesHandler.getTvSeries);
router.get("/getTvSeriesEpisode", moviesHandler.getEpisodes);
module.exports = router;