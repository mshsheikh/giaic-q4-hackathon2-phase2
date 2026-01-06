#!/bin/bash

# Script to run the Todo Web App backend

echo "Starting Todo Web App Backend..."

# Check if virtual environment exists, if not create it
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if requirements.txt is newer than the installation
if [ ! -f installed ] || [ requirements.txt -nt installed ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
    touch installed
fi

# Run the application
echo "Starting server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000