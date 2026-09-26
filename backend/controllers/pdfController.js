const fs = require('fs');
const pdfService = require('../services/pdfService');
const Document = require('../models/Document');

async function uploadPdf(req, res){
    try{
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'No PDF File uploaded. Please send a file with field name "pdf". Please select a PDF file.',
            });
        }

        const extractedText = await pdfService.extractTextFromPdf(req.file.path);

        pdfService.storePdfText(extractedText);

        const document = await Document.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText,
        });

        fs.unlink(req.file.path, (err)=>{
            if(err){
                console.log('Failed to delete temporary PDF file:', err.message);
            }
        });

        return res.status(200).json({
            success: true,
            message: 'PDF uploaded successfully',
            documentId: document._id,
            fileName: document.fileName,
        });
    } catch(error){
        if(req.file && fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path);
        }

        console.log('PDF upload error:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to process PDF. Please try another file.'
        });
    }
}

module.exports={
    uploadPdf
};