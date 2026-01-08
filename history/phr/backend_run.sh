#!/bin/bash

# Script to run the Todo Web App backend

echo "Starting Todo Web App Backend..."

# Check if we're running on Railway (PORT environment variable exists)
if [ -n "$PORT" ]; then
    # Running on Railway - set proper Python path
    export PYTHONPATH="/app:$PYTHONPATH"
    WORKING_DIR="/app/backend"
else
    # Running locally
    WORKING_DIR="."
    export PYTHONPATH=".:$PYTHONPATH"
fi

# Change to working directory
cd $WORKING_DIR

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
if [ -n "$PORT" ]; then
    # On Railway, don't use --reload for production
    uvicorn main:app --host 0.0.0.0 --port $PORT
else
    # Locally, use reload for development
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
fi