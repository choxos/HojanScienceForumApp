# 🔬 Hojan Science Forum Mobile App

A comprehensive cross-platform mobile application for the **1st Hojan Science Forum** built with React Native.

## ✨ Features

- **🌐 Multilingual Support**: English, Kurdish Sorani, Kurdish Kurmanji with RTL support
- **👤 Guest Access**: Explore conference program without registration
- **📅 Complete Program**: 4-day conference schedule with session details
- **👥 Speaker Directory**: Comprehensive speaker profiles and networking
- **📱 Cross-Platform**: Native iOS and Android applications
- **🎨 Modern UI**: Material Design for Android, native iOS styling
- **🔄 Offline Support**: Redux persistence for seamless experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- React Native development environment
- iOS: Xcode with iOS Simulator
- Android: Android Studio with emulator

### Installation
```bash
# Clone the repository
git clone https://github.com/choxos/HojanScienceForumApp.git
cd HojanScienceForumApp/HojanScienceForumApp

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Quick installation (both platforms)
chmod +x quick-install.sh
./quick-install.sh
```

## 📖 Documentation

- See `INSTALLATION_FILES.md` for detailed installation instructions
- Conference program data is in the `program/` folder
- Original requirements in `hojan_cursor_prompt.md`

## 🏗️ Architecture

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation v6
- **State Management**: Redux Toolkit with Redux Persist
- **Internationalization**: react-i18next with RTL support
- **Backend Ready**: Firebase integration setup
- **Real-time**: Socket.io ready for live features

## 🎯 Conference Features

- **Multi-day Schedule**: Full conference program integration
- **Speaker Profiles**: Detailed speaker information and networking
- **Live Sessions**: Real-time streaming and Q&A (authenticated users)
- **Networking**: Community features for registered attendees
- **Resources**: Conference materials and career development

## 🌍 Kurdish Language Support

This app proudly supports Kurdish languages:
- **Soranî / کوردیی سۆرانی** (Central Kurdish)
- **Kurmancî** (Northern Kurdish)
- Full RTL (Right-to-Left) text rendering support

## 📱 Supported Platforms

- **iOS**: iPhone and iPad (iOS 13+)
- **Android**: Phones and tablets (API 24+)

## 🤝 Contributing

This application was developed for the **1st Hojan Science Forum**. For contributions or issues, please contact the conference organizers.

## 📄 License

See LICENSE file for details.

---

**Built with ❤️ for the Hojan Science Community**