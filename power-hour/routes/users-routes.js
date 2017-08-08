var db = require("./../../models");

module.exports = function(app) {
	//Create a user
	app.post("/users/add", function(req, res) {
		db.Users.create({
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
	app.get("/users/list/:id", function(req, res) {
		console.log(req.params)
		db.Users.findAll({
			"where": {
				"id": parseInt(req.params.id)
			}
		})
		.then(function(dbPost){
			res.json(dbPost)
		})
		.catch(function(error){
			res.json(error)
		})
	});

	//Update or Delete a user
	//##To Do: add flag for inactive user
	app.post("/users/list/:id", function(req, res) {
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
				"user_id": parseInt(req.params.id)
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
}
