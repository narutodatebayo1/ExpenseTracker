"use client"

import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import { IExpense } from "../../../../interface/expenseInterface"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function LineChart({ chartData }: { chartData: IExpense[] }) {

    const date = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31
    ]

    const val = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0
    ]

    chartData.forEach(expense => {
        const day = Number(expense.date.slice(8, 10))
        val[day - 1] = expense.amount
    })

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        pointStyle: false,
        scales: {
            y: {
                display: false,
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }

    const data = {
        labels: date,
        datasets: [
            {
                data: val,
                borderColor: "#4B0082"
            }
        ],
    }

    return <Line options={options} data={data} />
}

// #FF4500, #32CD32, #4169E1
// #FFA07A, #90EE90, #ADD8E6