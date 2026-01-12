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
import { SkeletonCard } from '@/components/SkeletonCard';
import mockDashboard from '../data/mockDashboard.json';
import { DashboardData } from '../types';

// Helper function to simulate network errors (for testing)
const shouldSimulateError = () => {
  // In production, remove this or make it configurable
  return false; // Set to true to test error handling
};

const loadDashboardData = async (): Promise<DashboardData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSimulateError()) {
        reject(new Error('Network request failed'));
      } else {
        try {
          resolve(mockDashboard as DashboardData);
        } catch (error) {
          reject(error);
        }
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
    clearError
  } = useAppStore();

  const fetchData = async () => {
    try {
      setLoading(true);
      clearError();
      const data = await loadDashboardData();
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError({
        message: errorMessage,
        type: errorMessage.toLowerCase().includes('network') ? 'network' : 'data'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setDashboardData, setLoading, setError, clearError]);

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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 20 }}>
        {/* Welcome Header */}
        <View style={{
          backgroundColor: '#1E3A8A',
          borderRadius: 20,
          padding: 24,
          marginBottom: 20
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Image
              source={{ uri: student.avatar }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 16
              }}
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
          <Card style={{ flex: 1, marginRight: 8 }}>
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

          <Card style={{ flex: 1, marginLeft: 8 }}>
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
          <Card style={{ width: '48%', marginBottom: 12 }}>
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

          <Card style={{ width: '48%', marginBottom: 12 }}>
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
        <Card>
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






