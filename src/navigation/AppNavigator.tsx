import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { RecentScreen } from '../screens/RecentScreen';
import { FullMenuScreen } from '../screens/FullMenuScreen';
import { AccountInfoScreen } from '../screens/AccountInfoScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { GradesScreen } from '../screens/GradesScreen';
import { AttendanceScreen } from '../screens/AttendanceScreen';
import { StudentInformationScreen } from '../screens/StudentInformationScreen';
import { DrawerParamList, MenuTabParamList, RootStackParamList } from '../types';
import { IconLoader, IconName } from '../components/IconLoader';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Tab = createBottomTabNavigator<MenuTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Tab Icon Component
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }: { name: string; focused: boolean }) => {
  const getIconName = (): IconName => {
    switch (name) {
      case 'Favorites':
        return 'Star1';
      case 'Recent':
        return 'Clock';
      case 'FullMenu':
        return 'DocumentText';
      case 'AccountInfo':
        return 'Profile';
      default:
        return 'Mobile';
    }
  };

  const getLabel = () => {
    switch (name) {
      case 'Favorites':
        return 'Favorites';
      case 'Recent':
        return 'Recent';
      case 'FullMenu':
        return 'Menu';
      case 'AccountInfo':
        return 'Account';
      default:
        return name;
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <IconLoader
        name={getIconName()}
        size={24}
        color={focused ? '#1E3A8A' : '#6B7280'}
        variant={focused ? 'Bold' : 'Outline'}
      />
      <Text style={{
        fontSize: 12,
        color: focused ? '#1E3A8A' : '#6B7280',
        fontWeight: focused ? '600' : '400',
        marginTop: 4
      }}>
        {getLabel()}
      </Text>
    </View>
  );
};

// Menu Tabs Navigator (inside drawer)
const MenuTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

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
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          height: 80 + Math.max(insets.bottom - 8, 0),
        },
        headerShown: false, // Header is shown by drawer navigator
      })}
    >
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarAccessibilityLabel: 'Favorites tab',
          tabBarAccessibilityHint: 'Double tap to view your favorite menu items',
        }}
      />
      <Tab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          title: 'Recent',
          tabBarAccessibilityLabel: 'Recent tab',
          tabBarAccessibilityHint: 'Double tap to view recently accessed items',
        }}
      />
      <Tab.Screen
        name="FullMenu"
        component={FullMenuScreen}
        options={{
          title: 'Full Menu',
          tabBarAccessibilityLabel: 'Full Menu tab',
          tabBarAccessibilityHint: 'Double tap to view the complete menu',
        }}
      />
      <Tab.Screen
        name="AccountInfo"
        component={AccountInfoScreen}
        options={{
          title: 'Account Info',
          tabBarAccessibilityLabel: 'Account Info tab',
          tabBarAccessibilityHint: 'Double tap to view account information',
        }}
      />
    </Tab.Navigator>
  );
};

// Custom Drawer Content
const CustomDrawerContent: React.FC<any> = ({ navigation }: any) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => navigation.navigate('MenuTabs')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Open Menu"
        accessibilityHint="Double tap to open the main menu"
      >
        <Text style={styles.drawerItemText}>Open Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

// Drawer Navigator
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E3A8A',
        },
        headerTintColor: '#FFFFFF',
        headerTitle: 'Skyward',
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="MenuTabs"
        component={MenuTabNavigator}
        options={{
          drawerLabel: 'Menu',
        }}
      />
    </Drawer.Navigator>
  );
};

// Root Stack Navigator
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Grades" component={GradesScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="StudentInformation" component={StudentInformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 60,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  drawerItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#111827',
  },
});
