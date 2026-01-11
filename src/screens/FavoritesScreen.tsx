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
  { id: 'dashboard', name: 'Dashboard', icon: 'Home', route: 'Dashboard' },
  { id: 'grades', name: 'Grades', icon: 'Chart2', route: 'Grades' },
  { id: 'attendance', name: 'Attendance', icon: 'Calendar', route: 'Attendance' },
  { id: 'student-info', name: 'Student Information', icon: 'Profile', route: 'StudentInformation' },
];

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { favorites, removeFavorite } = useAppStore();

  const favoriteItems = allMenuItems.filter(item => favorites.includes(item.id));

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
  };

  const handleRemoveFavorite = (itemId: string) => {
    removeFavorite(itemId);
  };

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
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.subtitle}>
            {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {favoriteItems.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubtext}>
              Add items to favorites from the Full Menu
            </Text>
          </Card>
        ) : (
          <View style={styles.list}>
            {favoriteItems.map((item) => (
              <Card key={item.id} style={styles.itemCard}>
                <TouchableOpacity
                  style={styles.itemContent}
                  onPress={() => handleNavigate(item.route)}
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
                    onPress={() => handleRemoveFavorite(item.id)}
                    style={styles.favoriteButton}
                  >
                    <IconLoader
                      name="Star1"
                      size={20}
                      color="#1E3A8A"
                      variant="Bold"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}
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
  emptyCard: {
    margin: 20,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
