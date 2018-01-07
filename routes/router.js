var express = require("express");
var router = require("express").Router();
var User = require("../models");


router.get("/", function (req, res, next) {
    return res.sendFile(path.join(__dirname + "/public/index.html"));
});

router.post("/", function (req, res, next) {
    //Confirm that user typed the same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error("Passwords do not match")
        err.status = 400;
        res.sendFile("Passwords do not match");
        return next(err);
    }

    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        };

        User.create(userData, function(error, user){
            if(error) {
                return next(error);
            } else {
                return res.redirect("/profile");
            }
        })
    }
});