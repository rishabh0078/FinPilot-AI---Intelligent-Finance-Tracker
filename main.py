# ============================================
# main.py — Entry point for FinPilot AI Backend
# ============================================
# FastAPI is a Python web framework (like Express.js for Node)
# It lets us create API endpoints that our React frontend can call

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables FIRST before importing any routes
load_dotenv()

from routes.auth import auth_router
from routes.transactions import transaction_router
from routes.budgets import budget_router
from routes.ai import ai_router
from database.connection import transactions_collection
from ai.rag_pipeline import store_transaction_embedding

# Create the FastAPI application
app = FastAPI(title="FinPilot AI", version="1.0.0")

@app.on_event("startup")
def sync_chromadb():
    print("Starting ChromaDB sync from MongoDB...")
    try:
        all_transactions = list(transactions_collection.find())
        count = 0
        for tx in all_transactions:
            user_id = str(tx.get("user_id"))
            # Ensure the transaction has the required fields
            if user_id and "type" in tx and "category" in tx and "amount" in tx and "description" in tx and "date" in tx:
                store_transaction_embedding(user_id, tx)
                count += 1
        print(f"✅ Successfully synced {count} transactions to ChromaDB!")
    except Exception as e:
        print(f"❌ Failed to sync ChromaDB: {e}")

# ------ CORS Setup ------
# CORS = Cross-Origin Resource Sharing
# In development the React app runs on localhost:5173; in production the
# frontend URL is injected via the FRONTEND_URL environment variable so
# the backend accepts requests from whichever domain the frontend is
# deployed to (e.g. finpilot-frontend.up.railway.app).
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = list(set(["http://localhost:5173", frontend_url]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# ------ Register Routes ------
# Each router handles a group of related endpoints
# prefix = the URL path prefix for all routes in that router
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(transaction_router, prefix="/transactions", tags=["Transactions"])
app.include_router(budget_router, prefix="/budgets", tags=["Budgets"])
app.include_router(ai_router, prefix="/ai", tags=["AI Insights"])


# ------ Health Check ------
@app.get("/")
def root():
    return {"message": "FinPilot AI Backend is running!"}
