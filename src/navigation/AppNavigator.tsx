import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { GradesScreen } from '../screens/GradesScreen';
import { AttendanceScreen } from '../screens/AttendanceScreen';
import { TabParamList, RootStackParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Simple icon component (you can replace with react-native-vector-icons)
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  const getIcon = () => {
    switch (name) {
      case 'Dashboard':
        return '🏠';
      case 'Grades':
        return '📊';
      case 'Attendance':
        return '📅';
      default:
        return '📱';
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 4 }}>
        {getIcon()}
      </Text>
      <Text style={{
        fontSize: 12,
        color: focused ? '#1E3A8A' : '#6B7280',
        fontWeight: focused ? '600' : '400'
      }}>
        {name}
      </Text>
    </View>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            onPress={(e: any) => {
              // Add haptic feedback here with expo-haptics
              props.onPress?.(e);
            }}
          />
        ),
        tabBarActiveTintColor: '#1E3A8A',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Grades"
        component={GradesScreen}
        options={{
          title: 'Grades',
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          title: 'Attendance',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};






