var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var flash = require("express-flash");
var session = require("express-session");
var bodyParser = require("body-parser");

var mysql = require("mysql");
var connection = require("./database");

var indexRouter = require("./routes/index");
var seriesRouter = require("./routes/series");
var moviesRouter = require("./routes/movies");
var uploadRouter = require("./routes/addseries");
var uploadMovieRouter = require("./routes/addmovies");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//--------------------------------------------------
//  For custom error codes
//
// var methodOverride = require("method-override");
// app.use(bodyParser());
// app.use(methodOverride());
// app.use(function (err, req, res, next) {
//   if (res.status === 503) {
//     res.sendFile("yourfilepath/filename.html");
//   }
// });
//--------------------------------------------------

app.use(
  session({
    secret: "4f978f1a-be5f-4243-8f03-b28b6ac8a8f2",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());

app.use("/", indexRouter);
app.use("/series", seriesRouter);
app.use("/movies", moviesRouter);
app.use("/series/upload", uploadRouter);
app.use("/movies/upload", uploadMovieRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
