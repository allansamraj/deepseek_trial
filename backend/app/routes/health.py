"""
Health check and AI status endpoints.
"""

from fastapi import APIRouter, Depends

from app.config import Settings, get_settings

router = APIRouter()


@router.get("/health")
async def health_check():
    """Basic health check returning service status."""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "DeepSeek API",
    }


@router.get("/status")
async def ai_status(settings: Settings = Depends(get_settings)):
    """Check AI connectivity status and current model configuration."""
    has_key = bool(
        settings.openrouter_api_key
        and settings.openrouter_api_key != "your_openrouter_api_key_here"
    )
    return {
        "ai_connected": has_key,
        "model": settings.openrouter_model,
        "status": "connected" if has_key else "demo_mode",
        "message": (
            "OpenRouter connected"
            if has_key
            else "Running in demo mode. Configure API key in settings."
        ),
    }
