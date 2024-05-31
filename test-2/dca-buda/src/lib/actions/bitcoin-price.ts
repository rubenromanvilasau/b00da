import { Trade } from "@/types";
import { getDifferenceInMonths } from '../utils/index';

interface Data {
    transactionTimestamp: number;
    btcPrice: number;
    profit: number;
    accumulatedProfit: number;
    totalAccumulated: number;
    btcPriceChangePercent: number;
    accumulatedInvestment: number;
};

/**
 * Generate different indifcators for the given amount of money, startDate and endDate.
 * @param date - Unix timestamp
 */
export async function getChartData(amount: number, startDate: number, endDate: number): Promise<Data[]> {
    const now = new Date().getTime();
    if(startDate > now || !amount) return []; 
    
    const parsedStartDate = resetToUTC(new Date(startDate));
    const parsedEndDate = resetToUTC(new Date(endDate));

    const dates = generateDates(parsedStartDate, parsedEndDate);
    const prices = await fetchBitcoinPrices(dates);

    const data = calculateIndicators(prices, amount);

    return data;
}

const calculateIndicators = (prices: any[], amount: number) => {
    const data = [];
    let accumulatedInvestment = amount;
    for(let i = 0; i < prices.length; i++) {
        if(i !== 0) {
            const newProfit = amount / prices[i-1].btcPrice * prices[i].btcPrice - amount;
            const accumulatedProfit: number = data[i-1].accumulatedProfit + newProfit;       
    
            data[i] = {
                ...prices[i],
                profit: newProfit,
                accumulatedProfit,
                totalAccumulated: accumulatedProfit + accumulatedInvestment,
                btcPriceChangePercent: (prices[i].btcPrice - prices[i-1].btcPrice) / prices[i-1].btcPrice * 100,
                accumulatedInvestment,
            };
        }else{
            data[i] = {
                ...prices[i],
                profit: 0,
                accumulatedProfit: 0,
                totalAccumulated: 0,
                btcPriceChangePercent: 0,
                accumulatedInvestment
            };
        }
        accumulatedInvestment += amount;
    }
    
    // console.log('data', data);

    return data;
}

const fetchBitcoinPrices = async(dates: number[]): Promise<{transactionTimestamp: number; btcPrice: number}[]> => {
    
    const prices = await Promise.all(dates.map(async (date: any) => {
        const data = await getBitcoinPrice(date);
        
        const btcPrice = Number(data.entries[0][2]);
        const transactionTimestamp = Number(data.entries[0][0]);
        return {
            transactionTimestamp,
            btcPrice,
        }
    }));

    return prices;
}

const generateDates = (startDate: Date, endDate: Date): number[] => {
    const months = getDifferenceInMonths(endDate, startDate);
    const dates: number[] = [];
    
    for(let i = 0; i <=  months; i++) {
        
        if(startDate <= new Date()) {
            const unixDate = startDate.getTime();
            dates.push(unixDate);
        }
        startDate.setMonth(startDate.getMonth() + 1);
    }

    return dates;
}

const resetToUTC = (date: Date): Date => {
    date.setUTCDate(1);
    date.setUTCHours(12, 0, 0, 0);
    return date;
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