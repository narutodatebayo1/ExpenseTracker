import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { IExpenseGroupByDate } from "../../../../interface/expenseInterface"
import styles from "@/style/expense.module.css"
import Card from "./card"
import { getExpenseByExpenseId, getExpenseGroupByDate } from "../../../../hook/expenseHook"
import BackNavbar from "@/component/backNavbar"
import DownloadButton from "./downloadButton"

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

export default async function Expense({ searchParams }: { searchParams?: { expense_id: string } }) {

    const userId = getUserId()

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const { firstDay, lastDay } = getFirstDayLastDayThisMonth()

    const expenses = await getExpenseGroupByDate(userId, firstDay, lastDay, timezone)
    const expenseId = searchParams?.expense_id

    let expenseDate: string;
    if(expenseId) {
        const expense = await getExpenseByExpenseId(expenseId, timezone)
        console.log(expense)
        expenseDate = expense.date.slice(0, 10)
    }

    return (
        <>
            <BackNavbar text="Expense" route="/profile" />
            <div className="page-with-navbar-backnavbar">
                {
                    expenses.length > 0 &&
                    <div className={styles.downloadButtonDiv}>
                        <DownloadButton userId={userId} />
                    </div>
                }
                <div className={styles.expandableCardList}>
                    {
                        expenses.length > 0 ? 
                            expenses.map((expense: IExpenseGroupByDate, index: number) => {
                                if(expenseDate && expense.date == expenseDate)
                                    return <div key={expense.date}><Card data={expense} open={true} scroll={true} /></div>
                                else if(!expenseId && index == 0)
                                    return <div key={expense.date}><Card data={expense} open={true} scroll={false} /></div>
                                return <div key={expense.date}><Card data={expense} open={false} scroll={false} /></div>
                            })
                        :
                            <p className={styles.noExpenseText}>No Expense</p>
                    }
                </div>
            </div>
        </>
    )
}