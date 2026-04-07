@echo off
echo Starting JSON Server...
echo ========================
echo JSON Server will run on http://localhost:3001
echo API endpoints:
echo   GET  http://localhost:3001/comments
echo   POST http://localhost:3001/comments
echo.
echo Press Ctrl+C to stop the server
echo ========================

json-server --watch db.json --port 3001
