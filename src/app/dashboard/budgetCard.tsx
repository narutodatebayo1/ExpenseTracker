import { IBudget } from "../../../interface/budgetInterface";
import { IDoughnutChartData } from "../../../interface/expenseInterface";
import ExpenseTypeIcon from "@/component/expenseTypeIcon"
import styles from "@/style/dashboard.module.css"

function formatMoney(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

export default function BudgetCard({ budget, relatedExpense }: { budget: IBudget, relatedExpense: IDoughnutChartData }) {

    const totalAmount = relatedExpense ? relatedExpense.totalAmount : 0
    const limit = budget.limit
    const remainingAmount = limit - totalAmount
    const barPercentage = totalAmount/limit * 100
    const barPercentageInString = barPercentage + '%'

    const colorArr = ['#FF0000', '#FFD700', '#32CD32']

    let barColor;
    if(barPercentage > 75) {
        barColor = colorArr[0]
    } else if(barPercentage > 50) {
        barColor = colorArr[1]
    } else {
        barColor = colorArr[2]
    }
    
    return (
        <div className={styles.budget}>
            <div className={styles.budgetInformation}>
                <div className={styles.expenseTypeIconDiv} style={{ borderColor: budget.expenseType.color }}>
                    <ExpenseTypeIcon iconType={budget.expenseType.icon} />
                </div>
                <div className={styles.budgetText}>
                    <div>
                        <p className={styles.expenseTypeTitle}>{budget.expenseType.title}</p>
                        <p>{formatMoney(budget.limit)}</p>
                    </div>
                </div>
            </div>
            <div className={styles.budgetProgressBar}>
                <div className={styles.track}>
                    <div className={styles.bar} style={{ width: barPercentageInString, backgroundColor: barColor }}></div>
                </div>
            </div>
            <div className={styles.budgetProgressBarDetail}>
                <div>{Math.round(barPercentage * 10) / 10}% Used</div>
                <div>{formatMoney(remainingAmount)} Remaining</div>
            </div>
        </div>
    )
}