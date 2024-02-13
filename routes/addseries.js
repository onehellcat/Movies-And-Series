var express = require("express");
var router = express.Router();
var connection = require("../database.js");

router.use(express.static("public"));
router.use(express.json());

/* GET home page. */
router.get("/", function (req, res) {
  res.render("upload");
});
router.post("/", (req, res) => {
  res.redirect("../");
  //res.send(`${req.body.name} ${req.body.genre} ${req.body.imdb}`);
  console.log(
    `Added to series: ${req.body.name} ${req.body.genre} ${req.body.imdb}`
  );
  return connection.query(
    `INSERT INTO series (name, genre, IMDb) VALUES ('${req.body.name}','${req.body.genre}','${req.body.imdb}')`
  );
});

module.exports = router;
