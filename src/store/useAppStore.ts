import { create } from 'zustand';
import { DashboardData, Grade, AttendanceData } from '../types';
import { ErrorType } from '../components/ErrorDisplay';
import { NetworkState } from '../utils/network';
import {
  saveDashboardData,
  loadDashboardData,
  saveGradesData,
  loadGradesData,
  saveAttendanceData,
  loadAttendanceData,
} from '../utils/storage';

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
  networkState: NetworkState;
  isOffline: boolean;
  favorites: string[]; // Array of menu item IDs
  recentItems: MenuItem[]; // Array of recently accessed menu items
  setDashboardData: (data: DashboardData) => void;
  setGradesData: (data: Grade[]) => void;
  setAttendanceData: (data: AttendanceData) => void;
  setStudentData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: ErrorState | null) => void;
  clearError: () => void;
  setNetworkState: (state: NetworkState) => void;
  loadCachedData: () => Promise<void>;
  addFavorite: (itemId: string) => void;
  removeFavorite: (itemId: string) => void;
  addRecentItem: (item: MenuItem) => void;
  clearRecentItems: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  dashboardData: null,
  gradesData: [],
  attendanceData: null,
  studentData: null,
  isLoading: false,
  error: null,
  networkState: {
    isConnected: true,
    isInternetReachable: true,
    type: null,
  },
  isOffline: false,
  favorites: [],
  recentItems: [],
  setDashboardData: async (data) => {
    set({ dashboardData: data, error: null });
    // Save to cache
    await saveDashboardData(data);
  },
  setGradesData: async (data) => {
    set({ gradesData: data, error: null });
    // Save to cache
    await saveGradesData(data);
  },
  setAttendanceData: async (data) => {
    set({ attendanceData: data, error: null });
    // Save to cache
    await saveAttendanceData(data);
  },
  setStudentData: (data) => set({ studentData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setNetworkState: (state) => set({
    networkState: state,
    isOffline: !state.isConnected || !(state.isInternetReachable ?? false),
  }),
  loadCachedData: async () => {
    try {
      // Load all cached data in parallel
      const [cachedDashboard, cachedGrades, cachedAttendance] = await Promise.all([
        loadDashboardData(),
        loadGradesData(),
        loadAttendanceData(),
      ]);

      // Update store with cached data if available
      if (cachedDashboard) {
        set({ dashboardData: cachedDashboard });
      }
      if (cachedGrades) {
        set({ gradesData: cachedGrades });
      }
      if (cachedAttendance) {
        set({ attendanceData: cachedAttendance });
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
  },
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






