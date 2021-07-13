const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");

module.exports = {
  postMovies: async (req, res) => {
    const{name, duration, description, imdb_score, actor, director, year_release, moviesData} = req.body;
    try {
      let connection = await dbConnection();
      let getMoviesNameQuery = `SELECT name FROM moviesinfor WHERE name =?`;
      let MoviesName = await sqlQuery(connection, getMoviesNameQuery, [name]);
      if (MoviesName.length === 0) {
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
        console.log(MoviesName);
        connection.end();
        res.json({
          message: "Post successfully",
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
      let getMoviesInforQuery = `SELECT * FROM moviesinfor`;
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
    const{name, description, imdb_score, actor, director, year_release, tvseriesData, season} = req.body;
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
        connection.end();
        res.json({
          message: "Post successfully",
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
      let getTvSeriesInforQuery = `SELECT * FROM tvseriesinfor`;
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
    const{name, duration, description, eName, episodesData} = req.body;
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
        let postEpisodesQuery = `INSERT INTO episodes(eName, description, duration, episodesData, tID) 
                                    VALUES (?,?,?,?,?)`;
        let postEpisodes = await sqlQuery(connection, postEpisodesQuery, [
          eName,
          description,
          duration,
          episodesData,
          TIDResult,
        ]);
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
      let getTvSeriesEpisodesQuery = `SELECT * FROM episodes`;
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
