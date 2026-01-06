# AI Developer Productivity Assistant 🚀

## Local LLaMA 3.1 • Real-Time Streaming • Developer-First UX

An end-to-end AI developer assistant built with local LLaMA 3.1, featuring real token streaming, a production-grade UI, and a clean backend–frontend architecture.

This project demonstrates how real GenAI products are built, not just demo chatbots.

---

✨ Key Features

⚡ Real token streaming (no fake typing)

🧠 Local LLaMA 3.1 (privacy-first, offline)

🧩 Explain / Debug / Refactor modes

💬 Developer-friendly chat UI

🧱 Structured responses with code blocks

📋 Copyable code snippets

🖥️ Backend–frontend separation

🔒 No cloud dependency

---
## 🏗️ Architecture Overview
Frontend (Next.js App Router)
        ↓ (streaming)
Next.js API Route (/api/ask)
        ↓ (proxy stream)
Backend (Node.js + Express)
        ↓ (stream=true)
Local LLaMA 3.1 (Ollama)


This mirrors **production-grade GenAI architectures**.

---

## 🛠️ Tech Stack

### Frontend

- Next.js (App Router)

- React (Client Components)

- Tailwind CSS

- Fetch Streaming API

## Backend

- Node.js

- Express

- CORS

- Streaming HTTP responses

### AI Model

- LLaMA 3.1 (8B)

- Running locally via Ollama

## 📁 Project Structure

```bash
ai-dev-assistant/
│
├─ backend/
│  ├─ server.js            # Express server (streaming)
│  ├─ processRequest.js    # LLaMA streaming logic
│  └─ package.json
│
├─ src/
│  └─ app/
│     ├─ api/
│     │  └─ ask/
│     │     └─ route.js    # Streaming proxy
│     └─ page.js           # UI (chat + streaming)
│
├─ README.md
└─ package.json
```

## ⚙️ Prerequisites

- Node.js ≥ 18

- Ollama installed

Install Ollama:
👉 https://ollama.com

```bash
Pull the model:


ollama pull llama3.1:8b


Run the model (keep terminal open):

ollama run llama3.1:8b

▶️ Running the Project
1️⃣ Start Backend
cd backend
npm install
node server.js


Backend runs at:

http://localhost:4000

2️⃣ Start Frontend
npm install
npm run dev


Frontend runs at:

http://localhost:3000
```
---
### 🔥 Streaming API (How It Works)
 - Backend Endpoint
POST /ask-stream


- Uses Ollama with stream: true

- Streams tokens chunk-by-chunk

- Sends raw text stream to frontend

### Frontend

- Uses ReadableStream

- Appends tokens live to UI

 - No buffering, no delay

### 🧪 Example Prompts
Explain how React reconciliation works
Debug this API returning 500 error
Refactor this function for performance


Use Explain / Debug / Refactor modes from the sidebar.

🧠 Why This Project Is Different

Most GenAI projects:

❌ Fake typing animation

❌ Cloud-only APIs

❌ Monolithic frontend logic

This project:

✅ True backend-to-frontend streaming

✅ Local LLM (privacy-first)

✅ Clean separation of concerns

✅ Production-style UX

🗣️ How to Explain This in Interviews

“I built a local LLaMA-based AI assistant with real-time token streaming.
The backend streams responses from the model, proxies them through Next.js, and the frontend renders tokens incrementally.
This mirrors production GenAI architectures used in real products.”

This positions you as a serious GenAI engineer, not a tutorial follower.

🚀 Future Enhancements

⏹️ Stop / cancel streaming

📚 RAG (codebase & docs)

🧩 Agent planner + executor

💾 Chat history persistence

🧠 Multi-model routing

## 📜 License

MIT License — free to use, modify, and build upon.