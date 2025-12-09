#!/bin/bash

echo "🚀 Setting up Skyward UX Demo App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if Expo CLI is installed globally
if ! command -v expo &> /dev/null; then
    echo "📱 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

echo "✅ Dependencies installed successfully!"

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   npm start    - Start the development server"
echo "   npm run ios  - Run on iOS simulator"
echo "   npm run android - Run on Android emulator"
echo "   npm run web  - Run in web browser"
echo ""
echo "📱 Or scan the QR code with Expo Go app on your mobile device"
echo ""
echo "🔒 Remember: This is a demo app with mock data only!"






