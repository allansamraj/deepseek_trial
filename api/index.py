import os
import sys

# Add the backend folder to the system path so imports resolve correctly
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from backend.main import app

# Vercel needs the app handler
handler = app
