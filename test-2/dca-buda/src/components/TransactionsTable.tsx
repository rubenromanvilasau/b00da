export default function TransactionsTable() {
    return(
        <div className="mt-8 w-full">
            <h2 className="text-quaternary text-2xl">Transacciones</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="font-medium text-start">Fecha</th>
                        <th className="font-medium text-start">Monto invertido acumulado</th>
                        <th className="font-medium text-start">Precio Bitcoin</th>
                        <th className="font-medium text-start">%</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-secondary">01/03/2024</td>
                        <td className="text-secondary">$100.000</td>
                        <td className="text-secondary">USD 62.433</td>
                        <td className="text-secondary">0.5%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}