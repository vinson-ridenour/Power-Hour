// *****************************************************************************
// Power Hour App
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var pdf = require("express-pdf");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("./power-hour/public"));

// Routes
// =============================================================
var routes = [require("./power-hour/routes/view-routes.js"),
require("./power-hour/routes/users-routes.js"),
require("./power-hour/routes/clients-routes.js"),
require("./power-hour/routes/projects-routes.js"),
require("./power-hour/routes/time-entries-routes.js"),
require("./power-hour/routes/utilities-routes.js")
];

//require("./power-hour/routes/api-routes.js")(app);

//require("./power-hour/routes/clients-routes.js")(app);

app.use("/", routes);
// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});