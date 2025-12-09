# System Patterns: Skyward UX Demo App

## Architecture Overview
The app follows a **component-based architecture** with clear separation of concerns:
- **Screens**: Top-level page components
- **Components**: Reusable UI elements
- **Store**: Global state management (Zustand)
- **Navigation**: Stack + Bottom Tab navigation
- **Data**: Local JSON mock data files

## Design Patterns

### 1. State Management Pattern
**Zustand Store** (`useAppStore.ts`):
- Centralized state for dashboard, grades, and attendance data
- Simple setter functions for updating state
- Loading state management
- No complex middleware or reducers needed

```typescript
interface AppState {
  dashboardData: DashboardData | null;
  gradesData: Grade[];
  attendanceData: AttendanceData | null;
  isLoading: boolean;
  // Setters...
}
```

### 2. Navigation Pattern
**Hybrid Navigation**:
- **Stack Navigator**: Root navigation container
- **Bottom Tab Navigator**: Main app navigation (Dashboard, Grades, Attendance)
- Custom tab icons using emoji (can be replaced with vector icons)
- No headers shown (custom headers in screens)

### 3. Component Pattern
**Card-Based UI**:
- Reusable `Card` component for consistent styling
- All major content sections use Card wrapper
- Consistent padding, shadows, and rounded corners

**Screen Structure**:
- Each screen follows similar pattern:
  1. Load data from store or mock JSON
  2. Show loading state if needed
  3. Render ScrollView with content
  4. Use Card components for sections

### 4. Data Loading Pattern
**Mock Data Loading**:
- Screens load data from JSON files in `src/data/`
- Simulated loading delay (1 second) for realistic UX
- Data stored in Zustand store after loading
- Pull-to-refresh support on Dashboard

### 5. Type Safety Pattern
**TypeScript Types**:
- All data structures defined in `src/types/index.ts`
- Strong typing for navigation params
- Type-safe store interface
- No `any` types used

## Component Relationships

```
App.tsx
  └── AppNavigator
      └── Stack.Navigator
          └── TabNavigator
              ├── DashboardScreen
              │   ├── Card
              │   └── useAppStore
              ├── GradesScreen
              │   ├── GradeItem
              │   ├── Card
              │   └── useAppStore
              └── AttendanceScreen
                  ├── AttendanceChart
                  ├── Card
                  └── useAppStore
```

## Key Technical Decisions

### 1. Zustand over Redux
- **Reason**: Simpler API, less boilerplate
- **Benefit**: Easier to maintain for small app

### 2. NativeWind (TailwindCSS)
- **Reason**: Utility-first styling, faster development
- **Benefit**: Consistent design system, less custom CSS

### 3. Bottom Tab Navigation
- **Reason**: Standard mobile pattern for main navigation
- **Benefit**: Familiar UX, easy access to all screens

### 4. Mock Data in JSON
- **Reason**: No backend needed for demo
- **Benefit**: Fast development, no API complexity

### 5. TypeScript Throughout
- **Reason**: Type safety and better DX
- **Benefit**: Catch errors early, better IDE support

## Styling Patterns

### Color System
- Defined in `src/theme/colors.ts`
- Consistent color usage across app:
  - Primary: `#1E3A8A` (blue-700)
  - Success: `#10B981` (green-500)
  - Warning: `#F59E0B` (yellow-500)
  - Error: `#EF4444` (red-500)

### Utility Functions
- `getGradeColor()` in `src/utils/grades.ts`
- Maps letter grades to colors
- Used consistently across Grades screen

## Data Flow

1. **App Launch** → AppNavigator initializes
2. **Screen Mount** → Screen component mounts
3. **Data Load** → useEffect loads mock data
4. **Store Update** → Data stored in Zustand
5. **UI Render** → Component re-renders with data
6. **User Interaction** → Actions update store or navigate

## Future Pattern Considerations
- **Error Boundaries**: Add error handling for failed data loads
- **Loading Skeletons**: Replace simple "Loading..." with SkeletonCard
- **Theme System**: Expand colors.ts into full theme system
- **API Layer**: If real API needed, add service layer abstraction
