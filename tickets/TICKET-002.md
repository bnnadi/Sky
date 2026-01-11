# TICKET-002: Implement Skeleton Loading States

**Type:** Enhancement
**Priority:** High
**Story Points:** 2
**Description:** Replace simple "Loading..." text with proper skeleton loading screens using the existing SkeletonCard component to improve perceived performance and user experience.

**Current Behavior:** App shows simple "Loading..." text while data is being loaded.

**Expected Behavior:** App should show skeleton screens that mimic the layout of the actual content (cards, lists, etc.) while loading.

## Acceptance Criteria
- Enhance SkeletonCard component to support different shapes (card, list item, chart placeholder)
- Implement skeleton loading states in DashboardScreen
- Implement skeleton loading states in GradesScreen
- Implement skeleton loading states in AttendanceScreen
- Skeleton screens should match the layout of actual content

## Testing Steps
1. Test loading states on slow network (use network throttling)
2. Verify skeleton screens appear during data fetch
3. Verify smooth transition from skeleton to actual content
4. Test on both iOS and Android

## Dependencies
- Existing SkeletonCard component

## Files to Modify
- `src/components/SkeletonCard.tsx` (enhance)
- `src/screens/DashboardScreen.tsx`
- `src/screens/GradesScreen.tsx`
- `src/screens/AttendanceScreen.tsx`

## Notes
- Consider adding shimmer animation to skeleton cards for better UX
- Ensure skeleton layout matches actual content layout closely
