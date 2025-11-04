#!/bin/bash

# Fund Me DApp Setup Script

echo "====================================="
echo "    Fund Me DApp Setup Script"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Error: Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js is installed (Version: $(node --version))"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "Error: npm not found. Please install npm first."
    exit 1
fi

echo "✓ npm is installed (Version: $(npm --version))"

# Install project dependencies
echo "Installing project dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Dependency installation failed."
    exit 1
fi

echo "✓ Dependencies installed successfully"

# Build project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "Warning: Project build failed, but it won't affect the development server."
else
    echo "✓ Project built successfully"
fi

echo ""
echo "====================================="
echo "    Setup Complete!"
echo "====================================="
echo "Start development server: npm run dev"
echo "Access URL: http://localhost:3000"
echo "Build for production: npm run build"
echo "Start production server: npm start"
echo ""