'use client';
import {DatePicker} from "@nextui-org/date-picker";
import { useState } from "react";
import { DateValue } from "@nextui-org/react";

export default function CalendarInput() {
    const [currentDate, setCurrentDate] = useState<DateValue>();

    let isDateUnavailable = (date: any) => {
        return date.day !== 1
    }

    return(
        <div>
            <label htmlFor="">Fecha de inicio de inversión</label>
            <DatePicker 
                onChange={(date) => setCurrentDate(date)}
                // variant="underlined"
                isDateUnavailable={isDateUnavailable}
                className="text-white"
            />
        </div>
    )
}