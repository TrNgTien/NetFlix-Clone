const express = require("express");
const router = express.Router();
const moviesHandler = require("../handlers/Movies/moviesHandler");

router.post("/postMovies", moviesHandler.postMovies);
router.post("/postTvSeries", moviesHandler.postTvSeries);
router.post("/postEpisodes", moviesHandler.postEpisodes);
module.exports = router;