# PDF-ANALYZER

An AI-powered web application that allows users to upload PDF documents and ask questions based on their content.

The application extracts text from uploaded PDFs, processes user questions, and generates answers using an AI service while storing document and question data in MongoDB.

## 🚀 Features

- 📄 Upload PDF documents
- 🔍 Extract text from PDF files
- 💬 Ask questions about uploaded PDFs
- 🤖 AI-powered question answering
- 🗄️ MongoDB database integration
- ⚡ React + Vite frontend
- 🛠️ Node.js + Express backend
- 🔐 Environment variable based configuration
- 📑 Markdown-formatted AI responses
- 📂 Local PDF upload handling

## 🏗️ Tech Stack

### Frontend

- React
- Vite
- React Markdown
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- PDF Parse
- CORS
- dotenv

### AI

- OpenRouter-compatible AI service

## 📁 Project Structure

```text
PDF-ANALYZER/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── pdfController.js
│   │   └── questionController.js
│   │
│   ├── middleware/
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Document.js
│   │   └── Question.js
│   │
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   └── questionRoutes.js
│   │
│   ├── services/
│   │   ├── aiService.js
│   │   └── pdfService.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Answer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PdfUpload.jsx
│   │   │   └── QuestionBox.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```



## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ Upload PDF
  ▼
Express Backend
  │
  ├── PDF Processing
  │
  ├── MongoDB
  │
  └── AI Service
          │
          ▼
      AI Response
          │
          ▼
React Frontend
          │
          ▼
       Answer
```

## 🔐 Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `OPENROUTER_API_KEY` | API key for the AI service |



## 👨‍💻 Author

**Saket Gupta**

B.Tech Computer Science & Engineering

## 📄 License

This project is intended for educational and development purposes.