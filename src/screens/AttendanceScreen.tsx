import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { AttendanceChart } from '../components/AttendanceChart';
import { Card } from '../components/Card';
import { IconLoader } from '../components/IconLoader';
import { SkeletonCard } from '@/components/SkeletonCard';
import mockAttendance from '../data/mockAttendance.json';
import { AttendanceData } from '../types';

export const AttendanceScreen: React.FC = () => {
  const { attendanceData, setAttendanceData, isLoading, setLoading } = useAppStore();

  // Generate stable random heights for skeleton bars (only recalculated when component mounts)
  const skeletonBarHeights = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map(() => Math.random() * 60 + 40);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAttendanceData(mockAttendance as AttendanceData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setAttendanceData, setLoading]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setAttendanceData(mockAttendance as AttendanceData);
      setLoading(false);
    }, 1000);
  };

  if (isLoading || !attendanceData) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 20 }}>
            {/* Header Skeleton */}
            <View style={{
              backgroundColor: '#1E3A8A',
              borderRadius: 20,
              padding: 24,
              marginBottom: 20
            }}>
              <SkeletonCard variant="text" width="50%" height={24} style={{ marginBottom: 8 }} />
              <SkeletonCard variant="text" width="80%" height={16} />
            </View>

            {/* Chart Skeleton */}
            <Card style={{ alignItems: 'center', marginBottom: 20 }}>
              <SkeletonCard variant="chart" height={140} />
            </Card>

            {/* Monthly Trend Skeleton */}
            <Card style={{ marginBottom: 20 }}>
              <SkeletonCard variant="text" width="40%" height={18} style={{ marginBottom: 16 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                    <SkeletonCard variant="bar" width={24} height={skeletonBarHeights[i - 1]} style={{ marginBottom: 8 }} />
                    <SkeletonCard variant="text" width={30} height={12} style={{ marginBottom: 4 }} />
                    <SkeletonCard variant="text" width={25} height={10} />
                  </View>
                ))}
              </View>
            </Card>

            {/* Summary Stats Skeleton */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              {[1, 2, 3].map((i) => (
                <Card key={i} style={{ flex: 1, marginHorizontal: i === 2 ? 4 : (i === 1 ? 0 : 8), alignItems: 'center' }}>
                  <SkeletonCard variant="text" width="50%" height={24} style={{ marginBottom: 8 }} />
                  <SkeletonCard variant="text" width="60%" height={12} />
                </Card>
              ))}
            </View>

            {/* Recent Absences Skeleton */}
            <Card>
              <SkeletonCard variant="text" width="40%" height={18} style={{ marginBottom: 16 }} />
              {[1, 2, 3].map((i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: '#E5E7EB' }}>
                  <SkeletonCard variant="avatar" height={8} style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <SkeletonCard variant="text" width="70%" height={14} style={{ marginBottom: 4 }} />
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

  const { summary, monthlyTrend, recentAbsences, trendMessage } = attendanceData;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{
          backgroundColor: '#1E3A8A',
          borderRadius: 20,
          padding: 24,
          marginBottom: 20
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: 8
          }}>
            Attendance Overview
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#E5E7EB'
          }}>
            {trendMessage}
          </Text>
        </View>

        {/* Attendance Chart */}
        <Card style={{ alignItems: 'center', marginBottom: 20 }}>
          <AttendanceChart summary={summary} size={140} />
        </Card>

        {/* Monthly Trend */}
        <Card style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 16
          }}>
            Monthly Trend
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 120
          }}>
            {monthlyTrend.map((month) => (
              <View key={month.month} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  backgroundColor: '#3B82F6',
                  width: 24,
                  height: (month.percentage / 100) * 80,
                  borderRadius: 4,
                  marginBottom: 8
                }} />
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginBottom: 4
                }}>
                  {month.month}
                </Text>
                <Text style={{
                  fontSize: 10,
                  color: '#9CA3AF'
                }}>
                  {month.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Summary Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
          <Card style={{ flex: 1, marginRight: 8, alignItems: 'center' }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#10B981'
            }}>
              {summary.present}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Days Present
            </Text>
          </Card>

          <Card style={{ flex: 1, marginHorizontal: 4, alignItems: 'center' }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#EF4444'
            }}>
              {summary.absent}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Days Absent
            </Text>
          </Card>

          <Card style={{ flex: 1, marginLeft: 8, alignItems: 'center' }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: '#F59E0B'
            }}>
              {summary.late}
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#6B7280',
              textAlign: 'center'
            }}>
              Days Late
            </Text>
          </Card>
        </View>

        {/* Recent Absences */}
        {recentAbsences.length > 0 && (
          <Card>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#111827',
              marginBottom: 16
            }}>
              Recent Absences
            </Text>

            {recentAbsences.map((absence, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: index < recentAbsences.length - 1 ? 1 : 0,
                  borderBottomColor: '#E5E7EB'
                }}
              >
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: absence.excused ? '#10B981' : '#EF4444',
                  marginRight: 12
                }} />

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#111827',
                    marginBottom: 2
                  }}>
                    {absence.subject} - {new Date(absence.date).toLocaleDateString()}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280'
                  }}>
                    {absence.reason} • {absence.excused ? 'Excused' : 'Unexcused'}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Quick Actions */}
        <Card style={{ marginTop: 20 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 16
          }}>
            Quick Actions
          </Text>

          <TouchableOpacity style={{
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <IconLoader name="Calendar" size={20} color="#1E3A8A" variant="Outline" />
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#1E3A8A',
              marginLeft: 8
            }}>
              View Full Calendar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <IconLoader name="DocumentDownload" size={20} color="#1E3A8A" variant="Outline" />
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#1E3A8A',
              marginLeft: 8
            }}>
              Download Report
            </Text>
          </TouchableOpacity>
        </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};






