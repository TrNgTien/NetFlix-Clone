const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");
const jwt = require("jsonwebtoken");
const USER_ATTRIBUTE = require("./userAttribute");
const auth = require("../../middlewares/authentication/authentication");
const bcrypt = require("bcrypt");
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const saltRounds = 10;
module.exports = {
  register: async (req, res) => {
    const { userName, password } = req.body;
    try {
      let connection = await dbConnection();
      let getUserNameQuery = `SELECT userName FROM users WHERE userName = ? `;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [
        userName,
      ]);
      let hashedPassword = await bcrypt.hashSync(password, 10);

      if (getUserName.length !== 0) {
        console.log(getUserName);
        connection.end();
        res.json({
          message: "Username has already existed!!!",
        });
      } else {
        let registerQuery = `INSERT INTO users (${USER_ATTRIBUTE.userName},${USER_ATTRIBUTE.password}) 
                      VALUES (?, ?)`;
        let createUser = sqlQuery(connection, registerQuery, [
          userName,
          hashedPassword,
        ]);
        connection.end();
        res.json({
          message: "Register Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  login: async (req, res) => {
    const { userName, password } = req.body;
    const token = auth.generateAccessToken(userName);
    try {
      const connection = await dbConnection();
      const getUserNameQuery = `SELECT userName FROM users WHERE userName = ?`;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [
        userName,
      ]);
      let getPasswordQuery = `SELECT password FROM users WHERE password = ?`;
      let getPassword = await sqlQuery(connection, getPasswordQuery, [
        password,
      ]);
      if (getUserName.length === 0 && getPassword.length === 0) {
        connection.end();
        res.json({
          message: "Invalid Username or Password",
        });
      } else {
        connection.end();
        res.json({
          message: "Login Successfully",
          token,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: error,
      });
    }
  },
};

passport.use(new facebookStrategy({
  clientID: '905373850341463',
  clientSecret: 'a05d7a532387a3634574c8c9f97de512',
  callbackURL: 'http://localhost:8080/UserForm/auth/fb/callback',
  profileFields: ["id", "name", "photos"]
}, async (accessToken, refreshToken, profile, done) =>{
  try{
      console.log(profile);
      let connection = dbConnection();
      let getfIDQuery = `SELECT fID from facebook WHERE social_ID =?`;
      let getfID = await sqlQuery(connection, getfIDQuery, [profile.id]);
      if(getfID.length === 0){
          let createUserFbQuery = `INSERT INTO facebook(social_ID, photoData, userNameF) VALUES (?,?,?)`;
          let createUserFb = await sqlQuery(connection, createUserFbQuery, [profile.id, profile.photos[0].value, profile.name[0].givenName]);
          let fID = getfID[0].fID;
          let insertUserFbQuery = `INSERT INTO users (fID) VALUES(?)`;
          let insetUserFb = await sqlQuery(connection, insertUserFbQuery, [fID]);
          connection.end();
          done(null, fID);
      }
      else{
          done(null, fID);
      }
  }
  catch(err){
      console.log(err);
  }

}))

passport.use(new googleStrategy({
  clientID: '1025733734359-rk86a2ig0brtbhkjvuiadnj00ml3nbv4.apps.googleusercontent.com',
  clientSecret: 'fY1taygv9vW7M9FfomUDTqNl',
  callbackURL: 'http://localhost:8080/UserForm/auth/google/callback',
  profileFields: ["id", "name", "photos"]
}, async (accessToken, refreshToken, profile, done) =>{
  try{
      console.log(profile);
      let connection = dbConnection();
      let getgIDQuery = `SELECT gID from google WHERE social_ID =?`;
      let getgID = await sqlQuery(connection, getgIDQuery, [profile.id]);
      if(getgID.length === 0){
          let createUserGgQuery = `INSERT INTO google(social_ID, photoData, userNameG) VALUES (?,?,?)`;
          let createUserGg = await sqlQuery(connection, createUserGgQuery, [profile.id, profile.photos[0].value, profile.displayName]);
          let gID = getgID[0].gID;
          let insertUserGgQuery = `INSERT INTO users (fID) VALUES(?)`;
          let insetUserGg = await sqlQuery(connection, insertUserGgQuery, [gID]);
          connection.end();
          done(null,gID);
      }
      else{
          done(null, gID);
      }
  }
  catch(err){
      console.log(err);
  }

}))
