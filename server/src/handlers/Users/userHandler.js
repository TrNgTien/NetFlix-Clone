const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");
const jwt = require("jsonwebtoken");
const USER_ATTRIBUTE = require("./userAttribute");
const auth = require("../../middlewares/authentication/authentication");

module.exports.login = async (req, res) =>{
    let userName = req.body.userName;
    let password = req.body.password;
    let token = auth.generateAccessToken(userName);
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
                token
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
  
