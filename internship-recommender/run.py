#!/usr/bin/env python3
"""
AI-Based Internship Recommendation Engine
Smart India Hackathon 2025 - Team TechNoob

To run the application:
1. Install requirements: pip install -r requirements.txt
2. Run: python run.py
3. Open browser: http://localhost:5000
"""

from app import app

if __name__ == '__main__':
    print("=" * 60)
    print("AI-Based Internship Recommendation Engine")
    print("Smart India Hackathon 2025 - Team TechNoob")
    print("=" * 60)
    print("Starting server on http://localhost:5000")
    print("Press Ctrl+C to stop")
    print("=" * 60)

    app.run(debug=True, host='0.0.0.0', port=5000)
