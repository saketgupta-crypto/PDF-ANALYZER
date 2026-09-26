import { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import PdfUpload from './components/PdfUpload';
import QuestionBox from './components/QuestionBox';
import Answer from './components/Answer';

const API_BASE = 'http://localhost:5001/api';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== 'application/pdf') {
      setUploadStatus({
        type: 'error',
        message: 'Please select a PDF file only.'
      });

      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setIsPdfUploaded(false);
    setUploadStatus(null);
    setAnswer('');
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus(null);
    setIsPdfUploaded(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload PDF');
      }

      setUploadStatus({
        type: 'success',
        message: 'PDF uploaded successfully.'
      });

      setIsPdfUploaded(true);

    } catch (uploadError) {
      setUploadStatus({
        type: 'error',
        message:
          uploadError.message ||
          'Something went wrong during upload'
      });

    } finally {
      setIsUploading(false);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAsk = async () => {
    if (!question.trim() || !isPdfUploaded) return;

    setIsLoading(true);
    setAnswer('');
    setError('');

    try {
      const response = await fetch(`${API_BASE}/ask`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to get an answer'
        );
      }

      setAnswer(data.answer);

    } catch (askError) {
      setError(
        askError.message ||
        'Something went wrong while asking the question'
      );

    } finally {
      setIsLoading(false);
    }
  };

  const scrollToWorkspace = () => {
    document
      .getElementById('workspace')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  };

  return (
    <div className="App">

      <Navbar onGetStarted={scrollToWorkspace} />

      {/* ================= HERO ================= */}

      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-powered PDF assistant
            </div>

            <h1>
              Chat with your
              <span> PDF documents.</span>
            </h1>

            <p className="hero-description">
              Upload a PDF, ask questions, and get clear answers
              from your document in seconds. No more searching
              through hundreds of pages.
            </p>

            <div className="hero-actions">

              <button
                className="hero-primary"
                onClick={scrollToWorkspace}
              >
                Start asking questions
                <span>→</span>
              </button>

              <button
                className="hero-secondary"
                onClick={scrollToWorkspace}
              >
                Upload a PDF
              </button>

            </div>

            <div className="hero-trust">

              <span>✓ Fast answers</span>
              <span>✓ Simple to use</span>
              <span>✓ PDF focused</span>

            </div>

          </div>


          {/* Hero Visual */}

          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="document-stack">

              <div className="floating-card card-one">
                <span>PDF</span>
                <strong>Research.pdf</strong>
              </div>

              <div className="pdf-preview">

                <div className="pdf-top">
                  <div className="pdf-logo">
                    PDF
                  </div>

                  <span>Document</span>
                </div>

                <div className="pdf-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="pdf-question">

                  <div className="question-icon">
                    ✦
                  </div>

                  <div>
                    <small>ASK AI</small>
                    <p>
                      What are the main findings?
                    </p>
                  </div>

                </div>

              </div>


              <div className="floating-card card-two">
                <span>AI</span>
                <strong>Answer generated</strong>
              </div>

            </div>

          </div>

        </section>


        {/* ================= WORKSPACE ================= */}

        <section
          id="workspace"
          className="workspace-section"
        >

          <div className="section-heading">

            <span className="section-label">
              YOUR WORKSPACE
            </span>

            <h2>
              Ask anything about your PDF
            </h2>

            <p>
              Upload your document and let AI help you
              understand it faster.
            </p>

          </div>


          <div className="workspace">

            <div className="workspace-top">

              <div>
                <span className="workspace-icon">
                  ◈
                </span>

                <div>
                  <h3>Document workspace</h3>

                  <p>
                    Upload a PDF to get started
                  </p>
                </div>
              </div>

              <span className="secure-badge">
                🔒 Private workspace
              </span>

            </div>


            <div className="workspace-body">

              <PdfUpload
                selectedFile={selectedFile}
                onFileChange={handleFileChange}
                onUpload={handleUpload}
                uploadStatus={uploadStatus}
                isUploading={isUploading}
              />

              <QuestionBox
                question={question}
                onQuestionChange={handleQuestionChange}
                onAsk={handleAsk}
                isPdfUploaded={isPdfUploaded}
                isLoading={isLoading}
              />

              <Answer
                answer={answer}
                error={error}
                isLoading={isLoading}
              />

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features-section">

          <div className="section-heading">

            <span className="section-label">
              WHY USE IT
            </span>

            <h2>
              Your PDF, made easier.
            </h2>

            <p>
              Turn long documents into useful answers
              without reading every page.
            </p>

          </div>


          <div className="features-grid">

            <div className="feature-card">

              <div className="feature-icon terracotta">
                ✦
              </div>

              <h3>Ask questions</h3>

              <p>
                Ask natural questions about your document
                and get answers based on its content.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon sage">
                ◉
              </div>

              <h3>Understand faster</h3>

              <p>
                Quickly understand long reports, notes,
                research papers and study material.
              </p>

            </div>


            <div className="feature-card">

              <div className="feature-icon gold">
                ⚡
              </div>

              <h3>Save your time</h3>

              <p>
                Skip endless scrolling and find the
                information you actually need.
              </p>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="how-section">

          <div className="section-heading">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              Three simple steps
            </h2>

          </div>


          <div className="steps">

            <div className="step">

              <div className="step-number">
                01
              </div>

              <div>
                <h3>Upload your PDF</h3>

                <p>
                  Select the PDF you want to understand.
                </p>
              </div>

            </div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <div>
                <h3>Ask your question</h3>

                <p>
                  Type anything you want to know
                  about your document.
                </p>
              </div>

            </div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <div>
                <h3>Get your answer</h3>

                <p>
                  AI analyzes your PDF and provides
                  a useful response.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= FINAL CTA ================= */}

        <section className="final-cta">

          <div>

            <span className="section-label">
              READY TO START?
            </span>

            <h2>
              Stop searching.
              <br />
              Start asking.
            </h2>

            <p>
              Upload your PDF and let your documents
              answer your questions.
            </p>

            <button
              onClick={scrollToWorkspace}
              className="cta-button"
            >
              Upload your PDF
              <span>→</span>
            </button>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-logo">
          PDF<span>Q</span>A
        </div>

        <p>
          Understand your documents with AI.
        </p>

        <span>
          © 2026 PDF Question Answer
        </span>

      </footer>

    </div>
  );
}

export default App;