export const getGradeColor = (grade: string): string => {
    const letter = grade.charAt(0).toUpperCase();
    const colorMap: Record<string, string> = {
        'A': '#10B981',
        'B': '#F59E0B',
        'C': '#EF4444',
        'D': '#EF4444',
        'F': '#EF4444',
    }
    return colorMap[letter] ?? '#EF4444';
};