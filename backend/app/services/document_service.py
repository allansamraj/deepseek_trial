"""
Document processing service — text extraction and chunking.
Designed to work without heavy ML dependencies.
"""

import logging
from pathlib import Path

from app.utils.text_extraction import extract_text

logger = logging.getLogger(__name__)


def simple_chunk_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 200,
) -> list[str]:
    """
    Split *text* into overlapping chunks of approximately *chunk_size*
    characters, stepping forward by (chunk_size - overlap) each iteration.

    Returns an empty list for empty/whitespace-only input.
    """
    text = text.strip()
    if not text:
        return []

    chunks: list[str] = []
    step = max(chunk_size - overlap, 1)

    for start in range(0, len(text), step):
        chunk = text[start : start + chunk_size].strip()
        if chunk:
            chunks.append(chunk)
        # Stop if we've consumed the whole text
        if start + chunk_size >= len(text):
            break

    return chunks


def process_document(
    file_path: str,
    filename: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> dict:
    """
    Extract text from a file and split it into chunks.

    Returns a dict with:
        - text: the full extracted text
        - chunks: list of text chunks
        - metadata: basic document info
    """
    try:
        text = extract_text(file_path)
    except Exception as exc:
        logger.warning("Text extraction failed for %s: %s", filename, exc)
        text = ""

    chunks = simple_chunk_text(text, chunk_size=chunk_size, overlap=chunk_overlap)

    return {
        "text": text,
        "chunks": chunks,
        "metadata": {
            "filename": filename,
            "extension": Path(filename).suffix.lower(),
            "text_length": len(text),
            "chunk_count": len(chunks),
        },
    }
