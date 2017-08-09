var db = require("./../../models");

module.exports = function(app) {
	//Create a client
	app.post("/clients/add", function(req, res) {
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

	//Read a client
	app.get("/clients/list/read", function(req, res) {
		console.log(req.body)
		db.Clients.findAll({
			"where": {
				"user_id": parseInt(req.body.user_id)
			}
		})
		.then(function(dbPost) {
			res.json(dbPost)
		})
		.catch(function(error) {
			res.json(error)
		})
	});

	//Update a client
	app.post("/clients/list/:client_id", function(req, res) {
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
}
