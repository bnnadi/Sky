import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Card';
import { IconLoader } from '../components/IconLoader';
import mockDashboard from '../data/mockDashboard.json';
import { DashboardData } from '../types';

export const AccountInfoScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { dashboardData, setDashboardData, isLoading, setLoading } = useAppStore();

  useEffect(() => {
    if (!dashboardData) {
      setLoading(true);
      const timer = setTimeout(() => {
        setDashboardData(mockDashboard as DashboardData);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [dashboardData, setDashboardData, setLoading]);

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

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <IconLoader name="Menu" size={24} color="#111827" variant="Outline" />
        </TouchableOpacity>
        <Text style={styles.title}>Account Information</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Section */}
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: student.avatar }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentGrade}>{student.grade}</Text>
              </View>
            </View>
          </Card>

          {/* Account Details */}
          <Card style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Account Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Student ID</Text>
              <Text style={styles.detailValue}>12345678</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>willow.nnadi@school.edu</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>(555) 123-4567</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>GPA</Text>
              <Text style={styles.detailValue}>{student.gpa}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attendance</Text>
              <Text style={styles.detailValue}>{student.attendancePercentage}%</Text>
            </View>
          </Card>

          {/* Academic Summary */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Academic Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{student.gpa}</Text>
                <Text style={styles.summaryLabel}>GPA</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{student.attendancePercentage}%</Text>
                <Text style={styles.summaryLabel}>Attendance</Text>
              </View>
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
  header: {
    padding: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 0,
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
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  studentGrade: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailsCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  summaryCard: {
    marginBottom: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
});
