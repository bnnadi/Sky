import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { AttendanceChart } from '../components/AttendanceChart';
import { Card } from '../components/Card';
import mockAttendance from '../data/mockAttendance.json';
import { AttendanceData } from '../types';

export const AttendanceScreen: React.FC = () => {
  const { attendanceData, setAttendanceData, isLoading, setLoading } = useAppStore();

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

  if (!attendanceData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>Loading attendance...</Text>
      </View>
    );
  }

  const { summary, monthlyTrend, recentAbsences, trendMessage } = attendanceData;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F3F4F6' }}
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
            marginBottom: 12
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#1E3A8A'
            }}>
              📅 View Full Calendar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 16
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#1E3A8A'
            }}>
              📊 Download Report
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
};






