// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

// Routes
var db = require("./../../models");

//Create a client
router.post("/clients/add", function(req, res) {
	db.Clients.create({
		"client_name": req.body.client_name,
		"user_id": parseInt(req.body.user_id)
	})
	.then(function(dbPost) {
		console.log(dbPost);
		res.json(dbPost);
	})
	.catch(function(error){
		res.json(error);
	});
});

//Read a user
router.get("/clients/list/:id", function(req, res) {
	console.log(req.params)
	db.Clients.findAll({
		"where": {
			"user_id": parseInt(req.params.id)
		}
	})
	.then(function(dbPost){
		res.json(dbPost)
	})
	.catch(function(error){
		res.json(error)
	})
});

//Update a client
router.post("/clients/list/:client_id", function(req, res) {
	console.log(req.params)
	db.Clients.update({
			"client_name": req.body.client_name,
		},
		{"where": {
			"client_id": parseInt(req.params.client_id)
			}
		}
	)
	.then(function(dbPost){
		res.json(dbPost)
	})
	.catch(function(error){
		res.json(error)
	})
});
module.exports = router;

