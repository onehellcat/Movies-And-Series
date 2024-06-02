var express = require("express");
var router = express.Router();
var connection = require("../database.js");

/* GET home page. */

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM movies ORDER BY id asc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("movies", { page_title: "Movies", data: "" });
      } else {
        res.render("movies", { page_title: "Movies", data: rows });
      }
    }
  );
});

router.post("/", (req, res) => {
  res.redirect("/movies");
  //res.send(`${req.body.name} ${req.body.genre} ${req.body.imdb}`);
  console.log(
    `Added to movies: ${req.body.name} ${req.body.genre} ${req.body.imdb}`
  );
  return connection.query(
    `INSERT IGNORE INTO movies (name, genre, IMDb) VALUES ('${req.body.name}','${req.body.genre}','${req.body.imdb}')`
  );
});

module.exports = router;
