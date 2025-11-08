@echo off
REM Local Development Setup Script for Windows

echo Setting up local development environment...

REM Check if .env file exists
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo .env file created!
    echo.
    echo IMPORTANT: Edit .env file and add your actual API keys!
    echo.
) else (
    echo .env file already exists
)

REM Create a local version with injected keys
echo Creating local development version...

REM Backup original
copy index.html index.html.backup

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    node inject-env.js
    echo API keys injected for local development!
    echo.
    echo You can now open index.html in your browser
) else (
    echo Node.js not found. Please install Node.js or manually update API keys in index.html
)

pause
