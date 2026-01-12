import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/useAppStore';
import { GradeItem } from '../components/GradeItem';
import { Card } from '../components/Card';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { IconLoader } from '../components/IconLoader';
import { SkeletonCard } from '@/components/SkeletonCard';
import mockGrades from '../data/mockGrades.json';
import { Grade } from '../types';

// Helper function to simulate network errors (for testing)
const shouldSimulateError = () => {
  return false; // Set to true to test error handling
};

const loadGradesData = async (): Promise<Grade[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSimulateError()) {
        reject(new Error('Network request failed'));
      } else {
        try {
          resolve(mockGrades as Grade[]);
        } catch (error) {
          reject(error);
        }
      }
    }, 1000);
  });
};

export const GradesScreen: React.FC = () => {
  const {
    gradesData,
    setGradesData,
    isLoading,
    setLoading,
    error,
    setError,
    clearError
  } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'subject' | 'grade' | 'percentage'>('subject');

  const fetchData = async () => {
    try {
      setLoading(true);
      clearError();
      const data = await loadGradesData();
      setGradesData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load grades data';
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
  }, [setGradesData, setLoading, setError, clearError]);

  const onRefresh = () => {
    fetchData();
  };

  const filteredAndSortedGrades = useMemo(() => {
    return gradesData
    .filter(grade =>
      grade.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'grade':
          return a.grade.localeCompare(b.grade);
        case 'percentage':
          return b.percentage - a.percentage;
        default:
          return a.subject.localeCompare(b.subject);
      }
    });
  }, [gradesData, searchQuery, sortBy]);

  const gpa = useMemo(() => {
    if (gradesData.length === 0) return '0.00';
    const gradePoints: Record<string, number> = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    }
    const total = gradesData.reduce((sum, g) => sum + (gradePoints[g.grade] ?? 0), 0)
    return (total / gradesData.length).toFixed(2);
  }, [gradesData]);

  // Show error state if there's an error and no data
  if (error && gradesData.length === 0 && !isLoading) {
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

  if (isLoading || gradesData.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
        {/* Header Skeleton */}
        <View style={{ backgroundColor: '#1E3A8A', padding: 20 }}>
          <SkeletonCard variant="text" width="40%" height={24} style={{ marginBottom: 8 }} />
          <SkeletonCard variant="text" width="60%" height={16} />
        </View>

        {/* Search and Filter Skeleton */}
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <SkeletonCard variant="card" height={48} style={{ marginBottom: 16 }} />
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} variant="card" width={80} height={36} style={{ marginRight: 8, borderRadius: 20 }} />
            ))}
          </View>
        </View>

        {/* Grade Items Skeleton */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <SkeletonCard variant="text" width="60%" height={18} style={{ marginBottom: 8 }} />
                  <SkeletonCard variant="text" width="50%" height={14} style={{ marginBottom: 4 }} />
                  <SkeletonCard variant="text" width="40%" height={12} />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <SkeletonCard variant="card" width={50} height={32} style={{ borderRadius: 20, marginBottom: 4 }} />
                  <SkeletonCard variant="text" width={40} height={14} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }} edges={['top']}>
      {/* Header with GPA */}
      <View style={{
        backgroundColor: '#1E3A8A',
        padding: 20
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: '#FFFFFF',
          marginBottom: 8
        }}>
          Grades
        </Text>
        <Text style={{
          fontSize: 16,
          color: '#E5E7EB'
        }}>
          Current GPA: {gpa}
        </Text>
      </View>

      {/* Search and Filter */}
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 12,
            fontSize: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB'
          }}
          placeholder="Search subjects or teachers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Sort Options */}
        <View style={{
          flexDirection: 'row',
          marginBottom: 16
        }}>
          {(['subject', 'grade', 'percentage'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setSortBy(option)}
              style={{
                backgroundColor: sortBy === option ? '#3B82F6' : '#FFFFFF',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                borderWidth: 1,
                borderColor: sortBy === option ? '#3B82F6' : '#E5E7EB'
              }}
            >
              <Text style={{
                color: sortBy === option ? '#FFFFFF' : '#6B7280',
                fontSize: 14,
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Grades List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingTop: 0 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {filteredAndSortedGrades.map((grade) => (
          <GradeItem
            key={grade.id}
            grade={grade}
            onPress={() => {
              // Could navigate to grade details
              console.log('Grade pressed:', grade);
            }}
          />
        ))}

        {filteredAndSortedGrades.length === 0 && (
          <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
            <IconLoader name="SearchNormal" size={48} color="#9CA3AF" variant="Outline" />
            <Text style={{
              textAlign: 'center',
              color: '#111827',
              fontWeight: '600',
              fontSize: 16,
              marginTop: 12
            }}>
              No grades found.
            </Text>
            <Text style={{
              textAlign: 'center',
              color: '#6B7280',
              fontSize: 16
            }}>
              Try adjusting your search term.
            </Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};






