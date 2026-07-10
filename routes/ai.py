# ============================================
# routes/ai.py — AI Chat Routes
# ============================================
# Handles incoming questions from the user
# Gathers their financial summary, runs the RAG pipeline, and returns the AI answer

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from auth.jwt_handler import get_current_user
from database.connection import users_collection, transactions_collection
from ai.rag_pipeline import chat_with_ai

ai_router = APIRouter()


class ChatRequest(BaseModel):
    """Data required to ask a question to the AI"""
    question: str


@ai_router.post("/chat")
def ask_ai(request: ChatRequest, user=Depends(get_current_user)):
    """
    Main endpoint for the AI Chat assistant.
    1. Gets user info & calculates total income/expenses
    2. Calls the RAG pipeline with the question & summary
    3. Returns the AI's response
    """
    user_id = user["user_id"]
    question = request.question

    # --- Step 1: Gather Financial Summary ---
    # We pass this high-level summary to the AI so it always knows the big picture

    # Get user profile for income/savings goal
    from bson import ObjectId
    db_user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    savings_goal = db_user.get("savings_goal", 0)

    # Calculate total income and expenses dynamically from transactions
    all_transactions = list(transactions_collection.find({"user_id": user_id}))
    total_income = sum(t["amount"] for t in all_transactions if t.get("type") == "income")
    total_expenses = sum(t["amount"] for t in all_transactions if t.get("type") == "expense")
    current_savings = total_income - total_expenses

    # Format the summary as a string
    financial_summary = (
        f"Total Transactions: {len(all_transactions)}\n"
        f"Total Income: ₹{total_income}\n"
        f"Savings Goal: ₹{savings_goal}\n"
        f"Total Expenses: ₹{total_expenses}\n"
        f"Current Savings: ₹{current_savings}"
    )

    # --- Step 2: Run RAG Pipeline ---
    try:
        ai_response = chat_with_ai(user_id, question, financial_summary)
        
        # Optional: Save conversation history to database
        # ai_history_collection.insert_one({"user_id": user_id, "question": question, "answer": ai_response})
        
        return {"answer": ai_response}
    except Exception as e:
        # If Groq API fails or Pinecone query errors out
        raise HTTPException(status_code=500, detail=f"AI Engine Error: {str(e)}")
