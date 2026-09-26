const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadPdf } = require("../controllers/pdfController");

const router = express.Router();

router.post("/", upload.single("file"), uploadPdf);

module.exports = router;