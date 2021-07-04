const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");
const jwt = require("jsonwebtoken");
const USER_ATTRIBUTE = require("./userAttribute");
const bcrypt = require('bcrypt');
const saltRounds = 10;



    module.exports.register = async (req, res) => {
        const {userName, password} = req.body;
        let encryptedPassword = '';

        try {
            let connection = await dbConnection();
            let getUserNameQuery = `SELECT userName FROM users WHERE userName = ? `;
            let getUserName = await sqlQuery(connection, getUserNameQuery, [userName]);
        
           
            if (getUserName.length !== 0) {
              console.log(getUserName);
              connection.end();
              res.json({
                message: "Username has already existed!!!",
              });
            } else {
                bcrypt.hash(encryptedPassword, saltRounds, function(err, hash) {
                    encryptedPassword = hash;
                    console.log('hash', hash);
                    
                    let registerQuery = `INSERT INTO users (${USER_ATTRIBUTE.userName},${USER_ATTRIBUTE.password}) 
                    VALUES (?, ?)`;
                    let createUser = sqlQuery(connection, registerQuery, [
                        userName,
                        encryptedPassword,
                    ]);
              connection.end();
              res.json({
                message: "Register Successfully",
              });
                });  
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: error,
            });
          }
        
      };


module.exports.authenToken = (req, res, next) =>{
    const authorizationHeader = req.headers['authorization'];
    //bearer [token]
    const token = authorizationHeader.split(' ')[1];
    if(!token) res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_KEY, (err, data) =>{
        console.log(err, data);
        if(err) res.sendStatus(403);
        next();
    })
}



module.exports.login = async (req, res) =>{
    let data = req.body;
    const accessToken = jwt.sign(data, process.env.JWT_KEY, {expiresIn: '1h'});
    let userName = req.body.userName;
    let password = req.body.password;
    try{
        let connection = await dbConnection();
        let getUserNameQuery = `SELECT userName FROM users WHERE userName = ?`;
        let getUserName = await sqlQuery(connection, getUserNameQuery, [userName]);
        let getPasswordQuery = `SELECT password FROM users WHERE password = ?`;
        let getPassword = await sqlQuery(connection, getPasswordQuery, [password]);
        if(getUserName.length === 0){
            connection.end();
            res.json({
                message: "Invalid Username or Password"
            })
        }
        else if (getPassword.length === 0){
            connection.end();
            res.json({
                message: "Invalid Username or Password"
            })
        }
        else{
            connection.end();
            res.json({
                message: "Login Successfully",
                accessToken,
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: error
        })
    }
}
  
