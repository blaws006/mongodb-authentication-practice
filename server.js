var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);

var PORT = 3000;

var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/auth-practice");
var db = mongoose.connection;

//handle Mongo errors

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("We are connected!");
});

//use sessions for tracking logins
app.use(session({
    secret: "b-law",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

var routes = require("./routes/router")

app.use("/", routes);


app.listen(PORT, function(){
    console.log("App running on " + PORT);
});