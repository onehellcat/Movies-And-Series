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
        res.render("list", { page_title: "Series", data: "" });
      } else {
        res.render("list", { page_title: "Series", data: rows });
      }
    }
  );
});

module.exports = router;
