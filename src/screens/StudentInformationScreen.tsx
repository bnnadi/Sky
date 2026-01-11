import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Card';
import mockDashboard from '../data/mockDashboard.json';
import mockInformation from '../data/mockInformation.json';
import { DashboardData } from '../types';

export const StudentInformationScreen: React.FC = () => {
  const { dashboardData, setDashboardData, isLoading, setLoading } = useAppStore();

  useEffect(() => {
    if (!dashboardData) {
      setLoading(true);
      const timer = setTimeout(() => {
        setDashboardData(mockDashboard as DashboardData);
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dashboardData, setDashboardData, setLoading]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setDashboardData(mockDashboard as DashboardData);
      setLoading(false);
    }, 1000);
  };

  if (!dashboardData) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { student } = dashboardData;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <Card style={styles.headerCard}>
            <Text style={styles.title}>Student Information</Text>
            <Text style={styles.subtitle}>{student.name}</Text>
            <Text style={styles.grade}>{student.grade}</Text>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>GPA</Text>
              <Text style={styles.infoValue}>{student.gpa}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Attendance</Text>
              <Text style={styles.infoValue}>{student.attendancePercentage}%</Text>
            </View>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>12345678</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>willow.nnadi@school.edu</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
  headerCard: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  grade: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});
