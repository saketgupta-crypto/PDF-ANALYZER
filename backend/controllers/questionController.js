const Document = require('../models/Document');
const Question = require('../models/Question');

// const pdfService = require('../services/pdfService');
const aiService = require('../services/aiService');


async function askQuestion(req, res) {
    console.log('Ask question controller called');
    console.log('Question recieved:', req.body);

    try {
        const {question} = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
              success: false,
              message: 'Question is required.',
            });
        }

        console.log('Getting stored PDF text...');

        // const pdfText = pdfService.getStoredPdfText();

        const document = await Document.findOne()
            .sort({ createdAt: -1 });

        if (!document) {
            return res.status(400).json({
                success: false,
                message: 'No PDF found. Please upload a PDF first.',
            });
        }
        const pdfText = document.extractedText;

        if (!pdfText) {
            return res.status(400).json({
                success: false,
                message: 'PDF text is not available. No PDF text found. Please upload a PDF first.',
            });
        }

        console.log('PDF text found');
        console.log('Sending question to AI...');

        const answer = await aiService.getAnswerFromPdf(
            pdfText,
            question.trim()
        );

        console.log('AI answer recieved');

        // Save question and answer in MongoDB
        const savedQuestion = await Question.create({
            documentId: document._id,
            question: question.trim(),
            answer: answer,
        });
        console.log('Question and answer saved to MongoDB');

        return res.status(200).json({
            success: true,
            answer,
            questionId: savedQuestion._id,
        });
    } catch (error) {
        console.error('Question error:', error.message);

        return res.status(500).json({
            success: false,
            message: error.message ||'Failed to get an answer from AI.',
        });
    }
}

module.exports = {
    askQuestion,
};