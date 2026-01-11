# TICKET-007: Expand Theme System

**Type:** Enhancement
**Priority:** Medium
**Story Points:** 2
**Description:** Expand the current colors.ts file into a comprehensive theme system with typography, spacing, shadows, and other design tokens for better maintainability and consistency.

**Current Behavior:** Only basic colors are defined in colors.ts file.

**Expected Behavior:** Complete theme system with colors, typography, spacing, shadows, and other design tokens that can be easily extended and maintained.

## Acceptance Criteria
- Expand colors.ts to include all color variants (light, dark, semantic)
- Add typography system (font sizes, weights, line heights)
- Add spacing system (margins, paddings, gaps)
- Add shadow/elevation system
- Add border radius system
- Create theme provider/hook for easy access
- Update all components to use theme tokens

## Testing Steps
1. Verify all components use theme tokens
2. Verify theme system is easy to extend
3. Test theme consistency across screens
4. Verify no hardcoded values remain

## Dependencies
- None (foundational work)

## Files to Modify
- `src/theme/colors.ts` (expand)
- `src/theme/typography.ts` (new)
- `src/theme/spacing.ts` (new)
- `src/theme/shadows.ts` (new)
- `src/theme/index.ts` (new - theme export)
- All component files (update to use theme)

## Notes
- Follow design system best practices
- Consider using a library like styled-system for theme utilities
- Document theme usage guidelines
