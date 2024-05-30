'use client';
import {DatePicker} from "@nextui-org/date-picker";
import { useState } from "react";
import { DateValue } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function StartCalendarInput() {
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
            ? params.set('start', parsedDate.toString())
            : params.delete('start');
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <div>
            <label htmlFor="start_date">Fecha de inicio de inversión</label>
            <DatePicker 
                name="start_date"
                aria-label="Fecha de inicio de inversión"
                onChange={onChangeDate}
                // variant="underlined"
                isDateUnavailable={isDateUnavailable}
                className="text-white mt-2"
            />
        </div>
    )
}