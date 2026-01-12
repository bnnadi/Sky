import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { AttendanceSummary } from '../types';

interface AttendanceChartProps {
  summary: AttendanceSummary;
  size?: number;
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({
  summary,
  size = 120
}) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const presentPercentage = (summary.present / summary.totalDays) * 100;
  const absentPercentage = (summary.absent / summary.totalDays) * 100;
  const latePercentage = (summary.late / summary.totalDays) * 100;

  const presentStrokeDasharray = `${(presentPercentage / 100) * circumference} ${circumference}`;
  const absentStrokeDasharray = `${(absentPercentage / 100) * circumference} ${circumference}`;
  const lateStrokeDasharray = `${(latePercentage / 100) * circumference} ${circumference}`;

  return (
    <View
      style={{ alignItems: 'center' }}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={`Attendance chart showing ${summary.attendancePercentage} percent attendance. ${summary.present} days present, ${summary.absent} days absent, ${summary.late} days late out of ${summary.totalDays} total days`}
      accessibilityHint="Visual representation of attendance statistics"
    >
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="transparent"
        />

        {/* Present days */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#10B981"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={presentStrokeDasharray}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Absent days */}
        {absentPercentage > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EF4444"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={absentStrokeDasharray}
            strokeDashoffset={`-${(presentPercentage / 100) * circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}

        {/* Late days */}
        {latePercentage > 0 && (
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F59E0B"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={lateStrokeDasharray}
            strokeDashoffset={`-${((presentPercentage + absentPercentage) / 100) * circumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}

        {/* Center text */}
        <SvgText
          x={size / 2}
          y={size / 2 - 8}
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
          fill="#111827"
        >
          {summary.attendancePercentage}%
        </SvgText>
        <SvgText
          x={size / 2}
          y={size / 2 + 12}
          fontSize="12"
          textAnchor="middle"
          fill="#6B7280"
        >
          Attendance
        </SvgText>
      </Svg>

      {/* Legend */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: size + 40,
        marginTop: 16
      }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#10B981',
            marginBottom: 4
          }} />
          <Text style={{ fontSize: 12, color: '#6B7280' }}>
            Present ({summary.present})
          </Text>
        </View>

        {summary.absent > 0 && (
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#EF4444',
              marginBottom: 4
            }} />
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Absent ({summary.absent})
            </Text>
          </View>
        )}

        {summary.late > 0 && (
          <View style={{ alignItems: 'center' }}>
            <View style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#F59E0B',
              marginBottom: 4
            }} />
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Late ({summary.late})
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};






