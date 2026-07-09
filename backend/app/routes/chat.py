"""
Chat endpoint with streaming support via SSE.
Supports both live OpenRouter completions and demo mode fallback.
"""

import json
import logging

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.config import Settings, get_settings
from app.models.chat import ChatRequest
from app.services.ai_service import AIService

logger = logging.getLogger(__name__)

router = APIRouter()

SYSTEM_PROMPT = (
    "You are DeepSeek, an AI knowledge assistant for enterprise. "
    "You help employees find information from company documents. "
    "Be professional, accurate, and cite sources when possible."
)


@router.post("/chat")
async def chat(request: ChatRequest, settings: Settings = Depends(get_settings)):
    """
    Process a chat message and return a streaming SSE response.
    Falls back to demo mode when no API key is configured.
    """
    try:
        ai_service = AIService(settings)

        # Build the messages array for the LLM
        messages: list[dict] = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Append conversation history
        for msg in request.history:
            messages.append({"role": msg.role, "content": msg.content})

        # Append the current user message
        messages.append({"role": "user", "content": request.message})

        # Determine which model to use
        model = request.model or settings.openrouter_model

        # Check if a valid API key is available
        has_key = bool(
            settings.openrouter_api_key
            and settings.openrouter_api_key != "your_openrouter_api_key_here"
        )

        if has_key:
            # Stream from OpenRouter
            return StreamingResponse(
                ai_service.stream_chat(messages, model=model),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",
                },
            )
        else:
            # Demo mode — stream a canned response
            demo_content = ai_service.get_demo_response(request.message)
            return StreamingResponse(
                ai_service.demo_stream(demo_content),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",
                },
            )

    except Exception as exc:
        logger.exception("Chat endpoint error")
        error_payload = json.dumps(
            {"choices": [{"delta": {"content": f"Error: {exc}"}}]}
        )

        async def _error_stream():
            yield f"data: {error_payload}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            _error_stream(),
            media_type="text/event-stream",
        )
