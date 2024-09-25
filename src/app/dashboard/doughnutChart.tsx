"use client"

import { Doughnut } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    TooltipItem,
    ChartEvent,
    ActiveElement,
    DoughnutController
} from "chart.js"
import { IDoughnutChartData } from "../../../interface/expenseInterface"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend    
)

export default function DoughnutChart({ chartData }: { chartData: IDoughnutChartData[] }){

    const amounts = chartData.map((data) => data.totalAmount)
    const colors = chartData.map((data) => data.expenseType.color)
    const labels = chartData.map((data) => data.expenseType.title)

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: "75%",
        radius: 100,
    }

    const data = {
        labels: labels,
        datasets: [
            {
                data: amounts,
                backgroundColor: colors,
            }
        ],
    }

    return <Doughnut options={options} data={data} />
}

// #FF4500, #32CD32, #4169E1
// #FFA07A, #90EE90, #ADD8E6