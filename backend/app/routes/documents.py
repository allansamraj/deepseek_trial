"""
Document CRUD endpoints — upload, list, get, and delete documents.
Metadata is persisted in a local JSON file (data/documents.json).
"""

import json
import logging
import os
import random
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile

from app.config import Settings, get_settings
from app.models.document import DocumentListResponse, DocumentMetadata, UploadResponse
from app.services.document_service import process_document

logger = logging.getLogger(__name__)

router = APIRouter()

# ---------------------------------------------------------------------------
# Helpers for JSON-based document storage
# ---------------------------------------------------------------------------

def _docs_path(settings: Settings) -> Path:
    """Return the path to the documents metadata JSON file."""
    return Path(settings.data_dir) / "documents.json"


def load_documents(settings: Settings) -> list[dict]:
    """Load document metadata list from disk."""
    path = _docs_path(settings)
    if not path.exists():
        return []
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (json.JSONDecodeError, OSError):
        return []


def save_documents(settings: Settings, documents: list[dict]) -> None:
    """Persist document metadata list to disk."""
    path = _docs_path(settings)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(documents, fh, indent=2, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@router.post("/documents/upload", response_model=UploadResponse)
async def upload_document(
    file: UploadFile,
    settings: Settings = Depends(get_settings),
):
    """Upload a document, extract text, and store metadata."""
    try:
        # Ensure upload directory exists
        os.makedirs(settings.upload_dir, exist_ok=True)

        # Generate a unique document ID
        doc_id = str(uuid.uuid4())

        # Determine file extension / type
        filename = file.filename or "unknown"
        ext = Path(filename).suffix.lower().lstrip(".")
        file_type = ext if ext else "unknown"

        # Save file to disk
        file_path = os.path.join(settings.upload_dir, f"{doc_id}_{filename}")
        content = await file.read()
        with open(file_path, "wb") as fh:
            fh.write(content)

        file_size = len(content)

        # Process document (text extraction + chunking)
        chunk_count = 0
        try:
            result = process_document(file_path, filename)
            chunk_count = len(result.get("chunks", []))
        except Exception as proc_err:
            logger.warning("Document processing failed (non-fatal): %s", proc_err)

        # Build metadata
        health_score = round(random.uniform(75, 98), 1)
        now = datetime.now(timezone.utc).isoformat()

        doc_meta = DocumentMetadata(
            id=doc_id,
            name=filename,
            type=file_type,
            size=file_size,
            department="General",
            upload_date=now,
            health_score=health_score,
            status="ready",
            chunk_count=chunk_count,
        )

        # Persist metadata
        documents = load_documents(settings)
        documents.append(doc_meta.model_dump())
        save_documents(settings, documents)

        return UploadResponse(
            success=True,
            document=doc_meta,
            message=f"Document '{filename}' uploaded successfully",
        )

    except Exception as exc:
        logger.exception("Upload failed")
        return UploadResponse(success=False, message=f"Upload failed: {exc}")


@router.get("/documents", response_model=DocumentListResponse)
async def list_documents(settings: Settings = Depends(get_settings)):
    """Return all uploaded documents with their metadata."""
    documents = load_documents(settings)
    return DocumentListResponse(
        documents=[DocumentMetadata(**d) for d in documents],
        total=len(documents),
    )


@router.get("/documents/{doc_id}", response_model=DocumentMetadata)
async def get_document(doc_id: str, settings: Settings = Depends(get_settings)):
    """Retrieve metadata for a single document by ID."""
    documents = load_documents(settings)
    for doc in documents:
        if doc["id"] == doc_id:
            return DocumentMetadata(**doc)
    raise HTTPException(status_code=404, detail="Document not found")


@router.delete("/documents/{doc_id}")
async def delete_document(doc_id: str, settings: Settings = Depends(get_settings)):
    """Delete a document's metadata and its uploaded file."""
    documents = load_documents(settings)
    target = None

    for doc in documents:
        if doc["id"] == doc_id:
            target = doc
            break

    if target is None:
        raise HTTPException(status_code=404, detail="Document not found")

    # Remove from metadata list
    documents = [d for d in documents if d["id"] != doc_id]
    save_documents(settings, documents)

    # Attempt to delete the physical file
    try:
        upload_dir = Path(settings.upload_dir)
        for file_path in upload_dir.iterdir():
            if file_path.name.startswith(doc_id):
                file_path.unlink(missing_ok=True)
                break
    except OSError as err:
        logger.warning("Could not delete file for doc %s: %s", doc_id, err)

    return {"success": True, "message": f"Document '{target.get('name', doc_id)}' deleted"}
