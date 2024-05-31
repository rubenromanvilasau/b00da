'use client';
import { DatePicker } from "@nextui-org/date-picker";
import { DateValue } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { parseDate } from "@internationalized/date";
import { useEffect, useState } from "react";

export default function StartCalendarInput({ defaultDate }: { defaultDate: Date }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()
    const [currentDate, setCurrentDate] = useState<DateValue>();

    const isDateUnavailable = (date: any) => {
        return date.day !== 1
    }

    const onChangeDate = (date: DateValue) => {
        const parsedDate = new Date(date.year, date.month -1, date.day).getTime();
        const params = new URLSearchParams(searchParams);
        date
            ? params.set('start', parsedDate.toString())
            : params.delete('start');
        replace(`${pathname}?${params.toString()}`);
        setCurrentDate(date);
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (params.has('start')) {
            const date = new Date(Number(params.get('start')));
            const parsedDate = parseDate(date.toISOString().split('T')[0]);
            setCurrentDate(parsedDate);
        }else{
            defaultDate.setDate(1);
            const parsedDate = parseDate(defaultDate.toISOString().split('T')[0]);
            setCurrentDate(parsedDate);
        }
    }, []);

    return(
        <div>
            <label htmlFor="start_date">Fecha de inicio de inversión</label>
            <DatePicker 
                name="start_date"
                aria-label="Fecha de inicio de inversión"
                onChange={onChangeDate}
                value={currentDate}
                // defaultValue={getDefaultValue()}
                isDateUnavailable={isDateUnavailable}
                className="text-white mt-2"
            />
        </div>
    )
}