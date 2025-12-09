# Skyward UX Demo App

A modern, user-friendly React Native demo app recreating key Skyward mobile screens (Dashboard, Grades, Attendance) for UI/UX demonstration purposes.

## 🎯 Features

- **Dashboard Screen**: Student profile, GPA summary, attendance percentage, and quick links
- **Grades Screen**: Subject list with color-coded grades, sorting, and filtering
- **Attendance Screen**: Interactive charts, monthly trends, and absence tracking
- **Modern UI**: Clean design with TailwindCSS styling and smooth animations
- **Mock Data**: Local JSON files with realistic student data (no real data handling)

## 🛠 Tech Stack

- **Framework**: React Native + Expo
- **Language**: TypeScript
- **Styling**: TailwindCSS (via NativeWind)
- **State Management**: Zustand
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Charts**: React Native SVG

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skyward-ux-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

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
  /data            # Mock data files
    mockDashboard.json
    mockGrades.json
    mockAttendance.json
  /store           # State management
    useAppStore.ts
  /types           # TypeScript type definitions
    index.ts
  /navigation      # Navigation configuration
    AppNavigator.tsx
```

## 🎨 Design System

- **Primary Color**: #1E3A8A (blue-700)
- **Accent Color**: #3B82F6 (blue-500)
- **Background**: #F3F4F6 (gray-100)
- **Text**: #111827 (gray-900)
- **Cards**: White with soft shadows and rounded corners

## 🔒 Security & Ethics

- **No Real Data**: This app uses only mock data and does not connect to real Skyward APIs
- **Local Storage**: All data is stored locally in JSON files
- **Demo Purpose**: Designed purely for UI/UX demonstration and redesign showcase
- **Privacy First**: No student data is processed or transmitted

## 📊 Mock Data

The app includes realistic mock data for:
- Student profile information
- Grade records across multiple subjects
- Attendance tracking with trends
- Recent activity and announcements

## 🎯 Key Features

### Dashboard
- Personalized welcome message
- GPA and attendance summary cards
- Quick stats overview
- Recent activity feed
- Pull-to-refresh functionality

### Grades
- Color-coded grade display (A=green, B=yellow, C/D/F=red)
- Search and filter capabilities
- Sort by subject, grade, or percentage
- GPA calculation
- Teacher information display

### Attendance
- Interactive donut chart visualization
- Monthly trend bar chart
- Summary statistics
- Recent absences list
- Quick action buttons

## 🚀 Deployment

### Building for Production

1. **Android APK**:
```bash
expo build:android
```

2. **iOS App**:
```bash
expo build:ios
```

3. **Web App**:
```bash
expo build:web
```

### Expo Go App

You can also test the app using the Expo Go app:
1. Install Expo Go on your mobile device
2. Run `npm start` and scan the QR code
3. The app will load directly on your device

## 🔮 Future Enhancements

- Light/dark mode toggle
- Pull-to-refresh animations
- GPA trend progress bars
- Accessibility improvements (voice-over labels)
- Additional chart types
- Offline data persistence

## 📝 License

This project is for demonstration purposes only. Please ensure compliance with Skyward's terms of service and data privacy regulations when using this as a reference for actual implementations.

## 🤝 Contributing

This is a demo project, but suggestions and improvements are welcome! Please ensure any contributions maintain the mock data approach and do not introduce real data handling.

---

**Note**: This app is designed as a UI/UX demonstration and does not handle real student data. Always follow proper security practices and data privacy regulations when working with actual student information systems.






