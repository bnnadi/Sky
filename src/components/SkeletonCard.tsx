// Enhanced SkeletonCard with variants and shimmer
import React, { useEffect, useRef, useMemo } from 'react';
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
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Store interpolated value in ref to ensure it's created only once and maintains animation connection
  const shimmerOpacity = useRef(
    shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    })
  ).current;

  useEffect(() => {
    animationRef.current = Animated.loop(
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
    );
    animationRef.current.start();

    // Cleanup: stop animation when component unmounts
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [shimmerAnim]);

  // Variant-specific dimensions - memoized to avoid recalculation on every render
  const variantStyles = useMemo(() => {
    switch (variant) {
      case 'avatar': {
        // If width is explicitly provided (not default '100%'), don't set width here to let prop take precedence
        // Otherwise, use height for both dimensions to maintain square/circular shape
        const size = height || 60;
        const borderRadius = size / 2;
        if (width !== '100%' && width) {
          // Width prop will be used from the style array, only set height and borderRadius
          return { height: size, borderRadius };
        }
        return { width: size, height: size, borderRadius };
      }
      case 'text':
        return { height: height || 16, borderRadius: 4 };
      case 'bar':
        return { height: height || 80, borderRadius: 4 };
      case 'chart': {
        // If width is explicitly provided (not default '100%'), don't set width here to let prop take precedence
        // Otherwise, use height for both dimensions to maintain square/circular shape
        const size = height || 140;
        const borderRadius = size / 2;
        if (width !== '100%' && width) {
          // Width prop will be used from the style array, only set height and borderRadius
          return { height: size, borderRadius };
        }
        return { width: size, height: size, borderRadius };
      }
      case 'listItem':
        // List item variant: typically full width with moderate height and rounded corners
        return { height: height || 60, borderRadius: 8 };
      case 'card':
      default:
        return { height: height || 80, borderRadius: 12 };
    }
  }, [variant, width, height]);

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
                height: height || 16,
                borderRadius: 4,
                marginBottom: i < lines - 1 ? 8 : 0,
                opacity: shimmerOpacity,
              },
              variantStyles,
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
        variantStyles,
        style,
      ]}
    />
  );
};