#!/bin/bash

# Script to run the complete Todo Web App (both frontend and backend)

echo "Starting Todo Web App..."

# Function to run backend
run_backend() {
    cd backend
    echo "Starting backend server..."
    ./run.sh
}

# Function to run frontend
run_frontend() {
    cd frontend
    echo "Starting frontend server..."
    ./run.sh
}

# Check if we should run both or just one
if [ "$1" = "backend" ]; then
    echo "Running only backend..."
    run_backend
elif [ "$1" = "frontend" ]; then
    echo "Running only frontend..."
    run_frontend
else
    echo "Running both frontend and backend..."

    # Start backend in background
    echo "Starting backend server in background..."
    cd backend
    ./run.sh &
    BACKEND_PID=$!
    cd ..

    # Wait a moment for backend to start
    sleep 3

    # Start frontend
    echo "Starting frontend server..."
    cd frontend
    ./run.sh

    # When frontend stops, kill backend
    kill $BACKEND_PID 2>/dev/null
fi