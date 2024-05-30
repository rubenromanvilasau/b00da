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
    
    const totalProfit = data.reduce( (a,b) => a + b.profit, 0);
    const profitPercent = totalProfit / data[data.length-1].investmentAccumulated * 100; //! CHECK THIS

    return (
        <main className="p-8 md:p-16 w-full">
            <div className="flex items-center flex-wrap gap-4 md:gap-0">
                <div className="w-full md:w-1/2">
                    <h1 className="text-primary text-4xl font-semibold">Simulador DCA</h1>
                    <h2 className="text-tertiary mt-2 md:mt-0">Simula tu rendimiento usando la estrategia DCA (Dollar Cost Average) al comprar BTC con CLP mensualmente.</h2>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <IndicatorCard type="invested" data={convertToCLP(data[data.length-1].investmentAccumulated)}/>
                    <IndicatorCard type="profits" data={convertToCLP(totalProfit)}/>
                    <IndicatorCard type="performance" data={`${profitPercent.toFixed(2)}%`}/>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 mt-8">
                <div className="flex flex-col gap-4">
                    <AmountInput currency="CLP" defaultValue={100000}/>
                    <StartCalendarInput/>
                    <EndCalendarInput/>
                </div>
                <div className="max-h-[500px] w-full">
                    <Chart datasets={data} labels={data.map(data => formatDate(data.date, 'dd/MM/yy'))}/>
                </div>
            </div>

            <TransactionsTable transactions={data}/>
        </main>
    )
}
