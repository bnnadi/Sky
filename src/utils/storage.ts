import AsyncStorage from '@react-native-async-storage/async-storage';
import { DashboardData, Grade, AttendanceData } from '../types';

const STORAGE_KEYS = {
  DASHBOARD: '@skyward:dashboard',
  GRADES: '@skyward:grades',
  ATTENDANCE: '@skyward:attendance',
  CACHE_TIMESTAMP: '@skyward:cache_timestamp',
} as const;

const CACHE_EXPIRY_HOURS = 24; // Cache expires after 24 hours

interface CachedData<T> {
  data: T;
  timestamp: number;
}

/**
 * Check if cached data is still valid (not expired)
 */
const isCacheValid = (timestamp: number): boolean => {
  const now = Date.now();
  const expiryTime = CACHE_EXPIRY_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
  return (now - timestamp) < expiryTime;
};

/**
 * Save dashboard data to storage
 */
export const saveDashboardData = async (data: DashboardData): Promise<void> => {
  try {
    const cached: CachedData<DashboardData> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD, JSON.stringify(cached));
  } catch (error) {
    console.error('Error saving dashboard data:', error);
  }
};

/**
 * Load dashboard data from storage
 */
export const loadDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD);
    if (!cachedString) return null;

    const cached: CachedData<DashboardData> = JSON.parse(cachedString);

    if (!isCacheValid(cached.timestamp)) {
      // Cache expired, remove it
      await AsyncStorage.removeItem(STORAGE_KEYS.DASHBOARD);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return null;
  }
};

/**
 * Save grades data to storage
 */
export const saveGradesData = async (data: Grade[]): Promise<void> => {
  try {
    const cached: CachedData<Grade[]> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(cached));
  } catch (error) {
    console.error('Error saving grades data:', error);
  }
};

/**
 * Load grades data from storage
 */
export const loadGradesData = async (): Promise<Grade[] | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(STORAGE_KEYS.GRADES);
    if (!cachedString) return null;

    const cached: CachedData<Grade[]> = JSON.parse(cachedString);

    if (!isCacheValid(cached.timestamp)) {
      // Cache expired, remove it
      await AsyncStorage.removeItem(STORAGE_KEYS.GRADES);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error loading grades data:', error);
    return null;
  }
};

/**
 * Save attendance data to storage
 */
export const saveAttendanceData = async (data: AttendanceData): Promise<void> => {
  try {
    const cached: CachedData<AttendanceData> = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(cached));
  } catch (error) {
    console.error('Error saving attendance data:', error);
  }
};

/**
 * Load attendance data from storage
 */
export const loadAttendanceData = async (): Promise<AttendanceData | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (!cachedString) return null;

    const cached: CachedData<AttendanceData> = JSON.parse(cachedString);

    if (!isCacheValid(cached.timestamp)) {
      // Cache expired, remove it
      await AsyncStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error loading attendance data:', error);
    return null;
  }
};

/**
 * Clear all cached data
 */
export const clearCache = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.DASHBOARD,
      STORAGE_KEYS.GRADES,
      STORAGE_KEYS.ATTENDANCE,
      STORAGE_KEYS.CACHE_TIMESTAMP,
    ]);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get cache timestamp for a specific data type
 */
export const getCacheTimestamp = async (key: keyof typeof STORAGE_KEYS): Promise<number | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(STORAGE_KEYS[key]);
    if (!cachedString) return null;

    const cached: CachedData<any> = JSON.parse(cachedString);
    return cached.timestamp;
  } catch (error) {
    console.error('Error getting cache timestamp:', error);
    return null;
  }
};
