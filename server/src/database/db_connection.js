const mysql = require("mysql");
const dbConfig = {
  user: "baff8cfae4361d",
  host: "eu-cdbr-west-01.cleardb.com",
  password: "a9f0fef5",
  database: "heroku_d23ba00c4e094ee",
  // multipleStatements: true
};

module.exports = () =>
  new Promise((resolve, reject) => {
    
    const connection = mysql.createConnection(dbConfig);

    connection.connect((error) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(connection);
    });
  });