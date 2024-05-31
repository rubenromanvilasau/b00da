import IndicatorCard from '@/components/IndicatorCard';
import AmountInput from '@/components/AmountInput';
import TransactionsTable from '@/components/TransactionsTable';
import StartCalendarInput from '@/components/StartCalendarInput';
import { getChartData } from '@/lib/actions/bitcoin-price';
import EndCalendarInput from '@/components/EndCalendarInput';
import { convertToCLP, formatDate } from '@/lib/utils';
import Chart from '@/components/Chart';

const twelveMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12).getTime();

export default async function Home({
    searchParams,
}:{
    searchParams?: {
        amount?: string;
        start?: string;
        end?: string;
    }
}) {
    const amount = Number(searchParams?.amount) || 100000;
    const startDate = Number(searchParams?.start) || twelveMonthsAgo;
    const endDate = Number(searchParams?.end) || Date.now();

    const data = await getChartData(amount, startDate, endDate);
    // console.log('data', data);
    
    const totalProfit = data?.reduce( (a,b) => a + b.profit, 0) || 0;
    const profitPercent = data?.reduce( (a,b) => a + b.btcPriceChangePercent, 0) || 0;
    const totalInvested = data[data.length-1]?.accumulatedInvestment || 0;

    return (
        <main className="p-8 w-full">
            <div className="flex items-center flex-wrap gap-4 ">
                <div className="w-full md:w-1/2">
                    <h1 className="text-primary text-4xl font-semibold">Simulador DCA</h1>
                    <h2 className="text-tertiary mt-2 md:mt-0">Simula tu rendimiento usando la estrategia DCA (Dollar Cost Average) al comprar BTC con CLP mensualmente.</h2>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <IndicatorCard type="invested" data={convertToCLP(totalInvested)}/>
                    <IndicatorCard type="profits" data={convertToCLP(totalProfit)}/>
                    <IndicatorCard type="performance" data={`${profitPercent.toFixed(2)}%`}/>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 mt-8">
                <div className="flex flex-col gap-4">
                    <AmountInput currency="CLP" defaultValue={amount}/>
                    <StartCalendarInput defaultDate={new Date(startDate)}/>
                    <EndCalendarInput defaultDate={new Date(endDate)}/>
                </div>
                <Chart datasets={data} labels={data.map(data => formatDate(new Date(data.transactionTimestamp), 'dd/MM/yy'))}/>
            </div>

            <TransactionsTable transactions={data}/>
        </main>
    )
}
