import React from 'react';
import { View, DimensionValue } from 'react-native';


export const SkeletonCard: React.FC<{width?: DimensionValue; height?: number}> = ({
    width = '100%',
    height = 80
}) => (
    <View style={{
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        width,
        height,
        marginBottom: 12
    }} />
);