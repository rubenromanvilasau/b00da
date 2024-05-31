'use client';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function AmountInput({ currency, defaultValue }: { currency: string, defaultValue: number }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChangeInput = (amount: any) => {
        const params = new URLSearchParams(searchParams);
        amount
            ? params.set('amount', amount)
            : params.delete('amount');
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <div>
            <label htmlFor="amount" className="text-tertiary">Monto</label>
            <div className="rounded-xl border-2 border-secondary p-4 flex items-center justify-between mt-2">
                <input 
                    type="number" 
                    id="amount"
                    min={0}
                    name="amount" 
                    placeholder="Monto" 
                    className="outline-none bg-transparent focus:outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
                    defaultValue={searchParams.get('amount')?.toString() || defaultValue}
                />
                <p className="uppercase text-tertiary">{currency}</p>
            </div>
        </div>
    )
}