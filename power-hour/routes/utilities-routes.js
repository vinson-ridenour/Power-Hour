// Dependencies
// =============================================================
var path = require("path");
const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')
var pdf = require("express-pdf");

// Routes
// =============================================================
module.exports = function(app) {
	app.use(pdf);
	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/utilities/pdf", function(req, res) {
			const doc = new PDFDocument()
			let filename = "myPDF"
			// Stripping special characters
			filename = encodeURIComponent(filename) + '.pdf'
			// Setting response to 'attachment' (download).
			// If you use 'inline' here it will automatically open the PDF
			res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
			res.setHeader('Content-type', 'application/pdf')
			const content = "<h1>i am a pdf that was created</h1>"
			doc.y = 300
			doc.text(content, 50, 50)
			doc.pipe(res)
			doc.end()
	});

	app.use('/utilities/pdfFromHTMLString', function(req, res){
		res.pdfFromHTML({
			filename: 'generated.pdf',
			htmlContent: '<html><body>ASDF</body></html>'
		});
	});

};
