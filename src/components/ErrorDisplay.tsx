import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from './Card';
import { colors } from '../theme/colors';

export type ErrorType = 'network' | 'data' | 'unknown';

interface ErrorDisplayProps {
  message?: string;
  type?: ErrorType;
  onRetry?: () => void;
  retryLabel?: string;
}

const getErrorMessage = (type: ErrorType, customMessage?: string): string => {
  if (customMessage) return customMessage;

  switch (type) {
    case 'network':
      return 'Unable to connect. Please check your internet connection and try again.';
    case 'data':
      return 'Unable to load data. Please try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

const getErrorIcon = (type: ErrorType): string => {
  switch (type) {
    case 'network':
      return '📡';
    case 'data':
      return '📄';
    default:
      return '⚠️';
  }
};

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  type = 'unknown',
  onRetry,
  retryLabel = 'Try Again'
}) => {
  const errorMessage = getErrorMessage(type, message);
  const errorIcon = getErrorIcon(type);

  return (
    <Card
      style={styles.container}
      accessibilityLabel={`Error: ${errorMessage}`}
      accessibilityRole="alert"
    >
      <View style={styles.content}>
        <Text
          style={styles.icon}
          accessible={false}
        >
          {errorIcon}
        </Text>
        <Text
          style={styles.title}
          accessible={true}
          accessibilityRole="header"
        >
          Oops! Something went wrong
        </Text>
        <Text
          style={styles.message}
          accessible={true}
          accessibilityRole="text"
        >
          {errorMessage}
        </Text>
        {onRetry && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={retryLabel}
            accessibilityHint="Double tap to retry loading the data"
          >
            <Text style={styles.retryButtonText}>{retryLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  retryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
