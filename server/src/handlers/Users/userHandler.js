const sqlQuery = require("../../database/my_sql_query");
const dbConnection = require("../../database/db_connection");
const USER_ATTRIBUTE = require("./userAttribute");
const FACEBOOK_ATTRIBUTE = require("./facebookAttribute");

module.exports.login = async (req, res) =>{
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
                message: "Login Successfully"
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
  