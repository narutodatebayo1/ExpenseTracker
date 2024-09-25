import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { IExpense } from "../../../../interface/expenseInterface"
import styles from "@/style/expenseTypeDetail.module.css"
import BackNavbar from "@/component/backNavbar"
import Navbar from "@/component/navbar"
import { getExpenseByUserIdExpenseTypeIdDateRange } from "../../../../hook/expenseHook"
import Link from "next/link"
import { getBudgetByUserIdExpenseTypeId } from "../../../../hook/budgetHook"
import Card from "./card"
import LineChart from "./lineChart"

function moneyFormat(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

function dateFormat(date: string) {
    const dateObject = new Date(date)
    let dateInString = dateObject.toDateString()
    dateInString = dateInString.slice(4)
    return dateInString
}

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
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

export default async function ExpenseDetail({ params }: { params: { expense_type_id: string } }){
    
    const userId = getUserId()

    const expenseTypeId = params.expense_type_id

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const { firstDay, lastDay } = getFirstDayLastDayThisMonth()

    const expenseData = await getExpenseByUserIdExpenseTypeIdDateRange(userId, expenseTypeId, firstDay, lastDay, timezone)

    if(expenseData.data.length == 0) {
        redirect('/dashboard')
    }

    const budget = await getBudgetByUserIdExpenseTypeId(userId, expenseTypeId)

    return (
        <>
            <BackNavbar text="Expense By Category" route="/dashboard" />
            <div className="page-with-navbar-backnavbar">
                <div className={styles.budgetDiv}>
                    <div className={styles.limitDiv}>
                        <div>Limit</div>
                        <div>{budget._id ? moneyFormat(budget.limit) : moneyFormat(0)}</div>
                    </div>
                    {budget._id ? 
                        <Link href={`/profile/budget/edit_budget/${budget._id}`} className={styles.setBudgetButton}>Edit Budget</Link>
                        :
                        <Link href={`/profile/budget/add_budget?expense_type_id=${expenseTypeId}`} className={styles.setBudgetButton}>Set Budget</Link>
                    }
                </div>

                <div className={styles.chartDiv}>
                    <LineChart chartData={expenseData.data} />
                </div>

                {/* <div className={styles.budgetDiv}>
                    <div className={styles.limitDiv}>
                        <div>Total Expense</div>
                        <div>{moneyFormat(expenseData.totalAmount)}</div>
                    </div>
                    <Link href="/add_expense" className={styles.addBudgetButton}>Add Expense</Link>
                </div> */}

                <div className={styles.expenseList}>
                    {expenseData.data.map((expense: IExpense) => {
                        return <div key={expense._id.toString()}><Card expense={expense} /></div>
                    })}
                </div>
            </div>
            <Navbar />
        </>
    )
}