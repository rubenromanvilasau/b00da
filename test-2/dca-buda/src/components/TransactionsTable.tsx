import { convertToCLP, formatDate } from "@/lib/utils";

export default function TransactionsTable({
    transactions
}: {
    transactions: {
        date: number;
        parsedDate: Date;
        transactionTimestamp: string;
        btcPrice: number;
        investmentAccumulated: number;
        profit: number;
        totalAccumulated: number;
        accumulatedProfit: number;
        btcPriceChangePercent: number;
    }[];
}) {
    
    return(
        <div className="mt-8 w-full">
            <h2 className="text-quaternary text-2xl">Transacciones</h2>
            <table className="w-full mt-2">
                <thead>
                    <tr>
                        <th className="font-medium text-start text-lg">Fecha</th>
                        <th className="font-medium text-start text-lg">Monto invertido acumulado</th>
                        <th className="font-medium text-start text-lg">Precio Bitcoin (CLP)</th>
                        <th className="font-medium text-start text-lg">Profit</th>
                        <th className="font-medium text-start text-lg">Profit acumulado</th>
                        <th className="font-medium text-start text-lg">Total acumulado</th>
                        <th className="font-medium text-start text-lg">%</th>
                    </tr>
                </thead>
                <tbody className="">
                    { transactions && transactions.map(({ parsedDate, btcPrice, investmentAccumulated, profit, accumulatedProfit, totalAccumulated, btcPriceChangePercent }, index) => (
                        <tr key={index} className="odd:bg-slate-900">
                            <td className="text-secondary py-4">{formatDate(parsedDate)}</td>
                            <td className="text-secondary py-4 text-">{convertToCLP(investmentAccumulated)}</td>
                            <td className="text-secondary py-4">{convertToCLP(btcPrice)}</td>
                            <td className={`${profit >= 0 ? 'text-green-600' : 'text-red-600'} py-4`}>{convertToCLP(profit)}</td>
                            <td className="text-secondary py-4">{convertToCLP(accumulatedProfit)}</td>
                            <td className="text-secondary py-4">{convertToCLP(totalAccumulated)}</td>
                            <td className="text-secondary py-4">{btcPriceChangePercent.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}