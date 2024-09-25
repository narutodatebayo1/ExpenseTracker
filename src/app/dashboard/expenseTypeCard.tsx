import ExpenseTypeIcon from "@/component/expenseTypeIcon";
import Link from "next/link";
import styles from "@/style/dashboard.module.css"
import { IDoughnutChartData } from "../../../interface/expenseInterface";
import { IBudget } from "../../../interface/budgetInterface";

function moneyFormat(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

export default function ExpenseTypeCard({ expenseTypeData, budget }: { expenseTypeData: IDoughnutChartData, budget: IBudget }) {
    
    const totalAmount = expenseTypeData.totalAmount
    const limit = budget ? budget.limit : 0
    const remainingAmount = Math.abs(limit - totalAmount)
    const barPercentage = budget ? totalAmount/limit * 100 : 0
    const barPercentageDisplayed = Math.round(barPercentage * 10) / 10
    const barPercentageInString = barPercentage > 100 ? '100%' : barPercentage + '%'

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
        <Link href={"/expense_type_detail/" + expenseTypeData.expenseType._id} key={expenseTypeData.expenseType._id.toString()} className={styles.expenseType}>
            <div className={styles.expenseTypeHeader}>
                <div className={styles.expenseTypeIconDiv} style={{ borderColor: expenseTypeData.expenseType.color }}>
                    <ExpenseTypeIcon iconType={expenseTypeData.expenseType.icon} />
                </div>
                <div>
                    <p className={styles.expenseTypeTitle}>{expenseTypeData.expenseType.title}</p>
                    <p className={styles.expenseTypeAmount}>{moneyFormat(expenseTypeData.totalAmount)}</p>
                </div>
            </div>

            <div className={styles.budgetProgressBar}>
                <div className={styles.track} style={{ backgroundColor: budget ? '#D9D9D9' : '#EDEDED' }}>
                    <div className={styles.bar} style={{ width: barPercentageInString, backgroundColor: barColor }}></div>
                </div>
            </div>

            {
                budget ?
                    <div className={styles.budgetProgressBarDetail}>
                        <div>{barPercentageDisplayed}% Used</div>
                        <div>{moneyFormat(remainingAmount)} {barPercentage > 100 ? "Exceeded" : "Remaining"}</div>
                    </div>
                    :
                    <div className={styles.noBudgetDiv}>
                        <div>Budget Not Set</div>
                        {/* <Link className={stylyyes.setBudgetButton} href={`/profile/budget/add_budget?expense_type=${expenseTypeData.expenseType._id}`}>Set Budget</Link> */}
                    </div>
            }
        </Link>
    )
}