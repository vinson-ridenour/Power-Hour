// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var router = express.Router();

var PDFDocument = require('pdfkit')
var pdf = require("express-pdf");

var db = require("./../../models");

// Routes
// =============================================================
router.use(pdf);
// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/utilities/pdf", function(req, res) {
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

router.use('/utilities/pdfFromHTMLString', function(req, res){
	res.pdfFromHTML({
		filename: 'generated.pdf',
		htmlContent: '<html><body>ASDF</body></html>'
	});
});

router.get('/utilities/pdfFromHTML', function(req, res){
	res.pdfFromHTML({
		filename: 'generated.pdf',
		html: res.render("/time-entry/all/1"),
	});
});
module.exports = router;
};
