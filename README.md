#  ResumeAnalyst

ResumeAnalyst is a full-stack, automated resume builder and **ATS (Applicant Tracking System) optimization tool**. It lets users build resumes in a clean, live-preview editor and download them as high-quality PDFs — no design skills required.

Beyond building, its core value is the **ATS Scorer & AI Review Engine**, which combines local rule-based analytics with **Groq AI (Llama-3)** to evaluate resumes — whether built inside the app or uploaded as a raw PDF — and returns a score plus actionable, section-by-section feedback.

---

##  Features

- **Live Resume Builder** — form-driven editor with real-time preview, powered by `@react-pdf/renderer` so what you see is exactly what gets exported.
- **PDF Upload & Parsing** — upload an existing resume PDF; `pdfjs-dist` extracts raw text client-side for analysis without needing a file upload to the server.
- **ATS Scoring Engine** — checks resumes against ATS-friendly criteria (keyword density, formatting, section completeness, action verbs, quantified impact) and returns a numeric score.
- **AI-Powered Review** — sends parsed resume content to the Groq Llama-3 API for qualitative feedback: what's weak, what's missing, and how to rewrite specific lines.
- **Authentication** — JWT-based sessions with email OTP verification via Nodemailer, so resumes and scores are tied to a verified account.
- **State Management** — Zustand handles editor state, auth state, and analysis results across the app without prop-drilling.
- **PDF Export** — one-click download of the finished resume as a polished, print-ready PDF.

---

##  How It Works

**1. Building a resume**
The user fills out structured form fields (personal info, experience, education, skills, projects). Zustand stores hold this data centrally, and `@react-pdf/renderer` renders it live into a resume preview pane — the same renderer generates the final downloadable PDF, so there's no mismatch between preview and export.

**2. Uploading an existing resume**
If a user uploads a PDF instead of building one, `pdfjs-dist` runs entirely in the browser to extract raw text from the file. This avoids sending the file to the backend just to read it, and keeps the initial parse fast.

**3. Scoring — two layers**
- **Local analytics**: A rule-based scorer on the backend checks the resume text against ATS heuristics — presence of key sections, keyword coverage, bullet-point structure, contact info formatting, and length — and produces a baseline numeric score without any AI call.
- **AI review**: The same resume text is sent to the Groq Llama-3 API with a structured prompt asking for critique across categories (impact, clarity, keyword optimization, formatting). Groq returns structured feedback that the frontend renders as a review card per section.

**4. Auth flow**
On signup, the backend generates an OTP and emails it via Nodemailer using a Gmail App Password. Once verified, the backend issues a JWT stored in an HTTP-only cookie (via `cookie-parser`), which authenticates all subsequent resume and scoring requests.

**5. Data flow summary**

```
User Input / PDF Upload
        │
        ▼
Frontend (React + Zustand) ──► pdfjs-dist (if PDF upload, extract text client-side)
        │
        ▼
Backend API (Express)
        │
        ├──► Local ATS Scorer (rule-based, no external call)
        │
        └──► Groq Llama-3 API (AI qualitative review)
        │
        ▼
MongoDB (store resume, score, review history)
        │
        ▼
Frontend renders score + AI feedback + exportable PDF
```

---

##  Tech Stack

**Frontend**
- React 19 + Vite 7
- TailwindCSS 4
- Zustand 5 — state management
- `@react-pdf/renderer` — in-browser PDF generation
- `pdfjs-dist` — in-browser PDF text extraction

**Backend**
- Express 5
- MongoDB + Mongoose 8
- JWT + `cookie-parser` — authentication
- Nodemailer — OTP email verification
- Groq Llama-3 API — AI resume analysis

---

##  Project Structure

```
ResumeBuilder/
├── backend/
│   ├── config/          # DB connection, environment setup
│   ├── models/          # Mongoose schemas (User, Resume, etc.)
│   ├── controllers/     # Route logic — auth, scoring, AI review
│   ├── routes/          # Express route definitions
│   ├── middleware/      # JWT auth guards, error handling
│   ├── utils/           # OTP generation, Groq API client, ATS scoring logic
│   └── server.js        # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Editor fields, preview panes, review cards
    │   ├── pages/        # Route-level views (Builder, Dashboard, Auth)
    │   ├── store/        # Zustand stores (resume data, auth, analysis)
    │   └── utils/        # PDF parsing helpers, API client
    └── vite.config.js
```

---

##  Getting Started

### Prerequisites

- **Node.js** installed on your system.
- A **MongoDB Atlas** database connection string.
- A free **Groq API Key** (get one at [console.groq.com](https://console.groq.com)).
- A Gmail account with an App Password for sending registration verification OTPs.

---

### 1. Setup the Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory:

   ```env
   PORT=4000
   JWT_SECRET=your_jwt_secret_here
   MONGO_URL=your_mongodb_connection_string
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the backend in development mode:

   ```bash
   npm run dev
   ```

   The backend will boot up at `http://localhost:4000`.

---

### 2. Setup the Frontend

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install the client-side dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend/` directory:

   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. Run the frontend development server:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser to start building!

---



