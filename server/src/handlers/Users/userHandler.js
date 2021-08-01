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
const User = require('../Users/userSchema');
const mongoose = require('mongoose');

module.exports = {
  register: async (req, res) => {
    const { userName, password } = req.body;
    try {
      let connection = await dbConnection();
      let getUserNameQuery = `SELECT userName FROM users WHERE userName = ? `;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [
        userName,
      ]);
      let hashedPassword = await bcrypt.hashSync(password, saltRounds);

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
    
    try {
      const connection = await dbConnection();
      const getUserNameQuery = `SELECT userName, password FROM users WHERE userName = ?`;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [
        userName,
      ]);
      
      let correctPassword = bcrypt.compareSync(password, getUserName[0].password.toString());
      
      if (!correctPassword) {
        connection.end();
        res.json({
          message: "Invalid Username or Password",
        });
      } else {
        let getUserInfoQuery = `SELECT * FROM users WHERE userName = ?`;
        let getUserInfo = await sqlQuery(connection, getUserInfoQuery, [
          userName,
        ]);
        
        let token = auth.generateAccessToken(getUserInfo[0].userID, getUserInfo[0].role);
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

passport.serializeUser((user, done) =>{
  done(null, user.id);
});
passport.deserializeUser((user, done) =>{
  User.findById(id).then((user) =>{
    done(null,user);
  })
})

passport.use(new facebookStrategy({
  clientID: '905373850341463',
  clientSecret: 'a05d7a532387a3634574c8c9f97de512',
  callbackURL: 'http://localhost:8080/UserForm/auth/fb/callback',
  profileFields: ["id", "name", "photos"]
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({ fId: profile.id }, async (err, user) => {
    if (err) {
      return done(err);
  }
  //No user was found... so create a new user with values from Facebook
  if (!user) {
    console.log(profile);
    
    let form = {};
    form.userName = profile._json.first_name +' '+ profile._json.last_name;
    form.photoData = profile.photos[0].value;
    form.fId = profile.id;
    console.log(form.userName);
    let userModel = new User(form);
    userModel.save();
    done(err, user);

    const user = await User.findOne({ fId: profile.id });
    let token = auth.generateAccessToken(user);
    console.log(token);
  } else {
      //found user. Return
      const user = await User.findOne({ gId: profile.id });
      let token = auth.generateAccessToken(user);
      console.log(token);
      return done(err, user);
    } 
  });
}))

passport.use(new googleStrategy({
  clientID: '1025733734359-rk86a2ig0brtbhkjvuiadnj00ml3nbv4.apps.googleusercontent.com',
  clientSecret: 'fY1taygv9vW7M9FfomUDTqNl',
  callbackURL: 'http://localhost:8080/UserForm/auth/google/callback',
  profileFields: ["id", "name", "photos"]
}, function (accessToken, refreshToken, profile, done) {
  User.findOne({ gId: profile.id }, async (err, user) => {
    if (err) {
      return done(err);
  }
  //No user was found... so create a new user with values from Google
  if (!user) {
    let form = {};
    form.userName = profile.displayName;
    form.photoData = profile.photos[0].value;
    form.gId = profile.id;

    let userModel = new User(form);
    userModel.save();
    done(err, user);

    const user = await User.findOne({ gId: profile.id });
    let token = auth.generateAccessToken(user);
    console.log(token);
      
  } else {
      //found user. Return
      const user = await User.findOne({ gId: profile.id });
      let token = auth.generateAccessToken(user);
      console.log(token);   
      return done(err, user);
    } 
  });
}))


const connection = mongoose.connection;
connection.once("open", () => {
  const userChangeStream = connection.collection("User").watch();
  userChangeStream.on("change", async (change) => {
      switch (change.operationType) {
      case "insert":
          const user = {
          _id: change.fullDocument._id,
          userName: change.fullDocument.userName,
          gId: change.fullDocument.gId,
          fId: change.fullDocument.fId
          };
          try {
            let connection = await dbConnection();
            if(user.gId != null){
              let registerQuery = `INSERT INTO users (${USER_ATTRIBUTE.userName},${USER_ATTRIBUTE.gID}) 
                            VALUES (?, ?)`;
              let createUser = sqlQuery(connection, registerQuery, [
                user.userName,
                user._id.toString(),
              ]);
              connection.end();
            }
            if(user.fId != null){
              let registerQuery = `INSERT INTO users (${USER_ATTRIBUTE.userName},${USER_ATTRIBUTE.fID}) 
                            VALUES (?, ?)`;
              let createUser = sqlQuery(connection, registerQuery, [
                user.userName,
                user._id.toString(),
              ]);
              connection.end();
            }
          } catch (error) { 
            console.log(error);
          }
          break; 

      case "delete":
          break;
      }
  });
  });
