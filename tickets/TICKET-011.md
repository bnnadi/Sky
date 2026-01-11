# TICKET-011: Add Unit Tests for Core Components

**Type:** Testing
**Priority:** Medium
**Story Points:** 3
**Description:** Add comprehensive unit tests for core components and utilities to ensure code quality and prevent regressions.

**Current Behavior:** No test files exist in the project.

**Expected Behavior:** Core components, utilities, and business logic should have unit tests with good coverage.

## Acceptance Criteria
- Set up testing framework (Jest + React Native Testing Library)
- Add unit tests for Card component
- Add unit tests for GradeItem component
- Add unit tests for AttendanceChart component
- Add unit tests for grade calculation utilities
- Achieve at least 70% code coverage for components
- All tests should pass and be maintainable

## Testing Steps
1. Run test suite: `npm test`
2. Verify all tests pass
3. Check test coverage report
4. Verify tests run in CI/CD (if applicable)

## Dependencies
- jest
- @testing-library/react-native
- @testing-library/jest-native

## Files to Create
- `src/components/__tests__/Card.test.tsx`
- `src/components/__tests__/GradeItem.test.tsx`
- `src/components/__tests__/AttendanceChart.test.tsx`
- `src/utils/__tests__/grades.test.ts`
- `jest.config.js` (or update package.json)

## Notes
- Focus on testing component behavior, not implementation details
- Test user interactions and edge cases
- Consider snapshot testing for UI components
- Set up test coverage reporting
