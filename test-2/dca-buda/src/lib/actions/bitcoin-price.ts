import { Trade } from "@/types";

/**
 * Get bitcoin prices within a range of dates
 * @param date - Unix timestamp
 */
export async function getBitcoinPrices(startDate: number, endDate?: number) {
    const parsedStartDate = new Date(startDate);

    if(endDate && endDate > Date.now()) {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1, 12);
        endDate = firstDay.getTime();
        console.log('endDate', new Date(endDate));
    }

    // Create an array of dates in unix from startDate to 12 months later
    const dates: Number[] = [];
    for(let i = 1; i <= 12; i++) {
        const date = new Date(parsedStartDate.getFullYear(), parsedStartDate.getMonth() + i, 1, 8);
        console.log('date', date);

        const unixDate = date.getTime();
        dates.push(unixDate);
    }

    const firstMonthDay = 1714564800000; // 1 de mayo 2024 (este mes)

    await Promise.all(dates.map(async (date) => {
        const data = await getBitcoinPrice(date);
        console.log('btc price', {
            date,
            price: data.entries[0][2]
        });
    }));
}

/**
 * Get 1 transaction of bitcoin from Buda API, given a date
 * @param date - Unix timestamp of last transaction 
 */
const getBitcoinPrice = async (date: Number): Promise<Trade> => {
    const url = `https://www.buda.com/api/v2/markets/BTC-CLP/trades?timestamp=${date}&limit=1`;
    return fetch(url)
        .then(response => response.json())
        .then( ({ trades }) => trades)
        .catch(err => console.log(err));
}