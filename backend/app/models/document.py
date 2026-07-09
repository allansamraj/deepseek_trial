"""
Pydantic models for document metadata and upload responses.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class DocumentMetadata(BaseModel):
    """Metadata for an uploaded document stored in the knowledge base."""
    id: str
    name: str
    type: str
    size: int
    department: str = "General"
    upload_date: str
    health_score: float = 0.0
    status: str = "processing"
    chunk_count: int = 0


class DocumentListResponse(BaseModel):
    """Response containing a list of documents and total count."""
    documents: List[DocumentMetadata]
    total: int


class UploadResponse(BaseModel):
    """Response returned after a document upload attempt."""
    success: bool
    document: Optional[DocumentMetadata] = None
    message: str = ""
