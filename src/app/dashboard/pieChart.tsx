"use client"

import { Pie } from "react-chartjs-2"
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
    DoughnutController,
    layouts
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

export default function PieChart({ chartData }: { chartData: IDoughnutChartData[] }){
    // console.log(chartData)
    const amounts = chartData.map((data) => data.totalAmount)
    const colors = chartData.map((data) => data.expenseType.color)
    const labels = chartData.map((data) => data.expenseType.title)

    const options = {
        plugins: {
            legend: {
                display: false
            },
        },
        // radius: '50%',
        borderWidth: 0,
        responsive: true,
        maintainAspectRatio: false
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

    return <Pie options={options} data={data} />
}