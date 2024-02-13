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

module.exports = router;
