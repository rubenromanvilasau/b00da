import { format } from "date-fns/format";
import { differenceInCalendarMonths, differenceInMonths } from "date-fns";
import { parseDate } from "@internationalized/date";


export const convertToCLP = (num: string | number) => {
    return Number(num).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

/**
 * Format a date to a specific format
 * @param date - Date to format
 * @param mode - Format mode like 'dd/MM/yyyy HH:mm'
 */
export const formatDate = (date: Date, mode: string = 'dd/MM/yyyy HH:mm') => {
    return format(date, mode);
}

/**
 * Get the difference in months between two dates
 * @param startDate - Start date
 * @param endDate - End date
 */
export const getDifferenceInMonths = (startDate: Date, endDate: Date) => {
    return differenceInCalendarMonths(startDate, endDate);
}

export const convertToDateValue = (date: Date) => {
    return parseDate(date.toISOString().split('T')[0]);
}