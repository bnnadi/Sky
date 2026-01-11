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
import mockDashboard from '../data/mockDashboard.json';
import { DashboardData } from '../types';

export const DashboardScreen: React.FC = () => {
  const { dashboardData, setDashboardData, isLoading, setLoading } = useAppStore();

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
     const timer = setTimeout(() => {
      setDashboardData(mockDashboard as DashboardData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer)
  }, [setDashboardData, setLoading]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setDashboardData(mockDashboard as DashboardData);
      setLoading(false);
    }, 1000);
  };

  if (!dashboardData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>Loading...</Text>
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






