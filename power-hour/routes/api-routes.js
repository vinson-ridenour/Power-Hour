var db = require("./../../models");

module.exports = function(app) {
	app.post("/api/add", function(req, res) {
		db.Entries.create({
			title: req.body.title,
			body: req.body.body,
			category: req.body.category
		})
		.then(function(dbPost) {
			res.json("true");
		});
	});
}