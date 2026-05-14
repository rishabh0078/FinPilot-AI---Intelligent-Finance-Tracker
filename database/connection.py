# ============================================
# database/connection.py — MongoDB Connection
# ============================================
# MongoDB is a NoSQL database — stores data as JSON-like documents
# PyMongo is the Python driver that lets us talk to MongoDB

from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Ensure environment variables are loaded before trying to get them
load_dotenv()

# Get the MongoDB connection string from .env file
MONGODB_URI = os.getenv("MONGODB_URI")

# Connect to MongoDB
# MongoClient creates a connection pool (reuses connections efficiently)
client = MongoClient(MONGODB_URI)

# Test the connection to let you know if it worked!
try:
    client.admin.command('ping')
    print("✅ Successfully connected to MongoDB!")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB. Error: {e}")

# Select our database (like choosing a folder for our app's data)
db = client["finpilot"]

# Collections (like tables in SQL)
# We'll use these in our route files
users_collection = db["users"]
transactions_collection = db["transactions"]
budgets_collection = db["budgets"]
ai_history_collection = db["ai_history"]
