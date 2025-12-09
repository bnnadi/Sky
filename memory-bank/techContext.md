# Technical Context: Skyward UX Demo App

## Technology Stack

### Core Framework
- **React Native**: 0.72.17 - Cross-platform mobile framework
- **Expo**: 54.0.27 - Development platform and tooling
- **TypeScript**: 5.1.3 - Type safety and developer experience

### Styling
- **NativeWind**: 2.0.11 - TailwindCSS for React Native
- **TailwindCSS**: 3.3.2 - Utility-first CSS framework

### State Management
- **Zustand**: 4.4.1 - Lightweight state management library

### Navigation
- **React Navigation**:
  - `@react-navigation/native`: 6.1.7
  - `@react-navigation/bottom-tabs`: 6.5.8
  - `@react-navigation/stack`: 6.3.17

### UI Libraries
- **react-native-safe-area-context**: 4.6.3 - Safe area handling
- **react-native-screens**: 3.22.0 - Native screen components
- **react-native-svg**: 13.9.0 - SVG rendering for charts
- **react-native-vector-icons**: 10.0.0 - Icon library
- **expo-status-bar**: 1.6.0 - Status bar management

### Development Tools
- **@babel/core**: 7.20.0 - JavaScript compiler
- **@types/react**: 18.2.14 - TypeScript definitions
- **@types/react-native**: 0.72.2 - TypeScript definitions

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Studio (for Android)

### Available Scripts
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser

### Project Structure
```
/src
  /screens          # Main app screens
    DashboardScreen.tsx
    GradesScreen.tsx
    AttendanceScreen.tsx
  /components       # Reusable UI components
    Card.tsx
    GradeItem.tsx
    AttendanceChart.tsx
    SkeletonCard.tsx
  /data            # Mock data files (JSON)
    mockDashboard.json
    mockGrades.json
    mockAttendance.json
  /store           # State management (Zustand)
    useAppStore.ts
  /types           # TypeScript type definitions
    index.ts
  /navigation      # Navigation configuration
    AppNavigator.tsx
  /theme           # Design system
    colors.ts
  /utils           # Utility functions
    grades.ts
```

## Technical Constraints
- **Expo Managed Workflow**: Limited to Expo-compatible libraries
- **No Native Modules**: Must use Expo-compatible packages
- **Mock Data Only**: No API calls, all data from local JSON files
- **TypeScript Strict**: Type safety enforced throughout

## Configuration Files
- `app.json` - Expo app configuration
- `babel.config.js` - Babel transpilation config
- `tailwind.config.js` - TailwindCSS configuration
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and scripts

## Build & Deployment
- Uses Expo's build system
- Can build for iOS, Android, and Web
- Can test with Expo Go app on physical devices
- Production builds via `expo build:android` or `expo build:ios`

## Dependencies Management
- Uses npm (package-lock.json present)
- All dependencies are production-ready versions
- No experimental or beta packages
