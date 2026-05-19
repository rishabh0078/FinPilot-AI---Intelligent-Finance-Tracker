# FinPilot AI

A full-stack intelligent finance tracker that goes beyond simple budgeting. FinPilot AI features a built-in financial advisor that actively monitors your spending habits and provides personalized, actionable insights based on your exact transaction history.

Built with React, FastAPI, MongoDB, and a RAG pipeline (ChromaDB + LangChain + Llama 3.3 via Groq).

## Live Demo

You can either create a new account to test it from scratch, or log in instantly using these demo credentials:
- **Link:** [FinPilot AI Live](https://finpilot-ai.up.railway.app/)
- **Email:** `user@gmail.com`
- **Password:** `123456`

## Features

- Track income and expenses
- Set category-wise budgets
- Dashboard with expense breakdown chart
- AI chat that gives advice based on your real transactions 
- JWT auth, profile management

## How the AI works

When you ask something like "where am I overspending?", the app:

1. Searches your transaction history in ChromaDB (vector similarity search)
2. Pulls out the relevant transactions
3. Sends them as context to Llama 3.3 along with your financial summary
4. Returns a grounded answer using your actual data

This is RAG — the AI can't hallucinate because it only sees your real numbers.

## Setup

**Backend**
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_secret
GROQ_API_KEY=your_groq_key
```

```bash
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Tech

- **Frontend:** React, Tailwind, Recharts
- **Backend:** FastAPI, PyMongo
- **AI:** LangChain, ChromaDB, Groq (Llama 3.3 70B)
- **Database:** MongoDB Atlas
- **Auth:** JWT

