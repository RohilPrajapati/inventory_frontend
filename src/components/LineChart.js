import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const LineChart = ({chartTitle,label,dataset}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: chartTitle,
            },
        },
        scales: {
            y: {
                type: 'linear' ,
                display: true,
                position: 'left',
            }
        },
    };

    const labels = label;

    const data = {
        labels,
        datasets: dataset
    };
    return (
        <>
            <Line  options={options} data={data} />
        </>
    );
}

export default LineChart