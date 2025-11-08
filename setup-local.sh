#!/bin/bash

# Local Development Setup Script
echo "🔧 Setting up local development environment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your actual API keys!"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Create a local version with hardcoded keys for development
echo "🔨 Creating local development version..."

# Backup original
cp index.html index.html.backup

# Read .env file and inject keys
if command -v node &> /dev/null; then
    node inject-env.js
    echo "✅ API keys injected for local development!"
    echo ""
    echo "🌐 You can now open index.html in your browser"
else
    echo "⚠️  Node.js not found. Please install Node.js or manually update API keys in index.html"
fi
