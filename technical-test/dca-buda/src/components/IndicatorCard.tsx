import { FaExchangeAlt } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaPercent } from "react-icons/fa";

export default function IndicatorCard({ 
    type, 
    data 
}: { 
    type: 'invested' | 'profits' | 'performance';
    data: number | string;
}) {
    
    return(
        <div className="rounded-xl border-2 border-quaternary p-4 w-full md:w-fit">
            <div className="flex items-center gap-4">
                {type === 'invested' && <FaExchangeAlt size={24} className="text-white"/>}
                {type === 'profits' && <AiOutlineStock size={24} className="text-white"/>}
                {type === 'performance' && <FaPercent size={24} className="text-white"/>}
                <div>
                    {type === 'invested' && <p className="uppercase text-secondary text-xs">Total invertido</p>}
                    {type === 'profits' && <p className="uppercase text-secondary text-xs">Total ganancias</p>}
                    {type === 'performance' && <p className="uppercase text-secondary text-xs">Rendimiento</p>}
                    <p className="text-quaternary text-lg font-semibold">{data || 0}</p>
                </div>
            </div>
        </div>
    )
}