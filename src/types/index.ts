export interface Student {
  name: string;
  grade: string;
  avatar: string;
  gpa: number;
  attendancePercentage: number;
}

export interface QuickStats {
  totalClasses: number;
  upcomingAssignments: number;
  recentAnnouncements: number;
}

export interface RecentActivity {
  type: 'grade' | 'attendance' | 'announcement';
  subject: string;
  message: string;
  timestamp: string;
}

export interface DashboardData {
  student: Student;
  quickStats: QuickStats;
  recentActivity: RecentActivity[];
}

export interface Grade {
  id: string;
  subject: string;
  teacher: string;
  grade: string;
  percentage: number;
  semester: string;
  lastUpdated: string;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  totalDays: number;
  attendancePercentage: number;
}

export interface MonthlyTrend {
  month: string;
  percentage: number;
}

export interface RecentAbsence {
  date: string;
  subject: string;
  reason: string;
  excused: boolean;
}

export interface AttendanceData {
  summary: AttendanceSummary;
  monthlyTrend: MonthlyTrend[];
  recentAbsences: RecentAbsence[];
  trendMessage: string;
}

export type RootStackParamList = {
  Main: undefined;
  Dashboard: undefined;
  Grades: undefined;
  Attendance: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Grades: undefined;
  Attendance: undefined;
};






