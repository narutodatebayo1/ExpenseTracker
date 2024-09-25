import { cookies } from "next/headers"
import { getBudgetByUserId } from "../../../../hook/budgetHook"
import { redirect } from "next/navigation"
import { IBudget } from "../../../../interface/budgetInterface"
import Link from "next/link"
import styles from "../../../style/budget.module.css"
import BackNavbar from "@/component/backNavbar"
import BudgetCard from "./budgetCard"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

function formatMoney(num: number) {

    if(num == undefined) {
        return "Rp 0,00"
    }

    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

export default async function Budget() {

    const userId = getUserId()

    const budgetData = await getBudgetByUserId(userId)

    return (
        <>
            <BackNavbar text="Budget" route="/profile" />
            <div className="page-with-navbar-backnavbar">
                <div className={styles.budgetPageHeader}>
                    <div className={styles.totalBudget}>
                        <div>Total Budget:</div>
                        <div>{formatMoney(budgetData.totalBudget)}</div>
                    </div>
                    <Link href="/profile/budget/add_budget" className={styles.addBudgetLink}>Add Budget</Link>
                </div>
                {
                    budgetData.budgets.length > 0 ?
                    <div className={styles.budgetList}>
                        {budgetData.budgets.map((budget: IBudget) => {
                            return <div key={budget._id.toString()}><BudgetCard budget={budget} /></div>
                        })}
                    </div>
                    :
                    <div className={styles.noBudgetDiv}>No Budget</div>
                }
            </div>
        </>
    )
}