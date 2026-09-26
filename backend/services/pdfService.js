const fs = require('fs');
// const pdfParse = require('pdf-parse');
const { PDFParse } = require('pdf-parse');

let storagePdfText = '';

async function extractTextFromPdf(filePath) {
    const fileBuffer = fs.readFileSync(filePath);

    const parser = new PDFParse({
        data: fileBuffer
    });
    const pdfData = await parser.getText();
    // const pdfData = await PDFParse(fileBuffer);

    if(!pdfData.text || !pdfData.text.trim()){
        throw new Error('Could not extract text from this PDF.');
    }

    await parser.destroy();
    return pdfData.text;
}
function storePdfText(text){
    storagePdfText = text;
}
function getStoredPdfText(){
    return storagePdfText;
}

module.exports = {
    extractTextFromPdf,
    storePdfText,
    getStoredPdfText,
}