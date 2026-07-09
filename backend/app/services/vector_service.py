"""
Simple in-memory vector store using TF-IDF-like keyword matching.
Provides document search without requiring external embedding models.
"""

import logging
import math
import re
from collections import Counter
from typing import List, Dict, Tuple, Optional

logger = logging.getLogger(__name__)


class VectorStore:
    """
    Lightweight keyword-based document store.

    Uses TF-IDF scoring to rank stored text chunks against a query.
    All data lives in memory — suitable for demos and small-scale use.
    """

    def __init__(self) -> None:
        # doc_id -> list of chunks
        self._documents: Dict[str, List[str]] = {}
        # Flat list of (doc_id, chunk_index, chunk_text) for search
        self._all_chunks: List[Tuple[str, int, str]] = []
        # IDF cache (rebuilt on add)
        self._idf: Dict[str, float] = {}

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def add_documents(self, doc_id: str, chunks: List[str]) -> None:
        """Index a document's chunks for later search."""
        self._documents[doc_id] = chunks
        self._rebuild_index()
        logger.info("Indexed %d chunks for document %s", len(chunks), doc_id)

    def remove_documents(self, doc_id: str) -> None:
        """Remove a document from the store."""
        self._documents.pop(doc_id, None)
        self._rebuild_index()

    def search(self, query: str, k: int = 5) -> List[dict]:
        """
        Return the top-*k* chunks most relevant to *query*.

        Each result is a dict with keys: doc_id, chunk_index, chunk, score.
        """
        if not self._all_chunks:
            return []

        query_tokens = self._tokenize(query)
        if not query_tokens:
            return []

        scored: list[tuple[float, str, int, str]] = []

        for doc_id, chunk_idx, chunk_text in self._all_chunks:
            score = self._score(query_tokens, chunk_text)
            if score > 0:
                scored.append((score, doc_id, chunk_idx, chunk_text))

        # Sort descending by score
        scored.sort(key=lambda x: x[0], reverse=True)

        results: list[dict] = []
        for score, doc_id, chunk_idx, chunk_text in scored[:k]:
            results.append(
                {
                    "doc_id": doc_id,
                    "chunk_index": chunk_idx,
                    "chunk": chunk_text,
                    "score": round(score, 4),
                }
            )
        return results

    # ------------------------------------------------------------------
    # Internals
    # ------------------------------------------------------------------

    def _rebuild_index(self) -> None:
        """Rebuild the flat chunk list and IDF dictionary."""
        self._all_chunks = []
        doc_freq: Counter[str] = Counter()

        for doc_id, chunks in self._documents.items():
            for idx, chunk in enumerate(chunks):
                self._all_chunks.append((doc_id, idx, chunk))
                tokens = set(self._tokenize(chunk))
                for token in tokens:
                    doc_freq[token] += 1

        num_docs = len(self._all_chunks) or 1
        self._idf = {
            token: math.log(num_docs / (1 + freq))
            for token, freq in doc_freq.items()
        }

    def _score(self, query_tokens: list[str], chunk_text: str) -> float:
        """Compute a TF-IDF-like relevance score for a chunk against query tokens."""
        chunk_tokens = self._tokenize(chunk_text)
        if not chunk_tokens:
            return 0.0

        tf = Counter(chunk_tokens)
        total_tokens = len(chunk_tokens)
        score = 0.0

        for token in query_tokens:
            if token in tf:
                term_freq = tf[token] / total_tokens
                idf = self._idf.get(token, 0.0)
                score += term_freq * idf

        return score

    @staticmethod
    def _tokenize(text: str) -> List[str]:
        """Lowercase, strip punctuation, and split into word tokens."""
        text = text.lower()
        tokens = re.findall(r"[a-z0-9]+", text)
        # Remove very short / stop-word-like tokens
        stop = {"a", "an", "the", "is", "are", "was", "were", "it", "in", "on", "at", "to", "of", "and", "or", "for"}
        return [t for t in tokens if t not in stop and len(t) > 1]


# Module-level singleton for convenience
_store: Optional[VectorStore] = None


def get_vector_store() -> VectorStore:
    """Return the module-level VectorStore singleton."""
    global _store
    if _store is None:
      _store = VectorStore()
    return _store
