// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

var db = require("./../../models");

//Create a time entry
router.post("/time-entry/add", function(req, res) {
	db.TimeEntries.create({
		"user_id": req.body.user_id,
		"client_id": req.body.client_id,
		"project_id": req.body.project_id,
		"date": req.body.date,
		"start_time": req.body.start_time,
		"end_time": req.body.end_time,
		"description": req.body.description,
		"total_hours": req.body.total_hours,
		"pay_rate": req.body.pay_rate,
		"total_pay": req.body.total_pay,
		"time_entry_active": req.body.time_entry_active
	})
	.then(function(dbPost) {
		console.log(dbPost);
		res.json(dbPost);
	})
	.catch(function(error) {
		res.json(error);
	});
});

//Read all time entries
router.get("/time-entry/list/:user_id", function(req, res) {
	console.log(req.params)
	db.TimeEntries.findAll({
		"where": {
			"user_id": parseInt(req.params.user_id)
		}
	})
	.then(function(dbPost) {
		res.json(dbPost)
	})
	.catch(function(error) {
		res.json(error)
	})
});

//Update a time entry
router.post("/time-entry/list/:time_entry_id", function(req, res) {
	console.log(req.params)
	db.TimeEntries.update({
			"date": req.body.date,
			"start_time": req.body.start_time,
			"end_time": req.body.end_time,
			"description": req.body.description,
			"pay_rate": req.body.pay_rate,
			"total_hours": req.body.total_hours,
			"total_pay": req.body.pay_rate
		},
		{"where": {
			"time_entry_id": parseInt(req.params.time_entry_id)
			}
		}
	)
	.then(function(dbPost) {
		res.json(dbPost)
	})
	.catch(function(error) {
		res.json(error)
	})
});

router.get("/time-entry/all", function(req, res) {
	db.TimeEntries.findAll({})
	.then(function(dbPost) {
			var hbsObject = {
				"entries": dbPost,
				"layout": "none"
			};
		console.log(hbsObject)
		res.render("time-reports", hbsObject);
	});
});

module.exports = router;