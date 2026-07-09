"""
DeepSeek API - AI-Powered Enterprise Knowledge Base
Main application entry point with FastAPI setup and middleware configuration.
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.routes import chat, documents, health, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler - creates required directories on startup."""
    os.makedirs("uploads", exist_ok=True)
    os.makedirs("data", exist_ok=True)
    yield


app = FastAPI(
    title="DeepSeek API",
    description="AI-Powered Enterprise Knowledge Base API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(documents.router, prefix="/api", tags=["Documents"])
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])
