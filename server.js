// *****************************************************************************
// Power Hour App
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
//var db = require("./power-hour/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./power-hour/routes/api-routes.js")(app);
require("./power-hour/routes/view-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
/*
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
*/
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
