# ============================================
# models/transaction.py — Transaction Data Model
# ============================================

from pydantic import BaseModel
from datetime import date


class TransactionModel(BaseModel):
    """Data required to create a new transaction"""
    type: str         # "income" or "expense"
    category: str     # e.g. "Groceries", "Salary"
    amount: float     # e.g. 150.00
    description: str  # e.g. "Weekly grocery shopping"
    date: str         # e.g. "2026-05-13"
