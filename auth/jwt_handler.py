# ============================================
# auth/jwt_handler.py — JWT Token Management
# ============================================
# JWT = JSON Web Token
# After login, we give the user a token (like a VIP pass)
# They send this token with every request to prove they're logged in

from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

# Secret key used to sign/verify tokens (from .env)
SECRET = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"  # The encryption algorithm


def create_token(user_id: str) -> str:
    """
    Creates a JWT token after successful login.
    The token contains the user_id and expires in 7 days.
    """
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7),
    }
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def verify_token(token: str) -> dict:
    """
    Verifies a JWT token and returns the payload.
    Raises an error if the token is invalid or expired.
    """
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# ------ FastAPI Dependency ------
# This is used in routes to protect endpoints
# It automatically extracts the token from the request header

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    FastAPI dependency — extracts and verifies the JWT token.
    Use this in any route that requires authentication:

    @router.get("/protected")
    def my_route(user = Depends(get_current_user)):
        user_id = user["user_id"]
    """
    token = credentials.credentials
    payload = verify_token(token)
    return payload
