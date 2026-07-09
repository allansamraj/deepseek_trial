"""
Application configuration using Pydantic BaseSettings.
Loads settings from environment variables and .env file.
"""

import functools
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    openrouter_api_key: str = ""
    openrouter_model: str = "deepseek/deepseek-chat-v3-0324"
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    upload_dir: str = "./uploads"
    data_dir: str = "./data"
    chunk_size: int = 1000
    chunk_overlap: int = 200

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


@functools.lru_cache()
def get_settings() -> Settings:
    """Return cached application settings singleton."""
    return Settings()
