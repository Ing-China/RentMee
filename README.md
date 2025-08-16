# RentMee 🏠

A modern React Native rental property management application built with Expo. Manage your rental properties, tenants, and finances all in one place.

## ✨ Features

- **🔐 Authentication System** - Secure login with form validation
- **🏠 Property Management** - Manage multiple rental properties
- **👥 Tenant Management** - Track tenant information and leases
- **💰 Financial Tracking** - Monitor income, expenses, and financial reports
- **📊 Dashboard** - Overview of your rental portfolio
- **🌙 Dark/Light Mode** - Customizable theme preferences
- **🌍 Internationalization** - Multi-language support (English/Khmer)
- **📱 Cross-Platform** - iOS, Android, and Web support

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom themed components with dark/light mode
- **Internationalization**: Lingui for multi-language support
- **State Management**: React Context API
- **Storage**: AsyncStorage for local data persistence
- **Typography**: Kantumruy Pro & Roboto fonts

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rentmee
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web
   - Scan QR code with Expo Go app on your device

## 📱 App Structure

```
app/
├── (auth)/          # Authentication screens
│   └── login.tsx    # Login screen
├── (tabs)/          # Main app tabs
│   ├── dashboard/   # Dashboard screens
│   ├── properties/  # Property management
│   ├── tenants/     # Tenant management
│   ├── finances/    # Financial tracking
│   └── settings/    # App settings
└── _layout.tsx      # Root layout
```

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start on Web
- `npm run lint` - Run ESLint
- `npm run extract` - Extract translation strings
- `npm run compile` - Compile translations

## 🌐 Internationalization

The app supports multiple languages using Lingui:

- **English (en)** - Default language
- **Khmer (km)** - Cambodian language support

To add new translations:

1. Wrap text with `t` macro: `t\`Your text here\``
2. Run `npm run extract` to extract strings
3. Update translation files in `locales/`
4. Run `npm run compile` to compile translations

## 🎨 Theming

The app features a comprehensive theming system:

- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes for night use
- **Themed Components** - All UI components adapt to the current theme
- **Color Consistency** - Unified color palette across the app

## 📂 Key Directories

- `components/` - Reusable UI components
- `contexts/` - React Context providers (Auth, Theme, I18n)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and helpers
- `constants/` - App constants and configurations
- `assets/` - Images, fonts, and other assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, contact @Ing_China on Telegram.

---

Built with ❤️ using React Native and Expo
