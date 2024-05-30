import { format } from "date-fns/format";
import { differenceInMonths } from "date-fns";

export function convertToCLP(num: string | number) {
    return Number(num).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
}

export function formatDate(date: Date, mode: string = 'dd/MM/yyyy HH:mm') {
    return format(date, mode);
}

export function getDifferenceInMonths(startDate: Date, endDate: Date) {
    return differenceInMonths(startDate, endDate);
}