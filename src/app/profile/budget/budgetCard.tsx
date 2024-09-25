"use client"

import { FaEllipsisH } from "react-icons/fa";
import ExpenseTypeIcon from "@/component/expenseTypeIcon"
import styles from "@/style/budget.module.css"
import { IBudget } from "../../../../interface/budgetInterface";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBudget } from "../../../../hook/budgetHook";

function formatMoney(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

export default function BudgetCard({ budget }: { budget: IBudget }) {

    const router = useRouter()

    const [display, SetDisplay] = useState(false)

    const deleteClick = async () => {
        const res = await deleteBudget(budget._id.toString())
        if(res.success == true) {
            router.refresh()
        }
    }

    return (
        <div className={styles.budget}>
            <div className={styles.expenseTypeIconDiv} style={{ borderColor: budget.expenseType.color }}>
                <ExpenseTypeIcon iconType={budget.expenseType.icon} />
            </div>
            <div className={styles.budgetText}>
                <div>
                    <p className={styles.expenseTypeTitle}>{budget.expenseType.title}</p>
                    <p>{formatMoney(budget.limit)}</p>
                </div>
                <div onClick={() => SetDisplay(true)} className={styles.ellipsisIconDiv}>
                    <FaEllipsisH />
                </div>
                {
                    display && 
                    <div className={styles.editDeletePopup}>
                        <div onClick={() => router.push(`/profile/budget/edit_budget/${budget._id}`)}>Edit</div>
                        <div onClick={deleteClick}>Delete</div>
                    </div>
                }
            </div>
            {display && <div className={styles.background} onClick={() => SetDisplay(false)}></div>}
        </div>
    )
}