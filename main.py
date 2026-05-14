# ============================================
# main.py — Entry point for FinPilot AI Backend
# ============================================
# FastAPI is a Python web framework (like Express.js for Node)
# It lets us create API endpoints that our React frontend can call

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables FIRST before importing any routes
load_dotenv()

from routes.auth import auth_router
from routes.transactions import transaction_router
from routes.budgets import budget_router
from routes.ai import ai_router

# Create the FastAPI application
app = FastAPI(title="FinPilot AI", version="1.0.0")

# ------ CORS Setup ------
# CORS = Cross-Origin Resource Sharing
# Our React app runs on localhost:5173, backend on localhost:8000
# Without CORS, the browser blocks requests between different ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
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
