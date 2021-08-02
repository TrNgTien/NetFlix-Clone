const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");
const sendNotify = require("../Notification/notifyHandler");
require("../../middlewares/multer/multer");
require("dotenv").config();
const cloudinary = require("../../database/cloudinary")


module.exports = {
  postMovies: async (req, res) => {
    const{name, duration, description, imdb_score, actor, director, year_release,genreName, subgenre} = req.body;
    try {
      let connection = await dbConnection();
      let getMoviesNameQuery = `SELECT name FROM moviesinfor WHERE name =?`;
      let MoviesName = await sqlQuery(connection, getMoviesNameQuery, [name]);
      if (MoviesName.length === 0) {
        let uploadedResponse = await cloudinary.uploader.upload(req.file.path, {resource_type: "video"});
        let moviesData = uploadedResponse.secure_url;
        let postMoviesInforQuery = `INSERT INTO moviesinfor
                (
                    name, duration, description, imdb_score, actor, director, year_release, moviesData
                )
                VALUE(?,?,?,?,?,?,?,?)`;
        let postMoviesInfor = await sqlQuery(connection, postMoviesInforQuery, [
          name,
          duration,
          description,
          imdb_score,
          actor,
          director,
          year_release,
          moviesData,
        ]);
        let postMoviesQuery = `INSERT INTO movies(name) VALUE(?)`;
        let postMovies = await sqlQuery(connection, postMoviesQuery, [name]);
        let getmIDQuery = `SELECT mID FROM movies WHERE name =?`;
        let getmID = await sqlQuery(connection, getmIDQuery, [name]);
        let mID = getmID[0].mID;
        let postGenreMovieQuery = `INSERT INTO genre(genreName, subgenre) VALUE(?,?)`;
        let postGenreMovie = await sqlQuery(connection, postGenreMovieQuery, [genreName, subgenre]);
        let getGenreIDQuery = `SELECT genreID FROM genre ORDER BY genreID DESC limit 1`;
        let getGenreID = await sqlQuery(connection, getGenreIDQuery);
        let genreID = getGenreID[0].genreID;
        let insertMbelongtoGQuery = `INSERT INTO mbelongtog(genreID, mID) VALUE(?,?)`;
        let insertMbelongtoG = await sqlQuery(connection, insertMbelongtoGQuery, [genreID, mID]);
        //console.log(year_release);
        //console.log(mID);
        //console.log(genreID);
        //console.log(getGenreID);
        console.log("Movie", uploadedResponse);
        connection.end();
        sendNotify.notify(name, description);
        res.json({
          message: "Post successfully",
          data: uploadedResponse
        });
      } else {
        connection.end();
        res.json({
          message: "movie has already existed",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },

  getMovies: async (req, res) => {
    try {
      let connection = await dbConnection();
      let getMoviesInforQuery = `SELECT 
      moviesinfor.name, duration, description, imdb_score, actor, director, year_release, genreName, subgenre, moviesData
      FROM moviesinfor, movies, mbelongtog, genre
      WHERE movies.mID = mbelongtog.mID
      AND genre.genreID = mbelongtog.genreID
      AND movies.name = moviesinfor.name;`;
      let getMoviesInfor = await sqlQuery(connection, getMoviesInforQuery);
      connection.end();
      return res.status(200).json({ data: getMoviesInfor });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },

  postTvSeries: async (req, res) => {
    const{name, description, imdb_score, actor, director, year_release, season, genreName, subgenre} = req.body;
    try {
      let connection = await dbConnection();
      let getTvSeriesNameQuery = `SELECT name FROM tvseriesinfor WHERE name =?`;
      let TvSeriesName = await sqlQuery(connection, getTvSeriesNameQuery, [
        name,
      ]);
      let getTvSeriersSeasonQuery = `SELECT season FROM tvseries WHERE season =?`;
      let TvSeriesSeason = await sqlQuery(connection, getTvSeriersSeasonQuery, [
        season,
      ]);
      if (TvSeriesName.length === 0 && TvSeriesSeason.length === 0) {
        let uploadedResponse = await cloudinary.uploader.upload(req.file.path, {resource_type: "video"});
        let tvseriesData = uploadedResponse.secure_url;
        let postTvSeriesInforQuery = `INSERT INTO TvSeriesinfor
            (
                name, description, actor, director, year_release, tvseriesData
            )
            VALUE(?,?,?,?,?,?)`;
        let postTvSeriesInfor = await sqlQuery(
          connection,
          postTvSeriesInforQuery,
          [name, description, actor, director, year_release, tvseriesData]
        );
        let postTvSeriesQuery = `INSERT INTO tvseries(name, season, imdb_score) VALUE(?,?,?)`;
        let postTvSeries = await sqlQuery(connection, postTvSeriesQuery, [
          name,
          season,
          imdb_score,
        ]);
        let postGenreTvSeiresQuery = `INSERT INTO genre(genreName, subgenre) VALUE(?,?)`;
        let postGenreTvSeries = await sqlQuery(connection, postGenreTvSeiresQuery, [genreName, subgenre]);
        let gettIDQuery = `SELECT tID FROM tvseries WHERE name =?`;
        let gettID = await sqlQuery(connection, gettIDQuery, [name]);
        let tID = gettID[0].tID;
        let getGenreIDQuery = `SELECT genreID FROM genre WHERE genreName =?`;
        let getGenreID = await sqlQuery(connection, getGenreIDQuery, [genreName]);
        let genreID = getGenreID[0].genreID;
        let insertTbelongtoGQuery = `INSERT INTO tbelongtog(genreID, tID) VALUE(?,?)`;
        let insertTbelongtoG = await sqlQuery(connection, insertTbelongtoGQuery, [genreID, tID]);
        console.log("TvSeries", uploadedResponse);
        sendNotify.notify(name, description);
        connection.end();
        res.json({
          message: "Post successfully",
          data: uploadedResponse
        });
      } else {
        connection.end();
        res.json({
          message: "this TV series has already existed",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },

  getTvSeries: async (req, res) => {
    try {
      let connection = await dbConnection();
      let getTvSeriesInforQuery = `SELECT 
      tvseriesinfor.name, description, imdb_score, actor, director, year_release, genreName, subgenre, tvseriesData
      FROM tvseriesinfor, tvseries, tbelongtog, genre
      WHERE tvseries.tID = tbelongtog.tID
      AND genre.genreID = tbelongtog.genreID
      AND tvseries.name = tvseriesinfor.name;`;
      let getTvSeriesInfor = await sqlQuery(connection, getTvSeriesInforQuery);
      connection.end();
      return res.status(200).json({ data: getTvSeriesInfor });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },

  postEpisodes: async (req, res) => {
    const{name, duration, description, eName} = req.body;
    try {
      let connection = await dbConnection();
      let getTIDQuery = `SELECT tID FROM tvseries WHERE name =?`;
      let getTID = await sqlQuery(connection, getTIDQuery, [name]);
      let TIDResult = getTID[0].tID;
      let getEpisodesNameQuery = `SELECT eName FROM episodes WHERE eName =?`;
      let getEpisodesName = await sqlQuery(connection, getEpisodesNameQuery, [
        eName,
      ]);
      if (getEpisodesName.length === 0) {
        let uploadedResponse = await cloudinary.uploader.upload(req.file.path, {resource_type: "video"});
        let episodesData = uploadedResponse.secure_url;
        let postEpisodesQuery = `INSERT INTO episodes(eName, description, duration, episodesData, tID) 
                                    VALUES (?,?,?,?,?)`;
        let postEpisodes = await sqlQuery(connection, postEpisodesQuery, [
          eName,
          description,
          duration,
          episodesData,
          TIDResult,
        ]);
        sendNotify.notify(eName, description);
        connection.end();
        res.json({
          message: "post episodes successfully",
        });
      } else {
        res.json({
          message: "This episode has already posted",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },
  getEpisodes: async (req, res) => {
    try {
      let connection = await dbConnection();
      let getTvSeriesEpisodesQuery = `SELECT 
      eName, duration, description, episodesData, tvseries.name, tvseries.season
      FROM episodes, tvseries
      WHERE tvseries.tID = episodes.tID;`;
      let getTvSeriesEpisodes = await sqlQuery(
        connection,
        getTvSeriesEpisodesQuery
      );
      connection.end();
      return res.status(200).json({ data: getTvSeriesEpisodes });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },
};