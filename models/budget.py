# ============================================
# models/budget.py — Budget Data Model
# ============================================

from pydantic import BaseModel


class BudgetModel(BaseModel):
    """Data required to create/update a budget category"""
    category: str   # e.g. "Groceries"
    limit: float    # monthly budget limit e.g. 400.00
