var db = require("./../../models");

module.exports = function(app) {
	//Create a time entry
	app.post("/time-entry/add", function(req, res) {
		db.TimeEntries.create({
			"date": req.body.date,
			"start_time": req.body.start_time,
            "end_time": req.body.end_time,
            "description": req.body.description,
            "pay_rate": req.body.pay_rate,
            "total_hours": req.body.total_hours,
			"total_pay": req.body.total_pay
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
	app.get("/time-entry/list/:user_id", function(req, res) {
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
	app.post("/time-entry/list/:time_entry_id", function(req, res) {
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
}