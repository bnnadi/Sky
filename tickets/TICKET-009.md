# TICKET-009: Add Additional Chart Types

**Type:** Feature
**Priority:** Low
**Story Points:** 2
**Description:** Add additional chart types to the Attendance screen to provide more comprehensive data visualization options (e.g., line charts, area charts, or comparison charts).

**Current Behavior:** Attendance screen has donut chart and bar chart.

**Expected Behavior:** Attendance screen should have additional chart types for different data perspectives (e.g., weekly trends, comparison charts, etc.).

## Acceptance Criteria
- Add at least one new chart type (line chart, area chart, or comparison chart)
- New chart should display relevant attendance data
- Chart should be interactive and accessible
- Chart should match existing design system
- Add chart type selector or tabs if multiple charts

## Testing Steps
1. Verify new chart renders correctly
2. Test chart interactivity (if applicable)
3. Verify chart accessibility
4. Test on both iOS and Android
5. Verify performance with larger datasets

## Dependencies
- react-native-svg (already in use)
- Chart library or custom implementation

## Files to Modify
- `src/components/AttendanceChart.tsx` (enhance or create new)
- `src/screens/AttendanceScreen.tsx`
- `src/data/mockAttendance.json` (may need additional data)

## Notes
- Consider using react-native-chart-kit or victory-native for chart library
- Ensure charts are responsive and work on different screen sizes
- Maintain consistent styling with existing charts
