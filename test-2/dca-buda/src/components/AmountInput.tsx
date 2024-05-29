export default function AmountInput({ currency }: { currency: string }) {
    return(
        <div>
            <label htmlFor="amount" className="text-tertiary">Amount</label>
            <div className="rounded-xl border-2 border-secondary p-4 flex items-center justify-between mt-2">
                <input type="number" name="amount" placeholder="Amount" className="outline-none bg-transparent focus:outline-none"/>
                <p className="uppercase text-tertiary">{currency}</p>
            </div>
        </div>
    )
}