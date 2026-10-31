@echo off
setlocal
cd /d "%~dp0"

echo ====================================================================
echo  Jasvi Industries - Dynamic 3D User Showcase Preview
echo ====================================================================
echo Starting high-speed local HTTP preview server on http://localhost:8089 ...
echo Press Ctrl+C in this console when you want to stop the server.
echo.

start "" "http://localhost:8089/index.html"
python -m http.server 8089

exit /b 0
