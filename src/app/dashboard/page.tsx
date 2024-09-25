import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IDoughnutChartData } from "../../../interface/expenseInterface";
import { getDoughnutChartData } from "../../../hook/expenseHook";
import { getUserByUserId } from "../../../hook/userHook";
import { getBudgetByUserId } from "../../../hook/budgetHook";
import { IBudget } from "../../../interface/budgetInterface";
import { BiBell } from "react-icons/bi";
import Link from "next/link";
import styles from "../../style/dashboard.module.css"
import Navbar from "@/component/navbar";
import PieChart from "./pieChart";
import ExpenseTypeCard from "./expenseTypeCard";
import Image from "next/image";

function moneyFormat(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if (!userId) {
        redirect('/')
    }
    return userId
}

function getFirstDayLastDayThisMonth() {
    const current = new Date()

    const firstDayObject = new Date(
        Date.UTC(
            current.getFullYear(),
            current.getMonth(),
        )
    )

    const lastDayObject = new Date(
        Date.UTC(
            current.getFullYear(),
            current.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
        )
    )

    const firstDay = firstDayObject.toISOString()
    const lastDay = lastDayObject.toISOString()

    return { firstDay, lastDay }
}

export default async function Dashboard() {
    
    const userId = getUserId()

    const user = await getUserByUserId(userId)

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const { firstDay, lastDay } = getFirstDayLastDayThisMonth()

    const chartData = await getDoughnutChartData(userId, firstDay, lastDay, timezone)

    const budgetData = await getBudgetByUserId(userId)

    const totalAmountArr = chartData.data.map((data: IDoughnutChartData) => data.totalAmount)
    const colorArr = chartData.data.map((data: IDoughnutChartData) => data.expenseType.color)
    
    const totalAmountForChartData = chartData.data.length > 0 ? totalAmountArr.reduce((a: number, b: number) => a + b) : 0

    return (
        <>
            <div className="page-with-navbar">
                {
                    chartData.data.length > 0 ?
                        <>
                            <div className={styles.dashboardHeader}>
                                <div className={styles.greeting}>
                                    Hello, {user.name}
                                </div>
                                <div className={styles.bell}>
                                    <BiBell />
                                </div>
                            </div>
                            <div className={styles.pieChartDiv}>
                                <div>
                                    <PieChart chartData={chartData.data} />
                                </div>
                                <div className={styles.percentageList}>
                                    {colorArr.map((color: string, index: number) => {

                                        const percentage = totalAmountArr[index] / totalAmountForChartData * 100
                                        const percentageRounded = Math.round(percentage * 10) / 10

                                        return (
                                            <div className={styles.percentage} key={index}>
                                                <div className={styles.colorDiv} style={{ backgroundColor: color }}></div>
                                                <div>{percentageRounded}%</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.separateLine}></div>
                            <div className={styles.listHeader}>
                                <div className={styles.listHeaderTotal}>
                                    <p className={styles.listHeaderTotalTitle}>Total Expense</p>
                                    <p className={styles.listHeaderTotalAmount}>{moneyFormat(chartData.totalAmount)}</p>
                                </div>
                                <Link href="/add_expense" className={styles.link}>Add Expense</Link>
                            </div>

                            <div className={styles.expenseList}>
                                {chartData.data.map((data: IDoughnutChartData) => {
                                    const budget = budgetData.budgets.find((budget: IBudget) => budget.expenseType._id == data.expenseType._id)
                                    return <div key={data.expenseType._id.toString()}><ExpenseTypeCard expenseTypeData={data} budget={budget} /></div>
                                })}
                            </div>
                        </>
                        :
                        <div className={styles.dashboardHeaderNoData}>
                            <h1>Expense Tracker</h1>
                            <div className={styles.coinImageDiv}><Image src="/coin.jpg" width={200} height={200} alt="" /></div>
                            <h2>No Expenses Yet</h2>
                            <Link href="/add_expense" className={styles.callToActionButton}>Add Expense Now!</Link>
                        </div>
                }
            </div>
            <Navbar />
        </>
    )
}