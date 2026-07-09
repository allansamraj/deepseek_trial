"""
Text extraction utilities for PDF, DOCX, and plain-text files.
All third-party imports are guarded so the app runs even without optional deps.
"""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def extract_text(file_path: str) -> str:
    """
    Extract plain text from a file based on its extension.

    Supported formats:
        - .pdf  → via PyMuPDF (fitz)
        - .docx → via python-docx
        - .txt / .md / .csv → direct read

    Returns the extracted text or an informative fallback message.
    """
    ext = Path(file_path).suffix.lower()

    if ext == ".pdf":
        return _extract_pdf(file_path)
    elif ext == ".docx":
        return _extract_docx(file_path)
    elif ext in (".txt", ".md", ".csv", ".log", ".json", ".xml", ".html", ".htm"):
        return _extract_plain(file_path)
    else:
        return f"[Unsupported file type: {ext}. Text extraction is available for PDF, DOCX, and plain-text files.]"


# ---------------------------------------------------------------------------
# Private helpers
# ---------------------------------------------------------------------------

def _extract_pdf(file_path: str) -> str:
    """Extract text from a PDF using PyMuPDF (fitz)."""
    try:
        import fitz  # PyMuPDF
    except ImportError:
        logger.warning("PyMuPDF (fitz) is not installed — PDF extraction unavailable.")
        return "[PDF extraction unavailable: install PyMuPDF (`pip install PyMuPDF`) to enable.]"

    try:
        text_parts: list[str] = []
        with fitz.open(file_path) as doc:
            for page in doc:
                page_text = page.get_text()
                if page_text:
                    text_parts.append(page_text)
        return "\n\n".join(text_parts)
    except Exception as exc:
        logger.exception("Failed to extract text from PDF: %s", file_path)
        return f"[Error extracting PDF text: {exc}]"


def _extract_docx(file_path: str) -> str:
    """Extract text from a DOCX file using python-docx."""
    try:
        from docx import Document
    except ImportError:
        logger.warning("python-docx is not installed — DOCX extraction unavailable.")
        return "[DOCX extraction unavailable: install python-docx (`pip install python-docx`) to enable.]"

    try:
        doc = Document(file_path)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n\n".join(paragraphs)
    except Exception as exc:
        logger.exception("Failed to extract text from DOCX: %s", file_path)
        return f"[Error extracting DOCX text: {exc}]"


def _extract_plain(file_path: str) -> str:
    """Read a plain-text file with fallback encoding."""
    for encoding in ("utf-8", "utf-8-sig", "latin-1"):
        try:
            with open(file_path, "r", encoding=encoding) as fh:
                return fh.read()
        except UnicodeDecodeError:
            continue
        except Exception as exc:
            logger.exception("Failed to read text file: %s", file_path)
            return f"[Error reading file: {exc}]"

    return "[Could not decode file with any supported encoding.]"
