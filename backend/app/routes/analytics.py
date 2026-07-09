"""
Analytics dashboard endpoint returning aggregated platform statistics.
Provides mock data suitable for dashboard visualisation.
"""

import logging

from fastapi import APIRouter, Depends

from app.config import Settings, get_settings
from app.routes.documents import load_documents

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/analytics/dashboard")
async def dashboard(settings: Settings = Depends(get_settings)):
    """
    Return dashboard analytics including document count, query volume,
    weekly activity breakdown, knowledge gaps, and recent activity feed.
    """
    documents = load_documents(settings)

    return {
        "total_documents": len(documents),
        "total_queries": 1284,
        "active_users": 342,
        "knowledge_score": 87,
        "weekly_activity": [
            {"name": "Mon", "queries": 420, "docs": 24},
            {"name": "Tue", "queries": 380, "docs": 18},
            {"name": "Wed", "queries": 510, "docs": 32},
            {"name": "Thu", "queries": 460, "docs": 28},
            {"name": "Fri", "queries": 390, "docs": 15},
            {"name": "Sat", "queries": 180, "docs": 8},
            {"name": "Sun", "queries": 120, "docs": 5},
        ],
        "top_gaps": [
            {"topic": "Work From Home Policy", "searches": 72},
            {"topic": "Remote Expense Guidelines", "searches": 45},
            {"topic": "Contractor Onboarding", "searches": 38},
            {"topic": "Data Retention Policy", "searches": 31},
            {"topic": "Equipment Return Process", "searches": 24},
        ],
        "recent_activity": [
            {
                "type": "upload",
                "description": "Q3 Revenue Report uploaded",
                "time": "2 hours ago",
            },
            {
                "type": "query",
                "description": "AI query: Leave policy",
                "time": "3 hours ago",
            },
            {
                "type": "upload",
                "description": "IT Security Policy updated",
                "time": "5 hours ago",
            },
        ],
    }
