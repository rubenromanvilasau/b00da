import { Trade } from "@/types";
import { convertToCLP } from "../utils";
import { getDifferenceInMonths } from '../utils/index';

/**
 * Get bitcoin prices within a range of dates
 * @param date - Unix timestamp
 */
export async function getChartData(amount: number, startDate: number, endDate: number) {
    if(!amount) return [];
    
    const parsedStartDate = new Date(startDate);
    parsedStartDate.setHours(9);
    console.log('parsedStartDate', parsedStartDate);

    const parsedEndDate = new Date(endDate);
    parsedEndDate.setHours(9);
    console.log('endDate', parsedEndDate);

    // Create an array of dates in unix from startDate to endDate
    const months = getDifferenceInMonths(parsedEndDate, parsedStartDate);
    const dates: Number[] = [];
    for(let i = 0; i <=  months; i++) {
        const date = new Date(parsedStartDate.getFullYear(), parsedStartDate.getMonth() + i, 1, 9);
        if(date <= new Date() ) {
            const unixDate = date.getTime();
            dates.push(unixDate);
        }
    }

    let investmentAccumulated = 0;
    const prices = await Promise.all(dates.map(async (date: any) => {
        const data = await getBitcoinPrice(date);
        
        const btcPrice = Number(data.entries[0][2]);
        investmentAccumulated += amount;
        return {
            date,
            parsedDate: new Date(date),
            transactionTimestamp: data.entries[0][0],
            btcPrice,
            investmentAccumulated,
        }
    }));

    const data = [];
    for(let i = 0; i < prices.length; i++) {
        if(i !== 0) {
            const newProfit = amount / prices[i-1].btcPrice * prices[i].btcPrice - amount;
            const accumulatedProfit: number = data[i-1].accumulatedProfit + newProfit;       
    
            data[i] = {
                ...prices[i],
                profit: newProfit,
                accumulatedProfit,
                totalAccumulated: accumulatedProfit + prices[i].investmentAccumulated,
                btcPriceChangePercent: (prices[i].btcPrice - prices[i-1].btcPrice) / prices[i-1].btcPrice * 100,
            };
        }else{
            data[i] = {
                ...prices[i],
                profit: 0,
                accumulatedProfit: 0,
                totalAccumulated: 0,
                btcPriceChangePercent: 0
            };
        }
    }
    
    // console.log('data', data);

    return data;

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