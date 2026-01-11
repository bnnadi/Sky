# TICKET-005: Add Error Boundaries and Error States

**Type:** Bug Fix / Enhancement
**Priority:** High
**Story Points:** 3
**Description:** Implement error boundaries and proper error states throughout the app to handle failures gracefully and provide user-friendly error messages.

**Current Behavior:** No error handling exists - if data fails to load or an error occurs, the app may crash or show no feedback.

**Expected Behavior:** App should catch errors, display user-friendly error messages, and provide retry options where appropriate.

## Acceptance Criteria
- Create ErrorBoundary component for React error catching
- Add error states for data loading failures
- Create ErrorDisplay component for consistent error UI
- Add retry functionality for failed data loads
- Handle network errors gracefully
- Show appropriate error messages (user-friendly, not technical)

## Testing Steps
1. Simulate network failure and verify error state appears
2. Simulate invalid data and verify error handling
3. Test error boundary with component errors
4. Verify retry functionality works
5. Test error states on all screens

## Dependencies
- Error boundary implementation
- Error state management in Zustand store

## Files to Modify
- `src/components/ErrorBoundary.tsx` (new)
- `src/components/ErrorDisplay.tsx` (new)
- `src/screens/DashboardScreen.tsx`
- `src/screens/GradesScreen.tsx`
- `src/screens/AttendanceScreen.tsx`
- `src/store/useAppStore.ts`

## Notes
- Use React Error Boundaries for component-level errors
- Provide actionable error messages (e.g., "Check your connection and try again")
- Consider offline detection for network errors
