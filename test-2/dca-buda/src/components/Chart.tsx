'use client';
import { Line } from "react-chartjs-2";
import { Tooltip, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title } from 'chart.js';
import { convertToCLP } from "@/lib/utils";

const options = {
    responsive: true,
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

    const data = {
        labels,
        datasets: [
            {
                label: 'Profits',
                data: datasets && datasets.map((dataset) => convertToCLP(dataset.profit)),
                borderColor: '#4D4DFE',
                backgroundColor: '#4D4DFE',
            },
            {
                label: 'Total acumulado',
                data: datasets && datasets.map((dataset) => dataset.totalAccumulated),
                borderColor: '#4D4DFE',
                backgroundColor: '#4D4DFE',
            }
        ],

        // [
            // {
                // label: 'Dataset 1',
                // data: [1,2,3,4,5,6,7],
                // borderColor: '#4D4DFE',
                // backgroundColor: '#4D4DFE',
            // },
        // ],
    };

    return (
        <Line options={options} data={data}/>
    );
};