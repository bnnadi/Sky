# TICKET-008: Add GPA Trend Progress Bars

**Type:** Feature
**Priority:** Low
**Story Points:** 2
**Description:** Add visual GPA trend indicators showing progress over time using progress bars or trend visualizations on the Dashboard screen.

**Current Behavior:** Dashboard shows current GPA but no historical trend or progress visualization.

**Expected Behavior:** Dashboard should display GPA trends (e.g., semester-over-semester or month-over-month) with visual progress indicators.

## Acceptance Criteria
- Add GPA trend data to mock data structure
- Create GPA trend visualization component (progress bars or line chart)
- Display GPA trend on Dashboard screen
- Show comparison to previous period
- Add visual indicators for improvement/decline

## Testing Steps
1. Verify GPA trend displays correctly on Dashboard
2. Test with different GPA values and trends
3. Verify visual indicators are clear and understandable
4. Test on both iOS and Android

## Dependencies
- Mock data structure update
- Chart/visualization component

## Files to Modify
- `src/data/mockDashboard.json` (add trend data)
- `src/components/GPATrendChart.tsx` (new)
- `src/screens/DashboardScreen.tsx`
- `src/types/index.ts` (add trend types)

## Notes
- Consider showing trend over multiple periods (last 3 semesters, etc.)
- Use color coding to indicate positive/negative trends
- Keep visualization simple and clear
