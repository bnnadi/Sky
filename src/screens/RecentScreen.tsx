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
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/Card';
import { IconLoader, IconName } from '../components/IconLoader';

export const RecentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { recentItems, clearRecentItems } = useAppStore();

  const handleNavigate = (route: string) => {
    navigation.navigate(route);
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
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Recent</Text>
            <Text style={styles.subtitle}>
              {recentItems.length} {recentItems.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
          {recentItems.length > 0 && (
            <TouchableOpacity
              onPress={clearRecentItems}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {recentItems.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No recent items</Text>
            <Text style={styles.emptySubtext}>
              Recently accessed items will appear here
            </Text>
          </Card>
        ) : (
          <View style={styles.list}>
            {recentItems.map((item) => (
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
                  <Text style={styles.chevron}>›</Text>
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
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    marginTop: 4,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  chevron: {
    fontSize: 24,
    color: '#9CA3AF',
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
