#!/bin/bash

echo "🔬 Hojan Science Forum - Quick Installation Script"
echo "================================================"
echo ""

# Check if Metro is already running
if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Metro bundler is already running on port 8081"
else
    echo "🚀 Starting Metro bundler..."
    echo "Keep this terminal window open during development!"
    echo ""
    
    # Start Metro in background
    npm start &
    METRO_PID=$!
    
    echo "Metro started with PID: $METRO_PID"
    echo "Wait 10 seconds for Metro to fully start..."
    sleep 10
fi

echo ""
echo "📱 Choose installation method:"
echo "1) Android (Debug APK - Fast)"
echo "2) iOS Simulator (Fast)" 
echo "3) Both platforms"
echo "4) Exit"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "🤖 Installing Android debug version..."
        echo "Make sure you have:"
        echo "- Android device connected with USB debugging enabled, OR"
        echo "- Android emulator running"
        echo ""
        read -p "Press Enter when ready..."
        npx react-native run-android
        ;;
    2)
        echo "📱 Installing iOS simulator version..."
        npx react-native run-ios --simulator="iPhone 14"
        ;;
    3)
        echo "🚀 Installing both platforms..."
        echo "Starting with iOS simulator..."
        npx react-native run-ios --simulator="iPhone 14" &
        
        echo "Now installing Android..."
        sleep 5
        npx react-native run-android
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎉 Your Hojan Science Forum app features:"
echo "   ✅ Guest login with language selection"
echo "   ✅ Complete 4-day conference program"  
echo "   ✅ Multilingual support (EN, Kurdish Sorani, Kurdish Kurmanji)"
echo "   ✅ Speaker directory and profiles"
echo "   ✅ Modern Material Design UI"
echo "   ✅ Resources and career development section"
echo ""
echo "📝 To test guest login:"
echo "   1. Select your preferred language"
echo "   2. Tap 'Continue as Guest'"
echo "   3. Explore the conference program!"
echo ""
