import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { useAppStore } from './src/store/useAppStore';
import { getNetworkState, subscribeToNetworkState } from './src/utils/network';

export default function App() {
  const { loadCachedData, setNetworkState } = useAppStore();

  useEffect(() => {
    // Load cached data on app startup
    loadCachedData();

    // Get initial network state
    getNetworkState().then(setNetworkState);

    // Subscribe to network state changes
    const unsubscribe = subscribeToNetworkState(setNetworkState);

    return () => {
      unsubscribe();
    };
  }, [loadCachedData, setNetworkState]);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#1E3A8A" />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}






