import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Grade } from '../types';
import { getGradeColor } from '../utils/grades';

interface GradeItemProps {
  grade: Grade;
  onPress?: () => void;
}

export const GradeItem: React.FC<GradeItemProps> = ({ grade, onPress }) => {
  const gradeColor = getGradeColor(grade.grade);

  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityRole='button'
      accessibilityLabel={`${grade.subject}, Grade: ${grade.grade}, ${grade.percentage} percent, taught by ${grade.teacher}`}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 4
          }}>
            {grade.subject}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6B7280',
            marginBottom: 2
          }}>
            {grade.teacher}
          </Text>
          <Text style={{
            fontSize: 12,
            color: '#9CA3AF'
          }}>
            {grade.semester}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            backgroundColor: gradeColor,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginBottom: 4,
          }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '700'
            }}>
              {grade.grade}
            </Text>
          </View>
          <Text style={{
            fontSize: 14,
            color: '#6B7280',
            fontWeight: '500'
          }}>
            {grade.percentage}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};






