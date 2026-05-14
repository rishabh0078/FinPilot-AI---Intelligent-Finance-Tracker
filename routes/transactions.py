# ============================================
# routes/transactions.py — Transaction CRUD Routes
# ============================================
# Handles adding, viewing, and deleting transactions
# All routes are protected — user must be logged in (JWT required)

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database.connection import transactions_collection
from auth.jwt_handler import get_current_user
from models.transaction import TransactionModel
from ai.rag_pipeline import store_transaction_embedding

transaction_router = APIRouter()


# ------ GET ALL TRANSACTIONS ------
@transaction_router.get("/")
def get_transactions(user=Depends(get_current_user)):
    """
    Returns all transactions for the logged-in user.
    Depends(get_current_user) → automatically checks the JWT token
    """
    user_id = user["user_id"]

    # Find all transactions for this user, newest first
    transactions = list(
        transactions_collection.find({"user_id": user_id}).sort("date", -1)
    )

    # Convert MongoDB _id (ObjectId) to string for JSON response
    for t in transactions:
        t["_id"] = str(t["_id"])

    return transactions


# ------ ADD NEW TRANSACTION ------
@transaction_router.post("/")
def add_transaction(transaction: TransactionModel, user=Depends(get_current_user)):
    """
    Adds a new income or expense transaction.
    Also stores it as an embedding in ChromaDB for AI search.
    """
    user_id = user["user_id"]

    # Build the document to save
    new_transaction = {
        "user_id": user_id,
        "type": transaction.type,
        "category": transaction.category,
        "amount": transaction.amount,
        "description": transaction.description,
        "date": transaction.date,
    }

    # Save to MongoDB
    result = transactions_collection.insert_one(new_transaction)
    new_transaction["_id"] = str(result.inserted_id)

    # Store embedding in ChromaDB for RAG (AI will use this later)
    store_transaction_embedding(user_id, new_transaction)

    return new_transaction


# ------ DELETE TRANSACTION ------
@transaction_router.delete("/{transaction_id}")
def delete_transaction(transaction_id: str, user=Depends(get_current_user)):
    """Deletes a transaction by its ID."""
    user_id = user["user_id"]

    result = transactions_collection.delete_one(
        {"_id": ObjectId(transaction_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return {"message": "Transaction deleted"}
