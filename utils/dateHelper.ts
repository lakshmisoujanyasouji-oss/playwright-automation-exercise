// Convert month number to month name as used in dropdowns
export function getMonthName(month: string): string {
    const months: Record<string, string> = {
        '1': 'January', '2': 'February', '3': 'March',
        '4': 'April', '5': 'May', '6': 'June',
        '7': 'July', '8': 'August', '9': 'September',
        '10': 'October', '11': 'November', '12': 'December'
    };
    return months[month] || month;
}

// Get current date parts as strings
export function getCurrentDate(): { day: string; month: string; year: string } {
    const now = new Date();
    return {
        day: String(now.getDate()),
        month: String(now.getMonth() + 1),
        year: String(now.getFullYear())
    };
}

// Format date for display
export function formatDate(day: string, month: string, year: string): string {
    return `${day}/${month}/${year}`;
}