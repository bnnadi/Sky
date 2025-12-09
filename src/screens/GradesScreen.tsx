import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { GradeItem } from '../components/GradeItem';
import { Card } from '../components/Card';
import mockGrades from '../data/mockGrades.json';
import { Grade } from '../types';

export const GradesScreen: React.FC = () => {
  const { gradesData, setGradesData, isLoading, setLoading } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'subject' | 'grade' | 'percentage'>('subject');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setGradesData(mockGrades as Grade[]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setGradesData, setLoading]);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setGradesData(mockGrades as Grade[]);
      setLoading(false);
    }, 1000);
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

  if (gradesData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#6B7280' }}>Loading grades...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      {/* Header with GPA */}
      <View style={{
        backgroundColor: '#1E3A8A',
        padding: 20,
        paddingTop: 40
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
            <Text style={{ fontSize: 48, marginBottom: 12 }}>🔍</Text>
            <Text style={{
              textAlign: 'center',
              color: '#111827',
              fontWeight: '600',
              fontSize: 16
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
    </View>
  );
};






