"use client"

import { useState } from "react";
import { IExpense } from "../../../../interface/expenseInterface"
import { FaEllipsisH } from "react-icons/fa";
import styles from "@/style/expenseTypeDetail.module.css"
import { deleteExpense } from "../../../../hook/expenseHook";
import { useRouter } from "next/navigation";

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

export default function Card({ expense }: { expense: IExpense }) {

    const router = useRouter()

    const [display, SetDisplay] = useState(false)

    const deleteButtonClick = async (expenseId: string) => {
        const res = await deleteExpense(expenseId)
        if(res.success == true) location.reload()
    }

    return (
        <div className={styles.expenseTypeDetailExpense}>
            <div className={styles.cardHeader}>
                <div className={styles.priceDiv}>{moneyFormat(expense.amount)}</div>
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
            <div className={styles.descriptionDiv}>
                {expense.description}
            </div>
            <div className={styles.dateDiv}>
                {dateFormat(expense.createdAt)}
            </div>
            {display && <div className={styles.background} onClick={() => SetDisplay(false)}></div>}
        </div>
    )
}