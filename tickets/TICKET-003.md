# TICKET-003: Add Light/Dark Mode Toggle

**Type:** Feature
**Priority:** Medium
**Story Points:** 3
**Description:** Implement a light/dark mode toggle that allows users to switch between light and dark themes, with theme preference persisted across app sessions.

**Current Behavior:** App only supports light mode with fixed color scheme.

**Expected Behavior:** Users should be able to toggle between light and dark modes, with the preference saved and applied throughout the app.

## Acceptance Criteria
- Add dark mode color definitions to theme system
- Create theme context/provider for theme management
- Add theme toggle button/switch in settings or header
- Persist theme preference using AsyncStorage
- All screens and components respect the selected theme
- Smooth transition when switching themes

## Testing Steps
1. Toggle between light and dark modes
2. Verify all screens render correctly in both modes
3. Verify theme preference persists after app restart
4. Test theme toggle on iOS and Android
5. Verify charts and visualizations work in dark mode

## Dependencies
- Theme system expansion (TICKET-007)
- AsyncStorage for persistence

## Files to Modify
- `src/theme/colors.ts` (expand with dark mode)
- `src/theme/theme.ts` (new - theme provider)
- `src/store/useAppStore.ts` (add theme state)
- All screen components
- All component files

## Notes
- Consider using system preference as default
- Ensure sufficient contrast ratios for accessibility
- Test all color combinations for readability
