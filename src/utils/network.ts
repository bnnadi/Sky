import NetInfo from '@react-native-community/netinfo';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
}

/**
 * Get current network state
 */
export const getNetworkState = async (): Promise<NetworkState> => {
  try {
    const state = await NetInfo.fetch();
    return {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? null,
      type: state.type ?? null,
    };
  } catch (error) {
    console.error('Error getting network state:', error);
    return {
      isConnected: false,
      isInternetReachable: false,
      type: null,
    };
  }
};

/**
 * Subscribe to network state changes
 */
export const subscribeToNetworkState = (
  callback: (state: NetworkState) => void
): (() => void) => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    callback({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable ?? null,
      type: state.type ?? null,
    });
  });

  return unsubscribe;
};

/**
 * Check if device is online
 */
export const isOnline = async (): Promise<boolean> => {
  const state = await getNetworkState();
  return state.isConnected && (state.isInternetReachable ?? false);
};
