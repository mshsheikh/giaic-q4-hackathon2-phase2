#!/bin/bash

# Script to run the Todo Web App frontend

echo "Starting Todo Web App Frontend..."

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run the development server
echo "Starting Next.js development server..."
npm run dev