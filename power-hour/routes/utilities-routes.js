const express = require('express')
const router = express.Router()
const PDFDocument = require('pdfkit')

router.post('/utilities/pdf', (req, res) => {
  const doc = new PDFDocument()
  let filename = "myPDF"
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  const content = "i am a pdf that was created"
  doc.y = 300
  doc.text(content, 50, 50)
  doc.pipe(res)
  doc.end()
})

module.exports = router