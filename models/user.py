# ============================================
# models/user.py — User Data Models
# ============================================
# Pydantic models define the shape of data
# They automatically validate incoming request data
# If someone sends wrong data, FastAPI returns an error automatically

from pydantic import BaseModel, EmailStr


class RegisterModel(BaseModel):
    """Data required to register a new user"""
    name: str
    email: str
    password: str


class LoginModel(BaseModel):
    """Data required to login"""
    email: str
    password: str


class UserProfile(BaseModel):
    """Data for updating user profile"""
    name: str | None = None
    monthly_income: float | None = None
    savings_goal: float | None = None
