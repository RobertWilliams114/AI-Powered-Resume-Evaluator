## AI-Powered Resume Evaluator

![Evaluator Demo](./client/src/assets/evaluator.png)

# AI-Powered Resume Evaluator

An intelligent tool that analyzes resumes against job descriptions using advanced NLP and machine learning techniques. Delivers actionable feedback to help candidates optimize their applications.

### 🎬 Live Demo
[Try the evaluator live](https://aipoweredresumeevaluator.vercel.app)

---

## 📂 Project Structure

```bash
AI-Powered-Resume-Evaluator/
├── client/           # (Optional) Frontend interface (React/Streamlit)
├── server/           # Flask API endpoints
├── app.py            # Entry point for Flask application
├── requirements.txt  # Python dependencies
├── Procfile          # Heroku process definitions
└── README.md         # Project overview
```

---

## 🔨 Technologies & Why I Chose Them

- **Flask**: Lightweight Python web framework for building RESTful APIs quickly.
- **Flask-CORS**: Enables secure cross-domain requests between frontend and backend.
- **Sentence-Transformers & Hugging Face Transformers**: Pre-trained models for embedding resume and job description text to compute semantic similarity.
- **OpenAI API**: Generates contextual feedback and scores based on GPT-powered insights.
- **Tesseract (pytesseract) & pdf2image**: OCR for extracting text from PDF resumes.
- **python-docx**: Parses .docx files to support a variety of resume formats.
- **scikit-learn**: Metrics and evaluation utilities for scoring resume-job matches.
- **Gunicorn**: Production-ready WSGI server for deploying the Flask application.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/RobertWilliams114/AI-Powered-Resume-Evaluator.git

# 2. Create a virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set environment variables
#   OPENAI_API_KEY=<your_api_key>

# 5. Run the server
gunicorn app:app
```

---

## 🌟 Usage

1. Upload your resume (PDF or DOCX).
2. Provide a target job description or select a template.
3. Review detailed scoring sections: keyword coverage, readability, and AI-driven suggestions.

---

## 📈 Results & Evaluation

- **Semantic Similarity Score**: Cosine similarity between resume and job description embeddings.
- **Keyword Extraction**: Highlights key terms missing or underrepresented.
- **AI Suggestions**: GPT-powered tips for improving impact and clarity.

---
