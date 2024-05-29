import { FaExchangeAlt } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { FaPercent } from "react-icons/fa";

export default function IndicatorCard({ type }: { type: 'invested' | 'profits' | 'performance' }) {
    return(
        // <div className="rounded-xl border-2 border-quaternary p-4">
        //     <div className="flex items-center gap-4">
        //         <FaExchangeAlt size={24} className="text-white"/>
        //         <div>
        //             <p className="uppercase text-secondary text-xs">Total invertido</p>
        //             <p className="text-quaternary text-lg font-semibold">CLP 1.000.000</p>
        //         </div>
        //     </div>
        // </div>

        
        // <div className="rounded-xl border-2 border-quaternary p-4">
        //     <div className="flex items-center gap-4">
        //         <AiOutlineStock size={24} className="text-white"/>
        //         <div>
        //             <p className="uppercase text-secondary text-xs">Total ganancias</p>
        //             <p className="text-quaternary text-lg font-semibold">CLP 100.000</p>
        //         </div>
        //     </div>
        // </div>
        <div className="rounded-xl border-2 border-quaternary p-4">
            <div className="flex items-center gap-4">
                <FaPercent size={24} className="text-white"/>
                <div>
                    <p className="uppercase text-secondary text-xs">Rendimiento</p>
                    <p className="text-quaternary text-lg font-semibold">100%</p>
                </div>
            </div>
        </div>
        

    )
}