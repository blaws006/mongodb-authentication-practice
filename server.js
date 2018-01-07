var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var PORT = 3000;

var app = express();


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));


mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/auth-practice");

app.listen(PORT, function(){
    console.log("App running on " + PORT);
});