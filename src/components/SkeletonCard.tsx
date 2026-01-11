// Enhanced SkeletonCard with variants and shimmer
import React, { useEffect, useRef } from 'react';
import { View, Animated, DimensionValue } from 'react-native';

type SkeletonVariant = 'card' | 'listItem' | 'chart' | 'avatar' | 'text' | 'bar';

interface SkeletonCardProps {
  width?: DimensionValue;
  height?: number;
  variant?: SkeletonVariant;
  lines?: number; // For text variant
  style?: any;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  width = '100%',
  height,
  variant = 'card',
  lines = 1,
  style
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  // Variant-specific dimensions
  const getVariantStyles = () => {
    switch (variant) {
      case 'avatar':
        return { width: height || 60, height: height || 60, borderRadius: (height || 60) / 2 };
      case 'text':
        return { height: 16, borderRadius: 4 };
      case 'bar':
        return { height: height || 80, borderRadius: 4 };
      case 'chart':
        return { width: height || 140, height: height || 140, borderRadius: (height || 140) / 2 };
      default:
        return { height: height || 80, borderRadius: 12 };
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <View style={style}>
        {Array.from({ length: lines }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              {
                backgroundColor: '#E5E7EB',
                width: i === lines - 1 ? '80%' : '100%',
                height: 16,
                borderRadius: 4,
                marginBottom: i < lines - 1 ? 8 : 0,
                opacity: shimmerOpacity,
              },
              getVariantStyles(),
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#E5E7EB',
          width,
          opacity: shimmerOpacity,
        },
        getVariantStyles(),
        style,
      ]}
    />
  );
};