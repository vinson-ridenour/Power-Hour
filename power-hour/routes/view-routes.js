// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

var db = require("./../../models");
// Routes
// =============================================================

// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function(req, res) {
	res.render("login", {"layout": "signin"});

//	res.sendFile(path.join(__dirname, "../public/index.html"));
});

// dashboard route loads dashboard.html
router.get("/dashboard", function(req, res) {
/*
	db.Burgers.findAll({})
	.then(function(dbPost) {
			console.log(dbPost)
			var hbsObject = {
		"burgers": dbPost
		};
		console.log(hbsObject);
	});
*/
		res.render("dashboard");
//	res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

// blog route loads blog.html
router.get("/account", function(req, res) {
		res.render("account");
//	res.sendFile(path.join(__dirname, "../public/newaccount.html"));
});

// authors route loads author-manager.html
router.get("/authors", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/author-manager.html"));
});

module.exports = router;
