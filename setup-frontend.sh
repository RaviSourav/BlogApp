#!/bin/bash

echo "🚀 Setting up Blog Frontend..."

# Navigate to frontend directory
cd frontend

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Frontend setup complete!"
    echo ""
    echo "To start the development server:"
    echo "  cd frontend"
    echo "  npm start"
    echo ""
    echo "The frontend will be available at: http://localhost:3000"
    echo "Make sure your Spring Boot backend is running on: http://localhost:8080"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
