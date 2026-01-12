import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Card';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { SkeletonCard } from '@/components/SkeletonCard';
import { getErrorType, getErrorMessage } from '../utils/errorHandling';
import { loadDashboardData as loadCachedDashboard } from '../utils/storage';
import { isOnline } from '../utils/network';
import mockDashboard from '../data/mockDashboard.json';
import { DashboardData } from '../types';

const loadDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mockDashboard as DashboardData);
      } catch (error) {
        reject(new Error('Failed to load dashboard data'));
      }
    }, 1000);
  });
};

export const DashboardScreen: React.FC = () => {
  const {
    dashboardData,
    setDashboardData,
    isLoading,
    setLoading,
    error,
    setError,
    clearError,
    isOffline,
    loadCachedData
  } = useAppStore();

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      clearError();

      // Check if online
      const online = await isOnline();

      // If offline and we have cached data, use it
      if (!online && !forceRefresh) {
        const cachedData = await loadCachedDashboard();
        if (cachedData) {
          setDashboardData(cachedData);
          setLoading(false);
          return;
        }
      }

      // If offline and no cache, show error
      if (!online && !forceRefresh) {
        setError({
          message: 'No internet connection and no cached data available',
          type: 'network'
        });
        setLoading(false);
        return;
      }

      // Fetch fresh data when online
      const data = await loadDashboardData();
      setDashboardData(data);
    } catch (err) {
      // If fetch fails and we're offline, try to load from cache
      if (isOffline) {
        const cachedData = await loadCachedDashboard();
        if (cachedData) {
          setDashboardData(cachedData);
          setLoading(false);
          return;
        }
      }

      setError({
        message: getErrorMessage(err, 'Failed to load dashboard data'),
        type: getErrorType(err)
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load cached data first if no data exists
    if (!dashboardData) {
      loadCachedData();
    }
    // Always try to fetch fresh data (will use cache if offline)
    fetchData();
  }, []);

  const onRefresh = () => {
    fetchData();
  };

  // Show error state if there's an error and no data
  if (error && !dashboardData && !isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ErrorDisplay
              message={error.message}
              type={error.type}
              onRetry={onRefresh}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isLoading || !dashboardData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            {/* Welcome Header Skeleton */}
            <View style={{
              backgroundColor: '#1E3A8A',
              borderRadius: 20,
              padding: 24,
              marginBottom: 20
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SkeletonCard variant="avatar" height={60} style={{ marginRight: 16 }} />
                <View style={{ flex: 1 }}>
                  <SkeletonCard variant="text" width="70%" height={24} style={{ marginBottom: 8 }} />
                  <SkeletonCard variant="text" width="50%" height={16} />
                </View>
              </View>
            </View>

            {/* Quick Stats Skeleton */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Card style={{ flex: 1, marginRight: 8 }}>
                <SkeletonCard variant="text" width="60%" height={32} style={{ alignSelf: 'center', marginBottom: 8 }} />
                <SkeletonCard variant="text" width="40%" height={14} style={{ alignSelf: 'center' }} />
              </Card>
              <Card style={{ flex: 1, marginLeft: 8 }}>
                <SkeletonCard variant="text" width="60%" height={32} style={{ alignSelf: 'center', marginBottom: 8 }} />
                <SkeletonCard variant="text" width="50%" height={14} style={{ alignSelf: 'center' }} />
              </Card>
            </View>

            {/* Quick Stats Grid Skeleton */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
              {[1, 2].map((i) => (
                <Card key={i} style={{ width: '48%', marginBottom: 12 }}>
                  <SkeletonCard variant="text" width="50%" height={20} style={{ alignSelf: 'center', marginBottom: 8 }} />
                  <SkeletonCard variant="text" width="60%" height={12} style={{ alignSelf: 'center' }} />
                </Card>
              ))}
            </View>

            {/* Recent Activity Skeleton */}
            <Card>
              <SkeletonCard variant="text" width="40%" height={18} style={{ marginBottom: 16 }} />
              {[1, 2, 3].map((i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: '#E5E7EB' }}>
                  <SkeletonCard variant="avatar" height={8} style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <SkeletonCard variant="text" width="80%" height={14} style={{ marginBottom: 4 }} />
                    <SkeletonCard variant="text" width="50%" height={12} />
                  </View>
                </View>
              ))}
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const { student, quickStats, recentActivity } = dashboardData;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
      <OfflineIndicator isOffline={isOffline} />
      <ScrollView
        style={{ flex: 1 }}
        accessibilityLabel="Dashboard"
        accessibilityRole="none"
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => fetchData(true)}
            accessibilityLabel="Pull to refresh dashboard"
            accessibilityHint="Pull down to refresh dashboard data"
          />
        }
      >
        <View style={{ padding: 20 }}>
        {/* Welcome Header */}
        <View
          style={{
            backgroundColor: '#1E3A8A',
            borderRadius: 20,
            padding: 24,
            marginBottom: 20
          }}
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel={`Welcome back, ${student.name}. ${student.grade}`}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Image
              source={{ uri: student.avatar }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 16
              }}
              accessible={true}
              accessibilityLabel={`${student.name} profile picture`}
              accessibilityRole="image"
            />
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 4
              }}>
                Welcome back, {student.name.split(' ')[0]}!
              </Text>
              <Text style={{
                fontSize: 16,
                color: '#E5E7EB'
              }}>
                {student.grade}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
          <Card
            style={{ flex: 1, marginRight: 8 }}
            accessibilityLabel={`Grade Point Average: ${student.gpa}`}
            accessibilityRole="text"
          >
            <Text style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#1E3A8A',
              textAlign: 'center'
            }}>
              {student.gpa}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              GPA
            </Text>
          </Card>

          <Card
            style={{ flex: 1, marginLeft: 8 }}
            accessibilityLabel={`Attendance: ${student.attendancePercentage} percent`}
            accessibilityRole="text"
          >
            <Text style={{
              fontSize: 32,
              fontWeight: '700',
              color: '#10B981',
              textAlign: 'center'
            }}>
              {student.attendancePercentage}%
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Attendance
            </Text>
          </Card>
        </View>

        {/* Quick Stats Grid */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
          <Card
            style={{ width: '48%', marginBottom: 12 }}
            accessibilityLabel={`Total Classes: ${quickStats.totalClasses}`}
            accessibilityRole="text"
          >
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#111827',
              textAlign: 'center'
            }}>
              {quickStats.totalClasses}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Total Classes
            </Text>
          </Card>

          <Card
            style={{ width: '48%', marginBottom: 12 }}
            accessibilityLabel={`Upcoming Assignments: ${quickStats.upcomingAssignments}`}
            accessibilityRole="text"
          >
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#F59E0B',
              textAlign: 'center'
            }}>
              {quickStats.upcomingAssignments}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Upcoming Assignments
            </Text>
          </Card>
        </View>

        {/* Recent Activity */}
        <Card accessibilityLabel="Recent Activity">
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 16
          }}>
            Recent Activity
          </Text>

          {recentActivity.map((activity, index) => (
            <View
              key={index}
              accessible={true}
              accessibilityLabel={`${activity.message}. ${activity.timestamp}`}
              accessibilityRole="text"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < recentActivity.length - 1 ? 1 : 0,
                borderBottomColor: '#E5E7EB'
              }}
            >
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: activity.type === 'grade' ? '#10B981' : '#3B82F6',
                marginRight: 12
              }} />

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: 2
                }}>
                  {activity.message}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280'
                }}>
                  {activity.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};






