# ============================================
# routes/budgets.py — Budget CRUD Routes
# ============================================
# Handles creating, updating, and deleting budget categories
# Each budget = a spending limit for one category (e.g. Groceries: $400)

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from database.connection import budgets_collection
from auth.jwt_handler import get_current_user
from models.budget import BudgetModel

budget_router = APIRouter()


# ------ GET ALL BUDGETS ------
@budget_router.get("/")
def get_budgets(user=Depends(get_current_user)):
    """Returns all budget categories for the logged-in user."""
    user_id = user["user_id"]

    budgets = list(budgets_collection.find({"user_id": user_id}))

    for b in budgets:
        b["_id"] = str(b["_id"])

    return budgets


# ------ ADD NEW BUDGET ------
@budget_router.post("/")
def add_budget(budget: BudgetModel, user=Depends(get_current_user)):
    """Creates a new budget category with a spending limit."""
    user_id = user["user_id"]

    new_budget = {
        "user_id": user_id,
        "category": budget.category,
        "limit": budget.limit,
        "spent": 0,  # starts at 0, updated as expenses are added
    }

    result = budgets_collection.insert_one(new_budget)
    new_budget["_id"] = str(result.inserted_id)

    return new_budget


# ------ UPDATE BUDGET ------
@budget_router.put("/{budget_id}")
def update_budget(budget_id: str, budget: BudgetModel, user=Depends(get_current_user)):
    """Updates an existing budget's category or limit."""
    user_id = user["user_id"]

    result = budgets_collection.update_one(
        {"_id": ObjectId(budget_id), "user_id": user_id},
        {"$set": {"category": budget.category, "limit": budget.limit}},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Budget not found")

    return {"message": "Budget updated"}


# ------ DELETE BUDGET ------
@budget_router.delete("/{budget_id}")
def delete_budget(budget_id: str, user=Depends(get_current_user)):
    """Deletes a budget category."""
    user_id = user["user_id"]

    result = budgets_collection.delete_one(
        {"_id": ObjectId(budget_id), "user_id": user_id}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Budget not found")

    return {"message": "Budget deleted"}
