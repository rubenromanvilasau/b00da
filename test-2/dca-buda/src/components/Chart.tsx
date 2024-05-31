'use client';
import { Line } from "react-chartjs-2";
import { Tooltip, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title } from 'chart.js';
import { convertToCLP } from "@/lib/utils";
import { useRef } from "react";

const options = {
    responsive: true,
    maintainAspectRatio: false,
    color: 'white',
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                font: {
                // family: 'Poppins'
                }
            }
        },
    },
    scales: {
        x: {
            border: {
                dash: [1,10],
                // borderColor: 'red',
            },
            grid: {
                color: '#e5e7eb',
            }
        },
        y: {
            border: {
                display: false,
            },
            grid: {
                display: false,
                // color: '#58a',
                tickLenght: 1,
                drawTicks: true,
            }
        }
    }
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function Chart({
    datasets,
    labels,
}:{
    labels: string[],
    datasets: any[]
}) {

    const chartRef = useRef(null);

    const data = {
        labels,
        datasets: [
            {
                label: 'Invertido',
                data: datasets && datasets.map((dataset) => Number(dataset.accumulatedInvestment.toFixed(0))),
                borderColor: '#4D4DFE',
                backgroundColor: '#4D4DFE',
            },
            {
                label: 'Total acumulado',
                data: datasets && datasets.map((dataset) => Number(dataset.totalAccumulated.toFixed(0))),
                borderColor: '#0EBEB2',
                backgroundColor: '#0EBEB2',
            },
            {
                label: 'Ganancias',
                data: datasets && datasets.map((dataset) => Number(dataset.profit.toFixed(0))),
                borderColor: '#fe8e22',
                backgroundColor: '#fe8e22',
            }
        ],
    };

    return (
        <div className="w-[99%] min-h-[400px]">
            <Line ref={chartRef} options={options} data={data}/>
        </div>
    );
};