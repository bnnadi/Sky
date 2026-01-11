import React from 'react';
import {
    Home,
    Chart2,
    Calendar,
    Profile,
    Star1,
    Clock,
    DocumentText,
    Mobile,
    SearchNormal,
    Menu as MenuIcon,
    TickCircle,
    DocumentDownload,
    TrendUp,
} from 'iconsax-react-native';

export type IconName =
    | 'Home'
    | 'Chart2'
    | 'Calendar'
    | 'Profile'
    | 'Star1'
    | 'Clock'
    | 'DocumentText'
    | 'Mobile'
    | 'SearchNormal'
    | 'Menu'
    | 'TickCircle'
    | 'DocumentDownload'
    | 'TrendUp';

export type IconVariant = 'Outline' | 'Bold' | 'Broken' | 'Bulk' | 'Linear' | 'TwoTone';

interface IconLoaderProps {
    name: IconName | string;
    size?: number;
    color?: string;
    variant?: IconVariant;
}

const iconMap: Record<string, React.ComponentType<any>> = {
    // Menu items
    'Home': Home,
    'Chart2': Chart2,
    'Calendar': Calendar,
    'Profile': Profile,

    // Navigation
    'Star1': Star1,
    'Clock': Clock,
    'DocumentText': DocumentText,
    'Mobile': Mobile,
    'Menu': MenuIcon,

    // Actions
    'SearchNormal': SearchNormal,
    'TickCircle': TickCircle,
    'DocumentDownload': DocumentDownload,
    'TrendUp': TrendUp,

    // Legacy emoji support (for migration)
    '🏠': Home,
    '📊': Chart2,
    '📅': Calendar,
    '👤': Profile,
    '⭐': Star1,
    '🕒': Clock,
    '📋': DocumentText,
    '📱': Mobile,
    '🔍': SearchNormal,
    '☰': MenuIcon,
    '✅': TickCircle,
    '📈': TrendUp,
  };

  export const IconLoader: React.FC<IconLoaderProps> = ({
    name,
    size = 24,
    color = '#111827',
    variant = 'Outline',
  }) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found in iconMap`);
      return null;
    }

    return (
      <IconComponent
        size={size}
        color={color}
        variant={variant}
      />
    );
  };