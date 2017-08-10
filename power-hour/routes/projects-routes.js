// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

// Routes
var db = require("./../../models");

//Create a project
router.post("/projects/add", function(req, res) {
	db.Projects.create({
		"project_name": req.body.project_name,
		"client_id": parseInt(req.body.client_id),
	})
	.then(function(dbPost) {
		console.log(dbPost);
		res.json(dbPost);
	})
	.catch(function(error){
		res.json(error);
	});
});

//Read a project
router.get("/projects/list/read/:client_id", function(req, res) {
	db.Projects.findAll({
		"where": {
			"client_id": parseInt(req.params.client_id)
		}
	})
	.then(function(dbPost) {
		res.json(dbPost)
	})
	.catch(function(error) {
		res.json(error)
	})
});

//Update a project
router.post("/projects/list/:project_id", function(req, res) {
	console.log(req.params)
	db.Projects.update({
		    "project_name": req.body.project_name,
		},
		{"where": {
			"project_id": parseInt(req.params.project_id)
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
