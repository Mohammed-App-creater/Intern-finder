export const normalizeToISODateString = (input: string | Date): string => {
    let date: Date;
    if (input instanceof Date) {
        date = input;
    } else if (typeof input === "string") {
        // Accept common formats and attempt to parse
        // If already YYYY-MM-DD, validate and return
        const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
        if (isoDateOnly.test(input)) {
            const d = new Date(input + "T00:00:00Z");
            if (isNaN(d.getTime())) throw new Error("Invalid date");
            return input;
        }
        // Try Date parsing
        const parsed = new Date(input);
        if (isNaN(parsed.getTime())) {
            throw new Error("Invalid date");
        }
        date = parsed;
    } else {
        throw new Error("Invalid date input type");
    }
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}; 