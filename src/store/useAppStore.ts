import { create } from 'zustand';
import { DashboardData, Grade, AttendanceData } from '../types';

interface AppState {
  dashboardData: DashboardData | null;
  gradesData: Grade[];
  attendanceData: AttendanceData | null;
  isLoading: boolean;
  setDashboardData: (data: DashboardData) => void;
  setGradesData: (data: Grade[]) => void;
  setAttendanceData: (data: AttendanceData) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  dashboardData: null,
  gradesData: [],
  attendanceData: null,
  isLoading: false,
  setDashboardData: (data) => set({ dashboardData: data }),
  setGradesData: (data) => set({ gradesData: data }),
  setAttendanceData: (data) => set({ attendanceData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
}));






