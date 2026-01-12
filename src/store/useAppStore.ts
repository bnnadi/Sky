import { create } from 'zustand';
import { DashboardData, Grade, AttendanceData } from '../types';
import { ErrorType } from '../components/ErrorDisplay';

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  route: string;
  category?: string;
}

export interface ErrorState {
  message: string;
  type: ErrorType;
}

interface AppState {
  dashboardData: DashboardData | null;
  gradesData: Grade[];
  attendanceData: AttendanceData | null;
  studentData: null;
  isLoading: boolean;
  error: ErrorState | null;
  favorites: string[]; // Array of menu item IDs
  recentItems: MenuItem[]; // Array of recently accessed menu items
  setDashboardData: (data: DashboardData) => void;
  setGradesData: (data: Grade[]) => void;
  setAttendanceData: (data: AttendanceData) => void;
  setStudentData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: ErrorState | null) => void;
  clearError: () => void;
  addFavorite: (itemId: string) => void;
  removeFavorite: (itemId: string) => void;
  addRecentItem: (item: MenuItem) => void;
  clearRecentItems: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  dashboardData: null,
  gradesData: [],
  attendanceData: null,
  studentData: null,
  isLoading: false,
  error: null,
  favorites: [],
  recentItems: [],
  setDashboardData: (data) => set({ dashboardData: data, error: null }),
  setGradesData: (data) => set({ gradesData: data, error: null }),
  setAttendanceData: (data) => set({ attendanceData: data, error: null }),
  setStudentData: (data) => set({ studentData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  addFavorite: (itemId) => set((state) => ({
    favorites: state.favorites.includes(itemId) ? state.favorites : [...state.favorites, itemId]
  })),
  removeFavorite: (itemId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== itemId)
  })),
  addRecentItem: (item) => set((state) => {
    const filtered = state.recentItems.filter(i => i.id !== item.id);
    return { recentItems: [item, ...filtered].slice(0, 10) }; // Keep last 10
  }),
  clearRecentItems: () => set({ recentItems: [] }),
}));






