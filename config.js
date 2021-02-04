const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// validation
connection.connect((err) => {
  if (err) {
    console.error("MySQL: error connecting:\n", err.stack);
    return;
  }
  console.log("MySQL: connected as id " + connection.threadId);
});

module.exports = connection;
