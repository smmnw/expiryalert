export function dateToDaysLeft(targetDate: Date): number {
    const today = new Date()
    const difference = targetDate.getTime() - today.getTime()
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24))
    return daysLeft
}

export function daysLeftToColor(daysLeft: number): string {

    if (daysLeft > 7) {
        return '#6D9B7B'
    } else if (daysLeft <= 7 && daysLeft > 3) {
        return '#D99058'
    } else {
        return '#D96666'
    }

}

export function formatDateToISO(date: Date) {
    return date.toISOString().split("T")[0]; // Extract "YYYY-MM-DD"
}

export function addDaysToDate(dateString: Date, daysToAdd: any ) {
    const date = new Date(dateString); // Parse the input date string
    date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
    return date.toISOString().split("T")[0]; // Return in 'YYYY-MM-DD' format
}

export function jsonToCsv(jsonArray: any) {
    if (!jsonArray || jsonArray.length === 0) {
        return '';
    }

    // Extract keys (column names) from the first object
    const keys = Object.keys(jsonArray[0]);

    // Create the CSV header
    const header = keys.join(',');

    // Create the CSV rows
    const rows = jsonArray.map((row: any) =>
        keys.map((key) => {
            // Handle quotes and escape commas
            const value = row[key] === null || row[key] === undefined ? '' : row[key];
            return `"${String(value).replace(/"/g, '""')}"`; // Escape quotes
        }).join(',')
    );

    // Combine header and rows
    return [header, ...rows].join('\n');
}