const mysql = require("mysql");
const dbConfig = {
  user: "b0920f2865db2e",
  host: "eu-cdbr-west-01.cleardb.com",
  password: "2abc0c60",
  database: "heroku_ad1f4c5078c7bf0",
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