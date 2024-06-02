var express = require("express");
var router = express.Router();
var connection = require("../database.js");

/* GET home page. */

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM series ORDER BY id asc",
    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("series", { page_title: "Series", data: "" });
      } else {
        res.render("series", { page_title: "Series", data: rows });
      }
    }
  );
});
router.post("/", (req, res) => {
  res.redirect("/series");

  console.log(
    `Added to series: ${req.body.name} ${req.body.genre} ${req.body.imdb}`
  );
  return connection.query(
    `INSERT INTO series (name, genre, IMDb) VALUES ('${req.body.name}','${req.body.genre}','${req.body.imdb}')`
  );
});
module.exports = router;
