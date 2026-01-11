import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppStore, MenuItem } from '../store/useAppStore';
import { Card } from '../components/Card';
import { IconLoader, IconName } from '../components/IconLoader';

const allMenuItems: MenuItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'Home', route: 'Dashboard', category: 'Overview' },
  { id: 'grades', name: 'Grades', icon: 'Chart2', route: 'Grades', category: 'Academic' },
  { id: 'attendance', name: 'Attendance', icon: 'Calendar', route: 'Attendance', category: 'Academic' },
  { id: 'student-info', name: 'Student Information', icon: 'Profile', route: 'StudentInformation', category: 'Information' },
];

export const FullMenuScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { favorites, addFavorite, removeFavorite, addRecentItem } = useAppStore();

  const handleNavigate = (item: MenuItem) => {
    addRecentItem(item);
    navigation.navigate(item.route);
  };

  const handleToggleFavorite = (itemId: string, item: MenuItem) => {
    if (favorites.includes(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  };

  const groupedItems = allMenuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <IconLoader name="Menu" size={24} color="#111827" variant="Outline" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Full Menu</Text>
          <Text style={styles.subtitle}>
            {allMenuItems.length} {allMenuItems.length === 1 ? 'item' : 'items'} available
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.list}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {items.map((item) => (
                <Card key={item.id} style={styles.itemCard}>
                  <TouchableOpacity
                    style={styles.itemContent}
                    onPress={() => handleNavigate(item)}
                  >
                    <IconLoader
                      name={item.icon as IconName}
                      size={28}
                      color="#111827"
                      variant="Outline"
                    />
                    <View style={styles.itemText}>
                      <Text style={styles.itemName}>{item.name}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleToggleFavorite(item.id, item)}
                      style={styles.favoriteButton}
                    >
                      <IconLoader
                        name="Star1"
                        size={20}
                        color="#1E3A8A"
                        variant={favorites.includes(item.id) ? 'Bold' : 'Outline'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Card>
              ))}
            </View>
          ))}
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
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  icon: {
    fontSize: 28,
    marginRight: 16,
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  favoriteButton: {
    padding: 8,
  },
});
