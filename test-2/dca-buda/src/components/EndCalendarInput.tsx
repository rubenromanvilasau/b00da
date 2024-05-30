'use client';
import {DatePicker} from "@nextui-org/date-picker";
import { useState } from "react";
import { DateValue } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function EndCalendarInput() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const isDateUnavailable = (date: any) => {
        return date.day !== 1
    }

    const onChangeDate = (date: DateValue) => {
        const parsedDate = new Date(date.year, date.month - 1, date.day).getTime();
        const params = new URLSearchParams(searchParams);
        date
            ? params.set('end', parsedDate.toString())
            : params.delete('end');
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <div>
            <label htmlFor="end_date">Fecha de término de inversión</label>
            <DatePicker 
                name="end_date"
                aria-label="Fecha de término de inversión"
                onChange={onChangeDate}
                isDateUnavailable={isDateUnavailable}
                className="text-white mt-2"
            />
        </div>
    )
}