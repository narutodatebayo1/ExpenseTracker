"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisH } from "react-icons/fa";
import { IExpense } from "../../../../interface/expenseInterface";
import styles from "@/style/expense.module.css"
import ExpenseTypeIcon from "@/component/expenseTypeIcon";
import { deleteExpense } from "../../../../hook/expenseHook";

function formatMoney(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

export default function ExpenseCard({ expense }: { expense: IExpense }) {

    const router = useRouter()
    
    const [display, SetDisplay] = useState(false)

    const deleteButtonClick = async (expenseId: string) => {
        const res = await deleteExpense(expenseId)
        if(res.success == true) location.href = "/profile/expense"
    }

    return (
        <div className={styles.expenseCard}>
            <div className={styles.expenseCardIconDiv} style={{ borderColor: expense.expenseType.color }}>
                <ExpenseTypeIcon iconType={expense.expenseType.icon} />
            </div>
            <div className={styles.expenseCardDetail}>
                <div className={styles.expenseCardHeader}>
                    <div>
                        <p className={styles.expenseCardTitle}>{expense.expenseType.title}</p>
                        <p>{formatMoney(expense.amount)}</p>
                    </div>
                    <div className={styles.ellipsisIconDiv} onClick={() => SetDisplay(true)}>
                        <FaEllipsisH />
                    </div>
                    {
                        display &&
                        <div className={styles.editDeletePopup}>
                            <div onClick={() => router.push(`/profile/expense/edit_expense/${expense._id}`)}>Edit</div>
                            <div onClick={() => deleteButtonClick(expense._id)}>Delete</div>
                        </div>
                    }
                </div>
                <p>{expense.description}</p>
            </div>
            {display && <div className={styles.background} onClick={() => SetDisplay(false)}></div>}
        </div>
    )
}