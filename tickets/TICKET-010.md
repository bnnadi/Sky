# TICKET-010: Implement Offline Data Persistence

**Type:** Feature
**Priority:** Low
**Story Points:** 3
**Description:** Implement local data persistence using AsyncStorage so the app can display cached data when offline and sync when connection is restored.

**Current Behavior:** App only loads data from JSON files in memory - no persistence or offline support.

**Expected Behavior:** App should cache data locally, display cached data when offline, and provide visual indication of offline/online status.

## Acceptance Criteria
- Implement AsyncStorage for data persistence
- Cache dashboard, grades, and attendance data locally
- Load cached data on app startup
- Display cached data when offline
- Add offline/online status indicator
- Implement data refresh when connection restored
- Handle cache expiration/invalidation

## Testing Steps
1. Load app with data, verify data is cached
2. Turn off network, verify cached data displays
3. Turn on network, verify data refreshes
4. Test cache expiration logic
5. Test on both iOS and Android

## Dependencies
- @react-native-async-storage/async-storage
- Network status detection

## Files to Modify
- `src/store/useAppStore.ts` (add persistence logic)
- `src/utils/storage.ts` (new - storage utilities)
- `src/utils/network.ts` (new - network detection)
- `src/screens/DashboardScreen.tsx` (add offline indicator)
- All data loading logic

## Notes
- Consider cache expiration strategy (e.g., 24 hours)
- Add visual indicator for stale data
- Consider implementing optimistic updates
