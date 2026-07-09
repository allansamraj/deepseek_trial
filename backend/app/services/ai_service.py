"""
AI Service — handles communication with the OpenRouter API for LLM completions.
Supports live streaming and a demo fallback mode.
"""

import asyncio
import json
import logging
from typing import AsyncGenerator, List, Optional

import httpx

from app.config import Settings

logger = logging.getLogger(__name__)


class AIService:
    """Manages AI chat completions via OpenRouter with streaming support."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client = httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=10.0))

    # ------------------------------------------------------------------
    # Live streaming via OpenRouter
    # ------------------------------------------------------------------

    async def stream_chat(
        self,
        messages: List[dict],
        model: Optional[str] = None,
    ) -> AsyncGenerator[str, None]:
        """
        Stream chat completion tokens from OpenRouter as SSE events.

        Yields lines in the format:
            data: {"choices":[{"delta":{"content":"..."}}]}
        Terminated by:
            data: [DONE]
        """
        target_model = model or self.settings.openrouter_model
        url = f"{self.settings.openrouter_base_url}/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.settings.openrouter_api_key}",
            "Content-Type": "application/json",
            "X-Title": "DeepSeek",
            "HTTP-Referer": "https://deepseek.app",
        }

        payload = {
            "model": target_model,
            "messages": messages,
            "stream": True,
            "temperature": 0.7,
        }

        try:
            async with self.client.stream(
                "POST", url, json=payload, headers=headers
            ) as response:
                if response.status_code != 200:
                    body = await response.aread()
                    error_msg = f"OpenRouter API error ({response.status_code}): {body.decode(errors='replace')}"
                    logger.error(error_msg)
                    error_payload = json.dumps(
                        {"choices": [{"delta": {"content": error_msg}}]}
                    )
                    yield f"data: {error_payload}\n\n"
                    yield "data: [DONE]\n\n"
                    return

                async for line in response.aiter_lines():
                    line = line.strip()
                    if not line:
                        continue
                    # Forward SSE lines directly
                    if line.startswith("data: "):
                        yield f"{line}\n\n"
                        if line == "data: [DONE]":
                            return
                    else:
                        # Some providers send raw JSON without the "data: " prefix
                        yield f"data: {line}\n\n"

            # Ensure we always send a DONE signal
            yield "data: [DONE]\n\n"

        except httpx.HTTPError as exc:
            logger.exception("HTTP error during streaming")
            error_payload = json.dumps(
                {"choices": [{"delta": {"content": f"Connection error: {exc}"}}]}
            )
            yield f"data: {error_payload}\n\n"
            yield "data: [DONE]\n\n"

        except Exception as exc:
            logger.exception("Unexpected error during streaming")
            error_payload = json.dumps(
                {"choices": [{"delta": {"content": f"Unexpected error: {exc}"}}]}
            )
            yield f"data: {error_payload}\n\n"
            yield "data: [DONE]\n\n"

    # ------------------------------------------------------------------
    # Demo mode
    # ------------------------------------------------------------------

    async def demo_stream(self, content: str) -> AsyncGenerator[str, None]:
        """
        Simulate a streaming response by emitting one character at a time.
        Useful for demos when no API key is configured.
        """
        for char in content:
            chunk = json.dumps({"choices": [{"delta": {"content": char}}]})
            yield f"data: {chunk}\n\n"
            await asyncio.sleep(0.02)  # 20 ms per character

        yield "data: [DONE]\n\n"

    @staticmethod
    def get_demo_response(query: str) -> str:
        """
        Return a contextual demo response based on keyword detection in the
        user's query. Provides realistic-looking answers for common topics.
        """
        query_lower = query.lower()

        if any(kw in query_lower for kw in ("leave", "vacation", "pto", "time off")):
            return (
                "## Leave Policy Summary\n\n"
                "Based on the company's leave policy document:\n\n"
                "- **Annual Leave**: Full-time employees receive 20 days of paid annual leave per year.\n"
                "- **Sick Leave**: 10 days of paid sick leave, with a doctor's note required after 3 consecutive days.\n"
                "- **Personal Leave**: 5 days of personal leave for family emergencies or personal matters.\n"
                "- **Parental Leave**: 12 weeks paid parental leave for primary caregivers, 4 weeks for secondary.\n\n"
                "Leave requests should be submitted via the HR portal at least 2 weeks in advance for planned absences.\n\n"
                "*Source: Employee Handbook v3.2, Section 4.1*"
            )

        if any(kw in query_lower for kw in ("expense", "reimburse", "travel")):
            return (
                "## Expense Policy Overview\n\n"
                "Here are the key points from the expense reimbursement policy:\n\n"
                "- **Submission Deadline**: All expenses must be submitted within 30 days.\n"
                "- **Approval Thresholds**:\n"
                "  - Under $100: Auto-approved\n"
                "  - $100–$1,000: Manager approval\n"
                "  - Over $1,000: VP approval required\n"
                "- **Travel Meals**: Up to $75/day domestic, $100/day international.\n"
                "- **Mileage**: $0.67/mile for personal vehicle use on company business.\n\n"
                "Submit all receipts through the ExpenseTrack system.\n\n"
                "*Source: Finance Policy Manual, Chapter 7*"
            )

        if any(kw in query_lower for kw in ("security", "password", "data", "privacy")):
            return (
                "## IT Security Guidelines\n\n"
                "Key security requirements for all employees:\n\n"
                "1. **Passwords**: Minimum 12 characters, include uppercase, lowercase, numbers, and symbols. Rotate every 90 days.\n"
                "2. **MFA**: Multi-factor authentication is mandatory for all company systems.\n"
                "3. **Data Classification**: Confidential data must be encrypted at rest and in transit.\n"
                "4. **Clean Desk Policy**: Lock your workstation when away; never leave sensitive documents unattended.\n"
                "5. **Incident Reporting**: Report suspicious activity to security@company.com immediately.\n\n"
                "*Source: IT Security Policy v2.1*"
            )

        if any(kw in query_lower for kw in ("onboard", "new hire", "orientation", "first day")):
            return (
                "## Onboarding Process\n\n"
                "Welcome! Here's what to expect during your first week:\n\n"
                "**Day 1**: Badge pickup, IT setup, HR orientation, team intro.\n"
                "**Day 2–3**: System access training, compliance modules, buddy assignment.\n"
                "**Day 4–5**: Role-specific training, meet your skip-level manager.\n\n"
                "**Required Documents**: Government ID, signed offer letter, tax forms, direct-deposit info.\n\n"
                "Your onboarding buddy will be your go-to resource for the first 30 days.\n\n"
                "*Source: HR Onboarding Playbook, 2024 Edition*"
            )

        # Default / generic response
        return (
            "## DeepSeek Knowledge Assistant\n\n"
            "I'm your AI-powered knowledge assistant. I can help you find information across the company's document library.\n\n"
            "Here are some things you can ask me about:\n\n"
            "- 📋 **Company Policies** — leave, expenses, code of conduct\n"
            "- 🔒 **IT & Security** — password policies, data handling, incident response\n"
            "- 👋 **Onboarding** — new hire process, orientation schedule\n"
            "- 📊 **Reports & Analytics** — quarterly results, KPIs\n"
            "- 📚 **Training** — available courses, certification paths\n\n"
            "Upload documents to the knowledge base and I'll use them to provide accurate, cited answers.\n\n"
            "*Running in demo mode — connect an OpenRouter API key for full AI capabilities.*"
        )
