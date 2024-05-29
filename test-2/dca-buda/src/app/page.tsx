import IndicatorCard from '@/components/IndicatorCard';
import AmountInput from '@/components/AmountInput';
import TransactionsTable from '@/components/TransactionsTable';
import CalendarInput from '@/components/CalendarInput';
import { getBitcoinPrices } from '@/lib/actions/bitcoin-price';

const twelveMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 12).getTime();
export default async function Home() {
    const prices = await getBitcoinPrices(twelveMonthsAgo);

    return (
        <main className="p-8 md:p-16">
            <div className="flex items-center flex-wrap gap-4 md:gap-0">
                <div className="w-full md:w-1/2">
                    <h1 className="text-primary text-4xl font-semibold">Simulador DCA</h1>
                    <h2 className="text-tertiary mt-2 md:mt-0">Simula tu rendimiento usando la estrategia DCA (Dollar Cost Average) al comprar BTC con CLP mensualmente.</h2>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <IndicatorCard type="invested"/>
                    <IndicatorCard type="profits"/>
                    <IndicatorCard type="performance"/>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-8 mt-8">
                <div className="flex flex-col gap-4">
                    <AmountInput currency="CLP"/>
                    <CalendarInput/>
                </div>
                <div className=" w-full h-[200px] bg-slate-400 rounded-xl">

                </div>
            </div>

            <TransactionsTable/>
        </main>
    )
}
