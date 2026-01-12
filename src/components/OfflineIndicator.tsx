import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface OfflineIndicatorProps {
  isOffline: boolean;
  style?: any;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOffline,
  style
}) => {
  if (!isOffline) return null;

  return (
    <View
      style={[styles.container, style]}
      accessible={true}
      accessibilityRole="alert"
      accessibilityLabel="You are currently offline. Showing cached data."
    >
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.text}>Offline - Showing cached data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  text: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
});
