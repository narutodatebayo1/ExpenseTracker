"use client"

import { MdExpandLess } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { IExpenseGroupByDate } from "../../../../interface/expenseInterface";
import ExpenseCard from "./expenseCard";
import styles from "@/style/expense.module.css"


function formatDate(dateInString: string) {
    const date = new Date(dateInString)
    const formattedDate = date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate
}

export default function Card({ data, open, scroll }: { data: IExpenseGroupByDate, open: boolean, scroll: boolean }) {

    const [expand, SetExpand] = useState(open)

    const currentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(open == true && scroll == true && currentRef.current) currentRef.current.scrollIntoView()
    }, [])

    return (
        <div ref={currentRef} className={styles.expandableCard}>
            <div onClick={() => SetExpand(!expand)} className={styles.expandableCardTitle}>
                <div>{formatDate(data.date)}</div>
                <div>
                    {expand ? <MdExpandLess /> : <MdExpandMore /> }
                </div>
            </div>
            <div className={expand ? styles.displayBlock : styles.displayNone }>
                <div className={styles.expenseCardList}>
                    {data.expenses.map((expense) => {
                        return <div key={expense._id.toString()}><ExpenseCard expense={expense} /></div>
                    })}
                </div>
            </div>
        </div>
    )
}