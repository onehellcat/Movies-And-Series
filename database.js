const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "samlist",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database successfully!");
});

module.exports = con;
