// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

var db = require("./../../models");

//Create a user
router.post("/users/add", function(req, res) {
	db.Users.create({
		"uuid": req.body.uuid,
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"address": req.body.address,
		"city": req.body.city,
		"state": req.body.state,
		"zip": req.body.zip,
		"email_address": req.body.email_address,
		"phone": req.body.phone
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
router.get("/users/check", function(req, res) {
	console.log(req.params);
});

//Read a user
router.get("/users/list/:id", function(req, res) {
	console.log(req.params)
	db.Users.findAll({
		"where": {
		$or: [
			{"user_id": {$eq: req.params.id} 
				},
			{"uuid": {$eq: req.params.id}
				}
			]
		}
	})
	.then(function(dbPost) {
		res.json(dbPost)
	})
	.catch(function(error) {
		res.json(error)
	})
});

//Update or Delete a user
//##To Do: add flag for inactive user
router.post("/users/list/:user_id", function(req, res) {
	console.log(req.params)
	db.Users.update({
			"first_name": req.body.first_name,
			"last_name": req.body.last_name,
			"address": req.body.address,
			"city": req.body.city,
			"state": req.body.state,
			"zip": req.body.zip,
			"email_address": req.body.email_address,
			"phone": req.body.phone
		},
		{"where": {
			"user_id": parseInt(req.params.user_id)
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

module.exports = router

