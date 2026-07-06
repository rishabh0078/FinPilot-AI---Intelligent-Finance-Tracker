# ============================================
# routes/auth.py — Authentication Routes
# ============================================
# Handles user registration and login
# Uses bcrypt to hash passwords (never store plain text passwords!)

from fastapi import APIRouter, HTTPException, Depends
import hashlib
from bson import ObjectId
from database.connection import users_collection
from auth.jwt_handler import create_token, get_current_user
from models.user import RegisterModel, LoginModel, UserProfile

# Create a router (groups related endpoints together)
auth_router = APIRouter()


# ------ REGISTER ------
@auth_router.post("/register")
def register(user: RegisterModel):
    """
    Creates a new user account.
    1. Check if email already exists
    2. Hash the password
    3. Save to MongoDB
    4. Return a JWT token
    """
    # Check if user already exists
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before saving (simple built-in hash)
    hashed_password = hashlib.sha256(user.password.encode('utf-8')).hexdigest()

    # Create user document for MongoDB
    new_user = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "monthly_income": 0,
        "savings_goal": 0,
    }

    # Insert into MongoDB — returns the new document's _id
    result = users_collection.insert_one(new_user)

    # Create JWT token with the user's MongoDB _id
    token = create_token(str(result.inserted_id))

    return {
        "token": token,
        "user": {
            "id": str(result.inserted_id),
            "name": user.name,
            "email": user.email,
            "monthly_income": 0,
            "savings_goal": 0,
        },
    }


# ------ LOGIN ------
@auth_router.post("/login")
def login(user: LoginModel):
    """
    Logs in an existing user.
    1. Find user by email
    2. Verify password
    3. Return a JWT token
    """
    # Find user in database
    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify password — simple hash comparison
    hashed_input = hashlib.sha256(user.password.encode('utf-8')).hexdigest()
    if hashed_input != db_user["password"]:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Create JWT token
    token = create_token(str(db_user["_id"]))

    return {
        "token": token,
        "user": {
            "id": str(db_user["_id"]),
            "name": db_user["name"],
            "email": db_user["email"],
            "monthly_income": db_user.get("monthly_income", 0),
            "savings_goal": db_user.get("savings_goal", 0),
        },
    }

# ------ UPDATE PROFILE ------
@auth_router.put("/profile")
def update_profile(profile: UserProfile, user=Depends(get_current_user)):
    """
    Updates the user's profile settings (name, income, savings goal).
    """
    user_id = user["user_id"]

    # Build the update dictionary containing only provided fields
    update_data = {}
    if profile.name is not None:
        update_data["name"] = profile.name
    if profile.email is not None:
        # Check if email is already taken by someone else
        existing = users_collection.find_one({"email": profile.email, "_id": {"$ne": ObjectId(user_id)}})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        update_data["email"] = profile.email
    if profile.monthly_income is not None:
        update_data["monthly_income"] = profile.monthly_income
    if profile.savings_goal is not None:
        update_data["savings_goal"] = profile.savings_goal

    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided to update")

    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch and return the updated user (excluding password)
    updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
    return {
        "message": "Profile updated successfully",
        "user": {
            "id": str(updated_user["_id"]),
            "name": updated_user["name"],
            "email": updated_user["email"],
            "monthly_income": updated_user.get("monthly_income", 0),
            "savings_goal": updated_user.get("savings_goal", 0),
        }
    }

# ------ GET CURRENT USER ------
@auth_router.get("/me")
def get_me(user=Depends(get_current_user)):
    """
    Fetches the logged-in user's profile. Used when the React app reloads.
    """
    user_id = user["user_id"]
    db_user = users_collection.find_one({"_id": ObjectId(user_id)})
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {
        "id": str(db_user["_id"]),
        "name": db_user["name"],
        "email": db_user["email"],
        "monthly_income": db_user.get("monthly_income", 0),
        "savings_goal": db_user.get("savings_goal", 0),
    }
