"""
Pydantic models for chat request/response payloads.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """A single message in the chat conversation history."""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Incoming chat request from the frontend."""
    message: str
    history: List[ChatMessage] = Field(default_factory=list)
    model: Optional[str] = None


class SourceReference(BaseModel):
    """Reference to a source document used in generating a response."""
    document: str
    page: Optional[int] = None
    confidence: float = 0.0
    chunk: str = ""


class ChatResponse(BaseModel):
    """Chat response payload (used for non-streaming responses)."""
    content: str
    sources: List[SourceReference] = Field(default_factory=list)
    model: str = ""
